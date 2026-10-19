---
title: "Riverside 500E daha hızlı, bisiklet ayarı"
description: "Riverside 500E için eksiksiz bir rehber: bedava mıknatıs hilesi, Badass Box ve KT kontrolcü değişimi, çizimler, parça linkleri ve test adımlarıyla birlikte."
date: "2026-10-13"
updated: "2026-10-13"
lang: tr
translated_from: "en/riverside-500e-faster-bike-tuning"
source_sections: ["the-bike-and-why-it-stops-at-25", "first-check-what-actually-limits-the-bike", "the-free-fix-move-the-magnet", "how-strong-the-magnet-has-to-be", "the-clean-fix-badass-box", "the-real-fix-kt-controller", "wiring-and-first-start", "what-can-break-and-what-it-costs"]
category: building
format: guide
author: emin
provenance: written
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Riverside 500E", "KT controller", "how-to"]
source_links: [{"title": "Riverside 500E product page", "url": "https://decathlon.co.uk/p/electric-hybrid-bike-riverside-500-e/_/R-p-169143", "note": "Motor and battery specs."}, {"title": "Arthur Brs: Riverside 500E Speed Unlock", "url": "https://www.youtube.com/watch?v=Cdm-WZnxCZ4", "note": "The video that confirms the service menu does not exist on this model."}, {"title": "Pedelec-Forum: Riverside 500 e schneller machen", "url": "https://www.pedelecforum.de/forum/index.php?threads/riverside-500-e-schneller-machen.102938/", "note": "German thread asking the same question."}, {"title": "K&J Magnetics: Reed switches and Hall effect sensors", "url": "https://www.kjmagnetics.com/blog/reed-switches-and-hall-effect-sensors/", "note": "Trigger fields, magnet orientation and polarity."}, {"title": "KT controller 17A with LCD3", "url": "https://www.aliexpress.us/item/3256808397983216.html", "note": "The controller I use in the swap."}]
tldr: ["Riverside 500 E'de arka göbek motoru var, yani alışıldık tuning çipleri uymuyor.", "Bedava çözüm, jant teli mıknatısını krank koluna taşımak. Destek yaklaşık 32 km/s hıza kadar itmeye devam ediyor.", "Asıl çözüm KT kontrolcü değişimi, parçalar yaklaşık 65 dolar tutuyor.", "Eski parçaları saklarsan ikisi de geri alınabilir."]
sections: [{"basically": "Ev markası bir göbek motoru, kapalı bir kontrolcü ve gizli menü yok. Diğer bisikletlerde işe yarayan ucuz şeylerin hiçbiri burada çalışmıyor."}, {"basically": "Daha hızlı ve daha fazla güç iki farklı vida. Hangisini çevirdiğine karar ver."}, {"basically": "Kontrolcü tekerleği jant teli mıknatısıyla ölçüyor. Krankı ölçtürürsen kesmeyi bırakıyor."}, {"basically": "Yeterince yakınsa herhangi küçük bir neodimyum disk iş görür. Çok güçlü olması asla zarar vermez, çok uzak olması verir."}, {"basically": "İçinde mıknatıs olan ve pulsleri iki katına çıkaran bir klips. Kablo yok, lehim yok, bir dakikada sökülüyor."}, {"basically": "Yaklaşık 65 dolarlık AliExpress parçaları bisikletin beynini değiştiriyor. Daha fazla amper ve limiti ayarlamana izin veren bir ekran."}, {"basically": "Faz ve hall kabloları tek riskli kısım. Geri kalan her şey tak-çalıştır ve kablo bağı."}, {"basically": "İşe yaramazsa eski parçalar geri takılıyor. Yasa 25'in üstünü umursuyor, o yüzden nerede süreceğine karar ver."}]
---
## Bisiklet ve neden 25'te durduğu

Riverside 500E bir hibrit pedelec. Motoru arka tekerlekte 250 watt fırçasız bir göbek motoru, markası "Vision", 42 Nm tork üretiyor ve 36 V 11.6 Ah bir bataryayla besleniyor. AB'de satılan her pedelec gibi, destek 25 km/s'de kesiliyor.

Bu, tuning için önemli çünkü piyasadaki neredeyse her şey orta göbek motorları için yapılmış. SpeedBox, PearTune ve motora özel Badass Box'lar Bosch, Brose, Shimano için üretilmiş. Hiçbiri bu bisiklete fiziksel olarak uymuyor.

Yani seçenekler üçe iniyor: hız sensörünü kandırmak, üzerine bir kutu takmak ya da kontrolcüyü değiştirmek. Gizli bir servis menüsü de yok. Rockrider E-ST 100'de ekrandan tekerlek boyutunu küçültebildiğin bir menü var. 500 E'nin ekranında tekerlek girişi hiç yok. Bütün menüyü kontrol ettim, forumlar da aynı fikirde.

