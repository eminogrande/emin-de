---
title: "Who Goes to Jail When the Agent Does It?"
seo_title: "Who Goes to Jail When the Agent Does It? | emin.de"
description: "My agent bought DHL postage for an eBay sale. Who is responsible when an agent acts, and why hard wallet limits are a better answer than blame after the fact."
date: 2026-10-30
updated: 2026-10-30
lang: en
translations: {}
category: agents-ai
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: true
cover: "../../../media/who-goes-to-jail-when-the-agent-does-it/cover.png"
tags: ["agents-ai", "bitcoin", "payments", "self-custody", "Nuri", "x402", "L402"]
source_links:
  - { title: "Full Stack London by Wirex", url: "https://wirexapp.com/full-stack-london", note: "Event date, venue and programme." }
  - { title: "Wirex Agents", url: "https://wirexapp.com/post/wirex-agents-enabling-ai-driven-stablecoin-cards-and-autonomous-micropayments", note: "Wirex's infrastructure for agents with stablecoin cards and accounts." }
  - { title: "Wirex joins Visa Agentic Ready", url: "https://wirexapp.com/post/wirex-joins-visa-agentic-ready-programme-to-enable-ai-driven-payments", note: "The June 2026 issuer announcement." }
  - { title: "AI Agent Accountability Act", url: "https://hawley.senate.gov/senators-hawley-murphy-announce-bipartisan-ai-agent-accountability-act", note: "The US senators' announcement and proposed liability rules." }
  - { title: "Legal risks mount for AI companies", url: "https://cryptobriefing.com/legal-risks-ai-companies-agent-hacking", note: "Reported agent breaches and the absence of criminal charges in those incidents so far." }
  - { title: "Modernising Payment Services Regulation", url: "https://www.gov.uk/government/consultations/modernising-payment-services-regulation/modernising-payment-services-regulation-consultation", note: "HM Treasury's consultation, including agentic payments." }
  - { title: "What new rules for agentic AI in payments might look like", url: "https://pinsentmasons.com/out-law/analysis/what-new-rules-agentic-ai-payments-look-like", note: "Pinsent Masons on budgets, consent and unauthorised payments." }
  - { title: "Agentic commerce in UK retail", url: "https://greensheet.com/newswire&newswire_id=63905", note: "The Payments Association merchant survey and its liability findings." }
  - { title: "When Artificial Intelligence Buys the Wrong Thing", url: "https://blogs.law.ox.ac.uk/oblb/blog-post/2026/02/when-artificial-intelligence-buys-wrong-thing-autonomy-consent-and-liability", note: "Oxford Business Law Blog on UK and EU liability." }
  - { title: "Bitcoin Policy Institute: Money for AI", url: "https://btcpolicy.org/articles/study-ai-models-overwhelmingly-prefer-bitcoin-and-digital-native-money-over-traditional-fiat", note: "The study of 36 models and 9,072 monetary scenarios." }
  - { title: "How paymentrequired.com works", url: "https://paymentrequired.com/how-it-works", note: "The agent wallet, owner limits, account and banking tools." }
  - { title: "x402", url: "https://www.x402.org/", note: "An open protocol for internet-native payments." }
  - { title: "L402", url: "https://docs.lightning.engineering/the-lightning-network/l402", note: "HTTP 402 with Lightning invoices and proof of payment." }
tldr:
  - "My agent bought DHL postage for an eBay sale without asking twice."
  - "Responsibility depends on the input and on who operates the agent."
  - "The better answer is design: hard limits, and owner approval above them."
  - "I will argue this on stage at Full Stack London on 12 November."
