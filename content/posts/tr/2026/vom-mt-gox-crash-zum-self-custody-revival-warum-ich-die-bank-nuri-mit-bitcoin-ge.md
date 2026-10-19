---
title: "Mt. Gox Çöküşünden Self-Custody Rönesansına: Nuri Bankasını Neden Bitcoin ile Aldım"
description: "2012'de Bitcoin'e nasıl girdiğimi, Mt. Gox ve DAO hack'inde nasıl para kaybettiğimi ve sonunda Nuri bankasını Bitcoin ile nasıl satın aldığımı anlatıyorum."
date: "2026-04-09T09:35:16.269Z"
updated: "2026-04-09"
lang: tr
translated_from: "de/vom-mt-gox-crash-zum-self-custody-revival-warum-ich-die-bank-nuri-mit-bitcoin-ge"
source_sections: ["wie-ich-2012-zu-bitcoin-kam", "mt-gox-der-dao-und-der-burnout", "warum-ich-nuri-gekauft-habe", "das-neue-nuri-ist-self-custodial", "für-wen-wir-bauen"]
category: bitcoin
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tldr: ["2012'de Bitcoin'e girdim ve Mt. Gox ile DAO hack'inde para kaybettim.", "Machine Learning, hardware wallet'lar ve bir burnout'tan sonra Nuri markasını Bitcoin ile satın aldım.", "Yeni Nuri tamamen self-custodial, Passkey'ler, Decaying Multisig ve Arkade ile."]
sections: [{"basically": "2012'de bir Google Quant'ı bana Bitcoin'i gösterdi ve dergim benim için sahne okulu oldu."}, {"basically": "Mt. Gox ve DAO hack'i bize çok paraya mal oldu. Burnout'tan sonra beni geri getiren yapay zeka oldu."}, {"basically": "Babamın adı Nuri. İki yıl süren pazarlığın ardından Nuri.com'u Bitcoin karşılığında aldım."}, {"basically": "Gnosis, Monerium veya biz yok olsak bile paranız durur. Key'ler sizde."}, {"basically": "İki balance, bir ödeme butonu. Arkada hangi blockchain'in çalıştığını kimsenin bilmesine gerek yok."}]
---
## 2012'de Bitcoin'e nasıl girdim

Bitcoin'e girişim 2012'de oldu, daha ASIC madenciliği dönemi bile başlamamıştı. Dört boyutlu fizik okuyan Google quant'ı bir arkadaşım Bitcoin'i keşfetmişti. Matematik bilgisi sayesinde Wall Street'teki herhangi bir bankacıdan çok daha iyi trade yapabileceğine adı gibi emindi. Bana bundan bahsettiğinde verdiğim ilk tepki tam bir tipik Alman tepkisiydi. *"Peki bu yasal mı?"* İlk sorumun bu olmasına bugün bile yanarım.

Mt. Gox ile BTC-e arasında arbitraj trading yapmaya başladık. Daha önce "arbitraj" ya da "trading" kelimelerini hayatımda duymamıştım, finansla falan hiç alakam yoktu. Tamamen onun sayesinde bu işe girdim. Aynı dönemde Berlin'de basılı bir dergi çıkarıyordum. Dört yıl boyunca her ay 20.000 adet bastık. Ayda 10.000 euro yiyen, sadece 100 gönüllü sayesinde dönen tam bir delilikti. O dergiyi kendimi eğitmek için kullandım. Sektördeki heyecan verici tipleri yakalayıp röportajlar patlatıyordum. Charlie Shrem olsun, KNC Miner'ın kurucuları olsun, ilk geliştiriciler falan. Öyle olunca hızlıca jeton düştü, biz burada üç beş kuruşluk arbitraj trade'inden çok daha büyük bir şeyin üzerindeydik.

## Mt. Gox, DAO ve tükenmişlik

