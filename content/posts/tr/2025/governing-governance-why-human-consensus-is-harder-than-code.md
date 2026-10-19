---
title: "Yönetişimi yönetmek: İnsan mutabakatı neden koddan daha zor"
description: "Yönetişim, insanlar arasında mutabakat sağlamaktır ve bu iş kod yazmaktan katbekat daha zor. Neden oylama son çare olmalı, sinyalizasyon ve delegasyon neden işe yarar?"
date: "2025-12-06T18:50:02Z"
updated: "2025-12-06"
lang: tr
translated_from: "en/governing-governance-why-human-consensus-is-harder-than-code"
source_sections: ["what-governance-actually-is", "voting-should-be-the-last-resort", "who-actually-participates", "many-or-few-experts-or-crowd", "liquid-democracy", "a-human-problem"]
category: bitcoin
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
image: "/media/governing-governance-why-human-consensus-is-harder-than-code/cover.webp"
tldr: ["Yönetişim, insanlar arasında ortak bir zemin bulma sanatıdır; grup büyüdükçe bu işin zorluğu da katlanır.", "Oylama, taraflar oturup bir çözüm üretmeye çalıştıktan sonra başvurulacak en son çare olmalıdır.", "Sinyalizasyon, delege edilmiş oylama ve net iletişim, koddan çok daha kritik öneme sahiptir."]
sections: [{"basically": "Yönetişim, insanlar arasında uzlaşı sağlamaktır. Bir akşam yemeğinde kolaydır ama topluluk büyüdükçe imkansız hale gelebilir."}, {"basically": "Yüzde 51,9'a 48,1'lik bir sonuç halkın iradesini yansıtmaz; sadece bölünmüş bir topluluğu gösterir."}, {"basically": "Fork yapmak ağı ikiye böler, bu yüzden kimin gerçekten taraf olduğunu iyi anlamamız lazım: node'lar mı, kullanıcılar mı, yoksa akıllı sözleşmeler mi?"}, {"basically": "Madenciler yüksek işlem ücreti istiyor. Kullanıcılar sıfır ücret istiyor. Kim haklı?"}, {"basically": "Bağlayıcı kararlar almadan önce sinyalleri toplayın, insanların oylarını delege etmesine ve istedikleri an geri çekebilmelerine izin verin."}, {"basically": "Yönetişim bir yazılım güncellemesi değil, insan iş birliğidir."}]
---
![](../../../media/governing-governance-why-human-consensus-is-harder-than-code/cover.jpg)

Blockchain dünyasını uzun süredir takip ediyorum; Berlin’de yaşamamın da bunda payı var, biraz tesadüf eseri oldu. Bitcoin’in ilk günlerinden başlayıp Ethereum Foundation ve sayısız meetup ile devam eden büyük bir hareketliliğe tanık oldum. Bu ortam beni blockchain dünyasının derinliklerine çekti.

Protokol geliştirirken vaktimizin çoğunu teknik konulara harcasak da cevaplardan çok soru doğuran, üzerine konuşulması şart bir konu var: Yönetişim (Governance).

## Yönetişim aslında nedir

Peki, yönetişim ne demek? Kısaca, insanlar arasında ortak bir noktada buluşma yöntemi.

Bunu sürekli yapıyoruz. Bir akşam yemeği ya da konferans organize ederken bile yemekleri veya oturma düzenini tartışıyoruz. Küçük gruplarda bu iş kolay. Ancak grup büyüdükçe ortak karar almak katlanarak zorlaşıyor. Devasa yönetişim sistemlerinde bile günün sonunda kararları aslında sadece bir avuç insanın verdiğini görüyorsunuz.

Ulusal seçimler gibi "klasik" yönetişim sistemlerini düşündüğümüzde bazı teknik gereksinimler ortaya çıkıyor: Oyun gizli kalmalı, yani gizlilik gerekiyor. Oyun sayıldığından emin olmalıyım, yani doğrulanabilirlik şart. Bir de seçilme hakkı var; yani kimse yoktan yere sahte oylar üretmemeli.

Ama günün sonunda tüm yaptığımız, herkesin ne düşündüğünü anlamaya çalışmak. İşte sorun da tam burada başlıyor.

## Oylama en son çare olmalı

Bazen katı oylama sistemleri bize Brexit örneğindeki gibi sonuçlar veriyor: %51,9’a %48,1.

Böyle bir sonuç sana ne anlatıyor? Bana göre bu "halkın iradesi" falan değil. Bana sadece kalmalı mıyız yoksa gitmeli miyiz, hiçbir fikrimiz olmadığını anlatıyor. Toplumun ikiye bölündüğünü gösteriyor. Yine de böyle bir sonucu alıp kabul ediyor ve sanki kesin bir kararmış gibi sunuyoruz.

Yönetişim problemini çözmüş değilim, kimsenin de çözdüğünü sanmıyorum. Ama bir şeyden eminim: Oylama, en son çare olmalı.

