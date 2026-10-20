---
title: "Wakala asiye na mikono: Kwa nini Nuri inakwenda kutawala uchumi wa mashine"
description: "Wakala wa AI anaweza kuandika kodi na kupanga ratiba, lakini hawezi kulipia huduma. Tunaamini Nuri na MCP yake wanaweza kuwapa mawakala uwezo wa kulipa katika ulimwengu wa kweli."
date: "2026-09-16T00:58:30.196Z"
updated: "2026-09-16"
lang: sw
translated_from: "en/the-agent-has-no-hands-why-nuri-wallet-can-win-the-machine-economy"
source_sections: ["sixty-years-of-plastic", "the-agent-has-no-hands", "where-money-really-flows", "building-the-bridge", "rules-instead-of-trust", "distribution-beats-protocols"]
category: nuri
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-agent-has-no-hands-why-nuri-wallet-can-win-the-machine-economy/01-cc1d4ff4.png"
tldr: ["Max Levchin anasema mfumo wa malipo ya kadi huenda ukabadilika kabisa kwa sababu ya AI.", "Mawakala wanaweza kufanya kazi nyingi lakini hawawezi kulipa: hawana mikono, hawawezi kupokea OTP, hawawezi kujibu CAPTCHA, na wallet nyingi za mawakala ni za crypto tu ambazo hazikubaliki kwingine.", "PaymentRequired inawapa mawakala kiolesura cha MCP kwa mifumo ya kawaida: Visa katika nchi 76, IBAN, ACH, na malipo madogo ya HTTP 402.", "Watumiaji wanabaki na udhibiti wa funguo zao kupitia passkeys na kuwawekea mawakala sheria kama vile mipaka ya matumizi, kuzuia matumizi holela, na kadi maalum kwa wafanyabiashara fulani."]
sections: [{"basically": "Kadi za plastiki, chip za EMV, Apple Pay: kila mfumo wa malipo uliundwa ukiamini kuwa kuna binadamu nyuma ya mashine."}, {"basically": "Mawakala wanakwama kwenye OTP, CAPTCHA, na mifumo ya kuzuia ulaghai, huku wallet za crypto pekee zikishindwa hata kununua chakula."}, {"basically": "Biashara nyingi ulimwenguni zinaendeshwa kwa Visa, Mastercard, SEPA na ACH, na mawakala wanahitaji njia rahisi ya kutumia mifumo hiyo."}, {"basically": "Seva ya MCP inawapa mawakala njia halisi za malipo kama kadi, IBAN, malipo madogo ya 402, na funguo wanazomiliki wenyewe."}, {"basically": "Unampa wakala sheria, sio tu pesa: unaweza kuzuia matumizi kupitia chat, kuweka mipaka ya bajeti, na kutumia kadi za virtual za mara moja."}, {"basically": "Mshindi hatakuwa yule mwenye smart contract ya hali ya juu, bali yule atakayemruhusu wakala anunue kahawa kila siku."}]
---
Kwenye mazungumzo ya hivi karibuni, mwanzilishi mwenza wa PayPal na Mkurugenzi Mtendaji wa Affirm, Max Levchin, amesema jambo ambalo kila mwanzilishi wa fintech anapaswa kulitafakari kwa kina.

"Kiolesura cha malipo kwa kadi ndicho kilichoundwa kwa ufanisi zaidi kuwahi kutokea… Huenda ikabidi tukibadilishe kwa sababu AI imeshaingia kazini."

## Miaka sitini ya plastiki

Kwa miongo sita, mfumo wa kifedha wa walaji ulijengwa juu ya kipande cha plastiki. Baadaye kukaja chip ya EMV, kisha Apple Pay.

Apple Pay ilitumia *Secure Enclave* kwenye simu ili kufanya malipo yawe ya haraka kwa milisekunde chache, ikikwepa ule muda mgumu wa sekunde 2.5 wa kusubiri idhini kutoka kwenye mitandao ya kadi.

Kila hatua ilikuwa na jambo moja la kufanana: lazima kuwe na binadamu anayesimama kwenye mashine (terminal) au anayegusa kioo cha simu.

## Wakala hana mikono

Siku hizi, mawakala wa programu (AI agents) wanaandika *code*, wanafanya kazi zenye hatua nyingi, na kuweka nafasi za huduma kwenye mtandao. Lakini mara tu wakala anapojaribu kulipa bili, hapo ndipo anapokwama.

Wakala hana mikono.

Huwezi kuingiza mkono mfukoni. Hawezi kupitisha SMS OTP, hawezi kutatua *CAPTCHA* ya Cloudflare Turnstile, na ananaswa na mifumo ya kuzuia utapeli inayotambua vivinjari ambavyo havionekani kama vya binadamu.

