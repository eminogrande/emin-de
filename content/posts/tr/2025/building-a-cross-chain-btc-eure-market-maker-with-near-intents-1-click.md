---
title: "NEAR Intents ve 1-Click ile Cross-Chain BTC-EURe Market Maker Kurmak"
description: "NEAR Intents ve 1-Click üzerinde BTC ile EURe arasında nasıl swap hattı kurduğumuzu, yüzde 0,3 marjla çalışan kendi AMM solver'ımızı nasıl sisteme entegre ettiğimizi anlatıyorum."
date: "2025-12-06T18:35:01Z"
updated: "2025-12-06"
lang: tr
translated_from: "en/building-a-cross-chain-btc-eure-market-maker-with-near-intents-1-click"
source_sections: ["1-how-the-pieces-fit", "2-the-swap-pages", "3-the-ui-server", "4-the-amm-solver-and-how-we-provide-liquidity", "5-a-swap-from-btc-to-eure-start-to-end", "6-where-the-03-comes-from", "7-which-currency-we-earn-in", "8-putting-liquidity-in-and-taking-it-out", "9-monitoring-on-eminoappsolver", "10-whats-next"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/building-a-cross-chain-btc-eure-market-maker-with-near-intents-1-click/cover.webp"
tldr: ["Sıfırdan bir BTC'den EURe'ye swap hattı inşa ettik: mobil swap arayüzü, test aracı, solver monitörü ve kendi AMM solver'ımız.", "Swaplar, Bitcoin mainnet'teki BTC ile Gnosis üzerindeki EURe arasında, NEAR Intents ve Defuse 1-Click üzerinden gerçekleşiyor.", "Solver, constant product matematiğini kullanıyor ve kullanıcının gönderdiği tutar üzerinden yüzde 0,3'lük bir marj alıyor.", "Kâr, Intents kontratındaki rezervlerde biriken ekstra BTC ve EURe'den elde ediliyor."]
sections: [{"basically": "Sistem dört parçadan oluşuyor: swap arayüzü, UI sunucusu, solver relay'li NEAR Intents ve kendi AMM solver'ımız."}, {"basically": "/intent/ tek ekranlık swap sayfası, /intent/intend/ ise test butonlarının ve işlem geçmişinin bulunduğu debug sayfası."}, {"basically": "Fiyat teklifleri, swap geçmişi ve 1-Click'e durum proxy'si sağlamak için 4100 portunda çalışan bir Express sunucusu."}, {"basically": "EURe ve BTC için resmi NEAR Intents AMM solver'ı, x çarpı y eşittir k artı marj formülüyle fiyatlandırma yapıyor."}, {"basically": "Teklifi al, BTC'yi yatır, 1-Click bizim solver'ın teklifini eşleştirsin ve UI durumu kontrol ederken EURe Gnosis ağına tanımlansın."}, {"basically": "Solver, giriş tutarının yüzde 99,7'sini baz alarak fiyatlıyor. Kalan yüzde 0,3 rezervde kalıyor."}, {"basically": "Marj, kullanıcı ne gönderirse onunla tahsil ediliyor, yani kâr ekstra BTC ve ekstra EURe olarak birikiyor."}, {"basically": "intents.near adresine EURe ve BTC yatır, solver'ı çalıştır ve biriken fazlalığı kâr olarak çek."}, {"basically": "Tek bir dashboard üzerinden sistemin sağlığını, rezervleri, verdiğimiz teklifleri ve ağdaki tüm hareketliliği takip edebiliyorsun."}, {"basically": "Sistem uçtan uca çalışıyor. Sırada daha akıllı fiyatlandırma modelleri, yeni pariteler ve expert mode içeren daha sağlam bir UI var."}]
---
![](../../../media/building-a-cross-chain-btc-eure-market-maker-with-near-intents-1-click/cover.jpg)

Son birkaç gündür BTC ile EURe arasında eksiksiz bir swap altyapısı kurduk. Elimizde mobil öncelikli bir swap arayüzü (emino.app/intent/), geçmiş kayıtları görebileceğiniz gelişmiş bir test sayfası (emino.app/intent/intend/), canlı solver monitörü (emino.app/solver/) ve Bitcoin mainnet üzerindeki BTC ile Gnosis üzerindeki EURe arasında, NEAR Intents ve Defuse 1-Click üzerinden likidite sağlayan gerçek bir AMM solver var.

Bu yazıda tüm parçaların nasıl birleştiğini, bir swapın sistemde nasıl gerçekleştiğini, %0,3'lük marjın nereden geldiğini ve bir solver operatörünün nasıl deposit yapıp durumu izleyeceğini, kazancını nasıl çekeceğini anlatıyorum.

## 1. Parçalar nasıl birleşiyor

Dört ana parça var.

İlki emino.app adresindeki kullanıcı arayüzü. /intent/ sayfası, BTC'den EURe'ye swap başlatmak için mobil uyumlu basit bir ekran. /intent/intend/ ise gelişmiş bir JSON test aracı; sunucu üzerinden başlatılan tüm swapların geçmişini tutuyor.

İkincisi, 4100 portunda çalışan UI sunucusu. /intent/ ve /intent/intend/ için statik HTML ve JS dosyalarını sunan bir Express sunucusu bu. Ayrıca dört endpoint'i olan küçük bir API'si var. Quote almak ve durumu sorgulamak için https://1click.chaindefuser.com adresindeki Defuse 1-Click API'si ile haberleşiyor.

    POST /api/intend/btc-to-eure
    POST /api/intend/eure-to-btc
    GET /api/intend/history
    GET /api/intend/status/:depositAddress

Üçüncüsü, NEAR Intents ve solver relay. NEAR Intents kontratı (intents.near), token rezervlerini tutuyor ve niyetleri (intents) takip ediyor. wss://solver-relay-v2.chaindefuser.com/ws adresindeki solver relay ise 1-Click'ten gelen quote taleplerini solver'lara iletiyor ve cevapları geri alıyor.

Dördüncüsü ise bizim kendi AMM solver'ımız. Resmi near-intents-amm-solver kodunu çalıştırıyor; ilk token olarak Gnosis üzerinde EURe, ikinci olarak NEAR üzerinde BTC kullanıyor. Intents kontratındaki EURe ve BTC rezervleri üzerinden sabit ürünlü (constant-product) bir AMM yönetiyor. WebSocket üzerinden quote taleplerini dinliyor, marj ekleyerek fiyat hesaplıyor, NEP-413 ile quote'ları imzalıyor ve niyetler gerçekleşince rezerv görünümünü güncelliyor.

UI ile solver'ın birbirinden haberi yok. UI sadece 1-Click ile konuşuyor, solver ise sadece solver relay ve NEAR ile. Relay ve 1-Click, quote ve niyet trafiğini aralarında yönetiyor.

## 2. Swap sayfaları

/intent/ tek ekrandan oluşan basit bir test arayüzü. İki sekmesi var: BTC'den EURe'ye ve EURe'den BTC'ye. BTC'den EURe'ye işlem yaparken satoshi cinsinden miktarı, Gnosis'te EURe alacak EVM adresini ve hata durumunda iade için bir Bitcoin bech32 adresini giriyorsunuz. EURe'den BTC'ye geçerken ondalıklı olarak EURe miktarını, swap sonrası BTC alacak adresi ve iade için Gnosis EVM adresini giriyorsunuz. Kendi adreslerimizi otomatik olarak önceden dolduruyoruz.

    DEFAULT_EURE_EVM = 0x196C28928b1386D8Dcd32ab223bECcce6f731264
    DEFAULT_BTC_ADDR = 1LBiZCtkByR3BuH7K3RJA15fmri84NW6CT

"Get deposit & start swap" butonuna bastığınızda, UI arka planda POST /api/intend/btc-to-eure veya POST /api/intend/eure-to-btc çağrısı yapıyor. Sunucu da 1-Click /v0/quote endpoint'ine EXACT_INPUT tipinde bir istek atıyor. Eğer başarılı olursa, elinizde düzenli bir formatta amountInFormatted, yaklaşık alacağınız miktar amountOutFormatted, bir depositAddress ve bir deadline oluyor. UI daha sonra özeti ("Gönderdiğiniz / Alacağınız"), deposit adresini, wallet uygulamaları için bir QR kodu ve GET /api/intend/status/:depositAddress üzerinden durumu sorgulayan bir status kutusu gösteriyor.

/intent/intend/ ise daha çok hata ayıklama ve ileri düzey kullanıcılar için. Hızlı test butonları var ("Test: 10,000 sats → EURe" gibi) veya /intent/ sayfasındaki formun aynısı ama metin kutuları daha serbest. Her denemede, 1-Click'ten gelen yanıtı bir kutu içinde gösteriyor. Eğer hata varsa, aynen şu şekilde ham hata mesajını döndürüyor:

    {
      "message": "...",
      "status": 400,
      "bodyMessage": "Failed to get quote",
      "correlationId": "...",
      "requestBody": { ...full JSON sent to /v0/quote... }
    }

Sayfanın altında ise "Recent swaps (this server)" kısmı var. Bu da GET /api/intend/history ile destekleniyor, sadece bu sunucu üzerinden başlayanları görüyor ve yön, zaman damgası, miktar ve adresi listeliyor.

## 3. UI sunucusu

Sunucu (server/index.ts) 4100 portunda çalışıyor ve üç temel işi var.

Birincisi, quote ve intend endpoint'leri. Hepsi EXACT_INPUT ile çalışıyor. POST /api/intend/btc-to-eure önce girilen verileri doğruluyor, sonra 1-Click'in getQuote fonksiyonunu çağırıp deposit adresi ve miktarları döndürüyor.

    originAsset = nep141:btc.omft.near
    destinationAsset = EURe
    amount = satsIn
    refundTo = refundBtc (BTC).
    recipient = recipientEvm (Gnosis).

POST /api/intend/eure-to-btc tarafında ise EURe miktarını 18 basamağa çevirip (toUnits) 1-Click'e gönderiyoruz. Başarılı olan her quote talebi için bellek üzerinde duran intentLog listesine yeni bir kayıt ekleniyor.

    type IntentLogItem = {
      direction: 'btc-to-eure' | 'eure-to-btc';
      depositAddress: string;
      createdAt: string;
      amountIn: string;
      amountInFormatted: string;
      amountOut: string;
      amountOutFormatted: string;
      test?: boolean;
      recipient?: string;
      refund?: string;
    };

İkincisi, geçmişe dönük API'ler. GET /api/intend/history, log listesini en yeniden eskiye doğru döndürüyor. GET /api/intend/history/:depositAddress ise belirli bir deposit kaydını ve 1-Click'ten alınan güncel execution durumunu veriyor.

Üçüncüsü, bir status proxy'si. GET /api/intend/status/:depositAddress, doğrudan 1-Click'in getExecutionStatus fonksiyonuna gidiyor, UI da durumu güncellemek için sürekli bunu sorguluyor.

## 4. AMM solver ve likiditeyi nasıl sağlıyoruz

Solver, EURe ve BTC için kurulu olan resmi NEAR Intents AMM implementasyonu. Çevresel değişkenler ve ortam şöyle:

    AMM_TOKEN1_ID = nep141:gnosis-0x420ca0f9b9b604ce0fd9c18ef134c705e5fa3430.omft.near (EURe)
    AMM_TOKEN2_ID = nep141:btc.omft.near (BTC)

    NEAR_ACCOUNT_ID = nuri-solver.near
    NEAR_PRIVATE_KEY = ed25519:...
    RELAY_WS_URL = wss://solver-relay-v2.chaindefuser.com/ws
    ONE_CLICK_API_ONLY = true
    MARGIN_PERCENT = 0.3

Başlangıçta near-api-js ile NEAR'a bağlanıyor, Intents kontratından rezervleri çekiyor ve bunlardan deterministik bir nonce hesaplıyor. WebSocket üzerinden gelen QUOTE ve QUOTE_STATUS etkinliklerini dinliyor. Sadece EURe-BTC çiftiyle ilgileniyor. Gelen her quote talebinde, isteğin güvenilir bir partnerden gelip gelmediğini kontrol ediyor, marjı da ekleyerek AMM fiyatını hesaplıyor, NEP-413 ile imzalayıp relay'e dönüyor.

AMM matematiği sabit ürün (x · y = k) artı marj. EXACT_INPUT olduğu için formül şöyle:

    amountInWithFee = amountIn * (1 - margin)
    out = (amountInWithFee * reserveOut) / (reserveIn + amountInWithFee)

EXACT_OUTPUT kullanılsaydı da mantık benzer olacaktı:

    in = reserveIn * out / ((reserveOut - out) * (1 - margin))

Marjı MARGIN_PERCENT üzerinden ayarlıyoruz, varsayılan değer %0,3.

## 5. Baştan sona bir BTC'den EURe'ye swap

/intent/ sayfasında bir swap düşünelim.

Her şey kullanıcının quote istemesiyle başlıyor. UI, sunucuya miktarı, alıcıyı ve iade adresini gönderiyor; sunucu da 1-Click'ten quote alıyor. 1-Click solver'lara gidiyor; relay tüm solver'lara bu çift için quote talebi yayınlıyor.

Bizim solver bunu görüyor, QUOTE etkinliğini işliyor, %0,3 marjlı fiyatı hesaplıyor, imzayı atıp relay'e gönderiyor. 1-Click en iyi quote'u seçip bize deposit adresini ve miktarları veriyor. Bizim UI sunucusu da bunu logluyor.

Sonra kullanıcı BTC'yi deposit adresine gönderiyor. 1-Click bu ödemeyi görünce intents.near üzerinde bir niyet oluşturuyor, relay ve bizim solver'ın quote'u ile swap'ı gerçekleştiriyor, Gnosis üzerinden EURe'yi alıcının hesabına gönderiyor.

Bu sırada UI her 5 saniyede bir durumu sorguluyor. Solver ise QUOTE_STATUS etkinliklerini izleyip rezervlerini güncelliyor. emino.app/solver/ üzerindeki dashboard'da ise tüm likiditeyi, son quote'ları ve "Recent Swaps" kısmındaki geçmiş işlemleri canlı canlı takip edebiliyoruz.

## 6. %0.3'lük dilim nereden geliyor

MARGIN_PERCENT = 0.3 demek, solver'ın her swap işleminden %0.3 spread alması ve bunu AMM'in içinde yapması demek. BTC'den EURe'ye geçerken solver, gelen BTC'nin %0.3'ünü ücret olarak kesiyor ve sadece geri kalan %99.7'sini ne kadar EURe göndereceğini hesaplamak için kullanıyor. Yani o fazladan %0.3'lük dilim, BTC rezervinde kalıyor. EURe'den BTC'ye geçerken ise fee EURe girişinden kesiliyor ve EURe'nin %0.3'ü yine EURe rezervinde birikiyor.

Birçok işlemden sonra her iki rezerv de fee almayan bir AMM'e kıyasla daha fazla büyüyor. İşte o büyüme, tüm marjların toplamı oluyor. Yani fiyat senin aleyhine hareket ettiğinde oluşan kayıpları düştükten sonra kalan miktar, senin solver kazancın. Bunu bir piyasa yapıcı (market maker) olmak gibi düşünebilirsin. %0.3'lük spread'i kazanıyorsun ama BTC ve EURe arasındaki fiyat dalgalanmasının riskini de sen üstleniyorsun.

## 7. Hangi para biriminde kazanıyoruz

Her bir swap işleminde marj, kullanıcının gönderdiği varlık cinsinden ödenir. BTC'den EURe'ye yapılan bir swapta marj BTC olarak ödenir ve BTC rezervin normalden biraz daha fazla artar. EURe'den BTC'ye yapılan swapta ise bu EURe olarak ödenir ve EURe rezervin artar. Zamanla insanlar BTC gönderdikçe fazladan BTC, EURe gönderdikçe fazladan EURe biriktirirsin; yani kârın Intents kontratındaki rezervlerin içinde durur.

Solver dashboard'undaki "Reserves (on intents contract)" kartı, bu rezervleri insanlar tarafından okunabilir birimlerle, yani EURe ve BTC olarak gösterir. Böylece havuzda ne kadar likidite ve dolayısıyla ne kadar kâr olduğunu bir bakışta görürsün.

## 8. Likiditeyi koymak ve çekmek

AMM solver, çalışmaya başlamadan önce NEAR Intents üzerindeki rezervleri fonlamanı bekler.

Önce hazırlık lazım. Solver hesabının, mesela nuri-solver.near, NEAR üzerinde EURe token'larına (NEAR'daki wrapped EURe) ve BTC token'larına (btc.omft.near) sahip olduğundan emin ol. Ayrıca solver'ın public key'ini intents.near'a ekle ki teklifleri (quotes) imzalayabilsin.

