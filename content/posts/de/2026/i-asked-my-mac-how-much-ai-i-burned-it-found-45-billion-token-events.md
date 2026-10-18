---
title: "Ich habe meinen Mac gefragt, wie viel AI ich verbrannt habe. Er hat 45 Milliarden Token-Events gefunden"
description: "Ich habe jedes AI-Tool auf meinem Mac nach Usage-Logs durchsucht. Etwa 45 Milliarden Token-Events und ungefähr 9,3k $ zu API-Preisen, fast alles davon von Codex."
date: "2026-05-18T14:25:16Z"
updated: "2026-05-18"
lang: de
translated_from: "en/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events"
source_sections: ["what-counts-as-a-token-here", "the-final-rollup", "codex-was-the-monster", "why-my-first-count-was-too-low", "the-other-tools-one-by-one", "openrouter-falai-lovable-and-replit", "falai-is-a-different-kind-of-bill", "how-we-reproduced-the-numbers", "where-the-cost-numbers-come-from", "why-agent-usage-gets-so-large", "what-i-learned", "references"]
category: agents-ai
format: essay
author: emin
provenance: unknown
ai_assisted: true
reviewed_by_human: false
image: "/media/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events/cover.webp"
tldr: ["Ich habe jedes AI-Tool auf meinem Mac geprüft, das ich finden konnte, und etwa 45 Milliarden Token-Events gefunden.", "Zu API-Preisen ist das ungefähr 9,3k $ an Nutzung, und fast alles kam von Codex beim agentischen Coden.", "Cache-Reads waren fast so groß wie frische Request-Tokens, weil Agents den Kontext immer wieder neu lesen.", "OpenRouter und fal.ai fehlen noch, weil deren Abrechnungshistorie serverseitig liegt und meine Keys sie nicht lesen konnten."]
sections: [{"basically": "Request-Tokens und Token-Traffic sind zwei verschiedene Zahlen. Die meisten verwechseln das."}, {"basically": "44,96 Milliarden Token-Events und 9.339,89 $ lokal belegt, OpenRouter und fal.ai fehlen noch."}, {"basically": "Codex allein war 44,6 Milliarden Token-Events und 8.926,98 $. Der Kontext vom agentischen Coden hat alles gefressen."}, {"basically": "Die Session-End-Zähler sagten 12,89B. Summiere lieber die Usage pro Request oder nimm den Monatsreport."}, {"basically": "Claude, Goose, OpenHands, opencode und der Rest waren relevant, aber neben Codex waren sie klein."}, {"basically": "Ein normaler API-Key sieht nur seine eigene Nutzung. Für die accountweite Historie brauchst du einen Management-Key."}, {"basically": "Ein Autorisierungsfehler ist nicht 0 $. Der fal.ai-Verbrauch bleibt unbekannt, bis ich den Dashboard-Export habe."}, {"basically": "Finde die Tool-Ordner, grepp nach Usage-Feldern, parse die Zähler pro Request, dump niemals Prompts."}, {"basically": "Geloggte Kosten, der Codex-Report und öffentliche Preise. Das ist eine Schätzung zu API-Preisen, keine Rechnung."}, {"basically": "Jeder Agent-Schritt ist wieder ein Modell-Call mit dem ganzen Kontext. Kontext ist der eigentliche Treibstoff."}, {"basically": "Agentisches Coden ist nicht teuer, weil der Output lang ist. Es ist teuer, weil der Kontext riesig ist."}, {"basically": "Die Pricing-Seiten und API-Docs von OpenAI, Anthropic, OpenRouter und fal.ai, gegen die ich geprüft habe."}]
---
Ich wollte eine echte Antwort auf eine einfache Frage.

> Wie viel KI habe ich auf diesem Rechner eigentlich benutzt?

