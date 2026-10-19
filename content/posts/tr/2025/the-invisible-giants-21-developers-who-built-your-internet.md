---
title: "Görünmez devler: İnternetin harcını karan 21 yazılımcı"
description: "Facebook veya Google'ın kurucularını göklere çıkarıyoruz ama internet aslında küçük bir gönüllü grubunun yazdığı açık kaynak kodlarla dönüyor. İşte o isimlerden 21'i."
date: "2025-12-07T17:25:01Z"
updated: "2025-12-07"
lang: tr
translated_from: "en/the-invisible-giants-21-developers-who-built-your-internet"
source_sections: ["numbers-1-to-7-watchers-utils-and-babel", "numbers-8-to-14-npm-express-and-the-node-style", "numbers-15-to-21-streams-polyfills-and-p2p"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-invisible-giants-21-developers-who-built-your-internet/cover.webp"
tldr: ["İnternet, çoğu görünmez olan küçük bir gönüllü grubunun ayakta tuttuğu açık kaynak kodlarla çalışıyor.", "Bu liste; Paul Millr'ın chokidar'ından Feross Aboukhadijeh'in WebTorrent'ine kadar en etkili 21 npm geliştiricisini içeriyor.", "Babel, glob, express, lodash ve yargs gibi paketler yüz milyonlarca projeye hayat veriyor."]
sections: [{"basically": "Chokidar, chalk, micromatch ve Babel; listenin ilk yedisi dosya izleme, log renklendirme ve kod derleme gibi temel işleri üstleniyor."}, {"basically": "npm'in temellerini Isaac attı, Express'i Doug ayakta tutuyor, Node ekosisteminin kod standartlarını ise büyük oranda TJ belirledi."}, {"basically": "Minimist, lodash, yargs, polyfills, streams, node-gyp ve WebTorrent ile listeyi tamamlıyoruz."}]
---
![](../../../media/the-invisible-giants-21-developers-who-built-your-internet/cover.jpg)

Facebook veya Google'ın kurucularını göklere çıkarmaya bayılıyoruz. Oysa bugün kullandığımız internet aslında tamamen açık kaynak kodun üzerine kurulu ve bu yapının büyük bir kısmı, küçük bir gönüllüler ordusu sayesinde ayakta. Onlar görünmez devler. Muhtemelen her gün onların yazdığı kodları kullanıyorsun ama farkında bile değilsin.

Bu, en tepedeki 21 geliştiricinin hikayesi. Ve her şey, dosyalarınızı göz hapsinde tutan o adamla başlıyor.

## 1'den 7'ye: izleyiciler, araçlar ve Babel

1 numara Paul Millr, yani nöbetçi. Paul, GitHub'da [`@paulmillr`](https://github.com/paulmillr) olarak biliniyor ve imzası [`chokidar`](https://github.com/paulmillr/chokidar). 30 milyondan fazla depoda (repo) kullanılıyor ve yüz milyonlarca kez indirildi. Node.js'in ilk zamanlarında sırf bir dosyayı izleyip uygulamanın kendini otomatik yenilemesini sağlamak bile başlı başına bir dertti; sürekli hatalar çıkıyor, Mac'lerde çöküyor, Windows'taki sorunları görmezden geliyordu. Paul bunu öylece kabul etmedi, gitti Chokidar'ı yazdı. Bir yazılımcının günündeki en büyük sancıyı, yani o bitmek bilmeyen bekleme sürecini ortadan kaldırdı. VS Code'da `Ctrl+S` tuşuna her bastığında veya React uygulaman tarayıcıda anında güncellendiğinde, arka planda senin için dünyayı izleyen işte Paul'un kodu.

2 numara Sindre Sorhus, verimliliğin kralı. Sindre, GitHub'da [`@sindresorhus`](https://github.com/sindresorhus) ve en meşhur işi 1,9 milyardan fazla indirmeyle [`chalk`](https://github.com/chalk/chalk). Unix felsefesine inanan bir efsane; tek bir şeyi mükemmel yapan küçük modüller. Terminale renk getiren adam. Sindre'den önce terminal, simsiyah bir arka planda beyaz yazılardan ibaret, iç karartıcı bir duvar gibiydi. Hataları kırmızı, uyarıları sarı, başarıları yeşil yaptı. Geliştiricinin dünyasını resmen renklendirdi; bu sayede milyonlarca insanın göz yorgunluğunu ve kafa karışıklığını azalttı.

3 numara Jon Schlinkert, mikro araçların efendisi. Jon, [`@jonschlinkert`](https://github.com/jonschlinkert) ve imzası 1,3 milyardan fazla indirmeyle [`micromatch`](https://github.com/micromatch/micromatch). Eşleştirmenin kralı. Eğer tüm JavaScript dosyalarını bulmak için `*.js` veya stilleri bulmak için `src/**/*.css` yazdıysan, Jon'un mantığını kullandın demektir. Onun kodu, Webpack, Babel ve ESLint'in içindeki görünmez sıralama makinesidir. Bir dosya istediğinde bilgisayarın gerçekten doğru olanı bulmasını sağlayan odur.

4 numara Brian Woodward, kod ortağı. Brian, [`@doowb`](https://github.com/doowb) ve olayı 860 milyondan fazla indirmeyle [`handlebars-helpers`](https://github.com/helpers/handlebars-helpers). Genelde Jon Schlinkert ile beraber çalışıyor ve statik siteleri bir arada tutan yapıştırıcıyı üretiyor. Şablon motorlarının işini yapmasını sağlayan yardımcıları; tarih biçimlendirme, veriler içinde döngü kurma veya sıkıcı HTML işlerini otomatize etme gibi süreçleri o yönetiyor. Bir blog sitesinin tıkır tıkır çalışmasının arkasındaki sebep o.

5 numara Daniel Tschinder, modernleştiren adam. Daniel, [`@danez`](https://github.com/danez) ve imzası 774 milyondan fazla indirmeyle [`babel-plugin-transform...`](https://babeljs.io). Babel ekibinin ana sütunlarından biri. Babel, internetin zaman makinesi; bugün geleceğin kodunu yazıyorsun, o da bunu eski tarayıcıların anlayacağı dile çeviriyor. Daniel olmasaydı hala eski JavaScript'i, yani ES5'i yazıyor olurduk. Tüm endüstrinin, eski sistem kullananları geride bırakmadan ilerlemesini sağlıyor.

6 numara Henry Zhu, Babel'in bekçisi. Henry, [`@hzoo`](https://github.com/hzoo) ve imzası 743 milyondan fazla indirmeyle [`babel-core`](https://github.com/babel/babel). Henry, açık kaynağın sürdürülebilirliğinin yüzü. Babel'in baş sorumlusu (maintainer) olarak React, Vue ve Next.js'i çalıştıran derleyiciyi yönetiyor. Krallığın anahtarları onda. Eğer Babel bozulursa modern internet çöker. Yani onun paketi, yazdığın kodun her cihazda çalışacağına dair duyduğun o güven demek.

7 numara Logan Smyth, mimar. Logan, [`@loganfsmyth`](https://github.com/loganfsmyth) ve imzası 739 milyondan fazla indirmeyle [`babel-loader`](https://github.com/babel/babel-loader). Logan köprüleri kuruyor. Babel'in diğer araçlarla, özellikle de Webpack ile nasıl konuştuğu üzerinde çalışıyor. Derleyiciyi yapı sistemine bağlayan katmanı o kurdu, bu sayede modern web geliştirme süreci tıkanmadan akıp gidiyor.

## 8'den 14'e: npm, Express ve Node tarzı

8 numara Isaac Z. Schlueter, npm'in babası. Isaac, [`@isaacs`](https://github.com/isaacs). En çok indirilen paketi 736 milyondan fazla indirmeyle [`glob`](https://github.com/isaacs/node-glob) ve ayrıca `npm`'i de o yarattı. Isaac kraliyet ailesinden; npm'i bizzat o kurdu. Glob, Node.js'e sabit diskteki dosyaları desenlerle nasıl bulacağını öğretiyor. Sadece bir paket yazmadı; bu listedeki herkesin oyun oynadığı o oyun alanını bizzat o inşa etti. Ne zaman `npm install` çalıştırsan, onun icadını kullanıyorsun.

9 numara Brian Ng, AST cerrahı. Brian, [`@existentialism`](https://github.com/existentialism) ve olayı 685 milyondan fazla indirmeyle [`babel-types`](https://github.com/babel/babel). Brian'ın işi, yazılımın diğer yazılımları anlamasını sağlamak. Kodu Soyut Sözdizimi Ağaçlarına (AST) ayıran araçları yönetiyor. Ve bu araçlar sadece kodu okumuyor, neşter gibi onu değiştiriyor da. Araçların hataları kendi kendine düzeltmesini veya karmaşık kodunu otomatik formatlamasını sağlayan şey tam olarak bu.

10 numara Doug Wilson, sunucu kurtarıcısı. Doug, [`@dougwilson`](https://github.com/dougwilson) ve olayı 668 milyondan fazla indirmeyle [`express`](https://github.com/expressjs/express). Node.js ile çalışan herhangi bir siteye girdiysen, muhtemelen Express kullanıyordur. Doug, Node için standart web framework'ünün yılmaz bekçisi. İnterneti çalışır halde tutuyor. Küçük bloglardan dev API'lere kadar, isteği alıp yanıtı gönderen onun kodu.

11 numara Sebastian McKenzie, yaratıcı. Sebastian, [`@sebmck`](https://github.com/sebmck) ve imzası 632 milyondan fazla indirmeyle [`yarn`](https://github.com/yarnpkg/yarn), ayrıca Babel'in de yaratıcısı. Sebastian bir dahi. Babel'i (ilk adıyla `6to5`) gençken yazdı, sonra npm'e daha hızlı bir alternatif olan Yarn'ı geliştirdi. JavaScript'i tek başına 2009'un karanlık çağlarından modern dünyaya çıkarıp 2010'ların çalışma şeklini belirledi.

12 numara James Kyle, müjdeci. James, [`@thejameskyle`](https://github.com/thejameskyle) ve imzası 625 milyondan fazla indirmeyle [`flow`](https://flow.org/) ve Babel eklentileri. James, karmaşık derleyiciler ile normal insanlar arasındaki köprüydü. Babel ve Flow gibi araçları kullanılabilir kılan kılavuzları, rehberleri ve eklentileri o yazdı. İmkansız görünen teknolojileri basit araçlara dönüştürdü.

13 numara Mathias Bynens, Unicode koruyucusu. Mathias, [`@mathias`](https://github.com/mathias) ve olayı 481 milyondan fazla indirmeyle HTML varlıkları için [`he`](https://github.com/mathias/he). Bilgisayarlar metin konusunda berbattır, özellikle emojiler ve garip semboller söz konusu olduğunda. Mathias, JavaScript'in karakterleri nasıl işlediği konusunda dünya uzmanı. Bir şifrede veya kullanıcı adında bir emoji 🚀 kullandıysan ve site çökmediyse, Mathias'a teşekkür et. İnternetin her insan dilini doğru düzgün konuştuğundan emin olan kişi o.

14 numara TJ Holowaychuk, vaftiz babası. TJ, [`@tjholowaychuk`](https://github.com/tjholowaychuk) ve imzası 364 milyondan fazla indirmeyle [`commander`](https://github.com/tj/commander.js) ve `mocha`. Node tarihindeki en üretken programcı. Express, Mocha ve Commander'ın ilk sürümlerini o yazdı. Node.js'in stilini o belirledi. Eğer bugün temiz ve zarif görünen kodlar yazıyorsan, büyük ihtimalle TJ'in tarzını takip ediyorsundur.

## 15-21 arası: Stream'ler, polyfill'ler ve P2P

15 numara filozof James Halliday. James, [`@substack`](https://github.com/substack) adıyla bilinir; en büyük işleri 417 milyondan fazla indirilen [`minimist`](https://github.com/substack/minimist) ve `browserify` araçlarıdır. Substack, Node.js kodu yazıp bunu tarayıcıda çalıştırma fikrini ortaya attı. Browserify'ı o yarattı. Bundling devrimini onunla başlattık, bugün kullandığımız araçların hepsi doğrudan buraya dayanıyor.

16 numara performans tutkunu John-David Dalton. JD, yani [`@jdalton`](https://github.com/jdalton), en büyük işi 375 milyondan fazla indirilen [`lodash`](https://github.com/lodash/lodash). JD Dalton, standart JavaScript kütüphanesinin yavaş olduğunu ve çok fazla eksiği olduğunu fark etti. O da tarihin en çok bağımlılık duyulan kütüphanesi haline gelen o İsviçre çakısı Lodash'i yazdı. Hıza kafayı takmıştı; fonksiyonları çoğu zaman tarayıcının yerleşik fonksiyonlarından bile daha hızlı çalışıyordu.

17 numara komut satırı üstadı Ben Coe. Ben, yani [`@bcoe`](https://github.com/bcoe), en büyük işi 310 milyondan fazla indirilen [`yargs`](https://github.com/yargs/yargs). Ben, komut satırını insan dostu hale getiriyor. Komut satırı argümanlarını ayrıştıran o meşhur Yargs'ı o yönetiyor. `--help` ya da `--version` gibi bir komut yazdığında, Ben'in kodu ne demek istediğini anlıyor ve programa ne yapması gerektiğini söylüyor.

18 numara polyfill kralı Jordan Harband. Jordan, yani [`@ljharb`](https://github.com/ljharb), en büyük işi 279 milyondan fazla indirilen [`object.assign`](https://github.com/ljharb/object.assign). Jordan her şeyi geriye dönük uyumlu tutuyor. Yüzlerce polyfill, yani eski tarayıcılara yeni yetenekler kazandıran yamalar yönetiyor. Eski cihaz kullananlar için savaşıyor, böylece internet sadece yeni MacBook'u olanlara değil, herkese açık kalıyor.

19 numara stream ustası Dominic Tarr. Dominic, yani [`@dominictarr`](https://github.com/dominictarr), en büyük işi 279 milyondan fazla indirilen [`through`](https://github.com/dominictarr/through). Dominic veri stream'leri konusunda tam bir deli bilim insanı. Verinin uygulamalar içinde su borularından akar gibi akmasını sağlayan araçları o yazdı. Küçük modül fikrini herkesten çok o savundu ve minik, mükemmel araçlardan oluşan devasa bir ağ kurdu.

20 numara tesisatçı Nathan Rajlich. Nathan, yani [`@tootallnate`](https://github.com/TooTallNate), en büyük işi 224 milyondan fazla indirilen [`node-gyp`](https://github.com/nodejs/node-gyp). Nathan işin ağır kısmını üstleniyor. Node.js'in C++ ve sistemin düşük seviyeli parçalarıyla konuşmasını sağlayan araçları yönetiyor. JavaScript'in o kolay dünyası ile makine kodunun çetin dünyası arasında köprü kuruyor.

21 numara P2P öncüsü Feross Aboukhadijeh. Feross, yani [`@feross`](https://github.com/feross), en büyük işleri 206 milyondan fazla indirilen [`standard`](https://github.com/standard/standard) ve `webtorrent`. Feross, merkeziyetsiz bir internet hayal eden bir vizyoner. Tarayıcı tabanlı BitTorrent olan WebTorrent'i ve noktalı virgülleri yasaklayan o linter Standard'ı o yaptı. JavaScript'in her şeyi yapabileceğini, hatta eklenti kurmadan tarayıcı üzerinden eşten eşe (P2P) film bile stream edebileceğini gösterdi. Tarayıcıda nelerin mümkün olduğunu zorlamaya devam ediyor.
