---
title: "Agent ready aslında ne demek"
description: "Dört açık tarayıcı artık AI ajanlarının sitenizi okuyup okuyamayacağını puanlıyor. Her birinin ne ölçtüğünü, statik bir host'un hangi kontrolleri asla geçemeyeceğini ve puanı hangi dosyalarla…"
date: "2026-09-11"
updated: "2026-09-11"
lang: tr
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
tldr: ["Agent readiness bir plugin değil.", "Bir dizi HTTP davranışı bu: RFC 8288 Link header'ları, Accept tabanlı Markdown pazarlığı, well-known keşif dosyaları ve dürüst, makine tarafından okunabilir metadata.", "Dört açık tarayıcı bunu puanlıyor ve birbirleriyle uyuşmuyorlar.", "Saf statik bir host, kaç dosya eklerseniz ekleyin, header kontrollerini asla geçemez."]
sections: [{"basically": "Arama botu sayfanızı sıralamak ister. Ajan ise sayfayı atlayıp doğrudan API'nizi çağırmak ister."}, {"basically": "Dört tarayıcı, dört farklı soru. Tek bir agent-ready puanı diye bir şey yok."}, {"basically": "Link header'ları ve Markdown pazarlığı yanıt davranışıdır. Hiçbir statik host bunu taklit edemez."}, {"basically": "llms.txt dosyanızın ilk paragrafı, asistanların alıntılayacağı cümledir. Boşa harcamayın."}, {"basically": "Metadata bir sözdür. Yanlış bir sözün peşinden giden ajan, kibarca tekrar denemez."}, {"basically": "Önce önüne bir server koy. Ondan önce eklediğin her dosya, host'un tavanına takılır."}, {"basically": "Tarayıcılar sürekli kontrol ekliyor. Geçen ayın 100 puanlık ekran görüntüsü bugün hiçbir şey kanıtlamaz."}]
---
## İnsanlar bunu neden puanlamaya başladı?

Yirmi yıl boyunca bir web sitesine gelen ve gerçekten önemsenen tek robot, arama motoru botuydu. İstediği şey HTML, bir sitemap ve bir robots.txt dosyasıydı. Bütün sektör de onu beslemek üzerine koca bir uzmanlık alanı kurdu.

Bu varsayım sessizce çöktü. Artık bir siteye gelen istemciler arasında metin okuyan, özet çıkaran ve kaynak gösteren modeller var. Üstelik dizin oluşturmak yerine doğrudan bir görevi tamamlamaya çalışan ajanlar (agent) dolaşıyor ortalıkta. Hepsinin iştahı farklı. Arama motoru botu sayfanı sıralamaya sokmak ister. Bir model, içinden alıntı yapabileceği tek bir paragrafın peşindedir. Bir ajan ise makine tarafından okunabilen katmanı bulup web sayfanı tamamen pas geçmek ister.

Bu üçü, aynı URL adresinden bambaşka şeyler bekliyor. Bir sayfanın Google için mükemmel şekilde optimize edilmişken bir ajan için tamamen işe yaramaz olmasının sebebi bu. İşte bu uçurumu ölçmek için tarayıcılar (scanner) çıktı piyasaya.

## Dört tarayıcı ve her birinin aslında neyi ölçtüğü

Ajanlara hazır olma durumunu (agent readiness) puanlayan halka açık dört araç var ve hepsi farklı şeyleri ölçüyor. Bunları tek bir skor gibi görmek yapılan ilk hata.

isitagentready.com, keşif altyapısı (discovery plumbing) konusunda en katı olanı. robots.txt, sitemap, RFC 8288 Link header'ları, DNSSEC doğrulamalı DNS-AID servis kayıtları, Markdown içerik müzakeresi (content negotiation), yapay zeka bot kuralları, Content-Signal header'ları, Web Bot Auth ve ardından upuzun bir well-known belge listesini kontrol ediyor: API kataloğu, OAuth discovery, auth.md, MCP sunucu kartı, A2A ajan kartı, ajan yetenekleri, WebMCP. E-ticaret kontrolleri ayrı bir kategoride duruyor ve içerik siteleri için nötr kalıyor.

PageSpeed Insights, klasik dört kategoriyi puanlıyor. Bir de son Chrome sürümlerinde, llms.txt geçerliliğini ve ajan erişilebilirlik ağacını (agent accessibility tree) denetleyen bir Ajanik Gezinme (Agentic Browsing) kategorisi var. Buradaki tuzak biraz ters köşe: llms.txt hiç yoksa Not Applicable deyip geçiyor, ama dosya var olup geçersizse doğrudan çakılıyorsun. Dosyadaki çıplak URL'ler "Dosya herhangi bir bağlantı içermiyor gibi görünüyor" hatası veriyor. Girdilerin gerçek Markdown linkleri olması şart.

