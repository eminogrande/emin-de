---
title: "A Passkey-Derived 2-of-2 Taproot Wallet Architecture Eliminating Seed Phrases, Mitigating Supply-Chain Risk, and Enforcing Verified, Non-Blind Signing"
description: "A Bitcoin wallet with no seed phrase. Two passkeys on two domains form a 2-of-2 MuSig Taproot key, so a hacked app alone can't steal your funds."
date: "2025-12-02T09:50:01Z"
updated: "2025-12-02T09:50:01Z"
lang: "en"
category: "bitcoin"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/a-passkey-derived-2-of-2-taproot-wallet-architecture-eliminating-seed-phrases-mi/cover.webp"
voice_check:
  em_dash: 1
  unobserved: 180
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/a-passkey-derived-2-of-2-taproot-wallet-architecture-elimina/"
---
This post describes a wallet architecture that removes seed phrases completely, doesn't store long-term private keys, and gets around one of the biggest practical threats to software wallets today, which is a compromise of the app's dependency graph or of its build pipeline.

The design uses two independent passkeys. Each one is bound to a different domain, and each one calls the WebAuthn PRF extension to derive deterministic key material. The two keys form a 2-of-2 MuSig Taproot aggregated key, so every spend needs both signatures. One signing flow happens inside the user's app, and the second one happens on a completely separate and isolated co-signing domain that decodes the transaction and shows it to the user.

It's built against three specific weak spots in normal wallet designs, which are seed phrase exposure, blind signing and a compromised dependency chain.

1.1 Seed phrase exposure during import. Wallets that are based on a seed phrase make you type or paste a BIP-39 mnemonic or a private key when you create or recover the wallet. This moment is extremely fragile. The mnemonic sits in plaintext in memory, where any malicious script or compromised dependency can see it. Using the clipboard exposes the secret to observers on the OS level and to apps in the background. Mobile and web environments allow DOM injection, overlay attacks, accessibility scraping and clipboard listeners. And even a short exposure is enough to steal the key without anyone noticing.

If the app itself or one of its dependencies is compromised, a seed phrase can be taken out the moment it touches memory. If you remove this step completely, you remove one of the biggest security liabilities in software wallets.

1.2 Supply chain compromise. Modern front end stacks like React, React Native and Expo pull in hundreds of transitive dependencies as a normal thing. A single dependency update or an injected change in a build step can send sensitive material over the network, change transaction parameters, manipulate how the UI shows transaction data, or log and forward key material.

When a wallet relies on one private key that is stored or derived in such an environment, a supply chain compromise can drain the user's funds completely and silently.

1.3 Blind signing and misrepresentation. In wallets that live in one environment, the app that builds the transaction is the same app that shows the transaction summary and signs it. A compromised or manipulated UI can change destination addresses, show wrong amounts or fees, and make valid signatures over malicious transactions while it shows harmless data. Without an independent check, the user can't see that anything was changed.

The system uses two passkeys. Passkey A is registered to RPID `nuri.com` and is used in the client app on web, iOS and Android. Passkey B is registered to RPID `confirm.nuri.com` and is only used on a separate co-signing website.

Both passkeys use the WebAuthn PRF extension, which gives deterministic PRF outputs with high entropy. `PRF_A` is used to derive the signing key `k₁`, and `PRF_B` is used to derive the signing key `k₂`.

These keys are combined into a MuSig 2-of-2 Taproot key, and that gives one aggregated public key on chain. Spending from the Taproot output needs both partial signatures. The app controls one signing factor, and a separate web domain controls the second one. Neither domain can reach the passkey of the other, because the platform enforces the RPID boundary.

3.1 Preparing and partially signing on `nuri.com`. This first flow has six steps. The user builds a transaction inside the app, and the app creates a PSBT with the inputs, outputs and fees. Then the user authenticates with Passkey A, which generates `PRF_A`, and a deterministic KDF derives the key `k₁`. The app creates a partial MuSig signature with `k₁`, and the partially signed PSBT goes to the independent co-signing domain.

