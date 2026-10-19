---
title: "Nuri Passkey Wallet, Bitcoin, IBAN ve Visa Hesapsız"
description: "Nuri'nin tek bir passkey'i insanlar, işletmeler ve AI ajanları için self-custodial bir wallet'a nasıl dönüştürdüğü, arada hiçbir hesap olmadan."
date: "2026-08-05T20:10:21.065Z"
updated: "2026-08-05"
lang: tr
translated_from: "en/nuri-passkey-wallet-bitcoin-iban-and-visa-without-an-account"
source_sections: ["the-passkey-is-the-wallet", "two-signatures", "what-is-live-today", "wallets-for-ai-agents", "how-nuri-is-different"]
category: nuri
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Nuri tek bir passkey'den self-custodial bir wallet türetiyor, hesap yok, e-posta yok, şifre yok, seed phrase yok.", "Her ödeme iki imza gerektiriyor, yani ne tek başına cihazın ne de Nuri parayı hareket ettirebiliyor.", "Bitcoin, Lightning, bir IBAN, bir ABD hesabı, bir Visa kartı ve yerel ödeme sistemleri zaten o wallet üzerinde onchain çalışıyor.", "AI ajanları agent.nuri.com adresinde kendi bütçesi ve son kullanma tarihi olan geçici wallet'lar alıyor."]
sections: [{"basically": "Her seferinde aynı türetme, saklanacak bir şey yok, çalınacak bir şey yok, phish'lenecek bir şey yok demek."}, {"basically": "Passkey'in imzalıyor, Nuri'nin safeguard'ı imzalıyor. Nuri ortadan kaybolursa, bir bekleme süresinden sonra parana ulaşıyorsun."}, {"basically": "Bitcoin, euro, dolar, bir IBAN, ACH, Visa, mobile money ve PIX, hepsi senin wallet'ında onchain."}, {"basically": "Ajanlar bütçeli, sabit alıcılı ve son kullanma tarihli geçici wallet'lar alıyor. İstediğin zaman iptal edebiliyorsun."}, {"basically": "Diğerleri sağlayıcıdan başlıyor. Nuri, wallet'a sahip olan kullanıcıdan başlıyor. Passkey wallet'ın ta kendisi."}]
---
Nuri, tek bir passkey'i insanlar, işletmeler ve yapay zeka ajanları için kontrolün tamamen sende olduğu (self-custodial) bir cüzdana dönüştürüyor.

Bildiğin bütün finansal ürünler bir hesap mantığıyla çalışır. Kaydolursun, aracı bir kurum hesabı senin yerine yönetir ve paran onlarda durur. Nuri ile biz bu aracı katmanı tamamen ortadan kaldırıyoruz.

## Passkey cüzdanın ta kendisi

Her şey bir passkey ile başlıyor. Bazı servislere şifresiz giriş yaparken zaten kullandığın teknolojinin aynısı. Teknik olarak cihazının ürettiği, güvenli bir donanım çipinde saklanan ve sadece tek bir web sitesine kilitli bir anahtar çifti bu. Face ID ya da parmak izin, her kullanımda bu anahtarın kilidini açar. Nuri işte bu passkey'den cüzdanını türetir. Hesap yok, e-posta yok, şifre yok. Bu türetme işlemi her seferinde birebir aynı sonucu verdiği için sunucularımızda hiçbir şey saklamamız gerekmiyor. Yani birilerinin çalabileceği bir kullanıcı anahtarı veritabanı olmadığı gibi, köşe bucak saklaman gereken 24 kurtarma kelimesi de yok. Alan adı eşleşmesi zorunlu olduğu için sahte siteler de bu passkey'i kullanamaz. Adres tutmuyorsa tarayıcı anahtarı doğrudan vermez, böylece oltalama (phishing) saldırıları tamamen boşa çıkar.

## İki imza

