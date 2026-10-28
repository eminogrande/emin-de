---
title: "An agent can pick up the phone"
seo_title: "An agent can pick up the phone | emin.de"
description: "A real phone on the desk, two hundred tyre shops, and a wallet with a small budget. What it takes before an agent can do one boring job for money."
date: 2026-10-28
updated: 2026-10-28
lang: en
translations: {}
category: agents-ai
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: true
cover: ../../../media/an-agent-can-pick-up-the-phone/cover.png
tags: ["agents-ai", "bitcoin", "payments", "product", "open-source"]
source_links:
  - { title: "paymentrequired.com", url: "https://paymentrequired.com", note: "The tools discussed here, hosted under the old conference name." }
  - { title: "x402", url: "https://www.x402.org/", note: "HTTP 402 for machine payments, the protocol side of the wallet idea." }
  - { title: "L402 protocol", url: "https://docs.lightning.engineering/the-lightning-network/l402", note: "Lightning invoices as the payment half of an HTTP challenge." }
tldr:
  - "The interesting part of an agent is not the demo, it is the boring unlock step in front of it."
  - "A real phone adds steps a virtual test can miss."
  - "Paying per call turns an agent from a chat partner into a customer."
basically:
  the-boring-part-is-still-the-hard-part: "Every model swap retrains the same prompts. The week goes into tooling, not into the product."
  a-physical-phone-changes-the-test: "A virtual phone passes. A real one has to be unlocked first, and that is where it breaks."
  a-new-model-is-not-always-progress: "Rotating reviewers find new mistakes. They also throw away calibration. Nobody has settled it."
  give-the-agent-a-job: "My bot calls local offices for me. Boring, small, and easy to understand."
  two-hundred-tyre-shops: "Winter tyres in Berlin. The agent asks every workshop for a price and comes back with a Tuesday."
  the-call-is-easy-to-understand: "One action, one payment, one result. Nobody needs a diagram to follow a phone call."
  a-wallet-gives-the-agent-a-way-to-pay: "The agent gets a small budget and pays per call. That is the whole trick."
  why-i-bought-paymentrequiredcom: "A conference name that never happened left a domain behind. Now it hosts tools."
  the-website-should-not-look-dead: "A last post from two months ago reads as abandoned. Posting daily is a pulse, not traffic."
  open-source-instead-of-shouting-louder: "I would rather publish code and useful work than pay for louder distribution."
  a-small-piece-of-hardware: "A card or small USB key could give an agent a physical way to unlock a flow."
  build-something-people-can-use: "The only test that survives contact is a person finishing a task with it."
---
## The boring part is still the hard part

A model swap looks like a five minute job. Now every swap resets the same small things. Escape characters in prompts get broken. The agent mistypes the password vault unlock. A reviewer starts flagging the noise we had spent weeks telling it to ignore.

The interesting work is the agent part. The boring part eats the week.

You can argue for upgrading, and there is a good case for it. Newer models find mistakes the old one walked past. But if the tooling has to be retrained every other week, we are not testing the product, we are testing the model. That was my argument in the call and I still hold it. Give me one model that works and let it sit. It does not have to be the smartest thing released this month. It has to hold still long enough that a failure means something.

We keep buying speed and paying for it in repetition. A slower model that stays put would probably save us more time than the fastest one that needs a new setup every few weeks.

## A physical phone changes the test

A virtual phone can pass a flow. The app launches, the buttons are where the layout says they are, the flow ends on the right screen. That does not show whether a person can pick up a phone, unlock it, and get through the same flow without help.

In our test setup, the agent also has to unlock a password vault. One mistyped character can stop the run before anybody has learned anything about the app.

So the ask was simple. Attach a real phone to the machine and let it click the real screen. The hope was that it would be faster and closer to real use. It is also "ein echter test", not another phone running inside a virtual machine.

The fix we sketched is a card reader with a card sitting in it, so the unlock becomes one physical action instead of a password typed by a model. Rough, but closer to how a person actually holds a phone.

## A new model is not always progress

There are two positions here and neither one has won.

The first says rotate the reviewer. Every model has blind spots, and if the same one reviews everything, we only ever get its taste. A different model on Monday will find what last week's model missed.

The second says a review prompt is calibration work. We decided what has to be flagged, what may be ignored, and how much detail is worth reading. Swap the model and that calibration is gone. The review comes back either blind or so loud that nobody reads it.

Both are true in parts, which is why we have not settled it. What we did agree on is thinner. A review that only finds what we already suspected is not a review, it is a confirmation. The model has to be able to surprise us, otherwise the whole step is theatre.

I do not need to settle that argument before choosing the next test. I need to say what the review is supposed to catch, then see whether it catches it.

## Give the agent a job

My bot has been calling local offices for me. It works. It works so well that I stopped reading the transcripts, which is probably a mistake, but it is funny enough that I keep it running.

After an appointment request went out, the next step was a cron job to check on it. That is the whole thing. A number, a topic, a small request, and something that repeats on a schedule.

This is the part I like most. A phone call is easy to understand. There is a number, a request and an answer. If the agent gets through, I can see what happened without a capability diagram.

The work it does is small on purpose. A small job shows you the step that broke. A big job can hide ten broken steps behind one impressive screenshot.