The app can't finalize the transaction. A compromised client can only prepare a PSBT, and it can't complete it.

3.2 Independent check and co-signing on `confirm.nuri.com`. This second flow has seven steps. First the user is redirected to the co-signing site. The browser and the WebAuthn RPID model keep this domain isolated from the app. The co-signing server parses and decodes the PSBT on its own and shows a clear summary of the spend that a human can read, with the inputs and amounts, the destination addresses, the fees and the change outputs. Then the user authenticates with Passkey B, which produces `PRF_B`, and a deterministic KDF derives the key `k₂`. After it validates the PSBT, the co-signer makes the second partial MuSig signature. `PRF_B` and `k₂` are zeroized right away, and nothing is stored on the server. In the end the fully signed PSBT goes back to the app or is broadcast to the network.

So this step gives you a second signature and also an independent confirmation of what you want to do, and that's what stops blind signing attacks.

4.1 Seed phrase risks are gone. No seed phrase is ever generated, shown, entered or stored. There is no clipboard exposure, no import form, no secret in JavaScript memory and no attack window when the wallet is created.

4.2 A compromised client is not enough. If the app or its dependencies are compromised, the malicious code can't derive `k₂`. It can't pretend to be `confirm.nuri.com` or call Passkey B. It can't finalize the signature without the partial signature of the co-signer. And the co-signer shows the real transaction details on its own, so any tampering becomes visible. A compromise of only the client is not enough to steal funds.

4.3 A compromised co-signer is not enough either. If the co-signing server or its front end is compromised, the attacker can't derive `k₁`. They can't start a transaction, because they can't sign the first partial. And they can't get the PRF output of Passkey A, because of the RPID binding. A compromise of only the co-signer is also not enough to steal funds.

4.4 Both sides have to fall. To steal funds you need a coordinated compromise of the app supply chain and of the co-signing site supply chain, or a phishing attack that changes the transaction details on both sites in the same consistent way. That makes a successful attack a lot harder.

4.5 Blind signing is mitigated. The transaction is checked in two places. First in the app, which shows it first, and then on the co-signing domain, which decodes and shows it on its own. So the user gets two authenticated views of the same intent, and that closes the common blind signing hole that wallets in one single environment have.

4.6 No private keys on the server. The co-signer stores no key material. It derives k₂ only during the WebAuthn operation and zeroizes all sensitive data right after. There is no long-term key database that someone could break into.

4.7 Domain isolation through the WebAuthn RPID. The RPID binding makes sure of four things. The app can't use Passkey B, the co-signer can't use Passkey A, phishing domains can't reuse existing passkeys, and mobile or native apps can't trick the OS into unlocking a passkey for a different domain. Hardware and the OS enforce this boundary.

Put together you get a wallet with no seed phrases, so no secrets the user types in, no import fields and no clipboard exposure. The keys are hardware-backed, because the secrets come from the Secure Enclave or from FIDO authenticators. It's 2-of-2 MuSig, so both keys are needed and nobody can spend alone. The isolation comes from two separate RPIDs that the platform enforces. The co-signer is stateless, with no long-term keys and nothing to steal on the server. The independent check prevents blind signing and catches a PSBT that someone tampered with. A compromise of a single environment is not enough. And it works on web, iOS and Android without extensions.

So the architecture deals with the five main attack vectors in software wallets, which are seed phrase exposure, supply chain compromise, UI manipulation for blind signing, the ways a single key can fail, and key theft on the server side. It spreads the signing authority across two independent domains, each one with its own passkey and PRF output, and it needs both signatures for every spend. That raises the security margin a lot, and it still runs in normal browsers and mobile apps.

It's a practical path to secure Bitcoin self-custody across platforms, without seed phrases, without extensions and without having to trust the client software stack.

If needed, this can grow into a formal specification, a security analysis or a guide for developers who want to implement it.

![IMG_6836](../../../media/a-passkey-derived-2-of-2-taproot-wallet-architecture-eliminating-seed-phrases-mi/IMG_6836.jpeg)
