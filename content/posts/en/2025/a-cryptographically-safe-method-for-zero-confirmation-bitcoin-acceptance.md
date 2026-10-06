---
title: "A cryptographically safe way to accept Bitcoin with zero confirmations"
description: "If the payer can't sign a second spend without you, a zero-conf Bitcoin payment is safe. Taproot co-signing, one signature per outpoint and a delayed exit."
date: "2025-12-16T09:20:01Z"
updated: "2025-12-16T09:20:01Z"
lang: "en"
category: "bitcoin"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/a-cryptographically-safe-method-for-zero-confirmation-bitcoin-acceptance/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 103
emin_check_pct: 57
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/a-cryptographically-safe-method-for-zero-confirmation-bitcoi/"
tldr:
  - "A zero-confirmation payment is only safe if the payer cannot create any other valid spend of the same UTXO."
  - "Mandatory co-signing plus a delayed recovery path for the user alone enforces that with cryptography."
  - "The co-signer signs each outpoint once, so a Lightning payment can go out before the first confirmation."
basically:
  when-zero-confirmation-is-unsafe: "If the payer can build a different valid spend of the same UTXO, fees and RBF rules don't matter."
  the-one-condition: "During the window, the payer must not be able to spend alone. Enforced at the UTXO level."
  a-taproot-output-with-two-paths: "Cooperative path right away with two signatures, recovery path for the user alone after N blocks."
  how-acceptance-works: "Build, send for co-signing, check policy, sign once, broadcast. Then the mempool doesn't matter."
  four-rules-for-the-co-signer: "One signature per outpoint, sign and lock atomically, commit to the whole transaction, watch reorgs."
  timing: "The recovery delay must be long enough that the cooperative spend still confirms when fees are bad."
  bitcoin-to-lightning-swaps: "Co-signing is the authorization, so the Lightning payment can start at zero confirmations."
  what-it-doesnt-fix: "Payer double-spends are gone. Co-signer compromise, downtime, slow confirmations and censorship are not."
  what-you-need: "Mandatory co-signing, one signature per outpoint and a delayed solo recovery path. Nothing less works."
---
![](../../../media/a-cryptographically-safe-method-for-zero-confirmation-bitcoin-acceptance/cover.jpg)

A Bitcoin transaction is not final until it's confirmed in a
block. Until then any transaction that spends a UTXO can be
replaced by another valid transaction that spends the same
inputs. That's why accepting zero-confirmation payments in
general is not safe.

This post describes a setup where a service can safely accept
a zero-confirmation Bitcoin transaction and act on it, in the
sense that the payer can't create a conflicting valid
transaction during a defined window.

It works by enforcing who can sign at the UTXO level, and it
doesn't depend on how the mempool behaves or on miner policy.

## When zero-confirmation is unsafe

Say a UTXO `U` can be spent by a user. A zero-confirmation
transaction `T` that spends `U` is unsafe if the user can also
build a different transaction `T'` that spends `U` and get
that one confirmed instead of `T`.

And this stays true no matter what the fees are, no matter if
there is Replace-by-Fee signaling, no matter how the mempool
spreads it, and no matter what script structure sits inside
`T`.

So zero-confirmation safety means there must not be any other
valid spend of `U` at all.

## The one condition

The idea behind it is simple. A conflicting transaction can
only exist if the payer can make a valid spend on his own. So
the one condition you need, and it's also enough, is this.

During the acceptance window the payer must not be able to
create any valid transaction that spends the relevant UTXOs
without the service taking part. And this has to be enforced
with cryptography at the UTXO level.

## A Taproot output with two paths

The funds sit in a Taproot output with two ways to spend it.
The cooperative path works right away. It needs a signature
from the user and a signature from the co-signing key of the
service, it has no timelock, and it's used for all normal
spends.

The recovery path is for the user alone but it's delayed. It
needs only the user signature, it's enforced by
`OP_CHECKSEQUENCEVERIFY`, and it becomes valid after `N`
blocks. So the service never has custody, the user can always
get the funds back alone after the delay, and before the delay
is over nobody can spend alone.

## How acceptance works

Now let `U` be an output built like this. The acceptance works
in 5 steps. In step 1 the user builds a transaction `T` that
spends `U`, in step 2 the transaction goes to the service for
co-signing, and in step 3 the service checks its policy, so
destination, amount and fee.

In step 4 the service signs `T` exactly once for each outpoint
in `U`, and in step 5 the transaction gets broadcast. At this
point `T` is valid, no other valid transaction spending `U`
can exist, and whatever the mempool does doesn't matter
anymore.

So you can treat the transaction as authorized right away,
even though it's not confirmed yet.

## Four rules for the co-signer

The co-signing service has to hold 4 rules, and if it breaks
any of them the safety guarantee is gone. Rule 1 is one
signature per outpoint, so each UTXO gets signed at most once,
and this is tracked in durable state.

Rule 2 is sign and lock atomically, so signing and writing the
state happen as one step and parallel requests can never end
up with more than one signature. Rule 3 is commit to the whole
transaction, so the signature covers the full transaction
digest and there is no signing of just an intent.

Rule 4 is be aware of reorgs, so the state is not released
just because of one confirmation, and outpoints stay locked
until the reorg risk is acceptable.

## Timing

Timing matters too. The recovery path is enforced by a
relative timelock (`OP_CHECKSEQUENCEVERIFY`) that counts from
the confirmation of the parent output. So before confirmation
only the cooperative path is valid, and after confirmation the
delay has to be long enough that the cooperative spend can
still confirm even when fees are bad.

The service has to make sure the cooperative transaction will
most likely confirm before the recovery path opens, or it has
to accept that economic risk.

## Bitcoin to Lightning swaps

This fits Bitcoin to Lightning swaps really well. The
cooperative on-chain spend is the authorization, the Lightning
payment can start right after co-signing, and the on-chain
confirmation is the settlement.

Because no conflicting spend can exist during the cooperative
window, firing the Lightning payment at zero confirmations
doesn't open the service to double-spend risk from the payer.

## What it doesn't fix

But this only removes double-spend risk from the payer. It
doesn't remove the risk that the co-signer gets compromised,
that the service goes down, that confirmations take long, or
that miners censor the transaction. You have to deal with
those risks in operations.

## What you need

So safe zero-confirmation acceptance in Bitcoin only works if
you take away the payer's ability to create conflicting valid
transactions. You need mandatory co-signing at the UTXO level,
strict one-time signing per outpoint, and a delayed recovery
path the user can use alone.

Any approach that doesn't enforce these things can't give you
cryptographic zero-confirmation safety.
