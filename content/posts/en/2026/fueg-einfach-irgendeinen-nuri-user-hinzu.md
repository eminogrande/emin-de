---
title: "Just add any Nuri user"
description: "Referrals, guardians, inheritance, multisig and saving together all become one feature at Nuri. You add a username in the settings, and everything else follows from that."
date: "2026-10-18"
updated: "2026-10-18"
lang: en
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-hinzu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-hinzu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["My idea for Nuri is a single feature: you add someone's username in the settings.", "From that you get referrals, guardians, inheritance, multisig and saving together, depending on what you allow.", "The fee lives in our frontend, open in the source code, and you set it yourself anywhere between 0 and 21 percent."]
sections: [{"basically": "At Nuri, referrals, guardians, inheritance and multisig become one feature. You add a username in the settings."}, {"basically": "If you add a friend on Nuri, you split the fee with them. With 10 people it gets split 10 ways."}, {"basically": "Every payment sends your people a few sats and a push notification. That's what makes Nuri go viral."}, {"basically": "With an expanding multisig, your guardians' keys only become active once you've lost your own."}, {"basically": "A guardian helps you recover your key. An heir only gets access after you haven't touched anything for a year."}, {"basically": "Nuri doesn't take the fee at the provider level, it takes it in its own frontend, open in the source code."}, {"basically": "On Nuri you set your own fee, from 0 to 21 percent. At my parties, donations brought in five times as much."}, {"basically": "Every API call at Nuri becomes a small x402 or L402 payment. That solves the fee problem."}, {"basically": "Nobody understands multisig. Three people and a hardware wallet, everybody gets that. That's how we explain Nuri."}, {"basically": "Step one at Nuri is just a friend in the settings who earns alongside you. Everything else builds on that."}]
---
I think I solved something pretty well this morning. It's a feature for Nuri. Here's the idea.

## One feature instead of five

I want to pack multisig, guardians, inheritance and referral into one feature. And here's how it works. I just add your username in the settings of my app. That's it.

The moment I do that, you get 50 percent of the fees I pay to Nuri. At the same time, you can be my guardian. That means you help me recover my account in the future with your passkey. You can also go into the wallet as a co-signer. Or we're a company and want a multisig wallet together.

These are all different features. But they're all based on the same frontend feature. Just add any Nuri user.

## The fee gets split

The fees I pay to Nuri, we just set them at something like 2.1 percent for now. Every time I make a payment, half goes to Nuri and the other half goes to the person I added.

You can also add 10 usernames. Then you have a wallet with 10 people, and the fees get divided by 10. All your new people automatically get a cut, and Nuri gets one tenth.

You could of course add each other, then it goes back to me. We have to make sure we don't build a loop there. That obviously can't work.

## My mom gets 17 satoshi

Bitcoiners want to get other people to become bitcoiners. Now I can invite my mom. And she gets a push notification every time I make a payment. You just got 20 satoshi. You just got 17 satoshi.

I know this from myself. With another service, I get a Telegram message every time a swap happens, and it says I just earned 10 satoshi. That's the most viral thing I've ever experienced for myself. It's funny, and you kind of give each other a little money.

With Arkade we can also send 1, 2, 3, 4 or 5 satoshi around without a fee. And that also shows a bit how awesome Arkade is at that point.

## Expanding instead of decaying multisig

The keys we add do the opposite of what we usually do at Nuri. If we don't want them to be signers from the start, then it's not a decaying multisig, but an expanding multisig.

That means if I lose all my keys, then after some time, a year or so, my guardians' keys activate automatically. You can do that with Bitcoin. With Ethereum it's probably harder, but that should work too.

And of course, these are settings you can configure. Nobody should get to your money just because you didn't move your bitcoin for a year.

## Guardian and inheritance

Guardian is one feature. I'd like to do it exactly like Bitkey. They somehow built it so your guardians can help you recover your key, but have no access to your money. How exactly they did that, we still have to look at.

The other feature is inheritance, and that's extremely important. For example, I want to enter my sister as my heir. Every time I make a payment, a counter gets reset to zero. And if something should happen to me, for whatever reason, I don't wake up the next day, then she gets activated automatically after a year and has access to my funds. Something like that is insanely important and insanely cool.

## The fee lives in the frontend

Even more important is where the fee lives. Today we take it at the providers, and that's a mistake. We should set the fee at the providers to zero everywhere and take it ourselves, in the frontend or in our backend. Behind Nuri there can be ten million providers, doesn't matter at all. They take their spread and their fee, and we don't add anything on top of theirs.

That way we can distinguish between Nuri fee and partner fee. That's just clean. And I want to show people in the open source code, look, here's the fee, it's in the source code. I want us to be the most transparent company in the world.

My favorite story for this is the outcry in the Aave community when the swap provider was switched in the background. That shows you that backends don't have power anymore, frontends do. Whoever has the users has the moat.

## Set your own fee

We even let people set the fee themselves. Just out of fairness. If you don't want to pay fees, you can go to 0 percent. But you can also go to 21 percent if you want. And if someone asks, why do you take 2 percent, we say, go into the settings and change it.

Why do I think this works? Because of my parties in Berlin. No matter what entrance fee I charged and no matter what price for beer, people somehow never thought it was cool. At some point we said, fuck it, donation for beer, donation for entry. We made about five times the money.

If you give people the option to set it themselves, there are also people who set it significantly higher. Because they think the gamification is awesome or because they're in it for the mission. There are the rich and the poor, the penny pinchers and the others. For people I meet at a conference and add to my account, I'd set my fee to 21 percent. Then they automatically get my split.

## Every call is a small payment

I have an even better idea for how we take the fee. We just gate the Nuri API with micropayments, and the micropayments are our fees. Every operation in the app then costs a small x402 or L402 payment. L402 if it has something to do with Bitcoin, x402 if it has something to do with crypto.

An example. Saving or reading a new password in your Nuri password manager costs like 0.1 cents or 1 cent. And we can take that directly from the wallet because it's agentic. I'm already doing that with the router. You can use it with a token or you pay for the calls, and we can give every single endpoint a different price.

Then you don't have to build your own fee system. Anyone can integrate our API wherever they want, and we automatically get the payments. I'd start with the contact book, 0.1 cents every time you add a contact. If that works, we expand it to the whole app. One feature at a time.

## Family wallet and hardware wallets

Once people have experienced how a Safe wallet works, like the one we have as a company, they think it's really cool. I have one key, but we can only pay together. That's a really awesome crypto experience.

Or a family wallet. My mom, my sister and me. Two of us are enough to pay together. Nobody can imagine multisig. But saying we're three people and one hardware wallet, or we're five people and one AI, everyone understands that.

And we stick to the principle that nobody else pulls off. One-click face ID wallet. Seedless, no seed phrase, phishing-resistant, multisig by default.

## The first step

We take it really slow. The first step is just that I can add a friend as my padawan in the settings and they automatically get something. Then we see in our database who added whom and which swaps happened, and pay out the referrals.

And when you send something, we should have autocomplete for all Nuri users. Not just your contacts, but simply everyone. I type L and find all the people with L, just like PayPal.

Later comes key rotation, adding and removing keys, and a hardware wallet on top. We have to do all that anyway. But vision-wise, I think this is absolutely perfect. Because it's such an insanely viral feature that you can earn along with the other person or be their co-signer.
