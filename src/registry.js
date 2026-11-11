export const REGISTRY_VERSION = 1;
export const CHECKED_AT = "2026-11-11";

const primary = (url, note) => ({
  source: "primary",
  checkedAt: CHECKED_AT,
  url,
  note,
});

export const agents = [
  {
    id: "codex",
    name: "OpenAI Codex CLI",
    vendor: "OpenAI",
    homepage: "https://developers.openai.com/codex/",
    commands: [
      { executable: "codex", versionArgs: ["--version"], label: "codex" },
    ],
    repoMarkers: ["AGENTS.md", ".agents/skills"],
    capabilities: {
      "instructions.repository": {
        status: "supported",
        paths: ["AGENTS.md"],
        evidence: primary(
          "https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide",
          "Codex CLI discovers AGENTS.md files from global and repository scopes."
        ),
      },
      "skills.project": {
        status: "supported",
        paths: [".agents/skills/<skill>/SKILL.md"],
        evidence: primary(
          "https://developers.openai.com/plugins/concepts/skills",
          "OpenAI documents Agent Skills and project-level skill packages for Codex."
        ),
      },
      "mcp.config": {
        status: "supported",
        paths: [".codex/config.toml"],
        evidence: primary(
          "https://developers.openai.com/plugins/concepts/plugins",
          "OpenAI documents MCP as a first-class Codex plugin/runtime capability."
        ),
      },
      "plugins": {
        status: "supported",
        paths: ["plugin.json", ".codex-plugin/plugin.json"],
        evidence: primary(
          "https://developers.openai.com/plugins/build/plugins",
          "OpenAI documents portable Agent Plugins and the Codex compatibility overlay."
        ),
      },
    },
  },
  {
    id: "claude-code",
    name: "Claude Code",
    vendor: "Anthropic",
    homepage: "https://code.claude.com/docs/",
    commands: [
      { executable: "claude", versionArgs: ["--version"], label: "claude" },
    ],
    repoMarkers: ["CLAUDE.md", ".claude/CLAUDE.md", ".claude/skills"],
    capabilities: {
      "instructions.repository": {
        status: "supported",
        paths: ["CLAUDE.md", ".claude/CLAUDE.md"],
        evidence: primary(
          "https://code.claude.com/docs/en/memory",
          "Claude Code documents CLAUDE.md files as project memory/instructions."
        ),
      },
      "skills.project": {
        status: "supported",
        paths: [".claude/skills/<skill>/SKILL.md"],
        evidence: primary(
          "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview",
          "Anthropic documents .claude/skills as the project-level Claude Code skill location."
        ),
      },
      "hooks": {
        status: "supported",
        paths: [".claude/settings.json", ".claude/settings.local.json"],
        evidence: primary(
          "https://code.claude.com/docs/en/settings",
          "Claude Code project settings support hooks and related project configuration."
        ),
      },
    },
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    vendor: "Google",
    homepage: "https://geminicli.com/",
    commands: [
      { executable: "gemini", versionArgs: ["--version"], label: "gemini" },
    ],
    repoMarkers: ["GEMINI.md", ".gemini/settings.json", ".gemini/skills", ".agents/skills"],
    capabilities: {
      "instructions.repository": {
        status: "supported",
        paths: ["GEMINI.md"],
        evidence: primary(
          "https://geminicli.com/docs/reference/configuration/",
          "Gemini CLI documents repository context files and project configuration."
        ),
      },
      "skills.project": {
        status: "supported",
        paths: [".gemini/skills/<skill>/SKILL.md", ".agents/skills/<skill>/SKILL.md"],
        evidence: primary(
          "https://geminicli.com/docs/reference/configuration/",
          "Gemini CLI documents project skill locations and skills settings."
        ),
      },
      "mcp.config": {
        status: "supported",
        paths: [".gemini/settings.json"],
        evidence: primary(
          "https://geminicli.com/docs/reference/configuration/",
          "Gemini CLI documents mcpServers in settings."
        ),
      },
      "hooks": {
        status: "supported",
        paths: [".gemini/settings.json"],
        evidence: primary(
          "https://geminicli.com/docs/reference/configuration/",
          "Gemini CLI documents hooks configuration in settings."
        ),
      },
      "plugins": {
        status: "supported",
        paths: ["gemini-extension.json"],
        evidence: primary(
          "https://geminicli.com/docs/extensions/",
          "Gemini CLI extensions can package agent-facing components including hooks, MCP, subagents, and skills."
        ),
      },
    },
  },
  {
    id: "cursor",
    name: "Cursor",
    vendor: "Cursor",
    homepage: "https://cursor.com/",
    commands: [
      { executable: "cursor-agent", versionArgs: ["--version"], label: "cursor-agent" },
    ],
    repoMarkers: ["AGENTS.md", "CLAUDE.md", ".cursor/rules", ".cursor/skills", ".cursor/mcp.json", ".cursor/hooks.json"],
    capabilities: {
      "instructions.repository": {
        status: "supported",
        paths: ["AGENTS.md", "CLAUDE.md", ".cursor/rules/*.mdc"],
        evidence: primary(
          "https://prod.cursor.com/docs/cli/using",
          "Cursor CLI documents repository instruction files including AGENTS.md and CLAUDE.md."
        ),
      },
      "skills.project": {
        status: "supported",
        paths: [".cursor/skills/<skill>/SKILL.md"],
        evidence: primary(
          "https://cursor.com/docs/skills",
          "Cursor documents project Agent Skills."
        ),
      },
      "mcp.config": {
        status: "supported",
        paths: [".cursor/mcp.json"],
        evidence: primary(
          "https://cursor.com/docs/plugins",
          "Cursor documents MCP servers as a supported plugin and workspace capability."
        ),
      },
      "hooks": {
        status: "supported",
        paths: [".cursor/hooks.json"],
        evidence: primary(
          "https://cursor.com/docs/hooks",
          "Cursor documents project and user hooks.json files."
        ),
      },
      "plugins": {
        status: "supported",
        paths: ["plugin.json", ".cursor-plugin/plugin.json"],
        evidence: primary(
          "https://cursor.com/docs/plugins",
          "Cursor documents both Agent Plugins and Cursor Plugins."
        ),
      },
    },
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot CLI",
    vendor: "GitHub",
    homepage: "https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli",
    commands: [
      { executable: "copilot", versionArgs: ["--version"], label: "copilot" },
      { executable: "gh", versionArgs: ["copilot", "--version"], label: "gh copilot" },
    ],
    repoMarkers: [
      "AGENTS.md",
      "CLAUDE.md",
      "GEMINI.md",
      ".github/copilot-instructions.md",
      ".github/instructions",
      ".github/skills",
      ".agents/skills",
      ".claude/skills",
    ],
    capabilities: {
      "instructions.repository": {
        status: "supported",
        paths: [
          ".github/copilot-instructions.md",
          ".github/instructions/**/*.instructions.md",
          "AGENTS.md",
          "CLAUDE.md",
          "GEMINI.md",
        ],
        evidence: primary(
          "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions",
          "GitHub documents repository-wide, path-specific, AGENTS.md, CLAUDE.md, and GEMINI.md instruction discovery."
        ),
      },
      "skills.project": {
        status: "supported",
        paths: [
          ".github/skills/<skill>/SKILL.md",
          ".agents/skills/<skill>/SKILL.md",
          ".claude/skills/<skill>/SKILL.md",
        ],
        evidence: primary(
          "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills",
          "GitHub documents three project-level Agent Skill locations for Copilot CLI."
        ),
      },
      "hooks": {
        status: "supported",
        paths: [".github/hooks"],
        evidence: primary(
          "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/overview",
          "GitHub documents shell-command hooks at key Copilot CLI session events."
        ),
      },
      "mcp.config": {
        status: "supported",
        paths: [".mcp.json", ".github/mcp.json"],
        evidence: primary(
          "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/overview",
          "GitHub documents MCP configuration as a Copilot CLI customization surface."
        ),
      },
    },
  },
];

export function getAgent(id) {
  return agents.find((agent) => agent.id === id);
}

export function capabilityKeys() {
  return [...new Set(agents.flatMap((agent) => Object.keys(agent.capabilities)))].sort();
}
