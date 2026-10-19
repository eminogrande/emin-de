---
title: "Yapay Zeka Rehberi: Zeka Çağında Bir Şeyler İnşa Etmek İçin 9 Zihinsel Model"
description: "Andrej Karpathy’nin büyük dil modelleri üzerine yaptığı 3,5 saatlik konuşmasının özeti ve kurucuların buradan çıkarabileceği 9 ders."
date: "2026-01-02T11:50:01Z"
updated: "2026-01-02"
lang: tr
translated_from: "en/the-ai-playbook-9-mental-models-for-building-in-the-age-of-intelligence"
source_sections: ["the-base-model-simulates-the-internet", "fine-tuning-is-roleplay", "reinforcement-learning-is-the-alphago-moment", "the-swiss-cheese-problem", "tokens-to-think", "tools-beat-brains", "hallucination-is-a-feature", "the-future-is-agents", "open-weights-are-catching-up", "karpathys-closing-line"]
category: agents-ai
format: summary
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-ai-playbook-9-mental-models-for-building-in-the-age-of-intelligence/cover.webp"
third_party_summary: true
tldr: ["Andrej Karpathy’nin büyük dil modelleri üzerine yaptığı 3,5 saatlik konuşmasını, kurucular için dokuz pratik derse dönüştürdüm.", "Model dediğin, interneti simüle eden bir token tahmincisi. Yani ürünlerin veriyi doğrulaması, araçları kullanması ve kendi verisine sahip çıkması şart.", "Ajanlar ve pekiştirmeli öğrenme işin en uç noktası. Açık ağırlıklar ise modeli artık bir emtia haline getiriyor."]
sections: [{"basically": "Ham model, sadece internetteki bir sonraki kelimeyi tahmin ediyor. Ürün ise onun üzerine inşa ettiğin katman."}, {"basically": "ChatGPT, insan veri etiketleyicilerin istatistiksel bir simülasyonu. O yüzden sadece ince ayar (fine-tuning) yaparak anca insan seviyesine çıkabilirsin."}, {"basically": "Ödül mekanizmalı oyunlar, insan becerisini aşabiliyor. Bu yüzden değerli startup’lar, yapay zekanın pratik yapabileceği antrenman sahaları kuruyor."}, {"basically": "Doktora seviyesinde fizik çözen bir model bile 9.11’in 9.9’dan büyük olduğunu iddia edebilir. Doğrulama yapan ürünler geliştirin."}, {"basically": "Modellerin düşünce adımlarını yazmaya ihtiyacı var. UX tarafında bu bekleme süresini gizlemek yerine kullanıcıya gösterin."}, {"basically": "Model harfleri değil, token’ları görüyor. Kafasından saymaya çalışmak yerine Python kodu yazıp çalıştırmasını sağlayın."}, {"basically": "Halüsinasyon, modelin eğitim verilerinden rüya görmesi gibi bir şey. Çözümü, doğru cevabı bağlama (context) eklemek."}, {"basically": "Bir sonraki büyük fırsat PDF ile sohbet etmek değil; vergi veya seyahat planlama gibi tüm süreci uçtan uca halleden ajanlar."}, {"basically": "Açık kaynaklı modeller aradaki farkı kapattıkça, senin hendeğin (moat) LLM değil; verin, dağıtım ağın ve kurduğun antrenman sahandır."}, {"basically": "Yapay zeka büyülü bir şey değil, ortalama bir etiketleyicinin istatistiksel simülasyonu. Aracı kullan, ama ona tapma."}]
---
Andrej Karpathy’nin büyük dil modelleri (LLM) üzerine yaptığı konuşmanın özeti, https://www.youtube.com/watch?v=7xTGNNLPyMI

![](../../../media/the-ai-playbook-9-mental-models-for-building-in-the-age-of-intelligence/cover.jpg)

