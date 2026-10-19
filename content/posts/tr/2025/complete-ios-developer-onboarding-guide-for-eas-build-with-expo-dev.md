---
title: "Expo.dev ve EAS Build ile Eksiksiz iOS Geliştirici Onboarding Rehberi"
description: "Yeni bir iOS geliştiricisinin EAS Build ve Expo ile çalışmaya başlaması için gereken her şey. Apple ve Expo davetlerinden telefondaki ilk build'e kadar tüm süreç. Mac'e hiç gerek yok."
date: "2025-08-29T07:15:02Z"
updated: "2025-08-29"
lang: tr
translated_from: "en/complete-ios-developer-onboarding-guide-for-eas-build-with-expo-dev"
source_sections: ["what-you-do-first-as-the-company-admin", "what-the-developer-does", "the-first-development-build", "on-the-iphone", "every-day-after-that", "when-something-breaks"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/complete-ios-developer-onboarding-guide-for-eas-build-with-expo-dev/cover.webp"
tldr: ["Yeni bir iOS geliştiricisi, Mac kullanmadan EAS Build ve Expo ile uygulama çıktısı alabilir.", "Admin geliştiriciyi Apple Developer ve Expo hesaplarına davet eder, cihazı sisteme kaydeder ve repoya erişim izni verir; geliştirici de kurulumu yapıp build'i alır.", "Development build'ler telefonda yerel geliştirme sunucusuyla çalışır, production build'ler ise doğrudan TestFlight'a gider."]
sections: [{"basically": "Admin; geliştiriciyi Apple, App Store Connect ve Expo'ya davet eder, cihazın UDID'sini kaydeder ve repoyu açar."}, {"basically": "Davetleri kabul et, Node ve EAS CLI kurulumunu yap, kendi Expo hesabınla giriş yap ve repoyu bilgisayarına çek."}, {"basically": "eas.json dosyasını kontrol et, ardından development profiliyle eas build komutunu çalıştır. Sertifika (signing) süreçlerini EAS halleder."}, {"basically": "Telefonda Geliştirici Modu'nu aç, uygulamayı kur ve ayarlardan geliştirici profiline güven."}, {"basically": "Geliştirme sunucusunu başlat, telefonu aynı Wi-Fi ağına bağla ve preview ya da production build'lerini gönder."}, {"basically": "Hataların çoğu eksik UDID, kapalı Geliştirici Modu ya da aynı ağda olmamaktan kaynaklanır."}]
---
![](../../../media/complete-ios-developer-onboarding-guide-for-eas-build-with-expo-dev/cover.jpg)

Yeni bir iOS geliştiricisini EAS Build ile yayına hazırlamak için gereken adımların tam listesi burada. Hiçbir aşamada Mac kullanmana gerek yok. Her şey Windows veya Linux üzerinden, EAS Build bulut servisi sayesinde hallediliyor.

Başlamadan önce temel ihtiyaçları listeleyelim. Geliştiriciden repo URL'sini, proje ismini, çalışacağı branch bilgisini ve varsa ENV değişkenlerini veya gizli anahtarları almalısın. Senin de ondan e-posta adresini, iPhone UDID numarasını ve davetleri kabul ettiğine dair teyit alman gerekiyor. EAS; sertifikalar, provisioning profilleri, kod imzalama ve bundle ID ayarları gibi detayları zaten otomatik yönetiyor.

## Şirket yöneticisi olarak ilk yapman gerekenler

1. Geliştiriciyi Apple Developer hesabına ekle. https://developer.apple.com adresine git, "Users and Access" kısmına tıkla, "+" butonuna bas, geliştiricinin e-postasını gir, "Admin" veya "Developer" rolünü seç ve davet gönder.
2. App Store Connect'e ekle. https://appstoreconnect.apple.com/access/users adresine git, "+"'ya bas, aynı e-postayı gir, uygun rolü seç (Developer, Admin veya App Manager) ve davet et.
3. Expo organizasyonuna ekle. https://expo.dev adresine git, Settings → Members kısmını aç, "Invite Member"a tıkla, e-postasını gir, "Developer" veya "Admin" seçip davet gönder.
4. Cihazın UDID numarasını al. Geliştiriciden Settings → General → About kısmına gitmesini, "Serial Number"ın üzerine basılı tutarak "UDID"nin görünmesini sağlamasını ve çıkan kodu sana göndermesini iste.
5. Cihazı Apple Developer portalına kaydet. https://developer.apple.com adresine git, "Devices" kısmını aç, "+"'ya tıkla, bir isim ver (mesela "John'un iPhone 14"), UDID'yi gir ve kaydet.
6. Repoya erişim ver. GitHub, GitLab veya Bitbucket üzerinden ekle, gerekli izinleri tanımla ve repo URL'sini kendisine gönder.

## Geliştiricinin yapması gerekenler

7. Apple Developer davetini kabul et. E-postana gelecektir. Linke tıkla, kişisel Apple ID'n ile giriş yap (yoksa bir tane oluştur) ve kullanım koşullarını onayla.
8. Aynı işlemi App Store Connect daveti için yap, yine aynı Apple ID'yi kullan ve şartları onayla.
9. Bir Expo hesabı oluştur. https://expo.dev adresine git, aynı e-posta ile kayıt ol, doğrula ve gelen organizasyon davetini kabul et.
10. Bilgisayarını hazırla. Node.js (v16 veya üstü), Git ve kullandığın editörü (VS Code vb.) kur, bir terminal aç.
11. CLI araçlarını yükle.
```bash
npm install -g expo-cli
npm install -g eas-cli
```

12. Şirketin değil, kendi kişisel Expo hesabınla Expo ve EAS'e giriş yap.
```bash
eas login
# Kendi kişisel Expo bilgilerini gir
```

13. Projeyi clone'la ve kurulumu yap.
```bash
git clone [repository-url]
cd [project-name]
npm install
```

## İlk development build

14. eas.json dosyasının yerinde olduğunu ve bir development profili içerdiğini kontrol et.
```bash
# eas.json'ın varlığını ve development profilini kontrol et
cat eas.json
```

15. Development build işlemini başlat.
```bash
eas build --profile development --platform ios
```
EAS, şirketin kayıtlı kimlik bilgilerini otomatik olarak kullanır. Build 10-20 dakika sürer ve bittiğinde Expo dashboard'unda görünür.

## iPhone üzerinde

16. Developer Mode'u aç (iOS 16 ve üzeri). Settings → Privacy & Security kısmına git. "Developer Mode" seçeneği, 17. adımdaki kurulumu bir kez denedikten sonra görünecektir. Açtığında telefon yeniden başlar, sonra "Turn On Developer Mode"a basıp şifrenle onayla.
17. Build'i yükle. iPhone'daki Safari'den EAS dashboard'unu aç veya build bitince terminalin sana verdiği linke tıkla ve "Install"a bas. Eğer Developer Mode açık değilse hata alırsın, bu durumda 16. adıma dön.
18. Geliştirici sertifikasına güven. Settings → General → VPN & Device Management kısmına git, "Developer App" altındaki profili bul, şirket isminin yazılı olduğu profile tıkla, "[Şirket Adı]'a Güven"e bas ve onayla.
19. Uygulamayı aç. İkon artık ana ekranda, tıkla ve çalıştır.

## Sonrasındaki günlük rutin

20. Development server'ı başlat.
```bash
# Proje dizininde
npx expo start --dev-client
```

21. Telefonu bağla. iPhone ve bilgisayar aynı WiFi ağında olmalı. Yüklü olan uygulamayı aç, Metro bundler ile eşleşsin. Kod yazdıkça değişiklikleri canlı olarak göreceksin.
22. İhtiyacın oldukça yeni build'ler al.
```bash
# Development build (test için)
eas build --profile development --platform ios

# Preview build (iç testler için)
eas build --profile preview --platform ios

# Production build (App Store için)
eas build --profile production --platform ios
```

23. TestFlight'a gönder.
```bash
# Production build bittikten sonra
eas submit -p ios
```

## Bir şeyler ters gittiğinde

24. Eğer build yüklenmiyorsa; UDID'nin Apple Developer'da kayıtlı olduğundan, Developer Mode'un açık olduğundan ve cihaz yönetimi güveninin ayarlandığından emin ol, sonra `--clear-cache` komutuyla tekrar build al.
25. Expo projesine giremiyorsan; doğru Expo hesabıyla giriş yapıp yapmadığını ve organizasyon davetini kabul edip etmediğini kontrol et, `eas whoami` komutuyla kimlik bilgilerini teyit et.
26. Build hata verirse; Apple Developer erişiminin aktif olup olmadığını kontrol et, eas.json dosyasını incele, bundle ID'nin Apple ayarlarıyla eşleştiğinden emin ol ve EAS dashboard'undaki build log'larını oku.
