---
title: "Bitcoin ve Stablecoin Nakit Cüzdanı Nuri için Açık Bankacılık"
description: "Nuri.com, kendi kendine saklamalı bir Bitcoin ve stablecoin nakit cüzdanıdır. Açık bankacılık, IBAN kopyalamadan tek tuşla banka ile yükleme ve ödeme yapmanı sağlar."
date: "2026-03-11T10:58:25.257Z"
updated: "2026-03-11"
lang: tr
translated_from: "en/open-banking-for-the-bitcoin-and-stablecoin-cash-wallet-nuri"
source_sections: ["the-iban-is-a-bridge", "what-is-missing", "top-up-by-bank", "pay-by-bank-at-checkout", "plumbing-not-the-product", "three-stages", "why-this-matters", "under-the-hood"]
category: nuri
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/open-banking-for-the-bitcoin-and-stablecoin-cash-wallet-nuri/01-7fd0f781.png"
tldr: ["Nuri kendi kendine saklamalı bir cüzdan ve IBAN bir köprüdür: SEPA girişi stablecoin basar, SEPA çıkışı onları yakar.", "Açık bankacılık, yükleme ve ödeme sırasında Pay by Bank için tek tuşla IBAN kopyalamayı ortadan kaldırır.", "Plan üç aşamada yayılıyor ve bankaların banka olmayan bir cüzdanı kabul edip etmeyeceği açık bir soru."]
sections: [{"basically": "IBAN sadece giriş ve çıkış yoludur. Nuri yarın kaybolsa, paran kaybolmaz."}, {"basically": "Uygulamalar arasında 20+ karakter kopyalamak 2025'in acısı. İnsanlar bir tuşa basıp bitirmek istiyor."}, {"basically": "Para Ekle'ye tıkla, bankacılık uygulamanda onayla ve para cüzdanına düşsün, ortada IBAN yok."}, {"basically": "Pay by Bank'ı seç, Nuri'de onayla ve herhangi bir bankadan olduğu gibi bir SEPA Instant ödemesi çıksın."}, {"basically": "Cüzdan üründür. Açık bankacılık, onu her yerde bir banka hesabı gibi davranmasını sağlayan katmandır."}, {"basically": "Önce yükleme, sonra ödeme bağlantılarında Pay by Bank, ardından bankaların bir cüzdanı kabul etmesini gerektiren tam ödeme."}, {"basically": "Kopyalanacak 22 karakter veya basılacak bir tuş arasında, insanlar tuşa basacak."}, {"basically": "Nuri Monerium'a bağlanır, Monerium LHV'ye bağlanır. Elinde bir boru hattı bağlı bir cüzdan var."}]
---
![](../../../media/open-banking-for-the-bitcoin-and-stablecoin-cash-wallet-nuri/01-7fd0f781.png)

## IBAN bir köprüdür

IBAN bir köprüdür, özellik değil.