Jibu la kwanza kutoka kwenye sekta hii lilikuwa la muda mfupi sana. Ukiangalia kile ambacho watengenezaji wanajenga leo, karibu kila *wallet* ya wakala ni majaribio tu kwenye *sandbox*. *Crypto faucet*, *testnet contract*, au *endpoint* ndogo ya x402 inayohamisha USDC kati ya seva.

Hiyo haitoshi. Mawakala hawaishi kwenye mapovu ya madaraka (*decentralized bubbles*). Wapo hapo kumsaidia binadamu, na binadamu wanaishi katika ulimwengu wa kweli.

Wakala anayeweza kutuma kiasi kidogo tu cha fedha kwenye seva nyingine hawezi kuagiza chakula cha usiku kupitia Wolt, hawezi kukuwekea Bolt ya saa 12 asubuhi ya kwenda uwanja wa ndege, hawezi kununua eSIM unapoihitaji haraka, au kupiga bei kwenye eBay.

Hili ndilo wazo nyuma ya [Nuri.com](http://nuri.com), na ndiyo sababu tunaamini seva yetu ya *Model Context Protocol* (MCP) inaweza kuwa safu ya pesa (*money layer*) kwa mawakala.

## Pesa inapozunguka kweli

Wakala anayezungumza *crypto* pekee ni kama gari la umeme la michezo linaloweza kukimbia kwenye nyimbo za binafsi tu. Inavutia, lakini halikufikishi popote.

Angalia jinsi pesa za kila siku zinavyozunguka:

Kwanza, reli za zamani. 99.9% ya biashara za kimwili duniani zinapita kwenye Visa, Mastercard, SEPA, na ACH. Uletaji wa chakula, usafiri, watoa huduma za *cloud*, maduka, yote hayo yapo huko.

Pili, usumbufu. Kama wakala anahitaji idhini yako, *seed phrase* kwenye kipande cha karatasi, au kama unacopy na kupaste *private keys* kila anapofanya kitu, basi kazi ya wakala haina maana tena.

Kama Levchin alivyosema, "Urahisi unashinda kadiri kiasi unachotaka kutuma kinapopungua."

Tatu, utambulisho. Wazo la *cypherpunk* mara nyingi linadhani wewe ni *anonymous* kabisa. Lakini biashara ya kweli inahitaji suluhu ambazo watu wanaweza kuziamini, njia kwa wafanyabiashara kupata pesa zao, na kufuata sheria za kila nchi.

## Kujenga daraja

Miradi mingi ya malipo ya mawakala imejenga visiwa vilivyojitenga. PaymentRequired imejenga daraja.

PaymentRequired haiombi ulimwengu utupe terminal zao na kujenga kila kitu kwa ajili ya Web3. Inampa wakala kiolesura cha asili cha *Model Context Protocol* (MCP). Reli zote za pesa duniani ziko nyuma yake, kama zana rahisi zinazofanya kazi bila mkwamo.

Msanidi programu anapoongeza MCP kwenye Claude Desktop, Cursor, Hermes au *loop* yao ya wakala, wakala anapata ufikiaji wa tabaka tatu mara moja.

```
                  ┌─────────────────────────────────────────┐
                  │          Autonomous AI Agent            │
                  │   (Claude, Cursor, OpenClaw, Hermes)    │
                  └────────────────────┬────────────────────┘
                                       │  JSON-RPC via MCP
                  ┌────────────────────▼────────────────────┐
                  │       PaymentRequired.com Engine        │
                  └──────┬──────────────────┬───────────────┘
                         │                  │
         ┌───────────────▼──────┐    ┌──────▼───────────────┐
         │     Legacy Rails     │    │  Micropayment Rails  │
         ├──────────────────────┤    ├──────────────────────┤
         │ • Visa (76 countries)│    │ • Bitcoin Lightning  │
         │ • EUR IBAN / SEPA    │    │ • HTTP 402 / x402    │
         │ • USD ACH            │    │ • USDC / USDT / ETH  │
         │ • M-Pesa Remittance  │    │ • Passkey PRF Auth   │
         └──────────────────────┘    └──────────────────────┘
```

Tabaka la kwanza ni malipo ya kweli. Wakala haigizi malipo tu; anapitia sehemu ya kawaida ya kulipia na analipa.

Unasema agiza kawaida yangu kutoka Wolt, malipo ya Wolt yanakwenda, kadi inatozwa, na chakula kipo hapo baada ya dakika 25. Unasema Bolt kwenda uwanja wa ndege wa BER saa 12 asubuhi, gari linapangiwa, dereva anapatikana, na risiti inahifadhiwa.

Unasema eSIM kwa ajili ya Uturuki wiki ijayo, na unapata QR code bila usumbufu wa KYC. Unasema tuma Shilingi 2,000 kwa mama, na uhamisho wa M-Pesa unafika ndani ya sekunde.

Tabaka la pili ni aina mbili za reli. Kwa malipo makubwa na ya kawaida, kuna kadi halisi ya Visa inayofanya kazi katika nchi 76, ikiwa na EUR IBAN yake na namba ya *routing* ya USD ACH.

Kwa malipo madogo ya mashine kwa mashine, kuna msaada wa asili wa HTTP 402 `Payment Required` header, kwa hivyo API *calls* zilizo chini ya senti moja na *compute* iliyopimwa zinatatuliwa kupitia Bitcoin Lightning na *stablecoins* kwenye Layer 2.

Tabaka la tatu ni kwamba unashikilia funguo zako, na haifanyi mambo kuwa magumu. Hii haikugharimu utunzaji (*custody*).

Funguo zinatoka kwenye WebAuthn Passkey PRF kwenye *hardware* ya kifaa chako, kwa hivyo zinabaki na wewe. Wakala anaweza kutumia pesa ndani ya sheria ulizoweka, lakini hawezi kumiliki funguo hizo.

## Sheria badala ya kuaminiana

Kitu kikubwa kinachozuia watu kuruhusu mawakala kulipa kipo kwenye akili zao: ni hofu ya kupoteza pesa bila kikomo.

Hakuna anayetaka kuunganisha kadi yake kuu ya benki na LLM inayoweza kukwama kwenye *loop* na kumaliza pesa kwenye akaunti kwa ajili ya *cloud compute* au manunuzi ambayo imejitungia yenyewe.

PaymentRequired inatatua hili kwa udhibiti wa kadi kupitia *code*. Humpi tu wakala pesa; unampa wakala sheria.

Unaweza kusimamisha kila kitu kwa meseji moja ya chat. Unasema "freeze kadi yangu," na kadi inafungwa mara moja huko kwa mtoaji.

Unaweza kuweka vikomo kwa kila muamala, kwa kila *domain*, au kwa kila siku, ili wakala mwenye kikomo cha €30 cha chakula asiweze kutumia €300 kimakosa.

Na kadi za *virtual* zinaweza kutengenezwa wakati tu zinapohitajika, zikiwa zimejazwa senti kamili zinazohitajika kwenye malipo, na kufungwa kwenye *domain* hiyo moja ya mfanyabiashara.

Hii pia inakwepa tatizo la sekunde 2.5 la kuidhinisha ambalo Levchin alilozungumzia. Vikomo vimeshawekwa na salio liko tayari kabla *payment gateway* ya mfanyabiashara haijafanya kazi, kwa hivyo wakala analipa ndani ya mtiririko wa kawaida wa kadi na hachochei mifumo ya kuzuia utapeli ya mtoaji.

## Usambazaji unashinda itifaki

Historia ya fintech inafundisha kitu kimoja mara kwa mara: Usambazaji na matumizi ya kila siku hushinda itifaki za kijinga.

Alex Rampell aliwahi kusema kuwa biashara za malipo zenye faida kubwa na zile zinazodumu, sio zile zinazohamisha fedha nyingi za mamilioni ya dola mara moja.

Ni zile zilizo ndani ya malipo madogo ambayo watu hufanya kila siku. Zinapita "mtihani wa kahawa."

![](../../../media/the-agent-has-no-hands-why-nuri-wallet-can-win-the-machine-economy/01-cc1d4ff4.png)

| Kigezo | Wallet za kawaida za Web3 MCP | PaymentRequired.com |
|---|---|---|
| Reli | Crypto ya chain moja (Base / Solana) | Visa (nchi 76) + IBAN + ACH + Lightning + M-Pesa |
| Ufikiaji wa Wafanyabiashara | API zinazoweza kutumia x402 tu (<10,000) | Popote Visa au SEPA inapokubalika (wafanyabiashara 100M+) |
| Utumiaji wa Kila Siku | Token swaps, RPC node calls | Uletaji wa chakula (Wolt), usafiri (Bolt), hardware, cloud |
| Mfumo wa Usalama | Seed phrases au API keys za moto | Passkey PRF hardware derivation + instant freeze |
| Uzoefu wa Mtumiaji | Popups za mwongozo za wallet | Chat ya asili (Signal, Telegram, WhatsApp, MCP client) |

Timu itakayoshinda malipo ya mawakala haitakuwa ile yenye *smart contract* ngumu zaidi. Itakuwa timu inayomruhusu wakala kununua kahawa, kuanzisha VPS *server*, kuweka teksi, na kulipa *invoice* ya API, vyote kupitia kiolesura kimoja.

Kulipa sio tena binadamu anayeangalia kipande cha plastiki. Ni wakala anayefanya kazi na reli za malipo ndani ya *code*.

Itifaki tayari iko hewani. Zana tayari ziko mtandaoni.

Mruhusu wakala wako alipe: [nuri.com](http://paymentrequired.com/mcp/)
