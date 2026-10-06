---
title: "Open Banking for the Bitcoin and Stablecoin Cash Wallet Nuri"
description: "Nuri.com is a self-custodial Bitcoin and stablecoin cash wallet. Open banking would let you top up and pay by bank with one button, no IBAN copying."
date: "2026-03-11T10:58:25.257Z"
updated: "2026-03-11T10:58:25.257Z"
lang: "en"
category: "nuri"
format: "essay"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "medium"
third_party_summary: false
cover: "../../../media/open-banking-for-the-bitcoin-and-stablecoin-cash-wallet-nuri/01-7fd0f781.png"
voice_check:
  em_dash: 11
  unobserved: 83
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://medium.com/@em/open-banking-for-the-bitcoin-and-stablecoin-cash-wallet-nuri-0e73a53c8949"
---
![](../../../media/open-banking-for-the-bitcoin-and-stablecoin-cash-wallet-nuri/01-7fd0f781.png)

The IBAN is a bridge, not a feature.

[Nuri.com](https://nuri.com) is a self-custodial Bitcoin and Stablecoin Emoney Cash Wallet. Not a bank, not a neobank. A wallet.

Every verified user gets an IBAN. And that IBAN is not an account. It is a bridge between the old banking system and the blockchain. When someone sends a SEPA Instant transaction to your IBAN, e-money gets minted as stablecoins straight into your wallet.

When you want to send money out, stablecoins get burned and a SEPA Instant transaction goes out through the IBAN to whoever you pay. Mint in, burn out. The IBAN is just the pipe.

So there is no bank balance. There is no ledger entry sitting in some database at some bank. Your money lives on chain, in a wallet only you control.

The IBAN is only the way in and the way out. If Nuri disappears tomorrow, your money doesn't. That's the whole point.

Now, what's missing.

IBANs work. But IBANs are painful. You copy 20+ characters, switch apps, paste them into your banking app, confirm with 2FA, wait, and hope you didn't make a typo.

It's 2025 and we still do this. People don't want to do this. They want to press a button and be done.

This is exactly what open banking solves. Not as a product, as plumbing.

There are two use cases.

The first one is top up by bank. You open the Nuri app and click "Add Money". You get sent to your mobile banking app, you confirm the amount, done. The money lands in the wallet as stablecoins.

No IBAN copying, nothing to type, no jumping between apps. One button, one confirmation, and the money is there.

The SEPA Instant transaction still happens in the background, same as before, but you never see the IBAN. Open banking starts the payment and the blockchain settles it.

Every modern fintech does top ups like this. Nala does it for remittances. Revolut pushes it hard. We know people like it. The difference here is that the money doesn't land in a bank account. It gets minted into a self-custodial wallet. That's new.

The second one is pay by bank at checkout. More and more merchants offer "Pay by Bank" when you pay. It has lower fees than Visa, it settles instantly and there are no chargebacks. It's growing fast, and for good reasons.

We want Nuri users to be able to use this.

You shop online, pick "Pay by Bank", the link opens the Nuri app, you confirm the payment, and a SEPA Instant transaction goes from your IBAN to the merchant. Stablecoins burn, the merchant gets euros. Done.

You never leave the flow. No looking up an IBAN, no manual transfer, no friction. For the merchant it looks like any other open banking payment.

For you it looks like paying from a bank, except there is no bank. Just a wallet that speaks the same language.

What this really is, is deep linking between wallets and banks. Nothing more.

Open banking is not the product. The wallet is the product. Open banking is the layer that makes a wallet that lives on the blockchain behave like a bank account everywhere people expect a bank. Top ups, checkouts, payment links, all of it.

The IBAN already makes Nuri work with banks on the protocol level. Open banking makes it work with banks on the UX level. Together you get a wallet that feels just like a bank account in daily use, but is completely different under the hood.

No bank, no custody, no counterparty risk. Just a bridge that works both ways and a button that makes it invisible.

We want to roll it out in three stages.

Stage one is top up by bank. One button, money in. This alone removes the biggest friction for new users when they fund their wallet.

Stage two is pay by bank on payment links. Nuri already makes payment links where the person who pays can choose how, with crypto, stablecoin or bank transfer.

If we add a "Pay by Bank" button to this, the sender doesn't even need to be a Nuri user. They click, say yes in their own banking app, and the payment arrives as stablecoins in the merchant's wallet.

Stage three is full open banking checkout. Nuri users can pay anywhere that takes Pay by Bank. This needs a deeper integration, because the wallet has to be accepted as a valid place to start a payment in the open banking world.

Technically it works, a button triggers a SEPA Instant transaction from your IBAN. If the banks and providers accept a wallet that is not a bank, that's the open question.

Why this matters. Nobody said contactless payments would get big. Now nothing else exists.

People choose comfort and speed over everything. Every time. Copying an IBAN is not comfortable. Clicking a button is.

The users will tell us, but the bet is simple. If people can choose between copying 22 characters and pressing one button, they will press the button.

Open banking doesn't change what Nuri is. It changes how invisible the bridge becomes.

And this is how it works under the hood. Nuri is not a bank. Nuri is a self-custodial wallet for stablecoins and Bitcoin.

The banking rails are there because of Monerium, a regulated e-money institution, and Monerium connects to LHV Bank for the IBANs and for SEPA Instant.

Nuri plugs into Monerium, Monerium plugs into LHV. You never have a bank account. You have a wallet with a pipe attached.

When a SEPA Instant transaction arrives at your IBAN, Monerium mints EURe stablecoins straight into the wallet. When you send money out, EURe burns and Monerium starts a SEPA Instant transaction from the IBAN to the person you pay.

If a transaction fails or gets reversed, the stablecoins just go back to the wallet, same path, the other way around. There is no state in between.

Your money is either on chain in your wallet or on its way through the IBAN. The bridge works both ways, always.
