---
title: "My agent needs tools, not more subscriptions"
seo_title: "My Agent Needs Tools, Not Subscriptions | emin.de"
description: "Why I want agents to buy useful tools one job at a time, what Bitcoin has to do with it, and why building faster does not remove my responsibility."
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
cover: "../../../media/my-agent-needs-tools-not-subscriptions/cover.png"
tags: ["AI agents", "Bitcoin", "micropayments", "L402", "x402", "self-custody", "Nuri"]
source_links:
  - { title: "Lightning Labs: L402", url: "https://docs.lightning.engineering/the-lightning-network/l402", note: "HTTP 402 with a payment challenge, a Lightning invoice and proof of payment for access." }
  - { title: "x402", url: "https://www.x402.org/", note: "An open protocol for internet native payments between clients and servers." }
  - { title: "treg.to", url: "https://treg.to", note: "A live example of a tool catalog priced per call. Catalog claims belong to the provider." }
  - { title: "21Rates", url: "https://21rates.com/about-us", note: "The other speaker's Bitcoin financial services comparison project, not mine." }
  - { title: "Nuri", url: "https://nuri.com", note: "The wallet I am building." }
tldr:
  - "I want my agent to find a useful tool and pay for one job, without another monthly subscription."
  - "L402 and x402 let software pay for access without another signup form."
  - "My hope is that agents might pay in dollars and save some of their budget in Bitcoin."
  - "AI lets a small team build more. I still own the responsibility for the wallet people use."
basically:
  berlin-keeps-changing: "My mother described Berlin as a city that lets new young people arrive and change it."
  i-still-like-the-little-tools: "I want agents to buy small, useful tools without opening a new subscription for each one."
  pay-for-the-job: "I would rather pay for one website scan than subscribe to a service my agent uses once."
  a-wallet-instead-of-another-form: "L402 and x402 let software pay for access without a person completing each checkout."
  one-agent-does-not-need-to-know-everything: "I want my everyday agent to buy specialist help when a task needs it."
  your-next-customer-might-be-an-agent: "An agent can discover a service mid job and buy the result, without the user ever opening a dashboard."
  agents-might-spend-dollars-and-save-bitcoin: "My hope is that agents might pay in dollars and save some of their budget in Bitcoin."
  the-input-still-defines-the-output: "AI can translate a real conversation, but the human input still defines the output."
  why-this-matters-for-nuri: "I am building Nuri as a wallet with banking services, rather than a bank holding the wallet."
  losing-a-service-should-not-mean-losing-the-money: "I want a failed payment provider to cost users convenience, not access to their wallet funds."
  its-my-app-so-its-my-responsibility: "Self-custody does not remove my responsibility for mistakes in the wallet I build."
  i-want-to-build-the-useful-part: "I want to build useful tools agents can pay for, without treating fast output as proof of safety."
---

## Berlin keeps changing

My mother always said the beauty of Berlin is that young people move here and change the city. Then new young people move here and change it again. I like that idea. A city where there is still room for somebody else to do something differently.

The Wall was still standing when I was born. It came down when I was two. There was all this empty space, and later there were people figuring out what to do with it.

I discovered Bitcoin in a shady bar with red lights where people were drinking and talking about how we were going to change the world. Room 77 was around the corner from where I lived. It was a place that aggressively pushed Bitcoin. You could get a beer and a burger there, and the signs on the bar said let's destroy the banks.

I have always been somewhere between product work and sitting in a basement writing code. That is still what I do. Now I spend a lot of time with agents, mostly Hermes, and building tools for them.

## I still like the little tools

Remember all those websites that did exactly one thing? Count words. Remove a background. Convert a PDF into a PNG. You needed something, you went there, and it did the job.

I love that kind of software. It has a purpose you can explain without a presentation.

Every agent needs a good set of tools. The tools depend on what you are trying to do, but the idea is the same. Somewhere there is a small service that does the particular thing you need.

I want to build more of these. I have been working on tools around paymentrequired.com, and I keep coming back to this idea of making useful things that an agent can find and use. I do not need every tool to become a whole application that somebody has to learn.

That is my preferred new economy right now. You make useful stuff. The agent needs something, it finds your service, and it does not need to subscribe and go through a form or all this kind of bullshit. The provider should get paid when the agent uses the tool. That is a much better fit than asking the person behind the agent to manage another subscription.

## Pay for the job

In a recent conversation, somebody showed me Scanly, the SEO scanning product he was building with his co-founder. They had started with their own Bitcoin comparison site, 21Rates, and built tools to help with its search visibility, then saw they could sell that to other people.

The examples were practical. Find a broken page. Notice that the rate on the home page disagrees with the rate somewhere else. His point was that conflicting information makes the site harder for an AI to trust. Tell the owner what needs fixing in normal language, instead of giving them another dashboard.

I would use that. I would point my agent at it if I could pay for a scan, or a blog post, or whatever specific job I needed.

I think we have an explosion of subscription services. I get why a company wants stable monthly revenue. Some customers use a service heavily, some barely touch it, and the price averages them out. But I do not see why every occasional job needs to become a monthly commitment.

If I know what one scan costs, my agent can decide whether that scan fits the job. That is the economy I would prefer to build for.

## A wallet instead of another form

The interaction I want is simple. My agent needs something. It finds a service. It has its own wallet, it sends a few satoshi, and it gets access to the result. If the result is useful, it keeps using that service. If it is not, it can look somewhere else.

