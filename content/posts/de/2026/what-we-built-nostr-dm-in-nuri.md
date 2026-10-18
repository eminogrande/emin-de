---
title: "Was wir gebaut haben: Nostr-DM in Nuri"
description: "Wir haben einen kleinen verschlüsselten 1:1-Chat in Nuri eingebaut. Er läuft über Nostr-Relays und bezieht die Identität aus dem Wallet-Schlüssel, den du ohnehin schon hast."
date: "2026-01-15T19:40:01Z"
updated: "2026-01-15"
lang: de
translated_from: "en/what-we-built-nostr-dm-in-nuri"
source_sections: ["keys-from-the-wallet", "encryption", "sending-and-receiving", "catching-up-on-missed-messages", "relays", "the-chat-screen-and-support", "what-end-to-end-means-here", "limits-and-next-steps"]
category: nuri
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/what-we-built-nostr-dm-in-nuri/cover.webp"
tldr: ["Wir haben einen verschlüsselten 1:1-Chat in Nuri eingebaut, der über öffentliche Nostr-Relays läuft.", "Der Nostr-Schlüssel wird aus dem Bitcoin-Schlüssel des Wallets abgeleitet – dasselbe Wallet ergibt also immer dieselbe npub.", "Nachrichten nutzen NIP-17-Gift-Wrap mit NIP-44-v2-Verschlüsselung. Relays sehen nur verschlüsselte Blobs.", "Sender-Authentifizierung und Zustellung im Hintergrund gibt es noch nicht."]
sections: [{"basically": "Gleicher Bitcoin-Schlüssel, gleiche npub. Der Nostr-Schlüssel wird per HKDF abgeleitet und liegt im Keychain."}, {"basically": "NIP-17-Gift-Wrap mit NIP-44-v2-Verschlüsselung: Relays sehen nur Blobs, die nur der Empfänger öffnen kann."}, {"basically": "Gift-Wraps gehen über jedes offene Relay raus, und eingehende Kind-1059-Events werden dedupliziert und entschlüsselt."}, {"basically": "Ein last_seen-Zeitstempel pro Kontakt sorgt dafür, dass der Chat nachholt, was du verpasst hast, während du weg warst."}, {"basically": "Standardmäßig drei öffentliche Relays – wir brauchen also keine eigene Infrastruktur. Verbindungen bestehen nur, solange der Chat offen ist."}, {"basically": "Eine minimale Chat-Liste mit einem fest hinterlegten Support-Kontakt. Nachrichten bleiben nur im Arbeitsspeicher."}, {"basically": "Der Inhalt ist vertraulich und bietet Forward Secrecy, aber der Absender kann trotzdem gefälscht werden."}, {"basically": "Noch kein Push und kein eigenes Relay. Als Nächstes: signierte Rumors für die Sender-Authentifizierung und Zustellung im Hintergrund."}]
---
![](../../../media/what-we-built-nostr-dm-in-nuri/cover.jpg)

Wir haben einen kleinen 1:1-Chat in Nuri eingebaut. Er ist verschlüsselt, läuft über Nostr-Relays und lebt direkt in der App. Die Nostr-Identität wird aus dem Schlüsselmaterial des Wallets abgeleitet, das der Nutzer ohnehin schon hat. Angeschlossen ist das Ganze in screens/BitcoinDebugModal.tsx, der Chat selbst steckt in components/NostrChatModal.tsx. Der Support-Kontakt ist fest verdrahtet auf npub1r7y83c4w57jc8skud7e4m6x9qt9g7s6zel6mnvj64lh00lc7tynsdx89vj.

## Schlüssel aus dem Wallet

Wir leiten ein deterministisches Nostr-Schlüsselpaar aus dem privaten Bitcoin-Schlüssel auf dem Gerät ab. Gibt es keinen Bitcoin-Schlüssel, nehmen wir den Ethereum-Schlüssel, und wenn es beides nicht gibt, einfach einen zufälligen. Der private Nostr-Schlüssel liegt im Secure Storage und wird beim Factory Reset gelöscht.

