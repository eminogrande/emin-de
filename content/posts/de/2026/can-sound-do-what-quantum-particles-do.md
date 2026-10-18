---
title: "Kann Schall das, was Quantenteilchen können?"
description: "Schall beugt sich, breitet sich aus und interferiert wie Elektronen im Doppelspalt. Ist Schall also Quantenphysik? Wo der Vergleich funktioniert und wo er bricht."
date: "2026-10-13"
updated: "2026-10-13"
lang: de
translated_from: "en/can-sound-do-what-quantum-particles-do"
source_sections: ["the-question-i-kept-coming-back-to", "what-sound-is", "sound-does-everything-a-wave-does", "why-size-matters", "the-double-slit-with-two-speakers", "the-double-slit-with-electrons", "two-kinds-of-wave", "looking-changes-an-electron-not-a-sound", "the-measurement-problem", "the-observer-is-not-a-mind", "phonons-the-quantum-of-sound", "why-speakers-cant-build-a-quantum-computer", "what-i-take-from-it"]
category: science
format: explainer
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["physics", "quantum mechanics", "sound", "double slit", "phonons"]
source_links: [{"title": "Young's fringes with sound waves (IOPSpark)", "url": "https://spark.iop.org/youngs-fringes-sound-waves", "note": "The two-speaker double slit as a classroom experiment."}, {"title": "Diffraction through slits (Salford Acoustics)", "url": "http://salfordacoustics.co.uk/sound-waves/diffraction/diffraction-through-slits", "note": "Sound through two slits and Young's fringes for sound."}, {"title": "The Nature of Sound (The Physics Hypertextbook)", "url": "https://physics.info/sound/"}, {"title": "Why does a double slit with sound never give complete destructive interference?", "url": "https://physics.stackexchange.com/questions/183399/why-does-a-double-slit-experiment-with-sound-waves-never-result-in-complete-dest"}, {"title": "What is the difference between quantum and classical interference?", "url": "https://physics.stackexchange.com/questions/225797/what-is-the-difference-between-quantum-and-classical-interference"}, {"title": "The Measurement Problem (John D. Norton, University of Pittsburgh)", "url": "https://sites.pitt.edu/~jdnorton/teaching/HPS_0410/chapters/quantum_theory_measurement/index.html"}, {"title": "Philosophical Issues in Quantum Theory (Stanford Encyclopedia of Philosophy)", "url": "https://plato.stanford.edu/entries/qt-issues/"}, {"title": "The Role of Decoherence in Quantum Mechanics (Stanford Encyclopedia of Philosophy)", "url": "https://plato.stanford.edu/entries/qm-decoherence/"}, {"title": "Observer effect (physics), Wikipedia", "url": "https://en.wikipedia.org/wiki/Observer_effect_(physics)", "note": "Why the observer is a physical interaction, not a mind."}, {"title": "Phonon (Britannica)", "url": "https://www.britannica.com/science/phonon"}, {"title": "Quantum Erasure Using Entangled Surface Acoustic Phonons (Phys. Rev. X)", "url": "https://link.aps.org/doi/10.1103/PhysRevX.10.021055", "note": "Entangled phonons and a quantum eraser on a chip."}, {"title": "Quantum Acoustics with Multimode Surface Acoustic Wave Cavities (JILA thesis)", "url": "https://jila.colorado.edu/sites/default/files/2024-05/SlettenThesis.pdf"}, {"title": "New device opens door to storing quantum information as sound waves (Caltech)", "url": "https://www.caltech.edu/about/news/new-device-opens-door-to-storing-quantum-information-as-sound-waves"}, {"title": "The Classical-Quantum Limit (PRX Quantum)", "url": "https://link.aps.org/doi/10.1103/PRXQuantum.5.020331"}, {"title": "If quantum speed-up is due to the wave-like nature of quantum mechanics, why not just use regular waves?", "url": "https://quantumcomputing.stackexchange.com/questions/2595/if-quantum-speed-up-is-due-to-the-wave-like-nature-of-quantum-mechanics-why-not"}]
tldr: ["Schall beugt sich, breitet sich aus und interferiert wie jede Welle, und das Doppelspaltexperiment kannst du mit zwei Lautsprechern machen.", "Der Doppelspalt testet also, ob etwas eine Welle ist, nicht ob es Quantenphysik ist.", "Der Quantenanteil sind zufällige Einzeltreffer, Wahrscheinlichkeitsamplituden, Kollaps beim Messen und Verschränkung.", "Schall wird nur als Phononen in kalten Festkörpern quantenhaft, und klassische Wellen können kein Quantencomputing."]
sections: [{"basically": "Ich wollte wissen, ob sich Schallwellen wie Quantenteilchen verhalten, und die Antwort ist ja und nein."}, {"basically": "Schall ist eine Druckwelle in einem Medium, und die klassische Physik sagt exakt vorher, was er als Nächstes tut."}, {"basically": "Schall reflektiert, beugt sich, breitet sich um Ecken und interferiert, er hat also jedes klassische Wellenverhalten."}, {"basically": "Schall beugt sich um Türen, weil seine Wellenlänge Meter lang ist, während Licht und Elektronen winzige Spalte brauchen."}, {"basically": "Zwei Lautsprecher mit demselben Ton erzeugen laute und leise Stellen im Raum, das Doppelspaltmuster in Schall."}, {"basically": "Einzelne Elektronen landen als Punkte, bauen über Zeit Streifen auf, und die Streifen verschwinden, wenn du den Weg prüfst."}, {"basically": "Eine Schallwelle ist Luftdruck, eine Quantenwelle ist eine Wahrscheinlichkeitsamplitude, und nur das macht Einzeltreffer zufällig."}, {"basically": "Eine Schallwelle zu messen stört sie ein bisschen, aber den Weg eines Elektrons zu prüfen löscht die Interferenz aus."}, {"basically": "Quantenphysik kann nicht erklären, wie eine Messung ein Ergebnis auswählt, und klassischer Schall hat dieses Problem nie."}, {"basically": "Der Beobachter in der Quantenphysik ist jeder Detektor oder jede Umgebung, die Weginformationen aufnimmt, kein menschlicher Geist."}, {"basically": "Phononen sind quantisierter Schall in Festkörpern und zeigen echtes Quantenverhalten, aber nur in kalten, kontrollierten Laboren."}, {"basically": "Schall kann Wellen mischen, aber ohne Verschränkung erreicht er nicht den riesigen Zustandsraum, den ein Quantencomputer nutzt."}, {"basically": "Schall kopiert die Streifen des Doppelspalts, aber Zufall, Kollaps und Verschränkung bleiben rein quantenhaft."}]
---
## Die Frage, zu der ich immer wieder zurückkam

