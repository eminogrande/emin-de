---
title: "Spark cüzdan deneyimi ve Lightning akışı: Bir geliştirme günlüğü"
description: "Spark cüzdanın mevcut Bitcoin ekranıyla birebir aynı görünmesini istedim. Bunu minimum kodla, hiçbir kopya veya eski kod yığınına ihtiyaç duymadan başardım. Ayrıca..."
date: "2026-01-09T14:25:01Z"
updated: "2026-01-09"
lang: tr
translated_from: "en/spark-wallet-ux-lightning-flow-chronological-build-log"
source_sections: ["making-spark-look-like-bitcoin", "the-receive-screen", "killing-the-loading-delays", "send-lnurl-and-lightning-addresses", "sending-to-a-normal-bitcoin-address", "refinements", "how-i-worked-with-the-agent"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/spark-wallet-ux-lightning-flow-chronological-build-log/cover.webp"
tldr: ["Spark cüzdanın mevcut Bitcoin ekranıyla birebir aynı görünmesini istedim; bunu yaparken kod tekrarından kaçındım ve minimum kod kullandım.", "Alma, gönderme, LNURL, Lightning adresleri ve Spark'tan L1'e çekimler artık aktif. Yükleme sürelerini sıfırlamak için önbellekleme sistemi de ekledik.", "Git komutu yok, test yok; her değişiklik doğrudan benim onayımdan geçti."]
sections: [{"basically": "Bitcoin ekranıyla aynı stil, aynı boşluklar, aynı butonlar ve bekleyen transferlerin otomatik olarak çekilmesi."}, {"basically": "Adres en üstte, QR kodu aynı yerinde, ek olarak sats alanı ve Fatura Oluştur butonu."}, {"basically": "Yatırma adresini ve bakiyeyi önbelleğe al, önbellekten yükle ve arka planda güncelle."}, {"basically": "Her gönderim onay ekranından geçiyor, LNURL ve Lightning adresleri de otomatik olarak faturaya dönüşüyor."}, {"basically": "Onchain adresi, Lightning yerine orta hızda bir Spark çıkışına yönleniyor."}, {"basically": "Hatalı girişi temizleyip hata mesajını gösteriyoruz, geçerli bir ön doldurma olduğunda ise doğrudan miktar alanına odaklanıyoruz."}, {"basically": "Hedefim tam olarak Bitcoin ekranıydı. Tüm uyumsuzlukları tek tek ayıkladım ve kusursuz bir kopya elde ettim."}]
---
![](../../../media/spark-wallet-ux-lightning-flow-chronological-build-log/cover.jpg)

# Spark cüzdan UX'i ve Lightning akışı: Bir geliştirme günlüğü

Spark cüzdanının tıpkı mevcut Bitcoin ekranı gibi görünmesini istedim. Kod minimumda kalmalıydı; kod tekrarı veya eski (legacy) kod istemedim. Yapay zeka için sıkı kurallar koydum: Git komutu kullanmadık, test yazmadık. Herhangi bir şey hayata geçirilmeden önce benden onay aldık. Kısa ve net cevaplar istedim. Alma ve gönderme akışları Bitcoin arayüzünü birebir yansıtmalı, Lightning faturalarını ve LNURL'i desteklemeliydi. Daha sonra Spark üzerinden onchain çekimleri de sisteme dahil edecektik.

Süreç sırasıyla şöyle işledi.

## Spark'ı Bitcoin cüzdanıyla eşlemek

İlk hedef basitti: `screens/SparkBitcoinWalletScreen.tsx`, `screens/BitcoinScreen.tsx` ile aynı görünmeliydi. Bu yüzden Spark ekranındaki stilleri, boşlukları, tipografiyi ve buton yerleşimini Bitcoin ekranına göre hizaladık. Artık alma ve gönderme butonları birebir aynı.

Bir davranışı da değiştirdik: Spark ekranı artık bekleyen transferleri kendisi kontrol ediyor ve otomatik olarak Spark cüzdanına çekiyor.

Header'daki Apple Pay butonu yerinde duruyor. İleride Spark para yatırma adresini oraya geçirebilmek için orada bir yer tutucu (placeholder) bıraktık.

## Alma ekranı

Sırada Spark alma ekranının, Bitcoin alma ekranıyla aynı düzene sahip olması vardı. `screens/SparkBitcoinReceiveModal.tsx` üzerinde değişiklik yaptık. Adres artık en üstte. QR kod, Bitcoin alma ekranıyla aynı konumda. Paylaşma ve kopyalamak için dokunma özellikleri de yine Bitcoin arayüzündeki gibi çalışıyor.

Fatura oluşturmak için artık bir sats giriş alanı var. Stili, Bitcoin gönderme ekranındaki miktar girişiyle aynı. Eşleşme olması için altında euro karşılığı da mevcut. Butonda ise artık "Fatura Oluştur" yazıyor.

Fatura oluşturmadan önce para yatırma adresini görüyorsun, henüz fatura QR kodu yok. Bir tane oluşturduktan sonra aynı stilde sadece fatura ve fatura QR kodu görünüyor.

## Yükleme gecikmelerini yok etmek

Ekranda uzun yükleme gecikmeleri oluyordu, bunların gitmesini istedim. Artık Spark para yatırma adresini ve bakiyeyi önbelleğe (cache) alıyoruz. Spark ekranı önce önbellekten yükleniyor, arka planda ise güncelleniyor.

## Gönderme, LNURL ve Lightning adresleri

Gönderme akışı, Bitcoin gönderme akışını yansıtmalı ve sonunda bir onay adımı olmalıydı. "Tara veya yapıştır" özelliği artık `screens/SparkLightningSendModal.tsx` içinde. Gönderici, ödeme gerçekleşmeden önce her zaman bir onay ekranı görüyor. Eğer faturanın tutarı sıfırsa, göndermek yerine miktarı soruyoruz.

Daha sonra LNURL pay ve Lightning adresi girişleri için destek ekledik. Yeni bir servisimiz var: `services/SparkLnurlService.ts`. Girdileri normalize ediyor, `lightning:` önekini temizliyor, `resolveLnurlPayRequest` ile LNURL pay isteğini çözüyor ve `requestLnurlInvoice` ile LNURL callback'inden faturayı istiyor.

`screens/SparkLightningSendModal.tsx` içindeki gönderme modalı artık LNURL bech32, LNURL URL'leri ve Lightning adreslerini kabul ediyor. Miktar, LNURL'in minimum değerine göre kısıtlanıyor ve minimum değer otomatik olarak dolduruluyor. Ağ hatalarını kullanıcı arayüzünde göstermiyoruz, bunları sadece log kayıtları için tutuyoruz. Girdi geçersizse önceden doldurulmuş veriyi temizleyip giriş alanını vurguluyoruz; geçersiz veri göstermiyoruz.

## Normal bir Bitcoin adresine göndermek

"Normal bir Bitcoin adresine" yani Spark → L1 transferi de eklemek istedim. `services/SparkBitcoinWalletService.ts` dosyasını güncelledik. `withdrawToBitcoinAddress` fonksiyonu, `Spark getWithdrawalFeeQuote` ve `withdraw` metotlarını kullanıyor. Varsayılan çıkış hızı `ExitSpeed.MEDIUM` olarak ayarlandı. Güvenlik için loglarda adres kısaltılıyor.

`screens/SparkBitcoinWalletScreen.tsx` içindeki ekran mantığı da değişti. `handleConfirmSend`, onchain adresini algılıyor ve `payLightningInvoice` yerine `withdrawToBitcoinAddress`e yönlendiriyor. Çekimden sonra Spark bakiyesini ve bekleyen depozitoları yeniliyor.

## İyileştirmeler

Sonrasında birkaç ufak dokunuş yaptım. Eğer yapıştırılan veya taranan şey geçerli bir fatura, adres veya LNURL değilse giriş alanı temizleniyor ve vurgulanıyor. Geçerli bir veri girildiğinde miktar alanına otomatik odaklanılıyor. İmleç miktarın sonunda kalıyor ve sayısal tuş takımı hemen açılıyor. Miktar bloğu header ile CTA arasında dikey olarak ortalandı. Header'da bir memo varsa o görünüyor; yoksa "Lightning Gönder", onchain işlemlerde ise "Bitcoin Gönder" yazıyor.

## Yapay zeka ile çalışma yöntemi

Net görsel karşılaştırmalar verdim. Bitcoin ekranı tam hedefti. Arayüz uymadığında, ikonu, boşluğu veya dizilimi olsun, hemen yakaladım ve birebir kopyasını istedim. Minimum kodu önceledim ve "fallback" mantığını reddettim. Her değişikliği adım adım onayladım ve uç durumları (edge cases) temizledim. Sıfır tutarlı faturalar onay istemeli. LNURL şimdilik sadece ödeme için. Ağ hataları kullanıcıya ulaşmamalı. Her yerde aynı UX akışını tutturmak için zorladım; özellikle onay, doğrulama ve miktar girişi konusunda.

Yapmadığımız şeyler de var: Git komutu yok. Test yok; bunu özellikle ben istedim. Orijinal Bitcoin ekranında hiçbir değişiklik yok.

Spark cüzdanı arayüzü artık Bitcoin ekranı düzeniyle aynı. Alma modalı, Spark para yatırma adresi ve fatura oluşturma özelliğiyle Bitcoin alma akışına uygun. Gönderme modalı; Lightning faturalarını, LNURL'i, Lightning adreslerini ve onchain BTC adreslerini destekliyor. Geçersiz girdi hiçbir zaman otomatik dolmuyor ve miktar girişi odaklı ve ortalı. Spark bakiyesi ve para yatırma adresi önbelleklendiği için arayüz artık çok daha hızlı.
