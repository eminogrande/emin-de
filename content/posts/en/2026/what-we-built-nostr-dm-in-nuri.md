---
title: "What we built, Nostr DM in Nuri"
description: "We built a small encrypted 1:1 chat into Nuri. It runs over Nostr relays and gets its identity from the wallet key you already have."
date: "2026-01-15T19:40:01Z"
updated: "2026-01-15T19:40:01Z"
lang: "en"
category: "nuri"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/what-we-built-nostr-dm-in-nuri/cover.webp"
voice_check:
  em_dash: 2
  unobserved: 101
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/what-we-built-nostr-dm-in-nuri/"
tldr:
  - "We built an encrypted 1:1 chat into Nuri that runs over public Nostr relays."
  - "The Nostr key is derived from the wallet's Bitcoin key, so the same wallet always gives the same npub."
  - "Messages use NIP-17 gift wrap with NIP-44 v2 encryption, so relays only see encrypted blobs."
  - "Sender authentication and background delivery are not there yet."
basically:
  keys-from-the-wallet: "Same Bitcoin key, same npub. The Nostr key is derived with HKDF and kept in the Keychain."
  encryption: "NIP-17 gift wrap with NIP-44 v2 encryption: relays only see blobs only the recipient can open."
  sending-and-receiving: "Gift wraps go out over every open relay, and incoming kind 1059 events are deduped and decrypted."
  catching-up-on-missed-messages: "A last_seen timestamp per contact lets the chat pull in what you missed while you were away."
  relays: "Three public relays by default, so we need no infra. Connections live only while the chat is open."
  the-chat-screen-and-support: "A minimal chat list with a hard-coded support contact. Messages live only in memory."
  what-end-to-end-means-here: "The content is confidential with forward secrecy, but the sender can still be faked."
  limits-and-next-steps: "No push and no own relay yet. Next up: signed rumors for sender authentication and background delivery."
---
![](../../../media/what-we-built-nostr-dm-in-nuri/cover.jpg)

We built a small 1:1 chat into Nuri. It's encrypted, it runs over Nostr relays, and it lives inside the app. The Nostr identity is derived from the key material of the wallet the user already has. It's wired into screens/BitcoinDebugModal.tsx and the chat itself is in components/NostrChatModal.tsx. The support contact is hard-coded to npub1r7y83c4w57jc8skud7e4m6x9qt9g7s6zel6mnvj64lh00lc7tynsdx89vj.

## Keys from the wallet

We derive a deterministic Nostr keypair from the Bitcoin private key on the device. If there is no Bitcoin key we fall back to the Ethereum key, and if neither exists we just take a random one. The Nostr private key sits in secure storage and gets wiped on factory reset.

The derivation is HKDF-SHA256 over sha256(btcKey) with a constant salt and info, plus a retry loop that checks the key is valid. That code is in lib/nostr/nostr.ts. The key is stored in the Keychain with biometrics, through lib/secureKeyStorage.ts (NOSTR_KEY_ID).

So the same Bitcoin key always gives you the same Nostr npub. A factory reset wipes the local key, and a new wallet key then gives you a new npub. In the input row of components/NostrChatModal.tsx you see the end of your own npub, and you tap it to copy the full npub.

## Encryption

We use NIP-17 gift wrap with NIP-44 v2 encryption, which is XChaCha20-Poly1305. The relays only ever see encrypted blobs, and only the private key of the recipient can open them.

The flow is in lib/nostr/nostr.ts. First we create a rumor (kind 14) with the plain message and the sender pubkey. Then we encrypt the rumor to the recipient with a random seal key (NIP-44) and sign it as kind 13. Then we encrypt that seal to the recipient with a random wrap key (NIP-44), sign it as kind 1059, the gift wrap, and tag it ["p", recipientPubkey]. That outer gift wrap (kind 1059) is what goes to the relays, and only the recipient can decrypt it.

The NIP-44 part is also in lib/crypto.ts. The ECDH shared secret comes from the secp256k1 keys. We derive the NIP-44 key as HKDF(SHA256(x-only-shared-secret), info="nip44-v2"). And the payload is encrypted with XChaCha20-Poly1305 and a random 24-byte nonce.

Right now the long-term secret of the sender is not used to sign the rumor. So the content is confidential end to end, but the sender identity is not proven with cryptography. Anyone could put a fake pubkey inside the rumor. If we want an authenticated sender, we should sign the rumor, or switch to a NIP-44 DM flow that has authentication built in. This is the one real integrity gap today in lib/nostr/nostr.ts.

## Sending and receiving

Sending happens in components/NostrChatModal.tsx. We check the recipient pubkey and block chatting with yourself. Then we build the gift wrap with createNip17GiftWrap and send ["EVENT", giftwrap] over every open relay WebSocket. We log the sender, the recipient, the event id, the message length and what the relays acknowledge. The UI adds the outgoing message to local state right away.

Receiving is also in components/NostrChatModal.tsx. We subscribe to kind 1059 with a #p tag equal to our pubkey. We drop duplicates by event id and decrypt with openNip17GiftWrap. Then we take the rumor content and the sender pubkey and show it as an incoming message. The sender is added to the local contacts on its own.

## Catching up on missed messages

We also added a light catch-up flow that pulls in the messages you missed while you were away. We keep a last_seen timestamp per pubkey in the Keychain, with NOSTR_LAST_SEEN_CACHE_KEY in lib/nostr/storage.ts. On every relay subscription we add since = last_seen - 60s to the filter, so recent messages get filled in. That lives in components/NostrChatModal.tsx, and services/factoryReset.ts wipes the cache on factory reset.

## Relays

By default we use a small set of public relays, so we don't need any infra right now. The defaults are wss://relay.damus.io, wss://relay.primal.net and wss://nostr21.com. The WebSocket connections open when the chat modal opens and close when it closes. If the app is closed or offline, real-time delivery stops, and catch-up works as long as the relays still have the message.

## The chat screen and support

The UI is minimal and fits the design of the app. The chat list shows Private Support, Group Support (disabled) and your contacts, with the last message and the date and time below. The title of an open chat is the last 5 characters of the recipient npub, with a copy icon. The back link is just text, "< back", and underlined so it's clear. The composer is a one-line input with the send icon inside, and you can also send with the Send key on the keyboard. We took out the You label. Only your own suffix is shown, and you tap it to copy. All of this is in components/NostrChatModal.tsx.

Support is hard-coded and every user who is not support sees it. The support npub is set in screens/BitcoinDebugModal.tsx. If your npub is the support npub, the support chat is hidden and chatting with yourself is blocked.

We keep only what we need. The contacts cache is @cache:nostr_contacts in the Keychain, and the last-seen cache is @cache:nostr_last_seen, also in the Keychain. Messages are only in memory, so they are gone when you close the modal or restart the app. A factory reset clears all of that plus the Nostr private key (see services/factoryReset.ts).

## What end to end means here

The content is confidential. Relays never see plain text and only the recipient with the private key can decrypt. There is also forward secrecy, because every message uses fresh seal and wrap keys. What we don't have yet is authentication. The sender identity can be faked because the rumor isn't signed.

## Limits and next steps

There is no infra needed today. If you want it more reliable, run your own relay and add it to the list. There are no push notifications, so catch-up happens when you open the chat. And delivery depends on how long the relays keep messages, because some relays drop DMs.

The next things would be sender authentication with a signed rumor, and delivery in the background. Both need only small changes, and we can lay them out.
