---
title: "Ein zustandsloser Passkey-Signer für Bitcoin"
description: "Ein Bitcoin-Wallet, bei dem der Schlüssel nie gespeichert wird. Er kommt aus einem Passkey-PRF, signiert in einer winzigen Signer-Seite und wird danach wieder weggeworfen."
date: "2025-12-04T07:35:01Z"
updated: "2025-12-04"
lang: de
translated_from: "en/a-stateless-passkey-signer-for-bitcoin"
source_sections: ["a-passkey-as-the-seed", "where-the-idea-comes-from", "preparing-and-signing-in-two-places", "no-blind-signing", "a-co-signer-with-a-csv-exit", "the-full-picture-and-where-i-want-feedback", "the-reply-i-got", "your-architecture-in-more-formal-terms", "is-this-feasible", "does-this-eliminate-blind-signing", "how-to-safely-use-the-passkey-prf-for-bitcoin-keys", "the-split-between-preparer-and-signer", "co-signing-server-and-csv-exit", "platform-and-implementation-expo-web-self-hosting", "security-questions-to-challenge-your-design", "bottom-line"]
category: nuri
format: essay
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
image: "/media/a-stateless-passkey-signer-for-bitcoin/cover.webp"
tldr: ["Ich baue ein Bitcoin-Wallet, bei dem der private Schlüssel nie gespeichert wird, sondern nur bei Bedarf aus einem Passkey-PRF abgeleitet wird.", "Die Wallet-App bereitet nur PSBTs vor. Eine winzige, selbst hostbare Signer-Website signiert sie und zeigt vorher jedes Detail.", "Ein optionales 2-of-2 mit einem Co-Signing-Server und einem CSV-Exit sorgt dafür, dass ein einziger geleakter Schlüssel das Wallet nicht leerräumt.", "Die Antwort, die ich bekommen habe, sagt: Es ist machbar, wenn das PRF durch HKDF läuft und der Signer strikt und klein bleibt."]
sections: [{"basically": "Das Passkey-PRF ist mein Seed. Keine Mnemonic, nichts aufgeschrieben, keine Datei zum Sichern."}, {"basically": "FileKey, Bitwarden und 1Password nutzen Passkeys schon als Secrets. Ich will das Gleiche für Bitcoin."}, {"basically": "Die App ist nur UI, die PSBTs baut. Ein winziger separater Signer ist das Einzige, was signiert."}, {"basically": "Der Signer signiert nur PSBTs, die er dekodieren und anzeigen kann. Er kann den Nutzer nicht zwingen, sie auch wirklich zu lesen."}, {"basically": "2-of-2 mit einem Co-Signer, plus ein CSV-Exit nach etwa 10.000 Blöcken, damit ich jederzeit allein raus kann."}, {"basically": "Ich mag das Konzept, aber ich will, dass Leute es angreifen: PRF-Macken, PSBT-Transport, Phishing."}, {"basically": "Die Antwort unten ist die Antwort von jemand anderem auf diesen Post, der mich mit du anspricht."}, {"basically": "Die Antwort fasst das Design nochmal zusammen: PRF als Seed, PSBT per QR an einen Signer, 2-of-2 mit CSV-Fallback."}, {"basically": "Alle Bausteine gibt es heute schon. Die echten Haken sind PRF-Plattform-Support und native Bridges in Expo."}, {"basically": "Eine Blind-Signing-API ist nicht möglich. Eine ehrliche UI und ein aufmerksamer Nutzer sind durch Krypto nicht garantiert."}, {"basically": "Behandle den PRF-Output als Input Keying Material, lass HKDF drüberlaufen und nutze dann normale BIP32-Derivation."}, {"basically": "Geh davon aus, dass der Preparer kompromittiert ist. Der Signer erzwingt strikte Templates und zeigt jedes Feld."}, {"basically": "Ein geleakter Schlüssel räumt das Wallet nicht leer, solange jeder UTXO dasselbe Schutz-Script nutzt."}, {"basically": "Shippe den Signer als statischen, reproduzierbaren Build mit einer RP ID und fail closed, wenn kein PRF da ist."}, {"basically": "Eine Checkliste offener Fragen: Domain Separation, Key Rotation, UTXO Discovery, Supply Chain, Recovery."}, {"basically": "Machbar, keine Blind-Signing-Funktion, solides Co-Signer-Design. Nutzer müssen trotzdem verstehen, was sie signieren."}]
---
Ich arbeite gerade an einer Bitcoin-Wallet, die komplett stateless ist.

