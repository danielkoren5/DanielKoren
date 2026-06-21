#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Marketing Skills Core - BM25 search engine for marketing guides
"""

import csv
import re
from pathlib import Path
from math import log
from collections import defaultdict

# ============ CONFIGURATION ============
DATA_DIR = Path(__file__).parent.parent / "data"
MAX_RESULTS = 3

CSV_CONFIG = {
    "copywriting": {
        "file": "copywriting.csv",
        "search_cols": ["Framework", "Type", "Keywords", "Description", "Best For"],
        "output_cols": ["Framework", "Type", "Keywords", "Description", "Formula", "Best For", "Example", "Do", "Dont", "CTA Examples", "Tone"]
    },
    "channels": {
        "file": "channels.csv",
        "search_cols": ["Channel", "Type", "Keywords", "Audience", "Best For"],
        "output_cols": ["Channel", "Type", "Keywords", "Audience", "Cost", "ROI Potential", "Time to Results", "Best For", "Metrics", "Strengths", "Weaknesses"]
    },
    "funnel": {
        "file": "funnel.csv",
        "search_cols": ["Stage", "Keywords", "Goal", "Content Types", "Channels"],
        "output_cols": ["Stage", "Funnel Position", "Keywords", "Goal", "Content Types", "CTAs", "Metrics", "Channels", "Message Framework"]
    },
    "seo": {
        "file": "seo.csv",
        "search_cols": ["Category", "Topic", "Keywords", "Description"],
        "output_cols": ["Category", "Topic", "Keywords", "Priority", "Description", "Implementation", "Tool", "Do", "Dont", "Impact"]
    },
    "email": {
        "file": "email.csv",
        "search_cols": ["Type", "Keywords", "Subject Line Formula", "Best For"],
        "output_cols": ["Type", "Keywords", "Subject Line Formula", "Opening", "Body Structure", "CTA", "Send Time", "Metrics", "Best For", "Segmentation"]
    },
    "social": {
        "file": "social.csv",
        "search_cols": ["Platform", "Type", "Keywords", "Best Content"],
        "output_cols": ["Platform", "Type", "Keywords", "Audience", "Best Content", "Posting Frequency", "Peak Times", "Caption Formula", "Metrics", "Ad Format"]
    },
    "content": {
        "file": "content.csv",
        "search_cols": ["Type", "Keywords", "Format", "Goal", "Best For"],
        "output_cols": ["Type", "Keywords", "Format", "Goal", "Length", "SEO Value", "Distribution", "Best For", "Headline Formula", "CTA", "Metrics"]
    },
    "conversion": {
        "file": "conversion.csv",
        "search_cols": ["Element", "Type", "Keywords", "Principle"],
        "output_cols": ["Element", "Type", "Keywords", "Principle", "Implementation", "AB Test Ideas", "Impact", "Do", "Dont", "Example"]
    },
    "brand": {
        "file": "brand.csv",
        "search_cols": ["Framework", "Type", "Keywords", "Purpose"],
        "output_cols": ["Framework", "Type", "Keywords", "Purpose", "Components", "Questions to Answer", "Example", "Do", "Dont"]
    }
}

AVAILABLE_DOMAINS = list(CSV_CONFIG.keys())


# ============ BM25 IMPLEMENTATION ============
class BM25:
    """BM25 ranking algorithm for text search"""

    def __init__(self, k1=1.5, b=0.75):
        self.k1 = k1
        self.b = b
        self.corpus = []
        self.doc_lengths = []
        self.avgdl = 0
        self.idf = {}
        self.doc_freqs = defaultdict(int)
        self.N = 0

    def tokenize(self, text):
        text = re.sub(r'[^\w\s]', ' ', str(text).lower())
        return [w for w in text.split() if len(w) > 2]

    def fit(self, documents):
        self.corpus = [self.tokenize(doc) for doc in documents]
        self.N = len(self.corpus)
        if self.N == 0:
            return
        self.doc_lengths = [len(doc) for doc in self.corpus]
        self.avgdl = sum(self.doc_lengths) / self.N

        for doc in self.corpus:
            seen = set()
            for word in doc:
                if word not in seen:
                    self.doc_freqs[word] += 1
                    seen.add(word)

        for word, freq in self.doc_freqs.items():
            self.idf[word] = log((self.N - freq + 0.5) / (freq + 0.5) + 1)

    def score(self, query):
        query_tokens = self.tokenize(query)
        scores = []

        for idx, doc in enumerate(self.corpus):
            score = 0
            doc_len = self.doc_lengths[idx]
            term_freqs = defaultdict(int)
            for word in doc:
                term_freqs[word] += 1

            for token in query_tokens:
                if token in self.idf:
                    tf = term_freqs[token]
                    idf = self.idf[token]
                    numerator = tf * (self.k1 + 1)
                    denominator = tf + self.k1 * (1 - self.b + self.b * doc_len / self.avgdl)
                    score += idf * numerator / denominator

            scores.append((idx, score))

        return sorted(scores, key=lambda x: x[1], reverse=True)


# ============ SEARCH FUNCTIONS ============
def _load_csv(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return list(csv.DictReader(f))


def _search_csv(filepath, search_cols, output_cols, query, max_results):
    if not filepath.exists():
        return []

    data = _load_csv(filepath)
    documents = [" ".join(str(row.get(col, "")) for col in search_cols) for row in data]

    bm25 = BM25()
    bm25.fit(documents)
    ranked = bm25.score(query)

    results = []
    for idx, score in ranked[:max_results]:
        if score > 0:
            row = data[idx]
            results.append({col: row.get(col, "") for col in output_cols if col in row})

    return results


def detect_domain(query):
    query_lower = query.lower()

    domain_keywords = {
        "copywriting": ["copy", "copywriting", "headline", "aida", "pas", "hook", "cta", "persuade", "message", "script", "pitch", "write"],
        "channels": ["channel", "facebook", "google", "ads", "ppc", "instagram", "linkedin", "tiktok", "youtube", "sms", "affiliate", "influencer", "referral", "pr", "media"],
        "funnel": ["funnel", "awareness", "consideration", "intent", "purchase", "retention", "tofu", "mofu", "bofu", "lead", "nurture", "journey"],
        "seo": ["seo", "search", "keyword", "ranking", "backlink", "organic", "serp", "meta", "schema", "technical", "local seo", "core web vitals"],
        "email": ["email", "newsletter", "subject line", "open rate", "drip", "autoresponder", "welcome email", "campaign", "inbox", "unsubscribe"],
        "social": ["social", "instagram", "facebook", "linkedin", "twitter", "tiktok", "pinterest", "post", "story", "reel", "hashtag", "engagement"],
        "content": ["content", "blog", "article", "case study", "ebook", "whitepaper", "infographic", "video", "podcast", "webinar", "guide", "listicle"],
        "conversion": ["conversion", "cro", "landing page", "a/b test", "form", "cta button", "trust", "testimonial", "urgency", "scarcity", "checkout", "pricing"],
        "brand": ["brand", "voice", "tone", "positioning", "persona", "archetype", "tagline", "mission", "vision", "values", "messaging", "identity"]
    }

    scores = {domain: sum(1 for kw in keywords if kw in query_lower) for domain, keywords in domain_keywords.items()}
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "copywriting"


def search(query, domain=None, max_results=MAX_RESULTS):
    if domain is None:
        domain = detect_domain(query)

    config = CSV_CONFIG.get(domain, CSV_CONFIG["copywriting"])
    filepath = DATA_DIR / config["file"]

    if not filepath.exists():
        return {"error": f"File not found: {filepath}", "domain": domain}

    results = _search_csv(filepath, config["search_cols"], config["output_cols"], query, max_results)

    return {
        "domain": domain,
        "query": query,
        "file": config["file"],
        "count": len(results),
        "results": results
    }
