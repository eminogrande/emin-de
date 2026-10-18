---
title: "Nuri, die neue Vision von Realitätsfinanzen"
description: "Ein kurzes FAQ zur Vision und zum Ziel von Nuri.com. Was Selbstverwahrung bedeutet, wie Passkeys dein Geld schützen und wie Nuri Geld verdient."
date: "2026-05-05T10:04:17.053Z"
updated: "2026-05-05"
lang: de
translated_from: "en/nuri-new-reality-finance-vision"
source_sections: ["mission-and-who-it-is-for", "technology-and-security", "paying-and-why-nuri-is-not-a-bank", "research-open-source-and-ai", "how-nuri-makes-money"]
category: nuri
format: note
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tldr: ["Nuri will digitales Eigentum so einfach machen wie Face ID und so sicher wie ein physischer Tresor, für alle weltweit.", "Passkeys mit der PRF-Erweiterung generieren die Schlüssel, und du behältst sie. Nuri ist ein Money Browser, keine Bank.", "Nuri verdient Geld durch kleine Servicegebühren bei Swaps, nicht durch das Aufbewahren deines Geldes."]
sections: [{"basically": "Digitales Bargeld in deiner eigenen Tasche. Niemand, nicht mal Nuri, kann es einfrieren."}, {"basically": "Dein Passkey generiert die Schlüssel, mehrere Schlüssel schützen den Zugriff, und verlorene Handys sind ein F&E-Schwerpunkt."}, {"basically": "Visa, Apple Pay und SEPA über Partner, während dein Geld in deiner eigenen Wallet bleibt."}, {"basically": "Open Source, damit jeder es prüfen kann. KI kann eine Zahlung vorschlagen, du autorisierst sie trotzdem."}, {"basically": "Du zahlst eine kleine Gebühr, wenn du swappst, für die Bequemlichkeit, niemals für das Aufbewahren deines Geldes."}]
---
Ein kurzes FAQ zur Vision und zum Ziel von Nuri.com von Emin Mahrt

## Mission und für wen es ist

Was ist die Kernmission von Nuri?

Wir machen digitales Eigentum so einfach wie Face ID und so sicher wie ein physischer Tresor. Unser Ziel ist es, dass jeder weltweit digitale Vermögenswerte wie Bitcoin oder digitale Euro besitzen und verwalten kann, ohne technische Hürden, ohne Bankkonto und ohne die Kontrolle an Dritte abzugeben.

Was bedeutet Self-Custody einfach erklärt?

Self-Custody ist wie digitales Bargeld in der eigenen Tasche. Anders als bei einem klassischen Bankkonto, wo die Bank dein Geld verwaltet, hältst du bei Nuri die exklusiven kryptografischen Schlüssel. Niemand, nicht mal Nuri, kann dein Konto einfrieren oder auf dein Geld zugreifen.

Für wen ist Nuri gebaut?

Für alle. Besonders wertvoll ist es für Menschen ohne Zugang zu klassischen Banksystemen, etwa Geflüchtete oder Menschen in Ländern mit schwacher Finanzinfrastruktur. Und auch für sicherheitsbewusste Nutzer, die die volle Kontrolle über ihre digitalen Vermögenswerte zurückgewinnen wollen.

## Technologie und Sicherheit

Was ist die technische Kerninnovation von Nuri?

Wir nutzen Passkeys (WebAuthn) nicht nur zum Einloggen, sondern zur Erzeugung kryptografischer Schlüssel. Über die Pseudo-Random-Function (PRF) des Passkeys leiten wir sichere Geheimnisse aus deinen biometrischen Daten ab, also aus Face ID oder deinem Fingerabdruck. Damit kannst du Blockchain-Transaktionen direkt aus der sicheren Hardware deines Geräts signieren.

Wie ist das System gegen Hacks geschützt?

Wir setzen auf eine Multi-Key-Architektur. Dein Zugang basiert nicht auf einem einzigen Passwort, sondern auf mehreren verteilten Schlüsseln, zum Beispiel einem auf deinem Smartphone und einem weiteren in einer Recovery-Struktur. Ein Angreifer müsste mehrere unabhängige Systeme gleichzeitig kompromittieren, um Zugang zu bekommen. Und da wir keine zentrale Nutzerdatenbank führen, gibt es auch keinen Honeypot für große Datenlecks.

Was passiert, wenn ich mein Smartphone verliere?

Das ist ein zentraler Fokus unserer R&D. Wir entwickeln Mechanismen für Schlüsselrotation und Wiederherstellung. Du kannst verlorene Geräte sperren und den Zugang über Backup-Schlüssel oder andere Verifizierungswege wiederherstellen, ohne jemals das Prinzip der Self-Custody aufzugeben.

## Bezahlen, und warum Nuri keine Bank ist

Kann ich mit Nuri im Supermarkt um die Ecke bezahlen?

Ja. Dein Geld bleibt in deiner Self-Custody-Wallet, und wir bauen über Partner Brücken zur klassischen Finanzwelt. Visa-Partner ermöglichen Kartenzahlungen und Apple Pay. IBAN-Partner erlauben SEPA-Überweisungen direkt aus deiner Wallet, etwa um die Miete zu zahlen. Und der entscheidende Vorteil: Fällt ein Partner aus, verschwindet nur dieses eine Feature. Dein Geld bleibt sicher und zugänglich in deiner Wallet.

Ist Nuri eine Bank?

Nein. Nuri ist ein „Money Browser“. Wir liefern die Technologie, mit der du direkt mit dezentralen Netzwerken (Blockchains) interagieren kannst. Wir halten deine Einlagen nicht, und wir haben keine Kontrolle über deine Vermögenswerte.

## Forschung, Open Source und KI

Warum ist dieses Projekt eine R&D-Initiative?

Absolute Nutzerfreundlichkeit, also keine Seed Phrases zum Auswendiglernen, mit echter dezentraler Self-Custody zu verbinden, ist eine große technische Herausforderung. Unsere Forschung konzentriert sich auf drei Dinge. Dezentrale Wiederherstellung, also Zugang wiederherstellen ohne zentrale Instanz. Vererbung, damit Erben nach einer definierten Inaktivitätszeit auf Vermögenswerte zugreifen können. Und Post-Quantum-Readiness, also digitale Signaturen gegen künftige Bedrohungen durch Quantencomputer schützen.

Warum ist Nuri Open Source?

Vertrauen muss überprüfbar sein. Indem wir unseren Quellcode öffentlich machen, können Expertinnen und Experten weltweit unsere Kryptografie auditieren. Und es garantiert, dass du auch dann noch an dein Geld kommst, wenn Nuri als Unternehmen aufhören würde zu existieren.

Wie passt KI in die Zukunft von Nuri?

Wir ebnen den Weg für die Agent Economy. In Zukunft könnten KI-Assistenten Zahlungen für dich vorbereiten oder Rechnungen prüfen. Durch unsere sichere Signatur-Infrastruktur behältst du immer die letzte Kontrolle. Die KI schlägt eine Transaktion vor, aber du autorisierst sie mit einem einfachen Face ID.

## Wie Nuri Geld verdient

Wie verdient Nuri Geld, wenn es keine Kontoführungsgebühren gibt?

Wir verdienen Geld mit Komfort-Diensten. Wenn du innerhalb der App Währungen tauschst, etwa Bitcoin in Euro, fällt eine kleine Service-Fee an. Du zahlst für die einfache Integration und die Nutzerfreundlichkeit, nicht für die Aufbewahrung deines Geldes.

„Digitales Eigentum, so einfach wie Face ID, so unabhängig wie Bargeld.“
