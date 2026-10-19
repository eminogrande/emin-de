---
title: "34yCReBo...jtVM İşlem Analizi"
description: "Paras'taki bir NEAR işlemine bakıyoruz, mt_transfer_call ne yapar, NEP-245 nedir ve neden fee neredeyse hiçbir şey tutmadı."
date: "2026-02-09T10:40:01Z"
updated: "2026-02-09"
lang: tr
translated_from: "en/comprehensive-transaction-analysis-34ycrebo-jtvm"
source_sections: ["the-basics", "what-mt_transfer_call-does", "inside-the-transaction", "what-it-means"]
category: payments
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/comprehensive-transaction-analysis-34ycrebo-jtvm/cover.webp"
tldr: ["v4v.near'dan Paras marketplace kontratına giden bir NEAR mainnet işleminin detaylı incelemesi.", "NEP-245 multi-token standardında mt_transfer_call çalıştırdı ve 15.42 TGas kullandı, yaklaşık 0.00008 dolar.", "Marketplace transferi anında görebildi ve bir sonraki adımı halletti, büyük ihtimalle bir trade ya da bir listeleme."]
sections: [{"basically": "v4v.near'dan Paras marketplace'ine başarılı bir NEAR mainnet çağrısı, bir sentten bile az bir ücrete."}, {"basically": "Tek bir çağrı bir NEP-245 token'ını taşıyor ve alıcı kontrata hemen harekete geçmesini söylüyor."}, {"basically": "Sahipliği kontrol et, 1 yoctoNEAR depozitoyu kontrol et, bakiyeyi taşı, sonra alıcıyı haberdar et."}, {"basically": "Minicik bir fee Paras'ta bir token taşıdı ve marketplace'in bir sonraki adımı anında halletmesini sağladı."}]
---
![](../../../media/comprehensive-transaction-analysis-34ycrebo-jtvm/cover.jpg)

# 34yCReBo...jtVM İşleminin Analizi

Bu, NEAR üzerindeki bir işlem; ben de kimden geldiğinden ne anlama geldiğine kadar altı kısa bölümde anlatıyorum.

## Temel bilgiler

İşlem hash'i 34yCReBoTyb12hH33xVdydoNJE5s58Kb1VeWYwY7jtVM ve NEAR Protocol mainnet üzerinde çalıştı. Durum başarılı ve kesinleşmiş durumda. İmzalayan, yani gönderen, v4v.near; alıcı kontrat ise x.paras.near, ki bu Paras marketplace'in ana kontratı.

Gas limiti 300 TGas'ti; bu sadece ayrılan maksimum hesaplama birimi, yani dolar karşılığı yok. Gerçekte kullanılan gas 15.42 TGas'ti, yaklaşık $0.00008. İşlem ücreti, yani çağrıyı işlemek için validator'lara ödenen maliyet, 0.001542 NEAR'dı, yani $0.01'den az. Bir de 1 yoctoNEAR'lık ek depozito vardı, yaklaşık $0.0000...01 değerinde; bu da varlık transferleri için bir güvenlik gereksinimi.

## mt_transfer_call ne yapar

İşlem `mt_transfer_call` çalıştırdı; bu bir multi-token transfer ve çağrısı. Aynı anda iki şey yapan üst düzey bir fonksiyon. Transfer kısmı, NEP-245 ile tanımlanmış belirli bir varlığın sahipliğini gönderenden alıcıya taşıyor. Çağrı kısmı ise alıcı kontrata hemen ikinci bir eylem yapmasını söylüyor; örneğin öğeyi satışa çıkarmak ya da stake etmek.

NEP-245, Ethereum'daki ERC-1155'in NEAR versiyonu. Dijital varlıklar için bir İsviçre çakısı olması için tasarlanmış; işte bu yüzden burada kullanıldı. Tek eşsiz öğeler, yani NFT'ler, ve istiflenebilir öğeler, yani fungible token'lar için ayrı standartlar yerine, NEP-245 ikisini de tek kontratta hallediyor. Ayrıca yarı-fungible baskılara da izin veriyor. Bir sanatçı dijital bir kartın 100 özdeş kopyasını çıkarırsa, NEP-245 bunları 100 ayrı benzersiz kayıt olarak değil, 100 bakiyeli tek bir ID olarak takip ediyor. Üstelik işleri ucuzlatıyor, çünkü toplu transferler mümkün; yani 50 farklı öğeyi tek bir işlem ücretiyle taşıyabilirsin.

## İşlemin içinde

Olay günlüğündeki standart `nep245`, olay ise `mt_transfer`; içerideki mantık dört adımda çalıştı. Önce kontrat, gönderenin (`v4v.near`) `token_id`'ye sahip olduğunu kontrol ediyor. Sonra 1 yoctoNEAR depozitosunun orada olduğunu kontrol ediyor, güvenlik kontrolü olarak. Üçüncü adımda `token_id`'nin bakiyesi gönderenden alınıp alıcıya ekleniyor. Son olarak da alıcı kontratta `on_mt_transfer` geri çağrısı tetikleniyor; varlıkları kabul ettiğini onaylamak için.

## Ne anlama geliyor

Yani bu, Paras marketplace üzerinde bir dijital varlığın ucuz ve verimli bir şekilde taşınmasıydı. Daha yeni NEP-245 standardını kullanan bir token'ı taşımak için yaklaşık $0.00008 gibi minicik bir ücret ödedin; bu sayede marketplace transferi hemen görebildi ve bir sonraki adımı halledebildi, büyük ihtimalle bir takas ya da listeleme.
