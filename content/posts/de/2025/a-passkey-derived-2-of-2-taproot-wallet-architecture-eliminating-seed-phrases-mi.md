---
title: "Eine aus Passkeys abgeleitete 2-von-2-Taproot-Wallet-Architektur, die Seed-Phrasen abschafft, Supply-Chain-Risiken mindert und verifiziertes Signieren statt Blind-Signing erzwingt"
description: "Eine Bitcoin-Wallet ohne Seed-Phrase. Zwei Passkeys auf zwei Domains bilden einen 2-von-2-MuSig-Taproot-Schlüssel, sodass eine gehackte App allein deine Coins nicht klauen kann."
date: "2025-12-02T09:50:01Z"
updated: "2025-12-02"
lang: de
translated_from: "en/a-passkey-derived-2-of-2-taproot-wallet-architecture-eliminating-seed-phrases-mi"
source_sections: ["three-weak-spots-in-normal-wallets", "two-passkeys-on-two-domains", "how-a-spend-gets-signed", "what-this-protects-against", "what-you-end-up-with"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/a-passkey-derived-2-of-2-taproot-wallet-architecture-eliminating-seed-phrases-mi/cover.webp"
tldr: ["Zwei Passkeys auf zwei Domains bilden einen 2-von-2-MuSig-Taproot-Schlüssel, jede Ausgabe braucht also beide Signaturen.", "Es wird nie eine Seed-Phrase erzeugt, angezeigt, eingegeben oder gespeichert, und der Co-Signer speichert keine Schlüssel.", "Wer nur die App oder nur den Co-Signer knackt, kann trotzdem keine Coins stehlen."]
sections: [{"basically": "Seed-Phrase-Import, eine kompromittierte Dependency-Kette und Blind-Signing. Jedes davon kann eine Wallet lautlos leerräumen."}, {"basically": "Passkey A auf nuri.com, Passkey B auf confirm.nuri.com. Keine der beiden Domains kommt an den Passkey der anderen ran."}, {"basically": "Die App kann nur vorbereiten und halb signieren. Der Co-Signer dekodiert, zeigt die Ausgabe an und setzt die zweite Signatur drauf."}, {"basically": "Um Coins zu klauen, muss ein Angreifer die App und den Co-Signer gleichzeitig knacken."}, {"basically": "Self-Custody ohne Seed-Phrasen, Extensions oder Vertrauen in den Client-Stack, auf Web, iOS und Android."}]
---
Dieser Beitrag beschreibt eine Wallet-Architektur, die Seed-Phrasen komplett abschafft, keine langfristigen privaten Schlüssel speichert und eine der größten praktischen Bedrohungen für Software-Wallets heute umgeht: eine Kompromittierung des Dependency-Graphen der App oder ihrer Build-Pipeline.

Das Design nutzt zwei unabhängige Passkeys. Jeder ist an eine andere Domain gebunden, und jeder ruft die WebAuthn-PRF-Erweiterung auf, um deterministisches Schlüsselmaterial abzuleiten. Die beiden Schlüssel bilden einen aggregierten 2-of-2-MuSig-Taproot-Schlüssel, sodass jede Ausgabe beide Signaturen braucht. Ein Signier-Flow läuft in der App des Nutzers, der zweite auf einer komplett separaten, isolierten Co-Signing-Domain, die die Transaktion dekodiert und dem Nutzer anzeigt.

## Drei Schwachstellen in normalen Wallets

Es ist gegen drei spezifische Schwachstellen in normalen Wallet-Designs gebaut: Seed-Phrase-Exposure, Blind Signing und eine kompromittierte Dependency-Kette.

1.1 Seed-Phrase-Exposure beim Import. Wallets, die auf einer Seed-Phrase basieren, lassen dich eine BIP-39-Mnemonic oder einen privaten Schlüssel eintippen oder einfügen, wenn du das Wallet erstellst oder wiederherstellst. Dieser Moment ist extrem fragil. Die Mnemonic liegt im Klartext im Speicher, wo jedes bösartige Skript oder jede kompromittierte Dependency sie sehen kann. Wer die Zwischenablage benutzt, setzt das Geheimnis Beobachtern auf OS-Ebene und Apps im Hintergrund aus. Mobile und Web-Umgebungen erlauben DOM-Injection, Overlay-Angriffe, Accessibility-Scraping und Clipboard-Listener. Und selbst eine kurze Exposure reicht, um den Schlüssel zu stehlen, ohne dass es jemand merkt.

Wenn die App selbst oder eine ihrer Dependencies kompromittiert ist, kann eine Seed-Phrase in dem Moment entwendet werden, in dem sie den Speicher berührt. Wenn du diesen Schritt komplett entfernst, entfernst du eines der größten Sicherheitsrisiken in Software-Wallets.

1.2 Supply-Chain-Kompromittierung. Moderne Frontend-Stacks wie React, React Native und Expo ziehen ganz normal Hunderte transitive Dependencies rein. Ein einzelnes Dependency-Update oder eine injizierte Änderung in einem Build-Schritt kann sensibles Material übers Netzwerk schicken, Transaktionsparameter ändern, manipulieren, wie die UI Transaktionsdaten anzeigt, oder Schlüsselmaterial loggen und weiterleiten.

Wenn ein Wallet sich auf einen privaten Schlüssel verlässt, der in so einer Umgebung gespeichert oder abgeleitet wird, kann eine Supply-Chain-Kompromittierung die Gelder des Nutzers komplett und lautlos leerräumen.

1.3 Blind Signing und Falschdarstellung. In Wallets, die in einer einzigen Umgebung leben, ist die App, die die Transaktion baut, dieselbe App, die die Transaktionszusammenfassung anzeigt und sie signiert. Eine kompromittierte oder manipulierte UI kann Zieladressen ändern, falsche Beträge oder Fees anzeigen und gültige Signaturen über bösartige Transaktionen erzeugen, während sie harmlose Daten zeigt. Ohne eine unabhängige Prüfung kann der Nutzer nicht sehen, dass irgendetwas geändert wurde.

## Zwei Passkeys auf zwei Domains

Das System nutzt zwei Passkeys. Passkey A ist auf die RPID `nuri.com` registriert und wird in der Client-App auf Web, iOS und Android benutzt. Passkey B ist auf die RPID `confirm.nuri.com` registriert und wird nur auf einer separaten Co-Signing-Website benutzt.

Beide Passkeys nutzen die WebAuthn-PRF-Erweiterung, die deterministische PRF-Outputs mit hoher Entropie liefert. `PRF_A` wird benutzt, um den Signierschlüssel `k₁` abzuleiten, und `PRF_B` wird benutzt, um den Signierschlüssel `k₂` abzuleiten.

Diese Schlüssel werden zu einem MuSig-2-of-2-Taproot-Schlüssel kombiniert, und das ergibt einen aggregierten öffentlichen Schlüssel on-chain. Ausgaben aus dem Taproot-Output brauchen beide partiellen Signaturen. Die App kontrolliert einen Signierfaktor, und eine separate Web-Domain kontrolliert den zweiten. Keine der beiden Domains kann den Passkey der anderen erreichen, weil die Plattform die RPID-Grenze durchsetzt.

## Wie eine Ausgabe signiert wird

3.1 Vorbereiten und partiell signieren auf `nuri.com`. Dieser erste Flow hat sechs Schritte. Der Nutzer baut eine Transaktion in der App, und die App erstellt ein PSBT mit den Inputs, Outputs und Fees. Dann authentifiziert sich der Nutzer mit Passkey A, was `PRF_A` erzeugt, und eine deterministische KDF leitet den Schlüssel `k₁` ab. Die App erstellt eine partielle MuSig-Signatur mit `k₁`, und das partiell signierte PSBT geht an die unabhängige Co-Signing-Domain.

Die App kann die Transaktion nicht finalisieren. Ein kompromittierter Client kann nur ein PSBT vorbereiten, fertigstellen kann er es nicht.

3.2 Unabhängige Prüfung und Co-Signing auf `confirm.nuri.com`. Dieser zweite Flow hat sieben Schritte. Zuerst wird der Nutzer auf die Co-Signing-Seite weitergeleitet. Der Browser und das WebAuthn-RPID-Modell halten diese Domain von der App isoliert. Der Co-Signing-Server parst und dekodiert das PSBT eigenständig und zeigt eine klare, für Menschen lesbare Zusammenfassung der Ausgabe, mit den Inputs und Beträgen, den Zieladressen, den Fees und den Wechselgeld-Outputs. Dann authentifiziert sich der Nutzer mit Passkey B, was `PRF_B` erzeugt, und eine deterministische KDF leitet den Schlüssel `k₂` ab. Nachdem er das PSBT validiert hat, erstellt der Co-Signer die zweite partielle MuSig-Signatur. `PRF_B` und `k₂` werden sofort genullt, und nichts wird auf dem Server gespeichert. Am Ende geht das vollständig signierte PSBT zurück an die App oder wird ins Netzwerk gebroadcastet.

Dieser Schritt gibt dir also eine zweite Signatur und auch eine unabhängige Bestätigung dessen, was du tun willst, und genau das stoppt Blind-Signing-Angriffe.

## Wogegen das schützt

4.1 Seed-Phrase-Risiken sind weg. Es wird nie eine Seed-Phrase generiert, angezeigt, eingegeben oder gespeichert. Es gibt keine Clipboard-Exposure, kein Import-Formular, kein Geheimnis im JavaScript-Speicher und kein Angriffsfenster, wenn das Wallet erstellt wird.

4.2 Ein kompromittierter Client reicht nicht. Wenn die App oder ihre Dependencies kompromittiert sind, kann der bösartige Code `k₂` nicht ableiten. Er kann nicht so tun, als wäre er `confirm.nuri.com`, oder Passkey B aufrufen. Er kann die Signatur nicht ohne die partielle Signatur des Co-Signers finalisieren. Und der Co-Signer zeigt die echten Transaktionsdetails eigenständig an, sodass jede Manipulation sichtbar wird. Eine Kompromittierung nur des Clients reicht nicht, um Gelder zu stehlen.

4.3 Ein kompromittierter Co-Signer reicht auch nicht. Wenn der Co-Signing-Server oder sein Frontend kompromittiert ist, kann der Angreifer `k₁` nicht ableiten. Er kann keine Transaktion starten, weil er den ersten Partial nicht signieren kann. Und er kann den PRF-Output von Passkey A nicht bekommen, wegen der RPID-Bindung. Eine Kompromittierung nur des Co-Signers reicht ebenfalls nicht, um Gelder zu stehlen.

4.4 Beide Seiten müssen fallen. Um Gelder zu stehlen, brauchst du eine koordinierte Kompromittierung der App-Supply-Chain und der Supply-Chain der Co-Signing-Seite, oder einen Phishing-Angriff, der die Transaktionsdetails auf beiden Seiten auf dieselbe konsistente Weise ändert. Das macht einen erfolgreichen Angriff deutlich schwieriger.

4.5 Blind Signing wird abgemildert. Die Transaktion wird an zwei Stellen geprüft. Zuerst in der App, die sie zuerst anzeigt, und dann auf der Co-Signing-Domain, die sie eigenständig dekodiert und anzeigt. Der Nutzer bekommt also zwei authentifizierte Ansichten derselben Absicht, und das schließt die übliche Blind-Signing-Lücke, die Wallets in einer einzigen Umgebung haben.

4.6 Keine privaten Schlüssel auf dem Server. Der Co-Signer speichert kein Schlüsselmaterial. Er leitet k₂ nur während der WebAuthn-Operation ab und nullt alle sensiblen Daten direkt danach. Es gibt keine langfristige Schlüsseldatenbank, in die jemand einbrechen könnte.

4.7 Domain-Isolation durch die WebAuthn-RPID. Die RPID-Bindung stellt vier Dinge sicher. Die App kann Passkey B nicht benutzen, der Co-Signer kann Passkey A nicht benutzen, Phishing-Domains können bestehende Passkeys nicht wiederverwenden, und mobile oder native Apps können das OS nicht dazu bringen, einen Passkey für eine andere Domain zu entsperren. Hardware und OS setzen diese Grenze durch.

## Was du am Ende hast

Zusammengenommen bekommst du eine Wallet ohne Seed Phrases, also keine Geheimnisse, die der Nutzer eintippt, keine Import-Felder und keine Zwischenablage-Probleme. Die Keys sind hardware-backed, weil die Secrets aus der Secure Enclave oder von FIDO-Authentikatoren kommen. Es ist 2-of-2 MuSig, also werden beide Keys gebraucht und niemand kann allein ausgeben. Die Isolation kommt von zwei separaten RPIDs, die die Plattform durchsetzt. Der Co-Signer ist stateless, ohne langfristige Keys und ohne irgendwas, das man auf dem Server klauen könnte. Der unabhängige Check verhindert Blind Signing und fängt ein PSBT ab, an dem jemand rumgepfuscht hat. Eine Kompromittierung einer einzelnen Umgebung reicht nicht aus. Und es läuft auf Web, iOS und Android ohne Extensions.

Die Architektur behandelt also die fünf Hauptangriffsvektoren bei Software-Wallets: Seed-Phrase-Exposure, Supply-Chain-Kompromittierung, UI-Manipulation für Blind Signing, die Arten, wie ein einzelner Key versagen kann, und Key-Diebstahl auf der Server-Seite. Sie verteilt die Signing-Autorität auf zwei unabhängige Domains, jede mit eigenem Passkey und eigenem PRF-Output, und sie braucht beide Signaturen für jede Ausgabe. Das erhöht die Sicherheitsmarge enorm, und es läuft trotzdem in normalen Browsern und mobilen Apps.

Es ist ein praktischer Weg zu sicherer Bitcoin-Self-Custody über Plattformen hinweg, ohne Seed Phrases, ohne Extensions und ohne dem Client-Software-Stack vertrauen zu müssen.

Wenn nötig, kann das zu einer formalen Spezifikation, einer Sicherheitsanalyse oder einem Guide für Entwickler werden, die es implementieren wollen.

![IMG_6836](../../../media/a-passkey-derived-2-of-2-taproot-wallet-architecture-eliminating-seed-phrases-mi/IMG_6836.jpeg)
