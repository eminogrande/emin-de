---
title: "Niliihoji Mac yangu nimeiteketeza AI kiasi gani. Imeibua token-events bilioni 45"
description: "Nilichambua kila zana ya AI kwenye Mac yangu kutafuta rekodi za matumizi. Kuna token-events kama bilioni 45 zenye thamani ya takriban $9.3k kwa viwango vya API, na karibu yote imetoka kwa Codex."
date: "2026-05-18T14:25:16Z"
updated: "2026-05-18"
lang: sw
translated_from: "en/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events"
source_sections: ["what-counts-as-a-token-here", "the-final-rollup", "codex-was-the-monster", "why-my-first-count-was-too-low", "the-other-tools-one-by-one", "openrouter-falai-lovable-and-replit", "falai-is-a-different-kind-of-bill", "how-we-reproduced-the-numbers", "where-the-cost-numbers-come-from", "why-agent-usage-gets-so-large", "what-i-learned", "references"]
category: agents-ai
format: essay
author: emin
provenance: unknown
ai_assisted: true
reviewed_by_human: false
image: "/media/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events/cover.webp"
tldr: ["Nilifanya ukaguzi wa kila zana ya AI kwenye Mac yangu na kugundua token-events bilioni 45 hivi.", "Kwa viwango vya API, hiyo ni kama $9.3k ya matumizi, na karibu yote imechangiwa na Codex inayofanya kazi za uandishi wa code wa kijasusi (agentic coding).", "Cache reads zilikuwa nyingi karibu kama request tokens mpya, kwa sababu ma-agent wanasoma tena context kila mara.", "OpenRouter na fal.ai hazijahesabika, kwa sababu historia yao ya bili iko kwenye server na key zangu hazikuweza kuzifikia."]
sections: [{"basically": "Request tokens na token traffic ni vitu viwili tofauti. Watu wengi wanavichanganya."}, {"basically": "Token-events bilioni 44.96 na $9,339.89 zimethibitishwa hapa, huku OpenRouter na fal.ai zikiwa hazijaingizwa kwenye hesabu."}, {"basically": "Codex peke yake imekula token-events bilioni 44.6 na $8,926.98. Context ya agentic coding ndiyo iliyogharimu kila kitu."}, {"basically": "Counter za mwisho wa session zilionyesha 12.89B. Jumlisha matumizi ya kila request au tumia ripoti ya mwezi badala yake."}, {"basically": "Claude, Goose, OpenHands, opencode na nyingine zote zilikuwa na mchango, lakini zilikuwa ndogo sana ikilinganishwa na Codex."}, {"basically": "API key ya kawaida inaona matumizi yake tu. Historia ya akaunti nzima inahitaji management key."}, {"basically": "Hitilafu ya authorization haimaanishi $0. Matumizi ya fal.ai yatasalia kuwa siri hadi nitakapopata export ya dashboard."}, {"basically": "Tafuta ma-folder ya zana hizo, fanya grep ya maeneo ya matumizi, parse counter za kila request, usiwahi kucopy prompt."}, {"basically": "Gharama zilizorekodiwa, ripoti ya Codex na bei za hadharani. Huu ni makadirio ya viwango vya API, siyo ankara (invoice)."}, {"basically": "Kila hatua ya agent ni mwito mwingine wa model na context yote tena. Context ndiyo mafuta ya kweli."}, {"basically": "Agentic coding siyo ghali kwa sababu output ni ndefu. Ni ghali kwa sababu context ni kubwa mno."}, {"basically": "Kurasa za bei na API docs kutoka OpenAI, Anthropic, OpenRouter na fal.ai ndizo nilizotumia kufanya comparison."}]
---
Nilikuwa nataka jibu la kweli kwa swali rahisi.

> Ni kiasi gani cha AI nimetumia kweli kwenye hii mashine?

