---
title: "How my agent got me back into German health insurance, and mailed the letter with its own wallet"
description: "My agent found ten years of my insurance history, filled two German TK forms, emailed them, and posted the letter through a German x402 letter service with its own USDC wallet."
date: 2026-10-12
updated: 2026-10-12
lang: en
translations: {}
category: agents-ai
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
draft: false
tags: ["x402", "agent wallet", "USDC", "paymentrequired.com", "health insurance", "Germany"]
source_links:
  - { title: "x402: An open standard for internet-native payments", url: "https://x402.org/x402-an-open-standard-for-internet-native-payments/" }
  - { title: "PostalForm agents guide (x402 and MPP)", url: "https://postalform.com/agents" }
  - { title: "GKV-Spitzenverband, Grundsätzliche Hinweise zu § 5 Abs. 1 Nr. 13 SGB V", url: "https://www.vdek.com/vertragspartner/mitgliedschaftsrecht_beitragsrecht/versicherungspflicht/_jcr_content/par/download/file.res/GH%20vom%2014.12.2018.pdf" }
  - { title: "Payment transaction on Base", url: "https://basescan.org/tx/0x06741d61dc758cb088fc58d96b662249c46fdfcd837dfac0fe95213cf590ec09" }
tldr:
  - "My agent found my whole insurance history in Gmail and Drive and checked the law with sources, not from memory."
  - "It filled two German TK forms, sent them by email, and mailed a printed copy through PostalForm and Pingen in Germany."
  - "It paid 4.20 USDC by x402 from a paymentrequired.com agent wallet I funded, and proved the payment on chain."
---
I lived outside of Germany for a few years. Liechtenstein, then a lot of time in Tanzania. Now I am moving back to Berlin with my wife, and she needs a family reunion visa. For that visa she needs health insurance from the day she arrives. The easiest way is that she is family insured with me. And for that I first need to be back in the German statutory health insurance myself.

Sounds simple. It is not. It is German bureaucracy plus a life that happened in three countries.

So I did this together with my agent. Hermes, running on my Mac, with access to my mail, my files, a browser and a wallet. I want to write down what it actually did, step by step, because I think this is a good example of what agents can do today. Not in a demo. In real life, with real forms, real deadlines and real money.

First I have to say something honest. At the beginning the agent guessed. It told me my wife normally does not need a birth certificate. That was wrong, it is written on the embassy website. So I told it: from now on you are not allowed to answer anything from memory, you must verify everything online. And it did. After that every claim came with a source, the embassy page, the law on gesetze-im-internet.de, or the official guidance of the GKV-Spitzenverband. And when it could not verify something, it wrote UNVERIFIED next to it. I think this is the most important rule when you work with an agent on things that matter. Verify, don't guess.

The first real question was simple: what was my last health insurance? I did not remember exactly. The agent searched through my Gmail and my Google Drive and found the whole history. BARMER until 30.11.2017. Then private with Continentale from 01.12.2017. Then my deregistration from Berlin in July 2019. And then the FKB in Liechtenstein, the obligatory health insurance there, from 07.11.2019 until 28.02.2023. It found the policy from 2020 in my Drive and an email from the FKB where they confirm the exact period. It copied all of this into one folder, without touching the originals.

This history matters a lot. If your last insurance in Germany was private, you can have a problem to get back into the statutory system. The agent checked the rule. A statutory insurance in another EU or EEA state counts as "last statutory insured", also for Germans who come back. Liechtenstein is in the EEA. It found this in the official guidance of the GKV-Spitzenverband, section A.2.2.2, and it also found the section that says the membership starts with the return. So the FKB was the key.

Then the TK answered my application. Two forms, KR300120 and KR300125, and a letter: please send proof of your entry into Germany by 20.10.2026. The agent read the email, saved the PDFs, and then filled them. Not with fillable fields, these PDFs have none. It measured where every box and line is on the page and wrote the text exactly into the right place. Then it rendered every page as an image and checked itself that nothing overlaps. My insurance number from the old BARMER letter. The FKB as last compulsory insurance. Self employed from 01.11.2026, 40 hours, no sick pay, no benefits used.

