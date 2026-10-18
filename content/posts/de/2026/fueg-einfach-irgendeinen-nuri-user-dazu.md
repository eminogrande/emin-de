---
title: "Füg einfach irgendeinen Nuri-User dazu"
description: "Referral, Guardian, Erbe, Multisig und gemeinsames Sparen werden bei Nuri ein Feature. Du fügst in den Settings einen Username hinzu, der Rest folgt daraus."
date: 2026-10-18
updated: 2026-10-18
lang: de
translations: {}
category: nuri
format: essay
author: emin
provenance: transcript
ai_assisted: true
reviewed_by_human: false
image: ../../../media/fueg-einfach-irgendeinen-nuri-user-dazu/cover.png
tags: ["Nuri", "Multisig", "Referral", "Inheritance", "x402", "L402"]
tldr:
  - "Meine Idee für Nuri ist ein einziges Feature. Du fügst in den Settings den Username von jemandem hinzu."
  - "Daraus folgen Referral, Guardian, Erbe, Multisig und gemeinsames Sparen, je nachdem was du erlaubst."
  - "Die Fee liegt bei uns im Frontend, offen im Source Code, und du setzt sie selbst zwischen 0 und 10 Prozent."
basically:
  ein-feature-statt-fünf: "Bei Nuri werden Referral, Guardian, Erbe und Multisig ein Feature. Du fügst in den Settings einen Username hinzu."
  die-fee-wird-geteilt: "Wer bei Nuri einen Freund hinzufügt, teilt die Fee mit ihm. Bei 10 Leuten wird sie durch 10 geteilt."
  meine-mama-kriegt-17-satoshi: "Jede Zahlung schickt deinen Leuten ein paar Satoshi und eine Push-Nachricht. Das macht Nuri viral."
  expanding-statt-decaying-multisig: "Bei einem Expanding Multisig werden die Keys deiner Guardians erst aktiv, wenn du deine eigenen verloren hast."
  guardian-und-erbe: "Ein Guardian hilft dir, deinen Key wiederherzustellen. Ein Erbe kommt erst ran, wenn du ein Jahr lang nichts machst."
  die-fee-liegt-im-frontend: "Nuri nimmt die Fee nicht bei den Providern, sondern im eigenen Frontend, offen im Source Code."
  setz-deine-fee-selbst: "Bei Nuri setzt du deine Fee selbst, von 0 bis 10 Prozent. Bei meinen Partys brachte Spenden das Fünffache."
  jeder-call-ist-eine-kleine-zahlung: "Jeder API-Call bei Nuri wird eine kleine x402- oder L402-Zahlung. Damit ist das Fee-Problem gelöst."
  familienwallet-und-hardware-wallets: "Multisig versteht keiner. Drei Leute und eine Hardware Wallet versteht jeder. So erklären wir Nuri."
  der-erste-schritt: "Schritt eins bei Nuri ist nur ein Freund in den Settings, der mitverdient. Alles andere baut darauf auf."
---
Ich glaube, ich habe heute morgen was ziemlich Gutes gelöst. Es geht um ein Feature für Nuri. Das ist erstmal die Idee.

## Ein Feature statt fünf

Ich will Multisig, Guardians, Inheritance und Referral in ein Feature packen. Und das geht so. Ich füge in meiner App in den Settings einfach deinen Username hinzu. Mehr nicht.

In dem Moment, wo ich das mache, kriegst du 50 Prozent der Fees, die ich an Nuri zahle. Du kannst gleichzeitig mein Guardian sein. Das heißt, du hilfst mir mit deinem Passkey, meinen Account in der Zukunft wiederherzustellen. Du kannst auch als Co-Signer in die Wallet reingehen. Oder wir sind eine Firma und wollen zusammen eine Multisig-Wallet haben.

Das sind alles unterschiedliche Features. Aber alle basieren auf dem gleichen Frontend-Feature. Füg einfach irgendeinen Nuri-User hinzu.

## Die Fee wird geteilt

Die Fees, die ich an Nuri zahle, setzen wir erstmal fest auf irgendwie 2,1 Prozent. Jedes Mal, wenn ich eine Zahlung mache, geht die Hälfte an Nuri und die andere Hälfte an die Person, die ich hinzugefügt habe.

