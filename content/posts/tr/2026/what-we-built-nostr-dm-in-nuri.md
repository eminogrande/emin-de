---
title: "Nuri'ye neler ekledik: Nostr DM"
description: "Nuri'nin içine şifreli, birebir bir sohbet özelliği gömdük. Nostr relay'leri üzerinden çalışıyor ve kimliğini halihazırda kullandığın cüzdan anahtarından alıyor."
date: "2026-01-15T19:40:01Z"
updated: "2026-01-15"
lang: tr
translated_from: "en/what-we-built-nostr-dm-in-nuri"
source_sections: ["keys-from-the-wallet", "encryption", "sending-and-receiving", "catching-up-on-missed-messages", "relays", "the-chat-screen-and-support", "what-end-to-end-means-here", "limits-and-next-steps"]
category: nuri
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/what-we-built-nostr-dm-in-nuri/cover.webp"
tldr: ["Nuri'ye, halka açık Nostr relay'leri üzerinden çalışan şifreli bir birebir sohbet özelliği ekledik.", "Nostr anahtarı, cüzdanın Bitcoin anahtarından türetiliyor; yani aynı cüzdan her zaman aynı npub'ı veriyor.", "Mesajlar NIP-44 v2 şifrelemeli NIP-17 gift wrap kullanıyor; relay'ler sadece şifreli veri bloklarını görebiliyor.", "Gönderen doğrulaması ve arka planda mesaj iletimi henüz hazır değil."]
sections: [{"basically": "Aynı Bitcoin anahtarı, aynı npub. Nostr anahtarı HKDF ile türetiliyor ve Keychain'de saklanıyor."}, {"basically": "NIP-44 v2 şifrelemeli NIP-17 gift wrap kullanıyoruz: relay'ler sadece alıcının açabileceği veri paketlerini görüyor."}, {"basically": "Gift wrap'ler tüm açık relay'lere gönderiliyor, 1059 türü etkinlikler ise tekilleştirilip şifreleri çözülüyor."}, {"basically": "Her sohbet için bir last_seen zaman damgası var, böylece sen uygulamada yokken gelen mesajlar sohbeti açınca yükleniyor."}, {"basically": "Varsayılan olarak üç halka açık relay tanımlı, yani altyapı derdimiz yok. Bağlantılar sadece sohbet açıkken canlı kalıyor."}, {"basically": "Destek hesabı sabitlenmiş, minimalist bir sohbet listesi hazırladık. Mesajlar sadece bellekte tutuluyor."}, {"basically": "İçerik forward secrecy ile güvende olsa da gönderen kısmını taklit etmek teknik olarak hâlâ mümkün."}, {"basically": "Push bildirimi ve kendi relay'imiz henüz yok. Sırada: gönderen doğrulaması için imzalı mesajlar ve arka planda mesaj iletimi var."}]
---
![](../../../media/what-we-built-nostr-dm-in-nuri/cover.jpg)

Nuri'ye basit bir birebir sohbet özelliği ekledik. Şifreli, Nostr relay'leri üzerinden çalışıyor ve doğrudan uygulamanın içinde. Nostr kimliğini kullanıcının cüzdanında halihazırda var olan anahtarlardan türetiyoruz. Kodların ana merkezi `screens/BitcoinDebugModal.tsx`, sohbet ekranı ise `components/NostrChatModal.tsx` dosyasında. Destek hattı `npub1r7y83c4w57jc8skud7e4m6x9qt9g7s6zel6mnvj64lh00lc7tynsdx89vj` olarak hard-coded yapıldı.

## Cüzdandan gelen anahtarlar

Cihazdaki Bitcoin private key'inden deterministik bir Nostr anahtar çifti üretiyoruz. Eğer Bitcoin key'i yoksa Ethereum key'ine dönüyoruz, o da yoksa rastgele bir tane alıyoruz. Nostr private key'i güvenli depolamada duruyor ve fabrika ayarlarına dönüldüğünde siliniyor.

