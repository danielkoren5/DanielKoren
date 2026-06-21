---
name: gstack
description: "Google Marketing Stack expertise. Covers: GA4 (event tracking, conversions, audiences, explorations, Looker Studio reporting), Google Tag Manager (tag setup, dataLayer, consent mode, conversion tracking), Google Ads (Search, Shopping, Performance Max, Display, YouTube, Smart Bidding, keywords), Google Search Console (performance reports, indexing, Core Web Vitals, sitemaps), marketing attribution models (last click, data-driven, MTA, MMM, incrementality testing), and full growth marketing tool stack (Semrush, Ahrefs, Hotjar, HubSpot, BigQuery, Merchant Center). Actions: set up, configure, audit, optimize, troubleshoot, report, analyze, track, measure."
---
# GStack - Google Marketing Stack Intelligence

Complete reference for the Google marketing ecosystem: GA4, GTM, Google Ads, Search Console, attribution modeling, and the broader growth marketing tool stack.

## When to Apply

Use this skill when:
- Setting up or auditing GA4 tracking, events, or conversions
- Configuring GTM tags, triggers, and variables
- Planning or optimizing Google Ads campaigns
- Using Google Search Console for SEO insights
- Choosing an attribution model or analyzing channel credit
- Evaluating or recommending marketing tools

## Domain Map

| Domain | Use For | Example Queries |
|--------|---------|-----------------|
| `ga4` | GA4 setup, events, reports, explorations | Event tracking, conversion setup, funnel analysis |
| `gtm` | Tag Manager configuration and tag types | GA4 tag, Meta Pixel, dataLayer, consent mode |
| `google_ads` | Campaign types, bidding, keyword strategy | PMax, Smart Bidding, RSA copy, negative keywords |
| `gsc` | Search Console reports and actions | Keyword performance, indexing, Core Web Vitals |
| `attribution` | Attribution models and channel credit | Data-driven, last click, MTA, MMM |
| `tools` | Full marketing tool stack | Semrush, Hotjar, HubSpot, BigQuery, Merchant Center |

---

## How to Use This Skill

```bash
# GA4 conversion tracking setup
python3 .claude/skills/gstack/scripts/search.py "ga4 conversion key events setup" --domain ga4

# GTM Google Ads conversion tag
python3 .claude/skills/gstack/scripts/search.py "google ads conversion tag gtm setup" --domain gtm

# Performance Max campaign best practices
python3 .claude/skills/gstack/scripts/search.py "performance max pmax setup optimization" --domain google_ads

# Search Console performance report
python3 .claude/skills/gstack/scripts/search.py "search console impressions clicks ctr keywords" --domain gsc

# Attribution model selection
python3 .claude/skills/gstack/scripts/search.py "data-driven attribution vs last click" --domain attribution

# Best analytics tools
python3 .claude/skills/gstack/scripts/search.py "heatmap session recording conversion rate optimization tool" --domain tools
```

---

## GStack Implementation Checklist

### Tracking Foundation
- [ ] GA4 property created and linked to website
- [ ] GA4 Configuration Tag in GTM (firing on All Pages)
- [ ] Enhanced Measurement enabled in GA4 Data Streams
- [ ] Key Events (Conversions) defined and tested in DebugView
- [ ] GA4 linked to Google Ads (for Smart Bidding and audiences)
- [ ] GA4 linked to Search Console (for SEO + analytics combined view)
- [ ] UTM naming convention documented and enforced

### Google Ads Setup
- [ ] Conversion tracking configured (import from GA4 OR Google Ads tag — not both)
- [ ] Google Ads tag (or Google Tag) installed via GTM
- [ ] Remarketing audiences created from GA4
- [ ] Negative keyword list built and applied
- [ ] Search Terms Report review scheduled (weekly)
- [ ] Smart Bidding enabled after 30+ conversions

### SEO/GSC
- [ ] Site verified in Search Console
- [ ] XML sitemap submitted
- [ ] Coverage report checked for errors
- [ ] Core Web Vitals checked (LCP < 2.5s, CLS < 0.1)
- [ ] Performance report reviewed weekly

### Reporting
- [ ] Looker Studio dashboard connected to GA4 + Google Ads + GSC
- [ ] Attribution model selected and documented
- [ ] Monthly performance review process established
