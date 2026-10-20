---
title: "Nini maana halisi ya kuwa tayari kwa ajili ya AI agents"
description: "Kuna scanner nne za umma zinazopima kama AI agents wanaweza kuisoma tovuti yako. Hapa naelezea kila moja inatafuta nini, ni vitu gani huwezi kuvikwepa ukiwa na static host, na faili au header gani…"
date: "2026-09-11"
updated: "2026-09-11"
lang: sw
translated_from: "en/what-agent-ready-actually-means"
source_sections: ["why-anyone-started-scoring-this", "the-four-scanners-and-what-each-one-actually-measures", "why-a-static-host-caps-your-score-permanently", "which-files-actually-carry-weight", "the-part-where-you-are-tempted-to-lie", "what-to-do-first-in-order", "the-score-is-a-moving-target"]
category: agents-ai
format: explainer
author: emin
provenance: written
ai_assisted: true
reviewed_by_human: false
tags: ["agent-readiness", "llms.txt", "MCP", "SEO", "AI crawlers"]
source_links: [{"title": "RFC 8288: Web Linking", "url": "https://www.rfc-editor.org/rfc/rfc8288.html", "note": "The Link header format the discovery checks expect."}, {"title": "RFC 9457: Problem Details for HTTP APIs", "url": "https://www.rfc-editor.org/rfc/rfc9457.html", "note": "The application/problem+json error shape required on API paths."}, {"title": "RFC 9745: The Deprecation HTTP Header Field", "url": "https://www.rfc-editor.org/rfc/rfc9745.html"}, {"title": "RFC 8594: The Sunset HTTP Header Field", "url": "https://www.rfc-editor.org/rfc/rfc8594.html"}, {"title": "isitagentready.com", "url": "https://isitagentready.com", "note": "Publishes its own per-check specs under /.well-known/agent-skills/."}, {"title": "Model Context Protocol specification", "url": "https://modelcontextprotocol.io", "note": "Streamable HTTP transport and the initialize handshake."}, {"title": "llms.txt proposal", "url": "https://llmstxt.org", "note": "The file format, including why entries must be Markdown links."}]
tldr: ["Kuwa 'agent-ready' siyo suala la plugin.", "Ni mfumo wa tabia za HTTP: Link headers za RFC 8288, negotiation ya Markdown kwa kutumia Accept, nyaraka za kugundua tovuti, na metadata inayosomeka na mashine bila kuzungushia mbuyu.", "Kuna scanner nne za umma zinapima haya mambo, na kila moja ina vipaumbele vyake.", "Static host anayebana matumizi hawezi kufaulu vipimo vya header, hata uongeze faili ngapi."]
sections: [{"basically": "Search crawler anataka kupanga page yako kwenye list. Agent anataka kuruka hatua hiyo na kupiga API yako moja kwa moja."}, {"basically": "Scanner nne, maswali manne tofauti. Hakuna kitu kama score moja ya 'agent-ready' inayokubalika kila mahali."}, {"basically": "Link headers na negotiation ya Markdown ni tabia za HTTP response. Hakuna static host wa kawaida anayeweza kuweka hizi."}, {"basically": "Paragraph ya kwanza ya llms.txt yako ndiyo sentensi ambayo wasaidizi wataikopi. Usipoteze nafasi hiyo."}, {"basically": "Metadata ni kama mkataba. Agent akifuata ahadi ya uongo kwenye metadata, hataamini tena tovuti yako."}, {"basically": "Jenga msingi wa server yako kwanza. Kila faili unayoongeza kabla ya hapo ina kikomo kulingana na uwezo wa host wako."}, {"basically": "Scanner zinaendelea kubadilika. Screenshot ya score 100 uliyopata mwezi uliopita haithibitishi chochote leo."}]
---
## Kwa nini watu wameanza kupiga bao hizi

Kwa miaka ishirini, roboti pekee iliyokuwa na maana kwenye tovuti ilikuwa *search crawler*. Ilitaka HTML, *sitemap* na faili la `robots.txt`, na tasnia nzima ikajengwa kuzunguka kulisha roboti hiyo.

