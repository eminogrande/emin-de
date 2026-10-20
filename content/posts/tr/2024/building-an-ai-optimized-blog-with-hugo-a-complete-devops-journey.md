---
title: "Hugo ile AI için Optimize Bir Blog Kurmak, Tam Bir DevOps Yolculuğu"
description: "Bozuk bir DNS kurulumundan, AI aramasının bulabildiği kendi sunucumda çalışan bir Hugo bloguna nasıl geçtim. Gerçek promptlar, kodlar ve yoldaki her hata ile birlikte."
date: "2024-08-25T16:00:00Z"
updated: "2024-08-25"
lang: tr
translated_from: "en/building-an-ai-optimized-blog-with-hugo-a-complete-devops-journey"
source_sections: ["finding-the-dns-problem", "why-self-hosting-llmstxt-and-hugo", "setting-up-hugo", "llmstxt-and-robotstxt", "deploy-health-check-and-seo-scripts", "github-and-a-deploy-user", "what-went-wrong", "what-runs-now", "why-this-setup-works-for-ai", "what-the-monitoring-shows", "what-i-learned", "the-stack-and-links"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/building-an-ai-optimized-blog-with-hugo-a-complete-devops-journey/cover.webp"
tldr: ["emino.app'i kurduğum gerçek bir oturum. Hetzner sunucusunda bir Hugo blogu, AI araması onu bulup okuyabiliyor.", "Bozuk olan domaindi, DNS'ti yani. ALIAS ve CNAME kayıtları sunucum yerine AWS'ye yönleniyordu, A kayıtları olması gerekirken.", "llms.txt, AI tarayıcılarını karşılayan bir robots.txt, GitHub Actions deployları ve cron scriptleri her şeyi çalışır tutuyor."]
sections: [{"basically": "Sunucuda sorun yoktu. Porkbun'daki ALIAS ve CNAME kayıtları domaini AWS'ye gönderiyordu, benim Hetzner sunucuma değil."}, {"basically": "Kendi sunucunda barındırmak AI tarayıcıları üzerinde tam kontrol sağlıyor, llms.txt LLM'lere yardımcı oluyor ve Hugo milisaniyeler içinde derliyor."}, {"basically": "A kayıtları DNS'i düzeltti. Hugo, snap çalışmayınca .deb paketinden kuruldu, PaperMod temasıyla birlikte."}, {"basically": "llms.txt bu kurulumun kalbi, robots.txt ise AI tarayıcılarının hoş geldiğini açıkça söylüyor."}, {"basically": "Bir deploy scripti, 11 maddelik bir sağlık kontrolü ve bir SEO optimizasyon scripti cron ile kendi kendine çalışıyor."}, {"basically": "Root olmayan bir deploy kullanıcısı, her yerde doğru GitHub adı ve bir GitHub Actions workflow'u."}, {"basically": "SSH anahtarları beni yendi, YAML front matter Hugo'yu bozdu ve heredoc'un içinde sıkışıp kaldım. Hepsi düzeltildi."}, {"basically": "Blog emino.app'te yayında, kendi kendine deploy oluyor, 100ms'nin altında cevap veriyor ve root olmayan bir kullanıcı altında çalışıyor."}, {"basically": "Statik HTML, markdown, net başlıklar ve llms.txt, AI tarayıcılarının en iyi okuduğu şeyler."}, {"basically": "Sağlık kontrolü bir durum raporu yazdırıyor, günlük SEO optimizasyon scripti ise AI kurulumunu taze tutuyor."}, {"basically": "Önce gerçek sorunu bul, araştırmanın karar vermesine izin ver, önce AI'yi düşün ve bakımı otomatikleştir."}, {"basically": "Hetzner, Nginx, PaperMod'lu Hugo, GitHub Actions, Let's Encrypt, cron scriptleri ve Porkbun A kayıtları."}]
---
![](../../../media/building-an-ai-optimized-blog-with-hugo-a-complete-devops-journey/cover.jpg)

Bu yazı, yapay zeka arama motorlarının bulup okuyabileceği bir blogu sıfırdan kurduğumuz gerçek bir seansın hikayesi. Çalışmayan bir domainden, kendi kendine tıkır tıkır işleyen bir sisteme kadar her şeyi anlattım. Karşılaştığımız her problemi, bunları nasıl çözdüğümüzü ve yazdığım prompt'ların aynısını buraya koydum, çünkü her şey aynen böyle yaşandı.

İlk prompt'um Hetzner sunucuma basit bir bağlantı testiydi.

> "can you ssh into ssh -i ~/.ssh/hetzner_ubuntu_ed25519 root@188.34.194.25 echo Connected! ?"

İşe yaradı, yani sunucuya erişimimiz vardı. Sonra asıl istediğim şeyi sordum.

> "can you check why my domain emino.app is not connected and https does not work and https does not work? can you make it work and connect it to a blog, i want a blog, maybe ghost blog, that is optimized for LLM search and ai search optimization so chatgpt can find and index it easy, i was thinking to work primarily with markdown files, and slowly add features and functionality, and have my blog and files on github and also rendered as a nice blog, what would you suggest i use ? maybe go with github pages directly or rather self-host something here - what do you think gets the best indexing and attention? do some websearch and ideas first dont code"

İşin üç aşaması vardı. DNS'i düzeltmek, blogu kurmak ve yapay zekanın bulmasını kolaylaştırmak.

## DNS problemini bulmak

Önce domaine bir baktık.

```bash
dig emino.app +short
# Returned: 44.227.65.245, 44.227.76.166 (AWS IPs)

curl -I https://emino.app
# SSL handshake failure
```

Domain, 188.34.194.25 adresindeki benim Hetzner sunucum yerine AWS sunucularına işaret ediyordu. Sonra sunucunun içine baktık.

```bash
# On the server
nginx -v  # nginx/1.24.0
ls -la /etc/nginx/sites-enabled/
# Found: emino.app configuration

certbot certificates
# Valid certificates existed, expiring Nov 21, 2025
```

Sunucu tarafında her şey tamamdı. Nginx emino.app için hazırdı, Let's Encrypt SSL sertifikaları geçerliydi ve site ayarları doğruydu. Yani problem başka bir yerdeydi.

```bash
nslookup -type=NS emino.app
# Nameservers: Porkbun (curitiba.ns.porkbun.com, etc.)
```

Porkbun DNS ayarlarımın bir ekran görüntüsünü paylaştım. pixie.porkbun.com adresine giden bir ALIAS kaydı ve yine pixie.porkbun.com adresini gösteren *.emino.app için bir CNAME kaydı vardı. Mesele anlaşıldı. Hetzner sunucusunu gösteren A kayıtları olması gerekirken, domain AWS'ye giden ALIAS ve CNAME kayıtlarını kullanıyordu.

## Neden self-hosting, llms.txt ve Hugo?

Seans sırasında biraz araştırma yaptık ve çıkan sonuç self-hosting oldu. Kendi sunucun olunca robots.txt dosyasını ve yapay zeka botlarına nasıl davranacağını tamamen sen belirlersin.

llms.txt ve llms-full.txt dosyalarını adamakıllı yapılandırabilirsin. Performans skorların çok daha iyi olur, bu da yapay zekanın seni ne kadar üst sıralara koyacağını doğrudan etkiler. ChatGPT-User ve Claude-Web gibi yapay zeka user agent'larına özel başlıklar gönderebilirsin. JavaScript içerikleri önceden render edebilirsin ve schema markup ile yapılandırılmış veriler konusunda elin çok daha rahat olur.

Bana en ilginç gelen şey llms.txt oldu. Jeremy Howard bunu Eylül 2024'te ortaya attı. LLM'lerin en önemli içeriklerini bulmasını ve anlamasını sağlayan basit bir metin dosyası. Yapay zeka sistemleri için bir nevi robots.txt gibi düşünebilirsin. Doğrudan domaininin kök dizininde duruyor, yani mesela https://example.com/llms.txt gibi.

Yapay zekanın senin içeriğinle ilgili verdiği cevapların daha doğru, insanların aradığı şeyle daha alakalı ve daha eksiksiz olmasını sağlıyor. Dokümanların çok daha fazla öne çıkıyor. Baktığımız araştırmalara göre yapay zeka platformlarından gelen yönlendirme trafiğini yüzde 800'ün üzerinde artırabiliyor.

Blog altyapısı için de Hugo'yu seçtik. Saniyeler değil, milisaniyeler içinde derleniyor. Doğrudan markdown dosyalarıyla çalışıyor, yapay zeka modelleri de markdown'ı çok seviyor. Çıkardığı HTML tertemiz, bu yüzden yapay zeka içeriği kolayca tarayabiliyor. Dahili SEO özellikleri var ve çıktısı statik. Yapay zeka botları için biçilmiş kaftan.

## Hugo kurulumu

DNS'i düzelttim ve sonraki prompt'u yapıştırdım.

> "done now lets get onto hugo, and setting up the blog also on my github, and the actions, all you suggested, and create some script that always check that my blog is in super health and super optimized and no broken links and perfect seo"

ALIAS ve CNAME kayıtlarını bırakıp 188.34.194.25 adresine işaret eden A kayıtlarına geçmiştim ve artık çalışıyordu.

```bash
# DNS propagation check
dig emino.app +short
# Now returns: 188.34.194.25 ✓

# HTTPS test
curl -I https://emino.app
# HTTP/2 404 (expected, no content yet)
```

Hugo'yu snap ile kurmak izin hatalarına takıldı, biz de .deb paketini kullandık.

```bash
# Initial attempt with snap had permission issues
snap install hugo  # Had /var/lib/snapd/void permission errors

# Solution: Install from .deb package
wget https://github.com/gohugoio/hugo/releases/download/v0.148.2/hugo_extended_0.148.2_linux-amd64.deb
dpkg -i hugo_extended_0.148.2_linux-amd64.deb
```

Ardından siteyi oluşturduk. SEO tarafında çok sade ve temiz olduğu için PaperMod temasını tercih ettik.

```bash
cd /var/www
hugo new site emino-blog
cd emino-blog
git init

# Install PaperMod theme for clean SEO
git clone --depth=1 https://github.com/adityatelange/hugo-PaperMod themes/PaperMod
```

`hugo.toml` dosyasına yapay zekaya yönelik ayarları girdik.

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

## llms.txt ve robots.txt

Bütün bu işin kalbi llms.txt dosyası.

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

Yapay zeka botlarına kapıyı sonuna kadar açan bir robots.txt.

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

Ayrıca yapay zekanın rahatça tarayabileceği yapıda birkaç örnek yazı hazırladık. H1'den H2'ye ve H3'e giden net başlık hiyerarşisi, soru-cevap formatında bölümler, markdown blokları içinde kod örnekleri, konunun baştan sona eksiksiz işlenmesi ve birbirine bağlı konu grupları.

## Dağıtım, sağlık kontrolü ve SEO script'leri

Yayınlama işi için bir `deploy.sh` script'imiz var.

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

Ardından 11 ayrı noktayı kontrol eden bir `health-check.sh` yazdık. HTTPS erişimi, SSL sertifikasının geçerliliği, önemli dosyaların yerinde olup olmadığı (llms.txt, robots.txt, sitemap.xml), kırık iç linkler, yanıt süresi, disk alanı, Hugo build durumu, içeriğin güncelliği, meta açıklamaları, yapay zeka botlarının erişim durumu ve sayfa boyutu.

Bir de her şeyi kendi kendine halleden `seo-optimizer.sh` var. Bütün içeriği tek dosyada toplayan llms-full.txt'yi oluşturuyor, sitemap önceliklerini belirliyor, yazılara yapılandırılmış veriler ekliyor, arşiv sayfalarını hazırlıyor, kırık markdown linklerini düzeltiyor ve değişiklikleri yayına alıyor.

İkisini de cron ile otomatikleştirdik.

```bash
# Health check every 6 hours
0 */6 * * * /var/www/emino-blog/health-check.sh > /var/log/blog-health.log

# SEO optimization daily at 3 AM
0 3 * * * /var/www/emino-blog/seo-optimizer.sh > /var/log/blog-seo.log
```

## GitHub ve deploy kullanıcısı

Sıra GitHub’a ve root olmayan bir kullanıcıya gelmişti.

> "github kullanıcı adım eminogrande, eminmahrt değil. serverda root olmayan ama yazma yetkisi tam olan yeni bir kullanıcı kursak? zaten lazım olacak, sen key’i paylaş ben saklarım"

Biz de bir deploy kullanıcısı açtık.

```bash
# Sudo yetkili deploy kullanıcısını oluştur
useradd -m -s /bin/bash deploy
usermod -aG sudo deploy
usermod -aG www-data deploy

# Şifresiz sudo'yu aktif et
echo "deploy ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/deploy

# SSH key üret
ssh-keygen -t ed25519 -f /home/deploy/.ssh/id_ed25519 -N ""
```

hugo.toml, llms.txt ve GitHub remote URL içindeki her `eminmahrt` ifadesini `eminogrande` ile değiştirdik. Sonra da `.github/workflows/deploy.yml` içindeki GitHub Actions workflow’unu güncelledik.

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

## Ne ters gitti

Sonra işler karıştı. Önce SSH key’lerle uğraştım.

> "salak gibiyim yardım et! key’i burada yerel tarafa ekleyemedim, github’a da yükleyemedim, mallık bende lol"

Key dosyasını Masaüstü'ne attık, Mac, Linux ve Windows için adım adım talimat yazdık. En sonunda root kullanıcısının çalışan key’ini kullandık, çünkü daha kolaydı.

Sonra ilk post’lar render edilmedi. Hugo, TOML front matter (+++) bekliyormuş ama biz YAML (---) kullanmışız. Hepsini çevirdik.

```toml
+++
title = "Post Başlığı"
date = 2024-08-25T16:00:00Z
draft = false
+++
```

Bir noktada terminal `heredoc>` kısmında takılı kaldı.

> "buradan nasıl çıkarım?"

Tek başına bir satıra `EOF` yazarsın, heredoc girişi biter.

## Şu an ne çalışıyor

Blog https://emino.app adresinde yayında. AI için llms.txt var, AI tarayıcılarına izin veren bir robots.txt, tüm yazılarda structured data ve tertemiz bir HTML. GitHub Actions otomatik deploy yapıyor, sağlık kontrolü 6 saatte bir çalışıyor, SEO optimizasyonu her gün devreye giriyor ve bozuk linkler hemen bulunuyor.

Response süresi 100ms’nin altında, sayfalar hafif (<10KB) ve Hugo build süresi ~100ms.

Güvenlik için root olmayan bir deploy kullanıcımız var, giriş sadece SSH key ile ve dosya izinleri olması gerektiği gibi.

> "tamamdır yaptım, şimdi ne olacak"

Bu benim son mesajımdı. Test amaçlı bir yazı oluşturduk, GitHub’a pushladık ve otomatik deploy tıkır tıkır çalıştı.

## Bu kurulum AI için neden iyi

AI tarayıcıları, JavaScript yükü ağır olan sitelerden ziyade statik HTML’i sever. AI modelleri markdown ile eğitildiği için format olarak en çok bunu tercih ediyorlar. Başlıkların düzgün bir hiyerarşide olması, içeriğin nasıl bir bütün oluşturduğunu AI’ın anlamasını kolaylaştırıyor. robots.txt ise AI tarayıcılarına kapımızın açık olduğunu net bir şekilde söylüyor. llms-full.txt de tüm içeriği tek bir yere topladığı için veriyi çekip işlemek çok basit.

llms.txt olayı önemli çünkü bu dosya eski tip arama motorları için değil, doğrudan LLM’ler için yapıldı. Onlara sitenin ne işe yaradığını, nasıl inşa edildiğini anlatıyor, en önemli içeriklerine yol gösteriyor ve AI üzerinden gelen trafiği ciddi oranda artırabiliyor.

GitHub Pages yerine Hetzner’da self-hosting yapmak, server konfigürasyonu üzerinde tam hakimiyet sağladı. Server’da script çalıştırma, kendi nginx ayarlarımızı yapma, bakım için doğrudan SSH erişimi ve çok daha iyi performans değerleri elimizin altında.

## Monitoring ne gösteriyor

Sağlık kontrolü her seferinde bunu basıyor.

```
================================================
Blog Sağlık Kontrolü - Sal Ağu 26 08:04:38 AM UTC 2025
================================================
✓ Site HTTPS Erişimi: OK (HTTP 200)
✓ SSL Sertifika Durumu: Geçerli (Bitiş: 21 Kas)
✓ Kritik Dosyalar: Hepsi yerinde
✓ Dahili Link Kontrolü: Bozuk link yok
✓ Site Response Süresi: Hızlı (84ms)
✓ Disk Alanı: OK (%9 dolu)
✓ İçerik Tazeliği: Taze (son yazıdan 0 gün geçti)
✓ AI Tarayıcı Erişimi: AI tarayıcılarına izinli
✓ Sayfa Ağırlığı: Hafif (7KB)
Özet: Blog gayet sağlıklı!
```

SEO optimize edicisi her gün çalışıyor. llms-full.txt’yi yeni içeriklerle güncelliyor, sitemap önceliklerini ayarlıyor, yeni yazılara structured data ekliyor, bozuk link tarıyor ve AI kurulumunun hala düzgün olup olmadığını kontrol ediyor.

## Ne öğrendim

DNS ayarları bozuk bir sistemden kendi kendine yürüyen bir bloga geçiş süreci bana çok şey öğretti.

Bir şey inşa etmeden önce asıl sorunu bul. Araştırmanın kararlarına yön vermesine izin ver, Hugo’yu seçip Ghost’u seçmememizin sebebi bu. Artık web için bir şey yaparken önce AI’ı düşün. Bakımı ve optimizasyonu otomatiğe bağla. Ve sağlığı sürekli izle.

Sonuç olarak blog yayında ve aramanın gittiği yöne göre inşa edildi. Artık insanlar aradıklarını çoğunlukla AI asistanları üzerinden buluyor.

## Stack ve linkler

Stack şöyle: Hetzner Ubuntu VPS üzerinde Nginx 1.24.0, PaperMod temalı Hugo 0.148.2 Extended, Git ve GitHub, CI/CD için GitHub Actions, SSL için Let's Encrypt (Certbot), monitoring için cron ile kendi yazdığım bash script’ler ve DNS için A kayıtlarıyla Porkbun.

Canlı blog https://emino.app, kodlar ise GitHub’da https://github.com/eminogrande/emino-blog adresinde. llms.txt fikri Jeremy Howard tarafından ortaya atıldı. Hugo dokümanları https://gohugo.io adresinde, PaperMod teması ise https://github.com/adityatelange/hugo-PaperMod adresinde.

AI-optimize bir blog, "best practice"lerden ziyade AI sistemlerinin içeriği nasıl bulup okuduğuyla ilgili. llms.txt, structured data ve net başlık hiyerarşisiyle blog, AI’ın dilinden anlıyor ama insanlar için de hala çok okunabilir.

Otomasyon, ben hiçbir şeye dokunmadan blogu sağlıklı ve optimize tutuyor, monitoring ise her şeyin yolunda olduğunu bana haber veriyor. Yaşanan onca soruna ve çözüme rağmen, doğru araçları seçerseniz böyle bir AI-optimize blog kurabileceğinizi görmüş olduk.
