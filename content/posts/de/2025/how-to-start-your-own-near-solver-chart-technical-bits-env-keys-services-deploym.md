---
title: "Wie du deinen eigenen Near-Solver startest: Diagramm, technische Details (Env, Keys, Services, Deployment)"
description: "Wie mein Near-Intents-Solver auf emino.app funktioniert, was jeder Service macht und wie du deinen eigenen mit Env, Keys, pm2 und Nginx aufsetzt."
date: "2025-12-02T08:55:02Z"
updated: "2025-12-02"
lang: de
translated_from: "en/how-to-start-your-own-near-solver-chart-technical-bits-env-keys-services-deploym"
source_sections: ["what-the-solver-is-and-why-it-exists", "from-the-browser-to-the-solver", "the-solver-process", "the-services", "the-systems-around-it", "how-to-start-your-own-solver-step-by-step", "security-and-running-it"]
category: building
format: guide
author: ai-desk
provenance: ai_generated
ai_assisted: true
reviewed_by_human: false
image: "/media/how-to-start-your-own-near-solver-chart-technical-bits-env-keys-services-deploym/cover.webp"
tldr: ["Ein Near-Intents-Solver beobachtet Intents, bepreist einen Zwei-Token-AMM-Pool mit einer Marge und führt profitable Swaps von seinem eigenen NEAR-Account aus.", "Meiner läuft unter pm2 auf 127.0.0.1:4010 hinter Nginx, mit einer /status-JSON-API und einem /dashboard.", "Um deinen eigenen zu betreiben, brauchst du Node.js 20+, einen dedizierten NEAR-Account mit einem Full-Access-Key und einem Relay-Auth-Key."]
sections: [{"basically": "Ein Solver ist ein Market Maker für Near Intents. Er bepreist einen AMM-Pool und führt die profitablen Swaps aus."}, {"basically": "Nginx terminiert TLS und leitet /solver/ und /status an den Solver auf Port 4010 weiter."}, {"basically": "Eine Node.js-App unter pm2 lädt ihre Env, validiert sie mit Joi und erstellt dann alle Services."}, {"basically": "Sieben Services kümmern sich um NEAR, Intents, Quotes, Cache, den Relay-WebSocket, einen Cron-Refresh und HTTP."}, {"basically": "Der Solver hängt vom Relay, NEAR-RPC-Nodes, dem Intents-Contract und einer Off-Chain-Bridge ab."}, {"basically": "Hol dir einen dedizierten Account und Keys, klone das Repo, fülle env/.env.local aus, starte ihn, dann pm2 und Nginx dazu."}, {"basically": "Dedizierter Account, nur die Liquidität, die du verlieren kannst, pm2-Logs und /status im Auge behalten, bei Upgrades neu starten."}]
---
## Was der Solver ist und warum es ihn gibt

Mit dem Near-Intents-Protokoll können Nutzer sagen: „Ich will X gegen Y tauschen, unter den Bedingungen Z“, und das ist ein Intent. Ein Solver, also diese App, beobachtet diese Intents und tritt als Market Maker auf. Er behält einen On-Chain-AMM-Pool mit den Reserven für zwei NEP-141-Token im Blick, berechnet Preise plus eine Marge für dieses Paar, und wenn ein Intent mit deiner Marge profitabel ist, führt er den Swap über deinen NEAR-Account aus. Der Solver hat außerdem eine HTTP-Status-API unter /status und ein Dashboard unter /dashboard, das Health, Reserven, Quotes, Intents und Balances anzeigt.

Meine Instanz läuft gerade als pm2-Prozess near-solver und lauscht auf 127.0.0.1:4010. Du erreichst sie unter https://emino.app/status für das JSON-Health und unter https://emino.app/solver/ für das Dashboard. Wenn da ready:true und ws_connected:true steht, ist der Solver live und verarbeitet Relay-Traffic.

## Vom Browser zum Solver

