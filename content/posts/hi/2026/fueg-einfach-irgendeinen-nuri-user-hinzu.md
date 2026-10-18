---
title: "बस किसी भी Nuri यूज़र को जोड़ दो"
description: "Referral, Guardian, विरासत, Multisig और साथ में बचत, ये सब Nuri में एक फीचर बन जाएँगे। तुम Settings में बस एक यूज़रनेम जोड़ते हो, बाकी सब उसी से निकलता है।"
date: "2026-10-18"
updated: "2026-10-18"
lang: hi
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
tldr: ["Nuri के लिए मेरा आइडिया सिर्फ एक फीचर है। तुम Settings में किसी का यूज़रनेम जोड़ देते हो।", "इसी से Referral, Guardian, विरासत, Multisig और साथ में बचत निकलते हैं, इस बात पर निर्भर करता है कि तुम क्या अलाउ करते हो।", "Fee हमारे Frontend में होती है, Source Code में खुले तौर पर, और तुम खुद उसे 0 से 21 प्रतिशत के बीच सेट करते हो।"]
sections: [{"basically": "Nuri में Referral, Guardian, विरासत और Multisig एक ही फीचर बन जाएँगे। तुम Settings में एक यूज़रनेम जोड़ते हो।"}, {"basically": "जो Nuri में किसी दोस्त को जोड़ता है, वो उसके साथ Fee बाँटता है। 10 लोग होने पर Fee 10 से डिवाइड हो जाती है।"}, {"basically": "हर पेमेंट तुम्हारे लोगों को कुछ Satoshi और एक पुश नोटिफिकेशन भेजती है। इससे Nuri वायरल होता है।"}, {"basically": "Expanding Multisig में तुम्हारे Guardians की Keys तभी एक्टिव होती हैं, जब तुम अपनी खुद की Keys खो चुके होते हो।"}, {"basically": "Guardian तुम्हारी Key रिकवर करने में मदद करता है। वारिस को तभी एक्सेस मिलता है, जब तुम एक साल तक कुछ नहीं करते।"}, {"basically": "Nuri Fee प्रोवाइडर्स पर नहीं लेता, बल्कि अपने खुद के Frontend में लेता है, Source Code में खुले तौर पर।"}, {"basically": "Nuri में तुम अपनी Fee खुद सेट करते हो, 0 से 21 प्रतिशत तक। मेरी पार्टियों में डोनेशन से पाँच गुना ज़्यादा आया।"}, {"basically": "Nuri में हर API-Call एक छोटी x402 या L402 पेमेंट होगी। इससे Fee की प्रॉब्लम सॉल्व हो जाती है।"}, {"basically": "Multisig कोई नहीं समझता। तीन लोग और एक Hardware-Wallet, ये सब समझते हैं। हम Nuri ऐसे ही समझाएँगे।"}, {"basically": "Nuri में पहला स्टेप सिर्फ Settings में एक दोस्त है, जो साथ में कमाता है। बाकी सब इसी पर बनता है।"}]
---
मुझे लगता है आज सुबह मैंने एक काफी बढ़िया चीज़ सुलझा ली है। बात Nuri के एक Feature की है। फिलहाल तो बस आइडिया है।

## पाँच की जगह एक Feature

मैं Multisig, Guardians, Inheritance और Referral को एक ही Feature में ठूंस देना चाहता हूँ। और ये ऐसे होगा। मैं अपनी App के Settings में बस तुम्हारा Username जोड़ दूँगा। बस, इतना ही।

जिस पल मैं ऐसा करूँगा, तुम्हें उन Fees का 50 प्रतिशत मिलेगा जो मैं Nuri को देता हूँ। साथ ही तुम मेरे Guardian भी हो सकते हो। मतलब, तुम अपने Passkey से मेरी मदद करोगे कि मैं भविष्य में अपना Account वापस पा सकूँ। तुम Co-Signer की तरह Wallet में भी घुस सकते हो। या हम एक कंपनी हैं और साथ में एक Multisig-Wallet चाहते हैं।

ये सब अलग-अलग Features हैं। लेकिन सब एक ही Frontend-Feature पर टिके हैं। बस किसी भी Nuri-User को जोड़ दो।

## Fee बंट जाएगी

जो Fees मैं Nuri को देता हूँ, उसे हम शुरुआत में कुछ 2,1 प्रतिशत पर फिक्स कर देते हैं। जब भी मैं कोई Payment करूँगा, आधा Nuri को जाएगा और आधा उस इंसान को जिसे मैंने जोड़ा है।

तुम 10 Usernames भी जोड़ सकते हो। फिर तुम्हारी Wallet में 10 लोग होंगे, और Fees 10 से बंट जाएंगी। तुम्हारे सारे नए लोगों को अपने आप एक Cut मिलेगा, और Nuri को दसवां हिस्सा।

