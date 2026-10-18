---
title: "Nuriは誰でもユーザーを追加するだけ"
description: "紹介、Guardian、相続、Multisig、共同貯金。Nuriではこれが全部1つの機能になる。Settingsでユーザー名を追加するだけで、あとは全部そこからついてくる。"
date: "2026-10-18"
updated: "2026-10-18"
lang: ja
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
tldr: ["俺のNuriのアイデアは、たった1つの機能。Settingsで誰かのユーザー名を追加するだけだ。", "そこから紹介、Guardian、相続、Multisig、共同貯金が全部ついてくる。お前が何を許可するか次第だ。", "Feeは俺たちのフロントエンドにあって、ソースコードで公開されていて、お前が0から21%の間で自分で設定する。"]
sections: [{"basically": "Nuriでは紹介、Guardian、相続、Multisigが1つの機能になる。Settingsでユーザー名を追加するだけだ。"}, {"basically": "Nuriで友達を追加したら、Feeをその人と分け合う。10人追加したら10で割る。"}, {"basically": "支払いのたびに、お前の仲間に数Satoshiとプッシュ通知が届く。これでNuriはバイラルになる。"}, {"basically": "Expanding Multisigでは、Guardianのキーはお前が自分のキーを失くしたときに初めて有効になる。"}, {"basically": "Guardianはお前のキーの復元を手伝ってくれる。相続人はお前が1年間何もしなかったときに初めてアクセスできる。"}, {"basically": "NuriはFeeをプロバイダーから取らない。自分たちのフロントエンドで取る。ソースコードで公開されている。"}, {"basically": "Nuriではお前が自分でFeeを設定する。0から21%まで。俺のパーティーでは、寄付で5倍集まった。"}, {"basically": "NuriのAPIコールは全部、小さなx402かL402の支払いになる。これでFeeの問題は解決だ。"}, {"basically": "Multisigなんて誰も理解しない。3人とハードウェアウォレットなら誰でも分かる。Nuriはそう説明する。"}, {"basically": "Nuriの最初のステップは、Settingsに友達を1人追加するだけ。その人も一緒に稼げる。あとは全部その上に積み上がる。"}]
---
今朝、かなりいいアイデアを思いついた気がする。Nuriの機能の話だ。まずはアイデアから。

## 5つの機能を1つに

Multisig、Guardians、Inheritance、Referralを1つの機能にまとめたい。やり方はこうだ。アプリのSettingsに、君のUsernameを追加するだけ。それだけ。

そうした瞬間に、俺がNuriに払うFeeの50%が君に入る。同時に、君は俺のGuardianにもなれる。つまり、将来俺がアカウントを復元するとき、君のPasskeyで手伝ってくれる。Co-SignerとしてWalletに入ることもできる。あるいは、俺たちが会社で、一緒にMultisig Walletを持ちたいとか。

これらは全部別々の機能なんだけど、ベースは同じFrontend機能だ。Nuriユーザーを誰でも追加するだけ。

## Feeを分ける

俺がNuriに払うFeeは、とりあえず2.1%くらいに固定しよう。俺が支払いをするたびに、半分はNuriに、もう半分は追加した人に行く。

10人のUsernameを追加してもいい。そうしたら10人のWalletがあって、Feeは10で割られる。新しく追加した人全員が自動的にCutをもらって、Nuriは10分の1をもらう。

もちろん、お互いに追加し合うこともできるけど、そうすると俺に戻ってくる。そこでループを作らないように気をつけないと。それはダメだ。

## 母さんに17 Satoshi

Bitcoinerは他の人をBitcoinerにしたがる。今なら母さんを招待できる。そうしたら、俺が支払いをするたびに、彼女にPush通知が行く。20 Satoshiもらったよ。17 Satoshiもらったよ。

自分でも経験ある。別のサービスで、Swapが起きるたびにTelegramメッセージが来て、10 Satoshi稼いだって書いてある。あれは自分が経験した中で一番バイラルなものだった。面白いし、お互いにちょっとずつお金をあげ合う感じだ。

Arkadeなら、1、2、3、4、5 SatoshiをFeeなしで送れる。これもArkadeがどれだけすごいかをちょっと示してる。

## DecayingじゃなくてExpanding Multisig

追加するKeyは、Nuriでいつもやってることの逆をやる。最初からSignerにしたくないなら、Decaying MultisigじゃなくてExpanding Multisigだ。

つまり、俺が全部のKeyを失くしたら、1年くらい経った後に、GuardianのKeyが自動的に有効になる。Bitcoinならできる。Ethereumはたぶん難しいだろうけど、きっとできる。

もちろん、これはSettingsで設定できる。1年Bitcoinを動かさなかっただけで、誰かが君のお金にアクセスできるようにはならない。