Sonra token'ları Intents'e yatırırsın. NEAR CLI kullanarak, basitçe anlatmak gerekirse, nuri-solver.near adına intents.near'a EURe yatırırsın, aynısını BTC için de yaparsın. Tam komutlar kullandığın NEP-141 FT kontratlarına (ft_transfer_call ve storage_deposit) göre değişir; onları da NEAR Intents ve AMM solver'ın README'sinde bulabilirsin. Olay, token'ları kendi solver hesabından Intents kontratındaki bir rezerv pozisyonuna taşıman.

Rezervler hazır olunca solver'ı şu sekiz ayarla çalıştırırsın:

    AMM_TOKEN1_ID=...EURe...
    AMM_TOKEN2_ID=nep141:btc.omft.near
    NEAR_ACCOUNT_ID=nuri-solver.near
    NEAR_PRIVATE_KEY=ed25519:...
    RELAY_WS_URL=wss://solver-relay-v2.chaindefuser.com/ws
    APP_PORT=4010
    MARGIN_PERCENT=0.3
    ONE_CLICK_API_ONLY=true

    npm start

Solver başladığında emino.app/solver/ üzerinde Health = READY değerini, EURe ve BTC rezervlerinin sıfır olmadığını, toplam arzı ve son tekliflerle birlikte intent'leri görürsün.

