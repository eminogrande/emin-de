---
title: "Lightning Network Deep Dive: Architektur und Implementierung"
description: "Zusammenfassung eines Vortrags von Laolu „Roasbeef“ Osuntokun darüber, wie Lightning Channels, HTLCs und LND wirklich funktionieren – und wie Flare das Routing skalieren könnte."
date: "2026-02-06T22:25:01Z"
updated: "2026-02-06"
lang: de
translated_from: "en/lightning-network-deep-dive-architecture-and-implementation"
source_sections: ["channels-revocation-and-htlcs", "how-nodes-talk-and-how-lnd-gets-fast", "inside-lnd", "routing-and-flare"]
category: bitcoin
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/lightning-network-deep-dive-architecture-and-implementation/cover.webp"
third_party_summary: true
tldr: ["Laolu „Roasbeef“ Osuntokun erklärt, wie Lightning Channels, Revocation und HTLCs funktionieren und wie LND aufgebaut ist.", "Durch Pipelining und Batching schafft LND laut ihm 1.000 Transaktionen pro Sekunde auf einem einzigen Channel.", "Flare ist ein Routing-Ansatz, der lokales Wissen mit Beacon Nodes kombiniert, damit ein Handy nicht die ganze Karte braucht."]
sections: [{"basically": "Ein Channel ist ein 2-of-2-Multisig. Revocation bestraft Betrüger, und HTLCs routen Zahlungen mithilfe eines Secrets."}, {"basically": "Nodes sprechen ein asynchrones Commitment-Protokoll, bündeln Updates unter einer Signatur und begrenzen ausstehende Updates."}, {"basically": "LND ist in Go geschrieben und aufgeteilt in RPC-Server, Wallet, Chain Notifier, HTLC Switch und Breach Arbiter."}, {"basically": "Signierte Channel-Ankündigungen verhindern Spam, und Flare kombiniert nahe Nodes mit fernen Beacons, um Pfade zu finden."}]
---
Eine Zusammenfassung eines Vortrags von Laolu „Roasbeef“ Osuntokun. Die Angaben in Klammern verweisen auf die jeweilige Stelle im Vortrag.

[00:00:26] Der Vortrag geht über die grobe Idee von Lightning hinaus und beschäftigt sich damit, wie es wirklich funktioniert. Laolu erklärt die Commitment-Protokolle, wie der Lightning Network Daemon (LND) aufgebaut ist und wohin sich das Routing mit etwas namens Flare entwickeln könnte.

## Channels, Revocation und HTLCs

[00:01:27] Alles beginnt mit einem Payment Channel, der in beide Richtungen funktioniert. Ein Channel ist im Grunde ein 2-of-2-Multisig-Escrow auf der Bitcoin-Blockchain. Zwei Leute zahlen Geld in diese Funding-Transaktion ein. Sobald sie bestätigt ist, können sie so viele Transaktionen off-chain machen, wie sie wollen. Sie aktualisieren einfach, wie das Geld zwischen ihnen aufgeteilt ist, und die Haupt-Blockchain bekommt davon nichts mit.

[00:01:51] Damit das sicher ist, braucht Lightning einen Fix für Malleability, zum Beispiel SegWit. Ohne den könnte jemand die ID der Funding-Transaktion ändern, bevor sie bestätigt ist. Dann wären die Commitment-Transaktionen, also die, mit denen du dein Geld zurückholst, nicht mehr gültig, und das Geld könnte für immer festhängen.

[00:03:01] Off-Chain-Transaktionen sind nur Versprechen, also muss es einen Weg geben, zu verhindern, dass jemand einen alten Zustand veröffentlicht, in dem er mehr Geld hatte. Lightning löst das mit Revocation. Bei jedem neuen Zustand wird der alte widerrufen, indem ein Secret Key geteilt wird. Wenn eine Seite versucht zu betrügen und einen alten Zustand veröffentlicht, kann die ehrliche Seite dieses Secret nutzen und sofort das gesamte Geld im Channel kassieren, als Strafe.