Sio app moja tu. Sio dashibodi ya mtoa huduma mmoja. Nilitaka ukweli wa ndani ya mashine yangu. Codex, Claude, opencode, Goose, OpenHands, Aider, Gemini CLI, Qwen, LM Studio, Zed, OpenRouter, [fal.ai](http://fal.ai) experiments, Replit na Lovable traces, na kitu chochote kingine kilichojificha kwenye logi, SQLite databases, JSONL session files, browser storage au CLI config.

Jibu la mwisho lilikuwa kubwa kuliko nilivyotegemea.

Onyo moja muhimu. Hii ni audit ya mashine ya ndani (local), sio audit kamili ya akaunti ya mtoa huduma. Baada ya kuchapisha draft ya kwanza, nikagundua OpenRouter na fal.ai labda zilihesabiwa chini ya uwezo wake, kwa sababu local keys nilizozikuta hazikuwa management keys na fal.ai haikuacha invoice yoyote ya malipo kwenye mashine. Nikaangalia tena kwa kutumia test keys za ziada tarehe 2026-05-18. Funguo hizo bado hazikufungua historia ya malipo ya akaunti nzima ya OpenRouter au fal.ai. Kwa hiyo, chukulia kichwa cha habari hapo chini kama "kile Mac hii inaweza kuthibitisha ndani ya mashine pamoja na ripoti ya Codex", sio kama matumizi ya mwisho ya maisha ya akaunti zote.

Mac hii ina ushahidi wa ndani kwa kiasi hiki hapa.

| Metric | Total |
|---|---:|
| Request tokens zilizoripotiwa, ukiondoa cache na hidden reasoning | Bilioni 23.12 |
| Request tokens zikiwemo hidden reasoning | Bilioni 23.22 |
| Cache-read token traffic | Bilioni 21.70 |
| Total token traffic, ikiwemo cache na reasoning | Bilioni 44.96 |
| Makadirio ya gharama ya API | $9,339.89 |
| Makadirio ya juu ya matukio ya ndani (raw local-event) | kama $9.7k |
| Sehemu inayojulikana kukosekana | pengo linalotambulika, matumizi ya akaunti nzima ya OpenRouter na fal.ai |

Kwa hiyo, jambo la msingi ni hili. Nimetumia angalau token-events bilioni 45 za AI kwenye Mac moja. Kwa viwango vya sasa na vilivyorekodiwa vya API, hiyo ni angalau $9.3k ya matumizi ya modeli kabla ya kuongeza matumizi ya akaunti nzima ya OpenRouter na fal.ai.

Baada ya ukaguzi wa pili, hitimisho kuhusu OpenRouter na fal.ai likawa wazi zaidi. Gharama inayokosekana haipo hapo kwa sababu nilisahau kusoma faili ya ndani. Inakosekana kwa sababu huduma hizo huweka historia halisi ya malipo upande wa seva (server-side), na funguo nilizokuwa nazo hazikuweza kusoma historia hiyo ya kiwango cha akaunti.

Sehemu ya kufurahisha ni kwamba namba hiyo inategemea sana kile unachomaanisha na "tokens". Mawakala wa coding wa AI hutumia kiasi kikubwa cha tokens kusoma tena na tena muktadha (context). Sehemu kubwa ya traffic hiyo iko kwenye cache, ambayo inafanya iwe nafuu kuliko input tokens za kawaida, lakini bado inarekodiwa na inaonekana kwenye ripoti za matumizi.

## Nini kinahesabika kama token hapa

Mtego wa kwanza katika aina hii ya audit ni kwamba kila chombo huhesabu kwa njia tofauti kidogo. Kwa ripoti hii nimegawanya mambo manne.

| Neno | Maana |
|---|---|
| Input tokens | Prompt, code, tool output, maelekezo na muktadha unaotumwa kwenye modeli. |
| Output tokens | Maandishi ya jibu yanayoonekana au output iliyopangwa kutoka kwa modeli. |
| Reasoning tokens | Tokens za kufikiri zilizofichwa na kazi zinazoonyeshwa na baadhi ya vihesabio vya matumizi. Kawaida hutozwa kama output tokens, lakini hazionyeshwi kama maandishi ya kawaida ya jibu. |
| Cache-read tokens | Prompt na context tokens zilizohifadhiwa awali zinazotumiwa tena na mtoa huduma. Hizi zinaweza kuwa nafuu kuliko input mpya, lakini bado zinahesabika kama matumizi yaliyopimwa. |

Kwa hiyo kuna jumla mbili muhimu. Request tokens ni kile kilichoingia na kutoka kwenye miito ya modeli (model calls), ukiondoa cache reads. Token traffic ni request tokens pamoja na cache reads na reasoning tokens.

Watu wanaposema "Nimetumia token bilioni X", mara nyingi huchanganya hivi. Nilijaribu kuviweka kando.

## Muhtasari wa mwisho

Hii ni matokeo yaliyojumlishwa baada ya kuchanganua data ya zana za ndani na kutumia screenshot ya ripoti ya kila mwezi ya Codex kama namba kuu ya Codex. Haijajifanya kujumuisha historia kamili ya akaunti ya OpenRouter au fal.ai, kwa sababu sikuweza kuzifikia hizo kwa kutumia funguo za ndani zisizo za usimamizi (non-management keys).

| Chombo au chanzo | Request tokens | Cache tokens | Total token traffic | Gharama |
|---|---:|---:|---:|---:|
| Ripoti ya kila mwezi ya Codex | 23,046,195,362 | 21,578,277,284 | 44,624,472,646 | $8,926.98 |
| Muhtasari wa Claude na desktop local-agent | 2,607,194 | 115,582,148 | 118,189,342 | $276.64 |
| OpenHands | 71,763,722 | 0 | 71,763,722 | $0 iliyorekodiwa |
| Goose | 67,298,620 | 0 | 67,298,620 | ~$30.29 |
| opencode | 18,658,421 | 33,845,847 | 52,504,268 | $15.50 |
| Zed | 16,174,500 | 3,442,668 | 19,617,168 | $56.59 |
| Droid | 202,115 | 4,017,760 | 4,219,875 | $29.70 |
| Aider | 1,682,271 | 0 | 1,682,271 | $4.20 |
| LM Studio | 15,777 | 0 | 15,777 | local |
| Gemini CLI rough prompt trace | ~38,690 | 0 | ~38,690 | haijulikani |
| Qwen CLI rough prompt trace | ~163 | 0 | ~163 | haijulikani |
| Total | 23,224,636,835 | 21,735,165,707 | 44,959,802,542 | $9,339.89 |

Na hizi ni sehemu ambazo najua zinakosekana au ni sehemu tu.

| Mtoa huduma au chombo | Hali |
|---|---|
| OpenRouter account-wide traffic | Sehemu tu. Logi za app za ndani na matumizi ya funguo za sasa yamejumuishwa pale yanapoonekana. Nimeangalia tena na ufunguo wa ziada uliotolewa. Imeripoti $0 kwa ufunguo huo na haikuwa ufunguo wa usimamizi, kwa hivyo haikuweza kusoma shughuli za akaunti. |
| fal.ai | Haipo kwenye jumla ya matumizi. Nimepata code za ndani na traces za miradi. Nimeangalia tena na ufunguo wa ziada uliotolewa. Miito ya modeli inaweza kufanya kazi nayo, lakini endpoints za malipo ya akaunti na matumizi hazikuruhusiwa. Matumizi ya fal.ai yanategemea credits na vitengo vya output, sio uhasibu wa kawaida wa text-token. |
| Lovable | Traces za miradi ya ndani na browser pekee, hakuna kihesabio cha credit cha ndani kilichopatikana. |
| Replit | Hakuna kihesabio cha matumizi cha ndani kinachoweza kutumika kilichopatikana. |

Jedwali hapo juu huhesabu reasoning tokens zilizofichwa kama "request tokens" kwa Codex, kwa sababu tokens hizo ni sehemu ya kazi ya modeli. Ukitumia uwanja wa "Total Tokens" pekee kwenye ripoti ya kila mwezi ya Codex, bila reasoning na cache, jumla ndogo ya Codex ni 22,944,070,768.

## Codex ndiyo ilikuwa jini

Ripoti ya kila mwezi ya Codex ilitawala audit nzima. Codex pekee ilionyesha hivi.

| Codex metric | Total |
|---|---:|
| Input tokens | 22,796,292,873 |
| Output tokens | 147,777,895 |
| Reasoning tokens | 102,124,594 |
| Cache-read tokens | 21,578,277,284 |
| Jumla ya tokens iliyoripotiwa, input pamoja na output | 22,944,070,768 |
| Token traffic ikiwemo cache na reasoning | 44,624,472,646 |
| Gharama | $8,926.98 |

Na mwezi kwa mwezi.

| Mwezi | Input | Output | Reasoning | Cache read | Jumla iliyoripotiwa | Gharama |
|---|---:|---:|---:|---:|---:|---:|
| 2025-09 | 1,465,027,747 | 6,294,621 | 3,394,176 | 1,408,110,720 | 1,471,322,368 | $310.11 |
| 2025-10 | 2,198,317,367 | 12,112,717 | 6,743,168 | 2,087,526,016 | 2,210,430,084 | $520.56 |
| 2025-11 | 2,059,065,642 | 12,501,084 | 7,492,878 | 1,933,080,448 | 2,071,566,726 | $524.13 |
| 2025-12 | 2,741,470,149 | 27,917,018 | 20,974,512 | 2,620,809,600 | 2,769,387,167 | $851.96 |
| 2026-01 | 2,796,216,784 | 38,691,904 | 32,798,748 | 2,671,607,204 | 2,834,908,688 | $1,227.22 |
| 2026-02 | 4,296,274,116 | 26,382,801 | 19,076,844 | 4,061,859,456 | 4,322,656,917 | $1,490.41 |
| 2026-03 | 2,736,148,304 | 11,486,083 | 6,285,054 | 2,495,058,816 | 2,747,634,387 | $1,257.87 |
| 2026-04 | 2,538,939,090 | 6,990,823 | 3,102,999 | 2,435,933,440 | 2,545,929,913 | $1,392.79 |
| 2026-05 | 1,964,833,674 | 5,400,844 | 2,256,215 | 1,864,291,584 | 1,970,234,518 | $1,351.93 |
| Total | 22,796,292,873 | 147,777,895 | 102,124,594 | 21,578,277,284 | 22,944,070,768 | $8,926.98 |

Hiyo ndiyo hadithi. Takriban gharama yote ilitokana na muktadha wa wakala wa coding (agentic coding context). Mawakala wa programu wanaoendesha muda mrefu hawajibu mara moja tu. Wanasoma faili, wanaangalia diffs, wanaendesha amri, wanapata output ya zana, wanapunguza historia, wanaendelea na kazi, na kurudia. Kila loop ni miito mingine ya modeli.

## Kwa nini hesabu yangu ya kwanza ilikuwa ndogo sana

Uchanganuzi wa kwanza ulipata takriban tokeni bilioni 12.89 za Codex. Namba hiyo ilitoka kwenye hifadhidata ya ndani ya Codex inayohifadhi jumla ya tokeni kwa kila thread au session. Ilisaidia, lakini haikuelezea hadithi nzima ya gharama.

Uchanganuzi wa kina zaidi ulipata tabaka tatu za uhasibu wa Codex.

| Tabaka | Inachopima | Matokeo |
|---|---|---:|
| Session-final counters | Jumla ya mwisho inayojulikana kwa kila session ya ndani ya Codex | 12.89B |
| Monthly Codex report | Matumizi ya kila mwezi yaliyohakikiwa kulingana na modeli na aina ya tokeni | 22.94B tokeni, $8,926.98 |
| Raw `last_token_usage` events | Mtiririko wa matukio ya kila ombi uliotolewa kutoka kwenye logi za JSONL | 23.98B tokeni za ombi, karibu 46.53B zikijumuisha cache |

Ripoti ya kila mwezi ndiyo namba ningeichapisha. Uchanganuzi wa matukio ghafi ni njia nzuri ya kuhakiki namba ya juu, lakini inaweza kutofautiana kutokana na session zilizorejelewa, makundi ya muda, telemetry iliyorudiwa au vipindi tofauti vya ripoti.

Marekebisho muhimu ni haya. Ikiwa unataka namba ya aina ya bili kwa Codex, jumlisha matumizi ya kila ombi au tumia ripoti ya matumizi ya kila mwezi. Usitegemee tu kaunta ya mwisho ya session ya `tokens_used`.

Nilikagua hali ya app ya ndani, hifadhidata, faili za JSONL, na mwisho wa mtoa huduma pale inapowezekana. Niliepuka kuchapisha yaliyomo kwenye prompt na kuficha API keys. Hizi ndizo zilikuwa vyanzo muhimu vya ndani.

| Zana | Chanzo muhimu cha ndani |
|---|---|
| Codex | `~/.codex/sessions/**/*.jsonl`, `~/.codex/state_5.sqlite`, `~/.codex/logs_2.sqlite`, pamoja na skrini ya ripoti ya kila mwezi |
| opencode | SQLite DB chini ya `~/.local/share/opencode/` |
| Claude Code na Claude Desktop | `~/.claude.json`, logi za ukaguzi za wakala wa ndani wa Claude desktop |
| Aider | Faili za `.aider.chat.history.md` |
| Goose | Session za JSONL chini ya `~/.local/share/goose/sessions/` |
| OpenHands | Faili za JSON za matukio chini ya `~/.openhands/sessions/` |
| LM Studio | JSON ya mazungumzo chini ya `~/.lmstudio/conversations/` |
| Gemini CLI | `~/.gemini/tmp/*/logs.json` |
| Qwen CLI | `~/.qwen/tmp/*/logs.json` |
| Zed na Droid | Yalipatikana kupitia cache ya matumizi ya `tokscale` |
| OpenRouter | API keys za ndani, ufunguo uliotolewa ambao si wa usimamizi, na ukaguzi wa `/api/v1/key` |
| fal.ai | Fuatiliaji wa mradi wa ndani pamoja na ukaguzi wa ufunguo uliotolewa, lakini hakuna kaunta ya matumizi inayoweza kutumika |
| Lovable na Replit | Fuatiliaji wa kivinjari na mradi, hakuna kaunta ya bili ya ndani inayoweza kutumika |

Nilipata pia rollup iliyohifadhiwa ya `tokscale`.

```text
~/.config/tokscale/cache/tui-data-cache.json
```

Cache hiyo iliripoti hivi.

| Metriki ya tokscale | Thamani |
|---|---:|
| Jumla ya tokeni zilizorekebishwa | 13,537,863,939 |
| Jumla ya gharama zilizorekebishwa | $6,438.80 |
| Ndoo za modeli | 21 |
| Wateja wenye ndoo za modeli zinazoweza kutumika | Codex, opencode, Zed, Droid |

Namba hiyo inasaidia, lakini haijahesabiwa kwa njia sawa na ripoti ya kila mwezi ya Codex. Inarekebisha na kupanga data kwa njia tofauti. Niliitumia hasa kupata wateja wa ziada na ndoo za gharama nilizokuwa nimezikosa.

## Zana nyingine, moja baada ya nyingine

Codex ndiye alikuwa mkubwa, lakini zana zingine bado zilikuwa na umuhimu.

opencode ilikuwa na hifadhidata halisi ya SQLite yenye uhasibu wa tokeni kwa kila ujumbe. Hizi ndizo jumla zilizopatikana.

| Uga | Hesabu |
|---|---:|
| Input tokens | 18,329,400 |
| Output tokens | 215,350 |
| Reasoning tokens | 116,322 |
| Cache read | 33,616,558 |
| Cache write | 229,289 |
| Jumla ya trafiki ya tokeni | 52,504,268 |
| Gharama | $15.50 |

Modeli zilijumuisha OpenRouter GLM, Gemini preview kupitia OpenRouter, na ndoo za modeli za opencode/bila malipo.

Claude ilikuwa na vyanzo viwili muhimu vya ndani. Kimoja ni `~/.claude.json`, kinachohifadhi kaunta za muhtasari wa mradi. Kingine ni logi za ukaguzi za wakala wa ndani wa Claude Desktop, zinazojumuisha muhtasari wa matumizi ya modeli. Kwa pamoja zilitoa hivi.

| Uga | Hesabu |
|---|---:|
| Non-cache request tokens | 2,607,194 |
| Cache tokens | 115,582,148 |
| Jumla ya trafiki ya tokeni | 118,189,342 |
| Gharama | $276.64 |

Huu ni mfano mzuri wa kwa nini cache ni muhimu. Nyingi ya trafiki ya tokeni ya Claude ilikuwa usomaji au uundaji wa cache, si prompt mpya au pato.

OpenHands ilihifadhi matumizi halisi ya kila jibu katika faili za matukio.

| Uga | Hesabu |
|---|---:|
| Prompt tokens | 71,243,196 |
| Completion tokens | 520,526 |
| Jumla ya tokeni | 71,763,722 |
| Gharama iliyorekodiwa | $0 |

Ndoo ya modeli ilikuwa `openrouter/sonoma-sky-alpha`, ambayo ilionekana kama bila malipo katika uhasibu wa ndani.

Goose ilikuwa na kaunta za session zilizokusanywa.

| Uga | Hesabu |
|---|---:|
| Input tokens | 66,266,561 |
| Output tokens | 1,032,059 |
| Jumla ya tokeni | 67,298,620 |
| Gharama inayokadiriwa | ~$30.29 |

Config ya sasa ya Goose ilielekeza kwenye OpenRouter na `z-ai/glm-4.6`, na backups za config za zamani pia zilionyesha `x-ai/grok-code-fast-1`. Kwa sababu safu za session moja hazikuhifadhi modeli, nilichukulia gharama ya Goose kama makadirio.

Aider ilikuwa rahisi. Inaandika mistari ya tokeni na gharama kwenye faili za historia ya gumzo.

| Uga | Hesabu |
|---|---:|
| Sent tokens | 1,560,000 |
| Received tokens | 122,271 |
| Jumla ya tokeni | 1,682,271 |
| Gharama | $4.20 |

Niliondoa faili za historia zinazofanana kwa hash ili nakala ya backup isiihesabu mara mbili.

LM Studio ni hasa matumizi ya modeli ya ndani, si matumizi ya API. Bado ilikuwa na takwimu za uzalishaji kwenye JSON ya mazungumzo.

| Uga | Hesabu |
|---|---:|
| Prompt tokens | 8,796 |
| Predicted tokens | 6,981 |
| Jumla ya tokeni za uzalishaji wa ndani | 15,777 |

Hii si gharama ya API isipokuwa mtoa huduma wa mbali alihusika, na faili za ndani hazikuonyesha hivyo.

Gemini na Qwen walikuwa na logi za ndani, lakini sikupata kaunta za matumizi ya tokeni zinazotegemeka za aina ya mtoa huduma. Nilipata tu ufuatiliaji mbaya wa maandishi ya prompt.

| Zana | Session na ujumbe | Makadirio mabaya ya maandishi |
|---|---:|---:|
| Gemini CLI | 17 session, ujumbe 76 wa mtumiaji | ~38,690 text tokens |
| Qwen CLI | 2 session, ujumbe 9 wa mtumiaji | ~163 text tokens |

Sikuhesabu hizo kama matumizi ya mtoa huduma yanayoweza kulipwa. Ni makadirio mabaya tu ya ukubwa wa maandishi.

Zed na Droid walitoka kwenye cache ya `tokscale`, si kwa kuchambua logi maalum za app kwa mkono.

| Zana | Trafiki ya tokeni | Gharama |
|---|---:|---:|
| Zed | 19,617,168 | $56.59 |
| Droid | 4,219,875 | $29.70 |

## OpenRouter, fal.ai, Lovable na Replit

Nilikuwa nimeangalia pia zana za karibu na mtoa huduma na ufuatiliaji wa akaunti. Uchanganuzi wa ndani wa kina zaidi ulitafuta folda za config, folda za hali ya wakala, saraka za mradi, usaidizi wa programu ya kivinjari, cache za vifurushi na hali ya CLI inayojulikana kwa vitu vya OpenRouter, fal.ai, Lovable na Replit. Ilipata msimbo wa mradi, vifurushi vya SDK, cache za bei, faili za config na ufuatiliaji wa kivinjari na mradi, lakini hakuna leja halisi ya bili ya ndani kwa watoa huduma waliokosekana.

Hebu tuanze na OpenRouter. Nilipata API keys tatu za ndani za OpenRouter kwenye configs za zana. Baada ya kushuku kuwa trafiki ya OpenRouter ilikuwa kubwa zaidi, nilijaribu pia ufunguo mmoja zaidi wa OpenRouter uliotolewa. Nilihoji endpoint ya sasa ya ufunguo wa OpenRouter kwa kila ufunguo na nikaficha thamani za ufunguo. Haya hapa ni matokeo.

| Chanzo cha ufunguo | Matumizi ya ufunguo wa sasa | Upatikanaji wa akaunti nzima |
|---|---:|---|
| Aider key | $4.820189682 | Hapana |
| OpenHands key | $0 | Hapana |
| Refact key | $0.063351337 | Hapana |
| Supplied test key | $0 | Hapana |

Kisha nikajaribu endpoint ya `/api/v1/activity` ya OpenRouter kwa shughuli za akaunti. Kila ufunguo ulirudisha kitu kile kile.

```text
Only management keys can fetch activity for an account
```

Kwa hiyo ukaguzi wa OpenRouter si historia kamili ya akaunti nzima. Ni matumizi tu yanayoonekana kwa API keys hizo maalum.

Ufunguo uliotolewa pia ulishindwa kwenye endpoint ya kuorodhesha ya ufunguo wa usimamizi.

```text
Invalid management key
```

OpenRouter inaandika kuwa `/api/v1/activity` inarudisha shughuli kwa siku 30 za mwisho zilizokamilika za UTC na inahitaji ufunguo wa usimamizi. Ufunguo wa kawaida wa API unaweza kuripoti matumizi yake ya sasa, lakini si akaunti nzima.

Hii inamaanisha kuwa namba ya OpenRouter katika makala hii karibu bila shaka ni ndogo sana ikiwa akaunti ilikuwa na matumizi mazito ya dashibodi, funguo zilizofutwa, funguo zilizozungushwa, shughuli za BYOK, au app nyingine ambazo hazikuweka logi za ndani. Ili kujumuisha gharama ya OpenRouter iliyokosekana, ninahitaji ufunguo wa usimamizi wa OpenRouter wenye uwezo wa kufikia `/api/v1/activity`, au mauzo ya dashibodi au skrini kwa matumizi ya kila mwezi, au orodha ya API keys zote za kihistoria pamoja na matumizi yao ya sasa ya ufunguo, ikiwa funguo bado zipo na matumizi hayajajirekebisha.

Kwa ufunguo wa usimamizi, wito wa ngazi ya akaunti ni huu.

```bash
curl https://openrouter.ai/api/v1/activity \
  -H "Authorization: Bearer $OPENROUTER_MANAGEMENT_KEY"
```

Kwa ufunguo mmoja wa kawaida, wito mdogo ni huu.

```bash
curl https://openrouter.ai/api/v1/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

Endpoint ya kwanza inaweza kutoa shughuli kwa siku, modeli na mtoa huduma. Ya pili inaweza tu kusema kile ufunguo mmoja unachoripoti hivi sasa.

## fal.ai ni kitu kingine kabisa linapokuja suala la bili

Sasa kuhusu fal.ai. Nilipata maelezo ya msimbo na miradi ya fal.ai, ikiwa ni pamoja na majaribio ya maandishi-kwa-sauti na sauti-kwa-maandishi, lakini hakuna kaunta ya bili ya ndani inayoweza kuonyesha matumizi ya akaunti. Baada ya kuhisi kuwa trafiki ya fal.ai ni kubwa zaidi, nilijaribu ufunguo mmoja wa fal.ai nilioupata dhidi ya sehemu za bili na matumizi ya akaunti.

Matokeo yalikuwa muhimu. Ufunguo huo haukuonyesha matumizi ya sifuri. Uliibainisha kuwa ufunguo huo haukuruhusiwa kusoma leja ya bili.

| Ukaguzi wa fal.ai | Matokeo |
|---|---|
| Bili ya akaunti | Hitilafu ya idhini, ufunguo haukuruhusiwa kufanya kitendo hicho. |
| Matumizi ya modeli kuanzia 2024-01-01 hadi 2026-05-19 | Ilirudisha kitu cha hitilafu pekee, hakuna safu za kujumlisha. |
| Matukio ya bili kwa siku 90 zilizopita | Ilirudisha kitu cha hitilafu pekee, hakuna matukio ya kujumlisha. |

Kwa sababu simu hizo zilirudisha hitilafu za idhini, sikuongeza `$0` kwenye ripoti. `$0` ingekuwa ya kupotosha. Hali sahihi ni "haijulikani na inaelekea haipo".

fal.ai pia haioani moja kwa moja na uhasibu wa tokeni za LLM. Nyaraka zao zinaelezea bili ya modeli kupitia matokeo yaliyofanikiwa na vitengo vya bili maalum kwa kila modeli, vinavyolipwa kwa mikopo ya kulipia kabla. Kwa hivyo, ukaguzi wa fal unahitaji dashibodi ya fal au ufunguo wa API, sio tu uchanganuzi wa tokeni za ndani.

Hii pia inaelekea kupunguzwa. Matumizi ya fal.ai mara nyingi huonekana kwenye dashibodi na sio kwenye logi za programu za ndani. Programu ya ndani inaweza kupiga simu kwa fal, kupata URL za matokeo ya sauti, picha au video, na isihifadhi kamwe kitengo cha bili au matumizi ya mkopo. Ili kujumuisha fal.ai, nahitaji usafirishaji wa bili au matumizi ya dashibodi ya fal.ai, au picha ya skrini au CSV ya ununuzi wa mikopo na utumiaji wa mikopo, au ufunguo wa msimamizi au timu wa fal.ai unaoruhusiwa kusoma sehemu za bili au matumizi, ikiwa ufikiaji huo upo kwa akaunti hiyo.

Tofauti muhimu ni kwamba fal.ai haipaswi kuingia kwenye jedwali la tokeni kana kwamba ni maandishi ya LLM. Inapaswa kuwa na kikapu chake cha matumizi.

| Kipimo cha fal.ai | Jinsi ya kuripoti |
|---|---|
| Mikopo iliyotumika | Ongeza kwa jumla ya matumizi ya dola |
| Uzalishaji wa sauti, video na picha | Ripoti kama vitengo vya matokeo |
| Tokeni za maandishi | Jumuisha tu ikiwa modeli mahususi ya fal inaonyesha matumizi ya tokeni |

Kwa hivyo, kichwa cha habari cha siku zijazo kilichosahihishwa kinapaswa kuwa "Matukio ya tokeni za AI 45B+ yaliyothibitishwa ndani, pamoja na matumizi ya dashibodi ya OpenRouter na fal.ai bado ya kuongezwa".

Kwa Lovable, nilipata alama hizi.

```text
lovable.dev browser IndexedDB traces
magic-prf.lovable.app browser IndexedDB traces
local .lovable project metadata
lovable-tagger packages
lovable upload folders
```

Sikupata kaunta za tokeni, mikopo, au bili za ndani. Lovable ni bora kukaguliwa kutoka kwenye dashibodi yake, sio kutoka kwenye faili za IndexedDB za kivinjari cha ndani.

Kwa Replit, niliangalia metadata ya mradi, tokeni, hifadhidata za ndani na alama za kivinjari. Sikupata kaunta ya matumizi ya ndani inayoweza kutumika.

## Jinsi tulivyozalisha namba hizo

Mtiririko wa kazi ulikuwa hivi.

1. Orodhesha saraka zinazowezekana za zana za AI.
2. Tafuta nyanja za matumizi bila kutoa yaliyomo kwenye mazungumzo.
3. Tambua hifadhi zilizopangwa, kama vile SQLite, JSONL, JSON na historia za Markdown.
4. Changanua kaunta za jumla pekee.
5. Ondoa nakala kwenye historia na muhtasari wa vipindi inapowezekana.
6. Kagua kaunta za ndani dhidi ya nyaraka za mtoa huduma na sehemu za mtoa huduma.
7. Tenganisha tokeni za ombi kutoka kwa trafiki ya akiba.

Uchunguzi wa kwanza mpana uliingalia hali ya zana zilizosakinishwa.

```bash
find ~ -maxdepth 3 -type d \
  | rg -i 'codex|claude|opencode|gemini|qwen|goose|aider|openhands|cursor|windsurf|zed|replit|lovable|lmstudio|ollama'
```

Kisha nikatafuta nyanja za matumizi.

```bash
rg -n -i 'input_tokens|output_tokens|total_tokens|cached_tokens|cache_read|usage|cost' \
  ~/.codex ~/.claude ~/.opencode ~/.gemini ~/.qwen ~/.local/share/goose ~/.openhands ~/.lmstudio
```

Kwa Codex, tukio muhimu lilionekana hivi.

```json
{
  "type": "event_msg",
  "payload": {
    "type": "token_count",
    "info": {
      "total_token_usage": {
        "input_tokens": 123,
        "cached_input_tokens": 100,
        "output_tokens": 20,
        "reasoning_output_tokens": 10,
        "total_tokens": 143
      },
      "last_token_usage": {
        "input_tokens": 12,
        "cached_input_tokens": 10,
        "output_tokens": 2,
        "reasoning_output_tokens": 1,
        "total_tokens": 14
      }
    }
  }
}
```

Ugunduzi muhimu ni kwamba `total_token_usage` hukusanyika ndani ya kipindi. Ukijumlisha kila safu ya `total_token_usage`, utahesabu kupita kiasi. Kwa uhasibu wa aina ya bili unataka `last_token_usage` ya kila ombi, au ripoti ya matumizi iliyopatanishwa.

Kichanganuzi kilichorahisishwa cha Codex kinaonekana hivi.

```js
const fs = require("fs");
const path = require("path");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (entry.name.endsWith(".jsonl")) files.push(p);
  }
  return files;
}

