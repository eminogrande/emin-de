---
title: "Blockchain'in Yürütme Katmanını Yeniden Tasarlamak: FATE VM, EVM'nin Temel Kusurlarını Nasıl Çözüyor"
description: "Erik Stenman'ın, EVM'den yaklaşık on kat daha küçük ve üç kat daha hızlı sözleşmeler üreten tiplendirilmiş bir VM olan FATE'i nasıl geliştirdiği."
date: "2026-03-19T03:55:43.287Z"
updated: "2026-03-19"
lang: tr
translated_from: "en/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19"
source_sections: ["why-the-evm-needs-fixing", "typed-variables-instead-of-flat-memory", "functions-instead-of-arbitrary-jumps", "high-level-data-types-and-maps-in-the-vm", "the-results"]
category: building
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
image: "/media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png"
tldr: ["Dr. Erik Stenman, EVM'nin tasarım kusurlarını düzeltmek için Aeternity'e özel tiplendirilmiş bir VM olan FATE'i geliştirdi.", "FATE, düz belleği ve keyfi sıçramaları kaldırıyor; VM'nin içine tiplendirilmiş değişkenler, fonksiyonlar, büyük tam sayılar ve map'ler koyuyor.", "Stenman'in benchmark'ında bytecode yaklaşık 9,6 kat daha küçük ve EVM'ye kıyasla üç kat daha hızlı çalışıyor."]
sections: [{"basically": "Düz bellekli ve ham 256-bit kelimeler kullanan tiplendirilmemiş bir yığın makinesi, şişkin, yavaş ve güvensiz sözleşmeler üretir."}, {"basically": "Ham bellek işaretçisi yok. FATE değişkenleri kendi tip etiketini taşır ve negatif isimler state'e yazar."}, {"basically": "Çağıranlar tiplendirilmiş bir fonksiyonun adını verir ve kod yalnızca temel bloklardan oluşur, bu yüzden geçersiz sıçramalar gerçekleşemez."}, {"basically": "Büyük tam sayılar, tuple'lar, listeler, zincir tipleri ve map'ler VM'nin içinde yaşar, bu yüzden derleyiciler kalıp kodu atlar."}, {"basically": "Son kullanıcı için yaklaşık 9,6 kat daha küçük bytecode, üç kat daha hızlı yürütme ve daha düşük gas."}]
---
Bu makaleyi okuyup benimle, Emin Mahrt ile, benzer harika şeyler üzerinde çalışmak istersen, bana emin@nuri.com adresinden çekinmeden ulaşabilirsin. Aşağıdaki makale, Ethereum'un EVM'sini yeniden tasarladığımız geçmiş çalışmalarımıza dayanıyor. Ben sadece bir izleyiciydim, ama son yıllarda takip edip dinlediğim en ilginç şeylerden biriydi, o yüzden burada başkalarıyla paylaşmanın güzel olacağını düşündüm.

<https://www.youtube.com/watch?v=a77DGGzMyN8>

## EVM neden düzeltilmeli?

Ethereum Sanal Makinesi'ne (EVM) dil tasarımı ve düşük seviyeli çalışma zamanı güvenliği açısından baktığında, mimaride bir sürü darboğaz görürsün. EVM, tipli olmayan, yığın tabanlı bir makine. Düz bir bellek modeli var ve düşük seviyeli bayt manipülasyonuna, rastgele sıçramalara ve ham 256-bit kelimelere fazlasıyla bel bağlıyor. Bu, erken dönem akıllı kontrat ekosistemini başlatmak için işe yaradı, ama bu tasarım tercihleri şişkin bytecode'a, yavaş çalışmaya ve sık sık güvenlik açıklarına yol açtı.

Teknik bir derinlemesine incelemede Dr. Erik Stenman, Fast Aeternity Transaction Engine'in (FATE) mimarisini anlatıyor. FATE, EVM'nin eski hatalarını düzeltmek için inşa edilmiş, üst seviye, güçlü tipli bir sanal makine. Bir blockchain VM'sinin durumu, belleği ve kod çalıştırmayı nasıl ele aldığını baştan düşünerek, Stenman ve ekibi öyle bir çalıştırma ortamı elde ettiler ki derlenen kod, EVM eşdeğerine göre neredeyse 10 kat daha küçük ve 3 kat daha hızlı çalışıyor.

Stenman, Ethereum EVM paradigmasını daha iyi hale getirmek için bunları yaptı.

## Düz bellek yerine tipli değişkenler

EVM hakkındaki en tehlikeli şeylerden biri, ham bellek işaretçilerine dayanması. EVM'de akıllı kontratlar, doğrusal bir bellek dizisine ham baytlar okuyup yazıyor ve bu da kolayca sınır dışı hatalarla, işaretçi çakışmasıyla ya da baytların gerçekte olduklarından farklı bir veri yapısı olarak okunmasıyla sonuçlanabiliyor.

Stenman, düz belleği VM'den tamamen çıkardı. FATE, bellek adresleri yerine değişkenler kullanıyor, yani bir fonksiyonun kapsamında yerel olarak yaşayan ayrı depolama yuvaları. FATE'de bir depolama yuvası, tuttuğu verinin boyutunu sınırlamıyor ve veri kendi tip etiketini taşıyor. Bir yuva boolean tutuyorsa, VM onun sadece boolean olarak okunacağını garanti ediyor (`true` ya da `false`), böylece "0 mı 1 mi" integer değerlendirmelerinin belirsizliği ortadan kalkıyor.

