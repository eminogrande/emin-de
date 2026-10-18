---
title: "Herhangi bir Nuri kullanıcısını ekle, yeter"
description: "Referral, Guardian, miras, Multisig ve ortak birikim Nuri'de tek bir özellik olacak. Ayarlar'dan bir kullanıcı adı ekliyorsun, gerisi kendiliğinden geliyor."
date: "2026-10-18"
updated: "2026-10-18"
lang: tr
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-hinzu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-hinzu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["Nuri için fikrim tek bir özellik. Ayarlar'dan birinin kullanıcı adını ekliyorsun.", "İzin verdiğin şeye göre bundan referral, Guardian, miras, Multisig ve ortak birikim çıkıyor.", "Fee bizde frontend'de, kaynak kodunda açık duruyor ve sen onu kendin 0 ile 21 yüzde arasında ayarlıyorsun."]
sections: [{"basically": "Nuri'de referral, Guardian, miras ve Multisig tek bir özellik olacak. Ayarlar'dan bir kullanıcı adı ekliyorsun."}, {"basically": "Nuri'de bir arkadaşını ekleyen, Fee'yi onunla paylaşıyor. 10 kişi eklersen Fee 10'a bölünüyor."}, {"basically": "Her ödeme, senin insanlarına birkaç satoshi ve bir push bildirimi gönderiyor. Nuri'yi viral yapan şey bu."}, {"basically": "Expanding Multisig'de Guardian'larının key'leri ancak sen kendi key'lerini kaybettiğinde aktif oluyor."}, {"basically": "Guardian, key'ini geri almana yardım ediyor. Mirasçı ise ancak sen bir yıl boyunca hiçbir şey yapmadığında devreye giriyor."}, {"basically": "Nuri, Fee'yi provider'lardan almıyor, kendi frontend'inde alıyor, kaynak kodunda açık bir şekilde."}, {"basically": "Nuri'de Fee'ni kendin ayarlıyorsun, 0'dan 21 yüzdeye kadar. Benim partilerimde bağışlar beş katını getirdi."}, {"basically": "Nuri'de her API call küçük bir x402 ya da L402 ödemesi olacak. Böylece Fee sorunu çözülmüş oluyor."}, {"basically": "Multisig'i kimse anlamaz. Üç kişi ve bir hardware wallet'ı herkes anlar. Nuri'yi böyle anlatıyoruz."}, {"basically": "Nuri'de ilk adım sadece Ayarlar'dan eklenen ve birlikte kazanan bir arkadaş. Geri kalan her şey bunun üzerine kurulu."}]
---
Sanırım bu sabah oldukça iyi bir şey çözdüm. Nuri için bir özellikle ilgili. Şimdilik fikir şu.

## Beş yerine tek özellik

Multisig, Guardians, Inheritance ve Referral'ı tek bir özellikte toplamak istiyorum. Ve bu şöyle işliyor. Uygulamada Settings'e sadece senin kullanıcı adını ekliyorum. Başka bir şey yok.

Bunu yaptığım anda, Nuri'ye ödediğim fee'lerin yüzde 50'sini sen alıyorsun. Aynı anda benim Guardian'ım da olabilirsin. Yani passkey'inle gelecekte hesabımı kurtarmama yardım edersin. Co-signer olarak da wallet'a girebilirsin. Ya da biz bir şirketiz ve birlikte bir Multisig wallet istiyoruz.

Bunların hepsi farklı özellikler. Ama hepsi aynı frontend özelliğine dayanıyor. Herhangi bir Nuri kullanıcısını ekle, o kadar.

## Fee paylaşılıyor

Nuri'ye ödediğim fee'leri şimdilik yüzde 2,1 gibi bir şeye sabitliyoruz. Her ödeme yaptığımda, yarısı Nuri'ye, diğer yarısı da eklediğim kişiye gidiyor.

10 kullanıcı adı da ekleyebilirsin. O zaman 10 kişilik bir wallet'ın olur ve fee'ler 10'a bölünür. Yeni eklediğin herkes otomatik olarak pay alır ve Nuri onda birini alır.

