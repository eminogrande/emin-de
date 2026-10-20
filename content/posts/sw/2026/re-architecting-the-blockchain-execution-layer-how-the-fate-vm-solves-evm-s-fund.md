---
title: "Jinsi FATE VM inavyotatua changamoto za msingi za EVM"
description: "Erik Stenman alibuni FATE, VM inayotumia aina za data zilizoboreshwa, ikiwa na usalama zaidi kwa kuachana na kumbukumbu ya kawaida au kuruka ovyo kwenye code. Mikataba inakuwa midogo mara 10 na…"
date: "2026-03-19T03:50:15Z"
updated: "2026-03-19"
lang: sw
translated_from: "en/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund"
source_sections: ["no-more-flat-memory", "functions-and-basic-blocks-instead-of-jumps", "real-data-types-in-the-vm", "maps-outside-normal-storage", "the-benchmark"]
category: building
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Dkt. Erik Stenman alibuni FATE, VM ya Aeternity inayotumia aina za data zilizobana, ili kurekebisha kasoro za kizamani za EVM.", "Inaachana na mfumo wa flat memory na kuruka hovyo kwenye code, na badala yake inaweka aina halisi za data na ramani moja kwa moja kwenye VM.", "Code iliyokusanywa ni ndogo mara 10 na inafanya kazi mara 3 haraka kuliko kwenye EVM."]
sections: [{"basically": "FATE inabadilisha mfumo wa pointer za memory na kutumia variable zenye aina zake mahususi, hivyo boolean inasomeka kama boolean tu."}, {"basically": "Watumiaji wanaita function zenye aina zake na code inafanya kazi ndani ya block, hivyo haiwezi kuruka ovyo."}, {"basically": "Namba zisizo na kikomo, orodha, tuple na aina za blockchain za asili zinaondoa uzito usio wa lazima kwenye compiler."}, {"basically": "Ramani za hali zipo kwenye state tree, na FATE inasoma vitu unavyohitaji pekee."}, {"basically": "Bytecode ya FATE ni ndogo mara 9.6 kuliko ya EVM na inafanya kazi mara tatu haraka."}]
---
Ukiiangalia Ethereum Virtual Machine (EVM) kama mbunifu wa lugha za programu, na ukizingatia sana usalama wa runtime, utaona mapungufu mengi kwenye muundo wake.

EVM ni *stack machine* isiyo na aina za data (untyped) yenye kumbukumbu ya aina moja (*flat memory*). Inafanya kazi kwa kusogeza *byte* za chini kabisa, ikirukaruka popote kwenye kodi, na kutumia *raw 256-bit words*. Hiyo ilitosha kuanzisha *smart contracts* za mwanzo, lakini pia ilituletea *bytecode* nzito, *execution* ya polepole, na mabug mengi ya usalama.

Katika uchambuzi wa kina wa kiufundi, Dk. Erik Stenman anaeleza jinsi Fast Aeternity Transaction Engine (FATE) ilivyojengwa. Hii ni *virtual machine* ya kisasa, yenye aina za data zilizobainishwa vizuri (*strongly typed*), na ilitengenezwa makusudi ili kurekebisha makosa ya zamani ya EVM.

Stenman na timu yake walifikiria upya jinsi blockchain VM inavyoshughulikia *state*, kumbukumbu, na uendeshaji wa kodi. Matokeo yake ni VM ambayo kodi iliyoandaliwa (*compiled code*) ni ndogo mara 10 na inafanya kazi haraka mara 3 kuliko matoleo ya awali ya EVM.

Hivi ndivyo Stenman alivyofanya ili kuboresha "dhana ya Ethereum EVM".

## Hakuna tena kumbukumbu ya aina moja (flat memory)

Jambo la kwanza ni kumbukumbu. Sehemu hatari zaidi ya EVM ni kwamba inafanya kazi na *pointer* za kumbukumbu za kawaida. *Smart contracts* zinasoma na kuandika *byte* kwenye sehemu moja ndefu ya kumbukumbu, na hapo ndipo unapopata makosa ya "out-of-bounds", *pointer aliasing*, au *byte* kusomwa kama muundo wa data usio sahihi.

Stenman aliondoa kabisa mfumo wa *flat memory* kwenye VM yake. FATE haina anwani za kumbukumbu. Badala yake, ina *variables* na nafasi za kuhifadhi (*storage slots*) ambazo zipo ndani ya eneo la kazi la *function* fulani. *Slot* haina kikomo cha ukubwa wa data, na data hiyo inabeba aina yake yenyewe (*type tag*).

Kama *slot* inashikilia *boolean*, VM inahakikisha inasomwa kama *boolean* tu (*true* au *false*), hivyo hakuna tena kubahatisha na namba kama "0 au 1".

Kwa ajili ya *state*, FATE inatumia aina maalum ya *variable* yenye majina hasi (*negative names*), kama -1 au -2. Unapoandika kwenye *variable* hasi, VM inapanga utaratibu wa kuandika kwenye *state tree* ya kudumu ya *contract* hiyo.

