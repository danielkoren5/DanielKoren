---
name: claude-for-legal
description: "Claude for legal work — drafting, review, and analysis. Covers: contract drafting and review (NDAs, SaaS agreements, employment contracts, vendor agreements), legal document analysis and risk identification, clause libraries with plain-language explanations, legal research assistance, terms of service and privacy policy frameworks, intellectual property basics, employment law basics, startup legal checklist, and legal writing style. IMPORTANT: This skill provides general legal information and frameworks, not legal advice. Always recommend consulting a licensed attorney for specific legal matters. Actions: draft, review, analyze, explain, summarize, identify risks, simplify."
---
# Claude for Legal - Legal Document Intelligence

Frameworks and clause libraries for legal document work with Claude. General legal information only — always recommend consulting a licensed attorney for specific legal matters.

## IMPORTANT DISCLAIMER
This skill provides general legal information and document frameworks for educational purposes only. It does not constitute legal advice. Always consult a licensed attorney in your jurisdiction for specific legal matters.

## When to Apply

Use when:
- Drafting or reviewing NDAs, contracts, or agreements
- Understanding legal document structure and key clauses
- Identifying potential risks in a contract
- Simplifying legal language to plain English
- Building startup legal document checklist
- Understanding basic IP, employment, or privacy law concepts
- Drafting terms of service or privacy policy frameworks

## Core Frameworks

### Contract Review Methodology
When reviewing any contract with Claude:
```
Step 1: Identify parties, purpose, and governing law
Step 2: Find key obligations (what each party MUST do)
Step 3: Find key restrictions (what each party CANNOT do)
Step 4: Identify termination clauses (how/when it ends)
Step 5: Identify liability and indemnification provisions
Step 6: Flag unusual, one-sided, or risky clauses
Step 7: Summarize in plain English with red flags listed
```

### Risk Flag System
🔴 **High Risk** — Unlimited liability, waiver of rights, perpetual license to your IP
🟡 **Medium Risk** — One-sided terms, short notice periods, auto-renewal without notice
🟢 **Acceptable** — Standard market terms, reasonable limitations

## Key Contract Clauses: What to Look For

### NDA (Non-Disclosure Agreement)
- **Definition of Confidential Info**: Should be specific, not everything you ever share
- **Exclusions**: Public info, independently developed, legally obtained from 3rd party
- **Duration**: 2-3 years standard; perpetual is unusual (ask why)
- **Unilateral vs Mutual**: Are BOTH parties bound, or just you?
- **Return/Destruction**: Must you return or destroy info on termination?

### SaaS Agreement (Customer Perspective)
- **Data ownership**: YOUR data remains yours upon termination
- **Data portability**: Can you export your data? In what format? How long after termination?
- **Uptime SLA**: What's the guaranteed uptime? What's the remedy if missed?
- **Price changes**: How much notice before price increase? Can you exit?
- **Security obligations**: What security standards do they maintain?
- **Liability cap**: Usually capped at 12 months of fees paid — is that enough for your business?

### Employment Agreements
- **Non-compete**: Duration, geographic scope, and industry scope (state enforceability varies)
- **Non-solicitation**: Customers AND employees — duration?
- **IP assignment**: Does it cover side projects? (Should carve out pre-existing and personal work)
- **At-will vs term**: Difference matters enormously
- **Severance**: Any obligation? Triggers?

## Startup Legal Checklist
- [ ] Business entity formed (LLC or Corp)
- [ ] Founders agreement / equity split documented
- [ ] IP assignment agreements from all founders and early employees
- [ ] Standard NDA template created
- [ ] Terms of Service and Privacy Policy on website
- [ ] Employment agreements for first hires
- [ ] Contractor agreements (work-for-hire clause) for contractors
- [ ] Data processing agreements if handling EU user data (GDPR)
- [ ] Cap table maintained accurately

## Privacy Policy Framework (Key Sections)
1. **What we collect** — Be exhaustive and specific
2. **How we use it** — Legal basis for each use (GDPR: consent/contract/legitimate interest)
3. **Who we share with** — All third parties named
4. **How we protect it** — Security measures
5. **Retention** — How long you keep different data types
6. **Your rights** — Access, deletion, portability rights
7. **Cookies** — Types used, purpose, opt-out mechanism
8. **Contact** — DPO or privacy contact info

## Contract Drafting: Claude Prompt Templates

**NDA Review:**
"Review this NDA from the perspective of [disclosing party/receiving party]. Identify: (1) any one-sided provisions, (2) unusually broad definitions, (3) missing standard protections, (4) high-risk clauses. Summarize in plain English. Note: I'll confirm with my attorney before signing."

**Contract Summary:**
"Summarize this [contract type] in plain English. Focus on: obligations on each party, payment terms, termination rights, liability limits, and any unusual clauses. Flag anything I should ask my lawyer about."

**Clause Comparison:**
"I have two versions of a [clause type] clause. Compare them, explain the key differences in plain English, and identify which is more favorable to [party]."