Mit stateless meine ich: Der Private Key wird nirgendwo gespeichert. Nicht auf dem Handy, nicht auf einem Server, nicht in einer Datenbank. Er wird jedes Mal, wenn er gebraucht wird, deterministisch aus einem Passkey-PRF (WebAuthn, FIDO2) abgeleitet, in einer sehr kleinen Signing-Umgebung benutzt und danach wieder verworfen.

In diesem Post beschreibe ich die Architektur, die ich baue, wie ich über „No Blind Signing" denke und wo ich noch offene Sicherheitsfragen sehe. Ich freue mich über Feedback, besonders von Leuten, die Wallets oder HSMs bauen oder mit WebAuthn und Bitcoin-PSBTs arbeiten.

## Ein Passkey als Seed

Die Grundidee ist einfach. Jeder User hat einen Passkey (eine WebAuthn- oder FIDO2-Credential) mit aktivierter PRF-Extension. Ich nenne den Output dieser Extension das Passkey-PRF. Dieser PRF-Output ist ein Secret mit hoher Entropie, das den Authenticator nie in roher Form verlässt, es ist nur über das PRF-Interface zugänglich. Ich leite daraus deterministisch einen Bitcoin Private Key ab. Das PRF ist effektiv mein Seed.

Jedes Mal, wenn der User eine WebAuthn-Anfrage bestätigt (Face ID, Fingerprint, PIN, was auch immer das Gerät nutzt), kann der Signer denselben Bitcoin-Key neu ableiten, ohne ihn jemals speichern zu müssen.

Das macht aus einem normalen Passkey effektiv die Seed-Phrase einer Single-Sig-Bitcoin-Wallet, aber ohne Mnemonic, ohne etwas Aufgeschriebenes und ohne Datei, die man sichern müsste.

Die Sicherheit der Wallet hängt damit an der Sicherheit des Passkeys (plus natürlich daran, wie ich die Signing-Umgebung handle).

## Woher die Idee kommt

