import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const cli = join(here, "..", "src", "cli.js");

test("list --json is machine readable", () => {
  const result = spawnSync(process.execPath, [cli, "list", "--json"], { encoding: "utf8" });
  assert.equal(result.status, 0);
  const parsed = JSON.parse(result.stdout);
  assert.ok(parsed.agents.some((agent) => agent.id === "codex"));
  assert.ok(parsed.agents.some((agent) => agent.id === "claude-code"));
});

test("registry command exits cleanly", () => {
  const result = spawnSync(process.execPath, [cli, "registry", "--json"], { encoding: "utf8" });
  assert.equal(result.status, 0);
  assert.equal(JSON.parse(result.stdout).ok, true);
});