Nicht nur eine App. Nicht nur ein Provider-Dashboard. Ich wollte die lokale Wahrheit. Codex, Claude, opencode, Goose, OpenHands, Aider, Gemini CLI, Qwen, LM Studio, Zed, OpenRouter, [fal.ai](http://fal.ai)-Experimente, Replit- und Lovable-Spuren und alles andere, was in Logs, SQLite-Datenbanken, JSONL-Session-Dateien, Browser-Storage oder CLI-Configs rumliegt.

Die endgültige Antwort war größer als erwartet.

Ein wichtiger Hinweis vorab. Das hier ist ein Audit des lokalen Rechners, kein komplettes Audit der Provider-Accounts. Nachdem ich den ersten Entwurf veröffentlicht hatte, wurde mir klar, dass OpenRouter und fal.ai wahrscheinlich zu niedrig angesetzt waren, weil die lokalen Keys, die ich gefunden hatte, keine Management-Keys waren und fal.ai keinen lokalen Billing-Export hinterlassen hat. Ich habe am 18.05.2026 mit zusätzlich bereitgestellten Test-Keys nochmal nachgeprüft. Diese Keys haben die accountweite Billing-Historie von OpenRouter oder fal.ai immer noch nicht freigeschaltet. Also behandle die Zahl unten als "das, was dieser Mac lokal beweisen konnte, plus der Codex-Report", nicht als die endgültige Lifetime-Ausgabe über alle Accounts.

Dieser Mac hat lokale Belege für ungefähr so viel.

| Metrik | Gesamt |
|---|---:|
| Erfasste Request-Tokens, ohne Cache und verstecktes Reasoning | 23,12 Milliarden |
| Request-Tokens inklusive verstecktem Reasoning | 23,22 Milliarden |
| Cache-Read-Token-Traffic | 21,70 Milliarden |
| Gesamter Token-Traffic, inklusive Cache und Reasoning | 44,96 Milliarden |
| Geschätzter API-äquivalenter Verbrauch | 9.339,89 $ |
| Obere Schätzgrenze aus rohen lokalen Events | etwa 9,7k $ |
| Bekannter fehlender Posten | verifizierter blinder Fleck, accountweite OpenRouter- und fal.ai-Dashboard-Nutzung |

Die Pointe ist also diese. Ich habe auf einem einzigen Mac mindestens rund 45 Milliarden KI-Token-Events verbrannt. Bei aktuellen und geloggten API-artigen Preisen sind das mindestens etwa 9,3k $ an Modellnutzung, bevor man die fehlende accountweite Nutzung von OpenRouter und fal.ai dazurechnet.

Nach der zweiten Prüfung wurde das Fazit zu OpenRouter und fal.ai schärfer. Der fehlende Betrag fehlt nicht, weil ich vergessen habe, eine offensichtliche lokale Datei zu parsen. Er fehlt, weil diese Dienste die echte Billing-Historie serverseitig aufbewahren und die Keys, die ich hatte, diese Account-Level-Historie nicht lesen konnten.

Das Lustige daran: Die Zahl hängt stark davon ab, was man mit "Tokens" meint. KI-Coding-Agenten verbrauchen enorme Mengen an Tokens, um Kontext immer wieder neu zu lesen. Ein Großteil dieses Traffics wird gecacht, was ihn billiger macht als frische Input-Tokens, aber er wird trotzdem abgerechnet und taucht trotzdem in den Usage-Reports auf.

## Was hier als Token zählt

Die erste Falle bei so einem Audit ist, dass jedes Tool ein bisschen anders zählt. Für diesen Report habe ich vier Dinge getrennt.

| Begriff | Bedeutung |
|---|---|
| Input-Tokens | Prompt, Code, Tool-Output, Anweisungen und Kontext, die in ein Modell geschickt werden. |
| Output-Tokens | Sichtbarer Antworttext oder strukturierter Output vom Modell. |
| Reasoning-Tokens | Versteckte Reasoning- und Arbeits-Tokens, die manche Usage-Counter ausweisen. Sie werden meist wie Output-Tokens abgerechnet, aber nicht als normaler Antworttext angezeigt. |
| Cache-Read-Tokens | Zuvor gecachte Prompt- und Kontext-Tokens, die vom Provider wiederverwendet werden. Die können billiger sein als frischer Input, zählen aber trotzdem als abgerechnete Nutzung. |

Es gibt also zwei nützliche Summen. Request-Tokens sind das, was in Modellaufrufe reinging und rauskam, ohne Cache-Reads. Token-Traffic ist Request-Tokens plus Cache-Reads und Reasoning-Tokens.

Wenn Leute sagen "ich habe X Milliarden Tokens benutzt", mischen sie das oft durcheinander. Ich habe versucht, das auseinanderzuhalten.

## Die finale Gesamtrechnung

Das ist das kombinierte Ergebnis nach dem Scannen der lokalen Tool-Daten, wobei der Screenshot des monatlichen Codex-Reports als Hauptzahl für Codex diente. Es tut nicht so, als würde es die komplette OpenRouter- oder fal.ai-Account-Historie enthalten, weil ich mit den lokalen Nicht-Management-Keys da nicht rankam.

| Tool oder Quelle | Request-Tokens | Cache-Tokens | Gesamter Token-Traffic | Kosten |
|---|---:|---:|---:|---:|
| Codex Monthly Report | 23.046.195.362 | 21.578.277.284 | 44.624.472.646 | 8.926,98 $ |
| Claude Summaries und Desktop Local-Agent | 2.607.194 | 115.582.148 | 118.189.342 | 276,64 $ |
| OpenHands | 71.763.722 | 0 | 71.763.722 | 0 $ geloggt |
| Goose | 67.298.620 | 0 | 67.298.620 | ~30,29 $ |
| opencode | 18.658.421 | 33.845.847 | 52.504.268 | 15,50 $ |
| Zed | 16.174.500 | 3.442.668 | 19.617.168 | 56,59 $ |
| Droid | 202.115 | 4.017.760 | 4.219.875 | 29,70 $ |
| Aider | 1.682.271 | 0 | 1.682.271 | 4,20 $ |
| LM Studio | 15.777 | 0 | 15.777 | lokal |
| Gemini CLI grobe Prompt-Spur | ~38.690 | 0 | ~38.690 | unbekannt |
| Qwen CLI grobe Prompt-Spur | ~163 | 0 | ~163 | unbekannt |
| Gesamt | 23.224.636.835 | 21.735.165.707 | 44.959.802.542 | 9.339,89 $ |

Und das sind die Posten, von denen ich weiß, dass sie fehlen oder nur teilweise drin sind.

| Provider oder Tool | Status |
|---|---|
| OpenRouter accountweiter Traffic | Nur teilweise. Lokale App-Logs und Nutzung des aktuellen Keys wurden einbezogen, wo sichtbar. Mit einem zusätzlich bereitgestellten Key nachgeprüft. Der meldete 0 $ für diesen Key und war kein Management-Key, konnte also keine Account-Aktivität lesen. |
| fal.ai | Fehlt in der Ausgabensumme. Ich habe lokalen Code und Projektspuren gefunden. Mit einem zusätzlich bereitgestellten Key nachgeprüft. Modellaufrufe funktionieren damit vielleicht, aber Account-Billing- und Usage-Endpunkte waren nicht erlaubt. fal.ai-Nutzung basiert auf Credits und Output-Einheiten, nicht auf normaler Text-Token-Abrechnung. |
| Lovable | Nur lokale Projekt- und Browser-Spuren, kein lokaler Credit-Counter gefunden. |
| Replit | Kein brauchbarer lokaler Usage-Counter gefunden. |

Die Tabelle oben zählt versteckte Reasoning-Tokens bei Codex als "Request-Tokens", weil diese Tokens Teil der Modellarbeit sind. Wenn du nur das Feld "Total Tokens" im monatlichen Codex-Report nimmst, ohne Reasoning und Cache, liegt die Codex-Zwischensumme bei 22.944.070.768.

## Codex war das Monster

Der monatliche Codex-Report hat das ganze Audit dominiert. Codex allein zeigte das hier.

| Codex-Metrik | Gesamt |
|---|---:|
| Input-Tokens | 22.796.292.873 |
| Output-Tokens | 147.777.895 |
| Reasoning-Tokens | 102.124.594 |
| Cache-Read-Tokens | 21.578.277.284 |
| Erfasste Gesamt-Tokens, Input plus Output | 22.944.070.768 |
| Token-Traffic inklusive Cache und Reasoning | 44.624.472.646 |
| Kosten | 8.926,98 $ |

Und Monat für Monat.

| Monat | Input | Output | Reasoning | Cache Read | Erfasste Gesamtsumme | Kosten |
|---|---:|---:|---:|---:|---:|---:|
| 2025-09 | 1.465.027.747 | 6.294.621 | 3.394.176 | 1.408.110.720 | 1.471.322.368 | 310,11 $ |
| 2025-10 | 2.198.317.367 | 12.112.717 | 6.743.168 | 2.087.526.016 | 2.210.430.084 | 520,56 $ |
| 2025-11 | 2.059.065.642 | 12.501.084 | 7.492.878 | 1.933.080.448 | 2.071.566.726 | 524,13 $ |
| 2025-12 | 2.741.470.149 | 27.917.018 | 20.974.512 | 2.620.809.600 | 2.769.387.167 | 851,96 $ |
| 2026-01 | 2.796.216.784 | 38.691.904 | 32.798.748 | 2.671.607.204 | 2.834.908.688 | 1.227,22 $ |
| 2026-02 | 4.296.274.116 | 26.382.801 | 19.076.844 | 4.061.859.456 | 4.322.656.917 | 1.490,41 $ |
| 2026-03 | 2.736.148.304 | 11.486.083 | 6.285.054 | 2.495.058.816 | 2.747.634.387 | 1.257,87 $ |
| 2026-04 | 2.538.939.090 | 6.990.823 | 3.102.999 | 2.435.933.440 | 2.545.929.913 | 1.392,79 $ |
| 2026-05 | 1.964.833.674 | 5.400.844 | 2.256.215 | 1.864.291.584 | 1.970.234.518 | 1.351,93 $ |
| Gesamt | 22.796.292.873 | 147.777.895 | 102.124.594 | 21.578.277.284 | 22.944.070.768 | 8.926,98 $ |

Das ist die Geschichte. Fast der gesamte Verbrauch kam aus agentischem Coding-Kontext. Langlebige Software-Agenten antworten nicht einfach einmal. Sie lesen Dateien, schauen sich Diffs an, führen Befehle aus, bekommen Tool-Output, verdichten die Historie, setzen die Aufgabe fort und wiederholen das Ganze. Jede Schleife ist ein weiterer Modellaufruf.

## Warum meine erste Zählung zu niedrig war

Der erste Durchlauf ergab ungefähr 12,89 Milliarden Codex-Tokens. Diese Zahl kam aus einer lokalen Codex-Statusdatenbank, die pro Thread oder Session einen Gesamt-Token-Zähler speichert. Das war nützlich, aber es unterschätzte die tatsächlichen Kosten.

Der tiefere Scan fand drei Ebenen der Codex-Abrechnung.

| Ebene | Was sie maß | Ergebnis |
|---|---|---:|
| Session-End-Zähler | Letzter bekannter Gesamtstand pro lokaler Codex-Session | 12,89 Mrd. |
| Monatlicher Codex-Bericht | Abgeglichene monatliche Nutzung nach Modell und Token-Klasse | 22,94 Mrd. gemeldete Tokens, 8.926,98 $ |
| Rohe `last_token_usage`-Events | Pro-Request-Event-Stream, geparst aus JSONL-Logs | 23,98 Mrd. Request-Tokens, etwa 46,53 Mrd. inklusive Cache |

Der monatliche Bericht ist die Zahl, die ich veröffentlichen würde. Der rohe Event-Scan ist eine nützliche Obergrenzen-Kontrolle, kann aber abweichen wegen fortgesetzter Sessions, Zeitstempel-Gruppierung, duplizierter Telemetrie oder einem anderen Berichtszeitraum.

Die wichtige Korrektur ist diese: Wenn du eine abrechnungsähnliche Zahl für Codex willst, summiere die Nutzung pro Request oder benutze den monatlichen Nutzungsbericht. Verlass dich nicht nur auf den `tokens_used`-Zähler am Session-Ende.

Ich habe lokalen App-Status, Datenbanken, JSONL-Dateien und Provider-Endpunkte geprüft, wo verfügbar. Ich habe vermieden, Prompt-Inhalte zu veröffentlichen, und API-Keys geschwärzt. Das waren die nützlichen lokalen Quellen.

| Tool | Nützliche lokale Quelle |
|---|---|
| Codex | `~/.codex/sessions/**/*.jsonl`, `~/.codex/state_5.sqlite`, `~/.codex/logs_2.sqlite`, plus der Screenshot vom Monatsbericht |
| opencode | SQLite-DB unter `~/.local/share/opencode/` |
| Claude Code und Claude Desktop | `~/.claude.json`, Claude Desktop Local-Agent-Audit-Logs |
| Aider | `.aider.chat.history.md`-Dateien |
| Goose | JSONL-Sessions unter `~/.local/share/goose/sessions/` |
| OpenHands | Event-JSON-Dateien unter `~/.openhands/sessions/` |
| LM Studio | Konversations-JSON unter `~/.lmstudio/conversations/` |
| Gemini CLI | `~/.gemini/tmp/*/logs.json` |
| Qwen CLI | `~/.qwen/tmp/*/logs.json` |
| Zed und Droid | Gefunden über den `tokscale`-Nutzungs-Cache |
| OpenRouter | Lokale API-Keys, bereitgestellter Nicht-Management-Key und `/api/v1/key`-Checks |
| fal.ai | Lokale Projektspuren plus bereitgestellte Key-Checks, aber kein nutzbarer Nutzungszähler |
| Lovable und Replit | Browser- und Projektspuren, kein nutzbarer lokaler Abrechnungszähler |

Ich fand auch einen gecachten `tokscale`-Rollup.

```text
~/.config/tokscale/cache/tui-data-cache.json
```

Dieser Cache meldete Folgendes.

| tokscale-Metrik | Wert |
|---|---:|
| Gesamt normalisierte Tokens | 13.537.863.939 |
| Gesamt normalisierte Kosten | 6.438,80 $ |
| Modell-Buckets | 21 |
| Clients mit nutzbaren Modell-Buckets | Codex, opencode, Zed, Droid |

Diese Zahl ist nützlich, aber sie wird nicht so gezählt wie der monatliche Codex-Bericht. Sie normalisiert und gruppiert Daten anders. Ich habe sie hauptsächlich benutzt, um zusätzliche Clients und Kosten-Buckets zu finden, die ich übersehen hatte.

## Die anderen Tools, eines nach dem anderen

Codex war der Riese, aber die anderen Tools zählten trotzdem.

opencode hatte eine echte SQLite-Datenbank mit Token-Abrechnung pro Nachricht. Das sind die wiederhergestellten Gesamtsummen.

| Feld | Anzahl |
|---|---:|
| Input-Tokens | 18.329.400 |
| Output-Tokens | 215.350 |
| Reasoning-Tokens | 116.322 |
| Cache gelesen | 33.616.558 |
| Cache geschrieben | 229.289 |
| Gesamt-Token-Verkehr | 52.504.268 |
| Kosten | 15,50 $ |

Die Modelle umfassten OpenRouter GLM, Gemini Preview über OpenRouter und opencode/free-Modell-Buckets.

Claude hatte zwei nützliche lokale Quellen. Eine ist `~/.claude.json`, die Projekt-Zusammenfassungszähler speichert. Die andere sind die Claude Desktop Local-Agent-Audit-Logs, die Modell-Nutzungszusammenfassungen enthalten. Zusammen ergaben sie Folgendes.

| Feld | Anzahl |
|---|---:|
| Nicht-Cache-Request-Tokens | 2.607.194 |
| Cache-Tokens | 115.582.148 |
| Gesamt-Token-Verkehr | 118.189.342 |
| Kosten | 276,64 $ |

Das ist ein gutes Beispiel dafür, warum Cache wichtig ist. Der größte Teil des Claude-Token-Verkehrs war Cache-Lesen oder Cache-Erstellung, nicht frischer Prompt oder Output.

OpenHands speicherte echte Pro-Response-Nutzung in Event-Dateien.

| Feld | Anzahl |
|---|---:|
| Prompt-Tokens | 71.243.196 |
| Completion-Tokens | 520.526 |
| Gesamt-Tokens | 71.763.722 |
| Protokollierte Kosten | 0 $ |

Das Modell-Bucket war `openrouter/sonoma-sky-alpha`, das in der lokalen Abrechnung als kostenlos auftauchte.

Goose hatte kumulative Session-Zähler.

| Feld | Anzahl |
|---|---:|
| Input-Tokens | 66.266.561 |
| Output-Tokens | 1.032.059 |
| Gesamt-Tokens | 67.298.620 |
| Geschätzte Kosten | ~30,29 $ |

Die aktuelle Goose-Config zeigte auf OpenRouter mit `z-ai/glm-4.6`, und ältere Config-Backups zeigten auch `x-ai/grok-code-fast-1`. Weil einzelne Session-Zeilen das Modell nicht speicherten, habe ich die Goose-Kosten als Schätzung behandelt.

Aider war einfach. Es schreibt Token- und Kostenzeilen in Chat-Verlaufsdateien.

| Feld | Anzahl |
|---|---:|
| Gesendete Tokens | 1.560.000 |
| Empfangene Tokens | 122.271 |
| Gesamt-Tokens | 1.682.271 |
| Kosten | 4,20 $ |

Ich habe identische Verlaufsdateien per Hash dedupliziert, damit eine Backup-Kopie nicht doppelt zählt.

LM Studio ist hauptsächlich lokale Modellnutzung, keine API-Ausgaben. Es hatte trotzdem Generierungsstatistiken im Konversations-JSON.

| Feld | Anzahl |
|---|---:|
| Prompt-Tokens | 8.796 |
| Vorhergesagte Tokens | 6.981 |
| Gesamt lokale Generierungs-Tokens | 15.777 |

Das ist kein API-Verbrauch, es sei denn, ein Remote-Provider war beteiligt, und die lokalen Dateien zeigten das nicht.

Gemini und Qwen hatten lokale Logs, aber ich fand keine zuverlässigen Provider-artigen Token-Nutzungszähler. Ich fand nur grobe Prompt-Text-Spuren.

| Tool | Sessions und Nachrichten | Grobe Textschätzung |
|---|---:|---:|
| Gemini CLI | 17 Sessions, 76 Benutzernachrichten | ~38.690 Text-Tokens |
| Qwen CLI | 2 Sessions, 9 Benutzernachrichten | ~163 Text-Tokens |

Ich habe diese nicht als abrechenbare Provider-Nutzung gezählt. Sie sind nur grobe Textgrößen-Schätzungen.

Zed und Droid kamen aus dem `tokscale`-Cache, nicht aus dem manuellen Parsen app-spezifischer Logs.

| Tool | Token-Verkehr | Kosten |
|---|---:|---:|
| Zed | 19.617.168 | 56,59 $ |
| Droid | 4.219.875 | 29,70 $ |

## OpenRouter, fal.ai, Lovable und Replit

Ich habe auch Provider-nahe Tools und Account-Spuren geprüft. Der tiefere lokale Durchlauf durchsuchte Config-Ordner, Agent-Status-Ordner, Projektverzeichnisse, Browser-Anwendungsunterstützung, Paket-Caches und bekannte CLI-Zustände nach OpenRouter-, fal.ai-, Lovable- und Replit-Artefakten. Er fand Projektcode, SDK-Pakete, Preis-Caches, Config-Dateien und Browser- und Projektspuren, aber kein echtes lokales Abrechnungsbuch für die fehlenden Provider.

Fangen wir mit OpenRouter an. Ich fand drei lokale OpenRouter-API-Keys in Tool-Configs. Nachdem ich vermutete, dass der OpenRouter-Verkehr viel größer war, testete ich auch einen weiteren bereitgestellten OpenRouter-Key. Ich habe den OpenRouter-Current-Key-Endpunkt mit jedem Key abgefragt und die Key-Werte geschwärzt. Hier sind die Ergebnisse.

| Key-Quelle | Current-Key-Nutzung | Account-weiter Zugriff |
|---|---:|---|
| Aider-Key | 4,820189682 $ | Nein |
| OpenHands-Key | 0 $ | Nein |
| Refact-Key | 0,063351337 $ | Nein |
| Bereitgestellter Test-Key | 0 $ | Nein |

Dann versuchte ich OpenRouters `/api/v1/activity`-Endpunkt für Account-Aktivität. Jeder Key gab dasselbe zurück.

```text
Only management keys can fetch activity for an account
```

Der OpenRouter-Check ist also keine vollständige Account-weite Historie. Es ist nur die Nutzung, die für diese spezifischen API-Keys sichtbar ist.

Der bereitgestellte Key scheiterte auch am Management-Key-Listing-Endpunkt.

```text
Invalid management key
```

OpenRouter dokumentiert, dass `/api/v1/activity` Aktivität für die letzten abgeschlossenen 30 UTC-Tage zurückgibt und einen Management-Key braucht. Ein normaler API-Key kann seine eigene aktuelle Nutzung melden, aber nicht den ganzen Account.

Das bedeutet, dass die OpenRouter-Zahl im Artikel fast sicher zu niedrig ist, wenn der Account stärkere Dashboard-Nutzung, gelöschte Keys, rotierte Keys, BYOK-Aktivität oder andere Apps hatte, die keine lokalen Logs aufbewahrten. Um die fehlenden OpenRouter-Ausgaben einzubeziehen, brauche ich einen OpenRouter-Management-Key mit Zugriff auf `/api/v1/activity`, oder einen Dashboard-Export oder Screenshots für monatliche Nutzung, oder eine Liste aller historischen API-Keys plus ihrer Current-Key-Nutzung, falls die Keys noch existieren und die Nutzung nicht zurückgesetzt wurde.

Mit einem Management-Key ist der Account-Level-Aufruf dieser.

```bash
curl https://openrouter.ai/api/v1/activity \
  -H "Authorization: Bearer $OPENROUTER_MANAGEMENT_KEY"
```

Für einen einzelnen normalen Key ist der begrenzte Aufruf dieser.

```bash
curl https://openrouter.ai/api/v1/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

Der erste Endpunkt kann Aktivität pro Tag, Modell und Provider liefern. Der zweite kann nur sagen, was dieser eine Key gerade meldet.

## fal.ai ist eine andere Art von Rechnung

Dann fal.ai. Ich habe fal.ai-Code und Projektspuren gefunden, darunter Text-to-Speech- und Speech-to-Text-Experimente, aber keinen lokalen Abrechnungszähler, der den Kontoverbrauch hätte ausgeben können. Nachdem ich vermutet hatte, dass der fal.ai-Traffic viel größer war, habe ich einen mitgelieferten fal.ai-Key gegen die Account-Billing- und Usage-Endpunkte getestet.

Das Ergebnis war wichtig. Der Key hat nicht bewiesen, dass nichts ausgegeben wurde. Er hat bewiesen, dass dieser Key das Billing-Ledger nicht lesen durfte.

| fal.ai-Check | Ergebnis |
|---|---|
| Account-Billing | Autorisierungsfehler, der Key durfte die Aktion nicht ausführen. |
| Modellnutzung von 2024-01-01 bis 2026-05-19 | Gab nur ein Error-Objekt zurück, keine Zeilen zum Aufsummieren. |
| Billing-Events der letzten 90 Tage | Gab nur ein Error-Objekt zurück, keine Events zum Aufsummieren. |

Weil diese Calls Autorisierungsfehler zurückgegeben haben, habe ich keine `$0` in den Report geschrieben. `$0` wäre irreführend. Der korrekte Zustand ist "unbekannt und wahrscheinlich fehlend".

fal.ai lässt sich auch nicht sauber auf LLM-Token-Accounting abbilden. In ihren Docs steht, dass Modelle nach erfolgreichen Outputs und modellspezifischen Abrechnungseinheiten abgerechnet werden, bezahlt mit Prepaid-Credits. Ein fal-Audit braucht also ein fal-Dashboard oder einen API-Key, nicht nur lokales Token-Parsing.

Das ist wahrscheinlich auch zu niedrig angesetzt. fal.ai-Nutzung lebt oft im Dashboard und nicht in lokalen App-Logs. Eine lokale App ruft vielleicht fal auf, bekommt Audio-, Bild- oder Video-Output-URLs zurück und speichert nie die Abrechnungseinheit oder den Credit-Verbrauch. Um fal.ai einzubeziehen, brauche ich einen fal.ai-Dashboard-Billing- oder Usage-Export, oder einen Screenshot oder CSV der Credit-Käufe und des Credit-Verbrauchs, oder einen fal.ai-Admin- oder Team-Key, der Billing- oder Usage-Endpunkte lesen darf, falls dieser Zugang für den Account existiert.

Der wichtige Unterschied ist, dass fal.ai nicht in die Token-Tabelle gehört, als wäre es LLM-Text. Es sollte ein eigener Ausgaben-Bucket sein.

| fal.ai-Metrik | Wie man sie reportet |
|---|---|
| Verbrannte Credits | Zur Gesamtausgabe in Dollar addieren |
| Audio-, Video- und Bild-Generierungen | Als Output-Einheiten reporten |
| Text-Tokens | Nur einbeziehen, wenn das spezifische fal-Modell Token-Usage ausgibt |

Die korrigierte zukünftige Headline sollte also wahrscheinlich lauten: "45B+ AI-Token-Events lokal bewiesen, plus OpenRouter- und fal.ai-Dashboard-Ausgaben noch zu addieren".

Für Lovable habe ich diese Spuren gefunden.

```text
lovable.dev browser IndexedDB traces
magic-prf.lovable.app browser IndexedDB traces
local .lovable project metadata
lovable-tagger packages
lovable upload folders
```

Ich habe keine lokalen Token-, Credit- oder Billing-Zähler gefunden. Lovable lässt sich wahrscheinlich am besten über das Dashboard auditieren, nicht über die lokalen Browser-IndexedDB-Dateien.

Für Replit habe ich nach Projekt-Metadaten, Tokens, lokalen DBs und Browser-Spuren gesucht. Ich habe keinen brauchbaren lokalen Usage-Zähler gefunden.

## Wie wir die Zahlen reproduziert haben

Der grobe Workflow war dieser.

1. Wahrscheinliche AI-Tool-Verzeichnisse inventarisieren.
2. Nach Usage-Feldern suchen, ohne Konversationsinhalte zu dumpen.
3. Strukturierte Speicher identifizieren, also SQLite, JSONL, JSON und Markdown-Histories.
4. Nur Gesamtzähler parsen.
5. Histories und Session-Summaries wo möglich deduplizieren.
6. Lokale Zähler gegen Provider-Docs und Provider-Endpunkte abgleichen.
7. Request-Tokens von Cache-Traffic trennen.

Der erste breite Scan suchte nach installiertem Tool-State.

```bash
find ~ -maxdepth 3 -type d \
  | rg -i 'codex|claude|opencode|gemini|qwen|goose|aider|openhands|cursor|windsurf|zed|replit|lovable|lmstudio|ollama'
```

Dann habe ich nach Usage-Feldern gesucht.

```bash
rg -n -i 'input_tokens|output_tokens|total_tokens|cached_tokens|cache_read|usage|cost' \
  ~/.codex ~/.claude ~/.opencode ~/.gemini ~/.qwen ~/.local/share/goose ~/.openhands ~/.lmstudio
```

Für Codex sah das nützliche Event so aus.

```json
{
  "type": "event_msg",
  "payload": {
    "type": "token_count",
    "info": {
      "total_token_usage": {
        "input_tokens": 123,
        "cached_input_tokens": 100,
        "output_tokens": 20,
        "reasoning_output_tokens": 10,
        "total_tokens": 143
      },
      "last_token_usage": {
        "input_tokens": 12,
        "cached_input_tokens": 10,
        "output_tokens": 2,
        "reasoning_output_tokens": 1,
        "total_tokens": 14
      }
    }
  }
}
```

Die Schlüsselerkenntnis war, dass `total_token_usage` innerhalb einer Session kumulativ ist. Wenn du jede `total_token_usage`-Zeile summierst, zählst du wie verrückt doppelt. Für Billing-artiges Accounting willst du `last_token_usage` pro Request, oder einen abgeglichenen Usage-Report.

Ein vereinfachter Codex-Parser sieht so aus.

```js
const fs = require("fs");
const path = require("path");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (entry.name.endsWith(".jsonl")) files.push(p);
  }
  return files;
}

