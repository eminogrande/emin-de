---
title: "随便加个Nuri用户就行"
description: "推荐、监护人、继承、Multisig和共同储蓄，在Nuri里都会变成同一个功能。你只要在Settings里加个用户名，其他一切都水到渠成。"
date: "2026-10-18"
updated: "2026-10-18"
lang: zh
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-hinzu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-hinzu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["我对Nuri的构想就一个功能：你在Settings里加上某个人的用户名。", "然后推荐、监护人、继承、Multisig和共同储蓄就都来了，看你开放哪些权限。", "Fee走我们自己的前端，源码公开，费率你自己定，0到21个百分点随便你。"]
sections: [{"basically": "在Nuri，推荐、监护人、继承和Multisig会合成为一个功能。你在Settings里加个用户名就行。"}, {"basically": "谁在Nuri加了个朋友，就跟他分Fee。加了10个人，就除以10。"}, {"basically": "每笔支付都会给你的人发几个Satoshi，外加一条推送。Nuri就是这样传播开的。"}, {"basically": "在可扩展Multisig里，你监护人的密钥只有在你丢了自己的密钥之后才会激活。"}, {"basically": "监护人帮你恢复密钥。继承人得等你一年没动静才能动这笔钱。"}, {"basically": "Nuri不从服务商那里收Fee，而是在自己的前端收，源码公开。"}, {"basically": "在Nuri，Fee你自己定，0到21个百分点。我办派对的时候，捐款是原来的五倍。"}, {"basically": "Nuri的每个API调用都会是一笔小额的x402或L402支付。这样Fee问题就解决了。"}, {"basically": "没人懂Multisig。但三个人加一个硬件钱包，谁都懂。我们就这么解释Nuri。"}, {"basically": "Nuri的第一步只是在Settings里加个朋友，让他跟着赚钱。其他一切都建立在这上面。"}]
---
我觉得我今天早上搞定了一个挺牛的东西。是 Nuri 的一个功能。先说说想法。

## 一个功能顶五个

我想把 Multisig、Guardian、遗产继承和推荐奖励全塞进一个功能里。做法很简单：我在 App 的 Settings 里加上你的用户名。就这一步。

从我加你的那一刻起，我付给 Nuri 的 Fee，你拿 50%。你同时还可以当我的 Guardian。也就是说，以后我账号丢了，你用你的 passkey 帮我恢复。你也可以作为共同签名者进我的 Wallet。或者我们开公司，想一起搞个 Multisig Wallet。

这些听起来是不同的功能。但底层都是同一个前端功能。随便加一个 Nuri 用户就行。

## Fee 对半分

我付给 Nuri 的 Fee，我们先定死，比如 2.1%。我每次付款，一半给 Nuri，另一半给我加的那个人。

你也可以加 10 个用户名。那你就有了一个 10 个人的 Wallet，Fee 除以 10。你新加的人自动分到一份，Nuri 拿十分之一。

当然也可以互相加，那钱又转回我这儿了。我们得注意别搞出循环来。那肯定不行。

## 我妈收到 17 聪

Bitcoiner 都想拉别人入坑。现在我可以拉我妈。我每次付款，她都会收到一条推送。你刚收到 20 聪。你刚收到 17 聪。

我自己就体验过。另一个服务每次有 Swap 发生就给我发 Telegram 消息，说我刚赚了 10 聪。这是我经历过最病毒式传播的东西。挺逗的，大家互相塞点小钱。

用 Arkade 我们可以免手续费转 1、2、3、4、5 聪。这也顺便秀了一下 Arkade 在这块有多强。

## 扩张型 Multisig，而不是衰减型

我们加的这些 Key，跟我们平时在 Nuri 做的正好相反。如果我们不想让他们一开始就是签名者，那就不是 Decaying Multisig，而是 Expanding Multisig。

也就是说，如果我所有 Key 都丢了，过一段时间，比如一年，我 Guardian 的 Key 会自动激活。Bitcoin 上能做这个。Ethereum 上可能难点，但肯定也能搞。

当然，这些都是可以调的设置。不能因为你一年没动你的 Bitcoin，别人就能拿你的钱。

## Guardian 和遗产

