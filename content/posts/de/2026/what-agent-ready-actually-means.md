---
title: "Was „agent ready“ wirklich heißt"
description: "Vier öffentliche Scanner bewerten inzwischen, ob KI-Agenten deine Seite lesen können. Hier steht, was jeder einzelne misst, welche Checks ein statischer Host niemals bestehen kann, und welche…"
date: "2026-09-11"
updated: "2026-09-11"
lang: de
translated_from: "en/what-agent-ready-actually-means"
source_sections: ["why-anyone-started-scoring-this", "the-four-scanners-and-what-each-one-actually-measures", "why-a-static-host-caps-your-score-permanently", "which-files-actually-carry-weight", "the-part-where-you-are-tempted-to-lie", "what-to-do-first-in-order", "the-score-is-a-moving-target"]
category: agents-ai
format: explainer
author: emin
provenance: written
ai_assisted: true
reviewed_by_human: false
tags: ["agent-readiness", "llms.txt", "MCP", "SEO", "AI crawlers"]
source_links: [{"title": "RFC 8288: Web Linking", "url": "https://www.rfc-editor.org/rfc/rfc8288.html", "note": "The Link header format the discovery checks expect."}, {"title": "RFC 9457: Problem Details for HTTP APIs", "url": "https://www.rfc-editor.org/rfc/rfc9457.html", "note": "The application/problem+json error shape required on API paths."}, {"title": "RFC 9745: The Deprecation HTTP Header Field", "url": "https://www.rfc-editor.org/rfc/rfc9745.html"}, {"title": "RFC 8594: The Sunset HTTP Header Field", "url": "https://www.rfc-editor.org/rfc/rfc8594.html"}, {"title": "isitagentready.com", "url": "https://isitagentready.com", "note": "Publishes its own per-check specs under /.well-known/agent-skills/."}, {"title": "Model Context Protocol specification", "url": "https://modelcontextprotocol.io", "note": "Streamable HTTP transport and the initialize handshake."}, {"title": "llms.txt proposal", "url": "https://llmstxt.org", "note": "The file format, including why entries must be Markdown links."}]
tldr: ["Agent Readiness ist kein Plugin.", "Es ist ein Satz von HTTP-Verhaltensweisen: RFC-8288-Link-Header, Accept-basierte Markdown-Negotiation, Well-Known-Discovery-Dokumente und ehrliche maschinenlesbare Metadaten.", "Vier öffentliche Scanner bewerten das, und sie widersprechen sich.", "Ein rein statischer Host kann die Header-Checks niemals bestehen, egal wie viele Dateien du hinzufügst."]
sections: [{"basically": "Ein Such-Crawler will deine Seite ranken. Ein Agent will sie überspringen und deine API aufrufen."}, {"basically": "Vier Scanner, vier verschiedene Fragen. Den einen Agent-Ready-Score gibt es nicht."}, {"basically": "Link-Header und Markdown-Negotiation sind Response-Verhalten. Kein statischer Host kann das faken."}, {"basically": "Der erste Absatz deiner llms.txt ist der Satz, den Assistenten zitieren werden. Verschwende ihn nicht."}, {"basically": "Metadaten sind ein Versprechen. Ein Agent, der einem falschen Versprechen folgt, versucht es nicht höflich noch mal."}, {"basically": "Setz erst einen Server davor. Jede Datei, die du vorher hinzufügst, ist durch den Host gedeckelt."}, {"basically": "Scanner fügen Checks hinzu. Ein Screenshot von 100 aus dem letzten Monat beweist heute nichts."}]
---
## Warum überhaupt jemand angefangen hat, das zu bewerten

Zwanzig Jahre lang war der einzige Roboter, der auf einer Website zählte, ein Such-Crawler. Der wollte HTML, eine Sitemap und eine robots.txt, und die Branche hat einen ganzen Beruf darum herum gebaut, ihn zu füttern.

Diese Annahme ist leise gebrochen. Zu den Clients, die heute eine Site aufrufen, gehören Modelle, die lesen, zusammenfassen und zitieren, und Agenten, die eine Aufgabe erledigen wollen, statt einen Index zu bauen. Sie kommen mit unterschiedlichem Hunger. Ein Such-Crawler will deine Seite ranken. Ein Modell will eine Passage extrahieren, die es zitieren kann. Ein Agent will die maschinenlesbare Oberfläche finden und deine Seite komplett überspringen.

Diese drei wollen von derselben URL verschiedene Dinge. Genau deshalb kann eine Seite für Google perfekt optimiert sein und für einen Agenten trotzdem nutzlos. Scanner sind aufgetaucht, um diese Lücke zu messen.

## Die vier Scanner und was jeder wirklich misst

Vier öffentliche Tools bewerten Agent-Readiness, und sie messen nicht dasselbe. Sie als einen Score zu behandeln ist der erste Fehler.

