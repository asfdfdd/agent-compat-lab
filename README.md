# Agent Compat Lab

[![CI](https://github.com/asfdfdd/agent-compat-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/asfdfdd/agent-compat-lab/actions/workflows/ci.yml)
[![GitHub release](https://img.shields.io/github/v/release/asfdfdd/agent-compat-lab)](https://github.com/asfdfdd/agent-compat-lab/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Evidence-backed compatibility checks for coding-agent configuration surfaces.

Coding agents increasingly share the same concepts while disagreeing on the details. Repository instructions, Agent Skills, MCP servers, hooks, plugins, commands, and custom tools can live at different paths or use different configuration models depending on the agent. Static comparison tables drift quickly and often blur the difference between documented support and assumption.

Agent Compat Lab keeps compatibility claims next to primary-source evidence and pairs that registry with safe local probes. The goal is simple: make coding-agent interoperability inspectable, reproducible, and easier to maintain as the ecosystem changes.

## 30 second tour

Requires Node.js 20 or newer.

```bash
git clone https://github.com/asfdfdd/agent-compat-lab.git
cd agent-compat-lab
npm install

node src/cli.js matrix
node src/cli.js compare codex opencode
node src/cli.js evidence codex
node src/cli.js doctor --cwd ..
```

Every command also supports JSON where it is useful for automation:

```bash
node src/cli.js matrix --json
node src/cli.js doctor --cwd /path/to/repository --json
```

## Supported agents

| Agent | Repository instructions | Project skills | MCP config | Hooks | Plugins | Commands | Custom tools |
| --- | --- | --- | --- | --- | --- | --- | --- |
| OpenAI Codex CLI | Yes | Yes | Yes | Unknown | Yes | Unknown | Unknown |
| Claude Code | Yes | Yes | Unknown | Yes | Unknown | Unknown | Unknown |
| Gemini CLI | Yes | Yes | Yes | Yes | Yes | Unknown | Unknown |
| Cursor | Yes | Yes | Yes | Yes | Yes | Unknown | Unknown |
| GitHub Copilot CLI | Yes | Yes | Yes | Yes | Unknown | Unknown | Unknown |
| OpenCode | Yes | Yes | Yes | Unknown | Yes | Yes | Yes |

`Unknown` is deliberate. Missing evidence is not converted into an `unsupported` claim.

## What v0.2 adds

* Six evidence-backed agent adapters, including OpenCode.
* A full `matrix` command for side-by-side compatibility inspection.
* An `evidence` command for auditing every source behind a compatibility claim.
* `--cwd <path>` support for probing any repository without changing directories.
* Safe install/version detection and repository-marker scanning.
* JSON output for CI, scripts, and downstream tooling.
* Registry validation that rejects unsupported statuses and claims without primary evidence.
* Cross-platform tests on Windows, macOS, and Ubuntu across Node 20, 22, and 24.

## Examples

Compare two agents:

```text
$ agent-compat compare codex github-copilot
OpenAI Codex CLI vs GitHub Copilot CLI
CAPABILITY               CODEX      GITHUB-COPILOT
-----------------------  ---------  --------------
hooks                    unknown    supported
instructions.repository  supported  supported
mcp.config               supported  supported
plugins                  supported  unknown
skills.project           supported  supported
```

Audit evidence:

```text
$ agent-compat evidence opencode
AGENT     CAPABILITY               STATUS     CHECKED     SOURCE
--------  -----------------------  ---------  ----------  ----------------------------------------
opencode  instructions.repository  supported  2026-11-11  https://opencode.ai/docs/instructions/
opencode  skills.project           supported  2026-11-11  https://opencode.ai/docs/skills/
...
```

Probe another repository:

```bash
agent-compat doctor --cwd ../my-project --json
```

The probe does not start an agent, invoke a model, execute hooks, start MCP servers, install plugins, or trigger login.

## Why this project exists

The coding-agent ecosystem is converging on shared concepts faster than it is converging on shared configuration. Developers should not have to rely on stale blog posts or memory to answer questions such as:

* Which instruction files will this agent discover?
* Can the same Agent Skill work across multiple tools?
* Where does this agent expect MCP configuration?
* Does a repository already contain configuration markers for an agent?
* Which claims are documented, and when were those sources last checked?

Agent Compat Lab treats those as conformance questions rather than marketing claims.

## Evidence policy

Every `supported`, `partial`, or `unsupported` capability claim requires a primary source. A generated answer, copied matrix, social post, or third-party blog is not enough.

See [Evidence Policy](docs/EVIDENCE_POLICY.md) and [Conformance Model](docs/CONFORMANCE_MODEL.md).

## Contributing

The highest-value contributions add evidence, executable probes, new agents, or regression fixtures. Good contribution areas include:

* Windsurf and Cline adapters.
* Version-scoped evidence and deprecation metadata.
* MCP configuration fixtures.
* Platform-specific detection behavior.
* Historical compatibility diffs.
* Schema stabilization for third-party adapters.
* Reproducible tests for instruction precedence and discovery.

See [CONTRIBUTING.md](CONTRIBUTING.md), [Adding an Agent](docs/ADDING_AN_AGENT.md), and [Architecture](docs/ARCHITECTURE.md).

## Design boundaries

Agent Compat Lab reports documented configuration compatibility and observable local state. It does not claim that an installed agent will follow instructions correctly, that two agents interpret the same instructions identically, or that a cloud feature is available to a particular account.

Default probes are non-destructive and do not read authentication tokens, API keys, private prompts, session transcripts, or unrelated user files.

## Development

```bash
npm install
npm run check
npm run pack:dry
```

The package has zero runtime dependencies in v0.2.

## License

MIT. Agent Compat Lab is independent and is not affiliated with or endorsed by OpenAI, Anthropic, Google, Cursor, GitHub, Anomaly, or other vendors represented in the registry.