## Önce bisikleti asıl neyin sınırladığına bak

Kontrolcüde iki ayrı limit var. Hız limiti desteği 25'te kesiyor. Akım limiti, bu bisiklette yaklaşık 13 A, torku sınırlıyor. Birini yükseltmek diğerine hiçbir şey yapmıyor.

```
daha hızlı istiyorsan      daha sert itme istiyorsan
     |                       |
hız sensörü hilesi      daha fazla amperli kontrolcü
ya da KT kontrolcü      (KT 15A / 17A / 22A)
     |                       |
~32 km/s'ye kadar        aynı son hız, daha fazla tork
destek
```

Bedava mıknatıs hilesi sadece hıza dokunuyor. Kontrolcü değişimi ikisine de dokunuyor, çünkü KT kontrolcü akımı ve limiti ekrandan ayarlamana izin veriyor.

## Bedava çözüm, mıknatısı yerinden oynat

Arka tekerleğe bak. Sol alt kadro borusunda, aks yuvasına yakın bir yerde, kablolu küçük siyah bir sensör duruyor. Karşısında, bir tele kelepçelenmiş bir mıknatıs var. Bu ikili, bütün sistemin hız göstergesi.

Hile şu: kontrolcü, sensörün bildirdiği hıza inanır. Sensör tekerlek yerine pedalını ölçerse, kontrolcü yavaş olduğunu sanır ve itmeye devam eder.

```
ÖNCE (orijinal)                        SONRA (hile)

  kadro                                  kadro
   |                                      |
   | sensör --- 2mm --- tel               | sensör (içe döndürülmüş,
   |            mıknatıs                  |  kablo hâlâ bağlı)
   |                                      |        3-5 mm
   v                                      v   +------------+
[ arka tekerlek ]                     pedal kolu | mıknatıs artık |
                                      (dönüyor)  | kolda        |
                                                 +------------+
```

Adımlar:

1. Sensörü alt kadro borusundan sök. Genelde Torx T25'tir ve vida sabitleyiciyle oturur, o yüzden yavaş git.
2. Sensörü pedal kolunun iç tarafına bakacak şekilde kablo bağıyla sabitle. Kablo bağlı kalıyor.
3. Mıknatısı telden çıkar ve pedal kolunun iç yüzüne, sensörle aynı hizada yapıştır. Test için bant ya da kablo bağı yeter.
4. Mıknatıs ile sensör arasındaki mesafe, pedalın her geçişinde 3 ila 5 mm olacak.
5. Arka tekerleği kaldır, pedalları elle çevir. Ekran bir hız göstermeli. Sıfır ya da hata gösterirse motor hiç çalışmaz, o yüzden önce mesafeyi düzelt.

Ekran artık sana yalan söylüyor. Gerçek 25 km/s'de 6 ya da 7 gösteriyor. Doğrusu için telefon GPS'i kullan. Her şeyi on dakikada geri alırsın.

Sonuç: krankları ne kadar hızlı çevirebildiğinle sınırlı olarak yaklaşık 32 ila 35 km/s'ye kadar destek. Maliyet: sıfır.

## Mıknatısın ne kadar güçlü olması gerekiyor

Sensör bir reed anahtarı ya da hall sensörü. Yüzeyinde 10 ila 100 gauss arasında bir yerde tetiklenir, bu da pek bir şey değil. Orijinal tel mıknatısı, mesafe küçükse normalde işini görür.

Düzgün tetiklenmezse, herhangi bir küçük neodimyum disk iş görür. N42 ila N52 gücünde, 10 ila 15 mm çapında, 3 ila 5 mm kalınlığında. Bu bir iki dolara mal olur. Fazla güçlü olması asla zarar vermez. Fazla uzak olması verir.

Kutup yönü önemli. Hall sensörleri kendilerine bakan tek bir kutup ister, reed anahtarları manyetik eksenin anahtara paralel olmasını ister. Pratik kural: ekran sıfırda kalırsa, mıknatısı 180 derece çevir ve tekrar dene. Neredeyse her seferinde çözer.

## Temiz çözüm, Badass Box

Kablo bağı görüntüsü sana göre değilse, Badass Box 4 Universal aynı işi bir kutu içinde yapıyor. Sensörün etrafına klipsleniyor ve tekerlek turu başına manyetik darbeleri ikiye katlıyor, böylece kontrolcü yarı hız sayıyor. Kablo yok, lehim yok, bir dakikadan kısa sürede bisikletten çıkıyor ve servis teşhisinde iz bırakmıyor.

Yaklaşık 130 euro tutuyor, içindeki şey için ciddi para, ama garantiyi bozmayan tek seçenek bu. Bir pürüz var: tel mıknatısının sensörün 8 ila 14 mm yakınından geçmesi gerekiyor ve Boost Buddy uygulamasını eşleştirmezsen kutu konsolda gerçek hızının yarısını gösteriyor.

