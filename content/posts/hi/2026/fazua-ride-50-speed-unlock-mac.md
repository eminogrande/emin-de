---
title: "Fazua Ride 50 स्पीड अनलॉक, Mac से, बिना बॉक्स"
description: "कैसे मेरे एजेंट और मैंने Fazua Ride 50 Evation की स्पीड लिमिट 25 से 55 किमी/घंटा तक बढ़ाई, MacBook से USB के ज़रिए, फर्मवेयर 2.04 और एक ओपन सोर्स टूल के साथ।"
date: "2026-10-16"
updated: "2026-10-16"
lang: hi
translated_from: "en/fazua-ride-50-speed-unlock-mac"
source_sections: ["the-bike-and-the-problem", "the-idea-change-one-number-instead-of-fooling-the-sensor", "what-i-used", "step-1-connect-the-drivepack-to-the-mac", "step-2-read-before-you-write", "step-3-downgrade-to-204", "step-4-write-55-kmh", "step-5-back-into-the-bike", "what-went-wrong-on-the-way", "battery-modes-and-going-back"]
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["ebike", "tuning", "Fazua Ride 50", "Canyon Roadlite:ON", "macOS", "how-to"]
source_links: [{"title": "FazuaUnlocker, my fork with the Mac port", "url": "https://github.com/eminogrande/FazuaUnlocker", "note": "fazua_mac.py, README-MAC.md and the firmware download script."}, {"title": "FazuaUnlocker by quezzas", "url": "https://github.com/quezzas/FazuaUnlocker", "note": "The original Windows tool, MIT licence."}, {"title": "FAZUA Toolbox Software", "url": "https://fazua.com/en/support/help-center/fazua-toolbox-software/", "note": "The official tool for firmware updates over USB."}, {"title": "FAZUA: How to do a Ride 50 firmware update", "url": "https://fazua.com/en/support/help-center/videos/how-to-fazua-ride-50-firmware-update", "note": "Manual firmware install, and why the remote LEDs flash afterwards."}, {"title": "Eplus Flash Home, Fazua speed unlocker", "url": "https://www.eplus.bike/en/prodotto/fazua-software-home-speed-unlocker/", "note": "The paid Windows version of the same idea, and the 2.50 to 2.04 downgrade note."}, {"title": "Firmware 2.04, archived original from fazua.com", "url": "https://web.archive.org/web/20220709185915/https://fazua.com/documents/826/evation_Software_2.04.bin", "note": "Internet Archive snapshot of 9 July 2022."}]
tldr: ["Fazua Ride 50 अपनी 25 किमी/घंटा की लिमिट ड्राइवपैक में एक वैल्यू के रूप में स्टोर करता है। फर्मवेयर 2.04 पर आप इसे USB के ज़रिए बदल सकते हैं।", "मैंने इसे MacBook Pro M4 से किया। ओपन सोर्स टूल सिर्फ Windows के लिए था, इसलिए मेरे एजेंट ने इसकी USB लेयर को hidapi से बदल दिया।", "फर्मवेयर 2.50 को पहले 2.04 पर वापस जाना था, आधिकारिक FAZUA Toolbox के माध्यम से। 2.04 फ़ाइल fazua.com से ओरिजिनल है।", "लिखने के बाद वापस पढ़ा, 55.01 किमी/घंटा। इसके लिए Badass Box की ज़रूरत नहीं है।"]
sections: [{"basically": "एक 2020 Canyon Roadlite:ON जिसमें Fazua Ride 50 Evation है, और एक ट्यूनिंग बॉक्स जो लगातार पीली रोशनी ब्लिंक करता रहता था।"}, {"basically": "बॉक्स स्पीड सेंसर से झूठ बोलता है। सॉफ्टवेयर बस उस लिमिट को बदल देता है जिसके खिलाफ मोटर चेक करती है।"}, {"basically": "मेरी बाइक, मेरा MacBook, एक मिनी USB केबल, एक T10 स्क्रूड्राइवर, FAZUA Toolbox और करीब 75 लाइनें Python कोड।"}, {"basically": "ड्राइवपैक बाहर, बैटरी चालू, USB कैप खुला, केबल अंदर। Mac इसे evation v2.50 के रूप में देखता है।"}, {"basically": "पहले सिर्फ पढ़ा। मेरे में 24.98 किमी/घंटा और 2121 मिमी का व्हील दिखा। वह फ़ाइल बैकअप भी है।"}, {"basically": "FAZUA Toolbox में Manual चुनें, Online नहीं, 2.04 फ़ाइल चुनें और इसे फ्लैश और कैलिब्रेट होने दें।"}, {"basically": "एक कमांड नई लिमिट लिखती है, बाइक इसे स्वीकार करती है, और दूसरा रीड 55.01 किमी/घंटा दिखाता है।"}, {"basically": "सफेद LED बारी-बारी से ब्लिंक करना मतलब रिमोट खुद को अपडेट कर रहा है। इसे तब तक छेड़ें नहीं जब तक हरा न दिखाए।"}, {"basically": "एक गलत क्लिक, दो रद्द हुए राइट, और एक लाल बत्ती जो सिर्फ ढीले बैठे ड्राइवपैक की वजह से थी।"}, {"basically": "लिमिट हर मोड में एक जैसी है। रेंज नहीं। एक कमांड इसे वापस 25 पर ले आती है।"}]
---
## बाइक और समस्या

