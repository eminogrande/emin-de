---
title: "Nuri neden önce durumsuz passkey mimarisini seçti ve Lightning sonradan nasıl dahil olabilir"
description: "İlk sürümümüzde Spark yerine durumsuz passkey imzalamayı ve submarine swap işlemlerini tercih ettik. Bunun nedenini ve Lightning'in neden ileride eklenebileceğini açıklıyorum."
date: "2025-12-04T21:50:01Z"
updated: "2025-12-04"
lang: tr
translated_from: "en/why-nuri-chose-a-stateless-passkey-architecture-first-and-how-lightning-may-stil"
source_sections: ["1-our-core-principle-is-stateless-self-custody", "2-why-spark-and-hosted-lightning-are-hard-to-combine-with-statelessness-today", "3-why-we-chose-submarine-swaps-first", "4-a-note-to-breez-why-this-isnt-about-you", "5-what-nuri-is-shipping-now", "6-can-lightning-become-stateless", "7-thank-you-breez"]
category: nuri
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/why-nuri-chose-a-stateless-passkey-architecture-first-and-how-lightning-may-stil/cover.webp"
tldr: ["Nuri hiçbir yerde private key saklamıyor; bu durumsuz prensip bizim için her şeyden önemli.", "Lightning sürekli açık kalan bir kanal durumu gerektiriyor, bu yüzden Spark ve hosted Lightning ilk sürümümüze uymadı.", "Kanal yönetimi veya herhangi bir platforma bağımlı kalmadan Lightning ile işlem yapmak için submarine swap kullanıyoruz.", "Bu tamamen mimariyle ilgili bir tercih, Breez ile hiçbir sorunumuz yok. Mimariye uyduğu an Lightning yol haritamıza geri dönecek."]
sections: [{"basically": "Seed yok, şifreli veri yığını yok, sunucuda bekleyen gizli veri yok. Passkey'ler anahtarları sadece ihtiyacımız olduğunda türetiyor."}, {"basically": "Lightning asla kaybolmaması gereken bir duruma bağımlı. Bu da bizim gizli veri ve durum tutmama ilkemizle çelişiyor."}, {"basically": "Submarine swap sayesinde kanal yönetmek zorunda kalmadan, on-chain işlemleri bitirerek Lightning'i kullanabiliyoruz."}, {"basically": "Breez ve Spark harika mühendislik işleri. Sadece mimari konusunda farklı bir yol izliyoruz ve kapımız her zaman açık."}, {"basically": "TestFlight yayında: Apple Pay, Visa kart, IBAN ve durumsuz 2-of-2 imzalama ile Bitcoin."}, {"basically": "Taproot kanalları, eltoo benzeri güncellemeler ve passkey imzalama rolleri ileride Lightning'i durumsuz hale getirebilir."}, {"basically": "Breez ekibine teşekkürler. Temelimiz olgunlaştığında Spark her zaman bir seçenek olarak kalacak."}]
---
# Nuri Neden Önce Durumsuz (Stateless) Bir Passkey Mimarisi Seçti ve Lightning Sonradan Nasıl Dahil Olabilir?

Geçtiğimiz aylarda Breez ekibiyle Spark, Nodeless ve onların "Lightning as a service" üzerine olan büyük fikirleri hakkında harika sohbetler ettik. Breez, Lightning dünyasındaki en titiz mühendislik ekiplerinden biri ve yaptıkları işler, kendi full node'larını çalıştırmak ya da likidite yönetmek istemeyen geliştiriciler için Lightning'i erişilebilir kıldı. Bizi Spark erken erişim programına ve yılın son iki çeyreğindeki grup tanıtımlarına davet ettiler. Breez'den gelen ilgi ve destek harikaydı, gerçekten çok kıymet veriyoruz.

Ancak pek çok prototip ve araştırmadan sonra, ilk sürümümüz için farklı bir yola girdik. Bu yazı; neden böyle yaptığımızı, bunun Nuri'yi üzerine inşa ettiğimiz prensiplerle nasıl bağlantılı olduğunu ve Lightning'in ileride nasıl bir rol oynayabileceğini anlatıyor.

## 1. Temel prensibimiz durumsuz (stateless) self-custody

