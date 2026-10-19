---
title: "Kod kanundur vs. 9,4 milyon dolarlık kurtarma operasyonu: Gnosis Chain hard fork'u"
description: "Gnosis Chain, Balancer hack'inde çalınan 9,4 milyon doları kurtarmak için hard fork yaptı. Neden herkes birbirine girdi, kararı gerçekten kim verdi ve sırada ne var?"
date: "2025-12-22T15:20:01Z"
updated: "2025-12-22"
lang: tr
translated_from: "en/code-is-law-vs-the-9-4m-rescue-the-gnosis-chain-hard-fork"
source_sections: ["what-happened", "the-pragmatists", "the-purists", "who-actually-decided", "what-comes-next"]
category: bitcoin
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/code-is-law-vs-the-9-4m-rescue-the-gnosis-chain-hard-fork/cover.webp"
tldr: ["Aralık 2025'te Gnosis Chain, Balancer hack'inde çalınan 9,4 milyon doları geri almak için hard fork yoluna gitti.", "Validatörler önce soft fork ile fonları dondurdu, ardından hard fork ile fonları bir DAO multisig'ine taşıdı.", "Core ekip DAO oylamasını bypass etti; yani teknik yönetim, topluluk yönetimini devre dışı bıraktı.", "Şu an kurtarma eşikleri belirlenmiş bir Kriz Müdahale Çerçevesi üzerinde çalışıyorlar."]
sections: [{"basically": "Validatörler hacker'ın çaldığı 9,4 milyon doları soft fork ile dondurdu, sonra hard fork ile DAO multisig'ine aktardı."}, {"basically": "Pragmatikler, bir ödeme zincirinde hırsızlığa göz yumulamayacağını, dondurma işlemiyle zaten tarafsızlığın bozulduğunu savunuyor."}, {"basically": "Püristler ise tarafsızlığın yitirilmesi, ahlaki risk, keyfi müdahaleler ve validatörlerin karşı karşıya kalacağı hukuki riskler konusunda uyarıyor."}, {"basically": "Süreci core ekip ve client geliştiricileri yürüttü; DAO'nun oylama yapmasına fırsat kalmadı."}, {"basically": "Kriz Müdahale Çerçevesi ile gelecekteki kurtarma operasyonları daha katı kriterlere bağlanacak."}]
---
![](../../../media/code-is-law-vs-the-9-4m-rescue-the-gnosis-chain-hard-fork/cover.jpg)

Aralık 2025'te Gnosis Chain, Balancer protokolündeki hack olayında çalınan 9,4 milyon doları geri almak için tartışmalı bir hard fork gerçekleştirdi. Bu durum iki taraf arasında büyük bir tartışma yarattı: Mağdurların parasını kurtarmayı ve kitlesel benimsemeyi her şeyin üstünde tutan pragmatistler ile zincirin güvenilir tarafsızlığını ve sansür direncini kaybedeceğinden endişe eden püristler.

Zincir hacker'ın varlıklarına el koydu ancak süreçte DAO oylaması devre dışı bırakıldı. Bu durum, mevcut kriz ortamında teknik yönetişimin topluluk yönetişiminden daha ağır bastığını gözler önüne serdi. Gelecekteki kararların keyfi olmaması adına şu an yeni bir müdahale çerçevesi hazırlanıyor.

## Ne oldu

2025'in sonlarına doğru Balancer protokolü geniş çaplı bir saldırıya uğradı. Hack olayı birçok zinciri etkiledi ve Gnosis Chain üzerinde 9,4 milyon dolarlık bir kayba yol açtı.

Ethereum bugüne dek sadece o meşhur DAO hack olayında fork yapmıştı; diğer L1 ağları ise genellikle pasif kalmayı tercih eder. Ancak Gnosis Chain validatörleri iki aşamalı bir müdahalede bulundu.

1. Adım bir soft fork'tu. Validatörler, hacker'ın adresini sansürlemek için istemcilerini güncelledi ve böylece çalınan parayı dondurdular.

2. Adım ise bir hard fork'tu. Bir durum değişikliği ile dondurulan paralar zorla DAO kontrollü bir multisig cüzdanına aktarıldı, böylece mağdurlara iade edilmesinin önü açıldı.

Bu hamle, Gnosis Forum'da zincirin temel değerleri üzerine sert bir tartışma başlattı.

## Pragmatistler

Pragmatistlerin dört temel argümanı var. Birincisi, neofinance olarak sorumluluk üstlenmek. Gnosis, gerçek dünya varlıkları ve ödemeler için bir katman olmayı hedefliyorsa, teknik bir çözüm mümkünken hırsızlığa göz yumamaz. 9,4 milyon doları dondurulmuş bir cüzdanda bırakmak kimseye fayda sağlamıyor.

