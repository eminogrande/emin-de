---
title: "So funktionieren Continuous Clearing Auctions (CCA), die technische Version"
description: "Uniswaps CCA verkauft einen Token über viele Blöcke zu einem fairen Preis pro Block und richtet danach einen Uniswap v4 Pool ein. Hier die Mathematik und ein Beispiel"
date: "2025-12-02T18:15:02Z"
updated: "2025-12-02"
lang: de
translated_from: "en/continuous-clearing-auctions-cca-technical-overview"
source_sections: ["setup-and-bidding", "how-one-block-clears", "a-simple-example-with-numbers", "uniswap-v4-and-how-it-compares", "compared-to-other-launch-formats", "the-aztec-sale", "sources"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/continuous-clearing-auctions-cca-technical-overview/cover.webp"
tldr: ["Continuous Clearing Auctions verkaufen einen Token über viele Blöcke, und jeder Block wird zu einem einheitlichen Preis abgerechnet.", "Bieter legen einmal Größe und Maximalpreis fest, und das Protokoll verteilt das Gebot auf die verbleibenden Blöcke.", "Wenn der Verkauf endet, fließt das Ergebnis direkt in einen Uniswap v4 Pool.", "Der öffentliche Token-Verkauf von Aztec Network ist der erste große echte Einsatz."]
sections: [{"basically": "Das Projekt legt Supply, Dauer und Abstufungsregeln fest. Bieter schicken eine Order mit einem Maximalpreis."}, {"basically": "Jeder Block wird zum niedrigsten Preis abgerechnet, bei dem die Nachfrage das Angebot deckt, anteilig an der Grenze."}, {"basically": "1.000 Token und zehn Bieter: G, D und B kommen bei 2,20 zum Zug, skaliert um etwa 0,909."}, {"basically": "Der finale Auktionszustand richtet die erste v4-Liquidität ein, die Preisfindung finanziert also auch den Pool."}, {"basically": "Anders als bei Festpreis-, Dutch- oder sofortigen AMM-Launches entscheiden Geschwindigkeit und Sniping nicht, wer reinkommt."}, {"basically": "Aztec führt seinen öffentlichen Verkauf über einen CCA-Contract durch, und Restbestände plus eingenommenes Geld fließen in einen v4 Pool."}, {"basically": "Uniswaps Blog, Produktseite und Repo, Aztecs Bedingungen, der Etherscan-Contract und Berichterstattung."}]
---
![](../../../media/continuous-clearing-auctions-cca-technical-overview/cover.jpg)

# Wie Continuous Clearing Auctions (CCA) funktionieren, die technische Version

Continuous Clearing Auctions, kurz CCA, sind ein On-Chain-Auktionsprotokoll von Uniswap (Universal Navigation Inc.). Die Idee: Ein Token wird über viele Zeiträume hinweg verkauft, und die Liquidität wandert danach direkt in einen Uniswap-v4-Pool. Ein Projekt richtet einen Verkauf ein, der über viele einzelne Auktionsblöcke läuft. Bieter geben eine Größe und einen Preis an, das Protokoll verteilt das auf die Blöcke, und jeder Block cleart zu einem einheitlichen Marktpreis, basierend auf der eingegangenen Nachfrage.

Das Ganze ist als eigenes Smart-Contract-System gebaut, ein Continuous-Clearing-Auction-Contract plus eine Factory, und es ist dafür gedacht, zusammen mit dem Uniswap Liquidity Launcher genutzt zu werden. Der öffentliche Token-Verkauf von Aztec Network ist die erste große Anwendung davon in der Praxis.

## Setup und Bieten

Wie funktioniert das? Zuerst das Setup. Ein Projekt definiert mindestens die Gesamtmenge an Tokens, die verkauft werden soll, `Q_total`, und wie lange die Auktion läuft, als Anzahl von Blöcken oder als Zeitraum. Es legt außerdem eine Startorientierung fest, etwa einen Startpreis und eventuell eine Preisuntergrenze oder eine Reservekurve. Dann die Graduierungsbedingungen, also die Checks, die entscheiden, ob der Verkauf abgeschlossen und erfolgreich ist, zum Beispiel ein Mindestbetrag an eingesammeltem Kapital, ein durchschnittlicher Mindestpreis oder andere Kriterien. Und schließlich die Regeln für das Seeding der Liquidität, also wie viel der eingesammelten Assets und der übrigen Tokens am Ende in einen Uniswap-v4-Pool fließen. Während des Verkaufsfensters ist der Auktions-Contract der einzige Verkäufer des Tokens.

Dann das Gebot. Ein Bieter schickt eine Order mit einem maximalen Spend oder der gewünschten Menge und dem höchsten Preis, den er zu zahlen bereit ist, `P_max`. Er kann auch weitere Wünsche angeben, etwa eine minimale Füllgröße. Das Protokoll verteilt dieses Gebot auf alle verbleibenden Auktionsblöcke, und in jedem Block nimmt ein Teil des Gebots an der Preisfindung teil.

## Wie ein Block cleart

Für einen gegebenen Block `t` sei `S_t` das Token-Angebot für Block `t`, und `B_t` sei die Menge der aktiven Gebotsscheiben für Block `t`, jeweils mit `(P_max_i, Q_i^t)`.

Der Clearing-Preis des Blocks, `P_clear_t`, ist der niedrigste Preis, bei dem die Gesamtnachfrage bei oder über diesem Preis `S_t` schwach übersteigt. Man sortiert also alle `P_max_i` absteigend und addiert die zugehörigen `Q_i^t`, bis

\[
\sum_{i: P_{\text{max},i} \ge P_{\text{clear},t}} Q_i^t \ge S_t
\]

und dann ist `P_clear_t` der Schwellenpreis für diesen Block.

Alle gefüllten Scheiben in Block `t` handeln zu `P_clear_t`. Wenn die Nachfrage bei oder über dem Clearing-Preis strikt größer ist als `S_t`, werden sie pro rata skaliert.

Diese Skalierung passiert an der Marge. Wenn das letzte Preisniveau, das den Block füllt, überzeichnet ist, skaliert das Protokoll die Bieter, die genau auf diesem Schwellenpreis sitzen. Sei `D_strict` die Gesamtnachfrage von Geboten mit `P_max > P_clear_t` und `D_equal` die Gesamtnachfrage von Geboten mit `P_max = P_clear_t`. Wenn `D_strict ≥ S_t`, wird alles strikt über der Schwelle gefüllt und ein leicht höherer Clearing-Preis gewählt. Andernfalls ist die verbleibende Kapazität `S_t - D_strict`, und die Gebote bei `P_clear_t` werden wie folgt skaliert

\[
\text{allocation}_i = Q_i^t \times \frac{S_t -
D_{\text{strict}}}{D_{\text{equal}}}
\]

und jede Allokation zahlt genau `P_clear_t`.

Außerdem gibt es eine Maxpreis-Absicherung. Für jeden Bieter `i` und jeden Block `t` gilt: Wenn

\[
P_{\text{clear},t} > P_{\text{max},i}
\]

dann wird seine Scheibe für diesen Block schlicht nicht ausgeführt. Nicht genutzte Scheiben bleiben für spätere Blöcke bestehen, solange die Auktion läuft, oder man kann sie zurückziehen, je nach den Regeln des Verkaufs.

## Ein einfaches Beispiel mit Zahlen

Um es einfach zu halten, nehmen wir eine Auktion mit einem einzigen Block. Das Angebot in diesem Block ist `S = 1.000` Tokens, und es gibt 10 Teilnehmer, jeder mit `(P_max, Q)` wie folgt.

| Teilnehmer | Maximalpreis `P_max` | Menge `Q` |
|------------|----------------------|-----------|
| A | 1,80 | 150 |
| B | 2,20 | 200 |
| C | 1,00 | 50 |
| D | 2,50 | 400 |
| E | 0,90 | 80 |
| F | 1,60 | 120 |
| G | 3,00 | 500 |
| H | 2,00 | 200 |
| I | 1,20 | 100 |
| J | 0,75 | 40 |

Jetzt sortieren wir die Bieter nach `P_max` absteigend und addieren die Nachfrage.

| Rang | Teilnehmer | `P_max` | `Q` | Kumulierte Nachfrage |
|------|------------|---------|-----|----------------------|
| 1 | G | 3,00 | 500 | 500 |
| 2 | D | 2,50 | 400 | 900 |
| 3 | B | 2,20 | 200 | 1.100 |
| 4 | H | 2,00 | 200 | 1.300 |
| 5 | A | 1,80 | 150 | 1.450 |
| ... | andere | ≤ 1,60 | ... | ... |

Wir überschreiten das Angebot `S = 1.000` zum ersten Mal, wenn wir B einbeziehen. Also ist der Clearing-Preis

\[
P_{\text{clear}} = 2,20
\]

Die berechtigten Bieter sind die mit `P_max ≥ 2,20`, also G mit 500, D mit 400 und B mit 200. Die gesamte berechtigte Nachfrage ist

\[
D_{\text{eligible}} = 500 + 400 + 200 = 1{,}100
\]

und der Pro-rata-Faktor an der Marge ist

\[
\alpha = \frac{S}{D_{\text{eligible}}} = \frac{1{,}000}{1{,}100} \approx
0{,}909
\]

Das ergibt diese finalen Allokationen.

| Teilnehmer | Nachfrage | Allokation `= Q × α` | Gezahlter Preis |
|------------|-----------|----------------------|-----------------|
| G | 500 | 454,5 | 2,20 |
| D | 400 | 363,6 | 2,20 |
| B | 200 | 181,8 | 2,20 |

Alle anderen bekommen in diesem Block null. Niemand zahlt mehr als den `P_max`, den er gesetzt hat, und jede gefüllte Einheit handelt zum gleichen einheitlichen Preis von `2,20`. Eine Auktion mit vielen Blöcken ist einfach diese Logik noch einmal, für jeden Block mit seinem Anteil an Tokens und den Gebotsscheiben, die gerade aktiv sind.

## Uniswap v4, und wie es sich vergleicht

In Uniswaps Version ist CCA ein eigenständiges Protokoll, aber es ist darauf ausgelegt, bei Verkaufsende über Hooks direkt in einen Uniswap-v4-Pool zu fließen. Der finale Zustand der Auktion, also das insgesamt eingesammelte Kapital, der letzte Clearing-Preis und die übrigen Tokens, richtet die erste Liquiditätsposition ein. Die Auktion ist also die Preisfindungsphase und finanziert den Pool gleich mit vor, und man braucht keinen separaten Schritt, um die Liquidität später zu klären. Der Aztec-Verkauf macht genau das. Der CCA-Contract übernimmt die Preisfindung, und eine dedizierte "Aztec: Continuous Clearing Auction"-Contract-Adresse auf Ethereum trackt Gebote und Fills.

## Verglichen mit anderen Launch-Formaten

Vergleich das mal mit einem Festpreisverkauf. Da legt das Projekt vorher einen Preis fest und es gilt: Wer zuerst kommt, mahlt zuerst, bis die Zuteilung weg ist. Latenz und Gas-Gebote entscheiden, wer früh dabei ist, und der Preis liegt oft daneben. Entweder lässt der Emittent Kapital auf dem Tisch liegen oder die Käufer sehen Slippage, sobald der Sekundärhandel losgeht. Bei CCA kommt der Clearing-Preis aus dem Orderbuch jedes Blocks, die Zuteilung hängt davon ab, wie viel Preis du tolerierst und nicht davon, wie schnell deine Transaktion ist, und der Endpreis passt per Konstruktion zur Gesamtnachfrage.

Eine holländische Auktion startet hoch und tickt über die Zeit runter. Rationale Bieter versuchen auf niedrigere Preise zu warten, aber nicht so lange, dass das Angebot ausgeht. Strategisches Timing und Sniping auf Blockebene spielen also eine große Rolle, und der Clearing-Preis, den du siehst, zeigt vielleicht eher das Timing-Spiel als eine beste Schätzung des langfristigen Werts. Bei CCA gibst du dein `P_max` einmal an und dein Gebot wird über Blöcke verteilt. Du musst nicht zuschauen und neu einreichen, wenn sich der Preis bewegt. Und das Clearing läuft kontinuierlich in Blöcken, nicht auf einem absteigenden Pfad. Es ist also näher an wiederholten Einheitspreisauktionen als an einer holländischen Uhr.

Eine einmalige Einheitspreisauktion mit versiegelten Geboten nimmt alle Gebote einmal entgegen und berechnet einen Clearing-Preis mit anteiliger Skalierung an der Grenze. Aber sie baut nicht von selbst AMM-Liquidität auf, es gibt oft eine separate Pool-Erstellungstransaktion danach, und Bieter können zwischen den Blöcken nicht auf neue Informationen reagieren. CCA behält den Einheitspreis, wiederholt das Clearing aber über viele Intervalle, verbindet sich am Ende automatisch mit einem Uniswap-v4-Pool und erlaubt längere Verkaufsfenster, in denen sich die Teilnahme ändert, während jeder Block trotzdem einen klaren Preis bekommt.

Und dann das AMM-Instant-Listing, also wenn man direkt einen Uniswap-v3- oder v4-Pool startet. Tokens gehen in einen Pool und der Handel beginnt sofort. Frühe Trades treffen auf dünne Liquidität und hohe Slippage, MEV und Mempool-Wettbewerb prägen den Launch-Preis stark, und es gibt keinen echten Clearing-Preis oder geordnete Nachfragekurve. Bei CCA ersetzt explizites Bieten den Handel während des Verkaufs, Preisfindung passiert durch das Aufsummieren eines Orderbuchs und nicht entlang einer Constant-Product-Kurve, und der finale Clearing-Zustand richtet dann den Pool ein. Verkauf und Sekundärhandel sind also zwei getrennte Phasen.

## Der Aztec-Verkauf

Für den Aztec-Token-Verkauf sprechen die öffentlichen Auktionsbedingungen des Aztec Network von einem "neuartigen Uniswap Continuous Clearing Auction (CCA) Format", das Preismanipulation reduzieren und offene, On-Chain-Preisfindung unterstützen soll. Gebote laufen über den CCA-Contract, der Clearing-Preise und Token-Zuteilungen immer wieder neu berechnet. Nach dem Verkauf sollen die übrigen Tokens plus ein Teil des eingenommenen Geldes einen Uniswap-v4-Pool mit Liquidität versorgen, wie es das CCA- und Liquidity-Launcher-Design vorsieht.

## Quellen

Uniswap, Continuous Clearing Auctions, Bootstrapping Liquidity on Uniswap v4 (offizieller Blog)
https://blog.uniswap.org/continuous-clearing-auctions

Uniswap, Continuous Clearing Auctions Produktseite
https://cca.uniswap.org/en/

Uniswap, Continuous Clearing Auction Smart-Contract-Repository (GitHub)
https://github.com/Uniswap/continuous-clearing-auction

Aztec Network, Auction Terms and Conditions
https://aztec.network/auction-terms-conditions

Markets.com, Continuous Clearing Auction, New Asset Price Discovery With Uniswap and Aztec
https://www.markets.com/news/continuous-clearing-auction-uniswap-aztec-2195-en

The Defiant, Aztec Network Launches First Token Sale Using Uniswap's Continuous Clearing Auction
https://thedefiant.io/news/defi/aztec-network-launches-first-token-sale-using-uniswaps-continuous-clearing-auction

Algebra (Medium), Continuous Clearing Auctions, A New Standard for Fair Token Launches by Uniswap & Aztec
https://medium.com/@crypto_algebra/continuous-clearing-auctions-a-new-standard-for-fair-token-launches-by-uniswap-aztec-739ba1767fd7

Uniswap CCA Aztec Contract Instance (Etherscan)
https://etherscan.io/address/0x608c4e792C65f5527B3f70715deA44d3b302F4Ee

Panews, A Detailed Look at the Unique Features of Uniswap's New CCA
https://www.panewslab.com/en/articles/50611532-a7d8-4f14-ad67-b460319bc720

Dennison Bertram, X Thread Explaining the Aztec CCA Sale
https://x.com/dennisonbertram/status/1995911827171991948?s=46
