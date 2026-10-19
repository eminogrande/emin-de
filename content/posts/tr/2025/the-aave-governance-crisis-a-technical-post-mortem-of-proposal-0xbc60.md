---
title: "Aave yönetişim krizi: 0xbc60 önerisinin otopsisi"
description: "Aave Labs, frontend gelirlerine el koydu, DAO markayı geri istedi, ardından Labs kendi oylamasını başlattı. Neler yaşandı ve bu durum DAO'lar için ne anlama geliyor?"
date: "2025-12-22T18:25:02Z"
updated: "2025-12-22"
lang: tr
translated_from: "en/the-aave-governance-crisis-a-technical-post-mortem-of-proposal-0xbc60"
source_sections: ["the-handshake-that-broke", "proposal-0xbc60", "the-aave-labs-side", "the-unilateral-snapshot-vote", "code-on-chain-brand-off-chain", "what-it-means-for-daos"]
category: bitcoin
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-aave-governance-crisis-a-technical-post-mortem-of-proposal-0xbc60/cover.webp"
tldr: ["Aralık 2025'te Aave Labs, CowSwap üzerinden gelen frontend gelirlerini kendi cüzdanlarına aktarınca DAO bunu güven sarsıcı bir hamle olarak gördü.", "BGD Labs'ten Ernesto Boado; alan adının, sosyal medya hesaplarının ve marka haklarının DAO kontrolündeki bir yapıya devredilmesini önerdi.", "22 Aralık 2025'te Aave Labs, tatil dönemini fırsat bilerek oylamayı tek taraflı olarak Snapshot'a taşıdı.", "Bu kriz, DAO'ların zincir üstündeki kod ile zincir dışındaki marka ve fikri mülkiyet varlıkları arasında kopukluk olduğunu bir kez daha kanıtladı."]
sections: [{"basically": "Frontend'i Labs yönetiyordu, protokolün sahibi ise DAO'ydu. CowSwap gelirlerinin Labs'e gitmesi bu hassas dengeyi bozdu."}, {"basically": "Boado'nun önerisi şuydu: Markayı DAO'ya geçir ve belirli şartlarla Labs'e geri lisansla."}, {"basically": "Labs bir tüketici fintech uygulaması kurmak istediğini ve markayı yönetmek için DAO'nun fazla hantal kaldığını savunuyor."}, {"basically": "Labs oylamayı 23 Aralık'ta tek başına başlattı. Delegeler bunu düşmanca bir devralma olarak nitelendirdi ve AAVE fiyatı sert düştü."}, {"basically": "Kontratlar token sahiplerinin kontrolünde olabilir ancak alan adı ve frontend için aynısı geçerli değil. Kod değişmeyebilir ama konsensüs değişebilir."}, {"basically": "Ya evet deyip fikri mülkiyet için savaşacaksınız ya da hayır deyip servis sağlayıcıların frontend üzerinden yarattığı değere el koymasına göz yumacaksınız."}]
---
![](../../../media/the-aave-governance-crisis-a-technical-post-mortem-of-proposal-0xbc60/cover.jpg)

