---
title: "Nuri Wallet: A Stateless MuSig2 Bitcoin Wallet with Decaying Multisig Recovery"
description: "How we designed Nuri Wallet. Passkey keys that are never stored, MuSig2, an NFC card, a 2FA server and a multisig that decays so you can always recover."
date: "2025-12-08T21:00:01Z"
updated: "2025-12-08T21:00:01Z"
lang: "en"
category: "bitcoin"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-multisig-recovery/cover.jpg"
voice_check:
  em_dash: 0
  unobserved: 287
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-/"
---
![](../../../media/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-multisig-recovery/cover.jpg)

This is work in progress. The document was written by Opus 4.5 and it's the design of Nuri Wallet as we think about it right now.

Nuri Wallet is a Bitcoin wallet that puts four things together into one security setup. MuSig2 Schnorr signatures, keys that are derived on the fly with the WebAuthn PRF extension and never stored, an NFC hardware wallet, and a server that co-signs behind two-factor authentication. We care about security and about getting your money back, both. That's why there is a decaying multisig, so you can always recover your funds, even when one or more of the signing parts are gone.

The document has ten parts. Part one is why we built it this way, two is how it fits together, three is the three keys, four is MuSig2, five is the 2-of-2 and 2-of-3 setups, six is the decaying multisig, seven is security, eight is recovery, nine is how it compares to other wallets and ten is some notes on how to build it.

Bitcoin wallets always had this fight between security and being easy to use. A single-signature wallet is easy, but if someone steals the key the money is gone. A multisig wallet is safer, but if you lose keys you can lock yourself out of your own funds. We try to get out of that fight with a mix of things. Keys are derived and not stored, so there is nothing sitting on a disk that someone can steal. Several parties sign together with MuSig2, and the result is one Schnorr signature, which is better for privacy and also makes the transaction cheaper. Timelocks decay step by step, so you get more recovery options over time and you are never locked out forever. And there is an optional hardware wallet for cold storage when you want the most security.

There are three keys. The passkey key, the hardware key on an NFC Satochip card, and the server key. Each one gives a MuSig2 partial signature, and the partial signatures get aggregated into one. Underneath it all is the decaying timelock.

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

## The three keys

The passkey key is the heart of how Nuri feels to use. It uses the WebAuthn PRF (Pseudo-Random Function) extension to derive the keys, so we never have to store them anywhere.

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

What you get from this is four things. It's stateless, no private keys are stored on the device and they get derived when you need them. It's phishing resistant, because WebAuthn binds the credential to the origin, so a fake site just doesn't get the same key. It's backed by hardware, the PRF secret lives in the secure element of the device. And it's protected by biometrics, the device checks that you are there with your fingerprint or your face.

The math is short. You have $s$, the device master secret that sits in the secure element, then $\text{salt}$, a salt just for the app, and $\text{rpId}$, the relying party identifier. The PRF output is

$$\text{prf\_output} = \text{HMAC-SHA256}(s, \text{salt} \| \text{rpId})$$

and from that we derive the Bitcoin private key like this.

$$k_{\text{passkey}} = \text{HKDF-SHA256}(\text{prf\_output},
\text{"nuri-btc-v1"}, \text{path})$$

The hardware part is a card with a secure element that you talk to over NFC, similar to Satochip or SatSigner. It does MuSig2 partial signing and the private key never leaves the card.

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

Signing with the card goes in four rounds. First the card makes a random nonce $R_{\text{hw}}$ and gives a commitment for it. Then all parties exchange their nonce commitments and after that reveal the nonces. Then the card computes its partial signature without ever showing the private key. And at the end the partial signatures get combined into the final Schnorr signature.

The third key is on the server. The server is a co-signer that only signs after 2FA. It adds entropy and one more layer of security, but it never has custody of your money.

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

The server derives a key for each user, always the same way, so it doesn't need to store it.

$$k_{\text{server}} = \text{HKDF}(k_{\text{master}}, \text{user\_id}
\| \text{wallet\_id} \| \text{index})$$

Here $k_{\text{master}}$ lives in the HSM and is never exported.

## MuSig2 and the two setups

MuSig2 is a multi-signature scheme. Several people sign, but what comes out is one aggregated Schnorr signature that looks exactly like a normal one. So you get privacy, because nobody watching the chain can tell it's a multisig, and you get efficiency, because the transaction is smaller and the fees are lower.

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

Why we picked it for Nuri is basically four reasons. Privacy, the aggregated signature looks like single-sig on-chain. Efficiency, it's one signature no matter how many people sign. It's Taproot native, it was made for the Schnorr and Taproot upgrade of Bitcoin. And it only needs 2 rounds of communication, which the original design calls non-interactive.

The basic setup needs both the passkey and the server to sign a transaction.

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

On chain this is a Taproot output.

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

The bigger setup adds a hardware wallet, for more security and more ways to recover.

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

And this is how the Taproot tree looks for 2-of-3.

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

## Decaying multisig with CSV timelocks

The idea of a decaying multisig is that you can always get your funds back, and the security goes down slowly and on purpose over time, not all at once.

CSV (CheckSequenceVerify) is a relative timelock. It counts blocks since the UTXO was created.

$$\text{spendable\_height} = \text{confirmation\_height} + \text{csv\_blocks}$$

In Nuri Wallet, normal spending needs the 2-of-2 or 2-of-3 MuSig2 signature. After ~70 days, that is 10,000 blocks, the other recovery paths open up. And after ~1 year, 52,560 blocks, there is a single-key emergency exit.

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

The CSV exit script, in a simplified version, looks like this.

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

