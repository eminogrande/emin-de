---
title: "Governance verstehen: Warum menschlicher Konsens schwieriger ist als Code"
description: "Bei Governance geht es darum, Konsens zwischen Menschen zu finden, und das ist schwieriger als Code. Warum Abstimmungen der letzte Ausweg sein sollten und warum Signaling und Delegation helfen."
date: "2025-12-06T18:50:02Z"
updated: "2025-12-06"
lang: de
translated_from: "en/governing-governance-why-human-consensus-is-harder-than-code"
source_sections: ["what-governance-actually-is", "voting-should-be-the-last-resort", "who-actually-participates", "many-or-few-experts-or-crowd", "liquid-democracy", "a-human-problem"]
category: bitcoin
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
image: "/media/governing-governance-why-human-consensus-is-harder-than-code/cover.webp"
tldr: ["Governance ist die Kunst, Konsens zwischen Menschen zu finden, und sie wird schwieriger, je größer die Gruppe ist.", "Abstimmen sollte der letzte Ausweg sein, nachdem Menschen zusammengesessen haben und versucht haben, eine Lösung zu finden.", "Signaling, delegiertes Abstimmen und klare Kommunikation sind wichtiger als Code."]
sections: [{"basically": "Governance bedeutet, Konsens zwischen Menschen zu finden. Beim Abendessen einfach, exponentiell schwieriger bei Skalierung."}, {"basically": "Ein Ergebnis von 51,9 % zu 48,1 % zeigt keinen Volkswillen. Es zeigt eine gespaltene Community."}, {"basically": "Forking spaltet das Netzwerk, also müssen wir fragen, wer wirklich teilnimmt: Nodes, User, Contracts."}, {"basically": "Miner wollen hohe Fees. User wollen null Fees. Wer hat recht?"}, {"basically": "Signalisiere, bevor du dich festlegst, und lass die Leute ihre Stimme delegieren und sofort zurücknehmen."}, {"basically": "Governance ist kein Software-Update. Sie ist menschliche Zusammenarbeit."}]
---
![](../../../media/governing-governance-why-human-consensus-is-harder-than-code/cover.jpg)

Ich verfolge die Blockchain-Szene jetzt schon eine ganze Weile, meistens eher beiläufig, weil ich in Berlin lebe. Wir haben hier eine riesige Menge an Aktivität gesehen, angefangen mit den frühen Tagen von Bitcoin, dann die Ethereum Foundation und unzählige Meetups. Durch dieses Umfeld bin ich tief in die Blockchain-Welt gerutscht.

Während wir viel Zeit damit verbringen, Protokolle zu entwickeln, gibt es ein Thema, das mehr Fragen aufwirft als Antworten liefert, aber absolut entscheidend ist, darüber zu sprechen. Governance.

## Was Governance eigentlich ist

Was ist Governance also eigentlich? Es ist einfach die Methode, Konsens zwischen Menschen zu finden.

Wir machen das ständig. Wenn wir ein Abendessen oder eine Konferenz organisieren, diskutieren wir über das Essen oder die Sitzordnung. In kleinen Gruppen ist das intuitiv. Aber je größer Gruppen werden, desto schwieriger wird der Konsens exponentiell. Selbst in massiven Governance-Systemen endet es oft damit, dass am Ende des Tages nur eine kleine Handvoll Leute tatsächlich die Entscheidungen trifft.

Wenn wir uns "klassische" Governance wie nationale Wahlen vorstellen, haben wir einige technische Anforderungen. Ich möchte, dass meine Stimme privat bleibt, wir brauchen also Geheimhaltung. Ich möchte wissen, dass meine Stimme gezählt wurde, wir brauchen also Überprüfbarkeit. Und wir brauchen Wahlberechtigung, damit niemand aus dem Nichts gefälschte Stimmen erzeugt.

Aber letztendlich versuchen wir nur herauszufinden, was alle denken. Und genau da fangen die Probleme an.

## Abstimmen sollte der letzte Ausweg sein

Manchmal liefern uns strikte Wahlsysteme Ergebnisse wie Brexit, 51,9% zu 48,1%.

Was sagt dir so ein Ergebnis eigentlich? Für mich repräsentiert das keinen "Volkswillen". Es sagt mir, dass wir keinen Plan haben, ob wir bleiben oder gehen sollten. Es sagt mir, dass die Gemeinschaft gespalten ist. Trotzdem nehmen wir so ein Ergebnis, akzeptieren es und verkaufen es als die absolute Entscheidung.

Ich habe Governance nicht gelöst, und ich glaube nicht, dass es bisher jemand geschafft hat. Aber ich glaube, eines ist klar. Abstimmen sollte der letzte Ausweg sein.

Eine einzelne Person hat einen klaren Willen. Eine Gruppe hat oft nur die Wahl zwischen A und B. Vielleicht sollte Abstimmen erst passieren, nachdem wir alle kollaborativen Ansätze ausgeschöpft haben, nachdem wir zusammengesessen, diskutiert und Energie darauf verwendet haben, eine Lösung zu finden. Wir sollten nicht direkt zu einer binären Abstimmung springen.

