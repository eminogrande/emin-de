---
title: "Sürekli Takas Müzayedeleri (CCA): Basit ve teknik bir rehber"
description: "Token lansmanları tam bir kaos ve kazanan hep botlar oluyor. CCA, verdiğin teklifi birçok bloğa yayıyor ve aynı blokta işlem yapan herkes aynı fiyatı ödüyor. Önce basitçe anlatayım, sonra…"
date: "2025-12-02T18:20:01Z"
updated: "2025-12-02"
lang: tr
translated_from: "en/continuous-clearing-auctions-cca-simple-technical-walkthrough"
source_sections: ["why-token-launches-go-wrong", "what-cca-does", "why-this-matters", "the-math-with-a-simple-example", "sources"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/continuous-clearing-auctions-cca-simple-technical-walkthrough/cover.webp"
tldr: ["Sürekli Takas Müzayedeleri, bir token satışını birçok bloğa böler ve her blokta tek bir sabit fiyat oluşur.", "Maksimum fiyat ve adet belirleyip bir kez teklif verirsin; protokol bunu satış boyunca yayar ve asla belirlediğin maksimumun üzerinde ödeme yapmazsın.", "İşlem sonunda toplanan fonlar ve artan tokenlar, otomatik olarak bir Uniswap v4 havuzu başlatmak için kullanılabilir."]
sections: [{"basically": "Sabit süreli token lansmanları botları ve hızlı işlem yapanları ödüllendiriyor, perakendeci ise sonunda çok daha yüksek maliyetle karşılaşıyor."}, {"basically": "CCA'de tek bir maksimum fiyatla teklifini verirsin ve her blok, herkes için tek ve adil bir fiyattan kapanır."}, {"basically": "CCA, fiyat keşfini mempool hız savaşlarından uzaklaştırıyor ve müzayede fiyatı üzerinden bir Uniswap v4 havuzu kuruyor."}, {"basically": "1.000 token ve fiyata göre sıralanmış tekliflerle blok 2.20 seviyesinden kapanır; G, D ile B'nin emirleri orantılı şekilde karşılanır."}, {"basically": "Bu rehber Uniswap'in CCA blog yazısına, ürün sayfasına, sözleşme deposuna ve ayrıca Aztec'in ilk CCA satışına dayanıyor."}]
---
![](../../../media/continuous-clearing-auctions-cca-simple-technical-walkthrough/cover.jpg)

# Continuous Clearing Auctions (CCA): Basit ve teknik bir inceleme

Önce işin basit versiyonunu, biraz "flood" tadında anlatıyorum. Sonra matematiğine ve ufak bir simülasyona girdiğimiz daha teknik kısım geliyor.

## Token lansmanları neden batıyor?

Token satışları şu an tam bir kaos. Klasik bir token lansmanında sabit bir zaman olur ve herkes aynı anda saldırmaya çalışır. Genelde botlar ve hızlı trader'lar kazanır, fiyat da ilk birkaç saat ya da gün boyunca tam bir muammadır, habire zıplar. Sonuç olarak perakende yatırımcı çok yüksek maliyetle alım yapar, arzın büyük kısmı birkaç kişinin eline geçer; fiyat keşfi ve ilk işlemler birbirine girer.

Eskiden beri kullanılan dört yöntem var ama hepsinin ayrı bir derdi var. Sabit fiyatlı satışta proje bir fiyat belirler; eğer çok düşükse botlar ve arbitrajcılar saniyeler içinde silip süpürür, çok yüksekse satış sürünür ve başarısız gibi görünür. Hollanda tipi açık artırmada fiyat zamanla düşer; profesyonel trader'lar mümkün olduğunca ucuza almak için sona kadar bekler, son saniyedeki "sniping" işlemleri sonucu belirler, perakende yatırımcı ise eline yüzüne bulaştıracağı bir zamanlama oyununa mahkûm kalır. Tek seferlik, uniform fiyatlı açık artırmada herkes bir kere teklif verir ve piyasa tek bir fiyatta temizlenir; ama bu sadece tek bir anlık fotoğraf gibidir, likiditenin sonradan ayrıca ayarlanması gerekir. Doğrudan AMM lansmanında, mesela Uniswap'e hemen bir havuz açtığınızda likidite çok incedir. Bu yüzden ilk işlemler fiyatı çok sert hareket ettirir, MEV ve mempool rekabeti de kimin daha iyi fiyat alacağını belirler.

## CCA neyi değiştiriyor?

Continuous Clearing Auction (CCA) bu süreci kökten değiştiriyor. Satışı birçok bloğa, yani zaman dilimlerine bölüyor. Sen bir kere teklif veriyorsun; ödemeye razı olduğun maksimum fiyatı ve istediğin token miktarını giriyorsun. Protokol senin teklifini kendi kendine tüm satış süresine yayıyor. Her blokta, o anki tüm tekliflerden adil bir piyasa fiyatı hesaplanıyor ve o blokta alım yapan herkes aynı fiyatı ödüyor. Yani hızlı tıklamana gerek yok, her saniye fiyatı izlemek zorunda da değilsin. Sadece "en fazla şu kadar veririm" ve "şu kadar istiyorum" diyorsun.

Olayın özü her blok için şöyle işliyor: Protokolün o blok için ayrılmış sabit bir token miktarı var. Tüm aktif tekliflere bakıp bunları maksimum fiyata göre sıralıyor. Toplam talebin bloktaki arzı karşıladığı (demand ≥ supply) en düşük fiyatı buluyor; bu da o bloğun temizleme (clearing) fiyatı oluyor. `P_max` değeri bu fiyatın üzerinde veya eşit olan tüm teklifler geçerli sayılıyor. Eğer o fiyatta arzdan fazla talep varsa, geçerli teklifler oransal olarak (pro rata) dağıtılıyor. Alım yapan herkes de aynı temizleme fiyatını ödüyor. Satış bitene kadar her blokta bu tekrarlanıyor.

Peki çok yüksek teklif verirsen ne olur? Burada "maksimum fiyat garantisi" var. `P_max` değerini, yani token başına ödemek istediğin en yüksek tutarı sen seçiyorsun. Eğer o bloğun temizleme fiyatı (`P_clear`) senin `P_max` değerinden yüksekse, teklifin o blokta gerçekleşmiyor. Teklif dilimlerin sonraki bloklar için orada kalıyor ya da satış kuralları izin veriyorsa bunları çekebiliyorsun. Yani hiçbir zaman `P_max` değerinden fazlasını ödemiyorsun. Piyasa senin `P_max` değerinin altında temizlenirse zaten daha düşük fiyattan alım yapıyorsun.

Bir de "erken gelen kazanır" etkisi var. Erken teklif verirsen, emrin daha fazla bloğa yayılıyor. Böylece temizleme fiyatının düşük olduğu bloklarda alım yapma şansın artıyor. Eğer son bloğa kadar beklersen, emrin sadece final bloklarında devreye giriyor ve muhtemelen daha pahalı olan son temizleme fiyatlarını görüyorsun. Yani artık "hızlı olan kazanır" devri kapandı. Mekanizma, erken katılanı ve fiyat keşfi süreci boyunca içeride kalanı ödüllendiriyor.

Açık artırma bittiğinde protokol; her bloktaki tüm temizleme fiyatlarının, gerçekleşen miktarların, toplanan toplam varlığın ve (varsa) satılmayan tokenların tam kaydına sahip oluyor. Sonra, belirlenen kurallara göre toplanan varlıkların bir kısmı ve kalan tokenlar otomatik olarak bir Uniswap v4 havuzuna aktarılabiliyor. Böylece ilk likidite, açık artırma sonucuna uygun bir fiyattan otomatik sağlanıyor. Yani "likiditeyi nasıl kuracağız" diye uğraşacağın ayrı bir operasyonel aşama kalmıyor. Likidite zaten fonlanmış şekilde, fiyat keşfinin ve ikincil işlemlerin net bir geçmişine sahip oluyorsun.

## Neden önemli?

Neden mi önemli? CCA, fiyat keşfini düşük seviyeli mempool ve hız oyunlarından ayırıyor. İşlem bazlı değil, blok bazlı uniform bir fiyat sunuyor. Botların perakende yatırımcının önüne geçmesini ve balinaların sadece hızlı oldukları için kazanmasını zorlaştırıyor. Ayrıca token satışından Uniswap v4'te likidite sağlamaya doğrudan bir köprü kuruyor. Yine de bu bir açık artırma; rekabet var, fiyatlar çıkabilir ya da inebilir. Ama süreç daha kurallı ve ne olduğunu net bir şekilde görebiliyorsun.

## Basit bir örnekle matematik

Somutlaştırmak için önce tek bir blok alalım, yani tek bir temizleme olayı. Birçok bloklu bir CCA, bunun her blokta teklif dilimleriyle tekrar edilmesinden ibaret. Bu bloktaki mevcut token miktarı `S = 1,000` olsun ve 10 katılımcı maksimum fiyat `P_max` ve miktar `Q` ile teklif versin.

| Katılımcı | Maks Fiyat `P_max` | Miktar `Q` |
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

Şimdi order book'u kuralım. `P_max` değerine göre yüksekten düşüğe sırala ve talebi topla.

| Sıra | Katılımcı | `P_max` | `Q` | Kümülatif Talep |
|------|-------------|---------|-----|-------------------|
| 1 | G | 3.00 | 500 | 500 |
| 2 | D | 2.50 | 400 | 900 |
| 3 | B | 2.20 | 200 | 1,100 |
| 4 | H | 2.00 | 200 | 1,300 |
| 5 | A | 1.80 | 150 | 1,450 |
| ... | diğerleri | ≤ 1.60 | ... | ... |

Katılımcı B'yi dahil ettiğimizde arz olan `S = 1,000` değerini ilk kez aşıyoruz. Dolayısıyla temizleme fiyatı:

\[
P_{\text{clear}} = 2.20
\]

Geçerli teklif verenler `P_max ≥ 2.20` olanlar. G 500 istiyor, D 400, B ise 200. Toplam geçerli talep:

\[
D_{\text{eligible}} = 500 + 400 + 200 = 1{,}100
\]

Ama sadece 1,000 token dağıtabiliyoruz. Bu yüzden tüm geçerli teklif verenlerin miktarı şu oranla ölçekleniyor:

\[
\alpha = \frac{S}{D_{\text{eligible}}} = \frac{1{,}000}{1{,}100} \approx 0.909
\]

Ve sonuçta ortaya çıkan dağılım:

| Katılımcı | Talep `Q` | Tahsis `Q × α` | Ödenen Fiyat |
|------------|------------|--------------------|------------|
| G | 500 | 454.5 | 2.20 |
| D | 400 | 363.6 | 2.20 |
| B | 200 | 181.8 | 2.20 |

Diğer herkes bu blokta sıfır alıyor. `P_max` değerleri temizleme fiyatının altında olduğu için bir şey ödemiyorlar ve sermayeleri ellerinde kalıyor. Kimse kendi maksimumundan fazla ödemiyor ve alım yapan herkes aynı fiyatı ödüyor.

Gerçek bir CCA'da açık artırma birçok bloğa bölünür, her teklif bu bloklara dilimlenir ve yukarıdaki mantık tekrar tekrar çalışır. Zamanla bir teklif veren, alım yaptığı bloklardaki temizleme fiyatlarının hacim ağırlıklı ortalamasını ödemiş olur.

Özetle: Ne kadar istediğini ve token başına en fazla ne kadar vereceğini söylüyorsun. Protokol teklifini satış boyunca yayıyor. Her blok, tüm tekliflerden adil bir fiyat hesaplıyor. Eğer o fiyat senin max değerinle eşit veya düşükse alım yapabiliyorsun, yüksekse pas geçiliyorsun. Blokta alım yapan herkes aynı fiyatı ödüyor. Sonunda da para ve tokenlar kendi kendine bir Uniswap v4 havuzunu besleyebiliyor.

## Kaynaklar

Uniswap, Sürekli Takas Müzayedeleri, Uniswap v4'te Likidite Sağlama (Resmi Blog)
https://blog.uniswap.org/continuous-clearing-auctions

Uniswap, Sürekli Takas Müzayedeleri Ürün Sayfası
https://cca.uniswap.org/en/

Uniswap, Sürekli Takas Müzayedesi Akıllı Sözleşme Deposu (GitHub)
https://github.com/Uniswap/continuous-clearing-auction

Aztec Network, Müzayede Şartları ve Koşulları
https://aztec.network/auction-terms-conditions

Markets.com, Sürekli Takas Müzayedesi, Uniswap ve Aztec ile Yeni Varlık Fiyat Keşfi
https://www.markets.com/news/continuous-clearing-auction-uniswap-aztec-2195-en

The Defiant, Aztec Network, Uniswap'in Sürekli Takas Müzayedesini Kullanan İlk Token Satışını Başlatıyor
https://thedefiant.io/news/defi/aztec-network-launches-first-token-sale-using-uniswaps-continuous-clearing-auction

Algebra (Medium), Sürekli Takas Müzayedeleri, Uniswap ve Aztec'ten Adil Token Lansmanları için Yeni Bir Standart
https://medium.com/@crypto_algebra/continuous-clearing-auctions-a-new-standard-for-fair-token-launches-by-uniswap-aztec-739ba1767fd7

Uniswap CCA Aztec Sözleşme Örneği (Etherscan)
https://etherscan.io/address/0x608c4e792C65f5527B3f70715deA44d3b302F4Ee

Panews, Uniswap'in Yeni CCA'sının Benzersiz Özelliklerine Detaylı Bir Bakış
https://www.panewslab.com/en/articles/50611532-a7d8-4f14-ad67-b460319bc720

Dennison Bertram, Aztec CCA Satışını Açıklayan X Konusu
https://x.com/dennisonbertram/status/1995911827171991948?s=46