const totals = {
  input: 0,
  cached: 0,
  output: 0,
  reasoning: 0,
  total: 0,
};

for (const file of walk(`${process.env.HOME}/.codex/sessions`)) {
  for (const line of fs.readFileSync(file, "utf8").split(/\n/)) {
    if (!line.includes("token_count")) continue;

    let row;
    try {
      row = JSON.parse(line);
    } catch {
      continue;
    }

    const usage = row.payload?.info?.last_token_usage;
    if (!usage) continue;

    totals.input += usage.input_tokens || 0;
    totals.cached += usage.cached_input_tokens || 0;
    totals.output += usage.output_tokens || 0;
    totals.reasoning += usage.reasoning_output_tokens || 0;
    totals.total += usage.total_tokens || 0;
  }
}

console.log(totals);
```

Kwa zana zinazotumia SQLite kama opencode, njia ilikuwa tofauti.

```bash
sqlite3 ~/.local/share/opencode/opencode.db ".schema"
```

Kisha unachanganua nyanja za JSON kwenye jedwali la ujumbe, na hasa kitu cha `tokens`, sio safu za sehemu zilizorudiwa.

Kwa Aider, matumizi yalikuwa maandishi wazi.

```bash
rg -n 'Tokens: .* sent, .* received|Cost:' ~/Developer ~/.aider
```

Kwa matumizi ya ufunguo wa sasa wa OpenRouter.

```bash
curl https://openrouter.ai/api/v1/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

