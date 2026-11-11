#!/usr/bin/env node
import { agents, getAgent, REGISTRY_VERSION, CHECKED_AT } from "./registry.js";
import { compareAgents } from "./compare.js";
import { probeAgent } from "./probe.js";
import { validateRegistry } from "./validate.js";
import { table } from "./format.js";

function usage() {
  return `agent-compat - evidence-backed coding-agent compatibility checks

Usage:
  agent-compat list [--json]
  agent-compat show <agent> [--json]
  agent-compat compare <agent-a> <agent-b> [--json]
  agent-compat probe [agent|all] [--json]
  agent-compat doctor [--json]
  agent-compat registry [--json]

Agents: ${agents.map((agent) => agent.id).join(", ")}`;
}

function emit(value, json) {
  if (json) console.log(JSON.stringify(value, null, 2));
  else console.log(value);
}

function list(json) {
  const payload = agents.map((agent) => ({
    id: agent.id,
    name: agent.name,
    vendor: agent.vendor,
    capabilities: Object.keys(agent.capabilities).length,
  }));
  if (json) return emit({ registryVersion: REGISTRY_VERSION, checkedAt: CHECKED_AT, agents: payload }, true);
  emit(table(["ID", "NAME", "VENDOR", "CAPS"], payload.map((row) => [row.id, row.name, row.vendor, row.capabilities])), false);
}

function show(id, json) {
  const agent = getAgent(id);
  if (!agent) throw new Error(`unknown agent: ${id}`);
  if (json) return emit(agent, true);
  const rows = Object.entries(agent.capabilities).map(([key, cap]) => [
    key,
    cap.status,
    cap.paths.join(", "),
    cap.evidence.url,
  ]);
  console.log(`${agent.name} (${agent.id})`);
  console.log(table(["CAPABILITY", "STATUS", "PATHS", "EVIDENCE"], rows));
}

function compare(left, right, json) {
  const result = compareAgents(left, right);
  if (json) return emit(result, true);
  console.log(`${result.left.name} vs ${result.right.name}`);
  console.log(table(
    ["CAPABILITY", result.left.id.toUpperCase(), result.right.id.toUpperCase()],
    result.capabilities.map((row) => [row.capability, row.left, row.right])
  ));
}

function probe(target, json) {
  const selected = !target || target === "all" ? agents : [getAgent(target)].filter(Boolean);
  if (selected.length === 0) throw new Error(`unknown agent: ${target}`);
  const results = selected.map((agent) => probeAgent(agent));
  if (json) return emit({ checkedAt: new Date().toISOString(), results }, true);
  console.log(table(
    ["AGENT", "INSTALLED", "COMMAND", "REPO MARKERS"],
    results.map((result) => [
      result.agent,
      result.installed ? "yes" : "no",
      result.command?.version?.output ?? result.command?.command ?? "-",
      `${result.presentMarkerCount}/${result.repositoryMarkers.length}`,
    ])
  ));
}

function registry(json) {
  const errors = validateRegistry(agents);
  const result = { ok: errors.length === 0, errors, registryVersion: REGISTRY_VERSION, checkedAt: CHECKED_AT };
  if (json) emit(result, true);
  else emit(errors.length === 0 ? `registry v${REGISTRY_VERSION}: valid (${agents.length} agents, checked ${CHECKED_AT})` : errors.join("\n"), false);
  if (errors.length) process.exitCode = 1;
}

const args = process.argv.slice(2);
const json = args.includes("--json");
const positional = args.filter((arg) => arg !== "--json");
const [command = "help", ...rest] = positional;

try {
  switch (command) {
    case "list": list(json); break;
    case "show": show(rest[0], json); break;
    case "compare": compare(rest[0], rest[1], json); break;
    case "probe": probe(rest[0] ?? "all", json); break;
    case "doctor": probe("all", json); break;
    case "registry": registry(json); break;
    case "help":
    case "--help":
    case "-h": emit(usage(), false); break;
    default: throw new Error(`unknown command: ${command}`);
  }
} catch (error) {
  console.error(`agent-compat: ${error.message}`);
  console.error(`\n${usage()}`);
  process.exitCode = 2;
}