There are protocols for the payment part already. With [L402](https://docs.lightning.engineering/the-lightning-network/l402), a service can answer a request with a payment challenge and a Lightning invoice. The client pays, then presents proof of payment to get access. [x402](https://www.x402.org/) is another protocol for software buying access over HTTP.

I showed him [treg.to](https://treg.to) as an example. It is like OpenRouter, but for tools. You top up a balance and pay per call.

I want to skip the part where I subscribe, fill in a form and learn an interface before getting one thing done.

## One agent does not need to know everything

Asking for the weather and working on a difficult biology problem are different jobs. I do not think it makes sense to expect one model to be equally good at everything, or to treat every answer as equally valuable.

The question is who decides. Maybe the useful setup is one fairly general agent that understands what I am trying to do. When the question gets specific, it asks a specialist service and pays for the help.

The specialist could be another model. It could also be a database, a scanner or a tool that does one operation well. I care about whether it gives my agent what it needs.

That is why I like small tools so much. You do not have to build the agent everybody uses. You can build the thing that an agent needs for one part of the work. If it does that well, there is a reason to come back.

## Your next customer might be an agent

The person I was talking to came from sales. He joked that this was the revenge of the salesman. He could describe what he wanted and get a website built, rather than wait for somebody like me to write it.

I came at the same question from the tools side. I was thinking about how my agent could buy a result from that service.

You will not even need to sell it anymore, because an agent finds the service while doing the job. Somebody talks to Claude, Claude searches the web, finds the tool and buys it for the user. The user does not have to become a customer of the dashboard first. That is what makes this interesting to me.

I do not think consulting disappears. People still want someone who understands their business and takes responsibility for the advice. You can keep that business and also make the useful operation available to software.

It is extremely early, but I would already be a customer for the per-job version.

## Agents might spend dollars and save Bitcoin

There is a hope among Bitcoiners that agents will eventually prefer Bitcoin for some of their activity. I find a more specific possibility interesting. Maybe they spend dollars and save in Bitcoin.

Imagine giving an agent a budget and telling it to produce the best possible outcome and survive as long as it can. The budget is how long the agent will be alive. Now it has to think about what it buys and what it keeps.

Maybe it decides to hold some Bitcoin rather than keep everything in dollars, because it wants an asset that might appreciate in the future. That could depend on where it operates, what it pays for and why.

Imagine a company five years from now with agents managing their own budgets. They might decide to put some of that money into Bitcoin. That is the hope I find interesting.

## The input still defines the output

We also talked about translating podcasts. Once it is good enough and cheap enough, I would like to hear a real conversation in Spanish, Japanese or Swahili, with the voices of the speakers cloned.

There are people who would prefer to listen in their own language. Knowing that AI made the translation does not necessarily make the conversation less interesting. There is still a real source underneath it.

That is different from generating content without much input. I do not believe a one-word prompt will give you the same uniqueness as a thought-through description of what you want. The input still defines the output. Better tools do not make your own ideas irrelevant.

## Why this matters for Nuri

The old Nuri was a German fintech combining banking services with Bitcoin. After it went bankrupt, I bought the brand and assets.

My father's name is Nuri, so I offered them one Bitcoin for the brand and the assets and that is what I paid. Not the bank with its deposits.

The idea changed from a bank with a wallet to a wallet with banking services.

That distinction matters to me. I want the wallet to be yours, and I want other companies to provide useful services around it. A card is a service. A way to send money into a local payment system is a service. They should not define whether you own your money.

This is connected to the tools idea. Different companies can provide different useful parts. I do not need to rebuild every payment system myself. I need to be very careful about what depends on whom, and about what happens when one of those parts stops working.

## Losing a service should not mean losing the money

I am uncomfortable with how much information a simple transfer can demand. You go to a bank for comfort and security, then find yourself explaining who sent you ten dollars and why you want to move it.

I want people to have another option. Peer-to-peer money is important to me because sending between wallets should not depend on one company's willingness to keep providing a service. Closing a wallet company should not mean locking its users out of their funds.

For Nuri, this is what I want to build toward. If a card provider disappears, your card stops working, but your wallet funds remain accessible. If a bank-transfer partner disappears, that should not make it the owner of the rest of your money.

I do not want people locked out of their money because a company stopped existing.

## It's my app, so it's my responsibility

We are two people. AI helps us get more done, but people are using it with real money. I spend most of my time writing code, reviewing code and testing it, rather than doing sales or posting on social media.

I know those other things matter to a business. But getting a lot of users does not help if I make a mistake that causes them to lose their money. When people lose funds because of somebody else's mistake, it's a fucking horror show.

Self-custody is not an excuse to say the whole thing is the user's responsibility. It's my fucking app, so it's my fucking responsibility when you use it.

A thousand bucks can matter as much to one person as a hundred thousand matters to somebody else. You do not know their living situation or what they need that money for. Money is the most important fucking thing. I think about that constantly. It does not make me sleep well.

I still believe bringing more people into self-custody is the right direction. That belief does not make the engineering less serious.

## I want to build the useful part

The part I am excited about is quite practical. Build something useful. Let an agent find it. Give it a way to pay for the job without turning that one job into a monthly subscription.

I can see how this helps a small team sell a very specific service. I can also see how much easier AI makes it to produce something that looks finished before you have checked whether it works.

For a website scan, I want the agent to be able to try another provider if the answer is bad. For a wallet, the consequences are different. A mistake with somebody's money is not fixed by generating a better answer afterwards.

I want the tools, and I want the payments between them. I am still the person responsible for what I choose to build with them.
