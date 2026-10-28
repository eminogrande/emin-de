---
title: "Let ChatGPT make a real phone call"
seo_title: "Let ChatGPT Make a Real Phone Call | emin.de"
description: "A live demo: the free version of ChatGPT calls a tyre shop, asks for winter tyres, price and a slot, and reports back. How the call tool works, and how your agent can use it."
date: 2026-10-28
updated: 2026-10-28
lang: en
translations: {}
category: agents-ai
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
cover: ../../../media/let-chatgpt-make-a-real-phone-call/cover.png
tags: ["agents-ai", "payments", "x402", "MCP", "phone"]
source_links:
  - { title: "calls.paymentrequired.com", url: "https://calls.paymentrequired.com", note: "The call tool from the demo." }
  - { title: "calls.paymentrequired.com/llms.txt", url: "https://calls.paymentrequired.com/llms.txt", note: "The short version for agents." }
  - { title: "paymentrequired.com", url: "https://paymentrequired.com", note: "All tools in one list." }
  - { title: "x402", url: "https://www.x402.org/", note: "HTTP 402 payments, the protocol the tool charges with." }
  - { title: "Model Context Protocol", url: "https://modelcontextprotocol.io", note: "How ChatGPT and other agents plug in tools." }
  - { title: "nuri.com", url: "https://nuri.com", note: "The wallet we build." }
tldr:
  - "In a live demo the free version of ChatGPT called a real German number, asked about winter tyres and came back with price and appointment."
  - "It needs two things: a tool that can make the call, and a way to pay for it."
  - "Point your agent at calls.paymentrequired.com/llms.txt or at this post and it knows how to do it."
basically:
  what-you-see-in-the-video: "Six minutes, one real call, ChatGPT reports price and appointment back."
  two-things-an-ai-needs-to-make-a-call: "A tool that can phone, and a wallet so the agent can pay for the tool."
  how-the-call-works: "Quote, place, wait. The voice agent calls, the summary and transcript come back."
  what-the-agent-says-on-the-phone: "My boss asked me to call you. No names, short sentences, one question at a time."
  how-an-agent-uses-it: "One MCP link, three tools. Or plain HTTP with a 402 payment in between."
  what-it-costs: "0.42 USDC per call on Base. Up to ten minutes per call."
  what-was-real-in-this-demo: "The call was real. The payment in this demo was not, it ran on my free test link."
  full-transcript-of-the-video: "Everything that was said, from the intro to the tyre shop to the end."
---
## What you see in the video

Today I showed this at a meetup, from home, because I am sick. Moritz introduced me, I shared my screen and I let ChatGPT do one boring job. Call a tyre shop and ask if they can change my tyres to winter tyres, what it costs and when they have time.

The tyre shop was me. My phone rang, I put it on speaker and answered as the workshop. 50 euros, tomorrow 12 noon. A minute later ChatGPT had the result in the chat.

<video controls preload="metadata" src="../../../media/let-chatgpt-make-a-real-phone-call/demo-720p.mp4" poster="../../../media/let-chatgpt-make-a-real-phone-call/cover.png"></video>

The video has subtitles burned in. The full transcript is at the end of this post.

## Two things an AI needs to make a call

Think about your normal ChatGPT, or whatever AI you use, even the free version. It can do a lot, but it cannot pick up a phone. And maybe that is exactly what you want. You need winter tyres, you have social anxiety, you don't speak German yet, you need something from the Bürgeramt in Berlin. You just want somebody to call.

Then the AI needs two things.

1. A tool that can actually make the call. That is calls.paymentrequired.com. Behind it is a voice agent that dials the number, has the conversation and writes down what was said.
2. A way to pay. These tools are not free, somebody runs the phone line and the voice. You cannot give an AI your bank account or your credit card. So you give it a wallet.

That is the part I care about. There will be millions of tools like this. A call tool today, a DNA analysis tool tomorrow, anything you can imagine. Every agent that wants to use them needs a wallet. That is one part of what we build at Nuri, a wallet where you hold digital euros, digital dollars and bitcoin, with a real Visa card.

## How the call works

```
you:     "call +49... and ask about winter tyres"
           |
ChatGPT / your agent
           |  MCP: quote_call -> place_call -> get_call
           v
calls.paymentrequired.com
           |  pays 0.42 USDC (x402) or owner link
           v
voice agent  --- phone line --->  the person you want to reach
           |
           v
summary + transcript back to your agent
```

1. The agent asks for a quote with the number and the goal. That is free and shows the language and the price.
2. The agent places the call. With a paid request the payment is settled first, then the phone rings.
3. The agent asks for the result. Each request waits up to 20 seconds. The agent asks again until the call is finished. A call can last up to ten minutes.
4. The result is a short summary and the full transcript, so the agent can tell you what was agreed.

The language comes from the goal. A German goal gives a German call, an English goal an English one. You can also set it yourself, for example sw for Swahili, fr, tr or es.

## What the agent says on the phone

The agent does not introduce itself and does not name anybody, not itself and not you. It says "My boss asked me to call you" and then asks for what you want, in its own words. Short sentences, one question at a time, no fake excitement. If somebody asks directly whether it is an AI, it says yes.

If nobody picks up and a mailbox answers, it leaves one short message. If the person does not want to talk, it says goodbye and hangs up.

## How an agent uses it

If you want to point an agent somewhere, point it here, or at the short version at calls.paymentrequired.com/llms.txt.

MCP (ChatGPT developer mode, Claude, Cursor, Hermes and others):

