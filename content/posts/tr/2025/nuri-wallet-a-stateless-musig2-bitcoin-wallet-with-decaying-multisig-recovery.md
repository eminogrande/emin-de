---
title: "Nuri Wallet: Stateless, MuSig2 tabanlı ve zamanla gücü azalan multisig kurtarma mekanizmalı bir Bitcoin cüzdanı"
description: "Nuri Wallet'ı nasıl tasarladık? Asla saklanmayan passkey anahtarları, MuSig2, NFC kart, 2FA sunucusu ve her zaman erişim sağlayabilmeniz için zamanla yetkisi azalan bir multisig yapısı."
date: "2025-12-08T21:00:01Z"
updated: "2025-12-08"
lang: tr
translated_from: "en/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-multisig-recovery"
source_sections: ["why-we-built-it-this-way", "the-three-keys", "musig2-and-the-two-setups", "decaying-multisig-with-csv-timelocks", "security-and-recovery", "how-it-compares-to-other-wallets", "how-to-build-it", "where-this-leaves-self-custody"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-multisig-recovery/cover.jpg"
tldr: ["Nuri Wallet; MuSig2 Schnorr imzalarını, WebAuthn PRF ile türetilen passkey anahtarlarını, NFC donanım kartını ve 2FA sunucusu eş imzacısını bir araya getiriyor.", "Anahtarlar imzalama anında türetiliyor ve asla cihazda saklanmıyor; yani çalınabilecek bir disk verisi yok.", "CSV zaman kilitli, zamanla yetkisi azalan multisig yapısı; yaklaşık 70 gün sonra kurtarma yollarını, yaklaşık 1 yıl sonra ise tek anahtarla çıkışı mümkün kılıyor.", "Bu devam eden bir çalışma olup Opus 4.5 tarafından kaleme alınmış bir tasarım metnidir."]
sections: [{"basically": "Single-sig'de kaybetme riski, multisig'de ise dışarıda kalma derdi var. Biz bu ikilemden çıkmaya çalışıyoruz."}, {"basically": "Passkey anahtarı, NFC kart anahtarı, sunucu anahtarı; hiçbiri bir yerlerde çalınmayı beklerken saklanmıyor."}, {"basically": "Birden fazla imzacı olsa da on-chain tarafında tek bir Schnorr imzası görünüyor, yani tıpkı standart bir single-sig cüzdan gibi."}, {"basically": "Güvenlik kasten ve kontrollü bir şekilde azalıyor, böylece fonlarınıza her zaman erişebiliyorsunuz."}, {"basically": "Bir parçasını kaybetseniz bile 2/3 ile çıkış yapabilirsiniz. Ancak telefon ve sunucuyu aynı anda kaybederseniz fonlar erişilemez hale gelir."}, {"basically": "En yakını Blockstream Green ama Nuri MuSig2 kullanıyor, single-sig gibi görünüyor ve seed phrase gerektirmiyor."}, {"basically": "PRF henüz her tarayıcıda yok ve nonce'ların asla tekrar kullanılmaması gerekiyor. İşin zor kısımları bunlar."}, {"basically": "Bitcoin üzerinde tam kontrol, multisig koruması ve passkey'in sunduğu kullanım kolaylığı bir arada."}]
---
![](../../../media/nuri-wallet-a-stateless-musig2-bitcoin-wallet-with-decaying-multisig-recovery/cover.jpg)

Bu henüz geliştirme aşamasında olan bir proje. Dokümanı Opus 4.5 ile yazdım; aklımızdaki mevcut Nuri Wallet tasarımı bu.

Nuri Wallet; dört farklı özelliği tek bir güvenlik yapısında birleştiren bir Bitcoin cüzdanı. MuSig2 Schnorr imzaları, WebAuthn PRF uzantısıyla anlık olarak türetilen ve hiçbir yerde saklanmayan anahtarlar, NFC destekli bir donanım cüzdanı ve iki faktörlü kimlik doğrulama üzerinden eş imza atan bir sunucu. Hem güvenliği hem de varlıklarınıza her zaman erişebilmenizi önemsiyoruz. İşte bu yüzden "decaying multisig" (zamanla değişen çoklu imza) sistemini kurguladık; böylece imza atan taraflardan biri veya birkaçı devre dışı kalsa bile fonlarınızı her zaman kurtarabiliyorsunuz.

Doküman on bölümden oluşuyor. Birinci bölüm neden bu şekilde inşa ettiğimizi, ikincisi parçaların birbiriyle nasıl çalıştığını, üçüncüsü üç anahtarı, dördüncüsü MuSig2'yi, beşincisi 2-of-2 ve 2-of-3 kurulumlarını, altıncısı decaying multisig yapısını, yedincisi güvenliği, sekizincisi kurtarma sürecini, dokuzuncusu diğer cüzdanlarla karşılaştırmasını ve onuncusu da geliştirme aşamasına dair birkaç notu içeriyor.

## Neden böyle inşa ettik

Bitcoin cüzdanlarında güvenlik ve kullanım kolaylığı arasında her zaman bir çatışma olmuştur. Tek anahtarlı (single-sig) bir cüzdan kolaydır ama anahtar çalınırsa fonlarınızı kaybedersiniz. Multisig cüzdan daha güvenlidir ancak anahtarları kaybederseniz kendi paranıza erişemeyebilirsiniz. Biz bu çatışmayı birkaç yöntemi birleştirerek çözmeye çalışıyoruz. Anahtarlar saklanmıyor, sadece anlık türetiliyor; yani diskte birinin çalabileceği hiçbir şey yok. Taraflar MuSig2 ile birlikte imzalıyor ve sonuçta tek bir Schnorr imzası çıkıyor; bu hem gizlilik için daha iyi hem de işlem ücretlerini düşürüyor. Zaman kilitleri (timelock) kademeli olarak gevşiyor, böylece zamanla daha fazla kurtarma seçeneğiniz oluyor ve asla sonsuza kadar sistemin dışında kalmıyorsunuz. Ayrıca en yüksek güvenliği istediğiniz durumlar için isteğe bağlı bir donanım cüzdanı desteği de mevcut.

Üç anahtarımız var: Passkey anahtarı, NFC Satochip kartındaki donanım anahtarı ve sunucu anahtarı. Her biri MuSig2 için kısmi bir imza veriyor ve bu imzalar birleştirilerek tek bir imza haline geliyor. İşin temelinde ise o decaying timelock yapısı yatıyor.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NURI WALLET ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │   PASSKEY KEY    │  │  HARDWARE KEY    │  │   SERVER KEY     │          │
│  │   (Stateless)    │  │  (NFC Satochip)  │  │   (Stateless)    │          │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤          │
│  │ WebAuthn PRF     │  │ Secure Element   │  │ HSM/Secure       │          │
│  │ Extension        │  │ on NFC Card      │  │ Element          │          │
│  │                  │  │                  │  │                  │          │
│  │ key = PRF(salt)  │  │ Private key      │  │ key = f(user_id, │          │
│  │                  │  │ never leaves     │  │        entropy)  │          │
│  │ No key storage   │  │ the chip         │  │                  │          │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                     │                     │
│           │    MuSig2 Partial   │    MuSig2 Partial   │                     │
│           │    Signature        │    Signature        │                     │
│           │                     │                     │                     │
│           └──────────┬──────────┴──────────┬──────────┘                     │
│                      │                     │                                │
│                      ▼                     ▼                                │
│           ┌─────────────────────────────────────────┐                       │
│           │         MuSig2 SIGNATURE AGGREGATION    │                       │
│           │                                         │                       │
│           │  2-of-2: Passkey + Server               │                       │
│           │  2-of-3: Any 2 of {Passkey, HW, Server} │                       │
│           └─────────────────────────────────────────┘                       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    DECAYING TIMELOCK STRUCTURE                       │   │
│  │                                                                      │   │
│  │   T=0                    T=10,000 blocks              T=52,560       │   │
│  │    │                          │                       blocks         │   │
│  │    ▼                          ▼                          ▼           │   │
│  │  ┌────────────────────┬───────────────────────┬─────────────────┐   │   │
│  │  │  NORMAL OPERATION  │  RECOVERY MODE        │  EMERGENCY EXIT │   │   │
│  │  │  2-of-2 or 2-of-3  │  Passkey + HW         │  Passkey only   │   │
│  │  │  (Server active)   │  (Server unavailable) │  (CSV expired)  │   │
│  │  └────────────────────┴───────────────────────┴─────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Üç anahtar

Passkey anahtarı, Nuri'nin kullanıcı deneyiminin kalbi. Anahtarları türetmek için WebAuthn PRF (Pseudo-Random Function) uzantısını kullanıyor, bu yüzden hiçbir yerde saklamamıza gerek kalmıyor.

```
┌─────────────────────────────────────────────────────────────────┐
│                    PASSKEY KEY DERIVATION                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   User authenticates with passkey (biometric/PIN)               │
│                          │                                      │
│                          ▼                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │         WebAuthn Authenticator          │                  │
│   │    (Platform or Roaming Authenticator)  │                  │
│   └─────────────────────────────────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │           PRF Extension                 │                  │
│   │                                         │                  │
│   │   secret = HMAC-SHA256(device_secret,   │                  │
│   │                        salt || rpId)    │                  │
│   └─────────────────────────────────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │      Bitcoin Key Derivation             │                  │
│   │                                         │                  │
│   │   private_key = HKDF(secret,            │                  │
│   │                      "nuri-bitcoin",    │                  │
│   │                      derivation_path)   │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Bundan dört temel kazanımınız var. Stateless (durumsuz) çalışıyor; cihazda özel anahtar saklanmıyor, ihtiyaç anında türetiliyor. Oltalama saldırılarına (phishing) dayanıklı, çünkü WebAuthn kimlik bilgilerini kaynağa bağlıyor; yani sahte bir site aynı anahtarı alamaz. Donanım destekli, PRF gizli anahtarı cihazın güvenli bölgesinde (secure element) duruyor. Bir de biyometrik koruma var; cihaz parmak izinizle veya yüzünüzle orada olduğunuzu teyit ediyor.

Matematik kısmı oldukça basit. $s$ yani güvenli bölgede duran cihaz ana anahtarı var. Sonra sadece uygulama için bir `salt`, bir de `rpId` yani "relying party" tanımlayıcısı. PRF çıktısı şu şekilde:

$$\text{prf\_output} = \text{HMAC-SHA256}(s, \text{salt} \| \text{rpId})$$

Bitcoin özel anahtarını da böyle türetiyoruz:

$$k_{\text{passkey}} = \text{HKDF-SHA256}(\text{prf\_output},
\text{"nuri-btc-v1"}, \text{path})$$

Donanım kısmı, Satochip veya SatSigner gibi NFC üzerinden haberleşen, güvenli bir bölgeye sahip bir kart. MuSig2 kısmi imzalama yapıyor ve özel anahtar karttan asla dışarı çıkmıyor.

```
┌─────────────────────────────────────────────────────────────────┐
│                  NFC HARDWARE WALLET                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────┐                                      │
│   │   Secure Element    │                                      │
│   │   (JavaCard/etc)    │                                      │
│   ├─────────────────────┤                                      │
│   │ • Private key       │  ◄── Never leaves the chip           │
│   │   generation        │                                      │
│   │ • MuSig2 nonce      │                                      │
│   │   generation        │                                      │
│   │ • Partial signature │                                      │
│   │   creation          │                                      │
│   │ • Public key export │                                      │
│   └─────────────────────┘                                      │
│            ▲                                                    │
│            │ NFC                                                │
│            ▼                                                    │
│   ┌─────────────────────┐                                      │
│   │   Mobile Device     │                                      │
│   │   (Nuri App)        │                                      │
│   └─────────────────────┘                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Kartla imzalama dört turda gerçekleşiyor. Önce kart rastgele bir nonce $R_{\text{hw}}$ oluşturup bunun taahhüdünü veriyor. Sonra tüm taraflar nonce taahhütlerini değiştiriyor ve ardından nonce'ları açıyorlar. Sonra kart, özel anahtarı dışa vurmadan kısmi imzasını hesaplıyor. En sonunda da kısmi imzalar birleşip nihai Schnorr imzasını oluşturuyor.

Üçüncü anahtar sunucuda. Sunucu, sadece 2FA onayından sonra imzalayan bir yardımcı imzalayıcı. Sisteme entropi ve ekstra bir güvenlik katmanı ekliyor ama fonlarınızın tam kontrolü asla onda değil.

```
┌─────────────────────────────────────────────────────────────────┐
│                    STATELESS SERVER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────┐                  │
│   │         Hardware Security Module        │                  │
│   │              (HSM)                       │                  │
│   ├────────────────────────────────────────┤                  │
│   │ • Master seed (never exported)          │                  │
│   │ • Deterministic key derivation          │                  │
│   │ • Rate limiting                         │                  │
│   │ • Audit logging                         │                  │
│   └─────────────────────────────────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │      Key Derivation Function            │                  │
│   │                                         │                  │
│   │   k_server = KDF(master_seed,           │                  │
│   │                  user_id,               │                  │
│   │                  wallet_id,             │                  │
│   │                  key_index)             │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Properties:                                                   │
│   • No private keys stored in database                         │
│   • Keys derived on-demand from HSM                            │
│   • 2FA required before signing                                │
│   • Server breach doesn't compromise keys                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Sunucu her kullanıcı için anahtarı hep aynı şekilde türetiyor, dolayısıyla veritabanında saklamasına gerek kalmıyor.

$$k_{\text{server}} = \text{HKDF}(k_{\text{master}}, \text{user\_id}
\| \text{wallet\_id} \| \text{index})$$

Buradaki $k_{\text{master}}$ ise HSM içinde duruyor ve dışarıya asla aktarılmıyor.

## MuSig2 ve iki kurulum

MuSig2 bir çoklu imza (multisig) şeması. Birden fazla kişi imza atıyor ancak sonuçta tek bir birleştirilmiş (aggregated) Schnorr imzası çıkıyor ve bu, tıpkı normal bir imza gibi görünüyor. Yani hem gizliliğin artıyor, çünkü zinciri izleyen kimse bunun bir multisig olduğunu anlayamıyor, hem de verimlilik sağlıyorsun çünkü işlem boyutu küçüldüğü için işlem ücretleri (fee) daha düşük oluyor.

```
┌─────────────────────────────────────────────────────────────────┐
│                     MuSig2 PROTOKOLÜ                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   KURULUM AŞAMASI (tek seferlik)                                │
│   ──────────────────────────────                                │
│                                                                 │
│   Her taraf şuna sahip:                                         │
│   • Özel anahtar (Private key): xᵢ                              │
│   • Genel anahtar (Public key):  Pᵢ = xᵢ · G                    │
│                                                                 │
│   Birleştirilmiş genel anahtar:                                 │
│   P = Σᵢ (aᵢ · Pᵢ)                                              │
│   burada aᵢ = H(L, Pᵢ) ve L = {P₁, P₂, ...}                     │
│                                                                 │
│   İMZA AŞAMASI (işlem başına)                                   │
│   ───────────────────────────                                   │
│                                                                 │
│   1. Tur: Nonce Oluşturma                                       │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐                         │
│   │ Taraf 1 │  │ Taraf 2 │  │ Taraf 3 │                         │
│   │ r₁ → R₁ │  │ r₂ → R₂ │  │ r₃ → R₃ │                         │
│   └────┬────┘  └────┬────┘  └────┬────┘                         │
│        │            │            │                              │
│        └────────────┼────────────┘                              │
│                     ▼                                           │
│              Rᵢ değerlerini takas et                            │
│                     │                                           │
│                     ▼                                           │
│   2. Tur: Kısmi İmzalar                                         │
│                                                                 │
│   R = Σᵢ Rᵢ  (birleştirilmiş nonce)                             │
│   c = H(R, P, m)  (challenge)                                   │
│                                                                 │
│   Her taraf şunu hesaplar:                                      │
│   sᵢ = rᵢ + c · aᵢ · xᵢ                                         │
│                                                                 │
│   Final imzası:                                                 │
│   s = Σᵢ sᵢ                                                     │
│   σ = (R, s)                                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Nuri'de bunu tercih etmemizin dört temel nedeni var. Gizlilik; birleştirilmiş imza, on-chain tarafında tekli imza gibi görünüyor. Verimlilik; kaç kişi imzalarsa imzalasın tek bir imza var. Taproot tabanlı; Bitcoin'in Schnorr ve Taproot yükseltmesiyle mümkün oldu. Ayrıca sadece 2 tur iletişim gerektiriyor, orijinal tasarım bunu "etkileşimli" (interactive) olarak tanımlasa da süreç oldukça hızlı işliyor.

Temel kurulum, bir işlemi imzalamak için hem passkey'i hem de sunucuyu gerektirir.

```
┌─────────────────────────────────────────────────────────────────┐
│                    2-of-2 YAPILANDIRMASI                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   NORMAL ÇALIŞMA                                                │
│   ────────────────                                              │
│                                                                 │
│   ┌───────────┐         ┌───────────┐                           │
│   │  Passkey  │────────▶│  Sunucu   │                           │
│   │  Anahtarı │  2FA    │ Anahtarı  │                           │
│   └─────┬─────┘ doğrulama└─────┬─────┘                           │
│         │                      │                                 │
│         │    MuSig2            │                                 │
│         └──────────┬───────────┘                                 │
│                    ▼                                            │
│              ┌──────────┐                                       │
│              │ Birleşik │                                       │
│              │  İmza    │                                       │
│              └──────────┘                                       │
│                                                                 │
│   KURTARMA (Sunucu Erişilemez Olduğunda)                        │
│   ───────────────────────────────────────                       │
│                                                                 │
│   CSV timelock süresi dolduktan sonra (~1 yıl):                 │
│                                                                 │
│   ┌───────────┐                                                 │
│   │  Passkey  │──────────────▶ Tek imzayla harcama yap           │
│   │  Anahtarı │                (CSV çıkış yolu)                 │
│   └───────────┘                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

On-chain tarafında bu bir Taproot çıktısıdır.

```
Çıktı Script'i (P2TR):
┌─────────────────────────────────────────────────────────────────┐
│  OP_1 <birleştirilmiş_pubkey>                                   │
└─────────────────────────────────────────────────────────────────┘

Taproot Ağacı:
┌─────────────────────────────────────────────────────────────────┐
│                         Dahili Anahtar                          │
│                    (MuSig2: Passkey + Sunucu)                   │
│                              │                                  │
│              ┌───────────────┴───────────────┐                  │
│              │                               │                  │
│        ┌─────▼─────┐                  ┌──────▼──────┐           │
│        │  Yaprak 1 │                  │   Yaprak 2  │           │
│        │  (boş)    │                  │  CSV Çıkışı │           │
│        │           │                  │ <pk_passkey>│           │
│        │           │                  │ CHECKSIG    │           │
│        │           │                  │ <52560>     │           │
│        └───────────┘                  └─────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Daha kapsamlı bir kurulum, güvenlik seviyesini artırmak ve farklı kurtarma yöntemleri sunmak için bir donanım cüzdanı (hardware wallet) ekler.

```
┌─────────────────────────────────────────────────────────────────┐
│                    2-of-3 YAPILANDIRMASI                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ÜÇ İMZA ANAHTARI                                              │
│   ────────────────                                              │
│                                                                 │
│   ┌───────────┐    ┌───────────┐    ┌───────────┐               │
│   │  Passkey  │    │ Donanım   │    │  Sunucu   │               │
│   │  (Sıcak)  │    │  Cüzdanı  │    │   (2FA)   │               │
│   │           │    │  (Soğuk)  │    │           │               │
│   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘               │
│         │                │                │                     │
│         └────────┬───────┴───────┬────────┘                     │
│                  │               │                              │
│                  ▼               ▼                              │
│         ┌──────────────────────────────┐                        │
│         │   Herhangi 2-of-3 imzalayabilir │                        │
│         │                              │                        │
│         │   • Passkey + Sunucu (günlük)│                        │
│         │   • Passkey + HW (kurtarma)  │                        │
│         │   • Sunucu + HW (gerekirse)  │                        │
│         └──────────────────────────────┘                        │
│                                                                 │
│   İMZA SENARYOLARI                                              │
│   ────────────────                                              │
│                                                                 │
│   Senaryo 1: Normal (Passkey + Sunucu)                          │
│   ┌─────────┐  2FA  ┌─────────┐                                 │
│   │ Passkey ├──────▶│ Sunucu  │────▶ ✓ İşlem                    │
│   └─────────┘       └─────────┘                                 │
│                                                                 │
│   Senaryo 2: Sunucu Kapalı (Passkey + Donanım)                  │
│   ┌─────────┐  NFC  ┌─────────┐                                 │
│   │ Passkey ├──────▶│   HW    │────▶ ✓ İşlem                    │
│   └─────────┘       └─────────┘      (Beklemek yok!)            │
│                                                                 │
│   Senaryo 3: Passkey Kayıp (Donanım + Sunucu)                   │
│   ┌─────────┐       ┌─────────┐                                 │
│   │   HW    ├──────▶│ Sunucu  │────▶ ✓ İşlem                    │
│   └─────────┘       └─────────┘                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

2-of-3 için Taproot ağacı da şu şekilde yapılandırılmıştır.

```
Taproot Ağacı (2-of-3):
┌─────────────────────────────────────────────────────────────────┐
│                         Dahili Anahtar                          │
│              (MuSig2: Passkey + Sunucu - varsayılan yol)        │
│                              │                                  │
│      ┌───────────────────────┼───────────────────────┐          │
│      │                       │                       │          │
│ ┌────▼────┐           ┌──────▼──────┐         ┌──────▼──────┐   │
│ │ Yaprak 1│           │   Yaprak 2  │         │   Yaprak 3  │   │
│ │Passkey+ │           │ Passkey+    │         │  CSV Çıkışı │   │
│ │  HW     │           │  Sunucu     │         │<pk_passkey> │   │
│ │(MuSig2) │           │ (yedek)     │         │ CHECKSIG    │   │
│ │         │           │             │         │ <52560> CSV │   │
│ └─────────┘           └─────────────┘         └─────────────┘   │
│                                                                 │
│ Not: Sunucu+HW kombinasyonu Yaprak 2 alternatifi veya          │
│      gerektiğinde ek yaprak ile çözülür                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## CSV timelock'lar ile azalan (decaying) multisig

Azalan multisig fikri, fonlarını her koşulda geri alabilmen üzerine kurulu. Güvenlik seviyesi bir anda değil, zamanla kontrollü ve planlı bir şekilde azalıyor.

CSV (CheckSequenceVerify) göreceli bir timelock'tır. UTXO oluşturulduktan sonra geçen blok sayısını temel alır.

$$\text{harcanabilir\_yükseklik} = \text{onay\_yüksekliği} + \text{csv\_blokları}$$

Nuri Wallet'ta normal harcama, 2-of-2 veya 2-of-3 MuSig2 imzasını gerektirir. Yaklaşık 70 gün, yani 10.000 blok sonra diğer kurtarma yolları devreye girer. Yaklaşık 1 yıl, yani 52.560 blok sonra ise sadece tek anahtarlı bir acil durum çıkışı aktif olur.

```
┌─────────────────────────────────────────────────────────────────┐
│                    AZALAN GÜVENLİK MODELİ                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Güvenlik                                                       │
│  Seviyesi                                                       │
│    ▲                                                            │
│    │                                                            │
│  3 ┤ ████████████████████┐                                      │
│    │                     │                                      │
│  2 ┤                     └───────────────────┐   2-of-3 ayarı   │
│    │                                         │   (HW mevcut)    │
│    │                                         │                  │
│  1 ┤                                         └─────────────     │
│    │                                                            │
│    └────────────────────────────────────────────────────▶       │
│         T=0            T=10.000         T=52.560      Zaman     │
│         │              blok             blok          (blok)    │
│         │              (~70 gün)        (~1 yıl)                │
│         │                 │                │                    │
│         ▼                 ▼                ▼                    │
│   ┌──────────┐     ┌──────────────┐  ┌──────────────┐           │
│   │ Maksimum │     │ HW Kurtarma  │  │ Acil Durum   │           │
│   │ Güvenlik │     │  Mevcut      │  │  Çıkışı      │           │
│   │  2FA +   │     │ Sunucu gerek │  │ Sadece       │           │
│   │ Passkey  │     │  yok         │  │ Passkey      │           │
│   └──────────┘     └──────────────┘  └──────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

CSV çıkış script'i, basitleştirilmiş haliyle şöyle görünür:

```
OP_IF
    // Normal harcama yolu: birleştirilmiş MuSig2 imzası gerektirir
    <birleştirilmiş_pubkey>
    OP_CHECKSIG
OP_ELSE
    // Acil durum çıkışı: timelock sonrası sadece passkey harcayabilir
    <52560>           // blok cinsinden ~1 yıl
    OP_CHECKSEQUENCEVERIFY
    OP_DROP
    <passkey_pubkey>
    OP_CHECKSIG
OP_ENDIF
```

Güvenliği her zaman maksimum seviyede tutmak için UTXO'larınızı belirli aralıklarla yenilemelisiniz. Coin'lerinizi kendinize tekrar gönderdiğinizde sayaç sıfırlanır ve süreç baştan başlar.

```
┌─────────────────────────────────────────────────────────────────┐
│                    UTXO YENİLEME DÖNGÜSÜ                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   İlk Yatırma         11 ay sonra             Yeniden Yatırma   │
│        │                        │                       │       │
│        ▼                        ▼                       ▼       │
│   ┌─────────┐              ┌─────────┐             ┌─────────┐  │
│   │  UTXO   │   Zaman      │  UTXO   │   Kendine  │  UTXO   │  │
│   │  CSV=0  │  ─────▶      │CSV=47520│   gönder   │  CSV=0  │  │
│   │         │              │ (yaşlı) │  ─────▶    │ (taze)  │  │
│   └─────────┘              └─────────┘             └─────────┘  │
│                                                                 │
│   Güvenlik: MAKS       Güvenlik: Azalıyor     Güvenlik: MAKS    │
│                                                                 │
│   Cüzdan, UTXO'lar timelock süresi dolumuna yaklaştığında uyarır│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Güvenlik ve kurtarma

Toplam yedi tehdit üzerinden geçtik. Biri telefonunu çalarsa passkey biyometriyle korunuyor, imza attığın anda üretiliyor. Sunucu hacklenirse anahtarlar HSM içinde, anahtar üretimi de durumsuz (stateless); yani sunucu tek başına hiçbir işlem yapamaz. Phishing işlemez çünkü WebAuthn, kimlik bilgisini orijinal kaynakla kilitliyor. Araya giren biri (man-in-the-middle) MuSig2 nonce protokolü yüzünden imza taklidi yapamaz. Sunucu yok olursa CSV timelock sayesinde paranı kurtarırsın, hardware wallet varsa zaten çıkış yolun bellidir. Hardware wallet'ı kaybedersen 2-of-3 sayesinde passkey ve sunucuyla kurtarırsın. Passkey'i kaybedersen yine 2-of-3 ile hardware wallet ve sunucuyu kullanırsın.

```
┌─────────────────────────────────────────────────────────────────┐
│                GÜVENLİK KARŞILAŞTIRMASI                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    2-of-2           2-of-3                      │
│                    ──────           ──────                      │
│                                                                 │
│   Harcama için     2                2                           │
│   gereken anahtar                                               │
│                                                                 │
│   Tekil hata       Passkey          Yok                         │
│   noktası          (CSV çıkışı için)(herhangi 2 anahtar yeter)  │
│                                                                 │
│   Sunucu giderse   ~1 yıl bekle     Passkey + HW kullan         │
│   kurtarma                          (anında)                    │
│                                                                 │
│   Passkey giderse  Fonlar kilitli   Sunucu + HW kullan          │
│   kurtarma         (CSV burada      (anında)                    │
│                    işe yaramaz!)                                │
│                                                                 │
│   En iyisi         Basitlik,        Maksimum güvenlik,          │
│                    gündelik kullanıcılar yüklü miktarlar        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Üç saldırı senaryosuyla durumu somutlaştıralım. Birincisi, saldırganın sunucuyu ele geçirmesi.

```
Saldırganın elinde: Sunucu imzalama yetkisi
Saldırgan şuna muhtaç: Passkey onayı VEYA Hardware wallet

Sonuç: ❌ Fonları çalamaz (ikinci anahtar yok)
       ⚠️  İmzalamayı reddederek DoS yapabilir
       ✅ Kullanıcı CSV çıkışı veya HW wallet ile kurtarır
```

İkincisi, birinin telefonunu çalması.

```
Saldırganın elinde: Fiziksel cihaz
Saldırgan şuna muhtaç: Passkey kilidini açmak için Biyometri/PIN
                       ARTI sunucu imzasını onaylamak için 2FA

Sonuç: ❌ Fonları çalamaz (passkey biyometriyle korunuyor)
       ✅ Anahtarlar cihazda saklanmaz (stateless)
```

Üçüncüsü, birinin hem passkey'i hem de sunucuyu ele geçirmesi.

```
Saldırganın elinde: Passkey bilgisi + Sunucu erişimi
Sonuç: ⚠️  2-of-2 kurulumunda fonları çalabilir
       ✅ 2-of-3 kurulumunda: HW wallet hala şart
```

Her durumda 2-of-2 ve 2-of-3 ile ne olduğunu şöyle özetleyeyim. Telefonu ve passkey'i kaybedersen, 2-of-2'de yaklaşık 1 yıl CSV bekliyorsun, sonra bile harcayamıyorsun çünkü çıkış yolu passkey istiyor. 2-of-3'te ise sadece sunucuyu ve hardware wallet'ı kullanıyorsun. Sunucu offline olursa 2-of-2'de yine ~1 yıl CSV bekliyorsun, sonra işlem çalışıyor. 2-of-3'te hemen passkey ve hardware wallet ile işin görülüyor. Hardware wallet'ı kaybedersen 2-of-2'de zaten öyle bir yapı olmadığı için sorun yok, 2-of-3'te ise passkey ve sunucuyu kullanıyorsun. Hem telefonu kaybedip hem sunucu kapalıysa, 2-of-2'de fonlar gitti. 2-of-3'te belki CSV sonrası hardware wallet ile harcanabilir ama bu henüz tasarım aşamasında olan bir karar. Hardware wallet'ı kaybedip sunucu da kapalıysa, iki senaryoda da CSV beklersin ve sonra paranı alırsın.

Sunucu olmadığında 2-of-3 kurulumunda iş akışı böyle:

```
┌─────────────────────────────────────────────────────────────────┐
│          KURTARMA: SUNUCU YOKSA (2-of-3)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Adım 1: Sunucunun olmadığını fark et                          │
│   ┌─────────────────────────────────────────┐                  │
│   │ Uygulama: "Sunucuya ulaşılamıyor. Kurtarma  │                  │
│   │           için hardware wallet kullan"    │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Adım 2: Passkey ile doğrula                                   │
│   ┌─────────────────────────────────────────┐                  │
│   │ Kullanıcı: [Biyometrik doğrulama]       │                  │
│   │ Uygulama:  Passkey özel anahtarını üret │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Adım 3: NFC hardware wallet'ı okut                            │
│   ┌─────────────────────────────────────────┐                  │
│   │ Uygulama: "İmzalamak için Nuri Card'ı    │                  │
│   │            okut"                        │                  │
│   │                                         │                  │
│   │        ┌───────────┐                    │                  │
│   │        │  📱 ←→ 💳 │  NFC               │                  │
│   │        └───────────┘                    │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Adım 4: Passkey + HW arasında MuSig2 imzalama                 │
│   ┌─────────────────────────────────────────┐                  │
│   │ Passkey kısmi imza + HW kısmi imza      │                  │
│   │              ↓                          │                  │
│   │    Birleştirilmiş Schnorr imzası        │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Adım 5: İşlemi gönder                                         │
│   ┌─────────────────────────────────────────┐                  │
│   │ İşlem Bitcoin ağına gönderildi          │                  │
│   │ ✅ Sunucu olmadan fonlar kurtarıldı     │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Bu da 2-of-2'deki CSV acil durum çıkışı:

```
┌─────────────────────────────────────────────────────────────────┐
│              KURTARMA: CSV ACİL DURUM ÇIKIŞI                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Gereksinimler:                                                │
│   • Sunucu uzun süre ulaşılamaz durumda                         │
│   • UTXO süresi > 52,560 blok (~1 yıl)                          │
│   • Kullanıcının hala passkey erişimi var                       │
│                                                                 │
│   Adım 1: UTXO uygunluğunu kontrol et                           │
│   ┌─────────────────────────────────────────┐                  │
│   │ Uygulama CSV için uygun fonları tarar   │                  │
│   │                                         │                  │
│   │ UTXO 1: 0.5 BTC  - Yaş: 55,000 blok ✅   │                  │
│   │ UTXO 2: 0.3 BTC  - Yaş: 40,000 blok ❌   │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Adım 2: CSV harcama işlemini oluştur                         │
│   ┌─────────────────────────────────────────┐                  │
│   │ Girdi: nSequence = 52,560 olan UTXO     │                  │
│   │ Tanık: <passkey_imzası> <csv_script>    │                  │
│   │ Çıktı: Kullanıcının kontrolündeki adres │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Adım 3: Sadece passkey ile imzala                             │
│   ┌─────────────────────────────────────────┐                  │
│   │ Sunucuya gerek yok - CSV çıkış yolu     │                  │
│   │ için tek imza yeterli                   │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
│   Adım 4: Gönder ve onayla                                      │
│   ┌─────────────────────────────────────────┐                  │
│   │ İşlem geçerli çünkü:                    │                  │
│   │ • CSV süresi doldu                      │                  │
│   │ • Geçerli passkey imzası sağlandı       │                  │
│   │ ✅ Fonlar kurtarıldı!                   │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Diğer cüzdanlarla karşılaştırma

Mevcut cüzdanlar arasında Blockstream Green bize en yakını. Green ECDSA multisig kullanıyor, biz MuSig2 Schnorr. Zincir üzerinde Green görünür bir multisig, Nuri ise tekil imza gibi duruyor. Green istemci anahtarını cihazda şifreli tutuyor, bizimki PRF'ten gelen durumsuz bir yapı. Green sunucu anahtarını klasik bir HSM'de tutuyor, bizim sunucu HSM içinde durumsuz bir şekilde anahtar üretiyor. 2-of-2'de kurtarma ikisinde de aynı, CSV timelock. 2-of-3'te Green yedek anahtar kelimeleri (seed phrase) kullanıyor, biz hardware wallet. Taproot desteği Green'de sınırlı, Nuri'de ise doğal.

Bir de Ledger ve Trezor gibi klasik hardware wallet'lar var. Onlar özel cihazlar, Nuri ise passkey ve NFC kartı. Günlük işlemlerde onlar için cihazı yanınızda taşımanız lazım, bizde sadece passkey yeterli, sunucu 2FA'yı hallediyor. Yüksek tutarlı işlemler Ledger veya Trezor'da günlük olanla aynı, Nuri'de ise o tür işlemler için donanım kartını şart koşabiliyorsun. Ledger veya Trezor kaybedilirse seed phrase ile kurtarıyorsun, Nuri'de ise CSV ve 2-of-3 gibi birkaç yol var. Ayrıca onlardaki çalınma riski seed phrase'in açıkta kalması, Nuri'de ise seed phrase'e hiç gerek yok.

Bir de merkezi borsalar var. Borsa anahtarları elinde tutuyor, Nuri'de tüm anahtarlar kullanıcıda. Borsada karşı taraf riski çok yüksek, bizde ise sıfır. Borsada paranıza el konulabilir, Nuri tamamen bağımsız. Borsada kurtarma hesap kurtarma işlemidir, bizde ise CSV ve multisig. Üstelik borsalar KYC istiyor, Nuri'de ise kişisel gözetim (self-custody) için KYC'ye gerek yok.

## Nasıl yapılır

Henüz her tarayıcı WebAuthn PRF desteklemiyor, o yüzden bir B planına ihtiyacımız var.

```
┌─────────────────────────────────────────────────────────────────┐
│                 WEBAUTHN PRF DESTEK DURUMU                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Tarayıcı/Platform         PRF Desteği    Notlar               │
│   ────────────────          ───────────    ──────               │
│   Chrome (Masaüstü)         ✅ Var         Windows Hello, vb.   │
│   Chrome (Android)          ✅ Var         Parmak izi/PIN       │
│   Safari (macOS)            ✅ Var         Touch ID             │
│   Safari (iOS)              ✅ Var         Face ID/Touch ID     │
│   Firefox                   ⚠️ Kısmi       Platforma bağlı      │
│   Güvenlik Anahtarları      ⚠️ Değişken    FIDO2 Level 2 şart   │
│                                                                 │
│   B Planı Stratejisi:                                           │
│   • Kayıt anında PRF desteğini kontrol et                       │
│   • Yoksa şifreli anahtar saklamaya geç                         │
│   • Kullanıcıya güvenlik risklerini net bir şekilde anlat       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

MuSig2 için anahtar birleştirmenin basitleştirilmiş hali şöyle:

```typescript
// Basitleştirilmiş MuSig2 anahtar birleştirme
function aggregateKeys(pubkeys: Uint8Array[]): Uint8Array {
  // Belirlenimci sonuç için pubkey'leri sözlük sırasına göre diz
  const sortedKeys = [...pubkeys].sort(compareBytes);

  // Anahtar birleştirme katsayılarını hesapla
  const L = hashKeys(sortedKeys);

  // Katsayılarla birleştir
  let aggregated = Point.ZERO;
  for (const pk of sortedKeys) {
    const P = Point.fromBytes(pk);
    const a = computeCoefficient(L, pk);
    aggregated = aggregated.add(P.multiply(a));
  }

  return aggregated.toBytes();
}
```

Nonce üretimi işin en kritik güvenlik noktası. Bir nonce asla tekrar kullanılmamalı veya tahmin edilebilir olmamalı.

```typescript
// MuSig2 taze ve tahmin edilemez nonce'lar ister
function generateNonce(
  secretKey: Uint8Array,
  publicKey: Uint8Array,
  message: Uint8Array,
  extraRand: Uint8Array
): { secretNonce: Uint8Array; publicNonce: Uint8Array } {
  // Her imza oturumu için MUTLAKA taze rastgelelik kullan
  const rand = crypto.getRandomValues(new Uint8Array(32));

  // Nonce'u girdiler + rastgelelikten belirlenimci şekilde türet
  const k = taggedHash(
    "MuSig2/nonce",
    concat(secretKey, publicKey, message, rand, extraRand)
  );

  return {
    secretNonce: k,
    publicNonce: Point.BASE.multiply(k).toBytes()
  };
}
```

Uygulamanın NFC donanım cüzdanıyla konuştuğu protokol de APDU komutları üzerinden şöyle:

```
┌─────────────────────────────────────────────────────────────────┐
│              NFC İMZA PROTOKOLÜ (APDU)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Komut                      Yanıt                              │
│   ───────                    ───────                            │
│                                                                 │
│   SELECT APPLET              OK + Sürüm                         │
│   ┌────────────────┐         ┌────────────────┐                │
│   │ CLA: 00        │   ──▶   │ SW: 9000       │                │
│   │ INS: A4        │         │ Sürüm: 1.0     │                │
│   │ AID: Nuri...   │         │                │                │
│   └────────────────┘         └────────────────┘                │
│                                                                 │
│   GET PUBLIC KEY             Public Key                         │
│   ┌────────────────┐         ┌────────────────┐                │
│   │ CLA: E0        │   ──▶   │ SW: 9000       │                │
│   │ INS: 40        │         │ PubKey: 33B    │                │
│   │ Path: m/86'/...│         │                │                │
│   └────────────────┘         └────────────────┘                │
│                                                                 │
│   MUSIG2 NONCE               Nonce Commitment                   │
│   ┌────────────────┐         ┌────────────────┐                │
│   │ CLA: E0        │   ──▶   │ SW: 9000       │                │
│   │ INS: 50        │         │ R: 33B         │                │
│   │ SessionID      │         │                │                │
│   └────────────────┘         └────────────────┘                │
│                                                                 │
│   MUSIG2 SIGN                Kısmi İmza                         │
│   ┌────────────────┐         ┌────────────────┐                │
│   │ CLA: E0        │   ──▶   │ SW: 9000       │                │
│   │ INS: 52        │         │ s: 32B         │                │
│   │ Mesaj hash     │         │                │                │
│   │ Agg nonce      │         │                │                │
│   │ Agg pubkey     │         │                │                │
│   └────────────────┘         └────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Bu durum öz-saklama (self-custody) için ne anlama geliyor

Özetle, bunun Bitcoin öz-saklamasını bir adım ileri taşıdığını düşünüyoruz. Kalıcı bir anahtar depolama yok, o yüzden saldıracak yüzey de az. MuSig2 ile gizlilikten ödün vermeden ve verimli şekilde çok taraflı imza atabiliyoruz. Azalan zaman kilitleri sayesinde kurtarma işlemi her zaman mümkün ve güvenlik aniden değil, kademeli olarak azalıyor. 2-of-2 veya 2-of-3 seçenekleriyle ihtiyacına en uygun kurulumu seçebilirsin. Sonuçta kullanıcı Bitcoin'inin tam kontrolünü elinde tutuyor; hem Multisig'in korumasını hem de passkey'in rahatlığını bir arada yaşıyor.

Aynı sayfada olalım diye birkaç kısa açıklama: CSV, Bitcoin'in göreceli zaman kilitleri için kullandığı opcode olan CheckSequenceVerify demek. HSM, Hardware Security Module yani kurcalanması zor anahtar saklama birimi. MuSig2, Schnorr imzaları için kullanılan çoklu imza şeması. PRF, Pseudo-Random Function yani WebAuthn'de anahtar türetmek için kullandığımız eklenti. Taproot, Bitcoin'e Schnorr imzalarını ve MAST yapısını getiren yükseltme. UTXO, Unspent Transaction Output yani Bitcoin'in bakiye tutma şekli. WebAuthn ise şifresiz giriş yapmanı sağlayan Web Kimlik Doğrulama standardı.

Daha fazla okumak istersen, kaynaklar şunlar: [BIP-340: Schnorr Signatures for secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki), [BIP-341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki), [BIP-327: MuSig2](https://github.com/bitcoin/bips/blob/master/bip-0327.mediawiki), [WebAuthn PRF Extension](https://w3c.github.io/webauthn/#prf-extension) ve [Blockstream Green Security Model](https://help.blockstream.com/hc/en-us/articles/900001391763).
