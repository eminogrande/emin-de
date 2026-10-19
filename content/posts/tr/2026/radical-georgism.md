---
title: "Radikal Georgizm"
description: "Amoveo projesinden birinin, blokzincir üzerinde arazi vergisi ve kriptonun Georgizm'i neden sonunda işlevsel kılabileceği üzerine yaptığı konuşma"
date: "2026-01-20T09:50:01Z"
updated: "2026-01-20"
lang: tr
translated_from: "en/radical-georgism"
source_sections: ["land-value-has-two-parts", "the-blockchain-as-the-assessor", "a-land-registry-in-a-verkle-tree", "how-the-code-guesses-land-value", "beachfronts-gaming-and-who-gets-the-tax", "a-truth-both-sides-hate", "what-money-really-is", "complexity-moats-and-yield"]
category: culture
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/radical-georgism/cover.webp"
third_party_summary: true
tldr: ["2026 başından bir sohbet. Blokzincirlerin, rüşvet verilebilecek değerleme uzmanlarına ihtiyaç duymadan arazi vergisini sonunda hayata geçirebileceğini savunuyor.", "Arazi parselleri bir Verkle ağacında benzersiz bir yola dönüşüyor; kod ise komşu parsellerin değerini üssel ağırlıklandırmayla baz alarak arazi değerini tahmin ediyor.", "İkinci yarıda paranın doğası tartışılıyor: Bitcoin'in Lindy etkisi ve ağ avantajına karşı, arazi destekli ve getiri sağlayan bir token."]
sections: [{"basically": "Georgizm; bir topluluğun yarattığı konum değerini %100, binaları ise %0 oranında vergilendirmeyi savunur."}, {"basically": "Arazi vergisi bugüne kadar başarısız oldu çünkü değerleri insanlar belirliyordu ve rüşvet alabiliyorlardı. Blokzincir ise rüşvet yemez."}, {"basically": "Dünyayı yaklaşık 23 kez ikiye bölün; yeryüzündeki her parselin Verkle ağacında kendi yolu olur."}, {"basically": "Algoritma bir parseli değerlerken ağırlıklı olarak hemen yanındaki araziye bakar, uzaklaştıkça ağırlığı azalır."}, {"basically": "Model sahilleri az vergilendirebilir ve elde edilen vergi tüm VEO sahiplerine dağıtılabilir; üstelik piyasada rekabet edebilir."}, {"basically": "Hem sağa hem sola ters gelen bir fikir olsa da altında derin bir gerçek yatıyor olabilir: sadece araziyi vergilendir, üretimi rahat bırak."}, {"basically": "Parayı yiyemezsiniz. Bu bakış açısına göre bir para biriminin değerini koruması için arazi vergisi veya benzeri bir gelire ihtiyaç duyan bir havuza ihtiyacı var."}, {"basically": "Tartışmanın özü şu: Bitcoin'in basitliği ve pazar payına karşılık, getiri sağlayan bir varlığın zamanla daha avantajlı hale geleceği iddiası."}]
---
![](../../../media/radical-georgism/cover.jpg)

Bu, 2026’nın başlarında, büyük ölçüde Amoveo projesinden birinin öncülük ettiği bir sohbetin özeti.

Sohbet Georgism, yani Arazi Değer Vergisi (LVT) ve blockchain üzerine. Fikre göre, işleyen bir Arazi Değer Vergisini nihayet mümkün kılabilecek tek araç kripto olabilir.

Gruptaki arkadaş bunun içinde büyük bir siyasi ironi, tam bir paradoks görüyor. Bir tarafta anarşistler ve liberteryenler, diğer tarafta "LVT tayfası" yani Georgist'ler var. Genelde birbirlerinden pek haz etmezler ama aslında birbirlerinin hedeflerinin anahtarı diğerinin elinde.

Anarşistlerin elinde geleneksel devleti parçalayacak merkeziyetsiz araçlar var, Georgist'lerin elinde de devletsiz bir toplumu ekonomik açıdan çalıştırabilecek vergi modeli. Yani Radikal Georgism, sürekli çarpışan bu iki ideoloji arasındaki kayıp halka; hükümet müdahalesinden nefret eden anarko-kapitalizm ile toplumun ortak kaynaklarına odaklanan sosyalizm arasında.

