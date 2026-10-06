---
title: "AI Feature Code Review of Nuri.com"
description: "I let an AI read the Nuri Expo app code and list every feature a user sees. Bitcoin wallet, Euro card, IBAN banking, swap and the debug screens."
date: "2025-12-22T13:00:01Z"
updated: "2025-12-22T13:00:01Z"
lang: "en"
category: "nuri"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
voice_rewrite: "v1"
review_status: "draft-emin-voice"
source: "emino.app"
third_party_summary: false
cover: "../../../media/ai-feature-code-review-of-nuri-com/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 16
emin_check_pct: null
original_url: "https://emino.app/posts/ai-feature-code-review-of-nuri-com/"
tldr:
  - "An AI went through the Nuri Expo code and listed every feature a user can see."
  - "The core is a Bitcoin wallet, a Gnosis Pay Euro card and Monerium IBAN banking."
  - "Around that sit buying, sending, swapping, stateless signing and recovery."
  - "The result is a hybrid of crypto and normal Euro banking."
basically:
  what-i-asked-the-ai-to-do: "I let an AI read the Nuri Expo code and list every feature a user can actually see."
  the-three-core-products: "Three pillars: a Bitcoin wallet, a Gnosis Pay Euro card and Monerium IBAN banking."
  payments-and-sending-money: "Buy Bitcoin with Mercuryo or Apple Pay, send BTC or EURe, and keep an address book."
  signing-and-recovery: "Bitcoin signing without stored private keys, plus CSV export to get your account back."
  tabs-deep-links-and-security: "Three tabs, nuri:// deep links, phone checks, KYC, secure key storage and biometrics."
  debug-screens-and-swap: "Power users get debug modals for everything, and a swap between Bitcoin and EURe."
---
![](../../../media/ai-feature-code-review-of-nuri-com/cover.jpg)

## What I asked the AI to do

I let an AI go through the code of the Nuri Expo app and list every feature a user can actually see. This is what it found.

## The three core products

The core is three things. First the Bitcoin wallet. You can send and receive Bitcoin, it supports the Lightning network, you can scan QR codes to pay, and you see your Bitcoin balance and your transaction history. Second the Euro card, which runs on Gnosis Pay. It's a physical and a virtual debit card with a balance in EURe, the Euro stablecoin. You see the card transactions, you can add money to the card with a bank transfer and you can order physical cards. Third the fiat banking through the Monerium integration. That gives you IBAN transfers, your bank account details, Euro deposits and withdrawals, and a transaction history.

## Payments and sending money

Then there are the payment features. You can buy Bitcoin through the Mercuryo integration, also with Apple Pay, convert Euro to Bitcoin and see the price in real time. And you can send money. Bitcoin to other wallets, EURe via IBAN, wallet to wallet, and there is an address book.

## Signing and recovery

The more advanced part is stateless Bitcoin signing, so signing Bitcoin without private keys, with multi-signature support and extra security features. And CSV recovery, for backup and recovery, exporting your transactions and getting your account back.

## Tabs, deep links and security

For the user experience there are tabs. A Bitcoin tab (₿), a Card tab (€) and a Wallet or Deposit tab, with a navigation bar at the bottom. Deep links work too. nuri://bitcoin opens the Bitcoin screen, nuri://card the Card screen, nuri://monerium the banking debug, and the app handles the bitcoin: and lightning: URI schemes. For security and authentication there is phone verification, the KYC approval process, secure key storage and support for biometric authentication.

## Debug screens and swap

For power users there are debug screens. A Bitcoin debug modal, a Card debug modal, Monerium transaction debug, feature flags debug and network logging. And there is swap, Bitcoin to EURe and EURe to Bitcoin.

So basically the app is a hybrid of crypto and fiat banking. It combines Bitcoin with normal Euro banking, through Gnosis Pay cards and Monerium IBAN services.
