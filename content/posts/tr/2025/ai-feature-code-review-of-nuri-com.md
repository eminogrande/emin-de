---
title: "Nuri.com yapay zeka kod analizi"
description: "Nuri Expo uygulamasının kodlarını yapay zekaya incelettim ve kullanıcıya sunulan tüm özellikleri çıkardım. Bitcoin cüzdanı, Euro kartı, IBAN bankacılığı, swap ve debug ekranları dahil."
date: "2025-12-22T13:00:01Z"
updated: "2025-12-22"
lang: tr
translated_from: "en/ai-feature-code-review-of-nuri-com"
source_sections: ["what-i-asked-the-ai-to-do", "the-three-core-products", "payments-and-sending-money", "signing-and-recovery", "tabs-deep-links-and-security", "debug-screens-and-swap"]
category: nuri
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/ai-feature-code-review-of-nuri-com/cover.webp"
tldr: ["Yapay zeka, Nuri Expo kodlarını tarayarak kullanıcının erişebildiği tüm özellikleri listeledi.", "Sistemin temeli Bitcoin cüzdanı, Gnosis Pay Euro kartı ve Monerium IBAN bankacılığı üzerine kurulu.", "Bunların etrafında ise alım satım, transfer, swap, imzalama ve hesap kurtarma işlemleri bulunuyor.", "Özetle kripto dünyası ile geleneksel Euro bankacılığının hibrit bir yapısı karşımıza çıkıyor."]
sections: [{"basically": "Nuri Expo kodlarını yapay zekaya okuttum ve kullanıcının gerçekte gördüğü tüm özellikleri çıkardım."}, {"basically": "Üç ana sütun var: Bitcoin cüzdanı, Gnosis Pay Euro kartı ve Monerium IBAN bankacılığı."}, {"basically": "Mercuryo veya Apple Pay üzerinden Bitcoin alımı, BTC veya EURe transferi ve adres defteri özellikleri mevcut."}, {"basically": "Özel anahtarları tutmadan Bitcoin imzalama ve CSV dışa aktarma ile hesap kurtarma imkanı var."}, {"basically": "Üç farklı sekme, nuri:// derin bağlantılar, telefon doğrulama, KYC, güvenli anahtar saklama ve biyometrik giriş desteği sunuluyor."}, {"basically": "İleri seviye kullanıcılar için her detayın bulunduğu bir debug ekranı ve Bitcoin ile EURe arasında swap özelliği de hazır."}]
---
![](../../../media/ai-feature-code-review-of-nuri-com/cover.jpg)

## AI'dan ne yapmasını istedim

Nuri Expo uygulamasının kodlarını bir yapay zekaya verdim ve kullanıcı tarafında görünen tüm özellikleri listelemesini istedim. Ortaya çıkanlar şunlar.

## Üç temel ürün

Olay temelde üç parçadan oluşuyor. İlki Bitcoin cüzdanı. Bitcoin gönderip alabiliyorsun, Lightning network desteği var, QR kodla ödeme yapabiliyorsun, bakiyeni ve işlem geçmişini takip edebiliyorsun. İkincisi, Gnosis Pay altyapısını kullanan Euro kartı. Bu hem fiziksel hem sanal bir banka kartı; EURe denilen Euro stablecoin'i ile çalışıyor. Kart hareketlerini izleyebiliyor, banka havalesiyle karta bakiye yükleyebiliyor ve fiziksel kart siparişi verebiliyorsun. Üçüncüsü ise Monerium entegrasyonuyla gelen fiat bankacılık. Bu sayede IBAN transferleri, hesap bilgileri, Euro yatırma-çekme işlemleri ve işlem geçmişi gibi tüm özellikler elinin altında oluyor.

## Ödemeler ve para transferi

Bir de ödeme tarafı var. Mercuryo entegrasyonuyla, hatta Apple Pay kullanarak Bitcoin alabiliyorsun, Euro'yu Bitcoin'e çevirebiliyor ve anlık fiyat takibi yapabiliyorsun. Ayrıca para transferi de mümkün. Bitcoin cüzdanlarına transfer, IBAN üzerinden EURe işlemi, cüzdandan cüzdana gönderim yapabiliyorsun; bir de adres defteri özelliği var.

## İmzalama ve kurtarma

İşin biraz daha teknik kısmı, durumsuz (stateless) Bitcoin imzalama. Yani özel anahtarların (private keys) senin kontrolünde olduğu, Multisig destekli ve ekstra güvenlik önlemli bir yapı var. Bir de CSV kurtarma olayı var; yedekleme, geri yükleme, işlemleri dışarı aktarma ve hesabı geri getirme süreçleri için.

## Sekmeler, derin bağlantılar ve güvenlik

Kullanıcı deneyimi tarafında sekmelerimiz var. Bir Bitcoin sekmesi (₿), bir Kart sekmesi (€) ve bir Cüzdan ya da Yatırma sekmesi; en altta da bir navigasyon barı bulunuyor. Deep link'ler de çalışıyor. nuri://bitcoin yazdığında Bitcoin ekranı, nuri://card yazdığında kart ekranı, nuri://monerium yazdığında ise bankacılık hata ayıklama ekranı açılıyor. Uygulama ayrıca bitcoin: ve lightning: URI şemalarını da destekliyor. Güvenlik ve kimlik doğrulama tarafında ise telefon doğrulaması, KYC süreci, güvenli anahtar saklama ve biyometrik giriş mevcut.

## Hata ayıklama ekranları ve swap

İleri seviye kullanıcılar için debug ekranları da var. Bitcoin, Kart ve Monerium için işlem hata ayıklama modalları, özellik bayrakları (feature flags) hata ayıklayıcısı ve ağ günlükleri (network logging) gibi araçlar bulunuyor. Bir de swap özelliği var; Bitcoin'den EURe'ye veya EURe'den Bitcoin'e hızlıca geçiş yapabiliyorsun.

Yani özetle, uygulama kripto ile fiat bankacılığının bir karması. Gnosis Pay kartları ve Monerium IBAN servisleri üzerinden Bitcoin'i bildiğimiz Euro bankacılığıyla birleştiriyor.
