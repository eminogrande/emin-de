---
title: "Building an AI-Optimized Blog with Hugo, a Complete DevOps Journey"
description: "How I went from a broken DNS setup to a self-hosted Hugo blog that AI search can find, with the real prompts, the code and every mistake on the way."
date: "2024-08-25T16:00:00Z"
updated: "2024-08-25T16:00:00Z"
lang: "en"
category: "building"
format: "guide"
author: "ai-desk"
provenance: "ai_generated"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/building-an-ai-optimized-blog-with-hugo-a-complete-devops-journey/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 238
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/building-ai-optimized-blog-complete-guide/"
---
![](../../../media/building-an-ai-optimized-blog-with-hugo-a-complete-devops-journey/cover.jpg)

This is one real session of building a blog from scratch that AI search can find and read. From a domain that didn't work to a setup that runs by itself. I kept every problem we hit and how we solved it, and I also kept the actual prompts I typed, because that is how it really happened.

My first prompt was just a connection test to my Hetzner server.

> "can you ssh into ssh -i ~/.ssh/hetzner_ubuntu_ed25519 root@188.34.194.25 echo Connected! ?"

That worked, so we had access to the server. Then I asked for what I actually wanted.

> "can you check why my domain emino.app is not connected and https does not work and https does not work? can you make it work and connect it to a blog, i want a blog, maybe ghost blog, that is optimized for LLM search and ai search optimization so chatgpt can find and index it easy, i was thinking to work primarily with markdown files, and slowly add features and functionality, and have my blog and files on github and also rendered as a nice blog, what would you suggest i use ? maybe go with github pages directly or rather self-host something here - what do you think gets the best indexing and attention? do some websearch and ideas first dont code"

So the job had three parts. Fix the DNS, set up a blog, and make it easy for AI to find.

First we looked at the domain.

```bash
dig emino.app +short
# Returned: 44.227.65.245, 44.227.76.166 (AWS IPs)

curl -I https://emino.app
# SSL handshake failure
```

The domain pointed to AWS servers and not to my Hetzner server at 188.34.194.25. Then we checked the server itself.

```bash
# On the server
nginx -v  # nginx/1.24.0
ls -la /etc/nginx/sites-enabled/
# Found: emino.app configuration

certbot certificates
# Valid certificates existed, expiring Nov 21, 2025
```

The server was fine. Nginx was set up for emino.app, there were valid Let's Encrypt SSL certificates and the site config was right. So the problem was somewhere else.

```bash
nslookup -type=NS emino.app
# Nameservers: Porkbun (curitiba.ns.porkbun.com, etc.)
```

I shared a screenshot of my Porkbun DNS settings. There was an ALIAS record pointing to pixie.porkbun.com, and a CNAME for *.emino.app also pointing to pixie.porkbun.com. That was the issue. The domain used ALIAS and CNAME records that went to AWS, when it needed A records pointing to the Hetzner server.

We did some web searches during the session, and the answer was self-hosting. With your own server you get full control over robots.txt and how you treat AI crawlers.

You can set up llms.txt and llms-full.txt properly. You get better performance numbers, and that changes how high AI puts you. You can send custom headers for AI user agents like ChatGPT-User and Claude-Web. You can pre-render JavaScript content, and you have more freedom for schema markup and structured data.

The thing I found most interesting was llms.txt. Jeremy Howard introduced it in September 2024. It's a simple text file that helps LLMs find and understand your most important content. Like robots.txt, but for AI systems, and it sits at the root of your domain, so for example https://example.com/llms.txt.

It makes AI answers about your content more correct, more relevant to what people search, and more complete, and your docs get seen more. Per the research we found it can raise referral traffic from AI platforms by 800%+.

For the blog itself we picked Hugo. It builds in milliseconds, not seconds. It works with markdown out of the box, and AI models like markdown. The HTML it puts out is clean, so AI can parse it easily. It has SEO features built in, and the output is static, which is perfect for AI crawlers.

I fixed the DNS and sent the next prompt.

> "done now lets get onto hugo, and setting up the blog also on my github, and the actions, all you suggested, and create some script that always check that my blog is in super health and super optimized and no broken links and perfect seo"

I had switched from ALIAS and CNAME to A records pointing to 188.34.194.25, and now it worked.

```bash
# DNS propagation check
dig emino.app +short
# Now returns: 188.34.194.25 ✓

# HTTPS test
curl -I https://emino.app
# HTTP/2 404 (expected, no content yet)
```

Installing Hugo with snap failed on permissions, so we used the .deb package.

```bash
# Initial attempt with snap had permission issues
snap install hugo  # Had /var/lib/snapd/void permission errors

# Solution: Install from .deb package
wget https://github.com/gohugoio/hugo/releases/download/v0.148.2/hugo_extended_0.148.2_linux-amd64.deb
dpkg -i hugo_extended_0.148.2_linux-amd64.deb
```

Then the site itself, with the PaperMod theme because it's clean for SEO.