## Wer macht eigentlich mit

In der traditionellen Open-Source-Welt haben wir das Konzept des BDFL (Benevolent Dictator For Life). Das siehst du bei Linux, WordPress und Python.

Kürzlich ist Guido van Rossum, der Erfinder von Python, von seiner Rolle zurückgetreten, weil er die Community-Diskussionen nicht mehr ertragen konnte. Er hatte einfach genug vom Konflikt.

In Open Source kannst du das Projekt immer "forken" (kopieren und deinen eigenen Weg gehen), aber viele Leute wollen nicht forken. Es spaltet den Netzwerkeffekt. Jetzt, wo wir dezentrale Systeme bauen, müssen wir fragen, wer eigentlich mitmacht. Da ist die Infrastruktur, also die Nodes und Miner, die das Netzwerk sichern. Da sind die Nutzer, die Leute, die Anwendungen darauf bauen. Und da sind autonome Entitäten, Smart Contracts, die möglicherweise "Rechte" oder Interessen am Protokoll haben.

## Viele oder wenige, Experten oder Crowd

Wir haben uns verschiedene Wege ausgedacht, Stimmen in Blockchain zu gewichten, wie Proof of Stake (Vermögen = Macht) oder Proof of Work (Rechenleistung = Macht).

Eine große Frage, vor der wir stehen, ist, ob wir mehr Macht in die Hände der Vielen oder der Wenigen legen. Die Annahme ist oft, dass "Skin in the Game" (ein hoher finanzieller Einsatz) dich ehrlich und zum Wohle des Netzwerks handeln lässt. Aber stimmt das?

Selbst wenn du Ehrlichkeit annimmst, sind Interessen selten ausgerichtet. Miner wollen hohe Fees. Nutzer wollen null Fees. Wer hat Recht?

Dann gibt es das Thema Experten und Crowd. Was ist, wenn du eine Gruppe technischer Experten hast, die die mathematische Wahrheit kennen, aber die Nutzerbasis widerspricht? Wir sehen ähnliche Probleme in der Politik und auf Plattformen wie Reddit oder "Crypto Twitter", wo Propaganda und Einflusskampagnen Menschen in bestimmte Richtungen ziehen.

Oft wird Abstimmen zu einer Rivalität statt einer Suche nach der besten Lösung. Und viele Wähler verstehen nicht einmal, worüber abgestimmt wird.

## Liquid Democracy

Wie lösen wir das also? Ich glaube, die Antwort liegt in Liquid Democracy und besserer Kommunikation.

Der erste Teil ist Signaling statt Bindung. Wir sollten nicht immer sofort bindende Abstimmungen verwenden. Wir brauchen "Signaling", einen einfachen Weg für die Community, eine Meinung zu einem Vorschlag auszudrücken, ohne dass sofort Code ausgeführt wird. Das misst die Stimmung, bevor eine harte Entscheidung getroffen wird.

Der zweite Teil ist Delegated Voting. Wenn du Anteile oder Tokens besitzt, hast du eine Stimme. Aber du hast vielleicht nicht die technische Expertise (oder die Zeit), jedes Protokoll-Update zu studieren. Du solltest deine Stimme an einen Experten delegieren können, einen Entwickler oder einen Community-Leader, dem du vertraust. Und du solltest diese Delegation sofort zurückziehen können, wenn du mit ihren Entscheidungen nicht einverstanden bist.

Das löst auch ein Sicherheitsproblem. Du solltest nicht dein "Cold Storage" (sichere Ersparnisse) verwenden müssen, um abzustimmen. Du solltest eine Nachricht signieren können, die deine Stimmkraft an einen anderen Key delegiert, sodass du teilnehmen kannst, ohne deine Assets zu gefährden.

## Ein menschliches Problem

Wir verbringen Jahre damit, Technologie zu implementieren, Code zu schreiben und mathematische Beweise zu bauen. Aber Governance ist kein technisches Problem. Governance ist ein menschliches Problem.

Wenn wir uns nicht auf die "visuelle Ebene" konzentrieren, also die Interfaces, die Foren, die Bildung, werden dezentrale Projekte scheitern.

Vorschläge müssen klar geschrieben sein. Wir brauchen Diskussionsplattformen, wo Menschen Fragen stellen und echte Antworten bekommen können, nicht nur Propaganda. Damit ein Open-Source-Projekt sich selbst regieren kann, ist Transparenz der Schlüssel. Es ist nicht nur Code zu veröffentlichen, es ist auch der Prozess, die Roadmap und das "Warum" hinter den Entscheidungen zu erklären.

Wir haben es noch nicht gelöst, aber wir müssen aufhören, Governance wie ein Software-Update zu behandeln, und anfangen, es als menschliche Zusammenarbeit zu sehen.