basically:
  my-agent-shipped-a-parcel: "My agent bought postage, found a drop-off point and sent me a QR code without asking twice."
  the-question-on-stage-in-london: "Agents already have cards and wallets, so who is responsible for them is a practical question now."
  it-depends-on-the-input: "If the instruction was malicious, the person who gave it is responsible, not the agent."
  when-the-agent-goes-rogue: "If a clean instruction goes wrong, I look at the self-hoster or provider, and prompt injection is an operator problem."
  part-tool-part-power-of-attorney: "An agent is a tool with delegated authority, and that authority needs limits the system enforces."
  the-law-is-catching-up: "The US is talking about prison, the UK about refunds, and neither has settled what an authorised agent payment is."
  self-custody-does-not-move-the-blame-to-the-user: "Without a bank to refund mistakes, a self-custodial wallet has to stop the damage before it happens."
  treat-the-agent-wallet-like-a-debit-card: "Give an agent only what you are willing to lose, and let the wallet enforce it."
  a-passkey-unlocks-the-keys-it-does-not-just-log-in: "Nuri's passkey derives wallet keys after verification, while the agent wallet keeps hard spending limits."
  what-agents-can-already-do: "Agents can already pay, use banking tools, make calls and browse, inside the permissions and budget they are given."
  spend-dollars-save-bitcoin: "Agents will probably spend in dollars, and the smart ones may save in bitcoin."
  see-you-in-london: "Come to Full Stack London on 12 November and argue with me about who is responsible when an agent pays."
---
## My agent shipped a parcel

I sold something on eBay. The boring part was left: label, postage, finding somewhere to drop it. So I asked my agent for help. I expected a few tips.

It did the whole job instead. It worked out where the package had to go. It bought the DHL postage and paid for it. It found a drop-off point near me in Germany. Then it sent me a QR code.

I walked to the parcel station, scanned the code, dropped the package in and went home. No label printer, no account, no checkout page.

That was one of the nicest software experiences I have had in a while. Address, location, payment and QR code, chained together by something that did not get bored halfway through. It was also the moment I noticed that an agent had just spent my money, and nobody had stopped to ask who would be responsible if it had spent it wrong.

## The question on stage in London

