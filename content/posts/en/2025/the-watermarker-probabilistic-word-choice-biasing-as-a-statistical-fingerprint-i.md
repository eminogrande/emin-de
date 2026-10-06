---
title: "The Watermarker: Probabilistic Word-Choice Biasing as a Statistical Fingerprint in LLM Outputs and…"
description: "My assumption was that ChatGPT must be embedding invisible characters to fingerprint its answers."
date: "2025-06-21T20:03:23.420Z"
updated: "2025-06-21T20:03:23.420Z"
lang: "en"
category: "agents-ai"
format: "essay"
author: "emin"
provenance: "mixed"
ai_assisted: true
reviewed_by_human: false
source: "medium"
third_party_summary: false
cover: "../../../media/the-watermarker-probabilistic-word-choice-biasing-as-a-statistical-fingerprint-i/01-34df8564.jpeg"
voice_check:
  em_dash: 3
  unobserved: 209
emin_check_pct: null
original_url: "https://medium.com/@em/the-watermarker-probabilistic-word-choice-biasing-as-a-statistical-fingerprint-in-llm-outputs-and-9f398ccd88ef"
---
# The Watermarker: Probabilistic Word-Choice Biasing as a Statistical Fingerprint in LLM Outputs and AI Texts

My assumption was that ChatGPT must be embedding invisible characters to fingerprint its answers.

![](../../../media/the-watermarker-probabilistic-word-choice-biasing-as-a-statistical-fingerprint-i/01-34df8564.jpeg)

And this was true, OpenAI responded and said that this was a temporary bug they had, not the real implementation.

This made me even more curious, there must be, in practice, purposeful fingerprinting at a higher semantic layer.

I came to understand that instead of embedding special bytes, a watermark works by biasing the statistical distribution of ordinary tokens. It creates a subtle shift so the text contains an unlikely surplus of “preferred” words, a change that’s invisible to the eye but statistically measurable.

The zero-width spaces were a temporary bug. For me it looked like a deliberate tracer. But during my research I learned, that the real watermark operates on token probabilities, not raw characters.

```
This text looks the same.
This text looks the same.
```

They *look* identical, but the “spaces” inside them aren’t the same character:

