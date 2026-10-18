---
title: "Die unsichtbaren Riesen: 21 Entwickler, die dein Internet gebaut haben"
description: "Wir feiern die Gründer von Facebook und Google, aber das Internet läuft mit Open-Source-Code von einer kleinen Gruppe Freiwilliger. Hier sind 21 von ihnen."
date: "2025-12-07T17:25:01Z"
updated: "2025-12-07"
lang: de
translated_from: "en/the-invisible-giants-21-developers-who-built-your-internet"
source_sections: ["numbers-1-to-7-watchers-utils-and-babel", "numbers-8-to-14-npm-express-and-the-node-style", "numbers-15-to-21-streams-polyfills-and-p2p"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-invisible-giants-21-developers-who-built-your-internet/cover.webp"
tldr: ["Das Internet läuft mit Open-Source-Code, den eine kleine Gruppe meist unsichtbarer Freiwilliger am Leben hält.", "Das ist eine Liste der Top 21 npm-Entwickler, von Paul Millrs chokidar bis Feross Aboukhadijehs WebTorrent.", "Ihre Pakete wie Babel, glob, express, lodash und yargs laufen hunderte Millionen Mal."]
sections: [{"basically": "Chokidar, chalk, micromatch und Babel: Die ersten sieben überwachen Dateien, machen Logs bunt und kompilieren Code."}, {"basically": "Isaac hat npm selbst gebaut, Doug hält Express am Leben und TJ hat definiert, wie Node-Code aussieht."}, {"basically": "Minimist, lodash, yargs, Polyfills, Streams, node-gyp und WebTorrent runden die Liste ab."}]
---
![](../../../media/the-invisible-giants-21-developers-who-built-your-internet/cover.jpg)

Wir loben immer die Gründer von Facebook oder Google. Aber das Internet, das wir heute nutzen, basiert eigentlich auf Open-Source-Code, und ein Großteil davon wird von einer kleinen Gruppe Freiwilliger am Leben gehalten. Das sind die unsichtbaren Riesen. Du nutzt ihren Code höchstwahrscheinlich jeden einzelnen Tag und merkst es nicht mal.

Das ist die Geschichte der Top 21, und sie beginnt mit dem Mann, der deine Dateien beobachtet.

## Nummern 1 bis 7: Watcher, Utils und Babel

Nummer 1 ist Paul Millr, der Wächter. Paul ist [`@paulmillr`](https://github.com/paulmillr) auf GitHub und sein großes Ding ist [`chokidar`](https://github.com/paulmillr/chokidar). Es wird in mehr als 30 Millionen Repositories genutzt und hat Hunderte Millionen Downloads. In den frühen Tagen von Node.js war es kaputt, einfach nur eine Datei auf Änderungen zu überwachen, damit deine App sich selbst neu laden konnte. Es war buggy, es ist auf Macs abgestürzt und hat Fehler unter Windows ignoriert. Paul hat das nicht einfach hingenommen, er hat Chokidar gebaut. Und es hat den nervigsten Teil eines Entwickleralltags gefixt, nämlich das Warten. Jedes Mal, wenn du in VS Code `Strg+S` drückst, oder deine React-App sich sofort im Browser aktualisiert, läuft Pauls Code im Hintergrund und beobachtet die Welt für dich.

Nummer 2 ist Sindre Sorhus, der König der Produktivität. Sindre ist [`@sindresorhus`](https://github.com/sindresorhus) und seine berühmteste Schöpfung ist [`chalk`](https://github.com/chalk/chalk), mit mehr als 1,9 Milliarden Downloads. Er ist eine Legende, die an die Unix-Philosophie glaubt, kleine Module, die eine Sache gut machen. Chalk brachte Farbe ins Terminal. Vor Sindre war das Terminal eine trostlose schwarz-weiße Textwand. Er machte Fehler rot, Warnungen gelb und Erfolg grün. Er hat der Welt der Entwickler buchstäblich Farbe gegeben, und das bedeutet weniger Augenbelastung und weniger Verwirrung für Millionen von Menschen.

Nummer 3 ist Jon Schlinkert, der Meister der Micro-Utils. Jon ist [`@jonschlinkert`](https://github.com/jonschlinkert) und sein großes Ding ist [`micromatch`](https://github.com/micromatch/micromatch), mit mehr als 1,3 Milliarden Downloads. Jon ist der Meister des Matchings. Wenn du je `*.js` eingegeben hast, um alle JavaScript-Dateien zu finden, oder `src/**/*.css`, um Styles zu finden, hast du Jons Logik benutzt. Sein Code ist die unsichtbare Sortiermaschine in Webpack, Babel und ESLint. Wenn du nach einer Datei fragst, sorgt er dafür, dass der Computer auch wirklich die richtige findet.

Nummer 4 ist Brian Woodward, der Partner im Code. Brian ist [`@doowb`](https://github.com/doowb) und sein großes Ding ist [`handlebars-helpers`](https://github.com/helpers/handlebars-helpers), mit mehr als 860 Millionen Downloads. Er arbeitet oft mit Jon Schlinkert zusammen und baut den Klebstoff, der statische Seiten zusammenhält. Er macht die Helper, die Templating-Engines ihre Arbeit machen lassen, wie Daten formatieren, durch Daten loopen und langweilige HTML-Aufgaben automatisieren. Er ist der Grund, warum dein Blog-Generator funktioniert.

Nummer 5 ist Daniel Tschinder, der Modernisierer. Daniel ist [`@danez`](https://github.com/danez) und sein großes Ding ist [`babel-plugin-transform...`](https://babeljs.io), mit mehr als 774 Millionen Downloads. Er ist eine zentrale Säule im Babel-Team. Babel ist die Zeitmaschine des Webs. Du schreibst heute Code aus der Zukunft und es verwandelt ihn in Code, den ältere Browser verstehen. Ohne Daniel würden wir immer noch altes JavaScript schreiben, ES5. Er lässt die ganze Industrie vorankommen, ohne Leute mit älteren Computern zurückzulassen.

Nummer 6 ist Henry Zhu, der Babel-Hüter. Henry ist [`@hzoo`](https://github.com/hzoo) und sein großes Ding ist [`babel-core`](https://github.com/babel/babel), mit mehr als 743 Millionen Downloads. Henry ist das Gesicht der Open-Source-Nachhaltigkeit. Als Lead-Maintainer von Babel betreibt er den Compiler, der React, Vue und Next.js antreibt. Er hält die Schlüssel zum Königreich. Wenn Babel kaputtgeht, geht das moderne Web kaputt. Sein Paket ist also wirklich die Sicherheit, dass dein Code überall läuft, auf jedem Gerät.

Nummer 7 ist Logan Smyth, der Architekt. Logan ist [`@loganfsmyth`](https://github.com/loganfsmyth) und sein großes Ding ist [`babel-loader`](https://github.com/babel/babel-loader), mit mehr als 739 Millionen Downloads. Logan baut die Brücken. Er arbeitet daran, wie Babel mit anderen Tools spricht, hauptsächlich Webpack. Er hat die Schicht gemacht, die dein Build-System mit dem Compiler verbindet, damit die ganze Pipeline der modernen Webentwicklung weiterfließt und nicht verstopft.

## Nummern 8 bis 14: npm, Express und der Node-Stil

Nummer 8 ist Isaac Z. Schlueter, der Vater von npm. Isaac ist [`@isaacs`](https://github.com/isaacs). Sein meistgeladenes Paket ist [`glob`](https://github.com/isaacs/node-glob), mit mehr als 736 Millionen Downloads, und er hat auch `npm` erschaffen. Isaac ist König, er hat npm selbst erschaffen. Glob bringt Node.js bei, wie man Dateien auf einer Festplatte mit Mustern findet. Aber er hat nicht nur ein Paket geschrieben, er hat den Spielplatz gebaut, auf dem alle anderen auf dieser Liste spielen. Jedes Mal, wenn du `npm install` ausführst, nutzt du seine Erfindung.

Nummer 9 ist Brian Ng, der AST-Chirurg. Brian ist [`@existentialism`](https://github.com/existentialism) und sein großes Ding ist [`babel-types`](https://github.com/babel/babel), mit mehr als 685 Millionen Downloads. Brians Arbeit lässt Software andere Software verstehen. Er wartet die Tools, die Code in Abstract Syntax Trees (ASTs) zerlegen. Und diese Tools lesen Code nicht nur, sie verändern ihn mit einem Skalpell. Das ist es, was Tools erlaubt, deine Bugs selbst zu fixen oder deinen chaotischen Code zu formatieren.

Nummer 10 ist Doug Wilson, der Server-Retter. Doug ist [`@dougwilson`](https://github.com/dougwilson) und sein großes Ding ist [`express`](https://github.com/expressjs/express), mit mehr als 668 Millionen Downloads. Wenn du je eine Website besucht hast, die auf Node.js läuft, lief sie höchstwahrscheinlich auf Express. Doug ist der unermüdliche Maintainer des Standard-Web-Frameworks für Node. Er hält das Internet am Laufen. Von kleinen Blogs bis zu riesigen APIs, sein Code nimmt den Request entgegen und schickt die Response.

Nummer 11 ist Sebastian McKenzie, der Schöpfer. Sebastian ist [`@sebmck`](https://github.com/sebmck) und sein großes Ding ist [`yarn`](https://github.com/yarnpkg/yarn), mit mehr als 632 Millionen Downloads, und er hat auch Babel erschaffen. Sebastian ist ein Wunderkind. Er hat Babel (zuerst `6to5` genannt) als Teenager erschaffen und dann Yarn, eine schnellere Alternative zu npm. Er hat JavaScript ziemlich allein aus dem dunklen Zeitalter von 2009 in die moderne Ära gezogen, und er hat definiert, wie wir in den 2010ern gearbeitet haben.

Nummer 12 ist James Kyle, der Evangelist. James ist [`@thejameskyle`](https://github.com/thejameskyle) und seine großen Dinge sind [`flow`](https://flow.org/) und Babel-Plugins, mit mehr als 625 Millionen Downloads. James war die Brücke zwischen komplexen Compilern und normalen Menschen. Er schrieb die Handbücher, die Guides und die Plugins, die Tools wie Babel und Flow benutzbar machten. Er verwandelte unmögliche Technik in einfache Tools.

Nummer 13 ist Mathias Bynens, der Unicode-Wächter. Mathias ist [`@mathias`](https://github.com/mathias) und sein großes Ding ist [`he`](https://github.com/mathias/he), für HTML-Entities, mit mehr als 481 Millionen Downloads. Computer sind schlecht mit Text, besonders mit Emojis und komischen Symbolen. Mathias ist der Weltexperte dafür, wie JavaScript mit Zeichen umgeht. Wenn du je ein Emoji 🚀 in einem Passwort oder Benutzernamen benutzt hast und die Seite nicht abgestürzt ist, danke Mathias. Er sorgt dafür, dass das Web jede menschliche Sprache richtig spricht.

Nummer 14 ist TJ Holowaychuk, der Pate. TJ ist [`@tjholowaychuk`](https://github.com/tjholowaychuk) und seine großen Dinge sind [`commander`](https://github.com/tj/commander.js) und `mocha`, mit mehr als 364 Millionen Downloads. Er ist der produktivste Programmierer in der Node-Geschichte. Er schrieb die ersten Versionen von Express, Mocha und Commander. Er hat den Stil von Node.js definiert. Wenn du Code schreibst, der sauber und elegant aussieht, kopierst du höchstwahrscheinlich TJs Stil.

## Nummer 15 bis 21: Streams, Polyfills und P2P

Nummer 15 ist James Halliday, der Philosoph. James ist [`@substack`](https://github.com/substack) und seine großen Dinger sind [`minimist`](https://github.com/substack/minimist) und `browserify`, mit mehr als 417 Millionen Downloads. Substack hatte die Idee, dass man Node.js-Code schreiben und im Browser laufen lassen kann. Er hat Browserify gebaut. Damit hat er die Bundling-Revolution losgetreten, und die führt direkt zu den Tools, die wir heute benutzen.

Nummer 16 ist John-David Dalton, der Performance-Besessene. JD ist [`@jdalton`](https://github.com/jdalton) und sein großes Ding ist [`lodash`](https://github.com/lodash/lodash), mit mehr als 375 Millionen Downloads. JD Dalton hat gesehen, dass die Standard-JavaScript-Bibliothek zu langsam war und viel gefehlt hat. Also hat er Lodash gebaut, einen Werkzeuggürtel, der zur meistgenutzten Bibliothek der Geschichte wurde. Er war besessen von Geschwindigkeit, und seine Funktionen waren oft schneller als die, die im Browser eingebaut sind.

Nummer 17 ist Ben Coe, der Kommandozeilen-Kommandant. Ben ist [`@bcoe`](https://github.com/bcoe) und sein großes Ding ist [`yargs`](https://github.com/yargs/yargs), mit mehr als 310 Millionen Downloads. Ben macht die Kommandozeile freundlich. Er pflegt Yargs, das Tool, das Kommandozeilen-Argumente liest. Jedes Mal, wenn du einen Befehl wie `--help` oder `--version` tippst, checkt Bens Code, was du meinst, und sagt dem Programm, was es tun soll.

Nummer 18 ist Jordan Harband, der Polyfill-König. Jordan ist [`@ljharb`](https://github.com/ljharb) und sein großes Ding ist [`object.assign`](https://github.com/ljharb/object.assign), mit mehr als 279 Millionen Downloads. Jordan hält die Dinge rückwärtskompatibel. Er pflegt Hunderte Polyfills, kleine Shims, die alten Browsern neue Tricks beibringen. Er kämpft für die Leute mit alten Computern, damit das Web offen bleibt für alle und nicht nur für Leute mit den neuesten MacBooks.

Nummer 19 ist Dominic Tarr, der Stream-Meister. Dominic ist [`@dominictarr`](https://github.com/dominictarr) und sein großes Ding ist [`through`](https://github.com/dominictarr/through), mit mehr als 279 Millionen Downloads. Dominic ist ein verrückter Wissenschaftler der Datenströme. Er hat die Tools geschrieben, mit denen Daten durch Apps fließen wie Wasser durch Rohre. Und er hat die Idee der kleinen Module mehr gepusht als jeder andere und ein riesiges Netzwerk aus winzigen, perfekten Tools gebaut.

Nummer 20 ist Nathan Rajlich, der Klempner. Nathan ist [`@tootallnate`](https://github.com/TooTallNate) und sein großes Ding ist [`node-gyp`](https://github.com/nodejs/node-gyp), mit mehr als 224 Millionen Downloads. Nathan macht die schwere Arbeit. Er pflegt die Tools, mit denen Node.js mit C++ und den Low-Level-Teilen des Systems reden kann. Er baut die Brücke zwischen der einfachen Welt von JavaScript und der harten Welt des Maschinencodes.

Nummer 21 ist Feross Aboukhadijeh, der P2P-Pionier. Feross ist [`@feross`](https://github.com/feross) und seine großen Dinger sind [`standard`](https://github.com/standard/standard) und `webtorrent`, mit mehr als 206 Millionen Downloads. Feross ist ein Visionär, der ein dezentrales Web will. Er hat WebTorrent gebaut, das ist BitTorrent im Browser, und Standard, einen Linter, der Semikolons verbietet. Er zeigt, dass JavaScript alles kann, sogar Filme Peer to Peer direkt in deinem Browser streamen, ganz ohne Plugin. Er pusht immer weiter, was in einem Webbrowser möglich ist.