Ora taramasını baz alan Is Agentic ise sahtekarlığı affetmeyen araç. Temel gereksinimlere (essentials) 80 puan ağırlık veriyor. Her OpenAPI işleminde tipleri belirlenmiş şemalar, kimlik doğrulaması istemeyen gerçek bir JSON endpoint'i, fiili bir MCP el sıkışması ve yola göre eşleşen hata gövdeleri arıyor: API yollarında application/problem+json, sayfa yollarında Markdown. Tek bir temel gereksinimi bile kaçırırsan yaklaşık 6.7 puanın gidiyor.

Circle Seller Readiness, sadece ajanlara gerçekten bir şey satıyorsan önemli. Kaynak sunucuda barındırılan OpenAPI, dürüst ödeme meta verileri ve çalışır durumda, ödenmemiş canlı bir 402 sorgusu (challenge) istiyor.

| Tarayıcı | Temel soru | En zor denetim | En iyi kullanım alanı |
| --- | --- | --- | --- |
| isitagentready.com | Bir ajan makine katmanını keşfedebiliyor mu? | DNSSEC doğrulamalı DNS-AID | Keşif altyapısı |
| PageSpeed Agentic Browsing | Sayfa hızlı ve makine tarafından ayrıştırılabilir mi? | Markdown linkleri içeren geçerli llms.txt | Hız ve llms.txt doğruluğu |
| Is Agentic / Ora | API'n dürüst ve tipleri tanımlı mı? | Her işlemde tipleri belirlenmiş şemalar | API kalitesi |
| Circle Seller Readiness | Bir ajan sana ödeme yapabiliyor mu? | Canlı ve ödenmemiş 402 sorgusu | Yalnızca ücretli endpoint'ler |

*Her tarayıcının gerçekte test ettiği şey. Eylül 2026 görünümü.*

## Statik hosting puanını neden kalıcı olarak kısıtlar?

En çok vakit kaybettiren kısım burası. İki denetimin dosyalarla uzaktan yakından alakası yok. Statik bir hosting'e istediğin kadar JSON dosyası yığ, bu iki skoru kıpırdatamazsın bile.

Link header denetimi, HTML yanıtında llms.txt'ye, sitemap'e, OpenAPI belgesine ve well-known kartlarına işaret eden RFC 8288 Link header'ları bekler. Bu bir yanıt (response) header'ıdır. GitHub Pages yanıt header'ı ayarlamana izin vermez.

Markdown içerik müzakeresi ise, normal bir sayfa yoluna Accept: text/markdown ile gelen bir isteğin Content-Type: text/markdown ve bir Vary: Accept header'ı ile dönmesini ister. Bu, istek başına karar verilen bir içerik müzakeresidir. Statik bir dosya sunucusunda her yolun tek bir temsili vardır, hepsi bu.

Yani bu ikisinin çözümü dosya eklemek değil, araya bir süreç koymaktır. Statik çıktının önüne küçük bir kaynak sunucu, bir Worker veya bir reverse proxy koyacaksın. Listedeki diğer her şey gerçekten sadece dosyalardan ibaret ve dosyalar işin kolay kısmı.

Vary: Accept header'ı milletin genelde atladığı bir detay, ama bunu atlamak hiç müzakere yapmamaktan beterdir. Vary olmazsa, önbellek daha önce HTML sunduğu bir sayfayı, sonradan gelip Markdown isteyen bir istemciye de pişkin pişkin HTML olarak vermeye devam eder.

## Hangi dosyalar gerçekten ağırlık taşıyor?

Bayt başına en çok işi llms.txt çıkarır ve çoğu insan bunu yanlış yazar. İlk paragraf, birisi senin ne yaptığını sorduğunda bir asistanın doğrudan alıntılayacağı yerdir. Şirketinin adıyla başlayıp "bir web sitesidir" diye devam ediyorsan, en değerli cümleni çöpe atmışsın demektir. Ürünü tanımla: nedir, ne işe yarar, kimin içindir? Sonra da önemli sayfalarını, her birinin amacını tek bir satırda açıklayan Markdown linkleri olarak sırala.

Sayfa başına Markdown kopyaları ikinci büyük kozundur. Sayfandan bir pasaj çekmeye çalışan bir model, sitendeki menülerle, çerez bildirimleriyle ve footer ile boğuşur. Aynı içeriği tahmin edilebilir bir URL'de tertemiz bir Markdown olarak sunmak, o kavgayı tamamen ortadan kaldırır.

Yapılandırılmış veri (structured data) işin varlık (entity) katmanıdır. knowsAbout içeren Organization, WebSite ve zaten aramalarda çıkan profillerine giden sameAs linklerini barındıran Person. Bir bot senin ne olduğunu on ziyarette tahmin etmek yerine, bu sayede tek bir ziyarette öğrenir.

Well-known belgeleri ucuz ve mekanik işlerdir: application/linkset+json olarak API kataloğu, MCP sunucu kartı, A2A ajan kartı, ajan yetenekleri dizini, WebMCP manifestosu ve /.well-known/ai-catalog.json adresindeki ARD manifestosu. Her biri belirli bir şablona sahip küçük birer JSON dosyasıdır. Şartnameyi oku, kalıbı tuttur, CORS'u açık şekilde sun.

