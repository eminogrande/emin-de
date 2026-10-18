---
title: "Tambahin aja user Nuri mana pun"
description: "Referral, Guardian, warisan, Multisig, dan nabung bareng bakal jadi satu fitur di Nuri. Lo tambahin username di Settings, sisanya ngikut dari situ."
date: "2026-10-18"
updated: "2026-10-18"
lang: id
translated_from: "de/fueg-einfach-irgendeinen-nuri-user-hinzu"
source_sections: ["ein-feature-statt-fünf", "die-fee-wird-geteilt", "meine-mama-kriegt-17-satoshi", "expanding-statt-decaying-multisig", "guardian-und-erbe", "die-fee-liegt-im-frontend", "setz-deine-fee-selbst", "jeder-call-ist-eine-kleine-zahlung", "familienwallet-und-hardware-wallets", "der-erste-schritt"]
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: "/media/fueg-einfach-irgendeinen-nuri-user-hinzu/cover.png"
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr: ["Ide gue buat Nuri cuma satu fitur. Lo tambahin username orang lain di Settings.", "Dari situ muncul Referral, Guardian, warisan, Multisig, dan nabung bareng, tergantung apa yang lo izinin.", "Fee-nya ada di frontend kita, terbuka di source code, dan lo yang atur sendiri antara 0 sampai 21 persen."]
sections: [{"basically": "Di Nuri, Referral, Guardian, warisan, dan Multisig jadi satu fitur. Lo tambahin username di Settings."}, {"basically": "Siapa pun yang nambahin teman di Nuri, bagi fee sama dia. Kalau 10 orang, fee-nya dibagi 10."}, {"basically": "Setiap pembayaran ngirim beberapa Satoshi ke orang-orang lo plus push notification. Itu yang bikin Nuri viral."}, {"basically": "Di Expanding Multisig, key para Guardian lo baru aktif kalau lo udah kehilangan key lo sendiri."}, {"basically": "Guardian bantu lo balikin key lo. Ahli waris baru bisa akses kalau lo setahun nggak ngapa-ngapain."}, {"basically": "Nuri nggak ambil fee dari provider, tapi di frontend sendiri, terbuka di source code."}, {"basically": "Di Nuri lo atur fee lo sendiri, dari 0 sampai 21 persen. Di party gue, donasi malah hasilin lima kali lipat."}, {"basically": "Setiap API call di Nuri jadi pembayaran kecil x402 atau L402. Beres deh masalah fee."}, {"basically": "Multisig nggak ada yang ngerti. Tiga orang plus satu hardware wallet, semua orang ngerti. Begitu cara kita jelasin Nuri."}, {"basically": "Langkah pertama di Nuri cuma satu teman di Settings yang ikut dapet komisi. Sisanya dibangun di atas itu."}]
---
Gue rasa, pagi ini gue baru aja nemu solusi yang lumayan oke. Ini soal fitur buat Nuri. Jadi gini idenya.

## Satu fitur, bukan lima

Gue mau gabungin Multisig, Guardian, Inheritance, sama Referral jadi satu fitur. Caranya gini. Gue tinggal tambahin username lo di Settings aplikasi gue. Itu doang.

Pas gue ngelakuin itu, lo langsung dapet 50 persen dari fee yang gue bayar ke Nuri. Lo juga bisa sekaligus jadi Guardian gue. Artinya, lo bantu gue pake passkey lo buat balikin akun gue nanti di masa depan. Lo juga bisa masuk ke wallet sebagai co-signer. Atau kita bikin perusahaan dan pengen punya wallet Multisig bareng.

Itu semua fitur yang beda-beda. Tapi semuanya dibangun di atas fitur frontend yang sama. Tinggal tambahin user Nuri mana aja.

## Fee-nya dibagi

Fee yang gue bayar ke Nuri, kita patok dulu aja di angka 2,1 persen. Tiap kali gue bikin pembayaran, setengahnya masuk ke Nuri, setengahnya lagi ke orang yang gue tambahin.