[00:04:42] Um jemanden zu bezahlen, mit dem du keinen direkten Channel hast, nutzt das Netzwerk Hash Time-Locked Contracts (HTLCs). Die Zahlung wird über eine Kette von Leuten hinweg gesperrt. Der Empfänger kann das Geld nur einfordern, indem er ein Secret zeigt, das Preimage. Sobald er es der Person davor zeigt, kann diese es der nächsten davor zeigen, und so weiter, bis die Zahlung des ursprünglichen Senders abgewickelt ist.

## Wie Nodes miteinander reden und wie LND schnell wird

[00:13:33] Dann geht Laolu auf das Lightning Commitment Protocol (LCP) ein. Das ist die Sprache, mit der Nodes miteinander reden, Peer to Peer. Es fügt HTLCs hinzu, entfernt sie und signiert neue Zustände. Und es ist asynchron, du musst also nicht warten, bis eine Zahlung durch ist, bevor du die nächste startest.

[00:14:14] Für richtige Geschwindigkeit macht LND Pipelining. Viele Payment-Updates können gleichzeitig in einen Channel gehen. Nodes können diese Updates unter einer Signatur bündeln, das spart Rechenleistung und lässt einen einzelnen Channel mehr Transaktionen pro Sekunde verarbeiten.

[00:16:02] Es funktioniert ein bisschen wie TCP im Internet. Lightning hat ein Fenster, das begrenzt, wie viele State-Updates ein Peer unterwegs haben darf, ohne eine Antwort zu bekommen. So kann ein Node einen anderen nicht mit mehr Updates fluten, als er verarbeiten kann. Das ist das Revocation Window.

## Inside LND

[00:21:53] LND ist in Go geschrieben. Laolu hat sich für Go entschieden, weil es sehr gut in Concurrency ist, mit Goroutinen und Channels, und das passt gut, wenn du Tausende Payment-Requests gleichzeitig hast. Außerdem gibt es dir einen sauberen Weg, komplexes Networking zu machen.

[00:25:24] Innen ist der Daemon in ein paar Teile aufgeteilt. Der RPC Server nimmt Anfragen von Nutzern über gRPC oder REST entgegen. Der Wallet Controller kümmert sich um die echten Bitcoin-Keys und die On-Chain-Transaktionen. Der Chain Notifier beobachtet die Blockchain auf Dinge wie ein Channel-Closing. Der HTLC Switch ist wie ein Router im Node und bewegt Zahlungen von einem Channel zum nächsten. Und der Breach Arbiter ist der Sicherheitsteil. Er achtet darauf, ob jemand versucht zu betrügen, und schickt die Penalty-Transaktionen von allein raus.

[00:28:16] Dann gibt es eine Live-Demo zwischen einem Node in New York und einem Node in San Francisco. Laolu zeigt, dass er Tausende Micropayments fast sofort durchschieben kann. Bei [00:35:45] sagt er, die aktuelle Implementierung schafft 1.000 Transaktionen pro Sekunde (TPS) auf einem einzelnen Channel. Das ist deutlich schneller als die Bitcoin-Blockchain darunter.

## Routing und Flare

[00:40:04] Um einen Pfad zu einem Empfänger zu finden, müssen Nodes die Topologie des Netzwerks kennen. Nodes schicken Announcement-Signaturen raus, um zu beweisen, dass sie einen echten Channel auf der Blockchain haben. Das verhindert, dass Spam-Nodes das Netzwerk mit gefälschten Routing-Infos vollpumpen.

[00:42:31] Wenn das Netzwerk groß wird, kann kein Handy mehr die ganze Karte kennen. Also erklärt Laolu Flare, einen Routing-Algorithmus, der lokales Wissen, also wer ist in meiner Nähe, mit Beacons mischt, also bekannten Nodes, die weiter weg sind. So kann ein Node einen Pfad durch das ganze globale Netzwerk finden, ohne Gigabyte an Kartendaten zu speichern.

![image](../../../media/lightning-network-deep-dive-architecture-and-implementation/image.png)
