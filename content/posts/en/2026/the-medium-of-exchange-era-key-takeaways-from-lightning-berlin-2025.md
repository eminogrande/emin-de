---
title: "The Medium of Exchange Era: Key Takeaways from Lightning++ Berlin 2025"
description: "Day one of Lightning++ Berlin 2025. Bitcoin as money you spend, AI agents paying in sats, lighter watchtowers and BitVMX."
date: "2026-01-15T09:40:01Z"
updated: "2026-01-15T09:40:01Z"
lang: "en"
category: "bitcoin"
format: "summary"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: true
cover: "../../../media/the-medium-of-exchange-era-key-takeaways-from-lightning-berlin-2025/cover.webp"
voice_check:
  em_dash: 3
  unobserved: 156
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/the-medium-of-exchange-era-key-takeaways-from-lightning-berl/"
tldr:
  - "Day one of Lightning++ Berlin 2025 was about Bitcoin as money people spend, not only digital gold."
  - "Markle's team processed 4,183 Lightning transactions in 8 hours, and he wants merchants to charge a fiat premium."
  - "Buick sees Bitcoin as the native currency of AI agents, and Lerner showed cheaper, more private watchtowers and BitVMX."
basically:
  michael-markle-on-spending-bitcoin: "Michael Markle wants merchants to stop giving Bitcoin discounts and start charging a fiat premium."
  roland-buick-on-bitcoin-for-ai-agents: "AI agents can't open bank accounts, so Lightning and Nostr Wallet Connect become their money API."
  sergio-lerner-on-watchtowers-and-bitvmx: "Sergio Lerner's design cuts watchtower storage to 2KB per state and hides channel IDs and amounts."
  the-panel-on-bringing-your-own-wallet: "Apps like Stacker News stop holding funds, and users bring their own wallet through NWC."
  what-this-means-for-a-business: "Charge more for fiat, give AI agents a Lightning API, and make payments something people can feel."
---
![](../../../media/the-medium-of-exchange-era-key-takeaways-from-lightning-berlin-2025/cover.jpg)

A summary of day one at Lightning++ Berlin 2025, with talks by Michael Markle, Roland Buick and Sergio Lerner and a panel with Zeus, Stacker News and Albi.

The message of the first day was that Bitcoin as only "digital gold", a passive store of value, is changing. The focus was Bitcoin as fast, programmable money that people actually spend, native both in physical shops and in the growing AI economy.

Here are the main talks, what changes on the tech side and the takeaways from the main stage.

## Michael Markle on spending Bitcoin

Michael Markle from BTC Inc. talked about the "hyper-bitcoinization" of the physical world, with real data from the Bitcoin 2024 Nashville conference.

Markle says Bitcoin follows the exact same path in history that time did as a concept. First it was a collectible, like ancient sundials, and that's early Bitcoin. Then a store of knowledge and value, like calendars and farming cycles, and that's where Bitcoin mostly is today. Then a medium of exchange, like clocks for coordinating the world, and that's the 15-year goal. And last a unit of account, global synchronization, the final stage.

Time needed 3,000 years to get to the final stage, but Markle thinks the internet squeezes this into roughly a 30-year window for Bitcoin.

He also had a radical idea for merchants. Stop giving Bitcoin discounts and start charging a fiat premium.

Fiat payments come with a lot of overhead, KYC for company shareholders, payment processor fees and complicated bookkeeping. Bitcoin settles instantly and without permission. If merchants charge more for fiat, the price shows what the legacy financial system really costs, and people get a reason to use the Lightning Network.

To show that Lightning scales at physical events, Markle's team set a Guinness World Record. They processed 4,183 individual Bitcoin transactions in an 8-hour window.

What made it fast enough was the Bolt Card, Lightning payments over NFC. And people loved the physical cues, the "coin ping" sound and the "laser eyes" on the POS terminals. That made spending digital money feel a lot easier.

## Roland Buick on Bitcoin for AI agents

Then the AI agent economy. Roland Buick from Albi explained why Bitcoin is the "native currency of AI".

We are moving from a world where humans use apps to a world where AI agents use protocols. AI agents can't easily open a normal bank account. The Lightning Network gives them a permissionless API for value that they can use natively.

Nostr Wallet Connect, NWC, is becoming the main bridge between apps and money.

Developers "write once and connect to many". Instead of integrating 50 different wallet APIs, they use NWC as the standard. And it's non-custodial by default. Apps don't need to hold user funds anymore, which means less regulatory risk. They just ask the user's connected wallet for permission to spend.

Buick also introduced the Model Context Protocol, MCP, which works like a "USB-C port" for AI models, and "Paid MCP" on top of it. With Bitcoin, AI agents can pay automatically for specific tools, real-time data or premium compute, per use. So you get a tiny-payments economy where machines pay other machines in satoshis with no human in between.

## Sergio Lerner on watchtowers and BitVMX

Sergio Lerner, CTO of Fairgate, gave the most technical talk of the day. It was about making the Lightning Network more private and cheaper to run for watchtowers.

Watchtowers stop fraud by watching for old channel states, and today they need huge amounts of storage. Lerner proposed a new design for payment channels with one-time signatures, OTS, where a watchtower only stores 2KB of data per state.

The design can also hide the channel ID and the amounts from the watchtower itself, a kind of privacy that off-chain scaling never had before.

BitVMX is a virtual CPU that lets Bitcoin run complex computations through a fraud-proof game. The logic, like BLS signatures or complex smart contracts, runs off-chain. Bitcoin only gets involved on-chain when there's a dispute. And it needs no soft fork. That matters, because it brings Ethereum-like programming to Bitcoin without changing the base layer protocol.

## The panel on bringing your own wallet

In the panel with Zeus, Stacker News and Albi, one theme kept coming back. Apps are moving toward user sovereignty, Bring Your Own Wallet, BYOW.

For years, connecting a phone wallet to a node at home needed Tor, and Tor is often slow and breaks a lot. The panel pointed to the move to Nostr for that, which is faster and holds up better when you control a node from far away.

And the walled gardens are ending. Apps like Stacker News are moving away from being custodians. With NWC, users bring their own liquidity and their own wallets, and the app is just a social interface on top of the Bitcoin network.

## What this means for a business

So what does this mean for a business? Stop waiting for adoption and give people a reason. Charge more for fiat.

Make your service work for AI. If it has no Lightning API, AI agents won't be able to buy from you in 2026.

UX is something you feel. Physical feedback like NFC cards, sounds and lights is what makes digital money feel real to normal people.

Watch BitVMX. This protocol may be the key to bringing DeFi and advanced smart contracts to Bitcoin and keeping its security.

More about Lightning++ Berlin 2025 and the next days on the [Lightning++ website](https://lightning-plus-plus.com).
