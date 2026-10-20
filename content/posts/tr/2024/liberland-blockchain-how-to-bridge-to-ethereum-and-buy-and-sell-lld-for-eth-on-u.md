---
title: "Liberland Blockchain'den Ethereum'a Nasıl Köprü Kurulur ve Uniswap'ta LLD ile ETH Nasıl Alınıp Satılır"
description: "LLD ve LLM nedir, Liberland Blockchain'de staking nasıl çalışır ve LLD'yi Ethereum'a nasıl köprüleyip Uniswap'ta ETH ile takas edersin."
date: "2024-09-08T05:22:44.728Z"
updated: "2024-09-08"
lang: tr
translated_from: "en/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u"
source_sections: ["the-tokens", "staking-lld", "bridging-from-liberland-to-sora-to-ethereum-with-polkaswap"]
category: bitcoin
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/01-d46f5586.jpeg"
tldr: ["Liberland Blockchain'de iki token var: para için LLD, yönetişim ve sahiplik için LLM.", "Validator çalıştırarak ya da birini aday göstererek LLD stake edebilirsin ve karşılığında likit LLLD alırsın.", "LLD'yi ETH karşılığında satmak istiyorsan, Polkaswap ile Liberland'dan SORA'ya, oradan Ethereum'a köprülersin ve Uniswap'ta takas edersin."]
sections: [{"basically": "LLD para birimi, LLM yönetişim tokeni; yönetişim için stake edilmiş LLM gerekiyor."}, {"basically": "200 LLD ile validator çalıştır ya da birini aday göster, stake'in karşılığında likit LLLD al."}, {"basically": "LLM'i unpool et, LLD al, SORA üzerinden Ethereum'a köprüle, sonra Uniswap'ta ETH ile takas et."}]
---
![](../../../media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/01-d46f5586.jpeg)

Liberland Blockchain, Liberland mikro ulusunun yönetimi ve ekonomisi için geliştirilmiş halka açık bir blokzincir. Polkadot blokzincirinin de altyapısını oluşturan Substrate framework'ü üzerine kurulu.

## Tokenlar

İki farklı token var. Liberland Dollar (LLD), Liberland Blockchain'in yerel para birimi. İşlemler yapmak, fee ödemek ve ağı güvenceye almak için kullanılıyor. Stablecoin değil, yani fiyatı tamamen piyasada belirleniyor. 3 milyon LLD olan başlangıç arzı, Liberland vatandaşlarına ve LLM sahiplerine dağıtıldı.

Liberland Merit (LLM) ise yönetişim tokenı ve Liberland'daki mülkiyeti temsil ediyor. Elinde tutuyorsan alınan kararlarda oy hakkın oluyor. Maksimum arzı 70 milyon token ve deflasyonist bir yapıya sahip.

Yönetişim tarafında PolitiPooling devrede. Yönetişime katılmak için LLM stake etmen gerekiyor. Stake edilen LLM'lerin her yıl en fazla %10'unun kilidi açılabiliyor (unvested), bu da topluluğun uzun vadeli kalmasını sağlıyor. LLD stake etmek ise bambaşka bir konu. Validator node çalıştırmak ve ağı güvence altına almak için gerekiyor; validator'lar da ödüllerini LLD olarak alıyor.

## LLD Stake Etmek

Liberland Blockchain'de LLD stake etmek için iki yolun var. İlki, bir validator node çalıştırmak. Bunun için en az 200 LLD ile başlamak gerekiyor. Validator'lar yeni blok adayları üretiyor, blokları finalize ediyor ve Liberland vatandaşı olmak zorundalar. Sistem her epoch'ta validator'ları stake büyüklüklerine göre seçiyor; kurallara uymayan validator'lar ise ceza alıp "slashed" olabiliyor.

İkinci seçenek ise mevcut bir validator'ı nominate etmek. Biraz LLD stake eden herkes bunu yapabilir. Nominator'lar kendileri node çalıştırmaz, LLD'lerini bir validator'ın node'una stake ederler. Bu durum validator'ın seçilme şansını artırır ve nominator'lar da validator'ın kazandığı ödüllerden pay alır.

LLD stake ettiğinde karşılığında Liquid LLD (LLLD) token alırsın. LLLD, tek bir validator'a stake edilmiş LLD havuzu üzerindeki orantılı hakkını temsil eder. LLLD tokenlar tamamen likittir; arkasındaki LLD'yi unstake etmeyi beklemeden anında alıp satabilirsin. Bu sayede gerektiğinde stake pozisyonlarına hızlıca girip çıkmak mümkün olur. Asıl LLD'yi unstake etmek istediğinde ise LLLD tokenlarını validator bileşenine geri gönderirsin ve yaklaşık 7 günlük bekleme (cooldown) süresinin ardından çekebilirsin.