const totals = {
  input: 0,
  cached: 0,
  output: 0,
  reasoning: 0,
  total: 0,
};

for (const file of walk(`${process.env.HOME}/.codex/sessions`)) {
  for (const line of fs.readFileSync(file, "utf8").split(/\n/)) {
    if (!line.includes("token_count")) continue;

    let row;
    try {
      row = JSON.parse(line);
    } catch {
      continue;
    }

    const usage = row.payload?.info?.last_token_usage;
    if (!usage) continue;

    totals.input += usage.input_tokens || 0;
    totals.cached += usage.cached_input_tokens || 0;
    totals.output += usage.output_tokens || 0;
    totals.reasoning += usage.reasoning_output_tokens || 0;
    totals.total += usage.total_tokens || 0;
  }
}

console.log(totals);
```

Bei SQLite-basierten Tools wie opencode war die Methode anders.

```bash
sqlite3 ~/.local/share/opencode/opencode.db ".schema"
```

Dann parst du die JSON-Felder in der Message-Tabelle, und zwar speziell das `tokens`-Objekt, nicht die duplizierten Part-Zeilen.

Bei Aider war die Usage Plaintext.

```bash
rg -n 'Tokens: .* sent, .* received|Cost:' ~/Developer ~/.aider
```

Für OpenRouter Current-Key-Usage.

```bash
curl https://openrouter.ai/api/v1/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

