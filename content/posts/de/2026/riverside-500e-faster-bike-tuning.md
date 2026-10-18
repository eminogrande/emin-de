---
title: "Riverside 500E schneller machen: Bike-Tuning"
description: "Der komplette Guide fürs Riverside 500E: der kostenlose Magnet-Hack, die Badass Box und der Tausch auf einen KT-Controller, mit Zeichnungen, Links zu den Teilen und Testschritten."
date: "2026-10-13"
updated: "2026-10-13"
lang: de
translated_from: "en/riverside-500e-faster-bike-tuning"
source_sections: ["the-bike-and-why-it-stops-at-25", "first-check-what-actually-limits-the-bike", "the-free-fix-move-the-magnet", "how-strong-the-magnet-has-to-be", "the-clean-fix-badass-box", "the-real-fix-kt-controller", "wiring-and-first-start", "what-can-break-and-what-it-costs"]
category: building
format: guide
author: emin
provenance: written
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Riverside 500E", "KT controller", "how-to"]
source_links: [{"title": "Riverside 500E product page", "url": "https://decathlon.co.uk/p/electric-hybrid-bike-riverside-500-e/_/R-p-169143", "note": "Motor and battery specs."}, {"title": "Arthur Brs: Riverside 500E Speed Unlock", "url": "https://www.youtube.com/watch?v=Cdm-WZnxCZ4", "note": "The video that confirms the service menu does not exist on this model."}, {"title": "Pedelec-Forum: Riverside 500 e schneller machen", "url": "https://www.pedelecforum.de/forum/index.php?threads/riverside-500-e-schneller-machen.102938/", "note": "German thread asking the same question."}, {"title": "K&J Magnetics: Reed switches and Hall effect sensors", "url": "https://www.kjmagnetics.com/blog/reed-switches-and-hall-effect-sensors/", "note": "Trigger fields, magnet orientation and polarity."}, {"title": "KT controller 17A with LCD3", "url": "https://www.aliexpress.us/item/3256808397983216.html", "note": "The controller I use in the swap."}]
tldr: ["Das Riverside 500 E hat einen Hinterradnabenmotor, deshalb passen die üblichen Tuning-Chips nicht.", "Der kostenlose Trick: Den Speichenmagneten an die Kurbel versetzen. Dann schiebt die Unterstützung bis etwa 32 km/h weiter.", "Die saubere Lösung ist der Tausch auf einen KT-Controller, kostet etwa 65 Dollar an Teilen.", "Beides lässt sich rückgängig machen, wenn du die alten Teile aufhebst."]
sections: [{"basically": "Ein Hinterradnabenmotor der Eigenmarke, ein vergossener Controller und kein verstecktes Menü. All die günstigen Tricks, die bei anderen Bikes funktionieren, laufen hier ins Leere."}, {"basically": "Schneller und mehr Power sind zwei verschiedene Baustellen. Such dir aus, an welcher du schraubst."}, {"basically": "Der Controller misst die Radgeschwindigkeit über einen Speichenmagneten. Miss stattdessen die Kurbel, und er hört auf abzuregeln."}, {"basically": "Jede kleine Neodym-Scheibe funktioniert, solange sie nah genug dran ist. Zu stark schadet nie, zu weit weg schon."}, {"basically": "Ein Clip mit Magnet drin, der die Impulse verdoppelt. Keine Kabel, kein Löten, in einer Minute wieder abgebaut."}, {"basically": "Für etwa 65 Dollar an AliExpress-Teilen tauschst du das Gehirn des Bikes. Mehr Ampere und ein Display, auf dem du das Limit einstellst."}, {"basically": "Phasen- und Hall-Kabel sind der einzige heikle Teil. Alles andere ist Stecker und Kabelbinder."}, {"basically": "Wenn es schiefgeht, kommen die alten Teile wieder rein. Dem Gesetz ist es ab 25 km/h nicht mehr egal, also überleg dir gut, wo du fährst."}]
---
## Das Fahrrad und warum bei 25 Schluss ist

Der Riverside 500E ist ein Hybrid-Pedelec. Der Motor ist ein bürstenloser 250-Watt-Nabenmotor im Hinterrad, Hausmarke "Vision", 42 Nm Drehmoment, gespeist von einem 36-V-11,6-Ah-Akku. Wie bei jedem Pedelec, das in der EU verkauft wird, schaltet sich die Unterstützung bei 25 km/h ab.

Das ist wichtig fürs Tuning, weil fast alles auf dem Markt für Mittelmotoren gemacht ist. SpeedBox, PearTune und die motorspezifischen Badass-Boxen sind für Bosch, Brose und Shimano gebaut. Keine davon passt physisch an dieses Fahrrad.

Die Optionen beschränken sich also auf drei: den Geschwindigkeitssensor austricksen, eine Box draufklipsen oder den Controller tauschen. Ein verstecktes Servicemenü gibt es auch nicht. Das Rockrider E-ST 100 hat eins, wo man die Radgröße im Display verkleinern kann. Das Display des 500E hat gar keinen Eintrag für die Radgröße. Ich habe das ganze Menü durchgecheckt, und die Foren sind sich einig.