Kwa shughuli za akaunti nzima ya OpenRouter.

```bash
curl https://openrouter.ai/api/v1/activity \
  -H "Authorization: Bearer $OPENROUTER_MANAGEMENT_KEY"
```

Amri ya pili inahitaji ufunguo wa usimamizi.

## Namba za gharama zinatoka wapi

Nilitumia aina tatu za data ya gharama. Gharama zilizorekodiwa moja kwa moja na zana hiyo, gharama zinazoonyeshwa kwenye ripoti ya matumizi ya kila mwezi ya Codex, na makadirio kutoka kwa bei za sasa za umma ambapo logi za ndani zilikuwa na tokeni lakini hakuna gharama.

Kwa bei, bei ya API ya OpenAI inaorodhesha bei za sasa kwa kila tokeni milioni 1 kwa GPT-5.5, GPT-5.4 na GPT-5.3-Codex. Kadi ya viwango ya Codex ya OpenAI inaelezea hatua ya kuelekea uhasibu wa Codex kulingana with tokeni na inatenganisha mikopo ya ingizo, ingizo la akiba na matokeo. Anthropic inachapisha bei za Claude kulingana na modeli na darasa la tokeni. OpenRouter inaonyesha matumizi ya ufunguo wa sasa kupitia `/api/v1/key`, na shughuli kamili inahitaji ufunguo wa usimamizi. Na fal.ai inatoza API za modeli kulingana na matokeo yaliyofanikiwa na vitengo vya bili maalum kwa modeli, vilivyolipwa kwa mikopo ya kulipia kabla.

