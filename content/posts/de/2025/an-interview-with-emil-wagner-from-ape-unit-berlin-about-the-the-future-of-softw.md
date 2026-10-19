---
title: "Ein Interview mit Emil Wagner von Ape Unit Berlin über die Zukunft der Softwareplanung mit KI"
description: "Ich spreche mit Emil Wagner von Ape Unit Berlin darüber, wie man Software plant, wenn Agenten den Code schreiben. Erst Meilensteine und Ziele, dann Tasks."
date: "2025-05-20T12:16:07.923Z"
updated: "2025-05-20"
lang: de
translated_from: "en/an-interview-with-emil-wagner-from-ape-unit-berlin-about-the-the-future-of-softw"
source_sections: ["from-task-lists-to-milestones", "what-tests-are-for", "briefing-the-agents", "let-the-system-interview-you", "dependencies-and-one-repository-for-everything"]
category: agents-ai
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Softwareplanung verschiebt sich vom Koordinieren von Entwicklern hin zum Orchestrieren von KI-Agenten.", "Emil Wagners Rat: Denk zuerst in auslieferbaren Meilensteinen und erst dann in Tasks.", "Agenten brauchen Akzeptanzkriterien, aktuelle Docs und ein Repository, das den ganzen Plan enthält."]
sections: [{"basically": "Teile das Projekt in Meilensteine auf, die jeweils ausgeliefert werden, dann schreiben sich die Tasks fast von selbst."}, {"basically": "Tests zwingen dich zu sagen, was der Code tun soll. Definiere sie zuerst und lass die KI den Rest schreiben."}, {"basically": "Gib den Agenten Meilensteine, Akzeptanzkriterien und die aktuellen Docs, sonst preschen sie blind voran."}, {"basically": "Ich will ein Tool, das mich interviewt und mir sagt, was schwer, einfach oder unmöglich zu bauen ist."}, {"basically": "Code, Meilensteine, ein Abhängigkeitsdiagramm und ein lebendes Doc können alle in einem Git-Repository liegen."}]
---
# Ein Interview mit Emil Wagner von Ape Unit Berlin über die Zukunft der Softwareplanung mit KI

Das ist ein Gespräch, das ich mit Emil Wagner von Ape Unit Berlin geführt habe, darüber, wie KI die Softwareplanung verändert. Wir fangen mit der klassischen Art an: Du zerlegst ein Projekt in kleine Aufgaben, findest die Abhängigkeiten und nutzt Docs und Google, wenn du auf ein Problem stößt. Dann schauen wir nach vorn, wo du KI-Agenten orchestrierst, die diese Aufgaben erledigen, und die brauchen klare Anweisungen und eine kontrollierte Umgebung, damit sie im Rahmen bleiben. Das Hauptthema: Der schwere Teil ist nicht das Schreiben des Codes. Es ist die Planung und das detaillierte Briefing der Features und Ziele davor, vielleicht aufgeteilt in Meilensteine oder eine Produkt-Roadmap, bevor du überhaupt zu einzelnen Aufgaben kommst.

## Von Aufgabenlisten zu Meilensteinen

### Emin Mahrt

Du hast viel Zeit mit Software Engineering verbracht, viel Hands-on-Arbeit. Stell dir jetzt vor, es gäbe überhaupt keine KI-Systeme. Du müsstest trotzdem ein Projekt planen. Du würdest Skills von verschiedenen Leuten zusammenbringen, und wenn es ans Bauen geht, würdest du die klassischen Rohmaterialien benutzen, die Dokumentation für die Packages und Services, die du verwenden willst. Und normalerweise würdest du... was machen wir immer noch? Wir suchen. Wir googlen, ob jemand schon denselben Fehler hatte. Unsere Hauptressourcen sind der Code selbst, die Docs, Google und natürlich das Wissen in den Köpfen der Kollegen.

Eine App zu planen heißt, du zerlegst alles in kleine Arbeitspakete, beschreibst sie klar und zeigst die Abhängigkeiten. Stimmt's? Manchmal hängt ein Deliverable wirklich von einem anderen ab.

Wenn ich nach vorn schaue, denke ich, die Zukunft des Programmierens ist Orchestrierung. Statt viele menschliche Entwickler zu koordinieren, orchestrierst du viele Agenten. Du gibst jedem Agenten eine enge Aufgabe und versuchst zu verhindern, dass er mehr macht als gefragt. Leute starten schon Sandbox-Umgebungen für jeden Agenten. Der Agent baut etwas und reicht einen Pull Request ein, und dann reviewed ihn jemand, ein Mensch oder ein Agent, und akzeptiert und merged ihn, oder lehnt ihn ab mit "Sorry, das ist out of scope."

