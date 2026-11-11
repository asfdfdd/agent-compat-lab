# Contributing

Agent Compat Lab is designed around small, evidence-backed additions that are independently reviewable.

## Good contributions

- Add a coding agent with primary-source documentation and a local detection probe.
- Add a newly documented capability to an existing agent.
- Update a capability whose vendor behavior or documented path changed.
- Add macOS, Linux, or Windows-specific probe coverage.
- Add a deterministic fixture for instruction, skill, hook, MCP, plugin, or custom-agent discovery.
- Improve machine-readable output without breaking the report schema.
- Add tests that reproduce a real compatibility regression.

Cosmetic-only churn and generated bulk entries without evidence will not be merged.

## Development

```bash
npm install
npm run check
```

The project intentionally has no runtime dependencies in v0.1.

## Evidence requirements

Every `supported`, `partial`, or `unsupported` capability claim needs a primary-source URL and a `checkedAt` date. Prefer official vendor documentation. If only runtime behavior can establish a fact, add a reproducible probe and mark the source accordingly in a future evidence-model extension instead of presenting an inference as documentation.

## Pull requests

Keep each PR focused on one agent, capability, probe, or infrastructure improvement. Explain what changed, link the primary evidence, and include the command used to validate it.

For architecture and maintainer expectations, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/CONFORMANCE_MODEL.md](docs/CONFORMANCE_MODEL.md), and [docs/MAINTAINER_WORKFLOW.md](docs/MAINTAINER_WORKFLOW.md).