Ein Nutzer öffnet https://emino.app/solver/ im Browser. Der Nginx-Vhost für emino.app terminiert TLS mit einem Let's-Encrypt-Zertifikat und hat zwei Locations. /solver/ geht per proxy_pass an http://127.0.0.1:4010/dashboard und /status an http://127.0.0.1:4010/status. Der Browser lädt das HTML-Dashboard von /dashboard, und das Inline-JS ruft sofort /status auf und pollt es dann alle paar Sekunden für Live-Daten. Der HttpService im Solver baut das Payload für /status und rendert das Dashboard-Template für /dashboard.

## Der Solver-Prozess

Es ist Node.js und läuft unter pm2. Ich starte es ungefähr so.

    NODE_ENV=local pm2 start "npm start" --name near-solver

Und npm start führt aus

    node -r tsconfig-paths/register -r ts-node/register src/main.ts

Das sind die wichtigen Dateien. src/main.ts ruft loadEnv() aus src/utils/load-env.ts auf und dann require('./app').app(). src/utils/load-env.ts ruft dotenv.config mit dem Pfad ./env/.env.local auf, weil NODE_ENV=local ist. Es validiert process.env gegen ein Joi-Schema in src/configs/env.validation.ts, wirft einen Fehler, wenn etwas Pflichtiges fehlt oder ungültig ist, und kopiert die validierten Werte zurück in process.env. Und src/app.ts erstellt die Services.

    const cacheService   = new CacheService();
    const nearService    = new NearService(); await nearService.init();
    const intentsService = new IntentsService(nearService);
    const quoterService  = new QuoterService(cacheService, nearService, intentsService);
    await quoterService.updateCurrentState();
    const cronService    = new CronService(quoterService); cronService.start();
    const websocketSvc   = new WebsocketConnectionService(quoterService, cacheService); websocketSvc.start();
    const httpService    = new HttpService(cacheService, quoterService, nearService); httpService.start();

Damit hast du eine aktive NEAR-Verbindung, AMM-Pricing und State, einen WebSocket-Stream vom Solver-Relay, ein regelmäßiges State-Refresh und die HTTP-API.

## Die Services

NearService nutzt near-api-js, um die Verbindungen aufzubauen. Das Netzwerk kommt aus NEAR_NETWORK_ID, also mainnet oder testnet. Die Node-URLs kommen aus NEAR_NODE_URLS oder NEAR_NODE_URL, und wenn du nichts setzt, nimmt er die Defaults, https://free.rpc.fastnear.com und https://near.lava.build fürs Mainnet, und https://test.rpc.fastnear.com und https://neart.lava.build fürs Testnet. Er lädt die Identität des Solvers aus dem Env. NEAR_ACCOUNT_ID ist dein Solver-Account, zum Beispiel my-solver.near, und NEAR_PRIVATE_KEY ist ein ed25519:...-Key-String für diesen Account. Er hat außerdem Helper. getBalance() zeigt, wie viel NEAR der Solver für Gas und Liquidität hält, und die anderen machen View-Calls und schicken signierte Transaktionen an NEAR-Contracts.

IntentsService kapselt die API des Intents-Contracts, das INTENTS_CONTRACT-Env, falls du es nutzt. Damit liest der Solver Pool-Daten und Reserven und arbeitet mit Intents, zum Beispiel der Settlement-Logik.

QuoterService kennt die beiden Token-IDs aus AMM_TOKEN1_ID und AMM_TOKEN2_ID und die Marge, die du willst, MARGIN_PERCENT, wobei 0.3 für 0,3 % steht. Er hält einen internen Snapshot vom State, also die Reserven für jeden NEP-141-Token und alle anderen AMM-Parameter, die er braucht. updateCurrentState() holt den frischen On-Chain-Pool-State über NearService und IntentsService, und andere Methoden werden von WebSocket-Events aufgerufen, um den State für neue Quotes und Intents anzupassen. Der Quoter entscheidet, ob es sich lohnt, einen Intent mit deinem aktuellen Pool und deiner Marge auszuführen.

