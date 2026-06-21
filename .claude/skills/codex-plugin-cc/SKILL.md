---
name: codex-plugin-cc
description: "Code generation and AI-powered coding intelligence for Claude Code. Covers: prompt engineering for code generation, code review patterns, refactoring strategies, debugging workflows, test generation, documentation generation, architecture patterns, API integration patterns, database query optimization, and security code review. Actions: generate, write, refactor, debug, review, test, document, optimize, fix, implement. Languages: Python, JavaScript, TypeScript, React, Node.js, SQL, Go, Rust. Frameworks: Next.js, FastAPI, Express, Django, React Native."
---
# Codex Plugin CC - AI-Powered Code Intelligence

Advanced code generation, review, and optimization patterns for Claude Code. Covers prompt engineering for development tasks, architecture patterns, and best practices across languages and frameworks.

## When to Apply

Use this skill when:
- Writing prompts for complex code generation tasks
- Performing code review with AI assistance
- Refactoring existing codebases
- Generating tests and documentation
- Debugging complex issues
- Designing system architecture
- Implementing security best practices

## Domain Map

| Domain | Use For |
|--------|---------|
| `prompts` | Code generation prompt templates |
| `review` | Code review patterns and checklists |
| `refactor` | Refactoring strategies and patterns |
| `testing` | Test generation patterns |
| `architecture` | System design and architecture |
| `security` | Security code review patterns |
| `debug` | Debugging workflows |

## How to Use

```bash
python3 .claude/skills/codex-plugin-cc/scripts/search.py "react component optimization hooks" --domain prompts
python3 .claude/skills/codex-plugin-cc/scripts/search.py "sql query performance optimization" --domain refactor
python3 .claude/skills/codex-plugin-cc/scripts/search.py "API authentication security" --domain security
```

## Core Principles

### Code Generation Prompts
Always specify:
1. **Context**: What the code integrates with
2. **Requirements**: Exact inputs, outputs, and edge cases
3. **Constraints**: Language, framework, performance needs
4. **Style**: Naming conventions, error handling approach

### Code Review Checklist
- [ ] Security: Input validation, SQL injection, XSS, auth checks
- [ ] Performance: N+1 queries, unnecessary loops, memory leaks
- [ ] Readability: Clear names, no magic numbers, single responsibility
- [ ] Error handling: All error paths covered, useful error messages
- [ ] Tests: Happy path, edge cases, error cases all tested
- [ ] Documentation: Public APIs documented, complex logic explained

### Refactoring Patterns
1. Extract → then simplify (never both at once)
2. Write tests first when refactoring critical paths
3. One concern per function/class
4. Prefer composition over inheritance
5. Immutable data structures where possible
