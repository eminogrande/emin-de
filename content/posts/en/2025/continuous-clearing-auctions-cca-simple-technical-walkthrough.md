---
title: "Continuous Clearing Auctions (CCA), the simple and the technical walkthrough"
description: "Token launches are messy and bots win. CCA spreads your bid over many blocks and everyone filled in a block pays the same price. Simple first, then the math"
date: "2025-12-02T18:20:01Z"
updated: "2025-12-02T18:20:01Z"
lang: "en"
category: "building"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/continuous-clearing-auctions-cca-simple-technical-walkthrough/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 162
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/continuous-clearing-auctions-cca-simple-technical-walkthroug/"
tldr:
  - "Continuous Clearing Auctions split a token sale into many blocks, and each block clears at one uniform price."
  - "You bid once with a max price and a quantity, the protocol spreads it over the sale, and you never pay above your max."
  - "At the end the raised money and leftover tokens can seed a Uniswap v4 pool automatically."
basically:
  why-token-launches-go-wrong: "Fixed-time token launches reward bots and fast traders, and retail ends up paying too much."
  what-cca-does: "In a CCA you send one bid with a max price, and each block clears at one fair price for everyone."
  why-this-matters: "CCA moves price discovery away from mempool speed games and seeds a Uniswap v4 pool at the auction price."
  the-math-with-a-simple-example: "With 1,000 tokens and bids sorted by price, the block clears at 2.20 and G, D and B are filled pro rata."
  sources: "The walkthrough is based on Uniswap's CCA blog, product page and contract repo, plus Aztec's first CCA sale."
---
![](../../../media/continuous-clearing-auctions-cca-simple-technical-walkthrough/cover.jpg)

# Continuous Clearing Auctions (CCA), the simple and the technical walkthrough

This is the simple version first, told a bit like a thread, and then a more technical part with the math and a small simulation.

## Why token launches go wrong

Token sales are messy. A normal token launch has a fixed launch time and everyone tries to buy at once. Bots and fast traders usually win, and the final price is unclear and jumps around for the first hours or days. So retail pays too much, a few hands get most of the allocation, and price discovery and early trading are a mess.

The old playbook has four ways to do it and each one has its problem. A fixed price sale means the project sets a price. If it's too low, bots and arbitrageurs buy it out instantly, and if it's too high, the sale drags and looks like it failed. In a Dutch auction the price goes down over time. Professional traders wait to buy as low as possible, late sniping decides the outcome, and retail plays a timing game they aren't built for. In a one-shot uniform price auction everyone bids once and the market clears at one price. But that happens at only one moment, and the liquidity has to be set up separately after. And a direct AMM launch, like an immediate Uniswap pool, starts with thin liquidity, so early trades move the price a lot and MEV and mempool competition decide who gets good fills.

## What CCA does

A Continuous Clearing Auction changes the process. The sale is split into many blocks, so time intervals. You send one bid with the max price you are willing to pay and the amount of tokens you want. The protocol spreads your bid across the whole sale by itself. In each block it computes a fair market price from all the active bids, and everyone who gets filled in that block pays the same price. So you don't have to click fast and you don't have to watch the price every second. You just say the most you'd pay and how much you want.

The core works like this, for every block. The protocol has a fixed amount of tokens for that block. It looks at all active bids and sorts them by max price. It finds the lowest price where total demand ≥ block supply, and that's the clearing price for the block. All bids with `P_max` at or above that clearing price are eligible. If there is more demand than supply at that price, the eligible bids get scaled pro rata. And everyone who is filled pays that same clearing price. This repeats every block until the sale ends.

What if you bid too high? There is a max price guarantee. You choose `P_max`, the most you want to pay per token. If the clearing price of the block, `P_clear`, is above your `P_max`, your bid isn't executed in that block, and your bid slices stay there for later blocks or you can withdraw them as the rules of the sale allow. So you never pay more than `P_max`. And if the market clears lower than your `P_max`, you just get filled at the lower clearing price.

There is also an early bird effect. If you bid early, your order is spread over more blocks, so you get more chances to be filled in blocks where the clearing price is quite low. If you wait until the last block, your order only takes part in the final blocks and you mostly see the later and maybe more expensive clearing prices. So it's not fastest finger first anymore. The mechanism rewards you for joining early and staying in the whole price discovery.

When the auction ends, the protocol has a full record of all clearing prices and filled quantities per block, the total assets raised and the unsold tokens that are left, if there are any. Then, depending on the rules that were set, a part of the raised assets and the leftover tokens can go automatically into a Uniswap v4 pool. That seeds the first liquidity at a price that fits the auction result. So there's no separate phase where you now figure out liquidity, and you get a clear history of the price discovery and secondary trading right away, with liquidity already funded.

## Why this matters