Dhana hiyo imevunjika kimya kimya. Wateja wanaokuja kwenye tovuti sasa wanajumuisha miundo (*models*) inayosoma, kufupisha na kunukuu, na mawakala (*agents*) wanaojaribu kukamilisha kazi badala ya kujenga faharasa. Wanakuja na matamanio tofauti. *Search crawler* inataka kupanga ukurasa wako. Muundo unataka kuchota fungu moja linaloweza kunukuliwa. Wakala anataka kupata sehemu inayoweza kusomwa na mashine na kuruka ukurasa wako kabisa.

Hao watatu wanataka vitu tofauti kutoka kwenye URL moja, ndiyo maana ukurasa unaweza kuwa umeboreshwa kikamilifu kwa ajili ya Google na bado usiwe na faida kwa wakala. Skana (*scanners*) zimeibuka kupima pengo hilo.

## Skana nne, na kile kila moja inapima hasa

Zana nne za umma zinapima utayari wa mawakala, na hazipimi kitu kimoja. Kuzichukulia kama alama moja ndiyo kosa la kwanza.

[isitagentready.com](https://isitagentready.com) ndiyo kali zaidi kwenye mambo ya msingi ya ugunduzi. Inakagua `robots.txt`, `sitemap`, vichwa vya habari vya *RFC 8288 Link*, rekodi za huduma za DNS-AID zenye uthibitisho wa DNSSEC, mazungumzo ya yaliyomo ya Markdown, kanuni za AI bot, vichwa vya habari vya *Content-Signal*, *Web Bot Auth*, na kisha orodha ndefu ya hati zinazojulikana: API catalog, OAuth discovery, `auth.md`, MCP server card, A2A agent card, agent skills, WebMCP. Ukaguzi wa biashara (*commerce*) uko kwenye kategoria yake na unabaki bila upande wowote kwa tovuti ya maudhui.

*PageSpeed Insights* inapima kategoria nne za kawaida pamoja na, kwenye Chrome ya hivi karibuni, kategoria ya *Agentic Browsing* ambayo ukaguzi wake unajumuisha uhalali wa `llms.txt` na mti wa kufikiwa na mawakala (*agent accessibility tree*). Mtego hapo haueleweki: `llms.txt` iliyokosekana inapata "Not Applicable", lakini iliyopo na mbovu inafeli. URL tupu kwenye faili hilo zinafeli na ujumbe "File does not appear to contain any links". Maingizo lazima yawe viungo halisi vya Markdown.

*Is Agentic*, ambayo inasoma tena skana ya Ora, ndiyo inayoadhibu kutokuwa mkweli. Inaweka uzito kwenye mambo muhimu kwa pointi 80 na inataka *schemas* zilizotajwa (*typed*) kwenye kila operesheni ya OpenAPI, JSON endpoint halisi isiyo na uthibitisho, makubaliano ya kweli ya MCP (*handshake*), na miili ya makosa inayolingana na njia (*path*): `application/problem+json` kwenye njia za API, Markdown kwenye njia za kurasa. Kosa moja muhimu linagharimu kama pointi 6.7.

*Circle Seller Readiness* ni muhimu tu kama unauza kitu kwa mawakala. Inataka OpenAPI inayopangishwa kwenye *origin-hosted*, metadata ya kweli ya malipo, na changamoto hai ya 402 ambayo haijalipwa.

| Skana | Swali kuu | Ukaguzi mgumu zaidi | Bora kwa |
| --- | --- | --- | --- |
| isitagentready.com | Je, wakala anaweza kugundua uso wako wa mashine? | DNS-AID yenye uthibitisho wa DNSSEC | Ufungaji wa ugunduzi |
| PageSpeed Agentic Browsing | Je, ukurasa ni wa haraka na unaoweza kusomwa na mashine? | `llms.txt` halali yenye viungo vya Markdown | Kasi na usahihi wa `llms.txt` |
| Is Agentic / Ora | Je, API yako ni ya kweli na ina aina? | *Typed schemas* kwenye kila operesheni | Ubora wa API |
| Circle Seller Readiness | Je, wakala anaweza kukulipa? | Changamoto hai ya 402 isiyolipwa | Malipo pekee |

*Kile kila skana inajaribu. Snapshot, Septemba 2026.*

## Kwa nini mwenyeji tuli (*static host*) anazuia alama yako, kabisa

Hii ndiyo sehemu inayopoteza muda mwingi. Ukaguzi mbili hazihusu faili hata kidogo, na kuongeza hati za JSON kwenye mwenyeji tuli hakutazisogeza.

Ukaguzi wa kichwa cha *Link* unataka vichwa vya *RFC 8288 Link* kwenye jibu la HTML, vikielekeza kwenye `llms.txt`, `sitemap`, hati ya OpenAPI na kadi zinazojulikana. Hiyo ni kichwa cha jibu (*response header*). GitHub Pages hairuhusu kuweka vichwa vya jibu.

Mazungumzo ya Markdown yanataka ombi la njia ya kawaida ya ukurasa na `Accept: text/markdown` lirudi na `Content-Type: text/markdown` na kichwa cha `Vary: Accept`. Hiyo ni mazungumzo ya maudhui, yanayoamuliwa kwa kila ombi. Seva ya faili tuli ina uwakilishi mmoja tu kwa kila njia.

Kwa hiyo suluhisho la hayo mawili si faili, ni mchakato: seva ndogo ya asili, *Worker*, au *reverse proxy* mbele ya matokeo tuli. Kila kitu kingine kwenye orodha ni faili tu, na faili ndiyo sehemu rahisi.

Kichwa cha `Vary: Accept` ndiyo undani ambao watu wanaruka, na kuruka huko ni kubaya zaidi kuliko kutozungumza kabisa. Bila *Vary*, kache iliyotoa HTML kwanza itatoa HTML hiyo kwa mteja anayefuata anayeomba Markdown.

## Faili zipi zina uzito kweli

`llms.txt` inafanya kazi nyingi zaidi kwa kila baiti, na nyingi zimeandikwa vibaya. Aya ya kwanza ndiyo ambayo msaidizi atanukuu wakati mtu anauliza kitu chako ni nini. Ikiwa inaanza na jina la kampuni yako na maneno "ni tovuti", umetumia sentensi yako bora kwa kitu kisicho na maana. Eleza bidhaa: ni nini, inafanya nini, ni ya nani. Kisha orodhesha kurasa zako muhimu kama viungo vya Markdown vyenye madhumuni ya mstari mmoja kila moja.

Vioo vya Markdown vya kila ukurasa (*per-page mirrors*) ni *lever* ya pili. Muundo unaochota fungu kutoka kwenye ukurasa wako unapambana na urambazaji wako, bango lako la kuki, na *footer* yako. Kutoa maudhui yaleyale kama Markdown safi kwenye URL inayotabirika kunaondoa pambano hilo kabisa.

Data iliyopangwa (*structured data*) ndiyo safu ya taasisi. Shirika lenye `knowsAbout`, `WebSite`, na Mtu mwenye viungo vya `sameAs` vinavyoelekeza kwenye profaili ambazo tayari zinapata nafasi. Hivi ndivyo *crawler* inavyojifunza wewe ni nani kwa ziara moja badala ya kukisia kwenye kurasa kumi.

Hati zinazojulikana ni za bei rahisi na za kimitambo: API catalog kama `application/linkset+json`, kadi ya seva ya MCP, kadi ya wakala wa A2A, faharasa ya ujuzi wa wakala, manifest ya WebMCP, na manifest ya ARD kwenye `/.well-known/ai-catalog.json`. Kila moja ni faili ndogo ya JSON yenye umbo maalum. Soma *spec*, linganisha umbo, itoe ikiwa na CORS wazi.

Mtego mmoja unaostahili kutajwa: ukaguzi wa rasilimali iliyolindwa na OAuth una wigo wa njia (*path-scoped*). Skana inachunguza `/.well-known/oauth-protected-resource/` pamoja na njia kamili ya ukurasa. Hati inayotolewa kwenye mzizi tu inapitisha ukurasa wa nyumbani na kufeli kila ukurasa wa ndani.

## Sehemu ambayo unajaribiwa kusema uongo

Kila moja ya skana hizi inaweza kudanganywa, na kuzidanganya ndiyo hatua mbaya zaidi inayopatikana.

Unaweza kutangaza seva ya MCP isiyojibu `initialize`. Unaweza kuorodhesha zana ambazo hukuwahi kutekeleza. Unaweza kuchapisha hati ya OpenAPI inayoelezea *endpoints* zinazorudisha 404. Unaweza kudai mipaka ya kiwango (*rate limits*) ambazo hutekelezi kwa kutoa vichwa vya `RateLimit` kwenye *endpoint* isiyo na kikomo. Unaweza kutangaza itifaki ya malipo ambayo haujaunganisha. Kila moja ya hizo inageuza ukaguzi mbaya wa kweli kuwa wa kijani.

Kisha wakala halisi anafika, anafuata hati zako, na anafeli. Hajarudii kwa adabu. Metadata uliyochapisha ni ahadi, na sababu nzima wakala anaisoma ni kwamba hawezi kuona nia zako, ni matangazo yako tu.

Kuna muundo mmoja unaojitokeza mara kwa mara na unaostahili kusemwa wazi: ikiwa uwezo unaweza kugundulika tu na haujatekelezwa, sema hivyo kwenye hati. Tangaza kiendelezi, alama kama haihitajiki, iweke lebo kama `discovery-only`. Skana inayoadhibu metadata ya kweli ni skana ambayo unapaswa kupoteza pointi kwake.

Jaribu jingine ni kudunga *prompt* kwenye maudhui: mistari inayomwambia muundo akununue. Athari inayopimwa ni takriban sifuri, na hasara ni hatari ya kushushwa daraja pamoja na kuonekana mjinga kwenye picha ya skrini. Andika sentensi inayoweza kunukuliwa badala yake.

## Nini cha kufanya kwanza, kwa mpangilio

Mpangilio ni muhimu kwa sababu mbili kati ya hizi hufungua kila kitu kingine.

1. Weka mchakato mbele ya matokeo yako tuli. Bila hivyo, vichwa vya *Link* na mazungumzo ya Markdown haviwezi kufikiwa kabisa na utapoteza siku kwenye faili zisizoweza kufidia.
2. Andika `llms.txt` vizuri: ufafanuzi wa kweli wa bidhaa kwenye aya ya kwanza, kila ukurasa muhimu kama kiungo cha Markdown chenye madhumuni.
3. Tengeneza kioo cha Markdown kwa kila ukurasa kutoka chanzo kilekile cha HTML, ili viwili hivyo visiweze kutengana.
4. Ongeza safu ya taasisi: Shirika lenye `knowsAbout`, `WebSite`, Mtu mwenye `sameAs`.
5. Toa hati zinazojulikana, zikilingana na kila *spec* haswa. Angalia OAuth yenye wigo wa njia kwenye kurasa za ndani, sio ukurasa wa nyumbani tu.
6. Rekebisha makosa kwa kiambishi cha njia: `problem+json` kwenye njia za API, mwili mfupi wa Markdown kwenye njia za ukurasa, na hali halisi ya 404 kwenye zote mbili.
7. Hapo ndipo ufuate pointi zilizobaki za skana, na uchanganue tena baada ya *deploy* ya mwisho badala ya kuamini *run* ya kijani ya zamani.

## Alama ni kitu kinachobadilika kila mara

Kitu kinachowashangaza watu wengi ni jinsi hizi *scanner* zinavyoongeza ukaguzi kila siku. Tovuti inaweza kupata alama 100 leo, lakini wiki chache baadaye alama hiyo inashuka bila wewe kufanya mabadiliko yoyote au kuharibu kitu, kwa sababu tu vigezo vimebadilika.

Hii inafanya *screenshot* ya alama bora uliyohifadhi kuwa haina maana kama ushahidi. Kitu pekee cha maana ni kufanya *scan* upya kwenye *commit* uliyoiweka sasa hivi, halafu uhifadhi ripoti yenyewe pembeni ya ule msimbo wa *commit SHA*.

Pia inamaanisha kuwa kazi ya kudumu ni ile ya usanifu, siyo *checklist*. Tovuti inayotengeneza HTML, Markdown, schema, sitemap na llms.txt kutoka chanzo kimoja cha maudhui, inaweza kukabiliana na ukaguzi mpya kwa kuongeza *generator* moja tu. Lakini tovuti ambayo sehemu hizo tano zimefanyiwa kazi kwa mikono, inabidi ubadilishe faili tano kila wakati na utaishia na hitilafu za kutofautiana kila mara.
