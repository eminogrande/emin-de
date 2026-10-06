---
title: "Vom Mt. Gox-Crash zum Self-Custody-Revival: Warum ich die Bank Nuri mit Bitcoin gekauft habe"
description: "Mein Einstieg in Bitcoin war 2012 — noch vor der Ära der ASIC-Miner. Ein Freund, ein Google-Quant, der vierdimensionale Physik studierte, hatte Bitcoin..."
date: "2026-04-09T09:35:16.269Z"
updated: "2026-04-09T09:35:16.269Z"
lang: "de"
category: "bitcoin"
format: "essay"
author: "emin"
provenance: "mixed"
ai_assisted: true
reviewed_by_human: false
source: "medium"
third_party_summary: false
voice_check:
  em_dash: 15
  unobserved: 181
emin_check_pct: null
original_url: "https://medium.com/@em/vom-mt-gox-crash-zum-self-custody-revival-warum-ich-die-bank-nuri-mit-bitcoin-gekauft-habe-7a0854976140"
---
Mein Einstieg in Bitcoin war 2012 — noch vor der Ära der ASIC-Miner. Ein Freund, ein Google-Quant, der vierdimensionale Physik studierte, hatte Bitcoin entdeckt. Er war fest davon überzeugt, dass er dank seiner mathematischen Skills besser traden konnte als jeder Wall-Street-Banker. Er erzählte mir davon und meine allererste Reaktion war die typisch deutsche: *„Ist das legal?“* Ich ärgere mich heute noch, dass das meine erste Frage war.

Wir fingen an, Arbitrage-Trading zwischen Mt. Gox und BTC-e zu machen. Ich hatte vorher noch nie das Wort „Arbitrage“ oder „Trading“ gehört, mich nie mit Finance beschäftigt. Ich kam einfach durch ihn rein. Gleichzeitig betrieb ich ein gedrucktes Magazin hier in Berlin — jeden Monat 20.000 Stück, vier Jahre lang. Eine absolute Insanity, die 10.000 Euro pro Monat kostete und nur durch 100 ehrenamtliche Helfer möglich war. Dieses Magazin nutzte ich, um mich selbst zu bilden: Ich schnappte mir spannende Leute aus der Szene und machte Interviews. Mit Charlie Shrem, oder den KNC-Miner-Gründern, den ersten Entwicklern. So kapierte ich schnell: Wir arbeiten hier an etwas viel Bedeutenderem als nur ein bisschen Arbitrage-Trading.

## Die harte Schule: Mt. Gox, der DAO-Hack und die Flucht vor dem Burnout

Dann implodierte Mt. Gox. Wir hatten mehr als die Hälfte unserer Bitcoins verloren, weil wir unsere Arbitrage-Gewinne nur in Excel-Tabellen (Paper Trading) verwalteten und die Coins nicht zwischen den Börsen verschoben. Wir hatten die schlaue Idee, Mt. Gox sei sicherer als BTC-e — ein fataler Irrtum. Zusätzlich saßen wir auf einem frisch gekauften Miner für 30.000 Euro, den ich mir mit fünf Leuten teilte. Das hat uns als junge Typen richtig wehgetan. *„Fuck you, Bitcoin“* — wir haben den Miner verkauft, unsere Losses gehedgt und waren erst mal raus.

Parallel zum Untergang von Mt. Gox startete hier in Berlin Ethereum. Vitalik, Gavin Wood — alle waren hier, es war neu und geil. Wir fanden die Idee des DAOs fantastisch und steckten all unser Geld rein. Und dann? Wurde der DAO gehackt. Nach dem Fork, dem Drama um Ethereum vs. Ethereum Classic und der Erkenntnis, dass 80 % gepremint waren, hatte ich die Schnauze voll. Ich wandte mich von Crypto ab und fokussierte mich auf Machine Learning. Ich kam aus der Berliner Club- und Eventszene und baute einen KI-Agenten, der online Flyer an die richtigen Leute verteilte, um Tickets zu verkaufen. Das machte ich vier Jahre. Später zog es mich wieder ins Crypto-Ökosystem: Ein Kumpel raiste 100 Millionen, zog in die Schweiz, um den Ethereum-Killer zu bauen, und ich machte vier Jahre lang mit. Ich entwickelte Hardware-Wallets, bis ich mit Ende 30 komplett im Burnout landete. Ich dachte, ich würde nie wieder etwas aufbauen — bis KI um die Ecke kam. Der Drang, wieder zu bauen, war plötzlich stärker als die Erschöpfung.

## Kapitalismus mit Anstand: Wie Nuri scheiterte und warum ich es kaufte

Nun zum Namen Nuri. Mein Vater heißt Nuri. Die Berliner Firma Bitwala (die erste, die Bitcoin mit Bank- und Kartentransfers verband) war extrem erfolgreich, raiste fast 42 Millionen Euro und nannte sich in Nuri um. Ihr Problem? Sie verließen sich auf Dritte. Sie brauchten Lizenzen für Custody, hatten externe Bank-Partner, Visa-Partner und boten Bitcoin-Savings-Accounts über Celsius an. Sie hatten 200 Mitarbeiter, 45 Millionen Euro — und nach zwei Jahren mussten sie schließen. Sie haben es schlicht nicht hingekriegt. Das Verrückte: Bis auf ein paar Personen, die die geniale Idee hatten, BTC bei Celsius zu deponieren, hat kein Nutzer Geld verloren. Eine halbe Million Leute nutzten Nuri.

