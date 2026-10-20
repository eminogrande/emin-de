---
title: "Nuri Wallet, New Reality Finance. Mahojiano kuhusu maono na malengo yetu"
description: "Mahojiano yangu binafsi kuhusu Nuri mpya"
date: "2026-05-05T10:02:55.416Z"
updated: "2026-05-05"
lang: sw
translated_from: "de/nuri-wallet-new-reality-finance-ein-interview-zur-vision-und-zielen"
source_sections: ["ziel-und-zielgruppe", "technik-und-sicherheit", "bezahlen-und-warum-nuri-keine-bank-ist", "forschung-open-source-und-ki", "wie-nuri-geld-verdient"]
category: nuri
format: note
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tldr: ["Mahojiano yangu binafsi kuhusu Nuri mpya.", "Passkeys ndizo zinazotengeneza funguo zako, na hakuna mtu anayeweza kugusa pesa zako isipokuwa wewe, hata Nuri hawawezi.", "Nuri si benki, bali ni Money Browser; ni mradi wa open source na pia wa utafiti."]
sections: [{"basically": "Kila mtu anapaswa kumiliki pesa zake za kidijitali mwenyewe, bila kuhitaji akaunti ya benki au mtu wa kati."}, {"basically": "Passkeys zinatumia PRF kutengeneza funguo zilizotawanywa kwenye mifumo mingi badala ya kutegemea nenosiri moja."}, {"basically": "Visa na IBAN zinaendeshwa kupitia washirika. Mmoja akifeli, pesa zako bado zipo salama kwenye Wallet yako."}, {"basically": "Masuala ya urejeshaji wa akaunti, urithi, na Post-Quantum bado hayajatatuliwa kikamilifu. Code iliyo wazi inafanya uaminifu uweze kupimika."}, {"basically": "Hakuna ada za akaunti. Tunapata faida kupitia ada ndogo unayolipa unapofanya swap ndani ya app."}]
---
Mahojiano na mimi mwenyewe kuhusu Nuri mpya

## Lengo na walengwa

Lengo kuu la Nuri ni nini?

Tunafanya umiliki wa kidijitali uwe rahisi kama kutumia Face ID na salama kama sefu. Lengo letu ni kila mtu duniani aweze kumiliki na kusimamia pesa zake za kidijitali (kama Bitcoin au Euro za kidijitali) yeye mwenyewe. Hakuna usumbufu wa kiufundi, hakuna haja ya akaunti ya benki, na bila kumtegemea mtu mwingine yeyote ili kudhibiti pesa zako.

"Kujisimamia" (Self-Custody) kunamaanisha nini kwa lugha rahisi?

Kujisimamia ni kama kuwa na pesa taslimu mfukoni mwako. Tofauti na akaunti ya benki ambapo benki inashikilia pesa zako, katika Nuri wewe ndiye unayemiliki funguo za kriptografia pekee. Hakuna yeyote, hata Nuri, anayeweza kuzuia akaunti yako au kugusa pesa zako.

Nuri imetengenezwa kwa ajili ya nani?

Kwa kila mtu. Inafaa sana kwa watu wasioweza kufikia huduma za kibenki (kama wakimbizi au watu wanaoishi sehemu zenye miundombinu dhaifu), lakini pia kwa watumiaji wanaojali usalama na wanaotaka kurudisha udhibiti kamili wa mali zao za kidijitali.

## Teknolojia na usalama

Ubunifu mkuu wa kiteknolojia wa Nuri ni upi?

Tunatumia Passkeys (WebAuthn) si kwa ajili ya kuingia tu, bali tunazitumia kutengeneza funguo za kriptografia. Kupitia kitu kinachoitwa Pseudo-Random-Function (PRF), tunatengeneza "Secrets" salama kutoka kwa alama zako za kibayometriki (Face ID au Fingerprint). Secrets hizi ndizo unazotumia kusaini miamala kwenye blockchain.

Mfumo huu ni salama kiasi gani dhidi ya wadukuzi?

