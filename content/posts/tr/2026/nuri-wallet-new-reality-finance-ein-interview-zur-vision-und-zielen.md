---
title: "Nuri Wallet, New Reality Finance. Vizyon ve hedefler üzerine bir söyleşi"
description: "Yeni Nuri hakkında kendimle yaptığım söyleşi"
date: "2026-05-05T10:02:55.416Z"
updated: "2026-05-05"
lang: tr
translated_from: "de/nuri-wallet-new-reality-finance-ein-interview-zur-vision-und-zielen"
source_sections: ["ziel-und-zielgruppe", "technik-und-sicherheit", "bezahlen-und-warum-nuri-keine-bank-ist", "forschung-open-source-und-ki", "wie-nuri-geld-verdient"]
category: nuri
format: note
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tldr: ["Yeni Nuri hakkında kendimle bir söyleşi.", "Passkey'ler anahtarları üretiyor ve senden başka kimse parana ulaşamıyor, Nuri bile.", "Nuri bir banka değil, bir Money Browser. Açık kaynak ve hâlâ bir araştırma projesi."]
sections: [{"basically": "Herkes dijital paraya banka hesabı olmadan ve üçüncü taraflar olmadan kendisi sahip olabilmeli."}, {"basically": "Passkey'ler anahtarları PRF üzerinden üretiyor, tek bir şifre yerine birden fazla sisteme dağıtılmış halde."}, {"basically": "Visa ve IBAN ortaklar üzerinden yürüyor. Biri çökerse paran yine de senin Wallet'ında kalıyor."}, {"basically": "Kurtarma, miras ve Post-Quantum hâlâ çözülmedi. Açık kod, güveni doğrulanabilir kılıyor."}, {"basically": "Hesap ücreti yok. Uygulamada takas yaptığında küçük bir ücretten kazanıyoruz."}]
---
Kendimle yeni Nuri üzerine bir röportaj

## Amaç ve hedef kitle

Nuri'nin temel amacı ne?

Dijital sahipliği Face ID kadar kolay, kasa kadar güvenli hale getiriyoruz. Amacımız şu: dünyadaki herkes dijital parayı (Bitcoin ya da dijital euro gibi) kendisi sahiplenip yönetebilsin. Teknik engeller olmadan, banka hesabı olmadan ve kontrolü üçüncü taraflara vermeden.

"Kendi kendine saklama" (Self-Custody) basit bir dille ne demek?

Cebindeki dijital nakit gibi düşün. Banka hesabında paranı banka yönetir, Nuri'de ise kriptografik anahtarlar sadece sende. Kimse, Nuri bile, hesabını donduramaz ya da parana erişemez.

Nuri kimin için?

Herkes için. Ama özellikle klasik bankacılığa erişimi olmayanlar için çok değerli, mesela mülteciler ya da altyapısı zayıf ülkelerde yaşayanlar. Bir de dijital varlıkları üzerinde tam kontrolü geri kazanmak isteyen güvenlik bilinci yüksek kullanıcılar için.

## Teknik ve güvenlik

Nuri'nin teknik olarak asıl yeniliği ne?

Passkey'leri (WebAuthn) sadece giriş için değil, kriptografik anahtar üretmek için de kullanıyoruz, yani asıl amacının dışına taşıyoruz. Pseudo-Random-Function (PRF) denen şey üzerinden biyometrik verinden (Face ID/parmak izi) güvenli "secret"lar türetiyoruz. Bunlarla blockchain üzerinde işlem imzalayabiliyorsun.

Sistem hack'lere karşı ne kadar güvenli?

Multi-Key mimarisiyle çalışıyoruz. Erişimin tek bir şifreye değil, dağıtılmış birden fazla anahtara dayanıyor, mesela biri telefonunda, biri bir backup sunucusunda. Saldırganın erişim kazanması için birden fazla sistemi aynı anda ele geçirmesi lazım. Merkezi bir kullanıcı veritabanı tutmadığımız için büyük çaplı veri sızıntılarına hedef olacak merkezi bir nokta da yok.

Telefonumu kaybedersem ne olur?

Bu, araştırmamızın merkezindeki konulardan biri. Anahtar rotasyonu ve kurtarma mekanizmaları geliştiriyoruz. Kaybolan cihazları kilitleyebilir, erişimi backup anahtarları ya da alternatif doğrulama yollarıyla geri alabilirsin. Üstelik kendi kendine saklama bundan hiç zarar görmeden.

## Ödeme ve Nuri'nin neden banka olmadığı

Nuri ile markette de ödeme yapabilir miyim?

Evet. Paran kendi Wallet'ında güvenle dururken, partnerler üzerinden klasik finans dünyasına köprüler sunuyoruz. Bir Visa partneri kart ödemelerini ve Apple Pay'i mümkün kılıyor. Bir IBAN partneri (mesela Monerium) doğrudan Wallet'tan SEPA havalelerine izin veriyor, kira ödemesi gibi. Güzel tarafı şu: bir partner çökerse paran yine de Wallet'ında güvende kalır. Sadece o ek özellik kaybolur.

Nuri bir banka mı?

Hayır. Nuri daha çok bir "Money Browser". Merkeziyetsiz ağlarla (blockchain'ler) doğrudan etkileşmeni sağlayan teknolojiyi biz sağlıyoruz. Para saklamıyoruz ve varlığın üzerinde hiçbir kontrolümüz yok.

## Araştırma, açık kaynak ve yapay zeka

Bu proje neden bir araştırma projesi?

Mutlak kullanıcı dostu olma (seed phrase ezberlemek yok!) ile gerçek, merkeziyetsiz self-custody'nin bir araya gelmesi teknik olarak hâlâ çözülmemiş bir mesele. Merkezi bir otorite olmadan güvenli kurtarma mekanizmaları üzerinde çalışıyoruz. Miras çözümleri üzerinde çalışıyoruz, yani mirasçıların belli bir hareketsizlik süresinin ardından varlıklara güvenli şekilde nasıl erişebileceği üzerine. Bir de post-quantum güvenliği üzerinde çalışıyoruz, yani gelecekteki kuantum bilgisayar saldırılarına karşı koruma.

Nuri neden açık kaynak?

Güven doğrulanabilir olmalı. Kaynak kodumuzu açarak dünyanın her yerinden uzmanların kriptografimizin vaat ettiğini gerçekten tuttuğundan emin olmasını sağlıyoruz. Ayrıca bu sana şunu garanti ediyor: Nuri şirketi bir gün ortadan kalksa bile paranı yine yönetebilirsin.

Yapay zeka Nuri'nin geleceğinde ne rol oynuyor?

"Agent-Economy"nin yolunu hazırlıyoruz. Gelecekte yapay zeka asistanları senin adına ödemeler hazırlayabilecek ya da faturaları kontrol edebilecek. Güvenli imza altyapımız sayesinde son kontrol her zaman sende kalıyor. Yapay zeka önerir, ama ödemeyi Face ID ile son onaylayan sensin.

## Nuri nasıl para kazanıyor

Hesap ücreti yoksa Nuri nasıl para kazanıyor?

Konfor hizmetlerinden kazanıyoruz. Uygulama içinde para birimi çevirirsen (mesela Bitcoin'den euroya) küçük bir servis ücreti alınıyor. Yani paranın saklanması için değil, rahatlık ve sorunsuz entegrasyon için ödüyorsun.

"Dijital sahiplik, Face ID kadar kolay ve nakit kadar bağımsız."