Für OpenRouter Account-weite Aktivität.

```bash
curl https://openrouter.ai/api/v1/activity \
  -H "Authorization: Bearer $OPENROUTER_MANAGEMENT_KEY"
```

Der zweite Befehl braucht einen Management-Key.

## Woher die Kostenzahlen kommen

Ich habe drei Arten von Kostendaten benutzt. Kosten, die das Tool direkt geloggt hat, Kosten aus dem monatlichen Codex-Usage-Report, und Schätzungen auf Basis aktueller öffentlicher Preise, wo die lokalen Logs Tokens, aber keine Kosten hatten.

Bei den Preisen listet das OpenAI-API-Pricing aktuelle Preise pro 1M Tokens für GPT-5.5, GPT-5.4 und GPT-5.3-Codex. OpenAIs Codex-Rate-Card erklärt den Umstieg auf Token-basiertes Codex-Accounting und trennt Input-, Cached-Input- und Output-Credits. Anthropic veröffentlicht Claude-Preise nach Modell und Token-Klasse. OpenRouter zeigt Current-Key-Usage über `/api/v1/key`, und volle Aktivität braucht einen Management-Key. Und fal.ai rechnet Modell-APIs nach erfolgreichen Outputs und modellspezifischen Abrechnungseinheiten ab, bezahlt mit Prepaid-Credits.

