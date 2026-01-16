---
name: git-workflow
description: Use when creating branches, issues, or pull requests. Defines naming conventions and required fields.
---

# Git Workflow

## Branches

Format: `type/kebab-case-domain`

```
feature/session-filters
fix/auth-redirect
```

## Issues

- **Title**: `[TYPE] issue name`
- **Types**: BUILD, CHORE, CI, DOCS, FEATURE, FIX, PERF, REFACTOR, REVERT, STYLE, TEST
- **Required**: Assignees, Labels, Type, Projects

## Pull Requests

- **Title**: `type: PR name`
- **Body**: follow template, link issues
- **UI changes**: screenshots or Storybook link required
- **Required**: Reviewers, Assignees, Labels
