---
name: claude-seo
description: "SEO powered by Claude AI — using Claude for all SEO tasks. Covers: AI-powered keyword research and clustering, meta title and description generation, SEO content briefs, on-page optimization, title tag formulas, content gap analysis prompts, schema markup generation, internal linking strategies, competitor analysis with AI, SEO audit checklists, FAQ schema generation, blog post SEO optimization, and programmatic SEO frameworks. Actions: write, generate, optimize, research, audit, analyze, create, build. Topics: keyword research, meta tags, content brief, schema, on-page, technical SEO, content writing, title tags."
---
# Claude SEO - AI-Powered SEO Intelligence

Using Claude to accelerate and improve every part of your SEO workflow — from keyword research to content creation to technical audits.

## When to Apply

Use when:
- Doing keyword research or content planning
- Writing or optimizing meta titles and descriptions
- Creating SEO content briefs
- Generating FAQ schema markup
- Auditing on-page SEO elements
- Planning internal linking strategies
- Writing SEO-optimized blog posts
- Building programmatic SEO content

## Claude SEO Prompt Library

### Keyword Research

**Keyword Expansion:**
```
"I'm targeting the keyword '[seed keyword]'. Generate:
1. 15 long-tail keyword variations
2. 5 question-based keywords (who, what, how, why, when)
3. 5 comparison keywords ([keyword] vs [alternative])
4. 5 buyer-intent keywords
5. 3 local variations (if applicable)
Group by search intent: informational, navigational, commercial, transactional."
```

**Keyword Clustering:**
```
"Group these keywords into topic clusters based on search intent and topic similarity. For each cluster, identify: the primary keyword, supporting keywords, recommended content type, and funnel stage.
Keywords: [paste your keyword list]"
```

### Meta Tags

**Title Tag Formula:**
```
"Write 5 meta title tag variations for a page about [topic] targeting the keyword '[keyword]'. 
Rules: Under 60 characters, include keyword near the front, include a hook or differentiator. 
Format: Option 1: [title] (X chars)"
```

**Meta Description:**
```
"Write 3 meta description variations for [page topic] targeting '[keyword]'.
Rules: 140-155 characters, include keyword naturally, clear benefit, call to action.
Audience: [target audience]
USP: [what makes this page/offer different]"
```

### Content Briefs

**Full SEO Content Brief:**
```
"Create a comprehensive SEO content brief for a blog post targeting '[target keyword]'.
Include:
1. Target keyword + 5 related secondary keywords
2. Search intent analysis (who searches this, what they want to find)
3. Recommended word count range
4. Suggested H1 title (3 options)
5. Outline with H2 and H3 sections
6. Key questions to answer (FAQ section topics)
7. Internal linking opportunities (what to link from/to)
8. Content differentiation suggestions (what competitors probably miss)
9. E-E-A-T signals to include (expertise, experience, authority, trust)"
```

### Schema Markup

**FAQ Schema:**
```
"Create JSON-LD FAQ schema markup for a page about [topic].
Generate 8 FAQ pairs with answers based on common questions people ask about [topic].
Format as valid JSON-LD ready to paste in a <script type='application/ld+json'> tag."
```

**Article Schema:**
```
"Generate JSON-LD Article schema for:
Title: [title]
Author: [name, credentials]
Published: [date]
Modified: [date]
Image: [URL]
Publisher: [company name]"
```

### On-Page Optimization

**Page Audit:**
```
"Audit this page's on-page SEO. I'll provide:
1. The URL: [URL]
2. Target keyword: [keyword]
3. Current title tag: [title]
4. Current meta description: [meta]
5. Page content (paste the key sections)

Analyze: title tag optimization, meta description, H1-H3 structure, keyword usage, internal linking opportunities, content depth, FAQ opportunities, schema recommendations."
```

**Content Optimization:**
```
"Optimize this blog post for the target keyword '[keyword]' while keeping it readable and natural.
Current post: [paste content]
Add: keyword variations, subheadings with LSI keywords, a FAQ section, better intro hook, stronger CTA.
Don't: keyword stuff, change the core message, make it longer than necessary."
```

### Programmatic SEO

**Template Strategy:**
```
"Help me design a programmatic SEO strategy for [business type].
I want to create [hundreds/thousands] of pages targeting [keyword pattern] (e.g. 'best [product] in [city]').
Design:
1. URL structure
2. Page template sections
3. Data sources needed
4. Content differentiation (how each page adds unique value)
5. Internal linking between programmatic pages
6. Risks to avoid (thin content, duplicate content)"
```

## Claude SEO Workflow

### New Article Workflow
```
Step 1 → Keyword research prompt: Find primary + secondary keywords
Step 2 → SERP analysis: Ask Claude to predict what top-ranking content covers
Step 3 → Content brief: Generate full brief
Step 4 → Draft: "Write a [word count]-word blog post about [topic] using this brief: [brief]"
Step 5 → Optimize: Run optimization prompt on draft
Step 6 → Meta tags: Generate title and description
Step 7 → Schema: Generate FAQ schema
Step 8 → Internal links: "Suggest 5 internal linking opportunities from this post to [other articles]"
```

### Existing Content Refresh Workflow
```
Step 1 → Identify: "Which sections of this post are outdated or missing key information about [topic]?"
Step 2 → Expand: "Expand the section on [topic] with current, detailed information"
Step 3 → Add: "Add a comprehensive FAQ section covering these questions: [GSC queries]"
Step 4 → Update meta: Generate new title/description with current year
Step 5 → Schema: Add or update FAQ schema
```

## E-E-A-T Signals for Claude to Add

When writing SEO content, always include:
- **Experience**: "Based on testing X approaches..." / First-person observations
- **Expertise**: Author credentials, specific technical details, citations
- **Authority**: Statistics from reputable sources (link to them)
- **Trust**: "Updated: [Month Year]", author bio, review process disclosure

## Quick Reference: SEO Content Rules
- Title tag: 50-60 chars, keyword first, compelling
- Meta description: 140-155 chars, keyword + CTA
- H1: One per page, contains primary keyword
- H2s: Contain secondary keywords, answer questions
- Word count: Match intent (informational = longer, transactional = focused)
- Images: Alt text with keyword (where natural)
- Internal links: 3-5 per post, use descriptive anchor text
- External links: Link to authoritative sources to support claims
