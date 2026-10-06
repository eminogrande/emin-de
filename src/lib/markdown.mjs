// Markdown to HTML. One pipeline for posts and CHANGELOG.md.
//  - Raw HTML in a post (imports from other platforms) is parsed and then
//    sanitised: no scripts, styles, event handlers or iframes survive, text does.
//  - Hugo shortcodes become plain links, so no text is dropped.
//  - Media links written for GitHub (../../../media/<slug>/file) become /media/...
//  - Images get width/height (from the build's size map or a -WxH file suffix)
//    and lazy loading. Body H1s are demoted one level (the page title is the H1).
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

const schema = {
	...defaultSchema,
	clobberPrefix: '',
	tagNames: [...defaultSchema.tagNames, 'audio', 'video', 'figure', 'figcaption', 'caption', 'mark', 'small', 'abbr', 'cite', 'u'],
	attributes: {
		...defaultSchema.attributes,
		audio: ['controls', 'preload', 'src'],
		video: ['controls', 'preload', 'src', 'poster', 'width', 'height'],
		source: ['src', 'type', 'srcSet', 'media'],
		img: [...(defaultSchema.attributes.img || []), 'width', 'height', 'loading', 'decoding', 'fetchPriority', 'srcSet', 'sizes'],
		'*': [...(defaultSchema.attributes['*'] || []), 'id'],
	},
	protocols: { ...defaultSchema.protocols, src: ['http', 'https'] },
};