Die Kostenschätzung ist keine perfekte Rechnung. Sie ist eine "wie würde das zu API-artigen Preisen aussehen?"-Schätzung. Manche Nutzung ist vielleicht in Abos, Free Tiers, Research Previews oder internen Tool-Kontingenten enthalten. Manche lokalen Logs erfassen geschätzte Kosten statt abgerechneter Provider-Billing.

## Warum Agent-Nutzung so groß wird

Das Überraschende ist nicht, dass die Maschine AI benutzt hat. Das Überraschende ist, wie schnell Agents Kontext multiplizieren.

Ein normaler Chat ist im Grunde ein User-Prompt und eine Assistant-Antwort. Ein agentischer Coding-Loop sieht eher so aus.

1. User bittet um eine Änderung.
2. Agent liest Repo-Dateien.
3. Modell-Call.
4. Agent führt Suchen aus.
5. Modell-Call.
6. Agent führt Tests aus.
7. Modell-Call.
8. Agent liest Fehler.
9. Modell-Call.
10. Agent editiert Dateien.
11. Modell-Call.
12. Agent verifiziert.
13. Modell-Call.

Jeder Schritt kann System-Instructions, Developer-Instructions, Tool-Definitionen, die bisherige Konversation, Dateiauszüge, Command-Output, Diffs, Test-Failures, Screenshots, Browser-State und Safety-Policies enthalten.

