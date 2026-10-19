---
title: "FATE VM, EVM'nin temel kusurlarını nasıl düzeltiyor"
description: "Erik Stenman, düz bellek ya da rastgele jump'ları olmayan, tipli bir VM olan FATE'i geliştirdi. Kontratlar yaklaşık 10 kat daha küçük oluyor ve EVM'dekinden 3 kat daha hızlı çalışıyor."
date: "2026-03-19T03:50:15Z"
updated: "2026-03-19"
lang: tr
translated_from: "en/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund"
source_sections: ["no-more-flat-memory", "functions-and-basic-blocks-instead-of-jumps", "real-data-types-in-the-vm", "maps-outside-normal-storage", "the-benchmark"]
category: building
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Dr. Erik Stenman, Aeternity'nin güçlü tipli VM'i FATE'i, EVM'nin eski hatalarını düzeltmek için tasarladı.", "Düz belleği ve rastgele jump'ları bir kenara bırakıp gerçek veri tiplerini ve map'leri doğrudan VM'in içine koyuyor.", "Derlenen kod yaklaşık 10 kat daha küçük oluyor ve EVM'dekinden 3 kat daha hızlı çalışıyor."]
sections: [{"basically": "FATE, ham bellek pointer'larının yerine tipli değişkenler koyuyor, yani bir boolean sadece boolean olarak okunabiliyor."}, {"basically": "Çağıran taraf tipli bir fonksiyonu ismiyle çağırıyor ve kod basic block'lar halinde çalışıyor, yani geçersiz jump'lar imkansız hale geliyor."}, {"basically": "Sınırsız integer'lar, listeler, tuple'lar ve yerleşik blockchain tipleri, derleyicinin ürettiği yığınla şişkinliği ortadan kaldırıyor."}, {"basically": "State map'leri state tree'de yaşıyor ve FATE sadece istediğin elemanları okuyor, ne eksik ne fazla."}, {"basically": "FATE bytecode'u EVM bytecode'undan yaklaşık 9,6 kat daha küçük ve üç kat daha hızlı çalışıyor."}]
---
Ethereum Virtual Machine'e (EVM) bir dil tasarımcısı gözüyle bakarsan ve çalışma zamanı seviyesinde güvenliği önemsiyorsan, nasıl inşa edildiğinde bir sürü sorun görürsün.

EVM, düz belleğe sahip, tiplenmemiş bir yığın makinesi. Düşük seviyeli bayt işlemleriyle, her yere zıplamalarla ve ham 256-bit kelimelerle çalışıyor. Bu, ilk akıllı kontratları çalıştırmak için yeterince iyiydi ama bize şişkin bytecode, yavaş çalışma ve bir sürü güvenlik açığı da verdi.

Dr. Erik Stenman teknik bir derin dalışta Fast Aeternity Transaction Engine'in (FATE) nasıl inşa edildiğini anlatıyor. Bu, yüksek seviyeli, güçlü tiplenmiş bir sanal makine ve EVM'nin eski hatalarını düzeltmek için bilinçli olarak tasarlandı.

Stenman ve ekibi bir blockchain VM'inin durumu, belleği ve çalışan kodu nasıl ele aldığını yeniden düşündüler ve ortaya çıkan VM'de derlenen kod, önceki EVM versiyonundan yaklaşık 10 kat daha küçük ve 3 kat daha hızlı çalışıyor.

İşte Stenman'ın "Ethereum EVM paradigmasını" daha iyi hale getirmek için yaptıkları.

## Düz belleğe son

İlk konu bellek. EVM'nin en tehlikeli yanlarından biri ham bellek işaretçileriyle çalışması. Akıllı kontratlar tek bir uzun bellek dizisine ham baytlar okuyup yazıyor ve bu da sınır dışı hataları, işaretçi çakışması ya da yanlış veri yapısı olarak okunan baytları kolayca beraberinde getiriyor.

Stenman düz belleği VM'den tamamen çıkardı. FATE'de bellek adresi yok, değişkenler var, bir fonksiyonun kapsamı içinde yerel olarak yaşayan ayrı depolama yuvaları var. Bir yuva içindeki verinin ne kadar büyük olabileceğini sınırlamıyor ve veri her zaman kendi tip etiketini taşıyor.

Bir yuva boolean tutuyorsa, VM onun sadece boolean olarak okunmasını garanti ediyor (`true` ya da `false`), yani artık "0 mı 1 mi" tamsayılarıyla tahmin yürütmek yok.

Durum için FATE, `-1` ya da `-2` gibi "negatif isimli" özel bir değişken türü kullanıyor. Negatif bir değişkene yazdığında, VM kontratın kalıcı durum ağacına bir yazma işlemi planlıyor.

