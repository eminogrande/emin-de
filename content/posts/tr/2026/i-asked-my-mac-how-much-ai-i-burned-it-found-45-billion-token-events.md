---
title: "Mac'ime ne kadar yapay zeka yaktığımı sordum. 45 milyar token olayı buldu"
description: "Mac'imdeki tüm AI araçlarını kullanım logları için taradım. Yaklaşık 45 milyar token olayı ve API fiyatlarıyla kabaca 9,3 bin dolar, neredeyse tamamı Codex'ten."
date: "2026-05-18T14:25:16Z"
updated: "2026-05-18"
lang: tr
translated_from: "en/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events"
source_sections: ["what-counts-as-a-token-here", "the-final-rollup", "codex-was-the-monster", "why-my-first-count-was-too-low", "the-other-tools-one-by-one", "openrouter-falai-lovable-and-replit", "falai-is-a-different-kind-of-bill", "how-we-reproduced-the-numbers", "where-the-cost-numbers-come-from", "why-agent-usage-gets-so-large", "what-i-learned", "references"]
category: agents-ai
format: essay
author: emin
provenance: unknown
ai_assisted: true
reviewed_by_human: false
image: "/media/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events/cover.webp"
tldr: ["Mac'imde bulabildiğim her AI aracını denetledim ve yaklaşık 45 milyar token olayı buldum.", "API tarzı fiyatlarla bu kabaca 9,3 bin dolarlık kullanım ediyor ve neredeyse tamamı agentic coding yapan Codex'ten geldi.", "Cache okumaları neredeyse yeni istek tokenları kadar büyüktü, çünkü ajanlar bağlamı tekrar tekrar okuyor.", "OpenRouter ve fal.ai hâlâ eksik, çünkü faturalandırma geçmişleri sunucu tarafında duruyor ve anahtarlarım bunu okuyamadı."]
sections: [{"basically": "İstek tokenları ve token trafiği iki farklı sayı. Çoğu insan bunları karıştırıyor."}, {"basically": "44,96 milyar token olayı ve 9.339,89 dolar yerel olarak kanıtlanmış durumda, OpenRouter ve fal.ai hâlâ eksik."}, {"basically": "Tek başına Codex 44,6 milyar token olayı ve 8.926,98 dolardı. Agentic coding bağlamı hepsini yedi."}, {"basically": "Oturum sonu sayaçları 12,89 milyar dedi. İstek başına kullanımı topla ya da aylık raporu kullan."}, {"basically": "Claude, Goose, OpenHands, opencode ve diğerleri önemliydi ama Codex'in yanında küçük kalıyorlardı."}, {"basically": "Normal bir API anahtarı sadece kendi kullanımını görür. Hesap genelinde geçmiş için yönetim anahtarı gerekir."}, {"basically": "Bir yetkilendirme hatası 0 dolar demek değildir. fal.ai harcaması, panel dışa aktarımını alana kadar bilinmiyor."}, {"basically": "Araç klasörlerini bul, kullanım alanları için grep yap, istek başına sayaçları ayrıştır, promptları asla dökme."}, {"basically": "Loglanan maliyetler, Codex raporu ve herkese açık fiyatlandırma. Bu bir API fiyatı tahmini, fatura değil."}, {"basically": "Her ajan adımı, tüm bağlamla birlikte bir model çağrısı daha demek. Asıl yakıt bağlam."}, {"basically": "Agentic coding pahalı çünkü çıktı uzun değil. Pahalı çünkü bağlam çok büyük."}, {"basically": "Karşılaştırdığım OpenAI, Anthropic, OpenRouter ve fal.ai fiyatlandırma sayfaları ve API dokümanları."}]
---
Basit bir sorunun gerçek cevabını istiyordum.

> Ben bu makinede aslında ne kadar yapay zeka tükettim?

