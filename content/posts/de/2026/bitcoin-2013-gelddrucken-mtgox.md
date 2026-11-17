---
title: "Gelddrucken in Neukölln: Mein Bitcoin-Chat 2013"
seo_title: "Gelddrucken in Neukölln: Mein Bitcoin-Chat 2013 | emin.de"
description: "Ein nächtlicher Bot auf Mt. Gox, 17.500 Euro für einen Miner und eine Rechnung, die auf vier Schätzungen steht."
date: 2026-11-17
updated: 2026-11-17
lang: de
translations: {}
category: bitcoin
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
review_status: draft-emin-voice
voice_rewrite: v1
tags: ["bitcoin", "mining", "mtgox", "2013", "difficulty", "wallet"]
source_links:
  - { title: "Eurostat nrg_pc_204, Haushaltsstrompreise", url: "https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_204/default/table", note: "Deutschland, 2. Halbjahr 2013, 0,2921 Euro je kWh." }
  - { title: "Block 274.047", url: "https://mempool.space/api/v1/block/0000000000000004ca4e3cbe80d01b3c8a0851b55c011573440730784a798673", note: "Difficulty 707.408.283, Subsidy 25 BTC." }
  - { title: "Block 274.240", url: "https://mempool.space/api/v1/block/00000000000000007dd1a9c6ff5c9d0ecaa622c3a8c24455c8768f148399325b", note: "Difficulty 908.350.862, Anstieg um 28,4 Prozent." }
  - { title: "Bitcoin Developer Guide: Block Chain", url: "https://developer.bitcoin.org/devguide/block_chain.html", note: "Difficulty-Anpassung, Blocksubsidie und Proof of Work." }
  - { title: "Bitcoin Developer Guide: Transactions", url: "https://developer.bitcoin.org/devguide/transactions.html", note: "UTXOs, Private Key, Wechselgeld." }
  - { title: "Reuters: Mt. Gox files for bankruptcy", url: "https://www.reuters.com/article/business/mt-gox-files-for-bankruptcy-hit-with-lawsuit-idUSBREA1R0FX", note: "Insolvenzantrag 28.02.2014, damals gemeldete 850.000 BTC." }
  - { title: "CNBC: Mt. Gox findet 200.000 BTC", url: "https://cnbc.com/2014/03/20/mtgox-says-it-found-200000-bitcoins-in-forgotten-wallet.html", note: "Wiedergefundene Coins, 20.03.2014." }
tldr:
  - "2013 ließ ich 1.760 Euro in einem Handelsbot auf Mt. Gox mitlaufen. 6,5 Prozent Zwischenstand, nichts davon realisiert."
  - "Für 17.500 Euro und 670 GH/s bin ich nach Mannheim gefahren, ohne zu wissen, wie Mining geht."
  - "Die Amortisation von 63,7 Tagen steht auf vier Schätzungen. Einen Tag nach dem Kauf fiel der rechnerische Ertrag um 22,1 Prozent."
  - "Mt. Gox galt im Chat als zu profitabel zum Schließen. 81 Tage später kam der Insolvenzantrag."
basically:
  der-bot-läuft-im-handbetrieb: "Der Bot stellt Orders über HTTP, Mt. Gox antwortet mit Fehlern, das System stoppt, ich lese den Kurs bei 690 ab."
  zwei-nicht-miner-kaufen-hardware: "17.500 Euro, 670 GH/s, keine Ahnung von Mining, dafür eine Pool-Empfehlung vom Verkäufer."
  die-rechnung-steht-auf-vier-annahmen: "41 Stunden, 690 Euro, 600 Watt und ein Strompreisdurchschnitt ergeben 63,7 Tage, die prompt brechen."
  da-sind-doch-die-coins-drinn: "Die Wallet enthält Schlüssel, keine Coins. Das Guthaben ist die Summe passender UTXOs in einer öffentlichen Kette."
  rebalancing-ist-keine-arbitrage: "Kaufen bei Fall, verkaufen bei Steigung, gehebelt, vier Prozent in vier Tagen laut Julian."
  vertrauen-auf-kredit: "Mt. Gox sei zu profitabel zum Schließen, sagte Julian am 9. Dezember. 81 Tage später kam der Insolvenzantrag."
  vier-jahre-später: "2017 redet Julian von Future-Arbitrage und zehn Prozent im Monat. Der Miner kommt nicht mehr vor."
---

In [Bitcoin 2012](/posts/bitcoin-2012) war Arbitrage für mich noch ein Gedankenspiel. Julian hatte so etwas schon einmal programmiert, zwischen zwei Börsen, und sagte, ohne ungefähr eine Million zum Streuen werde das nicht profitabel. Ich hielt damals mehr von eigenen Projekten.

