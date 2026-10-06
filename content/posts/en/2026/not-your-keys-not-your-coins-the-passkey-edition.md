---
title: "Not Your Keys, Not Your Coins — The Passkey Edition"
description: "Microsoft just killed the VeraCrypt developer’s signing certificate. No warning. No email. No human to talk to. One day he logs in — account terminated. The..."
date: "2026-04-09T05:55:27.955Z"
updated: "2026-04-09T05:55:27.955Z"
lang: "en"
category: "nuri"
format: "essay"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
canonical: "https://medium.com/@em/not-your-keys-not-your-coins-the-passkey-edition-5cc0f79a00af"
source: "medium"
third_party_summary: false
cover: "../../../media/not-your-keys-not-your-coins-the-passkey-edition/01-05a18f2a.png"
voice_check:
  em_dash: 17
  unobserved: 110
emin_check_pct: null
---
Microsoft just killed the VeraCrypt developer’s signing certificate. No warning. No email. No human to talk to. One day he logs in — account terminated. The message says no appeal is possible.

This guy maintained VeraCrypt for over a decade. Millions of users. Doesn’t matter. Microsoft’s automated system decided he’s done, and that’s it.

The WireGuard developer? Same thing. Right now. Account suspended. 60-day appeal. No explanation.

This is exactly what’s going to happen to your “self-custodial” passkey wallet. Not if. When.

## Passkey AUTH is not your key

Let’s get this straight because the entire industry is getting it wrong.

When you “log in with a passkey” on Privy, Dynamic, Turnkey — whatever — you are authenticating. That’s it. The passkey proves you are you. It does NOT give you your private key. It gives you ACCESS to infrastructure that holds your private key — or parts of it.

Privy splits your key into shards using Shamir’s Secret Sharing and distributes them across their servers. Your passkey is the door key to Privy’s vault. But it’s still Privy’s vault.

Privy goes down? Shards gone. Privy gets acquired by Stripe (which already happened)? New management sunsets the product? Shards gone. Privy’s auth server has a bad day? You can’t sign.

Yes, they have an export button. Buried in settings. How many of Privy’s 75 million accounts have actually exported their private key? I’d bet less than 1%.

The other 99%? They think they’re self-custodial. They’re not. They’re one corporate decision away from losing everything.

## PRF is not AUTH

This is the part nobody talks about and everybody needs to understand.

The WebAuthn PRF extension is a completely different thing than passkey authentication. It’s not about proving who you are. It’s about deriving key material directly from your hardware.

Here’s what happens with PRF:

Your authenticator — Secure Enclave, TPM, YubiKey, whatever — holds a secret that is bound to your credential. That secret never leaves the hardware. Ever. When you authenticate with PRF enabled, the authenticator takes a salt value you provide and computes HMAC(credential_secret, salt). It returns a deterministic 32-byte output.

Same credential + same salt = same output. Always. Forever. Pure math. No server involved.

That 32-byte output? That’s your input key material. Run it through HKDF and you get your Bitcoin private key. Deterministically. On-device. Offline if you want.

**This is what Nuri does.** Your passkey doesn’t unlock a vault. Your passkey IS the vault. The key material is derived directly from hardware you physically hold. No shard on any server. No company in the middle. No infrastructure dependency.

## “But what if nuri.com disappears?”

Good question. Here’s the answer: it doesn’t matter.

WebAuthn credentials are bound to a Relying Party ID — basically a domain string. Your passkey for Nuri is bound to nuri.com. The authenticator checks the SHA-256 hash of that string when selecting the credential.

But here’s what it does NOT check: DNS resolution. Certificate authority. Whether the domain is actually live on the internet.

So if nuri.com disappears tomorrow:

Edit /etc/hosts, point nuri.com to 127.0.0.1. Run a local HTTPS server with a self-signed cert for nuri.com. Open [https://nuri.com](https://nuri.com) in your browser. Trigger the passkey, request PRF with the documented salt. Get the same 32 bytes you always get. Derive your private key.

No internet. No server. No permission from anyone.

Or skip the browser entirely — use libfido2 to talk directly to your authenticator via CTAP2. Set rpId = “nuri.com”, provide your credential ID and salt. The authenticator doesn’t care where the request comes from. It just runs the HMAC and gives you the output.

This works because PRF operates at the hardware level. The domain is used for credential SELECTION — which credential to use — not for the computation itself. The authenticator doesn’t know or care if nuri.com is a Fortune 500 company or a localhost page you spun up in 30 seconds.

**This is fundamentally impossible with Privy.** If Privy’s servers are gone, the shards are gone. There is no local recovery. There is no offline derivation. There is nothing.

## AUTH vs PRF — the actual difference

**Passkey AUTH (Privy, Turnkey, Dynamic):** Passkey proves your identity to a server. Server gives you access to key material it controls. Server goes down = no access. Domain dies = no access. You must export your key while the service is alive or you lose it.

**Passkey PRF (Nuri):** Passkey derives key material directly from hardware. No server holds any part of your key. Server goes down = doesn’t matter, derive locally. Domain dies = spin up localhost, derive the same key. Nothing to export — the key is always derivable from your passkey.

One is authentication. The other is cryptographic key derivation. They both use passkeys. They are not the same thing. At all.

## What about smart accounts?

ZeroDev and similar ERC-4337 providers are better than Privy — your passkey signs directly, no key sharding. But you still depend on their bundler infrastructure to submit transactions, and your passkey is still bound to their domain.

The domain binding is solvable the same way — localhost trick works. But you also need a bundler, and ZeroDev’s bundler isn’t self-hostable. So you’re dependent on finding an alternative. It’s recoverable. But it’s not sovereign.

With Nuri and PRF, there is no infrastructure dependency. Zero. You derive your key, you have a standard Bitcoin private key, you can use it with any wallet software in existence. Electrum. Sparrow. Core. Whatever. Because the output of PRF + HKDF is just a private key. It doesn’t care what wallet reads it.

## The VeraCrypt lesson

Microsoft didn’t warn the VeraCrypt developer. Didn’t explain. Didn’t provide recourse. An automated system made a decision and a decade of trust evaporated in one login attempt.

Every centralized auth provider — every company that sits between your passkey and your private key — is one automated decision away from doing the same thing to you.

The only protection is architecture. Not promises. Not export buttons. Not “we would never do that.” Architecture.

If your key exists because a server computed it, stored it, or holds a piece of it — you are not self-custodial. You are renting access to your own money. And the landlord can change the locks whenever they want.

PRF doesn’t ask permission. PRF doesn’t phone home. PRF is math running on hardware you hold in your hand.

Not your keys, not your coins. Still true. More true than ever.

*Nuri is a self-custodial Bitcoin and stablecoin wallet using passkeys with the WebAuthn PRF extension for deterministic key derivation. No server holds your keys. No company can lock you out. nuri.com*

![](../../../media/not-your-keys-not-your-coins-the-passkey-edition/01-05a18f2a.png)