## Erst mal checken, was das Fahrrad wirklich begrenzt

Im Controller gibt es zwei getrennte Limits. Das Geschwindigkeitslimit killt die Unterstützung bei 25. Das Stromlimit, bei diesem Fahrrad etwa 13 A, deckelt das Drehmoment. Das eine zu erhöhen bringt fürs andere nichts.

```
will schneller          will mehr Druck
     |                       |
Speedsensor-Hack       Controller mit mehr Ampere
oder KT-Controller     (KT 15A / 17A / 22A)
     |                       |
Unterstützung bis      gleiche Höchstgeschwindigkeit,
~32 km/h               mehr Drehmoment
```

Der kostenlose Magnet-Hack betrifft nur die Geschwindigkeit. Ein Controller-Tausch betrifft beides, weil man bei einem KT-Controller den Strom und das Limit im Display einstellen kann.

## Der kostenlose Fix: Magnet versetzen

Schau dir das Hinterrad an. An der linken Kettenstrebe, nah am Ausfallende, sitzt ein kleiner schwarzer Sensor an einem Kabel. Gegenüber, an einer Speiche geklemmt, sitzt ein Magnet. Dieses Paar ist der Tacho des ganzen Systems.

Der Hack: Der Controller glaubt jede Geschwindigkeit, die dieser Sensor meldet. Wenn der Sensor deine Kurbel statt des Rades misst, denkt der Controller, du bist langsam, und schiebt weiter.

```
VORHER (Serie)                          NACHHER (Hack)

  Rahmen                                 Rahmen
   |                                      |
   | Sensor --- 2mm --- Speiche           | Sensor (nach innen gedreht,
   |            Magnet                    |  Kabel noch angeschlossen)
   |                                      |        3-5 mm
   v                                      v   +------------+
[ Hinterrad ]                        Kurbelarm  | Magnet jetzt |
                                      (dreht)   | am Arm       |
                                                +------------+
```

Schritte:

1. Schraub den Sensor von der Kettenstrebe. Meistens ist das ein Torx T25, und die Schraube sitzt in Schraubensicherung, also langsam machen.
2. Befestige den Sensor mit einem Kabelbinder so, dass er zur Innenseite des Kurbelarms zeigt. Das Kabel bleibt angeschlossen.
3. Nimm den Magneten von der Speiche und kleb ihn an die Innenseite des Kurbelarms, auf gleicher Höhe mit dem Sensor. Klebeband oder ein Kabelbinder hält das fürs Testen gut.
4. Der Abstand zwischen Magnet und Sensor beträgt 3 bis 5 mm bei jeder Kurbelumdrehung.
5. Heb das Hinterrad an, dreh die Pedale von Hand. Das Display muss eine Geschwindigkeit anzeigen. Wenn es null oder einen Fehler zeigt, läuft der Motor gar nicht, also erst den Abstand fixen.

Das Display lügt dich jetzt an. Bei echten 25 km/h zeigt es 6 oder 7 an. Nutz ein Handy-GPS für die Wahrheit. Das Ganze ist in zehn Minuten rückgängig gemacht.

Ergebnis: Unterstützung bis etwa 32 bis 35 km/h, begrenzt davon, wie schnell du die Kurbeln drehen kannst. Kosten: null.

## Wie stark der Magnet sein muss

Der Sensor ist ein Reed-Schalter oder ein Hall-Sensor. Er löst irgendwo zwischen 10 und 100 Gauß an seiner Oberfläche aus, was nicht viel ist. Der serienmäßige Speichenmagnet macht den Job normalerweise, wenn der Abstand klein ist.

Wenn er nicht zuverlässig auslöst, funktioniert jede kleine Neodym-Scheibe. Stärke N42 bis N52, 10 bis 15 mm Durchmesser, 3 bis 5 mm dick. Das kostet ein oder zwei Euro. Zu stark schadet nie. Zu weit weg schon.

Die Polarität ist wichtig. Hall-Sensoren wollen einen Pol zu sich zeigend haben, Reed-Schalter wollen die magnetische Achse parallel zum Schalter. Die praktische Regel: Wenn das Display bei null bleibt, dreh den Magneten um 180 Grad und versuch es nochmal. Das fixt es fast jedes Mal.

## Der saubere Fix: Badass Box

Wenn der Kabelbinder-Look nichts für dich ist, macht die Badass Box 4 Universal denselben Job in einem Gehäuse. Sie klipst um den Sensor und verdoppelt die magnetischen Impulse pro Radumdrehung, sodass der Controller die halbe Geschwindigkeit zählt. Keine Kabel, kein Löten, in unter einer Minute wieder vom Fahrrad, und sie hinterlässt keine Spuren für eine Werkstatt-Diagnose.