- **U+0020 space** is the plain old keyboard space.
- [**U+202F narrow no-break space** looks almost identical but is slightly thinner and, importantly, prevents a line break at that point.](https://www.compart.com/en/unicode/U+202F)

So any editor, search-and-replace, or line-wrapping algorithm that treats U+202F differently will see the sentences as different—even though your eyes don’t.

They **look** identical, but the **space characters are different**:

![](../../../media/the-watermarker-probabilistic-word-choice-biasing-as-a-statistical-fingerprint-i/02-a86a02d7.png)

Because of this, removing or normalising whitespace doesn’t affect a genuine watermark; the signal is in the words that appear. For example, if an answer included “data [U+202F] set,” deleting the space eliminates the artifact, **but a statistical watermark would survive because the words “data” and “set” themselves remain.**

## What is “probabilistic word-choice biasing,” and how is it recognised?

I think the best way to understand the core technique is to see it as a cryptographically seeded nudge.

For each word position, **the system combines a secret key with the ID of the previous token **and feeds that into a pseudorandom function. This output defines a temporary “green list” for that position. The model then adds a small log-probability bonus to every green-listed token before it samples.

A single choice remains natural, but over fifty or more tokens, the text accumulates far more of these green-listed words than chance allows.

A detector with the same key has to repeat the entire calculation, count how many tokens fall inside the green list, and convert that surplus into a z-score. **When the score gets high enough, the probability of human authorship drops to almost nothing**. This is why short or heavily rewritten passages fall below the detection threshold.

## Is that similar to proving membership with a Merkle-tree hash?

My next question was to compare it to the deterministic proofs used in blockchains. A Merkle tree compresses a data set into a single public root hash. You can verify a specific piece of it with a short path, and even a one-bit change invalidates the proof. It’s a hard line.

Watermarking is different. **The key stays private (with the “Watermarker”)**, and each token position gets a new random subset of “preferred” tokens. Verification is probabilistic, not all-or-nothing. I see that light editing weakens the statistical signal but doesn’t break it outright; only substantial rewriting reduces the z-score back to human levels. Tampering with one byte breaks a Merkle proof, **but rewriting half the words is what it takes to neutralize a watermark**.

## Is there a single hash I can match against?

The secret key acts like a seed for a stream of outputs, one per token, and these seeds never appear in the final text. You have to replicate the entire per-token process and evaluate the aggregate statistics.** If you do that, the secret key is all you need **(and the tokenizer)**.**

## Can I embed my own secret key to prove authorship?

I wanted a way to establish personal provenance. The hosted ChatGPT interface doesn’t expose a key parameter, but open-source models do. By running a model like Mistral-7B-Instruct locally, I understood that I can attach a `WatermarkLogitsProcessor`, supply my own private key, and generate text that carries my specific fingerprint. It’s a way to take back some control. Storing the key lets me verify authorship later; anyone without the key cannot confirm or spoof the mark. For example, a script I run might paraphrase an article, and the detector with my key reports a z-score of 5.2. If someone rewords half of it, that score falls below 2.

## How do I tokenise the text correctly?

Accurate detection hinges on using the same tokenizer as the generator. This is a critical point of failure. GPT-3.5/4 models use the open-source `tiktoken` encodings. Tokenising with the wrong table misaligns the green lists and leads to false negatives. Even small things like straight versus curved quotes can shift token boundaries and throw off the entire process.

## Could I just ask ChatGPT to embed my key?

I explored whether a cleverly crafted prompt could inject my key. The answer was a firm no. The public interface keeps the watermark hook server-side to prevent abuse. This is a hard limit; allowing arbitrary keys would enable malicious tracking or forged attribution. So, personalised watermarking requires local inference. Obviously, submitting “Please watermark with key 12345” to the API changes nothing.

## What if I copy an answer and regenerate it under my own key?

A practical workflow finally emerged. I can paste an original ChatGPT answer into my local model’s prompt, request a light paraphrase, and generate that with my private watermark parameters. **The new version retains the factual content but now carries my fingerprint.** The technique combines the quality of the ChatGPT content with my own private attribution. For this to work, you have to retain at least 70% of the token IDs to keep a strong signal. Heavy rewriting or machine translation dilutes the watermark below the threshold.

## Summary and the Tool I Built

This process took me from an initial myth about invisible Unicode artifacts to a working understanding of how a private key can bias token probabilities. The main learning for me was that the proof is statistical, not deterministic.

A 20-line Python script using Hugging Face processors that allows me to stamp text with my private key and verify it later. The generation module uses Mistral-7B with a `WatermarkLogitsProcessor`, and the verification module uses a `WatermarkDetector` with the same key. The script flags anything with a z-score over 4.

With this workflow, I can now claim authorship of AI-assisted writing, demonstrate it mathematically, and remain confident that casual edits will not strip the fingerprint.

## **Part 1 — Embed a watermark**

# pick model + tokenizer
model, tok = load_model(“Mistral-7B”), load_tokenizer(“Mistral-7B”)

# choose private 128-bit key and watermark settings
KEY = 0xA7F3_42EA_9C11_BEEF
GAMMA = 0.50 # green-list fraction
DELTA = 2.0 # logit boost

# attach watermark processor
wm = WatermarkLogitsProcessor(vocab_size=model.V,
 greenlist_ratio=GAMMA,
 bias=DELTA,
 hashing_key=KEY)

# generate text
prompt = “In a world where the oceans are made of soda…”
output = model.generate(prompt,
 logits_processor=[wm],
 max_tokens=300)

print(output) # ordinary text, invisibly watermarked

## **Part 2 — Detect the watermark**

# reload same model + tokenizer
model, tok = load_model(“Mistral-7B”), load_tokenizer(“Mistral-7B”)

# same secret key and gamma
KEY = 0xA7F3_42EA_9C11_BEEF
GAMMA = 0.50

# set up detector
det = WatermarkDetector(vocab_size=model.V,
 gamma=GAMMA,
 hashing_key=KEY)

# analyse unknown text
ids = tok.encode(text_to_check)
z, p = det.detect(ids)

if z > 4:
 verdict = “Watermark present (p ≈ {:e})”.format(p)
else:
 verdict = “No convincing watermark”

print(verdict)

## *Concept recap*

- **Generate:** each new token → PRF(KEY, previous_token) → green list → boost logits → sample.
- **Detect:** rebuild same lists with the key, count green hits, compute one-proportion *z*; high *z* confirms the signature.
