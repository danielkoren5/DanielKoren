---
name: doc-skills
description: "Technical writing and documentation intelligence. Covers: README writing, API documentation, user guides, onboarding documentation, changelog writing, runbook creation, architecture decision records (ADRs), developer guides, product documentation, help center articles, internal wikis, code comments and docstrings, documentation structure and information architecture, docs-as-code workflow, and documentation maintenance. Actions: write, create, document, structure, organize, update, review, improve, generate. Topics: README, API docs, user guide, tutorial, reference, explanation, how-to, ADR, runbook, changelog."
---
# Doc Skills - Documentation Writing Intelligence

Technical writing frameworks and templates for every type of documentation — from READMEs to API docs to runbooks.

## When to Apply

Use when:
- Writing or improving a README
- Creating API documentation
- Writing user guides or tutorials
- Creating internal runbooks or playbooks
- Documenting architecture decisions
- Writing changelogs
- Building help center content
- Improving existing documentation quality

## The Diátaxis Documentation Framework

Every piece of documentation is one of four types:

| Type | Goal | Reader's Question |
|------|------|-------------------|
| **Tutorial** | Learning-oriented | "Help me learn this" |
| **How-To Guide** | Problem-oriented | "How do I do X?" |
| **Reference** | Information-oriented | "What is X?" |
| **Explanation** | Understanding-oriented | "Why does X work this way?" |

Always identify the type before writing. Mixing types creates confusing docs.

## README Framework

```markdown
# Project Name
One-sentence description of what it does and why someone would care.

## Quick Start
# The FASTEST path to seeing it work (under 5 steps)
npm install package-name
package-name "hello world"

## Features
- Feature 1: Brief description
- Feature 2: Brief description

## Installation
Detailed setup instructions for different environments.

## Usage
Common use cases with code examples.

## Configuration
All options explained with types, defaults, and examples.

## API Reference
(For libraries) Every public function/method documented.

## Contributing
How to contribute. Code of conduct link.

## License
License type with link.
```

### README Quality Checklist
- [ ] One-line description in first paragraph
- [ ] Quick start section has working code (test it!)
- [ ] Installation instructions work on a fresh machine
- [ ] At least 3 usage examples with real code
- [ ] All configuration options listed with types and defaults
- [ ] Contributing guidelines clear
- [ ] License specified

## API Documentation Template

### Endpoint Documentation
```markdown
## POST /api/users

Create a new user account.

**Request**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "role": "string (optional, default: 'user', values: 'user'|'admin')"
}
```

**Response (201 Created)**
```json
{
  "id": "usr_123abc",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "user",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Errors**
| Status | Code | Description |
|--------|------|-------------|
| 400 | INVALID_EMAIL | Email format invalid |
| 409 | EMAIL_EXISTS | Email already registered |
| 422 | MISSING_FIELD | Required field missing |
```

## How-To Guide Structure

```markdown
# How to [Task]

**Time required**: ~X minutes
**Prerequisites**: [list what they need]

## Steps

### 1. [First Step]
[What to do]

```code
Example command or code
```

**Expected result**: [What they should see]

### 2. [Second Step]
...

## Troubleshooting

**Problem**: [Common error or issue]
**Solution**: [How to fix it]

## Next Steps
- Link to related guides
- What to explore next
```

## Architecture Decision Record (ADR)

```markdown
# ADR-[number]: [Decision Title]

**Date**: YYYY-MM-DD
**Status**: [Proposed | Accepted | Deprecated | Superseded by ADR-X]

## Context
What is the issue we're seeing that is motivating this decision? 
What constraints are we working under?

## Decision
What is the change we're proposing or have agreed to implement?

## Consequences

### Positive
- [Positive outcome 1]
- [Positive outcome 2]

### Negative
- [Trade-off or downside 1]
- [Trade-off or downside 2]

### Neutral
- [Things that change but aren't clearly positive or negative]
```

## Runbook / Playbook Template

```markdown
# [Service Name] [Incident Type] Runbook

**Owner**: [Team name]
**Last Updated**: YYYY-MM-DD
**Severity**: [P1/P2/P3]

## Symptoms
- [ ] [Observable symptom 1]
- [ ] [Observable symptom 2]

## Investigation Steps

### Step 1: Verify the issue
```bash
# Command to check
kubectl get pods -n production
```
**If you see X**: proceed to Step 2
**If you don't see X**: this may not be the right runbook

### Step 2: [Action]
...

## Resolution

### Option A: [Quick fix]
...

### Option B: [More thorough fix]
...

## Escalation
If unresolved after 30 minutes, escalate to [contact/channel].

## Post-Incident
- Create post-mortem ticket
- Update this runbook if process changed
```

## Changelog Writing

### Keep a Changelog Format
```markdown
# Changelog

## [Unreleased]

## [2.1.0] - 2024-01-15

### Added
- New feature X that allows users to do Y

### Changed
- Updated Z behavior to be more intuitive

### Fixed
- Bug where ABC happened when XYZ

### Deprecated
- Old API endpoint /v1/thing (use /v2/thing instead)

### Removed
- Legacy configuration option X

### Security
- Fixed SQL injection vulnerability in search endpoint
```

## Documentation Writing Tips

### The Curse of Knowledge
You know too much. Write for someone who doesn't share your context. Test by having a new team member follow your docs exactly — fix everything they get stuck on.

### Use Active Voice
- Bad: "The user is required to configure..."
- Good: "Configure your..."

### Every Warning Should Be Near the Action
Don't put warnings in a separate section if they relate to specific steps. Put them inline, right before the action they warn about.

### Code Examples Are Worth 1000 Words
Every conceptual explanation should have a corresponding code example. If you can't show it in code, the explanation isn't concrete enough yet.
