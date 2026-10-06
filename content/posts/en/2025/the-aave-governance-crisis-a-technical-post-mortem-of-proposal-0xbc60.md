---
title: "The Aave governance crisis, a post-mortem of proposal 0xbc60"
description: "Aave Labs kept the frontend swap money, the DAO wanted the brand back, and then Labs pushed the vote alone. What happened and what it means for DAOs."
date: "2025-12-22T18:25:02Z"
updated: "2025-12-22T18:25:02Z"
lang: "en"
category: "bitcoin"
format: "summary"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/the-aave-governance-crisis-a-technical-post-mortem-of-proposal-0xbc60/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 204
emin_check_pct: 28
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/the-aave-governance-crisis-a-technical-post-mortem-of-propos/"
---
![](../../../media/the-aave-governance-crisis-a-technical-post-mortem-of-proposal-0xbc60/cover.jpg)

In late December 2025 the Aave DAO hit the biggest crisis it
had since the protocol started. It began as a technical fight
about who gets the money from the
[app.aave.com](http://app.aave.com) frontend, and it turned
into people calling it a hostile takeover.

So now it's a case study for something every DAO will run into
sooner or later, the split between the protocol, which is code
that can't change, and the product, which is a brand that can.

This post goes through the 164-post governance thread, the
move by Aave Labs to push the vote to Snapshot on their own,
and what it means for decentralized governance in general.

For years the Aave world ran on a handshake. Aave Labs (before
that Aave Companies, led by Stani Kulechov) took care of the
brand, and the DAO, so the token holders, governed the
protocol.

That worked until Aave Labs put CowSwap into the official
frontend and sent the surplus and referral money to their own
company and not to the DAO treasury.

And the money matters here. Protocol revenue goes to the DAO
through the reserve factors. Frontend revenue was never really
defined and used to be tiny, but now it's estimated at $10M+ a
year from swap fees and integrations.

Token holders, led by big delegates like EzR3aL and Marc
Zeller of the Aave Chan Initiative, said this was a breach of
fiduciary duty. The DAO paid for building the protocol,
through the 2017 ICO and through grants, so why should a
private company keep the value of the frontend?

Marc Zeller (ACI) put it like this. "It seems we have been
fooled in considering this a natural alignment, and we
acknowledge the new reality... When you own $AAVE, what do you
actually own?"

On Dec 16, 2025 Ernesto Boado (`@eboado`), co-founder of BGD
Labs, the core tech service provider of Aave, posted a
proposal called "Token Alignment Phase 1 - Ownership". The
idea was to make the split official.

His main point was technical and legal at the same time. A DAO
can't be autonomous if its public face belongs to a private
benevolent dictator.

The proposal had 3 parts. First, move the soft assets, so the
domain [aave.com](http://aave.com), the social handles like
`@aave`, the trademarks and the GitHub orgs, into a legal
wrapper the DAO controls, for example a Cayman foundation.

Then the DAO would license these assets back to service
providers, Aave Labs included, under strict terms you can
actually enforce. And there would be "Strict mechanisms so
that no third party can misuse these assets or privately
benefit from them."

Boado wrote in Post #1, "Not having a resolution on this issue
is an existential threat to the DAO model... If a single party
can control soft assets like brand, marketing channels, and
gateways... all other contributors become de facto
subordinated to that party."

Aave Labs didn't really fight it out in text on the forum. But
what they did and the arguments they backed show a clear line
of defense, and it's about composability and the rights of a
company.

Stani Kulechov wants Aave Labs to build a consumer fintech
product (Aave Horizon or Aave App) that goes up against
Revolut or Monzo. In that view
[app.aave.com](http://app.aave.com) is their own product built
on top of the protocol. `Instadapp` and `DeFi Saver` don't pay
royalties to the Aave DAO for using the protocol either, so
Aave Labs thinks they have the right to make money with their
own frontend.

And they say a DAO is just too slow to run a consumer brand,
you need one company in charge to move fast in fintech.

A user called setaavefree wrote in Post #11, "The Aave
protocol, as a series of smart contracts governed by a DAO, is
unconventional... Aave the protocol doesn't need to own a
website, a domain name, or even a brand. It exists in perfect
and pure form without any of those."

Then on December 22, 2025 it stopped being a forum debate and
became a real governance crisis. Aave Labs used their admin
rights to push Boado's proposal to a Snapshot vote on their
own, without the author and without the normal feedback round.

The vote was set for Dec 23, right in the holidays when the
big institutional delegates are less active. And Boado had
said clearly that he did not approve the text for a vote.

In Posts #120 to #130 the forum blew up with accusations of a
hostile takeover. The market reacted too, $AAVE dropped about
10% and a whale sold $37M, so the governance risk got priced
in.

Boado wrote in Post #124, "To be very clear about it: Aave
Labs has, for some reason, decided to rush to vote
unilaterally my proposal... This type of action breaks all
types of trust...

For me, the current Snapshot proposal created by Labs is
nonexistent." And Marc Zeller wrote in Post #123, "This did
not have to escalate this way... What started as a push for
clarity... is now turning into a hostile takeover attempt by
Labs."

Stani Kulechov said on X (formerly Twitter) and through
spokespeople that the extensive discussion of 5 days was
enough and that "voting is the best way to resolve" the
deadlock.

The whole fight shows a real flaw in how DAOs are built today.
There is no link between the code on-chain and the IP
off-chain. You can see it when you look at the 4 pieces.

The smart contracts belong to the token holders through the
timelock, today and also with the wrapper. The domain (DNS)
belongs to Aave Labs as a private company today, and with the
wrapper it would belong to the DAO legal wrapper.

The frontend code is closed source and private today, and it
would be licensed to the DAO or made open source. And the
revenue is split today, protocol money to the DAO and frontend
money to Labs, and with the wrapper it would be unified or
strictly licensed.

Some delegates (Post #113, #118) talked about a kind of poison
pill. Fork the frontend, send the liquidity incentives to a
new frontend the DAO owns, or even hire a new dev team to
replace Aave Labs completely.

So the code can't change, but the social consensus around it
can swing very fast.

The 164-post thread of proposal 0xbc60 is a warning for every
DAO that is past the early phase. The implicit agreement, the
belief that founders will always act in the best interest of
the DAO, is a single point of failure.

So the DAO has 2 options. If it votes yes, it forces a legal
fight over moving the IP, and if Aave Labs says no that could
end in a fork.

If the DAO votes no, it sets a precedent that service
providers can take the value of the frontend, and the DAO
becomes just backend infrastructure with no control over its
own customers. The DeFi stack is composable, but trust is not.
