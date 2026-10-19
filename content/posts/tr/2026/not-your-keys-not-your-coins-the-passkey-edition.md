---
title: "Not your keys, not your coins: Passkey baskısı"
description: "Passkey ile giriş yapmak, anahtarına sahip olmak demek değil. Passkey PRF'in passkey auth'tan neden farklı olduğu ve Nuri'nin bunu gerçek self-custody için neden kullandığı."
date: "2026-04-09T05:55:27.955Z"
updated: "2026-04-09"
lang: tr
translated_from: "en/not-your-keys-not-your-coins-the-passkey-edition"
source_sections: ["passkey-auth-is-not-your-key", "prf-is-not-auth", "what-if-nuricom-disappears", "auth-vs-prf", "what-about-smart-accounts", "the-veracrypt-lesson"]
category: nuri
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/not-your-keys-not-your-coins-the-passkey-edition/01-05a18f2a.png"
tldr: ["Microsoft, VeraCrypt geliştiricisinin imzalama hesabını ne bir uyarı ne de bir itiraz hakkı tanıyarak kapattı. Sıra custodial passkey cüzdanlarına da gelecek.", "Privy, Dynamic veya Turnkey'de passkey auth sadece kim olduğunu kanıtlar. Anahtar ya da parçaları hâlâ onların sunucularında durur.", "WebAuthn PRF uzantısı anahtar materyalini doğrudan donanımından türetir, yani nuri.com yok olsa bile localhost'ta aynı anahtarı alırsın."]
sections: [{"basically": "Passkey'in Privy'nin kasasını açar. Ama o hâlâ onların kasası ve kullanıcıların %1'inden azı anahtarını dışa aktarıyor."}, {"basically": "Aynı credential, aynı salt, aynı 32 byte. İşte bu senin Bitcoin anahtarın, donanımdan geliyor, sunucu yok."}, {"basically": "nuri.com'u localhost'a yönlendir, salt ile PRF'i tetikle, aynı anahtarı alırsın. Kimseden izin almana gerek yok."}, {"basically": "İkisi de passkey kullanır. Biri sana bir sunucunun anahtarlarına erişim verir, diğeri kendi anahtarını yerelde türetir."}, {"basically": "ZeroDev Privy'yi geçer ama yine de bir bundler'a ihtiyacın olur. PRF ile sıfır altyapıya bağımlısın."}, {"basically": "Bir sunucu anahtarının bir parçasını tutuyorsa, kendi parana erişimi kiralıyorsun demektir."}]
---
Microsoft, VeraCrypt geliştiricisinin imzalama sertifikasını pat diye iptal etti. Ne bir uyarı, ne bir e-posta, ne de muhatap olabileceğin bir insan var. Adam bir gün hesabına girmeye çalışıyor ve pat, hesap feshedilmiş. Bir de "İtiraz edemezsiniz" yazıyor.

Adam bu VeraCrypt'i on yıldan uzun süredir tek başına sırtlıyordu. Milyonlarca kullanıcısı var. Kimin umurunda? Microsoft'un otomatik sistemi adamın fişini çekmeye karar verdi, bitti gitti.

WireGuard geliştiricisi mi? Şu an tam olarak aynı şeyi yaşıyor. Hesap askıda, 60 günlük itiraz süresi var, açıklama sıfır.

Senin o "self-custodial" sandığın passkey cüzdanının başına gelecek olan da tam olarak bu. Bak "ihtimal" demiyorum, bu işin kaçarı yok, zaman meselesi.

## Passkey auth senin anahtarın değil

Passkey auth senin anahtarın falan değil. Şunu en baştan netleştirelim, çünkü bütün sektör bu konuyu tamamen yanlış anlıyor.

Privy, Dynamic, Turnkey veya başka bir yerde passkey ile giriş yaptığında sadece kimliğini doğruluyorsun. Hepsi bu. Passkey sadece senin sen olduğunu kanıtlıyor.

Sana özel anahtarını vermiyor. Özel anahtarını veya onun parçalarını tutan altyapıya erişim veriyor, o kadar.

Privy, senin anahtarını Shamir's Secret Sharing ile parçalara bölüyor ve kendi sunucularına dağıtıyor. Passkey'in, Privy'nin kasasını açan kapı anahtarı sadece. Ama kasa hâlâ onların kasası.

