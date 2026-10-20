---
title: "Riverside 500E: Jinsi ya kuiongezea kasi"
description: "Mwongozo kamili wa Riverside 500E: mbinu ya bure ya sumaku, Badass Box, na kubadilisha KT controller, ukiwa na michoro, link za vipuri na hatua za majaribio."
date: "2026-10-13"
updated: "2026-10-13"
lang: sw
translated_from: "en/riverside-500e-faster-bike-tuning"
source_sections: ["the-bike-and-why-it-stops-at-25", "first-check-what-actually-limits-the-bike", "the-free-fix-move-the-magnet", "how-strong-the-magnet-has-to-be", "the-clean-fix-badass-box", "the-real-fix-kt-controller", "wiring-and-first-start", "what-can-break-and-what-it-costs"]
category: building
format: guide
author: emin
provenance: written
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Riverside 500E", "KT controller", "how-to"]
source_links: [{"title": "Riverside 500E product page", "url": "https://decathlon.co.uk/p/electric-hybrid-bike-riverside-500-e/_/R-p-169143", "note": "Motor and battery specs."}, {"title": "Arthur Brs: Riverside 500E Speed Unlock", "url": "https://www.youtube.com/watch?v=Cdm-WZnxCZ4", "note": "The video that confirms the service menu does not exist on this model."}, {"title": "Pedelec-Forum: Riverside 500 e schneller machen", "url": "https://www.pedelecforum.de/forum/index.php?threads/riverside-500-e-schneller-machen.102938/", "note": "German thread asking the same question."}, {"title": "K&J Magnetics: Reed switches and Hall effect sensors", "url": "https://www.kjmagnetics.com/blog/reed-switches-and-hall-effect-sensors/", "note": "Trigger fields, magnet orientation and polarity."}, {"title": "KT controller 17A with LCD3", "url": "https://www.aliexpress.us/item/3256808397983216.html", "note": "The controller I use in the swap."}]
tldr: ["Riverside 500 E ina motor ya nyuma (hub motor), kwa hiyo chip za kawaida za tuning hazifiti.", "Njia ya bure ni kuhamishia sumaku kutoka kwenye spoku kwenda kwenye crank arm. Assist itaendelea kukusukuma hadi kama 32 km/h.", "Njia ya uhakika ni kubadilisha KT controller, inagharimu kama dola 65 kwa vipuri.", "Marekebisho yote yanaweza kurudishwa kama zamani ukihifadhi vipuri vyako vya awali."]
sections: [{"basically": "Hii ni hub motor ya kawaida, controller imefungwa na hakuna menu za siri. Vitu vingi vya bei rahisi vinavyofanya kazi kwenye baiskeli nyingine havifanyi kazi hapa."}, {"basically": "Kupata kasi zaidi na kupata nguvu zaidi ni vitu viwili tofauti. Chagua unachotaka kufanya."}, {"basically": "Controller inapima mwendo wa gurudumu kupitia sumaku ya spoku. Ihamishie kwenye crank na haitakata tena mwendo baada ya 25 km/h."}, {"basically": "Kila diski ndogo ya neodymium inafanya kazi ikikaa karibu kutosha. Haijalishi kama ina nguvu sana, shida inatokea ikiwa mbali."}, {"basically": "Hii ni klipu yenye sumaku inayozidisha mapigo mara mbili. Hakuna nyaya, hakuna soldering, unaiondoa kwa dakika moja."}, {"basically": "Kwa dola 65 kutoka AliExpress unapata 'ubongo' mpya wa baiskeli. Amps zaidi na display inayokuruhusu kuweka limit unayotaka."}, {"basically": "Nyaya za phase na hall ndizo pekee zinazohitaji umakini. Mengine ni kuchomeka tu na kufunga na cable ties."}, {"basically": "Vipuri vya zamani vinarudi kirahisi kama kitu kikigoma. Sheria inakataza zaidi ya 25 km/h, kwa hiyo chagua unapoitumia."}]
---
## Baiskeli na kwa nini inasimama kwenye 25

