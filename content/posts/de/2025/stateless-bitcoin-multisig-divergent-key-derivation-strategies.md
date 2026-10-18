---
title: "Stateless Bitcoin Multisig und verschiedene Strategien zur Schlüsselableitung"
description: "Zwei Wege, den Server-Co-Signer-Key in einer Passkey-MuSig2-Bitcoin-Wallet abzuleiten, warum sie unterschiedliche Adressen ergeben und wie du migrieren kannst."
date: "2025-12-09T15:15:01Z"
updated: "2025-12-09"
lang: de
translated_from: "en/stateless-bitcoin-multisig-divergent-key-derivation-strategies"
source_sections: ["architecture-a-pure-prf", "architecture-b-anchored-in-a-secret", "the-problem-deterministic-divergence", "three-ways-to-migrate", "the-trade-off"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/stateless-bitcoin-multisig-divergent-key-derivation-strategies/cover.webp"
tldr: ["Passkey-MuSig2-Bitcoin-Wallets können den Server-Co-Signer-Key auf zwei Arten ableiten: reines PRF oder ein Server-Secret plus Client-Identität.", "Die beiden Funktionen ergeben für denselben Nutzer unterschiedliche Keys, also landet dieselbe Wallet bei unterschiedlichen Adressen.", "Es gibt drei Wege zu migrieren: einen Protokoll-Adapter, eine Client-Bridge oder einen Hard Fork mit Adress-Rotation."]
sections: [{"basically": "Beide Keys kommen nur aus dem Passkey-PRF des Clients. Der Server hält überhaupt keinen State."}, {"basically": "Der Server-Key mischt ein statisches Server-Secret mit der Client-Identität. Jetzt hält der Server State."}, {"basically": "Derselbe Nutzer, zwei Ableitungsfunktionen, zwei verschiedene Keys. Die alten Adressen passen nicht zu den neuen."}, {"basically": "Auf dem Server verzweigen, Parameter vom Client einspeisen oder alle auf neue Adressen rotieren."}, {"basically": "Client-Entropy ist leichter wiederherzustellen. Hybrid-Entropy hält Zwang besser stand. Du kannst nicht beides haben."}]
---
![](../../../media/stateless-bitcoin-multisig-divergent-key-derivation-strategies/cover.jpg)

Hier geht es um nicht-verwahrende Bitcoin-Wallets, die MuSig2 und WebAuthn-Passkeys nutzen. In diesen Wallets ist „stateless“ die wichtigste Architekturregel. Das System muss das Schlüsselmaterial jedes Mal deterministisch neu aufbauen und darf sich auf keinen temporären Zustand verlassen. Aber für den Server-Co-Signer gibt es zwei verschiedene Antworten auf die Frage, woher der Schlüssel wirklich kommt, zwei verschiedene Quellen der Wahrheit.

Dieser Beitrag betrachtet den Wechsel von einem Client-Entropie-Modell zu einem Hybrid-Entropie-Modell und das Determinismus-Problem, das damit einhergeht. Er hat vier Teile: die beiden Architekturen, das Problem dazwischen und die Migrationswege.

## Architektur A, reines PRF

Die ältere Architektur ist reines PRF. Sie stellt die Portabilität an erste Stelle, und die Serverseite hat Zero-Knowledge-Eigenschaften. Die einzige Entropiequelle ist ein deterministischer Output einer pseudozufälligen Funktion, das PRF, vom WebAuthn-Authenticator. Der Client macht zuerst eine Assertion auf einem separaten „Co-Signer-Passkey“, der domain-getrennt vom User-Key ist. Dann gehen die rohen PRF-Bytes über einen sicheren Kanal an den Server. Und der Server arbeitet als reine Funktion und mappt den PRF-Input direkt auf einen privaten Skalar, `k_server = Reduce(PRF_bytes)`.

Der Input kommt also nur vom Client und der Server hält überhaupt keinen Zustand. Dass `k_user` und `k_server` mathematisch verschieden sind, hängt komplett von der RPID-Trennung ab, der Relying Party ID. Und es bedeutet auch, dass jeder, der den spezifischen Hardware-Authenticator hat, das komplette Schlüsselset ohne jede Hilfe vom Server neu aufbauen kann.

## Architektur B, verankert in einem Secret

Die neuere Architektur ist in einem Secret verankert. Sie verlagert die Root of Trust auf eine Composite-Derivation und fügt ein statisches Secret auf dem Server hinzu, sodass niemand den Schlüssel allein neu aufbauen kann. Hier ist der Co-Signer-Key eine Funktion eines sicheren Server-Master-Seeds und von Client-Identitäts-Metadaten, die sich nie ändern. Der Client beweist zuerst, dass er das Credential hat. Dann leitet der Server den privaten Skalar mit einer Key-Derivation-Function ab, einer KDF, die ein hoch-entropisches Server-Master-Secret `S_master` mit einem Set von Client-spezifischen Kontext-Parametern `C_client` und protokoll-spezifischen Konstanten `P_context` mischt.

`k_server = HKDF(Salt=S_master, IKM=C_client || P_context)`

Die Kontext-Parameter in `C_client` sind allgemein gehalten und umfassen Eigenschaften des Credentials, die sich nie ändern, zum Beispiel den Public-Key-Hash, die Credential-ID oder Attestation-Daten. Das bindet den abgeleiteten Schlüssel strikt an eine spezifische Hardware-Instanz.

Der Input ist also hybrid, ein Server-Secret plus die Client-Identität, und der Server muss das statische `S_master` halten. Das gibt Defense in Depth. Ein Angreifer, der den Authenticator des Clients hat, kann `k_server` nicht ableiten, ohne auch `S_master` aus dem Server zu holen. Und umgekehrt: Wenn der Server kompromittiert ist, bekommt der Angreifer keine nutzbaren Schlüssel ohne die interaktive Signatur des Clients.

## Das Problem, deterministische Divergenz

Der Wechsel zwischen diesen Architekturen hat ein blockierendes Problem, den Derivation-Mismatch. `Function_A(PRF)` und `Function_B(S_master, C_client)` nutzen Input-Räume, die nichts gemeinsam haben, also produzieren sie für dieselbe User-Identität komplett verschiedene private Skalare. Das ändert den aggregierten MuSig2-Public-Key `P_agg = P_user + P_server`. Für die Blockchain sieht es so aus, als hätte sich die Identität des Users, die Adresse, rotiert. Das Wallet, das du mit Architektur B bekommst, ist mathematisch unverwandt mit dem Wallet, das du mit Architektur A bekommst.

## Drei Migrationswege

Um den Mismatch zu fixen, musst du eine kanonische Quelle der Wahrheit für bestehende User und für neue wählen, und es gibt drei Wege, das zu tun.

Der erste ist ein Protokoll-Adapter für Legacy-Support. Der neue Server bekommt einen Conditional Branch. Wenn der Request-Payload dem Legacy-Schema entspricht und rohe PRF-Bytes mitbringt, überspringt der Server die `S_master`-KDF und führt die alte Reduction-Function aus. Bestehende User behalten ihre Adressen, aber diese User behalten auch das Sicherheitsmodell von Architektur A.

Der zweite ist eine Client-Bridge, die die Parameter injiziert. Die Client-Logik wird so aktualisiert, dass sie die `C_client`-Parameter extrahiert, die Architektur B braucht, auch während der Legacy-Flows. Dann kann der Server den neuen Derivation-Pfad im Hintergrund berechnen oder den Zustand des Users migrieren, und der User merkt keine Änderung. Das schließt die Entropie-Lücke.

Der dritte ist ein Hard Fork mit Adress-Rotation. Das System macht Architektur B zum einzigen Standard und User auf Architektur A werden als deprecated behandelt. Ein Migrations-Flow bittet sie, eine Sweep-Transaktion zu signieren, die die UTXOs von der `P_agg(Legacy)`-Adresse auf die `P_agg(Modern)`-Adresse bewegt.

## Der Trade-off

Der Wechsel von Client-Entropie zu Hybrid-Entropie ist ein Trade-off zwischen Wiederherstellbarkeit und Widerstand gegen Coercion auf der Client-Seite. Architektur A gibt dir selbstsouveräne Recovery, zumindest in der Theorie. Architektur B erzwingt ein stärkeres 2-of-2-Sicherheitsmodell, bei dem keine Seite genug Entropie hat, um das komplette Schlüsselset allein neu aufzubauen.
