---
title: "Transaction Analysis of 34yCReBo...jtVM"
description: "A look at one NEAR transaction on Paras, what mt_transfer_call does, what NEP-245 is and why the fee was almost nothing."
date: "2026-02-09T10:40:01Z"
updated: "2026-02-09T10:40:01Z"
lang: "en"
category: "payments"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/comprehensive-transaction-analysis-34ycrebo-jtvm/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 53
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/comprehensive-transaction-analysis-34ycrebo-jtvm/"
---
![](../../../media/comprehensive-transaction-analysis-34ycrebo-jtvm/cover.jpg)

# Transaction Analysis of 34yCReBo...jtVM

This is one transaction on NEAR, and I go through it in six short parts, from who sent it to what it means.

The transaction hash is 34yCReBoTyb12hH33xVdydoNJE5s58Kb1VeWYwY7jtVM and it ran on NEAR Protocol mainnet. The status is success and it's finalized. The signer, so the sender, is v4v.near, and the receiver contract is x.paras.near, which is the main Paras marketplace contract.

The gas limit was 300 TGas, and that is just the maximum of computing units that were set aside, so there is no dollar value for it. The gas actually used was 15.42 TGas, about $0.00008. The transaction fee, the cost paid to the validators to process the call, was 0.001542 NEAR, so less than $0.01. And there was an attached deposit of 1 yoctoNEAR, worth about $0.0000...01, which is a security requirement for asset transfers.

## What mt_transfer_call does

The transaction ran `mt_transfer_call`, a multi-token transfer and call. It's a high-level function that does two things at once. The transfer part moves ownership of a specific asset, defined by NEP-245, from the sender to the receiver. And the call part tells the receiving contract to do a second action right away, for example list the item for sale or stake it.

NEP-245 is the NEAR version of ERC-1155 on Ethereum. It's built to be a Swiss Army knife for digital assets, and that is why it was used here. Instead of having different standards for one-of-a-kind items, the NFTs, and for stackable items, the fungible tokens, NEP-245 handles both in one contract. It also allows semi-fungible editions. If an artist releases 100 identical copies of a digital card, NEP-245 tracks them as one ID with a balance of 100 and not as 100 separate unique entries. And it makes things cheaper, because batch transfers are possible, so you can move 50 different items for one transaction fee.

## Inside the transaction

The standard in the event log is `nep245` and the event is `mt_transfer`, and the logic inside ran in four steps. First the contract checks that the sender (`v4v.near`) owns the `token_id`. Then it checks that the 1 yoctoNEAR deposit is there, as a security check. In step three the balance of the `token_id` is taken from the sender and added to the receiver. And at the end the `on_mt_transfer` callback is triggered on the receiver contract to confirm it has accepted the assets.

So this was a cheap and efficient move of a digital asset on the Paras marketplace. You paid a tiny fee of about $0.00008 to move a token that uses the newer NEP-245 standard, and because of that the marketplace could see the transfer right away and handle the next step, most likely a trade or a listing.