Diese Idee kommt nicht aus dem Nichts. Sie ist inspiriert von ein paar Projekten, die Passkeys schon als High-Entropy-Secrets nutzen. [FileKey.app](https://filekey.app/) macht stateless File-Verschlüsselung und -Entschlüsselung. Es nutzt das Passkey-PRF als Input, leitet Keys bei Bedarf ab und speichert sie nie dauerhaft. [Bitwarden](https://bitwarden.com/) und [1Password](https://1password.com/) unterstützen beide das Entsperren des Password-Managers mit Passkeys. Das Passkey-PRF (oder ein äquivalentes Credential-Secret) wird benutzt, um deinen Vault zu entsperren und zu schützen, auch in Web-Umgebungen.

Was ich versuche, ist, dasselbe Pattern auf Bitcoin zu übertragen und Passkeys als Root-Secret für ein stateless Signing-Setup zu nutzen.

## Vorbereiten und Signieren an zwei Orten

Ich baue die App mit Expo React Native. Der Grund ist einfach: Ich will, dass der stateless Signer in so vielen Umgebungen wie möglich läuft, auf Android, auf iOS und im Web im Browser.

Der „Wallet"-Teil der App ist nur ein Frontend. Er bereitet Transaktionen vor, zeigt Balances und History an und hält nie einen Private Key. Das eigentliche Signieren passiert in einer separaten, eng kontrollierten Umgebung.

Eine wichtige Design-Entscheidung ist, zu trennen, wo Transaktionen vorbereitet und wo sie signiert werden.

Der erste Teil ist die Transaktionsvorbereitung. Das ist das normale Wallet-Interface. Du kannst UTXOs auswählen, Outputs setzen, Fees wählen und alles prüfen. Es erstellt eine PSBT (Partially Signed Bitcoin Transaction, BIP-174 und BIP-370) statt einer rohen Transaktion, und diese PSBT wird dann an den Signer weitergereicht. Das kann auf dem Handy laufen, im Browser oder in jeder anderen Umgebung. Es ist stateless und braucht den Private Key nicht.

Der zweite Teil ist eine minimalistische Signing-Website. Das Signieren passiert auf einer separaten Website (oder Web-App), deren einziger Job es ist, eine PSBT zu nehmen, den Bitcoin-Key aus dem Passkey-PRF abzuleiten, die PSBT zu signieren und die signierte Transaktion oder PSBT zurückzugeben (zum Beispiel als Text und als QR-Code). Die wichtigen Eigenschaften dieses Signers: Er ist extrem minimalistisch, er kann selbst gehostet werden, und er ist so gebaut, dass er leicht zu auditieren ist, mit einer winzigen Codebase und sehr wenigen Dependencies.

Von dort kann die signierte Transaktion zurück an die Wallet geschickt werden, oder irgendeine Wallet kann den QR-Code scannen und sie broadcasten, oder der User kann das Hex kopieren und es über seinen Node oder einen anderen Service broadcasten.

Die Idee ist, dass der Signer eine kleine, hochgradig kontrollierte Enclave ist. Die App auf dem Handy ist „nur UI".

## Kein Blind Signing

Eines meiner Ziele ist, dass dieses System nicht zum Blind-Signing-Albtraum wird.

Ich kann den Signer so bauen, dass er nur strukturierte Bitcoin-PSBTs (BIP-174 und BIP-370) signiert, niemals beliebige Bytes. Er parst und validiert die PSBT und weigert sich, irgendetwas zu signieren, das er nicht komplett versteht. Er zeigt dem User immer die dekodierte Transaktion, inklusive Inputs, Outputs, Fees, Timelocks und Scripts oder Conditions (z.B. CSV), und er verlangt eine explizite User-Bestätigung auf diesem Screen.

Wenn ich das mache, gibt es keine „Blind-Signing-API". Es gibt schlicht keinen Weg, heimlich irgendwelche zufälligen Daten zu signieren. Alles muss eine valide PSBT sein, die der Signer dekodieren und anzeigen kann.

Selbst mit all dem gibt es immer noch Dinge, die diese Architektur nicht magisch lösen kann. Ich verlasse mich immer noch darauf, dass die Signer-UI ehrlich ist. Wenn die Signer-Website kompromittiert ist, bösartiges JavaScript ausliefert oder von einem Supply-Chain-Angriff getroffen wird, könnte sie darüber lügen, was sie anzeigt. Ich verlasse mich immer noch darauf, dass der User tatsächlich liest, was er gerade signiert. Wenn er einfach auf „Approve" klickt, ohne hinzuschauen, kann das keine Architektur fixen. Und ich verlasse mich immer noch darauf, dass der PSBT-Decoder und die Anzeige-Logik korrekt sind. Bugs im Parser könnten komische Scripts oder Felder verstecken und irreführende Anzeigen erzeugen.

Ich kann also eine Blind-Signing-API eliminieren, aber ich kann nicht kryptographisch erzwingen, dass die UI ehrlich ist oder der User aufpasst. Das ist einfach Realität.

## Ein Co-Signer mit CSV-Exit

Zusätzlich zum Single-Sig-Stateless-Setup habe ich auch mit einem Co-Signing-Server und einer CSV-Notausgangsklappe experimentiert.

Die grobe Idee ist, ein 2-of-2-Script zu nutzen. Ein Key wird aus dem Passkey-PRF des Users abgeleitet (stateless, wie oben beschrieben). Der zweite Key liegt auf einem Co-Signing-Server. Dann füge ich eine CSV-Condition (CheckSequenceVerify) hinzu. Nach, sagen wir, 10.000 Blöcken (~3 Monate) können die Coins nur mit dem Key des Users ausgegeben werden.

Was dir das bringt, sind zwei Dinge. Wenn ein einzelner Key leakt, heißt das nicht automatisch, dass die Wallet sofort leergeräumt werden kann. Und wenn der Co-Signing-Server verschwindet, abgeschaltet wird oder du ihm einfach nicht mehr vertraust, hast du trotzdem einen Ausweg. Du wartest die CSV-Periode ab und gibst dann mit deinem einzelnen Key aus.

Der User kennt oder kontrolliert den zweiten Key nicht, aber er braucht ihn auch nicht für immer. Der CSV-Exit garantiert, dass im schlimmsten Fall, nach einer Verzögerung, die Funds wieder komplett unter seiner Kontrolle sind.

Das ist keine perfekte Sicherheit, aber ein guter Trade-off. Extra Friktion für einen Angreifer, und kein katastrophaler Verlust, wenn der Co-Signer weg ist.

## Das Gesamtbild und wo ich Feedback will

Das Gesamtbild sieht also so aus: Das Passkey-PRF liefert einen deterministischen Bitcoin Private Key, der nie gespeichert wird. Das Wallet-Frontend (Expo React Native) läuft auf Android, iOS und Web. Es bereitet PSBTs vor, zeigt Balances und so weiter, und es ist komplett stateless, keine Private Keys, nur öffentliche Daten und PSBTs. Der minimale Signer ist eine kleine Web-App (selbst hostbar). Sie nutzt einen WebAuthn-Passkey, um den Key abzuleiten und PSBTs zu signieren. Sie signiert nur strukturierte PSBTs, zeigt Menschen immer eine dekodierte Ansicht und macht kein Arbitrary-Data-Signing. Das optionale 2-of-2 plus CSV fügt einen Co-Signing-Server als weitere Hürde für Angreifer hinzu, und der CSV-Exit (~10.000 Blöcke) bedeutet, dass du die Funds am Ende immer nur mit deinem passkey-abgeleiteten Key bewegen kannst.

Ich bin mit dem High-Level-Konzept ziemlich zufrieden, aber ich bin sicher, es gibt Blind Spots und Angriffe, an die ich noch nicht gedacht habe.

Dinge, zu denen ich besonders Feedback will, sind subtile Probleme rund um das Passkey-PRF und die Derivation (WebAuthn-Details, Browser-Macken, Plattform-Unterschiede), Angriffsvektoren beim Verschieben von PSBTs zwischen „Preparer" und „Signer" (QR-Codes, Deep Links, Copy-Paste etc.), bessere Wege, das Co-Signer-plus-CSV-Setup zu designen (z.B. Script-Templates, Edge Cases), und Threat Models, die ich unterschätze (Phishing, UI-Spoofing, kompromittierte Geräte etc.).

Wenn du Fehler, Risiken oder bessere Patterns siehst, bitte challeng diese Architektur.

Das Ziel ist nicht, nur etwas Cleveres zu bauen, sondern etwas, das in der echten Welt wirklich standhält.

## Die Antwort, die ich bekommen habe

Das ist die Antwort, die ich auf den Post oben bekommen habe, leicht aufgeräumt. Sie duzt mich.

Kurze Antwort: Ja, was du beschreibst, ist prinzipiell absolut machbar, und man kann es so bauen, dass klassisches Blind Signing vermieden wird. Aber es gibt eine Menge subtiler Fallstricke bei der Nutzung des Passkey-PRF, beim Verschieben des PSBT zwischen Preparer und Signer und beim Design von Co-Signing plus CSV-Exit-Scripts.

Ich gehe die Architektur und die wichtigsten Fallen durch und ende dann mit einer großen Liste an Sicherheitsfragen, die du als Design-Checkliste nutzen kannst.

## Deine Architektur in formelleren Begriffen

Nur um uns abzugleichen: Beim Schlüsselmaterial hat jeder User einen Passkey (WebAuthn, FIDO2-Credential) mit aktivierter PRF-Erweiterung. Wenn der Signer läuft, fragt er den Authenticator nach einem 32-Byte-PRF-Output, der an dieses Credential gebunden ist. Du behandelst diesen PRF-Output als Seed (oder IKM), um daraus deterministisch einen Bitcoin-Private-Key oder Root abzuleiten.

Bei der Statelessness speichert die Wallet-UI (Expo-App, Browser, was auch immer) niemals Private Keys. Der Signer (eine minimale Website, self-hostbar, vielleicht auch als PWA gepackt) leitet den Private Key on the fly aus dem Passkey-PRF ab, signiert und verwirft ihn dann aus dem Speicher.

Der Flow geht so: Environment A (Wallet-Frontend) baut ein PSBT (oder eine unsigned tx) mit UTXOs, Outputs, Fees usw. Dieses PSBT wird als QR (oder über einen anderen Kanal) kodiert und an Environment B weitergegeben, die Signer-Website. Die Signer-Website dekodiert das PSBT, zeigt die Transaktionsdetails in einer minimalen, auditierbaren UI an, nutzt den Passkey-PRF, um den Bitcoin-Key zu bekommen, signiert und gibt die Signatur oder das signierte PSBT als QR oder Nachricht zurück. Das Broadcasting passiert woanders (Wallet, anderer Node oder Drittanbieter).

Beim optionalen Co-Signer werden Outputs mit einem Script wie `IF 2-of-2 (User-Key + Co-Signer-Key) ELSE CSV(10.000 Blöcke) + Single-User-Key ENDIF` belegt, mit OP_CHECKSEQUENCEVERIFY. Normalerweise brauchst du also den User-Key plus den Co-Sign-Server. Wenn der Co-Sign-Server verschwindet, kann der User allein nach ~10k Blöcken (~70 Tage) ausgeben.

So habe ich dich verstanden. Wenn das passt, gilt alles Folgende direkt.

## Ist das machbar?

Ja. All diese Teile existieren heute. Es gibt PRF-fähige Passkeys, die auf Anfrage ein 32-Byte-Secret zurückgeben. Es gibt echte Systeme, die Passkey-PRF für Verschlüsselung und stateless Key Derivation nutzen (Bitwarden für Vault-Verschlüsselung, FileKey für Dateiverschlüsselung und andere). Und es gibt stateless Signing-Frontends, die einfach PSBTs nehmen, im Speicher signieren und das Ergebnis ausgeben.

Du machst im Grunde "FileKey, aber statt Dateien zu verschlüsseln, signiert es Bitcoin-PSBTs." Das ist sehr vernünftig.

Es gibt zwei wichtige Machbarkeits-Einschränkungen. Die erste ist Plattform-Support: PRF rollt noch aus. Es funktioniert in vielen Chromium-basierten Browsern, noch nicht immer auf Safari oder allen Authenticators, und mobiler Support kann wackelig sein. Die zweite ist Expo RN: Du brauchst Bridges zu nativen WebAuthn- und FIDO2-APIs (mit PRF) auf Android und iOS. Das ist mehr Engineering, kein fundamentaler Blocker.

Aus kryptographischer und Bitcoin-Perspektive: Ja, du kannst genau das tun, was du vorschlägst.

## Eliminiert das Blind Signing?

Du kannst den Signer so designen, dass er nur strukturierte Bitcoin-PSBTs (BIP-174 und 370) signiert, keine beliebigen Bytes. Er parst das PSBT und weigert sich, irgendetwas zu signieren, das er nicht vollständig versteht, und er zeigt immer die dekodierte Transaktion (Inputs, Outputs, Fee, Timelocks, Scripts) und verlangt explizite User-Bestätigung.

Wenn du das tust, hast du keine Blind-Signing-API. Es gibt schlicht keinen Weg, still beliebiges Zeug zu signieren. Alles muss ein valides PSBT sein, das der Signer dekodieren und anzeigen kann.

Was du nicht kryptographisch garantieren kannst, ist alles drumherum: Du verlässt dich weiterhin darauf, dass die Signer-UI ehrlich ist (keine UI-Korruption, XSS oder Supply-Chain-Angriff), dass der User tatsächlich liest, was er signiert, und dass der PSBT-Decoder korrekt ist (keine Parser-Bugs, die komische Scripts oder Felder verstecken).

Du kannst also sagen: "Dieses Wallet unterstützt Blind Signing nicht als Feature. Es signiert nur PSBTs, deren Semantik vollständig geparst und dem User gezeigt wird." Aber du kannst nicht garantieren, dass "kein User jemals etwas signiert, das er nicht wirklich versteht". Das ist letztlich ein UX- und Bildungsproblem, kein kryptographisches.

## Wie man den Passkey-PRF sicher für Bitcoin-Keys nutzt

Sehr wichtiges Detail: Der WebAuthn-PRF-Output sollte als Input Keying Material (IKM) behandelt und dann in eine proper KDF (HKDF) gefüttert werden, um zweckgebundene Keys abzuleiten. Das wird explizit von Leuten empfohlen, die PRF für Verschlüsselung implementieren.

Ein vorgeschlagenes Derivation-Schema geht so: Starte mit dem PRF-Output (IKM). Während der Authentifizierung mit deiner RP ID (z.B. wallet.deinedomain.com) forderst du PRF mit einem Salt wie "bitcoin-wallet-root" an. Du bekommst prf_ikm (32 Bytes, pro Credential, secret). Dann lässt du HKDF darüber laufen, um 64 Bytes Key-Material zu bekommen.

```
master_key_material = HKDF(
    ikm = prf_ikm,
    salt = "btc-mainnet" oder "btc-testnet" etc,
    info = "stateless-btc-wallet v1",
    L = 64 Bytes
)
```

Dann teilst du es auf in

```
root_priv_key = master_key_material[0:32]
root_chain_code = master_key_material[32:64]
```

Jetzt hast du etwas, das wie ein BIP32-Root aussieht (Privkey plus Chain Code). Dann wendest du Standard-HD-Derivation an (BIP32, BIP84 usw.). Nutze deinen Standard-Derivation-Path, z.B. `m/84'/0'/0'/0/i` für Native Segwit, oder einen Custom Descriptor.

Das gibt dir Domain Separation zwischen Bitcoin und anderen Nutzungen, zwischen Mainnet und Testnet und für potenzielle zukünftige Versionen. Es gibt dir auch eine Oberfläche, die normalen HD-Wallets sehr ähnlich ist, sodass du viel Wallet-Logik und Tooling wiederverwenden kannst.

Bitte mach daraus keinen einzelnen statischen Private Key. Für Privacy und grundlegende gute Praxis brauchst du wirklich viele Adressen. Der stateless Signer kann jedes Mal denselben xprv und xpub aus dem PRF neu berechnen und dann Keys on demand ableiten. Die Watching-Only-Seite (dein Backend oder der Client) kann nur den xpub oder Descriptor halten, was bei einem Leak harmlos ist.

Fragen, die du hier beantworten solltest (siehe auch die große Liste später): Willst du mehrere Accounts aus demselben PRF (z.B. "Savings", "Spending")? Wenn ja, wie kodierst du das in die HKDF-Inputs? Und wie kodierst du das Netzwerk (Mainnet oder Testnet), damit User nie Cross-Funding machen?

## Der Split zwischen Preparer und Signer

Die Bedrohung hier ist, dass das PSBT von der Preparer-Wallet-UI gebaut wird, die kompromittiert sein könnte. Die Mitigations sitzen also auf dem Signer.

Erstens, eine strikte PSBT-Policy: Unterstütze nur ein kleines Set an Script-Templates, wie simples P2WPKH oder P2TR, dein exaktes 2-of-2-mit-CSV-Template und vielleicht einen bekannten Change-Output-Descriptor. Weise alles andere ab, also unbekannte Script-Typen, exotische Sighash-Flags, nicht-standard Annexes, proprietäre Felder usw.

Zweitens, Full-Field-Display: Zeige für jeden Output die Zieladresse (und dekodiere den Script-Typ), den Betrag in BTC plus den Fiat-Gegenwert (wenn du Kurse fetchen kannst) und ob er als "Change zurück an dein Wallet" erkannt wird (via Descriptor-Matching). Global zeige die Gesamt-Input-Summe, Gesamt-Output-Summe, Fee-Betrag, Fee-Rate (`sat/vB`), das Locktime und alle Sequences, die RBF oder CSV-Constraints implizieren. Für deine CSV-Struktur sage klar: "Diese Coins sind unter einem 2-of-2-Script gesperrt mit Fallback auf Single-Key-Spend nach ~X Tagen".

Drittens, sinnvolle Defaults und Warnungen: Warne bei Fees über einem gewissen Schwellenwert, beim Versenden aller Funds aus dem Wallet und bei Scripts, die das Security-Modell ändern (z.B. Senden an Nicht-CSV-Adressen, wenn das Wallet normalerweise CSV nutzt).

Wenn du die Codebase des Signers sehr klein und auditierbar hältst und nie eine API zum "Signieren beliebiger Bytes" hinzufügst, hast du fast alles getan, was du vernünftigerweise gegen Blind Signing tun kannst.

Für den Kanal zwischen Preparer und Signer funktioniert QR oder UR2 gut, aber denk dran, PSBTs können groß werden, also nutze Animated UR oder ein ähnliches Schema. Der Signer sollte verifizieren, dass das Netzwerk passt (Mainnet vs. Testnet), dass Inputs zum erwarteten Descriptor gehören (wenn möglich) und dass es keine komischen unbekannten Felder gibt.

Wenn jemand den Preparer kompromittiert, kann er immer noch ein bösartiges PSBT bauen. Aber er kann dich nicht dazu bringen, es blind zu signieren, weil der Signer zeigt, was du tatsächlich tust.

## Co-Signing-Server und CSV-Exit

Du baust im Grunde ein timelocked 2-of-2-Scheme.

```
OP_IF
    2 <user_pub> <server_pub> 2 CHECKMULTISIG
OP_ELSE
    <10000> CHECKSEQUENCEVERIFY DROP
    <user_pub> CHECKSIG
OP_ENDIF
```

Ungefähr so.

Was dir das bringt: Wenn der User-Key leakt, aber der Co-Signer sicher ist, kann der Angreifer nicht sofort ausgeben und braucht die Kooperation des Co-Signers, oder er kann nur über den CSV-Pfad ausgeben, nachdem die Funding-UTXOs 10000 Blöcke bestätigt sind. Wenn der Co-Signer-Key leakt, aber der User-Key sicher ist, kann der Angreifer immer noch nichts machen, weil er den PRF-abgeleiteten Key des Users braucht. Wenn der Co-Signer verschwindet, wartet der User ~10k Blöcke und gibt dann allein über CSV aus.

Also ja, eine einzelne Key-Offenlegung leert das Wallet nicht sofort, vorausgesetzt die Scripts sind korrekt und du erstellst nie UTXOs mit schwächeren Scripts.

Es gibt ein paar Dinge, auf die du aufpassen musst.

Script-Uniformität. Dein Wallet muss immer dasselbe Schutzscript für alle UTXOs in diesem Wallet verwenden. Kein "ups, diese eine Adresse war plain P2WPKH", denn genau so werden Funds geleert, wenn ein Key leakt.

Timelock-Länge. 10.000 Blöcke ≈ 10.000 / 144 ≈ 69,4 Tage. Das ist verdammt lange, wenn der Co-Signer verschwindet und du die Funds jetzt brauchst. Überleg dir, ob 7 bis 30 Tage ein besserer UX- und Security-Tradeoff wären.

Co-Signer-Policy. Der Co-Signer kann Spending-Policies durchsetzen, die PSBT auf verdächtige Ziele oder Beträge prüfen und Tageslimits, Whitelists usw. erzwingen. Aber wenn dein Signer schon sicher und non-blind ist, mildert der Co-Signer hauptsächlich Key-Kompromittierung ab, nicht UI-Kompromittierung.

Implementierungskomplexität. Du verlässt dich jetzt auf korrekte Script-Assembly für P2WSH- und P2TR-Scripts, korrektes Handling von nSequence und CSV-Semantik, und Wallet-Logik, die nie versehentlich den falschen Branch benutzt.

Du kannst das absolut zum Laufen bringen, aber teste CSV und Script-Path-Auswahl bis zum Umfallen.

## Plattform und Implementierung (Expo, Web, Self-Hosting)

Mach den Signer zu einer statischen Site. Eine Single-Page-App ohne Backend, und das gebaute Artefakt per Content-Hash gepinnt. User können sie selbst hosten (z.B. GitHub Pages oder statisches Hosting), oder sogar eine einzelne index.html runterladen und komplett offline laufen lassen.

Reproducible Builds. Veröffentliche den Source und Anleitungen, damit Leute es bauen und Hashes verifizieren können. Das ist der Schlüssel für minimale, auditierbare Signer-Glaubwürdigkeit.

RP-ID-Strategie für Passkeys. Nutze eine kanonische RP ID (z.B. signer.yourdomain.com) für den Web-Signer und für native Apps (über Associated Domains). So funktioniert derselbe Passkey über Web und Mobile hinweg, und der PRF-Output ist konsistent.

PRF-Verfügbarkeit. Sei vorbereitet zu erkennen, wenn PRF nicht unterstützt wird, und fail closed (kein Fallback auf schwache Crypto), oder hab einen separaten Wallet-Modus ohne Passkey-Basis.

## Sicherheitsfragen, um dein Design zu challengen

Du wolltest viele Fragen, also hier eine strukturierte Liste zum Durcharbeiten. Du musst sie mir nicht beantworten. Sie sind für deine Design-Docs und dein Threat Model.

Zu Passkey- und PRF-Nutzung, fang mit Domain Separation an. Was genau geht in den PRF-Salt oder die Salts, und in den HKDF-Salt und Info? Wie trennst du Mainnet vs. Testnet vs. Regtest, App v1 vs. v2, und Bitcoin vs. jede zukünftige Chain, die du vielleicht unterstützt? Dann Key-Rotation. Wenn der Passkey kompromittiert oder revoked wird, wie migriert der User zu einer neuen PRF-abgeleiteten Root? Hast du einen eingebauten "Rotate Wallet"-Flow, der Funds vom alten Script zu einem neuen Script sweeped? Dann der Passkey-Lifecycle. Was passiert, wenn der User alle Devices mit diesem Passkey verliert? Oder wenn Cloud-gesyncte Passkeys leaken (z.B. ein Apple- oder Google-Compromise-Szenario)? Ist "Co-Signer + CSV" deine einzige Mitigation? Und PRF-Verfügbarkeit und Fallback. Wenn PRF in einem Browser oder einer Plattform nicht unterstützt wird, failst du hart ("dieses Wallet braucht PRF") oder degradierst du still? Ich würde stark empfehlen, hart zu failen.

Zur Transaktionsvorbereitung in der Wallet-UI, zuerst Descriptor-Korrektheit. Wo leben Descriptors, auf einem Server oder im Client Local Storage? Wie stellst du sicher, dass sie immer zu dem passen, was der Signer tatsächlich aus dem PRF ableitet? Dann UTXO-Discovery. Wie erfährst du, welche UTXOs zum Wallet gehören, von deinem eigenen Node oder von public APIs? Die Bedrohung ist ein bösartiges Backend, das UTXOs versteckt, damit der User denkt, er hat weniger als er hat. Dann Change-Detection. Wie markierst du einen Output als Change, damit der Signer "das bleibt in deinem Wallet" anzeigen kann? Erzwingst du, dass Change immer zum selben Script-Typ zurückgeht (z.B. ein CSV-geschütztes Script)?

Zur Signer-Website oder App, zuerst PSBT-Strenge. Welche PSBT-Versionen und Felder sind erlaubt? Rejectest du unknown Key-Types, Partial Signatures und non-standard Script-Types? Dann Display-Vollständigkeit. Zeigst du alle Outputs, einschließlich der mit winzigen Beträgen (Dust)? Alle Scripts, einschließlich weird Taproot-Pfade? Locktime und nSequence für jeden Input? Dann kein "signiere beliebige Bytes"-Feature. Kann irgendein API-Pfad eine Signatur produzieren, ohne durch den PSBT-Decode- und Display-Flow zu gehen? Und Supply-Chain-Integrität. Wie verhinderst du, dass bösartige Updates an User gepusht werden, oder dass XSS und Dependency-Hijack Code injizieren, der Outputs versteckt?

Zum Co-signing-Server, zuerst Key-Storage. Ist der Co-Signer-Key in einem HSM? Kannst du ihn rotieren, ohne den CSV-Unlock-Pfad zu brechen? Dann die Policy-Engine. Parsed und enforced der Server Policies auf PSBTs (Whitelist, Limits), oder signiert er blind, was auch immer geschickt wird? Und Verfügbarkeit und DoS. Was passiert, wenn der Co-Signer stunden- oder tagelang nicht verfügbar ist? Gibt es eine klare UX, die "du musst jetzt N Blöcke warten, um den CSV-Pfad zu nutzen" zeigt?

Zu Recovery, UX und "oh shit"-Szenarien, zuerst User-Education. Wie erklärst du Statelessness, CSV-Delay-Exits und die Notwendigkeit, Passkeys zu rotieren, wenn ein Device kompromittiert ist? Dann Incident Response. Wenn du erkennst, dass deine Signer-Site oder Co-Signer-Infra kompromittiert wurde, wie benachrichtigst du User? Gibt es einen "mass move everything to a new descriptor"-Plan? Und Monitoring. Watchst du die Chain auf Spending über den CSV-Pfad (was Server-Downtime signalisieren könnte), und auf verdächtige Spends, die nicht zum erwarteten Ursprung passen (z.B. der User bestreitet, sie gemacht zu haben)?

## Bottom Line

Ja, das Konzept ist machbar. Ja, du kannst den Signer so designen, dass es effektiv kein Blind-Signing-Feature gibt, und nur geparste, angezeigte PSBTs jemals signiert werden. Nein, du kannst nicht mathematisch garantieren, dass User immer vollständig verstehen, was sie signieren. Aber deine Trennung von Preparer und "minimal signer" ist eine starke, saubere Architektur, um dieses Risiko zu minimieren. Das Co-Signing plus CSV-Setup ist ein solider Weg, um sicherzustellen, dass ein einzelnes Key-Leak das Wallet nicht sofort nuked, solange jeder UTXO das korrekte Script-Template nutzt und du CSV-Delays auf ein vernünftiges Zeitfenster getuned hast.

Wenn du magst, können wir als nächsten Schritt in eine Slice reinzoomen (z.B. das exakte HKDF- und Derivation-Scheme, oder das CSV-Script und Descriptors) und ich kann dir helfen, etwas festzuzurren, das du als Spec veröffentlichen würdest.

![IMG_6888](../../../media/a-stateless-passkey-signer-for-bitcoin/IMG_6888.png)

![IMG_6901](../../../media/a-stateless-passkey-signer-for-bitcoin/IMG_6901.png)

![IMG_6889](../../../media/a-stateless-passkey-signer-for-bitcoin/IMG_6889.png)
