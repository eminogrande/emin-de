---
title: "Die Blockchain-Ausführungsschicht neu gedacht: Wie die FATE-VM die grundlegenden Fehler der EVM löst"
description: "Wie Erik Stenman FATE gebaut hat, eine typisierte VM, die Contracts etwa zehnmal kleiner und dreimal schneller macht als auf der EVM."
date: "2026-03-19T03:55:43.287Z"
updated: "2026-03-19"
lang: de
translated_from: "en/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19"
source_sections: ["why-the-evm-needs-fixing", "typed-variables-instead-of-flat-memory", "functions-instead-of-arbitrary-jumps", "high-level-data-types-and-maps-in-the-vm", "the-results"]
category: building
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
image: "/media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png"
tldr: ["Dr. Erik Stenman hat FATE gebaut, eine typisierte VM für Aeternity, um die Designfehler der EVM zu beheben.", "FATE wirft flachen Speicher und beliebige Sprünge raus und packt stattdessen typisierte Variablen, Funktionen, große Ganzzahlen und Maps in die VM.", "In Stenmans Benchmark ist der Bytecode etwa 9,6-mal kleiner und läuft dreimal schneller als auf der EVM."]
sections: [{"basically": "Eine untypisierte Stack-Maschine mit flachem Speicher und rohen 256-Bit-Wörtern ergibt aufgeblähte, langsame und unsichere Contracts."}, {"basically": "Keine rohen Speicherzeiger. FATE-Variablen tragen ihr eigenes Typ-Tag, und negative Namen schreiben in den State."}, {"basically": "Aufrufer nennen eine typisierte Funktion, und Code besteht nur aus Basic Blocks, also können ungültige Sprünge gar nicht passieren."}, {"basically": "Große Ganzzahlen, Tupel, Listen, Chain-Typen und Maps leben in der VM, Compiler sparen sich also den Boilerplate."}, {"basically": "Etwa 9,6-mal kleinerer Bytecode, dreimal schnellere Ausführung und weniger Gas für den Endnutzer."}]
---
Wenn du diesen Artikel liest und Lust hast, mit mir, Emin Mahrt, an ähnlich coolen Sachen zu arbeiten, schreib mir einfach an emin@nuri.com. Der folgende Artikel basiert auf unserer früheren Arbeit, dem Re-Architecting von Ethereums EVM. Ich war nur Zuschauer, aber es war eines der interessantesten Dinge der letzten Jahre, dem zu folgen und zuzuhören. Also dachte ich, es ist schön, das hier für andere zu teilen.

<https://www.youtube.com/watch?v=a77DGGzMyN8>

## Warum die EVM repariert werden muss

Wenn man sich die Ethereum Virtual Machine (EVM) aus der Perspektive von Sprachdesign und Low-Level-Laufzeitsicherheit ansieht, erkennt man viele Engpässe in der Architektur. Die EVM ist eine untypisierte, stackbasierte Maschine mit einem flachen Speichermodell, die stark auf Low-Level-Byte-Manipulation, beliebige Sprünge und rohe 256-Bit-Wörter setzt. Damit ließ sich das frühe Smart-Contract-Ökosystem bootstrappen, aber diese Designentscheidungen führten zu aufgeblähtem Bytecode, langsamer Ausführung und häufigen Sicherheitslücken.

In einem technischen Deep Dive erklärt Dr. Erik Stenman die Architektur der Fast Aeternity Transaction Engine (FATE), einer High-Level-, stark typisierten virtuellen Maschine, die gebaut wurde, um die alten Fehler der EVM zu beheben. Indem Stenman und sein Team neu dachten, wie eine Blockchain-VM mit State, Speicher und Code-Ausführung umgeht, bekamen sie eine Ausführungsumgebung, in der der kompilierte Code praktisch 10-mal kleiner ist und 3-mal schneller läuft als das EVM-Äquivalent davor.

Das hat Stenman getan, um das Ethereum-EVM-Paradigma besser zu machen.

## Typisierte Variablen statt flachem Speicher

Eines der gefährlichsten Dinge an der EVM ist, dass sie auf rohe Speicherpointer setzt. In der EVM lesen und schreiben Smart Contracts rohe Bytes in ein lineares Speicher-Array, und das kann leicht in Out-of-Bounds-Fehlern, Pointer-Aliasing oder dem Lesen der Bytes als eine andere Datenstruktur enden, als sie wirklich sind.

Stenman hat den flachen Speicher komplett aus der VM entfernt. Statt Speicheradressen nutzt FATE Variablen, separate Speicher-Slots, die lokal im Scope einer Funktion leben. Ein Speicher-Slot in FATE begrenzt nicht die Größe der Daten, die er hält, und die Daten tragen ihr eigenes Type-Tag. Wenn ein Slot einen Boolean hält, garantiert die VM, dass er nur als Boolean gelesen wird (`true` oder `false`), sodass die Mehrdeutigkeit von "0 oder 1"-Integer-Auswertungen verschwindet.

