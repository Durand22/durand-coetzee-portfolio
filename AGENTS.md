# Codex Project Instructions

This repository is set up for Codex goals, skills, sub-agents, Git hooks, branches, and worktrees.

## Working Rules

- Keep the main worktree stable.
- Use `codex/` as the branch prefix for Codex-created work.
- Use one branch and one worktree per independent task.
- Give each sub-agent a bounded job and a separate write area.
- Do not let two agents edit the same files at the same time.
- Do not interrupt running tasks unless the user explicitly asks.
- Do not use destructive Git commands such as `git reset --hard` or forced checkout unless the user explicitly asks.

## Sub-Agent Pattern

- Explorer: reads and answers a specific codebase question.
- Worker: implements one scoped change in owned files.
- Reviewer: checks a completed change for bugs, regressions, and missing tests.

Good parallel split:

```text
Worker A: frontend/*
Worker B: backend/*
Reviewer: read-only review after implementation
```

Risky split:

```text
Worker A: app.js
Worker B: app.js
```

## Worktree Pattern

Create worktrees from the main branch after the first commit exists:

```powershell
.\scripts\codex-new-worktree.ps1 -Name feature-ui
.\scripts\codex-new-worktree.ps1 -Name api-fix
.\scripts\codex-new-worktree.ps1 -Name review-pass
```

This creates sibling folders with branches named like:

```text
codex/feature-ui
codex/api-fix
codex/review-pass
```

## Hooks

Git hooks live in `.githooks`.

- `pre-commit` runs lightweight checks when available.
- `pre-push` runs tests when common test commands are detected.

The hooks are intentionally conservative and skip checks that do not apply to the current project yet.
