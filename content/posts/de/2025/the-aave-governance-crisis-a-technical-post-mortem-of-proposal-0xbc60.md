---
title: "Die Aave-Governance-Krise, ein Post-Mortem von Proposal 0xbc60"
description: "Aave Labs hat das Frontend-Swap-Geld eingestrichen, die DAO wollte die Marke zurück, und dann hat Labs die Abstimmung allein durchgedrückt. Was passiert ist und was das für DAOs bedeutet."
date: "2025-12-22T18:25:02Z"
updated: "2025-12-22"
lang: de
translated_from: "en/the-aave-governance-crisis-a-technical-post-mortem-of-proposal-0xbc60"
source_sections: ["the-handshake-that-broke", "proposal-0xbc60", "the-aave-labs-side", "the-unilateral-snapshot-vote", "code-on-chain-brand-off-chain", "what-it-means-for-daos"]
category: bitcoin
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-aave-governance-crisis-a-technical-post-mortem-of-proposal-0xbc60/cover.webp"
tldr: ["Im Dezember 2025 hat Aave Labs CowSwap-Frontend-Geld an die eigene Adresse geschickt, und die DAO sah das als Vertrauensbruch.", "Ernesto Boado von BGD Labs schlug vor, Domain, Social-Media-Handles und Marken-IP auf eine DAO-kontrollierte Entität zu übertragen.", "Am 22. Dezember 2025 hat Aave Labs die Abstimmung allein zu Snapshot geschickt, direkt vor den Feiertagen.", "Der Streit zeigt, dass DAOs keine Verbindung zwischen dem Code on-chain und der Marke und IP off-chain haben."]
sections: [{"basically": "Labs hat das Frontend betrieben, die DAO besaß das Protokoll. Das CowSwap-Geld, das an Labs ging, hat diesen Deal beendet."}, {"basically": "Boados Vorschlag: Die Marke an die DAO übertragen und unter durchsetzbaren Bedingungen zurücklizenzieren."}, {"basically": "Labs will eine Consumer-Fintech-App bauen und sagt, eine DAO sei zu langsam, um eine Marke zu führen."}, {"basically": "Labs hat die Abstimmung allein für den 23. Dezember durchgedrückt. Delegates nannten das eine feindliche Übernahme, AAVE ist gefallen."}, {"basically": "Contracts gehören den Token-Holdern, die Domain und das Frontend nicht. Der Code kann sich nicht ändern, Konsens schon."}, {"basically": "Stimm ja und kämpf um die IP, stimm nein und lass Service-Provider den Frontend-Wert nehmen."}]
---
![](../../../media/the-aave-governance-crisis-a-technical-post-mortem-of-proposal-0xbc60/cover.jpg)

