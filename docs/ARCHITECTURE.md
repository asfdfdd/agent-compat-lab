# Architecture

Agent Compat Lab separates documented compatibility claims from observable local state.

## Registry

`src/registry.js` is the evidence-backed compatibility registry. Each agent defines:

* A stable ID, display name, vendor, and homepage.
* Safe executable candidates used only for version detection.
* Repository markers that can be checked without starting the agent.
* Capability claims with a status, documented paths, and primary-source evidence.

The registry is intentionally explicit. A missing capability entry means `unknown`, not `unsupported`.

## Validation

`src/validate.js` rejects malformed IDs, duplicate agents, unknown statuses, missing evidence, insecure evidence URLs, malformed check dates, and invalid path definitions.

This prevents a compatibility claim from entering the project as an untraceable string.

## Comparison layer

`src/compare.js` compares two agents. `src/matrix.js` projects the same registry into a full capability matrix. Both use the same registry source so human-readable and machine-readable views cannot drift independently.

## Evidence layer

`src/evidence.js` flattens evidence records into an auditable stream. This is useful for maintainers who need to review source age, source URLs, or vendor changes without manually reading the registry implementation.

## Local probe layer

`src/probe.js` performs two deliberately narrow checks:

1. Is a documented executable present, and what does its safe version command report?
2. Which known configuration markers exist in the target repository?

The default probe does not authenticate, invoke a model, start MCP servers, run hooks, install extensions, or write repository files.

## CLI

`src/cli.js` exposes list, show, compare, matrix, evidence, probe, doctor, and registry validation commands. JSON output is intended to be stable enough for scripts while the public schema continues to evolve before 1.0.

## Extension strategy

New adapters should be data-first whenever possible. New executable behavior belongs in the probe layer only when a documented capability cannot be verified through safe filesystem observation alone.