Der Chat, um den es hier geht, fängt ein Jahr später an, nachts, und ist keine Theorie mehr. Es gibt einen Bot, einen Miner und ein Konto bei Mt. Gox. Ich habe das alles mitgemacht, ohne zu wissen, wie Mining funktioniert. Keine Erfolgsstory, eher eine Rechnung mit offenen Stellen.

## Der Bot läuft im Handbetrieb

Am 2. Dezember 2013 um 01:20 schreibe ich Julian, das E-Mail sei bescheuert, wir sollen chatten, und lege gleich meine Prognose hinterher.

> Ich: "Glaube der fällt noch bis auf 500 oder weniger und dann pendelt er sich ein (nur so ein bauchgefühl) aber interessant wirds ja eh erst dann, wenn der kurs total ausrastet und dein system wirkt. nimmst du meine coins da gleich mit rein"

Sein System ist ein Bot, der Orders über die HTTP-Schnittstelle von Mt. Gox stellt. Wenn die Börse mit einem Fehler antwortet, hält er an, aus Sicherheit. Deshalb steht er auf Handbetrieb.

> Julian: "die bitcoins ins system packen dauert, die müssen erst transferiert werden"
> Julian: "und das system ist grad auf handbetrieb, die connection per hhtp schmiert immer ab und das system stoppt aus sicherheit."

Später sagt er: "habe heute alle chancen mitgenommen aber es war anstrengend". Der Automat ist an diesem Tag ein Mensch mit offenem Fenster.

Um 01:23 frage ich, ob hohe oder niedrige Preise besser sind. Er sagt hoch. Der Kurs steht im Chat, weil ich ihn ablese.

> Ich: "sind bei 690 grad"

Kurz darauf rechnet Julian mir einen Zwischenstand zu.

> Julian: "du hast jetzt schon 6.5% gewinn gemacht mit deinen 1760€, na wie fühlt sich das an? :D"
> Julian: "und gleich ist es wieder weg"

6,5 Prozent von 1.760 € sind 114,40 €. Nichts davon ist realisiert, es steht nur im System. Ich antworte, dass ich das Mitfiebern liebe, egal ob Fußball oder Bitcoin.

## Zwei Nicht-Miner kaufen Hardware

Am 8. Dezember finde ich eine Anzeige für KnC-Miner, November-Batch, 670 GH/s, mit Rechnung, von jemandem, der die Geräte auch vermietet. "scheint relativ seriös", schreibe ich. Am nächsten Tag fahre ich los.

> Ich: "Jo bin auf dem weg nach mannheim"
> Ich: "miner kaufen  😃"

Unterwegs frage ich noch, ob wir uns einem Pool anschließen müssen. Julian sagt ja und dann: "kenn mich aber auch nicht aus". Zwei Nicht-Miner kaufen also Hardware, der Verkäufer liefert die Pool-Empfehlung gleich mit.

Die Leistung steht zuerst falsch im Chat. Ich schreibe 360 GH/s, Julian fragt nach, ich korrigiere: "ähm ja klar 670 sorry". 17.500 € und 670 GH/s sind ab hier die beiden Zahlen, mit denen wir für die Maschine rechnen. Den finalen Kaufpreis zeigt der Chat nicht.

Abends teste ich fünf Minuten und poste den ersten Kontostand.

> Ich: "habs aber auch 5min getestet"
> Ich: "0.00570064 auf meinem account  😃"

0,00570064 BTC in fünf Minuten wären hochgerechnet 1,64 BTC am Tag. Später stehen 0,68 BTC nach geschätzten 41 Stunden auf dem Zähler. Als Rate taugt der erste Wert deshalb nicht. Was genau davon bereits auf dem Konto war, geht aus dem Chat nicht hervor. Ich habe ihn trotzdem wie ein Ergebnis behandelt.

## Die Rechnung steht auf vier Annahmen

Julian schätzt den Break-even auf zwei bis drei Monate. Am 11. Dezember schreibe ich den Kontostand.

> Ich: "0.67992427 BTC!"
> Julian: "ok also ungefähr 41 stunden für die summe, rechne mal mit exel rum"

Die Rechnung mit dem Kontostand ist einfach:

```
Ertrag/24 h  = 0,67992427 BTC / 41 h × 24 h = 0,398004 BTC
Brutto/Tag   = 0,398004 BTC × 690 €           = 274,62 €
Amortisation = 17.500 € / 274,62 €            = 63,7 Tage
Strom/Tag    = 0,6 kW × 24 h × 0,2921 €/kWh  = 4,21 €
```

