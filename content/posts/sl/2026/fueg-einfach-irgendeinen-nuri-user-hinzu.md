---
title: "Preprosto dodaj katerega koli Nuri uporabnika"
description: "Priporočila, skrbniki, dediščina, multisig in skupno varčevanje bodo pri Nuriju ena sama funkcija. V nastavitvah dodaš uporabniško ime, vse ostalo se zgodi samo od sebe."
date: "2026-10-18"
updated: "2026-10-18"
lang: sl
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
tldr: ["Moja ideja za Nuri je ena sama funkcija. V nastavitvah dodaš uporabniško ime nekoga drugega.", "Iz tega sledijo priporočila, skrbniki, dediščina, multisig in skupno varčevanje, odvisno od tega, kaj dovoliš.", "Provizija je pri nas v frontendu, odprta v izvorni kodi, in sam jo nastaviš med 0 in 21 odstotkov."]
sections: [{"basically": "Pri Nuriju bodo priporočila, skrbniki, dediščina in multisig ena sama funkcija. V nastavitvah dodaš uporabniško ime."}, {"basically": "Kdor pri Nuriju doda prijatelja, si z njim deli provizijo. Če jih je 10, se deli na 10."}, {"basically": "Vsako plačilo pošlje tvojim ljudem nekaj satošijev in potisno obvestilo. To naredi Nuri viralnega."}, {"basically": "Pri razširljivem multisigu se ključi tvojih skrbnikov aktivirajo šele, ko izgubiš svoje."}, {"basically": "Skrbnik ti pomaga obnoviti ključ. Dedič pride do njega šele, ko eno leto ne narediš nič."}, {"basically": "Nuri ne vzame provizije pri ponudnikih, ampak v lastnem frontendu, odprto v izvorni kodi."}, {"basically": "Pri Nuriju sam nastaviš svojo provizijo, od 0 do 21 odstotkov. Na mojih zabavah so donacije prinesle petkrat več."}, {"basically": "Vsak API klic pri Nuriju bo majhno plačilo x402 ali L402. S tem je problem provizije rešen."}, {"basically": "Multisiga nihče ne razume. Tri ljudi in eno strojno denarnico razume vsak. Tako razlagamo Nuri."}, {"basically": "Prvi korak pri Nuriju je samo prijatelj v nastavitvah, ki služi zraven. Vse ostalo se gradi na tem."}]
---
Mislim, da sem danes zjutraj rešil nekaj kar dobrega. Gre za feature za Nuri. Za začetek je to ideja.

## En feature namesto petih

Hočem Multisig, Guardians, Inheritance in Referral spraviti v en feature. In to gre tako. V svoji aplikaciji v Nastavitvah preprosto dodam tvoj username. Nič drugega.

V trenutku, ko to naredim, dobiš 50 odstotkov feejev, ki jih plačam Nuri. Hkrati si lahko moj Guardian. To pomeni, da mi s svojim passkey pomagaš v prihodnosti obnoviti moj račun. Lahko greš tudi v wallet kot Co-Signer. Ali pa sva podjetje in hočeva skupaj imeti Multisig-Wallet.

To so vse različni featureji. Ampak vsi temeljijo na istem frontend featureju. Preprosto dodaj kateregakoli Nuri uporabnika.

## Fee se deli

Feeje, ki jih plačam Nuri, za začetek fiksno postavimo na nekako 2,1 odstotka. Vsakič, ko naredim plačilo, gre polovica Nuri in druga polovica osebi, ki sem jo dodal.

Lahko dodaš tudi 10 usernamov. Potem imaš pač wallet z 10 ljudmi in feeji se delijo z 10. Vsi tvoji novi ljudje avtomatsko dobijo svoj delež, Nuri pa dobi desetino.

Seveda bi se lahko tudi medsebojno dodajali, potem gre spet nazaj k meni. Moramo paziti, da tam ne zgradimo loopa. To seveda ne gre.

## Moja mama dobi 17 satoshijev

Bitcoinerji hočejo druge ljudi spraviti k temu, da postanejo Bitcoinerji. Zdaj lahko povabim svojo mamo. In ona dobi vsakič push-obvestilo, ko naredim plačilo. Ravnokar si dobila 20 satoshijev. Ravnokar si dobila 17 satoshijev.

To poznam od sebe. Pri enem drugem servisu dobim vsakič Telegram-sporočilo, ko se zgodi swap, in tam piše, da sem ravnokar zaslužil 10 satoshijev. To je najbolj viralna stvar, kar sem jih kdaj doživel zase. Je smešno in si medsebojno malo daješ denar.

Z Arkade lahko tudi 1, 2, 3, 4 ali 5 satoshijev pošiljamo naokrog brez feeja. In to tudi malo pokaže, kako huda je Arkade na tem mestu.

## Expanding namesto Decaying Multisig

Ključi, ki jih dodajamo, delajo nasprotno od tega, kar sicer delamo pri Nuri. Če nočemo, da so od začetka Signerji, potem to ni Decaying Multisig, ampak Expanding Multisig.

To pomeni, če izgubim vse svoje ključe, se po določenem času, enem letu ali tako, avtomatsko aktivirajo ključi mojih Guardianov. Pri Bitcoinu se to da narediti. Pri Ethereumu bo verjetno težje, ampak to gre zagotovo tudi.

In jasno, to so nastavitve, ki jih lahko nastaviš. Nihče ne sme priti do tvojega denarja samo zato, ker eno leto nisi premaknil svojih bitcoinov.

## Guardian in dediščina