Böylece geliştiricilerin EVM'deki `SLOAD` ve `SSTORE` anahtar türetmeleri gibi karmaşık depolama işaretçilerini elle yönetmesi gerekmiyor artık.

## Zıplamalar yerine fonksiyonlar ve temel bloklar

İkinci konu kontrol akışı. EVM program sayaçlarına (PC) ve kodun herhangi bir yerine zıplamaya dayanıyor. EVM'de bir kontrat `0x00` adresinde çalışmaya başlıyor, tek devasa bir kod bloğu ve 4 baytlık bir fonksiyon seçiciye göre doğru fonksiyona ulaşmak için atlama tabloları kullanıyor.

FATE fonksiyonları ve tip imzalarını VM içinde gerçek birinci sınıf şeyler haline getiriyor. Çalışma artık bir `0x00` giriş noktasında başlamıyor. Çağıran kişi tam fonksiyonu adlandırıyor ve tiplenmiş argümanlar geçiyor, VM de herhangi bir şey çalışmadan önce bu argümanları fonksiyonun katı tip imzasına karşı kontrol ediyor.

Bir fonksiyonun içinde FATE kodu temel blokların bir listesi olarak tutuyor, başka hiçbir şey yok. Değiştirebileceğin ya da içine zıplayabileceğin ham bir "kod belleği" yok. Temel blok sadece arka arkaya çalışan talimatların bir listesi.

Bir dala ihtiyaç duyduğun anda, çalışma açıkça işaretlenmiş yeni bir temel bloğa geçiyor. Böylece EVM bytecode'undan bildiğin "geçersiz atlama hedefi" hataları tasarım gereği oluşamıyor.

## VM'de gerçek veri tipleri

Üçüncü konu veri tipleri. EVM tam olarak bir veri tipi biliyor, 256-bit kelime. String, liste, dizi ya da gerçekten büyük sayılar istiyorsan, derleyicinin baytları doldurmak, işaretçileri yönetmek ve uzunlukları saymak için binlerce satır assembly enjekte etmesi gerekiyor.

FATE karmaşık veri tiplerini doğrudan VM çalışma zamanına koyuyor ve bu da bytecode şişkinliğini ve çalışma maliyetini büyük ölçüde azaltıyor. FATE'de boyut sınırı olmayan tamsayılar var, yani taşabilecek ya da pahalı bir SafeMath kütüphanesi çekmeni zorlayacak katı bir 256-bit tavan yok.

Demetleri, listeleri ve varyant tiplerini (örneğin opsiyonel tipler) yerel olarak işliyor. Ve adresler, kontratlar, oracle'lar ve state channel'lar gibi blockchain şeyleri FATE'de yerel ve çok optimize tipler.

Bunlarla çalışırken VM, node'un işlem mekaniklerine doğrudan bağlanan yerel opcode'lar çalıştırıyor, böylece EVM'deki harici çağrıların tüm ek yükünü atlıyorsun.

## Normal depolamanın dışında map'ler

Dördüncü konu map'ler. EVM'de bir mapping (anahtar-değer deposu), anahtarı depolama yuvası konumuyla birlikte hash'leyerek çalışıyor ve bu da rastgele bir 256-bit depolama adresi veriyor.

Yani bir mapping üzerinde iterasyon yapamazsın ve okuma yazma işlemleri oldukça pahalı. Stenman map'leri kendi başına bir şey haline getirdi, normal değişken depolamasının dışında yönetiliyor. FATE yerel bellek map'lerine izin veriyor ama durum map'leri doğrudan ve verimli bir şekilde Aeternity durum ağacının içinde oturuyor.

Geliştirici map'i normal bir map gibi kullanıyor ve FATE motoru bekliyor, gerçek okuma yazma işlemlerini durum ağacına toplu olarak grupluyor ve sadece tam olarak istediğin öğeleri okuyor.

## Benchmark

Düz belleği çıkararak, yerel yüksek seviyeli tipler ekleyerek ve katı temel blok kontrol akışı kullanarak Stenman, EVM akıllı kontratlarının içinde dolup taşan devasa derleyici şablon kodundan kurtuldu.

Benchmark'ındaki rakamlar büyük. FATE bytecode'u, aynı kontratın EVM için derlenmiş halinden yaklaşık 9,6 kat daha küçük (kabaca boyutun %10'u). Ve VM bayt doldurma, bellek ofsetleri ya da tek büyük atlama yönlendirmesi için sıfır döngü harcadığından, FATE üç kat daha hızlı çalışıyor ve kullanıcı için gas çok daha ucuz hale geliyor.

<p><img src="/media/re-architecting-the-blockchain-execution-layer-how-the-fate-/cover.webp" alt="kapak"></p>
