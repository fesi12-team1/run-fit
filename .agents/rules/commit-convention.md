---
name: commit-convention
description: Use when creating git commits. Enforces Conventional Commits format with lowercase types and scopes.
---

# Commit Convention

Conventional Commits (enforced by husky + commitlint).

## Format

```
type(scope): subject
```

## Examples

```bash
feat(session): add infinite scroll   # OK
fix(auth): correct redirect logic    # OK
Fix(auth): Correct redirect logic    # BAD - uppercase
```

## Rules

- **Types**: `build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test`
- **Type/scope**: lowercase only
- **Subject**: no sentence-case, start-case, pascal-case, upper-case
- **Max length**: 100 chars (subject, body, footer)
- **Body/footer**: blank line required before
