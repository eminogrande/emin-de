---
title: "Durumsuz Bitcoin multisig ve farklı anahtar türetme stratejileri"
description: "Passkey MuSig2 Bitcoin cüzdanında sunucunun ortak imza anahtarını türetmesinin iki yolu, neden farklı adresler ürettikleri ve nasıl geçiş yapabileceğiniz."
date: "2025-12-09T15:15:01Z"
updated: "2025-12-09"
lang: tr
translated_from: "en/stateless-bitcoin-multisig-divergent-key-derivation-strategies"
source_sections: ["architecture-a-pure-prf", "architecture-b-anchored-in-a-secret", "the-problem-deterministic-divergence", "three-ways-to-migrate", "the-trade-off"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/stateless-bitcoin-multisig-divergent-key-derivation-strategies/cover.webp"
tldr: ["Passkey MuSig2 Bitcoin cüzdanları sunucunun ortak imza anahtarını iki şekilde türetebilir: saf PRF ya da sunucu sırrı artı istemci kimliği.", "İki fonksiyon aynı kullanıcı için farklı anahtarlar üretir, yani aynı cüzdan farklı adreslerle sonuçlanır.", "Geçiş için üç yol var: protokol adaptörü, istemci köprüsü ya da adres rotasyonlu hard fork."]
sections: [{"basically": "Her iki anahtar da yalnızca istemcinin passkey PRF'sinden geliyor. Sunucu hiç durum tutmuyor."}, {"basically": "Sunucu anahtarı statik bir sunucu sırrını istemci kimliğiyle karıştırıyor. Artık sunucu durum tutuyor."}, {"basically": "Aynı kullanıcı, iki türetme fonksiyonu, iki farklı anahtar. Eski adresler yenileriyle eşleşmiyor."}, {"basically": "Sunucuda dallan, istemciden parametre enjekte et ya da herkesi yeni adreslere döndür."}, {"basically": "İstemci entropisiyle kurtarma daha kolay. Hibrit entropi zorlamaya karşı daha dayanıklı. İkisine birden sahip olamazsın."}]
---
![](../../../media/stateless-bitcoin-multisig-divergent-key-derivation-strategies/cover.jpg)

Konu, MuSig2 ve WebAuthn passkey kullanan non-custodial Bitcoin wallet'ları. Bu wallet'larda "stateless" olmak mimarinin ana kuralı. Sistemin key materyalini her seferinde deterministik olarak yeniden üretmesi gerekiyor ve hiçbir geçici state'e güvenemez. Ama server co-signer için key'in aslında nereden geldiği sorusuna iki farklı cevap var, iki farklı doğruluk kaynağı var.

Bu yazı, client entropy modelinden hybrid entropy modeline geçişi ve bununla birlikte gelen determinizm problemini ele alıyor. Dört bölümden oluşuyor: iki mimari, aralarındaki problem ve geçiş yolları.

## Mimari A, saf PRF

Eski mimari saf PRF. Taşınabilirliği öne koyuyor ve server tarafı zero-knowledge özelliklerine sahip. Tek entropy kaynağı, WebAuthn authenticator'dan gelen deterministik bir pseudo-random function çıktısı, yani PRF. Client önce, user key'den domain separated ayrı bir "co-signer passkey" üzerinde assertion yapıyor. Sonra ham PRF byte'ları güvenli bir kanal üzerinden server'a gidiyor. Server da saf bir fonksiyon gibi çalışıyor ve PRF input'unu doğrudan bir private scalar'a eşliyor, `k_server = Reduce(PRF_bytes)`.

Yani input sadece client'tan geliyor ve server hiç state tutmuyor. `k_user` ile `k_server`'ın matematiksel olarak farklı olması tamamen RPID separation'a, yani Relying Party ID'ye bağlı. Bu aynı zamanda şu anlama geliyor: ilgili hardware authenticator'a sahip olan herkes, server'dan hiçbir yardım almadan tam key setini yeniden üretebilir.

## Mimari B, bir secret'a bağlı

Yeni mimari bir secret'a bağlı. Trust root'unu composite bir derivation'a taşıyor ve server'a statik bir secret ekliyor, böylece kimse key'i tek başına yeniden üretemiyor. Burada co-signer key, güvenli bir server master seed'i ile hiç değişmeyen client identity metadata'sının bir fonksiyonu. Client önce credential'a sahip olduğunu kanıtlıyor. Sonra server private scalar'ı bir key derivation function ile türetiyor, yani bir KDF ile. Bu KDF, yüksek entropili bir server master secret'ı olan `S_master`'ı, client'a özgü context parametreleri `C_client` ve protokole özgü sabitler `P_context` ile karıştırıyor.

`k_server = HKDF(Salt=S_master, IKM=C_client || P_context)`

`C_client` içindeki context parametreleri genel tutuluyor ve credential'ın hiç değişmeyen özelliklerini içeriyor, örneğin public key hash, credential identifier veya attestation data. Bu, türetilen key'i kesin olarak tek bir hardware instance'ına bağlıyor.

Yani input hybrid, bir server secret'ı artı client identity'si, ve server'ın statik `S_master`'ı tutması gerekiyor. Bu defense in depth sağlıyor. Client'ın authenticator'ına sahip bir saldırgan, `S_master`'ı da server'dan çıkarmadan `k_server`'ı türetemiyor. Tersi de geçerli, server compromise olursa saldırgan client'ın interaktif imzası olmadan kullanılabilir key elde edemiyor.

## Problem, deterministik divergence

Bu mimariler arasında geçiş yapmanın tek bir engelleyici sorunu var, derivation mismatch. `Function_A(PRF)` ve `Function_B(S_master, C_client)` hiçbir ortak noktası olmayan input space'ler kullanıyor, dolayısıyla aynı user identity için tamamen farklı private scalar'lar üretiyorlar. Bu da aggregate MuSig2 public key'i değiştiriyor, `P_agg = P_user + P_server`. Blockchain açısından bakınca user'ın identity'si, yani adresi, rotate olmuş gibi görünüyor. Mimari B ile elde ettiğin wallet, Mimari A ile elde ettiğin wallet ile matematiksel olarak hiçbir ilişkisi olmayan bir wallet.

## Üç geçiş yolu

Mismatch'i düzeltmek için mevcut user'lar ve yeni user'lar için kanonik bir doğruluk kaynağı seçmen gerekiyor ve bunu yapmanın üç yolu var.

Birincisi, legacy desteği için bir protocol adapter. Yeni server'a koşullu bir branch ekleniyor. Request payload legacy schema ile eşleşiyorsa ve ham PRF byte'ları getiriyorsa, server `S_master` KDF'yi atlıyor ve eski reduction fonksiyonunu çalıştırıyor. Mevcut user'lar adreslerini koruyor ama bu user'lar Mimari A'nın güvenlik modelini de korumaya devam ediyor.

İkincisi, parametreleri enjekte eden bir client bridge. Client logic güncelleniyor ve Mimari B'nin ihtiyaç duyduğu `C_client` parametrelerini legacy flow'lar sırasında da çıkarıyor. Sonra server yeni derivation path'i arka planda hesaplayabiliyor veya user'ın state'ini migrate edebiliyor, user hiçbir değişiklik fark etmiyor. Bu entropy gap'ini kapatıyor.

Üçüncüsü, address rotation ile hard fork. Sistem Mimari B'yi tek standart haline getiriyor ve Mimari A'daki user'lar deprecated olarak değerlendiriliyor. Bir migration flow onlardan UTXO'ları `P_agg(Legacy)` adresinden `P_agg(Modern)` adresine taşıyan bir sweep transaction imzalamalarını istiyor.

## Trade-off

Client entropy'den hybrid entropy'ye geçmek, recoverability ile client tarafında coercion'a karşı direnç arasında bir trade-off. Mimari A sana self-sovereign recovery veriyor, en azından teoride. Mimari B ise daha güçlü bir 2-of-2 güvenlik modeli dayatıyor, burada hiçbir taraf tam key setini tek başına yeniden üretecek kadar entropy'ye sahip değil.