isitagentready.com ist am strengsten bei der Discovery-Plumbing. Es prüft robots.txt, Sitemap, RFC-8288-Link-Header, DNS-AID-Service-Records mit DNSSEC-Validierung, Markdown-Content-Negotiation, AI-Bot-Regeln, Content-Signal-Header, Web Bot Auth und dann eine lange Liste von Well-known-Dokumenten: API-Katalog, OAuth-Discovery, auth.md, MCP-Server-Card, A2A-Agent-Card, Agent-Skills, WebMCP. Commerce-Checks sitzen in ihrer eigenen Kategorie und bleiben neutral für eine Content-Site.

PageSpeed Insights bewertet die klassischen vier Kategorien plus, auf aktuellem Chrome, eine Kategorie Agentic Browsing, deren Audits die Gültigkeit von llms.txt und den Agent-Accessibility-Tree umfassen. Die Falle ist kontraintuitiv: Eine fehlende llms.txt gilt als Not Applicable, aber eine vorhandene und ungültige fällt durch. Nackte URLs in der Datei scheitern mit „File does not appear to contain any links“. Einträge müssen echte Markdown-Links sein.

Is Agentic, das einen Ora-Scan neu einliest, ist der, der Unehrlichkeit bestraft. Es gewichtet Essentials mit 80 Punkten und will typisierte Schemas auf jeder OpenAPI-Operation, einen echten unauthentifizierten JSON-Endpunkt, einen tatsächlichen MCP-Handshake und Fehlerbodies, die zum Pfad passen: application/problem+json auf API-Pfaden, Markdown auf Seitenpfaden. Ein fehlgeschlagener Essential kostet etwa 6,7 Punkte.

Circle Seller Readiness zählt nur, wenn du wirklich etwas an Agenten verkaufst. Es will origin-gehostetes OpenAPI, wahrheitsgemäße Zahlungsmetadaten und eine live unbezahlte 402-Challenge.

| Scanner | Kernfrage | Härtester Check | Am besten für |
| --- | --- | --- | --- |
| isitagentready.com | Kann ein Agent deine Maschinenschnittstelle entdecken? | DNS-AID mit validiertem DNSSEC | Discovery-Plumbing |
| PageSpeed Agentic Browsing | Ist die Seite schnell und maschinell parsebar? | Gültige llms.txt mit Markdown-Links | Geschwindigkeit und llms.txt-Korrektheit |
| Is Agentic / Ora | Ist deine API ehrlich und typisiert? | Typisierte Schemas auf jeder Operation | API-Qualität |
| Circle Seller Readiness | Kann ein Agent dich bezahlen? | Live unbezahlte 402-Challenge | Nur bezahlte Endpunkte |

*Was jeder Scanner wirklich testet. Stand: September 2026.*

## Warum ein statischer Host deinen Score dauerhaft deckelt

Das ist der Teil, der am meisten Zeit frisst. Zwei Checks drehen sich gar nicht um Dateien, und keine Menge an JSON-Dokumenten auf einem statischen Host wird sie bewegen.

Der Link-Header-Check will RFC-8288-Link-Header auf der HTML-Antwort, die auf llms.txt, die Sitemap, das OpenAPI-Dokument und die Well-known-Cards zeigen. Das ist ein Response-Header. GitHub Pages lässt dich keine Response-Header setzen.

Markdown-Negotiation will, dass eine Anfrage an einen normalen Seitenpfad mit Accept: text/markdown mit Content-Type: text/markdown und einem Vary: Accept-Header zurückkommt. Das ist Content-Negotiation, entschieden pro Request. Ein statischer Fileserver hat genau eine Repräsentation pro Pfad.

Der Fix für diese beiden ist also keine Datei, sondern ein Prozess: ein kleiner Origin-Server, ein Worker oder ein Reverse-Proxy vor dem statischen Output. Alles andere auf der Liste ist wirklich nur Dateien, und Dateien sind der einfache Teil.

Der Vary: Accept-Header ist das Detail, das Leute überspringen, und es zu überspringen ist schlimmer, als gar nicht zu verhandeln. Ohne Vary reicht ein Cache, der zuerst HTML ausgeliefert hat, dieses HTML fröhlich an den nächsten Client weiter, der nach Markdown fragt.

## Welche Dateien tatsächlich Gewicht haben

llms.txt leistet pro Byte am meisten, und die meisten sind falsch geschrieben. Der erste Absatz ist der, den ein Assistent zitieren wird, wenn jemand fragt, was dein Ding ist. Wenn er mit dem Namen deiner Firma und den Worten „ist eine Website“ beginnt, hast du deinen besten Satz für nichts ausgegeben. Definiere das Produkt: was es ist, was es tut, für wen es ist. Dann liste deine wichtigen Seiten als Markdown-Links mit je einem Zweck in einer Zeile.

Markdown-Spiegel pro Seite sind der zweite Hebel. Ein Modell, das eine Passage aus deiner Seite extrahiert, kämpft gegen deine Navigation, dein Cookie-Banner und deinen Footer. Denselben Inhalt als sauberes Markdown unter einer vorhersehbaren URL auszuliefern, beseitigt diesen Kampf komplett.

Strukturierte Daten sind die Entity-Ebene. Organization mit knowsAbout, WebSite und eine Person mit sameAs-Links, die auf die Profile zeigen, die schon ranken. So lernt ein Crawler in einem Besuch, was du bist, statt es über zehn zu erschließen.