मेरी बाइक 2020 की Canyon Roadlite:ON AL 7.0 है, साइज़ M, pace grey और orange रंग। मोटर Fazua Evation है, जिसे Fazua आज Ride 50 Evation कहता है। ड्राइवपैक, मोटर और बैटरी एक लंबे टुकड़े में, डाउन ट्यूब में बैठता है और एक लीवर से बाहर निकल आता है। बैटरी Energy 250 है, touch remote फ्रेम में बिल्ट-इन है। हैंडलबार पर कोई डिस्प्ले नहीं है, इसलिए बाइक कभी नहीं बताती कि आप कितनी तेज़ चल रहे हैं।

इससे पहले मेरा ड्राइवपैक firmware 2.50 पर चलता था और बैटरी firmware 1.15 पर। यह मुझे सिर्फ इसलिए पता है क्योंकि मैंने इसे FAZUA Toolbox से पढ़ा था, नीचे देखिए।

assist 25 km/h पर बंद हो जाती है, जैसे EU की हर pedelec पर। मैं देखना चाहता था कि बाइक ज़्यादा स्पीड पर कैसी लगती है। तो 7 अक्टूबर को मैंने Fazua के लिए एक Badass Box 4 खरीदा। मैंने इसके बारे में [Badass Box 4 on a Fazua Ride 50, the yellow light](/posts/badass-box-4-fazua-ride-50-yellow-light) में लिखा है। यह एक या दो मिनट काम किया, फिर ऊपर वाली LED फिर से पीली ब्लिंक करने लगी। मैग्नेट पास, दूसरी spoke, 90 डिग्री घुमाया, Badass support ने कहा इंस्टॉलेशन ठीक लग रहा है। फिर भी कुछ मिनट की राइड के बाद पीली।

## आइडिया, सेंसर को बेवकूफ बनाने के बजाय एक नंबर बदलना

Badass Box chainstay पर speed sensor के पास बैठता है और spoke magnet से आने वाले pulses बदल देता है, ताकि मोटर को लगे कि आप असल से धीमे चल रहे हैं। यह सिग्नल पर एक ट्रिक है, और मेरी बाइक पर Fazua ने कुछ देर बाद इसे पकड़ लिया और soft fault फ्लैग कर दिया।

मोटर खुद सिर्फ आपकी स्पीड को एक स्टोर्ड वैल्यू से तुलना करती है। Fazua इसे bikeMaxSpeed कहता है। Dealers इसे Toolbox में देख सकते हैं, लेकिन नॉर्मल यूज़र्स के लिए यह greyed out होता है। अगर आप वह वैल्यू बदल देते हैं, तो बेवकूफ बनाने के लिए कुछ बचता ही नहीं। सेंसर असली स्पीड रिपोर्ट करता है और मोटर बस ज़्यादा देर तक मदद करती है।

