---
title: "Ape Unit Berlin'den Emil Wagner ile Yapay Zeka Destekli Yazılım Planlamanın Geleceği"
description: "Ape Unit Berlin'den Emil Wagner ile kod yazma işini ajanlara devrettiğimiz bir dünyada yazılım planlamanın nasıl değişeceğini konuştuk. Unutma; önce büyük hedefler, sonra detay görevler."
date: "2025-05-20T12:16:07.923Z"
updated: "2025-05-20"
lang: tr
translated_from: "en/an-interview-with-emil-wagner-from-ape-unit-berlin-about-the-the-future-of-softw"
source_sections: ["from-task-lists-to-milestones", "what-tests-are-for", "briefing-the-agents", "let-the-system-interview-you", "dependencies-and-one-repository-for-everything"]
category: agents-ai
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
tldr: ["Yazılım planlama süreci, yazılımcıları koordine etmekten yapay zeka ajanlarını yönetmeye doğru evriliyor.", "Emil Wagner'in tavsiyesi: Önce teslim edilebilir aşamalara odaklanın, görevler zaten kendiliğinden ortaya çıkacaktır.", "Ajanların başarılı olması için net kabul kriterlerine, güncel dokümantasyona ve tüm planı içeren bir repoya ihtiyaçları var."]
sections: [{"basically": "Projeyi teslim edilebilir parçalara böl, görevler zaten kendiliğinden şekillenecektir."}, {"basically": "Testler, kodun ne yapması gerektiğini size zorla söyletir. Önce testleri tanımlayın, gerisini yapay zekaya bırakın."}, {"basically": "Ajanlara aşamaları, kabul kriterlerini ve güncel dokümanları eksiksiz verin, yoksa ne yaptıklarını bilmeden kod yazmaya başlarlar."}, {"basically": "Sadece kod yazan değil; bana sorular soran, neyin zor, neyin kolay, neyin imkansız olduğunu söyleyen bir araç arıyorum."}, {"basically": "Kod, aşamalar, bağımlılık şeması ve yaşayan doküman; hepsi tek bir Git reposunda bir arada durabilir."}]
---
# Ape Unit Berlin'den Emil Wagner ile Yapay Zeka ile Yazılım Planlamasının Geleceği Üzerine Bir Söyleşi

Bu, Ape Unit Berlin'den Emil Wagner ile yapay zekanın yazılım planlamasını nasıl değiştirdiği üzerine yaptığım bir konuşma. Eski usulle başlıyoruz; bir projeyi küçük iş parçalarına bölüp bağımlılıkları bulduğunuz, takıldığınızda dökümanlara ve Google'a baktığınız o eski yöntem. Sonra geleceğe bakıyoruz; o işleri yapması için yapay zeka ajanlarını yönettiğiniz bir gelecek. Bu ajanların sınırlarının dışına çıkmamaları için net talimatlara ve kontrollü bir ortama ihtiyaçları var. Asıl mesele şu ki işin zor kısmı kod yazmak değil. Koddan önceki o planlama ve özelliklerle hedeflerin detaylıca brief edilmesi süreci; belki de daha tekil görevlere bile gelmeden projeyi aşamalara ya da bir ürün yol haritasına bölmek.

## Görev listelerinden aşamalara

### Emin Mahrt

Yıllarca yazılım mühendisliği yaptın, işin mutfağında çok vaktin geçti. Şimdi hiç yapay zeka sistemi olmadığını hayal et. Yine de bir projeyi planlaman gerekirdi. Farklı insanların yeteneklerini bir araya getirirdin, inşa etme aşamasına gelince de klasik ham maddeleri kullanırdın; yani kullanmak istediğin paketlerin ve servislerin dökümanlarını. Normalde ne yapıyoruz? Hala arıyoruz. Biri daha önce aynı hatayı almış mı diye Google'a bakıyoruz. Ana kaynaklarımız kodun kendisi, dökümanlar, Google ve tabii ki iş arkadaşlarımızın kafasındaki bilgi.

Bir uygulama planlamak, her şeyi küçük iş paketlerine bölmek, onları net bir şekilde tarif etmek ve bağımlılıklarını göstermek demek. Değil mi? Bazen bir işin teslimi gerçekten başka birine bağlı oluyor.

Geleceğe baktığımda, programlamanın geleceğinin orkestrasyondan geçtiğini düşünüyorum. Bir sürü insan geliştiriciyi koordine etmek yerine, bir sürü ajanı yönetiyorsun. Her ajanı dar bir işe odaklıyorsun ve ona verilen görevin dışına çıkmasını engellemeye çalışıyorsun. İnsanlar şimdiden her ajan için izole kum havuzu ortamları açıyor. Ajan bir şey inşa edip bir pull request açıyor, sonra biri; bir insan ya da başka bir ajan; onu inceliyor, kabul edip merge ediyor ya da "Üzgünüm, bu kapsam dışı" diyerek reddediyor.

