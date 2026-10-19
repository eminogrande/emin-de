---
title: "Amoveo topluluğu futarchy, merkeziyetsizlik ve gerçek dünya kullanımı üzerine"
description: "Amoveo topluluğunun ve baş geliştiricisinin üzerinde çalıştığı şeylerin özeti, futarchy ve Verkle ağaçlarından tapu kaydına ve DEX'e kadar."
date: "2024-09-10T09:32:41.581Z"
updated: "2024-09-10"
lang: tr
translated_from: "en/amoveo-blockchain-community-s-journey-a-focus-on-futarchy-decentralization-and-r"
source_sections: ["what-amoveo-is", "futarchy", "twelve-months-of-futarchy-discussion", "verkle-trees", "real-world-use-and-what-is-still-hard"]
category: bitcoin
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/amoveo-blockchain-community-s-journey-a-focus-on-futarchy-decentralization-and-r/01-42f4f069.png"
third_party_summary: true
tldr: ["Amoveo, finansal türevler için yapılmış, oracle'ı konsensüsün içinde olan stateless bir blockchain.", "Topluluk ana yönetişim aracı olarak futarchy'den uzaklaştı ama yeni versiyonlarını test etmeye devam ediyor.", "Verkle ağaçları Amoveo'nun daha küçük, daha hızlı kanıtlarla stateless full node çalıştırmasını sağlıyor.", "Tapu kaydı ve iş sözleşmeleri gerçek dünya kullanım alanları, ama benimsenme ve fonlama hâlâ zor."]
sections: [{"basically": "Türevler için stateless bir zincir, yerleşik oracle'lar, zincirler arası DEX ve başarısız işlemlerde gas ücreti yok."}, {"basically": "Yönetişim aracı olarak piyasalar harika görünüyordu, ta ki matematik bazı durumlarda manipüle edilebileceklerini gösterene kadar."}, {"basically": "Kasım 2023'ten Temmuz 2024'e: yeni bir futarchy tasarımı, Harberger vergisi fikirleri ve yenilenmiş temkinlilik."}, {"basically": "Verkle ağaçları Merkle ağaçlarından daha küçük kanıtlar veriyor, böylece node'lar tam geçmiş olmadan blokları doğruluyor."}, {"basically": "Tapu kaydı ve iş sözleşmeleri kullanım alanları. Benimsenme, UX ve fonlama hâlâ açık sorunlar."}]
---
# Amoveo Topluluğu Futarchy, Merkeziyetsizlik ve Gerçek Dünya Kullanımı Üzerine

Bu, Amoveo topluluğundaki tartışmaların ve baş geliştiricisinin çalışmalarının bir özeti, yani buradaki fikirler onların, benim değil.

![](../../../media/amoveo-blockchain-community-s-journey-a-focus-on-futarchy-decentralization-and-r/01-42f4f069.png)

Amoveo topluluğu, blockchainlerin teknik tarafına derinlemesine dalan küçük bir grup insandan oluşuyor. İşin çoğunu baş geliştirici yürütüyor ve konuşmalar, blockchainlerin nasıl daha kolay kullanılır hale getirileceği ve gerçek dünyada gerçek şeyler için nasıl faydalı olacağı hakkında.

## Amoveo nedir

Amoveo, finansal türevler için yapılmış bir blockchain. Ölçeklenebilirliği, güvenliği ve merkeziyetsizliği öne koyuyor. Oracle sistemi konsensüs mekanizmasının içine gömülü ve bu da onu daha ucuz, daha güvenli kılıyor. Amoveo DEX, zincirler arası swap yapmanı sağlıyor, privacy coinler de dahil, ve normal köprülerden daha ucuza mal oluyor.

