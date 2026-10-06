---
title: "Radical Georgism"
description: "A talk led by a member of the Amoveo project about land value tax on a blockchain and why crypto might finally make Georgism work"
date: "2026-01-20T09:50:01Z"
updated: "2026-01-20T09:50:01Z"
lang: "en"
category: "culture"
format: "summary"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: true
cover: "../../../media/radical-georgism/cover.webp"
voice_check:
  em_dash: 4
  unobserved: 316
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/radical-georgism/"
tldr:
  - "A conversation from early 2026 argues that blockchains could finally make a Land Value Tax work, with no human assessor to bribe."
  - "Land plots become paths in a Verkle tree, and the code estimates land value from neighbouring plots with exponential weighting."
  - "The second half debates money itself: a land-backed, yield-bearing token against Bitcoin's Lindy effect and network moat."
basically:
  land-value-has-two-parts: "Georgism taxes the location value a community creates at 100% and buildings at 0%."
  the-blockchain-as-the-assessor: "Land Value Tax failed because humans set the values and could be bribed. A blockchain can't be."
  a-land-registry-in-a-verkle-tree: "Cut the globe in half about 23 times and every plot on Earth gets its own path in a Verkle tree."
  how-the-code-guesses-land-value: "The algorithm values a plot mostly by the land right next to it, and cares less the further it zooms out."
  beachfronts-gaming-and-who-gets-the-tax: "The model may undertax beachfronts and the tax may go to all VEO holders, but it can still out-compete."
  a-truth-both-sides-hate: "An idea toxic to both left and right may hold a deep truth: tax only land and leave creators alone."
  what-money-really-is: "You can't eat money. In this view a currency needs a sink, like taxes or land fees, to keep its value."
  complexity-moats-and-yield: "The debate: Bitcoin's simplicity and moat against the claim that a yield-bearing asset wins over time."
---
![](../../../media/radical-georgism/cover.jpg)

This is a summary of a conversation from early 2026, led mostly by a member of the Amoveo project.

The conversation is about Georgism, so Land Value Tax (LVT), and blockchain. The idea is that crypto might be the only tool that can finally make a working Land Value Tax possible.

The member sees a big political irony in it, a real paradox. Anarchists and libertarians on one side and the "LVT guys", the Georgists, on the other side are often against each other, but they hold the keys to each other's goals.

The anarchists have the decentralized tools to take traditional government apart, and the Georgists have the tax model that could make a stateless society actually work economically. So Radical Georgism is a missing link between two ideologies that often clash, anarcho-capitalism, which hates government intervention, and socialism, which focuses on resources the community owns.

## Land value has two parts

A core tenet of the discussion is that land value has two parts. There are improvements, so what the owner builds, and there's location value, which the community around it creates. Your land gets more valuable when a neighbor builds a great restaurant, even if you do nothing.

And unlike a computer or a car, nobody created land. Its value comes from where it is. If you own a plot in a desert and someone builds a city around it, your land value spikes and you did zero work.

The Georgist answer is to tax this location value, the unearned wealth, at 100% and to tax improvements like buildings, farms and factories at 0%. That way people build productive things and don't just sit on land and wait for the price to go up.

## The blockchain as the assessor

Historically LVT failed because humans calculate the land value, and that leads to corruption in the whole system. Whoever decides the value can be bribed to lower the tax for friends or raise it for enemies. The member argues that a blockchain can do these calculations automatically, in a way that's transparent, mathematical and can't be corrupted, so you don't need a central tax authority that makes mistakes.

The blockchain becomes a mathematical judge, the incorruptible assessor, and without human assessors the system turns into a trustless economic engine.

## A land registry in a Verkle tree

The technical idea is to use Verkle trees, a data structure that's very efficient for proofs, as a global land registry. A binary tree sits inside a base-256 Verkle tree, and land plots are defined by a series of lines drawn on the globe.

You draw a line across the globe and cut it in half. Then you cut those halves in half. If you do this about 23 times, you're left with one small plot of land. So every piece of land on Earth has its own path of 23 binary decisions, left or right, north or south.

A big technical problem in 2026 is state bloat, which means the blockchain gets too heavy to run on a normal computer. With Verkle proofs a user can prove they own a piece of land and calculate its tax bill without downloading the whole global registry. They only need the lines, so the proofs, that lead to their own plot.

## How the code guesses land value

The valuation is the brain of the system. There's no human appraiser, so the code has to guess the value of the land. The member proposes an algorithm that looks at the average land price in the branches of the tree around the plot.

If you zoom out too far, you include low-value areas like the ocean, and outliers like a random mansion in a forest can skew the data. So they use exponential weighting. It puts the most weight on the price of the land right next to the plot and gives a good enough estimate of raw land value.

You look at the branches of the tree at different levels of zoom, and the further the tree zooms out, the less the system cares about that data.