Ende Dezember 2025 steckte die Aave DAO in der größten Krise seit es das Protokoll gibt. Es fing als technischer Streit an, wer das Geld aus dem [app.aave.com](http://app.aave.com) Frontend bekommt, und am Ende redeten alle von einer feindlichen Übernahme.

Damit ist es jetzt ein Fallbeispiel für etwas, das jede DAO früher oder später erwischt: der Graben zwischen dem Protokoll, also Code, der sich nicht ändern kann, und dem Produkt, also einer Marke, die das sehr wohl kann.

Dieser Post geht den Governance-Thread mit 164 Posts durch, den Alleingang von Aave Labs, die Abstimmung auf Snapshot zu erzwingen, und was das alles für dezentrale Governance im Großen und Ganzen bedeutet.

## Der Handschlag, der gebrochen ist

Jahrelang lief die Aave-Welt auf einem Handschlag. Aave Labs (vorher Aave Companies, geführt von Stani Kulechov) kümmerte sich um die Marke, und die DAO, also die Token-Holder, regierte das Protokoll.

Das funktionierte, bis Aave Labs CowSwap ins offizielle Frontend einbaute und die Überschüsse und Referral-Gelder an die eigene Firma schickte statt an die DAO Treasury.

Und das Geld ist hier entscheidend. Die Protokolleinnahmen gehen über die Reserve Factors an die DAO. Die Frontend-Einnahmen waren nie richtig definiert und waren früher winzig, aber jetzt schätzt man sie auf über 10 Mio. $ pro Jahr aus Swap-Fees und Integrationen.

Die Token-Holder, angeführt von großen Delegates wie EzR3aL und Marc Zeller von der Aave Chan Initiative, sagten, das sei ein Verstoß gegen die treuhänderische Pflicht. Die DAO hat den Aufbau des Protokolls bezahlt, über das ICO 2017 und über Grants, warum soll also eine private Firma den Wert des Frontends behalten?

Marc Zeller (ACI) sagte es so: „Es sieht so aus, als wären wir getäuscht worden, als wir das für eine natürliche Interessenübereinstimmung hielten, und wir erkennen die neue Realität an... Wenn du $AAVE besitzt, was besitzt du dann eigentlich?"

## Proposal 0xbc60

Am 16. Dezember 2025 postete Ernesto Boado (`@eboado`), Mitgründer von BGD Labs, dem zentralen technischen Dienstleister von Aave, einen Vorschlag namens „Token Alignment Phase 1 - Ownership". Die Idee war, die Trennung offiziell zu machen.

Sein Kernpunkt war technisch und juristisch zugleich. Eine DAO kann nicht autonom sein, wenn ihr öffentliches Gesicht einem privaten wohlwollenden Diktator gehört.

Der Vorschlag hatte 3 Teile. Erstens die Soft Assets übertragen, also die Domain [aave.com](http://aave.com), die Social Handles wie `@aave`, die Marken und die GitHub-Orgs, in eine juristische Hülle, die die DAO kontrolliert, zum Beispiel eine Cayman Foundation.

Dann würde die DAO diese Assets an Dienstleister zurücklizenzieren, Aave Labs eingeschlossen, unter strengen Bedingungen, die man auch wirklich durchsetzen kann. Und es gäbe „Strikte Mechanismen, damit keine dritte Partei diese Assets missbrauchen oder privat davon profitieren kann."

Boado schrieb in Post #1: „Keine Lösung für dieses Problem zu haben, ist eine existenzielle Bedrohung für das DAO-Modell... Wenn eine einzelne Partei Soft Assets wie Marke, Marketingkanäle und Gateways kontrollieren kann... werden alle anderen Mitwirkenden de facto dieser Partei untergeordnet."

## Die Seite von Aave Labs

Aave Labs hat es im Forum nicht wirklich textuell ausgefochten. Aber was sie getan haben und welche Argumente sie unterstützt haben, zeigt eine klare Verteidigungslinie, und die dreht sich um Komposierbarkeit und die Rechte einer Firma.

Stani Kulechov will, dass Aave Labs ein Consumer-Fintech-Produkt baut (Aave Horizon oder Aave App), das gegen Revolut oder Monzo antritt. In dieser Sichtweise ist [app.aave.com](http://app.aave.com) ihr eigenes Produkt, das auf dem Protokoll aufbaut. `Instadapp` und `DeFi Saver` zahlen der Aave DAO auch keine Royalties dafür, dass sie das Protokoll nutzen, also meint Aave Labs, sie hätten das Recht, mit ihrem eigenen Frontend Geld zu verdienen.

Und sie sagen, eine DAO ist einfach zu langsam, um eine Consumer-Marke zu führen, man braucht eine Firma am Steuer, um im Fintech schnell zu sein.

Ein User namens setaavefree schrieb in Post #11: „Das Aave-Protokoll, als eine Reihe von Smart Contracts, die von einer DAO gesteuert werden, ist unkonventionell... Aave das Protokoll muss keine Website besitzen, keinen Domainnamen, nicht mal eine Marke. Es existiert in perfekter und reiner Form ohne all das."

## Die einseitige Snapshot-Abstimmung

Dann, am 22. Dezember 2025, hörte es auf, eine Forumdebatte zu sein, und wurde eine echte Governance-Krise. Aave Labs nutzte ihre Admin-Rechte, um Boados Vorschlag im Alleingang zu einer Snapshot-Abstimmung zu pushen, ohne den Autor und ohne die normale Feedback-Runde.

Die Abstimmung war für den 23. Dezember angesetzt, mitten in den Feiertagen, wo die großen institutionellen Delegates weniger aktiv sind. Und Boado hatte klar gesagt, dass er den Text nicht für eine Abstimmung freigegeben hatte.

In den Posts #120 bis #130 explodierte das Forum mit Vorwürfen einer feindlichen Übernahme. Der Markt reagierte auch, $AAVE fiel um etwa 10% und ein Whale verkaufte 37 Mio. $, das Governance-Risiko wurde also eingepreist.

Boado schrieb in Post #124: „Um ganz klar zu sein: Aave Labs hat aus irgendeinem Grund entschieden, meinen Vorschlag einseitig zur Abstimmung zu überstürzen... Diese Art von Aktion bricht jede Art von Vertrauen...

Für mich ist der aktuelle Snapshot-Vorschlag, den Labs erstellt hat, nicht existent." Und Marc Zeller schrieb in Post #123: „Das hätte nicht so eskalieren müssen... Was als Vorstoß für Klarheit begann... wird jetzt zu einem feindlichen Übernahmeversuch durch Labs."

Stani Kulechov sagte auf X (früher Twitter) und über Sprecher, dass die ausführliche Diskussion von 5 Tagen genug war und dass „Abstimmen der beste Weg ist, um" die Blockade „zu lösen".

## Code on-chain, Marke off-chain

Der ganze Streit zeigt einen echten Konstruktionsfehler, wie DAOs heute gebaut sind. Es gibt keine Verbindung zwischen dem Code on-chain und dem IP off-chain. Man sieht es, wenn man sich die 4 Teile anschaut.

Die Smart Contracts gehören den Token-Holdern über den Timelock, heute und auch mit dem Wrapper. Die Domain (DNS) gehört heute Aave Labs als privater Firma, und mit dem Wrapper würde sie der juristischen Hülle der DAO gehören.

Der Frontend-Code ist heute Closed Source und privat, und er würde an die DAO lizenziert oder Open Source gemacht. Und die Einnahmen sind heute geteilt, Protokollgeld an die DAO und Frontend-Geld an Labs, und mit dem Wrapper wären sie vereinheitlicht oder streng lizenziert.

Einige Delegates (Post #113, #118) sprachen über eine Art Giftpille. Das Frontend forken, die Liquiditätsanreize auf ein neues Frontend lenken, das der DAO gehört, oder sogar ein neues Dev-Team anstellen, um Aave Labs komplett zu ersetzen.

Der Code kann sich also nicht ändern, aber der soziale Konsens drumherum kann sehr schnell kippen.

## Was es für DAOs bedeutet

Der Thread mit 164 Posts zu Proposal 0xbc60 ist eine Warnung für jede DAO, die die Frühphase hinter sich hat. Die implizite Vereinbarung, der Glaube, dass Gründer immer im besten Interesse der DAO handeln werden, ist ein Single Point of Failure.

Die DAO hat also 2 Optionen. Stimmt sie mit Ja, erzwingt sie einen juristischen Kampf um die Übertragung des IP, und wenn Aave Labs Nein sagt, könnte das in einem Fork enden.

Stimmt die DAO mit Nein, schafft sie einen Präzedenzfall, dass Dienstleister den Wert des Frontends abschöpfen können, und die DAO wird zu reiner Backend-Infrastruktur ohne Kontrolle über die eigenen Kunden. Der DeFi-Stack ist komponierbar, aber Vertrauen ist es nicht.
