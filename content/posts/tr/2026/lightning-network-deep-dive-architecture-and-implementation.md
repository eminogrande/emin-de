---
title: "Lightning Network derinlemesine: mimari ve uygulama"
description: "Laolu \"Roasbeef\" Osuntokun'un Lightning kanalları, HTLC'ler ve LND'nin gerçekte nasıl çalıştığı ile Flare'in yönlendirmeyi nasıl ölçeklendirebileceği üzerine konuşmasının bir özeti."
date: "2026-02-06T22:25:01Z"
updated: "2026-02-06"
lang: tr
translated_from: "en/lightning-network-deep-dive-architecture-and-implementation"
source_sections: ["channels-revocation-and-htlcs", "how-nodes-talk-and-how-lnd-gets-fast", "inside-lnd", "routing-and-flare"]
category: bitcoin
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/lightning-network-deep-dive-architecture-and-implementation/cover.webp"
third_party_summary: true
tldr: ["Laolu \"Roasbeef\" Osuntokun, Lightning kanallarının, iptal mekanizmasının ve HTLC'lerin nasıl çalıştığını ve LND'nin nasıl inşa edildiğini anlatıyor.", "Pipelining ve toplu işlem sayesinde LND tek bir kanalda saniyede 1.000 işleme ulaşıyor, öyle diyor.", "Flare, yerel bilgiyi işaretçi node'larla birleştiren bir yönlendirme fikri; böylece bir telefonun tüm haritaya ihtiyacı kalmıyor."]
sections: [{"basically": "Bir kanal 2-of-2 multisig'dir. İptal mekanizması hile yapanları cezalandırır, HTLC'ler ise ödemeleri bir gizli anahtarla yönlendirir."}, {"basically": "Node'lar asenkron bir taahhüt protokolü konuşur, güncellemeleri tek bir imza altında toplar ve havada olan güncellemeleri sınırlar."}, {"basically": "LND Go ile yazılmış ve RPC sunucusu, cüzdan, zincir bildiricisi, HTLC anahtarı ve ihlal hakemi olarak bölünmüştür."}, {"basically": "İmzalı kanal duyuruları spam'i durdurur; Flare ise yakındaki node'ları uzak işaretçilerle birleştirerek yollar bulur."}]
---
Laolu "Roasbeef" Osuntokun'un konuşmasının özeti. Köşeli parantez içindeki zamanlar, konuşmadaki yeri gösteriyor.

[00:00:26] Konuşma, Lightning'in üst düzey fikrini geçip işin aslında nasıl yürüdüğüne iniyor. Laolu, commitment protokollerini, Lightning Network Daemon'un (LND) nasıl kurulduğunu ve routing'in Flare denen bir şeyle nereye gidebileceğini anlatıyor.

## Kanallar, iptal ve HTLC'ler

[00:01:27] Her şey, iki yönde de çalışan bir ödeme kanalıyla başlıyor. Kanal, aslında Bitcoin blok zinciri üzerinde 2-of-2 multisig bir emanet hesabı. İki kişi bu funding transaction'a para koyuyor. Onaylandıktan sonra, zincir dışında istedikleri kadar işlem yapabiliyorlar. Sadece paranın aralarında nasıl bölüşüldüğünü güncelliyorlar ve ana blok zinciri bunu hiç görmüyor.

[00:01:51] Bunun güvenli olması için Lightning'in malleability'ye bir çözüm gerekiyor, SegWit gibi. O olmadan, biri funding transaction'ın ID'sini onaylanmadan önce değiştirebilir. O zaman commitment transaction'lar, yani paranı geri almanı sağlayanlar, artık geçerli olmaz ve para sonsuza dek takılı kalabilir.

[00:03:01] Zincir dışı işlemler sadece sözden ibaret, o yüzden birinin elinde daha fazla para olan eski bir durumu yayınlamasını engellemenin bir yolu olmalı. Lightning bunu revocation ile yapıyor. Her yeni durumda, eski durum gizli bir anahtar paylaşılarak iptal ediliyor. Bir taraf hile yapmaya kalkıp eski bir durumu yayınlarsa, dürüst taraf o sırrı kullanıp ceza olarak kanaldaki paranın tamamını anında alabiliyor.

