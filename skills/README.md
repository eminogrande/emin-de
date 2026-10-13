# Skills

Reusable agent playbooks for this Markdown-first blog engine. Each skill is one `SKILL.md` with YAML front matter (`name`, `description`, `license`) and imperative steps. Skills never hardcode a site: read identity, locales, authors, categories and formats from `site.config.mjs`.

| Skill | Use when | Main output |
| --- | --- | --- |
| [transcript-to-post](transcript-to-post/SKILL.md) | A human recorded a talk, voice memo or interview and wants a post in their voice | Draft post + quote ledger + PR |
| [daily-ai-desk-post](daily-ai-desk-post/SKILL.md) | The AI editorial desk writes its one daily, openly labelled post from public sources | Draft post by the `ai_editorial` author |
| [repurpose-to-social](repurpose-to-social/SKILL.md) | A post is published and needs X, LinkedIn, video and newsletter versions | One draft file with all variants, UTM links |
| [weekly-traffic-report](weekly-traffic-report/SKILL.md) | Weekly (or daily, `--days 1`) traffic review | Private markdown report + 3 actions |
| [monthly-seo-aio-audit](monthly-seo-aio-audit/SKILL.md) | Monthly SEO, AI-search (AIO/GEO) and agent-readiness audit | Dated findings file + issues |

## Shared contract

- Posts live at `content/posts/<lang>/<yyyy>/<slug>.md`. Front matter schema: see the engine README.
- New draft: `npm run new -- --lang en --category <category> --format <format> --author <id> "Title"`.
- Validate: `npm run check` and `python3 plugins/check_draft.py DRAFT.md [TRANSCRIPT.txt]`.
- Every H2 section has a `basically` entry; every post has a `tldr`.
- No em dashes. No invented facts. No secrets in the repo.
- Agents open a PR on a branch. Never push to `main`. A human sets `reviewed_by_human: true`.

## Use with any agent

- **Claude Code:** copy or symlink a skill folder into `.claude/skills/` (project) or `~/.claude/skills/`; Claude loads it when the description matches.
- **Hermes Agent:** `hermes skills install` from this repo path (or copy into `~/.hermes/skills/<name>/`); load with `skill_view(name)`.
- **Codex / other agents:** reference the file in `AGENTS.md` (e.g. "For transcripts follow `skills/transcript-to-post/SKILL.md`") or paste it into the task prompt.