हम चाहें तो एक-दूसरे को भी जोड़ सकते हैं, फिर पैसा वापस मेरे पास आ जाएगा। हमें देखना होगा कि वहाँ कोई Loop न बन जाए। वो तो चलेगा नहीं।

## मेरी माँ को 17 Satoshi मिले

Bitcoiner चाहते हैं कि और लोग भी Bitcoiner बनें। अब मैं अपनी माँ को Invite कर सकता हूँ। और जब भी मैं कोई Payment करूँगा, उन्हें एक Push-Notification आएगी। तुम्हें अभी 20 Satoshi मिले। तुम्हें अभी 17 Satoshi मिले।

मैं ये खुद से जानता हूँ। एक और Service पर मुझे हर बार एक Telegram-Message आता है जब कोई Swap होता है, और उसमें लिखा होता है कि मैंने अभी 10 Satoshi कमाए। ये सबसे Viral चीज़ है जो मैंने खुद के लिए कभी Experience की है। मज़ेदार है, और हम एक-दूसरे को थोड़ा-थोड़ा पैसा देते रहते हैं।

Arkade के साथ हम 1, 2, 3, 4 या 5 Satoshi बिना Fee के इधर-उधर भेज सकते हैं। और ये भी दिखाता है कि Arkade उस मोर्चे पर कितना कमाल का है।

## Decaying नहीं, Expanding Multisig

जो Keys हम जोड़ते हैं, वो उसके उलट करते हैं जो हम Nuri में अभी तक करते आए हैं। अगर हम नहीं चाहते कि वो शुरू से Signer हों, तो ये Decaying Multisig नहीं, बल्कि Expanding Multisig है।

मतलब, अगर मैं अपनी सारी Keys खो देता हूँ, तो एक समय बाद, एक साल या कुछ, मेरे Guardians की Keys अपने आप Activate हो जाती हैं। Bitcoin में ऐसा किया जा सकता है। Ethereum में शायद मुश्किल होगा, लेकिन वो भी ज़रूर हो जाएगा।

और हाँ, ये Settings हैं जो तुम Set कर सकते हो। कोई तुम्हारे पैसे तक नहीं पहुँचे, सिर्फ इसलिए कि तुमने एक साल अपने Bitcoin नहीं हिलाए।

## Guardian और वारिस

Guardian एक Feature है। उसे मैं बिल्कुल वैसे ही करना चाहूँगा जैसे Bitkey ने किया है। उन्होंने इसे कुछ ऐसे बनाया है कि तुम्हारे Guardians तुम्हारी Key वापस पाने में मदद कर सकते हैं, लेकिन तुम्हारे पैसे का Access उनके पास नहीं है। उन्होंने ये कैसे किया, ये हमें अभी देखना है।

दूसरा Feature है Inheritance, और ये बेहद ज़रूरी है। मैं मसलन अपनी बहन को अपनी वारिस के तौर पर डालना चाहता हूँ। जब भी मैं कोई Payment करता हूँ, एक Counter फिर से Zero पर Set हो जाता है। और अगर मुझे कुछ हो जाए, चाहे कोई भी वजह हो, मैं अगले दिन नहीं उठता, तो एक साल बाद वो अपने आप Activate हो जाएगी और मेरे Funds का Access उसके पास होगा। ऐसी चीज़ बहुत ज़्यादा ज़रूरी और बहुत ज़्यादा Cool है।

## Fee Frontend में है

और भी ज़्यादा ज़रूरी ये है कि Fee कहाँ है। आज हम उसे Providers के पास लेते हैं, और ये गलती है। हमें Fee को Providers के पास हर जगह Zero पर Set कर देना चाहिए और उसे अपने पास लेना चाहिए, Frontend में या हमारे Backend में। Nuri के पीछे फिर दस मिलियन Providers हो सकते हैं, बिल्कुल फर्क नहीं पड़ता। वो अपना Spread और अपनी Fee लेते हैं, और हम उनके ऊपर कुछ नहीं जोड़ते।

इससे हम Nuri-Fee और Partner-Fee में फर्क कर सकते हैं। ये बस Clean है। और मैं लोगों को Open-Source-Code में दिखाना चाहता हूँ, देखो, यहाँ Fee है, ये Sourcecode में लिखी है। मैं चाहता हूँ कि हम दुनिया की सबसे Transparent कंपनी हों।

इसके लिए मेरी फेवरेट कहानी Aave-Community में मचा बवाल है, जब पीछे से Swap-Provider बदल दिया गया था। इससे दिखता है कि Backends के पास अब Power नहीं है, बल्कि Frontends के पास है। जिसके पास Users हैं, उसके पास Moat है।

## अपनी Fee खुद Set करो

