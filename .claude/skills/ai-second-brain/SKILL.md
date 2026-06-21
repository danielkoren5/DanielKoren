---
name: ai-second-brain
description: "Build and use an AI-powered second brain for knowledge management, learning acceleration, and personal productivity. Covers: personal knowledge management (PKM) with AI, note-taking systems (Zettelkasten, PARA, Johnny Decimal), building a knowledge base Claude can search, learning acceleration techniques, AI-assisted journaling and reflection, daily review systems, building a personal prompt library, connecting ideas across domains, research workflows with AI, and memory augmentation techniques. Actions: organize, learn, capture, connect, review, build, recall, synthesize, research. Tools: Notion, Obsidian, Roam, Logseq, Mem."
---
# AI Second Brain - Knowledge Management Intelligence

Systems and frameworks for using Claude as a second brain — organizing knowledge, accelerating learning, and connecting ideas across domains.

## When to Apply

Use when:
- Building a personal knowledge management system
- Wanting to capture and retrieve knowledge better with AI
- Creating a personal prompt library
- Building workflows for research and learning
- Designing AI-assisted review and reflection systems
- Organizing information in Notion, Obsidian, or similar tools

## The AI Second Brain System

### Core Principle: Capture → Process → Connect → Retrieve

```
Capture: Raw input (articles, ideas, notes, conversations)
    ↓
Process: Summarize, extract key ideas, add context (Claude)
    ↓
Connect: Link to existing knowledge, identify patterns (Claude)
    ↓
Retrieve: Search and synthesize when needed (Claude)
```

## PKM System Options

### 1. PARA Method (Tiago Forte)
- **Projects**: Active work with a deadline
- **Areas**: Ongoing responsibilities (health, finances, work)
- **Resources**: Reference material by topic
- **Archives**: Inactive items

**With AI**: Claude helps classify notes into PARA, synthesizes resources into summaries, and surfaces relevant archives during active projects.

### 2. Zettelkasten (Card-Based)
- **Fleeting notes**: Capture quickly (raw)
- **Literature notes**: Summarize sources in your words
- **Permanent notes**: Single ideas in full sentences, linked to others
- **Index**: Entry points to concept clusters

**With AI**: Claude converts fleeting notes to permanent notes, suggests links to existing cards, and synthesizes concept clusters on demand.

### 3. Daily Notes + AI Review
Daily input → Weekly AI synthesis → Monthly insight extraction

## AI-Powered Learning Acceleration

### The Feynman Technique (AI Edition)
1. Ask Claude to explain a concept simply
2. Try to explain it back in your own words
3. Ask Claude: "What did I miss? Where was I vague?"
4. Repeat until you can explain it to a 10-year-old

### Spaced Repetition Prompts
"I'm learning [topic]. Ask me 5 questions to test my understanding, then tell me which gaps I have."

### Concept Connection
"I know X well. How does the new concept Y relate to or differ from X? What mental models transfer?"

### Expert Interview Simulation
"Act as a world-class expert in [field]. I'll ask you questions about [topic] and you'll give me the depth of explanation you'd give a smart graduate student."

## Building Your Prompt Library

### Structure
```
/prompts
  /research
    deep-dive.md
    synthesis.md
    literature-review.md
  /writing
    blog-post.md
    email.md
    linkedin.md
  /learning
    concept-explainer.md
    quiz-generator.md
    feynman.md
  /thinking
    devils-advocate.md
    decision-matrix.md
    assumption-challenger.md
```

### Prompt Template Format
```markdown
## [Prompt Name]
**Use when**: [situation]
**Input**: [what to provide]
**Output**: [what you get]

### Prompt:
[The actual prompt with [VARIABLES] in brackets]

### Example:
[Example input and output]
```

## Daily AI Review System

### Morning (5 min)
Paste yesterday's notes: "Summarize my yesterday's notes into: (1) 3 key things I learned, (2) 2 open questions, (3) 1 connection to previous knowledge."

### Weekly (20 min)
Paste week's notes: "Synthesize this week's learning. What are the emerging themes? What ideas should I explore further? What patterns do I see?"

### Monthly (30 min)
"Given this month's notes and insights, what are: (1) the most important ideas I encountered, (2) surprising connections between different topics, (3) knowledge gaps to fill next month?"

## Knowledge Base Architecture for Claude

### Feeding Context Efficiently
- **Project Brief**: One document with all context → paste at conversation start
- **Knowledge Dump**: Key facts, preferences, constraints → keep it under 2000 tokens
- **Running Memory**: Maintain a markdown file of ongoing decisions and context

### The Personal Context Document
```markdown
# My Context
## About Me
[Role, goals, expertise level, communication style preference]

## Current Projects
[Active projects and their status]

## My Knowledge Base
[Key things Claude should know about my domain/work]

## My Preferences
[Output format, detail level, tone, language]
```

## Tools Integration

| Tool | Best For | AI Integration |
|------|---------|----------------|
| Obsidian | Connected note-taking, Zettelkasten | Claude plugin / API |
| Notion | Project management + docs | Claude integration, API |
| Readwise | Book/article highlights | Reader + AI summary |
| Mem | AI-native notes with search | Built-in AI |
| Logseq | Open-source outliner | Local LLM or API |
