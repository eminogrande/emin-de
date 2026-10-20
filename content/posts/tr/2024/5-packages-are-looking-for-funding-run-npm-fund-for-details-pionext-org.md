---
title: "5 paket fon arıyor, detaylar için `npm fund` çalıştırın, pionext.org"
description: "npm fund zaten hangi paketlerin paraya ihtiyacı olduğunu gösteriyor. NPM Fund bunu bonding curve üzerinde bir token piyasasına dönüştürüyor, böylece geliştiriciler sürekli para kazanıyor."
date: "2024-11-11T08:21:26.089Z"
updated: "2024-11-11"
lang: tr
translated_from: "en/5-packages-are-looking-for-funding-run-npm-fund-for-details-pionext-org"
source_sections: ["how-it-works", "who-gets-what", "the-system", "what-is-new-here", "developing-idea"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/5-packages-are-looking-for-funding-run-npm-fund-for-details-pionext-org/01-3ad92161.png"
tldr: ["NPM Fund, her npm paketi için sürekli bir token piyasası fikri, açık kaynak fonlaması için pump.fun gibi.", "Her paket token'ı, maksimum arzı olmayan, yerleşik likiditesi bulunan ve fiyatı arz tarafından belirlenen bir bonding curve üzerinde duruyor.", "Geliştiriciler tüm token etkileşimlerinden %21 pay alıyor, otomatik olarak ödeniyor, hibe başvurusu yok."]
sections: [{"basically": "Her paket sonsuz bir curve üzerinde bir token alıyor: istediğin zaman mint et veya yak, likidite matematik tarafından garanti ediliyor."}, {"basically": "Geliştiriciler düzenli fee'ler alıyor, katkıda bulunanlar erken girebiliyor ve yatırımcılar hesaplayabilecekleri fiyatlar elde ediyor."}, {"basically": "Veriler npm fund'dan geliyor, geliştiriciler GitHub üzerinden doğrulama yapıyor ve dağıtım üç aşamada ilerliyor."}, {"basically": "Asla bitmeyen piyasalar, uyumlu teşvikler ve kilitlenme, dış piyasa yapıcıları veya yield farming yok."}, {"basically": "Plan: paket başına takas edilebilir bir meme coin, böylece paket hype olduğunda geliştirici daha fazla kazanıyor."}]
---
# 21 npm paketi fon arıyor, detaylar için `npm fund` çalıştırın

npm.fund, npm paketlerini fonlamak için çıkarılmış bir pump.fun türevi.

![](../../../media/5-packages-are-looking-for-funding-run-npm-fund-for-details-pionext-org/01-3ad92161.png)

NPM Fund, açık kaynak paketleri için otomatik ve sürekli bir token piyasası yaratıyor. Olay üç temel fikre dayanıyor. Birincisi, token'ların içerik ve projelerin değerini temsil ettiği kürasyon piyasaları. İkincisi, fiyatı otomatik olarak belirleyen ve her zaman likidite sağlayan bonding curve'ler. Üçüncüsü de pump.fun'ın token çıkarma mantığı; yani adil ve botların manipüle etmesinin zor olduğu bir yöntem. İşin yeni tarafı ise bunu `npm fund` gibi halihazırda kullanılan bir fonlama aracıyla birleştirmek. Böylece açık kaynak geliştiricileri hiç bitmeyecek bir gelir akışına kavuşuyor.

## Nasıl çalışıyor

Her paketin kendi token'ı var ve geleneksel bir token lansmanından ya da DEX piyasasından farklı olarak bu token'lar her zaman üretilebilir (mint) veya yakılabilir (burn). Maksimum arz diye bir şey yok, sistem token arz etmeyi asla durdurmuyor. Her zaman alıp satabiliyorsun, dışarıdan market maker'lara ihtiyacın yok ve fiyat sürekli güncelleniyor. Bitmeyen bir eğri bu. İsteyen istediği zaman yeni token üretebilir, isteyen istediği zaman elindeki token'ları yakıp karşılığındaki varlığı alabilir. Fiyat arzla birlikte kendiliğinden değişiyor, likidite de matematiksel olarak garanti.

Klasik bir token lansmanında sınırlı arz ve küçük bir ilk dağıtım olur; DEX'te likiditeye ihtiyaç duyarsın, manipüle etmesi kolaydır ve insanlar önüne geçebilir (front-run). NPM Fund piyasasında ise arz sınırı yok, piyasa her zaman açık, likidite sistemin içine gömülü, manipüle etmek zor ve fiyat tahmin edilebilir.

Bunu çalıştıran üç ekonomik mekanizma var. Birincisi değer yakalama. Geliştiriciler tüm token işlemlerinden %21 pay alıyor. Ücretler (fee) otomatik ve sürekli ödeniyor; kimsenin hibe başvurusuna veya sponsor aramasına gerek kalmıyor. İkincisi fiyat keşfi. Fiyat arzla birlikte artıyor, yani erken destekleyenler daha iyi fiyattan giriyor ve piyasanın o paket hakkında ne düşündüğü doğrudan fiyata yansıyor. Üçüncüsü ise garantili likidite. Bonding curve her zaman teminat tutuyor, istediğin zaman çıkabiliyorsun ve dışarıdaki market maker'lara muhtaç değilsin.

## Kim ne kazanıyor

Geliştiriciler kesilmeyen bir gelir akışı elde ediyor, herhangi bir token mühendisliğiyle uğraşmaları gerekmiyor, ücretler otomatik yatıyor ve token mekanikleri herkesi aynı tarafta buluşturuyor. Katılımcılar ise katkı sağlamadan önce token alabiliyor, sonra paketi geliştirmeye yardım ediyor ve paket başarılı oldukça token da değerlenebiliyor. İstediği zaman da kur üzerinden sistemden çıkabiliyor. Yatırımcılar içinse hesaplanabilir giriş-çıkış fiyatları, garantili likidite, erken girmenin avantajı ve paketin başarısına doğrudan ortak olma şansı var.

Token değerini belirleyen şey paketin kaç kişi tarafından kullanıldığı, geliştiricilerin aktifliği, token'a olan talep ve ekosistemin büyümesi. Fiyat, güncel arz üzerinden sürekli ve otomatik olarak oluşuyor, piyasada ne oluyorsa onu yansıtıyor ve öyle anlamsızca zıplayıp durmuyor. Likidite her zaman orada, kendi kendini dengeliyor, dışarıdan hiçbir şeye bağlı değil ve matematikle garanti altında.

## Sistem

Veri akışı 4 adımda ilerliyor: Fonlama verisi `npm fund`dan geliyor, geliştirici GitHub üzerinden doğrulanıyor, sürekli bir token piyasası oluşturuluyor ve ücretler otomatik dağıtılıyor. Kullanıcılar içinse olay çok basit: Teminat göndererek token üretiyorsun, fiyat yeni arza göre değişiyor, geliştirici her işlemden komisyonunu alıyor ve sen de token'larını istediğin zaman yakabiliyorsun.

1. Faz çekirdek yapı; tek geliştirici desteği, temel token mekanikleri, GitHub doğrulaması ve haftalık veri güncellemelerini içeriyor. 2. Faz süreçleri iyileştiriyor; daha fazla geliştirici desteği, gelişmiş ücret dağıtımı, daha iyi analizler ve gerçek zamanlı paket verileri ekliyor. 3. Faz ise ekosistem; yönetişim, paketler arası teşvikler, katkı takibi ve piyasa analizi araçları.

## Yenilik nerede

Buradaki yenilik üç şeye dayanıyor: Hiç bitmeyen piyasalar; token'lar her zaman mevcut, maksimum arz yok, her zaman likit ve fiyat sistemin içinde oluşuyor. Birbirini destekleyen teşvikler; katılımcılar erkenden dahil olmak istiyor, geliştiriciler sürekli fon alıyor, kullanıcılar paketleri doğrudan destekleyebiliyor ve yarattığın değer kadar kazanç elde ediyorsun. Bir de verimli piyasa; token kilitleme yok, dışarıdan market maker yok, likidite madenciliği veya yield farming derdi yok.

NPM Fund, açık kaynağı fonlamak için yeni bir yol. Web3'teki zaten çalışan mekanizmaları alıp, halihazırda var olan npm ekosistemine yerleştiriyor ki paket geliştiricileri uzun vadeli fonlanabilsin.

## Gelişmekte olan fikir

Bu gelişmekte olan bir hikaye, daha fazlasını görmek için önümüzdeki günlerde tekrar uğra. Kısaca: npm paket yükleyicisi, fon arayan paketleri görünür kılıyor. Ben de insanların alıp satabileceği, pakete endeksli bir pump.fun meme coin'i yaratarak bu projeleri fonlamayı kolay ve ödüllendirici hale getirmek istiyorum. Böylece geliştirici parasını alıyor; ister ücretlerden, ister adil bir lansman payından. Paket ne kadar çok konuşulur ve kullanılırsa o kadar çok kazanıyor, kimse takmadığında veya oyunun dışında kaldığında ise daha az.

![](../../../media/5-packages-are-looking-for-funding-run-npm-fund-for-details-pionext-org/02-6fbb216c.png)
*npm fund terminali üzerinden ücretsiz yazılımı için yardım isteyen bir geliştirici*

![](../../../media/5-packages-are-looking-for-funding-run-npm-fund-for-details-pionext-org/03-d7352ab6.png)
*bedava kullandığı yazılım için beş kuruş ödemeyip yine de vaktini ayırıp şikayet eden ve geliştiriciyi darlayan sinirli bir kullanıcıdan özür dileyen bir açık kaynak geliştiricisi. SİKTİR GİT.*
