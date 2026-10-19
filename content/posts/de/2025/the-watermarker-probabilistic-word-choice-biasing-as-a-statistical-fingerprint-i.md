---
title: "Der Watermarker: Wie man mit statistischer Wortwahl-Beeinflussung einen Fingerabdruck in LLM- und KI-Texten hinterlässt"
description: "Ich dachte, ChatGPT versteckt unsichtbare Zeichen in seinen Antworten. Das echte Wasserzeichen steckt in den Wörtern, und ich habe ein kleines Tool gebaut, um meinen eigenen Schlüssel einzustempeln."
date: "2025-06-21T20:03:23.420Z"
updated: "2025-06-21"
lang: de
translated_from: "en/the-watermarker-probabilistic-word-choice-biasing-as-a-statistical-fingerprint-i"
source_sections: ["what-is-probabilistic-word-choice-biasing-and-how-is-it-recognised", "is-that-similar-to-proving-membership-with-a-merkle-tree-hash", "is-there-a-single-hash-i-can-match-against", "can-i-embed-my-own-secret-key-to-prove-authorship", "how-do-i-tokenise-the-text-correctly", "could-i-just-ask-chatgpt-to-embed-my-key", "what-if-i-copy-an-answer-and-regenerate-it-under-my-own-key", "the-tool-i-built", "part-1-embed-a-watermark", "part-2-detect-the-watermark"]
category: agents-ai
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
image: "/media/the-watermarker-probabilistic-word-choice-biasing-as-a-statistical-fingerprint-i/01-34df8564.jpeg"
tldr: ["Die Zero-Width-Zeichen in ChatGPT-Antworten waren ein Bug. Das echte Wasserzeichen sitzt in der Wortwahl.", "Ein geheimer Schlüssel lenkt Tokens in Richtung einer Green List, und ein Detektor mit demselben Schlüssel misst den Überschuss als z-Score.", "Ich habe ein kleines Python-Tool gebaut, das Text mit meinem eigenen privaten Schlüssel stempelt und später verifiziert."]
sections: [{"basically": "Ein geheimer Schlüssel schubst jedes Token in Richtung einer Green List. Über fünfzig Tokens hinweg zeigt sich der Überschuss."}, {"basically": "Ein geändertes Byte bricht einen Merkle-Proof. Um ein Wasserzeichen zu killen, musst du die Hälfte der Wörter umschreiben."}, {"basically": "Kein einzelner Hash. Du führst den Prozess pro Token erneut aus, mit dem Schlüssel und dem Tokenizer."}, {"basically": "Nicht im gehosteten ChatGPT, aber mit einem lokalen Open-Source-Modell und meinem eigenen privaten Schlüssel, ja."}, {"basically": "Falscher Tokenizer, falsche Green Lists, falsche Negative. Sogar geschweifte Anführungszeichen können Tokens verschieben."}, {"basically": "Nein. Der Watermark-Hook bleibt auf dem Server, also braucht ein persönliches Wasserzeichen lokale Inferenz."}, {"basically": "Eine leichte lokale Paraphrase verschiebt den Fingerabdruck auf meinen Schlüssel, wenn mindestens 70% der Token-IDs bleiben."}, {"basically": "Ein 20-Zeilen-Skript stempelt Text mit meinem Schlüssel und markiert alles mit einem z-Score über 4."}, {"basically": "Wähl ein Modell, einen privaten Schlüssel und die Settings, häng den Processor an, generiere."}, {"basically": "Gleiches Modell, gleicher Schlüssel, zähl die Green-Hits. Ein hoher z bestätigt die Signatur."}]
---
# Der Watermarker: Probabilistische Beeinflussung der Wortwahl als statistischer Fingerabdruck in LLM-Outputs und KI-Texten

Meine Vermutung war, dass ChatGPT unsichtbare Zeichen einbetten muss, um seine Antworten zu markieren.

![](../../../media/the-watermarker-probabilistic-word-choice-biasing-as-a-statistical-fingerprint-i/01-34df8564.jpeg)

Und das stimmte auch, OpenAI hat geantwortet und gesagt, das war ein temporärer Bug, nicht die echte Implementierung.

Das hat mich noch neugieriger gemacht, es muss doch in der Praxis eine absichtliche Markierung auf einer höheren semantischen Ebene geben.

Ich habe dann verstanden, dass ein Watermark nicht über spezielle Bytes funktioniert, sondern über die statistische Verteilung ganz normaler Tokens. Es erzeugt eine kleine Verschiebung, sodass der Text einen unwahrscheinlichen Überschuss an "bevorzugten" Wörtern enthält. Man sieht es nicht, aber man kann es messen.

Die Zero-Width-Spaces waren ein temporärer Bug. Für mich sah es aus wie ein absichtlicher Tracer. Aber bei meiner Recherche habe ich gelernt, dass das echte Watermark auf Token-Wahrscheinlichkeiten arbeitet, nicht auf rohen Zeichen.

```
This text looks the same.
This text looks the same.
```