Privy göçtü mü? Parçalar gitti. Privy'yi Stripe satın aldı ki zaten aldılar ve yeni yönetim projeyi kapatmaya mı karar verdi? Parçalar gitti. Privy'nin auth sunucusu kötü bir gün mü geçiriyor? İşlem imzalayamazsın.

Evet, ayarlara gizledikleri bir dışa aktar butonu var. Privy'deki 75 milyon hesabın kaçı özel anahtarını gerçekten dışa aktardı dersin? Yüzde 1 bile değildir, bahse girerim.

Peki ya kalan yüzde 99? Kendilerini self-custodial sanıyorlar. Değiller. Bir şirketin tek bir kararıyla her şeylerini kaybetmenin eşiğindeler.

## PRF kimlik doğrulama değildir

PRF kimlik doğrulama değildir. Kimse işin bu kısmını konuşmuyor ama herkesin bunu anlaması lazım.

WebAuthn PRF eklentisi, passkey ile kimlik doğrulamaktan bambaşka bir şey. Olay senin kim olduğunu kanıtlaman değil. Olay, anahtar verisini doğrudan donanımından çekip almak.

PRF ile olan şey tam olarak şu. Kimlik doğrulayıcın, yani Secure Enclave, TPM, YubiKey her neyse, senin kimlik bilgine bağlı bir sır tutar. O sır o donanımdan asla dışarı çıkmaz.

Asla. PRF açıkken kimlik doğruladığında, doğrulayıcı senin verdiğin bir salt değerini alır ve HMAC(credential_secret, salt) hesabını yapar. Sana her seferinde aynı 32 baytlık çıktıyı verir.

Aynı kimlik bilgisi ve aynı salt, aynı çıktı demektir. Her zaman, sonsuza kadar. Sadece matematik, sunucu falan yok.

O 32 baytlık çıktı senin girdi anahtar verindir. Bunu HKDF'den geçirdiğin an Bitcoin özel anahtarın elinde. Cihazında, istersen tamamen offline şekilde, her zaman aynı anahtar.

Nuri'nin yaptığı şey tam olarak bu. Passkey'in bir kasayı açmıyor. Passkey'in kendisi kasa. Anahtar verisi doğrudan elinde tuttuğun donanımdan geliyor. Sunucularda parça yok, arada şirket yok, bağımlı olduğun hiçbir şey yok.

## Ya nuri.com ortadan kaybolursa

"İyi de, ya nuri.com ortadan kaybolursa?" Güzel soru, cevabı da basit: Hiç fark etmez.

WebAuthn kimlik bilgileri bir Relying Party ID'ye bağlıdır, bu da temelinde bir alan adıdır. Nuri için oluşturduğun passkey nuri.com alan adına bağlıdır. Doğrulayıcı, kimlik bilgisini seçerken o ismin SHA-256 hash'ine bakar.

Ama bak doğrulayıcı neye bakmaz biliyor musun? DNS'e bakmaz, sertifika otoritesine bakmaz, o alan adının internette aktif olup olmadığına bile bakmaz.

Yani nuri.com yarın yok olsa bile yapacağın şey şu. Edit /etc/hosts yapıp nuri.com'u 127.0.0.1'e yönlendirirsin. nuri.com için kendi imzaladığın sertifikayla yerel bir HTTPS sunucusu çalıştırırsın.