Sonra Mt. Gox battı. Bitcoin'lerimizin yarısından fazlasını kaybettik. Çünkü arbitraj kârlarımızı sadece Excel tablolarında, yani paper trading mantığıyla tutuyorduk, coin'leri borsalar arasında transfer etmiyorduk. Mt. Gox'un BTC-e'den daha güvenli olduğunu sanmak gibi zekice bir fikir gelmişti aklımıza. Feci bir yanılgı oldu. Üstüne bir de beş kişi ortak aldığımız, 30.000 euro'luk çiçeği burnunda bir madenci cihazı elimizde patladı. O yaşta genç çocuklardık, fena koydu. *"Sikeyim böyle Bitcoin'i"*. Cihazı sattık, zararlarımızı hedge ettik ve bir süreliğine bu işlerden tamamen çıktık.

Mt. Gox batarken tam o sıralarda burada, Berlin'de Ethereum başladı. Vitalik, Gavin Wood, herkes buradaydı, yepyeni ve inanılmaz çekici bir ortamdı. DAO fikrine bayıldık, varımızı yoğumuzu gömdük. Sonra ne mi oldu? DAO hacklendi. Fork gelip Ethereum ile Ethereum Classic draması patlayınca ve coin'lerin yüzde 80'inin premint olduğunu anlayınca artık canıma tak etti. Kriptoya sırtımı dönüp makine öğrenimine odaklandım. Berlin'in kulüp ve etkinlik dünyasından geliyordum, bilet satmak için internette doğru insanlara el ilanı dağıtan bir yapay zeka ajanı yazdım. Dört yılımı buna verdim. Sonradan yine kripto ekosistemine çekildim. Bir arkadaş 100 milyon topladı, Ethereum killer bir proje yapmak için İsviçre'ye taşındı, ben de dört yıl boyunca onunla takıldım. Donanım Wallet'ları geliştirdim, derken 30'lu yaşların sonunda kendimi tam bir tükenmişliğin içinde buldum. Yapay zeka karşıma çıkana kadar bir daha asla bir şey kurmam sanıyordum. Ama yeniden bir şeyler inşa etme arzusu, o anki yorgunluğumdan çok daha ağır bastı.

## Nuri'yi neden satın aldım

Gelelim Nuri ismine. Babamın adı Nuri. Berlinli Bitwala firması, hani Bitcoin'i banka ve kart transferleriyle ilk birleştirenler, inanılmaz başarılı olmuştu, neredeyse 42 milyon euro fon topladılar ve adlarını Nuri olarak değiştirdiler. Sorunları neydi peki? Üçüncü partilere bağımlıydılar. Custody için lisans gerekiyordu, harici banka ortakları, Visa ortakları vardı ve Celsius üzerinden Bitcoin birikim hesabı sunuyorlardı. 200 çalışanları, 45 milyon euro paraları vardı ama iki yıl sonra kepenk indirmek zorunda kaldılar. Beceremediler kısacası. İşin çılgın tarafı, BTC'lerini Celsius'a yatırmak gibi parlak bir fikir bulan birkaç kişi dışında hiçbir kullanıcı parasını kaybetmedi. Yarım milyon insan Nuri kullanıyordu.

Babamın adı Nuri olduğu için teklifimi yaptım. Nuri'yi satın alıyorum dedim. İlk başta satmak istemediler tabii, ama iki yıllık pazarlığın ardından, geçen yılın ocak ayında Bitcoin kuru 120.000 euro civarındayken bana geri döndüler. Nuri.com ve tüm haklar karşılığında Bitcoin. Marka haklarını, 500 Figma dosyasını, çizimleri, video materyallerini aldık. 200 insanın iki yılda 40 milyon euro'yla ürettiği içeriği görsen aklın hayal eder.

## Yeni Nuri tamamen self-custodial

Eski Nuri'de ne patladı? Third party bağımlılığı ve custody. Biz de tam olarak bunu ortadan kaldırdık. Yeni Nuri tamamen self-custodial. Tüm Avrupa'da yayında ve temelde eski versiyonla aynı işi yapıyor, ama bu sefer gerçekten güvenli.