## Two hundred tyre shops

There is an old idea I keep coming back to. Winter tyres, in Berlin, in autumn. I cannot do it myself, and calling workshops one after the other is exactly the kind of thing nobody wants to spend a Saturday on.

The version in my head is simple. The agent asks two hundred workshops what a changeover costs, collects the answers, and comes back with prices and a time.

That prompt is already written in my head, roughly. "ruf mal an und tu so, als ob du deine Sommerreifen zu Winterreifen wechseln lassen möchtest", find out the price. The agent calls, asks, writes down the answer, hangs up, and goes to the next shop.

The output is a list and a recommendation. The example answer in my head is Tuesday, five euro. Boring work, perfectly suited to a machine that does not get tired of repeating the same question.

It is still an idea in this conversation, not a product announcement.

## The call is easy to understand

When we had to pick a demo for the meetup, the options were a bank transfer, a pizza order and a phone call. The transfer is impressive if you already care about banking. The pizza needs a bank tool, a vault and a browser, three systems in a row, and any one of them can fall over on stage.

"anrufen finde ich auch gut". It is one action, one payment, one result, and the audience follows it without a slide. Someone in the room gets a call from an agent that has a budget and pays for the call itself. That last part is the point. It is not an agent borrowing my account, it is one with its own money and a reason to spend it.

The demo is also the argument. If the call costs something and the agent pays it, then the thing on stage is a customer. If it only runs because someone typed in an API key by hand, it is a puppet.

We had five minutes. A phone call leaves enough time to show the request, the payment and the result.

## A wallet gives the agent a way to pay

The flow is short. The agent gets a wallet, the wallet gets a small budget, and the agent spends from it. Then you give it a task that needs a paid endpoint.

That is what x402 and L402 are for. Both put a price on an HTTP request. A 402 comes back with the terms, the client pays, the request goes through. x402 handles a payment over HTTP. L402 combines a Lightning invoice with a macaroon that proves payment. The mechanics differ, the shape is the same.

What they buy is access. Not quality, not trust. A paid endpoint can still return nonsense, and an agent that pays will happily collect the nonsense. The protocol answers whether the request may run, not whether the source is any good. Judging the answer is a separate problem and mostly still a human one.

The interesting part is the budget. A small amount makes the example concrete. It also gives me a reason to think about spending limits before giving an agent a longer task.

## Why I bought paymentrequired.com

The name came before the site. I wanted to run a conference in Berlin and call it 402 payment required, and the domain was the obvious address for it. The conference never happened. The domain stayed.

The joke was not only the number. HTTP has had a status code for payment required for decades and almost nobody used it, because browsers could not pay. Agents can.

I have been building tools on that domain. A password vault, a browser the agent can drive, a remittance call. Each one is a small service, some free and some paid per use.

They let me try paying for individual calls on real services instead of only describing the idea in a post like this one.

## The website should not look dead

The last post on a site was two months old. People open it, see the date, and close it again. Nothing on the page is technically broken and the whole thing reads as abandoned.

So the rule is to post every day. Not because a daily post brings traffic, though it might. Because "Heartbeat-Liveness" is what a stranger checks before trusting a project. A pulse is cheap and the absence of one is loud.

I trained a model to make the kind of drawings I want for the blog. Now each post can get its own drawing in the same style.

A calendar row with something in it every day is a weak signal and a true one. The alternative, a quiet site with good archives, gets read as a site where somebody stopped.

## Open source instead of shouting louder

I do not believe in paid ads anymore. I would rather spend the effort on work people can inspect and recommend. Paid influencer placements do not convince me either. A recommendation means more when it comes from somebody who actually uses the thing.

What I want to push is slower. Put the code out in the open, publish what we build, go to the events where the people who care are standing in the same room. Agents finding the site is part of the same thing now, and it is closer to open source than to a campaign.

An open repository is also an honest one. Either the thing runs or it does not, and anyone can check without asking us. Recommendations come from people who used it and were not paid to say so.

This does not give me a neat campaign dashboard. It gives me something people can inspect, use and share.

## A small piece of hardware

I have a few blank cards that I want to test as hardware wallet cards. I have not flashed them yet, so the interesting part is the product idea, not a finished result.

A card already fits in a wallet. People know how to hold it and tap it. That makes it an interesting form factor for a small security device.

A USB-C stick could be even better. It goes into an Android phone or a laptop without a reader, and it could still offer NFC. I do not know yet which form factor wins.

The card, the stick, printing and distribution are still product decisions. First the basic thing has to work.

## Build something people can use

The thing under all of this is not agents. It is whether a person can get from a problem to a result without learning our internals.

That is why the phone on the desk matters more than the benchmark. The phone is where a normal task lives, and a task that needs a human to rescue it every third step is a demo, not a tool.

Paying per call is the other half of the same idea. An agent with a budget can buy one small thing and finish. An agent with nothing has to be handed a key, and then it is back to being a feature of my laptop.

The direction for our own endpoints is the same, gates with x402 or L402, a price per call instead of an account per caller. It is a design we are building toward, not something already switched on everywhere.

What I want is dull and specific. An agent that calls a workshop and comes back with a price. A person who reads the result and goes on Tuesday. Nobody has to be impressed for that to be worth the work.