Ich hatte eine Weile eine einfache Frage im Kopf. Schall ist eine Welle. Licht ist eine Welle, und Elektronen verhalten sich auch wie Wellen. Jeder kennt das Doppelspaltexperiment, bei dem Elektronen Streifen auf einem Schirm erzeugen und die Streifen verschwinden, sobald man nachschaut, welchen Spalt sie genommen haben. Kann Schall also dasselbe? Können Schallwellen dasselbe Verhalten zeigen wie Quantenobjekte, mit Interferenz und mit diesem seltsamen Effekt der Beobachtung?

Ich bin tief eingestiegen, und die kurze Antwort lautet ja und nein. Schall macht viel von dem, was Quantenwellen tun. Aber der Teil, der Quantenphysik zur Quantenphysik macht, ist genau der Teil, den Schall nicht kann. Hier ist, wo diese Grenze verläuft.

## Was Schall ist

Schall ist eine mechanische Welle. Er braucht etwas, durch das er sich ausbreiten kann, wie Luft oder Wasser oder einen Festkörper, und deshalb gibt es im Vakuum keinen Schall. Eine Lautsprechermembran oder ein Klatschen drückt die Luftmoleküle daneben zusammen, dann breiten sie sich wieder aus, und dieses Muster aus verdichteter und verdünnter Luft bewegt sich nach außen. Die Moleküle selbst fliegen nicht zu deinem Ohr. Sie schwingen nur um ihren Platz hin und her, und nur die Störung wandert.

