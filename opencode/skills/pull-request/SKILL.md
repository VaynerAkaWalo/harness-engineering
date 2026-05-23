---
name: pull-request
description: Creates pull request with current changes
---

## Important
Always check if changes include tokens or keys that should not be publicly exposed, if you find something always use the `question` tool before proceeding, even if you are unsure.

## Name convention
Available prefixes are `chore` - operational work, `fix` - bug fix and `feat` - new feature

### Branch
Format `{prefix}/{description in kebab case (up to 3 words)}` e.g. `feat/pull-request-skill`

### Commit
Format: `{prefix}: {description up to 1 sentence}` e.g. `chore: Updated java image version`

### Pull request title
Format: `{prefix}: {description up to 1 sentence}`. If there is only single commit use it as PR title, otherwise short title with same format describing primary goal of pull request.

### Pull request description
- Very short explanation of included changes (usually single line)
- For code changes, include a Verification section. Do not just say "tests passed." Instead, detail exactly what was tested and any additions made (e.g., "For the new API endpoint, added 3 unit tests in auth_test.go and verified the full suite passes").

### How to understand the changes
Usually, you are asked to create a PR for changes already written by an operator. This means you must explore the what, why, and where of the included changes.

Before comparing the changes to the default branch, ensure the local default branch is up to date with the remote origin.

During exploration, identify the primary goal of the pull request. Distinguish between the core purpose of the changes and any secondary steps or independent minor adjustments. The branch name, description, and title must focus on this primary goal. If you are uncertain about the intent, use the `question` tool to ask the user for additional context.

## Instructions
1. Make sure default branch is up to date with origin
2. Explore changes compared to default branch
3. Check changes for secrets or tokens — stop and use the `question` tool if found or unsure
4. Create branch if not on one already
5. Run lint and tests to verify changes
6. Commit changes with short descriptive message — Do not commit until you are certain no secrets are exposed.
7. Push changes
8. Invoke the `gh-pr-mgn` subagent via the Task tool to create the pull request. Pass the PR title, body (with Summary and Testing sections), owner, repo, head branch, and base branch. The subagent will handle linking to any related issue automatically.
9. Print PR link to user