The formula that weights the land values around the plot is

$$V_{estimate} = \sum_{n=1}^{D} \left( \frac{1}{2} \right)^n \times A_n$$

Here $n$ is the level of the tree, so how far you've zoomed out, $A_n$ is the average price per square meter in that branch and $D$ is the total depth, usually around 23.

For normal people this means that if your neighbor's land is worth a lot, the algorithm assumes your land, the location, is also worth a lot. And because of the

$$(1/2)^n$$

multiplier, a price spike in a city 100 miles away doesn't accidentally raise your taxes in the countryside.

## Beachfronts, gaming and who gets the tax

Someone in the chat raised the beachfront problem. Land values aren't always smooth, and a beachfront property can have a massive price spike compared to land just a few meters inland. The group's conclusion was that the model might undertax outliers like this, but it would still be a lot more efficient than any tax system that exists today.

To stop users from gaming the system with lopsided data trees that lower their taxes, the member suggests a Reorganization Incentive. If users can reorganize the tree to make their own bills as small as possible, they'll naturally build a perfectly balanced binary tree, and that's exactly what the blockchain needs to stay fast.

In a perfect Georgist system the taxes go back to the local community that created the value. But on a pseudonymous blockchain it's hard to prove which wallet belongs to which neighborhood, and on a global chain nobody knows who lives where.

The member suggests a trade-off. Even if the land tax just goes to everyone who holds the currency, the VEO holders, the gain in economic efficiency would still let the system win over traditional alternatives like banks and governments. It's not perfectly local, but it's efficient enough to out-compete them.

## A truth both sides hate

The member also says that when an idea is politically toxic to both the left and the right, it probably contains a deep truth. If you remove every tax except the land tax, you get something that's hyper-capitalist for creators but communal for the surface of the Earth.

The discussion also mentions that in some Nordic countries ownership is already limited by the freedom to roam (Allemannsretten), so the public is allowed to cross or camp on private land. Land rights are a social construct, and a blockchain can define them in a new way.

In this view geography is data and the world is a set of mathematical proofs. If land titles become Verkle tree paths and land valuation becomes a weighted average of the data points next to it, you get a society where monopolies on land are impossible, because the tax makes it too expensive to hold unused land, where productivity is never punished, because your buildings and work are taxed at 0%, and where government is code, because the tax collector is an open-source algorithm.

## What money really is

A later part of the conversation turns into a debate about what money really is, and whether Bitcoin (BTC) can survive against an asset that earns a yield through land. The member argues from Monetary Realism, and the other side, distbit, defends the Lindy Effect and network moats.

The member's view is stark. "You can't eat money." Money has no value in itself, it's only a claim on the time and energy of other people. For a currency to stay valuable for a long time there has to be a sink, a reason people are forced to sell their labor to get it.

Modern fiat like the USD is backed by the obligation to pay taxes. The member's system is backed by the obligation to pay for land use. Bitcoin instead relies on a voluntary expectation of future value, and the member warns it could behave like a pyramid scheme if growth stalls.

So the proposed land registry doesn't just manage land, it also eats the currency it's denominated in. In a Harberger tax model you keep paying a percentage of the value you put on your own property to keep your title.

If you pay that in the system's native token, the token becomes yield-bearing. As global real estate, worth hundreds of trillions, moves into the registry, demand for the token grows with it. The currency doesn't just sit there, it captures the economic energy of the land it stands for.

## Complexity, moats and yield

distbit's technical critique is that complexity means risk. Bitcoin is simple and that's why it's secure. A land registry, automated taxes and yield on top give hackers and system failures a much bigger attack surface. The member answers that yield isn't a feature but a need for survival, like in biology.

An asset that loses 5% of its relative value against a more efficient competitor with yield will lose its Schelling point, the place where everyone agrees to meet, very quickly.

The member also says real estate is already a kind of money. People use property to store wealth and to hedge against inflation. So instead of building Bitcoin up into a competitor to real estate, they think it's easier to upgrade real estate with crypto features like tokenization and permissionless registries. Why fight a real estate market of $300+ trillion when you can just absorb it into a blockchain?

The member doesn't believe in brand loyalty in finance either. distbit argues Bitcoin has a moat with security, liquidity and history, but the member thinks open-source software isn't economically sticky. In a digital world it gets easier and easier to move your wealth from an asset without yield, like BTC, to one with yield.

If a better money shows up, the member thinks people will move faster than the incumbents expect.

The member thinks from first principles, like in physics, and doesn't care about market sentiment or crypto culture. The questions are where the pressure comes from that forces people to use the token, so the energy sink, then the total addressable market (TAM), so why aim for the gold market ($14T) when the land market is 20x larger, and then game theory.

If asset A yields 5% and asset B yields 0%, when does a rational actor keep asset B? The member's answer is almost never, long term.