मेरे एजेंट ने ऐसा करने के दो तरीके खोजे। इतालवी कंपनी Eplus, Flash Home बेचती है 134 यूरो प्लस VAT में, सिर्फ Windows के लिए। और GitHub पर quezzas का FazuaUnlocker है, फ्री, MIT लाइसेंस, यह भी सिर्फ Windows के लिए। दोनों एक ही बात कहते हैं। यह firmware 2.04 पर काम करता है। 2.50 पर आपको पहले 2.04 पर वापस जाना होगा।

```
before (box)                           after (software)

spoke magnet -> [box] -> sensor        spoke magnet -> sensor
                 |  fake slower                         |  real speed
                 v                                       v
drivepack: limit 25 km/h               drivepack: limit 55 km/h
           -> yellow after 1-2 min                -> no box, no yellow
```

## मैंने क्या इस्तेमाल किया

1. बाइक, बैटरी पूरी चार्ज।
2. एक MacBook Pro M4, 16 GB, macOS 15.5। यह Apple Silicon पर चलता है, कोई Windows नहीं, कोई virtual machine नहीं।
3. एक mini USB डेटा केबल। सिर्फ चार्जिंग वाली केबल नहीं।
4. USB कैप के लिए एक Torx T10 स्क्रूड्राइवर।
5. Apple Silicon पर macOS के लिए FAZUA Toolbox 2.29 basic, Fazua की वेबसाइट से।
6. Firmware 2.04, फाइल evation_Software_2.04.bin। असली fazua.com लिंक अब नहीं है, लेकिन Internet Archive ने इसे 9 जुलाई 2022 से सहेज रखा है। SHA-256 8fe885c9dfc7caa9cf8e61b88051bf8d42da53747c4fd86d2b72c3c2ef23d32e। मेरे एजेंट ने इसकी तुलना GitHub पर घूम रही कॉपी से की, और दोनों बाइट-टू-बाइट एक जैसी हैं।
7. FazuaUnlocker का मेरा fork, [github.com/eminogrande/FazuaUnlocker](https://github.com/eminogrande/FazuaUnlocker), Python 3.9 और hidapi लाइब्रेरी के साथ।

ओरिजिनल टूल Windows USB फंक्शन्स के ज़रिए ड्राइवपैक से बात करता है। मेरे एजेंट ने प्रोटोकॉल, checksum और write logic को बिल्कुल वैसा ही रखा और सिर्फ उस एक लेयर को hidapi से बदल दिया, जो macOS पर भी चलती है। यही है फाइल fazua_mac.py, करीब 75 लाइनें। firmware खुद encrypted है, तो यहाँ कोई firmware नहीं बदलता। टूल सिर्फ एक सेटिंग बदलता है।

## स्टेप 1, ड्राइवपैक को Mac से जोड़ना

1. ड्राइवपैक को बाइक से बाहर निकालें। बैटरी ड्राइवपैक के अंदर ही रहती है और ऑन होनी चाहिए।
2. T10 से ड्राइवपैक पर USB कैप खोलें। यह नीचे cooling fins के पास होता है।
3. mini USB केबल को Mac से जोड़ें और ड्राइवपैक को फर्श या टेबल पर सपाट लेटा दें।
4. चेक करें कि Mac इसे देख रहा है। टर्मिनल में `system_profiler SPUSBDataType | grep evation` ने मेरे लिए `evation v2.50` दिखाया। टूल के लिए यह ID 10C4:1001 वाला एक USB HID डिवाइस है।

Fazua अपनी खुद की गाइड में कहता है कि firmware अपडेट के लिए आपको सिर्फ ड्राइवपैक चाहिए, पूरी बाइक नहीं। इन सबके लिए पहिये का घूमना ज़रूरी नहीं है।

## स्टेप 2, लिखने से पहले पढ़ें

पहले FAZUA Toolbox बंद करें, क्योंकि वह USB कनेक्शन पकड़े रखता है। फिर:

```sh
git clone https://github.com/eminogrande/FazuaUnlocker.git
cd FazuaUnlocker
python3 -m venv .venv && .venv/bin/pip install -r requirements-mac.txt
.venv/bin/python fazua_mac.py --read-only
```

मेरे ड्राइवपैक ने करीब 110 ms में जवाब दिया। Max Bike Speed 24.98 km/h, raw value 694। Wheel length 2121 mm। Shaft offset 30533। टूल उस offset से एक छोटी write key निकालता है, मेरी थी ba88। मेरे एजेंट ने यह readout एक JSON फाइल के रूप में सेव कर लिया, ताकि मैं हमेशा ठीक इन्हीं वैल्यूज़ पर वापस जा सकूँ।

फिर एक dry run, जो checksum के साथ write packet बनाता है लेकिन कुछ भेजता नहीं:

```sh
.venv/bin/python fazua_mac.py 55 --dry-run
```

## स्टेप 3, 2.04 पर डाउनग्रेड

यह असली रिस्क वाला हिस्सा है। अगर flash बीच में रुक गया, तो ड्राइवपैक मर सकता है। इसलिए बैटरी फुल, केबल फिक्स्ड, ड्राइवपैक स्थिर लेटा हुआ।

1. FAZUA Toolbox खोलें, FIRMWARE UPDATE पर जाएँ, UPDATE NOW पर क्लिक करें।
2. Manual चुनें। Online नहीं, क्योंकि Online फिर से नया वर्ज़न इंस्टॉल कर देगा।
3. evation_Software_2.04.bin चुनें और START दबाने से पहले फाइल का नाम चेक करें।
4. इंतज़ार करें। flash के बाद मोटर calibrate होती है और थोड़ा vibrate कर सकती है। ड्राइवपैक को हिलाएँ नहीं।
5. system_profiler से फिर चेक करें। मेरे ड्राइवपैक ने अब `evation v2.04` दिखाया।

डाउनग्रेड के बाद फिर से पढ़ने पर भी 24.98 km/h ही दिखा। सिर्फ firmware बदलने से कुछ अनलॉक नहीं होता।

## स्टेप 4, 55 km/h लिखना

```sh
.venv/bin/python fazua_mac.py 55 --force
```

टूल ने 24.98 km/h, raw 694, से 55.00 km/h, raw 1528, का बदलाव दिखाया। फिर "Write cycle acknowledged by bike", फिर इसने खुद वैल्यू वापस पढ़ी। "SUCCESS: bikeMaxSpeed is now 55.01 km/h"। कुछ सेकंड बाद अलग से पढ़ने पर भी वही बात, wheel length अब भी 2121 mm।

टूल 5 से 75 km/h स्वीकार करता है। मैंने 55 चुना क्योंकि मैं देखना चाहता हूँ कि यह कैसा है। मेरे एजेंट ने 45 सुझाया था, क्योंकि मोटर के पास अनंत पावर नहीं है और एक खास स्पीड के ऊपर ज़्यादातर काम आपके पैरों का ही होता है। आप जो भी सेट करें, मोटर सिर्फ ज़्यादा देर तक मदद करती है, वह बाइक को अपने आप तेज़ नहीं बनाती।

## स्टेप 5, वापस बाइक में

1. केबल निकालें, USB कैप को हाथ से वापस कसें, 1 से 1.5 Nm। कैप के बिना ड्राइवपैक waterproof नहीं है।
2. ड्राइवपैक को बाइक में डालें जब तक क्लिक न हो जाए।
3. ऑन करें।

मेरी बाइक पर remote ने फिर सफेद फ्लैश किया, ऊपर की दो LEDs और नीचे की दो, बारी-बारी से। यह एरर जैसा लगता है। है नहीं। Fazua अपनी अपडेट गाइड में लिखता है "Flashing LEDs indicates an update of the remote. Do not touch the remote during the update and do not switch off the e-bike." ड्राइवपैक remote को अपने firmware लेवल पर लाता है। मेरा एक बार बंद हुआ, वापस ऑन हुआ, और फिर सब कुछ हरा था।

फिर मैंने इसे टेस्ट किया। लगता है काम कर रहा है। मेरे पास अभी कोई सटीक टॉप स्पीड नहीं है, क्योंकि बाइक पर डिस्प्ले नहीं है। अगली बार हैंडलबार पर GPS speedometer वाला फोन लगेगा।

## रास्ते में क्या गलत हुआ

मेरे एजेंट ने Mac पर Toolbox में खुद ही क्लिक किया, और पहला क्लिक FIRMWARE UPDATE की जगह CALIBRATION पर पड़ा। उसने सिर्फ पेज खोला, कुछ शुरू नहीं हुआ। फिर Manual पर क्लिक नहीं लगा, क्योंकि बैकग्राउंड में भेजे गए क्लिक उस डायलॉग तक नहीं पहुंचे। मेरा एजेंट वहीं रुक गया, क्योंकि START पर गलत क्लिक से 2.50 फिर से इंस्टॉल हो जाता। मैंने Manual और फाइल खुद क्लिक की।

पहले दो लिखने के प्रयास बीच में ही रुक गए। टूल लिखने से पहले yes मांगता है, और जिस तरह मेरे एजेंट ने जवाब भेजे, वे उस सवाल तक नहीं पहुंचे। कुछ भी नहीं लिखा गया, बाद में रीड करने पर अब भी 24.98 km/h ही दिखा। --force के साथ यह हो गया।

बाद में मैंने ड्राइवपैक फिर से बाहर निकाला, USB कैप बंद किया और मैग्नेट हिलाया, और तब ऊपर वाली LED लाल थी। लाल मैग्नेट की वजह से नहीं है। Fazua मैनुअल कहता है कि ऊपर लाल का मतलब है ड्राइवपैक और बॉटम ब्रैकेट के बीच कनेक्शन एरर, यानी फ्रेम में वह हिस्सा जिसमें यह प्लग होता है। मैंने इसे बाहर निकाला, कॉन्टैक्ट्स जांचे, फिर से अंदर धकेला जब तक क्लिक न हुआ, और सब ठीक था।

और 15 मिनट खड़े रहने के बाद सिस्टम खुद बंद हो जाता है। यह भी नॉर्मल है, मैनुअल में लिखा है।

## बैटरी, मोड और वापस जाना

लिमिट ड्राइवपैक में एक वैल्यू है। ग्रीन, ब्लू और पिंक तीनों एक ही 55 km/h इस्तेमाल करते हैं। मोड सिर्फ यह बदलते हैं कि मोटर कितना धकेलती है और बैटरी कितनी जल्दी खाली होती है। तेज चलाने में बहुत ज्यादा एनर्जी लगती है, इसलिए 25 के ऊपर रेंज जल्दी गिरती है।

फर्मवेयर 2.04 पर राइड के बाद बैटरी भी ज्यादा देर तक जागी रहती है। 2.50 पर Fazua ने उस स्टैंडबाय को एक से तीन घंटे कर दिया था, पुराने फर्मवेयर पर यह आठ घंटे तक है। इसलिए राइड के बाद मैं बैटरी का बटन दो सेकंड दबाकर रखता हूं जब तक LED बंद न हो जाएं।

स्टॉक पर वापस जाना केबल जुड़े होने पर एक कमांड है:

```sh
.venv/bin/python fazua_mac.py 25 --force
```

Eplus लिखता है कि अनलॉक करने के बाद आप फिर से 2.50 पर अपडेट कर सकते हैं। मैंने यह नहीं आजमाया, इसलिए अभी के लिए मैं 2.04 पर ही रहता हूं और Toolbox या ऐप में अपडेट नहीं दबाता।

25 km/h के ऊपर बाइक अब पेडेलेक नहीं रहती। जर्मनी में यह तब सिर्फ निजी जमीन पर चलाना allowed है, पब्लिक रोड पर नहीं, और वारंटी और इंश्योरेंस खत्म हो सकते हैं। फर्मवेयर फ्लैश करने से ड्राइवपैक खराब हो सकता है। यहां सब कुछ आपकी अपनी जिम्मेदारी पर है।