Was ich nie wirklich gelernt habe, ist, wie man richtig gute Aufgaben schreibt. Eine gute Aufgabe zu schreiben fällt mir schwer. Ich habe das Mermaid-Diagramm, das du gesehen hast, nur gezeichnet, weil ich dachte, es könnte für mich einfacher sein, die App erst visuell zu designen, nur um die Verbindungen zu sehen. Aber am Ende bin ich sicher, wir könnten das Ganze schon bauen, solange wir es auf hohem Level verstehen und in ein richtig gutes Briefing zerlegen. Was die App ist, wie sie funktioniert, was sie tut und was sie nicht tut. Ich sage das seit Jahren, dass das die eigentliche Arbeit ist. Nicht das Bauen, sondern sich zu zwingen, die Features zu spezifizieren.

Hast du praktische Tipps, Dinge, die auch mit echten menschlichen Teams gut funktioniert haben? Wie machst du die Planungsphase, und die Aufgabenplanung? Idealerweise will ich eine saubere Aufgabenliste.

### Emil Wagner

Bevor ich zu einzelnen Aufgaben komme, versuche ich, das Projekt in Etappen zu teilen. Nenn sie Meilensteine, oder nenn es eine Produkt-Roadmap. Den Weg zu teilen gibt dir Priorisierung gratis, welche Features früh wichtig sind und welche später kommen können. Es hilft auch den Leuten. Wenn du auf den Gipfel da oben zeigst, können sich die meisten Devs nicht vorstellen, wie sie jemals dahin kommen sollen. Zerleg es in Ziele, die konkret und erreichbar sind, und plötzlich fühlt es sich machbar an.

Nimm Tidy. Bei dem Produkt haben wir mit einer Continuous-Operation-Idee gearbeitet. Jede einzelne Version musste deploybar sein und musste funktionieren. Vielleicht hat sie sehr wenig gemacht, aber sie lief in Production. Der Ansatz ist nützlich. Version 1 shipped vielleicht nur ein oder zwei Features, aber alles drumherum ist komplett. Wenn du eine Mobile App baust, würdest du sagen, jede Version muss in den App Store oder Google Play shippable sein, auch wenn Funktionalität fehlt.

Also lange bevor ich Aufgaben schreibe, beschreibe ich Ziele für jeden Meilenstein. Sobald die klar sind, ist es viel einfacher, die Ziele in Aufgaben zu zerlegen. Du fragst, was getan werden muss, damit Meilenstein 1 wahr ist. Denk an Wallet Version 1. Vielleicht kann sie nur eine Transaktion senden und empfangen. Version 2 fügt Social Recovery hinzu. Version 3, und so weiter. Danach können Leute oft ihre eigenen Aufgaben schreiben, und das ist großartig, weil sie sie besser verstehen und du Missverständnisse vermeidest.

## Wofür Tests da sind

### Emin Mahrt

Was ist mit Tests?

### Emil Wagner

Alles muss gemacht werden, nur nicht immer von derselben Person. In einem größeren Team könnte sich jemand auf Acceptance Tests konzentrieren und jemand anders auf Unit Tests. Gute Tests halten Qualität und Wartbarkeit unter Kontrolle, und sie zwingen dich zu sagen, was der Code tun soll.

Ein großer Vorteil, besonders in großen Teams, ist shared Understanding. Tests, Code Reviews und Docs sind alle Tools, um Wissen zu teilen.

Ich habe auch über einen Ansatz gelesen, wo du nur die Tests definierst und eine KI den ganzen Code schreiben lässt, der nötig ist, um sie zu bestehen. Zum Beispiel, wenn eine Transaktion gebroadcastet wird, muss die API einen Transaction Hash zurückgeben, und wenn nicht, ist etwas kaputt und du gehst nachschauen. Du schreibst am Ende mehr Tests als normalerweise, aber das Prinzip ist solide.

## Die Agenten briefen

### Emin Mahrt

Sagen wir, Leute wie du und ich werden Software-Dirigenten. Du bist viel tiefer im Kaninchenbau als ich, und wenn du ein technisches Briefing schreibst, werden die Agenten wahrscheinlich genau das tun, was du willst. Ich neige dazu, in natürlicher Sprache zu schreiben, und die Agenten werden kreativ auf Arten, um die ich nicht gebeten habe.

### Emil Wagner

Warum stellst du das Briefing nicht mit ChatGPT zusammen? Zerleg es Schritt für Schritt damit. Du bekommst so einen guten Start.

### Emin Mahrt

Ich habe das ein paar Mal versucht. Gerade denke ich darüber nach, eine Markdown-Datei mit Meilensteinen und Aufgaben zu machen, oder vielleicht besser Deliverables. Ich finde noch heraus, was genau da reingehört.

### Emil Wagner

Vielleicht liste nicht jede Aufgabe dort auf. Pack die Meilensteine rein, die Deliverables für jede Iteration, und füge Acceptance Criteria hinzu. Je mehr Kontext du gibst, desto besser der Output deiner Agenten. Large Language Models stürmen gerne voran, ohne das neueste released Package oder die aktuellen Docs zu lesen, also musst du sie zurückholen und sagen, schau, hier ist die tatsächliche API-Referenz, lies sie.