Kendine "self-custodial" diyen cüzdanların çoğu aslında anahtarları bir yerlerde saklıyor. Anahtar cihazda şifreleniyor, sunucuda şifreleniyor ya da bir seed phrase ile yedekleniyor. Bu da herkesin bildiği riskleri beraberinde getiriyor: Cihazın hacklenmesi, yedeğin kaybolması, sunucuya saldırı olması, kullanıcı deneyiminin karmaşıklaşması ve tüm bu yapıyı yönetmenin zahmetli olması.

Nuri ile hedefimiz, hiçbir yerde özel anahtar (private key) saklamadan daha fazla güvenlik ve daha iyi bir kurtarma deneyimi sunmaktı. İşte sonraki iki başlığa bu şekilde ulaştık.

### 1.1 Bitcoin için Durumsuz (Stateless) Bir Passkey İmzalayıcı
https://emino.app/posts/a-stateless-passkey-signer-for-bitcoin/

Hiçbir zaman özel anahtar saklamıyoruz. Platformun güvenceye aldığı (FIDO2 WebAuthn) passkey'leri kullanıyor ve imzalama materyalini bunlardan, her seferinde aynı şekilde ve sadece ihtiyacımız olduğunda türetiyoruz. Ortada şifreli blob'lar, seed'ler veya saklanan sırlar yok; yani çalınacak bir şey de yok.

### 1.2 Passkey ile Türetilen 2-of-2 Taproot Cüzdan
https://emino.app/posts/a-passkey-derived-2-of-2-taproot-wallet-architecture-elimina/

İmzalayıcıyı 2-of-2 Taproot multisig yapısına genişletiyoruz. Bir anahtar yerelde bir passkey ile türetiliyor, diğeri ise uzaktan ayrı bir passkey ile. İki taraf da uzun süreli bir özel anahtar tutmuyor ve kurtarma işlemi doğrudan passkey kimliğinin kendisiyle gerçekleşiyor.

Nuri için "durumsuz" olmak uygulamanın küçük bir detayı değil. Her şeyin üzerine kurulduğu temel bu ve ilk sürümdeki her mimari buna uymak zorunda.

## 2. Spark ve barındırılan (hosted) Lightning bugün neden durumsuzlukla birleşmekte zorlanıyor?

Lightning'in kalıcı bir duruma (state) ihtiyacı var. Kanal taahhütleri, HTLC güncellemeleri, likidite rezervleri, iptal sırları (revocation secrets), kanal yedekleme materyali, kanalın sürekli izlenmesi ve adalet işlemleriyle (justice transactions) korunması gerekiyor. Lightning protokolü böyle çalışıyor. Sürekli değişen ve asla kaybolmaması gereken bir duruma bağlı; bu da Nuri'nin arkasındaki "sır yok, durum yok" fikriyle çelişiyor.

Yani aslında iki seçeneğimiz vardı. A seçeneği; durumsuz modelimizi bozup kanal durumunu yerelde veya uzakta saklamaktı ki bu, Nuri'yi tasarlarken üzerine kurduğumuz güvenceleri zayıflatıyor. B seçeneği; uzun ömürlü durumu Spark gibi barındırılan bir node'a emanet etmekti. Spark modeli böyle çalışıyor; kullanıcı imzalama anahtarlarını tutuyor, barındırılan altyapı ise kanal durumunu, dedikoduları (gossip), likiditeyi ve HTLC'leri yönetiyor.

Spark iyi tasarlanmış bir ürün. Ancak bu aşamada onu benimsemek, mimarimizin gittiği yönle tam uyuşmayan bir bağımlılık oluşturmak anlamına gelirdi. Nuri güvenlik modelinin, üzerine durumlu (stateful) protokoller eklemeden önce mümkün olduğunca küçük, deterministik ve platforma yakın kalmasını istiyoruz.

## 3. Neden önce submarine swap'leri seçtik?

