---
title: "Sio funguo zako, sio sarafu zako: Toleo la passkey"
description: "Kuingia na passkey hakumaanishi unamiliki funguo zako. Kwa nini PRF ya passkey ni tofauti na uthibitishaji wa kawaida, na kwa nini Nuri inaitumia kwa ajili ya self-custody ya kweli."
date: "2026-04-09T05:55:27.955Z"
updated: "2026-04-09"
lang: sw
translated_from: "en/not-your-keys-not-your-coins-the-passkey-edition"
source_sections: ["passkey-auth-is-not-your-key", "prf-is-not-auth", "what-if-nuricom-disappears", "auth-vs-prf", "what-about-smart-accounts", "the-veracrypt-lesson"]
category: nuri
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/not-your-keys-not-your-coins-the-passkey-edition/01-05a18f2a.png"
tldr: ["Microsoft ilifunga akaunti ya msanidi wa VeraCrypt bila taarifa wala nafasi ya kukata rufaa. Hilo linaweza kuwakuta pia wale wanaotumia wallet za custodial zenye passkey.", "Uthibitishaji wa passkey kwenye Privy, Dynamic au Turnkey unathibitisha tu utambulisho wako. Funguo au vipande vyake bado viko kwenye seva zao.", "WebAuthn PRF extension inatengeneza funguo moja kwa moja kutoka kwenye kifaa chako, hivyo hata kama nuri.com ikipotea, utapata funguo hiyohiyo ukiwa localhost."]
sections: [{"basically": "Passkey yako inafungua vault ya Privy. Bado ni vault yao, na chini ya 1% ya watu wanahamisha funguo zao kutoka huko."}, {"basically": "Credential hiyohiyo, salt hiyohiyo, bytes 32 zilezile. Hiyo ndiyo funguo yako ya Bitcoin; inatoka kwenye kifaa chako, hakuna seva inayohusika."}, {"basically": "Elekeza nuri.com kwenye localhost, washa PRF na salt hiyo, na utapata funguo hiyohiyo. Huhitaji ruhusa ya mtu yeyote."}, {"basically": "Zote zinatumia passkeys. Moja inakupa uwezo wa kufikia funguo za seva, nyingine inatengeneza funguo yako mwenyewe papo hapo."}, {"basically": "ZeroDev ni bora kuliko Privy, lakini bado unahitaji bundler. Kwa kutumia PRF, hutegemei miundombinu ya mtu yeyote."}, {"basically": "Kama seva inashikilia kipande cha funguo yako, unakodisha tu uwezo wa kufikia pesa zako mwenyewe."}]
---
Microsoft wamefuta cheti cha kusaini (signing certificate) cha msanidi wa VeraCrypt. Hakuna onyo, hakuna barua pepe, wala mtu wa kuongea naye. Siku moja anaingia kwenye akaunti yake, anaona imefungwa. Ujumbe unasema hawezi kukata rufaa.

Jamaa huyu amekuwa akisimamia VeraCrypt kwa zaidi ya muongo mmoja. Mamilioni ya watumiaji. Haijalishi. Mfumo wa kiotomatiki wa Microsoft umeamua basi, na ndiyo hivyo.

Yule msanidi wa WireGuard? Hivyo hivyo, hivi punde tu. Akaunti imesimamishwa, rufaa ya siku 60, hakuna maelezo.

Na hivi ndivyo kitakachotokea kwenye "self-custodial" passkey wallet yako. Sio kama, bali ni lini.

## Passkey auth sio ufunguo wako

Passkey auth sio ufunguo wako. Wacha tuweke mambo sawa, kwa sababu sekta nzima inakosea hapa.

Unapoingia na passkey kwenye Privy, Dynamic, Turnkey au sehemu nyingine yoyote, unajithibitisha (authenticate) tu. Hiyo ndiyo kazi yake. Passkey inathibitisha kuwa wewe ni wewe.

Haikupi ufunguo wako wa faragha (private key). Inakupatia uwezo wa kufikia miundombinu inayoshikilia ufunguo wako wa faragha, au vipande vyake.

Privy wanagawa ufunguo wako vipande vipande kwa kutumia Shamir's Secret Sharing na kuvisambaza kwenye seva zao. Passkey yako ndiyo ufunguo wa mlango wa vault ya Privy. Lakini bado ni vault yao.