Riverside 500E ni baiskeli ya umeme ya mseto (pedelec). Mota yake ni ya wati 250, haina brashi, na iko kwenye gurudumu la nyuma. Inatumia chapa ya "Vision," ina torque ya 42 Nm, na inalishwa na betri ya 36 V 11.6 Ah. Kama ilivyo kwa kila pedelec inayouzwa ndani ya EU, msaada wa umeme hukatika baiskeli inapofika kilomita 25 kwa saa.

Hii ni changamoto kwa yeyote anayetaka kuifanyia marekebisho kwa sababu karibu kila kifaa kilichopo sokoni kimeundwa kwa ajili ya mota za katikati (mid drive). SpeedBox, PearTune, na Badass Boxes zimeundwa mahususi kwa ajili ya Bosch, Brose, na Shimano. Hakuna hata moja inayofaa baiskeli hii.

Kwa hiyo machaguo yanabaki matatu: danganya sensa ya mwendo, weka boxi maalum, au ubadilishe kidhibiti (controller). Hakuna menyu ya siri ya huduma kwenye display hii pia. Rockrider E-ST 100 ina menyu ambapo unaweza kupunguza ukubwa wa gurudumu, lakini display ya 500E haina hata sehemu ya kuingiza ukubwa wa gurudumu. Nimepekua menyu yote na watu kwenye majukwaa wanakubaliana na hilo.

## Kwanza angalia nini hasa kinazuia baiskeli

Kuna vizuizi viwili tofauti vilivyo ndani ya kidhibiti. Kizuizi cha mwendo kinakata msaada kwenye 25 km/h. Kizuizi cha mkondo (current), ambacho ni kama 13 A kwenye baiskeli hii, kinapunguza torque. Kuongeza kimoja hakisaidii kingine.

```
unataka mwendo kasi          unataka nguvu zaidi
     |                             |
hack ya sensa ya mwendo      kidhibiti chenye amp zaidi
au kidhibiti cha KT         (KT 15A / 17A / 22A)
     |                             |
msaada hadi ~32 km/h         mwendo uleule, torque zaidi
```

Hack ya sumaku inagusa mwendo kasi pekee. Kubadilisha kidhibiti kunagusa vyote viwili, kwa sababu kidhibiti cha KT kinakuruhusu kurekebisha mkondo na kizuizi kupitia display.

## Suluhisho la bure: sogeza sumaku

Angalia gurudumu la nyuma. Kwenye sehemu ya fremu ya kushoto (chainstay), karibu na mahali gurudumu linaposhikilia, kuna sensa ndogo nyeusi kwenye kebo. Kinyume chake, imekazwa kwenye spoki, kuna sumaku. Jozi hiyo ndiyo kipima mwendo cha mfumo mzima.

Hack yenyewe: kidhibiti kinaamini mwendo wowote unaoripotiwa na sensa hiyo. Ikiwa sensa itapima mwendo wa pedali badala ya gurudumu, kidhibiti kitadhani unaenda polepole na kitaendelea kukusukuma.

```
KABLA (stock)                         BAADA (hack)

  fremu                                 fremu
   |                                     |
   | sensa --- 2mm --- spoki              | sensa (imeelekezwa ndani,
   |            sumaku                   |  kebo bado imeshikamana)
   |                                     |        3-5 mm
   v                                     v   +------------+
[ gurudumu la nyuma ]                mkono wa pedali  | sumaku sasa |
                                     (unazunguka)    | uko kwenye mkono |
                                                     +------------+
```

Hatua:

1. Fungua sensa kutoka kwenye chainstay. Kwa kawaida ni Torx T25, na skrubu imewekwa dawa ya kuzuia kulegea, kwa hiyo fanya polepole.
2. Tumia zip tie kufunga sensa ili ielekee ndani ya mkono wa pedali. Kebo inabaki imeshikamana.
3. Ondoa sumaku kwenye spoki na uibandike ndani ya mkono wa pedali, kwenye urefu uleule na sensa. Tape au zip tie inatosha kwa ajili ya majaribio.
4. Hakikisha nafasi kati ya sumaku na sensa ni 3 hadi 5 mm kila pedali inapozunguka.
5. Inua gurudumu la nyuma, zungusha pedali kwa mkono. Display lazima ionyeshe mwendo. Ikiwa inaonyesha sifuri au hitilafu, mota haitafanya kazi, kwa hiyo rekebisha nafasi hiyo kwanza.