Lo juga bisa nambahin 10 username. Jadi lo punya wallet isinya 10 orang, dan fee-nya dibagi sepuluh. Semua orang baru yang lo tambahin otomatis dapet bagian, dan Nuri dapet sepersepuluhnya.

Kita juga bisa aja saling nambahin, terus duitnya balik lagi ke gue. Kita harus hati-hati biar nggak bikin loop di situ. Itu jelas nggak boleh.

## Nyokap gue dapet 17 Satoshi

Bitcoiner pengen banget ngajak orang lain jadi Bitcoiner. Sekarang gue bisa ngundang nyokap gue. Dan dia bakal dapet push notification tiap kali gue bikin pembayaran. Lo baru aja dapet 20 Satoshi. Lo baru aja dapet 17 Satoshi.

Gue ngalamin sendiri. Di layanan lain, gue selalu dapet pesan Telegram tiap kali ada swap, dan di situ tertulis gue baru aja dapet 10 Satoshi. Itu hal paling viral yang pernah gue rasain sendiri. Lucu banget, dan kita jadi saling ngasih duit dikit-dikit.

Pake Arkade, kita juga bisa kirim-kiriman 1, 2, 3, 4, atau 5 Satoshi tanpa fee. Dan itu juga nunjukin betapa kerennya Arkade di bagian itu.

## Expanding, bukan Decaying Multisig

Key yang kita tambahin itu ngelakuin kebalikan dari yang biasa kita lakuin di Nuri. Kalau kita nggak mau mereka jadi signer dari awal, itu bukan Decaying Multisig, tapi Expanding Multisig.

Artinya, kalau gue ilang semua key gue, setelah beberapa waktu, setahun misalnya, key para Guardian gue bakal aktif otomatis. Di Bitcoin itu bisa. Di Ethereum mungkin lebih ribet, tapi pasti bisa juga.

Dan jelas, itu semua settingan yang bisa diatur. Nggak boleh ada orang yang bisa ngambil duit lo cuma karena lo setahun nggak gerakin Bitcoin lo.

## Guardian dan warisan

Guardian itu satu fitur. Gue pengen bikin persis kayak Bitkey. Mereka bikin sistem di mana Guardian lo bisa bantu balikin key lo, tapi nggak punya akses ke duit lo. Gimana persisnya mereka bikin itu, kita masih harus pelajarin.

Fitur satunya lagi Inheritance, dan itu penting banget. Gue pengen misalnya masukin adik gue sebagai ahli waris. Tiap kali gue bikin pembayaran, counternya direset ke nol. Dan kalau gue kenapa-kenapa, apa pun alasannya, gue nggak bangun besok pagi, dia bakal aktif otomatis setelah setahun dan punya akses ke dana gue. Hal kayak gini penting banget dan keren banget.

## Fee-nya ada di frontend

Yang jauh lebih penting lagi, di mana fee itu ditaruh. Sekarang kita ambil fee dari provider, dan itu salah. Kita harusnya nol-in fee di semua provider dan ambil fee-nya di kita, di frontend atau di backend kita. Di belakang Nuri bisa ada sepuluh juta provider, bodo amat. Mereka ambil spread dan fee mereka sendiri, dan kita nggak nambahin apa-apa di situ.

Dengan begitu kita bisa bedain mana fee Nuri dan mana fee partner. Itu bersih banget. Dan gue pengen nunjukin ke orang-orang di kode open-source kita, nih lihat, ini fee-nya, ada di source code. Gue pengen kita jadi perusahaan paling transparan di dunia.

Cerita favorit gue soal ini adalah hebohnya komunitas Aave waktu provider swap di belakang layar diam-diam diganti. Dari situ keliatan, backend udah nggak punya power lagi, yang punya power itu frontend. Siapa yang pegang user, dia yang punya moat.

## Atur fee lo sendiri