Tarayıcında [https://nuri.com](https://nuri.com) adresini açarsın. Passkey'i tetikler ve dokümante edilmiş salt ile PRF istersin. Her zaman aldığın o aynı 32 baytı yine alırsın ve özel anahtarını türetirsin.

İnternet yok, sunucu yok, kimseden izin almak yok.

Ya da tarayıcıyı tamamen pas geçip libfido2 ile doğrudan CTAP2 üzerinden doğrulayıcınla konuşursun. rpId = "nuri.com" ayarlarsın, credential ID'ni ve salt değerini verirsin.

Doğrulayıcının isteğin nereden geldiği umurunda bile olmaz. HMAC hesabını yapar ve çıktıyı sana verir.

Bu sistem çalışıyor çünkü PRF doğrudan donanımda koşuyor. Alan adı sadece hangi kimlik bilgisinin kullanılacağını seçmek için var, matematiğin kendisi için değil.

Doğrulayıcı nuri.com'un bir Fortune 500 şirketi mi yoksa 30 saniyede başlattığın bir localhost sayfası mı olduğunu bilmez, önemsemez de.

Privy ile bu dediğimi yapman imkansız. Sunucuları gittiyse parçalar da gitti demektir. Yerel bir kurtarma yolu yok, anahtarını offline almanın bir yolu yok, hiçbir şey yok.

## Auth mu PRF mi

Yani auth ile PRF arasındaki gerçek fark şu.

Privy, Turnkey ve Dynamic gibi passkey auth sistemleri şöyle çalışır: Passkey senin kim olduğunu sunucuya kanıtlar, sunucu da kontrol ettiği anahtar verisine erişmeni sağlar.

Sunucu çöktü mü erişim yok. Alan adı öldü mü erişim yok. Servis henüz ayaktayken anahtarını dışa aktardın aktardın, yoksa kaybettin.

Nuri gibi passkey PRF sistemleri ise şöyle çalışır: Passkey anahtar verisini doğrudan senin donanımından alır, hiçbir sunucu anahtarının tek bir parçasını bile tutmaz. Sunucu çökmüş umurunda olmaz, anahtarı yerel olarak türetirsin.

Alan adı mı öldü, açarsın bir localhost sayfası, aynı anahtarı yine türetirsin. Dışa aktaracak bir şey yok, çünkü anahtarı her zaman passkey'inden çekip alabilirsin.

Biri kimlik doğrulama, diğeri ise kriptografi kullanarak donanımından anahtar çıkarma işlemi. İkisi de passkey kullanıyor ama alakaları yok.

## Smart account'lar ne olacak

Peki ya smart account'lar? ZeroDev ve diğer ERC-4337 sağlayıcıları Privy'den daha iyi durumda. Passkey'in doğrudan imzalıyor, ortada bölünen anahtarlar falan yok. Ama işlemlerini göndermek için hâlâ onların bundler'ına ihtiyacın var ve passkey'in hâlâ onların alan adına bağlı.

Alan adı kısmını yine aynı yöntemle çözersin, localhost numarası burada da yer. Ama sana bir de bundler lazım ve ZeroDev bundler'ını kendi bilgisayarında çalıştıramıyorsun. Yani başka bir tane bulmaya mecbur kalıyorsun. Kurtarabilirsin ama tam anlamıyla bağımsız değilsin.

Nuri ve PRF ile hiçbir altyapıya bağımlı değilsin. Sıfır. Anahtarını türetirsin, elinde bildiğin standart bir Bitcoin özel anahtarı olur ve bunu piyasadaki istediğin cüzdan yazılımıyla kullanabilirsin.

Electrum, Sparrow, Core, hangisi olursa. Çünkü PRF ve HKDF'ten çıkan şey basit bir özel anahtardır. Hangi cüzdanın onu okuduğu umurunda bile olmaz.

## VeraCrypt dersi

İşte VeraCrypt dersi tam olarak bu. Microsoft geliştiriciyi uyarmadı, açıklama yapmadı, itiraz hakkı bile tanımadı. Otomatik bir sistem bir karar verdi ve on yıllık güven tek bir giriş ekranında yok oldu gitti.

Senin passkey'in ile özel anahtarının arasında duran her merkezi auth sağlayıcısı, her şirket, sana da aynısını yapmaktan tek bir otomatik karar uzaklıkta.

Seni koruyacak tek şey sistemin mimarisi. Sözler değil, dışa aktar butonları değil, "biz asla öyle bir şey yapmayız" lafları hiç değil. Sistem nasıl inşa edildi, önemli olan o.

Eğer senin anahtarın bir sunucu onu hesapladığı, sakladığı veya bir parçasını tuttuğu için varsa, self-custodial falan değilsin. Kendi paran için kiracısın, ev sahibi de istediği zaman kilitleri değiştirebilir.

PRF izin istemez. PRF bir yerleri arayıp haber vermez. PRF doğrudan elindeki donanımda çalışan matematiktir.

Anahtarlar senin değilse, coin'ler de senin değildir. Bu kural hâlâ geçerli, hatta hiç olmadığı kadar geçerli.

Nuri, self-custodial bir Bitcoin ve stablecoin cüzdanıdır. Her zaman aynı anahtarı türetmek için WebAuthn PRF eklentili passkey'leri kullanır. Hiçbir sunucu anahtarlarınızı tutmaz ve hiçbir şirket sizi dışarıda bırakamaz. nuri.com

![](../../../media/not-your-keys-not-your-coins-the-passkey-edition/01-05a18f2a.png)