Bahsetmeye değer bir tuzak var: OAuth protected-resource denetimi yol kapsamlıdır (path-scoped). Tarayıcı, /.well-known/oauth-protected-resource/ yolunun arkasına sayfanın tam yolunu ekleyerek sorgu atar. Sadece kök dizinde (root) sunulan bir belge ana sayfadan geçer, ama alt sayfalarda çuvallar.

## İnsanın yalan söyleyesinin geldiği yer

Bu tarayıcıların hepsi kandırılabilir, ama onları kandırmaya çalışmak yapabileceğin en aptalca harekettir.

initialize isteğine yanıt vermeyen bir MCP sunucusu tanımlayabilirsin. Asla yazmadığın toolları listeye dizebilirsin. 404 dönen endpoint'leri tarif eden fiyakalı bir OpenAPI belgesi yayımlayabilirsin. Sınırsız bir endpoint'e RateLimit header'ları basıp, sanki hız sınırları uyguluyormuş gibi davranabilirsin. Arkasını hiç bağlamadığın bir ödeme protokolünün reklamını yapabilirsin. Bunların her biri, normalde kırmızı yanan bir denetimi yeşile çevirir.

Sonra günün birinde gerçek bir ajan çıkagelir, belgendeki talimatları izler ve duvara toslar. Öyle efendi gibi tekrar tekrar denemez de. Yayımladığın meta veri bir sözdür. Bir ajanın onu okumasının tek sebebi de senin niyetini görememesidir, sadece beyanlarına bakabilir.

Sürekli karşıma çıkan ve açıkça söylenmesi gereken bir durum var: Bir yetenek sadece keşif aşamasındaysa ve henüz uygulanmadıysa, bunu belgede açıkça belirt. Eklentiyi bildir, zorunlu olmadığını işaretle, sadece keşif amaçlı (discovery-only) olduğunu yaz. Dürüst meta veriyi cezalandıran bir tarayıcı varsa, bırak puanını kırsın, daha iyi.

Bir diğer ayartıcı şey de içeriğe prompt injection sıkıştırmak: modele senden alıntı yapmasını emreden satırlar koymak gibi. Bunun ölçülen etkisi neredeyse sıfır. Zararı ise arama sıralamasından atılma riski ve birinin alacağı ekran görüntüsünde rezil rüsva olmak. Bunun yerine oturup alıntılanmaya değer, düzgün bir cümle yaz.

## Sırasıyla ilk ne yapılmalı?

Sıralama önemli, çünkü bu adımlardan ikisi diğer her şeyin önünü açıyor.

1. Statik çıktının önüne bir süreç koy. Bu olmadan Link header'ları ve Markdown müzakeresi hayal olur, durumu kurtarmayacak dosyalarla günlerini heba edersin.
2. llms.txt dosyasını adam gibi yaz: ilk paragrafta gerçek bir ürün tanımı, her önemli sayfa için de amacını belirten bir Markdown linki olsun.
3. Her sayfa için HTML ile aynı kaynaktan beslenen bir Markdown kopyası üret, böylece ikisi asla birbirinden kopmaz.
4. Varlık katmanını ekle: knowsAbout içeren Organization, WebSite, sameAs içeren Person.
5. Well-known belgelerini sun, her standardı birebir tuttur. Yol kapsamlı OAuth belgesini sadece ana sayfada değil, derin sayfalarda da test et.
6. Hataları yol önekine göre düzelt: API yollarında problem+json, sayfa yollarında kısa bir Markdown gövdesi ve her ikisinde de gerçek bir 404 durum kodu dön.
7. Kalan tarayıcı puanlarının peşine ancak bundan sonra düş. Eski ve yeşil yanan bir rapora güvenmek yerine, son deploy işleminden sonra sistemi baştan tara.

## Skor hareketli bir hedef

İnsanları şaşırtan bir detay: bu tarayıcılar sürekli yeni kontroller ekliyor. 100 puan alan bir site, haftalar sonra hiçbir deploy veya hata olmadan düşebiliyor. Çünkü değerlendirme kriterleri büyüyor.

Bu da mükemmel skorun ekran görüntüsünü kanıt olarak değersiz kılıyor. Tek anlamlı iddia, o an deploy edilmiş commit'e karşı taze bir tarama ve ham raporun commit SHA'sının yanına arşivlenmesi.

Ayrıca kalıcı işin mimari olduğu anlamına geliyor, kontrol listesi değil. HTML, Markdown, şema, site haritası ve llms.txt'yi tek bir içerik kaynağından üreten bir site, yeni bir kontrolü tek bir jeneratör ekleyerek karşılıyor. Bu beş yüzeyi elle yöneten bir site ise her seferinde beş dosyalık bir diff ve bir drift hatası alıyor.
