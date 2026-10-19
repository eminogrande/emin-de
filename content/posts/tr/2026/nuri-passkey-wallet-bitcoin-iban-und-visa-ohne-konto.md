---
title: "Nuri Passkey Wallet: Bitcoin, IBAN ve Visa, hesap olmadan"
description: "Nuri'de bir passkey'den nasıl kendi cüzdanını yapıyoruz, insanlar için, şirketler için ve AI ajanları için, üstelik sağlayıcıda hesap olmadan."
date: "2026-08-05T20:03:39.276Z"
updated: "2026-08-05"
lang: tr
translated_from: "de/nuri-passkey-wallet-bitcoin-iban-und-visa-ohne-konto"
source_sections: ["ein-passkey-statt-konto", "zwei-unterschriften", "heute-schon-live", "wallets-für-ki-agenten", "was-nuri-anders-macht", "der-name-nuri"]
category: nuri
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Nuri bir passkey'den self-custody bir cüzdan türetiyor, hesap, e-posta ya da şifre olmadan.", "Her ödeme iki imza gerektiriyor ve Bitcoin, IBAN, ABD hesabı ve Visa bugün bile aynı cüzdanda çalışıyor.", "AI asistanları için kendi bütçesi olan, süreli cüzdanlar var ve bunları istediğin zaman iptal edebilirsin."]
sections: [{"basically": "Kullanıcı anahtarlarının olduğu bir veritabanı yok, 24 kelime yok ve phishing boşa gidiyor."}, {"basically": "Ne tek başına cihazın ne de tek başına Nuri para hareket ettirebilir, Nuri olmadan da parana yine ulaşırsın."}, {"basically": "Bitcoin, IBAN, ACH, Visa, Mobile Money ve PIX hepsi onchain olarak aynı cüzdanda çalışıyor."}, {"basically": "Bir asistan ödemeyi hazırlayabilir ama onaylayan sensin."}, {"basically": "Diğerleri sağlayıcıdan başlıyor. Biz kullanıcının mülkiyetinden başlıyoruz ve finans stack'ini buna bağlıyoruz."}, {"basically": "Bitwala'dakiyle aynı marka ama sıfırdan yeniden inşa edildi, aynı hedefle: herkes için self-custody."}]
---
Nuri bir Passkey'den insanlar, şirketler ve yapay zeka ajanları için self-custody bir cüzdanı nasıl yapıyor.

Bildiğin her finansal ürün bir hesap üzerinden yürür. Kaydolursun, sağlayıcı hesabı tutar ve para onda durur. Nuri'de biz bu katmanı komple atlıyoruz.

## Hesap yerine bir Passkey

Temelde bir Passkey var, yani bugün bazı servislerde zaten şifresiz giriş yaparken kullandığın yöntemin aynısı. Teknik olarak bu, cihazının güvenli bir çipte üretip sakladığı ve belirli bir web sitesine sıkı sıkıya bağlı bir anahtar çifti. Face ID ya da parmak izin, sen kullanırken anahtarı açıyor.

Biz cüzdanı bu Passkey'den türetiyoruz. Yani bunun için ne bir hesap var ne de bir e-posta ya da şifre. Türetme her seferinde aynı sonucu verdiği için bizim bir şey saklamamıza da gerek kalmıyor. Yani çalınabilecek bir kullanıcı anahtarları veritabanı zaten yok, bir yerlerde güvenle saklaman gereken 24 kelime de yok.

Web sitesine bağlı olmanın bir de yan etkisi var: Sahte bir site Passkey'i hiç kullanamıyor. Tarayıcı onu sadece adres doğruysa veriyor ve böylece phishing boşa çıkıyor.

## İki imza

Her ödeme iki imza istiyor. İlki senin Passkey'inden geliyor ve onu sadece senin cihazın biliyor. İkincisi Nuri'nin güvencesi, ama o da bizde hazır halde durmuyor. Ancak bizim payımız senden gelen malzemeyle birleşince oluşuyor. Yani ne senin anahtarın bizde var ne de ikinci anahtar tam olarak bizde. Böylece ne cihazın tek başına ne de Nuri tek başına para hareket ettirebiliyor.

Günlük hayatta seni koruyan şey bu ikinci imza, çünkü çalınmış bir telefon tek başına yetmiyor. Nuri bir gün ortadan kalksa bile dışarıda kalmıyorsun, çünkü bir bekleme süresinden sonra parana tek başına da ulaşabiliyorsun. Coinbase gibi bir borsayla farkı bu: Orada bakiyen aslında sağlayıcıya ait.

## Bugün zaten canlıda

Bunların hepsi bugün zaten canlıda, bir yol haritası değil. Bitcoin ve Lightning, dijital euro ve dolar, Swap'lar, bir Avrupa IBAN'ı, ACH'li bir ABD hesabı ve bir Visa kartı. Üstüne kimsenin aklına gelmeyen yerel ödeme yolları da var, Tanzanya'daki Mobile Money ve Brezilya'daki PIX gibi.

Asıl mesele de bu. Bu, üstüne bir kripto özelliği eklenmiş bir banka değil. Her şey onchain çalışıyor, senin Passkey'inden doğan aynı cüzdanın üstünde. SEPA ile gelen bir euro doğrudan sana düşüyor, birinin senin adına tuttuğu bir hesaba değil.

## Yapay zeka ajanları için cüzdanlar

Bir de yapay zeka tarafı var. Yapay zeka asistanlarının yakında ödeme yapacağı belli: Abonelikleri yönetecekler, fatura ödeyecekler, alışveriş yapacaklar. Bütün sektörün açık sorusu şu: Bir yazılıma kontrolden çıkmadan paraya erişim nasıl verilir?

Bizim cevabımız şimdiden agent.nuri.com altında çalışıyor. Bunlar kendi anahtarı, kendi bütçesi, sabit alıcıları ve bir son kullanma tarihi olan süreli cüzdanlar. Ana cüzdana dokunmadan istediğin zaman iptal edebiliyorsun. Bir asistan bir ödeme hazırlayabilir ama onaylayan sensin. Nuri ile hedeflediğimiz pazar bu ve bu işe erken girdik.

## Nuri'nin farkı ne

Cloudflare, Privy ve Turnkey şirketler için cüzdan altyapısı kuruyor ve orada sağlayıcı başlangıç noktası olmaya devam ediyor. Breez, Bitcoin seed phrase'inin yerini almak için Passkey kullanıyor ama sadece bunun için. Biz Nuri'de kullanıcının mülkiyetinden başlıyoruz ve bütün finans yığınını buna bağlıyoruz: Bitcoin, bankacılık, kart ve yapay zeka için yetkilendirmeler.

## Nuri ismi

Bir de isimden kısaca bahsedeyim. Nuri eskiden de aynı markaydı, Bitwala'dan devraldık, ama her şeyi sıfırdan kurduk, yeni bir ekiple ve yeni bir teknolojiyle. Kalan tek şey Bitwala'nın o zamanki hedefi: Herkes için self-custody, bankacılık ve Bitcoin. Bu sefer gerçekten taşıyan bir temelin üstünde.
