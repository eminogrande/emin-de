---
title: "Nuri, mtazamo mpya wa kifedha"
description: "Maswali ya haraka kuhusu mtazamo na malengo ya Nuri.com. Maana ya kujimiliki mwenyewe, jinsi passkeys zinavyolinda pesa zako, na jinsi Nuri inavyojipatia mapato."
date: "2026-05-05T10:04:17.053Z"
updated: "2026-05-05"
lang: sw
translated_from: "en/nuri-new-reality-finance-vision"
source_sections: ["mission-and-who-it-is-for", "technology-and-security", "paying-and-why-nuri-is-not-a-bank", "research-open-source-and-ai", "how-nuri-makes-money"]
category: nuri
format: note
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tldr: ["Nuri inataka kufanya umiliki wa mali za kidijitali uwe rahisi kama Face ID na salama kama sefu ya chuma, kwa kila mtu duniani.", "Passkeys zenye PRF extension ndizo zinazotengeneza funguo zako, na wewe ndiye unayezimiliki. Nuri ni Money Browser, si benki.", "Nuri inapata mapato kupitia ada ndogo za miamala (swaps), si kwa kukuhifadhia pesa zako."]
sections: [{"basically": "Pesa za kidijitali kwenye wallet yako mwenyewe. Hakuna mtu, hata Nuri, anayeweza kuzizuia."}, {"basically": "Passkey yako inatengeneza funguo, funguo kadhaa zinalinda akaunti yako, na tunafanyia kazi suluhisho la simu kupotea kama sehemu ya R&D."}, {"basically": "Visa, Apple Pay na SEPA zinapatikana kupitia washirika, huku pesa zako zikibaki kwenye Wallet yako mwenyewe."}, {"basically": "Open source ili mtu yeyote aweze kuikagua. AI inaweza kupendekeza malipo, lakini wewe ndiye unayeyaidhinisha."}, {"basically": "Unatoa ada ndogo unapofanya swap, kwa ajili ya urahisi, si kwa ajili ya kuhifadhi pesa zako."}]
---
Maswali ya mara kwa mara kuhusu Dira na Lengo la Nuri.com kutoka kwa Emin Mahrt

## Dira na walengwa

Nini misheni kuu ya Nuri?

Tunafanya umiliki wa kidijitali uwe rahisi kama kutumia Face ID na salama kama sefu ya chuma. Lengo letu ni kumwezesha kila mtu duniani kumiliki na kudhibiti mali zake za kidijitali, kama Bitcoin au Euro za kidijitali, bila vikwazo vya kiufundi, bila kuhitaji akaunti ya benki, na bila kumtegemea mtu mwingine yeyote ili asimamie mali zako.

Self-custody inamaanisha nini kwa lugha rahisi?

Self-custody ni sawa na kuwa na pesa taslimu mfukoni mwako. Tofauti na akaunti ya kawaida ya benki ambapo benki ndiyo inayomiliki na kusimamia pesa zako, ukiwa na Nuri, wewe ndiye unayeshikilia funguo za siri (cryptographic keys). Hakuna mtu, hata Nuri, anayeweza kuzuia akaunti yako au kufikia pesa zako.

Nuri imejengwa kwa ajili ya nani?

Kwa kila mtu. Ni muhimu sana kwa wale ambao hawana uwezo wa kupata huduma za kibenki, kama wakimbizi au watu wanaoishi katika nchi zenye miundombinu dhaifu ya kifedha. Pia inawafaa watumiaji wanaojali usalama na wanaotaka kurejesha udhibiti kamili wa mali zao za kidijitali.

## Teknolojia na usalama

Nini uvumbuzi mkuu wa kiufundi wa Nuri?

Tunatumia Passkeys (WebAuthn) si kwa ajili ya kuingia kwenye akaunti tu, bali pia kutengeneza funguo za siri. Kwa kutumia Pseudo-Random-Function (PRF) ya Passkey, tunapata ufunguo salama kutokana na data yako ya kibayometriki, yaani Face ID au alama ya kidole chako. Hii inakuwezesha kusaini miamala ya blockchain moja kwa moja kutoka kwenye hardware salama ya simu yako.

Mfumo unalindwaje dhidi ya wadukuzi?