Kita bahkan biarin orang-orang atur fee mereka sendiri. Murni biar adil. Kalau lo nggak mau bayar fee, lo bisa set ke 0 persen. Lo juga bisa set ke 21 persen kalau mau. Dan kalau ada yang nanya, kenapa kalian ambil 2 persen, kita bilang, masuk ke Settings, ubah sendiri.

Kenapa gue yakin ini bakal jalan? Karena pengalaman gue bikin party di Berlin. Mau harga tiket masuk berapa pun, mau harga bir berapa pun, orang-orang selalu nggak suka. Akhirnya kita bilang, fuck it, donasi buat bir, donasi buat tiket masuk. Kita malah dapet duit lima kali lipat.

Kalau lo kasih orang kesempatan buat nentuin sendiri, pasti ada juga yang malah naikin jauh lebih tinggi. Karena mereka suka gamification-nya atau karena mereka percaya sama misinya. Ada yang tajir, ada yang miskin, ada yang pelit, ada yang nggak. Gue bakal set fee gue ke 21 persen buat orang yang gue temuin di konferensi dan gue tambahin ke akun gue. Jadi mereka otomatis dapet bagian dari gue.

## Tiap call itu pembayaran kecil

Gue masih punya ide yang lebih bagus soal cara ambil fee. Kita gating aja API Nuri pake micropayment, dan micropayment itu jadi fee kita. Tiap operasi di aplikasi jadi bayar dikit lewat x402 atau L402. L402 kalau urusannya sama Bitcoin, x402 kalau urusannya sama kripto.

Contohnya. Nyimpen atau baca password baru di password manager Nuri lo biayanya 0,1 sen atau 1 sen. Dan itu bisa langsung diambil dari wallet, karena wallet-nya agentic. Di Router gue udah ngelakuin ini. Lo bisa pake token atau lo bayar per call, dan kita bisa kasih harga beda buat tiap endpoint.

Jadi lo nggak perlu bikin sistem fee sendiri. Siapa pun bisa integrasi API kita di mana aja, dan kita otomatis dapet payment-nya. Gue bakal mulai dari buku kontak, 0,1 sen tiap kali nambahin kontak. Kalau itu jalan, kita lebarin ke seluruh aplikasi. Satu fitur dulu, baru lanjut.

## Wallet keluarga dan hardware wallet

Begitu orang ngerasain gimana wallet Safe jalan, kayak yang kita punya di perusahaan, mereka pasti suka banget. Gue punya satu kunci, tapi kita cuma bisa bayar kalau bareng-bareng. Itu pengalaman kripto yang keren banget.

Atau wallet keluarga. Nyokap gue, adik gue, dan gue. Dua dari kita cukup buat bayar bareng. Multisig itu susah dibayangin orang. Tapi bilang kita bertiga pake satu hardware wallet, atau kita berlima sama satu AI, itu semua orang ngerti.

Dan kita tetep pegang prinsip yang nggak bisa ditiru orang lain. Wallet satu klik pake Face ID. Seedless, nggak ada seed phrase, tahan phishing, Multisig by default.

## Langkah pertama

Kita mulai pelan-pelan. Langkah pertama cuma gue bisa nambahin temen sebagai Padawan gue di Settings, dan dia otomatis dapet sesuatu. Terus kita lihat di database siapa nambahin siapa dan swap apa aja yang terjadi, lalu kita bayar referral-nya.

Dan pas lo mau kirim sesuatu, kita harus punya autocomplete semua user Nuri. Bukan cuma kontak lo, tapi semuanya. Gue ketik L dan nemu semua orang yang namanya ada L-nya, kayak di PayPal.

Nanti baru kita tambahin rotasi key, nambahin dan hapus key, sama hardware wallet. Itu semua emang harus kita bikin. Tapi dari visinya, menurut gue ini udah sempurna banget. Karena ini fitur yang viral banget, lo bisa ikut dapet bagian dari orang lain atau jadi co-signer dia.
