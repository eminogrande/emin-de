---
title: "The AI Playbook: 9 Mental Models for Building in the Age of Intelligence"
description: "A summary of Andrej Karpathy's 3.5 hour talk on large language models, and 9 things founders can take from it."
date: "2026-01-02T11:50:01Z"
updated: "2026-01-02T11:50:01Z"
lang: "en"
category: "agents-ai"
format: "summary"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: true
cover: "../../../media/the-ai-playbook-9-mental-models-for-building-in-the-age-of-intelligence/cover.webp"
voice_check:
  em_dash: 2
  unobserved: 120
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/the-ai-playbook-9-mental-models-for-building-in-the-age-of-i/"
tldr:
  - "A summary of Andrej Karpathy's 3.5 hour talk on large language models, turned into nine lessons for founders."
  - "The model is a token predictor that simulates the internet, so products should verify, use tools and own their data."
  - "Agents and reinforcement learning are the frontier, and open weights turn the model itself into a commodity."
basically:
  the-base-model-simulates-the-internet: "The raw model guesses the next word of an internet document. The product is what gets built on top."
  fine-tuning-is-roleplay: "ChatGPT is a statistical simulation of a human data labeler, so fine-tuning alone caps out at human level."
  reinforcement-learning-is-the-alphago-moment: "Self-play with rewards gets past human skill, so the valuable startups build gyms for AI to practice in."
  the-swiss-cheese-problem: "A model that solves PhD physics can still say 9.11 is bigger than 9.9. Build products that verify."
  tokens-to-think: "Models need room to write out steps, so the UX should use the waiting instead of hiding it."
  tools-beat-brains: "The model sees tokens, not letters. Let it call a Python script instead of counting in its head."
  hallucination-is-a-feature: "Hallucination is the model dreaming from training data. The fix is putting the right answer into the context."
  the-future-is-agents: "The next big chance is not chat with a PDF but agents that do the whole job, like taxes or travel."
  open-weights-are-catching-up: "As open models close the gap, the moat is your data, your distribution and your gym, not the LLM."
  karpathys-closing-line: "Not a magical AI, a statistical simulation of an average labeler. Use the tool, don't worship it."
---
A summary of Andrej Karpathy's talk on large language models, https://www.youtube.com/watch?v=7xTGNNLPyMI

![](../../../media/the-ai-playbook-9-mental-models-for-building-in-the-age-of-intelligence/cover.jpg)

Andrej Karpathy was a founding member of OpenAI and Director of AI at Tesla, and people call him the "Teacher of the AI Revolution". He put out a 3.5 hour "State of the Union" on large language models. If you build a startup today, he says you can't ignore this, it's the new electricity.

Most people treat AI like magic. Karpathy treats it like a machine that tumbles out tokens by chance. And that changes a lot about how you build.

These are the 9 things founders can take from it, for building on top of something that is still moving.

## The base model simulates the internet

Number one is that the base model simulates the internet and doesn't know the truth. Founders often think the AI knows everything. It doesn't. It is the internet, compressed.

Karpathy explains that the base model, the raw neural net, just tries to guess the next word of some random internet document. It isn't trying to help you. It tries to simulate a Reddit thread or a Wikipedia article [43:35].

What it means for founders is that the raw model is not your product. The product is what you build on top of the simulator so that it becomes useful.

## Fine-tuning is roleplay

Number two is that fine-tuning is just roleplay. How do you turn a wild internet simulator into ChatGPT? With supervised fine-tuning (SFT). You pay people to write questions and answers, and the AI learns to copy them [01:03:00].

So when you talk to ChatGPT, you don't talk to a brain made of silicon. You talk to a statistical simulation of a human data labeler [01:17:49].

What it means for founders is that fine-tuning alone gives your startup a ceiling, and that ceiling is human level. You never get better than your labelers.

## Reinforcement learning is the AlphaGo moment

Number three is reinforcement learning, the AlphaGo moment. This is where the frontier is. To get beyond what humans can do, like DeepSeek R1 or OpenAI o1, you need reinforcement learning (RL).

Karpathy compares it to AlphaGo [02:42:20]. If you only train on games humans played, you stop at human skill. But if you let the AI play against itself and reward the wins, it finds "Move 37", moves no human would ever think of [02:45:32].

What it means for founders is that the startups worth the most won't just copy humans. They build gyms, environments where the AI can practice and get smarter than us.

## The Swiss cheese problem

Number four is the Swiss cheese problem. For founders this is the sharpest edge. LLMs have "Jagged Frontiers".

They solve physics problems on PhD level, and then tell you with full confidence that 9.11 is bigger than 9.9 [02:05:40]. Why? Because to the token predictor 9.11 looks like a Bible verse or a date.

What it means for founders is that you shouldn't build products that rely on trust. Build products that verify. You need a human or code in the loop that checks the cheese for holes.

## Tokens to think

Number five is to give the model time on a scratchpad. Karpathy says models need "tokens to think" [01:58:00].

If you ask a model to solve a hard math problem in one word, it fails. If you let it write out the steps ("Let's think step by step..."), it gets it right.

What it means for founders is to design the UX for patience. Don't hide the waiting, use it. Let the model write a chain of thought before it gives the final answer.

## Tools beat brains

Number six is that tools beat brains. The model is bad at spelling "Strawberry" and counting the Rs, because it sees tokens and not letters [02:03:44].

Karpathy's answer is to not make the LLM do it in its head. Tell it to write a Python script that counts the letters.

What it means for founders is to stop forcing the AI to be a computer. We have computers already. Build systems where the AI is the one in the middle that calls tools like search, a calculator or code to do the exact work.

## Hallucination is a feature

Number seven is that hallucination is a feature, not a bug. Hallucination is just the model dreaming from what it was trained on. It happens because the model works with probabilities and flips a coin for every word [26:45].

You can make it better if you let the model say "I don't know", or if you use search (RAG) to put the answer into its working memory [01:35:00].

What it means for founders is that you can't fix hallucination only in the model weights. You fix it when you put the right answer into the prompt, the context window.

## The future is agents

Number eight is that the future is agents. We go from chatbots that talk to agents that do things.

Karpathy expects that we hand control to models that use a keyboard and a mouse and work on long tasks [03:12:00].

What it means for founders is that the next trillion dollar chance isn't chat with PDF. It's do my taxes or book my travel, the whole job done from start to end.

## Open weights are catching up

Number nine is that open weights are catching up. Karpathy points to DeepSeek and Llama [03:16:00]. The gap between closed models from OpenAI and Google and open models from DeepSeek and Meta gets smaller fast.

What it means for founders is that the model itself turns into a commodity. Your moat isn't the LLM. Your moat is your own data, your distribution and the gym you build to train your agent.

________________________________

## Karpathy's closing line

At the end Karpathy leaves us with this.

"You are not talking to a magical AI. You are talking to a statistical simulation of an average human labeler."

So build with that in mind. Don't worship the tool, use it.
