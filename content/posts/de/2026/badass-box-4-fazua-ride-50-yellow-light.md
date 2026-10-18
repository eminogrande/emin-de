---
title: "Badass Box 4 an einem Fazua Ride 50, das gelbe Licht"
description: "Meine Badass Box 4 an einem Fazua Ride 50 blinkte ständig gelb. Was das Licht bedeutet, wo der Magnet hinkommt, wofür der schwarze Ring ist und was Badass gesagt hat."
date: "2026-10-14"
updated: "2026-10-14"
lang: de
translated_from: "en/badass-box-4-fazua-ride-50-yellow-light"
source_sections: ["what-i-bought-and-what-went-wrong", "what-the-yellow-light-means", "the-black-ring-nobody-explains", "asking-the-people-who-make-it", "where-the-magnet-actually-goes", "the-white-light-that-was-not-the-box", "firmware-the-app-and-why-i-left-them-alone", "the-order-i-would-test-in-next-time"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Badass Box", "how-to"]
source_links: [{"title": "FAZUA RIDE 50 TRAIL/STREET user manual", "url": "https://fazua.com/documents/1194/EN_Benutzerhandbuch_FAZUA_RIDE_50.pdf", "note": "Status LED colours, troubleshooting table, battery and restart steps."}, {"title": "FAZUA RIDE 50 EVATION user manual", "url": "https://fazua.com/documents/1197/EN_Benutzerhandbuch_FAZUA_RIDE_50_EVATION.pdf", "note": "The 4 to 15 mm gap between sensor mark and spoke magnet."}, {"title": "badassBox 4 Fazua product page", "url": "https://www.badassebikes.com/en/badassbox/badassbox-4-fazua_156_1051", "note": "Scope of delivery, including the 5 mm distance bush."}, {"title": "Badass eBikes: installing the badassBox4 classically on the chain stay", "url": "https://www.youtube.com/watch?v=jBTKFzDBUNY", "note": "Where the magnet sits relative to the box."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "Reading firmware version and error codes over USB."}]
tldr: ["Gelbes Blinken an der Fazua-Fernbedienung ist ein weicher Fehler. Mit einer Badass Box am Sensor deutet das darauf hin, dass der Speichenmagnet die Box nicht sauber erreicht.", "Bei mir war die Lösung, den Magneten an die Speiche zu setzen, die am nächsten an der Box vorbeikommt, direkt daneben.", "Der schwarze 5-mm-Ring kommt zwischen Sensor und Kettenstrebe, nicht unter den Magneten, und nur wenn der Abstand zu groß ist.", "Nur die obere LED weiß bedeutet eine leere oder schlecht sitzende Batterie, nicht die Box. Batterie rausnehmen und wieder einrasten."]
sections: [{"basically": "Ein Tuning-Clip am Geschwindigkeitssensor, ein paar gute Minuten, dann ein gelbes Blinklicht und keine Unterstützung."}, {"basically": "Gelb ist ein weicher Fehler. Der Motor vermisst Geschwindigkeitsimpulse, und das Handbuch sagt, man soll den Speichenmagneten prüfen."}, {"basically": "Ein 5-mm-Kunststoffring im Karton, den kein Prospekt und kein Video erwähnt. Unsere erste Vermutung dazu war falsch."}, {"basically": "Badass antwortete noch am selben Nachmittag. Der Ring kommt unter den Sensor, der Abstand ist 5 bis 10 mm."}, {"basically": "Schnappverschluss-Ende der Box, an der Speiche, die am nächsten vorbeikommt. Das war die ganze Lösung für mich."}, {"basically": "Eine weiße LED und keine Modi sieht aus, als hätte die Box etwas kaputt gemacht. Es war die Batterie, die nicht richtig saß."}, {"basically": "Die App will neue Firmware, Badass sagt, niemals updaten. Die Version in der Toolbox lesen, nichts ändern."}, {"basically": "Batterie, Fahrrad ohne Box, dann Magnet. Eine Änderung nach der anderen, damit dir ein gelbes Licht etwas sagt."}]
---
## Was ich gekauft habe und was schiefging

Ich fahre ein Fazua Ride 50, und am 7. Oktober habe ich dafür eine Badass Box 4 für Fazua gekauft, 149 Euro bei ebiketuningshop.com. Die Box wird über den Fazua-Geschwindigkeitssensor an der Kettenstrebe geklipst. Drinnen sind eine AAA-Batterie und etwas Elektronik, und zusammen mit ihrem eigenen Speichenmagneten verändert sie das Signal, das der Motor bekommt, sodass die Unterstützung nicht bei 25 km/h aufhört.

Sie funktionierte für ein paar Minuten. Dann fing die obere LED an der Fernbedienung an, gelb zu blinken. Manchmal lief der Motor mit weniger Leistung weiter, manchmal gab es überhaupt keine Unterstützung.

Die Batterie in der Box war neu. Der Fahrradakku war bei etwa 90 Prozent. Der Magnet saß dort, wo ich die Anleitung verstanden hatte. Trotzdem gelb.

## Was das gelbe Licht bedeutet

Die Fazua-Fernbedienung hat fünf LEDs. Die oberste dient gleichzeitig als Statusleuchte. Das Ride 50-Handbuch nennt gelbes Blinken einen weichen Fehler, einen vorübergehenden oder nicht kritischen Fehler, der in den meisten Fällen reduzierte Leistung bedeutet. In der Fehlerbehebungstabelle steht als Ursache "Möglicherweise besteht eine schlechte Verbindung zwischen dem Geschwindigkeitssensor und dem TRETLAGER." und als Lösung, die Position des Speichenmagneten zu überprüfen.

Mit einer Badass Box am Sensor bedeutet Gelb also, dass der Motor kein sauberes Geschwindigkeitssignal bekommt. Die Box sitzt zwischen Magnet und Sensor. Wenn der Magnet zu weit weg oder an der falschen Stelle vorbeikommt, gehen Impulse verloren und Fazua meldet das.

Rot ist ein harter Fehler, und dann lässt sich das Rad überhaupt nicht mehr benutzen. Das ist ein anderes Problem und nicht das, was ich hatte.

## Der schwarze Ring, den niemand erklärt

In der Box war ein kleiner schwarzer Hartkunststoffring. Der Badass-Shop listet ihn als 5-mm-Distanzbuchse. Er ist 15 mm breit, hat ein 5,3-mm-Loch und ist 5 mm dick. Die Anleitung zeigt die Box, die Batterie, den Magneten, den Schnappverschluss und einen optionalen Kabelbinder. Kein Ring. Das Installationsvideo zeigt ihn auch nicht.

Ich habe das mit meinem Agenten durchgearbeitet, und er vermutete, dass der Ring unter den Speichenmagneten gehört, auf die Rändelschraube, um den Magneten näher an die Box zu drücken. Das klang logisch. Aber der Ring passt nicht unter den Magneten. Die Vermutung war falsch, und auch seine Idee, an der Nabe anzufangen und den Magneten nach außen zu schieben.

## Die Leute fragen, die es herstellen

Also schrieb ich an Badass und an den Shop und stellte vier Fragen. Wofür ist der Ring, wo kommt er hin, welcher Abstand ist richtig, und kann das gelbe Licht vom Abstand kommen oder ist die Box kaputt.

Badass antwortete noch am selben Nachmittag, in vier kurzen Zeilen.

1. Er verringert den Abstand zwischen Box und Magnet, falls nötig.
2. Er kommt zwischen Sensor und Kettenstrebe.
3. Der Abstand sollte 5 bis 10 mm betragen.
4. "Ja, unwahrscheinlich." Ich las das als ja, der Abstand kann es verursachen, und ein Defekt ist unwahrscheinlich.

Der Shop antwortete auch. Sie verwiesen mich an Badass und sagten, sie tauschen die Box um, falls sie sich als defekt herausstellt. Badass gibt Privatkunden außerdem einen Monat Geld zurück.

An meinem Rad funktioniert der Ring nicht. Den Sensor 5 mm in Richtung Rad anzuheben würde ihn die Speichen berühren lassen. Also bleibt der Ring in der Schublade. Das ist es, was "falls nötig" bedeutet. Er ist für Rahmen, bei denen der Sensor weit von den Speichen entfernt sitzt.

```
Seitenansicht

  Speichen   [Magnet]
                |  5 bis 10 mm
          [ Box auf Sensor ]
          [ 5-mm-Ring ]        nur wenn der Abstand zu groß ist
  ========== Kettenstrebe ==========
```

## Wo der Magnet wirklich hingehört

Zwei Dinge sind wichtig, und es sind verschiedene Schrauben.

Die Position entlang der Speiche entscheidet, an welchem Teil der Box der Magnet vorbeikommt. Das Bild in der Anleitung mit dem grünen Haken zeigt den Magneten am Ende der Box gegenüber dem Kabel, am Schnappverschluss-Ende. Das Badass-Video sagt es in anderen Worten, am Rand der Box in Richtung Nabe, und dann "ertastet man die richtige Position", während man das Rad von Hand dreht.

Der Abstand ist die Distanz zwischen der Magnetfläche und der Box. Badass sagt 5 bis 10 mm. Das Fazua-Handbuch für das ältere Evation erlaubt 4 bis 15 mm zwischen der Sensormarkierung und dem Magneten, ganz ohne Box.

Und hier war mein eigentlicher Fehler. Das Hinterrad hat sich kreuzende Speichen, und jede zweite kommt etwas näher an der Kettenstrebe vorbei. Mein Magnet saß auf einer der ferneren. Auf meinem Foto sah es aus wie 15 bis 20 mm Abstand zur Box. Das ist zu weit.

Was es bei mir behoben hat:

1. Das Hinterrad anheben, damit es frei dreht.
2. Langsam drehen und schauen, welche Speiche am nächsten an der Box vorbeikommt.
3. Den Magneten auf diese Speiche setzen, Magnetseite zur Box, direkt neben der Box.
4. Das Rad wieder drehen. Der Magnet muss nah vorbeikommen, aber nie berühren.
5. Das Rad aus- und einschalten, damit der alte Fehler weg ist, und die Kurbeln eine oder zwei Minuten von Hand drehen.
6. Wenn Gelb wiederkommt, den Magneten ein paar Millimeter entlang der Speiche verschieben und wiederholen.

Nachdem ich ihn versetzt hatte, lief der Ständertest ohne Gelb. Eine längere Fahrt muss es noch beweisen.

## Das weiße Licht, das nicht die Box war

Mitten im Testen passierte etwas anderes. Nur die obere LED war an, weiß, und nichts, was ich tippte, änderte den Modus. Beim Start lief die Fernbedienung ihre Farben durch, grün, blau und pink, und dann fiel sie auf dieses eine weiße Licht zurück.

Das sieht so aus, als hätte die Box etwas kaputt gemacht. Hatte sie nicht. Weiß ist die Farbe für keine Unterstützung. Und das Ride 50-Handbuch sagt: "Wenn der AKKU leer ist, leuchtet die obere LED der Statusanzeige weiß oder keine LED leuchtet." Mein Akku war nicht leer, also saß er höchstwahrscheinlich nicht richtig.

Ich zog den Akku aus dem Drivepack und klickte ihn wieder ein. Wieder blau, River-Modus, Unterstützung zurück.

Falls das mal nicht hilft, hat das Handbuch noch zwei weitere Schritte. Den Knopf am Akku 3 Sekunden halten, um ihn auszuschalten, dann wieder drücken, das setzt den Batterieschutz zurück. Oder die mittlere Taste der Fernbedienung 8 Sekunden halten, bis alle LEDs ausgehen, warten, bis die obere LED grün oder blau blinkt, und normal starten.

## Firmware, die App und warum ich sie in Ruhe ließ

Die Fernbedienung zeigt keine Geschwindigkeit, also wollte ich die FAZUA-App zum Testen. Sie verband sich nicht. Die neue FAZUA-App braucht die neueste Firmware, und bei einem Ride 50 auch ein Bluetooth-Chip-Update, das nur über die ältere Rider-App funktioniert.

Badass schreibt auf seinen Shop-Seiten, die Motor-Firmware nicht zu aktualisieren, weil Updates die Tür zum Tuning schließen können. "Ein E-Bike, das funktioniert, braucht wahrscheinlich kein Update." Also habe ich nicht aktualisiert und ohne App getestet.

Man kann die Firmware trotzdem auslesen, ohne etwas zu ändern. Die kostenlose FAZUA Toolbox läuft auf einem Computer. Das Drivepack herausnehmen, den Akku einsetzen, die USB-Kappe öffnen, ein Mini-USB-Datenkabel anschließen, und die Toolbox zeigt die Version und Fehlercodes. Niemals auf Update drücken. Die Kappe vor dem Fahren wieder aufsetzen, denn ohne sie ist das Drivepack nicht wasserdicht. Ich habe das bisher noch nicht gebraucht.

## Die Reihenfolge, in der ich es beim nächsten Mal testen würde

1. Zuerst die AAA-Batterie in der Box prüfen. Ein Multimeter sollte ungefähr 1,5 V anzeigen. Badass will eine normale Batterie, keine wiederaufladbare.
2. Das Rad ohne die Box testen, Magnet zurück an seinem ursprünglichen Platz. Wenn es ohne die Box gelb blinkt, ist das Problem das Rad, nicht die Box.
3. Die Box aufschieben, bis der Schnappverschluss klickt. Magnet an der Speiche, die am nächsten vorbeikommt, am Ende mit dem Schnappverschluss.
4. Abstand 5 bis 10 mm, nah dran, aber niemals berührend.
5. Nach jedem Gelb neu starten, eine Minute testen, immer nur eine Sache auf einmal ändern.
6. Nur die obere LED weiß bedeutet Batterie, nicht Box. Rausziehen, wieder einklicken.
7. Die Firmware in Ruhe lassen.
8. Wenn nichts hilft, an service@badassebikes.com schreiben mit Fotos von der Box und dem Magneten. Sie haben mir noch am selben Tag geantwortet.

Badass selbst sagt, die Box ist auf öffentlichen Straßen nach der deutschen StVO nicht erlaubt, nur auf Privatgelände. Nimm sie ab und das Rad ist wieder original.
