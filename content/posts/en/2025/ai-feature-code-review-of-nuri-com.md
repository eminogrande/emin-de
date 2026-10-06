---
title: "AI Feature Code Review of Nuri.com"
description: "Based on my analysis of the Nuri Expo app, here are all the user-facing features:"
date: "2025-12-22T13:00:01Z"
updated: "2025-12-22T13:00:01Z"
lang: "en"
category: "nuri"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/ai-feature-code-review-of-nuri-com/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 16
emin_check_pct: null
original_url: "https://emino.app/posts/ai-feature-code-review-of-nuri-com/"
---
![](../../../media/ai-feature-code-review-of-nuri-com/cover.jpg)

Based on my analysis of the Nuri Expo app, here are all the
user-facing features:

Core Features

1. Bitcoin Wallet

Send/receive Bitcoin transactions
Lightning network support
QR code scanning for payments
Bitcoin balance display
Transaction history

2. Euro Card (Gnosis Pay)

Physical and virtual debit card
EURe (Euro stablecoin) balance
Card transactions history
Add money to card via bank transfer
Order physical cards

3. Fiat Banking (Monerium Integration)

IBAN transfers
Bank account details
Euro deposits/withdrawals
Transaction history

Payment Features

4. Buy Bitcoin

Mercuryo integration for purchasing Bitcoin
Apple Pay support
Euro to Bitcoin conversion
Real-time price display

5. Send Money

Send Bitcoin to wallets
Send EURe via IBAN
Wallet-to-wallet transfers
Address book functionality

Advanced Features

6. Stateless Bitcoin Signing

Advanced Bitcoin signing without private keys
Multi-signature support
Enhanced security features

7. CSV Recovery

Backup and recovery functionality
Transaction export
Account recovery options

User Experience

8. Multi-Tab Navigation

Bitcoin tab (₿)
Card tab (€)
Wallet/Deposit tab
Bottom navigation bar

9. Deep Link Support

nuri://bitcoin - Bitcoin screen
nuri://card - Card screen
nuri://monerium - Banking debug
bitcoin: and lightning: URI schemes

10. Security & Authentication

Phone verification
KYC approval process
Secure key storage
Biometric authentication support

Debug & Advanced (Power Users)

11. Debug Screens

Bitcoin debug modal
Card debug modal
Monerium transaction debug
Feature flags debug
Network logging

12. Swap Features

Bitcoin to EURe conversion
EURe to Bitcoin conversion

The app is essentially a hybrid crypto/fiat banking solution that
combines Bitcoin functionality with traditional Euro banking through
Gnosis Pay cards and Monerium IBAN services.