Copy und Paste der relevanten Docs direkt rein hilft viel.

## Lass dich vom System interviewen

### Emin Mahrt

Ich hätte gern eine Blaupause, die zeigt, was ein Gründer, oder eigentlich jeder, vorbereiten muss, damit später, egal ob Mensch oder Maschine, das Ganze sauber gebaut werden kann.

Früher hat man mit dem Kunden geredet, aus ihm herausgekitzelt, was er wirklich will, das an die Entwickler weitergegeben und gehofft, dass alle dasselbe verstanden haben. Heute, ob bei diesen KI-Game-Buildern oder Apps wie Llama, Replit oder was auch immer, führt dich niemand wirklich durch ein strukturiertes Interview, um alle Inputs einzusammeln.

Idealerweise will ich vom System interviewt werden, damit es genau aus mir herausquetscht, was es braucht. Und dann sagt es mir, dieser Teil ist schwer, dieser Teil ist einfach, dieses Feature bräuchte eine Datenbank, und weil wir keine haben, lassen wir es weg. Das habe ich gestern tatsächlich in einem Tool gesehen, das ich gebaut habe. Es hat ein Feature abgelehnt, weil wir keine Datenbank hatten. Das fand ich großartig und habe sofort Credits für 25 Dollar gekauft, um weiterzutesten.

Nimm diese VS-Code-Erweiterung, TaskMaster. Die hat schon tausende Installationen. Ihre einzige Aufgabe ist es, Tasks zu erstellen und dann darauf zu achten, dass die KI nichts über diese Tasks hinaus macht. Sie versprechen, dass die KI nichts baut, was du nicht angefragt hast, und dass sie gegen Endlosschleifen schützen.

Aber ich könnte das so viel besser machen, wenn ich dein Wissen hätte. Klar, alles ändert sich jede Woche.

### Emil Wagner

Versuch, das Ganze aufzubrechen, bevor du überhaupt zu Tasks kommst. Denk zuerst an die Produkt-Roadmap. Was muss Version 0.1 der App können? Fang mit dem einfachsten Teil an. Vielleicht kann sie eine Transaktion senden und empfangen. Keys müssen generiert werden, okay. Die nächste Version bringt Social Recovery. Iteriere. Einige deiner Diagramme decken viel Backend-Klempnerei ab, das Zusammenflicken verschiedener Services. Vielleicht behandelst du das als separate Schritte, erst Backend-Funktionalität, dann UI, dann weitere Features.

## Abhängigkeiten und ein Repository für alles

### Emin Mahrt

Wenn du rauszoomst, hängen Meilensteine auch von anderen Dingen ab. Wenn das hier kaputt geht, kennst du den Dominoeffekt schon. Es ist wie ein Bitcoin-Soft-Fork. Du willst nicht, dass Bestehendes ausfällt, du willst nur neue Fähigkeiten hinzufügen. Manchmal brauchst du einen Hard Fork, aber nur, wenn du bereit bist, die Abwärtskompatibilität zu brechen.

Ich stelle mir Tasks als Puzzleteile im größeren Projekt vor, jedes mit Abhängigkeiten. Eine Task-Spezifikation sollte sagen, was sie tut, aber auch, wo sie sitzt, welche Teile sie berührt, von welchen APIs sie abhängt und wo die Fachdokumente sind.

Im Moment sind viele Leute noch chaotisch. Sie werfen der KI alles Mögliche hin und schauen, was kleben bleibt, statt sich hinzusetzen und richtig zu planen. Ich würde gern mal eine richtige Planungssession mit dir machen, vielleicht an einem kleinen Nebenprojekt, einfach um eine saubere Pipeline zu bauen.

### Emil Wagner

Auf jeden Fall. Es ist normal, erst mal ein bisschen chaotisch anzufangen und dann zu sortieren. Ich würde mich weniger auf einzelne Tasks konzentrieren und mehr auf die übergeordnete Struktur. Sobald du die Roadmap hast, kann ein Agent sogar fragen, welche Tasks er braucht, um Milestone 1 zu erreichen, und seine eigene To-do-Liste schreiben.

Und ja, du hast immer Abhängigkeiten und das Risiko, dass sich Devs gegenseitig auf die Füße treten. Deshalb haben wir Versionskontrolle und Branches. Aber du könntest wirklich auf ein Git-Repository abzielen, das alles enthält. Den Code, ein README mit den Meilensteinen, ein Mermaid-Diagramm der Abhängigkeiten und sogar ein lebendes Dokument, das von den Agenten generiert wird, weil das per Hand aktuell zu halten eine Qual ist.

### Emin Mahrt

Cool. Super interessant. Danke für deine Zeit.