Privy ikipotea? Vipande vimepotea. Privy ikinunuliwa na Stripe, kitu ambacho tayari kimetokea, na uongozi mpya ukaamua kuzima bidhaa hiyo? Vipande vimepotea. Seva ya auth ya Privy ikipata shida? Huwezi kusaini chochote.

Ndiyo, wana kitufe cha export. Kimefichwa kwenye Settings. Ni watu wangapi kati ya milioni 75 wenye akaunti za Privy wame-export kweli ufunguo wao wa faragha? Naweza kubeti chini ya 1%.

Na wale 99% wengine? Wanadhani wako self-custodial. Hawako. Wako umbali wa uamuzi mmoja tu wa kampuni hiyo ili kupoteza kila kitu.

## PRF sio auth

PRF sio auth. Hakuna anayeongelea sehemu hii, na kila mtu anahitaji kuielewa.

WebAuthn PRF extension ni kitu tofauti kabisa na passkey authentication. Haiko hapa kuthibitisha wewe ni nani. Iko hapa kupata material ya ufunguo moja kwa moja kutoka kwenye vifaa vyako (hardware).

Hivi ndivyo inavyofanya kazi na PRF. Authenticator yako, yaani Secure Enclave, TPM, YubiKey au chochote kile, inashikilia siri iliyofungwa na credential yako. Siri hiyo haitoki kwenye hardware.

Kamwe. Unapothibitisha na PRF ikiwa imewashwa, authenticator inachukua salt unayoipea na kuhesabu HMAC(credential_secret, salt). Inakurudishia output ile ile ya byte 32 kila wakati.

Credential ile ile na salt ile ile inamaanisha output ile ile. Daima, milele. Hisabati tu, hakuna seva.

Output hiyo ya byte 32 ndiyo material ya ufunguo wako. Iingize kwenye HKDF na utapata ufunguo wako wa faragha wa Bitcoin. Daima ni ule ule, kwenye kifaa chako, ukiwa offline kama unataka.

Hivi ndivyo Nuri inavyofanya. Passkey yako haifungui vault. Passkey yako ndiyo vault yenyewe. Material ya ufunguo yanatoka moja kwa moja kwenye hardware unayoshikilia mkononi mwako. Hakuna kipande kwenye seva yoyote, hakuna kampuni katikati, hakuna unachotegemea.

## Itakuwaje nuri.com ikipotea

"Lakini nuri.com ikipotea?" Swali zuri, na jibu ni kwamba haijalishi.

WebAuthn credentials zimefungwa kwenye Relying Party ID, ambayo kimsingi ni jina la domain. Passkey yako ya Nuri imefungwa kwenye nuri.com. Authenticator inakagua SHA-256 hash ya jina hilo inapochagua credential.

Lakini hapa ndipo haikagui. DNS, certificate authority, au kama domain iko live kwenye internet, haijali.

Kwa hivyo kama nuri.com ikipotea kesho, unafanya hivi. Hariri /etc/hosts na uelekeze nuri.com kwenye 127.0.0.1. Endesha seva ya ndani ya HTTPS na self-signed cert kwa ajili ya nuri.com.

