---
title: "Nuri: Finansın Yeni Gerçekliği Vizyonu"
description: "Nuri.com'un vizyonu ve hedefi hakkında kısa bir SSS. Self-custody ne demek, passkey'ler paranı nasıl korur ve Nuri nasıl para kazanır."
date: "2026-05-05T10:04:17.053Z"
updated: "2026-05-05"
lang: tr
translated_from: "en/nuri-new-reality-finance-vision"
source_sections: ["mission-and-who-it-is-for", "technology-and-security", "paying-and-why-nuri-is-not-a-bank", "research-open-source-and-ai", "how-nuri-makes-money"]
category: nuri
format: note
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tldr: ["Nuri, dijital sahipliği Face ID kadar kolay ve fiziksel bir kasa kadar güvenli hale getirmek istiyor, dünyadaki herkes için.", "PRF uzantılı passkey'ler anahtarları üretir ve onları sen tutarsın. Nuri bir Money Browser, banka değil.", "Nuri, swap'lerdeki küçük servis ücretlerinden para kazanır, paranı saklamaktan değil."]
sections: [{"basically": "Kendi cebinde dijital nakit. Kimse, Nuri bile, onu donduramaz."}, {"basically": "Passkey'in anahtarları üretir, birkaç anahtar erişimi korur ve kaybolan telefonlar bir Ar-Ge odağı."}, {"basically": "Visa, Apple Pay ve SEPA ortaklar aracılığıyla, paran kendi Wallet'ında kalırken."}, {"basically": "Açık kaynak, yani herkes denetleyebilir. AI bir ödeme önerebilir, yine de onaylayan sensin."}, {"basically": "Swap yaptığında küçük bir ücret ödersin, kolaylık için, paranı saklamak için asla."}]
---
# Emin Mahrt'nin Gözünden Nuri.com'un Vizyonu ve Hedefleri Üzerine Kısa Bir SSS

## Misyon ve Nuri kimin için?

Nuri'nin temel misyonu ne?

Dijital mülkiyeti Face ID kadar kolay ve gerçek bir çelik kasa kadar güvenli hale getiriyoruz. Amacımız, teknik engellere takılmadan, bir banka hesabına ihtiyaç duymadan ve kontrolü üçüncü taraflara kaptırmadan, dünyadaki herkesin Bitcoin veya dijital Euro gibi dijital varlıklara sahip olmasını ve bunları yönetmesini sağlamak.

En basit haliyle self-custody ne anlama geliyor?

Self-custody, cebinde dijital nakit para taşımak gibi bir şey. Paranın bankanın yönettiği o geleneksel banka hesaplarının aksine, Nuri ile kriptografik anahtarlar sadece sende durur. Hiç kimse, Nuri bile, hesabını donduramaz ya da parana el süremez.

Nuri kimin için yapıldı?

Herkes için. Geleneksel bankacılık sistemine erişimi olmayan mülteciler veya zayıf finansal altyapıya sahip ülkelerdeki insanlar için biçilmiş kaftan. Aynı zamanda dijital varlıklarının kontrolünü tamamen eline almak isteyen, güvenliğe önem veren kullanıcılar için de öyle.

## Teknoloji ve güvenlik

Nuri'nin arkasındaki asıl teknik yenilik ne?

Passkey teknolojisini (WebAuthn) sadece giriş yapmak için değil, kriptografik anahtarlar üretmek için de kullanıyoruz. Passkey'in Pseudo-Random-Function (PRF) özelliğini kullanarak biyometrik verilerinden, yani Face ID veya parmak izinden güvenli sırlar türetiyoruz. Bu sayede blokzincir işlemlerini doğrudan cihazının güvenli donanımı üzerinden imzalayabiliyorsun.

Sistem hacklenmelere karşı nasıl korunuyor?

