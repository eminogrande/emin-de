---
title: "Uchambuzi wa Muamala wa 34yCReBo...jtVM"
description: "Tunachambua muamala mmoja wa NEAR kwenye Paras: kazi ya mt_transfer_call, maana ya NEP-245, na kwa nini gharama za miamala ni karibu bure."
date: "2026-02-09T10:40:01Z"
updated: "2026-02-09"
lang: sw
translated_from: "en/comprehensive-transaction-analysis-34ycrebo-jtvm"
source_sections: ["the-basics", "what-mt_transfer_call-does", "inside-the-transaction", "what-it-means"]
category: payments
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/comprehensive-transaction-analysis-34ycrebo-jtvm/cover.webp"
tldr: ["Uchambuzi wa muamala kwenye mainnet ya NEAR uliotoka kwa v4v.near kuelekea smart contract ya soko la Paras.", "Umetumia mt_transfer_call kwenye standard ya token nyingi ya NEP-245 kwa 15.42 TGas, ikiwa na thamani ya takriban $0.00008.", "Soko liliweza kutambua uhamisho huo papo hapo na kuanza mchakato wa hatua inayofuata, iwe ni biashara au uorodheshaji wa bidhaa."]
sections: [{"basically": "Muamala uliokamilika kwenye mainnet ya NEAR kutoka v4v.near kwenda soko la Paras kwa gharama ya chini sana."}, {"basically": "Call moja inahamisha token ya NEP-245 na kuipa contract inayopokea maagizo ya kufanya kazi papo hapo."}, {"basically": "Inahakiki umiliki, inakagua ile deposit ya 1 yoctoNEAR, inahamisha salio, kisha inampasha habari mpokeaji."}, {"basically": "Gharama ndogo imewezesha uhamisho wa token kwenye Paras na kuruhusu soko kuendelea na hatua inayofuata bila kuchelewa."}]
---
![](../../../media/comprehensive-transaction-analysis-34ycrebo-jtvm/cover.jpg)

# Uchambuzi wa Transaction ya 34yCReBo...jtVM

Hii ni transaction moja kwenye NEAR, na nitaichambua katika sehemu sita fupi, kuanzia nani aliyeituma mpaka inamaanisha nini.

## Mambo ya msingi

Transaction hash ni 34yCReBoTyb12hH33xVdydoNJE5s58Kb1VeWYwY7jtVM na ilifanyika kwenye mainnet ya NEAR Protocol. Status yake ni success na imekamilika (finalized). Aliyetuma (signer) ni v4v.near, na anayepokea ni contract ya x.paras.near, ambalo ndilo soko kuu la Paras.

Gas limit ilikuwa 300 TGas, kiasi cha juu cha computing units kilichotengwa, hivyo hakina thamani ya dola. Gas iliyotumika halisi ilikuwa 15.42 TGas, ikiwa na thamani ya takriban $0.00008. Transaction fee, yaani gharama ya kuwalipa validators kuchakata ombi hilo, ilikuwa 0.001542 NEAR, kwa hiyo ni chini ya $0.01. Pia kulikuwa na deposit ya 1 yoctoNEAR, thamani yake ikiwa kama $0.0000...01, kitu ambacho ni sharti la kiusalama kwa ajili ya kuhamisha assets.

## Kazi ya mt_transfer_call

Transaction hiyo ili-run `mt_transfer_call`, yaani multi-token transfer na call. Hii ni function ya juu inayofanya vitu viwili kwa mpigo. Sehemu ya transfer inahamisha umiliki wa asset husika, iliyofafanuliwa na NEP-245, kutoka kwa mtumaji kwenda kwa mpokeaji. Sehemu ya call inauambia contract pokeaji ifanye hatua ya pili papo hapo, kwa mfano ku-list kitu hicho kiuzwe au ku-stake.

NEP-245 ni toleo la NEAR linalofanana na ERC-1155 la kwenye Ethereum. Imejengwa kuwa kama kisu cha Jeshi la Uswisi kwa ajili ya digital assets, ndio maana ilitumika hapa. Badala ya kuwa na standards tofauti kwa ajili ya vitu vya kipekee (NFTs) na vile vinavyoweza kurundikwa (fungible tokens), NEP-245 inashughulikia yote mawili kwenye contract moja. Inaruhusu pia semi-fungible editions. Msanii akitoa nakala 100 zinazofanana za kadi ya kidijitali, NEP-245 inazifuatilia kama ID moja yenye balance ya 100, siyo kama entries 100 tofauti. Hii inafanya mambo kuwa ya bei rahisi, kwa sababu inawezekana kufanya batch transfers, hivyo unaweza kuhamisha vitu 50 tofauti kwa transaction fee moja.

## Ndani ya transaction

Standard iliyopo kwenye event log ni `nep245` na event yenyewe ni `mt_transfer`, na logic ya ndani ilifanyika kwa hatua nne. Kwanza, contract ina-check kama mtumaji (`v4v.near`) anamiliki hiyo `token_id`. Kisha, ina-check kama hiyo deposit ya 1 yoctoNEAR ipo, kama check ya kiusalama. Kwenye hatua ya tatu, balance ya `token_id` inatolewa kwa mtumaji na kuongezwa kwa mpokeaji. Mwishoni, `on_mt_transfer` callback inawaka kwenye contract ya mpokeaji ili kuthibitisha kuwa imekubali kupokea hizo assets.

## Inamaanisha nini

Kwa hiyo, hili lilikuwa tendo la bei rahisi na bora la kuhamisha digital asset kwenye soko la Paras. Uli-pay fee ndogo ya kama $0.00008 ili kuhamisha token inayotumia standard mpya ya NEP-245, na kwa sababu hiyo, soko liliweza kuona transfer hiyo papo hapo na kushughulikia hatua inayofuata, ambayo mara nyingi ni biashara au ku-list kitu.