Fungua [https://nuri.com](https://nuri.com) kwenye kivinjari chako. Anzisha passkey na uombe PRF kwa kutumia salt iliyorekodiwa. Utapata zile byte 32 unazozipata kila wakati, na utapata ufunguo wako wa faragha.

Hakuna internet, hakuna seva, hakuna ruhusa kutoka kwa mtu yeyote.

Au unaweza kuruka kivinjari na kutumia libfido2 kuongea na authenticator yako moja kwa moja kupitia CTAP2. Weka rpId = "nuri.com", ipe credential ID yako na salt.

Authenticator haijali ombi linatoka wapi. Inaendesha tu HMAC na inakupa output.

Hii inafanya kazi kwa sababu PRF inaendeshwa kwenye hardware. Domain inatumiwa tu kuchagua credential ipi ya kutumia, sio kwa ajili ya hisabati yenyewe.

Authenticator haijui na haijali kama nuri.com ni kampuni ya Fortune 500 au ukurasa wa localhost uliouanzisha kwa sekunde 30.

Na Privy hii haiwezekani. Seva zao zikipotea, vipande vimepotea. Hakuna njia ya kurejesha (recovery) kienyeji, hakuna njia ya offline ya kurudisha ufunguo wako, hakuna kitu.

## Auth vs PRF

Huu hapa ndio utofauti wa kweli kati ya auth na PRF.

Passkey auth, kama Privy, Turnkey na Dynamic, inafanya kazi hivi. Passkey inathibitisha wewe ni nani kwa seva, na seva inakupa uwezo wa kufikia material ya ufunguo inayoyatawala yenyewe.

Seva ikizima, huna access. Domain ikifa, huna access. Inabidi u-export ufunguo wako wakati huduma bado iko hai, la sivyo unaupoteza.

Passkey PRF, kama Nuri, inafanya kazi hivi. Passkey inachukua material ya ufunguo moja kwa moja kutoka kwenye hardware yako, na hakuna seva inayoshikilia hata sehemu ndogo ya ufunguo wako. Seva ikizima haijalishi, unaipata ndani (locally).

Domain ikifa, unaanzisha ukurasa wa localhost na unapata ufunguo ule ule. Hakuna cha ku-export, kwa sababu unaweza kupata ufunguo wako wakati wowote kutoka kwenye passkey yako.

Moja ni uthibitisho, nyingine ni kupata ufunguo kutoka kwenye hardware yako kwa kutumia cryptography. Zote zinatumia passkeys. Sio kitu kimoja hata kidogo.

## Vipi kuhusu smart accounts

Vipi kuhusu smart accounts? ZeroDev na watoa huduma wengine wa ERC-4337 ni bora kuliko Privy. Passkey yako inasaini moja kwa moja na hakuna kugawa ufunguo. Lakini bado unahitaji bundler yao ili kutuma miamala yako, na passkey yako bado imefungwa kwenye domain yao.

Unaweza kutatua sehemu ya domain kwa njia ile ile, ujanja wa localhost unafanya kazi. Lakini pia unahitaji bundler, na huwezi ku-host ZeroDev bundler mwenyewe. Kwa hivyo unategemea kupata mwingine. Unaweza kurejesha, lakini sio kwa uhuru kamili.

Na Nuri na PRF hutegemei miundombinu yoyote. Zero. Unapata ufunguo wako, una ufunguo wa kawaida wa faragha wa Bitcoin, na unaweza kuutumia na wallet software yoyote inayopatikana.

Electrum, Sparrow, Core, vyovyote vile. Kwa sababu kinachotoka kwenye PRF na HKDF ni ufunguo wa faragha tu. Haijali ni wallet ipi inauisoma.

## Somo la VeraCrypt

Hilo ndilo somo la VeraCrypt. Microsoft haikumwonya msanidi, haikutoa maelezo na haikumpa njia yoyote ya kupambana. Mfumo wa kiotomatiki uliamua, na muongo mmoja wa kuaminiana ukaisha kwa login moja tu.

Kila mtoa huduma mkuu wa auth, kila kampuni inayokaa katikati ya passkey yako na ufunguo wako wa faragha, iko umbali wa uamuzi mmoja wa kiotomatiki ili kukufanyia wewe hivyo hivyo.

Kitu pekee kinachokulinda ni jinsi mfumo unavyojengwa. Sio ahadi, sio vifungo vya export, sio "hatuwezi kufanya hivyo kamwe". Jinsi unavyojengwa.

Kama ufunguo wako upo kwa sababu seva imeuhesabu, imeuweka au inashikilia kipande chake, hauko self-custodial. Unakodisha uwezo wa kufikia pesa zako mwenyewe, na mwenye nyumba anaweza kubadilisha kufuli wakati wowote anaotaka.

PRF haiombi ruhusa. PRF haipigi simu nyumbani (phone home). PRF ni hisabati inayofanya kazi kwenye hardware unayoshikilia mkononi.

Not your keys, not your coins. Bado ni kweli, na ni kweli zaidi kuliko wakati wowote.

Nuri ni self-custodial Bitcoin na stablecoin wallet. Inatumia passkeys na WebAuthn PRF extension ili kupata ufunguo ule ule kila wakati. Hakuna seva inayoshikilia funguo zako na hakuna kampuni inayoweza kukufungia nje. nuri.com

![](../../../media/not-your-keys-not-your-coins-the-passkey-edition/01-05a18f2a.png)