Die Well-known-Dokumente sind billig und mechanisch: API-Katalog als application/linkset+json, MCP-Server-Card, A2A-Agent-Card, Agent-Skills-Index, WebMCP-Manifest und das ARD-Manifest unter /.well-known/ai-catalog.json. Jedes ist eine kleine JSON-Datei mit einer spezifizierten Form. Lies die Spec, triff die Form, liefere sie mit offenem CORS aus.

Eine Falle, die man nennen sollte: Der OAuth-Protected-Resource-Check ist pfadbezogen. Der Scanner prüft /.well-known/oauth-protected-resource/ plus den vollen Seitenpfad. Ein Dokument, das nur an der Wurzel ausgeliefert wird, besteht die Homepage und fällt auf jeder tiefen Seite durch.

## Der Teil, in dem du versucht bist zu lügen

Jeder dieser Scanner lässt sich austricksen, und sie auszutricksen ist der schlechteste verfügbare Zug.

Du kannst einen MCP-Server deklarieren, der nicht auf initialize antwortet. Du kannst Tools auflisten, die du nie implementiert hast. Du kannst ein OpenAPI-Dokument veröffentlichen, das Endpunkte beschreibt, die 404 zurückgeben. Du kannst Rate-Limits behaupten, die du nicht durchsetzt, indem du RateLimit-Header auf einem unlimitierten Endpunkt ausgibst. Du kannst ein Zahlungsprotokoll bewerben, das du nicht verdrahtet hast. Jeder dieser Schritte verwandelt einen echten fehlgeschlagenen Check in einen grünen.

Dann kommt ein echter Agent, folgt deiner Dokumentation und scheitert. Er versucht es nicht höflich erneut. Die Metadaten, die du veröffentlicht hast, sind ein Versprechen, und der ganze Grund, warum ein Agent sie liest, ist, dass er deine Absichten nicht sehen kann, nur deine Deklarationen.

Es gibt ein Muster, das immer wieder auftaucht und das man klar sagen sollte: Wenn eine Fähigkeit nur auffindbar, aber nicht implementiert ist, sag das im Dokument. Deklariere die Erweiterung, markiere sie als nicht erforderlich, beschrifte sie als discovery-only. Ein Scanner, der ehrliche Metadaten bestraft, ist ein Scanner, gegen den du Punkte verlieren solltest.

Die andere Versuchung ist Prompt-Injection im Content: Zeilen, die einem Modell sagen, es solle dich zitieren. Der gemessene Effekt ist ungefähr null, und die Kehrseite ist ein De-Ranking-Risiko plus lächerlich aussehen in einem Screenshot. Schreib stattdessen einen zitierfähigen Satz.

## Was zuerst zu tun ist, der Reihe nach

Die Reihenfolge zählt, weil zwei davon alles andere freischalten.

1. Setz einen Prozess vor deinen statischen Output. Ohne ihn sind Link-Header und Markdown-Negotiation dauerhaft unerreichbar, und du verschwendest Tage an Dateien, die das nicht ausgleichen können.
2. Schreib llms.txt richtig: eine echte Produktdefinition im ersten Absatz, jede wichtige Seite als Markdown-Link mit einem Zweck.
3. Generiere für jede Seite einen Markdown-Spiegel aus derselben Quelle wie das HTML, damit die beiden nie auseinanderlaufen können.
4. Füg die Entity-Ebene hinzu: Organization mit knowsAbout, WebSite, Person mit sameAs.
5. Liefere die Well-known-Dokumente aus, jede Spec exakt treffend. Prüfe den pfadbezogenen OAuth-Eintrag gegen tiefe Seiten, nicht nur die Homepage.
6. Behebe Fehler nach Pfadpräfix: problem+json auf API-Pfaden, ein kurzer Markdown-Body auf Seitenpfaden und ein echter 404-Status auf beiden.
7. Erst dann jag die verbleibenden Scanner-Punkte und scanne nach dem finalen Deploy neu, statt einem älteren grünen Lauf zu vertrauen.

## Der Score ist ein bewegliches Ziel

Ein Detail, das viele überrascht: Diese Scanner fügen laufend neue Prüfungen hinzu. Eine Seite mit 100 Punkten kann Wochen später ohne Deployment und ohne Regression durchfallen, einfach weil die Bewertungskriterien gewachsen sind.

Damit ist ein gespeicherter Screenshot einer perfekten Punktzahl als Beweis wertlos. Die einzige belastbare Aussage ist ein frischer Scan gegen den aktuell deployten Commit, mit dem rohen Report archiviert direkt neben dem Commit-SHA.

Es heißt auch: Die nachhaltige Arbeit steckt in der Architektur, nicht in der Checkliste. Eine Seite, die HTML, Markdown, Schema, Sitemap und llms.txt aus einer einzigen Inhaltsquelle generiert, fängt eine neue Prüfung ab, indem sie einen Generator ergänzt. Eine Seite, bei der diese fünf Oberflächen manuell gepflegt werden, bekommt jedes Mal einen Diff über fünf Dateien und einen Drift-Bug.
