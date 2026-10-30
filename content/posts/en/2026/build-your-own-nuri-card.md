---
title: "Build your own Nuri card"
seo_title: "Build your own Nuri card: a 9.99 euro passkey, SSH and bitcoin key | emin.de"
description: "One blank card carries passkeys, an SSH key, a bitcoin cosigner and a vault. Full build with real commands, plus a Tangem, YubiKey and Bitkey comparison."
date: 2026-10-30
updated: 2026-10-30
lang: en
translations: {}
category: building
format: guide
author: emin
provenance: mixed
ai_assisted: true
reviewed_by_human: false
tags: ["Nuri card", "Java Card", "FIDO2", "passkey", "MuSig2", "smartcard", "how-to", "Tangem", "YubiKey", "Bitkey", "YubiHSM", "hardware wallet", "comparison"]
source_links:
  - { title: "nuri-passkey-prf-smartcard", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard", note: "The open source repo, MIT, with every applet, script and proof receipt." }
  - { title: "docs/card-v1-acceptance.md", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/card-v1-acceptance.md", note: "The acceptance runbook for a blank card." }
  - { title: "docs/diy-card.md", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/diy-card.md", note: "The same build as a step by step runbook for people and LLM agents." }
  - { title: "docs/chrome-extension.md", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/chrome-extension.md#bitcoin-on-the-real-card-setup-and-proof", note: "Chrome wallet setup and the real-card Bitcoin result." }
  - { title: "docs/diy-key.md", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/diy-key.md", note: "The admin key how-to and its failure table." }
  - { title: "docs/proofs/real-card-57274221-gp-lock.json", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/proofs/real-card-57274221-gp-lock.json", note: "Raw output of the two lock and unlock cycles on the reference card." }
  - { title: "GlobalPlatformPro 24.10.15, GPTool.java line 801", url: "https://github.com/martinpaljak/GlobalPlatformPro/blob/v24.10.15/tool/src/main/java/pro/javacard/gptool/GPTool.java#L801", note: "The eager read behind the lock flag crash." }
tldr:
  - "A blank Java Card, an applet install and one afternoon give you a hardware key that does eight jobs."
  - "Every step here ran on a real card, serial 57274221, with the output kept in the repo."
  - "The card is open source and MIT. No vendor account, no cloud, no subscription."
  - "Last step matters most: replace the public admin key, then the card is yours alone."
basically:
  what-one-card-can-do: "Passkeys with PRF, SSH, a bitcoin cosigner, Ethereum signing, TOTP, a vault and a PKCS#11 HSM."
  nuri-card-vs-tangem-yubikey-bitkey-and-yubihsm: "Five devices on price, source, features, button and custody. Every competitor fact from the vendor page."
  what-is-in-the-box: "Nothing. A blank card arrives empty, and you install the software yourself."
  shopping-list: "One card for 9.99 euro, one contact reader, a few host packages. Ask the seller for default keys."
  what-you-need-besides-the-card: "A PC/SC reader, macOS or Linux, Java, Python and a couple of hours."
  step-1-buy-a-blank-card: "Ask for an unlocked card with GlobalPlatform default keys and a dump of its CPLC serial."
  step-2-check-the-card-before-you-trust-it: "Read the card read-only before you write anything. The serial tells you it is the card you got."
  step-3-install-the-eight-applets: "One command installs the base four. Four more installs follow, and every step prints the registry."
  step-4-create-the-keys-and-the-pins: "Keys are born on the chip. The card generates them, the host only ever sees public halves."
  step-5-use-it-as-a-passkey-a-diy-fido2-security-key: "The card is a FIDO2 authenticator with a PIN and the PRF extension for key derivation."
  step-6-use-it-as-an-ssh-key: "A provider turns OpenSSH into CTAP2 calls. The private key stays on the chip."
  step-7-cosign-bitcoin-with-a-java-card: "One of two cosigners, the second one runs on a Nuri server. Both signatures are needed."
  step-8-sign-ethereum-with-a-pin: "A PIN gates every signature. The demo key without a PIN is never funded."
  step-9-carry-totp-codes: "The card holds the secret and computes the HMAC. Only the six digits reach the host."
  step-10-store-secrets-in-the-vault: "Sixteen slots behind a PIN. HMAC entries never leave the chip at all."
  step-11-use-it-as-a-pkcs11-hsm: "A PKCS#11 provider lets OpenSSL and friends sign through the card."
  how-many-secrets-fit: "Sixteen vault slots, 52 free passkey slots, unlimited non-resident passkeys."
  how-the-card-protects-a-nostr-vault: "The card's PRF only exists while it is present. Without it the relay copy stays sealed."
  step-12-change-the-admin-key-last: "One wizard, one escrow file, one typed serial. Then nobody but you administers the card."
  how-to-undo-the-key-change: "The undo takes the escrow and the passphrase and puts the public key back."
  the-bugs-the-real-card-found: "A crash in the GP tool, an empty line in our wizard, and a Chrome wallet that showed zero sats."
  step-7b-see-your-bitcoin-in-chrome: "The extension shows one bitcoin total and three addresses, read straight from the card's wallet."
  what-happens-when-you-lose-the-card: "Nothing leaves the chip, so nothing gets copied. A lost card is a lost key."
  how-many-tries-each-pin-allows: "Eight, five, five and five. Exhaust them and the applet locks."
  faq: "Windows, other cards, second cards, cost and what the card cannot do."
  build-one-and-tell-me: "A ten euro card can hold the keys a bank would charge you for. Build one, then tell me what broke."
---

A blank smartcard costs 9.99 euro. It fits in a wallet and it holds eight jobs at once. Not eight accounts on a server, eight real keys on one chip, each in its own applet, none of them exportable.

Here is the whole build. Buying the exact card, checking it, installing all eight applets, making keys, using every one of them, and sealing the card at the end.

Nothing below is theory. Every command ran on a real card in October 2026, serial 57274221, in a contact reader, and the raw output sits in the repo next to the code.

## What one card can do

```
blank card
   |
eight applets
   |
keys and PINs
   |
daily use
   |
own admin key
```

The eight applets and what they are for:

- FIDO2 passkey with the PRF extension. Web login, plus 32 byte key derivation.
- SSH key. The card is the key, the file on disk is only a handle.
- Bitcoin MuSig2 2-of-2 cosigner. The other half runs on a Nuri server, so a stolen card alone can not move coins.
- Ethereum signer with a PIN, and the older ETH1 applet without one for demos.
- TOTP codes.
- A PIN-gated secret vault. Seal it and the passwords live on the chip.
- A PKCS#11 HSM for OpenSSL and other tools.
- An admin surface you control once the last step here is done.

The code is open source and MIT: [github.com/nuri-com/nuri-passkey-prf-smartcard](https://github.com/nuri-com/nuri-passkey-prf-smartcard). No account, no cloud, no subscription. Read the applets before you put value behind them, that is the point of publishing them.

## Nuri card vs Tangem, YubiKey, Bitkey and YubiHSM

People ask what the difference is to a card they can simply buy. Fair question, so here it is in one table.

Four of the five are products with a company behind them and a support line. The fifth is a chip and a repo. I own the card, I do not own the other four. Every cell below comes from the vendor's own page, read on 30 October 2026, not from a test in my hand.

| | Nuri card | Tangem | YubiKey 5 and Bio | Bitkey | YubiHSM 2 |
|---|---|---|---|---|---|
| Price | 9.99 euro for the card, plus a contact reader | 54.90 USD for two cards, 69.90 USD for three | 58 USD for a 5 NFC, 98 USD for a C Bio | 250 USD | 650 euro |
| Open source | Applets MIT, the old ETH1 applet the one exception | App is open source, firmware audited by Kudelski and Riscure per the vendor | Firmware closed | not checked | Open source SDK |
| What it does | Passkey with PRF, SSH keys, bitcoin MuSig2 2-of-2 with a Nuri server, Arkade, Ethereum with a PIN, TOTP, a secret vault, PKCS#11 | Cold wallet for tokens on many chains, signed from the phone app | FIDO2, U2F, PIV, OTP and OpenPGP. No bitcoin wallet of its own | Bitcoin only, 2-of-3 multisig, phone app and on-device screen | Keys for servers and CAs, PKCS#11, RSA, ECC, ed25519 |
| Button and display | None. The reader and a program are the approval step | None on the card, the phone is the screen | Touch button, fingerprint on the Bio | Fingerprint and OLED touchscreen | None, it goes in a server slot |
| Who holds the keys | You and the chip. The bitcoin half needs the Nuri server as second signer | You and the chip, plus copies on the other cards of the set | You and the chip | You, the chip and Block's server, two of three to move coins | You and the chip |

Read it as a fit, not a ranking.

- You want a wallet for many tokens on a phone. Take Tangem or Bitkey.
- You want one bitcoin wallet with a screen and no seed phrase to write down. Bitkey is the one, and it is the most expensive row.
- You want a login key and nothing else. A YubiKey is the shorter path, and it has the button the card lacks.
- You want a key in a server, for signing and PKCS#11. YubiHSM 2, at 650 euro.
- You want one chip for logins, SSH, a bitcoin cosigner and a vault, for ten euro, and you bring an afternoon. That is this build.

What the card gives up against all four: no button, no screen, no support line, no seed phrase to put in a safe.

What no other row gives you: applet source you can read, change and install on any blank card of the same family. That is also the catch, because you do the install.

Bitkey's 2-of-3 is the closest thing to the card's 2-of-2. The difference is who the second signer is. Block runs that server for Bitkey. For the card you can run the guide and see the code, and the signing path is [docs/diy-card.md](https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/diy-card.md).

Sources, all read on 30 October 2026: [tangem.com](https://tangem.com/en/) and [Tangem pricing](https://tangem.com/en/pricing/), [YubiKey 5 NFC](https://www.yubico.com/product/yubikey-5-series/yubikey-5-nfc/), [YubiKey C Bio](https://www.yubico.com/product/yubikey-bio-series/yubikey-c-bio/), [bitkey.world](https://bitkey.world/) and [Bitkey product page](https://bitkey.world/product) and [Bitkey buy page](https://bitkey.world/buy), [YubiHSM 2](https://www.yubico.com/product/yubihsm-2-series/). Prices are list prices in the currency the vendor shows, before VAT and shipping. Where I could not check a vendor page, the cell says not checked.

## What is in the box

Nothing. A blank Java Card arrives with an empty registry and a public management key. There is no app, no PIN, no key, no manual. You are the vendor of your own card.

That is also why order matters. Install first, keys second, admin key last. If you seal the card before the applets are on it, your own escrow is the only way back in.

## Shopping list

- One blank NXP J3R180 or JCOP4 card, dual interface, unfused, with the GlobalPlatform default keys. Berlin pickup at MoTechno is about 24 euro including VAT, satochip.io sells for about 25 euro, United Access sells a 10 pack for 120 euro net.
- The cheap route, and the one I used: [Smartcard J3R180 at xmrstreet.store](https://xmrstreet.store/product/smartcard-j3r180/), full card size, black. It came to 9.99 euro for the card, 10 euro tracked shipping and 4.20 euro VAT, so 24.19 euro to Berlin. Checkout takes Bitcoin Lightning over BTCPay or Monero, nothing else. There is a [translucent version for 14.99 euro](https://xmrstreet.store/product/translucent-j3r180-smartcard/) that I have not tried.
- One contact smartcard reader. The reference build uses an HID Global OMNIKEY 5422. Any PC/SC reader with a contact slot works, a contactless only reader does not fit this guide.
- Java 21, Python 3, git.

Ask the seller, in writing, for four things before you pay: is the card unfused, are the GlobalPlatform keys the public default, which secure channel (SCP02 or SCP03), and a `gp -i` dump of the CPLC. A seller who can not answer is a seller who has not touched the card.

Cards that only advertise generic ECC are not good enough. MuSig2 and Ethereum need secp256k1 with plain X+Y output. Anything sold as EMV without ECC is a dead end.

## What you need besides the card

- macOS or Linux. The installer scripts do not support Windows.
- A terminal and two hours.
- No other card in the reader. `gp` matches reader names as a substring, and with two cards present it refuses to guess.

```sh
# macOS
brew install --cask temurin
brew install python
# Debian or Ubuntu
sudo apt install default-jre-headless python3-venv pcscd
```

## Step 1: Buy a blank card

Order two. Cards fail, and a second one is your backup for the SSH step later. Never buy one card and then start with the only one you have.

The cheapest source in Berlin is a lab supplier, not an electronics shop. MediaMarkt and Conrad carry no blank Java Card. Kleinanzeigen does not either.

While you wait, clone and build the toolchain:

```sh
git clone https://github.com/nuri-com/nuri-passkey-prf-smartcard.git
cd nuri-passkey-prf-smartcard
npm ci
npm test
```

`npm test` runs against a simulator. It proves the scripts and the applets in front of you, not your card.

One warning from my own order. The shop sells the product as a J3R180, which is JCOP4. The chip that arrived says NXP JCOP 2.4.1 and the ATR spells `JCOPv241` out in plain characters. Both chips work with these scripts, they speak SCP02 with DES3 and SCP03 with AES, but you have to know which one is in your hand before the first write command. Mine came 7 days after the order, on 21 October, in a UPS parcel.

So the label on a shop page is a claim. The ATR out of your own reader is evidence. Check that first.

## Step 2: Check the card before you trust it

Put the card in the contact slot and read it, read-only, before anything is written.

```sh
gp -i
gp -l
```

`gp -i` prints the CPLC block. The field `ICSerialNumber` is your card's serial, and it is the number every later prompt asks you to type back. Note it down, and note the ATR.

On the reference card the ATR is `3BF81300008131FE454A434F5076323431B7`, the historical bytes spell `JCOPv241`, and the serial is 57274221. Yours will differ.

`gp -l` must show one ISD and no applet of ours. If `4E5552494D554701` is already listed, the card is not blank and the provisioning script will refuse it.

Two more checks:

```sh
gp --info
scripts/run-card-python.sh scripts/direct-ctap-diagnostics.py version
```

The second one talks to the FIDO2 applet after you install it. Before that it fails, and that is fine.

## Step 3: Install the eight applets

The repo ships a bundle installer for the base four. It refuses an already used card, verifies every CAP checksum first, and prints the registry at the end.

Pick your reader index from `gp -l`, or use the exact name.

```sh
export GP_KEY=404142434445464748494A4B4C4D4E4F
export GP_READER="HID Global OMNIKEY 5422 Smartcard Reader"
CARD_PROVISION_CONFIRM=YES scripts/provision-card-v1.sh
```

The last line is `CARD_V1_APPLETS_INSTALLED`. Four applets now exist: FIDO2, MuSig2, TOTP and the PIN-less Ethereum applet.

The two extra MuSig2 instances come next. They are the same applet under other AIDs, one per wallet, so two wallets never share a key.

```sh
gp -r "$GP_READER" --install dist/nuri-musig2-v20-keygen-aid2.cap
gp -r "$GP_READER" --install dist/nuri-musig2-v20-keygen-aid3.cap
```

Then the two PIN-gated applets, each with its own script. Both print the registry before and after and assert that nothing else disappeared.

```sh
scripts/install-eth2-card.sh
scripts/install-vault-card.sh
```

Expect `ETH2_INSTALLED_ALONGSIDE_V1` and `VAULT_INSTALLED_ALONGSIDE_FIDO2`. Count the applets in the final listing. There are eight, and a ninth line for the ISD.

On the reference card all eight installed on 2026-10-29. The listing behind that run is in `docs/proofs/real-card-57274221-gp-lock.json`.

## Step 4: Create the keys and the PINs

Keys are born on the chip. There is no import command, and no export command either.

```sh
npm run cosign:real-card:keygen
scripts/run-card-python.sh scripts/card-eth-test.py --regenerate
npm run card:pin:set
scripts/run-card-python.sh scripts/card-totp.py put "YOUR-BASE32-SECRET"
scripts/card-secrets.py --backend card init
```

Five commands, five different applets. Each one asks for a PIN and each PIN is separate. The ETH2 PIN is the sixth and it is set with `80 21` in step 8, because that applet has no setup script. Write down which PIN belongs to which applet before you set them, the prompts look alike and a swap costs an applet reinstall.

Do not send a PIN in the same parcel as the card, and do not reuse your phone PIN.

## Step 5: Use it as a passkey, a DIY FIDO2 security key

The FIDO2 applet is a real authenticator. It has a PIN, it can require user verification, and it exposes the PRF extension that turns a login into a 32 byte secret seed.

The repo ships a local test page over PC/SC:

```sh
bash scripts/serve-prf-test.sh
open http://127.0.0.1:8765
```

Register, then authenticate. PRF output has to come back identical every time, that is the whole point. The reference card returned the same 32 bytes on three runs.

For Google and other web logins the card goes through the browser. Safari sees it, Chrome on macOS does not.

Adding the card as a Google security key is the next test. The steps are Google's own: Security, 2-Step Verification, Security keys, add, PIN on the card. I will put the real result here when it ran.

Keep in mind what the card does not have: a button. A card lying in a reader answers any local program without a touch, the applet sets the presence flag from the request. Remove the card when presence has to mean something.

## Step 6: Use it as an SSH key

The private key stays on the card. OpenSSH talks to a provider, the provider talks CTAP2, the card signs.

```sh
bash scripts/install-ssh-card-host.sh
PROVIDER="$PWD/dist/nuri-pcsc-sk-provider.so"
ssh-keygen -t ecdsa-sk -w "$PROVIDER" -f "$HOME/.ssh/id_nuri_pcsc_sk" -C nuri-card
```

Add the `.pub` file to `authorized_keys` with your normal access, set `HostName` and `User` in the `nuri-card-host` block, then log in.

The bridge discards the PIN. Do not read "security key" as "PIN protected here". A second card with its own credential file is the backup path, and it has to be authorized separately on every server.

I tested this on 30 October 2026. My first card stayed in one reader and the new one went into the OMNIKEY. I made a new key on the new card with `ssh-keygen -t ecdsa-sk`. Then I logged in with the first card and added the new public key to `/root/.ssh/authorized_keys` on all 8 of my servers. Each server got a backup of the file first, and no other line changed. After that I logged in with only the new card. It worked on all 8.

Two things went wrong on the way. With two cards plugged in, the provider picks the card by its reader number (`FIDO2_PCSC_INDEX`). The OMNIKEY shows up twice, once for the contact slot and once for the antenna. The wrong number gives you `Permission denied (publickey)`. One server also failed once with `signing failed ... invalid format`. An old `ssh-pcsc-sk-helper` process was still holding the reader. `pkill -f ssh-pcsc-sk-helper`, wait a few seconds, try again, and it passed.

Put both key files under each host in `~/.ssh/config`. Then either card logs you in.

## Step 7: Cosign bitcoin with a Java Card

The card holds one half of a 2-of-2 MuSig2 key. The other half sits on a Nuri server. A signature needs both, so a card in the wrong hands is not enough.

```sh
npm run cosign:real-card
```

Three cosigns finished on the reference card and all three BIP340 signatures verified. `npm run cosign:web:real-card` serves the same flow as a web page if you want the Arkade client in front of it.

This is a cosigner, not a wallet. Without the server half you can not spend, and without the card the server half alone can not either.

## Step 7b: See your bitcoin in Chrome

The Chrome extension shows the card's Nuri bitcoin account next to Ethereum. One total, then Arkade, boarding and onchain, each with its full address.

```sh
npm ci
bash host/install-macos.sh --python /opt/homebrew/bin/python3.13
cp host/bitcoin.env.example ~/.nuri-card-host/bitcoin.env
chmod 600 ~/.nuri-card-host/bitcoin.env
```

Fill in four public values in that file: the Nuri signer URL, the MuSig2 applet, your card's FIDO2 credential id and the exact reader name. No PIN goes in there. Then open `chrome://extensions`, turn on developer mode, load the `extension/` folder and open the side panel.

I ran it on my demo card on 30 October. It showed 10,465 sats. That is 4,458 on Arkade, 0 boarding and 6,007 onchain, the same three addresses the repo's money table lists.

The first run showed 0 sats. The fake tests had all been green. The extension computed the address with the SDK's default contract, and Nuri uses its own recovery contract with three leaves. The fix uses the same derivation the working send tool uses, and a new test pins the real public values so this can not come back. Two more bugs fell out of the same run. The host loaded its own module twice and forgot the card between calls, and Chrome starts it with an empty environment and an old Python. Both are fixed in the installer now.

Sending from the panel is switched off for now. It refuses instead of signing the wrong thing. To send today, use the [send tool](https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/scripts/send/README.md) in the repo. The full setup, the read-only check and all three bugs are in [the Chrome guide](https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/chrome-extension.md#bitcoin-on-the-real-card-setup-and-proof).

## Step 8: Sign Ethereum with a PIN

ETH2 asks for the PIN before every session. Without a verified PIN, signing returns `6982` and the key does nothing.

```sh
# set the PIN once, then verify it for the session
80 21 00 00 09 08 <8 PIN bytes>
80 20 00 00 04 <pin bytes>
# sign a 32 byte digest
80 04 00 00 20 <digest32>
```

`OPENSC`-style tools do not know this applet, so the calls stay raw APDUs. The response is `r || low-s || pubkey`, and the host must verify it and recover the parity. Two signatures from the reference card passed a Python and an ethers verifier, the math is right. Write your caller from [docs/eth-applet-v2.md](https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/eth-applet-v2.md).

The ETH1 applet has no PIN. Use it only to learn, with small amounts.

The 1.4 build of ETH1 failed on this chip with `6F00`. The cause is in the code: it never set the EC cofactor on the key pair, and JCOP 2.4.1 rejects the operation. Version 1.5 sets it, and two signatures from 1.5 verified. Nothing was ever funded on ETH1.

## Step 9: Carry TOTP codes

```sh
scripts/run-card-python.sh scripts/card-totp.py put "BASE32SECRET"
scripts/run-card-python.sh scripts/card-totp.py code
```

The secret goes in and stays in. The card computes HMAC-SHA1 over the counter, the host only truncates and prints six digits.

The reference card matched 6 of 6 RFC 6238 test vectors. Reading a code is not PIN gated, so a card in a reader is a token generator and a PIN is only needed to overwrite a secret, five tries.

## Step 10: Store secrets in the vault

The vault has sixteen slots. A slot is one name of up to 16 bytes, one secret of up to 64 bytes, and one kind that can not change later.

```sh
printf '%s' "$MY_TOKEN" | scripts/card-secrets.py --backend card put netlify --kind bearer
scripts/card-secrets.py --backend card list
scripts/card-secrets.py --backend card run netlify sh -c 'curl -s -H "Authorization: Bearer $NURI_SECRET_netlify" https://api.netlify.com/api/v1/user'
```

A child started with `run` gets the secret as `NURI_SECRET_<name>` and loses every inherited PIN-shaped variable, so the PIN does not leak into the program it starts.

Two kinds. `bearer` comes out on demand behind the PIN, decrypted into the broker's memory and no further. `hmac` never leaves the card at all, the card answers with a MAC over your bytes.

`--backend card put NAME --kind hmac --data-file data.bin` plus the `hmac` subcommand are the same idea for signing keys. The `proxy` subcommand injects a bearer into an HTTP request so a child process never sees it.

Duplicates are refused. Delete a slot explicitly before you reuse its name, even to change the kind.

## Step 11: Use it as a PKCS#11 HSM

```sh
scripts/build-pkcs11-provider.sh
export NURI_PKCS11_MODULE="$PWD/dist/pkcs11-nuri.so"
pkcs11-tool --module "$NURI_PKCS11_MODULE" -O
```

Tools that can load a PKCS#11 module can now sign through the card. Treat it as a lab tool, this is the least tested surface in the whole build.

## How many secrets fit

- Vault: 16 slots, names up to 16 bytes, secrets up to 64 bytes.
- Resident passkeys: 52 free discoverable slots were reported by the reference card on 2026-10-30. Storage grows in batches of 10, about 400 bytes per credential.
- Non-resident passkeys: no limit. The credential is a wrapped blob the relying party stores, and the card only unwraps it.

52 passkeys sounds small next to a password manager, and it is honest. If you register every site as resident you will run out. Register resident only for sites that need a discoverable credential, the rest work without one.

## How the card protects a Nostr vault

A Nostr note on a relay is a public post. An encrypted one is only as good as the key, and a key inside a wallet signature or a browser profile is one file copy away.

The card gives that key a second ingredient. Its PRF extension returns 32 stable bytes only while the card is present and after PIN or UV. HKDF-SHA256 stretches that into an AES-256-GCM key, the record is encrypted on the host, and only ciphertext goes to the relays as a kind 30078 event.

Relays and everyone reading them see ciphertext. The same PRF output came back on all three runs on 2026-10-28, so the same key comes back. Lose the card and the vault is gone, which is the bargain.

One honest gap. `vault.paymentrequired.com` today derives its records from a wallet signature. The card-protected hosted version, HardPass, is designed and not built. The proof of concept runs locally against this card and is not in the main repo yet.

## Step 12: Change the admin key last

Every card in this series ships with the same public GlobalPlatform management key, `404142434445464748494A4B4C4D4E4F`. It is in the spec, in a hundred tutorials, in this article. Anyone with your card and a reader can delete an applet or install an old one with it.

They can not read your keys that way. They can destroy them, and that is reason enough to change the key.

Do it after the applets are on, not before.

```sh
bash scripts/diy-key.sh
```

The wizard asks in this order, and each step refuses to continue on a guess:

1. Deny-list serial, empty is fine.
2. Reader by number, even when only one exists.
3. The card serial printed in full, typed back by you.
4. A passphrase of 16 characters or more, twice.
5. The escrow written, read back and decrypted.
6. Only then the key change.

The last line of a good run is `CARD_LOCK_VERIFIED`. Copy the escrow file to a USB stick, put the passphrase in your password manager. The two halves belong in two places.

That run is proven twice on the reference card on 2026-10-30, two complete cycles, with the raw output in `docs/proofs/real-card-57274221-gp-lock.json`.

## How to undo the key change

```sh
bash scripts/diy-key.sh unlock
```

It asks for the escrow and the passphrase, decrypts before the first card call, and ends with `CARD_DEFAULT_KEYS_RESTORED_VERIFIED`. Management is public again at that point, so seal the card again with a fresh escrow when you are done.

A lost escrow or a lost passphrase means no more applet work on that card. The applets keep running, you just can not install, delete or upgrade anything. Keep both halves.

## The bugs the real card found

The first bug is not ours. GlobalPlatformPro 24.10.15 crashes with a `NullPointerException` when you pass three separate lock keys, because line 801 of GPTool.java reads the absent `--lock` option before the split flags get their turn. Our answer is to rotate with one random key as ENC, MAC and DEK. That is a weaker shape and it is the only one this build can set.

The second bug is ours. The wizard printed `Escrow backup: ` and then nothing, because the engine puts the path on the same line as the serial prompt and an anchored `sed` expected the line to start with the label. Unit tests stayed green, they matched the token and not the line. The first real run caught it, a regression test now checks the exact line.

The third one is in step 7b. Green fake tests, 0 sats on the real card, because the extension used the wrong contract. A test with the real public values now holds it.

That is the lesson for your own build. Trust the token, not the shape of the screen. Tokens are machine checked, screens are read by tired people.

## What happens when you lose the card

| Lost | Consequence |
|---|---|
| The card | Keys are gone. Nothing can read them out, there is no export. |
| Passkeys | Log in with the backup authenticator you registered first. |
| SSH credential | Lost with the card. The second card is the backup, if you enrolled it. |
| MuSig2 half | The Nuri server still holds its half, so a recovery path exists through the server. |
| Vault and TOTP | Gone. Slot secrets exist nowhere else, recovery codes are the only way back. |
| Admin key escrow | No applet install or delete on that card, ever again. |
| The passphrase to the escrow | Same as losing the escrow. |

The card is one factor, never the only copy of something you can not reissue. Register a second authenticator before you rely on the first.

The one good property of a sealed card: a finder with the default key can delete an applet, and with that delete a key, but can not read a single one.

## How many tries each PIN allows

| Applet | Tries | What happens after |
|---|---|---|
| FIDO2 | 8 | PIN locked, reset needs the applet reinstalled and all passkeys are lost |
| ETH2 | 5 | PIN blocked, the PUK unblocks it, three PUK tries |
| MuSig2 | 5 | Applet locked, no unblock, reinstall only |
| Vault | 5 | Applet blocked for good, all slots lost |
| TOTP | 5 | PUT blocked, existing secrets keep working |
| ETH1 | none | No PIN at all, anyone with the card signs |

None of these is a lock screen with a counter you can watch. A wrong PIN is a spent try, so read the error before you type again.

## FAQ

Do I need a Nuri account?

No. The card works standalone for passkeys, SSH, TOTP and the vault. MuSig2 cosigning is the one job that needs the Nuri server half.

Can I use it on Windows?

Not with these scripts. The applet side is standard PC/SC, so a Windows host can talk to it, but nobody here has walked the installer through it.

Does another brand of card work?

Sometimes. It needs Java Card 3.0.5, an unfused card with the seller's keys, and secp256k1 with plain X+Y. A cheaper card usually lacks the last one and then MuSig2 and Ethereum fail while passkeys still work.

Is it a hardware wallet?

It is a cosigner with one half, not a wallet. Coins need the card and the server, which is a different threat model from a seed phrase in a drawer.

How is this different from a YubiKey?

For passkeys and SSH, not much. A YubiKey does both and has a touch button. The card adds bitcoin, Ethereum, TOTP and a vault on a chip you bought and sealed yourself, and applets you can read. What it does not have is the button, and a YubiKey has one.

Is it cheaper than a Tangem or a Bitkey?

Yes, by a lot. 9.99 euro for the card, against 54.90 USD for two Tangem cards and 250 USD for a Bitkey. The reader is the second cost and the afternoon is the third. Whether that is cheaper for you depends on what you count.

Why not just buy a Bitkey?

If you only want to hold bitcoin, buy the Bitkey and skip this. It has the screen and the fingerprint the card lacks. Build the card if you want to read and change the code, or if you want one key for logins, SSH and a vault as well.

What does the whole thing cost?

9.99 euro for the card, plus shipping, a contact reader, and an afternoon. There is no licence.

Can I clone it for a backup?

Not by copying. Keys are generated on the chip, so a backup is a second card with its own keys and its own enrollment.

What can the card not do?

No button, no display, no battery. A reader plus a program is the approval step, and the card trusts the program.

## Build one and tell me

Four things are still open. Windows support. The hosted, card-protected vault. Sending from the Chrome panel. And the Google security key test, which runs next. The second card as SSH backup is done: it logs in on all eight of my servers.

Everything else above ran on a real card. If a step of yours ends anywhere but on its stated token, keep every file, post the error line, and do not guess at the cause.

So here is the ask. Order the card. It is [9.99 euro at xmrstreet.store](https://xmrstreet.store/product/smartcard-j3r180/), full card size. Clone [the repo](https://github.com/nuri-com/nuri-passkey-prf-smartcard) and follow [the step by step guide](https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/main/docs/diy-card.md). It works for people and for agents. Then [open an issue](https://github.com/nuri-com/nuri-passkey-prf-smartcard/issues/new) with your chip, your reader and the last line your terminal printed. Working or broken, I want to see it.
