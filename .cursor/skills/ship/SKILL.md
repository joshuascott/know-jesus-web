---
name: ship
description: >-
  Commit the current work, push main, and confirm the Netlify deploy is live
  at knowjesus.co. Use when the user says commit, push, and deploy, or runs
  /ship.
disable-model-invocation: true
---

# Ship

Commit, push, and deploy the current work. Do this only when the user runs `/ship` or explicitly asks to commit, push, and deploy.

## Commit

Follow the repository commit rules. In parallel, inspect `git status`, `git diff`, and `git log` so the message matches the repo style: one sentence about why.

Do not update git config, skip hooks, or force-push. Do not commit secrets. If there is nothing to commit, say so and stop.

## Push

Push the current branch with `git push origin HEAD`. This repo deploys from `main` through Netlify. Do not push to a different branch unless the user is already on one.

## Confirm the deploy

Poll `https://knowjesus.co/` until a string that exists only in this change appears in the HTML or CSS. Report the commit hash and that the site is live. If it is not live after several checks, say the push succeeded and the deploy has not shown up yet.
