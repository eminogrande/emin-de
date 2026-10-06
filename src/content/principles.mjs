// The site's principles, EN + DE. One source for the HTML pages and their
// Markdown mirrors.
import config from '../../site.config.mjs';

const pub = config.publisher;
export const principles = {
	en: {
		title: 'Principles',
		lede: 'Free speech. Nothing here is censored. AI help is labelled, the words are mine.',
		sections: [
			['Free speech comes first', [
				`I am a journalist and the publisher of ${pub.publication.name}, a Berlin print magazine archived in the German National Library. I have published other people's opinions for years, including ones I disagree with. This site follows the same rule for my own writing.`,
				'Nothing on emin.de is hidden, down-ranked or removed because of its topic, its tone or the words it uses. There is no topic filter, no sensitive-word list and no review queue that keeps a post out of search engines or AI answers.',
			]],
			['What a label means, and what it does not', [
				'Every post carries a small badge that says how it was made: human-written, human + AI, or AI-written under my supervision. The same fact is in the page metadata, the Markdown version and the JSON API.',
				'A label is information, never a gate. A post with an AI badge is just as public, just as indexable and just as quotable as one I typed by hand.',
			]],
			['The only way a post disappears', [
				'A post is hidden only when I, the author, mark it as a draft. Nobody else, and no automated rule, can do that. Corrections are made openly and recorded in the changelog.',
			]],
			['This site is the original', [
				'Many of these texts first appeared on Medium, Substack or emino.app. emin.de is now their home: each page names itself as the original and links to where the text was first published, with the date.',
			]],
			['Open by design', [
				`Every post is a Markdown file in a public repository (${config.repo}). Anyone, person or machine, can read, quote and link it. Text is licensed ${config.license.text}.`,
			]],
		],
	},
	de: {
		title: 'Grundsätze',
		lede: 'Freie Rede. Hier wird nichts zensiert. KI-Hilfe ist gekennzeichnet, die Worte sind meine.',
		sections: [
			['Freie Rede zuerst', [
				`Ich bin Journalist und Herausgeber von ${pub.publication.name}, einem Berliner Printmagazin, archiviert in der Deutschen Nationalbibliothek. Ich habe jahrelang die Meinungen anderer veröffentlicht, auch solche, die ich nicht teile. Für meine eigenen Texte gilt hier dieselbe Regel.`,
				'Nichts auf emin.de wird wegen seines Themas, seines Tons oder seiner Worte versteckt, herabgestuft oder entfernt. Es gibt keinen Themenfilter, keine Liste heikler Wörter und keine Prüfschleife, die einen Beitrag von Suchmaschinen oder KI-Antworten fernhält.',
			]],
			['Was eine Kennzeichnung bedeutet und was nicht', [
				'Jeder Beitrag trägt eine kleine Plakette, die sagt, wie er entstanden ist: von Hand, Mensch + KI, oder KI-geschrieben unter meiner Aufsicht. Dieselbe Angabe steht in den Metadaten, in der Markdown-Fassung und in der JSON-API.',
				'Eine Kennzeichnung ist eine Information, nie eine Sperre. Ein Beitrag mit KI-Plakette ist genauso öffentlich, genauso auffindbar und genauso zitierbar wie einer, den ich von Hand geschrieben habe.',
			]],
			['Der einzige Weg, wie ein Beitrag verschwindet', [
				'Ein Beitrag wird nur dann ausgeblendet, wenn ich als Autor ihn als Entwurf markiere. Niemand sonst und keine automatische Regel kann das. Korrekturen passieren offen und stehen im Changelog.',
			]],
			['Diese Seite ist das Original', [
				'Viele dieser Texte erschienen zuerst auf Medium, Substack oder emino.app. emin.de ist jetzt ihr Zuhause: Jede Seite nennt sich selbst als Original und verlinkt, wo und wann der Text zuerst erschien.',
			]],
			['Offen gebaut', [
				`Jeder Beitrag ist eine Markdown-Datei in einem öffentlichen Repository (${config.repo}). Jeder, Mensch oder Maschine, kann ihn lesen, zitieren und verlinken. Die Texte stehen unter ${config.license.text}.`,
			]],
		],
	},
};

export function principlesMarkdown(lang) {
	const p = principles[lang];
	return [`# ${p.title}`, '', `> ${p.lede}`, '', ...p.sections.flatMap(([h, paras]) => [`## ${h}`, '', ...paras.flatMap((x) => [x, ''])])].join('\n');
}
