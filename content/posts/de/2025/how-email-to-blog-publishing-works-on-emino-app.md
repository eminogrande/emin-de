---
title: "Wie das E-Mail-zu-Blog-Publishing auf emino.app funktioniert"
description: "Wie aus einer E-Mail an post@emino.app ein Beitrag auf meinem Blog wird, mit DNS, TLS, Postfix, Dovecot und dem Importer, der das Markdown schreibt."
date: "2025-12-02T09:10:01Z"
updated: "2025-12-02"
lang: de
translated_from: "en/how-email-to-blog-publishing-works-on-emino-app"
source_sections: ["the-short-version", "what-the-importer-does", "setting-it-up", "monitoring-and-fixing-it"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/how-email-to-blog-publishing-works-on-emino-app/cover.webp"
tldr: ["E-Mails an post@emino.app landen in Postfix, liegen in einem Maildir und werden von einem Importer gelesen.", "Der Importer prüft den Absender gegen eine Allowlist, wandelt die Mail in Markdown um und stößt den Build an.", "Ein Let's-Encrypt-Zertifikat deckt Nginx, Postfix und Dovecot ab, und certbot erneuert es."]
sections: [{"basically": "DNS, ein TLS-Zertifikat, Postfix für den Empfang, Dovecot für IMAP, ein Importer und Nginx, das das statische Blog ausliefert."}, {"basically": "Absender von der Allowlist rein, Betreff wird Titel, Body wird Markdown, dann Build und Deploy."}, {"basically": "Acht Schritte von den DNS-Records bis zu Nginx, mit jedem Befehl, den du zum Nachbauen brauchst."}, {"basically": "Behalte die Zertifikatslaufzeit und die Logs im Auge und schick dir ab und zu selbst eine Testmail."}]
---
Das ist der komplette technische Weg von einer E-Mail an post@emino.app bis zum veröffentlichten Post auf meinem Blog. Es geht um DNS und TLS, SMTP und IMAP, ums Filtern und Validieren und darum, was der Importer im Inneren macht. Das Flussdiagramm am Ende zeigt jetzt auch die Absender-Checks und das Parsen.

## Die kurze Version

Hier die kurze Version. DNS hat einen A-Record für emino.app, der auf 188.34.194.25 zeigt, und einen MX-Record 0 emino.app.

TLS ist ein Let's-Encrypt-Zertifikat in /etc/letsencrypt/live/emino.app/, und Nginx, Postfix (für STARTTLS) und Dovecot (für IMAPS) nutzen es alle. certbot.timer erneuert es automatisch.

Mails kommen über Postfix auf Port 25 rein, und die virtuelle Mailbox post@emino.app landet im Maildir /var/mail/vhosts/emino.app/post/. Dovecot läuft auf Port 993 mit demselben Let's-Encrypt-Zertifikat, sodass der Importer oder ein normaler Mail-Client die Mails über IMAP lesen kann. Die ufw-Firewall hat 22, 80, 443 und 25 offen, und 993 nur, wenn du IMAP-Zugriff brauchst.

Der Importer pollt das Maildir oder IMAP, prüft den Absender, parst und bereinigt die Mail, wandelt sie in Markdown um, schreibt sie nach posts/ (oder in welchen Content-Ordner du auch immer nutzt) und stößt Build und Deploy an. Und Nginx serviert das statische Blog über HTTPS.

## Was der Importer macht

Der Importer läuft über einen Timer, einen systemd-Timer oder Cron, oder als Watcher, der einfach weiterläuft. Er liest new/ und cur/ im Maildir oder die IMAP-Inbox.

Er prüft den From-Header gegen eine Allowlist, zum Beispiel deine eigenen Adressen, und unbekannte Absender werden übersprungen und geloggt. Der Betreff wird zum Titel und zum Slug, und der Body wird zum Markdown-Body. Anhänge können ignoriert oder gespeichert werden, und wenn das an ist, behält er nur Text- und Bildtypen.

Dann räumt er auf. Er entfernt gefährliches HTML, normalisiert Encodings und kann auf Wunsch auch Links und Emoji aufräumen. Er baut das Front Matter mit Titel, Datum, Tags und Autor, setzt den Markdown-Body darunter und speichert die Datei in content/posts/ oder in welchem Pfad du auch immer gesetzt hast. Nachdem er die Datei geschrieben hat, kann er einen Build- und Deploy-Hook ausführen, etwa den Static Site Generator oder einen Cache-Refresh.

Er loggt in eine eigene Datei, und wenn etwas schiefgeht, sollte er es loggen und die Nachricht im Maildir lassen, damit er es nochmal versuchen kann.

## Einrichtung

1. DNS. `A emino.app 188.34.194.25` und `MX 0 emino.app.`
2. TLS. Führe `certbot --nginx -d emino.app -d www.emino.app --redirect` aus und prüfe den Timer mit `systemctl list-timers | grep certbot`.
3. Postfix mit virtueller Mailbox. Trage `post@emino.app emino.app/post/` in /etc/postfix/vmailbox ein, dann führe `postmap /etc/postfix/vmailbox`, `postconf -e "virtual_mailbox_domains=emino.app"` und `postconf -e "virtual_mailbox_maps=hash:/etc/postfix/vmailbox"` aus. Für TLS führe `postconf -e "smtpd_tls_cert_file=/etc/letsencrypt/live/emino.app/fullchain.pem"`, `postconf -e "smtpd_tls_key_file=/etc/letsencrypt/live/emino.app/privkey.pem"` und `systemctl reload postfix` aus.
4. Dovecot für IMAP und IMAPS. Setze in /etc/dovecot/conf.d/10-ssl.conf `ssl_cert = </etc/letsencrypt/live/emino.app/fullchain.pem` und `ssl_key  = </etc/letsencrypt/live/emino.app/privkey.pem`, dann führe `systemctl reload dovecot` aus.
5. Maildir-Berechtigungen. /var/mail/vhosts/emino.app/post/ gehört vmail:vmail, mit den Modi 700 und 600.
6. Firewall mit ufw. `ufw allow 25/tcp`, `ufw allow 993/tcp`, wenn du IMAP-Zugriff brauchst, und `ufw allow 80,443/tcp`.
7. Der Importer-Job. Er liest aus dem Maildir oder IMAP für post@emino.app, akzeptiert nur Absenderadressen auf der Allowlist und schreibt Posts in deinen Blog-Content-Pfad, etwa content/posts/ oder posts/. Lass ihn mit einem systemd-Timer oder Cron laufen, logge in eine eigene Datei und stoße Build und Deploy an, wenn du es brauchst.
8. Nginx. Port 80 macht return 301 https://$host$request_uri; und Port 443 nutzt die Let's-Encrypt-Zertifikatspfade, mit dem Root auf deinem Blog-Ordner, und serviert die statische Seite.

## Monitoring und Fehlerbehebung

Um ein Auge darauf zu haben, prüfe, wann das Zertifikat abläuft, mit `openssl x509 -in /etc/letsencrypt/live/emino.app/fullchain.pem -noout -enddate`.

Der Mailfluss von Postfix und Dovecot steht in /var/log/mail.log. Der Importer hat sein eigenes Log, und du willst einen Alert, wenn er fehlschlägt. Wenn die Erneuerungen zicken, schau in `journalctl -u certbot`. Und als Health-Check schick ab und zu eine Testmail an post@emino.app und schau, dass die Datei im Maildir landet und der Importer sie veröffentlicht.

Die meisten Dinge, die kaputtgehen, sind simpel. Ein abgelaufenes Zertifikat wird über die Nginx-HTTP-Challenge und certbot.timer gehandhabt, was schon eingerichtet ist. Wenn Port 25 blockiert ist, öffnest du ihn in ufw, und das war's.

Wenn der Importer down ist, prüfe, ob der Timer oder Service aktiv ist, und schau in die Logs. Bei den Maildir-Berechtigungen behalte den vmail-Besitz und die Modi 700 und 600 bei. Und eine E-Mail von einem unbekannten Absender wird einfach übersprungen, also füge die Adresse zur Allowlist hinzu, wenn du sie willst.

Das ist das komplette E-Mail-zu-Blog-Setup auf emino.app, von DNS und TLS über SMTP, IMAP und den Absender-Check bis zum Markdown und dem veröffentlichten Post, und du kannst es allein daraus wieder aufsetzen.

![sequenceDiagram_2025-12-02T09-05-40](../../../media/how-email-to-blog-publishing-works-on-emino-app/sequenceDiagram_2025-12-02T09-05-40.svg)
