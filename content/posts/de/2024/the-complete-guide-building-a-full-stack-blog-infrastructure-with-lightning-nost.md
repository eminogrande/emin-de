---
title: "Der komplette Guide: So baust du eine Full-Stack-Blog-Infrastruktur mit Lightning, Nostr und E-Mail-Publishing"
description: "So haben wir eine komplette Blog-Plattform aufgebaut, die von niemandem abhängig ist. Sie akzeptiert Bitcoin-Lightning-Zahlungen, kommuniziert über Nostr und du kannst einfach per E-Mail posten."
date: "2024-08-26T15:45:00Z"
updated: "2024-08-26"
lang: de
translated_from: "en/the-complete-guide-building-a-full-stack-blog-infrastructure-with-lightning-nost"
source_sections: ["what-runs-underneath", "what-it-can-do", "how-it-is-built", "what-is-running", "keeping-it-alive", "so"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-complete-guide-building-a-full-stack-blog-infrastructure-with-lightning-nost/cover.webp"
tldr: ["Ein selbstgehosteter Blog auf einem Hetzner-VPS mit Hugo, Nginx und Let's Encrypt, automatisiert über GitHub Actions.", "Lightning-Tipps kommen über den Alby Hub rein, Cross-Posts gehen als NIP-23 ans eigene Nostr-Relay und Beiträge lassen sich per E-Mail einreichen.", "Alles ist Open Source und auf Privatsphäre getrimmt, damit eine einzelne Person das komplette Publishing-Setup besitzt."]
sections: [{"basically": "Ein Hetzner-Ubuntu-VPS, Hugo mit PaperMod, Nginx mit Let's Encrypt auf der Domain emino.app."}, {"basically": "Lightning-Tipps, ein eigenes Nostr-Relay, E-Mail-Posting von drei erlaubten Absendern und Auto-Deploys."}, {"basically": "Eine Hugo-Config, ein Build-Skript und zwei Pipelines: Alle 15 Minuten von E-Mail zu Blog und von Blog zu Nostr."}, {"basically": "Docker lässt den Alby Hub und das Relay laufen, Nginx verwaltet drei Hosts und ein Cronjob checkt den Posteingang."}, {"basically": "Ein paar curl- und docker-Befehle prüfen, ob alles läuft. Statische Dateien machen das Ganze schnell und sicher."}, {"basically": "Normales Web, Lightning, Nostr und E-Mail in einem selbstgehosteten Setup, das einer Person ganz allein gehört."}]
---
![](../../../media/the-complete-guide-building-a-full-stack-blog-infrastructure-with-lightning-nost/cover.jpg)

So haben wir eine komplette Blog-Plattform gebaut, die von niemandem abhängt. Sie nimmt Bitcoin-Lightning-Zahlungen an, spricht mit Nostr, du kannst per E-Mail veröffentlichen, und GitHub deployt sie von allein.

## Was darunter läuft

Der Server ist ein Hetzner Ubuntu VPS (188.34.194.25). Hugo mit dem PaperMod-Theme baut die Seite. Nginx serviert sie mit SSL von Let's Encrypt. Die Domain ist emino.app, DNS läuft über Porkbun. Der Code liegt auf GitHub und wird automatisch deployt. Postfix und Dovecot machen die Mails für E-Mail-zu-Blog. Docker betreibt die Dienste, Alby Hub und das Nostr-Relay.

## Was es kann

Lightning-Bitcoin-Trinkgelder gehen an emin@nuri.com. Das Design ist minimal und dreht sich komplett um Typografie, nur in Bitcoin-Orange (#f7931a), Schwarz und Weiß. WebLN funktioniert vollständig mit der Alby-Browser-Erweiterung. Alby-Nutzer zahlen mit einem Klick. Mobile Wallets bekommen Lightning-URI-Deep-Links. Und es gibt ein Fallback-Modal zum manuellen Bezahlen.

Für Nostr gibt es mein eigenes Relay unter `wss://relay.emino.app`. Posts gehen als Longform-NIP-23-Events raus. Ein Publishing-Skript crosspostet automatisch zu Nostr. Bilder und Videos werden komprimiert. Das Relay läuft als nostr-rs-relay in einem Docker-Container, bleibt also oben.

Für E-Mail-zu-Blog ist die Adresse post@emino.app. Nur drei Absender sind erlaubt, emin@nuri.com, emin@emin.de und eminhenri@gmail.com. Du kannst Markdown-Dateien anhängen. Bilder werden automatisch auf max. 1920x1080 komprimiert. Videos werden mit FFmpeg (H.264) komprimiert. Jeder E-Mail-Post wird mit GitHub synchronisiert. Ein Cronjob prüft alle 15 Minuten.

Das sind die DNS-Einträge, die ich bei Porkbun gesetzt habe.

```
A Record:
  Host: @
  Answer: 188.34.194.25
  TTL: 600

A Record:
  Host: www
  Answer: 188.34.194.25
  TTL: 600

MX Record:
  Host: (blank)
  Answer: emino.app
  Priority: 10
  TTL: 600

TXT Record (SPF):
  Host: (blank)
  Answer: v=spf1 ip4:188.34.194.25 ~all
  TTL: 600

TXT Record (DMARC):
  Host: _dmarc
  Answer: v=DMARC1; p=none; rua=mailto:post@emino.app
  TTL: 600
```

GitHub Actions deployt bei jedem Push auf den Main-Branch. Es holt die neuesten Änderungen, räumt das Build-Verzeichnis auf, damit gelöschte Posts weg sind, baut mit Hugo neu und deployt mit rsync (--delete-Flag). Die Workflow-Datei ist `.github/workflows/deploy.yml`.

Bei der Sicherheit läuft der Serverzugang über Ed25519-SSH-Keys. E-Mail hat eine Whitelist erlaubter Absender. SSL/TLS kommt von Let's Encrypt. UFW ist die Firewall, eingerichtet für Web und E-Mail. Für Nostr gibt es eine optionale NSEC-Umgebungsvariable.

Bei den Medien ist das Favicon Bitcoin-themed in mehreren Größen. Pillow (Python) optimiert Bilder. FFmpeg komprimiert Videos mit dem H.264-Codec. Statische Dateien werden aus `/static/media/` serviert. Und es gibt PWA-Support über ein Site-Manifest mit Theme-Farben.

## Wie es gebaut ist

Die Hugo-Konfiguration (config.toml).

```toml
baseURL = "https://emino.app/"
languageCode = "en-us"
title = "emino.app"
theme = "PaperMod"

[params]
env = "production"
defaultTheme = "auto"
ShowShareButtons = true
ShowReadingTime = true
ShowToc = true
ShowBreadCrumbs = true
ShowPostNavLinks = true
ShowCodeCopyButtons = true
```

Das Build-Skript (build.sh).

```bash
#!/bin/bash
echo "Cleaning old build..."
rm -rf public/*
echo "Building site with Hugo..."
hugo --minify
echo "Syncing to web root..."
rsync -av --delete public/ /var/www/apps/main/
echo "Build complete!"
```

Das passiert mit einer E-Mail. Du schickst sie an post@emino.app mit dem Betreff "BLOG: Title". Alle 15 Minuten läuft ein Cronjob mit email_to_blog.py. Das Skript prüft, ob der Absender erlaubt ist. Es nimmt das Markdown oder den Plaintext. Es komprimiert die Medien und packt sie in den Post. Es schreibt einen Hugo-Markdown-Post. Es baut die Seite neu und synchronisiert mit GitHub. Und wenn du willst, veröffentlicht es auch auf Nostr.

Das passiert bei Nostr. Das Skript liest den Hugo-Markdown-Post. Es macht ein NIP-23-Longform-Event draus. Es fügt Tags hinzu (title, published_at, d-tag, damit der Post ersetzt werden kann). Es signiert mit dem privaten Schlüssel (NSEC). Dann veröffentlicht es auf mehreren Relays, wss://relay.emino.app (mein eigenes), wss://relay.damus.io, wss://nos.lol und wss://relay.nostr.band.

## Was läuft

Die Docker-Container.

```bash
# Alby Hub (Lightning)
docker run -d --name alby-hub \
  -p 8080:8080 -p 9735:9735 \
  ghcr.io/getalby/hub:latest

# Nostr Relay
docker run -d --name nostr-relay \
  -p 8081:8080 \
  scsibug/nostr-rs-relay:latest
```

Nginx hat drei Virtual Hosts. emino.app ist der Hauptblog (Port 443/80). hub.emino.app ist das Alby-Hub-Interface (Proxy auf 8080). relay.emino.app ist der Nostr-Relay-WebSocket (Proxy auf 8081).

Der Cronjob.

```bash
# Email checking every 15 minutes
*/15 * * * * cd /var/www/emino-blog && \
  ./nostr-env/bin/python scripts/email_to_blog.py \
  >> /var/log/email-to-blog.log 2>&1
```

Die Dateistruktur.

```
/var/www/emino-blog/
├── config.toml
├── build.sh
├── content/posts/
├── themes/PaperMod/
├── static/
│   ├── media/
│   ├── favicon.ico
│   └── site.webmanifest
├── scripts/
│   ├── email_to_blog.py
│   ├── nostr_publisher.py
│   └── email_auth.txt
├── nostr-env/ (Python venv)
└── .github/workflows/deploy.yml

/var/www/apps/main/ (deployed site)
/var/www/nostr-relay/ (relay config)
/var/www/alby-hub/ (Lightning hub)
```

Die Umgebungsvariablen, die du brauchst.

```bash
# For email-to-blog
BLOG_EMAIL="post@emino.app"
BLOG_EMAIL_PASSWORD="your-email-password"

# For Nostr publishing (optional)
NOSTR_NSEC="your-nostr-private-key"
```

## Am Leben halten

Um zu prüfen, ob alles läuft, mach `curl -I https://emino.app` für den Blog. Schau dir die Lightning-Adresse unter hub.emino.app an. Teste eine Verbindung zu `wss://relay.emino.app` für das Relay. Und lies `/var/log/email-to-blog.log` für E-Mail.

Die Dinge, die ich am häufigsten mache.

```bash
# Manual rebuild
cd /var/www/emino-blog && ./build.sh

# Check email processing
./nostr-env/bin/python scripts/email_to_blog.py

# View Docker containers
docker ps

# Check Nginx status
systemctl status nginx
```

Zur Sicherheit. Nur erlaubte Absender können posten. Der Server ist kein öffentliches Mail-Relay, er nimmt nur Mails für die eigenen Domains an. Alles läuft über HTTPS/WSS. Die NSEC-Keys liegen in Umgebungsvariablen. Und Sicherheitsupdates laufen automatisch.

Zur Geschwindigkeit. Es ist eine statische Seite ohne Datenbank, lädt also sofort. Alle Bilder werden optimiert, bevor sie rausgehen. Videos nutzen H.264 mit Web-Einstellungen. Die statischen Dateien können easy hinter ein CDN. Und Hugo minifiziert die Ausgabe.

Was als Nächstes kommen könnte. KI-Bildgenerierung, Nostr-Kommentare, eine Lightning-Paywall für Premium-Content, IPFS-Backup und -Distribution, Analytics ohne Tracking und automatisches Crossposting zu Social Media.

## Also

Dieser Blog mischt das normale Web (eine Hugo-Static-Site), Web3-Zahlungen (Lightning Bitcoin), dezentrales Social (das Nostr-Protokoll), Posten per E-Mail und einen Developer-Workflow (GitHub CI/CD).

Alles davon ist selbst gehostet, respektiert Privatsphäre und ist mit Open Source gebaut. Es zeigt, dass eine Person das ganze Publishing-Setup besitzen kann und trotzdem den Komfort und die Anbindungen einer modernen Plattform hat.

Die Live-Seite ist [emino.app](https://emino.app). Die Lightning-Adresse ist emin@nuri.com. Das Nostr-Relay ist wss://relay.emino.app. Der Code liegt auf GitHub unter [github.com/eminogrande/emino-blog](https://github.com/eminogrande/emino-blog).

Ich habe diesen Post geschrieben, um zu dokumentieren, wie das Ganze gebaut wurde. Wenn du das hier lesen kannst, funktionieren alle Systeme!
