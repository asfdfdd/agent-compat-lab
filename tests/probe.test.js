import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { probeAgent } from "../src/probe.js";

test("probe detects an installed executable and repo markers", () => {
  const cwd = mkdtempSync(join(tmpdir(), "agent-compat-"));
  writeFileSync(join(cwd, "AGENTS.md"), "test");
  const fake = {
    id: "node-runtime",
    name: "Node Runtime",
    commands: [{ executable: "node", versionArgs: ["--version"], label: "node" }],
    repoMarkers: ["AGENTS.md", "missing.md"],
  };
  const result = probeAgent(fake, cwd);
  assert.equal(result.installed, true);
  assert.equal(result.presentMarkerCount, 1);
  assert.match(result.command.version.output, /^v\d+/);
});

test("probe rejects a missing repository path", () => {
  const fake = { id: "fake", name: "Fake", commands: [], repoMarkers: [] };
  assert.throws(() => probeAgent(fake, join(tmpdir(), "agent-compat-path-that-does-not-exist")), /does not exist/);
});
