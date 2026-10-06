---
title: "How Continuous Clearing Auctions (CCA) work, the technical version"
description: "Uniswap's CCA sells a token over many blocks at one fair price per block and then seeds a Uniswap v4 pool. Here is the math and an example"
date: "2025-12-02T18:15:02Z"
updated: "2025-12-02T18:15:02Z"
lang: "en"
category: "building"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
original_title: "Untitled Post"
cover: "../../../media/continuous-clearing-auctions-cca-technical-overview/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 227
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/untitled-post/"
tldr:
  - "Continuous Clearing Auctions sell a token over many blocks, and each block clears at one uniform price."
  - "Bidders set a size and a max price once, and the protocol slices the bid across the remaining blocks."
  - "When the sale ends, the result seeds a Uniswap v4 pool directly."
  - "The Aztec Network public token sale is the first big real use."
basically:
  setup-and-bidding: "The project sets supply, duration and graduation rules. Bidders send one order with a max price."
  how-one-block-clears: "Each block clears at the lowest price where demand covers supply, pro rata at the margin."
  a-simple-example-with-numbers: "1,000 tokens and ten bidders: G, D and B fill at 2.20, scaled by about 0.909."
  uniswap-v4-and-how-it-compares: "The final auction state sets up the first v4 liquidity, so price discovery also funds the pool."
  compared-to-other-launch-formats: "Unlike fixed price, Dutch or instant AMM launches, speed and sniping don't decide who gets in."
  the-aztec-sale: "Aztec runs its public sale through a CCA contract, and leftovers plus raised money seed a v4 pool."
  sources: "Uniswap's blog, product page and repo, Aztec's terms, the Etherscan contract and coverage."
---
![](../../../media/continuous-clearing-auctions-cca-technical-overview/cover.jpg)

# How Continuous Clearing Auctions (CCA) work, the technical version

Continuous Clearing Auctions, or CCA, are an on-chain auction protocol from Uniswap (Universal Navigation Inc.). The idea is to sell a token over many periods and then put the liquidity straight into a Uniswap v4 pool. A project sets up a sale that runs over many separate auction blocks. Bidders send in a size and a price, the protocol splits that across the blocks, and each block clears at one uniform market price based on the demand that came in.

It's built as its own smart contract system, a Continuous Clearing Auction contract plus a factory, and it's meant to be used together with the Uniswap Liquidity Launcher. The Aztec Network public token sale is the first big real use of it.

## Setup and bidding

How does it work? First the setup. A project defines at least the total tokens to sell `Q_total` and how long the auction runs, as a number of blocks or a time range. It also sets some starting guidance, like a starting price and maybe a price floor or a reserve curve. Then the graduation conditions, so the checks that decide if the sale is done and worked, for example a minimum of capital raised, a minimum average price or other criteria. And the rules for seeding liquidity, so how much of the raised assets and the leftover tokens go into a Uniswap v4 pool at the end. During the sale window the auction contract is the only seller of the token.

Then the bid. A bidder sends one order with a maximum spend or the quantity they want, and the highest price they accept, `P_max`. They can also add other wishes like a minimum fill size. The protocol spreads this bid over all the auction blocks that are left, and in each block a part of the bid takes part in price discovery.

## How one block clears

For a given block `t`, let `S_t` be the token supply for block `t`, and let `B_t` be the multiset of active bid slices for block `t`, each with `(P_max_i, Q_i^t)`.

The clearing price of the block, `P_clear_t`, is the lowest price where the total demand at or above that price weakly exceeds `S_t`. So you sort all `P_max_i` from high to low and add up the matching `Q_i^t` until

\[
\sum_{i: P_{\text{max},i} \ge P_{\text{clear},t}} Q_i^t \ge S_t
\]

and then `P_clear_t` is the threshold price for that block.

All filled slices in block `t` trade at `P_clear_t`. If demand at or above the clearing price is strictly bigger than `S_t`, they get scaled pro rata.

That scaling happens at the margin. If the last price level that fills the block is oversubscribed, the protocol scales the bidders who sit exactly at that threshold price. Let `D_strict` be the total demand from bids with `P_max > P_clear_t` and `D_equal` the total demand from bids with `P_max = P_clear_t`. If `D_strict ≥ S_t`, then everything is filled strictly above the threshold and a slightly higher clearing price is picked. If not, the capacity left is `S_t - D_strict`, and the bids at `P_clear_t` get scaled like this

\[
\text{allocation}_i = Q_i^t \times \frac{S_t -
D_{\text{strict}}}{D_{\text{equal}}}
\]

and every allocation pays exactly `P_clear_t`.

And there is a max price safety. For every bidder `i` and every block `t`, if