Eine Schallwelle hat eine Wellenlänge, den Abstand von einer Verdichtung zur nächsten. Sie hat eine Frequenz, wie viele davon pro Sekunde vorbeikommen, und das hören wir als Tonhöhe. Menschen hören ungefähr von 20 Hz bis 20.000 Hz. Sie hat eine Amplitude, wie stark der Schub ist, und das hören wir als Lautstärke. Und sie hat eine Geschwindigkeit, die vom Medium abhängt. In Luft bei Raumtemperatur bewegt sich Schall mit etwa 343 Metern pro Sekunde, in Meerwasser mit etwa 1.531.

Das Wichtige für meine Frage ist, dass all das klassische Physik ist. Wenn du die Quelle und das Medium kennst, kannst du exakt berechnen, was die Welle als Nächstes tun wird. Nichts daran ist zufällig.

## Schall macht alles, was eine Welle macht

Schall reflektiert. Das ist ein Echo, und so findet Sonar Dinge unter Wasser. Schall bricht sich, er biegt sich also, wenn die Luft wärmer oder kälter wird oder wenn sich der Wind ändert, und eine Stimme kann mit dem Wind weiter tragen. Schall beugt sich, er biegt um Ecken und breitet sich hinter einer Türöffnung aus, und deshalb kannst du jemanden im Nebenzimmer hören, ohne ihn zu sehen. Tiefe Töne beugen sich leichter als hohe, weshalb ferner Donner nur ein tiefes Grollen ist.

Und Schall interferiert. Wenn zwei Schallwellen aufeinandertreffen und ihre Wellenberge übereinstimmen, addieren sie sich und es wird lauter. Wenn der Berg der einen auf das Tal der anderen trifft, löschen sie sich aus und es wird leiser, theoretisch bis zur Stille. Zwei Töne mit fast gleicher Tonhöhe werden in einem langsamen Rhythmus lauter und leiser, und das nennt man Schwebungen.

Schall hat also das ganze Set, und die alte klassische Wellenphysik erklärt jeden Teil davon.

## Warum die Größe wichtig ist

Was du siehst, hängt stark von der Größe der Welle ab. Ein 100-Hz-Ton in Luft hat eine Wellenlänge von etwa 3,4 Metern, ein 10-kHz-Ton etwa 3,4 Zentimeter. Das ist die Größe von Türen, Räumen, Möbeln und Menschen. Schall beugt sich also ständig um unsere Alltagswelt, und wir hören Dinge, die wir nicht sehen können.

Sichtbares Licht hat Wellenlängen von etwa 400 bis 700 Nanometern. Um Licht zu beugen und interferieren zu lassen, braucht man winzige Spalte, die mit viel Präzision gemacht sind, und deshalb geht Licht im Alltag nicht um Ecken. Elektronen haben auch eine Wellenlänge, und in den üblichen Experimenten ist sie etwa so groß wie der Abstand zwischen Atomen in einem Kristall.

Dasselbe Wellenverhalten zeigt sich also auf völlig unterschiedlichen Skalen. Schall macht es im Wohnzimmer, Elektronen machen es auf der Skala von Atomen. Das allein sagt dir nichts über Quanten oder nicht Quanten. Es ist nur Wellenlänge.

## Der Doppelspalt mit zwei Lautsprechern

Man kann den Doppelspalt wirklich mit Schall machen, und es ist eine klassische Demonstration im Unterricht. Ein Weg ist eine Wand mit zwei Öffnungen. Der einfachere Weg sind zwei Lautsprecher, die vom selben Signalgenerator angesteuert werden, sodass beide denselben Ton im Gleichschritt spielen. Ein typischer Aufbau stellt sie etwa einen halben Meter auseinander und spielt etwas um die 2.000 Hz.

Dann gehst du langsam quer durch den Raum davor. Du hörst laute Stellen und leise Stellen, eine nach der anderen. Das sind dieselben hellen und dunklen Streifen, die Thomas Young mit Licht gesehen hat, und man nennt sie Youngsche Streifen für Schall. Mit einem Mikrofon und einem Messgerät kannst du das Muster exakt aufzeichnen. Genau in der Mitte, im gleichen Abstand von beiden Lautsprechern, ist es laut.

