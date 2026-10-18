---
title: "Spark Wallet UX und der Lightning-Flow, ein Build-Log"
description: "Ich wollte, dass das Spark Wallet exakt wie der bestehende Bitcoin-Screen aussieht, mit minimalem Code und ohne Duplikate oder Legacy-Code. Außerdem habe ich…"
date: "2026-01-09T14:25:01Z"
updated: "2026-01-09"
lang: de
translated_from: "en/spark-wallet-ux-lightning-flow-chronological-build-log"
source_sections: ["making-spark-look-like-bitcoin", "the-receive-screen", "killing-the-loading-delays", "send-lnurl-and-lightning-addresses", "sending-to-a-normal-bitcoin-address", "refinements", "how-i-worked-with-the-agent"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/spark-wallet-ux-lightning-flow-chronological-build-log/cover.webp"
tldr: ["Ich wollte, dass das Spark Wallet exakt wie der bestehende Bitcoin-Screen aussieht, mit minimalem Code und ohne Duplikate.", "Empfangen, Senden, LNURL, Lightning-Adressen und Spark-zu-L1-Abhebungen funktionieren jetzt, mit Caching, um die Ladeverzögerungen loszuwerden.", "Keine Git-Befehle und keine Tests, und jede Änderung brauchte zuerst meine Freigabe."]
sections: [{"basically": "Gleiches Styling, gleiche Abstände und Buttons wie beim Bitcoin-Screen, plus automatisches Claimen ausstehender Transfers."}, {"basically": "Adresse oben, QR-Code an derselben Stelle und ein Sats-Feld mit einem Create-Invoice-Button."}, {"basically": "Deposit-Adresse und Balance cachen, aus dem Cache laden, im Hintergrund aktualisieren."}, {"basically": "Jedes Senden bekommt einen Bestätigungs-Screen, und LNURL und Lightning-Adressen werden zu Invoices aufgelöst."}, {"basically": "Eine Onchain-Adresse führt zu einer Spark-Abhebung mit mittlerer Exit-Geschwindigkeit statt zu Lightning."}, {"basically": "Ungültige Eingaben werden gelöscht und markiert, und bei einem gültigen Prefill landet der Fokus im Betragsfeld."}, {"basically": "Der Bitcoin-Screen war die exakte Vorlage. Ich habe jede Abweichung erwischt und eine 1:1-Kopie verlangt."}]
---
![](../../../media/spark-wallet-ux-lightning-flow-chronological-build-log/cover.jpg)

# Spark-Wallet-UX und der Lightning-Flow, ein Build-Log

Ich wollte, dass das Spark-Wallet exakt so aussieht wie der bestehende Bitcoin-Screen. Der Code sollte minimal bleiben. Kein doppelter Code, kein Legacy-Code. Ich habe auch strikte Prozessregeln für den Agenten festgelegt. Keine Git-Befehle. Keine Tests. Meine Freigabe, bevor irgendetwas implementiert wird. Kurze und präzise Antworten. Der Receive- und Send-Flow sollte die Bitcoin-UI spiegeln und Lightning-Invoices und LNURL unterstützen. Später sollte er auch Onchain-Withdrawals von Spark unterstützen.

So ist es gelaufen, in chronologischer Reihenfolge.

## Spark soll aussehen wie Bitcoin

Das erste Ziel war simpel. screens/SparkBitcoinWalletScreen.tsx sollte aussehen wie screens/BitcoinScreen.tsx. Also haben wir Styling, Abstände, Typografie und Button-Layout des Spark-Screens an den Bitcoin-Screen angeglichen. Die Receive- und Send-Buttons sehen jetzt exakt gleich aus.

Wir haben auch ein Verhalten geändert. Der Spark-Screen prüft jetzt selbst auf ausstehende Transfers und claimt sie automatisch ins Spark-Wallet.

Der Apple-Pay-Button im Header ist geblieben. Er hat einen Platzhalter, damit wir ihm später die Spark-Deposit-Adresse übergeben können.

## Der Receive-Screen

Als Nächstes wollte ich, dass der Spark-Receive-Screen dem Layout des Bitcoin-Receive-Screens entspricht. Wir haben screens/SparkBitcoinReceiveModal.tsx geändert. Die Adresse steht jetzt oben. Der QR-Code sitzt an derselben Stelle wie bei Bitcoin-Receive. Teilen und Tap-to-Copy funktionieren wie in der Bitcoin-UI.

Zum Erstellen eines Invoices gibt es jetzt ein Sats-Eingabefeld. Es ist gestylt wie das Betragsfeld bei Bitcoin-Send. Darunter gibt es eine Euro-Zeile, ebenfalls der Gleichheit wegen. Der Button heißt jetzt „Create Invoice“.

Bevor du einen Invoice erstellst, siehst du die Deposit-Adresse und keinen Invoice-QR. Nachdem du einen erstellt hast, siehst du nur noch den Invoice und den Invoice-QR, im selben Stil.

## Die Ladeverzögerungen killen

Der Screen hatte lange Ladeverzögerungen. Ich wollte sie weg haben. Wir cachen jetzt die Spark-Deposit-Adresse und das Guthaben. Der Spark-Screen lädt zuerst aus dem Cache und aktualisiert im Hintergrund.

## Send, LNURL und Lightning-Adressen

Der Send-Flow sollte den Bitcoin-Send-Flow spiegeln, mit einem finalen Bestätigungsschritt. Scannen oder Einfügen führt jetzt in screens/SparkLightningSendModal.tsx. Der Sender sieht immer einen Confirm-Screen, bevor eine Zahlung rausgeht. Wenn ein Invoice einen Betrag von null hat, fragen wir stattdessen nach dem Betrag.

Dann haben wir Support für LNURL-Pay- und Lightning-Adress-Eingaben hinzugefügt. Es gibt einen neuen Service, services/SparkLnurlService.ts. Er normalisiert Eingaben und entfernt das lightning:-Präfix. Er löst die LNURL-Pay-Request mit resolveLnurlPayRequest auf. Und er fordert den Invoice vom LNURL-Callback mit requestLnurlInvoice an.

In screens/SparkLightningSendModal.tsx akzeptiert das Send-Modal jetzt LNURL-Bech32, LNURL-URLs und Lightning-Adressen. Der Betrag wird auf das LNURL-Minimum begrenzt, und das Minimum wird automatisch eingetragen. Netzwerkfehler werden vor der User-UI versteckt. Für die Logs behalten wir sie. Wenn die Eingabe ungültig ist, leeren wir das Prefill und markieren das Request-Feld. Wir zeigen keine ungültigen Daten an.

## An eine normale Bitcoin-Adresse senden

Ich wollte auch Sends an eine „normale Bitcoin-Adresse“, also Spark → L1. Wir haben services/SparkBitcoinWalletService.ts aktualisiert. withdrawToBitcoinAddress nutzt Spark getWithdrawalFeeQuote + withdraw. Die Standard-Exit-Geschwindigkeit ist ExitSpeed.MEDIUM. Die Logs kürzen die Adresse aus Sicherheitsgründen.

Die Screen-Logik in screens/SparkBitcoinWalletScreen.tsx hat sich auch geändert. handleConfirmSend erkennt eine Onchain-Adresse. Dann routet es zu withdrawToBitcoinAddress statt zu payLightningInvoice. Nach dem Withdraw aktualisiert es das Spark-Guthaben und die ausstehenden Deposits.

## Feinschliff

Danach habe ich um ein paar Verbesserungen gebeten. Wenn Einfügen oder Scannen kein gültiger Invoice, keine gültige Adresse oder kein gültiges LNURL ist, wird die Eingabe geleert und markiert. Nach einem gültigen Prefill bekommt das Betragsfeld automatisch den Fokus. Der Cursor bleibt am Ende des Betrags und der Nummernblock öffnet sich sofort. Der Betragsblock ist vertikal zwischen Header und CTA zentriert. Der Header zeigt das Memo, falls es eines gibt. Sonst steht da „Send Lightning“, oder „Send Bitcoin“ bei Onchain.

## Wie ich mit dem Agenten gearbeitet habe

Ich habe klare visuelle Vergleiche geliefert. Der Bitcoin-Screen war das exakte Ziel. Wenn die UI nicht gepasst hat, beim Icon oder den Abständen oder dem Layout, habe ich es schnell bemerkt und eine 1:1-Kopie verlangt. Ich habe minimalen Code an erste Stelle gesetzt, und „keine Fallback“-Logik. Ich habe jede Änderung Schritt für Schritt freigegeben und die Edge-Cases geklärt. Zero-Amount-Invoices sollen nachfragen. LNURL ist vorerst nur Pay. Netzwerkfehler sollen den User nicht erreichen. Und ich habe immer wieder auf denselben UX-Flow überall gedrängt, besonders bei Bestätigung, Validierung und Betragseingabe.

Es gibt Dinge, die wir nicht gemacht haben. Keine Git-Befehle. Keine Tests, das habe ich explizit so verlangt. Keine Änderungen am ursprünglichen Bitcoin-Screen.

Die Spark-Wallet-UI entspricht jetzt dem Layout des Bitcoin-Screens. Das Receive-Modal spiegelt den Bitcoin-Receive-Flow, mit der Spark-Deposit-Adresse und Invoice-Erstellung. Das Send-Modal unterstützt Lightning-Invoices, LNURL, Lightning-Adressen und Onchain-BTC-Adressen. Ungültige Eingaben füllen nie vor, und der Betragsflow ist fokussiert und zentriert. Das Spark-Guthaben und die Deposit-Adresse werden gecacht, also ist die UI schneller.