2025 yılının Aralık ayı sonlarında Aave DAO, protokolün başlangıcından bu yana gördüğü en büyük krizle sarsıldı. Her şey [app.aave.com](http://app.aave.com) arayüzünden gelen gelirin kime kalacağına dair teknik bir tartışmayla başladı, sonrasında iş dönüp dolaşıp "düşmanca devralma" suçlamalarına kadar vardı.

Şu an bu durum, her DAO’nun er ya da geç yüzleşeceği bir vaka çalışmasına dönüştü: yani değişemeyen kod olan "protokol" ile değişebilen bir marka olan "ürün" arasındaki kopuş.

Bu yazıda 164 mesajlık yönetişim başlığını, Aave Labs’in teklifi kendi başına Snapshot’a taşıma hamlesini ve tüm bunların genel olarak merkeziyetsiz yönetişim için ne anlama geldiğini inceliyoruz.

## Çatırdayan el sıkışma

Aave dünyası yıllarca bir el sıkışma üzerine döndü. Aave Labs (daha öncesinde Stani Kulechov’un başında olduğu Aave Companies) markayı yönetti, DAO yani token sahipleri ise protokolü yönetti.

Bu düzen, Aave Labs’in resmi arayüze CowSwap’i ekleyip elde edilen kârı ve yönlendirme gelirlerini DAO hazinesi yerine kendi şirket kasasına aktarmasına kadar iyi işledi.

Burada mesele para. Protokol geliri, "reserve factor"ler üzerinden DAO’ya gidiyor. Arayüz geliri ise daha önce hiç net tanımlanmamıştı ve önemsiz miktarlardaydı; ancak şu an swap fee’ler ve entegrasyonlarla yıllık 10 milyon doların üzerinde olduğu tahmin ediliyor.

EzR3aL ve Aave Chan Initiative’den Marc Zeller gibi büyük delegeler, bunun bir "güvene dayalı görev" (fiduciary duty) ihlali olduğunu savundu. Protokolün geliştirilmesi için 2017 ICO’su ve hibelerle parayı DAO ödedi; peki neden özel bir şirket, arayüzün getirisini kendisine saklasın?

Marc Zeller (ACI) durumu şöyle özetledi: "Bunun doğal bir uyum olduğunu düşünerek kandırılmışız gibi görünüyor, yeni gerçeği kabul ediyoruz... $AAVE’niz olduğunda aslında neye sahip oluyorsunuz?"

## 0xbc60 sayılı teklif

16 Aralık 2025’te, Aave’nin temel teknik hizmet sağlayıcısı BGD Labs’in kurucu ortağı Ernesto Boado (`@eboado`), "Token Uyum Süreci 1. Aşama - Sahiplik" adında bir teklif paylaştı. Fikir, bu kopuşu resmileştirmekti.

Asıl meselesi hem teknik hem de hukukiydi. Bir DAO’nun kamusal yüzü, "iyiliksever bir diktatöre" aitse, o DAO özerk olamazdı.

Teklif 3 kısımdan oluşuyordu. Birincisi, [aave.com](http://aave.com) alan adı, `@aave` gibi sosyal medya hesapları, ticari markalar ve GitHub organizasyonları gibi dijital varlıkları, DAO’nun kontrolündeki yasal bir yapıya (örneğin Cayman vakfı) devretmek.

Ardından DAO bu varlıkları, uygulayabileceğiniz sıkı şartlar altında Aave Labs dahil tüm hizmet sağlayıcılara lisanslayacaktı. Ayrıca "üçüncü tarafların bu varlıkları kötüye kullanmasını veya şahsi çıkar sağlamasını engelleyecek sıkı mekanizmalar" olacaktı.

Boado, 1 numaralı mesajda şunu yazdı: "Bu sorunu çözmemek, DAO modeli için varoluşsal bir tehdit... Eğer tek bir taraf marka, pazarlama kanalları ve ağ geçitleri gibi varlıkları kontrol edebiliyorsa, diğer tüm katılımcılar fiilen o tarafa tabi hale gelir."

## Aave Labs cephesi

Aave Labs forumda metin üzerinden büyük bir kavgaya girmedi. Ancak yaptıkları ve savundukları argümanlar, net bir savunma hattı ortaya koyuyor ve bu savunma "birlikte çalışabilirlik" (composability) ile bir şirketin hakları üzerine kurulu.

Stani Kulechov, Aave Labs’in Revolut veya Monzo gibi platformlara rakip olacak tüketici odaklı bir fintech ürünü (Aave Horizon veya Aave App) geliştirmesini istiyor. Bu bakış açısına göre [app.aave.com](http://app.aave.com) protokolün üzerine kurulmuş, onların kendi ürünü. `Instadapp` veya `DeFi Saver` gibi uygulamalar protokolü kullanırken Aave DAO’ya royalty ödemiyor, bu yüzden Aave Labs kendi arayüzlerinden para kazanma hakları olduğunu düşünüyor.

Ayrıca bir DAO’nun tüketici markası yönetmek için fazla yavaş olduğunu, fintech’te hızlı hareket etmek için işin başında tek bir şirket olması gerektiğini savunuyorlar.

setaavefree adında bir kullanıcı 11 numaralı mesajda şöyle yazdı: "DAO tarafından yönetilen akıllı sözleşmeler bütünü olarak Aave protokolü geleneksel değil... Aave protokolünün bir web sitesine, alan adına veya markaya ihtiyacı yok. Bunların hiçbiri olmadan da kusursuz ve saf formunda var olabiliyor."

## Tek taraflı Snapshot oylaması

Sonra 22 Aralık 2025’te iş forum tartışmasından çıkıp gerçek bir yönetişim krizine dönüştü. Aave Labs, yönetici haklarını kullanarak Boado’nun teklifini, yazarına sormadan ve normal geri bildirim sürecini işletmeden tek taraflı olarak Snapshot oylamasına taşıdı.

Oylama, büyük kurumsal delegelerin tatile girdiği 23 Aralık tarihine ayarlandı. Boado ise metne oylama için onay vermediğini açıkça belirtmişti.

120 ile 130 arasındaki mesajlarda forum, düşmanca devralma suçlamalarıyla patladı. Piyasa da tepki verdi, $AAVE yaklaşık yüzde 10 değer kaybetti ve bir "balina" 37 milyon dolarlık satış yaptı, yani yönetişim riski fiyatlanmış oldu.

Boado 124 numaralı mesajda, "Çok net olayım: Aave Labs bir sebeple benim teklifimi tek taraflı olarak oylamaya aceleyle sunmaya karar verdi... Bu tarz hareketler tüm güveni sarsıyor... Bana göre Labs tarafından oluşturulan mevcut Snapshot teklifi yok hükmündedir" dedi. Marc Zeller ise 123 numaralı mesajda şunları yazdı: "İşin bu noktaya gelmesi gerekmiyordu... Şeffaflık için başlayan bir süreç, şimdi Labs’in düşmanca bir devralma girişimine dönüşüyor."

Stani Kulechov, X (eski adıyla Twitter) üzerinden ve sözcüleri aracılığıyla 5 günlük tartışmanın yeterli olduğunu ve kilitlenmeyi çözmenin "en iyi yolunun oylama" olduğunu savundu.

## Kod zincir üstünde, marka dışında

Tüm bu kavga, DAO’ların bugün nasıl kurulduğuna dair gerçek bir kusuru ortaya koyuyor. Zincir üzerindeki kod ile zincir dışındaki fikri mülkiyet arasında bir bağ yok. 4 parçaya baktığınızda bunu net görebiliyorsunuz.

Akıllı sözleşmeler, timelock aracılığıyla token sahiplerine ait (bugün de öyle, yapı değişse de öyle kalacak). Alan adı (DNS) bugün özel şirket olarak Aave Labs’e ait, yapı değişirse DAO’nun yasal birimine ait olacak.

Arayüz kodu bugün kapalı kaynak ve özel; teklif geçse DAO’ya lisanslanacak veya açık kaynak yapılacak. Gelirler ise bugün bölünmüş durumda, protokol parası DAO’ya, arayüz parası Labs’e; yapı değişirse bu gelirler birleştirilecek veya sıkı şekilde lisanslanacak.

Bazı delegeler (113 ve 118 numaralı mesajlar) bir nevi "zehirli hap"tan bahsetti. Arayüzü çatallamak (fork), likidite teşviklerini DAO’nun sahibi olduğu yeni bir arayüze yönlendirmek veya Aave Labs’i tamamen değiştirmek için yeni bir yazılım ekibi tutmak gibi.

Kısacası kod değişemez ama kodun etrafındaki sosyal mutabakat çok hızlı değişebilir.

## DAO’lar için ne anlama geliyor

0xbc60 teklifinin 164 mesajlık başlığı, erken aşamayı geçmiş her DAO için bir uyarı niteliğinde. Kurucuların her zaman DAO’nun çıkarına göre hareket edeceği inancı, tek bir hata noktasıdır.

Yani DAO’nun önünde 2 seçenek var. Eğer "evet" derse, fikri mülkiyetin devri konusunda hukuki bir kavganın fitilini ateşler; Aave Labs "hayır" derse bu bir fork ile bitebilir.

Eğer DAO "hayır" derse, hizmet sağlayıcıların arayüz değerini sahiplenebileceği bir emsal oluşturur ve DAO, kendi müşterileri üzerinde hiçbir kontrolü olmayan, sadece arka plandaki bir altyapı haline gelir. DeFi dünyası parçalardan oluşabilir (composable), ama güven parçalardan oluşmaz.