CacheService ist ein In-Memory-Key-Value-Cache. Die Keys, die du sehen wirst, sind ws_connected, ein Boolean, ws_last_event_at, der Timestamp des letzten Relay-Events, reserves, die aktuellen Pool-Reserven, und reserves_updated_at, wann die Reserven zuletzt aktualisiert wurden. Dann recent_quotes, eine Liste der letzten Quotes, recent_intents, eine Liste der letzten Intents mit Tx-Hashes, und total_supply, das 60 Sekunden gecacht wird, damit du den NEAR-RPC nicht zuspammst.

WebsocketConnectionService verbindet sich mit dem Solver-Relay. RELAY_WS_URL ist zum Beispiel wss://solver-relay-v2.chaindefuser.com/ws, und RELAY_AUTH_KEY ist ein JWT oder Auth-Token, den du vom Relay-Betreiber bekommst. Er öffnet einen WebSocket, authentifiziert sich mit dem Auth-Key und empfängt dann neue Quotes, also Preisangebote, neue Intents, also Swap-Anfragen von Nutzern, und Execution- und Settlement-Updates. Für jedes Event aktualisiert er den CacheService mit den letzten Quotes, Intents und Timestamps, und er sagt dem QuoterService Bescheid, welche Änderungen wichtig sind, damit Preise und State frisch bleiben.

CronService führt einen periodischen Job aus, zum Beispiel alle 5 bis 10 Sekunden, je nach Implementierung, der QuoterService.updateCurrentState() aufruft. So bleibt das Bild, das der Solver vom Pool hat, korrekt, selbst wenn der WebSocket-Traffic stottert.

HttpService ist ein reiner Node-http-Server, kein Express. Er lauscht auf APP_PORT, in meinem Fall 4010. Die Route / gibt einfaches JSON zurück, { ready: true }. Die Route /status baut das komplette Status-Payload. ready ist immer true, wenn der Prozess läuft. Dann gibt es ws_connected und ws_last_event_at, reserves und reserves_updated_at, margin_percent und recent_quotes und recent_intents. deposit_addresses enthält die BTC- und EURe-Deposit-Adressen. near_balance ist in yocto NEAR, und near_balance_near ist dasselbe als lesbares NEAR, über einen formatYocto-Helper. Und total_supply enthält die Token-Supplies aus ft_total_supply-View-Calls.

Die Route /dashboard gibt eine statische HTML-Seite mit eingebettetem JS zurück. Sie injiziert die Bootstrap-Daten, also das aktuelle /status-JSON, und die Liste der Token-IDs mit den Token-Metadaten, also Symbols und Decimals. Dann rendert sie ein Grid aus Cards für Health und Readiness, Deposit-Adressen, WebSocket-Status, Reserven auf dem Intents-Contract, Total Supply auf NEAR, letzte Quotes und letzte Intents. Und sie startet einen Loop, der alle paar Sekunden wieder /status aufruft und die UI aktualisiert.

## Die Systeme drumherum

Der Solver lebt nicht allein, er ist Teil eines größeren Systems.

Das Solver-Relay (RELAY_WS_URL) ist ein zentraler Hub, der Intents und Quotes an registrierte Solver füttert. Du authentifizierst dich mit RELAY_AUTH_KEY, und die Solver schicken signierte Transaktionen für die Intents, die sie angenommen haben.

Die NEAR-RPC-Nodes werden für View-Calls genutzt, wie ft_total_supply und den Pool-State, und zum Senden von Transaktionen von NEAR_ACCOUNT_ID. Der Solver nutzt mehr als eine URL für Redundanz und einfaches Failover.

Der Intents-Contract (INTENTS_CONTRACT) hält die Logik und die Pools für EURe und BTC und andere Paare, und er verwaltet Reserven und Settlement.

Und dann gibt es die Deposit-Adressen, das ist eine Off-Chain-Bridge. Es gibt eine BTC-Mainnet-Adresse, an die Nutzer BTC schicken, und eine EURe-Adresse auf Gnosis, an die Nutzer EURe-Token schicken. Ein separates Bridge-System außerhalb dieses Repos beobachtet diese Adressen und minted und burnt die passenden NEP-141-Token auf NEAR.

## So startest du deinen eigenen Solver, Schritt für Schritt

Dieser Teil macht aus dem Schaubild eine Checkliste.

### Was du brauchst

