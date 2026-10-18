---
title: "Shto thjesht një përdorues në Nuri"
description: "Referral, Guardian, trashëgimia, Multisig dhe kursimi i përbashkët do të bëhen një veçori e vetme në Nuri. Ti shton një username te Settings, pjesa tjetër vjen vetë."
date: "2026-10-18"
updated: "2026-10-18"
lang: sq
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
tldr: ["Ideja ime për Nuri është një veçori e vetme. Ti shton te Settings username-in e dikujt.", "Prej këtu dalin Referral, Guardian, trashëgimia, Multisig dhe kursimi i përbashkët, varësisht nga çfarë lejon ti.", "Fee-në e mbajmë ne në frontend, me source code të hapur, dhe ti e vendos vetë mes 0 dhe 21 përqind."]
sections: [{"basically": "Te Nuri, Referral, Guardian, trashëgimia dhe Multisig do të bëhen një veçori e vetme. Ti shton një username te Settings."}, {"basically": "Kush shton një mik te Nuri, e ndan Fee-në me të. Me 10 vetë, ajo ndahet me 10."}, {"basically": "Çdo pagesë u dërgon njerëzve të tu disa satoshi dhe një push notification. Kjo e bën Nuri virale."}, {"basically": "Me një Expanding Multisig, çelësat e Guardian-ëve të tu aktivizohen vetëm pasi ti të humbasësh të tuët."}, {"basically": "Një Guardian të ndihmon ta rikthesh çelësin tënd. Një trashëgimtar hyn vetëm kur ti të mos bësh asgjë për një vit."}, {"basically": "Nuri nuk e merr Fee-në te provider-at, po në frontend-in tonë, me source code të hapur."}, {"basically": "Te Nuri, Fee-në e vendos vetë, nga 0 deri në 21 përqind. Në festat e mia, donacionet sollën pesëfishin."}, {"basically": "Çdo API call te Nuri do të jetë një pagesë e vogël x402 ose L402. Kështu problemi i Fee-së është zgjidhur."}, {"basically": "Multisig s'e kupton njeri. Tre vetë dhe një hardware wallet e kupton gjithkush. Kështu e shpjegojmë ne Nuri."}, {"basically": "Hapi i parë te Nuri është vetëm një mik te Settings, që fiton bashkë me ty. Gjithçka tjetër ndërtohet mbi këtë."}]
---
Besoj se sot në mëngjes e kam zgjidhur diçka mjaft të mirë. Bëhet fjalë për një feature për Nuri. Kjo është ideja, për momentin.

## Një feature në vend të pesë

Dua t'i fus Multisig, Guardians, Inheritance dhe Referral në një feature të vetëm. Dhe kjo bëhet kështu. Në app-in tim, te Settings, shtoj thjesht username-in tënd. Kaq.

Në momentin që e bëj këtë, ti merr 50 për qind të fees që unë i paguaj Nuri-t. Njëkohësisht mund të jesh Guardian-i im. Kjo do të thotë, më ndihmon me passkey-un tënd që ta rikthej account-in tim në të ardhmen. Mund të hysh edhe si Co-Signer në wallet. Ose jemi një firmë dhe duam të kemi bashkë një Multisig-Wallet.

Këto janë të gjitha feature të ndryshme. Por të gjitha bazohen në të njëjtin frontend-feature. Shto thjesht ndonjë Nuri-user.

## Fee-ja ndahet

Fees që unë i paguaj Nuri-t, i caktojmë fillimisht fiks në diçka si 2,1 për qind. Sa herë që bëj një pagesë, gjysma shkon te Nuri dhe gjysma tjetër te personi që kam shtuar.

Mund të shtosh edhe 10 usernames. Atëherë ke thjesht një wallet me 10 njerëz, dhe fees ndahen me 10. Të gjithë njerëzit e tu të rinj marrin automatikisht një cut, dhe Nuri merr një të dhjetën.

Natyrisht, mund të shtoheni edhe ndërsjelltas, atëherë paratë kthehen sërish te unë. Duhet të shohim të mos ndërtojmë një loop aty. Kjo natyrisht nuk shkon.

