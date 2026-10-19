---
title: "Mein neuer Pair Programmer ist eine KI: Ein echter Workflow zum Bauen von Apps"
description: "Ich habe einen Tag lang eine iOS-App mit einem KI-Coding-Assistenten gebaut und repariert. Das ist der Workflow, den ich nutze, und wo er schiefgeht."
date: "2025-06-30T10:44:48.609Z"
updated: "2025-06-30"
lang: de
translated_from: "en/my-new-pair-programmer-is-an-ai-a-real-world-workflow-for-building-apps"
source_sections: ["from-prompt-to-push", "when-the-ai-gets-it-wrong", "from-coder-to-conductor", "what-i-learned"]
category: agents-ai
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Ich habe einen Tag lang eine iOS-App mit einem KI-Coding-Assistenten gebaut und repariert.", "Mein Loop ist ein markierter Screenshot, ein exakter Prompt in normalem Englisch, ein geprüfter Diff und ein Commit.", "Die KI repariert eine Sache und macht eine andere kaputt, bleibt in Loops hängen und verführt dich zu ungeplanten Features.", "Ich schreibe weniger Code und steuere mehr, bin mehr Architekt, Reviewer und QA-Mensch als Coder."]
sections: [{"basically": "Kreise den Bug auf einem Screenshot ein, beschreibe ihn exakt, prüfe den Diff, teste auf dem Handy, committe."}, {"basically": "Es ändert Dinge, um die du nicht gebeten hast, und bleibt hängen. Beobachte es die ganze Zeit und bleib beim Plan."}, {"basically": "Ich war früher stolz darauf, die Sprache des Computers zu sprechen. Jetzt sage ich ihm auf Englisch, was er tun soll."}, {"basically": "Sei exakt, nutze Screenshots, ein Chat pro Task, committe oft, und weiß, wann du es selbst schreiben musst."}]
---
Gerade reden alle über KI in der Softwareentwicklung. Man sieht Demos, in denen aus einem einzigen Prompt in wenigen Minuten eine ganze App entsteht. Aber wie sieht ein normaler Arbeitstag aus, wenn man mit diesen Tools baut? Wie kommt man von einem Bug zu einem Fix oder von einer Idee zu einem Feature, wenn derjenige, mit dem man am meisten zusammenarbeitet, eine KI ist?

Ich habe einen Tag damit verbracht, mit einem KI-Coding-Assistenten eine iOS-App zu bauen und zu fixen. Es war interessant, es war frustrierend, und am Ende habe ich viel geschafft. So sieht der Workflow wirklich aus, die guten Seiten, die schlechten Seiten und die Bugs.

## Vom Prompt zum Push

Meine Art, mit der KI zu arbeiten, ist inzwischen eine Schleife, die ich einfach immer wieder durchlaufe. Ich schreibe weniger Code und dirigiere mehr.

Schritt 1: hinsehen, einkreisen und der KI geben. Es beginnt mit einem Bug, den man sehen kann. In meiner App hat der „Add Money“-Button nicht funktioniert, aber ein ähnlicher „Top-up“-Button lief einwandfrei. Ich habe nicht zuerst den Code geöffnet. Ich habe auf meinem Handy einen Screenshot vom Bildschirm gemacht. Dann habe ich ein simples Bearbeitungstool genommen und den kaputten „Add Money“-Button und den funktionierenden „Top-up“-Button eingekreist, weil dieses Bild der KI eine Menge sagt.

Mein Handy ist mit meinem Computer verbunden, also kopiere ich den markierten Screenshot und füge ihn direkt in den Chat mit dem Assistenten ein. Die KI kann sehen, was ich meine.

Schritt 2: auf Deutsch beschreiben, was ich will. Meine Programmiersprache ist jetzt Deutsch. Ich schreibe einen klaren Prompt mit allen Details, die ich habe.

*„Auf dem Card View Screen: Wenn du auf den Add-Money-Button oben rechts tippst, kannst du bitte denselben Screen öffnen wie beim Tippen auf das Top-up-Icon unter der Karte? Ich habe beides auf dem Screenshot rot eingekreist.“*

Je genauer ich bin, desto besser wird das Ergebnis. Ich nenne den Screen (`Card View`), die Komponenten (`NuriHed`, `NuriButton`) und was passieren soll.