Guardian 是一个功能。这块我想直接抄 Bitkey 的做法。他们搞的那个方案，你的 Guardian 能帮你恢复 Key，但碰不到你的钱。他们具体怎么实现的，我们还得研究一下。

另一个功能是遗产继承，这个极其重要。比如我想把我妹妹设成我的继承人。我每次付款，计数器就归零。万一我出事了，不管什么原因，第二天早上没醒过来，一年后她就自动激活，能动我的钱。这种东西重要得要命，也酷得要命。

## Fee 放在前端

更重要的是 Fee 放在哪。现在我们是在 Provider 那边收的，这是错的。我们应该把 Provider 那边的 Fee 全降到零，在我们这边收，放前端或者我们的后端。Nuri 后面可以挂一千万个 Provider，无所谓。他们赚他们的差价和 Fee，我们一分钱不加。

这样我们就能区分 Nuri Fee 和 Partner Fee。干干净净。而且我想在开源代码里给大家看，看，Fee 就在这儿，写在源码里。我想让我们成为全世界最透明的公司。

我最喜欢的例子是 Aave 社区那次炸锅，因为后台偷偷换了 Swap Provider。这说明后端已经没有话语权了，前端才有。谁有用户，谁就有护城河。

## Fee 你自己定

我们甚至让用户自己定 Fee。纯粹为了公平。你不想付 Fee，就调到 0%。你想的话也可以调到 21%。有人问你们凭什么收 2%，我们就说，去 Settings 自己改。

我为什么觉得这招能成？因为我在柏林办派对的经验。不管我门票收多少，啤酒卖多少钱，大家总觉得不爽。后来我们说，去他妈的，啤酒随缘打赏，门票随缘打赏。结果赚的钱大概是原来的五倍。

你让人们自己定，就有人定得高得多。因为他们觉得这种游戏化很爽，或者他们认同这个使命。有富人也有穷人，有抠门的也有大方的。我在大会上认识的人，加进我的账号，我会把 Fee 调到 21%。这样他们自动拿到我的分成。

## 每次调用都是一笔小钱

我还有个更好的收费点子。我们直接用 Micropayment 给 Nuri API 设门槛，这些 Micropayment 就是我们的 Fee。App 里每个操作都花一笔小小的 x402 或 L402 付款。跟 Bitcoin 有关的用 L402，跟其他 crypto 有关的用 x402。

举个例子。在你的 Nuri 密码管理器里存一个新密码或者读一个密码，花 0.1 分或者 1 分钱。这个可以直接从 Wallet 扣，因为它是 agentic 的。我在 Router 上已经这么干了。你可以用 Token 调，也可以按次付费，我们能给每个端点定不同的价。

这样你就不用自己搞 Fee 系统了。谁都可以随便集成我们的 API，我们自动收到钱。我会从通讯录开始，每加一个联系人收 0.1 分。跑通了再推广到整个 App。一次一个功能。

## 家庭 Wallet 和硬件 Wallet

人们一旦体验过我们公司那种 Safe Wallet 怎么运作，就会觉得特别酷。我有一把钥匙，但只有大家一起才能付款。这种 crypto 体验是真的爽。

或者家庭 Wallet。我妈、我妹妹和我。我们三个里两个就能一起付款。Multisig 这个词没人听得懂。但你说，我们三个人加一台硬件 Wallet，或者五个人加一个 AI，谁都懂。

而且我们坚持那个别人做不到的原则。一键 Face ID Wallet。没有助记词，抗钓鱼，默认 Multisig。

## 第一步

我们慢慢来。第一步只是让我在 Settings 里加个朋友当我的学徒，然后他自动分到钱。然后我们能在数据库里看到谁加了谁，发生了哪些 Swap，再把推荐奖励发出去。

你转账的时候，我们应该自动补全所有 Nuri 用户。不只是你的联系人，是所有用户。我打个 L，所有 L 开头的人都出来，跟 PayPal 一样。

后面再做 Key 轮换、加 Key 删 Key、接硬件 Wallet。这些反正都得做。但从愿景上讲，我觉得这绝对完美。因为你能从别人身上分钱，或者当他的共同签名者，这功能传播起来太猛了。