Du kannst auch 10 Usernames hinzufügen. Dann hast du halt eine Wallet mit 10 Leuten, und die Fees werden durch 10 geteilt. Alle von deinen neuen Leuten kriegen automatisch einen Cut, und Nuri kriegt ein Zehntel.

Man könnte sich natürlich auch gegenseitig hinzufügen, dann geht es wieder an mich zurück. Wir müssen gucken, dass wir da keinen Loop bauen. Das geht natürlich nicht.

## Meine Mama kriegt 17 Satoshi

Bitcoiner wollen andere Leute dazu bekommen, Bitcoiner zu werden. Jetzt kann ich meine Mama einladen. Und sie kriegt jedes Mal eine Push-Notification, wenn ich eine Zahlung mache. Du hast gerade 20 Satoshi bekommen. Du hast gerade 17 Satoshi bekommen.

Ich kenne das von mir selber. Bei einem anderen Dienst kriege ich jedes Mal eine Telegram-Nachricht, wenn ein Swap stattfindet, und da steht drin, dass ich gerade 10 Satoshi verdient habe. Das ist das Viralste, was ich jemals für mich selber erlebt habe. Es ist witzig, und man gibt sich so gegenseitig ein bisschen Geld.

Mit Arkade können wir auch 1, 2, 3, 4 oder 5 Satoshi ohne Fee rumschicken. Und das zeigt auch so ein bisschen, wie geil Arkade an der Stelle ist.

## Expanding statt Decaying Multisig

Die Keys, die wir hinzufügen, machen das Gegenteil von dem, was wir sonst bei Nuri machen. Wenn wir nicht wollen, dass die von Anfang an Signer sind, dann ist es kein Decaying Multisig, sondern ein Expanding Multisig.

Das heißt, wenn ich alle meine Keys verliere, dann aktivieren sich nach einer Zeit, einem Jahr oder so, die Keys meiner Guardians automatisch. Bei Bitcoin kann man das machen. Bei Ethereum wird es wahrscheinlich schwieriger, aber das geht bestimmt auch.

Und klar, das sind Settings, die man einstellen kann. Niemand soll an dein Geld kommen, nur weil du mal ein Jahr deine Bitcoin nicht bewegt hast.

## Guardian und Erbe

Guardian ist ein Feature. Da würde ich es gerne eins zu eins so machen wie Bitkey. Die haben das irgendwie so gebaut, dass deine Guardians dir helfen können, deinen Key wiederherzustellen, aber keinen Zugriff auf dein Geld haben. Wie genau die das gemacht haben, müssen wir uns noch angucken.

Das andere Feature ist Inheritance, und das ist extrem wichtig. Ich möchte zum Beispiel meine Schwester als Erbin bei mir eingeben. Jedes Mal, wenn ich eine Zahlung mache, wird ein Counter wieder auf Null gesetzt. Und wenn mir was passieren sollte, aus welchem Grund auch immer, ich wache am nächsten Tag nicht auf, dann wird sie nach einem Jahr automatisch aktiviert und hat Zugriff auf meine Funds. Sowas ist übertrieben wichtig und übertrieben cool.

## Die Fee liegt im Frontend

Noch viel wichtiger ist, wo die Fee liegt. Heute nehmen wir sie bei den Providern, und das ist ein Fehler. Wir sollten die Fee bei den Providern überall auf Null setzen und sie bei uns nehmen, im Frontend oder in unserem Backend. Hinter Nuri können dann zehn Millionen Provider sein, vollkommen egal. Die nehmen ihren Spread und ihre Fee, und wir schlagen bei denen nichts drauf.

Dadurch können wir unterscheiden zwischen Nuri-Fee und Partner-Fee. Das ist einfach clean. Und ich will den Leuten im Open Source Code zeigen, guck mal, hier ist die Fee, die steht im Source Code. Ich will, dass wir die transparenteste Firma der Welt sind.

Meine Lieblingsgeschichte dafür ist der Aufschrei in der Aave-Community, als im Hintergrund der Swap-Provider gewechselt wurde. Daran sieht man, dass Backends keine Power mehr haben, sondern Frontends. Wer die Nutzer hat, hat den Moat.

## Setz deine Fee selbst