Guardian je feature. Tu bi rad naredil eno na eno tako kot Bitkey. Oni so to nekako zgradili tako, da ti tvoji Guardians lahko pomagajo obnoviti tvoj ključ, ampak nimajo dostopa do tvojega denarja. Kako točno so to naredili, si moramo še ogledati.

Drugi feature je Inheritance in to je izjemno pomembno. Na primer, rad bi vpisal svojo sestro kot dedinjo. Vsakič, ko naredim plačilo, se števec ponovno postavi na nič. In če se mi kaj zgodi, iz kateregakoli razloga, naslednje jutro se ne zbudim, potem se ona po enem letu avtomatsko aktivira in ima dostop do mojih sredstev. Nekaj takega je pretirano pomembno in pretirano kul.

## Fee leži v frontendu

Še veliko bolj pomembno je, kje leži fee. Danes ga vzamemo pri providerjih in to je napaka. Fee pri providerjih bi morali povsod postaviti na nič in ga vzeti pri nas, v frontendu ali v našem backendu. Za Nuri je lahko potem deset milijonov providerjev, popolnoma vseeno. Oni vzamejo svoj spread in svoj fee, mi pa pri njih nič ne dodamo.

S tem lahko ločimo med Nuri-feejem in partner-feejem. To je preprosto čisto. In hočem ljudem v open-source kodi pokazati, poglej, tukaj je fee, to piše v izvorni kodi. Hočem, da smo najbolj transparentno podjetje na svetu.

Moja najljubša zgodba za to je vpitje v Aave-skupnosti, ko se je v ozadju zamenjal swap-provider. Iz tega se vidi, da backendi nimajo več moči, ampak frontendi. Kdor ima uporabnike, ima moat.

## Nastavi svoj fee sam

Ljudem celo pustimo, da sami nastavijo fee. Preprosto iz pravičnosti. Če nočeš plačevati feejev, lahko greš na 0 odstotkov. Lahko pa greš tudi na 21 odstotkov, če hočeš. In če kdo vpraša, zakaj vzamete 2 odstotka, potem rečemo, pojdi v nastavitve in to spremeni.

Zakaj mislim, da bo to delovalo? Zaradi mojih zabav v Berlinu. Ne glede na to, kolikšen vstop sem vzel in ne glede na ceno piva, ljudem to nekako nikoli ni bilo kul. Nekoč smo rekli, fuck it, donacija za pivo, donacija za vstop. Zaslužili smo približno petkrat več denarja.

Ko ljudem daš možnost, da to sami določijo, potem obstajajo tudi ljudje, ki to postavijo precej višje. Ker jim je gamification hud ali ker so zraven zaradi misije. Obstajajo bogati in revni, cincavci in drugi. Jaz bi za ljudi, ki jih srečam na konferenci in jih dodam k svojemu računu, nastavil svoj fee na 21 odstotkov. Potem avtomatsko dobijo moj split.

## Vsak klic je majhno plačilo

Imam še boljšo idejo, kako vzeti fee. Nuri-API preprosto gatamo z micropaymenti in micropaymenti so naši feeji. Vsaka operacija v aplikaciji potem stane majhno x402- ali L402-plačilo. L402, če ima kaj z Bitcoinom, x402, če ima kaj s kripto.

Primer. Novo geslo shraniti ali prebrati v tvojem Nuri-password-managerju stane pač 0,1 centa ali 1 cent. In to lahko vzamemo direktno iz walleta, ker je agentic. Pri routerju to že delam tako. Lahko ga uporabljaš z žetonom ali plačaš za klice, in lahko damo vsakemu posameznemu endpointu drugačno ceno.

Potem ti ni treba graditi lastnega fee-sistema. Vsak lahko naš API vgradi, kjer hoče, in mi avtomatsko dobimo plačila. Začel bi s kontaktno knjigo, 0,1 centa vsakič, ko nekdo doda kontakt. Ko to deluje, to razširimo na celo aplikacijo. En feature naenkrat.

## Družinski wallet in hardware-walleti

Ko ljudje enkrat doživijo, kako deluje tak Safe-wallet, kot ga imamo mi kot podjetje, jim je to res kul. Jaz imam ključ, ampak plačati lahko samo skupaj. To je res huda crypto-izkušnja.

Ali pa družinski wallet. Moja mama, moja sestra in jaz. Dva od naju zadoščata, da skupaj plačava. Multisig si nihče ne more predstavljati. Ampak reči, smo trije ljudje in en hardware-wallet, ali smo pet ljudi in ena AI, to vsak razume.

In ostajamo pri principu, ki ga nihče drug ne uspe. One-Click-Face-ID-Wallet. Seedless, brez seed-phrase, phishing-resistant, Multisig by default.

## Prvi korak

Zelo počasi se približujemo. Prvi korak je samo to, da lahko v nastavitvah dodam prijatelja kot svojega Padawana in da ta potem avtomatsko nekaj dobi. Potem v naši bazi podatkov vidimo, kdo je koga dodal in kateri swapi so se zgodili, in izplačamo referrale.

In ko kaj pošiljaš, bi morali imeti autocomplete vseh Nuri-uporabnikov. Ne samo tvojih kontaktov, ampak preprosto vseh. Vtipkam L in najdem vse ljudi z L, tako kot pri PayPalu.

Kasneje pridejo key-rotation, dodajanje in brisanje ključev ter hardware-wallet. To moramo tako ali tako vse narediti. Ampak glede vizije je to, mislim, absolutno popolno. Ker je to tako hudo viralen feature, da lahko pri drugem zaslužiš zraven ali si njegov Co-Signer.