Asla tam olarak öğrenemediğim şey, gerçekten iyi görevler yazmak. Benim için iyi bir görev yazmak zor. Senin gördüğün o Mermaid şemasını sadece uygulamayı görsel olarak tasarlamanın, bağlantıları görmenin benim için daha kolay olacağını düşündüğüm için çizdim. Ama eminim ki işin mantığını üst seviyede anladığımız ve onu gerçekten sağlam bir brief'e böldüğümüz sürece her şeyi şu an bile inşa edebiliriz. Uygulama nedir, nasıl çalışır, ne yapmalı, ne yapmamalı? Yıllardır söylüyorum, asıl iş bu. İnşa etmek değil, özelliklerin ne olduğunu tanımlamaya kendinizi zorlamak.

Gerçek insan ekipleriyle de işe yarayan pratik tavsiyelerin var mı? Planlama aşamasını ve görev planlamasını nasıl yapıyorsun? İdeal dünyada temiz bir görev listesi istiyorum.

### Emil Wagner

Tekil görevlere geçmeden önce projeyi aşamalara bölmeye çalışırım. İster milestone de, ister ürün yol haritası. Yolu bölmek sana önceliklendirmeyi bedavaya getirir; hangi özelliklerin erken, hangilerinin sonra geleceğini görürsün. Ayrıca insanlara da yardımcı olur. Yukarıdaki zirveyi işaret ettiğinde, çoğu yazılımcı oraya nasıl varacağını hayal bile edemez. Onu somut ve ulaşılabilir hedeflere böl, birden her şey yapılabilir gelir.

Tidy örneğine bak. O üründe sürekli operasyon fikriyle çalıştık. Her bir versiyonun deploy edilebilir olması ve çalışması gerekiyordu. Belki çok az şey yapıyordu ama production'da canlıydı. Bu yaklaşım işe yarar. Versiyon 1 sadece bir ya da iki özellik barındırabilir ama etrafındaki her şey tamamlanmıştır. Eğer mobil uygulama yapıyorsan, tüm işlevsellik tamamlanmasa bile her versiyonun App Store ya da Google Play'e gönderilebilir olması gerektiğini söylersin.

Yani görevleri yazmadan çok önce, her aşama için hedefleri tanımlarım. Bunlar netleşince, hedefleri görevlere bölmek çok daha kolay oluyor. Milestone 1'in gerçek olması için ne yapılması gerekiyor diye sorarsın. Wallet Versiyon 1'i düşün. Belki sadece işlem gönderip alabiliyordur. Versiyon 2'de sosyal kurtarma eklenir. Versiyon 3 derken gider. Ondan sonra insanlar genellikle kendi görevlerini yazabilir hale gelir ve bu harika bir şey; çünkü ne yapacaklarını daha iyi anlarlar ve yanlış anlamaların önüne geçersin.

## Testler ne işe yarar

### Emin Mahrt

Peki ya testler?

### Emil Wagner

Her şeyin yapılması lazım, sadece her zaman aynı kişi tarafından değil. Daha büyük bir ekipte biri kabul testlerine, başkası unit testlere odaklanabilir. İyi testler kaliteyi ve sürdürülebilirliği kontrol altında tutar ve sana kodun ne yapması gerektiğini açıkça yazdırır.

Büyük bir avantaj, özellikle büyük ekiplerde, ortak anlayış oluşturmasıdır. Testler, kod incelemeleri ve dökümanlar bilgi paylaşımı araçlarıdır.

Sadece testleri tanımlayıp, geçmesi için gereken tüm kodu yapay zekaya yazdıran bir yaklaşım da duymuştum. Mesela bir işlem broadcast edildiğinde API bir işlem hash'i dönmeli, eğer dönmüyorsa bir şey bozuktur ve gidip bakarsın. Normalde yazacağından daha fazla test yazmış olursun ama prensip sağlam.

## Ajanlara brief vermek

### Emin Mahrt

Diyelim ki senin gibi benim gibi insanlar yazılım şeflerine dönüştü. Sen bu işin içine benden çok daha fazla girdin. Teknik bir brief yazdığında ajanlar muhtemelen tam istediğin şeyi yapacaktır. Ben doğal dilde yazmaya meyilliyim, ajanlar da istemediğim şekillerde yaratıcı oluyorlar.

### Emil Wagner

Neden brief'i ChatGPT ile beraber hazırlamıyorsun? Onunla adım adım parçalara ayır. Böylece iyi bir başlangıç yapmış olursun.

### Emin Mahrt

Birkaç kez denedim. Şu anda milestone'lar ve görevler, hatta belki daha iyisi teslim edilebilir işlerle bir Markdown dosyası oluşturmayı düşünüyorum. İçinde tam olarak neyin olması gerektiğini hala çözmeye çalışıyorum.

### Emil Wagner

Belki de her görevi listelememelisin. Sadece aşamaları, her iterasyon için teslim edilecekleri koy ve kabul kriterlerini ekle. Ne kadar bağlam verirsen, ajanlarından alacağın çıktı o kadar iyi olur. Büyük dil modelleri, yayınlanan son paketi ya da güncel dökümanları okumadan önden gitmeyi seviyorlar. O yüzden onları geri çekip, bak, güncel API referansı burada, bunu oku demen gerekiyor.

