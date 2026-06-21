---
name: claude-skills
description: "Meta skill for creating, designing, and optimizing Claude Code skills. Covers: skill architecture (SKILL.md structure, frontmatter, description optimization), data design (CSV schema, BM25 search optimization, column selection), script patterns (search.py, core.py templates), skill trigger design (how Claude detects when to use a skill), testing and validation, skill distribution and versioning. Actions: create, design, build, improve, audit, test, optimize. Topics: SKILL.md, frontmatter, description, CSV data, BM25, search, scripts, trigger, architecture."
---
# Claude Skills - Meta Skill for Skill Creation

How to design, build, and optimize Claude Code skills — the complete reference for skill architecture.

## When to Apply

Use when:
- Creating a new Claude Code skill
- Improving an existing skill's effectiveness
- Troubleshooting why a skill isn't triggering
- Designing skill data architecture
- Writing optimal skill descriptions for the system prompt

## Skill Architecture

### Directory Structure
```
.claude/skills/
└── your-skill-name/
    ├── SKILL.md           ← Required: skill definition and instructions
    ├── data/
    │   ├── topic1.csv     ← Searchable knowledge base
    │   └── topic2.csv
    └── scripts/
        ├── search.py      ← Search interface
        └── core.py        ← BM25 engine + data config
```

### SKILL.md Frontmatter
```yaml
---
name: skill-name           # Kebab-case, matches directory name
description: "..."         # CRITICAL: This goes in Claude's system prompt
---
```

### Description Engineering (Most Critical Part)
The description is what determines when Claude activates this skill. It should include:
1. **Domain keywords** — What topics trigger it
2. **Action verbs** — What tasks it helps with
3. **Output types** — What it produces
4. **Trigger phrases** — What users say that should activate it

**Formula:**
```
"[Domain] intelligence for [audience]. Covers: [topic1], [topic2], [topic3]. 
Actions: [verb1], [verb2], [verb3]. 
Topics: [keyword1], [keyword2], [keyword3]."
```

## CSV Data Design

### Good CSV Schema Principles
1. **Search columns** — Columns BM25 searches against (keywords, description, topic)
2. **Output columns** — Columns returned to Claude (implementation details, examples)
3. **Column names** — No spaces (use underscores for multi-word)
4. **Values** — Specific, varied vocabulary for good BM25 matching
5. **Rows** — Each row is a distinct concept/pattern (10-20 rows per domain is good)

### Column Selection Guide
| Purpose | Column Type | Example |
|---------|-------------|---------|
| Searchable | Keywords, Description, Type | "email marketing nurture sequence drip" |
| Guidance | Do, Dont | "Always include X. Never do Y." |
| Examples | Example, Template | Concrete examples Claude can use |
| Context | Best For, When To Use | When to apply this pattern |
| Metrics | Impact, Benchmark | Success criteria |

## BM25 Search Optimization

### What BM25 Does
Ranks rows by relevance to a query using term frequency × inverse document frequency. Rare terms in few rows get high weight. Common terms across all rows get low weight.

### Making Your Data More Searchable
- **Vary vocabulary**: Use synonyms and related terms in keyword columns
- **Be specific**: "email subject line open rate split test A/B" >> "email"
- **Avoid repetition**: If every row has "marketing", that word gets low IDF weight
- **Include jargon**: Technical terms users would search for

## Script Template (copy-paste)

`scripts/core.py` — Copy from any existing skill, update:
1. `CSV_CONFIG` dict — Add your domains and CSV files
2. `detect_domain()` — Add keyword → domain mappings

`scripts/search.py` — Mostly identical across all skills, just update:
1. Import from `core`
2. The description string in `format_output()`

## Trigger Design

### Automatic Skill Triggering
Claude activates a skill when the user's request matches skill description keywords. Improve trigger reliability by:
- Adding specific user phrases to description
- Including common misspellings and abbreviations
- Covering both the task AND the domain

### Manual Skill Triggering
Users can invoke any skill with `/skill-name` slash command.

## Testing Your Skill

```bash
# Test search works
python3 .claude/skills/your-skill/scripts/search.py "test query" --domain domain_name

# Test auto-detection
python3 .claude/skills/your-skill/scripts/search.py "test query" 

# Test all domains have data
for domain in domain1 domain2 domain3; do
  python3 .claude/skills/your-skill/scripts/search.py "test" --domain $domain
done
```

## Quality Checklist
- [ ] SKILL.md frontmatter has name and description
- [ ] Description covers all trigger scenarios in 2-3 sentences
- [ ] Each domain has 8-15 rows (enough variety, not too sparse)
- [ ] Keyword columns have varied, specific vocabulary
- [ ] Do/Dont columns give actionable guidance
- [ ] Example column has concrete, copy-paste-able examples
- [ ] search.py tested and returns results for all domains
- [ ] Auto-detection returns correct domain for representative queries
