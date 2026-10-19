---
title: "Agentic cüzdanlar ve passkey PRF: nuri.com'un arkasındaki güvenlik mimarisi"
description: "nuri.com'da passkey PRF uzantısını nasıl kullandığımız: cihazdan anahtar türetiyoruz, decaying multisig ekliyoruz ve agent'ların hazırlamasına izin veriyoruz ama asla harcama yapamıyorlar."
date: "2026-02-10T08:00:01Z"
updated: "2026-02-10"
lang: tr
translated_from: "en/agentic-wallets-passkey-prf-the-nuri-com-security-architecture"
source_sections: ["the-hardware-is-the-seed", "a-multisig-that-decays", "agents-prepare-you-sign", "not-only-evm", "why-it-matters"]
category: nuri
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/agentic-wallets-passkey-prf-the-nuri-com-security-architecture/cover.webp"
tldr: ["nuri.com'da cüzdan anahtarlarını passkey PRF uzantısından türetiyoruz, yani seed phrase ya da secret saklanmıyor.", "Decaying multisig normal kullanımda 2-of-2 istiyor, servis ortadan kalkarsa time-lock sonrası 1-of-1'e düşüyor.", "Agent'lar işlemleri hazırlıyor ama sadece kullanıcının biyometrik passkey'i imzalayabiliyor."]
sections: [{"basically": "Authenticator her seferinde aynı PRF çıktısını veriyor, anahtarlar anlık türetilip siliniyor."}, {"basically": "Normal zamanlarda servisle birlikte 2-of-2, time-lock sonrası 1-of-1, yani kimse seni dışarıda bırakamaz."}, {"basically": "Agent pilot, ama kullanıcının parmak izi kontak anahtarı."}, {"basically": "Türetilen tek bir master seed Bitcoin'de SegWit ve Taproot ile, EVM zincirlerinde de çalışıyor."}, {"basically": "Kaybedecek seed phrase yok, phishlenecek şifre yok, paranı dondurabilecek bir sağlayıcı yok."}]
---
# Agentic cüzdanlar ve passkey PRF: nuri.com'un arkasındaki güvenlik mimarisi

Cüzdan güvenliği genelde iki seçenekten birine mahkum eder seni. Ya seed phrase'le self-custody, ya da birinin senin yerine paranı tuttuğu konfor. Biz nuri.com'da WebAuthn PRF (Pseudo-Random Function) eklentisiyle üçüncü bir yol kurduk. Donanımla desteklenen, deterministik ve multisig bir cüzdan bu; AI agent'ların işin çoğunu üstlendiği bir dönem için tasarladık.

## Seed, donanımın kendisi

Ana fikir şu: artık bir secret saklamıyoruz. Ne bir master password var ne de saklanan bir JSON dosyası. Passkey PRF eklentisini kullanarak entropy'yi doğrudan authenticator'dan alıyoruz; TouchID, FaceID ya da bir YubiKey gibi.

Kullanıcı her kimlik doğruladığında, PRF eklentisi aynı input ve salt için her seferinde birebir aynı output'u veriyor. Yani hiçbir şey saklamak gerekmiyor: $Seed =
\text{HMAC-SHA256}(\text{AuthenticatorSecret}, \text{Salt})$. Bu $Seed$'i istediğimiz an tekrar türetebildiğimiz için, private key'ler anlık üretiliyor ve imza atılır atılmaz siliniyor (zeroize ediliyor).

## Zamanla çözülen bir multisig

Hem güvenli olsun hem de parana her zaman erişebil diye, çözülen bir multisig script'i kullanıyoruz. Normal kullanımda 2-of-2 imza gerekiyor: PRF'den gelen key ve servisin tuttuğu bir key. Servis (Relying Party) ortadan kalkar ya da domain kaybolursa, bir time-lock (CheckSequenceVerify) cüzdanın 1-of-1 durumuna geçmesini sağlıyor. Böylece bir servis sağlayıcı seni parandan asla mahrum bırakamaz; normal zamanlarda da yine bir co-signer'ın güvenliğinden yararlanırsın.

## Agent'lar hazırlar, sen imzalarsın

AI agent'lar on-chain işleri üstlenmeye başladığında, asıl mesele şu çizgi: kimin bir şey yapmaya yetkisi var ve kim gerçekten yapıyor.

Şöyle işliyor. Bir agent zinciri izliyor ve karmaşık bir transaction hazırlıyor; mesela "gas düşükse DeFi pozisyonlarımı yeniden dengele". Agent bütün ayak işini yapıyor ve kullanıcıya imzaya hazır bir payload uzatıyor. Ama private key, passkey PRF üzerinden biyometrik bir tetik gerektiriyor; yani agent kendi başına para harcayamıyor. Bu sana donanıma bağlı bir guardrail veriyor. Agent pilot, ama kullanıcının parmak izi kontak anahtarı.

## Sadece EVM değil

Passkey cüzdanların çoğu sadece EVM'le ilgileniyor (ERC-4337 üzerinden). Bizim nuri.com'daki kurulum her zincirde çalışıyor, çünkü bir master seed türetiyoruz. Bitcoin'de bu, deterministik BIP32 türetmesiyle native SegWit ve Taproot transaction'ları demek. EVM'de ise Ethereum tabanlı zincirler ve Account Abstraction için tam destek demek.

## Neden önemli

Bu bizi secretsız bir geleceğe götürüyor. Kaybedilecek bir seed phrase yok, phishing'le kapılabilecek bir master password yok, paranı sonsuza dek dondurabilecek bir servis sağlayıcı yok. Bu orkestrasyon mantığını açık kaynak yapmak istiyoruz; böylece güvenli olan ve insanı döngüde tutan agentic cüzdanlar için temel katman olabilir.

![image](../../../media/agentic-wallets-passkey-prf-the-nuri-com-security-architecture/image.png)