In einem normalen Raum wird es unübersichtlich, weil die Wände den Schall reflektieren und weitere Wellen darüberlegen. Draußen oder in einem schalltoten Raum funktioniert es am besten. Und man bekommt fast nie perfekte Stille an den leisen Stellen, weil die beiden Wellen nicht mit exakt gleicher Stärke ankommen.

## Der Doppelspalt mit Elektronen

Jetzt die Quantenversion. Eine Quelle schickt einzelne Photonen oder einzelne Elektronen, eines nach dem anderen, auf eine Wand mit zwei schmalen Spalten. Dahinter ist ein Schirm, der aufzeichnet, wo jedes einzelne landet.

Jedes einzelne Elektron kommt als ein Punkt an einer Stelle an. Aber wenn man viele davon schickt, beide Spalte offen hält und nicht nachschaut, welchen Spalt sie benutzt haben, bauen die Punkte langsam Streifen auf. Es ist dieselbe Art von Interferenzmuster wie bei Schall. Und sie können nicht miteinander interferieren, weil sie einzeln kommen. Jedes Elektron geht irgendwie als Welle durch beide Wege und landet als Teilchen.

Dann setzt man einen Detektor an die Spalte, um herauszufinden, welchen Weg jedes Elektron genommen hat. Die Streifen sind weg. Man bekommt zwei schlichte Bänder hinter den beiden Spalten, so wie man es bekommen würde, wenn man kleine Kugeln hindurchschießt.

## Zwei Arten von Welle

Hier habe ich verstanden, dass der Doppelspalt ein Test für Wellen ist und kein Test für Quanten. Young hat ihn Anfang des 19. Jahrhunderts mit Licht gemacht, um zu zeigen, dass Licht eine Welle ist, lange bevor irgendjemand über Quantenphysik gesprochen hat. Schall, Wasser und Licht erzeugen alle dieses Streifenmuster. Wenn du Streifen siehst, hast du gelernt, dass etwas wellenförmig ist, und das ist alles, was du gelernt hast.

Der wirkliche Unterschied ist, was da schwingt. Beim Schallexperiment ist es der Luftdruck, etwas Physikalisches, das man an jedem Punkt messen kann. Die Lautstärke an einer Stelle ist einfach die Summe der beiden Wellen. Beim Quantenexperiment ist die Welle die Wellenfunktion, und sie ist kein physikalisches Ding, das sich durch ein Medium bewegt. Sie ist eine Wahrscheinlichkeitsamplitude. Sie sagt dir, wie wahrscheinlich es ist, das Elektron an einer bestimmten Stelle zu finden. Die Regel dafür heißt Bornsche Regel, und sie besagt, dass man die Größe der Welle an einer Stelle nimmt und quadriert, und das ergibt die Wahrscheinlichkeit. Die Streifen kommen daher, dass sich die Amplituden der beiden Wege addieren, und sie zeigen sich erst nach vielen einzelnen Treffern.

Die Wellenfunktion selbst ändert sich glatt und vorhersehbar, solange niemand misst, nach der Schrödingergleichung. Aber wo ein einzelnes Elektron landet, ist zufällig. Experimente, die die sogenannten Bellschen Ungleichungen verletzen, deuten darauf hin, dass diese Zufälligkeit echt ist und nicht nur fehlendes Wissen, es gibt also keine verborgenen lokalen Details, die wir nur noch nicht gefunden haben.

## Hinsehen verändert ein Elektron, nicht einen Ton

Angenommen, du versuchst herauszufinden, durch welchen Spalt der Ton gegangen ist. Du platzierst ein Mikrofon nahe an einen Spalt. Das Mikrofon nimmt ein wenig Energie von der Welle auf und streut ein bisschen davon, und das Muster dahinter verändert sich leicht. Aber der Ton ist immer noch eine Schallwelle. Weiter weg interferiert er immer noch, und an seinem Wesen hat sich nichts geändert.