Sie sehen identisch aus, aber die "Leerzeichen" darin sind nicht dasselbe Zeichen. U+0020 ist das ganz normale Leerzeichen von der Tastatur. [U+202F, das schmale geschützte Leerzeichen, sieht fast identisch aus, ist aber etwas dünner und verhindert vor allem einen Zeilenumbruch an dieser Stelle.](https://www.compart.com/en/unicode/U+202F)

Jeder Editor, jede Suchen-und-Ersetzen-Funktion oder jeder Zeilenumbruch-Algorithmus, der U+202F anders behandelt, sieht die Sätze also als unterschiedlich, auch wenn deine Augen das nicht tun.

![](../../../media/the-watermarker-probabilistic-word-choice-biasing-as-a-statistical-fingerprint-i/02-a86a02d7.png)

Deshalb beeinträchtigt das Entfernen oder Normalisieren von Whitespace ein echtes Watermark nicht, das Signal steckt in den Wörtern, die auftauchen. Wenn eine Antwort zum Beispiel "data [U+202F] set" enthält, entfernt das Löschen des Leerzeichens das Artefakt, aber ein statistisches Watermark überlebt, weil die Wörter "data" und "set" selbst immer noch da sind.

## Was ist "probabilistische Beeinflussung der Wortwahl" und wie erkennt man sie?

Ich denke, der beste Weg, es zu verstehen, ist, es als einen kleinen Schubs mit einem geheimen Seed zu sehen.

Für jede Wortposition kombiniert das System einen geheimen Schlüssel mit der ID des vorherigen Tokens und füttert das in eine pseudozufällige Funktion. Der Output definiert eine temporäre "grüne Liste" für diese Position. Das Modell addiert dann einen kleinen Log-Wahrscheinlichkeits-Bonus auf jedes Token auf der grünen Liste, bevor es sampelt.

Eine einzelne Wahl sieht immer noch natürlich aus, aber über fünfzig oder mehr Tokens sammelt der Text weit mehr dieser Wörter von der grünen Liste, als der Zufall erlaubt.

Ein Detektor mit demselben Schlüssel muss die ganze Berechnung wiederholen, zählen, wie viele Tokens in die grüne Liste fallen, und diesen Überschuss in einen Z-Score umwandeln. Wenn der Score hoch genug wird, sinkt die Wahrscheinlichkeit, dass ein Mensch das geschrieben hat, auf fast null. Deshalb fallen kurze oder stark umgeschriebene Passagen unter die Erkennungsschwelle.

## Ist das ähnlich wie der Nachweis von Mitgliedschaft mit einem Merkle-Tree-Hash?

Meine nächste Frage war, wie es sich im Vergleich zu den deterministischen Beweisen in Blockchains verhält. Ein Merkle-Tree komprimiert einen Datensatz in einen einzigen öffentlichen Root-Hash. Man kann ein bestimmtes Stück davon mit einem kurzen Pfad verifizieren, und schon eine Änderung um ein einziges Bit zerstört den Beweis. Das ist eine harte Grenze.

Watermarking ist anders. Der Schlüssel bleibt privat, beim "Watermarker", und jede Token-Position bekommt eine neue zufällige Teilmenge von "bevorzugten" Tokens. Die Verifizierung ist probabilistisch, nicht alles oder nichts. Leichte Bearbeitung schwächt das Signal, zerstört es aber nicht. Nur viel Umschreiben bringt den Z-Score wieder auf menschliches Niveau. Ein geändertes Byte zerstört einen Merkle-Beweis, aber man muss die Hälfte der Wörter umschreiben, um ein Watermark zu killen.

## Gibt es einen einzelnen Hash, gegen den ich abgleichen kann?

Nein. Der geheime Schlüssel wirkt wie ein Seed für einen Strom von Outputs, einer pro Token, und diese Seeds tauchen nie im finalen Text auf. Man muss den ganzen Prozess pro Token replizieren und die Statistik über alle Tokens betrachten. Wenn man das tut, sind der geheime Schlüssel und der Tokenizer alles, was man braucht.

## Kann ich meinen eigenen geheimen Schlüssel einbetten, um Autorschaft zu beweisen?

Ich wollte einen Weg, um zu beweisen, dass ein Text von mir ist. Das gehostete ChatGPT-Interface gibt einem keinen Schlüssel-Parameter, aber Open-Source-Modelle schon. Wenn ich ein Modell wie Mistral-7B-Instruct lokal laufen lasse, kann ich einen `WatermarkLogitsProcessor` anhängen, ihm meinen eigenen privaten Schlüssel geben und Text erzeugen, der meinen Fingerabdruck trägt. Wenn ich den Schlüssel speichere, kann ich die Autorschaft später verifizieren, und jeder ohne den Schlüssel kann die Markierung weder bestätigen noch fälschen. Zum Beispiel könnte ein Skript, das ich laufen lasse, einen Artikel umschreiben, und der Detektor mit meinem Schlüssel meldet einen Z-Score von 5,2. Wenn jemand die Hälfte davon umformuliert, fällt dieser Score unter 2.

## Wie tokenisiere ich den Text richtig?

Die Erkennung funktioniert nur, wenn man denselben Tokenizer wie der Generator verwendet. Hier geht es leicht schief. GPT-3.5/4-Modelle verwenden die Open-Source-`tiktoken`-Encodings. Wenn man mit der falschen Tabelle tokenisiert, passen die grünen Listen nicht mehr zusammen und man bekommt falsche Negative. Selbst Kleinigkeiten wie gerade versus geschwungene Anführungszeichen können Token-Grenzen verschieben und das Ganze durcheinanderbringen.

## Könnte ich ChatGPT einfach bitten, meinen Schlüssel einzubetten?

Ich habe versucht herauszufinden, ob ein cleverer Prompt meinen Schlüssel injizieren könnte. Die Antwort war ein klares Nein. Das öffentliche Interface hält den Watermark-Hook auf dem Server, damit niemand ihn missbrauchen kann. Wenn man jeden beliebigen Schlüssel setzen könnte, könnten Leute andere tracken oder Zuschreibungen fälschen. Ein persönliches Watermark braucht also lokale Inferenz. "Bitte mit Schlüssel 12345 watermarken" an die API zu schicken ändert nichts.

## Was, wenn ich eine Antwort kopiere und sie unter meinem eigenen Schlüssel neu generiere?

Am Ende kam ein praktischer Workflow dabei heraus. Ich füge eine originale ChatGPT-Antwort in den Prompt meines lokalen Modells ein, bitte um eine leichte Umschreibung und generiere sie mit meinen privaten Watermark-Einstellungen. Die neue Version behält die Fakten, trägt aber jetzt meinen Fingerabdruck. Ich bekomme also die Qualität des ChatGPT-Contents plus meine eigene private Zuschreibung. Damit das funktioniert, muss man mindestens 70 % der Token-IDs behalten, sonst wird das Signal schwach. Starkes Umschreiben oder maschinelle Übersetzung drücken das Watermark unter die Schwelle.

## Das Tool, das ich gebaut habe

Das hat mich von einem Mythos über unsichtbare Unicode-Zeichen zu einem funktionierenden Verständnis davon gebracht, wie ein privater Schlüssel Token-Wahrscheinlichkeiten beeinflussen kann. Das Wichtigste, was ich gelernt habe: Der Beweis ist statistisch, nicht deterministisch.

Ich habe ein 20-zeiliges Python-Skript mit Hugging-Face-Prozessoren gebaut, mit dem ich Text mit meinem privaten Schlüssel stempeln und später verifizieren kann. Der Generierungsteil verwendet Mistral-7B mit einem `WatermarkLogitsProcessor`, und der Verifizierungsteil verwendet einen `WatermarkDetector` mit demselben Schlüssel. Das Skript markiert alles mit einem Z-Score über 4.

Damit kann ich Autorschaft für KI-unterstützte Texte beanspruchen, es mathematisch zeigen und wissen, dass kleine Bearbeitungen den Fingerabdruck nicht entfernen.

## Teil 1, ein Watermark einbetten

```python
# pick model + tokenizer
model, tok = load_model("Mistral-7B"), load_tokenizer("Mistral-7B")

# choose private 128-bit key and watermark settings
KEY = 0xA7F3_42EA_9C11_BEEF
GAMMA = 0.50 # green-list fraction
DELTA = 2.0 # logit boost

# attach watermark processor
wm = WatermarkLogitsProcessor(vocab_size=model.V,
 greenlist_ratio=GAMMA,
 bias=DELTA,
 hashing_key=KEY)

# generate text
prompt = "In a world where the oceans are made of soda…"
output = model.generate(prompt,
 logits_processor=[wm],
 max_tokens=300)

print(output) # ordinary text, invisibly watermarked
```

## Teil 2, das Watermark erkennen

```python
# reload same model + tokenizer
model, tok = load_model("Mistral-7B"), load_tokenizer("Mistral-7B")

# same secret key and gamma
KEY = 0xA7F3_42EA_9C11_BEEF
GAMMA = 0.50

# set up detector
det = WatermarkDetector(vocab_size=model.V,
 gamma=GAMMA,
 hashing_key=KEY)

# analyse unknown text
ids = tok.encode(text_to_check)
z, p = det.detect(ids)

if z > 4:
 verdict = "Watermark present (p ≈ {:e})".format(p)
else:
 verdict = "No convincing watermark"

print(verdict)
```

Also kurz gesagt. Zum Generieren läuft jedes neue Token durch PRF(KEY, previous_token), das ergibt die grüne Liste, die Logits der grünen Tokens bekommen einen Boost, und dann sampelt das Modell. Zum Erkennen baut man dieselben Listen mit dem Schlüssel nach, zählt die grünen Treffer und berechnet ein One-Proportion-Z. Ein hohes Z bestätigt die Signatur.
