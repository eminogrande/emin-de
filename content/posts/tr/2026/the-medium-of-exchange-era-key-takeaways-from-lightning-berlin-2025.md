---
title: "Değişim aracı dönemi: Lightning++ Berlin 2025'ten öne çıkanlar"
description: "Lightning++ Berlin 2025'in ilk günü. Bir değişim aracı olarak Bitcoin, satoshilerle ödeme yapan yapay zeka ajanları, daha hafif watchtower'lar ve BitVMX."
date: "2026-01-15T09:40:01Z"
updated: "2026-01-15"
lang: tr
translated_from: "en/the-medium-of-exchange-era-key-takeaways-from-lightning-berlin-2025"
source_sections: ["michael-markle-on-spending-bitcoin", "roland-buick-on-bitcoin-for-ai-agents", "sergio-lerner-on-watchtowers-and-bitvmx", "the-panel-on-bringing-your-own-wallet", "what-this-means-for-a-business"]
category: bitcoin
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-medium-of-exchange-era-key-takeaways-from-lightning-berlin-2025/cover.webp"
third_party_summary: true
tldr: ["Lightning++ Berlin 2025'in ilk günü, Bitcoin'in sadece dijital bir altın değil, gündelik hayatta harcanabilir bir para birimi olması üzerineydi.", "Markle'ın ekibi 8 saat içinde 4.183 Lightning işlemi gerçekleştirdi; artık satıcıların fiat para ödemeleri için ek ücret talep etmesini savunuyorlar.", "Buick, Bitcoin'in yapay zeka ajanlarının ana para birimi olacağını düşünüyor. Lerner ise daha düşük maliyetli, gizlilik odaklı watchtower tasarımlarını ve BitVMX'i tanıttı."]
sections: [{"basically": "Michael Markle, satıcıların Bitcoin indirimleri yapmayı bırakıp, aksine nakit/fiat para ödemeleri için ek ücret almaya başlaması gerektiğini savunuyor."}, {"basically": "Yapay zeka ajanları banka hesabı açamadığı için, Lightning ve Nostr Wallet Connect onlar için kusursuz bir ödeme API'sine dönüşüyor."}, {"basically": "Sergio Lerner'ın tasarımı, watchtower depolama ihtiyacını kanal başına 2KB'a kadar düşürüyor ve kanal kimlikleri ile tutarları gizliyor."}, {"basically": "Stacker News gibi uygulamalar artık kullanıcı fonlarını tutmuyor; kullanıcılar NWC üzerinden kendi cüzdanlarını yönetiyor."}, {"basically": "Fiat ödemelerden ek ücret alın, yapay zeka ajanlarına bir Lightning API'si sunun ve ödemeleri insanların hayatında gerçekten hissedebileceği bir deneyime dönüştürün."}]
---
![](../../../media/the-medium-of-exchange-era-key-takeaways-from-lightning-berlin-2025/cover.jpg)

Lightning++ Berlin 2025’in ilk gününden kısa bir özet. Michael Markle, Roland Buick ve Sergio Lerner’ın konuşmalarıyla; Zeus, Stacker News ve Albi’nin katıldığı bir panel vardı.

İlk günün ana fikri şuydu: Bitcoin’in sadece "dijital altın" veya pasif bir değer saklama aracı olduğu devir kapanıyor. Artık odak noktası, Bitcoin’in hem fiziksel dükkanlarda hem de hızla büyüyen yapay zeka ekonomisinde doğrudan kullanılabilen, hızlı ve programlanabilir bir para birimi olması.

İşte öne çıkan konuşmalar, teknoloji dünyasındaki yenilikler ve ana sahneden notlar.

## Michael Markle ile Bitcoin harcamak

BTC Inc.’ten Michael Markle, Bitcoin 2024 Nashville konferansından gerçek verilerle fiziksel dünyanın "hiper-bitcoinizasyonu" hakkında konuştu.

Markle’a göre Bitcoin, tarihte "zaman" kavramının geçtiği yoldan geçiyor. İlk aşamada koleksiyon parçasıydı, antik güneş saatleri gibi. Bitcoin’in ilk yılları böyleydi. Sonra bir bilgi ve değer deposu oldu, tıpkı takvimler ve tarım döngüleri gibi. Bitcoin bugün büyük oranda bu aşamada. Ardından dünyayı koordine eden bir değişim aracı haline gelecek, tıpkı saatler gibi. Bu, 15 yıllık bir hedef. Son aşama ise küresel senkronizasyonu sağlayan bir hesap birimi olmak.

Zamanın bu son aşamaya gelmesi 3.000 yıl sürmüş, ancak Markle internetin bu süreci Bitcoin için yaklaşık 30 yıla sıkıştıracağını düşünüyor.

Satıcılar için de radikal bir fikri vardı: Bitcoin indirimi yapmayı bırakın, fiat (itibari para) ile ödemelerde ek ücret alın.

Fiat ödemeler; şirketler için KYC, ödeme kuruluşu komisyonları ve karmaşık muhasebe süreçleri gibi ciddi bir operasyonel yük getiriyor. Bitcoin ise anında ve izinsiz bir şekilde yerleşiyor. Satıcılar fiat için ekstra ücret alırsa, eski finansal sistemin gerçek maliyeti ortaya çıkar ve insanlar Lightning Network’ü kullanmak için gerçek bir motivasyon bulur.

Lightning’in fiziksel etkinliklerde ölçeklenebildiğini göstermek için Markle’ın ekibi bir Guinness Dünya Rekoru kırdı. 8 saatlik bir sürede 4.183 ayrı Bitcoin işlemi gerçekleştirdiler.

