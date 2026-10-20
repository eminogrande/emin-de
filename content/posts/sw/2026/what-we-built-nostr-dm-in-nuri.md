---
title: "Tulichokijenga: Nostr DM ndani ya Nuri"
description: "Tumeongeza mfumo wa chat ya 1:1 uliolindwa vizuri ndani ya Nuri. Unatumia Nostr relays na unakutambua kupitia Wallet key uliyonayo tayari."
date: "2026-01-15T19:40:01Z"
updated: "2026-01-15"
lang: sw
translated_from: "en/what-we-built-nostr-dm-in-nuri"
source_sections: ["keys-from-the-wallet", "encryption", "sending-and-receiving", "catching-up-on-missed-messages", "relays", "the-chat-screen-and-support", "what-end-to-end-means-here", "limits-and-next-steps"]
category: nuri
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/what-we-built-nostr-dm-in-nuri/cover.webp"
tldr: ["Tumejenga chat ya 1:1 iliyofichwa ndani ya Nuri inayotumia Nostr relays za umma.", "Nostr key inatokana na Bitcoin key ya wallet yako, hivyo wallet hiyo hiyo inatoa npub ile ile kila wakati.", "Ujumbe unatumia NIP-17 gift wrap na encryption ya NIP-44 v2, hivyo relays wanaona tu data iliyofichwa.", "Uhakiki wa mtumaji na utumaji wa ujumbe kwa nyuma (background delivery) bado haujakamilika."]
sections: [{"basically": "Bitcoin key ile ile, npub ile ile. Nostr key inapatikana kwa kutumia HKDF na inahifadhiwa kwenye Keychain."}, {"basically": "NIP-17 gift wrap na encryption ya NIP-44 v2: relays wanaona tu data ambayo mpokeaji pekee ndiye anayeweza kuifungua."}, {"basically": "Gift wraps zinatumwa kupitia kila relay iliyo wazi, na matukio ya kind 1059 yanayoingia yanachujwa na kufunguliwa."}, {"basically": "Timestamp ya last_seen kwa kila mtu unayewasiliana naye inasaidia chat kuvuta ujumbe uliopitwa na wakati ukiwa haupo."}, {"basically": "Tunatumia relays tatu za umma kwa default, hivyo hatuhitaji infra yoyote. Connections zinakaa tu chat ikiwa imefunguka."}, {"basically": "Orodha ndogo ya chat na support contact iliyowekwa tayari. Ujumbe unakaa kwenye memory tu."}, {"basically": "Maudhui ni ya siri na yana forward secrecy, lakini mtumaji bado anaweza kughushiwa."}, {"basically": "Hakuna push wala relay yetu wenyewe kwa sasa. Kinachofuata: signed rumors kwa ajili ya uhakiki wa mtumaji na background delivery."}]
---
![](../../../media/what-we-built-nostr-dm-in-nuri/cover.jpg)

Tumejenga chat ya 1:1 ndani ya Nuri. Chat hii imesimbwa (encrypted), inapita kwenye relay za Nostr, na inaishi ndani ya app yenyewe. Identity ya Nostr inatokana na key material ya ile Wallet ambayo mtumiaji anayo tayari. Imeunganishwa kwenye `screens/BitcoinDebugModal.tsx` na chat yenyewe ipo ndani ya `components/NostrChatModal.tsx`. Contact ya support imewekwa hard-coded kuwa `npub1r7y83c4w57jc8skud7e4m6x9qt9g7s6zel6mnvj64lh00lc7tynsdx89vj`.

## Keys kutoka kwenye Wallet

Tunatengeneza deterministic Nostr keypair kutoka kwenye Bitcoin private key iliyopo kwenye kifaa chako. Kama hakuna Bitcoin key, tunatumia Ethereum key, na kama zote hazipo tunachukua random key. Nostr private key inakaa kwenye secure storage na inafutika ikifanyika factory reset.

Derivation yenyewe ni HKDF-SHA256 juu ya `sha256(btcKey)` ikiwa na constant salt na info, alafu kuna retry loop inayocheki kama key ni valid. Code hiyo ipo kwenye `lib/nostr/nostr.ts`. Key inahifadhiwa kwenye Keychain kwa kutumia biometrics, kupitia `lib/secureKeyStorage.ts` (NOSTR_KEY_ID).

Kwa hiyo, Bitcoin key ile ile inakupa kila wakati npub ile ile ya Nostr. Factory reset inafuta ile key ya kwenye simu, na wallet key mpya itakupa npub nyingine. Kwenye input row ya `components/NostrChatModal.tsx` unaona mwisho wa npub yako, na unaigusa ili kucopy npub nzima.

## Encryption

Tunatumia NIP-17 gift wrap na NIP-44 v2 encryption, ambayo ni XChaCha20-Poly1305. Relay zinaona tu encrypted blobs, na ni private key ya mpokeaji tu inayoweza kuzifungua.

Flow ipo kwenye `lib/nostr/nostr.ts`. Kwanza tunatengeneza rumor (kind 14) yenye ujumbe wenyewe na pubkey ya mtumaji. Alafu tunai-encrypt rumor hiyo kwenda kwa mpokeaji kwa kutumia random seal key (NIP-44) na kuisaini kama kind 13. Alafu tuna-encrypt ile seal kwenda kwa mpokeaji kwa kutumia random wrap key (NIP-44), tunaisaini kama kind 1059, yaani gift wrap, na kuitag `["p", recipientPubkey]`. Ile outer gift wrap (kind 1059) ndiyo inayokwenda kwenye relay, na mpokeaji pekee ndiye anayeweza ku-decrypt.

