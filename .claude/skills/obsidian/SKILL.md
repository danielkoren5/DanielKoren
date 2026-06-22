---
name: obsidian
description: "Obsidian mastery — personal knowledge management with Obsidian. Covers: vault setup and organization, Zettelkasten and PARA methods, daily notes and journaling, templates with Templater, Dataview queries, backlinks and graph view, Maps of Content (MOCs), essential plugins (Dataview, Templater, Obsidian Git, Tasks, Kanban, Calendar, Excalidraw), metadata and frontmatter, tags and folders strategy, note-linking strategies, publishing with Obsidian Publish, syncing across devices, and PKM workflows. Actions: organize, create, structure, link, query, template, build, design, plan, automate. Topics: vault, notes, backlinks, graph, Dataview, Templater, Zettelkasten, PARA, MOC, PKM, daily notes, plugins, frontmatter."
---
# Obsidian Skill — Personal Knowledge Management Mastery

Complete guide to building a powerful Obsidian vault — from first note to interconnected knowledge system.

## When to Apply

Use when:
- Setting up or reorganizing an Obsidian vault
- Asking about note-taking methodologies (Zettelkasten, PARA, etc.)
- Writing Dataview queries
- Creating Templater templates
- Building a daily notes or journaling system
- Designing a PKM (Personal Knowledge Management) workflow
- Troubleshooting links, plugins, or graph view
- Migrating notes from other tools (Notion, Roam, Evernote)

---

## Vault Organization Strategies

### Option A: PARA Method
```
📁 1 - Projects/        # Active projects with a deadline
📁 2 - Areas/           # Ongoing responsibilities (health, finance, work)
📁 3 - Resources/       # Reference material by topic
📁 4 - Archives/        # Completed or inactive items
📁 0 - Inbox/           # Unsorted notes (process weekly)
📁 Templates/           # All Templater templates
📁 Attachments/         # Images, PDFs, media
```

### Option B: Zettelkasten
```
📁 Fleeting/            # Quick captures (process within 24h)
📁 Literature/          # Notes from books, articles, videos
📁 Permanent/           # Atomic, evergreen ideas (the core)
📁 MOC/                 # Maps of Content (index notes)
📁 Daily/               # Daily notes
📁 Templates/
📁 Attachments/
```

### Option C: Flat (Johnny Decimal)
```
📁 10-19 Life/
📁 20-29 Work/
📁 30-39 Learning/
📁 40-49 Projects/
📁 00 Inbox/
```
**Rule**: Max 2 folder levels. Use tags and links instead of deep nesting.

---

## Note-Taking Methodologies

### Zettelkasten — The Slip Box System
1. **Fleeting note** — Quick capture, messy, in your own words
2. **Literature note** — Summary of one source, with citation
3. **Permanent note** — One idea, atomic, standalone, links to related notes

**Atomic note rules:**
- One idea per note
- Written as if explaining to a stranger (no assumed context)
- Linked to at least 2 existing notes
- Title is a full sentence or claim, not a topic

**Example permanent note title:**
> "Spaced repetition works because forgetting is the mechanism of memory consolidation"

### PARA — For Action-Oriented Workflows
- **Projects**: Things with a clear end goal and deadline
- **Areas**: Standards you maintain indefinitely (e.g., "Health" = staying fit)
- **Resources**: Topics you may want to reference later
- **Archives**: Everything that's no longer active

---

## Daily Notes System

### Minimal Daily Note Template
```markdown
---
date: {{date:YYYY-MM-DD}}
day: {{date:dddd}}
week: {{date:YYYY-[W]ww}}
---

## Today's Focus
- [ ] 

## Notes & Captures

## Gratitude

## End of Day Reflection
```

### Weekly Review Template
```markdown
---
date: {{date:YYYY-MM-DD}}
type: weekly-review
week: {{date:YYYY-[W]ww}}
---

## What went well this week?

## What drained me?

## Did I move my projects forward?

## Next week's priorities
1. 
2. 
3. 

## Notes to process
```

---

## Dataview Query Cookbook

Dataview lets you query your vault like a database. Add `dataview` as the code block language.

### List all notes by tag
````markdown
```dataview
LIST
FROM #project
SORT file.mtime DESC
```
````

### Table of tasks due this week
````markdown
```dataview
TABLE due, priority, file.link AS "Note"
FROM #task
WHERE due <= date(today) + dur(7 days)
SORT due ASC
```
````

### Notes created this month
````markdown
```dataview
LIST
WHERE file.cday >= date(2024-01-01)
SORT file.cday DESC
```
````

### Unprocessed inbox notes
````markdown
```dataview
LIST
FROM "0 - Inbox"
SORT file.mtime ASC
```
````

### Count notes per tag
````markdown
```dataview
TABLE length(rows) AS "Count"
FROM ""
FLATTEN file.tags AS tag
GROUP BY tag
SORT length(rows) DESC
```
````

---

## Templater Templates

### Auto-naming a note based on input
```javascript
<%* 
  let title = await tp.system.prompt("Note title");
  await tp.file.rename(title);
%>
# {{title}}
Created: <% tp.date.now("YYYY-MM-DD") %>
```