Wir lassen die Leute die Fee sogar selbst setzen. Einfach aus Fairness. Wenn du keine Fees zahlen willst, kannst du auf 0 Prozent gehen. Du kannst aber auch auf 10 Prozent gehen, wenn du willst. Und wenn jemand fragt, wieso nehmt ihr 2 Prozent, dann sagen wir, geh in die Settings und stell das um.

Warum ich glaube, dass das funktioniert, kommt von meinen Partys in Berlin. Egal welchen Eintritt ich genommen habe und egal welchen Preis für Bier, die Leute fanden es irgendwie nie cool. Irgendwann haben wir gesagt, fuck it, Spende für Bier, Spende für Eintritt. Wir haben ungefähr das Fünffache an Geld verdient.

Wenn du den Leuten die Möglichkeit gibst, das selbst festzulegen, dann gibt es auch Leute, die das deutlich höher setzen. Weil sie die Gamification geil finden oder weil sie für die Mission dabei sind. Es gibt die Reichen und die Armen, die Pfennigfuchser und die anderen. Ich würde für Leute, die ich auf einer Konferenz treffe und zu meinem Account hinzufüge, meine Fee auf 10 Prozent setzen. Dann kriegen die automatisch meinen Split.

## Jeder Call ist eine kleine Zahlung

Ich habe noch eine bessere Idee, wie wir die Fee nehmen. Wir gaten die Nuri-API einfach mit Micropayments, und die Micropayments sind unsere Fees. Jede Operation in der App kostet dann eine kleine x402- oder L402-Zahlung. L402, wenn es was mit Bitcoin zu tun hat, x402, wenn es was mit Krypto zu tun hat.

Ein Beispiel. Ein neues Passwort in deinem Nuri-Passwort-Manager speichern oder lesen kostet halt 0,1 Cent oder 1 Cent. Und das können wir direkt aus der Wallet nehmen, weil sie agentic ist. Beim Router mache ich das schon so. Den kannst du mit einem Token benutzen oder du zahlst für die Calls, und wir können jedem einzelnen Endpunkt einen anderen Preis geben.

Dann musst du kein eigenes Fee-System bauen. Jeder kann unsere API einbinden, wo er will, und wir kriegen automatisch die Payments. Anfangen würde ich mit dem Kontaktbuch, 0,1 Cent jedes Mal, wenn man einen Kontakt hinzufügt. Wenn das läuft, weiten wir es auf die ganze App aus. Ein Feature at a time.

## Familienwallet und Hardware Wallets

Wenn Leute einmal erlebt haben, wie so eine Safe-Wallet funktioniert, die wir als Firma haben, finden die das richtig cool. Ich habe einen Schlüssel, und wir müssen zusammen sein. Das ist eine richtig geile Crypto-Experience.

Oder eine Familienwallet. Meine Mama, meine Schwester und ich. Zwei von uns können zusammen sein. Multisig kann sich keiner darunter vorstellen. Aber zu sagen, wir sind drei Leute und eine Hardware Wallet, oder wir sind fünf Leute und eine AI, das versteht jeder.

Und wir bleiben bei dem Prinzip, das sonst keiner hinkriegt. One-Click-Face-ID-Wallet. Seedless, keine Seed Phrase, phishing-resistant, Multisig by default.

## Der erste Schritt

Wir tasten uns ganz langsam ran. Der erste Schritt ist nur, dass ich in den Settings einen Freund als meinen Padawan hinzufügen kann und der dann automatisch was bekommt. Dann sehen wir in unserer Datenbank, wer wen hinzugefügt hat und welche Swaps passiert sind, und zahlen die Referrals aus.

Und wenn du was sendest, sollten wir eine Autovervollständigung aller Nuri-User haben. Nicht nur deine Kontakte, sondern einfach jeder. Ich tippe L und finde alle Leute mit L, so wie bei PayPal.

Später kommen Key-Rotation, Keys hinzufügen und rauslöschen und eine Hardware Wallet dazu. Das müssen wir sowieso alles machen. Aber von der Vision her ist das, glaube ich, absolut perfekt. Weil es so ein krass virales Feature ist, dass du bei dem anderen mitverdienen kannst oder sein Co-Signer bist.