OpenAI'ın kurucu üyelerinden ve Tesla'nın eski Yapay Zeka Direktörü Andrej Karpathy, pek çok kişinin "Yapay Zeka Devriminin Öğretmeni" olarak gördüğü bir isim. Kısa süre önce büyük dil modelleri üzerine 3,5 saatlik kapsamlı bir "Birlik Durumu" (State of the Union) konuşması yayınladı. Karpathy'ye göre bugün bir startup kuruyorsanız bunu görmezden gelemezsiniz; çünkü yapay zeka artık yeni elektrik.

Çoğu insan yapay zekaya büyü gibi bakıyor. Karpathy ise onu şans eseri token'lar üreten bir makine olarak görüyor. Bu bakış açısı, ne tür bir ürün inşa edeceğiniz konusunda çok şeyi değiştiriyor.

İşte kurucuların, henüz gelişmekte olan bu teknoloji üzerinde çalışırken dikkate almaları gereken 9 ders:

## Temel model interneti simüle eder

Birincisi, temel model (base model) interneti simüle eder, gerçeği bilmez. Kurucular genelde yapay zekanın her şeyi bildiğini sanıyor. Bilmiyor. O, sadece sıkıştırılmış bir internetten ibaret.

Karpathy, temel modelin yani ham sinir ağının, rastgele bir internet belgesindeki bir sonraki kelimeyi tahmin etmeye çalıştığını anlatıyor. Sana yardım etmeye çalışmıyor; sadece bir Reddit başlığını veya bir Wikipedia makalesini simüle etmeye çalışıyor [43:35].

Kurucular için anlamı şu: Ham model senin ürünün değil. Ürün, bu simülatörün üzerine inşa ettiğin ve onu işe yarar kılan katmandır.

## İnce ayar (fine-tuning) rol yapmaktır

İkincisi, ince ayar sadece rol yapmaktır. Vahşi bir internet simülatörünü nasıl ChatGPT'ye dönüştürürsünüz? Denetimli ince ayar (SFT) ile. İnsanlara soru-cevap yazmaları için para ödersiniz, yapay zeka da bunları kopyalamayı öğrenir [01:03:00].

Yani ChatGPT ile konuştuğunuzda silikondan bir beyinle konuşmuyorsunuz; bir veri etiketleyicinin istatistiksel simülasyonuyla konuşuyorsunuz [01:17:49].

Kurucular için anlamı şu: Sadece ince ayar yapmak startup'ınız için bir tavan oluşturur ve bu tavan insan seviyesidir. Asla etiketleyicilerinizden daha iyi olamazsınız.

## Pekiştirmeli öğrenme, AlphaGo anıdır

Üçüncüsü pekiştirmeli öğrenme (RL), yani AlphaGo anı. Sınır burası. İnsanların yapabildiklerinin ötesine geçmek için DeepSeek R1 veya OpenAI o1 gibi modellerde olduğu gibi, pekiştirmeli öğrenmeye ihtiyacınız var.

Karpathy bunu AlphaGo ile kıyaslıyor [02:42:20]. Eğer sadece insanların oynadığı oyunlar üzerinden eğitim yaparsanız, insan becerisinde takılı kalırsınız. Ama yapay zekanın kendi kendine oynamasına izin verip kazandığında ödüllendirirseniz, "Hamle 37" gibi hiçbir insanın aklına gelmeyecek yaratıcı çözümler bulabilir [02:45:32].

Kurucular için anlamı şu: En değerli startup'lar sadece insanları taklit edenler olmayacak; yapay zekanın pratik yapabileceği ve bizden daha akıllı hale gelebileceği "spor salonları" yani ortamlar kuranlar olacak.

## İsviçre peyniri problemi

Dördüncüsü, İsviçre peyniri problemi. Kurucular için en keskin bıçak bu. LLM'lerin "dişli sınırları" vardır.

Doktora seviyesinde fizik problemlerini çözebilirken, size 9.11'in 9.9'dan büyük olduğunu büyük bir özgüvenle söyleyebilirler [02:05:40]. Neden? Çünkü bir token tahmincisi için 9.11 bir İncil ayeti veya bir tarih gibi görünür.

