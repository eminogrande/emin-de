---
title: "Ein kryptografisch sicherer Weg, Bitcoin mit null Bestätigungen zu akzeptieren"
description: "Wenn der Zahler ohne dich keine zweite Ausgabe signieren kann, ist eine Zero-Conf-Bitcoin-Zahlung sicher. Taproot-Co-Signing, eine Signatur pro Outpoint und ein verzögerter Exit."
date: "2025-12-16T09:20:01Z"
updated: "2025-12-16"
lang: de
translated_from: "en/a-cryptographically-safe-method-for-zero-confirmation-bitcoin-acceptance"
source_sections: ["when-zero-confirmation-is-unsafe", "the-one-condition", "a-taproot-output-with-two-paths", "how-acceptance-works", "four-rules-for-the-co-signer", "timing", "bitcoin-to-lightning-swaps", "what-it-doesnt-fix", "what-you-need"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/a-cryptographically-safe-method-for-zero-confirmation-bitcoin-acceptance/cover.webp"
tldr: ["Eine Zahlung ohne Bestätigung ist nur sicher, wenn der Zahler keine andere gültige Ausgabe desselben UTXO erstellen kann.", "Pflicht-Co-Signing plus ein verzögerter Wiederherstellungspfad nur für den Nutzer erzwingt das mit Kryptografie.", "Der Co-Signer signiert jeden Outpoint einmal, sodass eine Lightning-Zahlung vor der ersten Bestätigung rausgehen kann."]
sections: [{"basically": "Wenn der Zahler eine andere gültige Ausgabe desselben UTXO bauen kann, sind Fees und RBF-Regeln egal."}, {"basically": "Während des Fensters darf der Zahler nicht alleine ausgeben können. Erzwungen auf UTXO-Ebene."}, {"basically": "Kooperativer Pfad sofort mit zwei Signaturen, Wiederherstellungspfad nur für den Nutzer nach N Blöcken."}, {"basically": "Bauen, zum Co-Signing schicken, Policy prüfen, einmal signieren, broadcasten. Dann ist der Mempool egal."}, {"basically": "Eine Signatur pro Outpoint, Signieren und Sperren atomar, auf die ganze Transaktion committen, Reorgs beobachten."}, {"basically": "Die Wiederherstellungsverzögerung muss lang genug sein, damit die kooperative Ausgabe auch bei schlechten Fees noch bestätigt wird."}, {"basically": "Co-Signing ist die Autorisierung, also kann die Lightning-Zahlung bei null Bestätigungen starten."}, {"basically": "Double-Spends des Zahlers sind weg. Co-Signer-Kompromittierung, Downtime, langsame Bestätigungen und Zensur nicht."}, {"basically": "Pflicht-Co-Signing, eine Signatur pro Outpoint und ein verzögerter Solo-Wiederherstellungspfad. Nichts weniger funktioniert."}]
---
![](../../../media/a-cryptographically-safe-method-for-zero-confirmation-bitcoin-acceptance/cover.jpg)

Eine Bitcoin-Transaktion ist erst final, wenn sie in einem Block bestätigt ist. Bis dahin kann jede Transaktion, die ein UTXO ausgibt, durch eine andere gültige Transaktion ersetzt werden, die dieselben Inputs ausgibt. Deshalb ist es im Allgemeinen nicht sicher, Zero-Confirmation-Zahlungen anzunehmen.

Dieser Post beschreibt ein Setup, bei dem ein Service eine Zero-Confirmation-Bitcoin-Transaktion sicher annehmen und darauf reagieren kann, in dem Sinne, dass der Zahler während eines definierten Zeitfensters keine konfliktierende gültige Transaktion erstellen kann.

Es funktioniert, indem auf UTXO-Ebene erzwungen wird, wer signieren kann, und es hängt nicht davon ab, wie sich der Mempool verhält oder welche Policy Miner haben.

## Wann Zero-Confirmation unsicher ist

Angenommen, ein UTXO `U` kann von einem User ausgegeben werden. Eine Zero-Confirmation-Transaktion `T`, die `U` ausgibt, ist unsicher, wenn der User auch eine andere Transaktion `T'` bauen kann, die `U` ausgibt, und diese statt `T` bestätigt bekommt.

Und das bleibt so, egal wie die Fees sind, egal ob es Replace-by-Fee-Signaling gibt, egal wie der Mempool sie verbreitet, und egal welche Script-Struktur in `T` steckt.

Zero-Confirmation-Sicherheit bedeutet also, dass es überhaupt keine andere gültige Ausgabe von `U` geben darf.

## Die eine Bedingung

Die Idee dahinter ist einfach. Eine konfliktierende Transaktion kann nur existieren, wenn der Zahler alleine eine gültige Ausgabe machen kann. Die eine Bedingung, die du brauchst, und die auch reicht, ist also diese.

Während des Annahmefensters darf der Zahler keine gültige Transaktion erstellen können, die die relevanten UTXOs ausgibt, ohne dass der Service mitmacht. Und das muss mit Kryptographie auf UTXO-Ebene erzwungen werden.

## Ein Taproot-Output mit zwei Pfaden

Die Funds liegen in einem Taproot-Output mit zwei Ausgabewegen. Der kooperative Pfad funktioniert sofort. Er braucht eine Signatur vom User und eine Signatur vom Co-Signing-Key des Services, er hat keinen Timelock, und er wird für alle normalen Ausgaben benutzt.

Der Recovery-Pfad ist nur für den User, aber er ist verzögert. Er braucht nur die User-Signatur, er wird durch `OP_CHECKSEQUENCEVERIFY` erzwungen, und er wird nach `N` Blöcken gültig. Der Service hat also nie Custody, der User kann die Funds nach der Verzögerung immer alleine zurückholen, und bevor die Verzögerung vorbei ist, kann niemand alleine ausgeben.

## Wie die Annahme funktioniert

Sei `U` nun ein Output, der so gebaut ist. Die Annahme läuft in 5 Schritten. In Schritt 1 baut der User eine Transaktion `T`, die `U` ausgibt, in Schritt 2 geht die Transaktion zum Co-Signing an den Service, und in Schritt 3 prüft der Service seine Policy, also Ziel, Betrag und Fee.

In Schritt 4 signiert der Service `T` genau einmal pro Outpoint in `U`, und in Schritt 5 wird die Transaktion gebroadcastet. Ab diesem Punkt ist `T` gültig, keine andere gültige Transaktion, die `U` ausgibt, kann existieren, und was der Mempool macht, ist dann egal.

Du kannst die Transaktion also sofort als autorisiert behandeln, auch wenn sie noch nicht bestätigt ist.

## Vier Regeln für den Co-Signer

Der Co-Signing-Service muss 4 Regeln einhalten, und wenn er eine davon bricht, ist die Sicherheitsgarantie weg. Regel 1 ist eine Signatur pro Outpoint, also jedes UTXO wird maximal einmal signiert, und das wird in durablem State getrackt.

Regel 2 ist atomar signieren und locken, also Signieren und State schreiben passieren als ein Schritt, und parallele Requests können nie zu mehr als einer Signatur führen. Regel 3 ist die ganze Transaktion committen, also die Signatur deckt den kompletten Transaktions-Digest ab, und es gibt kein Signieren von nur einer Absicht.

Regel 4 ist Reorgs im Blick haben, also der State wird nicht nur wegen einer Bestätigung freigegeben, und Outpoints bleiben gelockt, bis das Reorg-Risiko akzeptabel ist.

## Timing

Timing ist auch wichtig. Der Recovery-Pfad wird durch einen relativen Timelock (`OP_CHECKSEQUENCEVERIFY`) erzwungen, der ab der Bestätigung des Parent-Outputs zählt. Vor der Bestätigung ist also nur der kooperative Pfad gültig, und nach der Bestätigung muss die Verzögerung lang genug sein, damit der kooperative Spend auch bei schlechten Fees noch bestätigt werden kann.

Der Service muss sicherstellen, dass die kooperative Transaktion höchstwahrscheinlich bestätigt wird, bevor der Recovery-Pfad aufgeht, oder er muss dieses ökonomische Risiko akzeptieren.

## Bitcoin-zu-Lightning-Swaps

Das passt richtig gut zu Bitcoin-zu-Lightning-Swaps. Der kooperative On-Chain-Spend ist die Autorisierung, die Lightning-Zahlung kann direkt nach dem Co-Signing starten, und die On-Chain-Bestätigung ist das Settlement.

Weil während des kooperativen Fensters keine konfliktierende Ausgabe existieren kann, öffnet das Abfeuern der Lightning-Zahlung bei null Bestätigungen den Service nicht für Double-Spend-Risiko vom Zahler.

## Was es nicht fixt

Aber das entfernt nur das Double-Spend-Risiko vom Zahler. Es entfernt nicht das Risiko, dass der Co-Signer kompromittiert wird, dass der Service ausfällt, dass Bestätigungen lange dauern, oder dass Miner die Transaktion zensieren. Diese Risiken musst du im Betrieb abhandeln.

## Was du brauchst

Sichere Zero-Confirmation-Annahme in Bitcoin funktioniert also nur, wenn du dem Zahler die Möglichkeit nimmst, konfliktierende gültige Transaktionen zu erstellen. Du brauchst Pflicht-Co-Signing auf UTXO-Ebene, striktes Einmal-Signieren pro Outpoint, und einen verzögerten Recovery-Pfad, den der User alleine nutzen kann.

Jeder Ansatz, der diese Dinge nicht erzwingt, kann dir keine kryptographische Zero-Confirmation-Sicherheit geben.