FATE ayrıca durum ağacıyla çalışmayı da soyutluyor. "Negatif isimli" özel bir değişken sınıfı kullanıyor (örneğin `-1`, `-2`). Negatif bir değişkene yazmak, kontratın kalıcı durum ağacına bir yazma işlemi planlıyor. Böylece geliştiricilerin, EVM'deki `SLOAD` ve `SSTORE` anahtar türetmeleri gibi karmaşık depolama işaretçilerini elle yönetmesi gerekmiyor.

## Rastgele sıçramalar yerine fonksiyonlar

EVM'de kontrol akışı büyük ölçüde Program Counter'lara (PC) ve rastgele sıçramalara dayanıyor. EVM'deki bir akıllı kontrat, `0x00` adresinde çalışmaya başlıyor ve devasa, tek parça bir kod bloğu gibi işliyor. Sıçrama tabloları, 4 baytlık bir fonksiyon seçiciye göre çalışmayı belirli bir fonksiyona yönlendiriyor.

FATE, fonksiyonları ve tip imzalarını VM seviyesinde yerli, birinci sınıf şeyler olarak ele alıyor. Çalışma artık rastgele bir `0x00` giriş noktasında başlamıyor. Çağıran kişi tam fonksiyonu adıyla belirtiyor ve tipli argümanlar geçiyor, VM de çalışma daha başlamadan önce bu argümanları fonksiyonun katı tip imzasıyla karşılaştırıyor.

Bir fonksiyonun içinde FATE, kodu yalnızca bir temel blok dizisi olarak temsil ediyor. Manipüle edebileceğin ya da içine sıçrayabileceğin ham bir "kod belleği" yok. Temel blok, sadece sırayla dizilmiş talimatların bir listesi ve dallanma gerektiği anda çalışma temiz bir şekilde yeni, açıkça işaretlenmiş bir temel bloğa geçiyor. Böylece EVM bytecode'una özgü "geçersiz sıçrama hedefi" hataları yapısal olarak imkansız hale geliyor.

## VM'de üst seviye veri tipleri ve map'ler

EVM yerli olarak tam olarak bir veri tipi biliyor: 256-bit kelime. String'ler, listeler, diziler ya da isteğe bağlı büyüklükte sayılarla çalışmak için derleyicinin bayt doldurmak, işaretçi yönetmek ve uzunluk hesaplamak için binlerce satır assembly enjekte etmesi gerekiyor.

FATE, karmaşık veri tiplerini doğrudan VM çalışma zamanına koyuyor ve bu, bytecode şişkinliğini ve çalışma yükünü ciddi ölçüde azaltıyor. Taşma riski taşıyan ya da pahalı SafeMath kütüphaneleri eklemeni zorlayan sabit 256-bit sınırı yerine, FATE sonsuz büyüklükte integer'ları yerli olarak destekliyor. Tuple'ları, Listeleri ve Variant Tiplerini (örneğin Optional tipler) yerli olarak işliyor. Adresler, Kontratlar, Oracle'lar ve State Channel'lar gibi blockchain şeyleri ise FATE'de yerli, yoğun şekilde optimize edilmiş tipler. Bunlarla çalışırken VM, doğrudan düğümün işlem mekaniklerine bağlanan yerli opcode'lar çalıştırıyor ve EVM harici çağrılarının devasa yükünü atlıyor.

EVM'de mapping'leri (anahtar-değer depoları) saklamak, anahtarı depolama yuvasının konumuyla hash'leyip rastgele bir 256-bit depolama adresi elde etmek anlamına geliyor. Bu, mapping'ler üzerinde yineleme yapmayı imkansız kılıyor ve okuma-yazma işlemleri nispeten pahalı oluyor. Stenman, Map'leri ayrı bir şey olarak tasarladı, normal değişken depolamasının dışında ele alınıyorlar. FATE yerel bellek map'lerine izin veriyor, ama durum map'leri doğrudan Aeternity durum ağacının içinde verimli şekilde saklanıyor. Geliştirici map ile doğal bir şekilde çalışıyor ve FATE motoru, durum ağacına yapılan gerçek okuma ve yazmaları erteliyor, toplu hale getiriyor ve yalnızca tam olarak istediğin elemanları okuyor.

## Sonuçlar

Düz belleği kaldırarak, yerli üst seviye tipler ve katı temel blok kontrol akışı ekleyerek, Stenman EVM akıllı kontratlarını rahatsız eden devasa derleyici standart kodunu ortadan kaldırdı. Stenman'ın benchmark'ındaki sonuçlar büyük. FATE kontrat bytecode'u, aynı kontratın EVM mimarisi için derlenmiş halinden yaklaşık 9,6 kat daha küçük (kabaca boyutun %10'u). Ve VM, doldurma baytlarını ayrıştırmak, bellek ofsetleri hesaplamak ya da tek parça sıçrama yönlendirmesi çalıştırmak için sıfır döngü harcadığından, FATE üç kat daha hızlı çalışıyor ve son kullanıcı için gas maliyetleri ciddi ölçüde düşüyor.

![](../../../media/re-architecting-the-blockchain-execution-layer-how-the-fate-vm-solves-evm-s-fund-medium-2026-03-19/01-eec7f941.png)
