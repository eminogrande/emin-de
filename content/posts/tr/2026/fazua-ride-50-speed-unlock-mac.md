---
title: "Mac üzerinden Fazua Ride 50 hız sınırı kaldırma, kutu mox yok"
description: "Ben ve ajanım, bir MacBook üzerinden USB aracılığıyla Fazua Ride 50 Evation'ın hız limitini önce 25'ten 55'e, sonra da 69.77 km/saat seviyesine nasıl çıkardığımızı anlatıyorum. İşin içinde 2.04…"
date: "2026-10-16"
updated: "2026-10-18"
lang: tr
translated_from: "en/fazua-ride-50-speed-unlock-mac"
source_sections: ["the-bike-and-the-problem", "the-idea-change-one-number-instead-of-fooling-the-sensor", "what-i-used", "step-1-connect-the-drivepack-to-the-mac", "step-2-read-before-you-write", "step-3-downgrade-to-204", "step-4-write-55-kmh", "step-5-back-into-the-bike", "what-went-wrong-on-the-way", "battery-modes-and-going-back", "update-raw-value-1938", "berlin"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Canyon Roadlite:ON", "macOS", "how-to"]
source_links: [{"title": "FazuaUnlocker, my fork with the Mac port", "url": "https://github.com/eminogrande/FazuaUnlocker", "note": "fazua_mac.py, README-MAC.md and the firmware download script."}, {"title": "FazuaUnlocker by quezzas", "url": "https://github.com/quezzas/FazuaUnlocker", "note": "The original Windows tool, MIT licence."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "The official tool for firmware updates over USB."}, {"title": "FAZUA: How to do a Ride 50 firmware update", "url": "https://fazua.com/en/support/help-center/videos/how-to-fazua-ride-50-firmware-update", "note": "Manual firmware install, and why the remote LEDs flash afterwards."}, {"title": "Eplus Flash Home, Fazua speed unlocker", "url": "https://www.eplus.bike/en/prodotto/fazua-software-home-speed-unlocker/", "note": "The paid Windows version of the same idea, and the 2.50 to 2.04 downgrade note."}, {"title": "Firmware 2.04, archived original from fazua.com", "url": "https://web.archive.org/web/20220709185915/https://fazua.com/documents/826/evation_Software_2.04.bin", "note": "Internet Archive snapshot of 9 July 2022."}]
tldr: ["Fazua Ride 50, 25 km/saat hız sınırını drivepack içinde tek bir değer olarak tutuyor. 2.04 firmware sürümünde bunu USB üzerinden değiştirmek mümkün.", "Ben bu işlemi MacBook Pro M4 ile yaptım. Açık kaynaklı araç sadece Windows içindi, o yüzden ajanım USB katmanını hidapi ile değiştirdi.", "Önce resmi FAZUA Toolbox ile firmware sürümünü 2.50'den 2.04'e düşürmek gerekti. 2.04 dosyası fazua.com'daki orijinal dosya.", "Yazdıktan sonra tekrar okuttum, ilk önce 55.01 km/saat çıktı, iki gün sonra ham değeri 1938'e çektim, yani 69.77 km/saat. Berlin'deysen ve Fazua Ride 50'nin kilidini kaldırmak istiyorsan bana yazabilirsin."]
sections: [{"basically": "2020 model bir Canyon Roadlite:ON, üzerinde Fazua Ride 50 Evation var ve sürekli sarı yanıp sönen o tuning kutuları canımı sıkıyordu."}, {"basically": "Kutu, hız sensörünü yanıltarak çalışıyor. Yazılımsal müdahale ise doğrudan motorun kontrol ettiği limit değerini değiştiriyor."}, {"basically": "İhtiyacım olanlar: Benim bisiklet, benim MacBook, bir mini USB kablosu, T10 tornavida, FAZUA Toolbox ve yaklaşık 75 satır Python kodu."}, {"basically": "Drivepack'i çıkar, bataryayı tak, USB kapağını aç ve kabloyu bağla. Mac bunu evation v2.50 olarak görüyor."}, {"basically": "Önce sadece okuma yaptım. Benimkinde 24.98 km/saat ve 2121 mm tekerlek ölçüsü kayıtlıydı. O dosyayı yedek olarak sakladım."}, {"basically": "FAZUA Toolbox'ta Online değil Manual seçeneğini kullan, 2.04 dosyasını göster ve yükleyip kalibre etmesini bekle."}, {"basically": "Tek bir komutla yeni limiti yazıyorsun, bisiklet onaylıyor, ikinci okumada limit 55.01 km/saat olarak görünüyor."}, {"basically": "Beyaz LED'lerin sırayla yanıp sönmesi kumandanın kendini güncellediği anlamına geliyor. Yeşil ışığa dönene kadar dokunma."}, {"basically": "Yanlış bir tıklama ve iki yarım kalan yazma işleminden sonra kırmızı ışık yandı ama sorun sadece drivepack'in tam oturmamasıymış."}, {"basically": "Limit her modda aynı. Menzil değil ama. Tek komutla istediğin zaman tekrar 25'e döndürebiliyorsun."}, {"basically": "İki gün sonra ham değeri 1938 yaptım, yani babamın doğum yılı. Sonuç: 69.77 km/saat."}, {"basically": "Berlin'deysen ve Fazua Ride 50'nin kilidini kaldırmak istiyorsan bana ulaşabilirsin."}]
---
## Bisiklet ve sorun

Bisikletim 2020 model, pace gri ve turuncu renkli, M beden bir Canyon Roadlite:ON AL 7.0. Fazua bugün Ride 50 Evation olarak adlandırdığı Fazua Evation motoru kullanıyor. Motor ve bataryanın birleşip uzun bir parça oluşturduğu "drivepack", alt borunun içinde duruyor ve tek bir mandalla yerinden çıkıyor. Bataryası Energy 250, touch remote ise kadroya gömülü. Gidonda herhangi bir ekran yok, o yüzden bisiklet size ne kadar hızlı gittiğinizi asla söylemiyor.

Bundan önce drivepack'te 2.50, bataryada ise 1.15 yazılımı vardı. Bunu nereden mi biliyorum? Aşağıda göreceğin FAZUA Toolbox ile okudum da oradan.

AB'deki her pedelec'te olduğu gibi, destek 25 km/s hızda kesiliyor. Bisikletin daha fazlasıyla nasıl bir his verdiğini merak ettim. 7 Ekim'de Fazua için bir Badass Box 4 aldım. [Badass Box 4 on a Fazua Ride 50, the yellow light](/posts/badass-box-4-fazua-ride-50-yellow-light) yazımda bundan bahsetmiştim. Bir iki dakika çalıştı, sonra en üstteki LED tekrar sarı yanıp sönmeye başladı. Mıknatısı yaklaştırdım, başka tele taktım, 90 derece çevirdim, Badass desteği kurulumun gayet iyi göründüğünü söyledi. Yine de birkaç dakika sürdükten sonra sarı ışık yanıyordu.

## Fikir, sensörü kandırmak yerine bir sayıyı değiştirmek

Badass Box çatalın üzerindeki hız sensörüne takılıyor ve tekerlek mıknatısından gelen sinyalleri değiştirerek motorun olduğundan daha yavaş gittiğini sanmasını sağlıyor. Bu sinyal üzerinde yapılan bir hile ve benim bisikletin Fazua sistemi bir süre sonra bunu fark edip yazılımsal bir hata kodu veriyordu.

Motorun kendisi hızınızı sadece kayıtlı bir değerle kıyaslıyor. Fazua buna bikeMaxSpeed diyor. Bayiler bunu Toolbox üzerinden görebiliyor ama normal kullanıcılar için burası gri yani değiştirilemez durumda. Eğer bu değeri değiştirirseniz kandırılacak bir şey kalmıyor. Sensör gerçek hızı bildiriyor, motor da sadece daha uzun süre destek veriyor.

Temsilcim bunu yapmanın iki yolunu bulmuş. İtalyan bir şirket olan Eplus, Flash Home'u KDV hariç 134 euroya satıyor, sadece Windows'ta çalışıyor. Bir de quezzas tarafından GitHub'da paylaşılan, ücretsiz, MIT lisanslı ve yine sadece Windows'ta çalışan FazuaUnlocker var. İkisi de aynı kapıya çıkıyor. 2.04 yazılımında çalışıyor. Eğer 2.50'deyseniz önce 2.04'e dönmeniz gerekiyor.

```
öncesi (box ile)                       sonrası (yazılımla)

jant mıknatısı -> [box] -> sensör        jant mıknatısı -> sensör
                 |  sahte yavaşlık                         |  gerçek hız
                 v                                         v
drivepack: limit 25 km/s               drivepack: limit 55 km/s
           -> 1-2 dk sonra sarı ışık              -> box yok, sarı ışık yok
```

## Neler kullandım

1. Bisiklet ve tam dolu batarya.
2. 16 GB bellekli, macOS 15.5 yüklü MacBook Pro M4. Apple Silicon işlemcili, Windows veya sanal makine yok.
3. Mini USB veri kablosu. Sadece şarj eden kablolardan değil.
4. USB kapağı için T10 Torx tornavida.
5. Fazua'nın sitesinden indirdiğim, Apple Silicon için macOS FAZUA Toolbox 2.29 basic sürümü.
6. 2.04 yazılımı, yani evation_Software_2.04.bin dosyası. Orijinal fazua.com linki uçmuş ama Internet Archive sağ olsun, 9 Temmuz 2022'deki halini saklamış. SHA-256 değeri: 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e. Temsilcim GitHub'da dolaşan kopyayla karşılaştırdı, bayt bayt aynılar.
7. FazuaUnlocker fork'um, [github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker), Python 3.9 ve hidapi kütüphanesiyle.

Orijinal araç drivepack ile Windows'un USB fonksiyonları üzerinden konuşuyor. Temsilcim protokolü, sağlama toplamını (checksum) ve yazma mantığını olduğu gibi bıraktı, sadece o katmanı macOS'te de çalışan hidapi ile değiştirdi. fazua_mac.py dosyası bu, yaklaşık 75 satır. Yazılımın kendisi şifreli, yani kimse burada firmware'i değiştirmiyor. Araç sadece bir ayarı değiştiriyor.

## Adım 1, drivepack'i Mac'e bağlamak

1. Drivepack'i bisikletten çıkar. Batarya drivepack'in içinde kalsın ve açık durumda olsun.
2. T10 tornavidayla drivepack üzerindeki USB kapağını aç. Soğutma kanatçıklarının orada, altta kalıyor.
3. Mini USB kablosunu Mac'e bağla ve drivepack'i yere veya masaya düz bir şekilde koy.
4. Mac'in görüp görmediğini kontrol et. Terminalde `system_profiler SPUSBDataType | grep evation` yazdığımda bende `evation v2.50` çıktı. Araç için bu, ID değeri 10C4:1001 olan bir USB HID cihazı.

Fazua kendi kılavuzunda firmware güncellemesi için tüm bisiklete değil, sadece drivepack'e ihtiyacınız olduğunu söylüyor. Bunun için tekerleğin dönmesine gerek yok.

## Adım 2, yazmadan önce okumak

USB bağlantısını tuttuğu için önce FAZUA Toolbox'ı kapat. Sonra:

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

Benimki yaklaşık 110 ms sonra cevap verdi. Max Bike Speed 24.98 km/s, ham değer 694. Tekerlek çevresi 2121 mm. Shaft offset 30533. Araç bu offset değerinden küçük bir yazma anahtarı (write key) türetiyor, benimki ba88'di. Temsilcim bu okumayı bir JSON dosyası olarak kaydetti, böylece her zaman tam olarak bu değerlere dönebilirim.

Sonra bir deneme sürüşü (dry run), sağlama toplamıyla yazma paketini oluşturuyor ama hiçbir şey göndermiyor:

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## Adım 3, 2.04'e düşürmek (downgrade)

Gerçek risk burada başlıyor. Eğer yazılım yükleme kesilirse drivepack çöp olabilir. O yüzden batarya tam dolu, kablo sabit, drivepack hareketsiz.

1. FAZUA Toolbox'ı aç, FIRMWARE UPDATE kısmına git ve UPDATE NOW'a tıkla.
2. Manual seçeneğini seç. Online değil, çünkü Online versiyonu tekrar en güncel sürüme yükseltir.
3. evation_Software_2.04.bin dosyasını seç ve START'a basmadan önce dosya adına bir daha bak.
4. Bekle. Yüklemeden sonra motor kendini kalibre ederken biraz titreyebilir. Drivepack'i sakın kıpırdatma.
5. system_profiler ile tekrar kontrol et. Benimki artık `evation v2.04` diyordu.

Düşürmeden sonra tekrar okuma yaptığımda hala 24.98 km/s görüyordu. Sadece firmware değiştirmek kilidi açmıyor.

## Adım 4, 55 km/s olarak yazmak

```sh
.venv/bin/python fazua_mac.py 55 --force
```

Araç değerin 24.98 km/s (ham 694) halinden 55.00 km/s (ham 1528) haline değiştiğini gösterdi. Sonra "Write cycle acknowledged by bike" dedi ve değeri kendi kendine tekrar okudu. "SUCCESS: bikeMaxSpeed is now 55.01 km/h". Birkaç saniye sonra ayrı bir okuma daha yaptım, yine aynı sonucu verdi, tekerlek çevresi hala 2121 mm.

Araç 5 ile 75 km/s arasını kabul ediyor. 55'i seçtim çünkü nasıl olduğunu görmek istiyorum. Temsilcim 45'i önerdi çünkü motorun gücü sonsuz değil ve belirli bir hızdan sonra zaten çoğunu kendi bacaklarınızla sağlıyorsunuz. Kaça ayarlarsanız ayarlayın, motor sadece daha uzun süre destek veriyor, kendi başına bisikleti daha hızlı yapmıyor.

## Adım 5, bisiklete geri takmak

1. Kabloyu çıkar, USB kapağını elinle geri tak, 1 ile 1.5 Nm arası. Kapak olmadan drivepack su geçirmez değil.
2. Drivepack'i tık sesi gelene kadar bisiklete yerleştir.
3. Aç.

Bisikletimde kumanda beyaz yanıp sönmeye başladı, üstten iki ve alttan iki LED sırayla yanıyordu. Hata gibi duruyor ama değil. Fazua güncelleme kılavuzunda "LED'lerin yanıp sönmesi kumandanın güncellendiğini gösterir. Güncelleme sırasında kumandaya dokunmayın ve e-bisikleti kapatmayın" diyor. Drivepack kumandayı kendi yazılım seviyesine çekiyor. Benimki bir kere kapandı, geri açıldı ve sonra her şey yeşile döndü.

Sonra test ettim. Çalışıyor gibi. Henüz tam son hızı bilmiyorum çünkü bisiklette ekran yok. Bir dahaki sefere gidona GPS hız göstergeli bir telefon takacağım.

## Yol boyunca neler ters gitti

Ajanım Mac üzerindeki Toolbox’ta kendi kendine tıklandı, ilk tık da FIRMWARE UPDATE yerine yanlışlıkla CALIBRATION kısmına gitti. Sadece sayfayı açtı, işlem başlamadı. Sonra Manual kısmına yapılan tıklama boşa gitti, çünkü arka planda gönderilen tıklamalar o diyaloğa ulaşmadı. Ajanım orada takılı kaldı, çünkü START butonuna yanlış bir tıklama 2.50 sürümünü tekrar kuracaktı. Dosyaya manuel olarak kendim tıkladım.

İlk iki yazma denemesi hata verdi. Araç yazmadan önce onay istiyor, ajanımın cevapları gönderme şekli o soruya ulaşmadı. Hiçbir şey yazılmadı, sonrasında yapılan okumada hala 24.98 km/s görünüyordu. --force komutuyla işlem tamamlandı.

Sonrasında drivepack’i tekrar çıkardım, USB kapağını kapattım ve mıknatısı oynattım, ardından üstteki LED kırmızı yandı. Kırmızı ışık mıknatısla ilgili değil. Fazua kılavuzuna göre üstteki kırmızı ışık, drivepack ile kadroya takılan orta göbek (bottom bracket) arasında bir bağlantı hatası demek. Çıkardım, kontakları kontrol ettim, tık sesi gelene kadar tekrar ittirdim ve düzeldi.

Bir de 15 dakika boşta durunca sistem kendini kapatıyor. Bu da normal, zaten kılavuzda yazıyor.

## Batarya, modlar ve geri dönüş

Sınır, drivepack içindeki tek bir değer. Yeşil, mavi ve pembe modların hepsi aynı 55 km/s sınırını kullanıyor. Modlar sadece motorun ne kadar güç uyguladığını ve bataryanın ne kadar hızlı bittiğini değiştiriyor. Daha hızlı sürmek çok daha fazla enerji harcıyor, bu yüzden 25’in üzerinde menzil hızla düşüyor.

2.04 sürümünde batarya sürüşten sonra daha uzun süre uyanık kalıyor. 2.50’de Fazua bu bekleme süresini bir ila üç saate indirmişti, eski sürümde ise sekiz saate kadar çıkıyor. O yüzden sürüşten sonra LED’ler sönene kadar bataryadaki düğmeye iki saniye basılı tutuyorum.

Fabrika ayarlarına dönmek, kablo bağlıyken tek bir komutluk iş:

```sh
.venv/bin/python fazua_mac.py 25 --force
```

Eplus, kilidi açtıktan sonra tekrar 2.50’ye güncelleyebileceğinizi yazmış. Ben denemedim, şimdilik 2.04’te kalıyorum ve Toolbox veya uygulama üzerinden güncellemeye basmıyorum.

25 km/s hızın üzerinde bisiklet artık pedelec sayılmıyor. Almanya’da sadece özel mülkte kullanılabiliyor, kamuya açık yollarda yasak, ayrıca garanti ve sigorta kapsamı dışı kalabiliyor. Firmware yüklemek drivepack’i bozabilir. Burada yazan her şey tamamen sizin sorumluluğunuzda.

## Güncelleme, ham değer 1938

İki gün sonra bataryayı tekrar Mac’e bağladım ve biraz daha yükseltmek istedim. Önce 69.69 km/s istedim. Tam olarak böyle bir değer yok. Drivepack km/s bilgisini saklamıyor, tek bir tam sayı olan ham değeri (raw value) saklıyor, km/s ise ham değer çarpı 0.036 ediyor. Yani 69.69 değeri 1936 ham değerine dönüştü, bu da 69.70 km/s demek.

Sonra 1938 ham değerini seçtim, çünkü 1938 babamın doğum yılı. 1938 çarpı 0.036, 69.768 eder, araç 69.77 km/s gösteriyor. Bu da öncekine benzer bir sayı. 55.01 de sadece yuvarlanmıştı, 1528 çarpı 0.036, 55.008 eder.

Adımlar 2. ve 4. adımdakiyle aynıydı. Önce sadece okuma yaptım, hala 55.01 km/s, 1528 ham değer ve 2121 mm tekerlek ölçüsü görünüyordu. Sonra bir deneme sürüşü yaptım. Pakette sadece hızla ilgili iki bayt değişti, diğer her şey aynı kaldı. Sonra şu komutu girdim:

```sh
.venv/bin/python fazua_mac.py 69.768 --force
```

Ajanım 69.768’i üç ondalık basamakla yazdı ki araç tam olarak 1938 değerine denk gelsin. Bisiklete ise tam sayıyı gönderiyor. "Write cycle acknowledged by bike", yani "Yazma döngüsü bisiklet tarafından onaylandı", ardından "SUCCESS: bikeMaxSpeed is now 69.77 km/h". Sonrasında yaptığım ayrı bir okumada ham değer 1938, tekerlek uzunluğu 2121 mm göründü, başka hiçbir şey değişmedi.

Ayarlar çalışıyor gibi. Hala ölçülmüş bir son hızım yok. 69.77 km/s sadece ayarlanmış destek kesme hızı, ölçülmüş bir hız veya bisikletin kendi kendine ulaştığı bir hız değil.

55’e geri dönmek için `.venv/bin/python fazua_mac.py 55.008 --force` komutunu kullanıyorum, bu da tekrar 1528 ham değerini veriyor.

## Berlin

Berlin’deyseniz ve Fazua Ride 50’nizin kilidini açmak istiyorsanız, bana ulaşmaktan çekinmeyin: [emin@emin.de](mailto:emin@emin.de).