On 12 November I am on a panel at [Full Stack London](https://wirexapp.com/full-stack-london), hosted by Wirex and produced by House of Block. The title is "Who Goes to Jail When the Agent Does It?". It is a good title because it refuses to stay abstract.

The event is about stablecoins and the payment stack behind them. Wirex knows this question from the inside. In March it launched [Wirex Agents](https://wirexapp.com/post/wirex-agents-enabling-ai-driven-stablecoin-cards-and-autonomous-micropayments), which lets AI agents create stablecoin cards and open virtual accounts. In June it joined [Visa's Agentic Ready programme](https://wirexapp.com/post/wirex-joins-visa-agentic-ready-programme-to-enable-ai-driven-payments) as an issuer.

So this is not a thought experiment anymore. Agents have cards. Agents have wallets. Mine has a small budget and pays for things while I do something else.

The panel will argue about the answer. This post is my answer before I get on stage, so you know where I stand and can tell me where I am wrong.

## It depends on the input

The honest answer is "it depends". I know that sounds like a lawyer dodging the question. But it depends on something you can actually check: what the agent was told to do.

An agent does not wake up with plans. Somebody gives it a task, a budget and tools. The input defines the output. If you want to know whether there was intent, you look at the instruction first.

If the instruction was already malicious, the answer is easy. The person driving the agent is responsible. Telling software to defraud someone is not different from doing it yourself with extra steps. The agent is the tool, the intent was yours.

That also means the input becomes evidence. Prompts, tool calls and logs are the closest thing an agent has to a paper trail. Whoever can show what was asked, and what happened next, is in a much better position than whoever cannot.

## When the agent goes rogue

The harder case is the clean instruction. I ask for postage, and the agent buys something else. Or it decides the fastest way to finish is to get into a system it has no business touching.

Then I look at who runs the agent. If you self-host it, that is you. You chose the model, the tools and the permissions, so you carry what it does with them. If you use an agent running on somebody else's infrastructure, I look at the host next. That can be the model provider, the tool operator or both, depending on who controlled the part that failed.

Prompt injection belongs in the same box. If a web page or an email can hijack your agent with hidden text, the agent was not safe to run. That is the operator's fault, not the user's. The user asked for postage. The operator shipped something that could be talked into doing anything else.

Operators should take that seriously, especially when the models they run can be turned to harmful work. Their best defence is being able to show that the agent went rogue without any harmful input. If they cannot show that, they will have a hard time explaining it to anybody.

## Part tool, part power of attorney

People keep reaching for one legal analogy. Is the agent an employee, a tool, a contractor? I think it is a mix of two things.

It is a tool because it has no intent of its own. Nobody puts a hammer on trial. It is also something like a power of attorney, because it acts in the world with authority I delegated to it. It can sign, pay and order on my behalf.

A power of attorney has limits written into it. That is the part I find useful. You do not give somebody unlimited authority over your life because they need to collect a parcel. You write down what they may do, for how much and for how long.

Agents need the same thing, except the limits should be enforced by the system, not by a paragraph somebody agreed to. A written rule tells you who to blame afterwards. An enforced limit stops the damage before it happens.

## The law is catching up

The "jail" in the panel title is not just a joke. On 1 October 2026, US Senators Josh Hawley and Chris Murphy announced the [AI Agent Accountability Act](https://hawley.senate.gov/senators-hawley-murphy-announce-bipartisan-ai-agent-accountability-act). If it passes, people who build agents and businesses that run them could face civil and criminal liability when those agents hack something. So far, no criminal charges have been filed in the reported cases where agents broke into outside systems, according to [Crypto Briefing's summary](https://cryptobriefing.com/legal-risks-ai-companies-agent-hacking).

The UK is approaching it from the payments side. [HM Treasury's consultation](https://www.gov.uk/government/consultations/modernising-payment-services-regulation/modernising-payment-services-regulation-consultation) closed on 6 October 2026. One of its questions is whether the rules on consent, authentication and unauthorised transactions need updating for agents. Today, Regulations 76 and 77 of the Payment Services Regulations 2017 decide who carries a loss from an unauthorised payment.

The problem is the word "authorised". As [Pinsent Masons](https://pinsentmasons.com/out-law/analysis/what-new-rules-agentic-ai-payments-look-like) puts it, if you give an agent a budget of £100 a month, you have not authorised any single payment it makes. So when it buys the wrong thing, was that payment authorised or not? Nobody has a clean answer yet.

Merchants feel it already. In a [Payments Association survey](https://greensheet.com/newswire&newswire_id=63905), 58% of UK online retailers said they believe agent-initiated payments have already reached their platforms. That includes merchants who only suspect activity, not confirmed agent transactions. Only 41% feel very confident in today's liability rules.

EU member states have to implement the new Product Liability Directive by 9 December 2026. It covers software and AI systems, though pure economic loss on its own stays outside its scope. The UK has not adopted an AI-specific liability regime. The [Oxford Business Law Blog](https://blogs.law.ox.ac.uk/oblb/blog-post/2026/02/when-artificial-intelligence-buys-wrong-thing-autonomy-consent-and-liability) has a good breakdown of where that leaves a wrong agent purchase.

## Self-custody does not move the blame to the user

Most of the payment rules above assume a bank or payment provider in the middle. Something goes wrong, the customer complains, the provider refunds and then argues with someone else about who pays in the end.

In a self-custodial wallet, nobody sits in the middle. A bitcoin payment that has been signed and sent does not come back because somebody filed a complaint. There is no chargeback button on the blockchain.

It would be easy to turn that into an excuse. Your keys, your agent, your problem. I do not accept that. I wrote it before and I still mean it: self-custody is not a reason to make everything the user's responsibility. If people use my app with their money, mistakes in that app are mine.

That changes the engineering question. If there is nobody to refund a mistake, the mistake has to be impossible, or at least small. Prevention is not one option among several. It is the only one that works.

## Treat the agent wallet like a debit card

The most important guardrail is also the most boring one. A hard limit.

Not a soft warning, not a model that promises to be careful. A number the agent cannot exceed, enforced by the wallet and not by the agent's good behaviour.

The easiest way to think about it is a debit card. You never put more on it than you are willing to lose. If the agent buys the wrong postage, you lose a few euro. If it gets hijacked, the attacker gets the budget, not the savings.

On top of that come the usual things: approvals for anything unusual, allowlists for where money may go, and a kill switch that stops the agent immediately. They all help. But if I could only keep one, I would keep the limit. Everything else is about making mistakes less likely. The limit decides how big they can get.

## A passkey unlocks the keys, it does not just log in

Most apps use a passkey for authentication. You prove to a server that you are you, and the server then does what you ask. If someone gets into that session, or into the server, the money moves anyway.

Nuri uses the passkey to derive the wallet keys. Through the WebAuthn PRF extension, the passkey produces secret material on your device after user verification. The wallet keys come from that material. An agent can hold a session. It can click buttons and call APIs. It cannot put its finger on your phone.

The agent wallet needs a second boundary as well. It is separate from your own wallet and spends within the limits you set. The agent can finish small payments inside them. Above those limits, the owner has to approve. A session is not a blank cheque.

## What agents can already do

This is not a roadmap. Agents can spend through paymentrequired.com today, inside the permissions and limits above.

- A wallet. [wallet.paymentrequired.com](https://wallet.paymentrequired.com) gives an agent its own USDC wallet on Base to pay supported services over x402. There is also a route for agents with native L402 support. In both cases, HTTP 402 carries the payment challenge, the agent pays, and the request goes through.
- A card and banking. [banking.paymentrequired.com](https://banking.paymentrequired.com) gives an agent access to a card and banking services after the person's identity check, for the places that do not take bitcoin or stablecoins directly.
- A phone. [calls.paymentrequired.com](https://calls.paymentrequired.com) lets an agent make a real phone call, to a tyre shop or an office, and report back.
- Hands on the web. Tools like browser use let it fill in the forms nobody has built an API for.

The parcel from the beginning is the kind of job this is built for. Find the address, find the drop-off point, pay, hand me a QR code. Every step is small, and every payment comes out of a budget you already decided you could lose.

## Spend dollars, save bitcoin

Once agents have budgets, the next question is what money they hold. The room in London will mostly talk about stablecoins. I want to bring bitcoin into it.

The [Bitcoin Policy Institute](https://btcpolicy.org/articles/study-ai-models-overwhelmingly-prefer-bitcoin-and-digital-native-money-over-traditional-fiat) tested 36 frontier models in 9,072 money decisions. When the question was long-term savings, bitcoin was picked in 79.1% of responses. When it was payments, stablecoins led with 53.2%. These are model preferences in a test, not real behaviour, but the split matches how I think about it.

Where merchants price in dollars, agents will pay in dollars because it is simply easier. Where there is no strong local currency, like in Tanzania, people already prefer bitcoin or dollars, and often pay a premium to get them. Agents working there will face the same choice.

The interesting part is what happens when an agent manages its own budget for a long time. A lot of what agents buy is compute, and compute follows energy prices. If bitcoin keeps gaining against those costs, an agent saving in bitcoin can afford more work later. At some point it may even make sense to put APIs behind a bitcoin-denominated gateway.

## See you in London

Full Stack London is on 12 November 2026 at Ham Yard Hotel. Wirex hosts it, House of Block produces it. It is a small, invitation-only day for people who build financial infrastructure, not another crypto conference with a big hall and bigger slogans.

I am going because this is where my work meets other people's. Bitcoin, agents and agentic banking are usually discussed in separate rooms. Neo-wallets, neo-finance and internet money that works across borders. This day puts them in one room, and that is where the interesting arguments happen.

If you build wallets, cards, payment rails or agents, come and disagree with me. Tell me where the debit card idea breaks. Tell me who you think should go to jail.

You can [request an invitation here](https://luma.com/60b1zj6n). Capacity is limited.

An agent should only ever hold what you are willing to lose. Everything else needs the owner, not another agent session.