// Rewrites that keep every word: shortcodes become links, media paths become site paths.
// Bold/italic markers with a space before the closing marker ("**debt ratio **to")
// are not emphasis in CommonMark and leak as raw "**". Move the space outside
// the marker. Fenced code and inline code are left untouched.
export function fixEmphasis(markdown) {
	let fence = false;
	const fixPart = (part) => {
		// Pair the markers in order (1st opens, 2nd closes, ...). Only a closer
		// with whitespace before it and a word right after it is moved.
		const marks = [...part.matchAll(/\*\*/g)].map((m) => m.index);
		if (marks.length < 2 || marks.length % 2) return part;
		let out = part;
		for (let k = marks.length - 1; k >= 1; k -= 2) {
			const at = marks[k];
			const before = out.slice(0, at);
			const ws = before.match(/[ \t]+$/)?.[0];
			if (!ws || at - ws.length <= marks[k - 1] + 2) continue;
			const after = out.slice(at + 2);
			out = `${before.slice(0, -ws.length)}**${/^[\p{L}\p{N}(]/u.test(after) ? ws : ''}${after}`;
		}
		return out;
	};
	return String(markdown)
		.split('\n')
		.map((line) => {
			if (/^\s*(```|~~~)/.test(line)) {
				fence = !fence;
				return line;
			}
			if (fence || !line.includes('**')) return line;
			return line.split(/(`[^`]*`)/).map((part) => (part.startsWith('`') ? part : fixPart(part))).join('');
		})
		.join('\n');
}

export function preprocess(markdown, mediaBase = '') {
	return fixEmphasis(markdown)
		.replace(/\{\{<\s*youtube\s+(?:id=")?([\w-]{11})"?\s*>\}\}/g, (_, id) => `[Watch on YouTube](https://www.youtube.com/watch?v=${id})`)
		.replace(/\{\{<\s*vimeo\s+(\d+)\s*>\}\}/g, (_, id) => `[Watch on Vimeo](https://vimeo.com/${id})`)
		.replace(/(?:\.\.\/)+media\//g, `${mediaBase}/media/`);
}

function rehypeMedia(sizes, srcsets) {
	return () => (tree) => {
		visit(tree, 'element', (node) => {
			if (/^h[1-5]$/.test(node.tagName) && node.data?.demote) node.tagName = `h${Number(node.tagName[1]) + 1}`;
			if (node.tagName !== 'img') return;
			const src = String(node.properties.src || '');
			const size = sizes?.[src] || src.match(/-(\d{2,5})x(\d{2,5})\.\w+$/)?.slice(1);
			if (size) Object.assign(node.properties, { width: String(size[0]), height: String(size[1]) });
			if (srcsets?.[src]) Object.assign(node.properties, { srcSet: srcsets[src], sizes: '(max-width: 48rem) 100vw, 46rem' });
			if (node.properties.alt === undefined) node.properties.alt = '';
			node.properties.loading = 'lazy';
			node.properties.decoding = 'async';
		});
	};
}

// A paragraph that is only a bare video URL becomes a video card. YouTube gets
// a lite embed: a thumbnail and a play button inside the original link. No
// third-party script or iframe loads until the reader clicks (see
// public/lite-yt.js); without JavaScript the link simply opens YouTube.
export function youtubeIdFrom(href) {
	return String(href).match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/)?.[1] || null;
}
function rehypeVideoCards() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'p') return;
			const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
			if (kids.length !== 1 || kids[0].tagName !== 'a') return;
			const a = kids[0];
			const href = String(a.properties?.href || '');
			const text = a.children.map((c) => c.value || '').join('').trim();
			if (text !== href) return;
			const yt = youtubeIdFrom(href);
			if (yt) {
				node.tagName = 'div';
				node.properties = { className: ['yt-lite'] };
				node.children = [{
					type: 'element',
					tagName: 'a',
					properties: { href, className: ['yt-lite__link'], dataYt: yt, title: href },
					children: [
						{ type: 'element', tagName: 'img', properties: { src: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`, alt: '', width: '480', height: '360', loading: 'lazy', decoding: 'async' }, children: [] },
						{ type: 'element', tagName: 'span', properties: { className: ['yt-lite__play'], ariaHidden: 'true' }, children: [] },
						{ type: 'element', tagName: 'span', properties: { className: ['yt-lite__label'] }, children: [{ type: 'text', value: 'Play the video (loads YouTube)' }] },
					],
				}];
				return;
			}
			if (!/vimeo\.com/.test(href)) return;
			a.properties.className = ['video-card'];
			a.children = [{ type: 'text', value: 'Watch the video on Vimeo' }];
			a.properties.title = href;
		});
	};
}

// Tables: every cell gets its column header as data-label, so CSS can stack
// rows into label/value cards on narrow screens (no horizontal scroll).
// A Medium-import artefact repeats a table's cells as one run-on paragraph
// right after it; that duplicate is removed (its words are all in the table).
const tokens = (node) => (toPlain(node).toLowerCase().match(/[\p{L}\p{N}]+/gu) || []);
function toPlain(node) {
	if (node.type === 'text') return node.value;
	return (node.children || []).map(toPlain).join(' ');
}
function rehypeTables() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'table') return;
			const head = [];
			visit(node, 'element', (n) => {
				if (n.tagName !== 'thead') return;
				visit(n, 'element', (th) => {
					if (th.tagName === 'th') head.push(toPlain(th).trim());
				});
			});
			visit(node, 'element', (n) => {
				if (n.tagName !== 'tbody') return;
				visit(n, 'element', (tr) => {
					if (tr.tagName !== 'tr') return;
					let i = 0;
					for (const cell of tr.children.filter((c) => c.tagName === 'td' || c.tagName === 'th')) {
						if (head[i]) cell.properties = { ...(cell.properties || {}), dataLabel: head[i] };
						i += 1;
					}
				});
			});
			if (!parent) return;
			const tableWords = new Set(tokens(node));
			let j = index + 1;
			while (parent.children[j] && parent.children[j].type === 'text' && !parent.children[j].value.trim()) j += 1;
			const next = parent.children[j];
			if (next && next.tagName === 'p') {
				const w = tokens(next);
				if (w.length >= 12 && w.every((x) => tableWords.has(x))) parent.children.splice(j, 1);
			}
		});
	};
}

function rehypeDemote() {
	return (tree) => {
		let hasH1 = false;
		visit(tree, 'element', (node) => {
			if (node.tagName === 'h1') hasH1 = true;
		});
		if (!hasH1) return;
		visit(tree, 'element', (node) => {
			if (/^h[1-5]$/.test(node.tagName)) node.tagName = `h${Number(node.tagName[1]) + 1}`;
		});
	};
}

export function renderHtml(markdown, { sizes, srcsets } = {}) {
	const pipeline = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeSanitize, schema)
		.use(rehypeDemote)
		.use(rehypeVideoCards)
		.use(rehypeTables)
		.use(rehypeMedia(sizes, srcsets))
		.use(rehypeStringify);
	return String(pipeline.processSync(preprocess(markdown)));
}
