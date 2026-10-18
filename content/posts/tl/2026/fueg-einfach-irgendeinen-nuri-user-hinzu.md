---
title: "Idagdag Mo Lang Kahit Sinong Nuri User"
description: "Referral, Guardian, mana, Multisig at sabay-sabay na pag-iipon, iisa lang ang feature niyan sa Nuri. Idagdag mo lang ang username sa Settings, lahat ng iba pa susunod na doon."
date: "2026-10-18"
updated: "2026-10-18"
lang: tl
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
tldr: ["Ang idea ko para sa Nuri, isang feature lang. Idagdag mo lang sa Settings ang username ng kahit sino.", "Doon na susunod ang Referral, Guardian, mana, Multisig at sabay-sabay na pag-iipon, depende sa kung ano ang papayagan mo.", "Ang Fee nasa amin, nasa frontend, nakikita sa Source Code, at ikaw mismo ang magse-set nito sa pagitan ng 0 at 21 porsyento."]
sections: [{"basically": "Sa Nuri, ang Referral, Guardian, mana at Multisig magiging isang feature lang. Idagdag mo lang ang username sa Settings."}, {"basically": "Kapag nagdagdag ka ng kaibigan sa Nuri, hahatiin ninyo ang Fee. Kapag sampung tao na, hahatiin ito sa sampu."}, {"basically": "Bawat bayad, magpapadala ng ilang Satoshi sa mga tao mo at isang push notification. Ganyan kumakalat ang Nuri."}, {"basically": "Sa Expanding Multisig, ang mga key ng mga Guardian mo ay gagana lang kapag nawala mo na ang sarili mong mga key."}, {"basically": "Ang Guardian tutulong sa iyong maibalik ang key mo. Ang tagapagmana, makakakuha lang kapag isang taon ka nang walang ginagawa."}, {"basically": "Ang Nuri hindi kumukuha ng Fee sa mga provider, kundi sa sarili naming frontend, nakikita sa Source Code."}, {"basically": "Sa Nuri, ikaw mismo ang magse-set ng Fee mo, mula 0 hanggang 21 porsyento. Sa mga party ko, ang donasyon ay limang beses ang kinita."}, {"basically": "Bawat API call sa Nuri ay magiging maliit na x402 o L402 na bayad. Doon nalulutas ang problema sa Fee."}, {"basically": "Multisig, walang nakakaintindi. Tatlong tao at isang hardware wallet, lahat nakakaintindi. Ganyan namin ipapaliwanag ang Nuri."}, {"basically": "Unang hakbang sa Nuri ay isang kaibigan lang sa Settings na kikita kasama mo. Lahat ng iba pa itatayo doon."}]
---
Sa tingin ko, may naisip akong solution ngayong umaga na medyo maganda. Tungkol ito sa isang feature para sa Nuri. Sa ngayon, idea pa lang ito.

## Isang feature imbes na lima

Gusto kong pagsamahin ang Multisig, Guardians, Inheritance, at Referral sa isang feature. Ganito ang mangyayari. Idadagdag ko lang ang username mo sa Settings ng app ko. Yun lang.

Kapag ginawa ko yun, makakakuha ka ng 50 porsyento ng Fees na binabayaran ko sa Nuri. Puwede ka ring maging Guardian ko nang sabay. Ibig sabihin, tutulungan mo ako gamit ang Passkey mo para ma-recover ko ang account ko balang araw. Puwede ka ring maging Co-Signer sa Wallet. O kaya naman, kung kami ay isang kumpanya at gusto naming magkaroon ng Multisig-Wallet nang magkasama.

Iba't ibang features lahat ito. Pero lahat sila nakabase sa parehong Frontend-Feature. Magdagdag ka lang ng kahit sinong Nuri-User.

## Hahatiin ang Fee

Ang Fees na binabayaran ko sa Nuri, itatakda muna natin sa mga 2.1 porsyento. Tuwing gagawa ako ng payment, kalahati pupunta sa Nuri at ang kalahati naman sa taong idinagdag ko.

Puwede ka ring magdagdag ng 10 usernames. Kung ganon, may Wallet ka na may 10 tao, at ang Fees ay hahatiin sa 10. Lahat ng bago mong idinagdag ay awtomatikong makakakuha ng Cut, at ang Nuri ay makakakuha ng isang ikasampu.