Yapılan her ödeme iki imza gerektiriyor. İlki senin passkey'inden çıkıyor ve sadece senin cihazında bulunuyor. İkincisi Nuri'nin güvenlik güvencesi ama o da Nuri sunucularında tek parça halinde durmuyor. Ancak Nuri'deki pay ile senden gelen veri birleştiğinde anlam kazanıyor. Kısacası Nuri ne senin anahtarına sahip ne de ikinci anahtarın tamamını elinde tutuyor. Cihazın tek başına para transferi yapamaz, Nuri de tek başına yapamaz. Günlük hayatta bu ikinci imza seni korur, çünkü telefonun çalınsa bile kimse paranı çekemez. Nuri bir gün kepenk kapatsa bile ortada kalmazsın. Belirli bir bekleme süresinin ardından parana tek başına erişebilirsin. Bakiyenin pratikte borsanın tekelinde olduğu Coinbase gibi platformlardan temel farkı da bu.

## Bugün yayında olanlar

Bunlar bir yol haritası değil, şu an çalışan özellikler: Bitcoin ve Lightning ağı, dijital euro ve dolar, token takasları (swap), Avrupa IBAN'ı, ACH destekli ABD hesabı ve Visa kart. Üstelik çoğu kişinin göz ardı ettiği yerel ödeme sistemleri bile var; Tanzanya'daki mobil para ya da Brezilya'daki PIX gibi. Asıl önemli nokta şu: Bu sistem, üstüne kripto özellikleri yamanmış geleneksel bir banka değil. Her şey doğrudan zincir üstünde (onchain) ve passkey'inden türetilen o tek cüzdan üzerinden dönüyor. SEPA üzerinden gelen bir euro, bir şirketin senin adına tuttuğu bir hesaba değil, doğrudan senin kendi cüzdanına düşüyor.

## Yapay zeka ajanları için cüzdanlar

Yapay zeka asistanları çok yakında bizim yerimize ödeme yapacak, abonelikleri idare edecek, faturaları kapatacak ve alışveriş yapacak. Sektörün kafasındaki en büyük soru işareti ise şu: İpleri tamamen elden bırakmadan bir yazılıma nasıl para harcama yetkisi verilir? Nuri'nin çözümü şu an agent.nuri.com adresinde çalışıyor. Bunlar; kendi anahtarına, belirlenmiş limitine, sabit alıcı listesine ve son kullanma tarihine sahip geçici cüzdanlar. İstediğin an tek tıkla yetkiyi iptal edebilirsin ve ana cüzdanına hiçbir şey olmaz. Bir asistan ödemeyi hazırlar, son onayı sen verirsin. Nuri'nin gözüne kestirdiği pazar tam olarak burası ve biz erkenden adımımızı attık.

## Nuri'nin farkı ne

Cloudflare, Privy ve Turnkey şirketler için cüzdan altyapıları kuruyor ama orada başlangıç noktası hâlâ aracı kurumlar. Breez, Bitcoin'in seed phrase yapısı yerine passkey koyuyor ama işi orada bırakıyor. Nuri ise kullanıcının cüzdanın tek sahibi olduğu gerçeğinden yola çıkıyor ve bütün finansal altyapıyı; Bitcoin'i, bankacılığı, kartları ve yapay zeka izinlerini doğrudan buraya bağlıyor.

Nuri marka olarak eskisiyle aynı. İsmi Bitwala'dan devraldık ama yepyeni bir ekip ve modern bir teknolojiyle baştan aşağı yeniden kurduk. Değişmeyen tek şey Bitwala'nın yola çıkış vizyonu: Tam kontrolün kullanıcıda olduğu bağımsız saklama (self-custody), modern bankacılık ve herkes için Bitcoin. Ama bu kez temeli çok daha sağlam attık. Nuri senin hesabını korumaya çalışmıyor, ortada bir hesap olma zorunluluğunu tamamen kaldırıyor. Passkey cüzdanın ta kendisi.