Es ist wie das Prüfen des Reifendrucks bei einem Auto. Es entweicht immer ein wenig Luft, also veränderst du das, was du misst. Das ist auch ein Beobachtereffekt, aber ein langweiliger, klassischer. Du kannst ihn berechnen, und mit einem besseren Instrument kannst du ihn verkleinern.

Beim Elektron ist das anders. Sobald du die Information darüber erhältst, welchen Weg es genommen hat, verschwinden die Streifen komplett. Das ist kein ungeschickter Detektor, der das Elektron zu fest anstößt. Es ist an die Information selbst gebunden. Heisenbergs Unschärferelation setzt eine harte Grenze dafür, wie genau man manche Paare von Dingen gleichzeitig wissen kann, wie etwa Ort und Impuls. In der Quantenphysik gibt es eine minimale Störung, die man nicht wegkonstruieren kann.

## Das Messproblem

Die Quantenphysik hat zwei Regeln dafür, wie sich ein Zustand ändert, und die passen nicht zusammen. Wenn niemand misst, entwickelt sich die Wellenfunktion glatt, man könnte sie rückwärts laufen lassen, und Superpositionen bleiben Superpositionen. Wenn man misst, erhält man ein Ergebnis, das zufällig nach den Wahrscheinlichkeiten der Bornschen Regel ausgewählt wurde, und der Zustand springt auf dieses Ergebnis um. Die Leute nennen das den Kollaps. Er ist plötzlich und kann nicht rückgängig gemacht werden.

Die Schrödinger-Gleichung enthält den Kollaps nicht, und der Kollaps bricht ihre Regeln. Die Theorie sagt auch nicht, was als Messung zählt oder wo das Quantensystem aufhört und das Messgerät anfängt. Diese Lücke ist das Messproblem, und Physiker streiten sich immer noch darüber. Die Kopenhagener Deutung akzeptiert den Kollaps als Regel. Viele-Welten sagt, dass es überhaupt keinen Kollaps gibt. Die Bohmsche Mechanik fügt verborgene Variablen hinzu. Objektive Kollapstheorien wie GRW machen den Kollaps zu einem realen physikalischen Prozess.

Dekohärenz erklärt einen Teil davon. Ein Quantensystem berührt ständig seine Umgebung, Luftmoleküle und Licht und alles andere, und verschränkt sich damit. Allein vom System aus betrachtet verblasst die Interferenz schnell und es beginnt, klassisch auszusehen. Das ist ein großer Grund dafür, warum wir niemals große Dinge gleichzeitig an zwei Orten sehen. Aber Dekohärenz erklärt nicht, warum man dieses eine Ergebnis bekommt und nicht das andere.

Schall hat nichts dergleichen. Eine Schallwelle hat die ganze Zeit über eindeutige Eigenschaften, und das Messen enthüllt sie nur, vielleicht mit einer kleinen Störung.

## Der Beobachter ist kein Geist

Das Wort Beobachter verwirrt viele Leute. Populäre Geschichten machten daraus die Idee, dass das Bewusstsein die Realität erschafft, dass das Elektron entscheidet, weil ein Mensch hinsieht. Einige frühe Diskussionen um von Neumann und Wigner gingen in diese Richtung. Aber die Physik braucht keine Person. Der Beobachter ist jedes physikalische System, das mit dem Elektron interagiert und die Information über den Weg entnimmt. Ein Detektor in einem leeren Raum tut es, und die Umgebung tut es auch.

Ich denke, Messinteraktion wäre ein besseres Wort als Beobachter. Es ist ein physikalischer Prozess, kein mentaler, und das alte Wort nährt weiterhin eine Menge esoterischen Schwachsinns über Quantenphysik.

## Phononen, das Quant des Schalls

Es gibt einen Ort, an dem Schall wirklich quantenhaft wird, und das ist in Festkörpern. In einem Kristall sitzen die Atome in einem Gitter und schwingen gemeinsam. Die Quantenphysik sagt, dass diese Schwingungsenergie in kleinen, festen Paketen daherkommt, und ein Paket nennt man Phonon. Der Name kommt vom griechischen Wort für Ton. Ein Phonon verhält sich zum Schall in einem Kristall wie ein Photon zum Licht. Es ist kein Elementarteilchen wie ein Elektron, es ist ein Quasiteilchen, eine geteilte Schwingung vieler Atome. Lange Phononenwellen sind einfach die gewöhnlichen Schallwellen in diesem Festkörper.