[00:04:42] Doğrudan kanalın olmadığı birine ödeme yapmak için ağ, Hash Time-Locked Contract'ları (HTLC) kullanıyor. Ödeme, bir zincir boyunca insanlar arasında kilitleniyor. Alıcı parayı ancak bir sır göstererek alabiliyor, preimage'i. Onu kendinden öncekine gösterdiğinde, o kişi de bir öncekine gösterebiliyor ve böylece ilk gönderenin ödemesi kapatılana kadar devam ediyor.

## Node'lar nasıl konuşuyor ve LND nasıl hızlanıyor

[00:13:33] Sonra Laolu, Lightning Commitment Protocol'e (LCP) giriyor. Bu, node'ların birbirleriyle eşler arası konuşmak için kullandığı dil. HTLC ekliyor, kaldırıyor ve yeni durumları imzalıyor. Ve asenkron, yani bir sonrakine başlamadan önce bir ödemenin bitmesini beklemek zorunda değilsin.

[00:14:14] Gerçek hız için LND pipelining yapıyor. Bir kanala aynı anda bir sürü ödeme güncellemesi girebiliyor. Node'lar bu güncellemeleri tek bir imza altında toplayabiliyor, bu da işlem gücünden tasarruf sağlıyor ve tek bir kanalın saniyede daha fazla işlem yapmasına izin veriyor.

[00:16:02] Biraz internetteki TCP gibi çalışıyor. Lightning'de, bir eşin cevap almadan havada kaç durum güncellemesi tutabileceğini sınırlayan bir pencere var. Yani bir node, diğerini kaldırabileceğinden fazla güncellemeyle boğamıyor. Buna revocation penceresi deniyor.

## LND'nin içi

[00:21:53] LND, Go ile yazılmış. Laolu Go'yu seçmiş çünkü goroutine'ler ve channel'larla eşzamanlılıkta çok iyi ve aynı anda binlerce ödeme isteğin olduğunda bu çok uyuyor. Ayrıca karmaşık ağ işlerini temiz bir şekilde yapmanı sağlıyor.

[00:25:24] İçeride daemon birkaç parçaya bölünmüş. RPC Server, kullanıcılardan gRPC veya REST üzerinden istek alıyor. Wallet Controller, asıl Bitcoin anahtarlarını ve zincir üstü işlemleri yönetiyor. Chain Notifier, kanal kapanması gibi şeyler için blok zincirini izliyor. HTLC Switch, node'un içinde bir router gibi ve ödemeleri bir kanaldan diğerine taşıyor. Ve Breach Arbiter güvenlik kısmı. Hile yapmaya çalışan birini gözlüyor ve ceza işlemlerini kendi kendine gönderiyor.

[00:28:16] Sonra New York'taki bir node ile San Francisco'daki bir node arasında canlı bir demo var. Laolu, neredeyse anında binlerce mikroödeme geçirebildiğini gösteriyor. [00:35:45]'te mevcut implementasyonun tek bir kanalda saniyede 1.000 işleme (TPS) ulaştığını söylüyor. Bu, altındaki Bitcoin blok zincirinden çok daha hızlı.

## Routing ve Flare

[00:40:04] Bir alıcıya giden yolu bulmak için node'ların ağın topolojisini bilmesi gerekiyor. Node'lar, blok zincirinde gerçek bir kanalları olduğunu kanıtlamak için duyuru imzaları yayıyor. Bu, spam node'ların ağı sahte routing bilgisiyle doldurmasını engelliyor.

[00:42:31] Ağ büyüdüğünde, hiçbir telefon artık haritanın tamamını bilemez. O yüzden Laolu, Flare'i anlatıyor; yerel bilgiyi, yani yanımda kim var, uzaktaki bilinen node'lar olan beacon'larla birleştiren bir routing algoritması. Böylece bir node, gigabaytlarca harita verisi saklamadan tüm küresel ağda bir yol bulabiliyor.

![image](../../../media/lightning-network-deep-dive-architecture-and-implementation/image.png)
