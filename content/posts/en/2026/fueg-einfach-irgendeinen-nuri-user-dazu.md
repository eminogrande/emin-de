---
title: "Just add any Nuri user"
description: "Referral, guardian, inheritance, multisig and shared saving become one feature at Nuri. You add a username in the settings, everything else follows from that."
date: "2026-10-18"
updated: "2026-10-18"
lang: en
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-dazu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-dazu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["My idea for Nuri is a single feature. You add someone's username in the settings.", "From that follow referral, guardian, inheritance, multisig and shared saving, depending on what you allow.", "The fee sits with us in the frontend, open in the source code, and you set it yourself between 0 and 10 percent."]
sections: [{"basically": "At Nuri, referral, guardian, inheritance and multisig become one feature. You add a username in the settings."}, {"basically": "Anyone who adds a friend on Nuri shares the fee with them. With 10 people it gets divided by 10."}, {"basically": "Every payment sends your people a few satoshis and a push notification. That makes Nuri go viral."}, {"basically": "With an expanding multisig, your guardians' keys only become active once you have lost your own."}, {"basically": "A guardian helps you recover your key. An heir only gets access once you have done nothing for a year."}, {"basically": "Nuri does not take the fee from the providers, but in its own frontend, open in the source code."}, {"basically": "At Nuri you set your fee yourself, from 0 to 10 percent. At my parties, donations brought in five times as much."}, {"basically": "Every API call at Nuri becomes a small x402 or L402 payment. That solves the fee problem."}, {"basically": "Nobody understands multisig. Three people and a hardware wallet, everyone understands. That is how we explain Nuri."}, {"basically": "Step one at Nuri is just a friend in the settings who earns along. Everything else builds on that."}]
---
I think I solved something pretty good this morning. It's about a feature for Nuri. That's the idea for now.

## One feature instead of five

I want to pack multisig, guardians, inheritance, and referral into one feature. And here's how it works. I simply add your username in my app's settings. Nothing more.

The moment I do that, you get 50 percent of the fees I pay to Nuri. You can simultaneously be my guardian. That means you help me recover my account in the future with your passkey. You can also go into the wallet as a co-signer. Or we're a company and want to have a multisig wallet together.

These are all different features. But they're all based on the same frontend feature. Just add any Nuri user.

## The fee gets split

The fees I pay to Nuri, we'll set them at something like 2.1 percent for now. Every time I make a payment, half goes to Nuri and the other half goes to the person I added.

You can also add 10 usernames. Then you have a wallet with 10 people, and the fees get divided by 10. All of your new people automatically get a cut, and Nuri gets one tenth.

You could of course also add each other, then it goes back to me again. We need to make sure we don't build a loop there. That obviously won't work.

## My mom gets 17 satoshi

Bitcoiners want to get other people to become bitcoiners. Now I can invite my mom. And she gets a push notification every time I make a payment. You just got 20 satoshi. You just got 17 satoshi.

I know this from myself. With another service, I get a Telegram message every time a swap happens, and it says I just earned 10 satoshi. That's the most viral thing I've ever experienced for myself. It's funny, and you kind of give each other a bit of money.

With Arkade we can also send around 1, 2, 3, 4, or 5 satoshi without a fee. And that also shows a bit how awesome Arkade is in that regard.

## Expanding instead of decaying multisig

The keys we add do the opposite of what we usually do at Nuri. If we don't want them to be signers from the start, then it's not a decaying multisig, but an expanding multisig.

That means if I lose all my keys, then after a period of time, a year or so, my guardians' keys activate automatically. You can do that with Bitcoin. With Ethereum it's probably harder, but that should work too.

And of course, these are settings you can configure. Nobody should get to your money just because you didn't move your bitcoin for a year.

## Guardian and inheritance

Guardian is a feature. I'd like to do it exactly like Bitkey. They somehow built it so your guardians can help you recover your key, but don't have access to your money. We still need to look at how exactly they did that.

The other feature is inheritance, and that's extremely important. For example, I want to enter my sister as my heir. Every time I make a payment, a counter gets reset to zero. And if something should happen to me, for whatever reason, I don't wake up the next day, then she gets automatically activated after a year and has access to my funds. Something like that is incredibly important and incredibly cool.

## The fee lives in the frontend

Even more important is where the fee lives. Today we take it from the providers, and that's a mistake. We should set the fee to zero everywhere with the providers and take it ourselves, in the frontend or in our backend. Behind Nuri there can be ten million providers, doesn't matter at all. They take their spread and their fee, and we don't add anything on top of theirs.

This lets us distinguish between Nuri fee and partner fee. That's just clean. And I want to show people in the open source code, look, here's the fee, it's in the source code. I want us to be the most transparent company in the world.

My favorite story for this is the outcry in the Aave community when the swap provider was switched in the background. That shows you that backends don't have power anymore, but frontends do. Whoever has the users has the moat.

## Set your own fee

We even let people set the fee themselves. Simply out of fairness. If you don't want to pay any fees, you can go to 0 percent. But you can also go to 10 percent if you want. And if someone asks, why are you taking 2 percent, then we say, go into the settings and change it.

Why I believe this works comes from my parties in Berlin. No matter what entrance fee I charged and no matter what price for beer, people somehow never thought it was cool. At some point we said, fuck it, donation for beer, donation for entrance. We made about five times the money.

When you give people the option to set it themselves, there are also people who set it significantly higher. Because they think the gamification is awesome or because they're in it for the mission. There are the rich and the poor, the penny-pinchers and the others. For people I meet at a conference and add to my account, I would set my fee to 10 percent. Then they automatically get my split.

## Every call is a small payment

I have an even better idea for how we take the fee. We simply gate the Nuri API with micropayments, and the micropayments are our fees. Every operation in the app then costs a small x402 or L402 payment. L402 when it has to do with Bitcoin, x402 when it has to do with crypto.

An example. Saving or reading a new password in your Nuri password manager costs like 0.1 cents or 1 cent. And we can take that directly from the wallet because it's agentic. I'm already doing this with the router. You can use it with a token or you pay for the calls, and we can give every single endpoint a different price.

Then you don't have to build your own fee system. Anyone can integrate our API wherever they want, and we automatically get the payments. I would start with the contact book, 0.1 cents every time you add a contact. If that works, we expand it to the whole app. One feature at a time.

## Family wallet and hardware wallets

Once people have experienced how a Safe wallet works, like the one we have as a company, they think it's really cool. I have one key, and we have to be together. That's a really awesome crypto experience.

Or a family wallet. My mom, my sister, and me. Two of us can be together. Nobody can imagine what multisig means. But saying we're three people and one hardware wallet, or we're five people and one AI, everyone understands that.

And we stick with the principle that nobody else can pull off. One-click-face-ID wallet. Seedless, no seed phrase, phishing-resistant, multisig by default.

## The first step

We are taking it really slow. The first step is just that I can add a friend as my Padawan in the settings, and they automatically get something. Then we see in our database who added whom and which swaps happened, and we pay out the referrals.

And when you send something, we should have autocomplete for all Nuri users. Not just your contacts, but simply everyone. I type L and find all the people with L, just like with PayPal.

Later we add key rotation, adding and deleting keys, and a hardware wallet. We have to do all of that anyway. But in terms of vision, I think this is absolutely perfect. Because it is such an insanely viral feature, that you can earn along with the other person or be their co-signer.