Du brauchst eine Maschine oder einen VPS mit Linux, mit Node.js 20+ und npm oder pnpm.

Du brauchst einen NEAR-Account nur für den Solver, zum Beispiel your-solver.near. Nimm niemals dein persönliches Main-Wallet, leg einen neuen Account nur für den Solver an und lade genug NEAR drauf für Gas und die Liquidität, die du willst.

Du brauchst einen Full-Access-Private-Key für diesen Solver-Account. Den exportierst du aus der NEAR CLI oder dem Wallet, und das Format muss ed25519:... sein. Halte ihn geheim. Niemals in Git committen, niemals in einen Chat pasten, niemals teilen.

Du brauchst einen Relay-Auth-Key, RELAY_AUTH_KEY. Den bekommst du vom Relay- oder Intents-Betreiber, und meistens ist das ein JWT-artiges Token, das deinen Solver identifiziert.

Und wenn du willst, einen Domainnamen mit TLS, zum Beispiel eine Subdomain wie solver.example.com, falls du eine schöne Dashboard-URL willst, und Nginx, um von HTTPS auf den internen Port zu proxen.

### Klonen und installieren

    git clone https://github.com/near-intents/near-intents-examples.git
    cd near-intents-examples/near-intents-amm-solver

    # Mit npm
    npm install

Ersetze die Repo-URL durch das Remote, das du wirklich benutzt.

### Erstelle und fülle deine env-Datei

Der Solver sucht die env in `./env/.env.<NODE_ENV>`. Für lokal und dev nehmen wir meistens NODE_ENV=local, also

    cd near-intents-examples/near-intents-amm-solver
    mkdir -p env
    cp env/.env.example env/.env.local

Öffne env/.env.local und setze die Kernvariablen, die Pflicht sind.

    # Netzwerk
    NEAR_NETWORK_ID=mainnet

    # Tokens für diesen Solver (Beispiel: EURe ↔ BTC)
    AMM_TOKEN1_ID=nep141:gnosis-0x420ca0f9b9b604ce0fd9c18ef134c705e5fa3430.omft.near
    AMM_TOKEN2_ID=nep141:btc.omft.near

    # Non-TEE-Modus (einfachstes Setup)
    TEE_ENABLED=false

    # Dein Solver-NEAR-Account (extra dafür!)
    NEAR_ACCOUNT_ID=your-solver.near
    NEAR_PRIVATE_KEY=ed25519:YOUR_SOLVER_PRIVATE_KEY_HERE

Dann Node, Relay und Margin.

    # NEAR RPC, kannst du überschreiben; sonst sind die Defaults ok
    NEAR_NODE_URL=https://rpc.mainnet.near.org
    # oder:
    # NEAR_NODE_URLS=https://free.rpc.fastnear.com,https://near.lava.build

    # Relay-Endpunkt und Auth
    RELAY_WS_URL=wss://solver-relay-v2.chaindefuser.com/ws
    RELAY_AUTH_KEY=YOUR_RELAY_AUTH_TOKEN

    # HTTP-Server-Port für den Solver
    APP_PORT=3000          # oder 4010 auf deinem Server

    # Logging und Margin
    LOG_LEVEL=info         # error | warn | info | debug
    MARGIN_PERCENT=0.3     # 0,3 % Margin, pass sie an dein Risiko an
    ONE_CLICK_API_ONLY=true

Das Joi-Schema in src/configs/env.validation.ts prüft, dass AMM_TOKEN1_ID und AMM_TOKEN2_ID gesetzt sind, dass entweder der TEE-Modus oder NEAR_ACCOUNT_ID und NEAR_PRIVATE_KEY richtig gesetzt sind, und dass MARGIN_PERCENT positiv ist. Wenn der Solver beim Start mit einem Validierungsfehler abkackt, sagt er dir, welche env-Variablen fehlen oder ungültig sind.

### Lokal laufen lassen

Aus dem Solver-Verzeichnis

    # Stell sicher, dass du in near-intents-amm-solver bist
    NODE_ENV=local npm start