Akıllı kontrat sistemi ölçeklenmek ve ucuz kalmak için tasarlanmış, o yüzden paylaşılan değiştirilebilir bir state yok. Amoveo tek stateless blockchain ve bu, blokların hızlı doğrulanabilmesi, ağın daha merkeziyetsiz olabilmesi ve hatta blokların tersten bile doğrulanabilmesi demek. Verkle tree'lerin ona bu kadar iyi uymasının sebebi de bu. İşlem tipleri Turing complete değil ama birleştirilebiliyorlar ve sana tüm para birimlerinde sonsuz flash loan veriyorlar, böylece tek bir işlemin içinde karmaşık bir şey yapabiliyorsun. Ve Ethereum'dakinin aksine, Amoveo'da bu tür başarısız bir işlem gas'e mal olmuyor.

Ekip aynı anda birkaç şey üzerinde çalışıyor. Daha iyi ölçeklenme ve daha küçük işlemler için Verkle tree'yi getirmek istiyorlar. Daha iyi bir arayüz ve daha fazla likidite sağlayıcısı olan bir DEX istiyorlar. Sınırları yüzünden futarchy'yi ana yönetişim yöntemi olmaktan çıkardılar. Harberger vergileriyle merkeziyetsiz bir tapu siciline bakıyorlar ve topluluk teknik tarafı, kullanım alanlarını ve nasıl büyüyeceklerini konuşmaya devam ediyor.

## Futarchy

Futarchy, kararların tahmin piyasalarının sonuçlarını takip ettiği bir yönetişim biçimi. Amoveo'da uzun süre büyük bir konuydu. Başta fikir, onu bir sürü şey için kullanmaktı, blok ödülü ve protokol güncellemeleri gibi. Ama topluluk hesabını yaptı, modelledi ve futarchy'nin manipüle edilebildiği ya da düpedüz çalışmadığı durumlar buldu. O yüzden onu ana karar verme yöntemi olmaktan çıkardılar ve odak, oracle sistemini iyileştirmeye ve başka yönetişim yollarına bakmaya kaydı.

Futarchy, Harberger vergisine doğrudan uymayabilir ama etrafında yine de yardımcı olabilir. Piyasalar, topluluğun yeni bir vergi oranı hakkında ne düşündüğünü ya da farklı vergi modellerinin arazi kullanımına ve etrafındaki ekonomiye ne yapacağını gösterebilir. Topluluk, Amoveo'da işe yarayabileceği başka yerler de görüyor. İnsanlar piyasaları, en çok hangi özellikleri ve iyileştirmeleri istediklerini göstermek için kullanabilir, böylece geliştirme öncelikleri bunu takip eder. Piyasalar, hangi pazarlama kampanyasının daha fazla kullanıcı ve büyüme getireceğini tahmin edebilir. Ve büyük bir protokol değişikliğinden önce piyasalar, bunun ağ güvenliğine, fee'lere ve kullanıcı açısından nasıl hissettirdiğine ne yapacağını tahmin edebilir. Ama tüm bunlar ancak futarchy'nin kriptoekonomik olarak güvenli ve manipüle edilmesi zor olduğu yerlerde anlamlı.

## On iki aylık futarchy tartışması

Son on iki aydaki tartışma şöyle gitti. 5 Kasım 2023'te baş geliştirici futarchy'ye geri döndü, çünkü insanlar Amoveo'nun Robin Hanson'ın orijinal önerisinden uzaklaştığını fark etmişti ve o da Amoveo'nun yönetişimi için buna tekrar bakmak istedi. 6 Kasım 2023'te önceki analizinde bir hata olmuş olabileceğini ve yeniden umutlu olduğunu söyledi. 7 Kasım 2023'te işe yarar gibi görünen yeni bir futarchy türü hakkında bir yazı duyurdu. 18 Kasım 2023'te bu yeni biçimin neden çalıştığına dair bir blog yazısı paylaştı ve bir sonraki hard update için onu inşa etmeye başladı. 20 Kasım 2023'te topluluk, bunu zincir üzerinde nasıl yapacaklarını konuştu, order book'lar ve LMSR piyasalarıyla. 1 Aralık 2023'te Jehan Tremback, neden kimsenin Ethereum'da futarchy deneyleri yürütmediğini sordu ve cevap, Amoveo'nun bu deneyler için daha iyi platform olduğuydu.

