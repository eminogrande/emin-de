---
title: "Nuri Wallet: Eine zustandslose MuSig2-Bitcoin-Wallet mit schwächer werdender Multisig-Wiederherstellung"
description: "Wie wir Nuri Wallet gebaut haben. Passkey-Keys, die nie gespeichert werden, MuSig2, eine NFC-Karte, ein 2FA-Server und eine Multisig, die mit der Zeit schwächer wird, damit du immer wieder an…"
date: "2025-12-08T21:00:01Z"
updated: "2025-12-08"
lang: de
translated_from: "en/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-multisig-recovery"
source_sections: ["why-we-built-it-this-way", "the-three-keys", "musig2-and-the-two-setups", "decaying-multisig-with-csv-timelocks", "security-and-recovery", "how-it-compares-to-other-wallets", "how-to-build-it", "where-this-leaves-self-custody"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-multisig-recovery/cover.jpg"
tldr: ["Nuri Wallet kombiniert MuSig2-Schnorr-Signaturen, Passkey-Keys über WebAuthn PRF, eine NFC-Hardware-Karte und einen 2FA-Server als Mitunterzeichner.", "Keys werden beim Signieren abgeleitet und nie gespeichert. Es gibt also nichts auf der Festplatte, das man klauen könnte.", "Eine schwächer werdende Multisig mit CSV-Timelocks öffnet nach etwa 70 Tagen Wiederherstellungswege und nach etwa einem Jahr einen Single-Key-Ausgang.", "Das ist Work in Progress, ein Design, das von Opus 4.5 geschrieben wurde."]
sections: [{"basically": "Single-Sig verliert man leicht, bei Multisig sperrt man sich leicht selbst aus. Wir versuchen, aus diesem Dilemma rauszukommen."}, {"basically": "Passkey-Key, NFC-Karten-Key, Server-Key. Keiner davon liegt irgendwo gespeichert rum und wartet darauf, geklaut zu werden."}, {"basically": "Mehrere Unterzeichner, eine Schnorr-Signatur. Auf der Chain sieht das aus wie eine ganz normale Single-Sig-Wallet."}, {"basically": "Die Sicherheit wird langsam und absichtlich schwächer, damit du deine Kohle immer zurückbekommst."}, {"basically": "Verlierst du einen Teil, reicht 2-von-3 immer noch. Verlierst du bei 2-von-2 Handy und Server, ist die Kohle weg."}, {"basically": "Am nächsten kommt Blockstream Green, aber Nuri nutzt MuSig2, sieht aus wie Single-Sig und braucht keine Seed-Phrase."}, {"basically": "PRF gibt es noch nicht in jedem Browser, und Nonces dürfen nie wiederverwendet werden. Das sind die harten Nüsse."}, {"basically": "Volle Kontrolle über deine Bitcoin, mit Multisig-Schutz und dem Komfort eines Passkeys."}]
---
![](../../../media/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-multisig-recovery/cover.jpg)

Das hier ist noch in Arbeit. Das Dokument wurde von Opus 4.5 geschrieben und beschreibt das Design von Nuri Wallet, so wie wir gerade darüber nachdenken.

Nuri Wallet ist ein Bitcoin-Wallet, das vier Dinge in einem einzigen Sicherheits-Setup zusammenbringt: MuSig2-Schnorr-Signaturen, Keys, die on the fly mit der WebAuthn-PRF-Extension abgeleitet und nie gespeichert werden, ein NFC-Hardware-Wallet und einen Server, der hinter einer Zwei-Faktor-Authentifizierung mitsigniert. Uns geht es um Sicherheit und darum, dass du dein Geld zurückbekommst – um beides. Deshalb gibt es ein decaying Multisig, damit du deine Funds immer wiederherstellen kannst, selbst wenn einer oder mehrere der Signatur-Teile weg sind.

Das Dokument hat zehn Teile. Teil eins ist, warum wir es so gebaut haben, zwei ist, wie es zusammenpasst, drei sind die drei Keys, vier ist MuSig2, fünf sind die 2-of-2- und 2-of-3-Setups, sechs ist das decaying Multisig, sieben ist Sicherheit, acht ist Recovery, neun ist der Vergleich mit anderen Wallets und zehn sind ein paar Notizen, wie man es baut.

## Warum wir es so gebaut haben

Bitcoin-Wallets hatten immer diesen Kampf zwischen Sicherheit und einfacher Bedienung. Ein Single-Signature-Wallet ist einfach, aber wenn jemand den Key klaut, ist das Geld weg. Ein Multisig-Wallet ist sicherer, aber wenn du Keys verlierst, kannst du dich selbst aus deinen eigenen Funds aussperren. Wir versuchen, aus diesem Kampf rauszukommen, mit einem Mix aus mehreren Dingen: Keys werden abgeleitet und nicht gespeichert, es liegt also nichts auf einer Festplatte, das jemand klauen könnte. Mehrere Parteien signieren zusammen mit MuSig2, und das Ergebnis ist eine einzige Schnorr-Signatur, was besser für die Privacy ist und die Transaktion auch billiger macht. Timelocks laufen Schritt für Schritt ab, du bekommst also mit der Zeit mehr Recovery-Optionen und bist nie für immer ausgesperrt. Und es gibt ein optionales Hardware-Wallet für Cold Storage, wenn du maximale Sicherheit willst.

Es gibt drei Keys: den Passkey-Key, den Hardware-Key auf einer NFC-Satochip-Card und den Server-Key. Jeder liefert eine MuSig2-Partial-Signature, und die Partial Signatures werden zu einer einzigen aggregiert. Unter allem liegt der decaying Timelock.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NURI WALLET ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │   PASSKEY KEY    │  │  HARDWARE KEY    │  │   SERVER KEY     │          │
│  │   (Stateless)    │  │  (NFC Satochip)  │  │   (Stateless)    │          │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤          │
│  │ WebAuthn PRF     │  │ Secure Element   │  │ HSM/Secure       │          │
│  │ Extension        │  │ on NFC Card      │  │ Element          │          │
│  │                  │  │                  │  │                  │          │
│  │ key = PRF(salt)  │  │ Private key      │  │ key = f(user_id, │          │
│  │                  │  │ never leaves     │  │        entropy)  │          │
│  │ No key storage   │  │ the chip         │  │                  │          │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                     │                     │
│           │    MuSig2 Partial   │    MuSig2 Partial   │                     │
│           │    Signature        │    Signature        │                     │
│           │                     │                     │                     │
│           └──────────┬──────────┴──────────┬──────────┘                     │
│                      │                     │                                │
│                      ▼                     ▼                                │
│           ┌─────────────────────────────────────────┐                       │
│           │         MuSig2 SIGNATURE AGGREGATION    │                       │
│           │                                         │                       │
│           │  2-of-2: Passkey + Server               │                       │
│           │  2-of-3: Any 2 of {Passkey, HW, Server} │                       │
│           └─────────────────────────────────────────┘                       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    DECAYING TIMELOCK STRUCTURE                       │   │
│  │                                                                      │   │
│  │   T=0                    T=10,000 blocks              T=52,560       │   │
│  │    │                          │                       blocks         │   │
│  │    ▼                          ▼                          ▼           │   │
│  │  ┌────────────────────┬───────────────────────┬─────────────────┐   │   │
│  │  │  NORMAL OPERATION  │  RECOVERY MODE        │  EMERGENCY EXIT │   │   │
│  │  │  2-of-2 or 2-of-3  │  Passkey + HW         │  Passkey only   │   │
│  │  │  (Server active)   │  (Server unavailable) │  (CSV expired)  │   │
│  │  └────────────────────┴───────────────────────┴─────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Die drei Keys

Der Passkey-Key ist das Herzstück davon, wie sich Nuri in der Benutzung anfühlt. Er nutzt die WebAuthn-PRF-Extension (Pseudo-Random Function), um die Keys abzuleiten – wir müssen sie also nirgendwo speichern.

```
┌─────────────────────────────────────────────────────────────────┐
│                    PASSKEY KEY DERIVATION                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   User authenticates with passkey (biometric/PIN)               │
│                          │                                      │
│                          ▼                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │         WebAuthn Authenticator          │                  │
│   │    (Platform or Roaming Authenticator)  │                  │
│   └─────────────────────────────────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │           PRF Extension                 │                  │
│   │                                         │                  │
│   │   secret = HMAC-SHA256(device_secret,   │                  │
│   │                        salt || rpId)    │                  │
│   └─────────────────────────────────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │      Bitcoin Key Derivation             │                  │
│   │                                         │                  │
│   │   private_key = HKDF(secret,            │                  │
│   │                      "nuri-bitcoin",    │                  │
│   │                      derivation_path)   │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Was du davon hast, sind vier Dinge: Es ist stateless – keine Private Keys werden auf dem Gerät gespeichert, sie werden abgeleitet, wenn du sie brauchst. Es ist phishing-resistent, weil WebAuthn die Credential an die Origin bindet – eine Fake-Seite bekommt also einfach nicht denselben Key. Es ist hardware-backed, das PRF-Secret lebt im Secure Element des Geräts. Und es ist durch Biometrie geschützt – das Gerät prüft mit deinem Fingerabdruck oder deinem Gesicht, dass du da bist.

Die Mathematik ist kurz. Du hast $s$, das Device Master Secret, das im Secure Element sitzt, dann $\text{salt}$, ein Salt nur für die App, und $\text{rpId}$, den Relying Party Identifier. Der PRF-Output ist

$$\text{prf\_output} = \text{HMAC-SHA256}(s, \text{salt} \| \text{rpId})$$

und daraus leiten wir den Bitcoin Private Key so ab:

$$k_{\text{passkey}} = \text{HKDF-SHA256}(\text{prf\_output},
\text{"nuri-btc-v1"}, \text{path})$$

Der Hardware-Teil ist eine Karte mit einem Secure Element, mit der du über NFC redest, ähnlich wie Satochip oder SatSigner. Sie macht MuSig2-Partial-Signing und der Private Key verlässt die Karte nie.

```
┌─────────────────────────────────────────────────────────────────┐
│                  NFC HARDWARE WALLET                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────┐                                      │
│   │   Secure Element    │                                      │
│   │   (JavaCard/etc)    │                                      │
│   ├─────────────────────┤                                      │
│   │ • Private key       │  ◄── Never leaves the chip           │
│   │   generation        │                                      │
│   │ • MuSig2 nonce      │                                      │
│   │   generation        │                                      │
│   │ • Partial signature │                                      │
│   │   creation          │                                      │
│   │ • Public key export │                                      │
│   └─────────────────────┘                                      │
│            ▲                                                    │
│            │ NFC                                                │
│            ▼                                                    │
│   ┌─────────────────────┐                                      │
│   │   Mobile Device     │                                      │
│   │   (Nuri App)        │                                      │
│   └─────────────────────┘                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Das Signieren mit der Karte läuft in vier Runden. Zuerst erzeugt die Karte eine zufällige Nonce $R_{\text{hw}}$ und gibt ein Commitment dafür ab. Dann tauschen alle Parteien ihre Nonce-Commitments aus und geben danach die Nonces preis. Dann berechnet die Karte ihre Partial Signature, ohne je den Private Key zu zeigen. Und am Ende werden die Partial Signatures zur finalen Schnorr-Signatur kombiniert.

Der dritte Key liegt auf dem Server. Der Server ist ein Co-Signer, der erst nach 2FA signiert. Er fügt Entropie hinzu und eine weitere Sicherheitsebene, aber er hat nie die Verwahrung deines Geldes.

```
┌─────────────────────────────────────────────────────────────────┐
│                    STATELESS SERVER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────┐                  │
│   │         Hardware Security Module        │                  │
│   │              (HSM)                       │                  │
│   ├─────────────────────────────────────────┤                  │
│   │ • Master seed (never exported)          │                  │
│   │ • Deterministic key derivation          │                  │
│   │ • Rate limiting                         │                  │
│   │ • Audit logging                         │                  │
│   └─────────────────────────────────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │      Key Derivation Function            │                  │
│   │                                         │                  │
│   │   k_server = KDF(master_seed,           │                  │
│   │                  user_id,               │                  │
│   │                  wallet_id,             │                  │
│   │                  key_index)             │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Properties:                                                   │
│   • No private keys stored in database                         │
│   • Keys derived on-demand from HSM                            │
│   • 2FA required before signing                                │
│   • Server breach doesn't compromise keys                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Der Server leitet für jeden User einen Key ab, immer auf dieselbe Weise – er muss ihn also nicht speichern.

$$k_{\text{server}} = \text{HKDF}(k_{\text{master}}, \text{user\_id}
\| \text{wallet\_id} \| \text{index})$$

Hier lebt $k_{\text{master}}$ im HSM und wird nie exportiert.

## MuSig2 und die zwei Setups

MuSig2 ist ein Multi-Signatur-Schema. Mehrere Leute unterschreiben, aber am Ende steht eine aggregierte Schnorr-Signatur, die exakt wie eine ganz normale aussieht. Du bekommst also Privacy, weil niemand, der sich die Chain anschaut, erkennen kann, dass es eine Multisig ist, und du bekommst Effizienz, weil die Transaktion kleiner ist und die Fees niedriger.

```
┌─────────────────────────────────────────────────────────────────┐
│                     MuSig2 PROTOCOL                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   SETUP PHASE (one-time)                                        │
│   ──────────────────────                                        │
│                                                                 │
│   Each party i has:                                             │
│   • Private key: xᵢ                                             │
│   • Public key:  Pᵢ = xᵢ · G                                    │
│                                                                 │
│   Aggregated public key:                                        │
│   P = Σᵢ (aᵢ · Pᵢ)                                              │
│   where aᵢ = H(L, Pᵢ) and L = {P₁, P₂, ...}                     │
│                                                                 │
│   SIGNING PHASE (per transaction)                               │
│   ───────────────────────────────                               │
│                                                                 │
│   Round 1: Nonce Generation                                     │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐                        │
│   │ Party 1 │  │ Party 2 │  │ Party 3 │                        │
│   │ r₁ → R₁ │  │ r₂ → R₂ │  │ r₃ → R₃ │                        │
│   └────┬────┘  └────┬────┘  └────┬────┘                        │
│        │            │            │                              │
│        └────────────┼────────────┘                              │
│                     ▼                                           │
│              Exchange Rᵢ values                                 │
│                     │                                           │
│                     ▼                                           │
│   Round 2: Partial Signatures                                   │
│                                                                 │
│   R = Σᵢ Rᵢ  (aggregated nonce)                                 │
│   c = H(R, P, m)  (challenge)                                   │
│                                                                 │
│   Each party computes:                                          │
│   sᵢ = rᵢ + c · aᵢ · xᵢ                                         │
│                                                                 │
│   Final signature:                                              │
│   s = Σᵢ sᵢ                                                     │
│   σ = (R, s)                                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Warum wir das für Nuri genommen haben, lässt sich im Grunde auf vier Gründe runterbrechen. Privacy: Die aggregierte Signatur sieht on-chain aus wie Single-Sig. Effizienz: Es ist eine Signatur, egal wie viele Leute unterschreiben. Es ist Taproot-nativ, also für das Schnorr- und Taproot-Upgrade von Bitcoin gebaut. Und es braucht nur 2 Kommunikationsrunden, was das ursprüngliche Design als non-interaktiv bezeichnet.

Das Basis-Setup braucht sowohl den Passkey als auch den Server, um eine Transaktion zu unterschreiben.

```
┌─────────────────────────────────────────────────────────────────┐
│                    2-of-2 CONFIGURATION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   NORMAL OPERATION                                              │
│   ────────────────                                              │
│                                                                 │
│   ┌───────────┐         ┌───────────┐                          │
│   │  Passkey  │────────▶│  Server   │                          │
│   │   Key     │  2FA    │   Key     │                          │
│   └─────┬─────┘ verify  └─────┬─────┘                          │
│         │                     │                                 │
│         │    MuSig2          │                                 │
│         └──────────┬─────────┘                                 │
│                    ▼                                            │
│              ┌──────────┐                                       │
│              │ Combined │                                       │
│              │Signature │                                       │
│              └──────────┘                                       │
│                                                                 │
│   RECOVERY (Server Unavailable)                                 │
│   ─────────────────────────────                                 │
│                                                                 │
│   After CSV timelock expires (~1 year):                         │
│                                                                 │
│   ┌───────────┐                                                │
│   │  Passkey  │──────────────▶ Spend with single signature     │
│   │   Key     │                (CSV exit path)                 │
│   └───────────┘                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

On-chain ist das ein Taproot-Output.

```
Output Script (P2TR):
┌─────────────────────────────────────────────────────────────────┐
│  OP_1 <aggregated_pubkey>                                       │
└─────────────────────────────────────────────────────────────────┘

Taproot Tree:
┌─────────────────────────────────────────────────────────────────┐
│                         Internal Key                            │
│                    (MuSig2: Passkey + Server)                   │
│                              │                                  │
│              ┌───────────────┴───────────────┐                  │
│              │                               │                  │
│        ┌─────▼─────┐                  ┌──────▼──────┐           │
│        │  Leaf 1   │                  │   Leaf 2    │           │
│        │  (empty)  │                  │  CSV Exit   │           │
│        │           │                  │ <pk_passkey>│           │
│        │           │                  │ CHECKSIG    │           │
│        │           │                  │ <52560>     │           │
│        │           │                  │ CSV         │           │
│        └───────────┘                  └─────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Das größere Setup bringt noch eine Hardware Wallet dazu, für mehr Sicherheit und mehr Wege zur Recovery.

```
┌─────────────────────────────────────────────────────────────────┐
│                    2-of-3 CONFIGURATION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   THREE SIGNING KEYS                                            │
│   ──────────────────                                            │
│                                                                 │
│   ┌───────────┐    ┌───────────┐    ┌───────────┐              │
│   │  Passkey  │    │ Hardware  │    │  Server   │              │
│   │   (Hot)   │    │  Wallet   │    │  (2FA)    │              │
│   │           │    │  (Cold)   │    │           │              │
│   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘              │
│         │                │                │                     │
│         └────────┬───────┴───────┬────────┘                     │
│                  │               │                              │
│                  ▼               ▼                              │
│         ┌──────────────────────────────┐                        │
│         │   ANY 2-of-3 can sign        │                        │
│         │                              │                        │
│         │   • Passkey + Server (daily) │                        │
│         │   • Passkey + HW (recovery)  │                        │
│         │   • Server + HW (if needed)  │                        │
│         └──────────────────────────────┘                        │
│                                                                 │
│   SIGNING SCENARIOS                                             │
│   ─────────────────                                             │
│                                                                 │
│   Scenario 1: Normal (Passkey + Server)                         │
│   ┌─────────┐  2FA  ┌─────────┐                                │
│   │ Passkey ├──────▶│ Server  │────▶ ✓ Transaction             │
│   └─────────┘       └─────────┘                                │
│                                                                 │
│   Scenario 2: Server Down (Passkey + Hardware)                  │
│   ┌─────────┐  NFC  ┌─────────┐                                │
│   │ Passkey ├──────▶│   HW    │────▶ ✓ Transaction             │
│   └─────────┘       └─────────┘      (No waiting!)             │
│                                                                 │
│   Scenario 3: Passkey Lost (Hardware + Server)                  │
│   ┌─────────┐       ┌─────────┐                                │
│   │   HW    ├──────▶│ Server  │────▶ ✓ Transaction             │
│   └─────────┘       └─────────┘                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Und so sieht der Taproot Tree für 2-of-3 aus.

```
Taproot Tree (2-of-3):
┌─────────────────────────────────────────────────────────────────┐
│                         Internal Key                            │
│              (MuSig2: Passkey + Server - default path)          │
│                              │                                  │
│      ┌───────────────────────┼───────────────────────┐          │
│      │                       │                       │          │
│ ┌────▼────┐           ┌──────▼──────┐         ┌──────▼──────┐   │
│ │ Leaf 1  │           │   Leaf 2    │         │   Leaf 3    │   │
│ │Passkey+ │           │ Passkey+    │         │  CSV Exit   │   │
│ │  HW     │           │  Server     │         │<pk_passkey> │   │
│ │(MuSig2) │           │ (redundant) │         │ CHECKSIG    │   │
│ │         │           │             │         │ <52560> CSV │   │
│ └─────────┘           └─────────────┘         └─────────────┘   │
│                                                                 │
│ Note: Server+HW combination handled via Leaf 2 alternative      │
│       or additional leaf as needed                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Decaying Multisig mit CSV-Timelocks

Die Idee hinter einer Decaying Multisig ist, dass du deine Kohle immer zurückbekommst, und die Sicherheit geht langsam und absichtlich über die Zeit runter, nicht auf einen Schlag.

CSV (CheckSequenceVerify) ist ein relativer Timelock. Er zählt Blöcke, seit die UTXO erstellt wurde.

$$\text{spendable\_height} = \text{confirmation\_height} + \text{csv\_blocks}$$

In der Nuri Wallet braucht normales Ausgeben die 2-of-2- oder 2-of-3-MuSig2-Signatur. Nach ~70 Tagen, das sind 10.000 Blöcke, öffnen sich die anderen Recovery-Pfade. Und nach ~1 Jahr, 52.560 Blöcke, gibt es einen Single-Key-Notausgang.

```
┌─────────────────────────────────────────────────────────────────┐
│                    DECAYING SECURITY MODEL                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Security                                                       │
│  Level                                                          │
│    ▲                                                            │
│    │                                                            │
│  3 ┤ ████████████████████┐                                      │
│    │                     │                                      │
│  2 ┤                     └───────────────────┐   2-of-3 config  │
│    │                                         │   (HW available) │
│    │                                         │                  │
│  1 ┤                                         └─────────────     │
│    │                                                            │
│    └────────────────────────────────────────────────────▶       │
│         T=0            T=10,000         T=52,560      Time      │
│         │              blocks           blocks        (blocks)  │
│         │              (~70 days)       (~1 year)               │
│         │                 │                │                    │
│         ▼                 ▼                ▼                    │
│   ┌──────────┐     ┌──────────────┐  ┌──────────────┐          │
│   │ Maximum  │     │ HW Recovery  │  │  Emergency   │          │
│   │ Security │     │  Available   │  │    Exit      │          │
│   │  2FA +   │     │ No server    │  │  Passkey     │          │
│   │ Passkey  │     │   needed     │  │    only      │          │
│   └──────────┘     └──────────────┘  └──────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Das CSV-Exit-Script sieht, in einer vereinfachten Version, so aus.

```
OP_IF
    // Normal spending path: requires aggregated MuSig2 signature
    <aggregated_pubkey>
    OP_CHECKSIG
OP_ELSE
    // Emergency exit: after timelock, passkey alone can spend
    <52560>           // ~1 year in blocks
    OP_CHECKSEQUENCEVERIFY
    OP_DROP
    <passkey_pubkey>
    OP_CHECKSIG
OP_ENDIF
```

Um die Sicherheit auf dem Maximum zu halten, solltest du deine UTXOs ab und zu auffrischen. Du schickst die Coins einfach an dich selbst und die Uhr startet von vorne.

```
┌─────────────────────────────────────────────────────────────────┐
│                    UTXO REFRESH CYCLE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Initial Deposit          After 11 months         Re-deposit  │
│        │                        │                       │       │
│        ▼                        ▼                       ▼       │
│   ┌─────────┐              ┌─────────┐             ┌─────────┐ │
│   │  UTXO   │   Time       │  UTXO   │   Self-    │  UTXO   │ │
│   │  CSV=0  │  ─────▶      │CSV=47520│   send     │  CSV=0  │ │
│   │         │              │ (aging) │  ─────▶    │ (fresh) │ │
│   └─────────┘              └─────────┘             └─────────┘ │
│                                                                 │
│   Security: MAX            Security: Degrading    Security: MAX│
│                                                                 │
│   Wallet prompts user when UTXOs approach timelock expiry      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Sicherheit und Wiederherstellung

Die Bedrohungen, die wir uns angesehen haben, sind sieben. Wenn jemand dein Gerät klaut, ist der Passkey durch Biometrie geschützt und der Schlüssel wird nur abgeleitet, wenn du signierst. Wenn der Server kompromittiert wird, liegen die Server-Schlüssel im HSM, die Ableitung ist stateless, und der Server allein kann nichts ausgeben. Phishing funktioniert nicht, weil WebAuthn die Credential an die Origin bindet. Ein Man-in-the-Middle kann wegen dem MuSig2-Nonce-Protokoll keine Signatur fälschen. Wenn der Server verschwindet, kannst du über das CSV-Timelock wiederherstellen, und mit einer Hardware-Wallet hast du sofort einen Ausweg. Wenn du die Hardware-Wallet verlierst, kannst du mit 2-of-3 über Passkey und Server wiederherstellen. Und wenn du den Passkey verlierst, kannst du mit 2-of-3 über Hardware-Wallet und Server wiederherstellen.

```
┌─────────────────────────────────────────────────────────────────┐
│                SECURITY COMPARISON                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    2-of-2           2-of-3                      │
│                    ──────           ──────                      │
│                                                                 │
│   Keys Required      2                2                         │
│   to Spend                                                      │
│                                                                 │
│   Single Point       Passkey         None                       │
│   of Failure         (for CSV exit)  (any 2 keys work)          │
│                                                                 │
│   Server Down        Wait ~1 year    Use Passkey + HW           │
│   Recovery                           (immediate)                │
│                                                                 │
│   Passkey Lost       Funds locked    Use Server + HW            │
│   Recovery           (CSV doesn't    (immediate)                │
│                      help here!)                                │
│                                                                 │
│   Best For           Simplicity,     Maximum security,          │
│                      casual users    significant holdings       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Drei Angriffsfälle machen es konkreter. Erstens, ein Angreifer übernimmt den Server.

```
Attacker obtains: Server signing capability
Attacker needs:   Passkey authentication OR Hardware wallet

Result: ❌ Cannot steal funds (missing second key)
        ⚠️  Can potentially DoS by refusing to sign
        ✅ User recovers via CSV exit or HW wallet
```

Zweitens, jemand klaut dein Handy.

```
Attacker obtains: Physical device
Attacker needs:   Biometric/PIN to unlock passkey
                  PLUS 2FA to authorize server signing

Result: ❌ Cannot steal funds (passkey protected by biometrics)
        ✅ Keys never stored on device (stateless)
```

Drittens, jemand bekommt sowohl den Passkey als auch den Server.

```
Attacker obtains: Passkey credential + Server access
Result: ⚠️  Can steal funds in 2-of-2 config
        ✅ 2-of-3 config: HW wallet still required
```

Hier ist, was in jedem Fall passiert, bei 2-of-2 und bei 2-of-3. Wenn du dein Handy und damit den Passkey verlierst, wartest du bei 2-of-2 auf das CSV, ~1 Jahr, und dann kannst du immer noch nicht ausgeben, weil der Exit-Pfad den Passkey braucht. Bei 2-of-3 benutzt du einfach Server und Hardware-Wallet. Wenn der Server offline geht, wartest du bei 2-of-2 auf das CSV, ~1 Jahr, und dann funktioniert es. Bei 2-of-3 benutzt du sofort Passkey und Hardware-Wallet. Wenn du die Hardware-Wallet verlierst, ist das bei 2-of-2 egal, weil es keine gibt, und bei 2-of-3 benutzt du Passkey und Server. Wenn du dein Handy verlierst und der Server gleichzeitig down ist, sind die Funds bei 2-of-2 verloren. Bei 2-of-3 könnte die Hardware-Wallet nach dem CSV vielleicht ausgeben, aber das ist noch eine Design-Entscheidung, die wir treffen müssen. Und wenn du die Hardware-Wallet verlierst und der Server down ist, wartest du in beiden Setups auf das CSV und dann bist du fein raus.

Das ist der Ablauf, wenn der Server nicht da ist und du 2-of-3 hast.

```
┌─────────────────────────────────────────────────────────────────┐
│          RECOVERY: SERVER UNAVAILABLE (2-of-3)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Step 1: Detect server unavailability                          │
│   ┌─────────────────────────────────────────┐                  │
│   │ App: "Server unreachable. Use hardware  │                  │
│   │       wallet for recovery signing?"     │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Step 2: Authenticate with passkey                             │
│   ┌─────────────────────────────────────────┐                  │
│   │ User: [Biometric authentication]        │                  │
│   │ App:  Derives passkey private key       │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Step 3: Tap NFC hardware wallet                               │
│   ┌─────────────────────────────────────────┐                  │
│   │ App: "Tap your Nuri Card to sign"       │                  │
│   │                                         │                  │
│   │        ┌───────────┐                    │                  │
│   │        │  📱 ←→ 💳 │  NFC               │                  │
│   │        └───────────┘                    │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Step 4: MuSig2 signing between Passkey + HW                   │
│   ┌─────────────────────────────────────────┐                  │
│   │ Passkey partial sig + HW partial sig    │                  │
│   │              ↓                          │                  │
│   │    Aggregated Schnorr signature         │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Step 5: Broadcast transaction                                 │
│   ┌─────────────────────────────────────────┐                  │
│   │ Transaction broadcast to Bitcoin network│                  │
│   │ ✅ Funds recovered without server       │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Und das ist der CSV-Notausgang bei 2-of-2.

```
┌─────────────────────────────────────────────────────────────────┐
│              RECOVERY: CSV EMERGENCY EXIT                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Prerequisites:                                                │
│   • Server has been unavailable for extended period             │
│   • UTXO age > 52,560 blocks (~1 year)                          │
│   • User still has passkey access                               │
│                                                                 │
│   Step 1: Check UTXO eligibility                                │
│   ┌─────────────────────────────────────────┐                  │
│   │ App scans UTXOs for CSV-eligible funds  │                  │
│   │                                         │                  │
│   │ UTXO 1: 0.5 BTC  - Age: 55,000 blocks ✅│                  │
│   │ UTXO 2: 0.3 BTC  - Age: 40,000 blocks ❌│                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Step 2: Construct CSV spending transaction                    │
│   ┌─────────────────────────────────────────┐                  │
│   │ Input: UTXO with nSequence = 52,560     │                  │
│   │ Witness: <passkey_signature> <csv_script>│                  │
│   │ Output: New address controlled by user  │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Step 3: Sign with passkey only                                │
│   ┌─────────────────────────────────────────┐                  │
│   │ No server needed - single signature     │                  │
│   │ sufficient for CSV exit path            │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Step 4: Broadcast and confirm                                 │
│   ┌─────────────────────────────────────────┐                  │
│   │ Transaction valid because:              │                  │
│   │ • CSV timelock satisfied                │                  │
│   │ • Valid passkey signature provided      │                  │
│   │ ✅ Funds recovered!                     │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Wie es im Vergleich zu anderen Wallets aussieht

Von den Wallets, die es gibt, ist Blockstream Green am nächsten dran. Green benutzt ECDSA-Multisig, wir benutzen MuSig2-Schnorr. On-Chain ist Green ein sichtbares Multisig, Nuri sieht aus wie Single-Sig. Green hält den Client-Schlüssel verschlüsselt auf dem Gerät, unserer ist stateless und kommt aus dem PRF. Green speichert den Server-Schlüssel in einem traditionellen HSM, unser Server leitet ihn stateless im HSM ab. Recovery bei 2-of-2 ist bei beiden gleich, ein CSV-Timelock. Recovery bei 2-of-3 ist bei Green eine Backup-Key-Phrase und bei uns eine Hardware-Wallet. Und Taproot-Support ist bei Green begrenzt, bei Nuri ist er nativ.

Dann die traditionellen Hardware-Wallets wie Ledger und Trezor. Die sind ein dediziertes Gerät, Nuri ist ein Passkey plus eine NFC-Karte. Für tägliche Transaktionen brauchst du bei denen das Gerät, bei uns brauchst du nur den Passkey und der Server macht die 2FA. High-Value-Transaktionen sind auf einem Ledger oder Trezor genauso wie tägliche, bei Nuri kannst du dafür die Hardware-Karte verlangen. Wenn du einen Ledger oder Trezor verlierst, stellst du mit der Seed-Phrase wieder her, bei Nuri gibt es mehrere Wege, CSV und 2-of-3. Und das Diebstahlrisiko dort ist, dass die Seed-Phrase exposed wird, bei Nuri brauchst du gar keine Seed-Phrase.

Und Custodial-Exchanges. Da hält die Exchange die Schlüssel, bei Nuri hält der User alle Schlüssel. Counterparty-Risiko ist dort hoch und bei uns null. Auf einer Exchange kann dein Geld beschlagnahmt werden, Nuri ist self-sovereign. Recovery auf einer Exchange ist Account-Recovery, bei uns ist es CSV und Multisig. Und eine Exchange braucht KYC, während Self-Custody bei Nuri kein KYC braucht.

## Wie man es baut

Nicht jeder Browser unterstützt WebAuthn PRF schon, deshalb brauchen wir einen Fallback.

```
┌─────────────────────────────────────────────────────────────────┐
│                 WEBAUTHN PRF SUPPORT STATUS                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Browser/Platform          PRF Support    Notes                │
│   ────────────────          ───────────    ─────                │
│   Chrome (Desktop)          ✅ Yes         Windows Hello, etc.  │
│   Chrome (Android)          ✅ Yes         Fingerprint/PIN      │
│   Safari (macOS)            ✅ Yes         Touch ID             │
│   Safari (iOS)              ✅ Yes         Face ID/Touch ID     │
│   Firefox                   ⚠️ Partial     Platform dependent   │
│   Security Keys             ⚠️ Varies      FIDO2 Level 2 req.   │
│                                                                 │
│   Fallback Strategy:                                            │
│   • Detect PRF support at registration                          │
│   • Fall back to encrypted key storage if unavailable           │
│   • Clearly communicate security implications to user           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Für MuSig2 ist das hier eine vereinfachte Version der Key Aggregation.

```typescript
// Simplified MuSig2 key aggregation
function aggregateKeys(pubkeys: Uint8Array[]): Uint8Array {
  // Sort pubkeys lexicographically for determinism
  const sortedKeys = [...pubkeys].sort(compareBytes);

  // Compute key aggregation coefficients
  const L = hashKeys(sortedKeys);

  // Aggregate with coefficients
  let aggregated = Point.ZERO;
  for (const pk of sortedKeys) {
    const P = Point.fromBytes(pk);
    const a = computeCoefficient(L, pk);
    aggregated = aggregated.add(P.multiply(a));
  }

  return aggregated.toBytes();
}
```

Die Nonce-Generierung ist der kritische Teil für die Sicherheit. Eine Nonce darf niemals wiederverwendet werden oder vorhersehbar sein.

```typescript
// MuSig2 requires fresh, unpredictable nonces
function generateNonce(
  secretKey: Uint8Array,
  publicKey: Uint8Array,
  message: Uint8Array,
  extraRand: Uint8Array
): { secretNonce: Uint8Array; publicNonce: Uint8Array } {
  // MUST use fresh randomness for each signing session
  const rand = crypto.getRandomValues(new Uint8Array(32));

  // Derive nonce deterministically from inputs + randomness
  const k = taggedHash(
    "MuSig2/nonce",
    concat(secretKey, publicKey, message, rand, extraRand)
  );

  return {
    secretNonce: k,
    publicNonce: Point.BASE.multiply(k).toBytes()
  };
}
```

Und das ist das Protokoll, das die App mit dem NFC Hardware Wallet spricht, als APDU Commands.

```
┌─────────────────────────────────────────────────────────────────┐
│              NFC SIGNING PROTOCOL (APDU)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Command                    Response                           │
│   ───────                    ────────                           │
│                                                                 │
│   SELECT APPLET              OK + Version                       │
│   ┌────────────────┐         ┌────────────────┐                │
│   │ CLA: 00        │   ──▶   │ SW: 9000       │                │
│   │ INS: A4        │         │ Version: 1.0   │                │
│   │ AID: Nuri...   │         │                │                │
│   └────────────────┘         └────────────────┘                │
│                                                                 │
│   GET PUBLIC KEY             Public Key                         │
│   ┌────────────────┐         ┌────────────────┐                │
│   │ CLA: E0        │   ──▶   │ SW: 9000       │                │
│   │ INS: 40        │         │ PubKey: 33B    │                │
│   │ Path: m/86'/...│         │                │                │
│   └────────────────┘         └────────────────┘                │
│                                                                 │
│   MUSIG2 NONCE               Nonce Commitment                   │
│   ┌────────────────┐         ┌────────────────┐                │
│   │ CLA: E0        │   ──▶   │ SW: 9000       │                │
│   │ INS: 50        │         │ R: 33B         │                │
│   │ SessionID      │         │                │                │
│   └────────────────┘         └────────────────┘                │
│                                                                 │
│   MUSIG2 SIGN                Partial Signature                  │
│   ┌────────────────┐         ┌────────────────┐                │
│   │ CLA: E0        │   ──▶   │ SW: 9000       │                │
│   │ INS: 52        │         │ s: 32B         │                │
│   │ Message hash   │         │                │                │
│   │ Agg nonce      │         │                │                │
│   │ Agg pubkey     │         │                │                │
│   └────────────────┘         └────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Wo das Self-Custody hinführt

Alles zusammengenommen denken wir, dass das Bitcoin Self-Custody nach vorne bringt. Es gibt keinen persistenten Key Storage, also gibt es weniger anzugreifen. MuSig2 gibt uns Multi-Party Signing mit Privacy und Effizienz. Die abklingenden Timelocks bedeuten, dass Recovery immer möglich ist und die Sicherheit langsam runtergeht, statt zu brechen. Und mit 2-of-2 und 2-of-3 kannst du das Setup wählen, das zu dem passt, was du brauchst. Am Ende behält der User die volle Kontrolle über seine Bitcoin und kriegt trotzdem den Schutz einer Multisig und den Komfort eines Passkeys.

Ein paar Worte, damit wir auf dem gleichen Stand sind. CSV ist CheckSequenceVerify, der Bitcoin Opcode für relative Timelocks. HSM ist ein Hardware Security Module, Key Storage, der schwer zu manipulieren ist. MuSig2 ist das Multi-Signature Scheme für Schnorr Signatures. PRF ist die Pseudo-Random Function, die WebAuthn Extension, die wir nutzen, um Keys abzuleiten. Taproot ist das Bitcoin Upgrade, das Schnorr Signatures und MAST gebracht hat. Ein UTXO ist ein Unspent Transaction Output, die Art, wie Bitcoin seine Konten führt. Und WebAuthn ist der Web Authentication Standard für Login ohne Passwort.

Wenn du mehr lesen willst, die Quellen sind [BIP-340: Schnorr Signatures for secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki), [BIP-341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki), [BIP-327: MuSig2](https://github.com/bitcoin/bips/blob/master/bip-0327.mediawiki), die [WebAuthn PRF Extension](https://w3c.github.io/webauthn/#prf-extension) und das [Blockstream Green Security Model](https://help.blockstream.com/hc/en-us/articles/900001391763).