İlgili dökümanları doğrudan kopyalayıp yapıştırmak çok işe yarıyor.

## Sistemin seni mülakata almasına izin ver

### Emin Mahrt

Bir kurucunun veya herhangi birinin, gelecekte ister insan ister makine olsun, bir işi düzgünce yapabilmesi için neleri hazırlaması gerektiğini gösteren bir taslak istiyorum.

Eskiden bir müşteriyle konuşur, ne istediğini anlar, sonra bunu yazılımcılara paslar ve herkesin aynı şeyi anladığını umardın. Bugün ise ister AI oyun yapıcıları olsun ister Llama, Replit gibi araçlar, kimse seni tüm girdileri toplaman için yapılandırılmış bir mülakat sürecinden geçirmiyor.

İdeal olan, sistemin beni mülakata alması ve ihtiyacı olan her şeyi benden söküp alması. Sonra da bana hangi kısmın zor, hangisinin kolay olduğunu; şu özelliğin veritabanı gerektirdiğini ama elimizde veritabanı olmadığı için bunu pas geçtiğini söylemeli. Bunu dün kullandığım bir araçta gördüm zaten. Veritabanı olmadığı için bir özelliği reddetti. Buna bayıldım ve test etmeye devam edebilmek için hemen 25 dolarlık kredi yükledim.

Şu VS Code eklentisi TaskMaster’a bak. Binlerce indirmesi var. Tek işi görevler oluşturmak ve AI’nın bu görevlerin dışına çıkmamasını sağlamak. AI’nın senin istemediğin hiçbir şeyi yapmayacağına ve seni sonsuz döngülere karşı koruyacaklarına söz veriyorlar.

Ama senin bilgin bende olsa, bunu çok daha iyi yapardım. Tabii her şey her hafta değişiyor.

### Emil Wagner

Görevlere girmeden önce işi bölmeye çalış. Önce ürün yol haritasını düşün. Uygulamanın 0.1 versiyonu ne yapmalı? En basit parçadan başla. Belki sadece bir işlem (transaction) alıp gönderebilir. Anahtarların üretilmesi lazım, tamam. Bir sonraki versiyona sosyal kurtarmayı eklersin. İterasyona devam et. Grafiklerinden bazıları çok fazla backend altyapısı içeriyor, farklı servisleri birbirine bağlıyorsun. Belki bunları ayrı adımlar olarak ele almalısın; önce backend fonksiyonları, sonra arayüz, sonra da diğer özellikler.

## Bağımlılıklar ve her şey için tek bir depo

### Emin Mahrt

İşi geniş çerçeveden görünce, kilometre taşlarının başka şeylere de bağlı olduğunu görüyorsun. Bir yer bozulduğunda domino etkisini zaten biliyorsun. Bitcoin soft fork’u gibi işte. Mevcut şeyler bozulsun istemiyorsun, sadece yeni yetenekler eklemek istiyorsun. Bazen hard fork gerekir ama o da ancak geriye dönük uyumluluğu bozmayı göze alırsan olur.

Görevleri daha büyük bir projenin içindeki yapboz parçaları gibi hayal ediyorum; her birinin kendi bağımlılıkları var. Bir görev tanımı ne yaptığını, nerede durduğunu, hangi parçalara dokunduğunu, hangi API’lere bağlı olduğunu ve uzman dokümanlarının nerede olduğunu söylemeli.

Şu an çoğu insan hâlâ kaos içinde. Oturup doğru dürüst planlama yapacaklarına AI’nın önüne ne gelirse atıp bir şeyler üretmesini bekliyorlar. Seninle bir gün gerçekten bir planlama seansı yapmayı çok isterim, belki ufak bir yan projede düzgün bir pipeline kurmak için.

### Emil Wagner

Kesinlikle. Başlangıçta ortalığın biraz karışması ve sonra toparlamak normal. Ben tek tek görevlere değil, önce daha üst seviye yapıya odaklanırdım. Yol haritası elindeyken bir ajan, 1. Kilometre Taşı’na ulaşmak için hangi görevlere ihtiyacı olduğunu bile sorabilir ve kendi yapılacaklar listesini oluşturabilir.

Ve evet, her zaman bağımlılıkların ve yazılımcıların birbirinin ayağına basma riski var. Versiyon kontrolü ve branch’ler bu yüzden var zaten. Ama gerçekten her şeyi içinde barındıran tek bir Git deposunu hedefleyebilirsin. Kodlar, kilometre taşlarının olduğu bir README, bağımlılıkları gösteren bir Mermaid grafiği ve hatta ajanlar tarafından oluşturulan yaşayan bir doküman; çünkü bunu elle güncel tutmak tam bir eziyet.

### Emin Mahrt

Harika. Çok ilginç. Vaktin için sağ ol.