Makadirio ya gharama sio ankara kamilifu. Ni makadirio ya "hii ingekuwaje kwa viwango vya aina ya API?". Matumizi mengine yanaweza kujumuishwa katika usajili, viwango vya bure, hakiki za utafiti au mgao wa zana za ndani. Logi zingine za ndani hurekodi gharama inayokadiriwa badala ya bili iliyotatuliwa ya mtoa huduma.

## Kwa nini matumizi ya wakala yanakuwa makubwa sana

Jambo la kushangaza sio kwamba mashine ilitumia AI. Jambo la kushangaza ni jinsi mawakala wanavyozidisha muktadha haraka.

Soga ya kawaida kimsingi ni ombi la mtumiaji na jibu la msaidizi. Kitanzi cha uandishi wa wakala kinafanana zaidi na hivi.

1. Mtumiaji anaomba mabadiliko.
2. Wakala anasoma faili za repo.
3. Simu ya modeli.
4. Wakala anaendesha utafutaji.
5. Simu ya modeli.
6. Wakala anaendesha majaribio.
7. Simu ya modeli.
8. Wakala anasoma hitilafu.
9. Simu ya modeli.
10. Wakala anahariri faili.
11. Simu ya modeli.
12. Wakala anathibitisha.
13. Simu ya modeli.