### Book note template
```markdown
---
title: "<% tp.file.title %>"
author: 
genre: 
status: reading
rating: 
date-started: <% tp.date.now("YYYY-MM-DD") %>
date-finished:
tags: [book, literature-note]
---

## Summary

## Key Ideas

## Quotes

## My Reactions

## Related Notes
```

### Meeting note template
```markdown
---
date: <% tp.date.now("YYYY-MM-DD") %>
attendees: 
project: 
type: meeting
tags: [meeting]
---

## Agenda

## Notes

## Action Items
- [ ] 

## Decisions Made
```

---

## Essential Plugins

### Core Plugins (built-in, enable in Settings)
| Plugin | Use |
|--------|-----|
| Daily notes | Auto-create dated notes |
| Templates | Basic templating |
| Backlinks | See what links to current note |
| Outgoing links | See links from current note |
| Graph view | Visual map of connections |
| Tag pane | Browse all tags |
| Quick switcher | Fast note navigation |
| Starred | Bookmark important notes |

### Community Plugins (must-haves)
| Plugin | Use |
|--------|-----|
| **Dataview** | Query your vault like a database |
| **Templater** | Advanced templates with JS |
| **Obsidian Git** | Auto-backup to GitHub |
| **Tasks** | Advanced task management |
| **Calendar** | Calendar view for daily notes |
| **Kanban** | Trello-style boards in Markdown |
| **Excalidraw** | Whiteboard/diagrams in notes |
| **Readwise** | Sync highlights from books/articles |
| **Omnisearch** | Smarter full-text search |
| **Style Settings** | Customize themes |

---

## Frontmatter (Metadata) Best Practices

```yaml
---
title: "Note Title"
aliases: [alternate name, another name]   # Other names for this note
tags: [topic, project/name, type/article]
status: draft | in-progress | done
created: 2024-01-15
modified: 2024-01-20
source: "https://..."
related:
  - "[[Other Note]]"
  - "[[Another Note]]"
---
```

**Tag taxonomy tips:**
- Use `/` for hierarchy: `project/website`, `type/book-note`
- Keep top-level tags broad: `#work`, `#learning`, `#health`
- Don't over-tag — 2-4 tags per note max

---

## Maps of Content (MOCs)

An MOC is an index note that links to all notes in a topic area. It's a hub, not a folder.

```markdown
# MOC: Machine Learning

## Foundations
- [[What is a Neural Network]]
- [[Gradient Descent Explained]]
- [[Bias-Variance Tradeoff]]

## Methods
- [[Supervised vs Unsupervised Learning]]
- [[Decision Trees]]
- [[Transformer Architecture]]

## Projects
- [[ML Project: Customer Churn]]

## Resources
- [[Book: Deep Learning by Goodfellow]]
- [[Course: Fast.ai Notes]]
```

**When to create an MOC:**
- When you have 10+ notes on a topic and navigating feels hard
- When you want to see the shape of what you know about a topic
- Replace folders with MOCs wherever possible

---

## Backlinking Strategy

The power of Obsidian is in links. Rules for effective linking:

1. **Link on first mention** — whenever you write a concept, wrap it: `[[concept]]`
2. **Use block references** for quotes: `[[Note Title#^block-id]]`
3. **Use aliases** so links read naturally: `[[Spaced Repetition|SR]]`
4. **Orphan note check** — monthly, find notes with no links (Dataview: `WHERE length(file.inlinks) = 0`)

---

## Syncing Obsidian

| Method | Cost | Best For |
|--------|------|---------|
| **Obsidian Sync** (official) | $10/mo | Simplest, works everywhere |
| **iCloud** | Free | Apple-only |
| **Obsidian Git** plugin | Free | Tech users, GitHub backup |
| **Syncthing** | Free | Self-hosted, cross-platform |
| **Dropbox/Google Drive** | Varies | Desktop only (not reliable on mobile) |

---

## Obsidian Publish

Share your vault as a public website. Good for:
- Digital gardens
- Public notes / second brain
- Documentation

Cost: $20/month. Alternative: export to Quartz (free, self-hosted static site generator for Obsidian vaults).

---

## Migration Cheatsheet

### From Notion
1. Use Notion export → Markdown
2. Clean with Obsidian Importer plugin
3. Fix internal links (Notion uses UUIDs)

### From Roam Research
1. Export as Markdown
2. Convert `[[Page]]` links — already compatible
3. Handle `{{roam/templates}}` manually

### From Evernote
1. Export `.enex` files
2. Use Obsidian Importer plugin (handles `.enex`)
3. Clean up HTML artifacts

---

## Quick Reference

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + O` | Quick open note |
| `Cmd/Ctrl + P` | Command palette |
| `Cmd/Ctrl + E` | Toggle edit/preview |
| `Cmd/Ctrl + K` | Insert link |
| `[[` | Create/link note |
| `![[` | Embed note or image |
| `Cmd/Ctrl + G` | Open graph view |
| `Alt + Enter` | Open link in new pane |