## Arazi değerinin iki parçası

Tartışmanın temelindeki fikir şu: Arazi değerinin iki bileşeni var. Birincisi iyileştirmeler, yani mülk sahibinin bizzat yaptığı şeyler; ikincisi ise çevresindeki topluluğun yarattığı konum değeri. Komşun harika bir restoran açtığında, sen hiçbir şey yapmasan bile arazin değerleniyor.

Bilgisayar veya arabadan farklı olarak araziyi kimse üretmedi. Değeri sadece konumundan geliyor. Çölde bir yerin varsa ve etrafına biri şehir kurarsa, arazin değerlenir ama sen bunun için sıfır emek harcarsın.

Georgistlerin cevabı ise şu: Bu konum değerini, yani kazanılmamış zenginliği %100 vergilendir; binalar, çiftlikler ve fabrikalar gibi iyileştirmeleri ise %0 vergilendir. Böylece insanlar üretken işler yapsın, öylece arazinin üstüne yatıp fiyatın yükselmesini beklemesin.

## Değerlemeci olarak blockchain

Tarihsel olarak LVT başarısız oldu çünkü arazi değerini insanlar hesaplıyor, bu da sistemin tamamında yolsuzluğa yol açıyor. Değere kim karar veriyorsa, eşi dostu için vergiyi düşürmeye ya da düşmanları için yükseltmeye ikna edilebiliyor. Bizim arkadaş diyor ki; blockchain bu hesaplamaları şeffaf, matematiksel ve bozulamaz bir şekilde otomatize edebilir. Böylece hata yapan merkezi bir vergi otoritesine ihtiyaç kalmaz.

Blockchain matematiksel bir yargıca, rüşvet yemeyen bir değerlemeciye dönüşüyor. İnsan değerlemeciler aradan çekilince sistem, güven gerektirmeyen bir ekonomik motora evriliyor.

## Verkle ağacında bir arazi kaydı

Teknik fikir, kanıtlar için çok verimli bir veri yapısı olan Verkle ağaçlarını küresel bir arazi tapu kaydı olarak kullanmak. 256 tabanlı bir Verkle ağacının içinde ikili (binary) bir ağaç duruyor ve arazi parselleri dünya üzerine çizilmiş bir dizi çizgiyle tanımlanıyor.

Dünyanın üzerine bir çizgi çekip ikiye bölüyorsun. Sonra o yarıları da bölüyorsun. Bunu yaklaşık 23 kez yapınca elinde küçük bir parsel kalıyor. Yani dünyadaki her arazi parçasının 23 ikili karardan, yani sağ veya sol, kuzey veya güneyden oluşan kendine has bir yolu var.

2026’daki büyük teknik sorunlardan biri "state bloat", yani blockchain'in normal bir bilgisayarda çalışamayacak kadar ağırlaşması. Verkle kanıtlarıyla bir kullanıcı, tüm küresel kayıt defterini indirmek zorunda kalmadan bir arazi parçasının sahibi olduğunu kanıtlayabiliyor ve vergisini hesaplayabiliyor. Sadece kendi parseline giden çizgiler, yani kanıtlar yeterli.

## Kod arazi değerini nasıl tahmin ediyor?

Değerleme sistemin beyni. İnsan ekspertiz yok, o yüzden kodun arazinin değerini tahmin etmesi gerekiyor. Arkadaş, ağacın parsel etrafındaki dallarındaki ortalama arazi fiyatına bakan bir algoritma öneriyor.

Çok fazla "zoom-out" yaparsan okyanus gibi düşük değerli alanları dahil edersin; ormandaki rastgele bir malikane gibi uç örnekler de veriyi saptırır. O yüzden üstel ağırlıklandırma (exponential weighting) kullanıyorlar. Parselin hemen yanındaki arazi fiyatına en büyük ağırlığı veriyor ve ham arazi değeri için oldukça isabetli bir tahmin sunuyor.

Ağacın dallarına farklı zoom seviyelerinde bakıyorsun ve ağaç ne kadar uzaklaşırsa, sistem o veriyi o kadar az önemsiyor.

Parsel etrafındaki arazi değerlerini ağırlıklandıran formül şu:

$$V_{estimate} = \sum_{n=1}^{D} \left( \frac{1}{2} \right)^n \times A_n$$

