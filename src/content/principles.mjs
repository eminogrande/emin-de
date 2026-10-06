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
				'How each post was made (by hand, with AI help, or written by AI under my supervision) is recorded in its metadata, its Markdown version and the JSON API; it is information, never a gate.',
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
				'Wie jeder Beitrag entstanden ist (von Hand, mit KI-Hilfe oder von KI unter meiner Aufsicht geschrieben), steht in seinen Metadaten, seiner Markdown-Fassung und in der JSON-API; das ist eine Information, nie eine Sperre.',
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