Kurucular için anlamı şu: Güvene dayalı değil, doğrulamaya dayalı ürünler yapın. Peynirdeki delikleri kontrol edecek bir insana veya koda, yani döngüde bir denetleyiciye ihtiyacınız var.

## Düşünmek için token'lar

Beşincisi, modele karalama defteri için zaman tanıyın. Karpathy, modellerin "düşünmek için token'lara" ihtiyacı olduğunu söylüyor [01:58:00].

Bir modele zor bir matematik problemini tek kelimede çözmesini söylerseniz batırır. Adımları yazmasına izin verirseniz ("Hadi adım adım düşünelim..."), doğru sonucu bulur.

Kurucular için anlamı şu: Kullanıcı deneyimini (UX) sabra göre tasarlayın. Beklemeyi gizlemeyin, onu kullanın. Modelin nihai cevabı vermeden önce bir düşünce zinciri kurmasına izin verin.

## Araçlar beyinden üstündür

Altıncısı, araçlar beyinden üstündür. Model "Çilek" (Strawberry) kelimesini hecelemekte veya R harflerini saymakta zorlanır, çünkü harfleri değil token'ları görür [02:03:44].

Karpathy’nin cevabı net: LLM'e bunu kendi kafasında yaptırmaya çalışmayın. Ona harfleri sayan bir Python betiği yazdırın.

Kurucular için anlamı şu: Yapay zekayı bir hesap makinesi olmaya zorlamayı bırakın. Hesap makinelerimiz zaten var. Yapay zekayı merkezde tuttuğunuz, yani işi yapmak için arama, hesap makinesi veya kod gibi araçları çağıran sistemler kurun.

## Halüsinasyon bir özelliktir

Yedincisi, halüsinasyon bir hata değil, bir özelliktir. Halüsinasyon, modelin eğitildiği verilerden rüya görmesidir. Model olasılıklarla çalışır ve her kelime için yazı tura atar [26:45].

Eğer modelin "Bilmiyorum" demesine izin verirseniz veya cevabı çalışma hafızasına yerleştirmek için arama (RAG) kullanırsanız işler düzelir [01:35:00].

Kurucular için anlamı şu: Halüsinasyonu sadece model ağırlıklarını değiştirerek düzeltemezsiniz. Onu, doğru cevabı prompt'a yani bağlam penceresine (context window) koyarak düzeltebilirsiniz.

## Gelecek ajanlardadır

Sekizincisi, gelecek ajanlardadır. Konuşan chatbot'lardan iş yapan ajanlara geçiyoruz.

Karpathy, klavye ve fareyi bizim gibi kullanan, uzun soluklu işler üzerinde çalışan modellerin kontrolü ele alacağı bir dönem bekliyor [03:12:00].

Kurucular için anlamı şu: Bir sonraki trilyon dolarlık fırsat PDF ile sohbet etmek değil. "Vergilerimi öde" veya "seyahatimi planla" gibi işin başından sonuna yapıldığı otonom sistemlerdir.

## Açık ağırlıklar arayı kapatıyor

Dokuzuncusu, açık ağırlıklar arayı kapatıyor. Karpathy, DeepSeek ve Llama'yı işaret ediyor [03:16:00]. OpenAI ve Google'ın kapalı modelleri ile DeepSeek ve Meta'nın açık modelleri arasındaki fark hızla kapanıyor.

Kurucular için anlamı şu: Modelin kendisi metalaşıyor. Sizin rekabet avantajınız (moat) LLM değil; kendi veriniz, dağıtım ağınız ve ajanınızı eğitmek için kurduğunuz o "spor salonudur".

________________________________

## Karpathy'nin kapanış cümlesi

Karpathy sonunda bizi şununla bırakıyor:

"Büyülü bir yapay zeka ile konuşmuyorsunuz. Ortalama bir insan etiketleyicinin istatistiksel simülasyonuyla konuşuyorsunuz."

Bu yüzden bunu aklınızda tutarak inşa edin. Araca tapmayın, onu kullanın.
