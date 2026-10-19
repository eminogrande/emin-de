---
title: "Continuous Clearing Auctions (CCA) nasıl çalışır: Teknik detaylar"
description: "Uniswap'in CCA mekanizması, bir token'ı birçok blok boyunca tek ve adil bir fiyattan satıyor, ardından elde edilen fonla Uniswap v4 havuzuna likidite sağlıyor. İşte matematiği ve bir örnek."
date: "2025-12-02T18:15:02Z"
updated: "2025-12-02"
lang: tr
translated_from: "en/continuous-clearing-auctions-cca-technical-overview"
source_sections: ["setup-and-bidding", "how-one-block-clears", "a-simple-example-with-numbers", "uniswap-v4-and-how-it-compares", "compared-to-other-launch-formats", "the-aztec-sale", "sources"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/continuous-clearing-auctions-cca-technical-overview/cover.webp"
tldr: ["Continuous Clearing Auctions, bir token'ı birden fazla blok süresince satar ve her blok tek bir sabit fiyatla temizlenir.", "Teklif verenler bir kez miktar ve maksimum fiyat belirler; protokol, bu teklifi kalan bloklara paylaştırır.", "Satış tamamlandığında, sonuç doğrudan Uniswap v4 havuzuna aktarılır.", "Aztec Network'ün halka açık token satışı, bu mekanizmanın ilk büyük ve gerçek kullanım örneğidir."]
sections: [{"basically": "Proje; arzı, süreyi ve satış kurallarını belirler. Teklif verenler ise maksimum fiyatlı tek bir emir girer."}, {"basically": "Her blok, talebin arzı karşıladığı en düşük fiyat olan marjinal fiyat üzerinden temizlenir."}, {"basically": "1.000 token ve on teklif veren: G, D ve B 2,20 seviyesinden alım yapar, emirleri yaklaşık 0,909 oranında ölçeklenir."}, {"basically": "Müzayedenin nihai durumu ilk v4 likiditesini oluşturur; yani fiyat keşfi süreci, aynı zamanda havuzu da fonlar."}, {"basically": "Sabit fiyat mekanizması sayesinde, Hollanda usulü veya ani AMM lansmanlarının aksine; kimin içeri gireceğine hız veya botlar karar vermez."}, {"basically": "Aztec, halka arzını bir CCA kontratı üzerinden yürütüyor ve toplanan parayı v4 havuzuna likidite olarak ekliyor."}, {"basically": "Uniswap blogu, ürün sayfası ve reposu, Aztec'in şartları, Etherscan kontratı ve haberler."}]
---
![](../../../media/continuous-clearing-auctions-cca-technical-overview/cover.jpg)

# Sürekli Takas Açık Artırmaları (CCA) nasıl çalışır, teknik versiyonu

Sürekli Takas Açık Artırmaları, yani CCA, Uniswap'tan (Universal Navigation Inc.) zincir üstü bir açık artırma protokolü. Fikir şu: bir token'ı birçok periyoda bölerek satmak ve sonra likiditeyi doğrudan bir Uniswap v4 havuzuna aktarmak. Bir proje, birçok ayrı açık artırma bloğuna yayılan bir satış kuruyor. Teklif verenler bir miktar ve bir fiyat gönderiyor, protokol bunu bloklara bölüyor ve her blok, gelen talebe göre tek bir ortak piyasa fiyatından takas ediliyor.

Kendi akıllı kontrat sistemi olarak inşa edilmiş, bir Sürekli Takas Açık Artırması kontratı artı bir factory, ve Uniswap Liquidity Launcher ile birlikte kullanılması amaçlanıyor. Aztec Network'ün halka açık token satışı bunun ilk büyük gerçek kullanımı.

## Kurulum ve teklif verme

Nasıl çalışıyor? Önce kurulum. Bir proje en azından satılacak toplam token miktarını `Q_total` ve açık artırmanın ne kadar süreceğini tanımlıyor, blok sayısı ya da zaman aralığı olarak. Ayrıca başlangıç fiyatı ve belki bir taban fiyat ya da rezerv eğrisi gibi bazı başlangıç yönlendirmeleri belirliyor. Sonra mezuniyet koşulları, yani satışın bitip bitmediğini ve başarılı olup olmadığını belirleyen kontroller, örneğin toplanan minimum sermaye, minimum ortalama fiyat ya da başka kriterler. Ve likidite sağlama kuralları, yani toplanan varlıkların ve kalan token'ların ne kadarının sonunda bir Uniswap v4 havuzuna gideceği. Satış penceresi boyunca açık artırma kontratı token'ın tek satıcısı.

Sonra teklif. Teklif veren, maksimum harcama ya da istediği miktar ve kabul ettiği en yüksek fiyat `P_max` ile tek bir emir gönderiyor. Minimum fill miktarı gibi başka istekler de ekleyebiliyor. Protokol bu teklifi kalan tüm açık artırma bloklarına yayıyor ve her blokta teklifin bir kısmı fiyat keşfine katılıyor.

## Bir blok nasıl takas edilir

Belirli bir `t` bloğu için, `S_t` blok `t` için token arzı olsun ve `B_t` blok `t` için aktif teklif dilimlerinin multiset'i olsun, her biri `(P_max_i, Q_i^t)` ile.

Bloğun takas fiyatı `P_clear_t`, o fiyatta veya üzerindeki toplam talebin `S_t`'yi zayıfça aştığı en düşük fiyattır. Yani tüm `P_max_i`'leri yüksekten düşüğe sıralıyorsun ve eşleşen `Q_i^t`'leri topluyorsun, ta ki

\[
\sum_{i: P_{\text{max},i} \ge P_{\text{clear},t}} Q_i^t \ge S_t
\]

ve sonra `P_clear_t` o blok için eşik fiyat oluyor.

`t` bloğundaki tüm dolan dilimler `P_clear_t` fiyatından işlem görüyor. Takas fiyatında veya üzerindeki talep `S_t`'den kesin olarak büyükse, pro rata olarak ölçekleniyorlar.

Bu ölçekleme marjda gerçekleşiyor. Bloğu dolduran son fiyat seviyesi aşırı talep görmüşse, protokol tam o eşik fiyatta oturan teklif verenleri ölçekliyor. `D_strict`, `P_max > P_clear_t` olan tekliflerden gelen toplam talep ve `D_equal`, `P_max = P_clear_t` olan tekliflerden gelen toplam talep olsun. Eğer `D_strict ≥ S_t` ise, her şey eşiğin kesin olarak üzerinde doluyor ve biraz daha yüksek bir takas fiyatı seçiliyor. Değilse, kalan kapasite `S_t - D_strict` ve `P_clear_t`'deki teklifler şöyle ölçekleniyor

\[
\text{allocation}_i = Q_i^t \times \frac{S_t -
D_{\text{strict}}}{D_{\text{equal}}}
\]

ve her tahsis tam olarak `P_clear_t` ödüyor.

Ve bir maksimum fiyat güvenliği var. Her teklif veren `i` ve her blok `t` için, eğer

\[
P_{\text{clear},t} > P_{\text{max},i}
\]

ise, o blok için dilimleri çalışmıyor. Kullanılmayan dilimler, açık artırma devam ettiği sürece sonraki bloklar için orada kalıyor ya da satışın kurallarına bağlı olarak geri çekebiliyorsun.

## Basit bir sayısal örnek

Basit tutmak için, tek bloklu bir açık artırma alalım. Bu bloktaki arz `S = 1,000` token ve 10 katılımcı var, her biri `(P_max, Q)` ile şöyle.

| Katılımcı | Maksimum Fiyat `P_max` | Miktar `Q` |
|------------|-------------------|--------------|
| A | 1.80 | 150 |
| B | 2.20 | 200 |
| C | 1.00 | 50 |
| D | 2.50 | 400 |
| E | 0.90 | 80 |
| F | 1.60 | 120 |
| G | 3.00 | 500 |
| H | 2.00 | 200 |
| I | 1.20 | 100 |
| J | 0.75 | 40 |

Şimdi teklif verenleri `P_max`'a göre yüksekten düşüğe sırala ve talebi topla.

| Sıra | Katılımcı | `P_max` | `Q` | Kümülatif Talep |
|------|-------------|---------|-----|-------------------|
| 1 | G | 3.00 | 500 | 500 |
| 2 | D | 2.50 | 400 | 900 |
| 3 | B | 2.20 | 200 | 1,100 |
| 4 | H | 2.00 | 200 | 1,300 |
| 5 | A | 1.80 | 150 | 1,450 |
| ... | diğerleri | ≤ 1.60 | ... | ... |

B'yi dahil ettiğimizde ilk kez `S = 1,000` arzını geçiyoruz. Yani takas fiyatı

\[
P_{\text{clear}} = 2.20
\]

Uygun teklif verenler `P_max ≥ 2.20` olanlar, yani G 500 ile, D 400 ile ve B 200 ile. Toplam uygun talep

\[
D_{\text{eligible}} = 500 + 400 + 200 = 1{,}100
\]

ve marjdaki pro rata faktörü

\[
\alpha = \frac{S}{D_{\text{eligible}}} = \frac{1{,}000}{1{,}100} \approx
0.909
\]

Bu da şu nihai tahsisleri veriyor.

| Katılımcı | Talep | Tahsis `= Q × α` | Ödenen Fiyat |
|------------|--------|----------------------|------------|
| G | 500 | 454.5 | 2.20 |
| D | 400 | 363.6 | 2.20 |
| B | 200 | 181.8 | 2.20 |

Diğer herkes bu blokta sıfır alıyor. Kimse belirlediği `P_max`'tan fazlasını ödemiyor ve dolan her birim aynı ortak fiyattan, `2.20`'den işlem görüyor. Çok bloklu bir açık artırma sadece bu mantığın tekrarı, her blok için kendi token payı ve aktif teklif dilimleriyle çalıştırılıyor.

## Uniswap v4 ve karşılaştırma

Uniswap'ın versiyonunda CCA kendi başına bir protokol, ama satış bittiğinde hook'lar aracılığıyla doğrudan bir Uniswap v4 havuzuna beslenmek üzere inşa edilmiş. Açık artırmanın son durumu, yani toplanan toplam sermaye, son takas fiyatı ve kalan token'lar, ilk likidite pozisyonunu kuruyor. Yani açık artırma fiyat keşif aşaması ve aynı zamanda havuzu önceden fonluyor, ve daha sonra likiditeyi bulmak için ayrı bir adıma gerek kalmıyor. Aztec satışı tam olarak bunu kullanıyor. CCA kontratı fiyat keşfini yapıyor ve Ethereum üzerindeki özel bir "Aztec: Continuous Clearing Auction" kontrat adresi teklifleri ve fill'leri takip ediyor.

## Diğer lansman formatlarıyla karşılaştırınca

Bir de sabit fiyatlı satışa bak. Orada proje baştan tek bir fiyat belirler ve alokasyon bitene kadar ilk gelen alır. Kimin erken gireceğini gecikme ve gas bidding belirler, üstelik fiyat çoğu zaman yanlıştır. Ya ihraççı masada para bırakır ya da alıcılar ikincil işlemler başlar başlamaz slippage yer. CCA'da ise clearing price her bloğun order book'undan çıkar, alokasyon işlemin ne kadar hızlı olduğuna değil, ne kadar fiyata tolerans gösterdiğine bağlıdır ve nihai fiyat yapısı gereği toplam talebe oturur.

Hollanda açık artırması yüksekten başlar ve zamanla aşağı iner. Rasyonel katılımcılar arz tükenmeden daha düşük fiyatı yakalamaya çalışır, o yüzden stratejik zamanlama ve blok seviyesinde sniping çok önemlidir. Gördüğün clearing price da uzun vadeli değer tahmininden çok bu zamanlama oyununu yansıtır. CCA'da `P_max` değerini bir kez belirtirsin ve teklifin bloklara bölünerek dağıtılır. Fiyat hareket ettiğinde izleyip yeniden göndermek zorunda değilsin. Üstelik clearing tek bir iniş yolunda değil, bloklarda sürekli gerçekleşir, yani tek bir Hollanda saatinden çok tekrarlanan uniform price açık artırmalarına benzer.

Tek seferlik uniform price açık artırma, yani kapalı teklif usulü, tüm teklifleri bir kerede alır ve marjda pro rata ölçeklendirmeyle tek bir clearing price hesaplar. Ama kendi başına AMM likiditesi oluşturmaz, genelde sonrasında ayrı bir pool oluşturma işlemi gerekir ve katılımcılar bloklar arasında yeni bilgiye tepki veremez. CCA uniform price'ı korur ama clearing'i birçok aralıkta tekrarlar, sonda otomatik olarak bir Uniswap v4 pool'una bağlanır ve her blok net bir fiyat verirken katılımın değiştiği daha uzun satış pencerelerine izin verir.

Bir de AMM anında listeleme var, mesela doğrudan Uniswap v3 veya v4 pool'u açmak. Tokenlar pool'a girer ve işlemler hemen başlar. Erken işlemler ince likiditeye ve yüksek slippage'e çarpar, MEV ve mempool rekabeti lansman fiyatını büyük ölçüde şekillendirir ve gerçek bir clearing price ya da düzenli bir talep eğrisi yoktur. CCA'da satış sırasında işlem yapmanın yerini açık teklif verme alır, fiyat keşfi constant product eğrisi boyunca değil, bir order book'un toplanmasıyla gerçekleşir ve nihai clearing durumu ardından pool'u kurar. Yani satış ve ikincil işlemler iki ayrı fazdır.

## Aztec satışı

Aztec token satışında, Aztec Network'ün kamuya açık açık artırma şartları, fiyat manipülasyonunu azaltması ve açık, zincir üzerinde fiyat keşfini desteklemesi gereken "yeni bir Uniswap Continuous Clearing Auction (CCA) formatından" bahsediyor. Teklifler CCA kontratı üzerinden geçiyor ve bu kontrat clearing price'ları ve token alokasyonlarını tekrar tekrar hesaplıyor. Satıştan sonra kalan tokenların ve toplanan paranın bir kısmının, CCA ve Liquidity Launcher tasarımında belirtildiği gibi bir Uniswap v4 pool'una likidite sağlaması bekleniyor.

## Kaynaklar

Uniswap, Continuous Clearing Auctions, Bootstrapping Liquidity on Uniswap v4 (resmi blog)
https://blog.uniswap.org/continuous-clearing-auctions

Uniswap, Continuous Clearing Auctions Ürün Sayfası
https://cca.uniswap.org/en/

Uniswap, Continuous Clearing Auction Akıllı Kontrat Deposu (GitHub)
https://github.com/Uniswap/continuous-clearing-auction

Aztec Network, Açık Artırma Şartları ve Koşulları
https://aztec.network/auction-terms-conditions

Markets.com, Continuous Clearing Auction, Uniswap ve Aztec ile Yeni Varlık Fiyat Keşfi
https://www.markets.com/news/continuous-clearing-auction-uniswap-aztec-2195-en

The Defiant, Aztec Network Uniswap'in Continuous Clearing Auction'ını Kullanan İlk Token Satışını Başlattı
https://thedefiant.io/news/defi/aztec-network-launches-first-token-sale-using-uniswaps-continuous-clearing-auction

Algebra (Medium), Continuous Clearing Auctions, Uniswap & Aztec'ten Adil Token Lansmanları için Yeni Bir Standart
https://medium.com/@crypto_algebra/continuous-clearing-auctions-a-new-standard-for-fair-token-launches-by-uniswap-aztec-739ba1767fd7

Uniswap CCA Aztec Kontrat Örneği (Etherscan)
https://etherscan.io/address/0x608c4e792C65f5527B3f70715deA44d3b302F4Ee

Panews, Uniswap'in Yeni CCA'sının Benzersiz Özelliklerine Detaylı Bir Bakış
https://www.panewslab.com/en/articles/50611532-a7d8-4f14-ad67-b460319bc720

Dennison Bertram, Aztec CCA Satışını Açıklayan X Thread'i
https://x.com/dennisonbertram/status/1995911827171991948?s=46
