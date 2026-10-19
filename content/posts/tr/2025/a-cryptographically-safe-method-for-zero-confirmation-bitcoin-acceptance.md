---
title: "Sıfır onaylı Bitcoin ödemesi almanın kriptografik olarak güvenli yolu"
description: "Eğer ödemeyi yapan kişi sizden bağımsız şekilde ikinci bir harcama yapamıyorsa, sıfır onaylı Bitcoin ödemesi gayet güvenli hale gelir. Taproot ile ortak imza, her outpoint için tek imza ve…"
date: "2025-12-16T09:20:01Z"
updated: "2025-12-16"
lang: tr
translated_from: "en/a-cryptographically-safe-method-for-zero-confirmation-bitcoin-acceptance"
source_sections: ["when-zero-confirmation-is-unsafe", "the-one-condition", "a-taproot-output-with-two-paths", "how-acceptance-works", "four-rules-for-the-co-signer", "timing", "bitcoin-to-lightning-swaps", "what-it-doesnt-fix", "what-you-need"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/a-cryptographically-safe-method-for-zero-confirmation-bitcoin-acceptance/cover.webp"
tldr: ["Sıfır onaylı bir ödemenin güvenli olması için, göndericinin aynı UTXO için başka bir geçerli harcama oluşturamaması gerekir.", "Bunu zorunlu ortak imza ve kullanıcının tek başına kullanabileceği gecikmeli bir kurtarma yoluyla kriptografik olarak garanti altına alıyoruz.", "Ortak imzalayıcı her outpoint'i sadece bir kez imzalar, böylece Lightning ödemesi daha ilk onay bile gelmeden işleme konabilir."]
sections: [{"basically": "Eğer gönderen kişi aynı UTXO için alternatif bir harcama oluşturabiliyorsa, fee'lerin ya da RBF kurallarının bir önemi kalmaz."}, {"basically": "O kritik aralıkta gönderenin tek başına harcama yapamaması şarttır. Bunu doğrudan UTXO seviyesinde zorunlu kılıyoruz."}, {"basically": "İki imzalı iş birlikçi yol anında devrede, sadece kullanıcıya özel kurtarma yolu ise N blok sonra aktif oluyor."}, {"basically": "İşlemi oluştur, onay için gönder, politikayı kontrol et, imzala ve yayına ver. Sonrasında mempool'un durumuyla ilgilenmenize gerek kalmaz."}, {"basically": "Her outpoint için tek imza, imzala ve kilitle, tüm işleme taahhüt ver, reorg'ları yakından takip et."}, {"basically": "Kurtarma gecikmesi, fee'ler tavan yaptığında bile iş birlikçi harcamanın onay almasına yetecek kadar uzun olmalıdır."}, {"basically": "Ortak imza aslında bir yetkilendirme demektir, bu yüzden Lightning ödemesi sıfır onayla vakit kaybetmeden başlayabilir."}, {"basically": "Göndericinin çift harcama yapma dönemi kapandı. Ancak ortak imzalayıcının hacklenmesi, sistemin devre dışı kalması, yavaş onaylar ve sansür riski hâlâ masada."}, {"basically": "Zorunlu ortak imza, her outpoint için tek imza ve gecikmeli kişisel kurtarma yolu. Bunların dışındaki hiçbir çözüm işe yaramaz."}]
---
![](../../../media/a-cryptographically-safe-method-for-zero-confirmation-bitcoin-acceptance/cover.jpg)

Bir Bitcoin işlemi blok içinde onaylanana kadar kesinleşmiş sayılmaz. O zamana kadar, bir UTXO’yu harcayan herhangi bir işlem, aynı girdileri harcayan başka bir geçerli işlemle değiştirilebilir. İşte bu yüzden, sıfır onaylı (zero-confirmation) ödemeleri kabul etmek genel olarak güvenli değildir.

Bu yazı, bir servisin sıfır onaylı bir Bitcoin işlemini nasıl güvenle kabul edebileceğini ve ona göre hareket edebileceğini anlatıyor. İşin mantığı şu: Ödeyen kişi, belirlenen bir süre boyunca çakışan geçerli bir işlem oluşturamıyor.

Sistem, UTXO seviyesinde kimin imza atabileceğini zorunlu kılarak çalışıyor. Mempool’un nasıl davrandığına ya da madenci politikalarına bağlı değil.

## Sıfır onay ne zaman güvensizdir?

Diyelim ki bir `U` UTXO’su bir kullanıcı tarafından harcanabiliyor. `U`’yu harcayan sıfır onaylı bir `T` işlemi, eğer kullanıcı aynı `U` girdisini kullanan ve `T` yerine onaylanmasını sağlayabileceği farklı bir `T'` işlemi oluşturabiliyorsa güvensizdir.

Bu durum; fee miktarı, Replace-by-Fee sinyali olup olmadığı, mempool’un işlemi nasıl yaydığı veya `T` içinde nasıl bir script yapısı olduğu fark etmeksizin geçerlidir.

Yani sıfır onay güvenliği demek, `U`’yu harcayan başka hiçbir geçerli yolun olmaması demektir.

## Tek bir şart

Olayın mantığı basit. Çakışan bir işlemin var olabilmesi için, ödeyen kişinin tek başına geçerli bir harcama yapabiliyor olması lazım. İhtiyacın olan tek bir şart var ve bu fazlasıyla yeterli:

Kabul penceresi boyunca ödeyen kişi, servis işin içine dahil olmadan ilgili UTXO’ları harcayan hiçbir geçerli işlem oluşturamamalı. Bu durum, UTXO seviyesinde kriptografi ile zorunlu kılınmalı.

## İki yollu bir Taproot çıktısı

Fonlar, harcama yapmanın iki yolu olan bir Taproot çıktısında duruyor. Ortak yol (cooperative path) anında çalışıyor. Kullanıcıdan ve servisin ortak imza anahtarından (co-signing key) birer imza gerekiyor. Zaman kilidi (timelock) yok; tüm normal harcamalar için bu kullanılıyor.

Kurtarma yolu (recovery path) ise sadece kullanıcıya özel ama gecikmeli. Sadece kullanıcının imzası yetiyor, `OP_CHECKSEQUENCEVERIFY` ile korunuyor ve `N` blok sonra geçerli oluyor. Yani servis fonlar üzerinde asla tam kontrole sahip olmuyor; kullanıcı gecikme sonunda fonlarını her zaman kendi başına alabiliyor ve gecikme bitmeden önce kimse tek başına harcama yapamıyor.

## Kabul süreci nasıl işliyor?

Şimdi `U` çıktısının böyle kurulduğunu varsayalım. Kabul süreci 5 adımda işliyor. 1. adımda kullanıcı `U`’yu harcayan bir `T` işlemi oluşturuyor, 2. adımda işlem ortak imza için servise gidiyor, 3. adımda servis kendi politikalarını yani varış noktası, tutar ve fee’yi kontrol ediyor.

4. adımda servis, `U` içindeki her bir outpoint için tam olarak bir kez `T` işlemini imzalıyor ve 5. adımda işlem yayınlanıyor. Bu noktada `T` geçerli oluyor, `U`’yu harcayan başka hiçbir geçerli işlem var olamıyor ve mempool’un ne yaptığı artık hiç önemli değil.

Yani işlem onaylanmamış olsa bile anında yetkilendirilmiş gibi davranabilirsin.

## Ortak imzalayıcı için dört kural

Ortak imzalama servisi şu 4 kurala uymak zorunda, yoksa güvenlik garantisi biter:

1. Kural: Her outpoint için sadece bir imza atılır, yani her UTXO en fazla bir kez imzalanır ve bu, kalıcı bir durumda (durable state) takip edilir.

2. Kural: İmzala ve kilitle işlemleri atomik olmalı; yani imzalama ve durumu yazma tek bir adımda gerçekleşmeli, böylece paralel istekler asla birden fazla imzaya yol açmamalı.

3. Kural: İşlemin tamamını taahhüt et; yani imza tüm işlem özetini (digest) kapsamalı, sadece bir niyeti imzalama olmamalı.

4. Kural: Reorg’ların farkında ol; yani durum bir onay geldi diye hemen serbest bırakılmamalı, reorg riski kabul edilebilir seviyeye gelene kadar outpoint’ler kilitli kalmalı.

## Zamanlama

Zamanlama da önemli. Kurtarma yolu, ebeveyn çıktının onaylanmasından itibaren saymaya başlayan göreceli bir zaman kilidiyle (`OP_CHECKSEQUENCEVERIFY`) korunuyor. Onaydan önce sadece ortak yol geçerli. Onaydan sonra ise gecikme süresi, fee’ler kötü olsa bile ortak harcamanın onaylanabilmesi için yeterince uzun olmalı.

Servis, ortak harcama işleminin kurtarma yolu açılmadan önce büyük ihtimalle onaylanacağından emin olmalı ya da o ekonomik riski göze almalı.

## Bitcoin - Lightning swap işlemleri

Bu sistem, Bitcoin’den Lightning’e swap işlemleri için harika. On-chain ortak harcama yetkilendirme görevi görüyor, Lightning ödemesi imza atılır atılmaz başlayabiliyor ve on-chain onay da yerleşim (settlement) oluyor.

Ortak pencere sırasında çakışan hiçbir harcama var olamadığı için, sıfır onayda Lightning ödemesini başlatmak servisi ödeyen kişiden gelecek bir double-spend riskine sokmuyor.

## Neyi çözmüyor?

Ama bu sadece ödeyen kişiden gelecek double-spend riskini ortadan kaldırır. Ortak imzalayıcının hacklenmesi, servisin çökmesi, onayların uzun sürmesi veya madencilerin işlemi sansürlemesi gibi riskleri kaldırmaz. Operasyonel tarafta bu riskleri kendin yönetmen lazım.

## Ne gerekiyor?

Yani Bitcoin’de güvenli sıfır onaylı kabul ancak ödeyen kişinin çakışan geçerli işlemler oluşturma yeteneğini elinden alırsan çalışır. UTXO seviyesinde zorunlu ortak imza, her outpoint için sıkı bir tek seferlik imzalama ve kullanıcının tek başına kullanabileceği gecikmeli bir kurtarma yolu şart.

Bunları zorunlu tutmayan hiçbir yaklaşım sana kriptografik bir sıfır onay güvenliği sağlayamaz.
