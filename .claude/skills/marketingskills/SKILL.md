---
name: marketingskills
description: "Marketing intelligence for copywriters, growth marketers, and brand builders. Covers: copywriting frameworks (AIDA, PAS, StoryBrand, FAB), marketing channels (SEO, paid ads, email, social, content), funnel stages (TOFU/MOFU/BOFU), SEO best practices, email marketing, social media strategy, content marketing, conversion optimization (CRO), and brand messaging. Actions: write, create, plan, optimize, audit, review, improve, build, launch, grow. Topics: landing page, email campaign, social post, blog post, ad copy, funnel, SEO, brand voice, value proposition, persona, headline, CTA, case study."
---
# Marketing Skills - Marketing Intelligence

Comprehensive marketing guide covering copywriting, growth channels, SEO, email, social media, content, conversion optimization, and brand strategy. Searchable knowledge base with proven frameworks and best practices.

## When to Apply

Use this skill when:
- Writing copy (ads, emails, landing pages, social posts, blog posts)
- Planning a marketing campaign or channel strategy
- Building or optimizing a marketing funnel
- Improving SEO, email performance, or conversion rates
- Developing brand voice, messaging, or positioning
- Choosing the right content type for a goal
- Auditing marketing assets for best practice compliance

## Domain Map

| Domain | Use For | Example Queries |
|--------|---------|-----------------|
| `copywriting` | Writing frameworks, formulas, persuasion | AIDA, PAS, headline formula, CTA copy |
| `channels` | Marketing channel strategy and selection | Facebook ads, SEO vs paid, email marketing |
| `funnel` | Funnel stages, content by stage, nurture | Awareness content, TOFU, BOFU, re-engagement |
| `seo` | SEO best practices, technical, on-page | Keyword research, meta tags, link building |
| `email` | Email types, subject lines, sequences | Welcome email, drip campaign, abandoned cart |
| `social` | Social media strategy per platform | Instagram strategy, LinkedIn B2B, TikTok |
| `content` | Content formats, goals, distribution | Blog post, case study, webinar, ebook |
| `conversion` | CRO, landing pages, A/B testing | Hero section, CTA button, pricing page |
| `brand` | Brand strategy, messaging, identity | Brand voice, value prop, persona, positioning |

---

## How to Use This Skill

When user requests marketing work (write, create, plan, optimize, audit), follow this workflow:

### Step 1: Identify the Marketing Goal

Determine what the user needs:
- **Write something**: Ad copy, email, social post, landing page, blog post
- **Plan something**: Campaign, funnel, channel strategy, content calendar
- **Optimize something**: Conversion rate, email open rate, SEO ranking, ad performance
- **Build something**: Brand messaging, value proposition, customer persona

### Step 2: Search the Relevant Domain

```bash
python3 .claude/skills/marketingskills/scripts/search.py "<query>" --domain <domain>
```

**Examples:**
```bash
# Get copywriting framework for a SaaS email
python3 .claude/skills/marketingskills/scripts/search.py "SaaS email nurture persuade" --domain copywriting

# Find the best marketing channel for B2B
python3 .claude/skills/marketingskills/scripts/search.py "B2B lead generation channel" --domain channels

# Get landing page CRO best practices
python3 .claude/skills/marketingskills/scripts/search.py "landing page conversion hero CTA" --domain conversion

# SEO for blog content
python3 .claude/skills/marketingskills/scripts/search.py "blog post SEO keyword ranking" --domain seo

# Email subject line formula
python3 .claude/skills/marketingskills/scripts/search.py "subject line open rate newsletter" --domain email
```

### Step 3: Apply the Framework

Use the search results to:
1. Select the appropriate framework for the task
2. Apply the formula/structure to the user's specific context
3. Reference best practices from the `Do` / `Don't` columns
4. Include metrics to track success

### Step 4: Deliver and Optimize

- Apply the framework to produce the deliverable
- Include A/B test ideas when relevant
- Suggest metrics to measure performance
- Offer to iterate based on results

---

## Quick Reference: Common Tasks

### Writing Ad Copy
```bash
python3 .claude/skills/marketingskills/scripts/search.py "ad copy hook attention persuade" --domain copywriting
```
→ Use AIDA or PAS. Open with the problem. Drive to one CTA.

### Building an Email Sequence
```bash
python3 .claude/skills/marketingskills/scripts/search.py "email drip nurture sequence" --domain email
```
→ Space 1-2 days apart. Story → value → social proof → offer.