Tek bir insanın iradesi bellidir. Bir grubun elinde ise genelde sadece A veya B arasında bir seçim kalıyor. Belki de oylama, tüm iş birliği yolları tükendikten sonra yapılmalı. Yani oturup tartıştıktan ve bir çözüm bulmak için enerji harcadıktan sonra. Direkt ikili bir oylamaya atlamamalıyız.

## Kimler katılıyor

Açık kaynak dünyasında BDFL (Benevolent Dictator For Life - Ömür Boyu İyi Niyetli Diktatör) diye bir kavram var. Linux’ta, WordPress’te, Python’da bunu görüyorsunuz.

Yakın zamanda Python’ın yaratıcısı Guido van Rossum, topluluk tartışmalarıyla baş edemediği için görevinden ayrıldı. Çatışmalardan yoruldu adam.

Açık kaynakta projeyi her zaman "fork" edebilirsin ama çoğu insan bunu istemiyor. Çünkü bu, ağ etkisini böler. Merkeziyetsiz sistemler inşa ettiğimize göre kimlerin katıldığını sorgulamalıyız. Altyapı var; yani ağı güvenceye alan nodelar ve madenciler. Kullanıcılar var; yani uygulamanın üzerinde bir şeyler inşa edenler. Bir de otonom varlıklar var; yani protokol üzerinde "hakları" veya çıkarları olabilen akıllı sözleşmeler.

## Çoğunluk mu azınlık mı, uzmanlar mı kalabalık mı

Blockchain’de oyları tartmak için farklı yollar bulduk: Proof of Stake (varlık = güç) veya Proof of Work (işlem gücü = güç) gibi.

Karşı karşıya kaldığımız en büyük soru, gücü çoğunluğun eline mi yoksa azınlığın eline mi vereceğimiz. Genelde "skin in the game" (yüksek finansal risk) sahibi olmanın, insanı dürüst olmaya ve ağın iyiliğini düşünmeye sevk ettiği varsayılır. Ama bu doğru mu?

Dürüst olduklarını varsaysanız bile çıkarlar nadiren örtüşüyor. Madenciler yüksek fee istiyor, kullanıcılar sıfır fee istiyor. Kim haklı?

Bir de uzmanlar ve kalabalık meselesi var. Matematiksel gerçeği bilen teknik uzmanlardan oluşan bir grup var diyelim, ama kullanıcı kitlesi buna karşı çıkıyor. Aynı sorunları siyasette, Reddit’te veya "Crypto Twitter"da görüyoruz; propaganda ve etki kampanyaları insanları belirli yönlere çekiyor.

Oylama çoğu zaman en iyi çözümü aramak yerine bir rekabete dönüşüyor. Çoğu seçmen neye oy verdiğini bile anlamıyor.

## Likit demokrasi

Peki, bunu nasıl çözeceğiz? Cevabın likit demokrasi ve daha iyi iletişimde yattığını düşünüyorum.

İlk kısım bağlayıcı olmayan sinyaller. Sürekli bağlayıcı oylamalar yapmamalıyız. Topluluğun, kod hemen devreye girmeden önce bir öneri hakkında fikir belirtmesini sağlayan, kolay bir "sinyalleme" mekanizmasına ihtiyacımız var. Bu, zor bir karardan önce genel eğilimi ölçmemizi sağlar.

İkinci kısım ise delege oylaması. Hisse veya token sahibiysen bir oyun var demektir. Ama her protokol güncellemesini inceleyecek teknik uzmanlığa (veya vakte) sahip olmayabilirsin. Oy kullanma hakkını güvendiğin bir uzmana, yazılımcıya veya topluluk liderine devredebilmelisin. Ve eğer yaptıkları seçimlere katılmazsan, bu yetkiyi anında geri çekebilmelisin.

Bu aynı zamanda bir güvenlik sorununu da çözüyor. Oy vermek için "cold storage" hesabını kullanmak zorunda kalmamalısın. Oy gücünü başka bir anahtara devreden bir mesaj imzalayabilmelisin; böylece varlıklarını riske atmadan sürece dahil olabilirsin.

## İnsani bir sorun

Yıllarca teknoloji uygulamaya, kod yazmaya, matematiksel kanıtlar oluşturmaya vakit harcıyoruz. Ama yönetişim teknik bir sorun değil; insani bir sorun.

Eğer "görsel katmana", yani arayüzlere, forumlara ve eğitime odaklanmazsak merkeziyetsiz projeler başarısız olur.

Öneriler net bir dille yazılmalı. İnsanların soru sorup sadece propaganda değil, gerçek cevaplar alabileceği tartışma platformlarına ihtiyacımız var. Açık kaynaklı bir projenin kendini yönetebilmesi için şeffaflık anahtar. Bu sadece kodu yayınlamak değil; süreci, yol haritasını ve kararların arkasındaki "nedenleri" de açıklamak demek.

Henüz çözemedik ama yönetişimi bir yazılım güncellemesi gibi görmeyi bırakıp onu insani bir iş birliği olarak ele almaya başlamalıyız.