To keep security at the maximum, you should refresh your UTXOs every now and then. You just send the coins to yourself and the clock starts again.

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

## Security and recovery

The threats we looked at are seven. If someone steals your device, the passkey is protected by biometrics and the key is only derived when you sign. If the server gets compromised, the server keys are in the HSM, derivation is stateless, and the server alone can't spend anything. Phishing doesn't work because WebAuthn binds the credential to the origin. A man in the middle can't forge a signature because of the MuSig2 nonce protocol. If the server disappears, the CSV timelock lets you recover, and with a hardware wallet you have a way out right away. If you lose the hardware wallet, 2-of-3 lets you recover with passkey and server. And if you lose the passkey, 2-of-3 lets you recover with the hardware wallet and the server.

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

Three attack cases make it more concrete. First, an attacker takes over the server.

```
Attacker obtains: Server signing capability
Attacker needs:   Passkey authentication OR Hardware wallet

Result: ❌ Cannot steal funds (missing second key)
        ⚠️  Can potentially DoS by refusing to sign
        ✅ User recovers via CSV exit or HW wallet
```

Second, someone steals your phone.

```
Attacker obtains: Physical device
Attacker needs:   Biometric/PIN to unlock passkey
                  PLUS 2FA to authorize server signing

Result: ❌ Cannot steal funds (passkey protected by biometrics)
        ✅ Keys never stored on device (stateless)
```

Third, someone gets both the passkey and the server.

```
Attacker obtains: Passkey credential + Server access
Result: ⚠️  Can steal funds in 2-of-2 config
        ✅ 2-of-3 config: HW wallet still required
```

Here is what happens in each case, in 2-of-2 and in 2-of-3. If you lose your phone and with it the passkey, in 2-of-2 you wait for the CSV, ~1 year, and then you still can't spend, because the exit path needs the passkey. In 2-of-3 you just use server and hardware wallet. If the server goes offline, in 2-of-2 you wait for the CSV, ~1 year, and then it works. In 2-of-3 you use passkey and hardware wallet right away. If you lose the hardware wallet, that doesn't matter in 2-of-2 because there is none, and in 2-of-3 you use passkey and server. If you lose your phone and the server is down at the same time, in 2-of-2 the funds are lost. In 2-of-3 the hardware wallet could maybe spend after the CSV, but that is still a design decision we have to make. And if you lose the hardware wallet and the server is down, you wait for the CSV in both setups and then you are fine.

This is the flow when the server is not there and you have 2-of-3.

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

And this is the CSV emergency exit in 2-of-2.

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

Of the wallets that exist, Blockstream Green is the closest one. Green uses ECDSA multisig, we use MuSig2 Schnorr. On chain Green is a visible multisig, Nuri looks like single-sig. Green keeps the client key encrypted on the device, ours is stateless and comes from the PRF. Green stores the server key in a traditional HSM, our server derives it stateless inside the HSM. Recovery in 2-of-2 is the same in both, a CSV timelock. Recovery in 2-of-3 is a backup key phrase in Green and a hardware wallet with us. And Taproot support is limited in Green, in Nuri it's native.

Then the traditional hardware wallets like Ledger and Trezor. They are a dedicated device, Nuri is a passkey plus an NFC card. For daily transactions you need the device with them, with us you need only the passkey and the server does the 2FA. High value transactions are the same as daily ones on a Ledger or Trezor, with Nuri you can require the hardware card for those. If you lose a Ledger or Trezor you recover with the seed phrase, with Nuri there are several paths, CSV and 2-of-3. And the theft risk there is that the seed phrase gets exposed, with Nuri you don't need a seed phrase at all.

And custodial exchanges. There the exchange holds the keys, with Nuri the user holds all the keys. Counterparty risk is high there and none with us. On an exchange your money can be seized, Nuri is self-sovereign. Recovery on an exchange is account recovery, with us it's CSV and multisig. And an exchange needs KYC, while self-custody in Nuri needs no KYC.

## How to build it

Not every browser supports WebAuthn PRF yet, so we need a fallback.

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

For MuSig2, this is a simplified version of the key aggregation.

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

Nonce generation is the critical part for security. A nonce must never be reused or predictable.

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

And this is the protocol the app speaks with the NFC hardware wallet, as APDU commands.

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

So all together, we think this moves Bitcoin self-custody forward. There is no persistent key storage, so there is less to attack. MuSig2 gives us multi-party signing with privacy and efficiency. The decaying timelocks mean recovery is always possible and security goes down slowly instead of breaking. And with 2-of-2 and 2-of-3 you can pick the setup that fits what you need. In the end the user keeps full control over their Bitcoin and still gets the protection of a multisig and the comfort of a passkey.

A few words, so we are on the same page. CSV is CheckSequenceVerify, the Bitcoin opcode for relative timelocks. HSM is a Hardware Security Module, key storage that is hard to tamper with. MuSig2 is the multi-signature scheme for Schnorr signatures. PRF is the Pseudo-Random Function, the WebAuthn extension we use to derive keys. Taproot is the Bitcoin upgrade that brought Schnorr signatures and MAST. A UTXO is an Unspent Transaction Output, the way Bitcoin keeps its accounts. And WebAuthn is the Web Authentication standard for logging in without a password.

If you want to read more, the sources are [BIP-340: Schnorr Signatures for secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki), [BIP-341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki), [BIP-327: MuSig2](https://github.com/bitcoin/bips/blob/master/bip-0327.mediawiki), the [WebAuthn PRF Extension](https://w3c.github.io/webauthn/#prf-extension) and the [Blockstream Green Security Model](https://help.blockstream.com/hc/en-us/articles/900001391763).