Sadece tek bir uygulama değil. Sadece tek bir sağlayıcı paneli de değil. Makinedeki çıplak gerçeği görmek istedim. Codex, Claude, opencode, Goose, OpenHands, Aider, Gemini CLI, Qwen, LM Studio, Zed, OpenRouter, [fal.ai](http://fal.ai) denemeleri, Replit ve Lovable kırıntıları, loglarda, SQLite veritabanlarında, JSONL oturum dosyalarında, tarayıcı hafızasında veya CLI ayarlarında yatan ne varsa hepsi.

Sonuç beklediğimden çok daha büyük çıktı.

Önemli bir nokta var ama. Bu sadece yerel makinenin denetimi, sağlayıcı hesaplarının tam bir dökümü değil. İlk taslağı paylaştıktan sonra OpenRouter ve fal.ai tarafını muhtemelen eksik saydığımı fark ettim. Çünkü bulduğum yerel key'ler yönetim yetkisine sahip değildi ve fal.ai makinede hiçbir fatura dökümü bırakmamıştı. 18 Mayıs 2026'da bana verilen ekstra test key'leriyle durumu tekrar kontrol ettim. Bu key'ler de hesap genelindeki OpenRouter veya fal.ai fatura geçmişini açmaya yetmedi. O yüzden aşağıdaki ana rakamı "bu Mac'in yerel olarak kanıtlayabildiği kısım artı Codex raporu" olarak düşün, bütün hesapların ömür boyu harcaması olarak değil.

Bu Mac'in yerel olarak kanıtlayabildiği tablo aşağı yukarı şöyle.

| Metrik | Toplam |
|---|---:|
| Bildirilen istek token'ları, cache ve gizli reasoning hariç | 23.12 milyar |
| Gizli reasoning dahil istek token'ları | 23.22 milyar |
| Cache'ten okunan token trafiği | 21.70 milyar |
| Cache ve reasoning dahil toplam token trafiği | 44.96 milyar |
| Tahmini API dengi harcama | $9,339.89 |
| Yerel olaylara dayalı kaba üst sınır tahmini | yaklaşık $9.7k |
| Bilinen eksik kısım | doğrulanmış kör nokta, hesap geneli OpenRouter ve fal.ai panel kullanımı |

Mesele kısaca şu. Tek bir Mac üzerinde en azından kabaca 45 milyar yapay zeka token işleminden geçmişim. Mevcut ve loglara geçmiş API tarifelerine göre bu rakam, hesaba katamadığımız OpenRouter ve fal.ai kullanımlarını eklemeden bile en az 9.3k dolar civarı bir model masrafı demek.

İkinci kontrolden sonra OpenRouter ve fal.ai tarafındaki durum daha da netleşti. Aradaki kayıp harcamanın sebebi gözümün önündeki yerel bir dosyayı ayrıştırmayı unutmam değil. Bu servisler asıl fatura geçmişini sunucuda tutuyor ve elimdeki key'ler hesap düzeyindeki bu geçmişi okuyamıyor.

İşin komik tarafı, bu rakamın "token" derken neyi kastettiğine göre deli gibi değişmesi. Yapay zeka kodlama ajanları, bağlamı tekrar tekrar okumak için akıl almaz miktarda token harcıyor. Bu trafiğin büyük kısmı cache'leniyor. Yani sıfırdan giren token'lara göre daha ucuza geliyor ama sonuçta yine de tarifeye tabi ve kullanım raporlarında kabak gibi görünüyor.

## Burada token sayılan ne

Bu tarz bir denetimdeki ilk tuzak, her aracın kafasına göre sayım yapması. Bu rapor için dört şeyi birbirinden ayırdım.

| Terim | Anlamı |
|---|---|
| Input token'ları | Modele gönderilen prompt, kod, araç çıktıları, talimatlar ve bağlam. |
| Output token'ları | Modelin ürettiği görünür yanıt metni veya yapılandırılmış çıktı. |
| Reasoning token'ları | Bazı kullanım sayaçlarında görünen gizli akıl yürütme ve çalışma token'ları. Genelde output token'ı gibi faturalandırılır ama normal yanıt metni olarak gösterilmez. |
| Cache'ten okunan token'lar | Sağlayıcının yeniden kullandığı, önceden cache'e alınmış prompt ve bağlam token'ları. Taze input'a göre daha ucuz olabilir ama yine de ölçülen kullanıma yazılır. |

Dolayısıyla elimizde iki işe yarar toplam kalıyor. İstek token'ları, cache okumaları hariç modellere giren ve çıkan her şey. Token trafiği ise istek token'larının üstüne cache okumaları ve reasoning token'larının eklenmiş hali.

İnsanlar "X milyar token harcadım" dediğinde genelde bunları çorba yapar. Ben ayrı tutmaya çalıştım.

## Genel toplam

Yerel araç verilerini taradıktan ve ana Codex rakamı olarak Codex'in aylık rapor ekran görüntüsünü baz aldıktan sonra çıkan birleşik tablo bu. Yerel ve yetkisiz key'lerle ulaşamadığım için, tam OpenRouter veya fal.ai hesap geçmişini kapsama gibi bir iddiası yok.

| Araç veya kaynak | İstek token'ları | Cache token'ları | Toplam token trafiği | Maliyet |
|---|---:|---:|---:|---:|
| Codex aylık raporu | 23,046,195,362 | 21,578,277,284 | 44,624,472,646 | $8,926.98 |
| Claude özetleri ve masaüstü yerel ajan | 2,607,194 | 115,582,148 | 118,189,342 | $276.64 |
| OpenHands | 71,763,722 | 0 | 71,763,722 | $0 loglanmış |
| Goose | 67,298,620 | 0 | 67,298,620 | ~$30.29 |
| opencode | 18,658,421 | 33,845,847 | 52,504,268 | $15.50 |
| Zed | 16,174,500 | 3,442,668 | 19,617,168 | $56.59 |
| Droid | 202,115 | 4,017,760 | 4,219,875 | $29.70 |
| Aider | 1,682,271 | 0 | 1,682,271 | $4.20 |
| LM Studio | 15,777 | 0 | 15,777 | yerel |
| Gemini CLI kaba prompt izi | ~38,690 | 0 | ~38,690 | bilinmiyor |
| Qwen CLI kaba prompt izi | ~163 | 0 | ~163 | bilinmiyor |
| Toplam | 23,224,636,835 | 21,735,165,707 | 44,959,802,542 | $9,339.89 |

Eksik olduğunu veya sadece kısmen alabildiğimi bildiğim kalemler de şunlar.

| Sağlayıcı veya araç | Durum |
|---|---|
| OpenRouter hesap geneli trafik | Sadece kısmi. Göründüğü kadarıyla yerel uygulama logları ve mevcut key kullanımı dahil edildi. Verilen ekstra key ile tekrar kontrol edildi. O key için $0 gösterdi ve yönetim yetkisi olmadığı için hesap hareketlerini okuyamadı. |
| fal.ai | Harcama toplamında yok. Yerel kod ve proje kalıntıları buldum. Verilen ekstra key ile tekrar kontrol edildi. Model çağrıları bu key ile çalışabilir ama hesap faturalandırma ve kullanım uç noktalarına erişim izni yoktu. fal.ai kullanımı normal metin token'ları yerine kredi ve çıktı birimlerine dayanıyor. |
| Lovable | Sadece yerel proje ve tarayıcı kalıntıları var, yerel bir kredi sayacı bulunamadı. |
| Replit | İşe yarar bir yerel kullanım sayacı bulunamadı. |

Yukarıdaki tablo Codex için gizli reasoning token'larını "istek token'ı" sayıyor, çünkü bu token'lar modelin yaptığı asıl işin bir parçası. Codex aylık raporundaki sadece "Total Tokens" alanını alırsan, yani reasoning ve cache hariç tutulursa, Codex ara toplamı 22,944,070,768 çıkıyor.

## Canavar kesinlikle Codex'ti

Bütün denetime Codex'in aylık raporu hükmetti resmen. Tek başına Codex şunu yazdı.

| Codex metriği | Toplam |
|---|---:|
| Input token'ları | 22,796,292,873 |
| Output token'ları | 147,777,895 |
| Reasoning token'ları | 102,124,594 |
| Cache'ten okunan token'lar | 21,578,277,284 |
| Bildirilen toplam token, input artı output | 22,944,070,768 |
| Cache ve reasoning dahil token trafiği | 44,624,472,646 |
| Maliyet | $8,926.98 |

Ay ay dökümü de böyle.

| Ay | Input | Output | Reasoning | Cache okuma | Bildirilen toplam | Maliyet |
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
| Toplam | 22,796,292,873 | 147,777,895 | 102,124,594 | 21,578,277,284 | 22,944,070,768 | $8,926.98 |

Bütün mevzu bu aslında. Bu tüketimin neredeyse tamamı otonom kodlama ajanlarının bağlam trafiğinden geldi. Uzun süre çalışan ajanlar tek bir cevap verip kenara çekilmiyor. Dosyaları okuyor, diff'lere bakıyor, komut çalıştırıyor, araç çıktılarını alıyor, geçmişi sıkıştırıyor, işe devam ediyor ve bunu sürekli tekrarlıyor. Her bir döngü de faturaya yazılan yeni bir model çağrısı demek.

## İlk sayımım neden düşük kaldı

İlk taramada yaklaşık 12,89 milyar Codex token'ı buldum. Bu sayı, her thread ya da oturum için tek bir toplam token sayacı tutan yerel bir Codex state veritabanından geliyordu. Faydalıydı, ama maliyet tablosunu eksik yansıtıyordu.

Daha derin bir tarama, Codex muhasebesinin üç katmanını ortaya çıkardı.

| Katman | Neyi ölçtü | Sonuç |
|---|---|---:|
| Oturum sonu sayaçları | Yerel Codex oturumu başına bilinen son toplam | 12,89 M |
| Aylık Codex raporu | Modele ve token sınıfına göre uzlaştırılmış aylık kullanım | 22,94 M raporlanan token, 8.926,98 $ |
| Ham `last_token_usage` event'leri | JSONL loglarından ayrıştırılan istek başına event akışı | 23,98 M istek token'ı, cache dahil yaklaşık 46,53 M |

Yayınlayacağım sayı aylık rapor. Ham event taraması faydalı bir üst sınır kontrolü sağlıyor; ancak devam ettirilen oturumlar, zaman damgası gruplaması, mükerrer telemetri ya da farklı raporlama aralıkları yüzünden sonuçlar farklı çıkabiliyor.

Önemli düzeltme şu: Codex için fatura benzeri bir sayı istiyorsan, istek başına kullanımı topla ya da aylık kullanım raporunu kullan. Sadece oturum sonu `tokens_used` sayacına güvenme.

Yerel uygulama state'ini, veritabanlarını, JSONL dosyalarını ve varsa sağlayıcı uç noktalarını (endpoint) kontrol ettim. Prompt içeriklerini yayınlamadım ve API anahtarlarını sansürledim. Faydalı yerel kaynaklar şunlardı:

| Araç | Faydalı yerel kaynak |
|---|---|
| Codex | `~/.codex/sessions/**/*.jsonl`, `~/.codex/state_5.sqlite`, `~/.codex/logs_2.sqlite` artı aylık rapor ekran görüntüsü |
| opencode | `~/.local/share/opencode/` altında SQLite DB |
| Claude Code ve Claude Desktop | `~/.claude.json`, Claude desktop local-agent denetim günlükleri |
| Aider | `.aider.chat.history.md` dosyaları |
| Goose | `~/.local/share/goose/sessions/` altında JSONL oturumları |
| OpenHands | `~/.openhands/sessions/` altında event JSON dosyaları |
| LM Studio | `~/.lmstudio/conversations/` altında konuşma JSON'u |
| Gemini CLI | `~/.gemini/tmp/*/logs.json` |
| Qwen CLI | `~/.qwen/tmp/*/logs.json` |
| Zed ve Droid | `tokscale` kullanım önbelleği (cache) üzerinden bulundu |
| OpenRouter | Yerel API anahtarları, yönetici yetkisi olmayan anahtarlar ve `/api/v1/key` kontrolleri |
| fal.ai | Yerel proje izleri artı anahtar kontrolleri, ancak kullanılabilir kullanım sayacı yok |
| Lovable ve Replit | Tarayıcı ve proje izleri, kullanılabilir yerel fatura sayacı yok |

Bir de önbelleğe alınmış bir `tokscale` rollup'ı buldum.

```text
~/.config/tokscale/cache/tui-data-cache.json
```

O önbellek şunu raporluyordu:

| tokscale metriği | Değer |
|---|---:|
| Toplam normalize token | 13.537.863.939 |
| Toplam normalize maliyet | 6.438,80 $ |
| Model grupları | 21 |
| Kullanılabilir model grubu olan istemciler | Codex, opencode, Zed, Droid |

Bu sayı faydalı olsa da Codex aylık raporuyla aynı şekilde sayılmıyor. Veriyi farklı normalize edip grupluyor. Ben bunu daha çok gözden kaçırdığım ekstra istemcileri ve maliyet gruplarını bulmak için kullandım.

## Diğer araçlar, tek tek

Codex devasa bir boyuttaydı, ama diğer araçlar da önemliydi.

opencode'da mesaj başına token muhasebesi tutan gerçek bir SQLite veritabanı vardı. Kurtarılan toplamlar şunlar:

| Alan | Sayı |
|---|---:|
| Input token'ları | 18.329.400 |
| Output token'ları | 215.350 |
| Reasoning token'ları | 116.322 |
| Cache okuma | 33.616.558 |
| Cache yazma | 229.289 |
| Toplam token trafiği | 52.504.268 |
| Maliyet | 15,50 $ |

Modeller arasında OpenRouter GLM, OpenRouter üzerinden Gemini preview ve opencode/free model grupları vardı.

Claude'un iki faydalı yerel kaynağı vardı. Biri, proje özet sayaçlarını tutan `~/.claude.json`. Diğeri, model kullanım özetleri içeren Claude Desktop local-agent denetim günlükleri. İkisi birlikte şu veriyi verdi:

| Alan | Sayı |
|---|---:|
| Cache dışı istek token'ları | 2.607.194 |
| Cache token'ları | 115.582.148 |
| Toplam token trafiği | 118.189.342 |
| Maliyet | 276,64 $ |

Bu, cache'in neden önemli olduğunun güzel bir örneği. Claude token trafiğinin çoğu taze prompt ya da output değil, cache okuma ya da oluşturmaydı.

OpenHands, event dosyalarında yanıt başına kullanım bilgisini tutuyordu.

| Alan | Sayı |
|---|---:|
| Prompt token'ları | 71.243.196 |
| Completion token'ları | 520.526 |
| Toplam token | 71.763.722 |
| Kayıtlı maliyet | 0 $ |

Model grubu `openrouter/sonoma-sky-alpha` idi ve yerel muhasebede ücretsiz görünüyordu.

Goose'da kümülatif oturum sayaçları vardı.

| Alan | Sayı |
|---|---:|
| Input token'ları | 66.266.561 |
| Output token'ları | 1.032.059 |
| Toplam token | 67.298.620 |
| Tahmini maliyet | ~30,29 $ |

Güncel Goose yapılandırması OpenRouter'ı `z-ai/glm-4.6` ile gösteriyordu, eski yedeklerde de `x-ai/grok-code-fast-1` vardı. Tekil oturum satırları modeli tutmadığı için Goose maliyetini tahmin olarak ele aldım.

Aider basitti. Token ve maliyet satırlarını sohbet geçmişi dosyalarına yazıyor.

| Alan | Sayı |
|---|---:|
| Gönderilen token'lar | 1.560.000 |
| Alınan token'lar | 122.271 |
| Toplam token | 1.682.271 |
| Maliyet | 4,20 $ |

Aynı geçmiş dosyalarını hash ile tekilleştirdim, böylece bir yedek kopya iki kere sayılmadı.

LM Studio çoğunlukla yerel model kullanımı içeriyor, API harcaması değil. Yine de konuşma JSON'unda üretim istatistikleri vardı.

| Alan | Sayı |
|---|---:|
| Prompt token'ları | 8.796 |
| Tahmin edilen token'lar | 6.981 |
| Toplam yerel üretim token'ı | 15.777 |

Bu, işin içinde uzak bir sağlayıcı yoksa API maliyeti oluşturmuyor ve yerel dosyalar da aksi bir şeyi göstermedi.

Gemini ve Qwen'in yerel günlükleri vardı ancak sağlayıcı tarzı güvenilir token kullanım sayaçları bulamadım. Sadece kaba metin izleri bulabildim.

| Araç | Oturumlar ve mesajlar | Kaba metin tahmini |
|---|---:|---:|
| Gemini CLI | 17 oturum, 76 kullanıcı mesajı | ~38.690 metin token'ı |
| Qwen CLI | 2 oturum, 9 kullanıcı mesajı | ~163 metin token'ı |

Bunları faturalanabilir sağlayıcı kullanımı olarak saymadım. Sadece kaba metin boyutu tahminleri.

Zed ve Droid, `tokscale` önbelleğinden geldi, uygulamaya özel günlükleri elle ayrıştırmadım.

| Araç | Token trafiği | Maliyet |
|---|---:|---:|
| Zed | 19.617.168 | 56,59 $ |
| Droid | 4.219.875 | 29,70 $ |

## OpenRouter, fal.ai, Lovable ve Replit

Sağlayıcıya yakın araçları ve hesap izlerini de kontrol ettim. Daha derin yerel tarama; yapılandırma klasörlerini, agent state klasörlerini, proje dizinlerini, tarayıcı uygulama verilerini, paket önbelleklerini ve bilinen CLI state'ini OpenRouter, fal.ai, Lovable ve Replit kalıntıları için taradı. Proje kodu, SDK paketleri, fiyatlandırma önbellekleri, yapılandırma dosyaları ve tarayıcı ile proje izleri buldu, ancak eksik sağlayıcılar için gerçek bir yerel fatura defteri bulamadı.

OpenRouter'la başlayalım. Araç yapılandırmalarında üç yerel OpenRouter API anahtarı buldum. OpenRouter trafiğinin çok daha yüksek olduğundan şüphelendiğim için, elimdeki bir OpenRouter anahtarını daha test ettim. Her anahtarla OpenRouter mevcut anahtar uç noktasını sorguladım ve anahtar değerlerini sansürledim. Sonuçlar şunlar:

| Anahtar kaynağı | Mevcut anahtar kullanımı | Hesap geneli erişim |
|---|---:|---|
| Aider anahtarı | 4,820189682 $ | Hayır |
| OpenHands anahtarı | 0 $ | Hayır |
| Refact anahtarı | 0,063351337 $ | Hayır |
| Sağlanan test anahtarı | 0 $ | Hayır |

Sonra hesap etkinliği için OpenRouter'ın `/api/v1/activity` uç noktasını denedim. Her anahtar aynı şeyi döndürdü:

```text
Only management keys can fetch activity for an account
```

Yani OpenRouter kontrolü tüm hesap geçmişini kapsamıyor. Sadece o spesifik API anahtarlarının görebildiği kullanımı raporluyor.

Sağlanan anahtar da yönetici anahtarı listeleme uç noktasında hata verdi:

```text
Invalid management key
```

OpenRouter, `/api/v1/activity` uç noktasının son 30 UTC günün aktivitesini döndürdüğünü ve bir yönetici anahtarı gerektirdiğini belirtiyor. Normal bir API anahtarı kendi güncel kullanımını raporlayabilir, ama tüm hesabı raporlayamaz.

Bu demek oluyor ki, hesapta daha yoğun bir kullanım, silinmiş anahtarlar, döndürülmüş anahtarlar, BYOK aktivitesi ya da yerel günlük tutmayan başka uygulamalar varsa, makaledeki OpenRouter sayısı neredeyse kesinlikle düşük. Eksik OpenRouter harcamasını dahil etmek için bana `/api/v1/activity` erişimi olan bir OpenRouter yönetici anahtarı lazım ya da aylık kullanım için bir pano dışa aktarımı, ekran görüntüleri veya tüm geçmiş API anahtarlarının listesi gerekli.

Yönetici anahtarı ile hesap seviyesi çağrı şu şekilde:

```bash
curl https://openrouter.ai/api/v1/activity \
  -H "Authorization: Bearer $OPENROUTER_MANAGEMENT_KEY"
```

Tek bir normal anahtar için sınırlı çağrı ise bu:

```bash
curl https://openrouter.ai/api/v1/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

İlk uç nokta gün, model ve sağlayıcı başına aktivite verebiliyor. İkincisi sadece o anahtarın şu an ne raporladığını söyleyebiliyor.

## fal.ai bambaşka bir hesap

Bir de fal.ai meselesi var. Sistemde fal.ai kodlarına ve proje izlerine rastladım; buna metinden konuşmaya ve konuşmadan metne deneyleri de dahil. Ancak hesap kullanımını gösterecek yerel bir fatura sayacı bulamadım. fal.ai trafiğinin çok daha yüksek olduğundan şüphelendiğim için, elimdeki bir fal.ai anahtarını hesap faturalandırma ve kullanım tarzı endpoint’lerinde test ettim.

Sonuç önemliydi. Anahtar, sıfır harcama yaptığını kanıtlamadı. Sadece bu anahtarın fatura dökümünü görme yetkisi olmadığını kanıtladı.

| fal.ai kontrolü | Sonuç |
|---|---|
| Hesap faturalandırması | Yetkilendirme hatası, anahtarın bu işlemi yapma izni yok. |
| 01.01.2024 - 19.05.2026 arası model kullanımı | Sadece hata nesnesi döndü, toplanacak veri satırı yok. |
| Son 90 günün fatura hareketleri | Sadece hata nesnesi döndü, toplanacak hareket yok. |

Bu çağrılar yetkilendirme hatası verdiği için rapora `$0` eklemedim. `$0` yanıltıcı olurdu. İşin aslı "bilinmiyor ve muhtemelen eksik" olması.

Ayrıca fal.ai, LLM token hesaplamasıyla da tam örtüşmüyor. Dokümanlarında model faturalandırmasının başarılı çıktılar ve modele özel faturalandırma birimleri üzerinden, ön ödemeli kredilerle yapıldığı yazıyor. Yani fal denetimi için sadece yerel token ayrıştırması yetmez, bir fal dashboard’u ya da API anahtarı lazım.

Bu rakam muhtemelen olduğundan daha düşük. fal.ai kullanımı genellikle yerel uygulama loglarında değil, dashboard’da tutuluyor. Yerel uygulama fal’ı çağırıp ses, görüntü veya video çıktısı linklerini alıyor ama harcanan birimi veya kredi düşüşünü asla kaydetmiyor. fal.ai’ı dahil edebilmem için fal.ai dashboard fatura veya kullanım dökümü, kredi alımları ve harcamalarını gösteren bir ekran görüntüsü veya CSV, ya da hesapta varsa fatura/kullanım endpoint’lerini okumaya yetkili bir fal.ai yönetici veya ekip anahtarı lazım.

İşin püf noktası şu; fal.ai’ı LLM metniymiş gibi token tablosuna koymamak lazım. Kendi harcama kalemi olması gerekiyor.

| fal.ai metriği | Nasıl raporlanmalı |
|---|---|
| Yakılan kredi | Toplam dolar harcamasına ekle |
| Ses, video ve görsel üretimleri | Çıktı birimi olarak raporla |
| Metin tokenları | Sadece ilgili fal modeli token kullanımını açıyorsa dahil et |

Yani düzeltilmiş gelecek başlığı muhtemelen şu olmalı: "Yerel olarak kanıtlanmış 45 milyar+ AI token-olayı, artı OpenRouter ve fal.ai dashboard harcamaları eklenecek".

Lovable için şunları buldum:

```text
lovable.dev tarayıcı IndexedDB izleri
magic-prf.lovable.app tarayıcı IndexedDB izleri
yerel .lovable proje meta verileri
lovable-tagger paketleri
lovable yükleme klasörleri
```

Yerel token, kredi veya fatura sayacı bulamadım. Lovable'ı yerel tarayıcı IndexedDB dosyalarından değil, dashboard üzerinden denetlemek en iyisi.

Replit için proje meta verilerine, tokenlara, yerel veritabanlarına ve tarayıcı izlerine baktım. Kullanılabilir bir yerel kullanım sayacı bulamadım.

## Rakamları nasıl çıkardık

Kabaca izlediğim yol şuydu:

1. Muhtemel AI aracı dizinlerini listele.
2. Sohbet içeriklerini dökmeden kullanım alanlarını ara.
3. SQLite, JSONL, JSON ve Markdown geçmişleri gibi yapılandırılmış depoları tanımla.
4. Sadece toplam sayaçları ayrıştır.
5. Mümkünse geçmişleri ve oturum özetlerini tekilleştir.
6. Yerel sayaçları sağlayıcı dokümanları ve endpoint’leriyle çapraz kontrol et.
7. İstek tokenlarını önbellek trafiğinden ayır.

İlk geniş taramada yüklü araç durumuna baktım.

```bash
find ~ -maxdepth 3 -type d \
  | rg -i 'codex|claude|opencode|gemini|qwen|goose|aider|openhands|cursor|windsurf|zed|replit|lovable|lmstudio|ollama'
```

Sonra kullanım alanlarını aradım.

```bash
rg -n -i 'input_tokens|output_tokens|total_tokens|cached_tokens|cache_read|usage|cost' \
  ~/.codex ~/.claude ~/.opencode ~/.gemini ~/.qwen ~/.local/share/goose ~/.openhands ~/.lmstudio
```

Codex için anlamlı olay şöyle görünüyordu:

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

Kritik keşif şuydu: `total_token_usage` oturum boyunca birikerek artıyor. Eğer her `total_token_usage` satırını toplarsanız, rakamı gereksiz yüksek hesaplarsınız. Fatura tarzı bir muhasebe için isteğe özel `last_token_usage` veya mutabık kalınmış bir kullanım raporu lazım.

Basitleştirilmiş bir Codex ayrıştırıcısı şöyle:

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

opencode gibi SQLite tabanlı araçlar için yöntem farklıydı.

```bash
sqlite3 ~/.local/share/opencode/opencode.db ".schema"
```

Burada mesaj tablosundaki JSON alanlarını, özellikle de kopyalanmış kısmi satırları değil `tokens` nesnesini ayrıştırıyorsunuz.

Aider için kullanım düz metin halindeydi.

```bash
rg -n 'Tokens: .* sent, .* received|Cost:' ~/Developer ~/.aider
```

OpenRouter'da mevcut anahtar kullanımı için:

```bash
curl https://openrouter.ai/api/v1/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

OpenRouter'da hesap genelindeki aktivite için:

```bash
curl https://openrouter.ai/api/v1/activity \
  -H "Authorization: Bearer $OPENROUTER_MANAGEMENT_KEY"
```

İkinci komut bir yönetim anahtarı gerektiriyor.

## Maliyet rakamları nereden geliyor

Üç tür maliyet verisi kullandım: Doğrudan aracın logladığı maliyetler, Codex aylık kullanım raporunda görünenler ve yerel loglarda token olup maliyet bilgisi olmayan durumlar için güncel halka açık fiyat tahminleri.

Fiyatlandırma için OpenAI API fiyat listesi; GPT-5.5, GPT-5.4 ve GPT-5.3-Codex için 1 milyon token başına güncel fiyatları veriyor. OpenAI’ın Codex fiyat kartı, token tabanlı hesaplamaya geçişi açıklıyor ve giriş, önbellekli giriş ve çıkış kredilerini ayırıyor. Anthropic, Claude fiyatlarını model ve token sınıfına göre yayınlıyor. OpenRouter `/api/v1/key` ile mevcut anahtar kullanımını gösteriyor, tüm aktivite için yönetim anahtarı gerekiyor. fal.ai ise model API'lerini başarılı çıktılar ve modele özel faturalandırma birimleri üzerinden ön ödemeli kredilerle ücretlendiriyor.

Bu maliyet tahmini kusursuz bir fatura değil. "API tarzı fiyatlarla bu neye benzerdi?" sorusunun cevabı. Bazı kullanımlar aboneliklere, ücretsiz planlara, araştırma ön izlemelerine veya şirket içi tahsisatlara dahil olabilir. Bazı yerel loglar, gerçekleşen sağlayıcı faturası yerine tahmini maliyeti kaydediyor.

## Ajan kullanımı neden bu kadar artıyor

Şaşırtıcı olan makinenin AI kullanması değil. Şaşırtıcı olan, ajanların bağlamı (context) ne kadar hızlı çoğalttığı.

Normal bir sohbet, temel olarak bir kullanıcı istemi ve asistan cevabıdır. Ajanlı bir kodlama döngüsü ise daha çok şuna benziyor:

1. Kullanıcı değişiklik ister.
2. Ajan repo dosyalarını okur.
3. Model çağrısı.
4. Ajan aramalar yapar.
5. Model çağrısı.
6. Ajan testleri çalıştırır.
7. Model çağrısı.
8. Ajan hataları okur.
9. Model çağrısı.
10. Ajan dosyaları düzenler.
11. Model çağrısı.
12. Ajan doğrular.
13. Model çağrısı.

Her adımda sistem talimatları, geliştirici talimatları, araç tanımları, önceki sohbet, dosya parçaları, komut çıktıları, diff’ler, test hataları, ekran görüntüleri, tarayıcı durumu ve güvenlik politikaları yer alabilir.

İşte bu yüzden Codex'teki önbellek okuma (cache-read) tokenları, taze istek tokenları kadar yüksekti.

| Codex kategorisi | Tokenlar |
|---|---:|
| Taze giriş + çıkış + mantık yürütme | 23.05 milyar |
| Önbellek okuma | 21.58 milyar |

Önbellek bunu normalde olacağından daha ucuza getiriyor ama aynı zamanda ajan kullanımının gerçek yüzünü de gösteriyor. Bağlam, işin asıl yakıtı.

## Öğrendiklerim

Birincisi, "toplam token" konusu oldukça muğlak. Bir paneldeki toplam veri, oturum sayacı, istek bazlı ham veri ve servis sağlayıcı faturası; hepsi teknik olarak doğru olsa da birbirinden tamamen farklı sayıları gösterebiliyor.

İkincisi, lokal loglar inanılmaz işe yarıyor. Birçok araç, promptları hiçbir yere göndermeden kullanım detaylarını yeniden oluşturmaya yetecek kadar meta veriyi sessizce saklıyor.

Üçüncüsü, servis sağlayıcıların panelleri hala kritik. OpenRouter, fal.ai, Lovable, Replit gibi servisler tam fatura geçmişini lokalde tutmayabiliyor. Bu yüzden o panellerdeki verilere veya kapsamlı yönetim anahtarlarına (API key) ihtiyacınız oluyor.

Dördüncüsü, agentic coding çıktı uzun olduğu için pahalı değil. Asıl maliyet, girdi bağlamı devasa olduğu ve sürekli tekrar tekrar okunduğu için ortaya çıkıyor.

Benim durumumda, görünen model cevapları toplam tutarın sadece küçük bir parçasıydı. Asıl masraf bağlamda, araç çıktıları (tool output), repo incelemeleri ve önbelleğe alınmış promptların sürekli yeniden kullanımıyla patladı.

Yani bunu tek bir cümlede özetlemem gerekseydi, şu olurdu:

> Mac'imdeki ulaşabildiğim tüm AI araçlarını denetledim. Makine, 45 milyar civarında token-event ve yaklaşık 9.3 bin dolarlık API kullanımına dair kanıt çıkardı. Bunun neredeyse tamamı, agentic coding işleri yapan Codex'ten geldi.

## Referanslar

- OpenAI API fiyatlandırması, https://developers.openai.com/api/docs/pricing
- OpenAI Codex fiyat listesi, https://help.openai.com/en/articles/20001106-codex-rate-card
- Anthropic Claude fiyatlandırması, https://platform.claude.com/docs/en/about-claude/pricing
- OpenRouter güncel key endpoint'i, https://openrouter.ai/docs/api/api-reference/api-keys/get-current-key
- OpenRouter aktivite endpoint'i, https://openrouter.ai/docs/api/api-reference/analytics/get-user-activity
- fal.ai fiyatlandırma modeli, https://fal.ai/docs/documentation/model-apis/pricing
- fal.ai kimlik doğrulama, https://fal.ai/docs/documentation/setting-up/authentication

![cover](../../../media/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events/cover.webp)