Kila hatua inaweza kujumuisha maagizo ya mfumo, maagizo ya msanidi, ufafanuzi wa zana, mazungumzo ya awali, dondoo za faili, matokeo ya amri, diffs, kushindwa kwa majaribio, picha za skrini, hali ya kivinjari na sera za usalama.

Ndio maana tokeni za kusoma kutoka kwa akiba zilikuwa karibu kubwa kama tokeni za ombi mpya katika Codex.

| Aina ya Codex | Tokeni |
|---|---:|
| Ingizo jipya + matokeo + hoja | 23.05B |
| Kusoma akiba | 21.58B |

Akiba inafanya hii kuwa nafuu kuliko ilivyokuwa vinginevyo, lakini pia inaonyesha sura halisi ya matumizi ya wakala. Muktadha ndio mafuta halisi.

## Niliyojifunza

Kwanza, "total tokens" inamaanisha mambo mengi. Jumla ya kwenye dashboard, counter ya session, event za kila ombi, na ankara ya mtoa huduma, zote zinaweza kuwa sahihi lakini zikaonyesha namba tofauti.

Pili, logi za ndani ni muhimu sana. Zana nyingi huhifadhi metadata ya kutosha kwa siri ili kuweza kukokotoa matumizi bila kutuma prompts kwingine.

