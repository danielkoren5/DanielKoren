#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Social Media Skills Search - BM25 search engine for social media guides
Usage: python search.py "<query>" [--domain <domain>] [--max-results 3]

Domains: hooks, captions, formats, growth, hashtags, ads, analytics
"""

import argparse
import sys
import io
from core import CSV_CONFIG, AVAILABLE_DOMAINS, MAX_RESULTS, search

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
if sys.stderr.encoding and sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')


def format_output(result):
    if "error" in result:
        return f"Error: {result['error']}"
    output = []
    output.append(f"## Social Media Skills Search Results")
    output.append(f"**Domain:** {result['domain']} | **Query:** {result['query']}")
    output.append(f"**Source:** {result['file']} | **Found:** {result['count']} results\n")
    for i, row in enumerate(result['results'], 1):
        output.append(f"### Result {i}")
        for key, value in row.items():
            value_str = str(value)
            if len(value_str) > 300:
                value_str = value_str[:300] + "..."
            output.append(f"- **{key}:** {value_str}")
        output.append("")
    return "\n".join(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Social Media Skills Search")
    parser.add_argument("query", help="Search query")
    parser.add_argument("--domain", "-d", choices=AVAILABLE_DOMAINS, help="Search domain")
    parser.add_argument("--max-results", "-n", type=int, default=MAX_RESULTS, help="Max results (default: 3)")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    args = parser.parse_args()
    result = search(args.query, domain=args.domain, max_results=args.max_results)
    if args.json:
        import json
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(format_output(result))
