---
title: "Transaktionsanalyse von 34yCReBo...jtVM"
description: "Ein Blick auf eine NEAR-Transaktion auf Paras: was mt_transfer_call macht, was NEP-245 ist und warum die Gebühr fast nichts gekostet hat."
date: "2026-02-09T10:40:01Z"
updated: "2026-02-09"
lang: de
translated_from: "en/comprehensive-transaction-analysis-34ycrebo-jtvm"
source_sections: ["the-basics", "what-mt_transfer_call-does", "inside-the-transaction", "what-it-means"]
category: payments
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/comprehensive-transaction-analysis-34ycrebo-jtvm/cover.webp"
tldr: ["Eine Aufschlüsselung einer NEAR-Mainnet-Transaktion von v4v.near an den Paras-Marketplace-Contract.", "Sie hat mt_transfer_call nach dem NEP-245-Multi-Token-Standard ausgeführt und 15,42 TGas verbraucht, etwa 0,00008 $.", "Der Marketplace konnte die Übertragung sofort sehen und den nächsten Schritt einleiten, höchstwahrscheinlich einen Trade oder ein Listing."]
sections: [{"basically": "Ein erfolgreicher NEAR-Mainnet-Call von v4v.near an den Paras-Marketplace für weniger als einen Cent."}, {"basically": "Ein einziger Call bewegt einen NEP-245-Token und sagt dem empfangenden Contract, dass er sofort darauf reagieren soll."}, {"basically": "Besitz prüfen, die 1-yoctoNEAR-Deposit prüfen, Guthaben verschieben, dann den Empfänger benachrichtigen."}, {"basically": "Eine winzige Gebühr hat einen Token auf Paras bewegt, und der Marketplace konnte sofort den nächsten Schritt machen."}]
---
![](../../../media/comprehensive-transaction-analysis-34ycrebo-jtvm/cover.jpg)

# Transaktionsanalyse von 34yCReBo...jtVM

Das ist eine Transaktion auf NEAR, und ich gehe sie in sechs kurzen Teilen durch, von wem sie kam bis zu dem, was sie bedeutet.

## Die Basics

Der Transaktions-Hash ist 34yCReBoTyb12hH33xVdydoNJE5s58Kb1VeWYwY7jtVM und sie lief auf dem NEAR Protocol Mainnet. Der Status ist Erfolg und sie ist finalisiert. Der Signer, also der Sender, ist v4v.near, und der Empfänger-Contract ist x.paras.near, das ist der Haupt-Contract vom Paras Marketplace.

Das Gas-Limit war 300 TGas, und das ist einfach das Maximum an Recheneinheiten, das reserviert wurde, also gibt es dafür keinen Dollar-Wert. Das tatsächlich verbrauchte Gas war 15,42 TGas, etwa 0,00008 $. Die Transaktionsgebühr, also die Kosten, die an die Validatoren gehen, um den Call zu verarbeiten, war 0,001542 NEAR, also weniger als 0,01 $. Und es gab ein angehängtes Deposit von 1 yoctoNEAR, ungefähr 0,0000...01 $ wert, was eine Sicherheitsanforderung für Asset-Transfers ist.

## Was mt_transfer_call macht

Die Transaktion hat `mt_transfer_call` ausgeführt, einen Multi-Token-Transfer mit Call. Das ist eine High-Level-Funktion, die zwei Dinge gleichzeitig macht. Der Transfer-Teil überträgt das Eigentum an einem bestimmten Asset, definiert durch NEP-245, vom Sender zum Empfänger. Und der Call-Teil sagt dem empfangenden Contract, dass er sofort eine zweite Aktion ausführen soll, zum Beispiel das Item zum Verkauf listen oder es staken.

NEP-245 ist die NEAR-Version von ERC-1155 auf Ethereum. Es ist als Schweizer Taschenmesser für digitale Assets gebaut, und genau deshalb wurde es hier benutzt. Statt verschiedener Standards für einmalige Items, die NFTs, und für stapelbare Items, die fungiblen Token, handhabt NEP-245 beides in einem Contract. Es erlaubt auch semi-fungible Editionen. Wenn ein Künstler 100 identische Kopien einer digitalen Karte rausbringt, trackt NEP-245 sie als eine ID mit einem Balance von 100 und nicht als 100 separate einzigartige Einträge. Und es macht die Sache billiger, weil Batch-Transfers möglich sind, du kannst also 50 verschiedene Items für eine einzige Transaktionsgebühr bewegen.

## Innerhalb der Transaktion

Der Standard im Event-Log ist `nep245` und das Event ist `mt_transfer`, und die Logik lief in vier Schritten ab. Zuerst prüft der Contract, dass der Sender (`v4v.near`) die `token_id` besitzt. Dann prüft er, dass das 1 yoctoNEAR Deposit da ist, als Sicherheitscheck. In Schritt drei wird der Balance der `token_id` vom Sender abgezogen und dem Empfänger gutgeschrieben. Und am Ende wird der `on_mt_transfer` Callback auf dem Empfänger-Contract getriggert, um zu bestätigen, dass er die Assets akzeptiert hat.

## Was es bedeutet

Das war also ein billiger und effizienter Move eines digitalen Assets auf dem Paras Marketplace. Du hast eine winzige Fee von etwa 0,00008 $ gezahlt, um einen Token zu bewegen, der den neueren NEP-245 Standard nutzt, und dadurch konnte der Marketplace den Transfer sofort sehen und den nächsten Schritt abwickeln, höchstwahrscheinlich einen Trade oder ein Listing.