Bunu hızlı kılan şey NFC üzerinden Lightning ödemeleri yapabilen Bolt Card’dı. İnsanlar fiziksel geri bildirimleri; o bozuk para sesini ve POS terminallerindeki "lazer gözleri" çok sevdi. Bu detaylar dijital para harcamayı çok daha kolay ve anlaşılır kıldı.

## Roland Buick ile yapay zeka ajanları için Bitcoin

Sıra yapay zeka ajanları ekonomisindeydi. Albi’den Roland Buick, Bitcoin’in neden "yapay zekanın yerel para birimi" olduğunu açıkladı.

İnsanların uygulamaları kullandığı bir dünyadan, yapay zeka ajanlarının protokolleri kullandığı bir dünyaya geçiyoruz. Ajanlar gidip banka hesabı açamaz. Lightning Network onlara değer transferi için yerel olarak kullanabilecekleri izinsiz bir API sunuyor.

Nostr Wallet Connect (NWC), uygulamalarla para arasındaki ana köprü haline geliyor.

Geliştiriciler artık "bir kez yazıp her yere bağlıyor". 50 farklı cüzdan API’sini entegre etmek yerine standardı NWC olarak belirliyorlar. Üstelik varsayılan olarak saklama hizmeti gerektirmiyor (non-custodial). Uygulamaların artık kullanıcıların parasını tutmasına gerek yok, bu da düzenleyici riskleri azaltıyor. Sadece kullanıcının bağlı cüzdanından harcama izni istiyorlar.

Buick ayrıca yapay zeka modelleri için bir "USB-C portu" gibi çalışan Model Context Protocol’ü (MCP) ve bunun üzerine kurulan "Paid MCP"yi tanıttı. Bitcoin sayesinde yapay zeka ajanları; belirli araçlar, gerçek zamanlı veriler veya premium işlem gücü için kullanım başına otomatik ödeme yapabiliyor. Yani arada insan olmadan, makinelerin makinelere satoshi ile ödeme yaptığı bir mikro ödeme ekonomisi kuruluyor.

## Sergio Lerner ile gözcü kuleleri ve BitVMX

Fairgate CTO’su Sergio Lerner günün en teknik konuşmasını yaptı. Konu Lightning Network’ü daha gizli ve gözcü kuleleri (watchtowers) için daha ucuza çalıştırmaktı.

Gözcü kuleleri eski kanal durumlarını izleyerek dolandırıcılığı önlüyor ama bugün devasa depolama alanlarına ihtiyaç duyuyorlar. Lerner, her durum için sadece 2KB veri saklayan, tek kullanımlık imzalar (OTS) kullanan yeni bir ödeme kanalı tasarımı önerdi.

Bu tasarım ayrıca kanal ID’sini ve tutarları gözcü kulesinin kendisinden bile gizleyebiliyor; yani zincir dışı ölçeklendirmede daha önce olmayan bir gizlilik seviyesi getiriyor.

BitVMX ise Bitcoin’in bir dolandırıcılık kanıtı oyunuyla karmaşık hesaplamalar yapmasını sağlayan bir sanal CPU. BLS imzaları veya karmaşık akıllı sözleşmeler gibi mantıklar zincir dışında işleniyor. Bitcoin sadece bir anlaşmazlık olduğunda işin içine giriyor. Üstelik hiçbir soft fork da gerekmiyor. Bu çok önemli, çünkü ana katman protokolünü değiştirmeden Ethereum tarzı programlanabilirliği Bitcoin’e getiriyor.

## Kendi cüzdanını getir paneli

Zeus, Stacker News ve Albi ile yapılan panelde tek bir tema sürekli öne çıktı. Uygulamalar kullanıcı egemenliğine, yani "Kendi Cüzdanını Getir" (BYOW) modeline geçiyor.

Yıllarca bir telefon cüzdanını evdeki node’a bağlamak için Tor gerekiyordu ve Tor hem yavaş hem de sürekli kopuyordu. Paneldekiler bu noktada Nostr’a geçişin önemine dikkat çekti. Nostr çok daha hızlı ve uzaktan node yönetirken çok daha kararlı çalışıyor.

Ayrıca "duvarlarla çevrili bahçeler" dönemi bitiyor. Stacker News gibi uygulamalar artık varlıkları tutan taraflar olmaktan çıkıyor. NWC ile kullanıcılar kendi likiditelerini ve kendi cüzdanlarını getiriyor; uygulama ise sadece Bitcoin ağının üzerinde sosyal bir arayüz olarak kalıyor.

## İşletmeler için ne anlama geliyor?

Peki bu bir işletme için ne demek? Adaptasyon beklemeyi bırakın ve insanlara bir sebep verin. Fiat ile ödemelerde daha fazla ücret alın.

Servisinizi yapay zeka ile çalışacak şekilde güncelleyin. Eğer bir Lightning API’niz yoksa, 2026’da yapay zeka ajanları sizden bir şey satın alamayacak.

UX (kullanıcı deneyimi) hissettiğiniz bir şeydir. NFC kartlar, sesler ve ışıklar gibi fiziksel geri bildirimler, dijital parayı normal insanlar için gerçek kılan şeylerdir.

BitVMX’i takip edin. Bu protokol, DeFi’yi ve gelişmiş akıllı sözleşmeleri Bitcoin’in güvenliğini bozmadan sisteme dahil etmenin anahtarı olabilir.

Lightning++ Berlin 2025 ve sonraki günler hakkında daha fazla bilgiyi [Lightning++ web sitesinde](https://lightning-plus-plus.com) bulabilirsiniz.
