---
title: "Wallet za wakala na passkey PRF: Usalama wa nuri.com"
description: "Jinsi tunavyotumia extension ya passkey PRF pale nuri.com kutengeneza funguo moja kwa moja kwenye kifaa, kuongeza multisig inayoweza kujiondoa, na kuruhusu mawakala kuandaa miamala bila kuimiliki."
date: "2026-02-10T08:00:01Z"
updated: "2026-02-10"
lang: sw
translated_from: "en/agentic-wallets-passkey-prf-the-nuri-com-security-architecture"
source_sections: ["the-hardware-is-the-seed", "a-multisig-that-decays", "agents-prepare-you-sign", "not-only-evm", "why-it-matters"]
category: nuri
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/agentic-wallets-passkey-prf-the-nuri-com-security-architecture/cover.webp"
tldr: ["Pale nuri.com tunatengeneza funguo za Wallet kwa kutumia extension ya passkey PRF, hivyo hakuna seed phrase wala siri yoyote inayohifadhiwa.", "Multisig yetu inayoweza kujiondoa inahitaji idhini ya 2-of-2 wakati wa matumizi ya kawaida, na inageuka kuwa 1-of-1 baada ya muda fulani endapo huduma yetu haitapatikana.", "Mawakala wanaandaa miamala, lakini passkey ya biometris ya mtumiaji pekee ndiyo inayoweza kuisaini na kuidhinisha."]
sections: [{"basically": "Authenticator inatoa PRF output inayofanana kila wakati, hivyo funguo zinatengenezwa papo hapo na kufutwa mara baada ya matumizi."}, {"basically": "Tunatumia 2-of-2 pamoja na huduma wakati wa kawaida, na inakuwa 1-of-1 baada ya muda kupita ili kuhakikisha hakuna anayeweza kukufungia."}, {"basically": "Wakala ndiye anayeandaa shughuli, lakini alama ya kidole ya mtumiaji ndiyo inayowasha injini ya kuidhinisha."}, {"basically": "Master seed moja inayotokana na mchakato huu inafanya kazi kwenye Bitcoin (SegWit na Taproot) na pia kwenye chain za EVM."}, {"basically": "Hakuna seed phrase ya kupoteza, hakuna password ya kuibiwa, na hakuna mtoa huduma anayeweza kuzuia pesa zako."}]
---
# Agentic wallets na passkey PRF: Usalama nyuma ya nuri.com

Linapokuja suala la usalama wa wallet, mara nyingi inabidi uchague moja kati ya mbili. Ama ujimiliki mwenyewe kwa kutumia seed phrase, au uweke mambo rahisi kwa kukabidhi pesa zako kwa mtu mwingine azishikilie. Sisi hapa nuri.com tumeunda njia ya tatu kwa kutumia extension ya WebAuthn PRF (Pseudo-Random Function). Hii ni wallet inayolindwa na hardware, ni deterministic, ina mfumo wa multisig, na tumeitengeneza mahususi kwa ajili ya wakati huu ambapo AI agents wanafanya kazi nyingi.

## Hardware ndiyo seed yenyewe

Wazo kuu hapa ni kwamba hatuhifadhi siri yoyote. Hakuna master password, wala faili la JSON lililohifadhiwa popote. Tunatumia extension ya passkey PRF kupata entropy moja kwa moja kutoka kwenye authenticator yako, kama vile TouchID, FaceID, au YubiKey.

Kila mara mtumiaji anapojithibitisha, extension ya PRF inatoa matokeo yaleyale kwa kutumia input na salt ileile. Kwa hiyo, hakuna kitu cha kuhifadhi, $Seed = \text{HMAC-SHA256}(\text{AuthenticatorSecret}, \text{Salt})$. Kwa sababu tunaweza kupata $Seed$ huu tena muda wowote, private keys zinatengenezwa papo hapo na kufutwa (zeroized) mara tu baada ya signature kukamilika.

## Multisig inayojirekebisha

Ili uwe na usalama lakini bado uweze kufikia pesa zako muda wowote, tunatumia script ya decaying multisig. Kwenye matumizi ya kawaida, inahitaji signatures 2-of-2, yaani ufunguo mmoja kutoka kwenye PRF na ufunguo mwingine unaoshikiliwa na service yetu. Ikitokea service (Relying Party) haipo tena au domain imepotea, time-lock (CheckSequenceVerify) inaruhusu wallet hiyo kubadilika na kuwa ya 1-of-1. Kwa hiyo, service provider hawezi kukufungia pesa zako, na wakati wa kawaida bado unapata usalama wa kuwa na co-signer.

## Agents wanaandaa, wewe unasaini

AI agents wanapoanza kushughulikia mambo kwenye chain, changamoto kubwa ni kutofautisha kati ya nani anayeruhusiwa kufanya kitu na nani anayekifanya kweli.

Mambo yanakaa hivi: Agent anafuatilia chain na kuandaa transaction tata, kwa mfano "Rekebisha nafasi zangu za DeFi kama gas ni ya bei nafuu." Agent anafanya kazi yote ngumu na kumpa mtumiaji payload ambayo iko tayari kusainiwa. Hata hivyo, private key inahitaji biometric trigger kupitia passkey PRF, kwa hivyo agent hawezi kutumia pesa peke yake. Hilo linakupa kinga ambayo imeunganishwa moja kwa moja na hardware. Agent ndiye rubani, lakini alama ya kidole ya mtumiaji ndiyo ufunguo wa kuwasha injini.

## Sio EVM pekee

Wallet nyingi za passkey zinajali EVM tu (kupitia ERC-4337). Mfumo wetu hapa nuri.com unafanya kazi kwenye chain yoyote, kwa sababu tunatoa master seed inayojitegemea. Kwenye Bitcoin, hiyo inamaanisha transactions za native SegWit na Taproot kupitia BIP32 derivation. Kwenye EVM, inamaanisha support kamili kwa chain za Ethereum na Account Abstraction.

## Kwa nini hii ni muhimu

Hii inatuelekeza kwenye siku za usoni bila siri. Hakuna seed phrase ya kupoteza, hakuna master password ambayo mtu anaweza kukuibia (phishing), na hakuna service provider anayeweza kufungia pesa zako milele. Tunataka kuweka wazi (open source) mfumo huu wa orchestration, ili uwe msingi wa wallet za agentic zilizo salama na zinazomfanya binadamu aendelee kuwa na maamuzi ya mwisho.

![image](../../../media/agentic-wallets-passkey-prf-the-nuri-com-security-architecture/image.png)