Çoklu anahtar mimarisi kullanıyoruz. Sisteme erişim tek bir şifreye değil, farklı yerlere dağıtılmış birden fazla anahtara bağlı. Mesela biri akıllı telefonunda, diğeri ise bir kurtarma yapısında durur. Bir saldırganın içeri sızabilmesi için aynı anda birden fazla bağımsız sistemi ele geçirmesi gerekir. Üstelik merkezi bir kullanıcı veritabanı tutmadığımız için, büyük veri sızıntılarına yol açacak ortada bir bal küpü falan da yok.

Peki akıllı telefonumu kaybedersem ne olacak?

Ar-Ge ekibimizin odaklandığı ana konulardan biri tam olarak bu. Anahtar döndürme ve kurtarma mekanizmaları üzerinde çalışıyoruz. Kaybolan cihazları kilitleyebilir, self-custody prensibinden asla ödün vermeden yedek anahtarlar veya diğer doğrulama yöntemleriyle erişimini geri kazanabilirsin.

## Ödeme yapmak ve Nuri'nin neden bir banka olmadığı üzerine

Nuri ile mahalledeki bakkaldan alışveriş yapabilir miyim?

Evet. Paran senin kontrolündeki wallet içinde kalır, biz de ortaklarımız aracılığıyla geleneksel finans dünyasına köprüler kurarız. Visa ortakları kartla ödemeleri ve Apple Pay'i mümkün kılar. IBAN ortakları ise kiranı ödemek gibi işler için doğrudan wallet üzerinden SEPA transferi yapmanı sağlar. İşin en güzel yanı da şu: bir partner batarsa veya sorun yaşarsa sadece o belirli özellik devre dışı kalır. Paran güvende kalır ve wallet içinden parana her an ulaşabilirsin.

Nuri bir banka mı?

Hayır. Nuri bir "Para Tarayıcısı", yani bir Money Browser. Merkeziyetsiz ağlarla (blokzincirlerle) doğrudan etkileşime girmeni sağlayan teknolojiyi sunuyoruz. Mevduatlarını biz tutmuyoruz, varlıkların üzerinde hiçbir kontrolümüz yok.

## Araştırma, açık kaynak ve yapay zeka

Bu proje neden bir Ar-Ge girişimi?

Kullanım kolaylığını, yani aklında tutman gereken hiçbir seed phrase olmadan, gerçek merkeziyetsiz self-custody ile birleştirmek teknik açıdan büyük bir meydan okuma. Araştırmalarımız üç şeye odaklanıyor: Merkeziyetsiz kurtarma, yani merkezi bir otorite olmadan erişimi geri alma. Miras bırakma, yani belirli bir hareketsizlik süresinden sonra mirasçıların varlıklara erişebilmesi. Ve kuantum sonrası hazırlık, yani dijital imzaları gelecekteki kuantum bilgisayarlarının yaratacağı tehditlere karşı korumak.

Nuri neden açık kaynak?

Güven doğrulanabilir olmalı. Kaynak kodumuzu herkese açarak dünyadaki tüm uzmanların kriptografimizi denetlemesini sağlıyoruz. Ayrıca bu sayede, yarın bir gün şirket olarak Nuri ortadan kalksa bile fonlarına her zaman erişebileceğin garanti altına alınıyor.

Yapay zeka Nuri'nin geleceğinde nerede duruyor?

Ajan Ekonomisinin, yani Agent Economy'nin yolunu açıyoruz. Gelecekte yapay zeka asistanları senin yerine ödemeleri hazırlayabilir veya faturaları kontrol edebilir. Güvenli imza altyapımız sayesinde son kontrol her zaman sende kalır. Yapay zeka işlemi önerir, sen ise basit bir Face ID ile onaylarsın.

## Nuri nasıl para kazanıyor?

Hesap ücreti falan yoksa Nuri nasıl para kazanıyor?

Kolaylık sağlayan servisler üzerinden para kazanıyoruz. Uygulama içinde para birimlerini swap ettiğinde, mesela Bitcoin'i Euro'ya çevirdiğinde, ufak bir servis fee alınır. Paranı sakladığımız için değil, sunduğumuz kolay entegrasyon ve zahmetsiz kullanım için ödeme yaparsın.

"Face ID kadar kolay, nakit para kadar özgür dijital mülkiyet."