Die Ableitung ist HKDF-SHA256 über sha256(btcKey) mit einem konstanten Salt und Info, plus einer Retry-Schleife, die prüft, ob der Schlüssel gültig ist. Der Code dazu liegt in lib/nostr/nostr.ts. Gespeichert wird der Schlüssel in der Keychain mit Biometrie, über lib/secureKeyStorage.ts (NOSTR_KEY_ID).

Derselbe Bitcoin-Schlüssel ergibt also immer denselben Nostr-npub. Ein Factory Reset löscht den lokalen Schlüssel, und ein neuer Wallet-Schlüssel ergibt dann einen neuen npub. In der Eingabezeile von components/NostrChatModal.tsx siehst du das Ende deines eigenen npub, und mit einem Tipp darauf kopierst du den kompletten npub.

## Verschlüsselung

Wir nutzen NIP-17 Gift Wrap mit NIP-44-v2-Verschlüsselung, also XChaCha20-Poly1305. Die Relays sehen immer nur verschlüsselte Blobs, und nur der private Schlüssel des Empfängers kann sie öffnen.

Der Ablauf steht in lib/nostr/nostr.ts. Zuerst bauen wir ein Rumor (Kind 14) mit der Klartext-Nachricht und dem Sender-Pubkey. Dann verschlüsseln wir das Rumor an den Empfänger mit einem zufälligen Seal-Schlüssel (NIP-44) und signieren es als Kind 13. Danach verschlüsseln wir dieses Seal wiederum an den Empfänger mit einem zufälligen Wrap-Schlüssel (NIP-44), signieren es als Kind 1059, das Gift Wrap, und taggen es mit ["p", recipientPubkey]. Dieses äußere Gift Wrap (Kind 1059) geht an die Relays, und nur der Empfänger kann es entschlüsseln.

Der NIP-44-Teil steckt auch in lib/crypto.ts. Das ECDH Shared Secret kommt aus den secp256k1-Schlüsseln. Wir leiten den NIP-44-Schlüssel ab als HKDF(SHA256(x-only-shared-secret), info="nip44-v2"). Und das Payload wird mit XChaCha20-Poly1305 und einer zufälligen 24-Byte-Nonce verschlüsselt.

Aktuell wird das Langzeit-Geheimnis des Senders nicht benutzt, um das Rumor zu signieren. Der Inhalt ist also Ende-zu-Ende vertraulich, aber die Sender-Identität ist kryptografisch nicht bewiesen. Jeder könnte einen gefälschten Pubkey ins Rumor packen. Wenn wir einen authentifizierten Sender wollen, sollten wir das Rumor signieren oder auf einen NIP-44-DM-Flow mit eingebauter Authentifizierung umsteigen. Das ist die eine echte Integritätslücke, die es heute in lib/nostr/nostr.ts gibt.

## Senden und Empfangen

Das Senden passiert in components/NostrChatModal.tsx. Wir prüfen den Empfänger-Pubkey und blockieren Chats mit sich selbst. Dann bauen wir das Gift Wrap mit createNip17GiftWrap und schicken ["EVENT", giftwrap] über jede offene Relay-WebSocket-Verbindung. Wir loggen Sender, Empfänger, Event-ID, Nachrichtenlänge und was die Relays bestätigen. Die UI fügt die ausgehende Nachricht sofort dem lokalen State hinzu.

Empfangen läuft ebenfalls in components/NostrChatModal.tsx. Wir abonnieren Kind 1059 mit einem #p-Tag, das unserem Pubkey entspricht. Duplikate werfen wir anhand der Event-ID raus und entschlüsseln mit openNip17GiftWrap. Dann nehmen wir den Rumor-Inhalt und den Sender-Pubkey und zeigen das als eingehende Nachricht an. Der Sender wird automatisch zu den lokalen Kontakten hinzugefügt.