Deshalb waren Cache-Read-Tokens bei Codex fast so groß wie frische Request-Tokens.

| Codex-Kategorie | Tokens |
|---|---:|
| Frischer Input + Output + Reasoning | 23.05B |
| Cache Read | 21.58B |

Der Cache macht das billiger, als es sonst wäre, aber er zeigt auch die echte Form der Agent-Nutzung. Kontext ist der eigentliche Treibstoff.

## Was ich gelernt habe

Erstens heißt „Gesamt-Tokens" einfach zu viele Dinge. Ein Dashboard-Gesamtwert, ein Session-Zähler, ein rohes Event pro Request und eine Provider-Rechnung können alle stimmen und trotzdem verschiedene Zahlen zeigen.

Zweitens sind lokale Logs unglaublich nützlich. Viele Tools speichern still genug Metadaten, um die Nutzung zu rekonstruieren, ohne Prompts irgendwohin zu schicken.

Drittens sind Provider-Dashboards immer noch wichtig. OpenRouter, fal.ai, Lovable, Replit und ähnliche Dienste hinterlassen lokal vielleicht keine vollständigen Abrechnungshistorien. Dafür brauchst du Dashboard-Exporte oder eingeschränkte Management-Keys.

Viertens ist agentisches Coding nicht teuer, weil der Output lang ist. Es ist teuer, weil der Input-Kontext riesig ist und immer wieder durchgegangen wird.