\[
P_{\text{clear},t} > P_{\text{max},i}
\]

then their slice for that block just doesn't execute. Slices that weren't used stay there for later blocks as long as the auction runs, or you can withdraw them, depending on the rules of the sale.

## A simple example with numbers

To keep it simple, take an auction with a single block. The supply in this block is `S = 1,000` tokens and there are 10 participants, each with `(P_max, Q)` like this.

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

Now sort the bidders by `P_max` from high to low and add up the demand.

| Rank | Participant | `P_max` | `Q` | Cumulative Demand |
|------|-------------|---------|-----|-------------------|
| 1 | G | 3.00 | 500 | 500 |
| 2 | D | 2.50 | 400 | 900 |
| 3 | B | 2.20 | 200 | 1,100 |
| 4 | H | 2.00 | 200 | 1,300 |
| 5 | A | 1.80 | 150 | 1,450 |
| ... | others | ≤ 1.60 | ... | ... |

We first go over the supply `S = 1,000` when we include B. So the clearing price is

\[
P_{\text{clear}} = 2.20
\]

The eligible bidders are the ones with `P_max ≥ 2.20`, so G with 500, D with 400 and B with 200. The total eligible demand is

\[
D_{\text{eligible}} = 500 + 400 + 200 = 1{,}100
\]

and the pro rata factor at the margin is

\[
\alpha = \frac{S}{D_{\text{eligible}}} = \frac{1{,}000}{1{,}100} \approx
0.909
\]

That gives these final allocations.

| Participant | Demand | Allocation `= Q × α` | Price Paid |
|------------|--------|----------------------|------------|
| G | 500 | 454.5 | 2.20 |
| D | 400 | 363.6 | 2.20 |
| B | 200 | 181.8 | 2.20 |

Everyone else gets zero in this block. Nobody pays more than the `P_max` they set, and every filled unit trades at the same uniform price of `2.20`. An auction with many blocks is just this logic again, run for every block with its share of tokens and the bid slices that are active.

## Uniswap v4, and how it compares

In Uniswap's version CCA is its own protocol, but it's built to feed straight into a Uniswap v4 pool through hooks when the sale ends. The final state of the auction, so the total capital raised, the last clearing price and the tokens that are left, sets up the first liquidity position. So the auction is the price discovery phase and also pre-funds the pool, and you don't need a separate step to figure out liquidity later. The Aztec sale uses exactly this. The CCA contract does the price discovery and a dedicated "Aztec: Continuous Clearing Auction" contract address on Ethereum tracks bids and fills.

## Compared to other launch formats

Compare that to a fixed price sale. There the project sets one price up front and it's first come first served until the allocation is gone. Latency and gas bidding decide who gets in early, and the price is often wrong, so either the issuer leaves capital on the table or buyers see slippage right when secondary trading starts. With CCA the clearing price comes out of the order book of each block, allocation depends on how much price you tolerate and not on how fast your transaction is, and the final price fits the total demand by construction.

A Dutch auction starts high and ticks down over time. Rational bidders try to wait for lower prices but not so long that supply runs out, so strategic timing and sniping at the block level matter a lot, and the clearing price you see may show the timing game more than a best guess of long-term value. With CCA you state your `P_max` once and your bid gets sliced across blocks. You don't have to watch and resubmit when the price moves. And clearing happens continuously in blocks, not on one descending path, so it's closer to repeated uniform price auctions than to one Dutch clock.

A one-shot uniform price auction, the sealed bid kind, takes all bids once and computes one clearing price with pro rata scaling at the margin. But it doesn't bootstrap AMM liquidity by itself, there is often a separate pool creation transaction after, and bidders can't react to new information between blocks. CCA keeps the uniform price but repeats the clearing over many intervals, connects automatically to a Uniswap v4 pool at the end, and allows longer sale windows where participation changes while every block still gets a clear price.

And then the AMM instant listing, like launching a Uniswap v3 or v4 pool directly. Tokens go into a pool and trading starts right away. Early trades hit thin liquidity and high slippage, MEV and mempool competition shape the launch price a lot, and there is no real clearing price or ordered demand curve. In CCA explicit bidding replaces trading during the sale, price discovery happens by adding up an order book and not along a constant product curve, and the final clearing state then sets up the pool. So the sale and secondary trading are two separate phases.

## The Aztec sale

For the Aztec token sale, the Aztec Network public auction terms talk about a "novel Uniswap Continuous Clearing Auction (CCA) format" that should reduce price manipulation and support open, on-chain price discovery. Bids go through the CCA contract, which computes clearing prices and token allocations again and again. After the sale the leftover tokens plus a part of the money raised are expected to seed a Uniswap v4 pool, as the CCA and Liquidity Launcher design says.

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
