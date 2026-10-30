---
title: "Nuri card admin key, change it yourself"
seo_title: "Change your Nuri card admin key yourself | emin.de"
description: "The Nuri card ships with the public GlobalPlatform admin key. One command seals it, one command undoes it, and the real card test found two bugs."
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
tags: ["Nuri card", "GlobalPlatform", "smartcard", "admin key", "how-to"]
source_links:
  - { title: "nuri-passkey-prf-smartcard", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard", note: "The repository with the wizard, the runbook and the proof receipt." }
  - { title: "docs/diy-key.md", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/feat/diy-key/docs/diy-key.md", note: "The full how-to, the failure table and the agent runbook." }
  - { title: "Pull request 43", url: "https://github.com/nuri-com/nuri-passkey-prf-smartcard/pull/43", note: "The change under review, still open." }
  - { title: "GlobalPlatformPro 24.10.15, GPTool.java line 801", url: "https://github.com/martinpaljak/GlobalPlatformPro/blob/v24.10.15/tool/src/main/java/pro/javacard/gptool/GPTool.java#L801", note: "The eager read that breaks the split lock flags." }
tldr:
  - "Every Nuri card leaves the factory with the same public admin key."
  - "Anyone holding the card can use it to delete or replace applets. Your own random key stops that."
  - "One command does it now. A second command restores the default."
  - "Proven on a real card twice, and the test found two real bugs."
basically:
  what-the-admin-key-is-and-what-the-default-exposes: "The card ships with the admin key every GlobalPlatform user already has in a wiki page."
  what-you-need: "A card, a PC/SC reader, Java 11 or newer and Python 3.9 or newer on macOS or Linux."
  what-the-wizard-asks-in-order: "Deny-list, reader, serial typed back, then the passphrase. Escrow first, key change after."
  run-the-change: "Three lines in a terminal. The last line of a good run is the token CARD_LOCK_VERIFIED."
  how-to-undo-it: "The unlock action asks for the escrow and decryption comes before any card traffic."
  the-two-bugs-the-real-card-found: "A gp crash on the split lock flags and an empty escrow path. Both were found by testing."
  what-the-card-can-still-lose: "Lose the escrow or its passphrase and no applet update goes through this keyset again."
  the-manual-path: "Two gp commands, no backup. Fine for people who already have the key somewhere else."
---
## What the admin key is and what the default exposes

A GlobalPlatform card has a management key on its Issuer Security Domain. That is the admin key. It is not the key that signs your logins, it is the key that decides which applets may be loaded, deleted or replaced.

Every Nuri card ships with the same one, `404142434445464748494A4B4C4D4E4F`. It is the public test key from the GlobalPlatform spec, printed in a hundred tutorials. So anyone who has a card in hand and a reader can use it. They can delete your applets, install an old signed applet over a new one, or drop a replacement in place. They do not get your passkeys or your wallet keys that way, but they get the software that runs around them.

Changing that key to a random one of your own seals the card. The management key is not used by the card day to day, so nothing you do with it changes: passkeys, wallet keys, card PINs and the installed applets stay as they are. Only the management surface moves behind a secret.

I wanted this done on a card in the open, not described in theory. So the proof below is a real card, with the serial printed and the receipt in the repo.

## What you need

- A Nuri card and a PC/SC reader. The proof card is an NXP JCOP v2.4.1 in an HID Global OMNIKEY 5422, contact slot.
- macOS or Linux. Windows is not supported by the wizard yet.
- Java 11 or newer, Python 3.9 or newer, git.
- Internet on the first run. The script fetches a pinned GlobalPlatformPro and checks its sha256 before it runs.

On macOS the script prints the install lines and stops if Java or Python is missing. On Debian and Ubuntu it points you at `default-jre-headless`, `python3-venv` and `pcscd`.

One thing to do before you start: take every other smartcard off the reader. Leave only the card you mean to change. `gp` matches the reader name as a substring and with cards in both slots it refuses to guess which one you want.

The script keeps a deny-list at `~/.nuri-card/no-lock-cplc.txt`, a list of serials that must never change. If you have a card you depend on, put its serial there before the first run.

## What the wizard asks, in order

The order is the safety feature. Read it before you type anything.

```
deny-list
  |
exact reader
  |
serial typed back
  |
passphrase
  |
escrow written and read back
  |
PUT KEY on the card
  |
fresh listing + CPLC
```

Each step stops the run instead of continuing on a guess. A malformed deny-list entry is asked again, up to three times. A reader list always comes with a number to pick, even when there is only one. The card serial is printed in full and you have to type it back, so a wrong card in the reader fails on a human check before any traffic goes out.

The passphrase needs 16 characters or more. The wizard writes the escrow file, reads it back and decrypts it, and only then sends the key change. So a typo in the passphrase, a full disk or a broken file stops the run with the card untouched.

Reusing an escrow path that already exists is refused before any rotation, with `REFUSED: Input/filesystem operation failed` and no PUT KEY. The wizard never overwrites an escrow.

## Run the change

```sh
git clone https://github.com/nuri-com/nuri-passkey-prf-smartcard.git
cd nuri-passkey-prf-smartcard
bash scripts/diy-key.sh
```

Answer the prompts. The summary line before the last question names your serial, the key version and the key type. If any of it is not your card, answer `n` and start again.

The last line of a good run is this token:

```
CARD_LOCK_VERIFIED
```

One line above it sits the escrow path. Copy that file to a USB stick right now, and put the passphrase in your password manager or on paper somewhere else. The card is sealed at that point and the two halves of the backup do not live in the same place.

The engine checks the result again after the rotation with a fresh listing under the new key, including the CPLC serial. A card that fails that check is not reported as a success.

## How to undo it

```sh
bash scripts/diy-key.sh unlock
```

Without `--escrow` the wizard lists the escrow files under `~/.nuri-card/escrow/` and you pick one. Then it asks for the passphrase. Decryption happens before the first GP call, so a wrong passphrase costs nothing and leaves the card alone.

Success ends with `CARD_DEFAULT_KEYS_RESTORED_VERIFIED`. The escrow file is kept. Management is public again after that, so seal the card again with a fresh escrow when the applet work is done.

On the proof card the undo ran twice, and both times an independent `gp -l` with the public default key listed the ISD in OP_READY state and all 8 applets again. Nothing was left rotated.

## The two bugs the real card found

The first bug was in GlobalPlatformPro itself. Version 24.10.15 crashes with a NullPointerException when you pass `--lock-enc`, `--lock-mac` and `--lock-dek`. The cause is a line in GPTool.java that reads the absent `--lock` option eagerly, so the split flags never get their turn. The fix on our side is to rotate with `--lock <hex>`, one random key used as ENC, MAC and DEK. That is a weaker shape than three separate keys, and it is the only shape this version can set. A unit test would not have caught it. The check ran against the real jar, offline, before the card was touched.

The second bug was ours. The wizard printed `Escrow backup: ` and then nothing. The engine prints the escrow path on the same line as the serial prompt, so an anchored `sed` that expected the line to start with the label missed it. Unit tests were green because they matched the token, not the line. The first real-card run caught it, the anchor came out, and a regression assertion now checks for `Escrow backup: <path>` exactly. Run two printed it and that path was used for the undo.

The branch in pull request 43 carries that fix. The PR is open, not merged. This is also why the guide says to trust the token and not the shape of the screen. Tokens are checked by machine, screens are trusted by people.

## What the card can still lose

The escrow file holds the old and the new keyset, encrypted with scrypt and AES-GCM. Losing the file and losing the passphrase are the same accident. Without both, no applet update goes through this keyset again, and you keep only what the applets themselves can do.

The card's authentication retry limit was never probed. That is the reason the docs forbid retrying with a guessed key. A wrong guess is one wasted attempt against a counter nobody here knows, so read the error and fix the cause instead of hammering the card.

This lock also does not stop a physical attacker with probes or a compromised host. It stops the person who knows the public key and has five minutes with your card, which is the case worth closing first.

## The manual path

If you already manage GP keys elsewhere and do not want an escrow, the two commands are these, with `K` as the default key and `READER` as the exact reader name.

```sh
gp -r "READER" --key-ver 0x01 --key-enc K --key-mac K --key-dek K -l
gp -r "READER" --key-ver 0x01 --key-enc K --key-mac K --key-dek K --new-keyver 0x01 --lock NEWKEY
```

The version stays the same in both arguments. `NEWKEY` is 32 hex characters. What you give up is the readback, the deny-list and the second listing. The card ends up sealed and the only copy of the new key is in your head or on the screen.

The fastest way to see it work is the card in your own hand. Mine has been sealed and restored twice today, two full cycles, and each of the four runs ended on its token. The receipt with the full output, the card serial and the final listing is at `docs/proofs/real-card-57274221-gp-lock.json`. If a run of yours ends anywhere except `CARD_LOCK_VERIFIED`, keep every file, post the error line, and do not guess. [The repo](https://github.com/nuri-com/nuri-passkey-prf-smartcard) and [the how-to](https://github.com/nuri-com/nuri-passkey-prf-smartcard/blob/feat/diy-key/docs/diy-key.md) have the rest.
