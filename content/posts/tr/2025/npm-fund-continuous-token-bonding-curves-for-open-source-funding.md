---
title: "NPM Fund ve açık kaynak finansmanı için sürekli token bonding curve'leri"
description: "Her alım satım işleminde açık kaynak geliştiricilerine ödeme yapan, aynı zamanda ilk destekçilere ve token sahiplerine kazanç sağlayan bir token bonding curve yapısı."
date: "2025-01-15T14:52:26.828Z"
updated: "2025-01-15"
lang: tr
translated_from: "en/npm-fund-continuous-token-bonding-curves-for-open-source-funding"
source_sections: ["how-it-fixes-open-source-funding", "the-math", "why-the-money-keeps-flowing"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/npm-fund-continuous-token-bonding-curves-for-open-source-funding/01-784c6401.webp"
tldr: ["NPM Fund, açık kaynak geliştiricilerine bir token bonding curve aracılığıyla ödeme yapıyor. Yapılan her alım satımdan bir pay doğrudan geliştiricilere gidiyor.", "Token sahipleri de işlem ücretlerinden pay alıyor. Geliştirici ve destekçi NFT'leri, kimin ne kadar katkı sağladığını belgeliyor.", "Sistem tamamen zincir üzerinde işliyor; yani tüm işlemler ve ücret dağılımı herkesin şeffaf bir şekilde görebileceği şekilde gerçekleşiyor."]
sections: [{"basically": "Bonding curve, geliştiricilere tek seferlik bağışlar yerine işlem ücretlerinden sürekli bir gelir kapısı açıyor."}, {"basically": "10 ETH'lik bir alımda 2.1 ETH geliştiriciye, 0.3 ETH token sahiplerine, 0.1 ETH ise platforma aktarılıyor."}, {"basically": "İlk destekçiler sistemi başlatıyor; fiyat arttıkça onlar kazanıyor, işlem ücretleri ise geliştiricileri desteklemeye devam ediyor."}]
---
![](../../../media/npm-fund-continuous-token-bonding-curves-for-open-source-funding/01-784c6401.webp)
*via [https://blog.oceanprotocol.com/enabling-short-selling-in-bonding-curves-part-1-af871ad75d40](https://blog.oceanprotocol.com/enabling-short-selling-in-bonding-curves-part-1-af871ad75d40)*

Mesele şu: Açık kaynak projelerindeki finansman açığını, kendi kendini çevirebilen ekonomik bir modelle kapatmak istiyoruz. Bu iş token bonding curve (token bağlama eğrisi) üzerinden yürüyor. Biri her token alıp sattığında işlemin bir kısmı, diyelim ki %21'i, doğrudan projenin başındaki ekibe gidiyor. Böylece geliştiriciler düzenli bir gelire kavuşuyor ve bu kaynağı da doğrudan topluluk sağlıyor. İlk destekçiler token'ları daha ucuza alıyor, proje de ilk sermayesini böyle buluyor. Daha fazla kişi katıldıkça fiyat yükseliyor; bu durum hem ilk destekçileri ödüllendiriyor hem de projeye daha fazla kaynak sağlıyor.

Eğer token tutuyorsan, otomatik olarak bonding curve'e likidite sağlamış oluyorsun. İşlem ücretlerinden, örneğin %3 gibi bir pay alıyorsun ve herhangi bir likidite havuzunu yönetmekle uğraşmıyorsun. Aracı yok, merkeziyetsiz bir borsaya (DEX) falan da ihtiyacın yok çünkü zaten bonding curve'ün kendisi bir piyasa ve her zaman likidite var. Eğrinin tasarımı büyük satışları dengeliyor, yani fiyatı belli bir seviyede tutuyor ve projeyi balinalara veya pump-and-dump tayfasına karşı koruyor.

Ayrıca iki tür NFT var. Birincisi "maintainer NFT", projenin resmi sahipliğini kanıtlıyor; yani sadece doğrulanmış kişiler ücretleri toplayabiliyor. İkincisi "supporter NFT", o da erkenden destek verenlere projeye katkıda bulunduklarına dair kalıcı bir kanıt veriyor.

## Açık kaynak finansmanını nasıl çözüyor

Bu modelin çözdüğü dört temel sorun var. Birincisi gelir istikrarsızlığı. Açık kaynak geliştiricileri genelde bağışlarla veya ara sıra gelen sponsorluklarla geçiniyor, buna güvenip profesyonel bir iş yürütmek zor. Bonding curve, işlem ücretleri sayesinde sürekli bir finansman sağlıyor. Her alım satımda geliştiricilerin %21 gibi bir pay alması, geliri tahmin edilebilir kılıyor ve proje büyüdükçe bu gelir de artıyor.

İkinci sorun, hibeler veya bağışlar gibi geleneksel yolların merkezi ve kısıtlı olması. Bonding curve ile herkes sadece token alarak katkıda bulunabiliyor. İlk destekçilerin daha ucuza alıp sonradan gelenlerin daha fazla ödediği bu model, ölçeklenebilir ve adil bir yapı sunuyor.

Üçüncü sorun, uzun vadeli destek. Çoğu açık kaynak projesi katılımcıları tutmakta zorlanıyor. Token sahipleri işlem ücretlerinden pasif gelir elde ettiği için ellerindeki varlığı tutup projeyle yola devam etmek için bir motivasyonları oluyor. Geliştiriciler ayrıca Drips Network gibi araçları kullanarak bu gelirleri diğer katkıcılara da dağıtabiliyor.

Son sorun ise güven. Geleneksel fonlar genelde şeffaf değil, insanlar da haliyle mesafeli yaklaşıyor. Bonding curve tamamen on-chain çalışıyor; yani her işlem ve her ücret dağıtımı halka açık, isteyen herkes kontrol edebiliyor.

## Matematik kısmı

Token aldığında aslında onları mint'lemiş (basmış) oluyorsun. Akıllı kontrata ETH gönderiyorsun, o da o anki arz miktarına göre sana kaç token vereceğini hesaplıyor. Arz düşükse verdiğin ETH karşılığında daha fazla token alıyorsun, arz yüksekse daha az.

Token'ları sattığında ise onları burn'lemiş (yakmış) oluyorsun. Token'ları kontrata geri gönderiyorsun, o da yine mevcut arza bakıp sana ne kadar ETH vereceğini hesaplıyor. Arz yüksekse token başına daha az ETH, arz düşükse daha çok ETH alıyorsun.

Her işlemden bir yüzde kesiliyor. Diyelim ki biri 10 ETH değerinde token aldı. Bunun %21'i, yani 2.1 ETH geliştiriciye gidiyor; %3'ü, yani 0.3 ETH token sahiplerine dağıtılıyor; %1'i, yani 0.1 ETH de platforma kalıyor. Sahipler, toplam arzın ne kadarına sahip olduklarına göre %3'lük havuzdan pay alıyor. Eğer token'ların %10'u sende ise, 0.3 ETH'lik havuzdan %10 pay alıyorsun.

## Para neden akmaya devam ediyor

İlk destekçiler projenin ayağa kalkması için gereken sermayeyi koyuyor. Proje büyüdükçe token fiyatı artıyor, bu da ilk destekçileri ödüllendirip daha fazla insanı çekiyor. Sonrasında işlem ücretleri paranın akışını sağlıyor, böylece geliştiriciler bağış peşinde koşmak yerine sadece projeye odaklanabiliyor. Token sahiplerinin projeyi uzun süre desteklemek için bir sebebi oluyor, bu da aidiyeti yüksek, sağlam bir topluluk yaratıyor. Her şey on-chain olduğu için her işlem ve ücret dağıtımı şeffaf, açıp kendin bakabiliyorsun.

Özetle bonding curve, açık kaynak projelerine herkesin denetleyebileceği, kendi kendini döndüren merkeziyetsiz bir finansman modeli sunuyor. Geliştiricileri, destekçileri ve token sahiplerini aynı hedefte buluşturuyor. Finansman sorunu böyle çözülüyor ve hem proje hem de topluluk büyümeye devam ediyor.

Daha fazla bilgi için [paymentrequired.com](http://paymentrequired.com) adresine göz atabilirsin.