Siyempre, puwede rin nating idagdag ang isa't isa, pero babalik lang sa akin. Kailangan nating tiyaking hindi tayo gagawa ng Loop doon. Siyempre, hindi yun puwede.

## Ang Mama ko ay makakakuha ng 17 Satoshi

Gusto ng mga Bitcoiner na gawing Bitcoiner ang ibang tao. Ngayon, puwede ko nang imbitahan ang Mama ko. At makakatanggap siya ng Push-Notification tuwing gagawa ako ng payment. Nakatanggap ka lang ng 20 Satoshi. Nakatanggap ka lang ng 17 Satoshi.

Alam ko ito mula sa sarili kong karanasan. Sa ibang serbisyo, nakakatanggap ako ng Telegram message tuwing may Swap na nagaganap, at nakasaad doon na kumita ako ng 10 Satoshi. Ito ang pinaka-viral na naranasan ko para sa sarili ko. Nakakatawa ito, at parang nagbibigayan kayo ng kaunting pera.

Sa Arkade, puwede rin tayong magpadala ng 1, 2, 3, 4, o 5 Satoshi nang walang Fee. At ipinapakita rin nito kung gaano kaganda ang Arkade sa puntong iyon.

## Expanding imbes na Decaying Multisig

Ang mga Keys na idinaragdag natin ay ginagawa ang kabaligtaran ng karaniwang ginagawa natin sa Nuri. Kung ayaw nating maging Signer sila mula sa simula, hindi ito Decaying Multisig, kundi Expanding Multisig.

Ibig sabihin, kung mawala ko lahat ng Keys ko, ang Keys ng aking mga Guardians ay awtomatikong mag-aactivate pagkatapos ng isang panahon, mga isang taon o ganoon. Sa Bitcoin, puwede itong gawin. Sa Ethereum, malamang mas mahirap, pero siguradong puwede rin.

At siyempre, ito ay mga Settings na puwedeng i-adjust. Walang dapat makakuha ng pera mo dahil lang hindi mo ginagalaw ang Bitcoin mo sa loob ng isang taon.

## Guardian at Erbe

Ang Guardian ay isang feature. Gusto kong gawin ito nang eksaktong katulad ng Bitkey. Ginawa nila ito sa paraang ang iyong mga Guardians ay maaaring tumulong sa iyo na ma-recover ang iyong Key, pero walang access sa iyong pera. Kailangan pa naming tingnan kung paano eksaktong ginawa nila iyon.

Ang isa pang feature ay Inheritance, at napakahalaga nito. Gusto ko halimbawang ilagay ang kapatid kong babae bilang aking tagapagmana. Tuwing gagawa ako ng payment, ang Counter ay mare-reset sa zero. At kung may mangyari sa akin, anuman ang dahilan, hindi ako magigising kinabukasan, siya ay awtomatikong ma-aactivate pagkatapos ng isang taon at magkakaroon ng access sa aking Funds. Napakahalaga at napakaganda ng ganitong bagay.

## Ang Fee ay nasa Frontend

Mas mahalaga pa, kung nasaan ang Fee. Ngayon, kinukuha natin ito sa mga Providers, at ito ay isang pagkakamali. Dapat nating itakda ang Fee sa mga Providers sa zero sa lahat ng lugar at kunin natin ito sa atin, sa Frontend o sa aming Backend. Sa likod ng Nuri ay maaaring may sampung milyong Providers, hindi mahalaga. Kinukuha nila ang kanilang Spread at ang kanilang Fee, at hindi tayo nagdadagdag ng kahit ano sa kanila.

Dahil dito, maaari nating maipagkaiba ang Nuri-Fee at Partner-Fee. Simple at malinis ito. At gusto kong ipakita sa mga tao sa Open-Source-Code, tingnan mo, narito ang Fee, nakasaad ito sa Sourcecode. Gusto kong maging pinaka-transparent na kumpanya sa mundo.

Ang paborito kong kwento tungkol dito ay ang sigaw ng Aave-Community nang palitan ang Swap-Provider sa likod. Makikita mo rito na ang Backends ay walang Power na, kundi ang Frontends. Kung sino ang may mga Users, siya ang may Moat.

## Itakda ang iyong sariling Fee

Pinapayagan pa nga nating itakda ng mga tao ang Fee nang mag-isa. Para lang sa fairness. Kung ayaw mong magbayad ng Fees, puwede kang pumunta sa 0 porsyento. Puwede ka ring pumunta sa 21 porsyento kung gusto mo. At kung may magtanong, bakit kayo kumukuha ng 2 porsyento, sasabihin namin, pumunta ka sa Settings at baguhin mo.

