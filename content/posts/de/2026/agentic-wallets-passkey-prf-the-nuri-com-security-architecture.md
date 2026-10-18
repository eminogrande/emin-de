---
title: "Agentic Wallets und passkey PRF, das Sicherheits-Setup hinter nuri.com"
description: "Wie wir bei nuri.com die passkey PRF-Erweiterung nutzen, um Schlüssel vom Gerät abzuleiten, eine decaying Multisig einzubauen und Agents vorbereiten, aber niemals ausgeben zu lassen."
date: "2026-02-10T08:00:01Z"
updated: "2026-02-10"
lang: de
translated_from: "en/agentic-wallets-passkey-prf-the-nuri-com-security-architecture"
source_sections: ["the-hardware-is-the-seed", "a-multisig-that-decays", "agents-prepare-you-sign", "not-only-evm", "why-it-matters"]
category: nuri
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/agentic-wallets-passkey-prf-the-nuri-com-security-architecture/cover.webp"
tldr: ["Bei nuri.com leiten wir Wallet-Schlüssel aus der passkey PRF-Erweiterung ab, es wird also keine Seed Phrase und kein Secret gespeichert.", "Eine decaying Multisig braucht im Normalbetrieb 2-of-2 und fällt nach einem Time-Lock auf 1-of-1 zurück, falls der Service verschwindet.", "Agents bereiten Transaktionen vor, aber nur der biometrische passkey des Nutzers kann sie signieren."]
sections: [{"basically": "Der Authenticator gibt jedes Mal dasselbe PRF-Ergebnis aus, die Schlüssel werden also on the fly abgeleitet und wieder gelöscht."}, {"basically": "2-of-2 mit dem Service in normalen Zeiten, 1-of-1 nach einem Time-Lock, damit dich niemand aussperren kann."}, {"basically": "Der Agent ist der Pilot, aber dein Daumenabdruck ist der Zündschlüssel."}, {"basically": "Ein abgeleiteter Master Seed funktioniert auf Bitcoin mit SegWit und Taproot und auf EVM-Chains."}, {"basically": "Keine Seed Phrase, die du verlieren kannst, kein Passwort, das man phishen kann, und kein Anbieter, der dein Geld einfrieren kann."}]
---
# Agentische Wallets und Passkey PRF: Das Sicherheits-Setup hinter nuri.com

Bei Wallet-Sicherheit musst du dich normalerweise zwischen zwei Dingen entscheiden: Self-Custody mit Seed-Phrase oder Bequemlichkeit, bei der jemand anderes dein Geld für dich hält. Bei nuri.com haben wir einen dritten Weg gebaut, mit der WebAuthn PRF (Pseudo-Random Function) Extension. Das ist ein Wallet, das hardwarebasiert gesichert, deterministisch und Multisig ist, und wir haben es für eine Zeit gebaut, in der KI-Agenten einen Großteil der Arbeit übernehmen.

## Die Hardware ist der Seed

Die Grundidee: Wir speichern kein Secret mehr. Kein Master-Passwort, keine gespeicherte JSON-Datei. Wir nutzen die Passkey PRF Extension, um die Entropie direkt vom Authenticator zu holen, also TouchID, FaceID oder ein YubiKey.

Jedes Mal, wenn sich der Nutzer authentifiziert, gibt die PRF Extension für denselben Input und Salt exakt denselben Output zurück. Es muss also nichts gespeichert werden, $Seed =
\text{HMAC-SHA256}(\text{AuthenticatorSecret}, \text{Salt})$. Weil wir diesen $Seed$ jederzeit neu ableiten können, werden die Private Keys on the fly erzeugt und direkt nach der Signatur wieder gelöscht (zeroized).

## Ein Multisig, der zerfällt

Um Sicherheit zu haben und trotzdem immer an dein Geld zu kommen, nutzen wir ein decaying Multisig-Script. Im Normalbetrieb braucht es 2-of-2 Signaturen: den Key aus dem PRF und einen Key, den der Service hält. Wenn der Service (die Relying Party) verschwindet oder die Domain verloren geht, sorgt ein Time-Lock (CheckSequenceVerify) dafür, dass das Wallet in einen 1-of-1 Zustand übergeht. Ein Service-Provider kann dich also niemals aus deinem Geld aussperren, und in normalen Zeiten hast du trotzdem die Sicherheit eines Co-Signers.

## Agenten bereiten vor, du signierst

Wenn KI-Agenten anfangen, Dinge on-chain zu erledigen, wird die Grenze zwischen wer etwas darf und wer es tatsächlich tut zur eigentlichen Herausforderung.

Es funktioniert so: Ein Agent beobachtet die Chain und bereitet eine komplexe Transaktion vor, zum Beispiel "Rebalanciere meine DeFi-Positionen, wenn die Fees niedrig sind". Der Agent macht die ganze Vorarbeit und gibt dem Nutzer ein Payload, das bereit zum Signieren ist. Aber der Private Key braucht einen biometrischen Trigger über die Passkey PRF, der Agent kann also nicht alleine Geld ausgeben. Das gibt dir eine Guardrail, die an Hardware gebunden ist. Der Agent ist der Pilot, aber der Fingerabdruck des Nutzers ist der Zündschlüssel.

## Nicht nur EVM

Viele Passkey-Wallets kümmern sich nur um EVM (über ERC-4337). Unser Setup bei nuri.com funktioniert auf jeder Chain, weil wir einen Master Seed ableiten. Auf Bitcoin bedeutet das native SegWit- und Taproot-Transaktionen durch deterministische BIP32-Ableitung. Auf EVM bedeutet es volle Unterstützung für Ethereum-basierte Chains und Account Abstraction.

## Warum das wichtig ist

Das bringt uns in Richtung einer Zukunft ohne Secrets. Es gibt keine Seed-Phrase, die man verlieren kann, kein Master-Passwort, das jemand phishen kann, und keinen Service-Provider, der dein Geld für immer einfrieren kann. Wir wollen diese Orchestrierungslogik als Open Source veröffentlichen, damit sie das Base Layer für agentische Wallets sein kann, die sicher sind und einen Menschen in der Schleife behalten.

![image](../../../media/agentic-wallets-passkey-prf-the-nuri-com-security-architecture/image.png)