हम लोगों को Fee खुद Set करने भी देते हैं। बस Fairness के लिए। अगर तुम कोई Fees नहीं देना चाहते, तुम 0 प्रतिशत पर जा सकते हो। लेकिन तुम 21 प्रतिशत पर भी जा सकते हो, अगर चाहो। और अगर कोई पूछे, तुम 2 प्रतिशत क्यों लेते हो, तो हम कहेंगे, Settings में जाओ और बदल दो।

मुझे क्यों लगता है कि ये चलेगा? मेरी Berlin की Parties की वजह से। चाहे मैंने कितनी भी Entry ली और Beer की कितनी भी कीमत रखी, लोगों को ये कभी ठीक नहीं लगा। एक दिन हमने कहा, fuck it, Beer के लिए Donation, Entry के लिए Donation। हमने करीब पाँच गुना पैसा कमाया।

अगर तुम लोगों को ये खुद तय करने का मौका दो, तो कुछ लोग इसे काफी ऊँचा भी Set करते हैं। क्योंकि उन्हें Gamification मज़ेदार लगती है या क्योंकि वो Mission के साथ हैं। अमीर भी हैं और गरीब भी, कंजूस भी हैं और बाकी लोग भी। मैं उन लोगों के लिए, जिनसे मैं किसी Conference पर मिलता हूँ और अपने Account में जोड़ता हूँ, अपनी Fee 21 प्रतिशत पर Set कर दूँगा। फिर उन्हें अपने आप मेरा Split मिलेगा।

## हर Call एक छोटी Payment है

Fee लेने का मेरे पास एक और बेहतर आइडिया है। हम Nuri-API को बस Micropayments से Gate कर देते हैं, और Micropayments ही हमारी Fees हैं। App में हर Operation की फिर एक छोटी x402- या L402-Payment लगेगी। L402, अगर Bitcoin से जुड़ा कुछ है, x402, अगर Crypto से जुड़ा कुछ है।

एक Example। तुम्हारे Nuri-Passwort-Manager में एक नया Password Save करना या पढ़ना, इसकी कीमत 0,1 Cent या 1 Cent होगी। और ये हम सीधे Wallet से ले सकते हैं, क्योंकि वो Agentic है। Router पर मैं ये पहले से करता हूँ। तुम उसे एक Token से Use कर सकते हो या Calls के लिए Pay करते हो, और हम हर एक Endpoint को अलग Price दे सकते हैं।

फिर तुम्हें अपना Fee-System बनाने की ज़रूरत नहीं। कोई भी हमारी API को जहाँ चाहे Integrate कर सकता है, और हमें Payments अपने आप मिलती हैं। शुरुआत मैं Contact-Book से करूँगा, हर बार जब कोई Contact जोड़ता है तो 0,1 Cent। अगर ये चल गया, तो हम इसे पूरी App पर फैला देंगे। एक समय पर एक Feature।

## Family-Wallet और Hardware-Wallets

जब लोगों ने एक बार Experience कर लिया कि ऐसी Safe-Wallet कैसे काम करती है, जो हमारे पास कंपनी के तौर पर है, तो उन्हें ये सच में Cool लगता है। मेरे पास एक Key है, लेकिन Pay हम सिर्फ साथ में कर सकते हैं। ये एकदम कमाल की Crypto-Experience है।

या एक Family-Wallet। मेरी माँ, मेरी बहन और मैं। हम में से दो काफी हैं साथ में Pay करने के लिए। Multisig को कोई Imagine नहीं कर सकता। लेकिन ये कहना कि हम तीन लोग हैं और एक Hardware-Wallet, या हम पाँच लोग हैं और एक AI, ये हर कोई समझता है।

और हम उस Principle पर टिके रहते हैं जो कोई और नहीं कर पाता। One-Click-Face-ID-Wallet। Seedless, कोई Seed-Phrase नहीं, Phishing-Resistant, Default में Multisig।

## पहला कदम

हम बहुत धीरे-धीरे आगे बढ़ते हैं। पहला कदम बस इतना है कि मैं Settings में एक दोस्त को अपने Padawan के तौर पर जोड़ सकूँ और उसे फिर अपने आप कुछ मिले। फिर हम अपनी Database में देखते हैं कि किसने किसे जोड़ा और कौन से Swaps हुए, और Referrals Pay करते हैं।

और जब तुम कुछ Send करो, तो हमें सारे Nuri-Users की Autocomplete होनी चाहिए। सिर्फ तुम्हारे Contacts नहीं, बल्कि बस सब। मैं L टाइप करता हूँ और L वाले सारे लोग पाता हूँ, बिल्कुल PayPal की तरह।

बाद में Key-Rotation आएगी, Keys जोड़ना और हटाना और साथ में एक Hardware-Wallet। ये सब हमें वैसे भी करना है। लेकिन Vision के हिसाब से ये, मुझे लगता है, बिल्कुल Perfect है। क्योंकि ये इतना ज़बरदस्त Viral Feature है कि तुम दूसरे के साथ कमा सकते हो या उसके Co-Signer हो।
