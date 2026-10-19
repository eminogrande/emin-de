---
title: "Seed phrase'i tarihe gömen, tedarik zinciri riskini azaltan, körü körüne imza atmayı engelleyip doğrulanmış işlemi şart koşan, Passkey tabanlı 2-of-2 Taproot cüzdan mimarisi"
description: "Seed phrase gerektirmeyen bir Bitcoin cüzdanı. Farklı iki domain üzerindeki iki Passkey, 2-of-2'lik bir MuSig Taproot anahtarı oluşturuyor. Yani sadece tek bir uygulamanın hacklenmesi paranı…"
date: "2025-12-02T09:50:01Z"
updated: "2025-12-02"
lang: tr
translated_from: "en/a-passkey-derived-2-of-2-taproot-wallet-architecture-eliminating-seed-phrases-mi"
source_sections: ["three-weak-spots-in-normal-wallets", "two-passkeys-on-two-domains", "how-a-spend-gets-signed", "what-this-protects-against", "what-you-end-up-with"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/a-passkey-derived-2-of-2-taproot-wallet-architecture-eliminating-seed-phrases-mi/cover.webp"
tldr: ["Farklı iki domain'deki iki Passkey ile 2-of-2'lik bir MuSig Taproot anahtarı kuruluyor, yani her harcama için iki imza da zorunlu.", "Ortada hiçbir şekilde seed phrase üretilmiyor, gösterilmiyor, girilmiyor veya saklanmıyor. Ayrıca ortak imzalayıcı da anahtarları tutmuyor.", "Sadece uygulamanın veya sadece ortak imzalayıcının ele geçirilmesi, parayı çalmak için yeterli değil."]
sections: [{"basically": "Seed phrase transferi, hacklenmiş bir bağımlılık zinciri ve körü körüne imza atma. Bunların her biri cüzdanı sessiz sedasız boşaltabilir."}, {"basically": "nuri.com'da Passkey A, confirm.nuri.com'da Passkey B. İki domain de birbirinin Passkey'ine erişemez."}, {"basically": "Uygulama işlemi hazırlar ve yarım imza atar. Ortak imzalayıcı işlemi çözer, sana gösterir ve ikinci imzayı basar."}, {"basically": "Bir saldırganın parayı çalabilmesi için hem uygulamayı hem de ortak imzalayıcıyı aynı anda ele geçirmesi gerekir."}, {"basically": "Seed phrase derdi olmadan, ek bir eklenti kurmadan veya istemci tarafına güvenmek zorunda kalmadan, web, iOS ve Android'de gerçek self-custody."}]
---
Bu yazı, seed phrase derdini tamamen tarihe gömen, uzun süreli özel anahtarları (private key) cihazda saklamayan ve günümüz yazılım cüzdanlarının en büyük baş belalarından biri olan bağımlılık (dependency) zinciri veya build süreci hacklenmesi risklerini ortadan kaldıran bir cüzdan mimarisini anlatıyor.

Tasarımda birbirinden bağımsız iki passkey kullanılıyor. Her biri farklı bir domaine bağlı ve her biri, deterministik anahtar verisi oluşturmak için WebAuthn PRF uzantısını çağırıyor. Bu iki anahtar, 2-of-2 MuSig Taproot birleştirilmiş anahtarını oluşturuyor; yani her harcama işlemi için iki imza da zorunlu kılınıyor. İmzalama sürecinin ilk aşaması kullanıcının kendi uygulamasında gerçekleşirken, ikincisi tamamen ayrı ve izole bir co-signing (ortak imzalama) domaininde yapılıyor; burası işlemi ayrıca çözümlüyor ve kullanıcıya doğrulatıyor.

## Normal cüzdanlardaki üç zayıf nokta

Bu yapı, klasik cüzdan tasarımlarındaki üç temel zayıflığa karşı geliştirildi: seed phrase açıkta kalması, kör imzalama (blind signing) ve hacklenmiş bağımlılık zinciri.

1.1 İçe aktarım (import) sırasında seed phrase açığı. Seed phrase mantığıyla çalışan cüzdanlar, cüzdanı oluştururken ya da kurtarırken size BIP-39 mnemonic veya private key'i ya yazdırır ya da yapıştırtır. Bu an aşırı derecede risklidir. Mnemonic, bellekte düz metin olarak durur ve herhangi bir kötü niyetli script veya hacklenmiş bir bağımlılık bunu anında görebilir. Panoyu (clipboard) kullanmak ise sırrı işletim sistemi seviyesindeki gözlemcilere ve arka plandaki uygulamalara servis eder. Mobil ve web ortamları; DOM injection, overlay saldırıları, erişilebilirlik taramaları ve pano dinleyicilerine kapı açar. Mnemonic çok kısa bir süreliğine bile açıkta kalsa, birileri fark etmeden anahtarı çalmaya yeter.

Uygulamanın kendisi ya da içindeki herhangi bir bağımlılık hacklenirse, seed phrase belleğe değdiği an ele geçirilebilir. Bu adımı tamamen kaldırırsanız, yazılım cüzdanlarındaki en büyük güvenlik açıklarından birini de yok etmiş olursunuz.

1.2 Tedarik zinciri (supply chain) saldırıları. React, React Native ve Expo gibi modern front-end yığınları, yüzlerce dolaylı bağımlılığı içeri çeker. Tek bir bağımlılık güncellemesi veya build sürecine enjekte edilen bir değişiklik; hassas verileri dışarı sızdırabilir, işlem parametrelerini değiştirebilir, kullanıcı arayüzünün (UI) işlem verilerini manipüle edebilir ya da anahtar verilerini loglayıp çalabilir.

Cüzdan, böyle bir ortamda saklanan veya türetilen tek bir özel anahtara güvendiğinde, tedarik zinciri saldırısı kullanıcının fonlarını sessiz sedasız tamamen boşaltabilir.

1.3 Kör imzalama ve yanlış yönlendirme. Tek bir ortamda çalışan cüzdanlarda, işlemi oluşturan uygulama ile işlem özetini gösterip imzalayan uygulama aynıdır. Manipüle edilmiş ya da hacklenmiş bir arayüz, varış adreslerini değiştirebilir, yanlış tutarlar veya fee'ler gösterebilir ve zararsız veriler gösterirken arka planda kötü niyetli işlemlere geçerli imzalar atabilir. Bağımsız bir kontrol mekanizması olmazsa, kullanıcı bir şeylerin ters gittiğini anlayamaz.

## İki domain üzerinde iki passkey

Sistem iki passkey kullanıyor. Passkey A, `nuri.com` RPID'sine kayıtlı ve web, iOS ve Android'deki ana uygulamada kullanılıyor. Passkey B ise `confirm.nuri.com` RPID'sine kayıtlı ve sadece ayrı bir ortak imzalama sitesinde kullanılıyor.

Her iki passkey de WebAuthn PRF uzantısını kullanıyor, bu da yüksek entropili deterministik PRF çıktıları sağlıyor. `PRF_A`, imzalama anahtarı `k₁`'i türetmek için; `PRF_B` ise imzalama anahtarı `k₂`'yi türetmek için kullanılıyor.

Bu anahtarlar MuSig 2-of-2 Taproot anahtarında birleştiriliyor ve bu da zincir üstünde tek bir birleştirilmiş public key veriyor. Taproot çıktısından harcama yapmak için her iki kısmi imza da gerekiyor. Uygulama imzalama faktörlerinden birini kontrol ederken, ayrı bir web domaini ikincisini kontrol ediyor. Platform, RPID sınırını zorunlu tuttuğu için iki domain de birbirinin passkey'ine erişemiyor.

## Harcama işlemi nasıl imzalanıyor

3.1 `nuri.com` üzerinde hazırlama ve kısmi imzalama. Bu ilk akış altı adımdan oluşuyor. Kullanıcı uygulama içinde işlemi oluşturuyor, uygulama da girdi, çıktı ve fee'leri içeren bir PSBT hazırlıyor. Ardından kullanıcı Passkey A ile kimlik doğruluyor, bu `PRF_A`'yı üretiyor ve deterministik bir KDF, `k₁` anahtarını türetiyor. Uygulama `k₁` ile kısmi bir MuSig imzası oluşturuyor ve kısmi imzalı PSBT, bağımsız ortak imzalama domainine iletiliyor.

Uygulama işlemi tek başına sonlandıramıyor. Hacklenmiş bir client sadece PSBT hazırlayabilir, işlemi tamamlayamaz.

3.2 `confirm.nuri.com` üzerinde bağımsız kontrol ve ortak imzalama. Bu ikinci akış yedi adımdan oluşuyor. Önce kullanıcı ortak imzalama sitesine yönlendiriliyor. Tarayıcı ve WebAuthn RPID modeli, bu domaini uygulamadan izole tutuyor. Ortak imzalama sunucusu, PSBT'yi kendi başına ayrıştırıp çözümlüyor ve girdileri, tutarları, varış adreslerini, fee'leri ve para üstü çıktılarını içeren net bir özet sunuyor. Ardından kullanıcı Passkey B ile kimlik doğruluyor, bu `PRF_B`'yi üretiyor ve deterministik bir KDF, `k₂` anahtarını türetiyor. PSBT'yi onayladıktan sonra, ortak imzalayıcı ikinci kısmi MuSig imzasını oluşturuyor. `PRF_B` ve `k₂` hemen sıfırlanıyor (zeroized), sunucuda hiçbir şey saklanmıyor. Sonunda tamamen imzalanmış PSBT uygulamaya dönüyor ve ağa yayınlanıyor.

Yani bu adım size hem ikinci bir imza veriyor hem de yapmak istediğiniz işlemin bağımsız bir teyidini sunuyor; kör imzalama saldırılarını durduran şey de bu.

## Bu sistem nelere karşı koruma sağlıyor

4.1 Seed phrase riskleri tamamen bitti. Hiçbir zaman seed phrase üretilmiyor, gösterilmiyor, girilmiyor veya saklanmıyor. Pano (clipboard) riski yok, içe aktarma formu yok, JavaScript belleğinde sır yok ve cüzdan oluşturulurken bir saldırı penceresi oluşmuyor.

4.2 Hacklenmiş bir uygulama (client) tek başına yeterli değil. Uygulama veya bağımlılıkları hacklense bile, kötü niyetli kod `k₂`'yi türetemez. `confirm.nuri.com` taklidi yapamaz veya Passkey B'yi çağıramaz. Ortak imzalayıcının kısmi imzası olmadan imza işlemini tamamlayamaz. Ayrıca ortak imzalayıcı, işlem detaylarını kendi başına gösterdiği için herhangi bir oynama anında ortaya çıkar. Sadece client'ın hacklenmesi fonları çalmaya yetmez.

4.3 Hacklenmiş bir ortak imzalayıcı da yeterli değil. Ortak imzalama sunucusu veya arayüzü hacklense bile, saldırgan `k₁`'i türetemez. İşlemi başlatamaz, çünkü ilk kısmi imzayı atamaz. Ayrıca RPID bağlaması nedeniyle Passkey A'nın PRF çıktısını da alamaz. Sadece ortak imzalayıcının hacklenmesi de fonları çalmaya yetmez.

4.4 Her iki tarafın da düşmesi gerekiyor. Fonları çalabilmek için hem uygulama tedarik zincirinin hem de ortak imzalama sitesinin tedarik zincirinin koordine bir şekilde hacklenmesi ya da işlem detaylarını her iki sitede de tutarlı bir şekilde değiştiren bir oltalama (phishing) saldırısı gerekiyor. Bu da başarılı bir saldırıyı çok daha zor hale getiriyor.

4.5 Kör imzalama önleniyor. İşlem iki yerde kontrol ediliyor. Önce uygulamada, sonra işlemi kendi başına çözümleyip gösteren ortak imzalama domaininde. Kullanıcı böylece aynı niyetin iki doğrulanmış görüntüsünü alıyor ve bu da tek bir ortamda çalışan cüzdanların en büyük açığını kapatıyor.

4.6 Sunucuda özel anahtar yok. Ortak imzalayıcı hiçbir anahtar verisi saklamıyor. `k₂`'yi sadece WebAuthn işlemi sırasında türetiyor ve sonrasında tüm hassas verileri anında sıfırlıyor. Birinin içine girebileceği uzun süreli bir anahtar veritabanı bulunmuyor.

4.7 WebAuthn RPID ile domain izolasyonu. RPID bağlaması dört şeyi garanti ediyor: Uygulama Passkey B'yi kullanamaz, ortak imzalayıcı Passkey A'yı kullanamaz, oltalama siteleri mevcut passkey'leri yeniden kullanamaz ve mobil/native uygulamalar işletim sistemini farklı bir domain için passkey açmaya kandıramaz. Donanım ve işletim sistemi bu sınırı zorunlu tutuyor.

## Sonuçta ne elde ediyorsun

Hepsini bir araya getirdiğinde elinde seed phrase olmayan bir cüzdan oluyor. Yani kullanıcının girdiği hiçbir gizli veri, import alanı veya pano (clipboard) riski yok. Anahtarlar donanım destekli, çünkü gizli veriler Secure Enclave'den ya da FIDO anahtarlarından geliyor. Bu, 2-of-2 MuSig yapısı; yani iki anahtar da şart ve kimse tek başına harcama yapamıyor. İzolasyon ise platformun zorunlu kıldığı iki ayrı RPID sayesinde sağlanıyor. Co-signer durumsuz (stateless), uzun vadeli bir anahtarı yok; yani sunucuda çalınacak bir şey de yok. Bağımsız kontrol mekanizması kör imzalama işini engelliyor ve üzerinde oynanmış bir PSBT olursa hemen yakalıyor. Ortamlardan sadece birinin hacklenmesi yetmiyor. Üstelik tüm bunlar tarayıcılarda, iOS'ta ve Android'de, hiçbir eklentiye ihtiyaç duymadan tıkır tıkır çalışıyor.

Yani bu mimari, yazılım tabanlı cüzdanlardaki beş ana saldırı vektörünü devre dışı bırakıyor: seed phrase'in açıkta kalması, tedarik zinciri (supply chain) saldırıları, kör imzalama için arayüz (UI) manipülasyonu, tek anahtarın hata payı ve sunucu tarafındaki anahtar hırsızlığı. İmzalama yetkisini birbirinden bağımsız iki domain'e yayıyor ve her birinin kendi passkey'i ile PRF çıktısı var. Her harcama için iki imza da şart. Bu da güvenlik çıtasını ciddi oranda yükseltiyor ama buna rağmen standart tarayıcılarda ve mobil uygulamalarda çalışmaya devam ediyor.

Bitcoin self-custody'sini platform fark etmeksizin güvenli hale getirmenin; seed phrase'siz, eklentisiz ve client yazılım yığınına güvenmek zorunda kalmadan izlenebilecek pratik yolu bu.

Gerekirse bu işi resmi bir spesifikasyona, güvenlik analizine veya uygulamak isteyen yazılımcılar için bir rehbere dönüştürebiliriz.

![IMG_6836](../../../media/a-passkey-derived-2-of-2-taproot-wallet-architecture-eliminating-seed-phrases-mi/IMG_6836.jpeg)