Kârı almak için intents.near üzerindeki rezerv pozisyonunu azaltır ve EURe ve BTC rezervlerinin bir kısmını nuri-solver.near'a geri çekersin. Sonra varlıkları bridge ile dışarı çıkarırsın. BTC'yi NEAR BTC token'ından zincir üstü (on-chain) BTC'ye, EURe'yi de istersen Gnosis'e çekersin. Yine tam komutlar FT bridge'lerine ve Intents araçlarına göre değişir ama mantık basit. İlk depozitona göre rezervlerde biriken o fazladan BTC ve EURe, senin PnL'in (kâr-zarar) oluyor.

## 9. emino.app/solver/ üzerinden izleme

Solver dashboard'u üç soruya cevap verir.

Birincisi, solver'ımız sağlıklı mı ve bağlı mı? Health kartı "ready" durumunu true veya false olarak ve solver hesabımız olan nuri-solver.near'ı gösterir. Websocket kartı röle (relay) bağlantısını (CONNECTED veya DISCONNECTED) ve son röle etkinliğinin zaman damgasını gösterir.

İkincisi, ne kadar likiditemiz var ve NEAR'da neler oluyor? Reserves kartı, "Bu solver için intents.near üzerindeki likiditemiz" diyerek EURe ve BTC rezervlerini okunaklı şekilde gösterir. Total supply kartı ise tüm solver'lar genelinde NEAR Intents üzerindeki küresel EURe ve BTC arzını verir.