Burada $n$ ağacın seviyesi, yani ne kadar zoom-out yaptığın, $A_n$ o daldaki metrekare başına ortalama fiyat, $D$ ise genellikle 23 civarında olan toplam derinlik.

Normal insanlar için bu şu demek: Komşunun arazisi değerliyse, algoritma senin arazinin konumunun da değerli olduğunu varsayar. Ve

$$(1/2)^n$$

çarpanı sayesinde, 160 kilometre ötedeki bir şehirdeki fiyat patlaması köydeki vergini kazara yükseltmez.

## Sahil şeritleri, oyunlaştırma ve vergi kime gidiyor?

Sohbetten biri sahil şeridi problemini gündeme getirdi. Arazi değerleri her zaman homojen değil; sahil şeridindeki bir mülk, içerideki araziye göre devasa bir fiyat farkına sahip olabilir. Grubun vardığı sonuç, modelin bu tarz uç durumları belki olması gerekenden az vergilendirebileceği, ama yine de günümüzdeki herhangi bir vergi sisteminden kat kat verimli olacağıydı.

Kullanıcıların vergilerini düşürmek için çarpık veri ağaçlarıyla sistemi manipüle etmesini engellemek için arkadaş bir "Yeniden Düzenleme Teşviki" (Reorganization Incentive) öneriyor. Eğer kullanıcılar kendi faturalarını en düşük seviyeye çekmek için ağacı yeniden düzenleyebilirse, doğal olarak mükemmel dengelenmiş bir ikili ağaç kuracaklar. Blockchain’in hızlı kalması için gereken de tam olarak bu.

Mükemmel bir Georgist sistemde vergiler, değeri yaratan yerel topluluğa geri döner. Ama takma isimli bir blockchain’de hangi cüzdanın hangi mahalleye ait olduğunu kanıtlamak zor; küresel bir zincirde kimin nerede yaşadığını kimse bilemez.

Arkadaş bir takas (trade-off) öneriyor. Arazi vergisi sadece parayı tutan herkese, yani VEO sahiplerine gitse bile, ekonomik verimlilikteki artış sistemin bankalar ve hükümetler gibi geleneksel alternatifleri yenmesini sağlar. Tam olarak yerel değil belki ama onları geride bırakacak kadar verimli.

## İki tarafın da nefret ettiği bir gerçek

Arkadaş şunu da ekliyor: Bir fikir hem sağa hem sola siyasi açıdan toksikse, muhtemelen derin bir gerçeklik içeriyordur. Arazi vergisi dışında her vergiyi kaldırırsan, yaratıcılar için hiper-kapitalist ama dünyanın yüzeyi için komünal bir yapı elde edersin.

Tartışmada ayrıca bazı İskandinav ülkelerinde mülkiyetin "dolaşım özgürlüğü" (Allemannsretten) ile zaten kısıtlı olduğundan, yani halkın özel araziden geçmesine veya kamp yapmasına izin verildiğinden bahsediliyor. Arazi hakları sosyal bir kurgu ve blockchain bunları bambaşka bir şekilde tanımlayabilir.

Bu bakış açısına göre coğrafya veridir ve dünya bir dizi matematiksel kanıttır. Eğer arazi tapuları Verkle ağacı yolları, arazi değerlemesi de yanındaki veri noktalarının ağırlıklı ortalaması haline gelirse; arazi üzerindeki tekellerin imkansız olduğu (çünkü vergi, kullanılmayan araziyi tutmayı çok pahalı hale getiriyor), üretkenliğin asla cezalandırılmadığı (çünkü binaların ve emeğin %0 vergilendiriliyor) ve hükümetin kod olduğu (çünkü vergi memuru açık kaynak bir algoritma) bir toplum elde edersin.

## Paranın gerçekte ne olduğu

Sohbetin ilerleyen kısımları, paranın aslında ne olduğu ve Bitcoin'in (BTC), toprak üzerinden getiri sağlayan bir varlığa karşı hayatta kalıp kalamayacağı üzerine bir tartışmaya evriliyor. Bizimki Parasal Realizm perspektifinden konuşurken, karşı taraf olan distbit ise Lindy Etkisi ve ağın yarattığı bariyerleri savunuyor.