Bei 690 € je BTC und gleich bleibendem Ertrag wären die 17.500 € also nach 63,7 Tagen wieder drin, vor Strom und allen anderen Kosten. Mit dem deutschen Haushaltsdurchschnitt von [0,2921 €/kWh](https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_204/default/table) aus der zweiten Jahreshälfte 2013 kommen 4,21 € Stromkosten pro Tag dazu. Dann sind es 64,7 Tage.

Jetzt die Annahmen.

Die 41 Stunden sind Julians Schätzung, kein Log. Ich hatte im Chat einen Ausfall gemeldet, er fragt, ob es zwei waren, die Zahl bleibt offen.

690 € ist der Kurs vom 2. Dezember, nicht vom Tag des Ertrags. Am 9. Dezember rechnet der Chat selbst mit rund 600 € pro BTC, das ist die vorsichtigere Zahl. Mit 600 € wären es 73,3 Tage statt 63,7.

600 Watt hat nie jemand gemessen. Julian fragt "strom 600W richtig?", ich antworte "jo", und dann: "ich habs noch nicht gemessen" und "aber das steht im internet". Die 4,21 € Stromkosten stehen deshalb auch nur auf einer Annahme.

Der Strompreis ist ein Eurostat-Durchschnitt für Haushalte, kein Tarif von uns.