Tunatumia mfumo wa funguo nyingi (multi-key architecture). Ufikiaji wako hautegemei neno moja la siri (password), bali funguo nyingi zilizosambazwa; kwa mfano, moja iko kwenye simu yako na nyingine kwenye mfumo wa urejeshaji. Mdukuzi angehitaji kuvamia mifumo mingi huru kwa wakati mmoja ili apate ufikiaji, jambo ambalo ni vigumu sana. Na kwa kuwa hatutunzi database kuu ya watumiaji, hakuna sehemu moja ambayo inaweza kuvamiwa na taarifa zote zikavuja.

Nini kinatokea nikipoteza simu yangu?

Hili ni eneo muhimu tunalolifanyia utafiti na maendeleo. Tunatengeneza njia za kubadilisha na kurejesha funguo. Unaweza kufunga vifaa vilivyopotea na kurejesha ufikiaji kupitia funguo za akiba (backup keys) au njia nyingine za uthibitisho bila kuacha kanuni ya self-custody.

## Malipo, na kwa nini Nuri si benki

Je, naweza kutumia Nuri kulipa kwenye duka la mtaani?

Ndiyo. Pesa zako zinabaki kwenye Wallet yako ya self-custody, na sisi tunatoa madaraja ya kuunganisha na ulimwengu wa kifedha wa kawaida kupitia washirika wetu. Washirika wa Visa wanaruhusu malipo ya kadi na Apple Pay. Washirika wa IBAN wanaruhusu uhamisho wa SEPA moja kwa moja kutoka kwenye Wallet yako, kwa mfano kulipa kodi. Faida ya kipekee ni kwamba mshirika mmoja akifeli, ni kipengele hicho tu ndicho kitakachopotea; pesa zako zinabaki salama na unaweza kuzipata kwenye Wallet yako wakati wowote.

Je, Nuri ni benki?

Hapana. Nuri ni "Money Browser". Tunatoa teknolojia inayokuwezesha kuingiliana moja kwa moja na mitandao ya madaraka (blockchains). Hatushikilii amana zako, na hatuna udhibiti wowote juu ya mali zako.

## Utafiti, open source na AI

Kwa nini mradi huu ni wa utafiti na maendeleo (R&D)?

Kuchanganya urahisi wa hali ya juu kwa mtumiaji, yaani bila kuhitaji kukariri seed phrases, na self-custody ya kweli ya madaraka ni changamoto kubwa ya kiufundi. Utafiti wetu unajikita kwenye mambo matatu: Urejeshaji wa madaraka (decentralized recovery) ili kurejesha ufikiaji bila mamlaka kuu; Urithi, ili warithi waweze kupata mali baada ya kipindi fulani cha kutofanya kazi; na utayari wa baada ya kompyuta za quantum (post-quantum readiness), ili kulinda sahihi za kidijitali dhidi ya vitisho vya baadaye kutoka kwa kompyuta za quantum.

Kwa nini Nuri ni open source?

Uaminifu lazima uweze kuthibitishwa. Kwa kuweka source code yetu hadharani, wataalamu duniani kote wanaweza kukagua usalama wetu. Pia, inahakikisha kwamba unaweza kufikia pesa zako hata kama Nuri kama kampuni ikisitisha shughuli zake.

AI inajipangaje katika mustakabali wa Nuri?

Tunatengeneza njia kwa ajili ya Uchumi wa Wakala (Agent Economy). Katika siku zijazo, wasaidizi wa AI wanaweza kukuandalia malipo au kukagua ankara kwa ajili yako. Kupitia miundombinu yetu salama ya sahihi, unabaki na udhibiti wa mwisho kila wakati. AI inaweza kupendekeza muamala, lakini wewe ndiye unayeuidhinisha kwa kutumia Face ID yako.

## Jinsi Nuri inavyopata pesa

Nuri inapata pesa vipi kama hakuna ada za akaunti?

Tunapata pesa kupitia huduma za urahisi. Unapofanya swap ya sarafu ndani ya app, kwa mfano Bitcoin kwenda Euro, ada ndogo ya huduma inatozwa. Unalipia urahisi wa muunganisho na matumizi, si kwa ajili ya kuhifadhi pesa zako.

"Umiliki wa kidijitali rahisi kama Face ID, huru kama pesa taslimu."