## Mamaja ime merr 17 Satoshi

Bitcoiner-t duan t'i bëjnë të tjerët Bitcoiner. Tani mund ta ftoj mamën time. Dhe ajo merr një push-notification sa herë që unë bëj një pagesë. Sapo more 20 Satoshi. Sapo more 17 Satoshi.

E njoh këtë nga vetja. Në një shërbim tjetër merr një mesazh në Telegram sa herë që ndodh një Swap, dhe aty shkruan se sapo kam fituar 10 Satoshi. Është gjëja më virale që kam përjetuar ndonjëherë për vete. Është qesharake, dhe i japim njëri-tjetrit pak para.

Me Arkade mund të dërgojmë edhe 1, 2, 3, 4 ose 5 Satoshi pa fee. Dhe kjo tregon pak a shumë sa i fuqishëm është Arkade në këtë pikë.

## Expanding në vend të Decaying Multisig

Keys që i shtojmë bëjnë të kundërtën e asaj që bëjmë zakonisht te Nuri. Nëse nuk duam që të jenë Signer që nga fillimi, atëherë nuk është Decaying Multisig, por Expanding Multisig.

Kjo do të thotë, nëse i humbas të gjithë keys e mi, atëherë pas një kohe, një viti a diçka, keys e Guardians-ve të mi aktivizohen automatikisht. Me Bitcoin kjo bëhet. Me Ethereum ka gjasa të jetë më e vështirë, por sigurisht që bëhet edhe ajo.

Dhe natyrisht, këto janë Settings që mund të vendosen. Askush nuk duhet të arrijë te paratë e tua vetëm se nuk i ke lëvizur Bitcoin-et e tua për një vit.

## Guardian dhe trashëgimi

Guardian është një feature. Aty do të doja ta bëja një me një si Bitkey. Ata e kanë ndërtuar në atë mënyrë që Guardians e tu mund të të ndihmojnë ta rikthesh key-un tënd, por nuk kanë qasje te paratë e tua. Si e kanë bërë saktësisht, duhet ta shohim akoma.

Feature-i tjetër është Inheritance, dhe kjo është jashtëzakonisht e rëndësishme. Për shembull, dua ta fus motrën time si trashëgimtare te unë. Sa herë që bëj një pagesë, një counter resetohet në zero. Dhe nëse më ndodh diçka, për çfarëdo arsyeje, nuk zgjohem të nesërmen, atëherë ajo pas një viti aktivizohet automatikisht dhe ka qasje te funds e mia. Diçka e tillë është jashtëzakonisht e rëndësishme dhe jashtëzakonisht e fuqishme.

## Fee-ja qëndron në frontend

Edhe më e rëndësishme është se ku qëndron fee-ja. Sot e marrim te provider-t, dhe kjo është gabim. Duhet ta vendosim fee-n te provider-t kudo në zero dhe ta marrim ne, në frontend ose në backend-in tonë. Pas Nuri-t mund të jenë dhjetë milionë provider, krejtësisht pa rëndësi. Ata marrin spread-in e tyre dhe fee-n e tyre, dhe ne nuk shtojmë asgjë sipër.

Kështu mund të dallojmë ndërmjet Nuri-Fee dhe Partner-Fee. Kjo është thjesht e pastër. Dhe dua t'u tregoj njerëzve në Open-Source-Code, shiko, ja ku është fee-ja, qëndron në Sourcecode. Dua që të jemi firma më transparente në botë.

Historia ime e preferuar për këtë është britma në komunitetin e Aave, kur në sfond u ndryshua Swap-provider-i. Prej kësaj shihet se backends nuk kanë më pushtet, por frontends. Kush i ka përdoruesit, e ka Moat-in.

## Vendose fee-n vetë

Njerëzit i lemë madje ta vendosin fee-n vetë. Thjesht për arsye fairness-i. Nëse nuk do të paguash fees, mund të shkosh në 0 për qind. Por mund të shkosh edhe në 21 për qind, nëse do. Dhe nëse dikush pyet, pse merrni 2 për qind, ne i themi, shko te Settings dhe ndryshoje.