## Verpasste Nachrichten nachholen

Wir haben außerdem einen schlanken Catch-up-Flow eingebaut, der die Nachrichten holt, die du verpasst hast, während du weg warst. Wir speichern pro Pubkey einen last_seen-Timestamp in der Keychain, mit NOSTR_LAST_SEEN_CACHE_KEY in lib/nostr/storage.ts. Bei jedem Relay-Abo setzen wir since = last_seen - 60s in den Filter, damit aktuelle Nachrichten nachgeladen werden. Das liegt in components/NostrChatModal.tsx, und services/factoryReset.ts löscht den Cache beim Factory Reset.

## Relays

Standardmäßig nutzen wir ein kleines Set öffentlicher Relays, damit wir im Moment keine eigene Infrastruktur brauchen. Die Defaults sind wss://relay.damus.io, wss://relay.primal.net und wss://nostr21.com. Die WebSocket-Verbindungen öffnen sich, wenn das Chat-Modal aufgeht, und schließen sich, wenn es zugeht. Wenn die App geschlossen oder offline ist, stoppt die Echtzeit-Zustellung, und Catch-up funktioniert, solange die Relays die Nachricht noch haben.

## Der Chat-Screen und Support

Die UI ist minimal und passt zum Design der App. Die Chat-Liste zeigt Private Support, Group Support (deaktiviert) und deine Kontakte, darunter die letzte Nachricht mit Datum und Uhrzeit. Der Titel eines offenen Chats sind die letzten 5 Zeichen des Empfänger-npub, mit einem Copy-Icon. Der Zurück-Link ist einfach Text, "< back", unterstrichen, damit es klar ist. Der Composer ist eine einzeilige Eingabe mit dem Sende-Icon innen drin, und du kannst auch mit der Senden-Taste auf der Tastatur abschicken. Das You-Label haben wir rausgenommen. Nur dein eigenes Suffix wird angezeigt, und du tippst es an, um es zu kopieren. Das alles steckt in components/NostrChatModal.tsx.

Support ist fest verdrahtet und jeder Nutzer, der nicht Support ist, sieht ihn. Der Support-npub steht in screens/BitcoinDebugModal.tsx. Wenn dein npub der Support-npub ist, wird der Support-Chat ausgeblendet und Chatten mit sich selbst ist blockiert.

Wir behalten nur, was wir brauchen. Der Kontakte-Cache ist @cache:nostr_contacts in der Keychain, und der Last-Seen-Cache ist @cache:nostr_last_seen, ebenfalls in der Keychain. Nachrichten liegen nur im Speicher, sie sind also weg, wenn du das Modal schließt oder die App neu startest. Ein Factory Reset räumt all das auf, plus den privaten Nostr-Schlüssel (siehe services/factoryReset.ts).

## Was Ende-zu-Ende hier bedeutet

Der Inhalt ist vertraulich. Relays sehen nie Klartext, und nur der Empfänger mit dem privaten Schlüssel kann entschlüsseln. Es gibt auch Forward Secrecy, weil jede Nachricht frische Seal- und Wrap-Schlüssel benutzt. Was wir noch nicht haben, ist Authentifizierung. Die Sender-Identität kann gefälscht werden, weil das Rumor nicht signiert ist.

## Grenzen und nächste Schritte

Heute braucht es keine Infrastruktur. Wenn du es zuverlässiger willst, betreibe dein eigenes Relay und füge es der Liste hinzu. Es gibt keine Push-Benachrichtigungen, Catch-up passiert also, wenn du den Chat öffnest. Und die Zustellung hängt davon ab, wie lange die Relays Nachrichten aufbewahren, denn manche Relays werfen DMs weg.

Die nächsten Dinge wären Sender-Authentifizierung mit einem signierten Rumor und Zustellung im Hintergrund. Beides braucht nur kleine Änderungen, und wir können sie durchgehen.