```bash
cd /var/www
hugo new site emino-blog
cd emino-blog
git init

# Install PaperMod theme for clean SEO
git clone --depth=1 https://github.com/adityatelange/hugo-PaperMod themes/PaperMod
```

The `hugo.toml` got settings for AI.

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

The llms.txt is the core of the whole thing.

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

And a robots.txt that lets the AI crawlers in.

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

We also made some sample posts with a structure AI can parse well. Clear headings in order from H1 to H2 to H3, sections as question and answer, code examples in markdown blocks, full coverage of a topic, and topics grouped together.

For deploying there is a `deploy.sh`.

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

Then a `health-check.sh` that watches 11 things. HTTPS access, whether the SSL certificate is valid, whether the important files are there (llms.txt, robots.txt, sitemap.xml), broken internal links, response time, disk space, Hugo build status, how fresh the content is, meta descriptions, AI crawler access and page weight.

And a `seo-optimizer.sh` that does things by itself. It generates llms-full.txt with all content, sets the sitemap priorities, adds structured data to posts, creates archive pages, fixes broken markdown links and deploys the changes.

Both run with cron.

```bash
# Health check every 6 hours
0 */6 * * * /var/www/emino-blog/health-check.sh > /var/log/blog-health.log

# SEO optimization daily at 3 AM
0 3 * * * /var/www/emino-blog/seo-optimizer.sh > /var/log/blog-seo.log
```

Next was GitHub and a user that isn't root.

> "my github is eminogrande not eminmahrt and can we setup a new user that is not root on my server but has all writing rights and so on, i need it anyway, and you share the key with me i store it"

So we made a deploy user.

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

We changed every `eminmahrt` to `eminogrande` in hugo.toml, in llms.txt and in the GitHub remote URL. Then the GitHub Actions workflow in `.github/workflows/deploy.yml`.

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

Then things went wrong. First I had problems with the SSH keys.

> "i am too stupid help me! i couldnt add the key here locally, i couldnt get it on github lol i am an idiot"

We put the key file on my Desktop and wrote step by step instructions for Mac and Linux and for Windows. In the end we just used the working key of the root user, because it was simpler.

Then the first posts didn't render. Hugo expected TOML front matter (+++) and we had used YAML (---). We converted them.

```toml
+++
title = "Post Title"
date = 2024-08-25T16:00:00Z
draft = false
+++
```

And at one point my terminal was stuck at heredoc>.

> "how do i get out here?"

You type `EOF` on its own line and the heredoc input is done.

The blog is live at https://emino.app. For AI there is llms.txt, a robots.txt that lets the AI crawlers in, structured data on all posts and clean HTML. GitHub Actions deploys automatically, the health check runs every 6 hours, the SEO optimization runs daily and broken links get found.

Response times are under 100ms (sub-100ms), pages are light (<10KB) and Hugo builds in ~100ms.

For security there is a deploy user that is not root, login only with SSH keys, and proper file permissions.

> "ok did it what now"

That was my last prompt. We made a test post, pushed it to GitHub, and the automatic deploy worked.

AI crawlers like static HTML more than sites heavy on JavaScript. AI models are trained on markdown, so it's the format they like best. Headings in a clear order help AI see how the content fits together. The robots.txt says clearly that AI crawlers are welcome. And llms-full.txt puts all content in one place, so it's easy to take in.

llms.txt matters because it's made for LLMs, not for old search engines. It tells them what your site is for and how it's built, it points to your most important content, and it can raise the traffic you get from AI by a lot.

Self-hosting on Hetzner instead of GitHub Pages gave us full control over the server config, the option to run scripts on the server, our own nginx config, direct SSH access for maintenance and better performance numbers.

This is what the health check prints.

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

The SEO optimizer runs every day. It updates llms-full.txt with new content, sets the sitemap priorities, adds structured data to new posts, looks for broken links and checks that the AI setup is still right.

Going from a broken DNS config to a blog that runs by itself taught me a few things.

Find the real problem before you build anything. Let research make the decisions, which is why it's Hugo and not Ghost. Think about AI first when you build for the web now. Automate the maintenance and the optimizing. And watch the health all the time.

So the blog is live, and it's built for where search is going. AI assistants are how most people find things now.

The stack is a Hetzner Ubuntu VPS with Nginx 1.24.0, Hugo 0.148.2 Extended with the PaperMod theme, Git and GitHub, GitHub Actions for CI/CD, Let's Encrypt (Certbot) for SSL, my own bash scripts with cron for monitoring, and Porkbun with A records for DNS.

The live blog is https://emino.app and the code is on GitHub at https://github.com/eminogrande/emino-blog. The llms.txt idea was proposed by Jeremy Howard. Hugo docs are at https://gohugo.io and the PaperMod theme is at https://github.com/adityatelange/hugo-PaperMod.

An AI-optimized blog is less about best practices and more about how AI systems find and read content. With llms.txt, structured data and a clear order of headings, the blog speaks the language of AI and is still good to read for people.

The automation keeps the blog healthy and optimized without me touching it, and the monitoring tells me everything still works. With all the problems and fixes in it, this setup shows you can build an AI-optimized blog if you pick the right tools.
