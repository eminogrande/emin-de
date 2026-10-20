---
title: "Kusanifu upya mfumo wa utekelezaji wa Blockchain: Jinsi FATE VM inavyotatua kasoro za msingi za EVM"
description: "Jinsi Erik Stenman alivyojenga FATE, VM inayotumia data zenye aina maalum, na kufanya mikataba kuwa midogo mara kumi na haraka mara tatu kuliko EVM."
date: "2026-03-19T03:55:43.287Z"
updated: "2026-03-19"
lang: sw
translated_from: "en/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19"
source_sections: ["why-the-evm-needs-fixing", "typed-variables-instead-of-flat-memory", "functions-instead-of-arbitrary-jumps", "high-level-data-types-and-maps-in-the-vm", "the-results"]
category: building
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
image: "/media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png"
tldr: ["Dkt. Erik Stenman alitengeneza FATE, VM inayotumia data zenye aina maalum kwa ajili ya Aeternity, ili kurekebisha makosa ya usanifu wa EVM.", "FATE imeondoa matumizi ya kumbukumbu tambarare na miruko holela ya kodi, ikianzisha vigezo vyenye aina, vitendaji, namba kubwa na ramani ndani ya VM.", "Katika majaribio ya Stenman, bytecode ni ndogo mara 9.6 hivi na utekelezaji ni wa haraka mara tatu kuliko EVM."]
sections: [{"basically": "Mashine ya stack isiyo na aina, inayotumia kumbukumbu tambarare na maneno ya 256-bit pekee, inasababisha mikataba kuwa mizito, ya polepole na isiyo salama."}, {"basically": "Hakuna viashiria vya kumbukumbu ghafi. Vigezo vya FATE vina lebo za aina zake, na majina ya kipekee yanahifadhiwa kwenye state."}, {"basically": "Wito wa kazi unalenga vitendaji vilivyobainishwa, na kodi hugawanywa katika vitalu vya msingi, hivyo miruko isiyo halali haiwezi kutokea."}, {"basically": "Namba kubwa, tuples, orodha, aina za chain na ramani vinashughulikiwa moja kwa moja na VM, hivyo compiler haihitaji kuongeza vitu vingi vya ziada."}, {"basically": "Bytecode ndogo mara 9.6, utekelezaji wa haraka mara tatu na gharama nafuu kwa mtumiaji wa mwisho."}]
---
Kama umesoma makala haya na unaona ungependa kufanya kazi nami, Emin Mahrt, kwenye mambo mazuri kama haya, usisite kuwasiliana nami kupitia emin@nuri.com. Makala haya yanatokana na kazi yetu ya awali ya kuunda upya EVM ya Ethereum. Mimi nilikuwa mtazamaji tu, lakini ilikuwa ni moja ya mambo ya kuvutia zaidi kuyafuatilia katika miaka ya hivi karibuni, kwa hiyo nikaona ni vyema nishirikishe wengine hapa.

<https://www.youtube.com/watch?v=a77DGGzMyN8>

## Kwa nini EVM inahitaji marekebisho

Unapoichunguza Ethereum Virtual Machine (EVM) kwa upande wa usanifu wa lugha na usalama wa *runtime* ya kiwango cha chini, utaona vikwazo vingi katika usanifu wake. EVM ni mashine isiyo na aina (untyped), inayotegemea *stack* na mfumo wa kumbukumbu tambarare (flat memory), na inategemea sana utendaji wa *byte* za kiwango cha chini, mrukio ya kiholela (*arbitrary jumps*), na maneno ya 256-bit yasiyochujwa. Hiyo ilifanya kazi kuanzisha mfumo wa awali wa *smart contracts*, lakini maamuzi haya ya usanifu yalisababisha *bytecode* kubwa, utendaji wa polepole, na mashimo mengi ya usalama.

Katika uchambuzi wa kina wa kiufundi, Dk. Erik Stenman anaelezea usanifu wa *Fast Aeternity Transaction Engine* (FATE), mashine ya mtandaoni ya kiwango cha juu na yenye mifumo thabiti (*strongly-typed*) iliyoundwa kurekebisha makosa ya zamani ya EVM. Kwa kufikiria upya jinsi VM ya blockchain inavyoshughulikia hali, kumbukumbu, na utekelezaji wa msimbo, Stenman na timu yake walipata mazingira ya utekelezaji ambapo msimbo ulioandaliwa (*compiled code*) ni mdogo mara 10 na unafanya kazi mara 3 haraka kuliko ule wa EVM.

Hivi ndivyo Stenman alivyofanya ili kuboresha dhana ya Ethereum EVM.

## Vigezo vya aina (typed variables) badala ya kumbukumbu tambarare

Moja ya mambo hatari zaidi kuhusu EVM ni kwamba inategemea viashiria (*pointers*) vya kumbukumbu ghafi. Katika EVM, *smart contracts* husoma na kuandika *byte* ghafi kwenye safu ya kumbukumbu ya mstari mmoja, na hiyo inaweza kusababisha makosa ya "out-of-bounds", "pointer aliasing", au kusoma *byte* kama muundo tofauti wa data badala ya ule ulio sahihi.

Stenman aliondoa kumbukumbu tambarare kabisa kwenye VM. Badala ya anwani za kumbukumbu, FATE inatumia vigezo; nafasi tofauti za hifadhi zinazoishi ndani ya upeo (*scope*) wa kazi fulani. Nafasi ya hifadhi katika FATE haizuiliki kwa ukubwa wa data inayoshikilia, na data hiyo inabeba lebo yake ya aina. Ikiwa nafasi inashikilia *boolean*, VM inahakikisha itasomwa tu kama *boolean* (`true` au `false`), kwa hiyo utata wa kutathmini "0 au 1" kama *integer* umetoweka.

