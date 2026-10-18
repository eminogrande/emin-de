---
title: "Fazua Ride 50 Speed-Unlock vom Mac, ohne Box"
description: "Wie mein Agent und ich das Tempolimit eines Fazua Ride 50 Evation von 25 auf 55 km/h über USB von einem MacBook aus angehoben haben, mit Firmware 2.04 und einem Open-Source-Tool."
date: "2026-10-16"
updated: "2026-10-16"
lang: de
translated_from: "en/fazua-ride-50-speed-unlock-mac"
source_sections: ["the-bike-and-the-problem", "the-idea-change-one-number-instead-of-fooling-the-sensor", "what-i-used", "step-1-connect-the-drivepack-to-the-mac", "step-2-read-before-you-write", "step-3-downgrade-to-204", "step-4-write-55-kmh", "step-5-back-into-the-bike", "what-went-wrong-on-the-way", "battery-modes-and-going-back"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Canyon Roadlite:ON", "macOS", "how-to"]
source_links: [{"title": "FazuaUnlocker, my fork with the Mac port", "url": "https://github.com/eminogrande/FazuaUnlocker", "note": "fazua_mac.py, README-MAC.md and the firmware download script."}, {"title": "FazuaUnlocker by quezzas", "url": "https://github.com/quezzas/FazuaUnlocker", "note": "The original Windows tool, MIT licence."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "The official tool for firmware updates over USB."}, {"title": "FAZUA: How to do a Ride 50 firmware update", "url": "https://fazua.com/en/support/help-center/videos/how-to-fazua-ride-50-firmware-update", "note": "Manual firmware install, and why the remote LEDs flash afterwards."}, {"title": "Eplus Flash Home, Fazua speed unlocker", "url": "https://www.eplus.bike/en/prodotto/fazua-software-home-speed-unlocker/", "note": "The paid Windows version of the same idea, and the 2.50 to 2.04 downgrade note."}, {"title": "Firmware 2.04, archived original from fazua.com", "url": "https://web.archive.org/web/20220709185915/https://fazua.com/documents/826/evation_Software_2.04.bin", "note": "Internet Archive snapshot of 9 July 2022."}]
tldr: ["Der Fazua Ride 50 speichert sein 25-km/h-Limit als einen einzigen Wert im Drivepack. Mit Firmware 2.04 kann man ihn über USB ändern.", "Ich habe es von einem MacBook Pro M4 aus gemacht. Das Open-Source-Tool war nur für Windows, also hat mein Agent seine USB-Schicht durch hidapi ersetzt.", "Firmware 2.50 musste erst zurück auf 2.04, über die offizielle FAZUA Toolbox. Die 2.04-Datei ist das Original von fazua.com.", "Nach dem Schreiben zurückgelesen, 55,01 km/h. Die Badass Box wird dafür nicht gebraucht."]
sections: [{"basically": "Ein Canyon Roadlite:ON von 2020 mit einem Fazua Ride 50 Evation, und eine Tuning-Box, die ständig gelb blinkte."}, {"basically": "Die Box belügt den Geschwindigkeitssensor. Die Software ändert einfach das Limit, gegen das der Motor prüft."}, {"basically": "Mein Rad, mein MacBook, ein Mini-USB-Kabel, ein T10-Schraubendreher, die FAZUA Toolbox und etwa 75 Zeilen Python."}, {"basically": "Drivepack raus, Akku dran, USB-Kappe ab, Kabel rein. Der Mac sieht es als evation v2.50."}, {"basically": "Erst nur lesen. Meins sagte 24,98 km/h und ein 2121-mm-Rad. Diese Datei ist auch das Backup."}, {"basically": "In der FAZUA Toolbox Manual wählen, nicht Online, die 2.04-Datei auswählen und flashen und kalibrieren lassen."}, {"basically": "Ein Befehl schreibt das neue Limit, das Rad bestätigt es, und ein zweites Lesen zeigt 55,01 km/h."}, {"basically": "Weiße LEDs, die abwechselnd blinken, bedeuten, dass die Remote sich selbst aktualisiert. Lass sie in Ruhe, bis sie grün zeigt."}, {"basically": "Ein falscher Klick, zwei abgebrochene Schreibvorgänge und ein rotes Licht, das nur ein schlecht sitzendes Drivepack war."}, {"basically": "Das Limit ist in jedem Modus gleich. Die Reichweite nicht. Ein Befehl bringt es zurück auf 25."}]
---
## Das Fahrrad und das Problem

Mein Fahrrad ist ein Canyon Roadlite:ON AL 7.0 von 2020, Größe M, pace grey und orange. Der Motor ist ein Fazua Evation, den Fazua heute Ride 50 Evation nennt. Das Drivepack, Motor und Akku in einem langen Stück, sitzt im Unterrohr und lässt sich mit einem Hebel herausnehmen. Der Akku ist ein Energy 250, die Touch-Fernbedienung ist im Rahmen eingebaut. Es gibt kein Display am Lenker, das Fahrrad sagt dir also nie, wie schnell du bist.

Vorher lief auf meinem Drivepack die Firmware 2.50 und auf dem Akku die Firmware 1.15. Das weiß ich nur, weil ich es mit der FAZUA Toolbox ausgelesen habe, siehe unten.

Die Unterstützung hört bei 25 km/h auf, wie bei jedem Pedelec in der EU. Ich wollte sehen, wie sich das Fahrrad mit mehr anfühlt. Also habe ich am 7. Oktober eine Badass Box 4 für Fazua gekauft. Darüber habe ich in [Badass Box 4 an einem Fazua Ride 50, das gelbe Licht](/posts/badass-box-4-fazua-ride-50-yellow-light) geschrieben. Es funktionierte ein oder zwei Minuten, dann blinkte die obere LED wieder gelb. Magnet näher, andere Speiche, um 90 Grad gedreht, der Badass-Support sagte, die Installation sieht gut aus. Nach ein paar Minuten Fahrt immer noch gelb.

## Die Idee, eine Zahl ändern statt den Sensor auszutricksen

Die Badass Box sitzt am Geschwindigkeitssensor an der Kettenstrebe und verändert die Impulse des Speichenmagneten, sodass der Motor denkt, du bist langsamer als du bist. Das ist ein Trick am Signal, und bei meinem Fahrrad hat Fazua das nach einer Weile bemerkt und einen Soft-Fehler gemeldet.

Der Motor selbst vergleicht deine Geschwindigkeit nur mit einem gespeicherten Wert. Fazua nennt ihn bikeMaxSpeed. Händler können ihn in der Toolbox sehen, aber für normale Nutzer ist er ausgegraut. Wenn du diesen Wert änderst, gibt es nichts auszutricksen. Der Sensor meldet die echte Geschwindigkeit und der Motor hilft einfach länger.

Mein Agent hat zwei Wege gefunden, das zu tun. Die italienische Firma Eplus verkauft Flash Home für 134 Euro plus Mehrwertsteuer, nur für Windows. Und es gibt FazuaUnlocker auf GitHub von quezzas, kostenlos, MIT-Lizenz, ebenfalls nur für Windows. Beide sagen dasselbe. Es funktioniert mit Firmware 2.04. Bei 2.50 gehst du erst zurück auf 2.04.

```
vorher (Box)                            nachher (Software)

Speichenmagnet -> [Box] -> Sensor       Speichenmagnet -> Sensor
                 |  falsches langsamer              |  echte Geschwindigkeit
                 v                                       v
Drivepack: Limit 25 km/h                Drivepack: Limit 55 km/h
           -> gelb nach 1-2 Min                  -> keine Box, kein Gelb
```

## Was ich verwendet habe

1. Das Fahrrad, Akku voll geladen.
2. Ein MacBook Pro M4, 16 GB, macOS 15.5. Es läuft auf Apple Silicon, kein Windows, keine virtuelle Maschine.
3. Ein Mini-USB-Datenkabel. Kein reines Ladekabel.
4. Einen Torx-T10-Schraubendreher für die USB-Kappe.
5. FAZUA Toolbox 2.29 Basic für macOS auf Apple Silicon, von der Fazua-Website.
6. Firmware 2.04, Datei evation_Software_2.04.bin. Der Original-Link von fazua.com ist weg, aber das Internet Archive hat ihn vom 9. Juli 2022 gespeichert. SHA-256 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e. Mein Agent hat ihn mit der Kopie verglichen, die auf GitHub kursiert, und sie sind bis aufs Byte identisch.
7. Mein Fork von FazuaUnlocker, [github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker), mit Python 3.9 und der hidapi-Bibliothek.

Das Original-Tool spricht mit dem Drivepack über die Windows-USB-Funktionen. Mein Agent hat das Protokoll, die Prüfsumme und die Schreiblogik exakt so gelassen, wie sie sind, und nur diese eine Schicht durch hidapi ersetzt, das auch auf macOS läuft. Das ist die Datei fazua_mac.py, etwa 75 Zeilen. Die Firmware selbst ist verschlüsselt, hier ändert also niemand die Firmware. Das Tool ändert nur eine Einstellung.

## Schritt 1, das Drivepack mit dem Mac verbinden

1. Nimm das Drivepack aus dem Fahrrad. Der Akku bleibt im Drivepack und muss eingeschaltet sein.
2. Schraube die USB-Kappe am Drivepack mit dem T10 ab. Sie sitzt unten in der Nähe der Kühlrippen.
3. Verbinde das Mini-USB-Kabel mit dem Mac und lege das Drivepack flach auf den Boden oder einen Tisch.
4. Prüfe, ob der Mac es sieht. Im Terminal zeigte `system_profiler SPUSBDataType | grep evation` bei mir `evation v2.50`. Für das Tool ist es ein USB-HID-Gerät mit der ID 10C4:1001.

Fazua sagt in seiner eigenen Anleitung, dass man für ein Firmware-Update nur das Drivepack braucht, nicht das ganze Fahrrad. Das Rad muss sich dabei nicht drehen.

## Schritt 2, erst lesen, dann schreiben

Beende zuerst die FAZUA Toolbox, weil sie die USB-Verbindung hält. Dann:

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

Meins antwortete nach etwa 110 ms. Max Bike Speed 24,98 km/h, Rohwert 694. Radumfang 2121 mm. Shaft-Offset 30533. Das Tool leitet aus diesem Offset einen kleinen Schreibschlüssel ab, meiner war ba88. Mein Agent hat dieses Auslesen als JSON-Datei gespeichert, damit ich jederzeit genau zu diesen Werten zurückkehren kann.

Dann ein Dry-Run, der das Schreibpaket mit Prüfsumme baut, aber nichts sendet:

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## Schritt 3, Downgrade auf 2.04

Das ist der Teil mit echtem Risiko. Wenn der Flash unterbrochen wird, kann das Drivepack tot sein. Also Akku voll, Kabel fest, Drivepack liegt still.

1. Öffne die FAZUA Toolbox, gehe zu FIRMWARE UPDATE, klicke auf UPDATE NOW.
2. Wähle Manual. Nicht Online, weil Online wieder die neueste Version installiert.
3. Wähle evation_Software_2.04.bin und prüfe den Dateinamen, bevor du START drückst.
4. Warte. Nach dem Flash kalibriert der Motor und kann ein bisschen vibrieren. Bewege das Drivepack nicht.
5. Prüfe erneut mit system_profiler. Meins sagte jetzt `evation v2.04`.

Ein erneutes Auslesen nach dem Downgrade zeigte immer noch 24,98 km/h. Der Firmware-Wechsel allein entsperrt nichts.

## Schritt 4, 55 km/h schreiben

```sh
.venv/bin/python fazua_mac.py 55 --force
```

Das Tool zeigte die Änderung von 24,98 km/h, Rohwert 694, auf 55,00 km/h, Rohwert 1528. Dann „Write cycle acknowledged by bike“, dann las es den Wert selbst zurück. „SUCCESS: bikeMaxSpeed is now 55.01 km/h“. Ein separates Auslesen ein paar Sekunden später sagte dasselbe, Radumfang immer noch 2121 mm.

Das Tool akzeptiert 5 bis 75 km/h. Ich habe 55 gewählt, weil ich sehen will, wie es ist. Mein Agent schlug 45 vor, weil der Motor nicht endlos Leistung hat und ab einer gewissen Geschwindigkeit das meiste sowieso aus deinen Beinen kommt. Was auch immer du einstellst, der Motor hilft nur länger, er macht das Fahrrad nicht von selbst schneller.

## Schritt 5, zurück ins Fahrrad

1. Ziehe das Kabel ab, schraube die USB-Kappe von Hand wieder an, 1 bis 1,5 Nm. Ohne Kappe ist das Drivepack nicht wasserdicht.
2. Setze das Drivepack ins Fahrrad, bis es einrastet.
3. Einschalten.

Bei meinem Fahrrad blinkte die Fernbedienung dann weiß, zwei LEDs oben und zwei unten, abwechselnd. Das sieht nach einem Fehler aus. Ist es nicht. Fazua schreibt in seiner Update-Anleitung: „Flashing LEDs indicates an update of the remote. Do not touch the remote during the update and do not switch off the e-bike.“ Das Drivepack bringt die Fernbedienung auf seinen eigenen Firmware-Stand. Meine schaltete sich einmal aus, kam wieder an, und dann war alles grün.

Dann habe ich es getestet. Es scheint zu funktionieren. Ich habe noch keine genaue Höchstgeschwindigkeit, weil das Fahrrad kein Display hat. Beim nächsten Mal kommt ein Handy mit GPS-Tacho an den Lenker.

## Was auf dem Weg schiefgelaufen ist

Mein Agent hat sich auf dem Mac allein durch die Toolbox geklickt, und der erste Klick traf CALIBRATION statt FIRMWARE UPDATE. Es hat nur die Seite geöffnet, nichts ist gestartet. Dann ist der Klick auf Manual nicht angekommen, weil Klicks, die im Hintergrund geschickt wurden, diesen Dialog nicht erreicht haben. Mein Agent hat dort gestoppt, weil ein falscher Klick auf START wieder 2.50 installiert hätte. Ich habe selbst auf Manual und auf die Datei geklickt.

Die ersten zwei Schreibversuche sind abgebrochen. Das Tool fragt vor dem Schreiben nach yes, und die Art, wie mein Agent die Antworten eingefüttert hat, hat diese Frage nicht erreicht. Es wurde nichts geschrieben, das Lesen danach zeigte immer noch 24,98 km/h. Mit --force ging es durch.

Später habe ich den Drivepack wieder rausgenommen, die USB-Kappe geschlossen und den Magneten versetzt, und dann war die obere LED rot. Rot ist nicht der Magnet. Das Fazua-Handbuch sagt, rot oben bedeutet einen Verbindungsfehler zwischen Drivepack und Tretlager, dem Teil im Rahmen, in das es eingesteckt wird. Ich habe es rausgenommen, die Kontakte geprüft, es wieder reingeschoben, bis es geklickt hat, und dann war es gut.

Und nach 15 Minuten Stehen schaltet sich das System selbst ab. Das ist auch normal, es steht im Handbuch.

## Akku, Modi und zurück

Das Limit ist ein Wert im Drivepack. Grün, Blau und Pink nutzen alle die gleichen 55 km/h. Die Modi ändern nur, wie stark der Motor schiebt und wie schnell der Akku leer ist. Schneller fahren kostet viel mehr Energie, also fällt die Reichweite über 25 schnell ab.

Auf Firmware 2.04 bleibt der Akku nach der Fahrt auch länger wach. Auf 2.50 hatte Fazua diesen Standby auf ein bis drei Stunden gekürzt, auf der älteren Firmware sind es bis zu acht. Also halte ich nach dem Fahren den Knopf am Akku zwei Sekunden gedrückt, bis die LEDs ausgehen.

Zurück auf Original ist ein Befehl mit angeschlossenem Kabel:

```sh
.venv/bin/python fazua_mac.py 25 --force
```

Eplus schreibt, dass man nach dem Entsperren wieder auf 2.50 updaten kann. Das habe ich nicht ausprobiert, also bleibe ich vorerst auf 2.04 und drücke nicht auf Update in der Toolbox oder der App.

Über 25 km/h ist das Fahrrad kein Pedelec mehr. In Deutschland ist es dann nur noch auf Privatgelände erlaubt, nicht auf öffentlichen Straßen, und Garantie und Versicherung können weg sein. Firmware flashen kann den Drivepack kaputt machen. Alles hier passiert auf eigene Gefahr.
