---
title: "Tambahkan saja pengguna Nuri mana pun"
description: "Referral, Guardian, warisan, Multisig dan menabung bersama akan menjadi satu fitur di Nuri. Kamu menambahkan username di pengaturan, sisanya mengikuti dari situ."
date: "2026-10-18"
updated: "2026-10-18"
lang: id
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-dazu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-dazu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["Ide saya untuk Nuri adalah satu fitur tunggal. Kamu menambahkan username seseorang di pengaturan.", "Dari situ mengikuti referral, Guardian, warisan, Multisig dan menabung bersama, tergantung apa yang kamu izinkan.", "Fee ada di frontend kami, terbuka di source code, dan kamu mengaturnya sendiri antara 0 dan 10 persen."]
sections: [{"basically": "Di Nuri, referral, Guardian, warisan dan Multisig akan menjadi satu fitur. Kamu menambahkan username di pengaturan."}, {"basically": "Siapa pun yang menambahkan teman di Nuri, berbagi fee dengannya. Kalau 10 orang, fee-nya dibagi 10."}, {"basically": "Setiap pembayaran mengirim beberapa satoshi dan notifikasi push ke orang-orangmu. Itu membuat Nuri viral."}, {"basically": "Pada Expanding Multisig, key para Guardian-mu baru aktif ketika kamu kehilangan key milikmu sendiri."}, {"basically": "Seorang Guardian membantumu memulihkan key-mu. Seorang ahli waris baru bisa mengaksesnya kalau kamu tidak melakukan apa-apa selama setahun."}, {"basically": "Nuri tidak mengambil fee dari para provider, melainkan di frontend sendiri, terbuka di source code."}, {"basically": "Di Nuri kamu mengatur fee-mu sendiri, dari 0 sampai 10 persen. Di pesta-pesta saya, donasi menghasilkan lima kali lipat."}, {"basically": "Setiap API call di Nuri akan menjadi pembayaran kecil x402 atau L402. Dengan itu masalah fee terpecahkan."}, {"basically": "Tidak ada yang paham Multisig. Tiga orang dan satu hardware wallet, semua orang paham. Begitu cara kami menjelaskan Nuri."}, {"basically": "Langkah pertama di Nuri hanyalah satu teman di pengaturan, yang ikut mendapat bagian. Semua yang lain dibangun di atasnya."}]
---
Saya rasa, saya baru saja memecahkan sesuatu yang cukup bagus pagi ini. Ini tentang sebuah fitur untuk Nuri. Ini idenya dulu.

## Satu fitur, bukan lima

Saya mau menggabungkan Multisig, Guardians, Inheritance, dan Referral jadi satu fitur. Dan caranya begini. Saya cukup menambahkan username kamu di Settings aplikasi saya. Cuma itu.

Begitu saya melakukannya, kamu dapat 50 persen dari fee yang saya bayar ke Nuri. Kamu bisa sekaligus jadi Guardian saya. Artinya, kamu membantu saya dengan passkey kamu untuk memulihkan akun saya di masa depan. Kamu juga bisa masuk ke wallet sebagai Co-Signer. Atau kita sebuah perusahaan dan mau punya Multisig-Wallet bersama.

Itu semua fitur yang berbeda. Tapi semuanya berbasis pada fitur frontend yang sama. Cukup tambahkan user Nuri mana pun.

## Fee-nya dibagi

Fee yang saya bayar ke Nuri, kita tetapkan dulu entah bagaimana di 2,1 persen. Setiap kali saya melakukan pembayaran, setengahnya masuk ke Nuri dan setengahnya lagi ke orang yang saya tambahkan.

Kamu juga bisa menambahkan 10 username. Maka kamu punya wallet dengan 10 orang, dan fee-nya dibagi 10. Semua orang barumu otomatis dapat bagian, dan Nuri dapat sepersepuluh.

Tentu saja kita juga bisa saling menambahkan, lalu uangnya kembali lagi ke saya. Kita harus memastikan tidak membuat loop di sana. Itu jelas tidak bisa.

