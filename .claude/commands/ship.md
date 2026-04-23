Stage all changed files, write a concise commit message based on what changed, commit, and push to the current branch.

Steps:
1. Run `git diff --stat` and `git status` to understand what changed.
2. Stage all changes with `git add -A`.
3. Write a commit message (imperative mood, under 72 chars) that summarizes the actual changes — not the task or the user's words, but what the code does differently.
4. Commit using a HEREDOC so formatting is preserved, appending the Co-Authored-By trailer.
5. Push to the current remote branch.
6. Confirm the push succeeded and print the short commit hash.

If there is nothing to commit, say so and stop.
