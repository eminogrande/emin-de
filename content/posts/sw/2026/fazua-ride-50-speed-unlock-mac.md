---
title: "Kuongeza kasi ya Fazua Ride 50 kutoka Mac, bila box"
description: "Jinsi mimi na agent wangu tulivyoongeza kikomo cha kasi cha Fazua Ride 50 Evation kutoka 25 hadi 55 na kisha 69.77 km/h kupitia USB kutoka MacBook, na firmware 2.04 na tool ya open source."
date: "2026-10-16"
updated: "2026-10-18"
lang: sw
translated_from: "en/fazua-ride-50-speed-unlock-mac"
source_sections: ["the-bike-and-the-problem", "the-idea-change-one-number-instead-of-fooling-the-sensor", "what-i-used", "step-1-connect-the-drivepack-to-the-mac", "step-2-read-before-you-write", "step-3-downgrade-to-204", "step-4-write-55-kmh", "step-5-back-into-the-bike", "what-went-wrong-on-the-way", "battery-modes-and-going-back", "update-raw-value-1938", "berlin"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Canyon Roadlite:ON", "macOS", "how-to"]
source_links: [{"title": "FazuaUnlocker, my fork with the Mac port", "url": "https://github.com/eminogrande/FazuaUnlocker", "note": "fazua_mac.py, README-MAC.md and the firmware download script."}, {"title": "FazuaUnlocker by quezzas", "url": "https://github.com/quezzas/FazuaUnlocker", "note": "The original Windows tool, MIT licence."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "The official tool for firmware updates over USB."}, {"title": "FAZUA: How to do a Ride 50 firmware update", "url": "https://fazua.com/en/support/help-center/videos/how-to-fazua-ride-50-firmware-update", "note": "Manual firmware install, and why the remote LEDs flash afterwards."}, {"title": "Eplus Flash Home, Fazua speed unlocker", "url": "https://www.eplus.bike/en/prodotto/fazua-software-home-speed-unlocker/", "note": "The paid Windows version of the same idea, and the 2.50 to 2.04 downgrade note."}, {"title": "Firmware 2.04, archived original from fazua.com", "url": "https://web.archive.org/web/20220709185915/https://fazua.com/documents/826/evation_Software_2.04.bin", "note": "Internet Archive snapshot of 9 July 2022."}]
tldr: ["Fazua Ride 50 huhifadhi kikomo chake cha 25 km/h kama value moja ndani ya drivepack. Kwenye firmware 2.04 unaweza kuibadilisha kupitia USB.", "Nilifanya hivi kutoka MacBook Pro M4. Tool ya open source ilikuwa ya Windows pekee, hivyo agent wangu akabadilisha layer yake ya USB na kuiweka hidapi.", "Firmware 2.50 ililazimika kurudishwa kwenye 2.04 kwanza, kupitia FAZUA Toolbox rasmi. File ya 2.04 ni ile original kutoka fazua.com.", "Soma tena baada ya kuandika, kwanza 55.01 km/h, siku mbili baadaye raw value 1938, hiyo ni 69.77 km/h. Ikiwa uko Berlin na unapenda kufungua Fazua Ride 50 yako, jisikie huru kuwasiliana nami."]
sections: [{"basically": "Canyon Roadlite:ON ya 2020 yenye Fazua Ride 50 Evation, na tuning box ambayo iliendelea kumeta yellow."}, {"basically": "Box inadanganya sensor ya kasi. Software inabadilisha tu kikomo ambacho motor inakilinganisha nacho."}, {"basically": "Bike yangu, MacBook yangu, cable ya mini USB, screwdriver ya T10, FAZUA Toolbox na takriban mistari 75 ya Python."}, {"basically": "Drivepack nje, battery ndani, cap ya USB nje, cable ndani. Mac inaiona kama evation v2.50."}, {"basically": "Kwanza soma tu. Yangu ilisema 24.98 km/h na wheel ya 2121 mm. File hiyo pia ni backup."}, {"basically": "Kwenye FAZUA Toolbox chagua Manual, si Online, chagua file ya 2.04 na uiache iflash na kucalibrate."}, {"basically": "Command moja inaandika kikomo kipya, bike inakubali, na kusoma kwa pili inaonyesha 55.01 km/h."}, {"basically": "LEDs nyeupe zikimeta kwa zamu ni remote inajisasisha yenyewe. Iache mpaka ionyeshe green."}, {"basically": "Click mbaya, kuandika mara mbili kukatizwa, na taa nyekundu ambayo ilikuwa tu drivepack iliyokaa vibaya."}, {"basically": "Kikomo ni kilekile katika kila mode. Range sivyo. Command moja inarudisha hadi 25."}, {"basically": "Siku mbili baadaye nilikwenda hadi raw value 1938, mwaka wa kuzaliwa wa baba yangu. Hiyo ni 69.77 km/h."}, {"basically": "Ikiwa uko Berlin na unapenda kufungua Fazua Ride 50 yako, jisikie huru kuwasiliana nami."}]
---
## Baiskeli na tatizo

Baiskeli yangu ni Canyon Roadlite:ON AL 7.0 ya mwaka 2020, saizi M, rangi ya pace grey na orange. Motor ni Fazua Evation, ambayo Fazua leo wanaiita Ride 50 Evation. Drivepack, motor na betri kwa kipande kimoja kirefu, iko ndani ya down tube na hutoka kwa lever moja. Betri ni Energy 250, touch remote imewekwa ndani ya frame. Hakuna display kwenye handlebar, kwa hivyo baiskeli haitakuambia unakwenda kasi gani.

Kabla ya hii drivepack yangu ilikuwa inatumia firmware 2.50 na betri firmware 1.15. Najua hivyo tu kwa sababu nilisoma kwa FAZUA Toolbox, angalia hapa chini.

Assist inakataa saa 25 km/h, kama kila pedelec nchini EU. Nilikuwa nataka kuona baiskeli inahisi vipi kwa zaidi. Hivyo tarehe 7 Oktoba nilinunua Badass Box 4 kwa Fazua. Niliandika kuhusu hilo katika [Badass Box 4 on a Fazua Ride 50, the yellow light](/posts/badass-box-4-fazua-ride-50-yellow-light). Ilifanya kazi kwa dakika moja au mbili, halafu LED ya juu ilianza kuwaka njano tena. Magnet karibu zaidi, spoke nyingine, imezungushwa digrii 90, Badass support walisema installation inaonekana nzuri. Bado njano baada ya dakika chache za kuendesha.

## Wazo, badilisha namba moja badala ya kudanganya sensor

Badass Box iko kwenye speed sensor kwenye chainstay na hubadilisha pulses kutoka kwa spoke magnet, ili motor ifikiri unakwenda polepole kuliko unavyokwenda. Hiyo ni hila kwenye signal, na kwenye baiskeli yangu Fazua iligundua baada ya muda na kuweka soft fault.

Motor yenyewe inalinganisha tu kasi yako na thamani moja iliyohifadhiwa. Fazua wanaiita bikeMaxSpeed. Wauzaji wanaweza kuiona kwenye Toolbox, lakini kwa watumiaji wa kawaida imefungwa. Ukibadilisha thamani hiyo, hakuna cha kudanganya. Sensor inaripoti kasi halisi na motor inasaidia tu kwa muda mrefu zaidi.

Agent yangu alipata njia mbili za kufanya hivyo. Kampuni ya Italia Eplus inauza Flash Home kwa euro 134 pamoja na VAT, Windows tu. Na kuna FazuaUnlocker kwenye GitHub na quezzas, bure, leseni ya MIT, pia Windows tu. Zote mbili zinasema jambo moja. Inafanya kazi kwenye firmware 2.04. Kwenye 2.50 unarudi kwanza hadi 2.04.

```
before (box)                           after (software)

spoke magnet -> [box] -> sensor        spoke magnet -> sensor
                 |  fake slower                         |  real speed
                 v                                       v
drivepack: limit 25 km/h               drivepack: limit 55 km/h
           -> yellow after 1-2 min                -> no box, no yellow
```

## Nilichotumia

1. Baiskeli, betri imejaa kabisa.
2. MacBook Pro M4, 16 GB, macOS 15.5. Inafanya kazi kwenye Apple Silicon, hakuna Windows, hakuna virtual machine.
3. Cable ya mini USB ya data. Sio cable ya kuchaji tu.
4. Screwdriver ya Torx T10 kwa cap ya USB.
5. FAZUA Toolbox 2.29 basic kwa macOS kwenye Apple Silicon, kutoka kwenye tovuti ya Fazua.
6. Firmware 2.04, faili evation_Software_2.04.bin. Link ya awali ya fazua.com imepotea, lakini Internet Archive ilihifadhi kutoka tarehe 9 Julai 2022. SHA-256 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e. Agent yangu alilinganisha na nakala inayozunguka kwenye GitHub, na zinafanana kabisa hadi byte.
7. Fork yangu ya FazuaUnlocker, [github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker), na Python 3.9 na library ya hidapi.

Tool ya awali inazungumza na drivepack kupitia Windows USB functions. Agent yangu aliacha protocol, checksum na write logic kama zilivyo na kubadilisha tu layer hiyo moja na hidapi, ambayo pia inafanya kazi kwenye macOS. Hiyo ni faili fazua_mac.py, mistari kama 75. Firmware yenyewe imefichwa, kwa hivyo hakuna mtu hapa anayebadilisha firmware. Tool inabadilisha tu setting.

## Hatua ya 1, unganisha drivepack na Mac

1. Toa drivepack kutoka kwenye baiskeli. Betri inabaki ndani ya drivepack na lazima iwashwe.
2. Fungua cap ya USB kwenye drivepack na T10. Iko chini karibu na cooling fins.
3. Unganisha cable ya mini USB na Mac na weka drivepack gorofa sakafuni au mezani.
4. Hakikisha Mac inaiona. Kwenye terminal `system_profiler SPUSBDataType | grep evation` ilionyesha `evation v2.50` kwangu. Kwa tool ni USB HID device yenye ID 10C4:1001.

Fazua inasema kwenye guide yake kwamba unahitaji tu drivepack kwa firmware update, sio baiskeli nzima. Gurudumu halihitaji kuzunguka kwa lolote hili.

## Hatua ya 2, soma kabla ya kuandika

Funga FAZUA Toolbox kwanza, kwa sababu inashikilia USB connection. Halafu:

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

Yangu ilijibu baada ya takriban ms 110. Max Bike Speed 24.98 km/h, raw value 694. Wheel length 2121 mm. Shaft offset 30533. Tool inapata write key ndogo kutoka kwa offset hiyo, yangu ilikuwa ba88. Agent yangu alihifadhi readout hii kama faili ya JSON, ili niweze kurudi kwenye thamani hizi haswa wakati wowote.

Halafu dry run, ambayo inajenga write packet na checksum lakini haitumii kitu:

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## Hatua ya 3, downgrade hadi 2.04

Hii ndiyo sehemu yenye hatari halisi. Ikiwa flash itakatizwa, drivepack inaweza kufa. Kwa hivyo betri imejaa, cable imewekwa vizuri, drivepack iko kimya.

1. Fungua FAZUA Toolbox, nenda FIRMWARE UPDATE, bonyeza UPDATE NOW.
2. Chagua Manual. Sio Online, kwa sababu Online inaweka version mpya tena.
3. Chagua evation_Software_2.04.bin na angalia jina la faili kabla ya kubonyeza START.
4. Subiri. Baada ya flash motor inacalibrate na inaweza kutetemeka kidogo. Usisogeze drivepack.
5. Angalia tena na system_profiler. Yangu sasa ilisema `evation v2.04`.

Kusoma tena baada ya downgrade bado ilionyesha 24.98 km/h. Mabadiliko ya firmware pekee hayafungui kitu.

## Hatua ya 4, andika 55 km/h

```sh
.venv/bin/python fazua_mac.py 55 --force
```

Tool ilionyesha mabadiliko kutoka 24.98 km/h, raw 694, hadi 55.00 km/h, raw 1528. Halafu "Write cycle acknowledged by bike", halafu ilisoma thamani tena yenyewe. "SUCCESS: bikeMaxSpeed is now 55.01 km/h". Soma tofauti baada ya sekunde chache ilisema vilevile, wheel length bado 2121 mm.

Tool inakubali 5 hadi 75 km/h. Nilichagua 55 kwa sababu nataka kuona vipi. Agent yangu alipendekeza 45, kwa sababu motor haina nguvu isiyo na mwisho na juu ya kasi fulani sehemu kubwa hutoka kwa miguu yako hata hivyo. Chochote utakachoweka, motor inasaidia tu kwa muda mrefu zaidi, haifanyi baiskeli iwe kasi yenyewe.

## Hatua ya 5, rudisha kwenye baiskeli

1. Toa cable, funga cap ya USB kwa mkono, 1 hadi 1.5 Nm. Bila cap drivepack haifai kwa maji.
2. Weka drivepack kwenye baiskeli hadi ibonyeze ndani.
3. Washa.

Kwenye baiskeli yangu remote halafu ilikuwa inawaka nyeupe, LED mbili juu na mbili chini, kwa mzunguko. Inaonekana kama kosa. Sio. Fazua inaandika kwenye update guide yake "Flashing LEDs indicates an update of the remote. Do not touch the remote during the update and do not switch off the e-bike." Drivepack inaleta remote kwenye firmware level yake. Yangu ilizimika mara moja, ilirudi, na halafu kila kitu kilikuwa kijani.

Halafu nilijaribu. Inaonekana inafanya kazi. Sina kasi halisi ya juu bado, kwa sababu baiskeli haina display. Wakati mwingine simu na GPS speedometer itawekwa kwenye handlebar.

## Kiliyokwenda mrama njiani

Agent yangu ilibofya Toolbox kwenye Mac yangu, na click ya kwanza iligusa CALIBRATION badala ya FIRMWARE UPDATE. Ilifungua tu ukurasa, hakuna kilichoanza. Kisha click kwenye Manual haikufika, kwa sababu clicks zinazotumwa background hazikufika kwenye dialog hiyo. Agent yangu ilisimama hapo, kwa sababu click mbaya kwenye START ingeweka 2.50 tena. Nilibofya Manual na file mwenyewe.

Majaribio mawili ya kwanza ya kuandika yalikatizwa. Tool inauliza yes kabla haijaandika, na jinsi agent yangu ilivyoweka majibu haikufika swali hilo. Hakuna kilichoandikwa, kusoma baadaye bado kulionyesha 24.98 km/h. Kwa --force ilipita.

Baadaye nilitoa drivepack tena, nilifunga kifuniko cha USB na kuhamisha magnet, kisha LED ya juu ikawa nyekundu. Nyekundu si magnet. Manual ya Fazua inasema nyekundu juu inamaanisha hitilafu ya muunganiko kati ya drivepack na bottom bracket, sehemu ndani ya fremu ambayo huunganishwa. Niliitoa, nilikagua contacts, nikaisukuma ndani tena hadi ilipobonyeza, na ikawa sawa.

Na baada ya dakika 15 kusimama, system inajizima yenyewe. Hiyo ni kawaida pia, iko kwenye manual.

## Betri, modes na kurudi nyuma

Kikomo ni thamani moja kwenye drivepack. Green, blue na pink zote hutumia 55 km/h sawa. Modes hubadilisha tu ni kiasi gani motor inasukuma na ni kasi gani betri inaisha. Kuendesha haraka kunatumia nishati nyingi zaidi, kwa hivyo juu ya 25 range inashuka haraka.

Kwenye firmware 2.04 betri pia hukaa imewaka muda mrefu zaidi baada ya safari. Kwenye 2.50 Fazua walikuwa wamepunguza standby hiyo hadi saa moja hadi tatu, kwenye firmware ya zamani ni hadi nane. Kwa hivyo baada ya kuendesha nashikilia kitufe kwenye betri kwa sekunde mbili hadi LED zizime.

Kurudi kwenye stock ni amri moja na cable ikiwa imeunganishwa:

```sh
.venv/bin/python fazua_mac.py 25 --force
```

Eplus wanaandika kuwa unaweza kuupdate tena hadi 2.50 baada ya kufungua. Sijajaribu hilo, kwa hivyo kwa sasa ninabaki kwenye 2.04 na sisukumi update kwenye Toolbox wala app.

Juu ya 25 km/h bike si pedelec tena. Ujerumani inaruhusiwa tu kwenye ardhi ya kibinafsi, si barabara za umma, na warranty na insurance zinaweza kuisha. Kuweka firmware kunaweza kuharibu drivepack. Kila kitu hapa ni kwa hatari yako mwenyewe.

## Update, raw value 1938

Siku mbili baadaye betri ilikuwa kwenye Mac tena na nilitaka kwenda juu zaidi. Kwanza niliuliza 69.69 km/h. Hiyo haipo hasa. Drivepack haihifadhi km/h, inahifadhi namba moja nzima, raw value, na km/h ni raw value mara 0.036. Kwa hivyo 69.69 ikawa raw 1936, ambayo ni 69.70 km/h.

Kisha nilichagua raw value 1938, kwa sababu 1938 ni mwaka baba yangu alizaliwa. 1938 mara 0.036 ni 69.768, tool inaonyesha 69.77 km/h. Hiyo ni aina ileile ya namba kama zamani. 55.01 pia ilikuwa tu imezungushwa, 1528 mara 0.036 ni 55.008.

Hatua zilikuwa sawa na hatua ya 2 na hatua ya 4. Kwanza kusoma tu, bado ilisema 55.01 km/h, raw 1528, wheel 2121 mm. Kisha dry run. Katika packet bytes mbili za speed tu ndizo zilizobadilika, kila kitu kingine kilibaki sawa. Kisha:

```sh
.venv/bin/python fazua_mac.py 69.768 --force
```

Agent yangu iliandika 69.768 na decimals tatu tu ili tool ifike hasa kwenye 1938. Kwa bike inatuma namba nzima. "Write cycle acknowledged by bike", kisha "SUCCESS: bikeMaxSpeed is now 69.77 km/h". Kusoma tofauti baadaye kulionyesha raw 1938, wheel length 2121 mm, hakuna kingine kilichobadilika.

Setting inaonekana inafanya kazi. Bado sina top speed iliyopimwa. 69.77 km/h ni kikomo cha assistance kilichowekwa, si speed iliyopimwa wala speed ambayo bike inafikia yenyewe.

Kurudi kwenye 55 ni `.venv/bin/python fazua_mac.py 55.008 --force`, ambayo inarudisha raw 1528 tena.

## Berlin

Ukiwa Berlin na ungependa kufungua Fazua Ride 50 yako, wasiliana nami: [emin@emin.de](mailto:emin@emin.de).
