---
title: "Nuri Passkey Wallet, Bitcoin, IBAN and Visa Without an Account"
description: "How Nuri turns one passkey into a self-custodial wallet for people, businesses and AI agents, with no account in between."
date: "2026-08-05T20:10:21.065Z"
updated: "2026-08-05T20:10:21.065Z"
lang: "en"
category: "nuri"
format: "essay"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "medium"
third_party_summary: false
voice_check:
  em_dash: 11
  unobserved: 51
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://medium.com/@em/passkey-wallet-bitcoin-iban-and-visa-without-an-account-5cd1c9a68a68"
---
Nuri turns one passkey into a self-custodial wallet for people, businesses and AI agents.

Every financial product you know runs on an account. You sign up, a provider keeps the account for you, and your money sits with them. With Nuri we remove that layer.

It all starts with a passkey. That's the same thing you already use to sign in to some services without a password. Technically it's a key pair that your device creates and keeps in a secure chip, and it's bound forever to one specific website. Face ID or your fingerprint unlock that key when you use it. From this passkey Nuri derives the wallet. There is no account, no email and no password. And because the derivation gives the same result every time, we don't need to store anything, so there is no database of user keys that someone could steal and there are no 24 words you have to keep safe. Because of the website binding a fake site also can't use the passkey. The browser just won't release it if the address doesn't match, and so phishing goes nowhere.

Every payment needs two signatures. The first one comes from your passkey and only your device has it. The second one is Nuri's safeguard, but it doesn't sit on a Nuri server either. It only comes into existence when Nuri's share is combined with material from you. So Nuri holds neither your key nor the second key in full. Your device alone can't move money and Nuri can't either. Day to day that second signature protects you, because a stolen phone isn't enough. And if Nuri ever stops existing, you are not locked out. After a waiting period you can reach your money on your own. That's the difference to an exchange like Coinbase, where your balance in practice belongs to the provider.

This is live and not a roadmap. Bitcoin and Lightning, digital euros and dollars, swaps, a European IBAN, a US account with ACH and a Visa card. And also local rails that nobody else cares about, like mobile money in Tanzania and PIX in Brazil. The real point is that this is not a bank with a crypto feature added on top. It all runs onchain, on the same wallet that comes from your passkey. A euro that arrives by SEPA lands directly with you and not in an account that someone keeps for you.

AI assistants will make payments soon enough, they will manage subscriptions, pay invoices and buy things. The open question in the whole industry is how you give software access to money without giving up control. Nuri's answer already runs at agent.nuri.com. These are temporary wallets with their own key, their own budget, fixed recipients and an expiry date. You can revoke them any time and the main wallet is not touched. An assistant can prepare a payment and you approve it. That's the market Nuri is going for, and we are early.

Cloudflare, Privy and Turnkey build wallet infrastructure for companies, and there the provider is still the starting point. Breez uses passkeys to replace the Bitcoin seed phrase, but only that. Nuri starts from the user owning the wallet and attaches the whole financial stack to it, Bitcoin, banking, the card and AI permissions.

Nuri is the same brand as before. We acquired it from Bitwala, but we rebuilt it from scratch with a new team and new technology. What carried over is the goal Bitwala started with, self-custody, banking and Bitcoin for everyone. This time it's on a foundation that holds. Nuri doesn't secure your account, it makes the account unnecessary. The passkey is the wallet.