Bakit ko iniisip na ito ay gagana? Dahil sa aking mga party sa Berlin. Anuman ang entrance fee na kinuha ko at anuman ang presyo ng beer, hindi ito nagustuhan ng mga tao. Sa bandang huli, sinabi namin, fuck it, Donation para sa beer, Donation para sa entrance. Kumita kami ng halos limang beses na mas maraming pera.

Kung bibigyan mo ang mga tao ng pagkakataon na itakda ito nang mag-isa, may mga tao ring magtatakda nito nang mas mataas. Dahil gusto nila ang Gamification o dahil sila ay bahagi ng Mission. May mga Mayaman at mga Mahirap, mga Kuripot at ang iba pa. Para sa mga taong makikilala ko sa isang Conference at idadagdag ko sa aking account, itatakda ko ang aking Fee sa 21 porsyento. Kung gayon, awtomatiko silang makakakuha ng aking Split.

## Bawat Call ay isang maliit na Payment

Mayroon pa akong mas magandang idea kung paano natin kukunin ang Fee. I-gate lang natin ang Nuri-API gamit ang Micropayments, at ang Micropayments ay ang aming Fees. Bawat Operation sa app ay magkakahalaga ng maliit na x402 o L402 payment. L402 kung may kinalaman ito sa Bitcoin, x402 kung may kinalaman ito sa Crypto.

Isang halimbawa. Ang pag-save o pagbasa ng bagong Password sa iyong Nuri-Password-Manager ay nagkakahalaga ng 0.1 Cent o 1 Cent. At maaari nating kunin ito nang direkta mula sa Wallet, dahil ito ay agentic. Sa Router, ginagawa ko na ito. Maaari mo itong gamitin gamit ang isang Token o magbabayad ka para sa mga Calls, at maaari naming bigyan ng ibang presyo ang bawat isang Endpoint.

Kung ganon, hindi mo na kailangang gumawa ng sariling Fee-System. Kahit sino ay maaaring mag-integrate ng aming API kung saan nila gusto, at awtomatiko kaming makakakuha ng Payments. Sisimulan ko sa Contact Book, 0.1 Cent tuwing magdadagdag ng Contact. Kung ito ay gumana, palalawakin natin ito sa buong app. Isang Feature at a time.

## Familienwallet at Hardware-Wallets

Kapag naranasan na ng mga tao kung paano gumagana ang isang Safe-Wallet na mayroon kami bilang kumpanya, talagang magugustuhan nila ito. Mayroon akong isang Key, pero maaari lamang kaming magbayad nang magkasama. Ito ay isang talagang magandang Crypto-Experience.

O kaya naman isang Familienwallet. Ang aking Mama, ang aking kapatid na babae, at ako. Dalawa sa amin ay sapat na para magbayad nang magkasama. Walang makakapag-isip ng Multisig. Pero sabihin, tatlo kaming tao at isang Hardware-Wallet, o kaya lima kaming tao at isang AI, maiintindihan ito ng lahat.

At mananatili tayo sa prinsipyong walang iba ang makakagawa. One-Click-Face-ID-Wallet. Seedless, walang Seed-Phrase, phishing-resistant, Multisig by default.

## Ang unang hakbang

Dahan-dahan nating lalapitan ito. Ang unang hakbang ay maaari lamang akong magdagdag ng isang kaibigan bilang aking Padawan sa Settings at awtomatiko siyang makakakuha ng isang bagay. Pagkatapos, makikita natin sa aming Database kung sino ang nagdagdag kanino at anong mga Swaps ang naganap, at babayaran natin ang Referrals.

At kapag nagpapadala ka ng isang bagay, dapat mayroon tayong Autocomplete ng lahat ng Nuri-Users. Hindi lamang ang iyong mga Contacts, kundi lahat. Ita-type ko ang L at makikita ko lahat ng tao na may L, tulad ng sa PayPal.

Sa hinaharap, darating ang Key-Rotation, pagdagdag at pag-alis ng Keys, at isang Hardware-Wallet. Kailangan nating gawin lahat ito. Pero mula sa Vision, sa tingin ko, ito ay talagang perpekto. Dahil ito ay isang napaka-viral na feature na maaari kang kumita kasama ang iba o maging kanilang Co-Signer.
