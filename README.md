# Agent Compat Lab

Evidence-backed compatibility checks for coding-agent configuration surfaces.

Coding agents increasingly share concepts such as repository instructions and Agent Skills, but the file locations and supported surfaces still differ. Static compatibility tables drift quickly. Agent Compat Lab keeps every compatibility claim next to a primary-source citation and pairs the registry with local probes that can verify what is installed and what configuration markers are present in a repository.

The project is intentionally vendor-neutral and has no model or cloud dependency.

## What works in v0.1

- Registry entries for OpenAI Codex CLI, Claude Code, Gemini CLI, Cursor, and GitHub Copilot CLI.
- Primary-source evidence for every claimed capability.
- `list`, `show`, and `compare` commands for inspecting the matrix.
- `probe` / `doctor` commands that detect installed CLIs, report their local version output, and scan the current repository for relevant configuration markers.
- JSON output for CI, scripts, and downstream tooling.
- Registry validation that rejects unsupported status values and claims without primary evidence.

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
node src/cli.js list
node src/cli.js compare codex claude-code
node src/cli.js doctor
node src/cli.js doctor --json
```

After publication to npm:

```bash
npx agent-compat-lab doctor
```

## Example

```text
$ agent-compat compare codex github-copilot
OpenAI Codex CLI vs GitHub Copilot CLI
CAPABILITY               CODEX      GITHUB-COPILOT
-----------------------  ---------  --------------
hooks                    unknown    supported
instructions.repository  supported  supported
skills.project           supported  supported
```

`unknown` is deliberate. The registry does not turn a missing citation into a negative claim.

## Evidence policy

Compatibility entries must cite vendor documentation or another primary source. A blog post, generated answer, or copied compatibility table is not enough. See [docs/EVIDENCE_POLICY.md](docs/EVIDENCE_POLICY.md).

## Contributing

The highest-value contributions add a new agent, prove a capability change, or add an executable probe. Gemini CLI, Cursor, OpenCode, Windsurf, Cline, and platform-specific probes are intentionally open contribution areas.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/ADDING_AN_AGENT.md](docs/ADDING_AN_AGENT.md).

## Scope

Agent Compat Lab reports documented configuration compatibility and observable local state. It does not claim that an installed agent will follow instructions correctly, that two agents interpret the same instructions identically, or that a cloud feature is available to a particular account. Default probes never start an MCP server, execute a hook, invoke a model, install a plugin, or trigger login.

## License

MIT. This project is independent and is not affiliated with or endorsed by OpenAI, Anthropic, GitHub, or other vendors represented in the registry.