## Guardianと相続

Guardianは1つの機能だ。これはBitkeyとまったく同じようにやりたい。彼らは、GuardianがKeyの復元を手伝えるけど、お金にはアクセスできないように作ってる。どうやってるかは、まだ調べないと。

もう1つの機能はInheritanceだ。これはめちゃくちゃ大事。例えば、妹を相続人として登録したい。俺が支払いをするたびに、カウンターがゼロにリセットされる。もし俺に何かあったら、理由は何でも、次の日目覚めなかったら、1年後に自動的に有効になって、俺のFundsにアクセスできる。こういうのは超重要で、超かっこいい。

## FeeはFrontendにある

もっと大事なのは、Feeがどこにあるかだ。今はProviderで取ってるけど、それは間違いだ。ProviderでのFeeは全部ゼロにして、俺たちが取るべきだ。FrontendかBackendで。Nuriの後ろには1000万のProviderがいてもいい、全然関係ない。彼らは自分のSpreadとFeeを取って、俺たちは上乗せしない。

これでNuri FeeとPartner Feeを区別できる。シンプルでクリーンだ。Open Sourceのコードで人に見せたい、ほら、ここにFeeがある、ソースコードに書いてあるって。世界で一番透明な会社になりたい。

好きな話は、AaveコミュニティでSwap Providerが裏で変わったときの大騒ぎだ。あれでわかるのは、Backendにはもう力がなくて、Frontendにあるってこと。ユーザーを持ってる方がMoatを持ってる。

## Feeは自分で設定

Feeは自分で設定できるようにする。公平のためだ。Feeを払いたくないなら、0%にできる。21%にしたければ、それもできる。誰かが「なぜ2%取るの？」って聞いたら、Settingsに行って変えろって言う。

なぜうまくいくと思うか？ベルリンのパーティーのおかげだ。入場料をいくらにしても、ビールの値段をいくらにしても、みんななんかクールじゃないって思ってた。ある時、fuck itって言って、ビールは寄付、入場も寄付にした。5倍くらい稼げた。

人に自分で決める機会を与えると、はるかに高く設定する人もいる。Gamificationが好きだからとか、Missionに賛同してるからとか。金持ちもいれば貧乏人もいる、ケチもいればそうじゃない人もいる。カンファレンスで会った人を俺のアカウントに追加したら、俺のFeeを21%にする。そうしたら、自動的に俺のSplitがもらえる。

## すべてのCallが小さな支払い

Feeの取り方でもっといいアイデアがある。Nuri APIをMicropaymentsでゲートするだけだ。Micropaymentsが俺たちのFee。アプリのすべての操作が、小さなx402かL402の支払いになる。Bitcoin関係ならL402、Crypto関係ならx402だ。

例えば。Nuriパスワードマネージャーに新しいパスワードを保存するか読むかで、0.1セントか1セントかかる。Walletがagenticだから、直接Walletから取れる。Routerではもうそうしてる。Tokenで使うか、Callごとに払うか選べて、エンドポイントごとに違う値段をつけられる。

そうすれば、自分でFeeシステムを作る必要がない。誰でも俺たちのAPIをどこにでも組み込めて、自動的にPaymentが来る。最初は連絡帳から始める。連絡先を追加するたびに0.1セント。うまくいったら、アプリ全体に広げる。一度に1つの機能ずつ。

## 家族WalletとHardware Wallet

会社として持ってるSafe Walletがどう機能するかを一度体験したら、みんなすごいと思う。俺は1つのKeyを持ってるけど、支払いは一緒にしかできない。これは本当にすごいCrypto体験だ。

あるいは家族Wallet。母さん、妹、俺。2人いれば一緒に支払える。Multisigなんて誰も想像できない。でも、3人で1つのHardware Walletとか、5人と1つのAIとか言えば、誰でもわかる。

そして、他の誰もできない原則を守る。ワンクリックFace ID Wallet。Seedless、Seed Phraseなし、phishing-resistant、デフォルトでMultisig。

## 最初のステップ

ゆっくり進む。最初のステップは、Settingsで友達をPadawanとして追加できて、自動的に何かもらえるだけだ。そうしたら、データベースで誰が誰を追加したか、どのSwapが起きたかがわかって、Referralを支払う。

送金するときは、全Nuriユーザーのオートコンプリートがあるべきだ。連絡先だけじゃなく、全員。Lって打ったら、Lの人全員が出てくる、PayPalみたいに。

後からKey Rotation、Keyの追加と削除、Hardware Walletが来る。これはどうせ全部やらないといけない。でもビジョンとしては、これは完璧だと思う。他の人と一緒に稼げるとか、Co-Signerになれるとか、めちゃくちゃバイラルな機能だから。