## Mama saya dapat 17 Satoshi

Bitcoiner ingin membuat orang lain jadi Bitcoiner. Sekarang saya bisa mengundang mama saya. Dan dia dapat push-notification setiap kali saya melakukan pembayaran. Kamu baru saja dapat 20 Satoshi. Kamu baru saja dapat 17 Satoshi.

Saya tahu ini dari diri saya sendiri. Di layanan lain, saya dapat pesan Telegram setiap kali ada swap, dan di situ tertulis bahwa saya baru saja menghasilkan 10 Satoshi. Itu hal paling viral yang pernah saya alami sendiri. Lucu, dan kita saling memberi sedikit uang.

Dengan Arkade kita juga bisa mengirim 1, 2, 3, 4, atau 5 Satoshi tanpa fee. Dan itu juga menunjukkan sedikit betapa kerennya Arkade di titik ini.

## Expanding, bukan Decaying Multisig

Key yang kita tambahkan melakukan kebalikan dari yang biasa kita lakukan di Nuri. Kalau kita tidak mau mereka jadi signer sejak awal, maka itu bukan Decaying Multisig, melainkan Expanding Multisig.

Artinya, kalau saya kehilangan semua key saya, maka setelah beberapa waktu, setahun atau begitu, key milik Guardian saya aktif secara otomatis. Di Bitcoin itu bisa dilakukan. Di Ethereum mungkin lebih sulit, tapi pasti bisa juga.

Dan jelas, itu adalah settings yang bisa diatur. Tidak boleh ada yang bisa mengakses uangmu hanya karena kamu tidak menggerakkan Bitcoinmu selama setahun.

## Guardian dan ahli waris

Guardian adalah satu fitur. Untuk itu saya mau meniru persis seperti Bitkey. Mereka membangunnya entah bagaimana sehingga Guardianmu bisa membantumu memulihkan key-mu, tapi tidak punya akses ke uangmu. Bagaimana persisnya mereka melakukannya, masih harus kita pelajari.

Fitur lainnya adalah Inheritance, dan itu sangat penting. Saya ingin misalnya memasukkan kakak perempuan saya sebagai ahli waris. Setiap kali saya melakukan pembayaran, sebuah counter direset ke nol. Dan kalau sesuatu terjadi pada saya, apa pun alasannya, saya tidak bangun keesokan harinya, maka dia akan aktif secara otomatis setelah setahun dan punya akses ke dana saya. Hal seperti itu sangat penting dan sangat keren.

## Fee ada di frontend

Yang jauh lebih penting adalah di mana fee itu berada. Hari ini kita mengambilnya di para provider, dan itu sebuah kesalahan. Kita harus menetapkan fee di para provider ke nol di mana-mana dan mengambilnya di kita, di frontend atau di backend kita. Di belakang Nuri bisa ada sepuluh juta provider, sama sekali tidak masalah. Mereka mengambil spread dan fee mereka, dan kita tidak menambahkan apa pun di atasnya.

Dengan begitu kita bisa membedakan antara Nuri-Fee dan Partner-Fee. Itu bersih saja. Dan saya mau menunjukkan kepada orang-orang di kode open source, lihat, ini fee-nya, tertulis di source code. Saya mau kita jadi perusahaan paling transparan di dunia.

Cerita favorit saya soal ini adalah protes keras di komunitas Aave, ketika di latar belakang provider swap-nya diganti. Dari situ terlihat bahwa backend tidak punya power lagi, melainkan frontend. Siapa yang punya pengguna, dia yang punya moat.

## Tentukan fee-mu sendiri

Kita bahkan membiarkan orang menentukan fee-nya sendiri. Murni demi keadilan. Kalau kamu tidak mau bayar fee, kamu bisa turun ke 0 persen. Tapi kamu juga bisa naik ke 10 persen, kalau kamu mau. Dan kalau ada yang bertanya, kenapa kalian mengambil 2 persen, kita bilang, masuk ke Settings dan ubah itu.

