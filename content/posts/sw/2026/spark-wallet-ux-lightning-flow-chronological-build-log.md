---
title: "UX ya Spark wallet na flow ya Lightning: Build log"
description: "Nilitaka Spark wallet ifanane kabisa na skrini ya Bitcoin iliyopo, kwa kutumia code chache, bila kurudia kazi au kutumia mbinu za kizamani. Pia niliweka..."
date: "2026-01-09T14:25:01Z"
updated: "2026-01-09"
lang: sw
translated_from: "en/spark-wallet-ux-lightning-flow-chronological-build-log"
source_sections: ["making-spark-look-like-bitcoin", "the-receive-screen", "killing-the-loading-delays", "send-lnurl-and-lightning-addresses", "sending-to-a-normal-bitcoin-address", "refinements", "how-i-worked-with-the-agent"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/spark-wallet-ux-lightning-flow-chronological-build-log/cover.webp"
tldr: ["Nilitaka Spark wallet ifanane kabisa na skrini ya Bitcoin iliyopo, kwa kutumia code chache na bila kurudia rudia kazi.", "Kupokea, kutuma, LNURL, anwani za Lightning na Spark kwenda L1 withdrawals sasa ziko poa, na nimeongeza caching ili kuondoa delays wakati wa loading.", "Hakuna command za git wala tests, kila mabadiliko yalihitaji idhini yangu kwanza."]
sections: [{"basically": "Style, mpangilio na button zile zile za skrini ya Bitcoin, pamoja na kudai automatic za transfers zinazosubiri."}, {"basically": "Anwani juu, QR mahali palepale, na sehemu ya sats yenye button ya Create Invoice."}, {"basically": "Cache anwani ya deposit na balance, load kutoka kwenye cache, kisha refresh kwa nyuma."}, {"basically": "Kila utumaji unapata skrini ya confirm, na LNURL pamoja na anwani za Lightning zinageuzwa kuwa invoices."}, {"basically": "Anwani ya onchain inaelekeza kwenye withdrawal ya Spark kwa kasi ya kati badala ya Lightning."}, {"basically": "Input mbovu inafutwa na kuwekwa alama, na prefill inafanya sehemu ya amount kuwa active."}, {"basically": "Skrini ya Bitcoin ndiyo ilikuwa target yangu hasa. Niliona kila utofauti na kusisitiza nakala ya 1:1."}]
---
![](../../../media/spark-wallet-ux-lightning-flow-chronological-build-log/cover.jpg)

# UX ya Spark wallet na mtiririko wa Lightning: Kumbukumbu ya ujenzi

Nilitaka Spark wallet ionekane sawasawa na ile skrini ya Bitcoin iliyopo. Nataka kodi iwe fupi, isiyo na marudio au vipengele vya kizamani. Pia, niliweka sheria kali za kazi kwa yule agent: hakuna git commands, hakuna tests, na lazima anipate mimi kwanza kabla ya kitu chochote kuingia kwenye codebase. Majibu yawe mafupi na ya uhakika. Mtiririko wa kupokea na kutuma ufanane na UI ya Bitcoin, ukubali Lightning invoices na LNURL, na baadaye uweze kusupport onchain withdrawals kutoka Spark.

Hivi ndivyo ilivyokwenda.

## Kufanya Spark ionekane kama Bitcoin

Lengo la kwanza lilikuwa rahisi: `screens/SparkBitcoinWalletScreen.tsx` inatakiwa ionekane kama `screens/BitcoinScreen.tsx`. Kwa hiyo, tukarekebisha styling, spacing, typography na mpangilio wa vitufe vya Spark vifanane na vile vya Bitcoin. Sasa vitufe vya kupokea na kutuma vinafanana kabisa.

Tulibadilisha pia kitu kimoja: sasa skrini ya Spark inajiangalia yenyewe kama kuna transfers zinazokuja na kuzichukua kwenda kwenye Spark wallet moja kwa moja. 

Kitufe cha Apple Pay kwenye header kilibaki, kikiwa na placeholder ili baadaye tuweze kuweka Spark deposit address hapo.

## Skrini ya kupokea (receive)

Nilitaka skrini ya kupokea ya Spark ifanane na ile ya Bitcoin. Tulibadilisha `screens/SparkBitcoinReceiveModal.tsx`. Address sasa iko juu, na QR code iko sehemu ile ile kama kwenye Bitcoin receive. Chaguzi za "Share" na "Copy" zinafanya kazi kama kwenye UI ya Bitcoin.

Kwa ajili ya kutengeneza invoice, sasa kuna sehemu ya kuingiza sats iliyoundwa kama ile ya kwenye Bitcoin send. Chini yake kuna mstari wa euro ili mambo yawe sawa. Kitufe sasa kinaandika "Create Invoice".

Kabla ya kutengeneza invoice, unaona deposit address na hakuna QR ya invoice. Baada ya kuitengeneza, unaona invoice na QR yake kwa mtindo ule ule.

## Kuondoa delays za loading

Skrini ilikuwa na delays ndefu za loading. Sasa tunacache Spark deposit address na balance. Skrini ya Spark inaload kutoka kwenye cache kwanza, halafu inarefresh kwa nyuma.

## Kutuma, LNURL na Lightning addresses

Mtiririko wa kutuma sasa unafanana na wa Bitcoin, ukiwa na hatua ya mwisho ya kuhakiki. Scan au paste sasa inahamia kwenye `screens/SparkLightningSendModal.tsx`. Mtumaji lazima aone skrini ya kuhakiki (confirm) kabla ya malipo kutoka. Kama invoice haina kiasi, tunauliza kiasi badala ya kutuma moja kwa moja.

Tukaongeza support ya LNURL pay na Lightning address inputs. Kuna service mpya, `services/SparkLnurlService.ts`, inayoisafisha input kwa kuondoa prefix ya `lightning:`. Inatatua ombi la LNURL pay kwa `resolveLnurlPayRequest`, na inaomba invoice kutoka kwenye LNURL callback kwa `requestLnurlInvoice`.

Kwenye `screens/SparkLightningSendModal.tsx`, modal ya kutuma sasa inakubali LNURL bech32, LNURL URLs na Lightning addresses. Kiasi kinashikwa kwenye minimum ya LNURL, na ile minimum inajazwa yenyewe. Network errors hazionyeshwi kwa user; tunazihifadhi kwenye logs tu. Kama input siyo sahihi, tunaifuta na kuonyesha input ya ombi. Hatuonyeshi data mbovu.

## Kutuma kwenye Bitcoin address ya kawaida

Nilitaka pia kutuma kwenye Bitcoin address ya kawaida, yaani Spark → L1. Tulirekebisha `services/SparkBitcoinWalletService.ts`. `withdrawToBitcoinAddress` inatumia `Spark getWithdrawalFeeQuote` + `withdraw`. Speed ya kawaida ya kutoka ni `ExitSpeed.MEDIUM`. Logs zinafupisha address kwa usalama.

Logic ya skrini kwenye `screens/SparkBitcoinWalletScreen.tsx` ilibadilika pia. `handleConfirmSend` inatambua onchain address na kuielekeza kwenye `withdrawToBitcoinAddress` badala ya `payLightningInvoice`. Baada ya kutoa, inarefresh Spark balance na deposits zinazosubiri.

## Marekebisho

Nikaomba marekebisho machache: kama paste au scan siyo invoice, address au LNURL sahihi, input inafutwa na kuangaziwa (highlight). Baada ya prefill sahihi, sehemu ya kuingiza kiasi inapata focus yenyewe. Cursor inabaki mwishoni mwa kiasi na namba zinatokea mara moja. Block ya kiasi imekaa katikati wima kati ya header na CTA. Header inaonyesha memo kama ipo, vinginevyo inaandika "Send Lightning" au "Send Bitcoin" kwa onchain.

## Jinsi nilivyofanya kazi na yule agent

Nilitoa mifano ya picha wazi. Skrini ya Bitcoin ndiyo ilikuwa target yenyewe. Kitu chochote kisipofanana, kama icon, padding au layout, nilikiona haraka na kuomba copy ya 1:1. Niliweka kodi ndogo kwanza na logic ya "no fallback". Niliidhinisha kila hatua ya mabadiliko na kurekebisha kesi za pembeni. Invoices za kiasi sifuri zinatakiwa ziulize kiasi. LNURL ni ya kulipa tu kwa sasa. Network errors zisifike kwa user. Niliendelea kusisitiza mtiririko ule ule wa UX kila mahali, hasa kwenye kuhakiki, validation na kuingiza kiasi.

Kuna vitu hatukufanya: hakuna git commands, hakuna tests (niliomba hivyo hasa), na hakuna mabadiliko kwenye ile skrini ya asili ya Bitcoin.

UI ya Spark wallet sasa inafanana na mpangilio wa skrini ya Bitcoin. Receive modal inafanana na mtiririko wa Bitcoin receive, ikiwa na Spark deposit address na utengenezaji wa invoice. Send modal inakubali Lightning invoices, LNURL, Lightning addresses na onchain BTC addresses. Input mbovu haijai, na mtiririko wa kiasi umekazwa na kukaa katikati. Spark balance na deposit address ziko kwenye cache, kwa hiyo UI inafanya kazi kwa haraka zaidi.