Tatu, dashboard za watoa huduma bado ni muhimu. OpenRouter, fal.ai, Lovable, Replit na huduma zingine kama hizo huenda zisihifadhi historia kamili ya bili kwenye kifaa chako. Kwa hizo, unahitaji data kutoka kwenye dashboard au kutumia management keys zenye access maalum.

Nne, coding ya agentic si ghali kwa sababu output ni ndefu. Ni ghali kwa sababu input context ni kubwa sana na inarudiwa mara kwa mara.

Kwenye hali yangu, majibu ya model niliyokuwa naona yalikuwa sehemu ndogo tu ya yote. Gharama halisi ilikuwa kwenye context, matokeo ya tool, kukagua repository, na kutumia tena prompt zilizohifadhiwa kwenye cache.

Kwa hiyo, kama ningelazimika kufupisha, ni hivi.

> Nilifanya ukaguzi wa kila AI tool niliyoweza kuipata kwenye Mac yangu. Mashine ilionyesha ushahidi wa takriban token-events bilioni 45 na matumizi ya karibu $9.3k kama ingekuwa API. Karibu yote ilitokana na Codex kufanya kazi za agentic coding.

## Marejeo

- OpenAI API pricing, https://developers.openai.com/api/docs/pricing
- OpenAI Codex rate card, https://help.openai.com/en/articles/20001106-codex-rate-card
- Anthropic Claude pricing, https://platform.claude.com/docs/en/about-claude/pricing
- OpenRouter current key endpoint, https://openrouter.ai/docs/api/api-reference/api-keys/get-current-key
- OpenRouter activity endpoint, https://openrouter.ai/docs/api/api-reference/analytics/get-user-activity
- fal.ai pricing model, https://fal.ai/docs/documentation/model-apis/pricing
- fal.ai authentication, https://fal.ai/docs/documentation/setting-up/authentication

![cover](../../../media/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events/cover.webp)
