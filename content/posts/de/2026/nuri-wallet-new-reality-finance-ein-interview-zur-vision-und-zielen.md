---
title: "Nuri Wallet, New Reality Finance. Ein Interview zur Vision und Zielen"
description: "Ein Interview mit mir selbst zum new Nuri"
date: "2026-05-05T10:02:55.416Z"
updated: "2026-05-05T10:02:55.416Z"
lang: "de"
category: "nuri"
format: "note"
author: "emin"
provenance: "mixed"
ai_assisted: true
reviewed_by_human: false
source: "medium"
third_party_summary: false
voice_check:
  em_dash: 3
  unobserved: 109
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://medium.com/@em/nuri-wallet-new-reality-finance-ein-interview-zur-vision-und-zielen-898d86b4d50c"
tldr:
  - "Ein Interview mit mir selbst zum neuen Nuri."
  - "Passkeys erzeugen die Schlüssel, und niemand außer dir kommt an dein Geld, auch Nuri nicht."
  - "Nuri ist keine Bank, sondern ein Money Browser, Open Source und noch ein Forschungsvorhaben."
basically:
  ziel-und-zielgruppe: "Jeder soll digitales Geld selbst besitzen können, ohne Bankkonto und ohne Dritte."
  technik-und-sicherheit: "Passkeys erzeugen über PRF die Schlüssel, verteilt auf mehrere Systeme statt auf ein Passwort."
  bezahlen-und-warum-nuri-keine-bank-ist: "Visa und IBAN laufen über Partner. Fällt einer aus, bleibt das Geld trotzdem in deinem Wallet."
  forschung-open-source-und-ki: "Recovery, Vererbung und Post-Quantum sind ungelöst. Offener Code macht das Vertrauen prüfbar."
  wie-nuri-geld-verdient: "Keine Kontogebühren. Wir verdienen an einer kleinen Gebühr, wenn du in der App tauschst."
---
Ein Interview mit mir selbst zum new Nuri

## Ziel und Zielgruppe

Was ist das Kernziel von Nuri?

Wir machen digitalen Besitz so einfach wie Face ID und so sicher wie ein Tresor. Unser Ziel ist es, dass jeder Mensch weltweit digitales Geld (wie Bitcoin oder digitale Euro) selbst besitzen und verwalten kann, ohne technische Hürden, ohne Bankkonto und ohne die Kontrolle an Dritte abzugeben.

Was bedeutet „Selbstverwahrung“ (Self-Custody) in einfachen Worten?

Selbstverwahrung ist wie digitales Bargeld in deiner eigenen Tasche. Im Gegensatz zum Bankkonto, wo die Bank dein Geld verwaltet, besitzt du bei Nuri die alleinigen kryptografischen Schlüssel. Niemand, auch Nuri nicht, kann dein Konto sperren oder auf dein Geld zugreifen.

Für wen ist Nuri gedacht?

Für jeden. Besonders wertvoll ist es für Menschen, die keinen Zugang zu klassischem Banking haben (z. B. Geflüchtete oder Menschen in Ländern mit schwacher Infrastruktur), aber auch für sicherheitsbewusste Nutzer, die die volle Kontrolle über ihre digitalen Werte zurückgewinnen wollen.

## Technik und Sicherheit

Was ist die technische Kerninnovation von Nuri?

Wir nutzen Passkeys (WebAuthn) nicht nur zum Login, sondern zweckentfremden sie zur Erzeugung kryptografischer Schlüssel. Über die sogenannte Pseudo-Random-Function (PRF) leiten wir aus deinem biometrischen Merkmal (Face ID/Fingerabdruck) sichere „Secrets“ ab, mit denen du Transaktionen auf der Blockchain signieren kannst.

Wie sicher ist das System gegen Hacks?

Wir arbeiten mit einer Multi-Key-Architektur. Dein Zugang basiert nicht auf einem einzelnen Passwort, sondern auf mehreren verteilten Schlüsseln (z. B. auf dem Smartphone und einem Backup-Server). Ein Angreifer müsste mehrere Systeme gleichzeitig kompromittieren, um Zugriff zu erhalten. Da wir keine zentrale Nutzer-Datenbank führen, gibt es auch kein zentrales Ziel für großflächige Daten-Leaks.

Was passiert, wenn ich mein Smartphone verliere?

Das ist ein zentraler Bestandteil unserer Forschung. Wir entwickeln Mechanismen zur Schlüsselrotation und Wiederherstellung. Du kannst verlorene Geräte sperren und den Zugang über Backup-Schlüssel oder alternative Verifizierungswege wiederherstellen, ohne dass die Selbstverwahrung aufgehoben wird.

## Bezahlen, und warum Nuri keine Bank ist

Kann ich mit Nuri auch im Supermarkt bezahlen?

Ja. Obwohl dein Geld sicher in deinem eigenen Wallet liegt, bieten wir über Partner Brücken in die klassische Finanzwelt an. Ein Visa-Partner ermöglicht Kartenzahlungen und Apple Pay. Ein IBAN-Partner (z.B. Monerium) erlaubt SEPA-Überweisungen direkt aus dem Wallet heraus (z. B. für die Miete). Das Besondere ist, fällt ein Partner aus, bleibt dein Geld dennoch sicher in deinem Wallet. Nur die Zusatzfunktion verschwindet.

Ist Nuri eine Bank?

Nein. Nuri ist eher ein „Money Browser“. Wir stellen die Technologie bereit, mit der du direkt mit dezentralen Netzwerken (Blockchains) interagierst. Wir verwahren kein Geld und haben keine Kontrolle über dein Vermögen.

## Forschung, Open Source und KI

Warum ist das Projekt ein Forschungsvorhaben?

Die Kombination aus absoluter Nutzerfreundlichkeit (keine Seed Phrases merken!) und echter, dezentraler Selbstverwahrung ist technisch ungelöst. Wir forschen an sicheren Recovery-Mechanismen ohne zentrale Instanz. Wir forschen an Vererbungslösungen, also wie Erben nach einer Zeitspanne der Inaktivität sicher auf Vermögen zugreifen können. Und wir forschen an Post-Quantum-Sicherheit, dem Schutz vor künftigen Angriffen durch Quantencomputer.

Warum ist Nuri Open Source?

Vertrauen muss verifizierbar sein. Durch die Offenlegung unseres Quellcodes können Experten weltweit sicherstellen, dass unsere Kryptografie hält, was sie verspricht. Zudem garantiert es dir, dass du dein Geld auch dann noch verwalten kannst, wenn es die Firma Nuri einmal nicht mehr geben sollte.

Welche Rolle spielt KI in der Zukunft von Nuri?

Wir bereiten den Weg für die „Agent-Economy“. In Zukunft können KI-Assistenten Zahlungen für dich vorbereiten oder Rechnungen prüfen. Durch unsere sichere Signatur-Infrastruktur behältst du dabei immer die letzte Kontrolle. Die KI schlägt vor, aber du gibst die Zahlung per Face ID final frei.

## Wie Nuri Geld verdient

Wie verdient Nuri Geld, wenn es keine Kontogebühren gibt?

Wir verdienen an Komfort-Dienstleistungen. Wenn du innerhalb der App Währungen tauschst (z. B. Bitcoin in Euro), fällt eine geringe Servicegebühr an. Du zahlst also für die Bequemlichkeit und die nahtlose Integration, nicht für die reine Aufbewahrung deines Geldes.

“Digitaler Besitz, so einfach wie Face ID und so unabhängig wie Bargeld.”
