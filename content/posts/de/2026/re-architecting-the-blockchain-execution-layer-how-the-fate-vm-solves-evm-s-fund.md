---
title: "Wie die FATE-VM die grundlegenden Fehler der EVM behebt"
description: "Erik Stenman hat FATE gebaut, eine typisierte VM ohne flachen Speicher und ohne rohe Sprünge. Verträge werden dadurch etwa zehnmal kleiner und laufen dreimal schneller als auf der EVM."
date: "2026-03-19T03:50:15Z"
updated: "2026-03-19"
lang: de
translated_from: "en/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund"
source_sections: ["no-more-flat-memory", "functions-and-basic-blocks-instead-of-jumps", "real-data-types-in-the-vm", "maps-outside-normal-storage", "the-benchmark"]
category: building
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Dr. Erik Stenman hat FATE entworfen, Aeternitys stark typisierte VM, um die alten Fehler der EVM zu beheben.", "Sie verzichtet auf flachen Speicher und beliebige Sprünge und baut echte Datentypen und Maps direkt in die VM ein.", "Der kompilierte Code ist etwa zehnmal kleiner und läuft dreimal schneller als auf der EVM."]
sections: [{"basically": "FATE ersetzt rohe Speicherzeiger durch typisierte Variablen, sodass ein Boolean nur als Boolean gelesen werden kann."}, {"basically": "Aufrufer benennen eine typisierte Funktion, und der Code läuft in Basisblöcken, sodass ungültige Sprünge gar nicht erst vorkommen können."}, {"basically": "Ganzzahlen ohne Größenlimit, Listen, Tupel und native Blockchain-Typen nehmen dem Compiler jede Menge Ballast ab."}, {"basically": "State-Maps liegen im State-Tree, und FATE liest nur genau die Elemente, die du anforderst."}, {"basically": "FATE-Bytecode ist etwa 9,6-mal kleiner als EVM-Bytecode und läuft dreimal schneller."}]
---
Wenn du dir die Ethereum Virtual Machine (EVM) mal mit den Augen eines Sprachdesigners anschaust und dir Sicherheit auf Runtime-Ebene wichtig ist, siehst du eine Menge Probleme in der Art, wie sie gebaut ist.

Die EVM ist eine untypisierte Stack-Maschine mit flachem Speicher. Sie arbeitet mit Low-Level-Byte-Handling, Sprüngen an beliebige Stellen und rohen 256-Bit-Wörtern. Das reichte, um die ersten Smart Contracts zum Laufen zu bringen, aber es brachte uns auch aufgeblähten Bytecode, langsame Ausführung und jede Menge Sicherheitslücken.

In einem technischen Deep Dive erklärt Dr. Erik Stenman, wie die Fast Aeternity Transaction Engine (FATE) aufgebaut ist. Es ist eine hochlevelige, stark typisierte virtuelle Maschine, und sie wurde ganz bewusst gebaut, um die alten Fehler der EVM zu beheben.

Stenman und sein Team haben neu darüber nachgedacht, wie eine Blockchain-VM State, Speicher und laufenden Code handhabt, und heraus kam eine VM, bei der der kompilierte Code etwa 10-mal kleiner ist und 3-mal schneller läuft als die EVM-Version davor.

Hier also, was Stenman getan hat, um das "Ethereum-EVM-Paradigma" besser zu machen.

## Kein flacher Speicher mehr

Das Erste ist der Speicher. Einer der gefährlichsten Teile der EVM ist, dass sie mit rohen Speicherzeigern arbeitet. Smart Contracts lesen und schreiben rohe Bytes in ein einziges langes Speicher-Array, und das gibt dir ganz leicht Out-of-Bounds-Fehler, Pointer-Aliasing oder Bytes, die als falsche Datenstruktur gelesen werden.

Stenman hat den flachen Speicher einfach aus der VM rausgeworfen. FATE hat keine Speicheradressen, es hat Variablen, separate Storage-Slots, die lokal im Scope einer Funktion leben. Ein Slot begrenzt nicht, wie groß die Daten darin sein dürfen, und die Daten tragen immer ihr eigenes Type-Tag.

Wenn ein Slot einen Boolean hält, stellt die VM sicher, dass er auch nur als Boolean gelesen wird (`true` oder `false`), es gibt also kein Rätselraten mehr mit "0 oder 1"-Integern.

Für State benutzt FATE eine spezielle Art von Variable mit "negativen Namen", wie `-1` oder `-2`. Wenn du in eine negative Variable schreibst, plant die VM einen Schreibzugriff auf den persistenten State-Tree des Contracts.

