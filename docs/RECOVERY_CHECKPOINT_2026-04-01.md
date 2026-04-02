# Recovery Checkpoint - 2026-04-01

## Purpose

This note captures what happened during branch recovery, what the current Git state means, and the recommended plan for continuing cleanup work safely.

It is intended as a practical "where am I and why?" document for later reference.

## Outcome

The version with the confirmed major UI/content rewrites is now the source of truth on `main`.

Those recovered changes include the major work the user visually confirmed in the browser:

- blog updates
- animation gallery changes
- Demand & Growth page changes
- About page changes

GitHub `main` now points to the recovered version.

## Current State

As of this checkpoint:

- Current branch: `main`
- Local `main`: `117029b`
- Remote `origin/main`: `117029b`
- Working tree: clean

Recent `main` tip:

- `117029b` `Fix malformed quotes in expertise main content`

That commit was added to fix a syntax/encoding issue that blocked the recovered branch from compiling in dev.

## Branch Map

### `main`

This is now the approved, recovered branch state and should be treated as the active source of truth.

- Branch name: `main`
- Commit: `117029b`
- Remote tracking: `origin/main`

### `recovered-major-ui-rewrites`

This is the local recovery branch created from `origin/chore/animations-sync`.

- Branch name: `recovered-major-ui-rewrites`
- Commit: `117029b`
- Remote relationship: based on `origin/chore/animations-sync`

This branch exists as a named recovery reference even though `main` now matches it.

### `backup-main-before-recovery-2026-04-01`

This is a snapshot of the old local `main` before repointing `main` to the recovered rewrite history.

- Branch name: `backup-main-before-recovery-2026-04-01`
- Commit: `b30b5af`

### `sandbox-main-2026-04-01`

This is another preserved snapshot of the old `main` state before recovery.

- Branch name: `sandbox-main-2026-04-01`
- Commit: `b30b5af`

### `sandbox-stashed-main-wip-2026-04-01`

This branch contains the earlier uncommitted local work that had originally been sitting on the wrong branch.

- Branch name: `sandbox-stashed-main-wip-2026-04-01`
- Commit: `d222c49`
- Purpose: preserved local work-in-progress from the mistaken branch context

This branch should be treated as a reference/sandbox branch, not something to merge wholesale into `main`.

## Stash State

There is still one stash entry:

- `stash@{0}` `On main: backup main local changes before recovery 2026-04-01`

This stash is now redundant from a safety perspective because the same work has already been preserved on:

- `sandbox-stashed-main-wip-2026-04-01`

It was intentionally left in place as an extra backup.

## What Was Done

### 1. Located the likely recovery branch

The branch containing the recognized major changes was identified as:

- `origin/chore/animations-sync`

This matched the user-visible rewrites that included:

- blog feed changes
- animation gallery modal/gallery work
- Demand & Growth updates
- About page updates

### 2. Preserved the old `main`

Before changing anything substantial, the old `main` state was saved into backup branches.

### 3. Preserved uncommitted local work

The local uncommitted work on the previous `main` checkout was stashed and then converted into a named branch:

- `sandbox-stashed-main-wip-2026-04-01`

### 4. Switched the repo onto the recovered rewrite history

The local repo was moved onto the recovered branch line so the recognized UI/content version became the working state.

### 5. Fixed a compile blocker

The recovered branch had malformed quote characters in:

- [content/expertise/main.ts](c:/GitProd/GTMStack_pro_production/content/expertise/main.ts)

That syntax issue was fixed so the branch could run in `npm run dev`.

### 6. Verified visually

The recovered version was previewed in the browser and confirmed to contain the expected major changes.

### 7. Promoted the recovered version to `main`

Local `main` was repointed to the recovered rewrite history, then pushed to GitHub using a guarded force push so remote `main` matched the approved version.

## Important Interpretation

There are now two very different concepts preserved in Git:

- the recovered, approved production direction on `main`
- the earlier cleanup-oriented work preserved on `sandbox-stashed-main-wip-2026-04-01`

Those should not be confused.

The sandbox branch is not a clean feature branch. It is a mixed bag of:

- useful cleanup ideas
- content/messaging changes
- generated asset churn
- QA artifacts
- alternate implementation directions

Because of that, it is not a good candidate for a blind merge into `main`.

## Recommended Plan Moving Forward

### Source of truth

Use `main` as the source of truth from here forward.

### Use the sandbox branch as a reference branch only

Use:

- `sandbox-stashed-main-wip-2026-04-01`

as a comparison branch to selectively recover cleanup ideas.

### Do not merge the sandbox branch wholesale

The risk is too high because it overlaps with major recovered UI/content work and contains a large amount of generated and branch-specific noise.

### Reapply improvements in small batches

The safest approach is to port over changes in themed batches, for example:

1. documentation and developer guidance
2. safe tooling and script cleanup
3. low-risk utility/helper cleanup
4. admin polish
5. page/template cleanups by feature area

## Shopping List Summary

Based on the review of `sandbox-stashed-main-wip-2026-04-01` against `main`:

### Best first candidates to reapply

- docs improvements
- tooling/documentation cleanup around gallery workflows
- small helper/library cleanup
- selected admin UX cleanup

### Needs careful review before reapplying

- metadata and messaging rewrites
- gallery UI refactors
- blog template changes
- About template changes
- Demand & Growth template changes
- registry/manifest changes

### Probably skip

- QA screenshots and log files
- temp files
- backup-file churn
- broad generated asset churn unless explicitly desired

## Useful Commands

Check current state:

```powershell
git status
git branch -vv
git stash list
```

Compare the sandbox branch against `main`:

```powershell
git diff --stat main..sandbox-stashed-main-wip-2026-04-01
git diff main..sandbox-stashed-main-wip-2026-04-01 -- path/to/file
```

Switch branches:

```powershell
git switch main
git switch sandbox-stashed-main-wip-2026-04-01
```

Preview the current approved site:

```powershell
npm run dev
```

## Recommended Next Task

Start with a low-risk batch from the sandbox branch:

- Batch 1: docs + safe tooling cleanup

That gives the project immediate organizational value without putting the recovered UI/content work at risk.