Ücretsiz bir Visa kartı ve ücretsiz bir IBAN alıyorsun. IBAN senin Wallet'ına bağlı. IBAN'a para gönderdiğinde mint ediliyor, banka transferi yaptığında burn ediliyor, bu kısım Monerium üzerinden akıyor. Visa kartı ise on-chain ve stablecoin tabanlı, GnosisPay üzerinden çalışıyor.

Yarın öbür gün Gnosis, Monerium ya da biz yok olup gitsek bile paran kaybolmuyor. Key'ler sende. Passkey teknolojisini kullanıyoruz ama diğerleri gibi değil. Mesela Privy gibi yerler temel olarak WebAuthn doğrulamalı hosted Wallet'lar kuruyor, yani sunucuları çökerse Wallet'ın da gidiyor. Biz WebAuthn PRF (Pseudo-Random Function) kullanıyoruz. Tamamen deterministik. Passkey'lerinden (örneğin YubiKey) her zaman aynı seed'i, ondan da senin Private Key'lerini üretiyoruz. Bu Key'ler phishing ile çalınamaz ve kullanıcıların yüzde 99,9'unun bilgisizlikten Seed Phrase'lerini dolandırıcılara kaptırmasını engelliyoruz.

Ayrıca Nuri, *Decaying Multisig* mantığıyla çalışan bir Multisig Wallet. Stateless bir ortak imzalama sunucusu işlemi seninle birlikte imzalıyor, ama sunucu ortadan kaybolursa ortak imzalama şartı belirli bir sürenin ardından düşüyor ve kendi key'inle çıkış yapabiliyorsun. Self-custody konusunda sıfır taviz, zaten bu yüzden Arkade ile güçlerimizi birleştirdik. Arkade, self-custody'de asla taviz verilemeyeceğini çok iyi biliyor.

## Kimin için üretiyoruz

Bizim hedef kitlemiz teknik olmayan, bu işlere yeni başlayan kullanıcılar. Wallet'ımızda sadece iki bakiye var, Bitcoin ve Euro/Dolar. Kasada bir QR kod tarattığında ve Solana ya da USDC ile 10 euro ödemen gerektiğinde, arka planda senin Euro veya Bitcoin bakiyenden anında Swap yapıyoruz. Arkade üzerinden tam olarak bunu Bitcoin ve Lightning için de kurmak istiyoruz. Kullanıcı alttaki blockchain neymiş falan hiç kafasını yormasın. "Öde" butonuna bassın ve iş bitsin.

Şu an dört kişilik ufak bir ekibiz, sadece 200 kullanıcımız var ama bu tamamen bilinçli bir tercih. Hâlâ geliştirme aşamasındayız ve sistemi tümüyle Arkade'e geçiriyoruz. Nuri'nin eskiden yarım milyon kullanıcısı olduğu ve marka inanılmaz güçlü kaldığı için (bu arada sadece Avrupa'da değil, "Nuri" Korecede "dünya", Arapça ve Türkçe coğrafyasında "ışık" demek ve Asya pazarında devasa bir marka), önümüzdeki altı ayda rahatlıkla 5.000 ila 10.000 aktif kullanıcıya çıkacağımıza inanıyoruz. Yüzde 1-2'lik frontend Fee oranımız zaten balinaları ve spam'i kendiliğinden uzak tutuyor. Büyük meblağlar için değmez ama günlük kullanım için biçilmiş kaftan.

Avrupa'da iOS App Store'da yayındayız, Android ve PWA sürümleri de çok yakında geliyor. Nuri'de Mercuryo gibi iş ortaklarıyla kimlik doğrulaması bile yapmadan Apple Pay üzerinden 700 euro'ya kadar doğrudan Bitcoin alabiliyorsun. İnsanların aradığı On-Ramp tam olarak bu. Kendimizi büyük bir yapboz gibi görüyoruz, Arkade, Monerium, Gnosis gibi en iyi ortakları bir araya getiriyoruz ki gerçek self-custody ana akımın eline geçsin, hem de hiçbir engelleme ve custody riski olmadan.

Gel, bunu birlikte kuralım.
