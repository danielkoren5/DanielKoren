#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Social Media Skills Core - BM25 search engine for social media guides
"""

import csv
import re
from pathlib import Path
from math import log
from collections import defaultdict

DATA_DIR = Path(__file__).parent.parent / "data"
MAX_RESULTS = 3

CSV_CONFIG = {
    "hooks": {
        "file": "hooks.csv",
        "search_cols": ["Hook Type", "Platform", "Keywords", "Formula", "Goal"],
        "output_cols": ["Hook Type", "Platform", "Keywords", "Formula", "Example", "Why It Works", "Goal", "Best For"]
    },
    "captions": {
        "file": "captions.csv",
        "search_cols": ["Goal", "Platform", "Keywords", "Formula"],
        "output_cols": ["Goal", "Platform", "Keywords", "Formula", "Example", "Do", "Dont", "CTA Options"]
    },
    "formats": {
        "file": "formats.csv",
        "search_cols": ["Format", "Platform", "Keywords", "Goal", "Best For"],
        "output_cols": ["Format", "Platform", "Keywords", "Specs", "Goal", "Best For", "Tips", "Performance"]
    },
    "growth": {
        "file": "growth.csv",
        "search_cols": ["Strategy", "Platform", "Keywords", "Goal"],
        "output_cols": ["Strategy", "Platform", "Keywords", "Goal", "How To", "Timeline", "Metrics", "Do", "Dont"]
    },
    "hashtags": {
        "file": "hashtags.csv",
        "search_cols": ["Platform", "Category", "Keywords", "Strategy"],
        "output_cols": ["Platform", "Category", "Keywords", "Strategy", "Count", "Mix", "Example", "Do", "Dont"]
    },
    "ads": {
        "file": "ads.csv",
        "search_cols": ["Platform", "Ad Type", "Keywords", "Goal", "Best For"],
        "output_cols": ["Platform", "Ad Type", "Keywords", "Goal", "Creative Tips", "Targeting", "Budget", "Metrics", "Best For"]
    },
    "analytics": {
        "file": "analytics.csv",
        "search_cols": ["Metric", "Platform", "Keywords", "What It Measures"],
        "output_cols": ["Metric", "Platform", "Keywords", "What It Measures", "Good Benchmark", "How to Improve", "Tool"]
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
        "hooks": ["hook", "opening", "first line", "stop scroll", "grab attention", "opener", "intro"],
        "captions": ["caption", "copy", "description", "write", "post text", "bio", "formula"],
        "formats": ["format", "reel", "carousel", "story", "video", "image", "specs", "size", "resolution"],
        "growth": ["grow", "growth", "followers", "reach", "organic", "strategy", "algorithm", "viral"],
        "hashtags": ["hashtag", "tags", "discovery", "niche tag", "broad tag", "trending"],
        "ads": ["ads", "paid", "boost", "sponsored", "promote", "advertising", "campaign", "budget"],
        "analytics": ["analytics", "metrics", "data", "insight", "report", "kpi", "performance", "rate"]
    }
    scores = {domain: sum(1 for kw in keywords if kw in query_lower) for domain, keywords in domain_keywords.items()}
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "hooks"


def search(query, domain=None, max_results=MAX_RESULTS):
    if domain is None:
        domain = detect_domain(query)
    config = CSV_CONFIG.get(domain, CSV_CONFIG["hooks"])
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