### Optimizing a Landing Page
```bash
python3 .claude/skills/marketingskills/scripts/search.py "landing page hero section CTA conversion" --domain conversion
```
→ One goal, one CTA, social proof near button, clear value prop above fold.

### Choosing a Marketing Channel
```bash
python3 .claude/skills/marketingskills/scripts/search.py "marketing channel B2B SaaS lead generation" --domain channels
```
→ Match to audience, budget, and timeline. Start with highest-intent (SEO + Google Ads).

### Writing a Brand Value Proposition
```bash
python3 .claude/skills/marketingskills/scripts/search.py "value proposition positioning differentiation" --domain brand
```
→ For [Target] who [Problem], [Product] is a [Category] that [Benefit]. Unlike [Alternative], we [Differentiator].

### Planning Content Strategy
```bash
python3 .claude/skills/marketingskills/scripts/search.py "content strategy blog case study SEO" --domain content
```
→ Match format to funnel stage. TOFU = education. MOFU = proof. BOFU = offer.

---

## Search Reference

### Auto-detect Domain

If no domain is specified, the tool auto-detects from keywords:

| Query Contains | Auto-detected Domain |
|----------------|---------------------|
| copy, aida, pas, hook, headline | `copywriting` |
| channel, facebook, google, ads, ppc | `channels` |
| funnel, awareness, tofu, mofu, bofu, lead | `funnel` |
| seo, keyword, ranking, backlink | `seo` |
| email, newsletter, subject line, open rate | `email` |
| instagram, linkedin, tiktok, social, post | `social` |
| blog, content, case study, ebook, video | `content` |
| conversion, cro, landing page, a/b test | `conversion` |
| brand, voice, positioning, persona, tagline | `brand` |

### Search Options

```bash
# Basic search (auto-detects domain)
python3 .claude/skills/marketingskills/scripts/search.py "your query here"

# Specify domain
python3 .claude/skills/marketingskills/scripts/search.py "your query" --domain email

# Get more results
python3 .claude/skills/marketingskills/scripts/search.py "your query" -n 5

# JSON output
python3 .claude/skills/marketingskills/scripts/search.py "your query" --json
```

---

## Marketing Fundamentals Checklist

Before starting any marketing task, verify:

### Strategy
- [ ] Clear goal defined (traffic, leads, revenue, awareness)
- [ ] Target audience identified (persona)
- [ ] Channel selected based on audience and budget
- [ ] Funnel stage identified (TOFU/MOFU/BOFU)
- [ ] Success metrics defined before launch

### Copywriting
- [ ] Headline passes the 5-second test (what, who, why)
- [ ] Framework applied (AIDA, PAS, FAB, etc.)
- [ ] Single clear CTA (not multiple competing CTAs)
- [ ] Social proof included (testimonials, numbers, logos)
- [ ] Benefits emphasized over features

### Email
- [ ] Subject line tested with A/B variant
- [ ] Preview text optimized (100-140 chars)
- [ ] Mobile-responsive design (single column, large CTA)
- [ ] Plain text version included
- [ ] Unsubscribe link present (legal requirement)
- [ ] Segment applied (not sending to entire list)

### Landing Pages (CRO)
- [ ] Value proposition above the fold
- [ ] Primary CTA visible without scrolling
- [ ] Social proof near CTA
- [ ] Trust signals present (badges, guarantees)
- [ ] Form has minimum required fields
- [ ] Page load time < 3 seconds
- [ ] Mobile optimized

### SEO
- [ ] Primary keyword in title tag and H1
- [ ] Meta description written (150 chars, includes keyword)
- [ ] Internal links added (3-5 per post)
- [ ] Images compressed and alt text added
- [ ] Content length appropriate for keyword competition

### Brand
- [ ] Voice and tone consistent with brand guide
- [ ] Value proposition stated clearly
- [ ] Differentiator from competitors included
- [ ] Messaging matches target persona's language

---

## Key Marketing Metrics by Goal

| Goal | Primary Metric | Secondary Metrics |
|------|----------------|-------------------|
| Traffic | Organic sessions | Bounce rate, pages/session |
| Lead Gen | Conversion rate | CPL, MQL rate, form completions |
| Email | Open rate | CTR, conversion, unsubscribes |
| Social | Engagement rate | Reach, saves, shares |
| Sales | Revenue | CAC, LTV, close rate |
| Retention | Churn rate | NPS, feature adoption, LTV |
| Brand | Brand search volume | Share of voice, NPS |
| Ads | ROAS | CTR, CPC, frequency, CPM |