Du solltest Logs sehen wie "Using Near RPC nodes: ..." und "Cron service started", und sobald er verbunden ist, WebSocket-Logs wie "Received intent: {...}". Dann check

    curl http://localhost:3000/status   # oder dein APP_PORT

und öffne http://localhost:3000/dashboard im Browser. Du solltest das Solver-Monitor-Dashboard sehen.

### Mit pm2 im Hintergrund laufen lassen

Das ist der production-mäßige Weg. Auf deinem Server

    cd /path/to/near-intents-examples/near-intents-amm-solver

    NODE_ENV=local pm2 start "npm start" --name near-solver
    pm2 save
    pm2 startup   # richtet pm2 so ein, dass es beim Booten automatisch startet

Check die Logs mit

    pm2 logs near-solver --lines 50

und die HTTP-Seite mit deinem APP_PORT.

    curl http://127.0.0.1:3000/status

### Hinter Nginx und TLS packen

Ist optional, aber empfohlen. Ein simpler Nginx-Serverblock für eine Domain solver.example.com sieht so aus.

    server {
        listen 443 ssl http2;
        server_name solver.example.com;

        ssl_certificate     /etc/letsencrypt/live/solver.example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/solver.example.com/privkey.pem;

        location / {
            proxy_pass http://127.0.0.1:3000;  # APP_PORT
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

Für mein Setup auf emino.app habe ich es anders gemacht. Ich lasse den bestehenden Blog auf / und füge diese Locations hinzu, die schon im vhost sind.

    location = /solver/ {
        proxy_pass http://127.0.0.1:4010/dashboard;
        ...
    }

    location /solver/ {
        proxy_pass http://127.0.0.1:4010/;
        ...
    }

    location /status {
        proxy_pass http://127.0.0.1:4010/status;
        ...
    }

Dann

    nginx -t
    systemctl reload nginx

Jetzt ist der Solver erreichbar unter https://yourdomain/solver/ für das Dashboard und unter https://yourdomain/status für das Status-JSON.

## Sicherheit und Betrieb

Zuerst die Keys. Benutze einen eigenen NEAR-Account für den Solver. Der Private Key muss Full Access haben, sonst kann der Solver keine Txs senden. Behandle NEAR_PRIVATE_KEY und RELAY_AUTH_KEY als Geheimnisse. Lege sie in .env.local auf dem Server, stelle sicher, dass das Repo-Verzeichnis nicht für alle lesbar ist, und committe niemals `.env*`-Dateien in Git.

Dann die Kohle. Halte nur so viel Liquidität und NEAR drauf, wie du bereit bist zu riskieren. Hole die Gewinne ab und zu raus und betrachte den Solver-Account als "Hot Wallet".

Fürs Monitoring zeigt dir pm2 logs near-solver, was zur Laufzeit passiert, und curl /status ist fürs Monitoring aus Code heraus, das könntest du in Prometheus oder einen Health Check hängen.

Und für Upgrades pullst du den neuen Code, lässt npm install laufen, wenn sich die Dependencies geändert haben, und startest neu mit pm2 restart near-solver.

Hier ist das Schaubild.

https://mermaid.emino.app/?c=eJx1Vt1u6zYMfhXCwLk6-WmKYcNyMaAJip0ztFkXtygwpSgUW4m1Y0s-kuIkWHe7B9gj7klGSvJP0B0EsE3qI0V-JKX8mWQ6F8k82RteF3C33iiADx_gyQoDH0EoZ861lsqR3h62AUarpABYsIXRRxI3qnCutvPpVFRS6Qmv66nVZSPM9IWwQuUbdeHlNt8LtklWe6lOuNfjXQqss33ZJC9hixULiKbQ1uE2A8jQ7QLG45_eNsmnx8eHFNqtgT19fkGjVuu4O1hgv6S_rnCHN1gFY8w49QZQG50Jay8CDUsYqhLcjJEMpMWOeVWNwy7A6up6Dn41aPro77lUrMLHxFmMo9Q8v1UNOA1tBgA3dc1QCoijNAKQ0EZiHBHwCZll9EiDHmG1Ng6-u5pd4XdMawTTnN
