---
title: "Tam rehber: Lightning, Nostr ve e-postayla yayınlama içeren full-stack blog altyapısı kurmak"
description: "Kimseye bağımlı olmadan tam bir blog platformunu nasıl kurduk. Bitcoin Lightning ödemeleri alıyor, Nostr ile konuşuyor, e-postayla yayınlayabiliyorsunuz…"
date: "2024-08-26T15:45:00Z"
updated: "2024-08-26"
lang: tr
translated_from: "en/the-complete-guide-building-a-full-stack-blog-infrastructure-with-lightning-nost"
source_sections: ["what-runs-underneath", "what-it-can-do", "how-it-is-built", "what-is-running", "keeping-it-alive", "so"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/the-complete-guide-building-a-full-stack-blog-infrastructure-with-lightning-nost/cover.webp"
tldr: ["Hetzner VPS üzerinde Hugo, Nginx ve Let's Encrypt ile kendi barındırdığımız bir blog, GitHub Actions ile dağıtılıyor.", "Alby Hub üzerinden Lightning bahşişleri alıyor, kendi Nostr relay'ine NIP-23 olarak çapraz gönderi yapıyor ve e-postayla gönderi kabul ediyor.", "Her şey açık kaynak ve gizlilik dostu, yani tek bir kişi tüm yayınlama kurulumunun sahibi."]
sections: [{"basically": "emino.app alan adında Let's Encrypt'li Nginx, PaperMod'lu Hugo, bir Hetzner Ubuntu VPS."}, {"basically": "Lightning bahşişleri, kendi Nostr relay'i, üç izin verilen gönderenden e-postayla gönderi, otomatik dağıtımlar."}, {"basically": "Bir Hugo yapılandırması, bir derleme betiği ve iki pipeline: 15 dakikada bir e-postadan bloga ve blogdan Nostr'a."}, {"basically": "Docker, Alby Hub ve relay'i çalıştırıyor, Nginx üç host'a sahip ve cron gelen kutusunu kontrol ediyor."}, {"basically": "Birkaç curl ve docker komutu her şeyi kontrol ediyor. Statik dosyalar her şeyi hızlı ve güvenli kılıyor."}, {"basically": "Normal web, Lightning, Nostr ve e-posta, tek bir kişinin tamamen sahip olduğu kendi barındırdığı tek bir kurulumda."}]
---
![](../../../media/the-complete-guide-building-a-full-stack-blog-infrastructure-with-lightning-nost/cover.jpg)

Kimsenin elinde olmayan, tamamen bağımsız bir blog platformunu nasıl kurduk, işte böyle. Bitcoin Lightning ödemeleri alıyor, Nostr ile konuşuyor, e-postayla yazı yayınlayabiliyorsun ve GitHub kendi kendine deploy ediyor.

## Altyapıda ne var

Sunucu bir Hetzner Ubuntu VPS (188.34.194.25). Siteyi PaperMod temalı Hugo derliyor. Nginx, Let's Encrypt SSL'iyle sunuyor. Domain emino.app, DNS Porkbun'da. Kod GitHub'da duruyor ve otomatik deploy ediliyor. E-postadan bloga yazı için Postfix ve Dovecot var. Servisler, Alby Hub ve Nostr relay'i Docker'da çalışıyor.

## Neler yapabiliyor

Lightning Bitcoin bahşişleri emin@nuri.com adresine gidiyor. Tasarım minimal, tamamen tipografi odaklı, sadece Bitcoin turuncusu (#f7931a), siyah ve beyaz. WebLN, Alby tarayıcı eklentisiyle tam çalışıyor. Alby kullanıcıları tek tıkla ödüyor. Mobil cüzdanlar Lightning URI deep link alıyor. Bir de elle ödeme için yedek modal var.

Nostr tarafında `wss://relay.emino.app` adresinde kendi relay'im var. Yazılar uzun form NIP-23 event'leri olarak çıkıyor. Bir yayınlama script'i Nostr'a otomatik cross-post yapıyor. Görseller ve videolar sıkıştırılıyor. Relay, nostr-rs-relay olarak bir Docker container'ında çalışıyor, yani hep ayakta.

E-postadan bloga yazı için adres post@emino.app. Sadece üç gönderici izinli: emin@nuri.com, emin@emin.de ve eminhenri@gmail.com. Markdown dosyası ekleyebiliyorsun. Görseller otomatik olarak maksimum 1920x1080'e sıkıştırılıyor. Videolar FFmpeg ile sıkıştırılıyor (H.264). Her e-posta yazısı GitHub'a senkronize oluyor. Bir cron job her 15 dakikada bir kontrol ediyor.

Porkbun'da ayarladığım DNS kayıtları bunlar.

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

GitHub Actions, main branch'e her push'ta deploy ediyor. Son değişiklikleri çekiyor, build dizinini temizliyor ki silinen yazılar da gitsin, Hugo ile yeniden derliyor ve rsync ile deploy ediyor (--delete flag'iyle). Workflow dosyası `.github/workflows/deploy.yml`.

Güvenlik tarafında, sunucuya erişim Ed25519 SSH anahtarlarıyla. E-postada izinli göndericilerin whitelist'i var. SSL/TLS Let's Encrypt'ten. UFW firewall, web ve e-posta için ayarlı. Nostr için opsiyonel bir NSEC environment variable var.

Medya tarafında, favicon Bitcoin temalı ve birkaç boyutta. Pillow (Python) görselleri optimize ediyor. FFmpeg videoları H.264 codec ile sıkıştırıyor. Statik dosyalar `/static/media/` altından sunuluyor. Bir de site manifest'iyle PWA desteği var, tema renkleriyle birlikte.

## Nasıl kuruldu

Hugo konfigürasyonu (config.toml).

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

Build script'i (build.sh).

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

Bir e-posta geldiğinde olanlar şunlar. post@emino.app adresine "BLOG: Başlık" konulu bir mail gönderiyorsun. Her 15 dakikada bir cron job email_to_blog.py'yi çalıştırıyor. Script göndericinin izinli olup olmadığını kontrol ediyor. Markdown ya da düz metni alıyor. Medyayı sıkıştırıp yazıya ekliyor. Bir Hugo Markdown yazısı oluşturuyor. Siteyi yeniden derliyor ve GitHub'a senkronize ediyor. İstersen Nostr'a da yayınlıyor.

Nostr tarafında olanlar da şunlar. Script Hugo Markdown yazısını okuyor. Bir NIP-23 uzun form event'i oluşturuyor. Tag'leri ekliyor (title, published_at, d-tag ki yazı değiştirilebilsin). Private key ile imzalıyor (NSEC). Sonra birkaç relay'e yayınlıyor: wss://relay.emino.app (benimki), wss://relay.damus.io, wss://nos.lol ve wss://relay.nostr.band.

## Neler çalışıyor

Docker container'ları.

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

Nginx'te üç virtual host var. emino.app ana blog (port 443/80). hub.emino.app Alby Hub arayüzü (8080'e proxy). relay.emino.app Nostr relay WebSocket'i (8081'e proxy).

Cron job.

```bash
# Email checking every 15 minutes
*/15 * * * * cd /var/www/emino-blog && \
  ./nostr-env/bin/python scripts/email_to_blog.py \
  >> /var/log/email-to-blog.log 2>&1
```

Dosya yapısı.

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

İhtiyacın olan environment variable'lar.

```bash
# For email-to-blog
BLOG_EMAIL="post@emino.app"
BLOG_EMAIL_PASSWORD="your-email-password"

# For Nostr publishing (optional)
NOSTR_NSEC="your-nostr-private-key"
```

## Ayakta tutmak

Her şeyin çalıştığını kontrol etmek için bloga `curl -I https://emino.app` çalıştır. Lightning adresine hub.emino.app'ten bak. Relay için `wss://relay.emino.app`'e bağlantı testi yap. E-posta için de `/var/log/email-to-blog.log` dosyasını oku.

En sık yaptığım şeyler.

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

Güvenlik hakkında. Sadece izinli göndericiler yazı yayınlayabiliyor. Sunucu public mail relay değil, sadece kendi domain'leri için mail alıyor. Her şey HTTPS/WSS üzerinden çalışıyor. NSEC anahtarları environment variable'larda duruyor. Güvenlik güncellemeleri otomatik çalışıyor.

Hız hakkında. Statik site, veritabanı yok, yani anında yükleniyor. Tüm görseller yayınlanmadan önce optimize ediliyor. Videolar H.264 ve web ayarlarıyla. Statik dosyalar rahatça bir CDN'in arkasına gidebilir. Hugo çıktıyı minify ediyor.

Sırada ne olabilir. AI görsel üretimi, Nostr yorumları, premium içerik için Lightning paywall, IPFS yedekleme ve dağıtım, takipsiz analytics ve sosyal medyaya otomatik cross-posting.

## Özet

Bu blog normal web'i (Hugo statik site), Web3 ödemelerini (Lightning Bitcoin), merkeziyetsiz sosyali (Nostr protokolü), e-postayla yazı yayınlamayı ve bir developer workflow'unu (GitHub CI/CD) bir araya getiriyor.

Hepsi self-hosted, gizliliğe saygılı ve açık kaynakla kuruldu. Tek bir kişinin tüm yayın altyapısına sahip olabileceğini ve yine de modern bir platformun rahatlığını ve bağlantılarını koruyabileceğini gösteriyor.

Canlı site [emino.app](https://emino.app). Lightning adresi emin@nuri.com. Nostr relay'i wss://relay.emino.app. Kod GitHub'da: [github.com/eminogrande/emino-blog](https://github.com/eminogrande/emino-blog).

Bu yazıyı, her şeyin nasıl kurulduğunu belgelemek için yazdım. Bunu okuyabiliyorsan, tüm sistemler çalışıyor demektir!