## Gerçek çözüm, KT kontrolcü

Bisikletin beyni, bataryanın altındaki bölmeye yapıştırılmış bir kontrolcü. Onu değiştir, akım ve hız limiti senin olsun.

Parçalar, hepsi AliExpress, yaklaşık 65 dolar:

| Parça | Fiyat | Ne işe yarıyor |
| --- | --- | --- |
| KT kontrolcü 17A, LCD3 ile | $45.73 | Yeni beyin, akım ekrandan ayarlanıyor |
| 9 pinli motor uzatma kablosu | $10.90 | Kesip kullanacağın su geçirmez tesisat |
| KT-V12L pedal sensörü | $2.94 | KT için 12 sinyalli kadans sensörü |
| 5 pinli SM ekran kablosu, 170 cm | $5.33 | LCD3'ü gidona taşıyor |

22A değil, 17A seç. 36 V 11.6 Ah paketin batarya yönetim sistemi yaklaşık 20 ila 25 A veriyor ve 22 A'lık bir kontrolcü o sınırda gezer. 17 A, orijinal 470 W'a karşı yaklaşık 610 W tepe güç demek, hiçbir şeyi pişirmeden net bir itme.

## Kablolama ve ilk çalıştırma

Orijinal pedal sensörü kendi protokolünü konuşuyor, o yüzden KT kendi 12 sinyalli sensörünü orta göbeğe alıyor. Motor dışında her şey tak çalıştır.

```
kontrolcü                  motor (Vision göbek)
   |                            |
   |  3 faz kablosu   kalın: sarı / yeşil / mavi
   |  5 hall kablosu  ince: kırmızı siyah sarı yeşil mavi
   |                            |
   +--- 1:1 lehimle, renkler eşleşerek, sonra ısıyla daralan makaron
```

1. Hiçbir şeyi sökmeden önce eski kontrolcüdeki her konnektörün fotoğrafını çek.
2. Bataryanın altındaki bölmeyi aç. Kapak yapıştırılmış, dikkatlice kaldır.
3. Eski motor konnektörlerini kes, KT tesisatını motor kablolarına renk renk lehimle, her şeyi makaronla kapat.
4. İlk çalıştırmayı arka tekerlek havadayken yap. Motor titrerse ya da ters dönerse, hall sırası yanlış demektir. Bataryayı kapat, iki hall kablosunu yer değiştir, tekrar dene. Normalde altı kombinasyondan bir iki denemede tutar. Batarya takılıyken asla hiçbir şeyi sökme.
5. KT-V12L sensörünü orta göbeğin sol tarafına tak, mıknatıs diski sensöre bakacak şekilde, 3 ila 5 mm mesafe.
6. LCD3'ü monte et, 36 V, tekerlek boyutu 28 inç, pedal sinyali 12, akım 17 A olarak ayarla.
7. Bir destek limiti hâlâ devreye giriyorsa, ekrandaki tekerlek çapı değerini küçült. 28'den 22 inçe düşürmek yaklaşık yüzde 25 yavaş okur ve kesme noktasını ona göre kaydırır.
8. Önce bahçede, sonra sokakta test et. Tam geri dönüş yolu: eski kontrolcü ve konnektörleri geri takılır, bisiklet yine orijinal.

Dürüst bir uyarı. Vision göbeğinin pin dizilimi belgelenmemiş. Hall tahmini bir türlü oturmazsa, onun yerine KT dual mode kontrolcüyü al, sensörsüz çalışıyor ve hall kablolarını tamamen yok sayıyor.

## Ne bozulabilir ve maliyeti ne

Motor soğutmasız bir dişli göbeği. Yokuş yukarı sürekli 600 W çekersen sargılar eninde sonunda yanar. Bisiklet çoğunlukla tırmanıyorsa akımı 15 A'ya düşür.

Almanya'da yasalar net: 25 km/s üzerinde destek veren bisiklet artık pedelec sayılmıyor. Sigorta ve onay sorun olur, bölme açıldığı anda garanti biter. Kilitli ayarı özel arazide kullan, bunların hiçbiri seni ilgilendirmez.

Risk altındaki para 65 dolarlık bir parça artı bir öğleden sonra. İki düzeltme de geri alınabilir. Eski konnektörleri bir torbada sakla, pil kapağının altına bantla, istediğin zaman geri dönersin.

Benim için sıra belliydi. Önce mıknatıs hilesini dene, çünkü bedava ve on beş dakika sürüyor. Hız yeterli geliyorsa ve yalan söyleyen ekran umurunda değilse orada dur. Tork da istiyorsan ya da doğruyu gösteren bir ekran istiyorsan, KT takası gerçek çözüm.
