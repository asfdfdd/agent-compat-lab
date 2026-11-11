## What changed?

Describe the agent, capability, probe, schema, or infrastructure change.

## Evidence

Link the primary source that supports each compatibility claim changed by this PR. If the change is runtime-only, describe the reproducible fixture or probe instead.

## Validation

List the commands you ran. At minimum:

```bash
npm run check
npm run pack:dry
```

## Safety check

- [ ] Default probes remain non-destructive.
- [ ] No credentials, tokens, private prompts, or account data are read or emitted.
- [ ] Missing evidence is represented as `unknown`, not guessed as `unsupported`.