Here the agent also stopped me once. I wanted to put only the FKB everywhere, so that nobody thinks I was private. But one field asks only about the last insurance in Germany, and that was the Continentale. The agent said: if you leave it out, the form is wrong, and you sign that everything is correct. And it does not hurt you, because what counts is that the FKB was your last insurance overall. That is the kind of help I want. Not just doing what I say, but telling me when it becomes a problem.

I also told it to write the email dry. Only what is asked, no explanations, nobody needs my life story. So the email was four sentences. Forms attached, Meldebestätigung attached, FKB proof attached, please start the membership on the day I moved in, please send me the family insurance form for my wife. I signed the PDFs myself, the agent checked that the signatures are on the right line, and then it sent the email from my Gmail as a reply to the TK thread, with all five attachments. It opened the sent folder afterwards to make sure all five files are really there.

Then I said: I also want to send this by post. Real paper. And I asked it to find a service where I can send real letters with x402.

x402 is a simple idea. A server answers with HTTP 402 Payment Required and says what it costs. The agent pays with USDC and sends the request again. No account, no API key, no subscription. The agent just pays for the one thing it needs.

The agent looked through the x402 discovery list from Coinbase, around 14,000 paid services, and searched the web. It found three letter services. RobotPostal sounded good, but it only takes text, no PDF, and it mails from the US with a US sender address. Not useful for a signed German form. AgentBureau is German and costs 3 USDC, but it also takes only text. PostalForm takes a PDF, and for Germany it prints through Pingen and hands the letter to Deutsche Post. The agent asked PostalForm for a free quote first: 5 pages from Berlin to the TK in Hamburg, 4.20 USD. Valid, nothing paid.

As wallet I said: use paymentrequired.com. That is the one we build at Nuri. The agent connected, I got a link, I signed in with my email. My agent wallet had 2.14 USDC, not enough. So the agent asked to fund 3 USDC and showed me exactly what goes where: from my account, to the agent wallet, after that 5.14. I tapped the link. It did not go through the first time, the transfer still waited for my signature, so the agent gave me a new link. And one more. Then it worked. And it did not just believe it, it checked the balance on chain on Base: 5.139998 USDC.

Then the payment. It did not work on the first try, and I like that the agent was honest about why. First the request was too big. The paymentrequired MCP accepts at most 256 KB per request, the agent read this in our own code, and the PDF was bigger. Then it tried an upload token from PostalForm, but the wallet first does a free check of the price, and that check already used the token, so the real payment was rejected with HTTP 422. Nothing was charged. The agent checked the balance again to be sure. Then it made the PDF smaller with Ghostscript, looked at the pages again to make sure my signature is still readable, and sent it again with a limit of 4.50 USDC, so it could never pay more than that.

This time it worked. 4.20 USDC from my agent wallet to PostalForm, on Base. The agent did not just trust the answer from the wallet. It read the transaction receipt on chain itself: status success, block 52509914, 4.2 USDC from my agent wallet to the PostalForm address. Transaction 0x06741d61dc758cb088fc58d96b662249c46fdfcd837dfac0fe95213cf590ec09. PostalForm says paid, the confirmation went to my email, and the letter goes into print in Germany. 0.94 USDC left in the wallet.

So what happened here? I said what I want. The agent searched my mail and my files, found more than ten years of insurance history, checked the law, filled two German forms, sent the email, found a German letter service that takes x402, paid from a wallet I control, and proved every step. I tapped a few links and signed two PDFs. That was my part.

And I want to be clear about the wallet part, because I think this is the future. The agent paid alone, within a limit, for a real thing in the real world. A letter, printed and posted in Germany. Not with my credit card in some form. With its own wallet, that I funded and that I can see on chain. Every payment has a transaction hash. That is the difference to an agent that just clicks around in a browser with my card.

It is not perfect yet. The funding link needed more than one try. The first payment attempts failed because of a size limit in our own MCP. These are exactly the things we now fix. But the result is real. The email is at the TK, the letter is on the way, and now I wait for the form for my wife.

Agents are not magic. But when they verify everything, tell you when you are about to make a mistake, and can pay for things themselves with a wallet you control, they take a lot of the stress away from the boring and important things in life.