Pse besoj se kjo funksionon? Për shkak të festave të mia në Berlin. Pa marrë parasysh çfarë hyrjeje kam marrë dhe çfarë çmimi për birrë, njerëzit nuk e gjenin ndonjëherë cool. Në një moment thamë, fuck it, donation për birrë, donation për hyrje. Fitonim afërsisht pesëfishin e parave.

Kur u jep njerëzve mundësinë ta vendosin vetë, atëherë ka edhe njerëz që e vendosin shumë më lart. Sepse e pëlqejnë gamification-in ose sepse janë pjesë e misionit. Ka të pasur dhe të varfër, ata që numërojnë çdo qindarkë dhe të tjerët. Unë për njerëzit që i takoj në një konferencë dhe i shtoj te account-i im, do ta vendosja fee-n time në 21 për qind. Atëherë ata marrin automatikisht split-in tim.

## Çdo call është një pagesë e vogël

Kam një ide edhe më të mirë se si ta marrim fee-n. Thjesht e gatojmë Nuri-API-n me Micropayments, dhe Micropayments janë fees tona. Çdo operacion në app kushton atëherë një pagesë të vogël x402 ose L402. L402, nëse ka të bëjë me Bitcoin, x402, nëse ka të bëjë me kripto.

Një shembull. Të ruash ose të lexosh një password të ri në Nuri-Password-Manager-in tënd kushton 0,1 cent ose 1 cent. Dhe këtë mund ta marrim direkt nga wallet-i, sepse është agentic. Te Router e bëj tashmë kështu. Mund ta përdorësh me një token ose paguan për calls, dhe mund t'i japim çdo endpoint-i një çmim tjetër.

Atëherë nuk ke nevojë të ndërtosh një sistem fee-sh tëndin. Kushdo mund ta integrojë API-n tonë ku të dojë, dhe ne marrim automatikisht payments. Do të filloja me kontaktet, 0,1 cent sa herë që dikush shton një kontakt. Nëse kjo ecën, e zgjerojmë në gjithë app-in. Një feature at a time.

## Familienwallet dhe Hardware-Wallets

Kur njerëzit e kanë përjetuar një herë si funksionon një Safe-Wallet, të cilën e kemi si firmë, e gjejnë vërtet cool. Unë kam një çelës, por paguaj mundemi vetëm bashkë. Kjo është një Crypto-Experience vërtet e fuqishme.

Ose një Familienwallet. Mamaja ime, motra ime dhe unë. Dy prej nesh mjaftojnë për të paguar bashkë. Multisig askush nuk e imagjinon. Por të thuash, jemi tre njerëz dhe një Hardware-Wallet, ose jemi pesë njerëz dhe një AI, këtë e kupton secili.

Dhe ne mbetemi te parimi që askush tjetër nuk e arrin. One-Click-Face-ID-Wallet. Seedless, pa Seed-Phrase, phishing-resistant, Multisig by default.

## Hapi i parë

E afrohemi shumë ngadalë. Hapi i parë është vetëm që unë te Settings të mund të shtoj një mik si Padawan-in tim dhe ai pastaj merr automatikisht diçka. Pastaj shohim në databazën tonë se kush kë e ka shtuar dhe cilat Swaps kanë ndodhur, dhe i paguajmë Referrals.

Dhe kur dërgon diçka, duhet të kemi një autocompletion të të gjithë Nuri-users. Jo vetëm kontaktet e tua, por thjesht të gjithë. Shtyp L dhe gjen të gjithë njerëzit me L, si te PayPal.

Më vonë vijnë Key-Rotation, shtimi dhe fshirja e keys dhe një Hardware-Wallet. Këto duhet t'i bëjmë gjithsesi. Por nga vizioni, kjo është, besoj, absolutisht perfekte. Sepse është një feature kaq virale, që ti mund të fitosh bashkë me tjetrin ose të jesh Co-Signer-i i tij.
