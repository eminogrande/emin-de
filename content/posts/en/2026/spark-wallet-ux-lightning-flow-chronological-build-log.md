---
title: "Spark wallet UX and the Lightning flow, a build log"
description: "I wanted the Spark wallet to look exactly like the existing Bitcoin screen, with minimal code and no duplicate or legacy code. I also set strict..."
date: "2026-01-09T14:25:01Z"
updated: "2026-01-09T14:25:01Z"
lang: "en"
category: "building"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/spark-wallet-ux-lightning-flow-chronological-build-log/cover.webp"
voice_check:
  em_dash: 8
  unobserved: 69
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/spark-wallet-ux-lightning-flow-chronological-build-log/"
tldr:
  - "I wanted the Spark wallet to look exactly like the existing Bitcoin screen, with minimal code and no duplicates."
  - "Receive, send, LNURL, Lightning addresses and Spark to L1 withdrawals now work, with caching to kill the loading delays."
  - "No git commands and no tests, and every change needed my approval first."
basically:
  making-spark-look-like-bitcoin: "Same styling, spacing and buttons as the Bitcoin screen, plus automatic claiming of pending transfers."
  the-receive-screen: "Address on top, QR in the same place, and a sats field with a Create Invoice button."
  killing-the-loading-delays: "Cache the deposit address and balance, load from cache, refresh in the background."
  send-lnurl-and-lightning-addresses: "Every send gets a confirm screen, and LNURL and Lightning addresses resolve to invoices."
  sending-to-a-normal-bitcoin-address: "An onchain address routes to a Spark withdrawal at medium exit speed instead of Lightning."
  refinements: "Invalid input gets cleared and highlighted, and a valid prefill focuses the amount field."
  how-i-worked-with-the-agent: "The Bitcoin screen was the exact target. I caught every mismatch and asked for a 1:1 copy."
---
![](../../../media/spark-wallet-ux-lightning-flow-chronological-build-log/cover.jpg)

# Spark wallet UX and the Lightning flow, a build log

I wanted the Spark wallet to look exactly like the existing Bitcoin screen. Keep the code minimal. No duplicate code and no legacy code. I also set strict process rules for the agent. No git commands. No tests. Approval from me before anything gets implemented. Short and precise answers. The receive and send flow should mirror the Bitcoin UI and support Lightning invoices and LNURL. Later it should also support onchain withdrawals from Spark.

Here is how it went, in order.


## Making Spark look like Bitcoin

The first goal was simple. screens/SparkBitcoinWalletScreen.tsx should look like screens/BitcoinScreen.tsx. So we aligned the Spark screen styling, spacing, typography and button layout to the Bitcoin screen. The receive and send buttons now match exactly.

We also changed one behavior. The Spark screen now checks for pending transfers by itself and claims them into the Spark wallet automatically.

The Apple Pay button in the header stayed. It has a placeholder so we can pass the Spark deposit address to it later.


## The receive screen

Next I wanted the Spark receive screen to match the Bitcoin receive screen layout. We changed screens/SparkBitcoinReceiveModal.tsx. The address is now at the top. The QR code sits in the same place as on Bitcoin receive. Share and tap to copy work like in the Bitcoin UI.

For creating an invoice there is now a sats input field. It is styled like the amount input on Bitcoin send. Under it there is a euro line, also for parity. The button now says “Create Invoice”.

Before you create an invoice you see the deposit address and no invoice QR. After you create one you only see the invoice and the invoice QR, in the same style.


## Killing the loading delays

The screen had long loading delays. I wanted them gone. We now cache the Spark deposit address and the balance. The Spark screen loads from the cache first and refreshes in the background.


## Send, LNURL and Lightning addresses

The send flow should mirror the Bitcoin send flow, with a final confirmation step. Scan or paste now moves into screens/SparkLightningSendModal.tsx. The sender always sees a confirm screen before any payment goes out. If an invoice has zero amount, we ask for the amount instead of sending.


Then we added support for LNURL pay and Lightning address inputs. There is a new service, services/SparkLnurlService.ts. It normalizes inputs and strips the lightning: prefix. It resolves the LNURL pay request with resolveLnurlPayRequest. And it requests the invoice from the LNURL callback with requestLnurlInvoice.

In screens/SparkLightningSendModal.tsx the send modal now accepts LNURL bech32, LNURL URLs and Lightning addresses. The amount is clamped to the LNURL minimum, and the minimum is filled in automatically. Network errors are hidden from the user UI. We keep them for the logs. If the input is invalid we clear the prefill and highlight the request input. We do not show invalid data.


## Sending to a normal Bitcoin address

I also wanted sends to a “normal Bitcoin address”, so Spark → L1. We updated services/SparkBitcoinWalletService.ts. withdrawToBitcoinAddress uses Spark getWithdrawalFeeQuote + withdraw. The default exit speed is ExitSpeed.MEDIUM. The logs truncate the address for safety.

The screen logic in screens/SparkBitcoinWalletScreen.tsx changed too. handleConfirmSend detects an onchain address. Then it routes to withdrawToBitcoinAddress instead of payLightningInvoice. After the withdraw it refreshes the Spark balance and the pending deposits.


## Refinements

After that I asked for a few refinements. If paste or scan is not a valid invoice, address or LNURL, the input is cleared and highlighted. After a valid prefill the amount input gets focus automatically. The cursor stays at the end of the amount and the number pad opens right away. The amount block is vertically centered between the header and the CTA. The header shows the memo if there is one. Otherwise it says “Send Lightning”, or “Send Bitcoin” for onchain.


## How I worked with the agent

I gave clear visual comparisons. The Bitcoin screen was the exact target. When the UI did not match, with the icon or the padding or the layout, I caught it fast and asked for a 1:1 copy. I put minimal code first, and “no fallback” logic. I approved every change step by step and cleared up the edge cases. Zero-amount invoices should prompt. LNURL is pay only for now. Network errors should not reach the user. And I kept pushing for the same UX flow everywhere, especially around confirmation, validation and amount entry.

There are things we did not do. No git commands. No tests, I asked for that explicitly. No changes to the original Bitcoin screen.


The Spark wallet UI now matches the Bitcoin screen layout. The receive modal matches the Bitcoin receive flow, with the Spark deposit address and invoice creation. The send modal supports Lightning invoices, LNURL, Lightning addresses and onchain BTC addresses. Invalid input never pre-fills, and the amount flow is focused and centered. The Spark balance and deposit address are cached, so the UI is faster.
