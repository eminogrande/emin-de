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
export function preprocess(markdown, mediaBase = '') {
	return String(markdown)
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
		.use(rehypeMedia(sizes, srcsets))
		.use(rehypeStringify);
	return String(pipeline.processSync(preprocess(markdown)));
}
