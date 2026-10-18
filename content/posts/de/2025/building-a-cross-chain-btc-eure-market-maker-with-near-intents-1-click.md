---
title: "Ein Cross-Chain BTC-EURe Market Maker mit NEAR Intents & 1-Click"
description: "Wie wir einen Swap-Stack zwischen BTC und EURe auf NEAR Intents und 1-Click gebaut haben, mit unserem eigenen AMM-Solver, der 0,3 % Marge verdient."
date: "2025-12-06T18:35:01Z"
updated: "2025-12-06"
lang: de
translated_from: "en/building-a-cross-chain-btc-eure-market-maker-with-near-intents-1-click"
source_sections: ["1-how-the-pieces-fit", "2-the-swap-pages", "3-the-ui-server", "4-the-amm-solver-and-how-we-provide-liquidity", "5-a-swap-from-btc-to-eure-start-to-end", "6-where-the-03-comes-from", "7-which-currency-we-earn-in", "8-putting-liquidity-in-and-taking-it-out", "9-monitoring-on-eminoappsolver", "10-whats-next"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/building-a-cross-chain-btc-eure-market-maker-with-near-intents-1-click/cover.webp"
tldr: ["Wir haben einen kompletten BTC-zu-EURe Swap-Stack gebaut: eine mobile Swap-UI, einen Tester, einen Solver-Monitor und unseren eigenen AMM-Solver.", "Swaps laufen über NEAR Intents und Defuse 1-Click, zwischen BTC auf dem Bitcoin-Mainnet und EURe auf Gnosis.", "Der Solver nutzt Constant-Product-Math und behält eine 0,3 % Marge in dem Asset, das der User schickt.", "Der Profit ist das zusätzliche BTC und EURe, das sich in den Reserven auf dem Intents-Contract ansammelt."]
sections: [{"basically": "Vier Teile: Swap-UI, UI-Server, NEAR Intents mit dem Solver-Relay und unser eigener AMM-Solver."}, {"basically": "/intent/ ist die One-Screen Swap-Seite, /intent/intend/ die Debug-Seite mit Test-Buttons und History."}, {"basically": "Ein Express-Server auf Port 4100 für Quotes, Swap-History und einen Status-Proxy zu 1-Click."}, {"basically": "Der offizielle NEAR Intents AMM-Solver für EURe und BTC, Pricing mit x mal y gleich k plus Marge."}, {"basically": "Quote, BTC einzahlen, 1-Click matched unsere Solver-Quote, und EURe landet auf Gnosis, während die UI pollt."}, {"basically": "Der Solver preist nur 99,7 % des Inputs. Die anderen 0,3 % bleiben in der Reserve."}, {"basically": "Die Marge wird in dem bezahlt, was der User schickt, also baut sich Profit als extra BTC und extra EURe auf."}, {"basically": "EURe und BTC auf intents.near einzahlen, Solver starten und den Überschuss als Profit abheben."}, {"basically": "Ein Dashboard zeigt Health, Reserven, unsere Quotes und die Aktivität des ganzen Netzwerks auf einen Blick."}, {"basically": "Es funktioniert End-to-End. Als Nächstes: smarteres Pricing, mehr Pairs und eine umfangreichere UI mit Expert-Mode."}]
---
![](../../../media/building-a-cross-chain-btc-eure-market-maker-with-near-intents-1-click/cover.jpg)

In den letzten Tagen haben wir einen kompletten Swap-Stack zwischen BTC und EURe aufgebaut. Es gibt eine Mobile-First-Swap-UI unter emino.app/intent/, einen erweiterten Tester mit Verlaufsansicht unter emino.app/intent/intend/, einen Live-Solver-Monitor unter emino.app/solver/ und einen echten AMM-Solver, der Liquidität zwischen BTC auf dem Bitcoin-Mainnet und EURe auf Gnosis bereitstellt, über NEAR Intents und Defuse 1-Click.

Dieser Beitrag zeigt, wie alles zusammenpasst, wie ein Swap durch das System fließt, woher die 0,3% Marge kommt und wie ein Solver-Betreiber einzahlen, überwachen und später Gewinne abheben kann.

## 1. Wie die Teile zusammenpassen

Es gibt vier Teile.

Der erste ist die Benutzeroberfläche auf emino.app. /intent/ ist eine einfache Mobile-First-Seite, um einen Swap zwischen BTC und EURe zu starten, und /intent/intend/ ist ein erweiterter JSON-Tester mit einer Historie der Swaps, die über diesen Server gestartet wurden.

Der zweite ist der UI-Server auf Port 4100. Das ist ein Express-Server, der das statische HTML und JS für /intent/ und /intent/intend/ ausliefert und eine kleine API mit vier Endpunkten hat. Er spricht mit der Defuse 1-Click API unter https://1click.chaindefuser.com für Quotes und Status.

    POST /api/intend/btc-to-eure
    POST /api/intend/eure-to-btc
    GET /api/intend/history
    GET /api/intend/status/:depositAddress

Der dritte ist NEAR Intents plus das Solver-Relay. Der NEAR Intents Contract (intents.near) hält die Token-Reserven und verfolgt die Intents. Das Solver-Relay unter wss://solver-relay-v2.chaindefuser.com/ws leitet Quote-Anfragen von 1-Click an die Solver weiter und bekommt ihre Antworten zurück.

Der vierte ist unser eigener AMM-Solver. Er läuft mit dem offiziellen near-intents-amm-solver Code mit EURe auf Gnosis als erstem Token und BTC auf NEAR als zweitem, und er hält ein Constant-Product-AMM über die EURe- und BTC-Reserven auf dem Intents Contract. Er hört auf Quote-Anfragen über WebSocket, berechnet Preise mit einer Marge, signiert NEP-413 Quotes und aktualisiert seine Sicht auf die Reserven, nachdem Intents ausgeführt wurden.

Die UI und der Solver kennen sich nicht. Die UI spricht nur mit 1-Click, und der Solver spricht nur mit dem Solver-Relay und NEAR. Das Relay und 1-Click routen die Quotes und Intents zwischen ihnen.

## 2. Die Swap-Seiten

/intent/ soll die One-Screen-Test-UI sein. Sie hat zwei Tabs, BTC zu EURe und EURe zu BTC. Für BTC zu EURe füllst du den Betrag in Satoshis aus, den du sendest, den EURe-Empfänger als EVM-Adresse auf Gnosis und eine Bitcoin-Bech32-Adresse für die Rückerstattung. Für EURe zu BTC füllst du den EURe-Betrag als Dezimalzahl aus, die BTC-Adresse, die den Swap bekommt, und eine EVM-Adresse auf Gnosis für die EURe-Rückerstattung. Wir füllen das mit deinen eigenen Adressen vor.

    DEFAULT_EURE_EVM = 0x196C28928b1386D8Dcd32ab223bECcce6f731264
    DEFAULT_BTC_ADDR = 1LBiZCtkByR3BuH7K3RJA15fmri84NW6CT

Wenn du auf "Get deposit & start swap" klickst, ruft die UI POST /api/intend/btc-to-eure oder POST /api/intend/eure-to-btc auf, und der Server ruft 1-Click /v0/quote mit swapType EXACT_INPUT auf. Wenn das funktioniert, bekommst du amountInFormatted in schönen Einheiten, amountOutFormatted als Betrag, den du ungefähr erhalten wirst, eine depositAddress auf BTC oder Gnosis und eine Deadline. Die UI zeigt dann eine Zusammenfassung ("Du sendest / Du erhältst"), die Einzahlungsadresse, einen QR-Code für Wallet-Apps und eine Status-Pille, die die Ausführung über GET /api/intend/status/:depositAddress abfragt.

/intent/intend/ ist zum Debuggen und für Power-User. Es hat Schnelltest-Buttons, "Test: 10.000 Sats → EURe" und "Test: 10 EURe → BTC", und ein benutzerdefiniertes Formular wie das auf /intent/, aber mit einfachen Texteingaben. Bei jedem Quote-Versuch zeigt es eine Erfolgsbox mit denselben Infos wie /intent/, oder es zeigt den rohen Fehler von 1-Click, wie diesen hier.

    {
      "message": "...",
      "status": 400,
      "bodyMessage": "Failed to get quote",
      "correlationId": "...",
      "requestBody": { ...full JSON sent to /v0/quote... }
    }

Unten gibt es einen Abschnitt "Recent swaps (this server)". Er wird von GET /api/intend/history gespeist, kennt nur die Swaps, die über diese UI und diesen Server gestartet wurden, und zeigt die Richtung, den Zeitstempel, den Eingangs- und Ausgangsbetrag und die Einzahlungsadresse.

## 3. Der UI-Server

Der Server (server/index.ts) läuft auf Port 4100 und macht drei Dinge.

Erstens, die Quote- und Intend-Endpunkte, alle mit EXACT_INPUT. POST /api/intend/btc-to-eure validiert amountInSats, recipientEvm und refundBtc und ruft dann quoteExactInputBtcToEure auf, das getQuote von 1-Click mit diesen Werten verwendet und die Einzahlungsadresse und die Beträge zurückgibt.

    originAsset = nep141:btc.omft.near
    destinationAsset = EURe
    amount = satsIn
    refundTo = refundBtc (BTC).
    recipient = recipientEvm (Gnosis).

POST /api/intend/eure-to-btc validiert amountInEure, recipientBtc und refundEvm, konvertiert die EURe-Dezimalzahl in 18 Dezimalstellen (toUnits) und ruft getQuote mit Origin und Destination umgekehrt auf. Für jedes erfolgreiche Intend-Quote hängt es ein IntentLogItem an ein In-Memory-intentLog an.

    type IntentLogItem = {
      direction: 'btc-to-eure' | 'eure-to-btc';
      depositAddress: string;
      createdAt: string;
      amountIn: string;
      amountInFormatted: string;
      amountOut: string;
      amountOutFormatted: string;
      test?: boolean;
      recipient?: string;
      refund?: string;
    };

Zweitens, die History-APIs. GET /api/intend/history gibt intentLog mit dem neuesten zuerst zurück. GET /api/intend/history/:depositAddress gibt den Log-Eintrag für diese Einzahlung zurück, falls vorhanden, und den Ausführungsstatus von getExecutionStatus von 1-Click.

Drittens, ein Status-Proxy. GET /api/intend/status/:depositAddress ist ein direkter Proxy zu getExecutionStatus von 1-Click, und /intent/ verwendet es, um die Status-Pille zu aktualisieren.

## 4. Der AMM-Solver und wie wir Liquidität bereitstellen

Der Solver ist die offizielle NEAR Intents AMM-Implementierung, eingerichtet für EURe und BTC. Das sind die Token und die wichtigen Teile der Umgebung.

    AMM_TOKEN1_ID = nep141:gnosis-0x420ca0f9b9b604ce0fd9c18ef134c705e5fa3430.omft.near (EURe)
    AMM_TOKEN2_ID = nep141:btc.omft.near (BTC)

    NEAR_ACCOUNT_ID = nuri-solver.near
    NEAR_PRIVATE_KEY = ed25519:...
    RELAY_WS_URL = wss://solver-relay-v2.chaindefuser.com/ws
    ONE_CLICK_API_ONLY = true
    MARGIN_PERCENT = 0.3

Beim Start verbindet er sich mit NEAR über near-api-js, lädt die Reserven von EURe und BTC vom Intents Contract und berechnet eine deterministische Nonce aus den Reserven. Über das WebSocket abonniert er QUOTE-Events, das sind die eingehenden Quote-Anfragen, und QUOTE_STATUS-Events, das sind die ausgeführten Intents, und er schaut nur auf Quotes für das EURe- und BTC-Paar. Für jede Quote-Anfrage prüft er, ob sie von einem vertrauenswürdigen Partner kommt (partner_id = 1click oder router-solver), berechnet den AMM-Preis mit der Marge, baut eine NEP-413-signierte Payload und sendet eine quote_response zurück an das Relay.

Die AMM-Mathematik ist Constant Product (x · y = k) mit einer Marge. Das ist für EXACT_INPUT, wo der Nutzer den Eingangsbetrag festlegt.

    amountInWithFee = amountIn * (1 - margin)
    out = (amountInWithFee * reserveOut) / (reserveIn + amountInWithFee)

Und das ist für EXACT_OUTPUT, falls verwendet.

    in = reserveIn * out / ((reserveOut - out) * (1 - margin))

Die Marge wird durch MARGIN_PERCENT festgelegt und beträgt standardmäßig 0,3.

## 5. Ein Swap von BTC zu EURe, von Anfang bis Ende

Nimm einen Swap von BTC zu EURe auf der /intent/-Seite.

Es beginnt, wenn der Nutzer nach einem Quote fragt. Die UI sendet POST /api/intend/btc-to-eure mit amountInSats, recipientEvm und refundBtc, und der UI-Server ruft 1-Click /v0/quote mit swapType EXACT_INPUT auf. Dann fragt 1-Click die Solver. Es leitet eine Quote-Anfrage an das Solver-Relay weiter, und das Relay broadcastet sie an alle Solver, die das Paar von btc.omft.near zu EURe unterstützen.

Unser Solver antwortet. Er sieht ein QUOTE-Event für nep141:btc.omft.near → EURe, loggt die Anfrage in recent_quotes, berechnet den EURe-Output mit einer Marge von 0,3%, signiert einen NEP-413 Quote und sendet quote_response zurück an das Relay. Sobald 1-Click ein Quote hat, wählt es es aus und gibt die depositAddress (normalerweise eine BTC-Adresse), amountIn, amountOut und die formatierten Felder an unseren UI-Server zurück, und der UI-Server speichert dies in intentLog.

Dann zahlt der Nutzer und sendet BTC an die Einzahlungsadresse. Die interne Maschinerie von 1-Click sieht die BTC-Zahlung, erstellt einen NEAR Intent, der auf intents.near zielt, arbeitet mit dem Relay und dem Quote unseres Solvers, um den Swap auszuführen, und sendet EURe auf Gnosis an recipientEvm.

Während das passiert, aktualisiert sich der Status. Die UI fragt GET /api/intend/status/:depositAddress alle 5 Sekunden ab. Der Solver bekommt QUOTE_STATUS-Events für die Intents, die sein Quote betreffen, aktualisiert seinen Snapshot der Reserven und loggt sie in recent_intents. Und auf emino.app/solver/ zeigt das Dashboard die Reserven (unsere Liquidität auf intents.near), die letzten Quotes und Intents, die durch das Relay gingen, und "Recent Swaps (via emino.app UI)", was von /api/intend/history kommt.

## 6. Woher die 0,3 % kommen

MARGIN_PERCENT = 0.3 heißt: Der Solver nimmt bei jedem Swap einen Spread von 0,3 %, und zwar direkt im AMM. Bei BTC zu EURe nimmt der Solver 0,3 % des BTC-Inputs als Gebühr und nutzt nur 99,7 % davon, um zu berechnen, wie viel EURe er schickt. Die zusätzlichen 0,3 % bleiben also in der BTC-Reserve. Bei EURe zu BTC kommt die Gebühr aus dem EURe-Input, und 0,3 % des EURe bleiben in der EURe-Reserve.

Über viele Swaps hinweg wachsen beide Reserven im Vergleich zu einem AMM ohne Gebühren. Dieses Wachstum ist die gesamte aufsummierte Marge, also dein Solver-Umsatz, abzüglich Verluste, wenn sich der Preis gegen dich bewegt. Du kannst dir das so vorstellen: Du bist der Market Maker. Du verdienst den Spread von 0,3 %, aber du trägst das Risiko, wenn sich der Preis zwischen BTC und EURe bewegt.

## 7. In welcher Währung wir verdienen

Bei jedem einzelnen Swap wird die Marge in dem Asset bezahlt, das der User schickt. Ein Swap von BTC zu EURe zahlt die Marge in BTC, und deine BTC-Reserve steigt etwas stärker als ohne Gebühren. Ein Swap von EURe zu BTC zahlt sie in EURe, und deine EURe-Reserve steigt. Über die Zeit sammelst du zusätzliche BTC, wenn User BTC schicken, und zusätzliche EURe, wenn User EURe schicken. Dein Gewinn liegt in den Reserven auf dem Intents-Contract.

Die Karte „Reserves (on intents contract)" auf dem Solver-Dashboard zeigt diese Reserven in menschenlesbaren Einheiten, EURe und BTC. Du siehst also auf einen Blick, wie viel Liquidität und damit wie viel Gewinn im Pool steckt.

## 8. Liquidität rein- und rausholen

Der AMM-Solver erwartet, dass du die Reserven in NEAR Intents füllst, bevor er läuft.

Zuerst kommt die Vorbereitung. Stell sicher, dass dein Solver-Account, zum Beispiel nuri-solver.near, EURe-Token (das gewrappte EURe auf NEAR) und BTC-Token (btc.omft.near) auf NEAR hat. Und füge den Public Key des Solvers zu intents.near hinzu, damit er Quotes signieren kann.

Dann depositest du die Token zu Intents. Mit der NEAR CLI, grob umrissen, depositest du EURe zu intents.near im Namen von nuri-solver.near, und dann BTC genauso. Die genauen Befehle hängen von den NEP-141-FT-Contracts ab, die du nutzt (ft_transfer_call und storage_deposit), und sie stehen im README von NEAR Intents und vom AMM-Solver. Die Idee ist: Du bewegst Token von deinem Solver-Account in eine Reserve-Position auf dem Intents-Contract.

Sobald die Reserven drin sind, startest du den Solver mit diesen acht Settings.

    AMM_TOKEN1_ID=...EURe...
    AMM_TOKEN2_ID=nep141:btc.omft.near
    NEAR_ACCOUNT_ID=nuri-solver.near
    NEAR_PRIVATE_KEY=ed25519:...
    RELAY_WS_URL=wss://solver-relay-v2.chaindefuser.com/ws
    APP_PORT=4010
    MARGIN_PERCENT=0.3
    ONE_CLICK_API_ONLY=true

    npm start

Wenn der Solver startet, zeigt emino.app/solver/ Health = READY, Reserven von EURe und BTC, die nicht null sind, den Total Supply und die letzten Quotes und Intents.

Um Gewinn rauszuholen, reduzierst du deine Reserve-Position auf intents.near und ziehst einen Teil der EURe- und BTC-Reserven zurück zu nuri-solver.near. Dann bridgest du die Assets raus. Du ziehst BTC vom NEAR-BTC-Token in On-Chain-BTC und EURe zurück zu Gnosis, wenn du das willst. Auch hier hängen die genauen Befehle von den FT-Bridges und dem Intents-Tooling ab, aber das Prinzip ist einfach. Das zusätzliche BTC und EURe, das sich in den Reserven angesammelt hat, verglichen mit deiner ersten Einzahlung, ist dein PnL.

## 9. Monitoring auf emino.app/solver/

Das Solver-Dashboard beantwortet drei Fragen.

Die erste ist, ob unser Solver gesund und verbunden ist. Die Health-Karte zeigt ready als true oder false und unseren Solver-Account, nuri-solver.near. Die Websocket-Karte zeigt die Verbindung zum Relay (CONNECTED oder DISCONNECTED) und den Timestamp des letzten Relay-Events.

Die zweite ist, welche Liquidität wir haben und was auf NEAR passiert. Die Reserves-Karte zeigt die EURe- und BTC-Reserven in menschenlesbaren Einheiten, „Our liquidity on intents.near for this solver". Die Total-Supply-Karte zeigt den globalen Supply von EURe und BTC auf NEAR Intents, über alle Solver hinweg.

Die dritte ist, welche Aktivität über uns läuft und was über das Netzwerk geht. „Recent Quotes (ours)" zeigt nur die Quotes, die dieser Solver berechnet und signiert hat. „Recent Swaps (via emino.app UI)" ist die History von GET /api/intend/history, also genau das, was du auf /intent/intend/ siehst. „Recent Intents (network)" zeigt alle Intents, die über das Relay gesehen wurden, und die Zeilen mit ausgefülltem Asset und Amount sind die Intents, die zu unseren eigenen Quotes passen. „Recent Intents (details)" zeigt dieselben Intents mit vollen Hashes und Timestamps für tiefes Debugging.

Mit einem Blick weißt du also, wie busy unser Solver ist, ob Quotes akzeptiert und ausgeführt werden, ob User wirklich über unsere UI swappen und wie viel Liquidität wir noch haben.

## 10. Was als Nächstes kommt

Jetzt ist alles verdrahtet und funktioniert von Anfang bis Ende, also können wir in ein paar Richtungen iterieren. Bessere Preise, indem wir MARGIN_PERCENT pro Paar, Größe oder Volatilität anpassen und externe Price Feeds nutzen, um den AMM um einen fairen Preis zu zentrieren. Mehr Paare, indem wir mehr Token zum selben Solver hinzufügen oder mehr Solver laufen lassen. Und eine reichere UI, wo User verschiedene Swap-Größen wählen und den Slippage und den effektiven Preis sehen, plus einen „Expert Mode" mit dem rohen Request- und Response-JSON eingebettet.

Für jetzt haben wir schon einen voll funktionierenden Cross-Chain-Swap zwischen BTC und EURe über NEAR Intents und 1-Click, einen eigenen AMM-Solver, der 0,3 % Marge bei jedem Swap verdient, und Monitoring und History mit einer sauberen Trennung zwischen unseren eigenen Daten und dem weiteren NEAR-Intents-Netzwerk.

Teil das gern mit jedem, der verstehen will, wie das System unter der Haube funktioniert, oder der sich fragt, wie ein Solver tatsächlich Geld verdienen kann, indem er Liquidität bereitstellt.