```
MCP server: https://calls.paymentrequired.com/mcp
tools:
  quote_call  free, checks number and goal, returns language and price
  place_call  0.42 USDC via x402, starts the call, returns call_token
  get_call    free, waits up to 20 s, repeat until finished is true
```

Plain HTTP:

```
POST https://calls.paymentrequired.com/call
{"to": "+4930...", "goal": "Ask if they can change my car tyres to winter tyres, what it costs and when they have a free appointment."}

-> 402 Payment Required, with the x402 price
-> repeat with the PAYMENT-SIGNATURE header -> 200 + call_token

GET https://calls.paymentrequired.com/call/<call_token>?wait=55
-> status, summary, transcript
```

Numbers go in international format, +49 and so on. The goal is one or two plain sentences, what you want to know, what you want booked.

A prompt that works:

```
Use the call tool and call +49... and ask if they can change my car tyres
to winter tyres, what it costs and when they have a free appointment.
Then tell me the result.
```

## What it costs

One call is 0.42 USDC on Base, paid with x402. Up to ten minutes per call. The price is set for the demo, it is not where we make money.

## What was real in this demo

The call was real. A voice agent dialed my German mobile number, I answered as the workshop and it got price and appointment out of me.

The payment was not real in this demo. In the talk I said ChatGPT paid from its own wallet. The server log shows the call ran through my owner test link, which is free and only for me. No 0.42 USDC went out for this call. Paid calls through x402 work, we tested them before with real USDC on Base, but this one was not paid. In the talk I also guessed the call cost me about 17 cents. That is the phone line, not a payment.

The next step is the full flow in ChatGPT itself. The agent makes its own wallet, I top it up, then it pays the call tool on its own.

## Full transcript of the video

From the subtitles of the recording. Speakers are Moritz, who hosted, and me. In the call the voice agent talks to me, I play the workshop.

Moritz:

Me. But yeah, I hope that he's also understandable soon. Test. One, two, three. Three. Hello, hello. Yeah, that works. And he will give us like a quick demo of Nuri. That is a project that we are, I mean, not me personally, but Emin is also working on. And yeah, can you share? You have your screen already there. I think that should be all right. So yeah, maybe, Emin you want to say a few words and show like the demo?

Emin:

Cool yeah thank you. I think you need to mute yourself Moritz otherwise I hear myself double and triple. Okay perfect. So I try to be quick and I'm at home because I'm sick and didn't want to make you guys sick.

So let me start with Nuri. So Nuri, sorry, wrong, Nuri.com. It doesn't want to go to the address. So Nuri is a wallet. Let's keep it as simple as possible. A wallet is a place where you can hold your digital money, meaning euros, dollars or Bitcoin.

So why are wallets important and what is actually happening with wallets? So think about your standard ChatGPT or whatever AI you are using, like even a free version. It has limited capabilities of what it can do. It can do everything it can do, but there might be other things you want it to do, which it can't. But the world of AI and tools is growing and there are millions of different entrepreneurs and ideas.

And let's say you would like that your ChatGPT actually calls someone. And in our case, like, for example, you want to change the tires of your car. You have social anxiety and you want ChatGPT to do it and you don't want to do it yourself. Then you need two things. One thing is your ChatGPT needs a tool, like some tool to actually call, a phone, so to say. And usually, you know, these services out there, they're not for free, so you need to pay for them. So it's not easy or it doesn't really work to give it cash, like your bank account or your credit card. So you need to give it a wallet.

So in this example, which will just take a minute or so, I already gave ChatGPT a link. It created its own wallet with Nuri. I gave it a little bit money. And then I will tell it, can you use the call tool, pay for it, and call my number and just ask if you can exchange the tires.

So now you get two things. You have an AI, another AI somewhere, which is actually it asks me, should I do this? I say yes. So it's actually another AI that says, okay, I'm going to do the call, I'm going to do the job, but you have to pay me. So because we gave it first the call tool and the wallet, now ChatGPT even in this free version is able, it now calls me, my phone is ringing and I put it on speaker.

The call:

Yes, can you speak English? I'm speaking English.

Yes, I can speak English. My boss asked me to call you. Do you have a moment?

Yes, yes, I have a moment.

Great. I'm calling to ask if you can change my car's current tires to winter tires.

Yes, no problem.

Could you also tell me the total pro...

The total price is, I think it's 50 euros.

Okay, so 50 euros. Does that price include all mounting, balancing and any other fees?

Yes. Yes. Yeah, tomorrow 12 a.m. is possible, oh wait, 12 p.m. Yes, of course, it's your car. Bye-bye.

Emin:

So now I, this was a real call, right? It called my German number. It did all this. And now here it's still looking at the transcript. So it said it called. And now it gives me the full transcript. Five things. Can I change the tires? Yes. The price is 50 euro. The earliest appointment is tomorrow, 12 noon. Winter tires and booking status.

So this is really amazing because, you know, many of us, I don't know, you have social anxiety. Maybe you don't speak German yet. Maybe you need something from the Bürgeramt in Berlin. It can be anything. You can literally just tell it. And this call maybe cost me 17 cents or so. I first gave it a wallet, Nuri. Then I gave it a tool to call. And now the free version of ChatGPT just did the job.

And this is basically everything I wanted to tell and show today, that the future, let's say, of AI and its capabilities is that there will be millions of interesting tools. This was a call tool, but it can be a DNA-analyzed tool or anything that you can imagine. And, you know, every agent, every AI needs a wallet. And this is one part of what Nuri is building, a wallet where you can hold euro, digital euros, digital dollars, bitcoin, and, yeah, you also get a real Visa card. That's basically the presentation and I hope that inspired some of you.

Moritz:

Well, thank you. All right.