Türetme işini `sha256(btcKey)` üzerinde HKDF-SHA256 ile yapıyoruz, sabit bir salt ve info ile. Ayrıca anahtarın geçerli olduğunu kontrol eden bir retry döngümüz var. Kodu `lib/nostr/nostr.ts` içinde. Anahtar, biyometrik doğrulama ile Keychain'de tutuluyor (`NOSTR_KEY_ID`).

Yani aynı Bitcoin key'i her zaman size aynı Nostr npub'ını veriyor. Fabrika ayarlarına döndüğünüzde yerel anahtar siliniyor, yeni cüzdan key'i ise size yeni bir npub veriyor. `components/NostrChatModal.tsx` içindeki giriş satırında kendi npub'ınızın sonunu görebilirsiniz, üstüne basınca tamamını kopyalıyor.

## Şifreleme

NIP-17 gift wrap ve NIP-44 v2 şifrelemesi kullanıyoruz, yani XChaCha20-Poly1305. Relay'ler sadece şifreli veri yığınları görüyor ve bunları sadece alıcının private key'i açabiliyor.

Akış `lib/nostr/nostr.ts` içinde. Önce mesajın kendisi ve gönderenin pubkey'i ile bir "rumor" (kind 14) oluşturuyoruz. Sonra bu rumor'ı rastgele bir seal key ile (NIP-44) alıcıya göre şifreleyip kind 13 olarak imzalıyoruz. Daha sonra bu seal'ı rastgele bir wrap key ile (NIP-44) yine alıcıya göre şifreleyip, kind 1059 yani gift wrap olarak imzalıyor ve `["p", recipientPubkey]` etiketini ekliyoruz. Relay'lere giden o dıştaki gift wrap (kind 1059) oluyor ve bunu sadece alıcı deşifre edebiliyor.

NIP-44 kısmı da `lib/crypto.ts` içinde. ECDH paylaşılan gizli anahtar (shared secret) secp256k1 key'lerinden geliyor. NIP-44 key'ini `HKDF(SHA256(x-only-shared-secret), info="nip44-v2")` olarak türetiyoruz. Payload ise XChaCha20-Poly1305 ve rastgele 24-byte'lık bir nonce ile şifreleniyor.

Şu an gönderenin uzun vadeli gizli anahtarı rumor'ı imzalamak için kullanılmıyor. Yani içerik uçtan uca gizli ama gönderen kimliği kriptografik olarak kanıtlanmıyor. İsteyen herkes rumor içine sahte bir pubkey yazabilir. Kimliği doğrulanmış bir gönderen istiyorsak rumor'ı imzalamalıyız ya da doğrulaması içinde olan bir NIP-44 DM akışına geçmeliyiz. `lib/nostr/nostr.ts` içindeki tek gerçek güvenlik açığı şu an bu.

## Gönderme ve alma

Gönderme işlemi `components/NostrChatModal.tsx` içinde oluyor. Alıcı pubkey'ini kontrol edip kendinize mesaj atmanızı engelliyoruz. Sonra `createNip17GiftWrap` ile gift wrap'i oluşturup her açık relay WebSocket'i üzerinden `["EVENT", giftwrap]` gönderiyoruz. Göndereni, alıcıyı, event id'sini, mesaj uzunluğunu ve relay'lerin ne onayladığını log'luyoruz. Arayüz, giden mesajı anında yerel state'e ekliyor.

Alım işlemi de yine `components/NostrChatModal.tsx` içinde. Pubkey'imizle eşleşen #p etiketli kind 1059'lara abone oluyoruz. Aynı event id'li olanları eliyoruz ve `openNip17GiftWrap` ile deşifre ediyoruz. Sonra rumor içeriğini ve gönderen pubkey'ini alıp gelen mesaj olarak gösteriyoruz. Gönderen kişi otomatik olarak rehberinize ekleniyor.

## Kaçırılan mesajları yakalama

