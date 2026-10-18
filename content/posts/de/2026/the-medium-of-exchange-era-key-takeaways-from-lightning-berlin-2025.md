---
title: "Die Ära des Tauschmediums: Die wichtigsten Erkenntnisse von Lightning++ Berlin 2025"
description: "Tag eins von Lightning++ Berlin 2025. Bitcoin als Geld, das man ausgibt, KI-Agenten, die in Sats zahlen, leichtere Watchtowers und BitVMX."
date: "2026-01-15T09:40:01Z"
updated: "2026-01-15"
lang: de
translated_from: "en/the-medium-of-exchange-era-key-takeaways-from-lightning-berlin-2025"
source_sections: ["michael-markle-on-spending-bitcoin", "roland-buick-on-bitcoin-for-ai-agents", "sergio-lerner-on-watchtowers-and-bitvmx", "the-panel-on-bringing-your-own-wallet", "what-this-means-for-a-business"]
category: bitcoin
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-medium-of-exchange-era-key-takeaways-from-lightning-berlin-2025/cover.webp"
third_party_summary: true
tldr: ["Tag eins von Lightning++ Berlin 2025 drehte sich um Bitcoin als Geld, das Leute ausgeben, nicht nur als digitales Gold.", "Markles Team verarbeitete 4.183 Lightning-Transaktionen in 8 Stunden, und er will, dass Händler einen Fiat-Aufschlag verlangen.", "Buick sieht Bitcoin als die native Währung von KI-Agenten, und Lerner zeigte günstigere, privatere Watchtowers und BitVMX."]
sections: [{"basically": "Michael Markle will, dass Händler aufhören, Bitcoin-Rabatte zu geben, und stattdessen einen Fiat-Aufschlag verlangen."}, {"basically": "KI-Agenten können keine Bankkonten eröffnen, also werden Lightning und Nostr Wallet Connect zu ihrer Geld-API."}, {"basically": "Sergio Lerners Design reduziert den Watchtower-Speicher auf 2KB pro Zustand und versteckt Channel-IDs und Beträge."}, {"basically": "Apps wie Stacker News halten keine Gelder mehr, und Nutzer bringen ihre eigene Wallet über NWC mit."}, {"basically": "Verlang mehr für Fiat, gib KI-Agenten eine Lightning-API, und mach Zahlungen zu etwas, das man fühlen kann."}]
---
![](../../../media/the-medium-of-exchange-era-key-takeaways-from-lightning-berlin-2025/cover.jpg)

Ein Rückblick auf den ersten Tag der Lightning++ Berlin 2025, mit Vorträgen von Michael Markle, Roland Buick und Sergio Lerner sowie einem Panel mit Zeus, Stacker News und Albi.

Die Botschaft des ersten Tages war klar: Bitcoin ist nicht mehr nur "digitales Gold", ein passives Wertaufbewahrungsmittel. Im Mittelpunkt stand Bitcoin als schnelles, programmierbares Geld, das Menschen tatsächlich ausgeben, nativ sowohl in physischen Läden als auch in der wachsenden KI-Wirtschaft.

Hier sind die wichtigsten Vorträge, was sich auf der Tech-Seite ändert und die Takeaways von der Hauptbühne.

## Michael Markle über das Ausgeben von Bitcoin

Michael Markle von BTC Inc. sprach über die "Hyper-Bitcoinisierung" der physischen Welt, mit echten Daten von der Bitcoin 2024 Nashville Konferenz.

Markle sagt, Bitcoin folgt exakt dem gleichen historischen Pfad wie das Konzept der Zeit. Zuerst war es ein Sammlerobjekt, wie antike Sonnenuhren, und das ist das frühe Bitcoin. Dann ein Speicher von Wissen und Wert, wie Kalender und landwirtschaftliche Zyklen, und da steht Bitcoin heute größtenteils. Dann ein Tauschmittel, wie Uhren zur Koordination der Welt, und das ist das 15-Jahres-Ziel. Und zuletzt eine Recheneinheit, globale Synchronisation, die Endstufe.

Die Zeit brauchte 3.000 Jahre, um zur Endstufe zu gelangen, aber Markle denkt, das Internet prescht das für Bitcoin in etwa 30 Jahre zusammen.

Er hatte auch eine radikale Idee für Händler. Hört auf, Bitcoin-Rabatte zu geben, und fangt an, einen Fiat-Aufschlag zu verlangen.

Fiat-Zahlungen kommen mit einem Haufen Overhead, KYC für Firmenanteilseigner, Gebühren für Zahlungsdienstleister und komplizierte Buchhaltung. Bitcoin settled sofort und ohne Erlaubnis. Wenn Händler für Fiat mehr verlangen, zeigt der Preis, was das Legacy-Finanzsystem wirklich kostet, und die Leute bekommen einen Grund, das Lightning Network zu nutzen.

