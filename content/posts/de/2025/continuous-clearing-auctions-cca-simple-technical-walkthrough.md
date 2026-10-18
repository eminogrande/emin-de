---
title: "Continuous Clearing Auctions (CCA), einfach und technisch erklärt"
description: "Token-Launches sind chaotisch und Bots gewinnen. CCA verteilt dein Gebot über viele Blöcke und alle, die in einem Block bedient werden, zahlen denselben Preis. Erst einfach, dann die Mathematik"
date: "2025-12-02T18:20:01Z"
updated: "2025-12-02"
lang: de
translated_from: "en/continuous-clearing-auctions-cca-simple-technical-walkthrough"
source_sections: ["why-token-launches-go-wrong", "what-cca-does", "why-this-matters", "the-math-with-a-simple-example", "sources"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/continuous-clearing-auctions-cca-simple-technical-walkthrough/cover.webp"
tldr: ["Continuous Clearing Auctions teilen einen Token-Verkauf in viele Blöcke auf, und jeder Block wird zu einem einheitlichen Preis abgerechnet.", "Du gibst einmal ein Gebot mit einem Höchstpreis und einer Menge ab, das Protokoll verteilt es über den Verkauf, und du zahlst nie mehr als dein Maximum.", "Am Ende können das eingenommene Geld und übrig gebliebene Tokens automatisch einen Uniswap v4 Pool befüllen."]
sections: [{"basically": "Token-Launches mit fester Zeit belohnen Bots und schnelle Trader, und die Kleinanleger zahlen am Ende zu viel."}, {"basically": "Bei einer CCA schickst du ein Gebot mit einem Höchstpreis, und jeder Block wird zu einem fairen Preis für alle abgerechnet."}, {"basically": "CCA holt die Preisfindung aus den Mempool-Geschwindigkeitsspielen raus und befüllt einen Uniswap v4 Pool zum Auktionspreis."}, {"basically": "Bei 1.000 Tokens und nach Preis sortierten Geboten wird der Block bei 2,20 abgerechnet und G, D und B werden anteilig bedient."}, {"basically": "Die Erklärung basiert auf Uniswaps CCA-Blog, der Produktseite und dem Contract-Repo, plus Aztecs erstem CCA-Verkauf."}]
---
![](../../../media/continuous-clearing-auctions-cca-simple-technical-walkthrough/cover.jpg)

# Continuous Clearing Auctions (CCA), einfach erklärt und technisch durchgespielt

Das hier ist erstmal die einfache Version, ein bisschen wie ein Thread erzählt, und danach kommt der technischere Teil mit der Mathematik und einer kleinen Simulation.

## Warum Token Launches schiefgehen

Token Sales sind chaotisch. Ein normaler Token Launch hat einen festen Startzeitpunkt und alle versuchen gleichzeitig zu kaufen. Bots und schnelle Trader gewinnen meistens, und der finale Preis ist unklar und springt in den ersten Stunden oder Tagen wild hin und her. Also zahlt Retail zu viel, ein paar wenige Hände bekommen den Großteil der Allokation, und Price Discovery und frühes Trading sind ein einziges Durcheinander.

Das alte Playbook hat vier Wege, das zu machen, und jeder hat sein Problem. Ein Fixed Price Sale bedeutet, das Projekt setzt einen Preis. Ist er zu niedrig, kaufen Bots und Arbitrageure sofort alles leer, ist er zu hoch, schleppt sich der Sale dahin und sieht aus wie ein Reinfall. Bei einer Dutch Auction sinkt der Preis über die Zeit. Professionelle Trader warten, um so günstig wie möglich zu kaufen, Last-Minute-Sniping entscheidet das Ergebnis, und Retail spielt ein Timing-Spiel, für das sie nicht gebaut sind. Bei einer One-Shot Uniform Price Auction bietet jeder einmal und der Markt cleart zu einem Preis. Aber das passiert nur zu einem einzigen Zeitpunkt, und die Liquidität muss danach separat aufgesetzt werden. Und ein direkter AMM Launch, also etwa ein sofortiger Uniswap Pool, startet mit dünner Liquidität, sodass frühe Trades den Preis stark bewegen und MEV und Mempool-Konkurrenz entscheiden, wer gute Fills bekommt.

## Was CCA macht

Eine Continuous Clearing Auction ändert den Prozess. Der Sale wird in viele Blöcke aufgeteilt, also Zeitintervalle. Du schickst ein Gebot mit dem Maximalpreis, den du bereit bist zu zahlen, und der Menge an Tokens, die du willst. Das Protokoll verteilt dein Gebot von selbst über den gesamten Sale. In jedem Block berechnet es einen fairen Marktpreis aus allen aktiven Geboten, und jeder, der in diesem Block gefüllt wird, zahlt denselben Preis. Du musst also nicht schnell klicken und nicht jede Sekunde auf den Preis schauen. Du sagst einfach, was du maximal zahlen würdest und wie viel du willst.

Der Kern funktioniert so, für jeden Block. Das Protokoll hat eine feste Menge Tokens für diesen Block. Es schaut sich alle aktiven Gebote an und sortiert sie nach Maximalpreis. Es findet den niedrigsten Preis, bei dem die Gesamtnachfrage ≥ dem Block-Angebot ist, und das ist der Clearing-Preis für den Block. Alle Gebote mit `P_max` auf oder über diesem Clearing-Preis sind berechtigt. Gibt es bei diesem Preis mehr Nachfrage als Angebot, werden die berechtigten Gebote pro rata skaliert. Und jeder, der gefüllt wird, zahlt denselben Clearing-Preis. Das wiederholt sich jeden Block, bis der Sale endet.

Was, wenn du zu hoch bietest? Es gibt eine Maximalpreis-Garantie. Du wählst `P_max`, das Maximum, das du pro Token zahlen willst. Liegt der Clearing-Preis des Blocks, `P_clear`, über deinem `P_max`, wird dein Gebot in diesem Block nicht ausgeführt, und deine Gebots-Slices bleiben für spätere Blöcke liegen oder du kannst sie zurückziehen, je nachdem, was die Regeln des Sales erlauben. Du zahlst also nie mehr als `P_max`. Und wenn der Markt unter deinem `P_max` cleart, wirst du einfach zum niedrigeren Clearing-Preis gefüllt.

Es gibt auch einen Early-Bird-Effekt. Wenn du früh bietest, wird deine Order über mehr Blöcke verteilt, du bekommst also mehr Chancen, in Blöcken gefüllt zu werden, in denen der Clearing-Preis ziemlich niedrig ist. Wartest du bis zum letzten Block, nimmt deine Order nur an den finalen Blöcken teil und du siehst hauptsächlich die späteren und vielleicht teureren Clearing-Preise. Es ist also kein Fastest-Finger-First mehr. Der Mechanismus belohnt dich dafür, früh dabei zu sein und die ganze Price Discovery mitzumachen.

Wenn die Auktion endet, hat das Protokoll eine vollständige Aufzeichnung aller Clearing-Preise und gefüllten Mengen pro Block, die insgesamt eingenommenen Assets und die übrig gebliebenen unverkauften Tokens, falls es welche gibt. Dann kann, je nachdem, welche Regeln gesetzt wurden, ein Teil der eingenommenen Assets und die übrigen Tokens automatisch in einen Uniswap v4 Pool fließen. Das begründet die erste Liquidität zu einem Preis, der zum Auktionsergebnis passt. Es gibt also keine separate Phase, in der du jetzt noch die Liquidität klären musst, und du bekommst eine klare Historie der Price Discovery und sofortiges Secondary Trading, mit bereits finanzierter Liquidität.

## Warum das wichtig ist

Warum ist das wichtig? CCA versucht, Price Discovery von den Low-Level-Mempool- und Latenz-Spielchen zu trennen. Es gibt einen einheitlichen Preis pro Block und nicht pro einzelner Transaktion. Es macht es schwerer für Bots, Retail zu front-runnen, und für Whales, nur durch Schnelligkeit zu gewinnen. Und es baut eine direkte Brücke vom Token Sale zum Liquidity Bootstrapping auf Uniswap v4. Es ist immer noch eine Auktion. Es gibt Wettbewerb und die Preise können hoch oder niedrig gehen. Aber der Prozess hat mehr Struktur und du kannst sehen, was passiert.

## Die Mathematik mit einem einfachen Beispiel

Um es konkret zu machen, nimm erstmal einen einzelnen Block, also ein Clearing-Event. Ein CCA mit vielen Blöcken wiederholt das einfach pro Block mit den Gebots-Slices. Die in diesem Block verfügbaren Tokens sind `S = 1.000`, und 10 Teilnehmer schicken Gebote mit einem Maximalpreis `P_max` und einer gewünschten Menge `Q`.

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

Jetzt bauen wir das Orderbuch. Sortiert nach `P_max` von hoch nach niedrig und die Nachfrage aufsummiert.

| Rang | Teilnehmer | `P_max` | `Q` | Kumulierte Nachfrage |
|------|------------|---------|-----|----------------------|
| 1 | G | 3,00 | 500 | 500 |
| 2 | D | 2,50 | 400 | 900 |
| 3 | B | 2,20 | 200 | 1.100 |
| 4 | H | 2,00 | 200 | 1.300 |
| 5 | A | 1,80 | 150 | 1.450 |
| ... | andere | ≤ 1,60 | ... | ... |

Wir überschreiten das Angebot `S = 1.000` zum ersten Mal, wenn wir Teilnehmer B dazunehmen. Der Clearing-Preis ist also

\[
P_{\text{clear}} = 2{,}20
\]

Die berechtigten Bieter sind die mit `P_max ≥ 2,20`. G will 500, D will 400 und B will 200. Die gesamte berechtigte Nachfrage ist

\[
D_{\text{eligible}} = 500 + 400 + 200 = 1{,}100
\]

Aber wir können nur 1.000 Tokens vergeben. Also werden alle berechtigten Bieter pro rata skaliert, mit dem Faktor

\[
\alpha = \frac{S}{D_{\text{eligible}}} = \frac{1{,}000}{1{,}100} \approx
0{,}909
\]

und das sind die finalen Allokationen.

| Teilnehmer | Nachfrage `Q` | Allokation `Q × α` | Gezahlter Preis |
|------------|---------------|--------------------|--------------------|
| G | 500 | 454,5 | 2,20 |
| D | 400 | 363,6 | 2,20 |
| B | 200 | 181,8 | 2,20 |

Alle anderen bekommen in diesem Block null. Ihr `P_max` liegt strikt unter dem Clearing-Preis, also zahlen sie nichts und behalten ihr Kapital. Niemand zahlt über seinem Maximum, und jeder, der gefüllt wird, zahlt denselben Preis.

In einem echten CCA wird die Auktion in viele Blöcke aufgeteilt, jedes Gebot wird über die Blöcke gesliced und die Logik oben läuft immer wieder. Über die Zeit bekommt ein Bieter einen volumengewichteten Durchschnitt der Clearing-Preise der Blöcke, in denen er gefüllt wurde.

Also kurz gesagt. Du sagst, wie viel du willst und was du maximal pro Token zahlst. Das Protokoll verteilt dein Gebot über den Sale. Jeder Block berechnet einen fairen Preis aus allen Geboten. Liegt dieser Preis auf oder unter deinem Maximum, kannst du gefüllt werden, liegt er darüber, wirst du übersprungen. Jeder, der in einem Block gefüllt wird, zahlt denselben Preis. Und am Ende können das Geld und die Tokens ganz von selbst einen Uniswap v4 Pool befüllen.

## Quellen

Uniswap, Continuous Clearing Auctions, Bootstrapping Liquidity on Uniswap v4 (offizieller Blog)
https://blog.uniswap.org/continuous-clearing-auctions

Uniswap, Produktseite zu Continuous Clearing Auctions
https://cca.uniswap.org/en/

Uniswap, Smart-Contract-Repository für Continuous Clearing Auctions (GitHub)
https://github.com/Uniswap/continuous-clearing-auction

Aztec Network, Auktionsbedingungen
https://aztec.network/auction-terms-conditions

Markets.com, Continuous Clearing Auction, neue Preisfindung für Assets mit Uniswap und Aztec
https://www.markets.com/news/continuous-clearing-auction-uniswap-aztec-2195-en

The Defiant, Aztec Network startet ersten Token-Sale mit Uniswaps Continuous Clearing Auction
https://thedefiant.io/news/defi/aztec-network-launches-first-token-sale-using-uniswaps-continuous-clearing-auction

Algebra (Medium), Continuous Clearing Auctions, ein neuer Standard für faire Token-Launches von Uniswap & Aztec
https://medium.com/@crypto_algebra/continuous-clearing-auctions-a-new-standard-for-fair-token-launches-by-uniswap-aztec-739ba1767fd7

Uniswap CCA Aztec Contract-Instanz (Etherscan)
https://etherscan.io/address/0x608c4e792C65f5527B3f70715deA44d3b302F4Ee

Panews, ein genauerer Blick auf die besonderen Features von Uniswaps neuem CCA
https://www.panewslab.com/en/articles/50611532-a7d8-4f14-ad67-b460319bc720

Dennison Bertram, X-Thread zur Erklärung des Aztec CCA Sales
https://x.com/dennisonbertram/status/1995911827171991948?s=46
