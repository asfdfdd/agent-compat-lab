# Maintainer workflow

This project is intended to remain useful as agent vendors change their configuration surfaces.

## Reviewing a capability change

1. Confirm the change in a primary source.
2. Narrow the registry claim to exactly what the source establishes.
3. Update the evidence note and `checkedAt` date.
4. Add or update a deterministic test when the registry shape changes.
5. Run `npm run check` and `npm run pack:dry`.
6. Verify the human-readable CLI output and JSON output.

## Reviewing a new agent

New agents should have at least one documented repository configuration surface and a safe local detection strategy. Do not add an agent only because a product exists.

## Release discipline

Minor releases should correspond to real capability additions, adapters, schema improvements, or probe behavior. Cosmetic-only changes do not justify artificial release churn.

## Automation boundaries

Automation may help find documentation changes, prepare diffs, or run fixtures, but compatibility claims still require reviewable evidence. Automated discovery must not silently promote an inference into a supported claim.