Tabii birbirimizi de ekleyebiliriz, o zaman para bana geri döner. Orada bir loop yaratmamamız lazım. Bu tabii ki olmaz.

## Annem 17 Satoshi alıyor

Bitcoiner'lar başkalarını da Bitcoiner yapmak ister. Artık annemi davet edebilirim. Ve ben her ödeme yaptığımda o bir push notification alıyor. Az önce 20 Satoshi aldın. Az önce 17 Satoshi aldın.

Bunu kendimden biliyorum. Başka bir serviste her swap olduğunda bir Telegram mesajı alıyorum ve içinde az önce 10 Satoshi kazandığım yazıyor. Bu, kendim için yaşadığım en viral şey. Komik ve birbirimize biraz para vermiş oluyoruz.

Arkade ile 1, 2, 3, 4 veya 5 Satoshi'yi fee'siz gönderebiliriz. Bu da Arkade'in bu noktada ne kadar müthiş olduğunu gösteriyor.

## Decaying yerine Expanding Multisig

Eklediğimiz key'ler, Nuri'de normalde yaptığımızın tam tersini yapıyor. Baştan signer olmalarını istemiyorsak, bu bir Decaying Multisig değil, Expanding Multisig oluyor.

Yani tüm key'lerimi kaybedersem, bir süre sonra, bir yıl falan, Guardian'larımın key'leri otomatik olarak aktifleşiyor. Bitcoin'de bunu yapabilirsin. Ethereum'da muhtemelen daha zor olur ama o da kesin yapılır.

Ve tabii ki bunlar ayarlanabilir Settings'ler. Sırf bir yıl Bitcoin'ini hareket ettirmedin diye kimse parana erişmemeli.

## Guardian ve Miras

Guardian bir özellik. Bunu birebir Bitkey gibi yapmak isterim. Onlar bunu öyle bir şekilde yapmışlar ki, Guardian'ların key'ini kurtarmana yardım edebiliyor ama parana erişimleri yok. Bunu tam olarak nasıl yaptıklarına bakmamız lazım.

Diğer özellik Inheritance ve bu son derece önemli. Mesela kız kardeşimi varis olarak girmek istiyorum. Her ödeme yaptığımda bir counter sıfırlanıyor. Ve başıma bir şey gelirse, herhangi bir sebepten, ertesi gün uyanmazsam, bir yıl sonra otomatik olarak aktifleşiyor ve fonlarıma erişimi oluyor. Böyle bir şey aşırı önemli ve aşırı havalı.

## Fee frontend'de

Çok daha önemlisi, fee'nin nerede olduğu. Bugün onu provider'lardan alıyoruz ve bu bir hata. Provider'lardaki fee'yi her yerde sıfıra indirmeli ve biz almalıyız, frontend'de ya da backend'imizde. Nuri'nin arkasında on milyon provider olabilir, hiç fark etmez. Onlar kendi spread'lerini ve fee'lerini alırlar, biz onların üzerine hiçbir şey koymayız.

Böylece Nuri fee'si ile partner fee'sini birbirinden ayırabiliriz. Bu çok temiz. Ve insanlara open source kodda göstermek istiyorum, bak, işte fee, source code'da duruyor. Dünyanın en şeffaf şirketi olmamızı istiyorum.

Bunun için en sevdiğim hikaye, Aave topluluğundaki o büyük tepki, arka planda swap provider'ı değiştirildiğinde. Buradan görülüyor ki artık backend'lerin gücü yok, frontend'lerin var. Kullanıcıya sahip olan, moat'a da sahip olur.

## Fee'ni kendin belirle

İnsanların fee'yi kendilerinin belirlemesine bile izin veriyoruz. Sırf adalet için. Fee ödemek istemiyorsan, yüzde 0'a çekebilirsin. Ama istersen yüzde 21'e de çıkabilirsin. Ve biri sorarsa, neden yüzde 2 alıyorsunuz diye, deriz ki, Settings'e git ve değiştir.

