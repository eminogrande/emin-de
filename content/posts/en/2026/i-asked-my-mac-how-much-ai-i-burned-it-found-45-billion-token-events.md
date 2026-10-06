---
title: "I Asked My Mac How Much AI I Burned. It Found 45 Billion Token Events."
description: "I scanned every AI tool on my Mac for usage logs. About 45 billion token-events and roughly $9.3k at API rates, almost all of it from Codex."
date: "2026-05-18T14:25:16Z"
updated: "2026-05-18T14:25:16Z"
lang: "en"
category: "agents-ai"
format: "essay"
author: "emin"
provenance: "unknown"
ai_assisted: true
reviewed_by_human: false
source: "emino.app"
third_party_summary: false
cover: "../../../media/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events/cover.webp"
voice_check:
  em_dash: 0
  unobserved: 268
emin_check_pct: null
voice_rewrite: "v1"
review_status: "draft-emin-voice"
original_url: "https://emino.app/posts/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-toke/"
---
I wanted a real answer to a simple question.

> How much AI have I actually used on this machine?

Not just one app. Not just one provider dashboard. I wanted the local truth. Codex, Claude, opencode, Goose, OpenHands, Aider, Gemini CLI, Qwen, LM Studio, Zed, OpenRouter, [fal.ai](http://fal.ai) experiments, Replit and Lovable traces, and anything else sitting in logs, SQLite databases, JSONL session files, browser storage or CLI config.

The final answer was bigger than expected.

One important caveat. This is a local-machine audit, not a complete provider-account audit. After publishing the first draft, I realized OpenRouter and fal.ai were probably undercounted, because the local keys I found were not management keys and fal.ai left no local billing export. I rechecked with extra supplied test keys on 2026-05-18. Those keys still did not unlock account-wide OpenRouter or fal.ai billing history. So treat the headline below as "what this Mac could prove locally plus the Codex report", not as the final all-account lifetime spend.

This Mac has local evidence for about this much.

| Metric | Total |
|---|---:|
| Reported request tokens, excluding cache and hidden reasoning | 23.12 billion |
| Request tokens including hidden reasoning | 23.22 billion |
| Cache-read token traffic | 21.70 billion |
| Total token traffic, including cache and reasoning | 44.96 billion |
| Estimated API-equivalent burn | $9,339.89 |
| Raw local-event upper-bound estimate | about $9.7k |
| Known missing bucket | verified blind spot, account-wide OpenRouter and fal.ai dashboard usage |

So the punchline is this. I burned through at least roughly 45 billion AI token-events on one Mac. At current and logged API-style rates, that is at least around $9.3k of model usage before adding missing OpenRouter and fal.ai account-wide usage.

After the second check, the OpenRouter and fal.ai conclusion got sharper. The missing spend is not there because I forgot to parse an obvious local file. It's missing because those services keep the real billing history server-side, and the keys I had could not read that account-level history.

The fun part is that the number depends a lot on what you mean by "tokens". AI coding agents spend enormous amounts of tokens re-reading context again and again. Much of that traffic is cached, which makes it cheaper than full input tokens, but it is still metered and still shows up in usage reports.

## What counts as a token here

The first trap in this kind of audit is that every tool counts a little differently. For this report I separated four things.

| Term | Meaning |
|---|---|
| Input tokens | Prompt, code, tool output, instructions and context sent into a model. |
| Output tokens | Visible answer text or structured output from the model. |
| Reasoning tokens | Hidden reasoning and work tokens exposed by some usage counters. They are usually billed like output tokens, but not shown as normal answer text. |
| Cache-read tokens | Previously cached prompt and context tokens reused by the provider. These can be cheaper than fresh input, but still count as metered usage. |

So there are two useful totals. Request tokens are what went into and came out of model calls, excluding cache reads. Token traffic is request tokens plus cache reads and reasoning tokens.

When people say "I used X billion tokens", they often mix these together. I tried to keep them apart.

## The final rollup

This is the combined result after scanning local tool data and using the Codex monthly report screenshot as the main Codex number. It does not pretend to include the full OpenRouter or fal.ai account history, because I could not get to those with the local non-management keys.

| Tool or source | Request tokens | Cache tokens | Total token traffic | Cost |
|---|---:|---:|---:|---:|
| Codex monthly report | 23,046,195,362 | 21,578,277,284 | 44,624,472,646 | $8,926.98 |
| Claude summaries and desktop local-agent | 2,607,194 | 115,582,148 | 118,189,342 | $276.64 |
| OpenHands | 71,763,722 | 0 | 71,763,722 | $0 logged |
| Goose | 67,298,620 | 0 | 67,298,620 | ~$30.29 |
| opencode | 18,658,421 | 33,845,847 | 52,504,268 | $15.50 |
| Zed | 16,174,500 | 3,442,668 | 19,617,168 | $56.59 |
| Droid | 202,115 | 4,017,760 | 4,219,875 | $29.70 |
| Aider | 1,682,271 | 0 | 1,682,271 | $4.20 |
| LM Studio | 15,777 | 0 | 15,777 | local |
| Gemini CLI rough prompt trace | ~38,690 | 0 | ~38,690 | unknown |
| Qwen CLI rough prompt trace | ~163 | 0 | ~163 | unknown |
| Total | 23,224,636,835 | 21,735,165,707 | 44,959,802,542 | $9,339.89 |

And these are the buckets I know are missing or only partial.

| Provider or tool | Status |
|---|---|
| OpenRouter account-wide traffic | Partial only. Local app logs and current-key usage were included where visible. Rechecked with an extra supplied key. It reported $0 for that key and was not a management key, so it could not read account activity. |
| fal.ai | Missing from the spend total. I found local code and project traces. Rechecked with an extra supplied key. Model calls may work with it, but account billing and usage endpoints were not permitted. fal.ai usage is based on credits and output units, not normal text-token accounting. |
| Lovable | Local project and browser traces only, no local credit counter found. |
| Replit | No usable local usage counter found. |

The table above counts hidden reasoning tokens as "request tokens" for Codex, because those tokens are part of the model work. If you use only the "Total Tokens" field in the Codex monthly report, without reasoning and cache, the Codex subtotal is 22,944,070,768.

## Codex was the monster

The Codex monthly report dominated the whole audit. Codex alone showed this.

| Codex metric | Total |
|---|---:|
| Input tokens | 22,796,292,873 |
| Output tokens | 147,777,895 |
| Reasoning tokens | 102,124,594 |
| Cache-read tokens | 21,578,277,284 |
| Reported total tokens, input plus output | 22,944,070,768 |
| Token traffic including cache and reasoning | 44,624,472,646 |
| Cost | $8,926.98 |

And month by month.

| Month | Input | Output | Reasoning | Cache read | Reported total | Cost |
|---|---:|---:|---:|---:|---:|---:|
| 2025-09 | 1,465,027,747 | 6,294,621 | 3,394,176 | 1,408,110,720 | 1,471,322,368 | $310.11 |
| 2025-10 | 2,198,317,367 | 12,112,717 | 6,743,168 | 2,087,526,016 | 2,210,430,084 | $520.56 |
| 2025-11 | 2,059,065,642 | 12,501,084 | 7,492,878 | 1,933,080,448 | 2,071,566,726 | $524.13 |
| 2025-12 | 2,741,470,149 | 27,917,018 | 20,974,512 | 2,620,809,600 | 2,769,387,167 | $851.96 |
| 2026-01 | 2,796,216,784 | 38,691,904 | 32,798,748 | 2,671,607,204 | 2,834,908,688 | $1,227.22 |
| 2026-02 | 4,296,274,116 | 26,382,801 | 19,076,844 | 4,061,859,456 | 4,322,656,917 | $1,490.41 |
| 2026-03 | 2,736,148,304 | 11,486,083 | 6,285,054 | 2,495,058,816 | 2,747,634,387 | $1,257.87 |
| 2026-04 | 2,538,939,090 | 6,990,823 | 3,102,999 | 2,435,933,440 | 2,545,929,913 | $1,392.79 |
| 2026-05 | 1,964,833,674 | 5,400,844 | 2,256,215 | 1,864,291,584 | 1,970,234,518 | $1,351.93 |
| Total | 22,796,292,873 | 147,777,895 | 102,124,594 | 21,578,277,284 | 22,944,070,768 | $8,926.98 |

That is the story. Almost all of the burn came from agentic coding context. Long-running software agents don't just answer once. They read files, look at diffs, run commands, get tool output, compact history, continue the task, and repeat. Each loop is another model call.

## Why my first count was too low

The first pass found about 12.89 billion Codex tokens. That number came from a local Codex state database that stores one total token counter per thread or session. That was useful, but it undercounted the cost story.

The deeper scan found three layers of Codex accounting.

| Layer | What it measured | Result |
|---|---|---:|
| Session-final counters | Last known total per local Codex session | 12.89B |
| Monthly Codex report | Reconciled monthly usage by model and token class | 22.94B reported tokens, $8,926.98 |
| Raw `last_token_usage` events | Per-request event stream parsed from JSONL logs | 23.98B request tokens, about 46.53B including cache |

The monthly report is the number I would publish. The raw event scan is a useful upper-bound cross-check, but it can differ because of resumed sessions, timestamp grouping, duplicated telemetry or a different report window.

The important correction is this. If you want a billing-style number for Codex, sum per-request usage or use the monthly usage report. Don't rely only on the session-final `tokens_used` counter.

I checked local app state, databases, JSONL files, and provider endpoints where available. I avoided publishing prompt contents and redacted API keys. These were the useful local sources.

| Tool | Useful local source |
|---|---|
| Codex | `~/.codex/sessions/**/*.jsonl`, `~/.codex/state_5.sqlite`, `~/.codex/logs_2.sqlite`, plus the monthly report screenshot |
| opencode | SQLite DB under `~/.local/share/opencode/` |
| Claude Code and Claude Desktop | `~/.claude.json`, Claude desktop local-agent audit logs |
| Aider | `.aider.chat.history.md` files |
| Goose | JSONL sessions under `~/.local/share/goose/sessions/` |
| OpenHands | Event JSON files under `~/.openhands/sessions/` |
| LM Studio | Conversation JSON under `~/.lmstudio/conversations/` |
| Gemini CLI | `~/.gemini/tmp/*/logs.json` |
| Qwen CLI | `~/.qwen/tmp/*/logs.json` |
| Zed and Droid | Found through the `tokscale` usage cache |
| OpenRouter | Local API keys, supplied non-management key, and `/api/v1/key` checks |
| fal.ai | Local project traces plus supplied key checks, but no usable usage counter |
| Lovable and Replit | Browser and project traces, no usable local billing counter |

I also found a cached `tokscale` rollup.

```text
~/.config/tokscale/cache/tui-data-cache.json
```

That cache reported this.

| tokscale metric | Value |
|---|---:|
| Total normalized tokens | 13,537,863,939 |
| Total normalized cost | $6,438.80 |
| Model buckets | 21 |
| Clients with usable model buckets | Codex, opencode, Zed, Droid |

That number is useful, but it's not counted the same way as the Codex monthly report. It normalizes and groups data differently. I used it mainly to find extra clients and cost buckets I had missed.

Codex was the giant, but the other tools still mattered.

opencode had a real SQLite database with token accounting per message. These are the recovered totals.

| Field | Count |
|---|---:|
| Input tokens | 18,329,400 |
| Output tokens | 215,350 |
| Reasoning tokens | 116,322 |
| Cache read | 33,616,558 |
| Cache write | 229,289 |
| Total token traffic | 52,504,268 |
| Cost | $15.50 |

Models included OpenRouter GLM, Gemini preview through OpenRouter, and opencode/free model buckets.

Claude had two useful local sources. One is `~/.claude.json`, which stores project summary counters. The other is the Claude Desktop local-agent audit logs, which include model usage summaries. Together they gave this.

| Field | Count |
|---|---:|
| Non-cache request tokens | 2,607,194 |
| Cache tokens | 115,582,148 |
| Total token traffic | 118,189,342 |
| Cost | $276.64 |

This is a good example of why cache matters. Most of the Claude token traffic was cache read or cache creation, not fresh prompt or output.

OpenHands stored real per-response usage in event files.

| Field | Count |
|---|---:|
| Prompt tokens | 71,243,196 |
| Completion tokens | 520,526 |
| Total tokens | 71,763,722 |
| Logged cost | $0 |

The model bucket was `openrouter/sonoma-sky-alpha`, which showed up as free in the local accounting.

Goose had cumulative session counters.

| Field | Count |
|---|---:|
| Input tokens | 66,266,561 |
| Output tokens | 1,032,059 |
| Total tokens | 67,298,620 |
| Estimated cost | ~$30.29 |

The current Goose config pointed to OpenRouter with `z-ai/glm-4.6`, and older config backups also showed `x-ai/grok-code-fast-1`. Because single session rows did not keep the model, I treated the Goose cost as an estimate.

Aider was simple. It writes token and cost lines into chat history files.

| Field | Count |
|---|---:|
| Sent tokens | 1,560,000 |
| Received tokens | 122,271 |
| Total tokens | 1,682,271 |
| Cost | $4.20 |

I de-duplicated identical history files by hash so a backup copy would not count twice.

LM Studio is mostly local model usage, not API spend. It still had generation stats in conversation JSON.

| Field | Count |
|---|---:|
| Prompt tokens | 8,796 |
| Predicted tokens | 6,981 |
| Total local generation tokens | 15,777 |

This is not API burn unless a remote provider was involved, and the local files did not show that.

Gemini and Qwen had local logs, but I did not find reliable provider-style token usage counters. I only found rough prompt text traces.

| Tool | Sessions and messages | Rough text estimate |
|---|---:|---:|
| Gemini CLI | 17 sessions, 76 user messages | ~38,690 text tokens |
| Qwen CLI | 2 sessions, 9 user messages | ~163 text tokens |

I did not count those as billable provider usage. They are just rough text-size estimates.

Zed and Droid came from the `tokscale` cache, not from parsing app-specific logs by hand.

| Tool | Token traffic | Cost |
|---|---:|---:|
| Zed | 19,617,168 | $56.59 |
| Droid | 4,219,875 | $29.70 |

## OpenRouter, fal.ai, Lovable and Replit

I also checked provider-adjacent tools and account traces. The deeper local pass searched config folders, agent state folders, project directories, browser application support, package caches and known CLI state for OpenRouter, fal.ai, Lovable and Replit artifacts. It found project code, SDK packages, pricing caches, config files and browser and project traces, but no real local billing ledger for the missing providers.

Let's start with OpenRouter. I found three local OpenRouter API keys in tool configs. After I suspected the OpenRouter traffic was much larger, I also tested one more supplied OpenRouter key. I queried the OpenRouter current-key endpoint with each key and redacted the key values. Here are the results.

| Key source | Current-key usage | Account-wide access |
|---|---:|---|
| Aider key | $4.820189682 | No |
| OpenHands key | $0 | No |
| Refact key | $0.063351337 | No |
| Supplied test key | $0 | No |

Then I tried OpenRouter's `/api/v1/activity` endpoint for account activity. Each key returned the same thing.

```text
Only management keys can fetch activity for an account
```

So the OpenRouter check is not a full account-wide history. It's only the usage visible to those specific API keys.

The supplied key also failed the management-key listing endpoint.

```text
Invalid management key
```

OpenRouter documents that `/api/v1/activity` returns activity for the last completed 30 UTC days and needs a management key. A normal API key can report its own current usage, but not the whole account.

This means the OpenRouter number in the article is almost certainly too low if the account had heavier dashboard usage, deleted keys, rotated keys, BYOK activity, or other apps that did not keep local logs. To include the missing OpenRouter spend, I need an OpenRouter management key with access to `/api/v1/activity`, or a dashboard export or screenshots for monthly usage, or a list of all historical API keys plus their current-key usage, if the keys still exist and usage has not reset.

With a management key, the account-level call is this.

```bash
curl https://openrouter.ai/api/v1/activity \
  -H "Authorization: Bearer $OPENROUTER_MANAGEMENT_KEY"
```

For a single normal key, the limited call is this.

```bash
curl https://openrouter.ai/api/v1/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

The first endpoint can give activity per day, model and provider. The second can only say what that one key reports right now.

Then fal.ai. I found fal.ai code and project traces, including text-to-speech and speech-to-text experiments, but no local billing counter that could produce account usage. After I suspected the fal.ai traffic was much larger, I tested one supplied fal.ai key against account billing and usage-style endpoints.

The result was important. The key did not prove zero spend. It proved that this key was not allowed to read the billing ledger.

| fal.ai check | Result |
|---|---|
| Account billing | Authorization error, the key was not permitted to perform the action. |
| Model usage from 2024-01-01 through 2026-05-19 | Returned only an error object, no rows to add up. |
| Billing events for the last 90 days | Returned only an error object, no events to add up. |

Because those calls returned authorization errors, I did not add `$0` to the report. `$0` would be misleading. The correct state is "unknown and probably missing".

fal.ai also does not map cleanly to LLM token accounting. Their docs describe model billing by successful outputs and model-specific billing units, paid with prepaid credits. So a fal audit needs a fal dashboard or API key, not just local token parsing.

This is also likely undercounted. fal.ai usage often lives in the dashboard and not in local app logs. A local app may call fal, get audio, image or video output URLs back, and never store the billing unit or credit burn. To include fal.ai, I need a fal.ai dashboard billing or usage export, or a screenshot or CSV of credit purchases and credit drawdown, or a fal.ai admin or team key that is permitted to read billing or usage endpoints, if that access exists for the account.

The important difference is that fal.ai should not go into the token table as if it were LLM text. It should be its own spend bucket.

| fal.ai metric | How to report it |
|---|---|
| Credits burned | Add to total dollar spend |
| Audio, video and image generations | Report as output units |
| Text tokens | Only include if the specific fal model exposes token usage |

So the corrected future headline should probably be "45B+ AI token-events locally proven, plus OpenRouter and fal.ai dashboard spend still to add".

For Lovable I found these traces.

```text
lovable.dev browser IndexedDB traces
magic-prf.lovable.app browser IndexedDB traces
local .lovable project metadata
lovable-tagger packages
lovable upload folders
```

I did not find local token, credit or billing counters. Lovable is probably best audited from its dashboard, not from the local browser IndexedDB files.

For Replit I looked for project metadata, tokens, local DBs and browser traces. I did not find a usable local usage counter.

## How we reproduced the numbers

The rough workflow was this.

1. Inventory likely AI-tool directories.
2. Search for usage fields without dumping conversation contents.
3. Identify structured stores, so SQLite, JSONL, JSON and Markdown histories.
4. Parse only total counters.
5. De-duplicate histories and session summaries where possible.
6. Cross-check local counters against provider docs and provider endpoints.
7. Separate request tokens from cache traffic.

The first broad scan looked for installed tool state.

```bash
find ~ -maxdepth 3 -type d \
  | rg -i 'codex|claude|opencode|gemini|qwen|goose|aider|openhands|cursor|windsurf|zed|replit|lovable|lmstudio|ollama'
```

Then I searched for usage fields.

```bash
rg -n -i 'input_tokens|output_tokens|total_tokens|cached_tokens|cache_read|usage|cost' \
  ~/.codex ~/.claude ~/.opencode ~/.gemini ~/.qwen ~/.local/share/goose ~/.openhands ~/.lmstudio
```

For Codex, the useful event looked like this.

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

The key discovery was that `total_token_usage` is cumulative within a session. If you sum every `total_token_usage` row, you overcount like crazy. For billing-style accounting you want per-request `last_token_usage`, or a reconciled usage report.

A simplified Codex parser looks like this.

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

For SQLite-backed tools like opencode the method was different.

```bash
sqlite3 ~/.local/share/opencode/opencode.db ".schema"
```

Then you parse the JSON fields in the message table, and specifically the `tokens` object, not the duplicated part rows.

For Aider the usage was plain text.

```bash
rg -n 'Tokens: .* sent, .* received|Cost:' ~/Developer ~/.aider
```

For OpenRouter current-key usage.

```bash
curl https://openrouter.ai/api/v1/key \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

For OpenRouter account-wide activity.

```bash
curl https://openrouter.ai/api/v1/activity \
  -H "Authorization: Bearer $OPENROUTER_MANAGEMENT_KEY"
```

The second command needs a management key.

I used three kinds of cost data. Costs logged directly by the tool, costs shown in the Codex monthly usage report, and estimates from current public pricing where the local logs had tokens but no cost.

For pricing, OpenAI API pricing lists current per-1M-token prices for GPT-5.5, GPT-5.4 and GPT-5.3-Codex. OpenAI's Codex rate card explains the move to token-based Codex accounting and separates input, cached input and output credits. Anthropic publishes Claude pricing by model and token class. OpenRouter shows current-key usage via `/api/v1/key`, and full activity needs a management key. And fal.ai bills model APIs by successful outputs and model-specific billing units, paid with prepaid credits.

The cost estimate is not a perfect invoice. It's a "what would this look like at API-style rates?" estimate. Some usage may be included in subscriptions, free tiers, research previews or internal tool allocations. Some local logs record estimated cost instead of settled provider billing.

## Why agent usage gets so large

The surprising thing is not that the machine used AI. The surprising thing is how fast agents multiply context.

A normal chat is basically a user prompt and an assistant answer. An agentic coding loop is more like this.

1. User asks for a change.
2. Agent reads repo files.
3. Model call.
4. Agent runs searches.
5. Model call.
6. Agent runs tests.
7. Model call.
8. Agent reads errors.
9. Model call.
10. Agent edits files.
11. Model call.
12. Agent verifies.
13. Model call.

Each step can include system instructions, developer instructions, tool definitions, the earlier conversation, file excerpts, command output, diffs, test failures, screenshots, browser state and safety policies.

That's why cache-read tokens were almost as large as fresh request tokens in Codex.

| Codex category | Tokens |
|---|---:|
| Fresh input + output + reasoning | 23.05B |
| Cache read | 21.58B |

The cache makes this cheaper than it would be otherwise, but it also shows the real shape of agent usage. Context is the real fuel.

## What I learned

First, "total tokens" means too many things. A dashboard total, a session counter, a per-request raw event and a provider invoice can all be true and still show different numbers.

Second, local logs are incredibly useful. A lot of tools quietly keep enough metadata to rebuild usage without sending prompts anywhere.

Third, provider dashboards still matter. OpenRouter, fal.ai, Lovable, Replit and similar services may not leave full billing histories locally. For those you need dashboard exports or scoped management keys.

Fourth, agentic coding is not expensive because output is long. It's expensive because input context is huge and gets revisited again and again.

In my case, the visible model answers were only a tiny slice of the total. The real burn was in context, tool output, repository inspection and cached prompt reuse.

So if I had to share it in one line, it's this.

> I audited every AI tool I could find on my Mac. The machine had evidence of about 45 billion token-events and roughly $9.3k of API-equivalent usage. Almost all of it came from Codex doing agentic coding work.

## References

- OpenAI API pricing, https://developers.openai.com/api/docs/pricing
- OpenAI Codex rate card, https://help.openai.com/en/articles/20001106-codex-rate-card
- Anthropic Claude pricing, https://platform.claude.com/docs/en/about-claude/pricing
- OpenRouter current key endpoint, https://openrouter.ai/docs/api/api-reference/api-keys/get-current-key
- OpenRouter activity endpoint, https://openrouter.ai/docs/api/api-reference/analytics/get-user-activity
- fal.ai pricing model, https://fal.ai/docs/documentation/model-apis/pricing
- fal.ai authentication, https://fal.ai/docs/documentation/setting-up/authentication

![cover](../../../media/i-asked-my-mac-how-much-ai-i-burned-it-found-45-billion-token-events/cover.webp)