Display sasa itakudanganya. Unapokuwa kwenye mwendo halisi wa 25 km/h, itaonyesha 6 au 7. Tumia GPS ya simu kupata ukweli. Unaweza kurudisha kila kitu kwenye hali ya awali ndani ya dakika kumi.

Matokeo: msaada wa umeme hadi 32 au 35 km/h, kulingana na jinsi unavyoweza kuzungusha pedali kwa haraka. Gharama: sifuri.

## Sumaku inatakiwa kuwa na nguvu kiasi gani

Sensa ni swichi ya reed au sensa ya hall. Inafanya kazi kati ya 10 na 100 gauss kwenye uso wake, ambayo si nyingi sana. Sumaku ya spoki ya kawaida inatosha ikiwa nafasi ni ndogo.

Ikiwa haifanyi kazi vizuri, sumaku yoyote ndogo ya neodymium inafaa. Nguvu ya N42 hadi N52, kipenyo cha 10 hadi 15 mm, unene wa 3 hadi 5 mm. Hiyo inagharimu pesa kidogo sana. Kuwa na nguvu nyingi hakuumizi, lakini kuwa mbali sana ndiko kunaharibu mawasiliano.

Poli (polarity) ni muhimu. Sensa za hall zinataka poli moja iwe inazielekea, swichi za reed zinataka mhimili wa sumaku uwe sambamba na swichi. Kanuni ya kivitendo: ikiwa display inabaki kwenye sifuri, pindua sumaku digrii 180 na ujaribu tena. Hiyo inarekebisha tatizo karibu kila wakati.

## Suluhisho safi: Badass Box

Ikiwa muonekano wa zip tie si wa kwako, Badass Box 4 Universal inafanya kazi hiyo hiyo ndani ya kasha. Inajifunga kwenye sensa na kuzidisha mapigo ya sumaku mara mbili kwa kila mzunguko wa gurudumu, kwa hiyo kidhibiti kinahesabu nusu ya mwendo halisi. Hakuna nyaya, hakuna soldering, unaiondoa kwenye baiskeli chini ya dakika moja, na haiachi alama yoyote kwa ajili ya ukaguzi wa warsha.

Inagharimu kama euro 130, ambayo ni pesa nyingi kwa kitu kilichomo ndani, lakini ndilo chaguo pekee linalolinda dhamana (warranty). Kitu kimoja: sumaku ya spoki lazima ipite kwenye sensa kwa umbali wa 8 hadi 14 mm, na boxi inaonyesha nusu ya mwendo wako halisi kwenye console isipokuwa uunganishe na programu ya Boost Buddy.

## Suluhisho la kweli: kidhibiti cha KT

Ubongo wa baiskeli ni kidhibiti kilichofungwa ndani ya sehemu iliyo chini ya betri, kimebandikwa na gundi. Kikibadilishe na utakuwa unamiliki mkondo na kizuizi cha mwendo.

Vifaa, vyote kutoka AliExpress, kama dola 65:

| Kifaa | Bei | Kazi yake |
| --- | --- | --- |
| KT controller 17A na LCD3 | $45.73 | Ubongo mpya, mkondo umewekwa na display |
| Kebo ya kuongeza urefu ya mota ya pini 9 | $10.90 | Harness isiyopitisha maji unayoikata |
| Sensa ya pedali ya KT-V12L | $2.94 | Sensa ya mawimbi 12 kwa ajili ya KT |
| Kebo ya display ya pini 5 ya SM, 170 cm | $5.33 | LCD3 hadi kwenye mpini (handlebar) |

Chagua 17A, si 22A. Mfumo wa usimamizi wa betri (BMS) wa 36 V 11.6 Ah hutoa kama 20 hadi 25 A, na kidhibiti cha 22 A kinacheza kwenye mstari huo. 17 A ni kama 610 W ya juu dhidi ya 470 W ya awali, msaada wa wazi bila kuchoma chochote.

