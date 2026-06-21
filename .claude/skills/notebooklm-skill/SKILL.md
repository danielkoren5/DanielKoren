---
name: notebooklm-skill
description: "Google NotebookLM mastery — using NotebookLM for research, content creation, and knowledge management. Covers: uploading and organizing sources (PDFs, URLs, YouTube videos, Google Docs), prompting strategies for deep source analysis, creating audio overviews and podcast-style summaries, building research notebooks, extracting key insights from documents, FAQ generation, study guide creation, interview prep, competitive research, and workflow integration with other AI tools. Actions: research, analyze, summarize, extract, create, build, study, compare, synthesize, upload."
---
# NotebookLM Skill - Google NotebookLM Mastery

Advanced techniques for using Google NotebookLM to research, synthesize, and create content from your sources.

## When to Apply

Use when:
- Researching a topic using multiple sources
- Analyzing PDFs, articles, or YouTube videos
- Creating study guides or summaries from documents
- Preparing for interviews or meetings with research prep
- Competitive intelligence gathering
- Turning documents into audio overviews
- Synthesizing multiple sources into coherent outputs

## NotebookLM Overview

NotebookLM is Google's AI research assistant that:
- **Grounds responses in YOUR sources** (not the internet) — no hallucinations about your docs
- **Supports**: PDFs, Google Docs, Google Slides, URLs, YouTube videos, audio files, pasted text
- **Creates**: Summaries, FAQs, study guides, briefing docs, audio podcasts
- **Max**: 50 sources per notebook, ~500,000 words per source

## Source Strategy

### What to Upload for Best Results
| Source Type | Best For | Tips |
|-------------|---------|------|
| PDF (research paper) | Deep analysis | Highlight-quality: text-based PDFs, not scanned images |
| YouTube URL | Video content extraction | Works on public videos with transcripts |
| Website URL | Web content | Use for blog posts, documentation |
| Google Doc | Living documents | Syncs automatically when updated |
| Pasted text | Quick additions | Paste transcripts, notes, emails |

### Notebook Organization
- **One topic per notebook** — Don't mix unrelated topics
- **10-20 sources is sweet spot** — More isn't always better
- **Name sources clearly** — NotebookLM uses source names in citations
- **Add context note** — Paste a brief context note as first source explaining what you're researching

## Power Prompting Strategies

### Deep Source Analysis
```
"Based only on the sources I've provided:
1. What are the 5 most important claims made?
2. What evidence supports each claim?
3. What do different sources disagree about?
4. What important questions are NOT answered by these sources?
5. What are the limitations of this research?"
```

### Cross-Source Synthesis
```
"Compare how [Source A] and [Source B] approach [topic]. 
What do they agree on? Where do they contradict each other? 
Which perspective seems better supported by evidence?"
```

### Extract Specific Information
```
"From all my sources, extract:
- All statistics and data points about [topic]
- All case studies mentioned
- All expert quotes about [specific claim]
Format as a table with source citations."
```

### Study Guide Generator
```
"Create a comprehensive study guide on [topic] based on my sources. Include:
- Core concepts with definitions
- 10 key facts to memorize
- Common misconceptions corrected
- 5 practice questions with answers
- A one-page summary"
```

### FAQ Generation
```
"Based on my sources, generate a FAQ document for [audience].
Include: the 10 questions they'd most want answered, clear answers grounded in sources, citations for each answer."
```

## Audio Overview (Podcast Feature)

NotebookLM's Audio Overview creates a ~10-minute podcast-style conversation between two AI hosts discussing your sources.

### Best Use Cases for Audio Overview
- Long commutes while processing research
- Understanding a topic at a high level before deep reading
- Sharing research with teammates who won't read the docs
- Creating a "podcast" summary of a report

### Tips for Better Audio Overviews
- Upload only the most relevant sources (5-8 is better than 25)
- Use the "Customize" option to give specific instructions
- Add a note telling it what angle or audience to focus on

## Workflow Integrations

### Research → Content Workflow
1. **NotebookLM**: Upload sources, extract key insights
2. **Claude**: Use extracted insights to write content (pass insights as context)
3. **Result**: Well-researched, grounded content at speed

### Competitive Research Workflow
1. Upload: Competitor website, pricing page, blog posts, job postings
2. Prompt: "Analyze my competitor's positioning, target market, differentiators, and weaknesses"
3. Export: Key findings to your strategy document

### Document Briefing Workflow
1. Upload long document (annual report, legal contract, research paper)
2. Prompt: "Create an executive briefing of this document for someone who has 5 minutes"
3. Follow up: "What are the 3 most important risks or concerns I should flag?"

### Interview/Meeting Prep Workflow
1. Upload: Company website, recent news, interview job description, interviewer's LinkedIn (as text)
2. Prompt: "I'm interviewing at this company for [role]. What should I know? What questions should I prepare for? What are good questions for me to ask?"

## Limitations to Know
- **Not real-time**: NotebookLM doesn't browse the internet during a session
- **No external knowledge**: Only knows what's in your sources (feature AND limitation)
- **Source freshness**: URL sources are fetched at upload time, not in real-time
- **Language**: Best in English, improving for other languages
- **Privacy**: Don't upload confidential documents to the free version (check enterprise terms)