Sehemu ya NIP-44 pia ipo kwenye `lib/crypto.ts`. ECDH shared secret inatokana na secp256k1 keys. Tunatengeneza NIP-44 key kama `HKDF(SHA256(x-only-shared-secret), info="nip44-v2")`. Na payload ina-encrypted kwa XChaCha20-Poly1305 na random 24-byte nonce.

Kwa sasa, long-term secret ya mtumaji haitumiki kusaini ile rumor. Kwa hiyo content ipo confidential end-to-end, lakini utambulisho wa mtumaji haujathibitishwa kishifiri (cryptography). Mtu yeyote anaweza kuweka fake pubkey ndani ya rumor. Kama tunataka authenticated sender, tunapaswa kusaini rumor, au tuhamie kwenye NIP-44 DM flow ambayo ina authentication ndani yake. Hili ndilo pengo la kweli la integrity kwa sasa kwenye `lib/nostr/nostr.ts`.

## Kutuma na kupokea

Kutuma ujumbe kunafanyika kwenye `components/NostrChatModal.tsx`. Tunacheki pubkey ya mpokeaji na kuzuia usijitumie ujumbe wewe mwenyewe. Alafu tunajenga gift wrap kwa kutumia `createNip17GiftWrap` na kutuma `["EVENT", giftwrap]` kwenye kila relay WebSocket iliyo wazi. Tunalog mtumaji, mpokeaji, event id, urefu wa ujumbe na kile ambacho relay zime-acknowledge. UI inaongeza ujumbe uliotoka kwenye local state mara moja.

Kupokea ujumbe pia kunafanyika kwenye `components/NostrChatModal.tsx`. Tuna-subscribe kwenye kind 1059 yenye #p tag inayolingana na pubkey yetu. Tunafuta duplicates kwa kutumia event id na ku-decrypt kwa kutumia `openNip17GiftWrap`. Alafu tunachukua maudhui ya rumor na pubkey ya mtumaji na kuionyesha kama ujumbe ulioingia. Mtumaji anaongezwa kwenye local contacts.

## Kufuatilia ujumbe uliokosa

Pia tumeongeza light catch-up flow inayovuta ujumbe ulioukosa wakati hukuwa online. Tunatunza last_seen timestamp kwa kila pubkey kwenye Keychain, na `NOSTR_LAST_SEEN_CACHE_KEY` kwenye `lib/nostr/storage.ts`. Kwenye kila relay subscription tunaongeza `since = last_seen - 60s` kwenye filter, ili ujumbe wa hivi karibuni uweze kuingia. Hiyo ipo kwenye `components/NostrChatModal.tsx`, na `services/factoryReset.ts` inafuta cache wakati wa factory reset.

## Relay

Default tunatumia seti ndogo ya public relays, kwa hiyo hatuhitaji infra yoyote kwa sasa. Default ni `wss://relay.damus.io`, `wss://relay.primal.net` na `wss://nostr21.com`. WebSocket connections zinafunguka wakati chat modal inafunguka na kufungika ikifungika. Kama app imefungwa au haiko online, real-time delivery inasimama, na catch-up inafanya kazi ilimradi relay bado zina ule ujumbe.

## Chat screen na support

UI ni minimal na inafiti design ya app. Chat list inaonyesha Private Support, Group Support (imelazwa) na contacts zako, ikiwa na ujumbe wa mwisho na tarehe na muda hapo chini. Title ya chat iliyo wazi ni herufi 5 za mwisho za npub ya mpokeaji, ikiwa na copy icon. Link ya kurudi nyuma ni maandishi tu, "< back", na imepigiwa mstari ili ieleweke. Composer ni input ya mstari mmoja ikiwa na send icon ndani, na unaweza kutuma pia kwa kutumia Send key ya kwenye keyboard. Tumeondoa label ya You. Suffix yako pekee ndiyo inaonekana, na unaigusa ili kucopy. Yote haya yapo kwenye `components/NostrChatModal.tsx`.

Support imewekwa hard-coded na kila mtumiaji asiye support anaiona. Support npub imewekwa kwenye `screens/BitcoinDebugModal.tsx`. Kama npub yako ndiyo ile ya support, support chat inafichwa na kuchat na wewe mwenyewe inazuiwa.

Tunatunza kile tunachohitaji tu. Contacts cache ni `@cache:nostr_contacts` kwenye Keychain, na last-seen cache ni `@cache:nostr_last_seen`, pia kwenye Keychain. Ujumbe unakaa kwenye memory tu, kwa hiyo unapotea ukifunga modal au ukirestart app. Factory reset inafuta yote hayo pamoja na Nostr private key (angalia `services/factoryReset.ts`).

## End-to-end inamaanisha nini hapa

Content ipo confidential. Relay hazioni kamwe maandishi ya kawaida na ni mpokeaji tu mwenye private key anayeweza ku-decrypt. Pia kuna forward secrecy, kwa sababu kila ujumbe unatumia seal na wrap keys mpya. Kitu ambacho bado hatuna ni authentication. Utambulisho wa mtumaji unaweza kuigizwa kwa sababu rumor haijatiwa saini.

## Mipaka na hatua zinazofuata

Hakuna infra inayohitajika leo. Kama unataka iwe ya kuaminika zaidi, run relay yako mwenyewe na uiongeze kwenye list. Hakuna push notifications, kwa hiyo catch-up inafanyika unapofungua chat. Na delivery inategemea muda gani relay zinatunza ujumbe, kwa sababu baadhi ya relay zinafuta DMs.

Vitu vinavyofuata ni sender authentication kwa kutumia signed rumor, na delivery ya background. Vyote vinahitaji mabadiliko madogo tu, na tunaweza kuyapanga.
