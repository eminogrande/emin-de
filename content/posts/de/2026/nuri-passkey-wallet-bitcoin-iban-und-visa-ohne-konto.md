---
title: "Nuri Passkey Wallet: Bitcoin, IBAN und Visa ohne Konto"
description: "Wie wir bei Nuri aus einem Passkey eine eigene Wallet machen, für Menschen, für Firmen und für KI-Agenten, und das ganz ohne Konto beim Anbieter."
date: "2026-08-05T20:03:39.276Z"
updated: "2026-08-05T20:03:39.276Z"
lang: "de"
category: "nuri"
format: "essay"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "medium"
third_party_summary: false
voice_check:
  em_dash: 9
  unobserved: 65
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://medium.com/@em/nuri-passkey-wallet-bitcoin-iban-und-visa-ohne-konto-ac719483e2bb"
---
Wie Nuri aus einem Passkey eine selbstverwahrte Wallet für Menschen, Unternehmen und KI-Agenten macht.

Jedes Finanzprodukt, das man so kennt, läuft über ein Konto. Man meldet sich an, ein Anbieter führt das Konto und das Geld liegt bei ihm. Bei Nuri lassen wir diese Ebene einfach weg.

Die Grundlage ist ein Passkey, also dasselbe Verfahren, mit dem man sich heute schon bei manchen Diensten ohne Passwort anmeldet. Technisch ist das ein Schlüsselpaar, das dein Gerät in einem geschützten Chip erzeugt und verwahrt, und das fest an eine bestimmte Website gebunden ist. Face ID oder der Fingerabdruck geben den Schlüssel frei, wenn du ihn benutzt.

Aus diesem Passkey leiten wir die Wallet ab. Es gibt dafür also weder ein Konto noch eine E-Mail oder ein Passwort. Und weil die Ableitung jedes Mal dasselbe Ergebnis liefert, müssen wir auch nichts speichern. Es gibt also auch die Datenbank mit Nutzerschlüsseln gar nicht, die man stehlen könnte, und die 24 Wörter, die du irgendwo sicher verwahren müsstest, gibt es auch nicht.

Die Bindung an eine Website hat noch einen Nebeneffekt, denn eine gefälschte Seite kann den Passkey so gar nicht benutzen. Der Browser gibt ihn einfach nur raus, wenn die Adresse stimmt, und so läuft Phishing ins Leere.

Jede Zahlung braucht zwei Unterschriften. Die erste kommt aus deinem Passkey und die kennt nur dein Gerät. Die zweite ist die Absicherung von Nuri, aber auch die liegt bei uns nicht fertig herum. Sie entsteht erst, wenn unser Anteil mit Material von dir zusammenkommt. Wir haben also weder deinen Schlüssel noch den zweiten Schlüssel vollständig, und so kann weder dein Gerät allein noch Nuri allein Geld bewegen.

Im Alltag sichert dich diese zweite Unterschrift ab, denn ein gestohlenes Handy reicht dann eben nicht. Und falls es Nuri irgendwann mal nicht mehr gibt, bist du trotzdem nicht ausgesperrt, weil du nach einer Wartezeit auch allein an dein Geld kommst. Das ist der Unterschied zu einer Börse wie Coinbase, wo dein Guthaben eigentlich dem Anbieter gehört.

Das alles ist heute schon live und keine Roadmap. Bitcoin und Lightning, digitale Euro und Dollar, Swaps, eine europäische IBAN, ein US-Konto mit ACH und eine Visa-Karte. Dazu kommen lokale Zahlungswege, an die sonst niemand denkt, so wie Mobile Money in Tansania und PIX in Brasilien.

Und das ist der eigentliche Punkt. Das ist eben nicht eine Bank, an die man noch eine Krypto-Funktion angeschlossen hat. Es läuft alles onchain, auf derselben Wallet, die aus deinem Passkey entsteht. Ein Euro, der per SEPA ankommt, landet direkt bei dir und nicht auf einem Konto, das jemand für dich führt.

Dann gibt es noch den Teil mit der KI. Es ist absehbar, dass KI-Assistenten bald Zahlungen machen werden, also Abos verwalten, Rechnungen bezahlen und einkaufen. Die offene Frage der ganzen Branche ist, wie man einer Software Zugriff auf Geld gibt, ohne dabei die Kontrolle abzugeben.

Unsere Antwort darauf läuft schon unter agent.nuri.com. Das sind befristete Wallets mit eigenem Schlüssel, eigenem Budget, festen Empfängern und einem Ablaufdatum. Die kann man jederzeit widerrufen, ohne die Haupt-Wallet anzufassen. Ein Assistent kann eine Zahlung vorbereiten, aber freigeben tust du sie. Das ist der Markt, auf den wir mit Nuri zielen, und wir sind da früh dran.

Cloudflare, Privy und Turnkey bauen Wallet-Infrastruktur für Unternehmen, und da bleibt der Anbieter der Ausgangspunkt. Breez nutzt Passkeys, um die Bitcoin-Seed-Phrase zu ersetzen, aber eben nur dafür. Wir setzen bei Nuri beim Eigentum des Nutzers an und hängen den ganzen Finanzstack daran, also Bitcoin, Banking, die Karte und die Berechtigungen für KI.

Noch kurz zum Namen. Nuri ist dieselbe Marke wie früher, die wir von Bitwala übernommen haben, aber wir haben alles komplett neu aufgesetzt, mit einem neuen Team und neuer Technik. Geblieben ist nur das Ziel, mit dem Bitwala damals angetreten ist, und das ist Self-Custody, Banking und Bitcoin für alle. Diesmal auf einem Fundament, das auch trägt.