Ayrıca yokken kaçırdığınız mesajları çeken hafif bir "catch-up" akışı ekledik. Keychain'de her pubkey için bir `last_seen` timestamp tutuyoruz (`lib/nostr/storage.ts` içinde `NOSTR_LAST_SEEN_CACHE_KEY`). Her relay aboneliğinde filtreye `since = last_seen - 60s` ekliyoruz, böylece son mesajlar tamamlanıyor. Bu iş `components/NostrChatModal.tsx` içinde, `services/factoryReset.ts` ise fabrika ayarlarında önbelleği (cache) siliyor.

## Relay'ler

Varsayılan olarak küçük bir public relay listesi kullanıyoruz, o yüzden şimdilik hiçbir altyapıya gerek yok. Varsayılanlar `wss://relay.damus.io`, `wss://relay.primal.net` ve `wss://nostr21.com`. WebSocket bağlantıları sohbet modalı açılınca başlıyor, kapanınca bitiyor. Uygulama kapalıysa veya internet yoksa gerçek zamanlı mesajlaşma duruyor, ancak catch-up relay'lerde mesaj durduğu sürece çalışıyor.

## Sohbet ekranı ve destek

Arayüz minimal ve uygulamanın tasarımına uygun. Sohbet listesi Özel Destek, Grup Desteği (kapalı) ve rehberinizdeki kişileri gösteriyor, altında en son mesaj ve tarih/saat var. Açık bir sohbetin başlığı alıcı npub'ının son 5 karakteri ve yanında kopyalama ikonu var. Geri link'i sadece bir yazı, "< geri" şeklinde ve altı çizili ki belirgin olsun. Mesaj yazma alanı tek satırlık ve içinde gönder ikonu var, klavyedeki "Gönder" tuşuyla da gönderebiliyorsunuz. "Sen" etiketini kaldırdık. Sadece kendi npub'ınızın sonu görünüyor, basınca kopyalıyor. Bunların hepsi `components/NostrChatModal.tsx` içinde.

Destek hattı hard-coded ve destek ekibi dışındaki herkes onu görüyor. Destek npub'ı `screens/BitcoinDebugModal.tsx` dosyasında tanımlı. Eğer npub'ınız destek npub'ıysa, destek sohbeti gizleniyor ve kendinize mesaj atmanız engelleniyor.

Sadece ihtiyacımız olanı tutuyoruz. Rehber önbelleği Keychain'de `@cache:nostr_contacts`, `last-seen` önbelleği ise yine Keychain'de `@cache:nostr_last_seen`. Mesajlar sadece bellekte (memory) duruyor, yani modal'ı kapatınca veya uygulamayı yeniden başlatınca siliniyorlar. Fabrika ayarlarına dönmek tüm bunları ve Nostr private key'ini temizliyor (bkz. `services/factoryReset.ts`).

## Burada uçtan uca ne anlama geliyor

İçerik gizli. Relay'ler asla düz metni görmüyor ve sadece özel anahtara sahip olan alıcı deşifre edebiliyor. "Forward secrecy" de var çünkü her mesaj yeni seal ve wrap key'leri kullanıyor. Henüz sahip olmadığımız şey ise kimlik doğrulama. Rumor imzalanmadığı için gönderen kimliği sahte olabilir.

## Limitler ve sonraki adımlar

Şu an için bir altyapıya gerek yok. Eğer daha güvenilir olsun isterseniz kendi relay'inizi kurup listeye eklersiniz. Push bildirimleri yok, yani catch-up'ı sohbeti açtığınızda yapıyoruz. Ayrıca mesajın ulaşıp ulaşmaması relay'lerin mesajı ne kadar süre tuttuğuna bağlı, çünkü bazı relay'ler DM'leri siliyor.

Sırada imzalı rumor ile gönderen kimlik doğrulaması ve arka planda mesajlaşma var. İkisi de sadece küçük değişiklikler gerektiriyor, onları da hallederiz.