25 Şubat 2024'te arazi mülkiyeti için Harberger vergileri ve bunların ekonomik olarak ne anlama geldiği hakkında uzun bir tartışma oldu ve baş geliştirici, Harberger vergi oranını belirlemek için futarchy kullanabileceğini söyledi. 1 Mart 2024'te topluluk, MetaDAO futarchy'sinin sınırlarını ve nasıl manipüle edilebileceğini konuştu ve o da MetaDAO tasarımına daha yakından bakmak istediğini söyledi. 5 Temmuz 2024'te topluluk yine futarchy'ye döndü, sınırlarını kabul etti ama bazı spesifik durumlarda çalıştırma konusunda hâlâ umutluydu. Ve 15 Temmuz 2024'te Eric Arsenault, futarchy'nin nasıl gittiğini ve yönetişim için işe yarayıp yaramayacağını sordu ve Ethereum'un kendi yönetişim modeliyle yaşadığı sorunlara işaret etti.

Yani topluluk, futarchy'nin merkeziyetsiz yönetişim için ne yapabileceğini hâlâ çözüyor. Sonuç, ellerindekinin daha iyi versiyonları ya da yeni mekanizmalar olabilir ama hedef aynı kalıyor, Amoveo içinde karar vermenin ve kaynakları paylaşmanın bir yolunu bulmak.

## Verkle tree'ler

Verkle tree, çok fazla bilgiyi depolamak ve hızlı doğrulamak için bir veri yapısı. Klasik Merkle tree'ye göre bir iyileştirme, çünkü kanıtlar üretmek ve kontrol etmek daha hızlı ve veri büyüdükçe bu daha da önem kazanıyor.

Amoveo, konsensüs state'ini depolamak için Verkle tree'ler kullanıyor, yani zincirdeki tüm hesapların, bakiyelerin ve akıllı kontratların kaydını. Bu, Amoveo'nun tasarımına uyuyor, önce ölçeklenebilirlik ve verimlilik. Verkle tree'lerle Amoveo, stateless full node'lar çalıştırabiliyor. Bir node, zincirin tüm geçmişini saklamadan blokları doğrulayabiliyor, yani çok daha az depolamaya ihtiyacı var ve daha hızlı senkronize oluyor. Kanıtlar da Merkle tree'lerden daha küçük, yani onları kontrol etmek daha hızlı ve daha az bant genişliği kullanıyor. Bu, Verkle tree'leri çok işlemli bir zincir için iyi kılıyor ve arkalarındaki kriptografi, zincirin verisini güvende tutuyor, kimse değiştiremiyor. Topluluk ayrıca onu daha da iyi hale getirmenin başka yollarına da bakıyor, farklı eliptik eğriler ve sıkıştırma gibi.

## Gerçek dünya kullanımı ve hâlâ zor olan şeyler

Amoveo sadece teori değil. Topluluk, merkeziyetsiz bir tapu sicili ve iş sözleşmeleri için bir sistem gibi gerçek şeyler üzerinde çalışıyor. Tapu sicili, kimin hangi araziye sahip olduğuna dair güvenli ve açık kayıtlar vermeli, çoğunlukla normal sistemin yavaş olduğu ya da insanların ulaşamadığı yerlerde. İş sözleşmesi sistemi, Amoveo'nun akıllı kontratlarını kullanıyor, böylece insanlar arada kimseye güvenmek zorunda kalmadan iş anlaşmalarını yönetebiliyor.

Hâlâ zor olan çok şey var. Benimsenme ve kullanıcı deneyimi en büyükleri. Topluluk, DEX'i kullanımı daha kolay hale getirmek ve likidite sağlayıcıları çekmek istiyor, o yüzden UI ve UX üzerinde çalışıyorlar. Ve uzun vadede geliştirmenin bedelini ödemenin bir yoluna hâlâ ihtiyaçları var, o yüzden finanse etmenin başka yollarına bakıyorlar.

Futarchy'nin hâlâ açık sorunları var ama Verkle tree'ler şimdiden ölçeklenme ve verimlilikte gerçek kazanımlar getiriyor. İkisi de Amoveo'nun finans için merkeziyetsiz ve güvenli bir platform olma hedefinin parçası.
