# growth/

Daily organic-growth loop for emin.de. Node 22 built-ins only, no dependencies, no LLM calls.

```
node growth/daily.mjs            # daily numbers -> data/daily/<date>.json + reports/<date>.md
node growth/keywords.mjs         # weekly keyword gaps -> keywords/<YYYY-Www>.md (about 3 min)
node growth/ai-visibility.mjs    # weekly AI citations; all paid engines OFF by default
node --test growth/tests/*.test.mjs
```

- Teaching guide: [COACH.md](COACH.md)
- Learning log: [LEARNINGS.md](LEARNINGS.md)
- Proposed schedule (not active): [CRON.md](CRON.md)
- Reusable skill draft: [skills/organic-growth-coach/SKILL.md](skills/organic-growth-coach/SKILL.md)
- Seeds: [seeds.json](seeds.json), prompts: [prompts.yml](prompts.yml)

Posts are read from `content/posts` if present, else from `git show origin/feat/blog-engine:content/posts/...` (override with `GROWTH_POSTS_REF`). Site via `GROWTH_SITE` (default https://emin.de).

IndexNow log: `daily.mjs` reads `growth/data/indexnow-pings.jsonl` (one `{"at","http","urls"}` line per ping). The engine's `plugins/indexnow.mjs` does not write it yet; add one `appendFileSync` there after PR #2 lands.