Hivyo, waendelezaji hawahitaji tena kushughulikia *storage pointer* ngumu kwa mkono, kama zile `SLOAD` na `SSTORE` kwenye EVM.

## Functions na basic blocks badala ya kuruka (jumps)

Jambo la pili ni jinsi programu inavyoendelea (*control flow*). EVM inategemea *program counters* (PC) na kuruka sehemu yoyote kwenye kodi. *Contract* kwenye EVM inaanza kufanya kazi kwenye anwani `0x00`, ni kizuizi kimoja kikubwa cha kodi, na inatumia *jump tables* ili kufika kwenye *function* sahihi kulingana na *function selector* ya *byte* 4.

FATE inafanya *functions* na *type signatures* kuwa vitu muhimu kabisa ndani ya VM. *Execution* haiwezi kuanza kwenye *entry point* ya `0x00` tena. Anayewaita (*caller*) anataja *function* yenyewe na kuingiza *arguments* zenye aina zake, na VM inacheki *arguments* hizo dhidi ya *strict type signature* ya *function* hiyo kabla ya kitu chochote kuanza kufanya kazi.

Ndani ya *function*, FATE inatunza kodi kama orodha ya *basic blocks* na si kitu kingine. Hakuna "code memory" ya kawaida unayoweza kuibadilisha au kurukia. *Basic block* ni orodha tu ya maelekezo (*instructions*) yanayotokea moja baada ya jingine.

Mara tu unapohitaji *branch*, *execution* inahamia kwenye *basic block* mpya ambayo imewekwa alama vizuri. Hivyo, mabug ya "invalid jump destination" unayoyajua kutoka kwenye EVM *bytecode* hayawezi kutokea hata kidogo.

## Aina halisi za data ndani ya VM

Jambo la tatu ni aina za data (*data types*). EVM inajua aina moja tu ya data, ile ya 256-bit *word*. Ukitaka *strings, lists, arrays* au namba kubwa sana, *compiler* inabidi iingize maelfu ya mistari ya *assembly* ili kujaza *byte*, kushughulikia *pointer*, na kuhesabu urefu.

FATE inaweka *data types* ngumu moja kwa moja ndani ya VM *runtime*, na hilo linapunguza sana uzito wa *bytecode* na gharama za *execution*. FATE ina *integers* zisizo na ukomo wa ukubwa, hivyo hakuna ukomo wa 256-bit unaoweza kusababisha *overflow* au kukulazimisha utumie *SafeMath library* ya gharama.

Inashughulikia *tuples, lists*, na *variant types* (kama *optional types*) kiasili. Na vitu vya blockchain kama anwani, *contracts, oracles*, na *state channels* ni aina za kiasili (*native*) na zilizoboreshwa sana ndani ya FATE.

Unapozitumia, VM inaendesha *opcodes* za kiasili zinazounganishwa moja kwa moja na *mechanics* za *transaction* ya *node*, hivyo unaepuka gharama zote za ziada za *external calls* zilizopo kwenye EVM.

## Maps nje ya storage ya kawaida

Jambo la nne ni *maps*. Kwenye EVM, *mapping* (*key-value store*) inafanya kazi kwa kuhash *key* pamoja na sehemu ya *storage slot*, na hiyo inatoa anwani ya *random* ya 256-bit.

Hivyo, huwezi ku-*iterate* kupitia *mapping*, na kusoma au kuandika ni ghali sana. Stenman alifanya *maps* kuwa kitu cha kipekee, kinachoshughulikiwa nje ya *variable storage* ya kawaida. FATE inakuruhusu kuwa na *local memory maps*, lakini *state maps* hukaa moja kwa moja na kwa ufanisi ndani ya Aeternity *state tree*.

Msanidi programu anatumia *map* kama *map* ya kawaida, na FATE *engine* inasubiri na kufanya *batch* ya usomaji na uandikaji halisi kwenye *state tree*, na inasoma tu *elements* zile ulizozitaka.

## Benchmark

Kwa hivyo, kwa kuondoa *flat memory*, kuongeza *native high-level types*, na kutumia *strict basic-block control flow*, Stenman aliondoa zile *boilerplate* nyingi za *compiler* ambazo EVM *smart contracts* zimejaa.

Namba kwenye *benchmark* yake ni kubwa. FATE *bytecode* ni ndogo mara 9.6 (kama 10% ya ukubwa) kuliko *contract* ileile iliyokusanywa kwa ajili ya EVM. Na kwa sababu VM inatumia *zero cycles* kwa *padding bytes, memory offsets*, au *jump routing* kubwa, FATE inafanya kazi mara tatu haraka na *gas* inakuwa nafuu sana kwa mtumiaji.

<p><img src="/media/re-architecting-the-blockchain-execution-layer-how-the-fate-/cover.webp" alt="cover"></p>