[Nuri.com](https://nuri.com) self-custodial bir Bitcoin ve Stablecoin Emoney Cash Wallet. Banka değil, neobank da değil. Bir wallet.

Doğrulanmış her kullanıcı bir IBAN alıyor. Ve o IBAN bir hesap değil. Eski bankacılık sistemiyle blockchain arasında bir köprü. Biri senin IBAN'ına SEPA Instant işlemi gönderdiğinde, e-money doğrudan wallet'ına stablecoin olarak mint ediliyor.

Para göndermek istediğinde stablecoin'ler burn ediliyor ve IBAN üzerinden ödediğin kişiye bir SEPA Instant işlemi gidiyor. Girişte mint, çıkışta burn. IBAN sadece boru hattı.

Yani ortada banka bakiyesi yok. Bir bankanın veritabanında duran bir kayıt yok. Paran chain üzerinde yaşıyor, sadece senin kontrol ettiğin bir wallet'ta.

IBAN sadece giriş ve çıkış yolu. Nuri yarın yok olsa, paran yok olmaz. Bütün mesele bu.

## Ne eksik

Şimdi, ne eksik.

IBAN'lar çalışıyor. Ama IBAN'lar eziyet. 20'den fazla karakteri kopyalıyorsun, uygulama değiştiriyorsun, bankacılık uygulamana yapıştırıyorsun, 2FA ile onaylıyorsun, bekliyorsun ve yazım hatası yapmadığını umuyorsun.

2025 yılındayız ve hâlâ bunu yapıyoruz. İnsanlar bunu yapmak istemiyor. Bir butona basıp bitirmek istiyorlar.

Open banking tam da bunu çözüyor. Ürün olarak değil, altyapı olarak.

İki kullanım senaryosu var.

## Bankadan top up

İlki bankadan top up. Nuri uygulamasını açıyorsun ve "Add Money"ye tıklıyorsun. Mobil bankacılık uygulamana yönlendiriliyorsun, tutarı onaylıyorsun, bitti. Para wallet'a stablecoin olarak düşüyor.

IBAN kopyalamak yok, yazacak bir şey yok, uygulamalar arasında zıplamak yok. Bir buton, bir onay ve para orada.

SEPA Instant işlemi arka planda yine gerçekleşiyor, eskisi gibi, ama IBAN'ı hiç görmüyorsun. Open banking ödemeyi başlatıyor ve blockchain onu sonuçlandırıyor.

Her modern fintech top up'ları böyle yapıyor. Nala bunu havaleler için yapıyor. Revolut bunu sonuna kadar zorluyor. İnsanların sevdiğini biliyoruz. Buradaki fark, paranın bir banka hesabına düşmemesi. Self-custodial bir wallet'a mint ediliyor. Bu yeni.

## Checkout'ta Pay by Bank

İkincisi checkout'ta pay by bank. Giderek daha fazla merchant ödeme yaparken "Pay by Bank" sunuyor. Visa'dan daha düşük fee'leri var, anında sonuçlanıyor ve chargeback yok. Hızla büyüyor ve haklı sebeplerle.

Nuri kullanıcılarının bunu kullanabilmesini istiyoruz.

Online alışveriş yapıyorsun, "Pay by Bank"i seçiyorsun, link Nuri uygulamasını açıyor, ödemeyi onaylıyorsun ve senin IBAN'ından merchant'a bir SEPA Instant işlemi gidiyor. Stablecoin'ler burn oluyor, merchant euro alıyor. Bitti.

Akıştan hiç çıkmıyorsun. IBAN aramak yok, manuel transfer yok, sürtünme yok. Merchant için herhangi bir open banking ödemesi gibi görünüyor.

Senin için bankadan ödemek gibi görünüyor, tek fark ortada banka yok. Sadece aynı dili konuşan bir wallet var.

## Altyapı, ürün değil

Bu aslında wallet'larla bankalar arasında deep linking. Başka bir şey değil.

Open banking ürün değil. Wallet ürün. Open banking, blockchain üzerinde yaşayan bir wallet'ın, insanların banka beklediği her yerde banka hesabı gibi davranmasını sağlayan katman. Top up'lar, checkout'lar, payment link'ler, hepsi.

IBAN, Nuri'nin bankalarla protokol seviyesinde çalışmasını zaten sağlıyor. Open banking, UX seviyesinde çalışmasını sağlıyor. İkisi birlikte, günlük kullanımda tıpkı bir banka hesabı gibi hissettiren ama kaputun altında tamamen farklı olan bir wallet ortaya çıkıyor.

Banka yok, custody yok, karşı taraf riski yok. Sadece iki yönde de çalışan bir köprü ve onu görünmez yapan bir buton.

## Üç aşama

Bunu üç aşamada yayına almak istiyoruz.

Birinci aşama bankadan top up. Bir buton, para içeride. Bu tek başına, yeni kullanıcıların wallet'larını fonlarken yaşadığı en büyük sürtünmeyi kaldırıyor.

İkinci aşama payment link'lerde pay by bank. Nuri zaten ödeyen kişinin nasıl ödeyeceğini seçebildiği payment link'ler yapıyor, crypto, stablecoin ya da banka transferiyle.

Buna bir "Pay by Bank" butonu eklersek, gönderenin Nuri kullanıcısı olmasına bile gerek kalmıyor. Tıklıyor, kendi bankacılık uygulamasında evet diyor ve ödeme merchant'ın wallet'ına stablecoin olarak ulaşıyor.

Üçüncü aşama tam open banking checkout. Nuri kullanıcıları Pay by Bank kabul eden her yerde ödeme yapabiliyor. Bu daha derin bir entegrasyon gerektiriyor, çünkü wallet'ın open banking dünyasında ödeme başlatmak için geçerli bir yer olarak kabul edilmesi gerekiyor.

Teknik olarak çalışıyor, bir buton senin IBAN'ından bir SEPA Instant işlemi tetikliyor. Bankalar ve sağlayıcılar banka olmayan bir wallet'ı kabul eder mi, açık soru bu.

## Bu neden önemli

Bu neden önemli. Kimse temassız ödemelerin büyüyeceğini söylememişti. Şimdi başka bir şey yok.

İnsanlar her şeyin üstünde rahatlığı ve hızı seçiyor. Her seferinde. IBAN kopyalamak rahat değil. Butona tıklamak rahat.

Kullanıcılar bize söyleyecek, ama bahis basit. İnsanlar 22 karakter kopyalamakla tek butona basmak arasında seçim yapabiliyorsa, butona basacaklar.

Open banking Nuri'nin ne olduğunu değiştirmiyor. Köprünün ne kadar görünmez olduğunu değiştiriyor.

## Kaputun altında

Ve kaputun altında böyle çalışıyor. Nuri bir banka değil. Nuri, stablecoin'ler ve Bitcoin için self-custodial bir wallet.

Bankacılık rayları Monerium sayesinde var, düzenlenmiş bir e-money kurumu ve Monerium, IBAN'lar ve SEPA Instant için LHV Bank'a bağlanıyor.

Nuri Monerium'a bağlanıyor, Monerium LHV'ye bağlanıyor. Asla bir banka hesabın olmuyor. Boru hattı takılı bir wallet'ın oluyor.

IBAN'ına bir SEPA Instant işlemi geldiğinde, Monerium doğrudan wallet'a EURe stablecoin mint ediyor. Para gönderdiğinde EURe burn oluyor ve Monerium, IBAN'dan ödediğin kişiye bir SEPA Instant işlemi başlatıyor.

Bir işlem başarısız olursa ya da geri alınırsa, stablecoin'ler aynı yoldan, ters yönde wallet'a geri dönüyor. Arada bir durum yok.

Paran ya chain üzerinde wallet'ında ya da IBAN üzerinden yolda. Köprü iki yönde de çalışıyor, her zaman.
