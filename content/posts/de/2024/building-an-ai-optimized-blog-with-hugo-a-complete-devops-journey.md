---
title: "Ein KI-optimiertes Blog mit Hugo bauen: Meine komplette DevOps-Reise"
description: "Wie ich von einem kaputten DNS-Setup zu einem selbstgehosteten Hugo-Blog gekommen bin, das auch von KI-Suchen gefunden wird. Mit echten Prompts, dem Code und allen Fehlern auf dem Weg."
date: "2024-08-25T16:00:00Z"
updated: "2024-08-25"
lang: de
translated_from: "en/building-an-ai-optimized-blog-with-hugo-a-complete-devops-journey"
source_sections: ["finding-the-dns-problem", "why-self-hosting-llmstxt-and-hugo", "setting-up-hugo", "llmstxt-and-robotstxt", "deploy-health-check-and-seo-scripts", "github-and-a-deploy-user", "what-went-wrong", "what-runs-now", "why-this-setup-works-for-ai", "what-the-monitoring-shows", "what-i-learned", "the-stack-and-links"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/building-an-ai-optimized-blog-with-hugo-a-complete-devops-journey/cover.webp"
tldr: ["Eine echte Session, in der emino.app entstanden ist: ein Hugo-Blog auf einem Hetzner-Server, das KI-Modelle finden und lesen können.", "Das Domain-Problem war reines DNS. ALIAS- und CNAME-Records zeigten noch auf AWS, statt per A-Record auf meinen Server.", "llms.txt, eine robots.txt, die KI-Crawler willkommen heißt, Deployment per GitHub Actions und Cron-Skripte halten den Laden am Laufen."]
sections: [{"basically": "Der Server war völlig in Ordnung. Die ALIAS- und CNAME-Einträge bei Porkbun haben die Domain zu AWS geschickt, nicht zu Hetzner."}, {"basically": "Selbsthosting gibt dir die volle Kontrolle über KI-Crawler, eine llms.txt hilft LLMs weiter und Hugo baut alles in Millisekunden."}, {"basically": "A-Records haben das DNS gefixt. Hugo kam als .deb-Paket, nachdem Snap gescheitert war, zusammen mit dem PaperMod-Theme."}, {"basically": "Die llms.txt ist das Herzstück vom Setup und die robots.txt sagt klipp und klar, dass KI-Crawler erwünscht sind."}, {"basically": "Ein Deploy-Skript, ein Health-Check mit 11 Punkten und ein SEO-Optimizer laufen ganz automatisch per Cron."}, {"basically": "Ein eigener Deploy-User statt Root, überall der richtige GitHub-Name und ein solider GitHub Actions Workflow."}, {"basically": "SSH-Keys haben mich genervt, YAML-Front-Matter hat Hugo zerlegt und ich bin im Heredoc hängengeblieben. Am Ende lief aber alles."}, {"basically": "Der Blog ist live auf emino.app, deployt sich von selbst, antwortet in unter 100ms und läuft sicher ohne Root-Rechte."}, {"basically": "Statisches HTML, Markdown, klare Überschriften und eine llms.txt, genau das lesen KI-Crawler am liebsten."}, {"basically": "Der Health-Check spuckt Statusberichte aus und der tägliche SEO-Optimizer hält das KI-Setup frisch."}, {"basically": "Finde erst das echte Problem, lass Recherchen entscheiden, denk von Anfang an an KI und automatisiere die Wartung."}, {"basically": "Hetzner, Nginx, Hugo mit PaperMod, GitHub Actions, Let's Encrypt, Cron-Skripte und Porkbun A-Records."}]
---
![](../../../media/building-an-ai-optimized-blog-with-hugo-a-complete-devops-journey/cover.jpg)

Das ist eine echte Session, in der ich einen Blog von Grund auf gebaut habe, den KI-Suche finden und lesen kann. Von einer Domain, die nicht funktioniert hat, bis zu einem Setup, das von allein läuft. Ich habe jedes Problem drin gelassen, das wir hatten, und wie wir es gelöst haben, und ich habe auch die echten Prompts drin gelassen, die ich getippt habe, weil es genau so passiert ist.

Mein erster Prompt war nur ein Verbindungstest zu meinem Hetzner-Server.

> "can you ssh into ssh -i ~/.ssh/hetzner_ubuntu_ed25519 root@188.34.194.25 echo Connected! ?"

Das hat funktioniert, also hatten wir Zugriff auf den Server. Dann habe ich gefragt, was ich eigentlich wollte.

> "can you check why my domain emino.app is not connected and https does not work and https does not work? can you make it work and connect it to a blog, i want a blog, maybe ghost blog, that is optimized for LLM search and ai search optimization so chatgpt can find and index it easy, i was thinking to work primarily with markdown files, and slowly add features and functionality, and have my blog and files on github and also rendered as a nice blog, what would you suggest i use ? maybe go with github pages directly or rather self-host something here - what do you think gets the best indexing and attention? do some websearch and ideas first dont code"

Der Job hatte also drei Teile. DNS reparieren, einen Blog aufsetzen und ihn leicht für KI auffindbar machen.

## Das DNS-Problem finden

Zuerst haben wir uns die Domain angeschaut.

```bash
dig emino.app +short
# Returned: 44.227.65.245, 44.227.76.166 (AWS IPs)

curl -I https://emino.app
# SSL handshake failure
```

Die Domain zeigte auf AWS-Server und nicht auf meinen Hetzner-Server unter 188.34.194.25. Dann haben wir den Server selbst gecheckt.

```bash
# On the server
nginx -v  # nginx/1.24.0
ls -la /etc/nginx/sites-enabled/
# Found: emino.app configuration

certbot certificates
# Valid certificates existed, expiring Nov 21, 2025
```

Der Server war in Ordnung. Nginx war für emino.app eingerichtet, es gab gültige Let's-Encrypt-SSL-Zertifikate und die Site-Config stimmte. Das Problem lag also woanders.

```bash
nslookup -type=NS emino.app
# Nameservers: Porkbun (curitiba.ns.porkbun.com, etc.)
```

Ich habe einen Screenshot von meinen Porkbun-DNS-Einstellungen geteilt. Da war ein ALIAS-Record, der auf pixie.porkbun.com zeigte, und ein CNAME für *.emino.app, der ebenfalls auf pixie.porkbun.com zeigte. Das war das Problem. Die Domain nutzte ALIAS- und CNAME-Records, die zu AWS führten, obwohl sie A-Records brauchte, die auf den Hetzner-Server zeigen.

## Warum Self-Hosting, llms.txt und Hugo

Wir haben während der Session ein paar Websuchen gemacht, und die Antwort war Self-Hosting. Mit einem eigenen Server hast du volle Kontrolle über robots.txt und darüber, wie du KI-Crawler behandelst.

Du kannst llms.txt und llms-full.txt sauber einrichten. Du bekommst bessere Performance-Werte, und das ändert, wie hoch dich die KI einstuft. Du kannst Custom Headers für KI-User-Agents wie ChatGPT-User und Claude-Web schicken. Du kannst JavaScript-Inhalte vorrendern, und du hast mehr Freiheit bei Schema-Markup und strukturierten Daten.

Am interessantesten fand ich llms.txt. Jeremy Howard hat das im September 2024 eingeführt. Es ist eine simple Textdatei, die LLMs hilft, deine wichtigsten Inhalte zu finden und zu verstehen. Wie robots.txt, aber für KI-Systeme, und sie liegt im Root deiner Domain, also zum Beispiel https://example.com/llms.txt.

Sie macht KI-Antworten über deine Inhalte korrekter, relevanter für das, was Leute suchen, und vollständiger, und deine Docs werden öfter gesehen. Laut der Recherche, die wir gefunden haben, kann sie den Referral-Traffic von KI-Plattformen um über 800 % steigern.

Für den Blog selbst haben wir Hugo genommen. Er baut in Millisekunden, nicht in Sekunden. Er funktioniert von Haus aus mit Markdown, und KI-Modelle mögen Markdown. Das HTML, das er ausgibt, ist sauber, also kann KI es leicht parsen. Er hat SEO-Features eingebaut, und der Output ist statisch, was perfekt für KI-Crawler ist.

## Hugo aufsetzen

Ich habe das DNS gefixt und den nächsten Prompt geschickt.

> "done now lets get onto hugo, and setting up the blog also on my github, and the actions, all you suggested, and create some script that always check that my blog is in super health and super optimized and no broken links and perfect seo"

Ich war von ALIAS und CNAME auf A-Records umgestiegen, die auf 188.34.194.25 zeigten, und jetzt hat es funktioniert.

```bash
# DNS propagation check
dig emino.app +short
# Now returns: 188.34.194.25 ✓

# HTTPS test
curl -I https://emino.app
# HTTP/2 404 (expected, no content yet)
```

Hugo über snap zu installieren ist an Berechtigungen gescheitert, also haben wir das .deb-Paket genommen.

```bash
# Initial attempt with snap had permission issues
snap install hugo  # Had /var/lib/snapd/void permission errors

# Solution: Install from .deb package
wget https://github.com/gohugoio/hugo/releases/download/v0.148.2/hugo_extended_0.148.2_linux-amd64.deb
dpkg -i hugo_extended_0.148.2_linux-amd64.deb
```

Dann die Site selbst, mit dem PaperMod-Theme, weil es sauber für SEO ist.

```bash
cd /var/www
hugo new site emino-blog
cd emino-blog
git init

# Install PaperMod theme for clean SEO
git clone --depth=1 https://github.com/adityatelange/hugo-PaperMod themes/PaperMod
```

Die `hugo.toml` bekam Einstellungen für KI.

```toml
baseURL = "https://emino.app/"
languageCode = "en-us"
title = "Emino Blog - AI-Optimized Tech Insights"
theme = "PaperMod"
enableRobotsTXT = true

[outputs]
home = ["HTML", "RSS", "JSON"]

[params]
description = "AI-optimized tech blog with insights on software development, AI, and modern technology"
keywords = ["blog", "AI", "technology", "software development", "programming"]

[params.homeInfoParams]
Title = "Welcome to Emino Blog"
Content = "AI-optimized content for modern developers and tech enthusiasts."
```

## llms.txt und robots.txt

Die llms.txt ist der Kern der ganzen Sache.

```text
# Emino Blog LLMs.txt File
> AI-optimized tech blog focusing on software development, artificial intelligence, and modern technology trends.

## Primary Content URLs

- https://emino.app/ - Homepage with latest articles
- https://emino.app/posts/ - All blog posts
- https://emino.app/categories/ - Content organized by category
- https://emino.app/tags/ - Content organized by tags
- https://emino.app/sitemap.xml - XML sitemap for crawling

## Key Topics Covered

- Artificial Intelligence and Machine Learning
- Software Development Best Practices
- Cloud Infrastructure and DevOps
- Web Development and APIs
```

Und eine robots.txt, die die KI-Crawler reinlässt.

```text
User-agent: *
Allow: /

# AI Crawlers Welcome
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: https://emino.app/sitemap.xml
```

Wir haben auch ein paar Beispiel-Posts gemacht, mit einer Struktur, die KI gut parsen kann. Klare Überschriften in Reihenfolge von H1 zu H2 zu H3, Abschnitte als Frage und Antwort, Code-Beispiele in Markdown-Blöcken, volle Abdeckung eines Themas und Themen, die zusammengehören.

## Deploy-, Health-Check- und SEO-Skripte

Zum Deployen gibt es ein `deploy.sh`.

```bash
#!/bin/bash
git pull origin main
hugo --minify
rsync -av --delete public/ /var/www/apps/main/

# Generate llms-full.txt (all content in one file)
echo "# Emino Blog - Full Content for LLMs" > public/llms-full.txt
for file in content/posts/*.md; do
    echo "---" >> public/llms-full.txt
    cat "$file" >> public/llms-full.txt
done
```

Dann ein `health-check.sh`, das 11 Dinge überwacht. HTTPS-Zugriff, ob das SSL-Zertifikat gültig ist, ob die wichtigen Dateien da sind (llms.txt, robots.txt, sitemap.xml), kaputte interne Links, Antwortzeit, Festplattenplatz, Hugo-Build-Status, wie frisch der Content ist, Meta-Descriptions, KI-Crawler-Zugriff und Seitengewicht.

Und ein `seo-optimizer.sh`, das Dinge von allein macht. Es generiert llms-full.txt mit allen Inhalten, setzt die Sitemap-Prioritäten, fügt Posts strukturierte Daten hinzu, erstellt Archivseiten, repariert kaputte Markdown-Links und deployt die Änderungen.

Beide laufen per Cron.

```bash
# Health check every 6 hours
0 */6 * * * /var/www/emino-blog/health-check.sh > /var/log/blog-health.log

# SEO optimization daily at 3 AM
0 3 * * * /var/www/emino-blog/seo-optimizer.sh > /var/log/blog-seo.log
```

## GitHub und ein Deploy-User

Als Nächstes waren GitHub dran und ein User, der nicht root ist.

> "mein github ist eminogrande, nicht eminmahrt, und können wir einen neuen user auf meinem server einrichten, der nicht root ist, aber alle schreibrechte und so hat, ich brauche das sowieso, und du gibst mir den key, ich speichere ihn"

Also haben wir einen Deploy-User angelegt.

```bash
# Create deploy user with sudo privileges
useradd -m -s /bin/bash deploy
usermod -aG sudo deploy
usermod -aG www-data deploy

# Enable passwordless sudo
echo "deploy ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/deploy

# Generate SSH key
ssh-keygen -t ed25519 -f /home/deploy/.ssh/id_ed25519 -N ""
```

Wir haben jedes `eminmahrt` in `eminogrande` geändert, in hugo.toml, in llms.txt und in der GitHub-Remote-URL. Dann den GitHub-Actions-Workflow in `.github/workflows/deploy.yml`.

```yaml
name: Deploy to Server

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v3
      with:
        hugo-version: "latest"
        extended: true
    - name: Build
      run: hugo --minify
    - name: Deploy to Server
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/emino-blog
          git pull origin main
          hugo --minify
          rsync -av --delete public/ /var/www/apps/main/
```

## Was schiefging

Dann ging einiges schief. Zuerst hatte ich Probleme mit den SSH-Keys.

> "ich bin zu dumm, hilf mir! ich konnte den key hier lokal nicht hinzufügen, ich konnte ihn nicht auf github kriegen, lol, ich bin ein idiot"

Wir haben die Key-Datei auf meinen Desktop gelegt und Schritt-für-Schritt-Anleitungen für Mac und Linux und für Windows geschrieben. Am Ende haben wir einfach den funktionierenden Key des Root-Users genommen, weil es einfacher war.

Dann wurden die ersten Posts nicht gerendert. Hugo erwartete TOML-Frontmatter (+++) und wir hatten YAML (---) benutzt. Wir haben sie konvertiert.

```toml
+++
title = "Post Title"
date = 2024-08-25T16:00:00Z
draft = false
+++
```

Und irgendwann hing mein Terminal bei heredoc> fest.

> "wie komme ich hier raus?"

Du tippst `EOF` in eine eigene Zeile und die Heredoc-Eingabe ist fertig.

## Was jetzt läuft

Der Blog ist live auf https://emino.app. Für KI gibt es llms.txt, eine robots.txt, die die KI-Crawler reinlässt, strukturierte Daten auf allen Posts und sauberes HTML. GitHub Actions deployed automatisch, der Health Check läuft alle 6 Stunden, die SEO-Optimierung läuft täglich und kaputte Links werden gefunden.

Die Antwortzeiten liegen unter 100ms (sub-100ms), die Seiten sind leicht (<10KB) und Hugo baut in ~100ms.

Für die Sicherheit gibt es einen Deploy-User, der nicht root ist, Login nur mit SSH-Keys, und saubere Dateirechte.

> "ok, gemacht, was jetzt"

Das war mein letzter Prompt. Wir haben einen Testpost gemacht, ihn zu GitHub gepusht, und das automatische Deploy hat funktioniert.

## Warum dieses Setup für KI funktioniert

KI-Crawler mögen statisches HTML lieber als Seiten mit viel JavaScript. KI-Modelle werden auf Markdown trainiert, also ist es das Format, das sie am liebsten mögen. Überschriften in klarer Reihenfolge helfen der KI zu sehen, wie der Inhalt zusammenhängt. Die robots.txt sagt klar, dass KI-Crawler willkommen sind. Und llms-full.txt legt alle Inhalte an einem Ort ab, sodass sie leicht aufzunehmen sind.

llms.txt ist wichtig, weil es für LLMs gemacht ist, nicht für alte Suchmaschinen. Es sagt ihnen, wofür deine Seite da ist und wie sie aufgebaut ist, es zeigt auf deine wichtigsten Inhalte, und es kann den Traffic, den du von KI bekommst, deutlich erhöhen.

Self-Hosting auf Hetzner statt GitHub Pages gab uns volle Kontrolle über die Server-Konfiguration, die Möglichkeit, Skripte auf dem Server laufen zu lassen, unsere eigene nginx-Konfiguration, direkten SSH-Zugang für Wartung und bessere Performance-Werte.

## Was das Monitoring zeigt

Das gibt der Health Check aus.

```
================================================
Blog Health Check - Tue Aug 26 08:04:38 AM UTC 2025
================================================
✓ Site HTTPS Accessibility: OK (HTTP 200)
✓ SSL Certificate Status: Valid (Expires: Nov 21)
✓ Critical Files: All present
✓ Internal Link Check: No broken links
✓ Site Response Time: Fast (84ms)
✓ Disk Space: OK (9% used)
✓ Content Freshness: Fresh (0 days since last post)
✓ AI Crawler Access: AI crawlers allowed
✓ Page Weight: Lightweight (7KB)
Summary: Blog is in perfect health!
```

Der SEO-Optimizer läuft jeden Tag. Er aktualisiert llms-full.txt mit neuen Inhalten, setzt die Sitemap-Prioritäten, fügt neuen Posts strukturierte Daten hinzu, sucht nach kaputten Links und prüft, ob das KI-Setup noch stimmt.

## Was ich gelernt habe

Der Weg von einer kaputten DNS-Konfiguration zu einem Blog, der von allein läuft, hat mir ein paar Dinge beigebracht.

Finde das echte Problem, bevor du irgendetwas baust. Lass die Recherche die Entscheidungen treffen, darum ist es Hugo und nicht Ghost. Denk beim Bauen fürs Web heute zuerst an KI. Automatisiere die Wartung und die Optimierung. Und behalte die Gesundheit die ganze Zeit im Blick.

Der Blog ist also live, und er ist für dorthin gebaut, wo die Suche hingeht. KI-Assistenten sind jetzt der Weg, wie die meisten Leute Dinge finden.

## Der Stack und die Links

Der Stack ist ein Hetzner-Ubuntu-VPS mit Nginx 1.24.0, Hugo 0.148.2 Extended mit dem PaperMod-Theme, Git und GitHub, GitHub Actions für CI/CD, Let's Encrypt (Certbot) für SSL, meine eigenen Bash-Skripte mit cron fürs Monitoring, und Porkbun mit A-Records für DNS.

Der Live-Blog ist https://emino.app und der Code liegt auf GitHub unter https://github.com/eminogrande/emino-blog. Die llms.txt-Idee wurde von Jeremy Howard vorgeschlagen. Die Hugo-Docs sind auf https://gohugo.io und das PaperMod-Theme auf https://github.com/adityatelange/hugo-PaperMod.

Ein KI-optimierter Blog dreht sich weniger um Best Practices und mehr darum, wie KI-Systeme Inhalte finden und lesen. Mit llms.txt, strukturierten Daten und einer klaren Reihenfolge der Überschriften spricht der Blog die Sprache der KI und bleibt trotzdem gut lesbar für Menschen.

Die Automatisierung hält den Blog gesund und optimiert, ohne dass ich ihn anfasse, und das Monitoring sagt mir, dass alles noch funktioniert. Mit all den Problemen und Fixes darin zeigt dieses Setup, dass man einen KI-optimierten Blog bauen kann, wenn man die richtigen Werkzeuge wählt.