Lightning node'u çalıştırmadan ya da kanal durumu tutmadan da Lightning kullanabilirsiniz. Submarine swap'ler, Lightning üzerinden alıp on-chain ödeme yapmanıza veya on-chain gönderip Lightning üzerinden ödeme yapmanıza olanak tanır. Kanal yönetmezsiniz, kanal yedeğine ihtiyaç duymazsınız, kalıcı sırlar tutmazsınız ve kendinizi tek bir LSP'ye veya barındırılan servise bağlamazsınız. Nuri için bu; Lightning ile etkileşime girebileceğimiz, mimarinin basit kalacağı, tek bir sağlayıcıya bağımlı olmayacağımız ve her şeyin durumsuz imzalama prensibine uyacağı anlamına geliyor. Barındırılan kanallar gibi daha durumlu bir yapıya geçmeden önce atılması gereken doğru adım bu.

## 4. Breez'e bir not: Bu sizinle ilgili değil

Bu karar Breez'e veya Spark'a yönelik bir eleştiri değil. Breez, Lightning dünyasındaki en iyi mühendislik örneklerini sürekli ortaya koyuyor. Spark temiz ve modern bir barındırılan node mimarisi. Nodeless ve Spark ikilisi geliştiricilere gerçekten iyi bir deneyim sunuyor, Breez SDK'sı da mobil uygulamalar için Lightning'i çok basitleştiriyor.

Biz sadece kaliteyle değil, mimariyle de ilgilendiğimiz için farklı bir yol izledik. Lightning bugün kalıcı bir duruma ihtiyaç duyuyor, Nuri ise bugün durumsuz yapı taşları üzerine kurulu. Temelimiz sağlamlaştığında, Spark'a ya da durumsuzluk güvencelerimizi koruyan hibrit modellere tekrar bakabiliriz. Kapı her zaman açık.

## 5. Nuri şimdi neyi piyasaya sürüyor?

Nuri, Apple incelemesinden yeni geçti (TestFlight https://testflight.nuri.com). İlk özellikler şunlar: Apple Pay ile (Mercuryo üzerinden) 700 Euro'ya kadar KYC olmadan Bitcoin alabilirsiniz. GnosisPay ile self-custodial bir Visa banka kartı ve Monerium'dan anlık SEPA giriş-çıkış sağlayan bir IBAN var. Bitcoin imzalama tamamen durumsuz ve passkey tabanlı; hiçbir özel anahtarın saklanmadığı 2-of-2 Taproot mimarisi üzerine kurulu. İstemci tarafında veya sunucuda sıfır sır saklıyoruz. iOS, Android ve Web için tek bir platformlar arası Expo uygulaması. Ve imzalayıcı ile cüzdan arayüzü dahil her parça tamamen açık kaynak olacak.

Önceliğimiz, durumsuz modeli kusursuz hale getirmek. Lightning, bu mimariye temiz bir şekilde oturduğu an yol haritamıza girecek.

## 6. Lightning durumsuz hale gelebilir mi?

Bu açık bir araştırma alanı ve bunu çok önemsiyoruz. Taproot tabanlı kanal tasarımları, eltoo benzeri güncelleme şemaları, durum taahhüt ağaçları (state commitment trees), kısa ömürlü kanal inşası, passkey destekli Lightning imzalama rolleri ve tek bir yere kilitlenmeden farklı sağlayıcılardan alınan barındırılan kanallar gibi umut verici yönler var. Bunlar ilerledikçe, Lightning'in durumsuz istemcilerle daha iyi çalışacağını tahmin ediyoruz. Bu gerçekleştiğinde, Spark veya benzeri bir çözüm doğal bir uyum yakalayabilir.

## 7. Teşekkürler, Breez

Breez ekibine; bize tekrar tekrar ulaştığınız, bizi Spark'a ve programlarınıza davet ettiğiniz ve her zaman konuşmaya açık olduğunuz için teşekkürler. Yaptığınız iş, Lightning'in geleceği için çok önemli. Bizim mimarimiz şimdilik başka bir yöne gidiyor ama inşa ettiğiniz şeye büyük saygı duyuyoruz. Durumsuz yapı taşlarımız tamamen olgunlaştığında, Lightning entegrasyonu tekrar yol haritasına girecek ve Spark kesinlikle bir seçenek olarak kalmaya devam edecek.

⚡️

![image](../../../media/why-nuri-chose-a-stateless-passkey-architecture-first-and-how-lightning-may-stil/image.png)