## Kuunganisha nyaya na kuanza

Sensa ya pedali ya awali ina lugha yake yenyewe, kwa hiyo KT inahitaji sensa yake ya mawimbi 12 kwenye sehemu ya chini ya pedali (bottom bracket). Kila kitu kingine ni plug and play isipokuwa mota.

```
kidhibiti                  mota (Vision hub)
   |                            |
   |  nyaya 3 za phase   nene: manjano / kijani / bluu
   |  nyaya 5 za hall    nyembamba: nyekundu nyeusi manjano kijani bluu
   |                            |
   +--- unganisha kwa solder 1:1, rangi zilingane, kisha weka heat shrink
```

1. Piga picha kila kiunganishi (connector) kwenye kidhibiti cha zamani kabla ya kuchomoa chochote.
2. Fungua sehemu iliyo chini ya betri. Kifuniko kimebandikwa, kiinue kwa uangalifu.
3. Kata viunganishi vya zamani vya mota, unganisha harness ya KT kwenye nyaya za mota kwa kulinganisha rangi, weka heat shrink kwenye kila kitu.
4. Anza kwa kuinua gurudumu la nyuma juu ya ardhi. Ikiwa mota inatetemeka au inazunguka kinyume, mpangilio wa hall si sahihi. Zima betri, badilisha nyaya mbili za hall, jaribu tena. Kwa kawaida ni majaribio moja au mawili kati ya mchanganyiko sita. Usichomoe kitu chochote wakati betri inawaka.
5. Kaza sensa ya KT-V12L upande wa kushoto wa bottom bracket, diski ya sumaku ielekee sensa, nafasi ya 3 hadi 5 mm.
6. Weka LCD3, weka 36 V, ukubwa wa gurudumu inchi 28, mawimbi ya pedali 12, mkondo 17 A.
7. Ikiwa kizuizi cha msaada bado kipo, punguza ukubwa wa gurudumu kwenye display. Inchi 28 hadi 22 inaonyesha polepole kwa asilimia 25 na kusogeza kizuizi kulingana na hapo.
8. Jaribu uani, kisha barabarani. Njia kamili ya kurudi nyuma: kidhibiti cha zamani na viunganishi vyake vinarudi na baiskeli inakuwa kama ya awali.

Onyo moja la ukweli: Pinout ya Vision hub haijaandikwa popote. Ikiwa kubahatisha hall hakufanikiwi, nunua kidhibiti cha KT cha modi mbili (dual mode), kinafanya kazi bila sensa na kinapuuza nyaya za hall kabisa.

## Nini kinaweza kuharibika na gharama zake

Motor yenyewe ni ya aina ya geared hub na haina mfumo wa kupoza. Ukilazimisha wati 600 mfululizo kwenye mteremko, windings zitaungua tu baada ya muda. Punguza current iwe 15 A kama njia yako ina milima mingi.

Sheria za Ujerumani zinasema hivi: baiskeli ikikusaidia kwenda zaidi ya kilomita 25 kwa saa, hiyo si pedelec tena. Hapo ndipo utaanza kuhangaika na bima na vibali, na warranty yako inafutika sekunde tu unapofungua chumba cha betri. Lakini ukitumia hiyo setting iliyofunguliwa kwenye kiwanja chako binafsi, hakuna mtu anayekusumbua.

Pesa unayochezea hapa ni kama dola 65 za vifaa na jioni moja ya kazi. Zote mbili zinaweza kurekebishika. Hifadhi zile soketi za zamani kwenye mfuko, uziweke kwa tepu chini ya kifuniko cha betri, na utaweza kurudisha kila kitu kama zamani wakati wowote.

Kwangu mimi, utaratibu ulikuwa wazi. Jaribu kwanza ujanja wa sumaku, kwa sababu ni bure na unachukua dakika kumi na tano tu. Kama kasi hiyo inatosha na haujali onyesho la kioo kukudanganya, basi ishia hapo. Lakini kama unataka na ile nguvu ya torque, au unataka display inayoonyesha ukweli, basi ule mchongo wa KT swap ndio suluhisho la maana.