Onun görüşü oldukça net: "Parayı yiyemezsin." Paranın kendi başına bir değeri yok, sadece başkalarının zamanı ve enerjisi üzerinde bir hak iddiası. Bir para biriminin uzun süre değerli kalabilmesi için bir "yutak" olması, yani insanların onu elde etmek için emeklerini satmaya mecbur kalacakları bir gerekçesi olması lazım.

USD gibi modern fiat paralar, vergi ödeme yükümlülüğüyle destekleniyor. Onun sistemi ise arazi kullanım ücreti ödeme yükümlülüğüyle destekleniyor. Bitcoin ise bunun yerine gelecekteki değerine dair gönüllü bir beklentiye dayanıyor ve o, büyüme durursa bunun bir saadet zinciri gibi davranabileceği konusunda uyarıyor.

Yani önerilen arazi kayıt sistemi sadece araziyi yönetmiyor, aynı zamanda kendi cinsinden olan para birimini de talep ediyor. Harberger vergi modelinde, tapunu korumak için kendi belirlediğin değer üzerinden belirli bir yüzdeyi sürekli ödemen gerekiyor.

Bunu sistemin kendi token'ı ile yaparsan, token getiri sağlayan bir araca dönüşüyor. Yüzlerce trilyon değerindeki küresel gayrimenkul bu kayda dahil oldukça, token'a olan talep de onunla birlikte büyüyor. Para öylece kenarda durmuyor; temsil ettiği toprağın ekonomik enerjisini içine çekiyor.

## Karmaşıklık, bariyerler ve getiri

distbit'in teknik eleştirisi, karmaşıklığın risk demek olduğu yönünde. Bitcoin basit, bu yüzden güvenli. Bir arazi kaydı, otomatik vergiler ve üzerine bir de getiri eklediğinde, hacker'lara ve sistem arızalarına çok daha geniş bir saldırı yüzeyi sunmuş oluyorsun. O ise getirinin bir özellik değil, tıpkı biyolojide olduğu gibi bir hayatta kalma ihtiyacı olduğunu savunuyor.

Getiri sağlayan daha verimli bir rakibine karşı göreceli değerinin %5'ini kaybeden bir varlık, herkesin buluşma noktası olarak kabul ettiği Schelling noktasını çok hızlı kaybeder.

O ayrıca gayrimenkulün zaten bir tür para olduğunu söylüyor. İnsanlar zenginliklerini korumak ve enflasyona karşı korunmak için mülk kullanıyor. Yani Bitcoin'i gayrimenkule rakip olacak şekilde büyütmek yerine, gayrimenkulü tokenlaştırma ve izinsiz kayıtlar gibi kripto özellikleriyle yükseltmenin daha kolay olduğunu düşünüyor. 300 trilyon doların üzerindeki bir gayrimenkul piyasasıyla neden savaşasın ki? Onu bir blok zincirine dahil etmek varken.

O, finansta marka sadakatine de inanmıyor. distbit, Bitcoin'in güvenlik, likidite ve geçmişten gelen bir bariyeri (moat) olduğunu savunuyor ama o, açık kaynaklı yazılımların ekonomik olarak "yapışkan" olmadığını düşünüyor. Dijital dünyada zenginliğini, getiri getirmeyen BTC gibi bir varlıktan getiri getiren birine taşımak gitgide kolaylaşıyor.

Eğer daha iyi bir para çıkarsa, o, insanların mevcut oyuncuların beklediğinden çok daha hızlı geçiş yapacağını düşünüyor.

O, fizik kurallarındaki gibi ilk prensiplerden hareket ediyor; piyasa algısı ya da kripto kültürü umurunda değil. Soruları şunlar: İnsanları token'ı kullanmaya zorlayan baskı nereden geliyor, yani enerji yutağı neresi? Sonra toplam pazar büyüklüğü (TAM); altın piyasasını ($14T) hedeflemek varken neden 20 kat daha büyük olan arazi piyasasını hedeflemiyorsun? Ve en son oyun teorisi.

Eğer A varlığı %5 getiri sağlıyorsa ve B varlığı %0 getiri sağlıyorsa, rasyonel bir aktör neden B'de kalmaya devam eder? Onun cevabı çok net: Uzun vadede neredeyse hiçbir zaman.