Zur Plausibilität: Bei der Difficulty von [Block 274.047](https://mempool.space/api/v1/block/0000000000000004ca4e3cbe80d01b3c8a0851b55c011573440730784a798673) liegt der langfristige Erwartungswert für 670 GH/s bei 0,4763 BTC am Tag, vor Pool-Gebühren und mit damals 25 BTC Subsidy pro Block. Die hochgerechneten 0,398 BTC liegen in derselben Größenordnung. Ein Beweis für konstante Ausbeute ist das nicht.

Und dann kommt der 10. Dezember. Die Difficulty springt mit [Block 274.240](https://mempool.space/api/v1/block/00000000000000007dd1a9c6ff5c9d0ecaa622c3a8c24455c8768f148399325b) auf 908.350.862, ein Plus von 28,4 Prozent in weniger als einem Tag. Für dieselbe Hashrate bleiben rechnerisch 22,1 Prozent weniger BTC. Aus 63,7 Tagen werden 81,8, wenn ich den gleichen Kurs und die neue Durchschnittsausbeute ansetze. Bei weiteren Sprüngen dieser Art ist die statische Zahl eine Untergrenze, keine Prognose. Die Rechnung bricht einen Tag nach dem Kauf.

## Da sind doch die Coins drinn

Am 9. Dezember, während der Fahrt, frage ich Julian nach Wallet und Backup. Er sagt, die Key-Dateien lägen bei ihm auf zwei Rechnern und einem USB-Stick, mit einem 20-Zeichen-Passwort.

> Ich: "Du brauchst doch auch dein Wallet oder nicht? Da sind doch die Coins drinn, musst du genau so backupen oder?"

Das ist der Fehler. In der Wallet sind keine Coins. In der Wallet sind Schlüssel.

Ich will die Wallet auf ein Telefon legen.

> Ich: "fühlt sich irgendwie sicherer an, pack das da rauf und pack mein telefon in ne schublade und hols nur raus wenn ichs brauche"

Die Schublade schützt ein Gerät mit Schlüsseln. Mehr nicht.

Eine Bitcoin-Adresse ist kein Konto mit einer Zahl darauf. Eine Wallet zeigt die Summe der noch unausgegebenen Transaktions-Outputs an, für die sie passende Schlüssel hat. Diese [UTXOs](https://developer.bitcoin.org/devguide/transactions.html) sind an Bedingungen gebunden. Wer sie mit einer Signatur seines privaten Schlüssels erfüllt, darf sie ausgeben. Jede Transaktion verbraucht ganze Stücke und erzeugt neue, den Rest schickt sie als Wechselgeld zurück.

Die Blockchain ist das öffentliche Kassenbuch dieser Vorgänge. Jeder kann die Beträge und Adressen lesen, sie sind pseudonym, nicht verschlüsselt. Julians Erklärung im Chat, es sei "verschlüsselt wem welcher bitcoin gehört", ist deshalb nur halb richtig. Sein nächster Satz trifft es besser: "deine wallet ist eigentlich nur ein schlüssel mit dem du was an dieser blockchain verändern kannst".

Wer die Schlüssel hat, kommt ohne mich an die Coins. Mein Satz "der key ist wichtig right?" ist die halbe Wahrheit, die ich für die ganze halte. Später schreibe ich: "so ich habs jetzt kapiert".

## Rebalancing ist keine Arbitrage

Julian kauft bei fallendem Kurs und verkauft bei steigendem, in Stufen, und nennt das Rebalancing. Mit Arbitrage hat das nichts zu tun. Auf meine Frage nach der Anzeige sagt er: "rebalancing mache ich, aber gehebelt".

Am 9. Dezember nennt er die einzige Renditekennzahl des Chats.

> Julian: "vor 4 tagen stand der kurs schon einmal bei 670"
> Julian: "seit dem zu jetzt kurs 670 haben wir 4% gewinn gemacht (aber wir hatten den system fehler der uns geld gekostet hat)"
> Julian: "eigentlich wären die letzten tage so 7% gewinn gewesen, ohne system ausfall"
> Julian: "von gleichen kurs zu gleichen kurs"
> Julian: "aber die letzten tage waren auch optimal für uns"

4 Prozent in vier Tagen bei gleichem Kurs, "eigentlich" 7. Das ist eine Selbstauskunft ohne Auszug. Der Systemausfall hat Geld gekostet, wie viel, sagt er nicht. "Gehebelt" bleibt undefiniert, und die Anzeige trennt Gewinn aus Kursbewegung nicht von Gewinn aus dem System. Risikofrei ist daran nichts.

Dazu kommen zwei getrennte Töpfe. Die 1.760 € liegen im alten System, die 2,5 BTC, die ich am 9. Dezember erfrage, liegen auf einem fremden Mt.-Gox-Konto. Ob es 2,5 oder 1,25 sind, weiß ich selbst nicht, weil das Geld von Julians Bruder kam. 2,5 BTC wären zu 690 € 1.725 €, also fast der Einsatz. Beides zusammenzurechnen wäre falsch.

## Vertrauen auf Kredit

Am 9. Dezember erklärt Julian den Unterschied zwischen bitcoin.de und Mt. Gox. Dann sagt er den Satz, der diesen Text trägt.

> Julian: "mtgox ist vertrauenswürdig genug das sie nicht einfach schließen, dazu machen die zuviel geld damit"

Seine Begründung ist nicht Regulierung, nicht Technik, sondern Geschäftsvolumen.

Ich frage, ob seine Coins nicht weg sind, wenn Mt. Gox abschmiert. Er hält die eigene Wallet für das größere Risiko, weil man sie selbst verbocken kann. Zwei Tage später schreibe ich, ohne dass jemand nachfragt:

> Ich: "wenn die abschmiert, sind wir im arsch"

Vom 9. Dezember bis zum 28. Februar 2014 sind es 81 Tage. An dem Tag beantragt Mt. Gox [Gläubigerschutz](https://www.reuters.com/article/business/mt-gox-files-for-bankruptcy-hit-with-lawsuit-idUSBREA1R0FX) beim Bezirksgericht Tokio. Nach damaliger Angabe des Unternehmens fehlten 750.000 BTC von Kunden und 100.000 eigene, zusammen 850.000. Am 7. März wurden in einer alten Wallet rund [200.000 BTC wiedergefunden](https://cnbc.com/2014/03/20/mtgox-says-it-found-200000-bitcoins-in-forgotten-wallet.html), es blieben 650.000 als damals gemeldeter Fehlbetrag.

Was aus genau meinen 2,5 oder 1,25 BTC wurde, steht nicht im Chat. Deshalb gibt es hier auch keine Mt.-Gox-Verlustgeschichte. Belegt ist nur, wo sie lagen, als wir darüber sprachen.

## Vier Jahre später

Am 28. Oktober 2017 schreibe ich Julian nach drei Jahren wieder an und frage, was er mit Crypto macht. Sein System gibt es noch.

> Julian: "ich mach immer noch mein future arbitrage"
> Julian: "zur zeit mach ich damit ~10% profit im monat ohne kurs schwankungsrisiko"

Zehn Prozent im Monat, vier Jahre später, wieder ohne Auszug. Der Miner kommt in seiner Antwort nicht vor, kein Wort über die Hardware oder den Ausstieg. Ich habe auch nicht danach gefragt.

Das ist die ehrlichste Pointe, die dieser Chat hat. Wir haben 17.500 Euro, 670 GH/s und 600 Watt diskutiert. Am Ende interessiert wieder nur die Rendite. An der ungemessenen Zahl von 600 Watt ändert sich im Chat bis zuletzt nichts.