Üçüncüsü, bizden ve ağdan ne kadar hareket geçiyor? "Recent Quotes (ours)" sadece bu solver'ın hesaplayıp imzaladığı teklifleri gösterir. "Recent Swaps (via emino.app UI)" GET /api/intend/history geçmişidir, yani tam olarak /intent/intend/ üzerinde gördüğündür. "Recent Intents (network)" röle üzerinden görülen tüm intent'leri listeler; varlık ve miktar kısımları dolu olanlar, bizim tekliflerimizle eşleşen intent'lerdir. "Recent Intents (details)" ise derin hata ayıklama (debugging) için aynı intent'lerin tam hash'lerini ve zaman damgalarını gösterir.

Yani bir bakışta solver'ımızın ne kadar yoğun olduğunu, tekliflerin kabul edilip edilmediğini, kullanıcıların gerçekten bizim UI üzerinden swap yapıp yapmadığını ve hâlâ ne kadar likiditemiz kaldığını anlarsın.

## 10. Sırada ne var

Artık her şey bağlı ve uçtan uca çalışıyor; yani farklı yönlere doğru geliştirmeye başlayabiliriz. MARGIN_PERCENT değerini pariteye, boyuta veya volatiliteye göre ayarlayarak ve AMM'i adil fiyat etrafında tutmak için harici fiyat beslemeleri (price feeds) kullanarak daha iyi fiyatlama yapabiliriz. Aynı solver'a daha fazla token ekleyerek veya daha fazla solver çalıştırarak parite sayısını artırabiliriz. Ayrıca kullanıcıların farklı swap boyutlarını seçebildiği, slippage (kayma) oranını ve net fiyatı görebildiği, yanında ham JSON istek ve yanıtlarını içeren bir "expert mode" ile daha zengin bir UI yapabiliriz.

Şimdilik elimizde NEAR Intents ve 1-Click üzerinden BTC ve EURe arasında tam çalışan bir cross-chain swap, her swap'tan %0.3 marj kazanan özel bir AMM solver ve kendi verilerimizle geniş NEAR Intents ağı arasında net bir ayrım sunan izleme ve geçmiş kaydı var.

Sistemin arka planda nasıl çalıştığını anlamak isteyen veya bir solver'ın likidite sağlayarak gerçekten nasıl para kazanabileceğini merak eden herkesle bunu paylaşabilirsin.