Kenapa saya percaya ini berhasil, berasal dari pesta-pesta saya di Berlin. Berapa pun harga tiket masuk yang saya ambil dan berapa pun harga bir, orang-orang entah bagaimana tidak pernah merasa itu oke. Akhirnya kami bilang, fuck it, donasi untuk bir, donasi untuk tiket masuk. Kami menghasilkan kira-kira lima kali lipat uangnya.

Kalau kamu memberi orang kesempatan untuk menentukannya sendiri, maka ada juga orang yang menetapkannya jauh lebih tinggi. Karena mereka suka gamification-nya atau karena mereka ikut dalam misinya. Ada yang kaya dan yang miskin, yang pelit dan yang lainnya. Saya akan menetapkan fee saya ke 10 persen untuk orang yang saya temui di konferensi dan saya tambahkan ke akun saya. Maka mereka otomatis dapat split saya.

## Setiap call adalah pembayaran kecil

Saya punya ide yang lebih baik lagi bagaimana kita mengambil fee. Kita gate saja API Nuri dengan micropayment, dan micropayment itu adalah fee kita. Setiap operasi di aplikasi lalu membutuhkan pembayaran kecil x402 atau L402. L402 kalau berkaitan dengan Bitcoin, x402 kalau berkaitan dengan kripto.

Sebuah contoh. Menyimpan atau membaca password baru di Nuri-Password-Manager-mu biayanya 0,1 sen atau 1 sen. Dan itu bisa kita ambil langsung dari wallet, karena wallet-nya agentic. Di Router saya sudah melakukannya seperti itu. Kamu bisa memakainya dengan token atau kamu membayar untuk call-nya, dan kita bisa memberi harga berbeda untuk setiap endpoint.

Maka kamu tidak perlu membangun sistem fee sendiri. Siapa pun bisa mengintegrasikan API kita di mana pun dia mau, dan kita otomatis menerima payment-nya. Saya akan mulai dengan buku kontak, 0,1 sen setiap kali seseorang menambahkan kontak. Kalau itu jalan, kita perluas ke seluruh aplikasi. Satu fitur demi satu fitur.

## Wallet keluarga dan hardware wallet

Begitu orang mengalami bagaimana wallet Safe seperti yang kami punya sebagai perusahaan bekerja, mereka merasa itu keren banget. Saya punya satu kunci, dan kita harus bersama-sama. Itu pengalaman kripto yang benar-benar keren.

Atau wallet keluarga. Mama saya, kakak saya, dan saya. Dua dari kami bisa bersama-sama. Multisig tidak bisa dibayangkan orang. Tapi mengatakan, kami bertiga dan satu hardware wallet, atau kami berlima dan satu AI, itu dipahami semua orang.

Dan kita tetap pada prinsip yang tidak bisa dilakukan orang lain. One-Click-Face-ID-Wallet. Seedless, tanpa seed phrase, tahan phishing, Multisig by default.

## Langkah pertama

Kita mendekatinya pelan-pelan. Langkah pertama hanyalah bahwa aku bisa menambahkan seorang teman sebagai Padawan-ku di Settings dan dia kemudian otomatis mendapatkan sesuatu. Lalu kita melihat di database kita siapa menambahkan siapa dan swap apa saja yang terjadi, dan membayar referral-nya.

Dan kalau kamu mengirim sesuatu, kita harus punya autocompletion semua pengguna Nuri. Bukan cuma kontakmu, tapi semua orang. Aku mengetik L dan menemukan semua orang dengan L, seperti di PayPal.

Nanti ditambah key rotation, menambah dan menghapus keys, dan hardware wallet. Semua itu memang harus kita lakukan. Tapi dari segi visi, menurutku itu benar-benar sempurna. Karena itu fitur viral yang gila banget, kamu bisa ikut dapat bagian dari orang lain atau jadi co-signer-nya.