Neden işe yarayacağına inanıyorum? Berlin'deki partilerimden. Hangi giriş ücretini alırsam alayım, biraya hangi fiyatı koyarsam koyayım, insanlar bunu hiçbir zaman cool bulmadı. Bir noktada dedik ki, fuck it, bira için bağış, giriş için bağış. Yaklaşık beş kat daha fazla para kazandık.

İnsanlara bunu kendilerinin belirleme imkanı verirsen, bazıları bunu ciddi şekilde yükseltir. Çünkü gamification'ı seviyorlar ya da misyona inanıyorlar. Zenginler ve fakirler var, pintiler ve diğerleri. Bir konferansta tanışıp hesabıma eklediğim insanlar için fee'mi yüzde 21'e koyarım. O zaman otomatik olarak benim split'imi alırlar.

## Her call küçük bir ödeme

Fee'yi nasıl alacağımızla ilgili daha iyi bir fikrim var. Nuri API'sini micropayment'larla gate'liyoruz ve micropayment'lar bizim fee'lerimiz oluyor. Uygulamadaki her işlem küçük bir x402 veya L402 ödemesine mal oluyor. Bitcoin ile ilgiliyse L402, kripto ile ilgiliyse x402.

Bir örnek. Nuri password manager'ında yeni bir şifre kaydetmek ya da okumak 0,1 sent ya da 1 sent tutuyor. Ve bunu doğrudan wallet'tan alabiliriz çünkü agentic. Router'da bunu zaten böyle yapıyorum. Onu bir token ile kullanabilirsin ya da call'lar için ödeme yaparsın ve her bir endpoint'e farklı bir fiyat verebiliriz.

O zaman kendi fee sistemi kurmana gerek kalmaz. Herkes API'mizi istediği yere entegre edebilir ve biz otomatik olarak payment'ları alırız. Kontaktbuch ile başlardım, her kişi eklediğinde 0,1 sent. Bu çalışırsa, tüm uygulamaya yayarız. Bir seferde bir özellik.

## Aile wallet'ı ve hardware wallet'lar

İnsanlar bir kez bizim şirket olarak sahip olduğumuz Safe wallet'ın nasıl çalıştığını gördüğünde, bunu gerçekten cool buluyorlar. Benim bir anahtarım var ama ödeme ancak birlikte yapabiliriz. Bu gerçekten müthiş bir crypto deneyimi.

Ya da bir aile wallet'ı. Annem, kız kardeşim ve ben. İkimiz birlikte ödeme yapmaya yeteriz. Multisig'i kimse hayal edemez. Ama üç kişiyiz ve bir hardware wallet'ız demek, ya da beş kişiyiz ve bir AI'ız demek, bunu herkes anlar.

Ve kimsenin başaramadığı o prensibe sadık kalıyoruz. One-Click-Face-ID wallet. Seedless, seed phrase yok, phishing'e dayanıklı, varsayılan olarak Multisig.

## İlk adım

Çok yavaş ilerliyoruz. İlk adım sadece şu, Settings'te bir arkadaşımı Padawan'ım olarak ekleyebilirim ve o otomatik olarak bir şey alır. Sonra veritabanımızda kimin kimi eklediğini ve hangi swap'ların olduğunu görürüz ve referral'ları öderiz.

Ve bir şey gönderdiğinde, tüm Nuri kullanıcılarının autocomplete'i olmalı. Sadece kişilerin değil, hepsinin. L yazıyorum ve L ile başlayan herkesi buluyorum, PayPal'daki gibi.

Sonra key rotation, key ekleme ve silme ve bir hardware wallet geliyor. Bunları zaten hepsini yapmamız gerekiyor. Ama vizyon olarak bu, bence, kesinlikle mükemmel. Çünkü öyle çılgın viral bir özellik ki, diğerinin kazancından pay alabiliyorsun ya da onun co-signer'ı oluyorsun.