Weil mein Vater Nuri heißt, bot ich an: Ich kaufe Nuri. Sie wollten natürlich nicht verkaufen, aber nach zwei Jahren Verhandlung — im Januar letzten Jahres bei einem Bitcoin-Kurs von rund 120.000 Euro — kamen sie auf mich zurück. Bitcoin für Nuri.com und alle Rechte. Wir bekamen Markenrechte, 500 Figma-Files, Illustrationen, Videomaterial… Der Wahnsinn, was 200 Leute in zwei Jahren mit 40 Millionen Euro an Content produzieren.

## Der Neustart: Self-Custody ohne Kompromisse

Was ist bei Nuri schiefgelaufen? Third-Party-Dependency und Custody. Genau das haben wir jetzt abgeschafft. Das neue Nuri ist komplett self-custodial. Es ist live in ganz Europa und macht im Prinzip das Gleiche wie die alte Version — aber sicher.

- Du bekommst eine kostenlose Visa-Karte und eine kostenlose IBAN.
- Die IBAN ist mit deinem Wallet verknüpft: Schickst du Geld an die IBAN, wird es gemintet; machst du eine Banküberweisung, wird es geburnt (via Monerium).
- Die Visa-Karte ist on-chain und Stablecoin-basiert (via GnosisPay).

Wenn Gnosis, Monerium oder wir verschwinden — dein Geld verschwindet nicht. Du hast die Keys. Wir nutzen Passkeys, aber nicht wie andere Anbieter (z.B. Privy), die im Grunde nur gehostete Wallets mit WebAuthn-Authentifizierung bauen, bei denen deine Wallets weg sind, wenn der Server offline geht. Wir nutzen WebAuthn PRF (Pseudo-Random Function). Das ist deterministisch: Aus deinen Passkeys (wie YubiKeys) generieren wir immer den gleichen Seed und daraus deine Private Keys. Die Keys sind nicht fischbar, und wir verhindern, dass 99,9 % der Nutzer ihre Seed Phrase aus Unwissenheit an Phisher verraten.

Zusätzlich ist Nuri ein Multisig-Wallet mit einem *Decaying Multisig*: Ein stateless Co-Signing-Server signiert mit, aber sollte er verschwinden, verfällt die Co-Signing-Pflicht nach einer bestimmten Zeit, und du kannst mit deinem eigenen Key exiten. Zero Kompromisse bei Self-Custody — genau deshalb arbeiten wir jetzt auch mit Arkade zusammen. Arkade versteht, dass es bei Self-Custody keine Kompromisse geben darf.

## Der Plan: Krypto-Abstraktion für den Normalnutzer

Unsere Zielgruppe ist der Non-Technical-User, der Anfänger. In unserer Wallet gibt es nur zwei Balances: Bitcoin und Euro/Dollar. Wenn du an der Kasse einen QR-Code scannst und 10 Euro mit Solana oder USDC zahlen sollst, swappen wir im Hintergrund aus deinem Euro- oder Bitcoin-Bestand. Und genau das wollen wir nun auch für Bitcoin und Lightning über Arkade abbilden. Der Nutzer soll sich keine Gedanken über die zugrundeliegende Blockchain machen — er drückt auf „Zahlen“ und es funktioniert.

Wir sind aktuell ein kleines Team von vier Leuten, haben nur 200 Nutzer, aber das ganz bewusst. Wir sind noch am Bauen und stellen gerade komplett auf Arkade um. Da Nuri früher eine halbe Million Nutzer hatte und die Marke extrem stark ist (übrigens nicht nur in Europa, „Nuri“ bedeutet auf Koreanisch „Welt“ und ist im asiatischen und arabisch-türkischen Raum “Licht” ein riesiger Brand), glauben wir, dass wir in den nächsten sechs Monate schnell auf 5.000 bis 10.000 aktive Nutzer wachsen können. Unsere Frontend-Gebühr von 1-2% hält dabei automatisch Whales und Spam fern — für große Summen lohnt es sich nicht, aber für den täglichen Gebrauch ist es perfekt.

Wir sind live im iOS App Store in Europa, eine Android- und PWA-Version kommt bald. Mit Partnern wie Mercuryo kannst du bei Nuri sogar bis zu 700 Euro via Apple Pay ohne ID-Verifikation direkt in Bitcoin kaufen. Das ist der On-Ramp, den die Leute brauchen. Wir sehen uns als großes Puzzle, bei dem wir die besten Partner (wie Arkade, Monerium, Gnosis) zusammenstecken, um echte Self-Custody für den Mainstream nutzbar zu machen — ohne Gatekeeping, ohne Custody-Risiko.

Lass uns das gemeinsam bauen.
