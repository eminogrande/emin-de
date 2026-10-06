---
title: "The Complete Guide: Building a Full-Stack Blog Infrastructure with Lightning, Nostr, and Email Publishing"
description: "This is how we built a full blog platform that does not depend on anyone. It takes Bitcoin Lightning payments, it talks to Nostr, you can publish by email..."
date: "2024-08-26T15:45:00Z"
updated: "2024-08-26T15:45:00Z"
lang: "en"
category: "building"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/the-complete-guide-building-a-full-stack-blog-infrastructure-with-lightning-nost/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 151
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/complete-blog-infrastructure-guide/"
tldr:
  - "A self-hosted blog on a Hetzner VPS with Hugo, Nginx and Let's Encrypt, deployed by GitHub Actions."
  - "It takes Lightning tips through Alby Hub, cross-posts to its own Nostr relay as NIP-23, and accepts posts by email."
  - "Everything is open source and privacy friendly, so one person owns the whole publishing setup."
basically:
  what-runs-underneath: "A Hetzner Ubuntu VPS, Hugo with PaperMod, Nginx with Let's Encrypt, on the domain emino.app."
  what-it-can-do: "Lightning tips, an own Nostr relay, posting by email from three allowed senders, auto deploys."
  how-it-is-built: "A Hugo config, a build script and two pipelines: email to blog every 15 minutes and blog to Nostr."
  what-is-running: "Docker runs Alby Hub and the relay, Nginx has three hosts, and cron checks the inbox."
  keeping-it-alive: "A few curl and docker commands check everything. Static files make it fast and safe."
  so: "Normal web, Lightning, Nostr and email in one self-hosted setup that one person fully owns."
---
![](../../../media/the-complete-guide-building-a-full-stack-blog-infrastructure-with-lightning-nost/cover.jpg)

This is how we built a full blog platform that does not depend on anyone. It takes Bitcoin Lightning payments, it talks to Nostr, you can publish by email, and GitHub deploys it on its own.

## What runs underneath

The server is a Hetzner Ubuntu VPS (188.34.194.25). Hugo with the PaperMod theme builds the site. Nginx serves it with SSL from Let's Encrypt. The domain is emino.app, with DNS at Porkbun. The code lives on GitHub and deploys automatically. Postfix and Dovecot handle the mail for email-to-blog. Docker runs the services, Alby Hub and the Nostr relay.

## What it can do

Lightning Bitcoin tips go to emin@nuri.com. The design is minimal and all about typography, in Bitcoin orange (#f7931a), black and white only. WebLN works fully with the Alby browser extension. Alby users pay with one click. Mobile wallets get Lightning URI deep links. And there is a fallback modal for paying by hand.

For Nostr there is my own relay at `wss://relay.emino.app`. Posts go out as long-form NIP-23 events. A publishing script cross-posts to Nostr on its own. Images and videos get compressed. The relay runs as nostr-rs-relay in a Docker container, so it stays up.

For email-to-blog the address is post@emino.app. Only three senders are allowed, emin@nuri.com, emin@emin.de and eminhenri@gmail.com. You can attach Markdown files. Images get compressed automatically to max 1920x1080. Videos get compressed with FFmpeg (H.264). Every email post syncs to GitHub. A cron job checks every 15 minutes.

These are the DNS records I set at Porkbun.

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

GitHub Actions deploys on any push to the main branch. It pulls the latest changes, cleans the build directory so deleted posts are gone, rebuilds with Hugo and deploys with rsync (--delete flag). The workflow file is `.github/workflows/deploy.yml`.

For security, server access goes over Ed25519 SSH keys. Email has a whitelist of allowed senders. SSL/TLS comes from Let's Encrypt. UFW is the firewall, set up for web and email. For Nostr there is an optional NSEC environment variable.

For media, the favicon is Bitcoin-themed in several sizes. Pillow (Python) optimizes images. FFmpeg compresses videos with the H.264 codec. Static files are served from `/static/media/`. And there is PWA support through a site manifest with theme colors.

## How it is built

The Hugo configuration (config.toml).

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

The build script (build.sh).

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

This is what happens with an email. You send it to post@emino.app with the subject "BLOG: Title". Every 15 minutes a cron job runs email_to_blog.py. The script checks if the sender is allowed. It takes the Markdown or plain text. It compresses the media and puts it into the post. It writes a Hugo Markdown post. It rebuilds the site and syncs to GitHub. And if you want, it publishes to Nostr too.

This is what happens on Nostr. The script reads the Hugo Markdown post. It makes a NIP-23 long-form event. It adds tags (title, published_at, d-tag so the post can be replaced). It signs with the private key (NSEC). Then it publishes to several relays, wss://relay.emino.app (my own), wss://relay.damus.io, wss://nos.lol and wss://relay.nostr.band.

## What is running

The Docker containers.

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

Nginx has three virtual hosts. emino.app is the main blog (port 443/80). hub.emino.app is the Alby Hub interface (proxy to 8080). relay.emino.app is the Nostr relay WebSocket (proxy to 8081).

The cron job.

```bash
# Email checking every 15 minutes
*/15 * * * * cd /var/www/emino-blog && \
  ./nostr-env/bin/python scripts/email_to_blog.py \
  >> /var/log/email-to-blog.log 2>&1
```

The file structure.

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

The environment variables you need.

```bash
# For email-to-blog
BLOG_EMAIL="post@emino.app"
BLOG_EMAIL_PASSWORD="your-email-password"

# For Nostr publishing (optional)
NOSTR_NSEC="your-nostr-private-key"
```

## Keeping it alive

To check that everything works, run `curl -I https://emino.app` for the blog. Look at the Lightning address at hub.emino.app. Test a connection to `wss://relay.emino.app` for the relay. And read `/var/log/email-to-blog.log` for email.

The things I do most often.

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

On security. Only allowed senders can post. The server is no public mail relay, it only takes mail for its own domains. Everything runs over HTTPS/WSS. The NSEC keys sit in environment variables. And security updates run automatically.

On speed. It is a static site with no database, so it loads instantly. All images are optimized before they go out. Videos use H.264 with web settings. The static files can easily go behind a CDN. And Hugo minifies the output.

What could come next. AI image generation, Nostr comments, a Lightning paywall for premium content, IPFS backup and distribution, analytics without tracking, and automatic cross-posting to social media.

## So

This blog mixes the normal web (a Hugo static site), Web3 payments (Lightning Bitcoin), decentralized social (the Nostr protocol), posting by email, and a developer workflow (GitHub CI/CD).

All of it is self-hosted, respects privacy and is built with open source. It shows that one person can own the whole publishing setup and still have the comfort and the connections of a modern platform.

The live site is [emino.app](https://emino.app). The Lightning address is emin@nuri.com. The Nostr relay is wss://relay.emino.app. The code is on GitHub at [github.com/eminogrande/emino-blog](https://github.com/eminogrande/emino-blog).

I wrote this post to document how the whole thing was built. If you can read this, all systems are working!
