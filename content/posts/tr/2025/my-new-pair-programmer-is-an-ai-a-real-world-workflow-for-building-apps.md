---
title: "Yeni Yazılım Ortağım Yapay Zeka: Uygulama Geliştirmede Gerçek Dünya İş Akışı"
description: "Bir günümü bir yapay zeka kodlama asistanıyla iOS uygulaması geliştirerek ve hatalarını ayıklayarak geçirdim. İşte kullandığım iş akışı ve işin nerede sarpa sardığı."
date: "2025-06-30T10:44:48.609Z"
updated: "2025-06-30"
lang: tr
translated_from: "en/my-new-pair-programmer-is-an-ai-a-real-world-workflow-for-building-apps"
source_sections: ["from-prompt-to-push", "when-the-ai-gets-it-wrong", "from-coder-to-conductor", "what-i-learned"]
category: agents-ai
format: essay
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Bir günümü yapay zeka kodlama asistanıyla iOS uygulaması geliştirip hataları düzelterek geçirdim.", "İş akışım şöyle: işaretlenmiş bir ekran görüntüsü, net ve yalın bir komut, gözden geçirilmiş bir diff ve bir commit.", "Yapay zeka bir şeyi düzeltirken diğerini bozabiliyor, döngüye girip takılabiliyor ve seni plan dışı özellikler eklemeye teşvik edebiliyor.", "Artık daha az kod yazıp daha çok yönlendiriyorum; bir yazılımcıdan ziyade mimar, gözden geçiren ve kalite kontrol sorumlusu gibiyim."]
sections: [{"basically": "Ekran görüntüsünde hatayı yuvarlak içine al, ne istediğini açıkça tarif et, diff'i kontrol et, telefonda test et ve commit'le."}, {"basically": "Bazen istemediğin yerleri değiştirip takılıp kalıyor. Başında dur ve plana sadık kalmasını sağla."}, {"basically": "Eskiden bilgisayarın dilini konuşmakla gurur duyardım. Şimdi ise İngilizce olarak ne yapması gerektiğini söylüyorum."}, {"basically": "Net ol, ekran görüntülerini kullan, görev başına tek bir chat penceresi aç, sık sık commit at ve ne zaman kontrolü ele alman gerektiğini bil."}]
---
Herkes şu sıralar yazılım dünyasında yapay zekadan bahsediyor. Tek bir komutla dakikalar içinde koca bir uygulamanın yazıldığı demoları görüyorsunuz. Peki, bu araçlarla geliştirme yaparken normal bir gün nasıl geçiyor? En çok birlikte mesai harcadığın şey yapay zeka olduğunda, bir bug'dan çözüme ya da bir fikirden özelliğe nasıl gidiyorsun?

Bir günümü yapay zeka kodlama asistanıyla bir iOS uygulaması geliştirerek ve hataları ayıklayarak geçirdim. İlginçti, sinir bozucuydu ama günün sonunda bayağı bir iş çıkardım. İşte iş akışının gerçek yüzü; iyi kısımları, kötü kısımları ve bug'larıyla.

## Prompt'tan push'a

Yapay zeka ile çalışma tarzım, sürekli tekrarladığım bir döngüye dönüştü. Daha az kod yazıyorum, daha çok yönetiyorum.

1. Adım: Görmek, işaretlemek ve yapay zekaya vermek. Olay, görebildiğin bir bug ile başlıyor. Benim uygulamada "Para Ekle" butonu çalışmıyordu ama benzer bir "Para Yükle" butonu gayet iyi işliyordu. Önce kodu açmadım. Telefonumdaki ekranın bir görüntüsünü aldım. Basit bir düzenleme aracıyla bozuk olan "Para Ekle" butonunu ve çalışan "Para Yükle" butonunu daire içine aldım; çünkü o resim yapay zekaya sayfalarca dokümandan daha çok şey anlatıyor.

Telefonum bilgisayarıma bağlı, bu yüzden işaretlediğim ekran görüntüsünü kopyalayıp doğrudan asistanla olan sohbete yapıştırıyorum. Yapay zeka ne demek istediğimi şak diye anlıyor.

2. Adım: İstediğim şeyi düz bir dille yazmak. Artık programlama dilim İngilizce. Elimdeki tüm detayları içeren net bir prompt yazıyorum.

*"Card View ekranında, sağ üstteki Para Ekle butonuna tıkladığında, kartın altındaki para yükle ikonuna tıkladığında açılan ekranın aynısını açabilir misin? İkisini de ekran görüntüsünde kırmızıyla işaretledim."*

Ne kadar net olursam, o kadar iyi sonuç alıyorum. Ekranın (`Card View`), bileşenlerin (`NuriHed`, `NuriButton`) adını ve ne olması gerektiğini açıkça belirtiyorum.

