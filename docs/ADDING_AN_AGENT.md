# Adding an agent

An agent entry lives in `src/registry.js` and should be reviewable without trusting the contributor.

1. Pick a stable lowercase ID such as `gemini-cli`.
2. Add one or more local command candidates and safe version arguments.
3. Add repository markers that are meaningful for that agent.
4. Add only capabilities supported by primary evidence.
5. Run `npm run check`.
6. Run `node src/cli.js probe <agent> --json` on a machine with the agent installed when possible, and paste the non-sensitive result into the PR description.

Do not add login automation, scrape private account state, or make a network request merely to prove that a local CLI exists.

## Candidate capability keys

The v0 registry starts with:

- `instructions.repository`
- `skills.project`
- `hooks`

Likely future keys include `mcp`, `custom-agents`, `plugins`, `commands`, `instruction-precedence`, and `skills.user` once their contracts are defined precisely enough to compare across vendors.