Entwickler müssen also nicht mehr von Hand komplexe Storage-Pointer verwalten, wie die `SLOAD`- und `SSTORE`-Key-Ableitungen in der EVM.

## Funktionen und Basic Blocks statt Sprünge

Das Zweite ist der Kontrollfluss. Die EVM hängt von Program Countern (PC) und Sprüngen an beliebige Stellen im Code ab. Ein Contract auf der EVM startet an Adresse `0x00`, er ist ein einziger riesiger Codeblock, und er benutzt Jump Tables, um anhand eines 4-Byte-Funktionsselektors zur richtigen Funktion zu kommen.

FATE macht Funktionen und Typsignaturen zu echten First-Class-Dingen in der VM. Die Ausführung startet nicht mehr an irgendeinem `0x00`-Einstiegspunkt. Der Aufrufer nennt die exakte Funktion und übergibt typisierte Argumente, und die VM prüft diese Argumente gegen die strikte Typsignatur der Funktion, bevor irgendetwas läuft.

Innerhalb einer Funktion hält FATE den Code als Liste von Basic Blocks und sonst nichts. Es gibt keinen rohen "Code-Speicher", den du ändern oder in den du springen könntest. Ein Basic Block ist einfach eine Liste von Instruktionen, die nacheinander laufen.

Sobald du einen Branch brauchst, geht die Ausführung in einen neuen, klar markierten Basic Block über. Die "Invalid Jump Destination"-Bugs, die du aus EVM-Bytecode kennst, können also per Design einfach nicht passieren.

## Echte Datentypen in der VM

Das Dritte sind Datentypen. Die EVM kennt genau einen Datentyp, ein 256-Bit-Wort. Wenn du Strings, Listen, Arrays oder richtig große Zahlen willst, muss der Compiler Tausende Zeilen Assembly einschleusen, um Bytes zu padden, Pointer zu verwalten und Längen zu zählen.

FATE packt komplexe Datentypen direkt in die VM-Runtime, und das schneidet eine Menge Bytecode-Bloat und Ausführungskosten weg. FATE hat Integer ohne Größenlimit, also keine harte 256-Bit-Grenze, die überlaufen kann oder dich zwingt, eine teure SafeMath-Library reinzuziehen.

Sie handhabt Tupel, Listen und Variant-Typen (zum Beispiel optionale Typen) nativ. Und Blockchain-Dinge wie Adressen, Contracts, Oracles und State Channels sind native und stark optimierte Typen in FATE.

Wenn du mit ihnen arbeitest, führt die VM native Opcodes aus, die direkt in die Transaktionsmechanik der Node greifen, du überspringst also den ganzen Overhead externer Aufrufe in der EVM.

## Maps außerhalb des normalen Storage

Das Vierte sind Maps. In der EVM funktioniert ein Mapping (ein Key-Value-Store), indem der Key zusammen mit der Position des Storage-Slots gehasht wird, und das ergibt eine zufällige 256-Bit-Speicheradresse.

Du kannst also nicht über ein Mapping iterieren, und Lese- und Schreibzugriffe sind ziemlich teuer. Stenman hat Maps zu einem eigenen Ding gemacht, das außerhalb des normalen Variablen-Storage behandelt wird. FATE lässt dich lokale Memory-Maps haben, aber State-Maps sitzen direkt und effizient im Aeternity-State-Tree.

Ein Entwickler benutzt die Map einfach wie eine normale Map, und die FATE-Engine wartet und bündelt die echten Lese- und Schreibzugriffe auf den State-Tree, und sie liest nur exakt die Elemente, die du anforderst.

## Der Benchmark

Indem er den flachen Speicher rausnahm, native High-Level-Typen hinzufügte und strikten Basic-Block-Kontrollfluss nutzte, hat Stenman den riesigen Compiler-Boilerplate losgeworden, mit dem EVM-Smart-Contracts vollgestopft sind.

Die Zahlen in seinem Benchmark sind groß. FATE-Bytecode ist etwa 9,6-mal kleiner (grob 10 % der Größe) als derselbe Contract, kompiliert für die EVM. Und weil die VM null Zyklen für Byte-Padding, Speicher-Offsets oder ein einziges großes Jump-Routing verschwendet, läuft FATE dreimal schneller und Gas wird für den Nutzer deutlich billiger.

<p><img src="/media/re-architecting-the-blockchain-execution-layer-how-the-fate-/cover.webp" alt="cover"></p>
