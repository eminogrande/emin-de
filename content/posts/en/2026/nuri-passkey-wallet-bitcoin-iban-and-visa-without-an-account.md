---
title: "Nuri Passkey Wallet: Bitcoin, IBAN and Visa Without an Account"
description: "How Nuri turns a single passkey into a self-custodial wallet for people, businesses and AI agents"
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
original_url: "https://medium.com/@em/passkey-wallet-bitcoin-iban-and-visa-without-an-account-5cd1c9a68a68"
---
How Nuri turns a single passkey into a self-custodial wallet for people, businesses and AI agents

**What Nuri is**

Every financial product you know runs on an account: you sign up, a provider maintains the account, and your money sits with them. Nuri removes that layer.

The foundation is a passkey — the same mechanism you already use to sign in to some services without a password. Technically it’s a key pair your device generates and stores in a secured chip, permanently bound to one specific website. Face ID or your fingerprint release that key when you use it.

From this passkey, Nuri derives the wallet. No account, no email, no password. And because the derivation produces the same result every time, nothing needs to be stored — there’s no database of user keys to steal, and no 24 words you have to keep safe.

A side effect of the website binding: a fake site can’t use the passkey. The browser simply won’t release it if the address doesn’t match. Phishing goes nowhere.

**Security without custody**

Payments require two signatures. The first comes from your passkey — only your device holds it. The second is Nuri’s safeguard, but it isn’t sitting on a Nuri server either: it only comes into existence when Nuri’s share is combined with material from you. So Nuri holds neither your key nor the second key in full. Your device alone can’t move money, and neither can Nuri.

Day to day, that second signature protects you — a stolen phone isn’t enough. And if Nuri ever ceases to exist, you’re not locked out: after a waiting period, you can reach your money on your own. That’s the difference from an exchange like Coinbase, where your balance effectively belongs to the provider.

**What’s running today**

Not roadmap — live: Bitcoin and Lightning, digital euros and dollars, swaps, a European IBAN, a US account with ACH, a Visa card. Plus local rails nobody else bothers with — mobile money in Tanzania, PIX in Brazil.

The real point: this isn’t a bank with a crypto feature bolted on. It all runs onchain, on the same wallet derived from your passkey. A euro arriving by SEPA lands directly with you — not in an account someone maintains on your behalf.

**The AI part**

AI assistants will be making payments soon enough: managing subscriptions, settling invoices, buying things. The open question across the industry is how you give software access to money without giving up control.

Nuri’s answer is already running at agent.nuri.com: temporary wallets with their own key, their own budget, defined recipients and an expiry date. Revocable at any time, without touching the main wallet. An assistant can prepare a payment — you approve it. That’s the market Nuri is aiming at, and Nuri is early.

**How this differs**

Cloudflare, Privy and Turnkey build wallet infrastructure for companies — there, the provider remains the starting point. Breez uses passkeys to replace the Bitcoin seed phrase, but only that. Nuri starts from user ownership and attaches the entire financial stack to it: Bitcoin, banking, card, AI permissions.

**About the name**

Nuri is the same brand as before — acquired from Bitwala, but rebuilt from scratch: new team, new technology. What carried over is the goal Bitwala set out with: self-custody, banking and Bitcoin for everyone. This time on a foundation that holds.

Nuri doesn’t secure your account — it makes the account unnecessary. The passkey *is* the wallet.
