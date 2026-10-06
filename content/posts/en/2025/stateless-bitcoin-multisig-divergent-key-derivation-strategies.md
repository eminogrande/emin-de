---
title: "Stateless Bitcoin Multisig and Divergent Key Derivation Strategies"
description: "Two ways to derive the server co-signer key in a passkey MuSig2 Bitcoin wallet, why they give different addresses and how you can migrate."
date: "2025-12-09T15:15:01Z"
updated: "2025-12-09T15:15:01Z"
lang: "en"
category: "bitcoin"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/stateless-bitcoin-multisig-divergent-key-derivation-strategies/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 128
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/stateless-bitcoin-multisig-divergent-key-derivation-strategi/"
tldr:
  - "Passkey MuSig2 Bitcoin wallets can derive the server co-signer key in two ways: pure PRF or a server secret plus client identity."
  - "The two functions give different keys for the same user, so the same wallet ends up with different addresses."
  - "There are three ways to migrate: a protocol adapter, a client bridge or a hard fork with address rotation."
basically:
  architecture-a-pure-prf: "Both keys come only from the client's passkey PRF. The server keeps no state at all."
  architecture-b-anchored-in-a-secret: "The server key mixes a static server secret with the client identity. Now the server holds state."
  the-problem-deterministic-divergence: "Same user, two derivation functions, two different keys. The old addresses don't match the new ones."
  three-ways-to-migrate: "Branch on the server, inject parameters from the client, or rotate everyone to new addresses."
  the-trade-off: "Client entropy is easier to recover. Hybrid entropy resists coercion better. You can't have both."
---
![](../../../media/stateless-bitcoin-multisig-divergent-key-derivation-strategies/cover.jpg)

This is about non-custodial Bitcoin wallets that use MuSig2 and WebAuthn passkeys. In these wallets "stateless" is the main rule of the architecture. The system has to rebuild the key material deterministically every time and it can't rely on any temporary state. But for the server co-signer there are two different answers to the question where the key really comes from, two different sources of truth.

This post looks at the move from a client entropy model to a hybrid entropy model and at the determinism problem that comes with it. It has four parts, the two architectures, the problem between them and the ways to migrate.

## Architecture A, pure PRF

The older architecture is pure PRF. It puts portability first, and the server side has zero-knowledge properties. The only entropy source is a deterministic pseudo-random function output, the PRF, from the WebAuthn authenticator. The client first does an assertion on a separate "co-signer passkey" that is domain separated from the user key. Then the raw PRF bytes go to the server over a secure channel. And the server works as a pure function and maps the PRF input directly to a private scalar, `k_server = Reduce(PRF_bytes)`.

So the input comes only from the client and the server keeps no state at all. That `k_user` and `k_server` are mathematically different depends completely on RPID separation, the Relying Party ID. And it also means that whoever has the specific hardware authenticator can rebuild the full key set without any help from the server.

## Architecture B, anchored in a secret

The newer architecture is anchored in a secret. It moves the root of trust to a composite derivation and adds a static secret on the server, so nobody can rebuild the key alone. Here the co-signer key is a function of a secure server master seed and of client identity metadata that never changes. The client first proves that it has the credential. Then the server derives the private scalar with a key derivation function, a KDF, that mixes a high entropy server master secret `S_master` with a set of client specific context parameters `C_client` and protocol specific constants `P_context`.

`k_server = HKDF(Salt=S_master, IKM=C_client || P_context)`

The context parameters in `C_client` are kept general and include properties of the credential that never change, for example the public key hash, the credential identifier or attestation data. That binds the derived key strictly to one specific hardware instance.

So the input is hybrid, a server secret plus the client identity, and the server has to keep the static `S_master`. This gives defense in depth. An attacker who has the client's authenticator can't derive `k_server` without also getting `S_master` out of the server. And the other way around, if the server is compromised, the attacker gets no usable keys without the client's interactive signature.

## The problem, deterministic divergence

Moving between these architectures has one blocking issue, the derivation mismatch. `Function_A(PRF)` and `Function_B(S_master, C_client)` use input spaces that have nothing in common, so for the same user identity they produce completely different private scalars. That changes the aggregated MuSig2 public key `P_agg = P_user + P_server`. For the blockchain it looks like the identity of the user, the address, has rotated. The wallet you get with Architecture B is mathematically unrelated to the wallet you get with Architecture A.

## Three ways to migrate

To fix the mismatch you have to pick a canonical source of truth for existing users and for new ones, and there are three ways to do it.

The first one is a protocol adapter for legacy support. The new server gets a conditional branch. If the request payload matches the legacy schema and brings raw PRF bytes, the server skips the `S_master` KDF and runs the old reduction function. Existing users keep their addresses, but these users also keep the security model of Architecture A.

The second one is a client bridge that injects the parameters. The client logic gets updated so it extracts the `C_client` parameters that Architecture B needs, also during the legacy flows. Then the server can compute the new derivation path in the background or migrate the state of the user, and the user doesn't notice any change. That closes the entropy gap.

The third one is a hard fork with address rotation. The system makes Architecture B the only standard and users on Architecture A are treated as deprecated. A migration flow asks them to sign a sweep transaction that moves the UTXOs from the `P_agg(Legacy)` address to the `P_agg(Modern)` address.

## The trade-off

Going from client entropy to hybrid entropy is a trade-off between recoverability and resistance against coercion on the client side. Architecture A gives you self-sovereign recovery, at least in theory. Architecture B enforces a stronger 2-of-2 security model, where neither side has enough entropy to rebuild the full key set alone.