3. Adım: Değişiklikleri gözden geçirmek, test etmek ve commit'lemek. Yapay zeka isteğimi ve elindeki kodu analiz ediyor, sonra değiştirmek istediklerini bir diff olarak sunuyor; sildiği satırlar kırmızı, ekledikleri yeşil. Benim işim, pull request'i inceleyen kıdemli yazılımcı olmak. Mantıklı mı? Doğru görünüyor mu?

Eğer öyleyse kabul ediyorum, uygulamayı tekrar derleyip hemen telefonda test ediyorum. Bu sefer "Para Ekle" butonu tıkır tıkır çalıştı.

Sonra da commit'liyorum, bunu asla atlamıyorum. Yapay zekaya `"Lütfen bunu commit'le ve GitHub'a push'la."` diyorum. Git benim emniyet kemerim. Yapay zeka sonra bir şeyi bozarsa, her zaman çalışan bir sürüme geri dönebiliyorum.

## Yapay zeka çuvalladığında

Kulağa pürüzsüz geliyor ama hiçbir şey neredeyse hiç dümdüz ilerlemiyor. Yapay zeka güçlü ama aynı zamanda tonla hata da yapıyor.

Bir keresinde küçük bir chevron ikonunun dikey hizalamasını düzeltmesini istedim. Hizalamayı düzeltti ama ekranın tamamındaki kartın boyutunu da değiştirdi. Neden? Bilmiyorum. Şimdilik idare edebilirdim. Bu hep oluyor; bir şeyi düzeltiyorsun, yapay zeka yolda başka bir şeyi bozuyor. Sürekli gözün üzerinde olmalı.

Bazen öylece takılıp kalıyor. Bir döngüye girip aynı değişikliği tekrar tekrar deniyor ve başarısız oluyor. Kendi araçları yüzünden kafasının karıştığını ve hata üstüne hata verdiğini gördüm. Eski IT numarası çoğu zaman işe yarar; programı kapatıp tekrar açmak. Bazen farklı bir modele geçmek de işe yarıyor, örneğin Gemini'dan Claude 3 Opus'a geçmek gibi, ama o biraz daha masraflı olabilir.

Planlanmamış yeni özelliklerin içinde kaybolmak da çok kolay. "Güzel olsa fena olmaz" dediğim bir fikrim vardı; QR kod ekranına bir "Paylaş" butonu. Yapay zeka şak diye yaptı. Ama sadece yarım yamalak oldu. Adresi metin olarak paylaştı ama QR kodun kendisini paylaşmadı.

İşte bu bir tuzak. Roadmap'imde olmayan ve düzgün bile çalışmayan bir özelliğe vakit harcadım. Yeni bir şeye başlamak sadece tek bir cümlene bakıyorsa, plana sadık kalmak her zamankinden daha önemli.

## Yazılımcılıktan orkestra şefliğine

Yapay zeka asistanıyla çalışmak, kodla kurduğum ilişkiyi değiştirdi.

Eskiden bilgisayarın dilini konuşabildiğim için kendimle gurur duyardım, şimdi ise İngilizce olarak ne yapması gerektiğini söylüyorum. Kendi ellerimle daha az şey inşa ediyorum. Daha çok mimar, incelemeci ve kalite kontrolcüyüm; hepsi bir arada.

Eskiden mükemmel bir fonksiyonu kendim yazmaktan hoşlanırdım, şimdi istediğim sonuca ulaştıracak güçlü bir araca sahip olmaktan hoşlanıyorum. Bu farklı bir gurur, daha çok bir yönetici gururu gibi.

## Öğrendiklerim

Yapay zeka ile bir yazılımcı gibi çalışmak istiyorsan, öğrendiklerim bunlar: Çok net ol, çünkü muğlak prompt'lar muğlak ve genelde yanlış sonuçlar verir; o yüzden ekran adlarını, bileşen adlarını ve net bir mantığı kullan. Bir resim çoğu zaman 1000 satır koda bedeldir, mümkünse işaretlenmiş ekran görüntülerini kullan. Her bug veya özellik için yeni bir sohbet aç, böylece yapay zekanın kafası karışmaz. Sürekli commit'le, git senin en iyi arkadaşın; çalışan değişiklikleri sık sık commit'lersen her zaman geri dönüş yolun olur.

Önce çalıştır, sonra güzelleştir. İlk önce işi çalışır hale getir, sonraki adımda yapay zekadan kodu veya arayüzü temizlemesini iste. Ve ne zaman duracağını bil. Eğer yapay zeka bir görevde birkaç denemeden fazla başarısız olursa, kodu kendin yazmak veya problemi tekrar düşünmek daha hızlı olabilir.

Yapay zeka ile kodlama bir sihir değil. Mükemmel olmayan güçlü bir araç ve bunun için yeni becerilere ihtiyacın var. Net bir şekilde açıklaman, keskin gözlerle incelemen ve planına sadık kalman lazım. Geliştiricilerin yerini almayacak ama geliştirici olmanın ne demek olduğunu kökten değiştiriyor.