FATE abstrahiert auch die Arbeit mit dem State-Tree. Es nutzt eine spezielle Klasse von Variablen mit "negativen Namen" (zum Beispiel `-1`, `-2`). Das Schreiben in eine negative Variable plant einen Schreibvorgang in den persistenten State-Tree des Contracts. Entwickler müssen also keine komplexen Storage-Pointer von Hand verwalten, wie die `SLOAD`- und `SSTORE`-Key-Ableitungen in der EVM.

## Funktionen statt beliebiger Sprünge

Der Kontrollfluss in der EVM stützt sich stark auf Program Counter (PC) und beliebige Sprünge. Ein Smart Contract auf der EVM startet die Ausführung bei Adresse `0x00` und arbeitet als ein riesiger monolithischer Codeblock, bei dem Jump-Tables die Ausführung basierend auf einem 4-Byte-Funktionsselektor zu einer bestimmten Funktion leiten.

FATE behandelt Funktionen und Typsignaturen als native, First-Class-Dinge auf VM-Ebene. Die Ausführung startet nicht mehr bei einem beliebigen `0x00`-Einstiegspunkt. Ein Aufrufer benennt die exakte Funktion und übergibt typisierte Argumente, und die VM prüft diese Argumente gegen die strikte Typsignatur der Funktion, bevor die Ausführung überhaupt beginnt.

Innerhalb einer Funktion repräsentiert FATE Code nur als Sequenz von Basic Blocks. Es gibt keinen rohen "Code-Speicher", den man manipulieren oder in den man springen könnte. Ein Basic Block ist einfach eine Liste von Anweisungen in Reihenfolge, und sobald man Verzweigungen braucht, wechselt die Ausführung sauber zu einem neuen, klar markierten Basic Block. Die "invalid jump destination"-Bugs, die für EVM-Bytecode typisch sind, sind damit strukturell unmöglich.

## High-Level-Datentypen und Maps in der VM

Die EVM kennt nativ genau einen Datentyp, ein 256-Bit-Wort. Um mit Strings, Listen, Arrays oder beliebig großen Zahlen zu arbeiten, muss der Compiler tausende Zeilen Assembly injizieren, um Bytes zu padden, Pointer zu verwalten und Längen zu berechnen.

FATE packt komplexe Datentypen direkt in die VM-Runtime, und das reduziert Bytecode-Bloat und Ausführungsoverhead enorm. Statt eines hartkodierten 256-Bit-Limits, das Overflows riskiert oder einen zwingt, teure SafeMath-Bibliotheken einzubinden, unterstützt FATE nativ Integer unendlicher Größe. Es behandelt Tupel, Listen und Variant-Typen (zum Beispiel Optional-Typen) nativ. Und Blockchain-Dinge wie Adressen, Contracts, Oracles und State Channels sind native, stark optimierte Typen in FATE. Wenn man mit ihnen arbeitet, führt die VM native Opcodes aus, die direkt in die Transaktionsmechanik des Nodes einhaken, und überspringt den massiven Overhead von EVM-External-Calls.

In der EVM bedeutet das Speichern von Mappings (Key-Value-Stores), dass man den Key mit der Position des Storage-Slots hasht, um eine zufällige 256-Bit-Speicheradresse zu bekommen. Das macht das Iterieren über Mappings unmöglich, und Lese- und Schreibvorgänge sind relativ teuer. Stenman hat Maps als separates Ding designed, das außerhalb des normalen Variablenspeichers behandelt wird. FATE erlaubt lokale Memory-Maps, aber State-Maps werden effizient direkt im Aeternity State-Tree gespeichert. Ein Entwickler arbeitet natürlich mit der Map, und die FATE-Engine verschiebt und bündelt die echten Lese- und Schreibvorgänge zum State-Tree und liest nur exakt die Elemente, die man angefragt hat.

## Die Ergebnisse

Durch das Entfernen des flachen Speichers, das Hinzufügen nativer High-Level-Typen und strikten Basic-Block-Kontrollfluss hat Stenman das massive Compiler-Boilerplate ausgeschnitten, das EVM-Smart-Contracts plagt. Die Ergebnisse in Stenmans Benchmark sind groß. FATE-Contract-Bytecode ist etwa 9,6-mal kleiner (rund 10% der Größe) als derselbe Contract, kompiliert für eine EVM-Architektur. Und weil die VM null Zyklen darauf verwendet, Padding-Bytes zu parsen, Speicher-Offsets zu berechnen oder monolithisches Jump-Routing auszuführen, läuft FATE dreimal schneller und die Gas-Kosten für den Endnutzer sinken deutlich.

![](../../../media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png)