Um zu zeigen, dass Lightning bei physischen Events skaliert, hat Markles Team einen Guinness-Weltrekord aufgestellt. Sie verarbeiteten 4.183 einzelne Bitcoin-Transaktionen in einem 8-Stunden-Fenster.

Was es schnell genug machte, war die Bolt Card, Lightning-Zahlungen über NFC. Und die Leute liebten die physischen Signale, das "Coin-Ping"-Geräusch und die "Laser Eyes" auf den POS-Terminals. Das machte das Ausgeben von digitalem Geld viel einfacher.

## Roland Buick über Bitcoin für KI-Agenten

Dann die KI-Agenten-Wirtschaft. Roland Buick von Albi erklärte, warum Bitcoin die "native Währung der KI" ist.

Wir bewegen uns von einer Welt, in der Menschen Apps benutzen, zu einer Welt, in der KI-Agenten Protokolle benutzen. KI-Agenten können nicht einfach ein normales Bankkonto eröffnen. Das Lightning Network gibt ihnen eine permissionless API für Wert, die sie nativ nutzen können.

Nostr Wallet Connect, NWC, wird zur Hauptbrücke zwischen Apps und Geld.

Entwickler "schreiben einmal und verbinden mit vielen". Statt 50 verschiedene Wallet-APIs zu integrieren, nutzen sie NWC als Standard. Und es ist non-custodial by default. Apps müssen keine User-Gelder mehr halten, was weniger regulatorisches Risiko bedeutet. Sie fragen einfach das verbundene Wallet des Users um Erlaubnis zum Ausgeben.

Buick stellte auch das Model Context Protocol vor, MCP, das wie ein "USB-C-Port" für KI-Modelle funktioniert, und "Paid MCP" darauf. Mit Bitcoin können KI-Agenten automatisch für spezifische Tools, Echtzeitdaten oder Premium-Compute bezahlen, pro Nutzung. So bekommst du eine Mikrozahlungs-Wirtschaft, in der Maschinen andere Maschinen in Satoshis bezahlen, ohne Mensch dazwischen.

## Sergio Lerner über Watchtowers und BitVMX

Sergio Lerner, CTO von Fairgate, hielt den technischsten Vortrag des Tages. Es ging darum, das Lightning Network privater und günstiger für Watchtowers zu machen.

Watchtowers stoppen Betrug, indem sie alte Channel-States überwachen, und heute brauchen sie riesige Mengen an Speicher. Lerner schlug ein neues Design für Payment Channels mit One-Time Signatures vor, OTS, bei dem ein Watchtower nur 2KB Daten pro State speichert.

Das Design kann auch die Channel-ID und die Beträge vor dem Watchtower selbst verstecken, eine Art von Privacy, die Off-Chain-Scaling noch nie hatte.

BitVMX ist eine virtuelle CPU, die Bitcoin komplexe Berechnungen durch ein Fraud-Proof-Game ausführen lässt. Die Logik, wie BLS-Signaturen oder komplexe Smart Contracts, läuft off-chain. Bitcoin wird nur on-chain involviert, wenn es einen Dispute gibt. Und es braucht keinen Soft Fork. Das ist wichtig, weil es Ethereum-ähnliche Programmierung zu Bitcoin bringt, ohne das Base-Layer-Protokoll zu ändern.

## Das Panel über Bring Your Own Wallet

Im Panel mit Zeus, Stacker News und Albi kam ein Thema immer wieder. Apps bewegen sich hin zu User-Souveränität, Bring Your Own Wallet, BYOW.

Jahrelang brauchte das Verbinden einer Phone-Wallet mit einem Node zu Hause Tor, und Tor ist oft langsam und bricht viel. Das Panel verwies auf den Wechsel zu Nostr dafür, was schneller ist und besser hält, wenn man einen Node von weit weg kontrolliert.

Und die Walled Gardens enden. Apps wie Stacker News bewegen sich weg davon, Custodians zu sein. Mit NWC bringen User ihre eigene Liquidität und ihre eigenen Wallets mit, und die App ist nur ein soziales Interface auf dem Bitcoin-Netzwerk.

## Was das für ein Business bedeutet

Was bedeutet das also für ein Business? Hör auf, auf Adoption zu warten, und gib den Leuten einen Grund. Verlang mehr für Fiat.

Mach deinen Service fit für KI. Wenn er keine Lightning-API hat, werden KI-Agenten 2026 nicht bei dir kaufen können.

UX ist etwas, das man fühlt. Physisches Feedback wie NFC-Karten, Sounds und Lichter ist das, was digitales Geld für normale Leute real fühlen lässt.

Beobachte BitVMX. Dieses Protokoll könnte der Schlüssel sein, um DeFi und fortgeschrittene Smart Contracts zu Bitcoin zu bringen und seine Sicherheit zu behalten.

Mehr über Lightning++ Berlin 2025 und die nächsten Tage auf der [Lightning++ Website](https://lightning-plus-plus.com).
