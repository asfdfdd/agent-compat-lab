import test from "node:test";
import assert from "node:assert/strict";
import { buildMatrix } from "../src/matrix.js";
import { listEvidence } from "../src/evidence.js";

test("matrix uses unknown rather than inventing unsupported claims", () => {
  const matrix = buildMatrix();
  const hooks = matrix.capabilities.find((row) => row.capability === "hooks");
  assert.equal(hooks.agents.codex, "unknown");
  assert.equal(hooks.agents["claude-code"], "supported");
});

test("evidence can be filtered by agent", () => {
  const entries = listEvidence("cursor");
  assert.ok(entries.length > 0);
  assert.ok(entries.every((entry) => entry.agent === "cursor"));
});