Tunatumia muundo wa Multi-Key. Ufikiaji wako hautegemei nenosiri moja tu, bali funguo nyingi zilizosambazwa (kama kwenye smartphone yako na seva ya backup). Mdukuzi angehitaji kuvunja mifumo mingi kwa wakati mmoja ili apate ufikiaji. Na kwa sababu hatuna hifadhidata kuu ya watumiaji, hakuna sehemu moja ambapo data zote zinaweza kuvuja kwa wingi.

Nini kinatokea nikipoteza smartphone yangu?

Hiyo ni sehemu kubwa ya utafiti wetu. Tunatengeneza njia za kubadilisha funguo na kuzirejesha. Unaweza kufunga vifaa vilivyopotea na kurudisha ufikiaji kupitia funguo za backup au njia nyingine za uthibitishaji, bila kupoteza haki yako ya kujisimamia.

## Malipo, na kwa nini Nuri si benki

Je, ninaweza kulipia bidhaa dukani na Nuri?

Ndiyo. Ingawa pesa zako ziko salama kwenye Wallet yako mwenyewe, tunatoa madaraja ya kuungana na mfumo wa kifedha wa kawaida kupitia washirika wetu. Mshirika wa Visa anaruhusu malipo ya kadi na Apple Pay. Mshirika wa IBAN (kama Monerium) anaruhusu uhamisho wa SEPA moja kwa moja kutoka kwenye Wallet (kama vile kulipa kodi). La muhimu ni kwamba, hata kama mshirika mmoja akifeli, pesa zako bado ziko salama kwenye Wallet yako. Ni ile huduma ya ziada tu ndiyo inayosimama.

Je, Nuri ni benki?

Hapana. Nuri ni kama "Money Browser". Tunatoa teknolojia inayokusaidia kuingiliana moja kwa moja na mitandao ya kidijitali (Blockchains). Hatushikilii pesa zako na hatuna udhibiti wowote wa mali zako.

## Utafiti, Open Source na AI

Kwa nini mradi huu ni wa utafiti?

Kuchanganya urahisi wa hali ya juu (bila kuhitaji kukumbuka Seed Phrases!) na kujisimamia kikamilifu kwa njia ya desentralized ni changamoto ya kiteknolojia ambayo haijatatuliwa. Tunatafiti njia salama za kurejesha akaunti bila kuhitaji mamlaka kuu. Tunatafiti suluhisho za urithi, ili warithi waweze kupata mali kwa usalama baada ya muda fulani wa kutokuwepo kwa shughuli. Na tunatafiti usalama wa Post-Quantum, ili kujilinda dhidi ya mashambulizi ya baadaye ya kompyuta za quantum.

Kwa nini Nuri ni Open Source?

Uaminifu lazima uweze kuthibitika. Kwa kuweka wazi code zetu, wataalamu duniani kote wanaweza kuhakikisha kuwa kriptografia yetu inafanya kazi kama tulivyoahidi. Pia, inakuhakikishia kuwa bado utaweza kusimamia pesa zako hata kama kampuni ya Nuri haitakuwepo tena.

AI ina nafasi gani katika mustakabali wa Nuri?

Tunatengeneza njia kwa ajili ya "Agent-Economy". Katika siku zijazo, wasaidizi wa AI wataweza kukuandalia malipo au kukagua ankara. Kupitia mfumo wetu wa usaini salama, wewe ndiye unayebaki na udhibiti wa mwisho. AI inapendekeza, lakini wewe ndiye unayethibitisha malipo hayo kwa Face ID.

## Jinsi Nuri inavyotengeneza pesa

Nuri inatengeneza pesa vipi ikiwa hakuna ada ya akaunti?

Tunatengeneza pesa kupitia huduma za ziada za urahisi. Unapobadilisha sarafu ndani ya app (kama Bitcoin kwenda Euro), kuna ada ndogo ya huduma. Kwa hiyo unalipia urahisi na muunganiko usio na mshono, siyo kwa ajili ya kuhifadhiwa kwa pesa zako.

“Umiliki wa kidijitali, rahisi kama Face ID na uhuru kama pesa taslimu.”