Und Phononen leisten die echten Quantendinge. Forscher haben einzelne Phononen erzeugt, in Superposition gebracht, Interferenz zwischen Phononenpfaden gezeigt, Phononen verschränkt und sogar einen Quantenradierer mit ihnen betrieben. Dafür koppeln sie die Phononen an supraleitende Qubits auf einem Chip und kühlen alles auf kryogene Temperaturen ab, damit zufällige Hitzeschwingungen den Effekt nicht auswaschen.

Also ja, Schall kann Quantencharakter haben. Aber nur als Phononen, in einem Festkörper, im Labor, bei extremer Kälte. Der Schall in der Luft deines Wohnzimmers ist eine klassische Druckwelle, und die klassische Physik beschreibt ihn fast perfekt. Phononen könnten später noch wichtig werden, als eine Möglichkeit, Quanteninformation zu speichern und zwischen supraleitenden Schaltkreisen und Licht zu bewegen.

## Warum Lautsprecher keinen Quantencomputer bauen können

Das Nächste, was ich mich fragte, war, warum niemand einen Computer aus Lautsprechern baut, wenn ein Quantencomputer auf Superposition und Interferenz läuft und Schall beides hat.

Die Antwort ist die Größe des Raums, in dem die Maschine arbeitet. Mit n Qubits arbeitet ein Quantencomputer in einem Raum von 2 hoch n Zuständen, also verdoppelt ihn jedes zusätzliche Qubit. Superposition erlaubt ihm, diesen ganzen Raum zu nutzen, und Verschränkung verbindet die Qubits miteinander. Viele Quantenalgorithmen brauchen diese Verknüpfung.

Klassische Wellen können sich addieren, und man kann viele Frequenzen in einem Ton mischen. Aber um exponentiell viele Zustände aus einem klassischen Wellensystem zu bekommen, bräuchte man exponentiell mehr von irgendetwas Physischem, wie immer höhere Frequenzen oder immer mehr Energie. Lautsprecher hinzuzufügen lässt es nur langsam wachsen. Klassische Wellen haben auch keine Verschränkung zwischen getrennten Teilen und keine Interferenz von Wahrscheinlichkeitsamplituden. Und die Quantenfehlerkorrektur hängt von Quanteneigenschaften und Messungen ab, die ein klassisches Soundsystem einfach nicht hat.

## Was ich daraus mitnehme

Schall ist eine großartige Möglichkeit, um zu spüren, was Interferenz ist. Man kann durch einen Raum gehen und die Streifen hören. Aber das Doppelspaltexperiment mit Schall beweist nur, dass Schall eine Welle ist. Der Quantenteil ist etwas anderes. Es ist die Tatsache, dass ein einzelnes Elektron mit sich selbst interferiert, dass sich das Muster aus zufälligen Einzeltreffern aufbaut, dass das Überprüfen des Weges das Muster zerstört und dass niemand vollständig erklären kann, wie eine Messung ein einzelnes Ergebnis auswählt.

| | Schall in der Luft | Elektron oder Photon |
|---|---|---|
| Was schwingt | Luftdruck | Wahrscheinlichkeitsamplitude |
| Braucht ein Medium | ja | nein |
| Interferenz | ja | ja |
| Kommt als einzelne Punkte an | nein | ja |
| Wo ein Treffer landet | vorhersehbar | zufällig |
| Überprüfung des Weges | kleine Störung | Muster verschwindet |
| Verschränkung | nein | ja |

Meine ehrliche Antwort auf meine eigene Frage ist also, dass Schallwellen das Aussehen der Quantenphysik kopieren können, die Streifen und die Wellen, aber nicht das, was im Inneren passiert. Wo Schall wirklich quantenhaft wird, als Phononen in einem kalten Kristall, folgt er allen seltsamen Quantenregeln, inklusive des Messproblems. Die Mathematik der Wellen ist eine gemeinsame Sprache für beides, aber sie beschreibt zwei sehr unterschiedliche Dinge.
