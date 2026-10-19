---
title: "Fazua Ride 50'de Badass Box 4, sarı ışık"
description: "Fazua Ride 50'deki Badass Box 4'üm sürekli sarı yanıp sönüyordu. Işığın ne anlama geldiği, mıknatısın nereye takıldığı, siyah halkanın ne işe yaradığı ve Badass'in ne dediği."
date: "2026-10-14"
updated: "2026-10-14"
lang: tr
translated_from: "en/badass-box-4-fazua-ride-50-yellow-light"
source_sections: ["what-i-bought-and-what-went-wrong", "what-the-yellow-light-means", "the-black-ring-nobody-explains", "asking-the-people-who-make-it", "where-the-magnet-actually-goes", "the-white-light-that-was-not-the-box", "firmware-the-app-and-why-i-left-them-alone", "the-order-i-would-test-in-next-time"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Badass Box", "how-to"]
source_links: [{"title": "FAZUA RIDE 50 TRAIL/STREET user manual", "url": "https://fazua.com/documents/1194/EN_Benutzerhandbuch_FAZUA_RIDE_50.pdf", "note": "Status LED colours, troubleshooting table, battery and restart steps."}, {"title": "FAZUA RIDE 50 EVATION user manual", "url": "https://fazua.com/documents/1197/EN_Benutzerhandbuch_FAZUA_RIDE_50_EVATION.pdf", "note": "The 4 to 15 mm gap between sensor mark and spoke magnet."}, {"title": "badassBox 4 Fazua product page", "url": "https://www.badassebikes.com/en/badassbox/badassbox-4-fazua_156_1051", "note": "Scope of delivery, including the 5 mm distance bush."}, {"title": "Badass eBikes: installing the badassBox4 classically on the chain stay", "url": "https://www.youtube.com/watch?v=jBTKFzDBUNY", "note": "Where the magnet sits relative to the box."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "Reading firmware version and error codes over USB."}]
tldr: ["Fazua kumandasında sarı yanıp sönme, ufak bir arıza demek. Sensörde Badass Box varsa, jant teli mıknatısının kutuya düzgün ulaşamadığını gösterir.", "Benim için çözüm, mıknatısı kutuya en yakın geçen tele, hemen yanına taşımaktı.", "Siyah 5 mm'lik halka sensörle kadro arasına takılır, mıknatısın altına değil ve sadece boşluk çok büyükse.", "Sadece üst LED beyazsa, pil bitik ya da düzgün oturmamış demektir, kutuyla ilgisi yok. Pili çıkarıp tekrar tak."]
sections: [{"basically": "Hız sensörüne takılan bir tuning klipsi, birkaç güzel dakika, sonra yanıp sönen sarı ışık ve destek yok."}, {"basically": "Sarı, ufak arıza demek. Motor hız sinyallerini kaçırıyor ve kullanım kılavuzu jant teli mıknatısını kontrol et diyor."}, {"basically": "Kutuda hiçbir broşürde ve videoda bahsedilmeyen 5 mm'lik plastik halka. Onunla ilgili ilk tahminimiz yanlıştı."}, {"basically": "Badass aynı öğleden sonra cevap verdi. Halka sensörün altına takılıyor, boşluk 5 ila 10 mm olmalı."}, {"basically": "Kutunun ucundaki kilit, kutuya en yakın geçen telde. Benim için çözümün tamamı buydu."}, {"basically": "Bir beyaz LED ve modların olmaması kutunun bir şeyi bozduğu gibi görünüyor. Sorun pilin düzgün oturmamasıydı."}, {"basically": "Uygulama yeni firmware istiyor, Badass asla güncelleme yapma diyor. Versiyonu Toolbox'tan oku, hiçbir şeyi değiştirme."}, {"basically": "Pil, kutusuz bisiklet, sonra mıknatıs. Her seferinde bir değişiklik, böylece sarı ışık sana bir şey söyler."}]
---
## Ne aldım ve ne ters gitti

Fazua Ride 50 kullanıyorum ve 7 Ekim'de ebiketuningshop.com üzerinden 149 euroya bir Badass Box 4 for Fazua aldım. Kutu, chainstay üzerindeki Fazua hız sensörünün üzerine klipsleniyor. İçinde bir AAA pil ve bir devre kartı var; kendi jant teli mıknatısıyla birlikte motorun aldığı sinyali manipüle ederek 25 km/s hız sınırındaki desteğin kesilmesini engelliyor.

İlk birkaç dakika çalıştı. Sonra kumandadaki en üst LED sarı yanıp sönmeye başladı. Motor bazen düşük güçle devam ediyor, bazen de desteği tamamen kesiyordu.

Kutudaki pil yeniydi. Bisikletin şarjı yüzde 90 civarındaydı. Mıknatıs, kılavuzda belirtilen yere takılıydı. Yine de sarı ışık yanıyordu.

## Sarı ışık ne demek

Fazua kumandasında beş LED var. En üstteki aynı zamanda durum ışığı. Ride 50 kılavuzu yanıp sönen sarı ışığı "soft fault" olarak tanımlıyor; yani geçici veya kritik olmayan bir hata, genellikle düşük performansa işaret ediyor. Arıza giderme tablosuna göre sebep, "hız sensörü ile BOTTOM BRACKET arasında kötü bir bağlantı" olabilir ve çözüm olarak jant teli mıknatısının konumunun kontrol edilmesi öneriliyor.

Yani sensörde bir Badass Box varken sarı ışık yanması, motorun temiz bir hız sinyali alamadığı anlamına geliyor. Kutu, mıknatıs ile sensör arasında bir engel oluşturuyor. Mıknatıs çok uzaktan ya da yanlış bir noktadan geçerse sinyal darbeleri kayboluyor ve Fazua bunu hata olarak kaydediyor.

"Kırmızı" ise "hard fault" demek; o durumda bisiklet hiç çalışmıyor. O daha büyük bir dert ama benim yaşadığım durum bu değildi.

## Kimsenin bahsetmediği siyah halka

Kutunun içinden küçük, siyah, sert plastik bir halka çıktı. Badass mağazası bunu "5 mm distance bush" olarak listeliyor. 15 mm genişliğinde, 5,3 mm deliği ve 5 mm kalınlığı var. Broşürde kutuyu, pili, mıknatısı, kilidi ve opsiyonel bir cırt kelepçeyi gösteriyorlar ama halka yok. Kurulum videosunda da görünmüyor.

Bunu bir arkadaşımla kurcaladık; halkanın jant teli mıknatısının altına, kelebek vidaya takılıp mıknatısı kutuya yaklaştıracağını tahmin ettik. Kulağa mantıklı geliyordu ama halka mıknatısın altına uymuyor. Tahminimiz yanlıştı, göbekten başlayıp mıknatısı dışa doğru itme fikri de öyle.

## Üreticisine sormak

Badass ve satıcıyla iletişime geçip dört soru sordum: Bu halka ne işe yarıyor, nereye takılıyor, ideal boşluk nedir ve sarı ışık boşluktan mı kaynaklanıyor yoksa kutu mu bozuk?

Badass aynı öğleden sonra dört kısa cümleyle cevap verdi:

1. Gerekirse kutu ile mıknatıs arasındaki mesafeyi azaltır.
2. Sensör ile chainstay arasına takılır.
3. Boşluk 5 ila 10 mm olmalı.
4. "Ja, unwahrscheinlich." (Yani: Evet, boşluk buna sebep olabilir ve cihazın bozuk olması düşük bir ihtimal.)

Satıcı da döndü, beni Badass'e yönlendirdi ve kutu bozuk çıkarsa değiştireceklerini belirttiler. Badass ayrıca bireysel müşterilere bir ay içinde iade imkanı da sunuyor.

Benim bisiklette halka işe yaramadı. Sensörü tekerleğe doğru 5 mm kaldırmak, jant tellerine sürtmesine yol açıyor. O yüzden halka çekmecede kaldı. "Gerekirse" ifadesi tam olarak bunu anlatıyor; sensörü jant tellerinden çok uzakta duran kadrolar için düşünülmüş.

```
yan görünüm

  jant telleri   [mıknatıs]
                    |  5 ila 10 mm
              [ sensördeki kutu ]
              [ 5 mm halka ]        sadece boşluk çok büyükse
  ========== chainstay ==========
```

## Mıknatıs aslında nereye gidiyor

İki şey önemli ve bunlar birbirinden farklı meseleler:

Jant teli üzerindeki konum, mıknatısın kutunun tam hangi noktasından geçeceğini belirliyor. Broşürdeki yeşil tikli görsel, mıknatısı kutunun kablonun ters tarafında, yani kilitli tarafta gösteriyor. Badass'in videosunda ise kutunun göbeğe bakan kenarı işaret ediliyor ve tekerleği elle çevirirken "doğru konumu el yordamıyla bulmanız" öneriliyor.

Boşluk, mıknatıs yüzeyi ile kutu arasındaki mesafe. Badass 5-10 mm diyor. Eski Evation modelleri için Fazua kılavuzu, kutu olmadan sensör ile mıknatıs arasında 4-15 mm arası bir mesafeye izin veriyor.

İşte benim asıl hatam burada. Arka tekerlekte jant telleri birbirini çaprazlıyor ve her ikinci tel chainstay'e biraz daha yakın geçiyor. Benim mıknatıs, daha uzaktaki tellerin birindeydi. Kutudan 15-20 mm uzakta kalıyordu. Bu mesafe çok fazla.

İşe yarayan yöntemim:

1. Arka tekerleği havaya kaldırın ki serbest dönsün.
2. Yavaşça çevirip hangi telin kutuya en yakın geçtiğini bulun.
3. Mıknatısı o tele, yüzü kutuya bakacak ve kutunun hemen yanından geçecek şekilde taşıyın.
4. Tekerleği tekrar çevirin; mıknatıs çok yakın geçmeli ama asla kutuya değmemeli.
5. Hatayı sıfırlamak için bisikleti kapatıp açın, krankları elle bir iki dakika çevirin.
6. Sarı ışık devam ederse mıknatısı tel boyunca birkaç milimetre kaydırıp tekrarlayın.

Yerini düzelttikten sonra stand testinde sarı ışık kayboldu. Uzun süreli sürüş bunu henüz kanıtlamadı.

## Kutudan kaynaklanmayan beyaz ışık

Testin ortasında başka bir şey oldu. Sadece üstteki LED beyaz yanmaya başladı ve neye dokunduysam mod değişmedi. Başlangıçta kumanda renklerini (yeşil, mavi, pembe) geçti, sonra o tek beyaz ışığa döndü.

İlk başta kutunun bir şeyi bozduğunu sandım ama değil. Beyaz, "destek yok" rengi. Ride 50 kılavuzunda "BATTERY boşsa durum göstergesinin üst LED'i beyaz yanar ya da hiç yanmaz" yazıyor. Pilim boş değildi, muhtemelen tam oturmamıştı.

Pili drivepack'ten çıkarıp geri taktım. Tekrar mavi (River modu) oldu ve destek geri geldi.

Eğer bu da işe yaramazsa kılavuzda iki yöntem daha var: Pil üzerindeki düğmeyi 3 saniye basılı tutup kapatıp tekrar açmak (pil korumasını sıfırlar) veya kumandanın orta düğmesine tüm ışıklar sönene kadar 8 saniye basılı tutmak. Sonrasında üst LED yeşil veya mavi yanana kadar bekleyip sistemi normal şekilde başlatabilirsiniz.

## Firmware, uygulama ve neden onlara dokunmadım

Kumanda hız göstermiyor, bu yüzden test etmek için FAZUA uygulamasını indirdim ama bağlanmadı. Yeni FAZUA uygulaması en güncel firmware'i istiyor; Ride 50'de ayrıca sadece eski Rider App üzerinden çalışan bir Bluetooth çipi güncellemesi gerekiyor.

Badass, mağaza sayfalarında motor firmware'ini güncellemeyin diyor çünkü güncellemeler tuning kapısını kapatabilir. "Çalışan bir e-bisikletin güncellenmeye ihtiyacı yoktur." Ben de güncellemedim ve testleri uygulamasız yaptım.

Yine de hiçbir şeyi değiştirmeden firmware'i görebilirsiniz. Ücretsiz FAZUA Toolbox bilgisayarda çalışıyor. Drivepack'i çıkarın, pili takın, USB kapağını açıp mini USB kablosuyla bağlayın; yazılım sürümü ve hata kodlarını gösterecektir. Asla "update" tuşuna basmayın. Sürüşten önce kapağı mutlaka kapatın, çünkü kapağı olmayan bir drivepack su geçirebilir. Buna henüz ihtiyacım olmadı.

## Bir dahaki sefere şu sırayla denerim

1. Önce kutunun içindeki AAA pili kontrol et. Multimetre 1,5 V civarında bir değer göstermeli. Badass şarj edilebilir değil, normal pil istiyor.
2. Bisikleti kutusuz dene, mıknatısı eski yerine geri tak. Eğer kutu takılı değilken sarı ışık yanıp sönüyorsa, sorun bisiklette, kutuda değil.
3. Kutuyu klik sesi gelene kadar ittir. Mıknatıs, jant teline en yakın noktadan, yani klik kilidinin olduğu uçtan geçmeli.
4. Aralık 5 ile 10 mm arası olsun; yakın olsun ama asla birbirine değmesin.
5. Her sarı ışıktan sonra sistemi yeniden başlat, bir dakika test et; her seferinde sadece bir şeyi değiştir.
6. Sadece üstteki LED beyaz yanıyorsa sorun pildedir, kutuda değil. Pili çıkar, tekrar yerine tak.
7. Firmware falan, o işlere hiç girme.
8. Hiçbiri işe yaramazsa, kutunun ve mıknatısın fotoğraflarını çekip service@badassebikes.com adresine yaz. Bana aynı gün cevap verdiler.

Badass zaten kutunun Alman StVO kurallarına göre trafiğe açık yollarda yasak olduğunu, sadece özel mülkte kullanılabileceğini belirtiyor. Kutuyu çıkardığında bisiklet zaten orijinal haline dönüyor.