FATE pia inarahisisha kazi na mti wa hali (*state tree*). Inatumia darasa maalum la vigezo vyenye "majina hasi" (kwa mfano `-1`, `-2`). Kuandika kwenye kigezo hasi hupanga uandikaji kwenye mti wa hali ya kudumu wa mkataba. Kwa hivyo watengenezaji hawana haja ya kusimamia viashiria tata vya hifadhi kwa mikono, kama vile `SLOAD` na `SSTORE` *key derivations* katika EVM.

## Kazi (functions) badala ya mrukio ya kiholela

Mtiririko wa udhibiti (*control flow*) katika EVM unategemea sana *Program Counters* (PC) na mrukio ya kiholela. *Smart contract* kwenye EVM inaanza kutekelezwa katika anwani `0x00` na inafanya kazi kama kizuizi kimoja kikubwa cha msimbo, ambapo majedwali ya mrukio huongoza utekelezaji kwenye kazi maalum kulingana na kiteuzi cha kazi cha *byte* 4.

FATE inachukulia kazi na saini za aina (*type signatures*) kama vitu vya asili, vya daraja la kwanza kwenye ngazi ya VM. Utekelezaji hauanzi tena kwenye sehemu yoyote ya kuanzia ya `0x00`. Mpigaji huita kazi kamili na kupitisha hoja (*arguments*) zilizopangwa, na VM hukagua hoja hizi dhidi ya saini kali ya kazi kabla ya utekelezaji kuanza.

Ndani ya kazi, FATE inawakilisha msimbo kama mlolongo wa vizuizi vya msingi. Hakuna "kumbukumbu ya msimbo" ghafi unayoweza kuichezea au kurukia ndani yake. Kizuizi cha msingi ni orodha tu ya maagizo kwa mpangilio, na mara tu unapoihitaji matawi, utekelezaji huhamia kwenye kizuizi kipya cha msingi kilicho na alama wazi. Kwa hivyo mende (*bugs*) za "invalid jump destination" ambazo ni za kawaida kwa *bytecode* ya EVM haziwezekani kwa muundo huu.

## Aina za data za kiwango cha juu na ramani katika VM

EVM inajua hasa aina moja ya data, neno la 256-bit. Ili kufanya kazi na *string*, orodha, safu, au namba kubwa kiholela, *compiler* inabidi iingize maelfu ya mistari ya *assembly* ili kujaza *byte*, kudhibiti viashiria na kuhesabu urefu.

FATE inaweka aina ngumu za data moja kwa moja kwenye *runtime* ya VM, na hiyo inapunguza sana ujazo wa *bytecode* na mzigo wa utekelezaji. Badala ya kikomo cha 256-bit kilichowekwa ngumu, ambacho kina hatari ya kufurika (*overflows*) au kukulazimisha kujumuisha maktaba za gharama kubwa za *SafeMath*, FATE inasaidia *integers* za ukubwa usio na kikomo. Inashughulikia *Tuples*, *Lists* na *Variant Types* (kwa mfano *Optional types*) kiasili. Na vitu vya blockchain kama Anwani, Mikataba, *Oracles* na *State Channels* ni aina za asili, zilizoboreshwa sana katika FATE. Unapofanya kazi nazo, VM huendesha *opcodes* za asili zinazounganishwa moja kwa moja kwenye *mechanics* za muamala wa nodi, na inaruka mzigo mkubwa wa wito wa nje wa EVM.

Katika EVM, kuhifadhi ramani (*key-value stores*) inamaanisha unahash ufunguo na nafasi ya sehemu ya hifadhi ili kupata anwani ya hifadhi ya 256-bit ya nasibu. Hiyo inafanya kuwa vigumu kurudia ramani, na kusoma na kuandika ni ghali kiasi. Stenman alibuni ramani kama kitu tofauti, kinachoshughulikiwa nje ya hifadhi ya kawaida ya vigezo. FATE inaruhusu ramani za kumbukumbu za ndani, lakini ramani za hali zinahifadhiwa kwa ufanisi ndani ya mti wa hali ya Aeternity. Msanidi programu anafanya kazi na ramani kwa kawaida, na injini ya FATE huahirisha na kuchakata usomaji na uandikaji halisi kwenye mti wa hali na kusoma tu vipengele ulivyoomba.

## Matokeo

Kwa kuondoa kumbukumbu tambarare, kuongeza aina za asili za kiwango cha juu, na mtiririko mkali wa udhibiti wa vizuizi vya msingi, Stenman aliondoa *boilerplate* kubwa ya *compiler* inayotesa *smart contracts* za EVM. Matokeo katika *benchmark* ya Stenman ni makubwa. *Bytecode* ya mkataba wa FATE ni ndogo mara 9.6 (takriban 10% ya ukubwa) kuliko mkataba huo huo uliokusanywa kwa usanifu wa EVM. Na kwa sababu VM inatumia *zero cycles* kwa kuchanganua *byte* za kujaza, kuhesabu *offsets* za kumbukumbu au kuendesha uelekezaji wa mrukio wa monolithiki, FATE inafanya kazi mara tatu haraka na gharama za gesi kwa mtumiaji wa mwisho zinashuka sana.

![](../../../media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png)
