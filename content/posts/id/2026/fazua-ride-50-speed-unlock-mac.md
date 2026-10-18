---
title: "Membuka batas kecepatan Fazua Ride 50 dari Mac, tanpa box"
description: "Bagaimana saya dan agen saya menaikkan batas kecepatan Fazua Ride 50 Evation dari 25 ke 55 lalu 69,77 km/h lewat USB dari MacBook, dengan firmware 2.04 dan alat open source."
date: "2026-10-16"
updated: "2026-10-18"
lang: id
translated_from: "en/fazua-ride-50-speed-unlock-mac"
source_sections: ["the-bike-and-the-problem", "the-idea-change-one-number-instead-of-fooling-the-sensor", "what-i-used", "step-1-connect-the-drivepack-to-the-mac", "step-2-read-before-you-write", "step-3-downgrade-to-204", "step-4-write-55-kmh", "step-5-back-into-the-bike", "what-went-wrong-on-the-way", "battery-modes-and-going-back", "update-raw-value-1938", "free-help-in-berlin"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Canyon Roadlite:ON", "macOS", "how-to"]
source_links: [{"title": "FazuaUnlocker, my fork with the Mac port", "url": "https://github.com/eminogrande/FazuaUnlocker", "note": "fazua_mac.py, README-MAC.md and the firmware download script."}, {"title": "FazuaUnlocker by quezzas", "url": "https://github.com/quezzas/FazuaUnlocker", "note": "The original Windows tool, MIT licence."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "The official tool for firmware updates over USB."}, {"title": "FAZUA: How to do a Ride 50 firmware update", "url": "https://fazua.com/en/support/help-center/videos/how-to-fazua-ride-50-firmware-update", "note": "Manual firmware install, and why the remote LEDs flash afterwards."}, {"title": "Eplus Flash Home, Fazua speed unlocker", "url": "https://www.eplus.bike/en/prodotto/fazua-software-home-speed-unlocker/", "note": "The paid Windows version of the same idea, and the 2.50 to 2.04 downgrade note."}, {"title": "Firmware 2.04, archived original from fazua.com", "url": "https://web.archive.org/web/20220709185915/https://fazua.com/documents/826/evation_Software_2.04.bin", "note": "Internet Archive snapshot of 9 July 2022."}]
tldr: ["Fazua Ride 50 menyimpan batas 25 km/h sebagai satu nilai di drivepack. Di firmware 2.04 Anda bisa mengubahnya lewat USB.", "Saya melakukannya dari MacBook Pro M4. Alat open source-nya hanya untuk Windows, jadi agen saya mengganti lapisan USB-nya dengan hidapi.", "Firmware 2.50 harus dikembalikan dulu ke 2.04, lewat FAZUA Toolbox resmi. File 2.04 adalah file asli dari fazua.com.", "Dibaca ulang setelah ditulis, pertama 55,01 km/h, dua hari kemudian nilai mentah 1938, itu 69,77 km/h. Kalau kamu di Berlin, saya bantu membuka kunci punyamu gratis."]
sections: [{"basically": "Sebuah Canyon Roadlite:ON 2020 dengan Fazua Ride 50 Evation, dan sebuah tuning box yang terus berkedip kuning."}, {"basically": "Box itu membohongi sensor kecepatan. Software-nya hanya mengubah batas yang dicek motor."}, {"basically": "Sepeda saya, MacBook saya, kabel mini USB, obeng T10, FAZUA Toolbox dan sekitar 75 baris Python."}, {"basically": "Drivepack keluar, baterai terpasang, tutup USB dibuka, kabel masuk. Mac melihatnya sebagai evation v2.50."}, {"basically": "Pertama hanya baca. Punya saya menunjukkan 24,98 km/h dan roda 2121 mm. File itu juga cadangannya."}, {"basically": "Di FAZUA Toolbox pilih Manual, bukan Online, pilih file 2.04 dan biarkan mem-flash dan mengkalibrasi."}, {"basically": "Satu perintah menulis batas baru, sepeda mengonfirmasinya, dan pembacaan kedua menunjukkan 55,01 km/h."}, {"basically": "LED putih berkedip bergantian adalah remote yang sedang memperbarui dirinya. Biarkan saja sampai menunjukkan hijau."}, {"basically": "Satu klik yang salah, dua penulisan yang gagal, dan lampu merah yang ternyata hanya drivepack yang kurang pas duduknya."}, {"basically": "Batasnya sama di setiap mode. Jangkauan tidak. Satu perintah mengembalikannya ke 25."}, {"basically": "Dua hari kemudian saya pindah ke nilai mentah 1938, tahun kelahiran ayah saya. Itu 69,77 km/h."}, {"basically": "Kalau kamu di Berlin dan ingin membuka kunci Fazua Ride 50-mu, tulis saya. Gratis."}]
---
## Sepeda dan masalahnya

Sepedaku adalah Canyon Roadlite:ON AL 7.0 tahun 2020, ukuran M, warna pace grey dan oranye. Motornya Fazua Evation, yang sekarang oleh Fazua disebut Ride 50 Evation. Drivepack-nya, motor dan baterai dalam satu unit panjang, duduk di down tube dan bisa dilepas dengan satu tuas. Baterainya Energy 250, remote sentuhnya terpasang di frame. Tidak ada display di handlebar, jadi sepeda ini tidak pernah memberi tahu seberapa cepat kamu melaju.

Sebelum ini drivepack-ku menjalankan firmware 2.50 dan firmware baterai 1.15. Itu pun aku tahu hanya karena aku membacanya dengan FAZUA Toolbox, lihat di bawah.

Bantuannya berhenti di 25 km/jam, seperti semua pedelec di UE. Aku ingin melihat bagaimana rasanya sepeda ini dengan lebih dari itu. Jadi pada 7 Oktober aku membeli Badass Box 4 untuk Fazua. Aku menulis tentang itu di [Badass Box 4 on a Fazua Ride 50, the yellow light](/posts/badass-box-4-fazua-ride-50-yellow-light). Alat itu bekerja selama satu atau dua menit, lalu LED atas berkedip kuning lagi. Magnet lebih dekat, jari-jari lain, diputar 90 derajat, dukungan Badass bilang pemasangannya terlihat bagus. Tetap kuning setelah beberapa menit berkendara.

## Idenya, ubah satu angka alih-alih menipu sensor

Badass Box duduk di sensor kecepatan di chainstay dan mengubah pulsa dari magnet jari-jari, supaya motor mengira kamu lebih lambat dari yang sebenarnya. Itu trik pada sinyalnya, dan di sepedaku Fazua menyadarinya setelah beberapa saat dan menandai soft fault.

Motornya sendiri hanya membandingkan kecepatanmu dengan satu nilai tersimpan. Fazua menyebutnya bikeMaxSpeed. Dealer bisa melihatnya di Toolbox, tapi untuk pengguna biasa itu dikunci abu-abu. Kalau kamu mengubah nilai itu, tidak ada yang perlu ditipu. Sensor melaporkan kecepatan sebenarnya dan motor cukup membantu lebih lama.

Agenku menemukan dua cara untuk melakukannya. Perusahaan Italia Eplus menjual Flash Home seharga 134 euro plus PPN, hanya untuk Windows. Dan ada FazuaUnlocker di GitHub oleh quezzas, gratis, lisensi MIT, juga hanya untuk Windows. Keduanya mengatakan hal yang sama. Alat ini bekerja pada firmware 2.04. Pada 2.50 kamu harus kembali dulu ke 2.04.

```
sebelum (box)                          sesudah (software)

magnet jari-jari -> [box] -> sensor    magnet jari-jari -> sensor
                 |  lebih lambat palsu                    |  kecepatan asli
                 v                                       v
drivepack: batas 25 km/jam             drivepack: batas 55 km/jam
           -> kuning setelah 1-2 menit            -> tanpa box, tanpa kuning
```

## Yang kugunakan

1. Sepedanya, baterai terisi penuh.
2. MacBook Pro M4, 16 GB, macOS 15.5. Berjalan di Apple Silicon, tanpa Windows, tanpa mesin virtual.
3. Kabel data mini USB. Bukan kabel yang hanya untuk mengisi daya.
4. Obeng Torx T10 untuk tutup USB.
5. FAZUA Toolbox 2.29 basic untuk macOS di Apple Silicon, dari situs web Fazua.
6. Firmware 2.04, file evation_Software_2.04.bin. Tautan asli fazua.com sudah hilang, tapi Internet Archive menyimpannya dari 9 Juli 2022. SHA-256 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e. Agenku membandingkannya dengan salinan yang beredar di GitHub, dan keduanya identik sampai ke byte.
7. Fork-ku dari FazuaUnlocker, [github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker), dengan Python 3.9 dan pustaka hidapi.

Alat aslinya berbicara dengan drivepack melalui fungsi USB Windows. Agenku membiarkan protokol, checksum, dan logika penulisan persis seperti aslinya dan hanya mengganti satu lapisan itu dengan hidapi, yang juga berjalan di macOS. Itulah file fazua_mac.py, sekitar 75 baris. Firmware-nya sendiri terenkripsi, jadi tidak ada orang di sini yang mengubah firmware. Alat ini hanya mengubah satu pengaturan.

## Langkah 1, hubungkan drivepack ke Mac

1. Keluarkan drivepack dari sepeda. Baterai tetap di dalam drivepack dan harus dalam keadaan menyala.
2. Lepaskan tutup USB pada drivepack dengan T10. Letaknya di bagian bawah dekat sirip pendingin.
3. Hubungkan kabel mini USB ke Mac dan letakkan drivepack telentang di lantai atau meja.
4. Periksa apakah Mac melihatnya. Di terminal `system_profiler SPUSBDataType | grep evation` menunjukkan `evation v2.50` untukku. Untuk alat ini, perangkatnya adalah USB HID dengan ID 10C4:1001.

Fazua mengatakan dalam panduannya sendiri bahwa kamu hanya butuh drivepack untuk pembaruan firmware, bukan seluruh sepeda. Roda tidak perlu berputar untuk semua ini.

## Langkah 2, baca sebelum menulis

Tutup FAZUA Toolbox dulu, karena aplikasi itu menahan koneksi USB. Lalu:

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

Milikku menjawab setelah sekitar 110 ms. Max Bike Speed 24,98 km/jam, nilai mentah 694. Panjang roda 2121 mm. Shaft offset 30533. Alat ini menurunkan kunci tulis kecil dari offset itu, milikku ba88. Agenku menyimpan hasil bacaan ini sebagai file JSON, jadi aku selalu bisa kembali ke nilai-nilai ini persis.

Lalu dry run, yang membangun paket tulis dengan checksum tapi tidak mengirim apa pun:

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## Langkah 3, downgrade ke 2.04

Ini bagian dengan risiko nyata. Kalau proses flash terputus, drivepack bisa mati. Jadi baterai penuh, kabel terpasang kuat, drivepack diam tidak bergerak.

1. Buka FAZUA Toolbox, pergi ke FIRMWARE UPDATE, klik UPDATE NOW.
2. Pilih Manual. Bukan Online, karena Online memasang versi terbaru lagi.
3. Pilih evation_Software_2.04.bin dan periksa nama file sebelum kamu menekan START.
4. Tunggu. Setelah flash, motor melakukan kalibrasi dan bisa bergetar sedikit. Jangan gerakkan drivepack.
5. Periksa lagi dengan system_profiler. Milikku sekarang menunjukkan `evation v2.04`.

Membaca lagi setelah downgrade masih menunjukkan 24,98 km/jam. Perubahan firmware saja tidak membuka apa pun.

## Langkah 4, tulis 55 km/jam

```sh
.venv/bin/python fazua_mac.py 55 --force
```

Alat ini menunjukkan perubahan dari 24,98 km/jam, mentah 694, ke 55,00 km/jam, mentah 1528. Lalu "Write cycle acknowledged by bike", lalu alat itu membaca nilainya kembali sendiri. "SUCCESS: bikeMaxSpeed is now 55.01 km/h". Pembacaan terpisah beberapa detik kemudian mengatakan hal yang sama, panjang roda masih 2121 mm.

Alat ini menerima 5 sampai 75 km/jam. Aku memilih 55 karena aku ingin melihat bagaimana rasanya. Agenku menyarankan 45, karena motor tidak punya tenaga tak terbatas dan di atas kecepatan tertentu sebagian besar tetap datang dari kakimu. Apa pun yang kamu atur, motor hanya membantu lebih lama, ia tidak membuat sepeda lebih cepat dengan sendirinya.

## Langkah 5, kembali ke sepeda

1. Cabut kabel, pasang kembali tutup USB dengan tangan, 1 sampai 1,5 Nm. Tanpa tutup itu drivepack tidak tahan air.
2. Masukkan drivepack ke sepeda sampai terdengar klik.
3. Nyalakan.

Di sepedaku remote lalu berkedip putih, dua LED di atas dan dua di bawah, bergantian. Itu terlihat seperti error. Bukan. Fazua menulis dalam panduan pembaruannya "Flashing LEDs indicates an update of the remote. Do not touch the remote during the update and do not switch off the e-bike." Drivepack membawa remote ke level firmware-nya sendiri. Milikku mati sekali, menyala lagi, dan kemudian semuanya hijau.

Lalu aku mengujinya. Sepertinya berhasil. Aku belum punya kecepatan puncak yang pasti, karena sepeda ini tidak punya display. Lain kali ponsel dengan speedometer GPS akan dipasang di handlebar.

## Apa yang salah di jalan

Agen saya mengklik Toolbox di Mac sendiri, dan klik pertama mengenai CALIBRATION, bukan FIRMWARE UPDATE. Hanya halaman yang terbuka, tidak ada yang dimulai. Lalu klik pada Manual tidak masuk, karena klik yang dikirim di latar belakang tidak sampai ke dialog itu. Agen saya berhenti di situ, karena klik yang salah pada START akan menginstal 2.50 lagi. Saya klik Manual dan filenya sendiri.

Dua percobaan tulis pertama dibatalkan. Alat itu meminta yes sebelum menulis, dan cara agen saya memasukkan jawaban tidak sampai ke pertanyaan itu. Tidak ada yang tertulis, pembacaan setelahnya masih menunjukkan 24,98 km/jam. Dengan --force akhirnya berhasil.

Kemudian saya mengeluarkan drivepack lagi, menutup tutup USB dan memindahkan magnet, lalu LED atas menyala merah. Merah bukan magnet. Manual Fazua bilang merah di atas berarti kesalahan koneksi antara drivepack dan bottom bracket, bagian di frame tempat drivepack terpasang. Saya mengeluarkannya, memeriksa kontaknya, memasukkannya lagi sampai berbunyi klik, dan semuanya baik-baik saja.

Dan setelah 15 menit berdiri, sistem mati sendiri. Itu juga normal, ada di manual.

## Baterai, mode, dan kembali

Batasnya adalah satu nilai di drivepack. Hijau, biru, dan pink semuanya menggunakan 55 km/jam yang sama. Mode hanya mengubah seberapa keras motor mendorong dan seberapa cepat baterai habis. Berkendara lebih cepat membutuhkan energi jauh lebih banyak, jadi di atas 25 jangkauan turun dengan cepat.

Pada firmware 2.04 baterai juga tetap menyala lebih lama setelah berkendara. Pada 2.50 Fazua telah memangkas standby itu menjadi satu sampai tiga jam, pada firmware lama bisa sampai delapan. Jadi setelah berkendara saya menahan tombol di baterai selama dua detik sampai LED mati.

Kembali ke stok adalah satu perintah dengan kabel terhubung:

```sh
.venv/bin/python fazua_mac.py 25 --force
```

Eplus menulis bahwa Anda bisa memperbarui ke 2.50 lagi setelah membuka kunci. Saya belum mencobanya, jadi untuk sekarang saya tetap di 2.04 dan tidak menekan update di Toolbox atau aplikasi.

Di atas 25 km/jam sepeda bukan lagi pedelec. Di Jerman, sepeda itu hanya boleh digunakan di tanah pribadi, bukan di jalan umum, dan garansi serta asuransi bisa hilang. Flashing firmware bisa merusak drivepack. Semua yang ada di sini adalah risiko Anda sendiri.

## Pembaruan, nilai mentah 1938

Dua hari kemudian baterainya kembali di Mac dan saya ingin lebih tinggi lagi. Pertama saya meminta 69,69 km/jam. Itu tidak ada persisnya. Drivepack tidak menyimpan km/jam, ia menyimpan satu bilangan bulat, nilai mentah, dan km/jam adalah nilai mentah dikali 0,036. Jadi 69,69 menjadi mentah 1936, itu 69,70 km/jam.

Lalu saya memilih nilai mentah 1938, karena 1938 adalah tahun kelahiran ayah saya. 1938 dikali 0,036 adalah 69,768, alat menunjukkan 69,77 km/jam. Itu jenis angka yang sama seperti sebelumnya. 55,01 juga hanya pembulatan, 1528 dikali 0,036 adalah 55,008.

Langkahnya sama seperti di langkah 2 dan langkah 4. Pertama hanya baca, masih menunjukkan 55,01 km/jam, mentah 1528, roda 2121 mm. Lalu dry run. Di paket hanya dua byte kecepatan yang berubah, semua yang lain tetap sama. Lalu:

```sh
.venv/bin/python fazua_mac.py 69.768 --force
```

Agen saya mengetik 69,768 dengan tiga desimal hanya supaya alat mendarat persis di 1938. Ke sepeda ia mengirim bilangan bulat. "Write cycle acknowledged by bike", lalu "SUCCESS: bikeMaxSpeed is now 69.77 km/h". Pembacaan terpisah setelahnya menunjukkan mentah 1938, panjang roda 2121 mm, tidak ada yang lain berubah.

Pengaturannya tampaknya berhasil. Saya masih belum punya kecepatan puncak yang terukur. 69,77 km/jam adalah batas bantuan yang dikonfigurasi, bukan kecepatan terukur dan bukan kecepatan yang dicapai sepeda dengan sendirinya.

Kembali ke 55 adalah `.venv/bin/python fazua_mac.py 55.008 --force`, yang memberikan mentah 1528 lagi.

## Bantuan gratis di Berlin

Kalau kamu di Berlin dan ingin membuka kunci Fazua Ride 50-mu dengan cara yang sama, tulis saya di [emin@emin.de](mailto:emin@emin.de). Saya melakukannya gratis. Sekali lagi, di atas 25 km/jam hanya untuk tanah pribadi, dan kamu melakukannya dengan risiko sendiri.