Staking ödülleri enflasyondan karşılanıyor. Bu oran kod seviyesinde yıllık en fazla %10 olarak belirlenmiş durumda ve yönetişim kararıyla düşürülebiliyor. Enflasyon payı validator'lara, nominator'lara ve hükümete gidiyor. Buradaki amaç, insanları stake etmeye teşvik etmek ve validator node'larını ayakta tutmak. Ağın kullanımı arttıkça işlem fee'leri bir noktada validator masraflarını karşılar hale gelecektir. O aşamada enflasyon %0'a indirilebilir ve token yakımı (burning) sayesinde LLD hafif deflasyonist bir yapıya kavuşabilir. Özetle; LLD'yi validator node çalıştırarak ya da birini nominate ederek stake ediyorsun, ödüller enflasyon mekanizmasından geliyor ve ağı güvenceye aldığın için gelir elde ediyorsun; LLLD ise stake pozisyonunu dilediğin gibi likit tutmanı sağlıyor.

Daha detaylı bilgi için Liberland Wiki'deki [White Paper](https://liberland-1.gitbook.io/wiki/v/public-documents/blockchain/white-paper) sayfasına göz atabilirsin.

## Polkaswap ile Liberland'dan SORA'ya, oradan Ethereum'a Bridge

Burada iki farklı senaryo söz konusu:

1. Elinde LLM ve LLD var; LLD'yi Ethereum blokzincirine bridge edip [Uniswap](http://uniswap.org) üzerinden satmak istiyorsun.
1. Elinde hiç LLD yok; Ethereum üzerinden LLD alıp Liberland Blockchain'e bridge etmek istiyorsun.

Daha basit olan ilk senaryoyla başlayalım: Liberland'daki LLD'yi Ethereum'daki LLD'ye dönüştürme süreci.

Henüz yapmadıysan, önce LLM'lerini unpool edip likit LLM'e çevirmen gerekiyor. Bu işlem için cüzdanında bir miktar likit LLD bulunmalı. Eğer likit LLD'n yoksa sayfayı aşağı kaydırabilirsin; ETH ile nasıl LLD alınacağını ve [Polkaswap ile bridge etmeyi](https://polkaswap.io/#/bridge/) Liberland tarafına adım adım anlattım.

[https://blockchain.liberland.org/](https://blockchain.liberland.org/) adresinden Liberland hesabına giriş yap ve Wallet sekmesine git.

![](../../../media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/02-a6829db6.png)

PolitiPooled LLM seçeneğine tıkla, ardından açılan pencerede Unpool butonuna bas.

![](../../../media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/03-54d5edb5.png)

Bu adımı tamamladıktan sonra Exchange sekmesine geç ve Buy LLD for LLM seçeneğini seç.

![](../../../media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/04-102f5462.png)
*Exchange -> Buy LLD for LLM*

Ardından Polkaswap'a gidip Bridge bölümünü aç. Liberland Blockchain cüzdanını bağla ve Liberland Blockchain üzerindeki LLD'lerini SORA Mainnet'teki LLD'ye bridge et. Bu aşamada fee ödemeleri için cüzdanında XOR bulunması gerekiyor.

![](../../../media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/05-689e5710.png)

LLD'ler SORA ağına geçtikten sonra, bu kez SORA'dan Ethereum mainnet'e bridge edebilirsin. Buradaki fee ödemeleri için ise ETH gerekecek.

![](../../../media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/06-780150d4.png)

Bridge işlemi tamamlandıktan sonra (önce XOR, ardından ETH ödeyerek onayladığın süreç) Uniswap'a geçip LLD'lerini ETH ile swap edebilirsin.

![](../../../media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/07-26c6feee.png)

Swap işlemini onaylamak için yine ETH ile bir fee ödüyorsun; çünkü arka planda Ethereum ağında bir akıllı sözleşme çalışıyor. İşlem onaylandığında ETH bakiyenin arttığını ve LLD'lerin çıktığını göreceksin.

![](../../../media/liberland-blockchain-how-to-bridge-to-ethereum-and-buy-and-sell-lld-for-eth-on-u/08-577c616f.png)

Sonrasında ETH'lerini doğrudan Binance'e aktarabilir, dilediğin fiat para birimine, farklı bir kripto paraya veya tokene çevirebilirsin.

Bu süreç elbette tersine de çalışıyor: Ethereum'dan LLD alıp bunu LLM'e swap edebilirsin. Cüzdanında 5000'den fazla LLM olduğunda ise Liberland vatandaşlığına başvurma hakkı kazanıyorsun.

Liberland ya da bu rehberle ilgili aklına takılan bir şey olursa [whatsapp.emin.de](http://whatsapp.emin.de) üzerinden bana her zaman yazabilirsin.