In meinem Fall waren die sichtbaren Modell-Antworten nur ein winziger Ausschnitt vom Ganzen. Der eigentliche Verbrauch steckte im Kontext, in Tool-Outputs, in der Repository-Inspektion und in der Wiederverwendung gecachter Prompts.

Wenn ich es in einem Satz zusammenfassen müsste, dann so.

> Ich habe jedes AI-Tool geprüft, das ich auf meinem Mac finden konnte. Die Maschine hatte Belege für etwa 45 Milliarden Token-Events und ungefähr 9,3 Tausend Dollar an API-äquivalenter Nutzung. Fast alles davon kam von Codex, das agentisches Coding gemacht hat.

## Referenzen

- OpenAI API-Preise, https://developers.openai.com/api/docs/pricing
- OpenAI Codex-Tarifkarte, https://help.openai.com/en/articles/20001106-codex-rate-card
- Anthropic Claude-Preise, https://platform.claude.com/docs/en/about-claude/pricing
- OpenRouter aktueller Key-Endpoint, https://openrouter.ai/docs/api/api-reference/api-keys/get-current-key
- OpenRouter Aktivitäts-Endpoint, https://openrouter.ai/docs/api/api-reference/analytics/get-user-activity
- fal.ai Preismodell, https://fal.ai/docs/documentation/model-apis/pricing
- fal.ai Authentifizierung, https://fal.ai/docs/documentation/setting-up/authentication

![Cover](../../../media/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events/cover.webp)