İkincisi, tarafsızlığın zaten bitmiş bir hikaye olması. Validatörler soft fork'u kabul edip parayı dondurduğu an zincirin tarafsızlığı teknik olarak bozulmuştu. Parayı iade edecek bir hard fork'a hayır demek, ilkeli bir duruştan ziyade göstermelik bir tavır olur.

Üçüncüsü, caydırıcılık. Hack'i geri çevirmek bir güvenlik özelliği gibi çalışıyor. Gelecekteki saldırganlara Gnosis Chain'in hırsızlığın yanına kar kaldığı yumuşak bir hedef olmadığını gösteriyor.

Dördüncüsü, konsensüs gerçeği. "Kod yasadır" anlayışının yerini "konsensüs yasadır" alıyor. Eğer validatörlerin çoğunluğu yamayı çalıştırmayı kabul ediyorsa, zincirin meşru durumu o yamadır.

## Püristler

Püristler olaya çok daha farklı bakıyor. İlk olarak, bu durum güvenilir tarafsızlığı zedeliyor. Eleştirenler, bunun tehlikeli bir emsal oluşturduğu konusunda uyarıyor. Eğer validatörler bir hacker'ın parasına el koymak için organize olabiliyorsa, teoride hükümetler de onlara herhangi birinin parasına el koymaları için baskı yapabilir.

İkinci olarak, ahlaki tehlike. Protokoller, L1'in kendilerini kurtaracağını düşünürse güvenlik denetimlerine daha az bütçe ayırabilir. Sorumluluk uygulama geliştiricilerinden ağ validatörlerine kayar.

Üçüncüsü, keyfi adalet. Topluluk tutarsızlığa dikkat çekiyor. Daha önceki sDAI-EURe havuzu sızıntısında kullanıcılar bir açık yüzünden para kaybetmişti ve kimse onları kurtarmadı. Neden 9,4 milyon dolarlık Balancer hack'i bir fork'a değerken, daha küçük kayıplar değmedi?

Dördüncüsü, yasal sorumluluk. Müdahale ederek validatörler tarafsız altyapı sağlayıcılarından aktif karar vericilere dönüşüyor; bu da yasal risklerini ciddi oranda artırabilir.

## Kararı aslında kim verdi

Peki kararı aslında kim verdi? Bu olay, demokrasinin altındaki teknokrasiyi gün yüzüne çıkardı.

En büyük etki Gnosis çekirdek ekibindeydi. Hard fork dosyalarını hazırladılar ve zamanın kısıtlı olması, tatillerin yaklaşması bahanesiyle resmi DAO oylamasını atlamaya kendileri karar verdiler. Bir ekip üyesi "Oylama olacağını söylediğimi unutmuşum" diyerek durumu itiraf etti.

Lodestar ve Nethermind gibi validatör yazılımlarını çalıştıran istemci geliştiricileri, bazen özel kanallar üzerinden validatörlere sansürlü sürümleri dağıttı. Bu kapalı kapılar ardındaki koordinasyon, açık kaynağın alışıldık şeffaflığını devre dışı bıraktı.

DAO'nun neredeyse hiçbir etkisi olmadı. Validatörler node'larını güncelledi ve token sahiplerinin oylaması gerçekleşemeden kararı uygulamış oldular.

Bir forum üyesinin dediği gibi, "DAO'ların bu konuda bir oyu yok... Gerisi sadece tiyatro."

## Şimdi ne olacak

Hard fork tamamlandı ve paralar Gnosis DAO multisig cüzdanında duruyor. Güvene verilen zararı onarmak ve keyfi adalet endişelerini gidermek için topluluk şimdi bir Kriz Müdahale Çerçevesi üzerinde çalışıyor.

Bu çerçeve, kurtarma operasyonları için bir puanlama sistemi öneriyor ve gelecekteki müdahalelerin çok daha katı eşikleri karşılaması gerekebilir.

Etki açısından, çalınan miktarın zincir TVL'inin %1'inden fazla olması, protokolün denetlenmiş ve uzun geçmişe sahip "mavi çipli" bir proje olması gibi kriterler tartışılıyor. Kullanıcı tabanı açısından ise, perakende ve ana akım kullanıcıları vuran hack'lerin, degen stratejilerine göre daha öncelikli sayılması planlanıyor.

Daha fazla okumak istersen, orijinal tartışma [Gnosis Forum: Balancer Hack Hard Fork Debate](#) adresinde, Balancer olay raporu [Balancer Security Updates](#) adresinde ve Gnosis DAO yönetişimi [Gnosis Snapshot & Forum](#) adresinde yer alıyor.