Schritt 3: die Änderungen anschauen, testen und committen. Die KI liest meine Anfrage und den Code, den sie schon hat, und zeigt mir dann, was sie ändern will, als Diff: Zeilen, die sie löscht, in Rot, und Zeilen, die sie hinzufügt, in Grün. Mein Job ist der des Senior Developers, der den Pull Request reviewt. Macht das Sinn? Sieht das richtig aus?

Wenn ja, akzeptiere ich es, baue die App neu und teste sofort auf meinem Handy. Diesmal hat der „Add Money“-Button einwandfrei funktioniert.

Und dann committe ich, das lasse ich nie aus. Ich sage der KI: `"Bitte committe und pushe das zu GitHub."` Git ist mein Sicherheitsnetz. Wenn die KI später etwas kaputt macht, kann ich immer zu einer Version zurück, die funktioniert hat.

## Wenn die KI es falsch macht

Das klingt smooth, aber es läuft fast nie in einer geraden Linie. Die KI ist stark, und sie macht auch viele Fehler.

Einmal habe ich sie gebeten, die vertikale Ausrichtung eines kleinen Chevron-Icons zu fixen. Sie hat die Ausrichtung gefixt, aber gleichzeitig die Größe der ganzen Karte auf diesem Screen geändert. Warum? Keine Ahnung. Vorerst konnte ich damit leben. Das passiert ständig: Du fixst eine Sache, und die KI ändert unterwegs eine andere. Man muss sie die ganze Zeit im Auge behalten.

Manchmal bleibt sie einfach hängen. Sie läuft in einer Schleife, versucht immer wieder dieselbe Änderung und scheitert. Ich habe erlebt, wie sie von ihren eigenen Tools verwirrt wurde und interne Fehler geworfen hat. Der alte IT-Trick hilft oft: Programm schließen und neu starten. Manchmal hilft es auch, zu einem anderen Modell zu wechseln, zum Beispiel von Gemini zu Claude 3 Opus, aber das kann mehr kosten.

Es ist auch leicht, sich in neuen Features zu verlieren, die gar nicht geplant waren. Ich hatte eine Nice-to-have-Idee: einen „Share“-Button auf einem QR-Code-Screen. Die KI hat ihn schnell gebaut. Aber er war nur halb fertig. Er hat die Adresse als Text geteilt, aber nicht das QR-Code-Bild selbst.

Das ist eine Falle. Ich habe Zeit für ein Feature verbraucht, das nicht auf meiner Roadmap stand und nicht mal funktioniert hat. Wenn es nur einen Satz kostet, etwas Neues anzufangen, ist es wichtiger denn je, beim Plan zu bleiben.

## Vom Coder zum Dirigenten

Die Arbeit mit einem KI-Assistenten hat verändert, wie ich zu Code stehe.

Früher war ich stolz darauf, die Sprache des Computers zu sprechen, und jetzt sage ich ihm auf Deutsch, was er tun soll. Ich baue weniger mit eigenen Händen. Ich bin eher der Architekt, der Reviewer und der QA-Mensch, alles in einem.

Früher mochte ich es, selbst eine perfekte Funktion zu schreiben, und jetzt mag ich es, ein starkes Tool zum gewünschten Ergebnis zu bringen. Es ist ein anderer Stolz, eher wie der eines Managers.

## Was ich gelernt habe

Wenn du mit einem KI-Pair-Programmer arbeiten willst, habe ich Folgendes gelernt: Sei sehr genau, denn vage Prompts liefern vage und oft falsche Ergebnisse. Nutze also Screen-Namen, Komponenten-Namen und klare Logik. Ein Bild ist oft mehr wert als 1.000 Zeilen Code, also nutze markierte Screenshots, wenn du kannst. Starte für jeden Bug oder jedes Feature einen neuen Chat, damit die KI sie nicht vermischt. Committe ständig, Git ist dein bester Freund, und wenn du funktionierende Änderungen oft committest, kannst du immer zurück.

Mach es erst funktional, dann hübsch. Bring es zuerst zum Laufen, und bitte die KI in einem zweiten Schritt, den Code oder die UI aufzuräumen. Und weiß, wann du aufhören musst. Wenn die KI bei einer Aufgabe mehr als ein paar Runden scheitert, kann es schneller sein, den Code selbst zu schreiben oder das Problem noch einmal zu durchdenken.

KI-Coding ist keine Magie. Es ist ein starkes Tool, das nicht perfekt ist, und man braucht neue Skills dafür. Man muss klar erklären, mit scharfem Blick reviewen und beim Plan bleiben. Es wird Entwickler nicht ersetzen, aber es ändert, was es heißt, einer zu sein.
