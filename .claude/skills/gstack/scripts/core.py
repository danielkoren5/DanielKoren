#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GStack Core - BM25 search engine for Google Marketing Stack guides
"""

import csv
import re
from pathlib import Path
from math import log
from collections import defaultdict

DATA_DIR = Path(__file__).parent.parent / "data"
MAX_RESULTS = 3

CSV_CONFIG = {
    "ga4": {
        "file": "ga4.csv",
        "search_cols": ["Topic", "Category", "Keywords", "Description"],
        "output_cols": ["Topic", "Category", "Keywords", "Description", "Implementation", "Report Path", "Do", "Dont", "Impact"]
    },
    "gtm": {
        "file": "gtm.csv",
        "search_cols": ["Topic", "Tag Type", "Keywords", "Description"],
        "output_cols": ["Topic", "Tag Type", "Keywords", "Description", "Implementation", "Trigger", "Do", "Dont"]
    },
    "google_ads": {
        "file": "google_ads.csv",
        "search_cols": ["Campaign Type", "Topic", "Keywords", "Goal"],
        "output_cols": ["Campaign Type", "Topic", "Keywords", "Goal", "Setup", "Bidding", "Budget", "Metrics", "Do", "Dont"]
    },
    "gsc": {
        "file": "gsc.csv",
        "search_cols": ["Report", "Category", "Keywords", "What It Shows"],
        "output_cols": ["Report", "Category", "Keywords", "What It Shows", "How to Use", "Action", "Frequency"]
    },
    "attribution": {
        "file": "attribution.csv",
        "search_cols": ["Model", "Type", "Keywords", "Description"],
        "output_cols": ["Model", "Type", "Keywords", "Description", "Best For", "Pros", "Cons", "Tool"]
    },
    "tools": {
        "file": "tools.csv",
        "search_cols": ["Tool", "Category", "Keywords", "Purpose"],
        "output_cols": ["Tool", "Category", "Keywords", "Purpose", "Best For", "Integration", "Cost", "Alternative"]
    }
}

AVAILABLE_DOMAINS = list(CSV_CONFIG.keys())


class BM25:
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
        "ga4": ["ga4", "google analytics", "analytics", "event tracking", "conversion", "audience", "report", "session", "user", "retention"],
        "gtm": ["gtm", "tag manager", "tag", "trigger", "container", "dataLayer", "datalayer", "pixel", "snippet", "variable"],
        "google_ads": ["google ads", "adwords", "pmax", "performance max", "search ad", "shopping ad", "display", "youtube ad", "smart bidding", "quality score", "roas target"],
        "gsc": ["search console", "gsc", "impressions", "clicks", "ctr", "average position", "crawl", "index", "coverage", "sitemap", "core web vitals gsc"],
        "attribution": ["attribution", "model", "last click", "first click", "data-driven", "linear", "time decay", "multi-touch", "channel credit"],
        "tools": ["tool", "stack", "software", "platform", "looker studio", "bigquery", "data studio", "semrush", "ahrefs", "hotjar", "clarity"]
    }
    scores = {domain: sum(1 for kw in keywords if kw in query_lower) for domain, keywords in domain_keywords.items()}
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "ga4"


def search(query, domain=None, max_results=MAX_RESULTS):
    if domain is None:
        domain = detect_domain(query)
    config = CSV_CONFIG.get(domain, CSV_CONFIG["ga4"])
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
