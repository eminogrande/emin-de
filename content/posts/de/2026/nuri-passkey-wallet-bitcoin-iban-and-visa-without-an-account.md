---
title: "Nuri Passkey Wallet: Bitcoin, IBAN und Visa ohne Konto"
description: "Wie Nuri aus einem einzigen Passkey ein Self-Custody-Wallet für Menschen, Unternehmen und KI-Agenten macht, ganz ohne Konto dazwischen."
date: "2026-08-05T20:10:21.065Z"
updated: "2026-08-05"
lang: de
translated_from: "en/nuri-passkey-wallet-bitcoin-iban-and-visa-without-an-account"
source_sections: ["the-passkey-is-the-wallet", "two-signatures", "what-is-live-today", "wallets-for-ai-agents", "how-nuri-is-different"]
category: nuri
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Nuri leitet aus einem einzigen Passkey ein Self-Custody-Wallet ab. Kein Konto, keine E-Mail, kein Passwort, keine Seed Phrase.", "Jede Zahlung braucht zwei Signaturen. Weder dein Gerät allein noch Nuri kann das Geld bewegen.", "Bitcoin, Lightning, eine IBAN, ein US-Konto, eine Visa-Karte und lokale Zahlungsnetze laufen schon onchain auf diesem Wallet.", "KI-Agenten bekommen temporäre Wallets mit eigenem Budget und Ablaufdatum auf agent.nuri.com."]
sections: [{"basically": "Immer dieselbe Ableitung heißt: nichts zu speichern, nichts zu klauen, nichts zu phishen."}, {"basically": "Dein Passkey signiert, Nuris Sicherung signiert. Wenn Nuri verschwindet, kommst du nach einer Wartezeit an dein Geld."}, {"basically": "Bitcoin, Euro, Dollar, eine IBAN, ACH, Visa, Mobile Money und PIX, alles onchain auf deinem Wallet."}, {"basically": "Agenten bekommen temporäre Wallets mit Budget, festen Empfängern und Ablaufdatum. Du kannst sie jederzeit sperren."}, {"basically": "Andere fangen beim Anbieter an. Nuri fängt beim Nutzer an, dem das Wallet gehört. Der Passkey ist das Wallet."}]
---
Nuri verwandelt einen einzigen Passkey in ein Self-Custody-Wallet für Menschen, Unternehmen und KI-Agenten.

Jedes Finanzprodukt, das du kennst, läuft über ein Konto. Du meldest dich an, ein Anbieter verwaltet das Konto für dich, und dein Geld liegt bei ihm. Mit Nuri schaffen wir diese Ebene ab.

## Der Passkey ist das Wallet

Alles beginnt mit einem Passkey. Das ist dasselbe, was du schon nutzt, um dich bei manchen Diensten ohne Passwort anzumelden. Technisch gesehen ist es ein Schlüsselpaar, das dein Gerät erstellt und in einem sicheren Chip aufbewahrt, und es ist für immer an eine bestimmte Website gebunden. Face ID oder dein Fingerabdruck entsperren diesen Schlüssel, wenn du ihn nutzt. Aus diesem Passkey leitet Nuri das Wallet ab. Es gibt kein Konto, keine E-Mail und kein Passwort. Und weil die Ableitung jedes Mal dasselbe Ergebnis liefert, müssen wir nichts speichern. Es gibt also keine Datenbank mit Benutzerschlüsseln, die jemand stehlen könnte, und keine 24 Wörter, die du sicher aufbewahren musst. Durch die Website-Bindung kann eine gefälschte Seite den Passkey auch nicht nutzen. Der Browser gibt ihn einfach nicht frei, wenn die Adresse nicht stimmt, und damit läuft Phishing ins Leere.

## Zwei Signaturen

Jede Zahlung braucht zwei Signaturen. Die erste kommt von deinem Passkey, und nur dein Gerät hat sie. Die zweite ist Nuris Sicherung, aber sie liegt auch nicht auf einem Nuri-Server. Sie entsteht nur, wenn Nuris Anteil mit Material von dir kombiniert wird. Nuri hält also weder deinen Schlüssel noch den zweiten Schlüssel vollständig. Dein Gerät allein kann kein Geld bewegen, und Nuri kann es auch nicht. Im Alltag schützt dich diese zweite Signatur, denn ein gestohlenes Handy reicht nicht. Und falls Nuri jemals aufhört zu existieren, bist du nicht ausgesperrt. Nach einer Wartezeit kannst du allein auf dein Geld zugreifen. Das ist der Unterschied zu einer Börse wie Coinbase, wo dein Guthaben praktisch dem Anbieter gehört.

## Was heute live ist

Das ist live und keine Roadmap. Bitcoin und Lightning, digitale Euro und Dollar, Swaps, eine europäische IBAN, ein US-Konto mit ACH und eine Visa-Karte. Und auch lokale Zahlungswege, um die sich sonst niemand kümmert, wie Mobile Money in Tansania und PIX in Brasilien. Der eigentliche Punkt ist: Das ist keine Bank mit einem Krypto-Feature obendrauf. Alles läuft onchain, auf demselben Wallet, das aus deinem Passkey kommt. Ein Euro, der per SEPA ankommt, landet direkt bei dir und nicht auf einem Konto, das jemand für dich verwaltet.

## Wallets für KI-Agenten

KI-Assistenten werden bald Zahlungen tätigen, sie werden Abos verwalten, Rechnungen bezahlen und Dinge kaufen. Die offene Frage in der ganzen Branche ist, wie man Software Zugang zu Geld gibt, ohne die Kontrolle aufzugeben. Nuris Antwort läuft bereits unter agent.nuri.com. Das sind temporäre Wallets mit eigenem Schlüssel, eigenem Budget, festen Empfängern und einem Ablaufdatum. Du kannst sie jederzeit widerrufen, und das Haupt-Wallet bleibt unberührt. Ein Assistent kann eine Zahlung vorbereiten, und du genehmigst sie. Das ist der Markt, den Nuri anpeilt, und wir sind früh dran.

## Wie Nuri sich unterscheidet

Cloudflare, Privy und Turnkey bauen Wallet-Infrastruktur für Unternehmen, und dort ist der Anbieter immer noch der Ausgangspunkt. Breez nutzt Passkeys, um die Bitcoin-Seed-Phrase zu ersetzen, aber nur das. Nuri beginnt damit, dass der Nutzer das Wallet besitzt, und hängt den gesamten Finanz-Stack daran: Bitcoin, Banking, die Karte und KI-Berechtigungen.

Nuri ist dieselbe Marke wie früher. Wir haben sie von Bitwala übernommen, aber mit neuem Team und neuer Technologie von Grund auf neu aufgebaut. Was geblieben ist, ist das Ziel, mit dem Bitwala anfing: Self-Custody, Banking und Bitcoin für alle. Diesmal steht es auf einem Fundament, das hält. Nuri sichert nicht dein Konto, es macht das Konto überflüssig. Der Passkey ist das Wallet.