Sie kostet etwa 130 Euro, was echtes Geld für das ist, was drin ist, aber sie ist die einzige Option, die die Garantie intakt lässt. Ein Haken: Der Speichenmagnet muss den Sensor in 8 bis 14 mm Abstand passieren, und die Box zeigt die Hälfte deiner echten Geschwindigkeit auf der Konsole an, es sei denn, du koppelst die Boost-Buddy-App.

## Der echte Fix: KT-Controller

Das Gehirn des Fahrrads ist ein Controller, der im Fach unter dem Akku versiegelt ist, eingeklebt. Tausch ihn aus, und dir gehören der Strom und das Geschwindigkeitslimit.

Teile, alles AliExpress, etwa 65 Dollar:

| Teil | Preis | Was es macht |
| --- | --- | --- |
| KT-Controller 17A mit LCD3 | $45.73 | Neues Gehirn, Strom per Display eingestellt |
| 9-poliges Motor-Verlängerungskabel | $10.90 | Wasserdichter Kabelbaum, den du zerschneidest |
| KT-V12L Pedalsensor | $2.94 | 12-Signal-Trittfrequenzsensor für den KT |
| 5-poliges SM-Displaykabel, 170 cm | $5.33 | LCD3 zum Lenker |

Nimm 17A, nicht 22A. Das Batteriemanagementsystem des 36-V-11,6-Ah-Packs liefert etwa 20 bis 25 A, und ein 22-A-Controller fährt auf dieser Linie. 17 A sind etwa 610 W Spitze gegenüber den serienmäßigen 470 W, ein klarer Schub, ohne etwas zu kochen.

## Verkabelung und erster Start

Der serienmäßige Pedalsensor spricht sein eigenes Protokoll, also bekommt der KT seinen eigenen 12-Signal-Sensor am Tretlager. Alles andere ist Plug-and-Play außer dem Motor.

```
Controller                 Motor (Vision-Nabe)
   |                            |
   |  3 Phasenkabel   dick: gelb / grün / blau
   |  5 Hall-Kabel    dünn: rot schwarz gelb grün blau
   |                            |
   +--- 1:1 löten, Farben passend, dann Schrumpfschlauch
```

1. Fotografier jeden Stecker am alten Controller, bevor du irgendwas abziehst.
2. Öffne das Fach unter dem Akku. Der Deckel ist geklebt, hebel ihn vorsichtig auf.
3. Schneid die alten Motorstecker ab, löt den KT-Kabelbaum Farbe auf Farbe an die Motorkabel, Schrumpfschlauch über alles.
4. Erster Start mit dem Hinterrad in der Luft. Wenn der Motor stottert oder rückwärts dreht, ist die Hall-Reihenfolge falsch. Akku aus, zwei Hall-Kabel tauschen, nochmal versuchen. Es sind normalerweise ein oder zwei Versuche von sechs Kombinationen. Niemals etwas abziehen, wenn der Akku angeschlossen ist.
5. Klemm den KT-V12L-Sensor auf die linke Seite des Tretlagers, Magnetscheibe zum Sensor zeigend, 3 bis 5 mm Abstand.
6. Montier das LCD3, stell 36 V ein, Radgröße 28 Zoll, Pedalsignale 12, Strom 17 A.
7. Wenn ein Unterstützungslimit immer noch greift, verkleiner den Wert für den Raddurchmesser im Display. 28 auf 22 Zoll liest etwa 25 Prozent langsamer und verschiebt die Abschaltung entsprechend.
8. Test im Hof, dann auf der Straße. Voller Reparaturweg: Der alte Controller und seine Stecker gehen zurück rein, und das Fahrrad ist wieder Serie.

Eine ehrliche Warnung. Die Pinbelegung der Vision-Nabe ist nicht dokumentiert. Wenn das Hall-Raten sich nie einpendelt, kauf stattdessen den KT-Dual-Mode-Controller, der läuft sensorlos und ignoriert die Hall-Kabel komplett.

## Was kaputt gehen kann und was es kostet

Der Motor ist ein Getriebenabenmotor ohne Kühlung. Dauerhaft 600 W bergauf brät die Wicklungen irgendwann durch. Fahr den Strom runter auf 15 A, wenn das Rad meistens klettert.

Die Rechtslage in Deutschland: Über 25 km/h Unterstützung ist das Rad kein Pedelec mehr. Versicherung und Zulassung werden zum Problem, und die Garantie ist weg, sobald das Gehäuse offen ist. Fahr die entsperrte Einstellung auf Privatgelände, dann existiert nichts davon.

Das Geld, das auf dem Spiel steht, sind 65 Dollar an Teilen plus ein Nachmittag. Beide Fixes sind reversibel. Pack die alten Stecker in eine Tüte, kleb sie unter den Batteriedeckel, und du kannst immer zurück.

Für mich war die Reihenfolge klar. Erst den Magnet-Hack testen, weil er nichts kostet und fünfzehn Minuten dauert. Wenn die Geschwindigkeit reicht und dich das lügende Display nicht stört, hör da auf. Wenn du auch das Drehmoment willst oder ein Display, das die Wahrheit sagt, ist der KT-Swap der echte Fix.