Why does this matter? CCA tries to separate price discovery from low level mempool and latency games. It gives one uniform price per block and not per single transaction. It makes it harder for bots to front-run retail and for whales to win just by being fast. And it builds a direct bridge from token sale to liquidity bootstrapping on Uniswap v4. It's still an auction. There's competition and prices can go high or low. But the process has more structure and you can see what happens.

## The math with a simple example

To make it concrete, take a single block first, so one clearing event. A CCA with many blocks just repeats this per block with the bid slices. The tokens available in this block are `S = 1,000`, and 10 participants send bids with a maximum price `P_max` and a quantity `Q` they want.

| Participant | Max Price `P_max` | Quantity `Q` |
|------------|-------------------|--------------|
| A | 1.80 | 150 |
| B | 2.20 | 200 |
| C | 1.00 | 50 |
| D | 2.50 | 400 |
| E | 0.90 | 80 |
| F | 1.60 | 120 |
| G | 3.00 | 500 |
| H | 2.00 | 200 |
| I | 1.20 | 100 |
| J | 0.75 | 40 |

Now build the order book. Sort by `P_max` from high to low and add up the demand.

| Rank | Participant | `P_max` | `Q` | Cumulative Demand |
|------|-------------|---------|-----|-------------------|
| 1 | G | 3.00 | 500 | 500 |
| 2 | D | 2.50 | 400 | 900 |
| 3 | B | 2.20 | 200 | 1,100 |
| 4 | H | 2.00 | 200 | 1,300 |
| 5 | A | 1.80 | 150 | 1,450 |
| ... | others | ≤ 1.60 | ... | ... |

We first go over the supply `S = 1,000` when we include participant B. So the clearing price is

\[
P_{\text{clear}} = 2.20
\]

The eligible bidders are the ones with `P_max ≥ 2.20`. G wants 500, D wants 400 and B wants 200. The total eligible demand is

\[
D_{\text{eligible}} = 500 + 400 + 200 = 1{,}100
\]

But we can only give out 1,000 tokens. So all eligible bidders get scaled pro rata by the factor

\[
\alpha = \frac{S}{D_{\text{eligible}}} = \frac{1{,}000}{1{,}100} \approx
0.909
\]

and these are the final allocations.

| Participant | Demand `Q` | Allocation `Q × α` | Price Paid |
|------------|------------|--------------------|------------|
| G | 500 | 454.5 | 2.20 |
| D | 400 | 363.6 | 2.20 |
| B | 200 | 181.8 | 2.20 |

Everyone else gets zero in this block. Their `P_max` is strictly below the clearing price, so they pay nothing and keep their capital. Nobody pays above their max, and everyone who is filled pays the same price.

In a real CCA the auction is split into many blocks, each bid is sliced across the blocks and the logic above runs again and again. Over time a bidder gets a volume weighted average of the clearing prices in the blocks where they were filled.

So in short. You say how much you want and the most you'll pay per token. The protocol spreads your bid across the sale. Each block computes one fair price from all bids. If that price is at or below your max you can be filled, and if it's above you're skipped. Everyone filled in a block pays the same price. And at the end the money and tokens can seed a Uniswap v4 pool by themselves.

## Sources

Uniswap, Continuous Clearing Auctions, Bootstrapping Liquidity on Uniswap v4 (official blog)
https://blog.uniswap.org/continuous-clearing-auctions

Uniswap, Continuous Clearing Auctions Product Page
https://cca.uniswap.org/en/

Uniswap, Continuous Clearing Auction Smart-Contract Repository (GitHub)
https://github.com/Uniswap/continuous-clearing-auction

Aztec Network, Auction Terms and Conditions
https://aztec.network/auction-terms-conditions

Markets.com, Continuous Clearing Auction, New Asset Price Discovery With Uniswap and Aztec
https://www.markets.com/news/continuous-clearing-auction-uniswap-aztec-2195-en

The Defiant, Aztec Network Launches First Token Sale Using Uniswap's Continuous Clearing Auction
https://thedefiant.io/news/defi/aztec-network-launches-first-token-sale-using-uniswaps-continuous-clearing-auction

Algebra (Medium), Continuous Clearing Auctions, A New Standard for Fair Token Launches by Uniswap & Aztec
https://medium.com/@crypto_algebra/continuous-clearing-auctions-a-new-standard-for-fair-token-launches-by-uniswap-aztec-739ba1767fd7

Uniswap CCA Aztec Contract Instance (Etherscan)
https://etherscan.io/address/0x608c4e792C65f5527B3f70715deA44d3b302F4Ee

Panews, A Detailed Look at the Unique Features of Uniswap's New CCA
https://www.panewslab.com/en/articles/50611532-a7d8-4f14-ad67-b460319bc720

Dennison Bertram, X Thread Explaining the Aztec CCA Sale
https://x.com/dennisonbertram/status/1995911827171991948?s=46
