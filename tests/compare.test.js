import test from "node:test";
import assert from "node:assert/strict";
import { compareAgents } from "../src/compare.js";

test("compare exposes shared and asymmetric capabilities", () => {
  const result = compareAgents("codex", "github-copilot");
  const instructions = result.capabilities.find((row) => row.capability === "instructions.repository");
  const hooks = result.capabilities.find((row) => row.capability === "hooks");
  assert.equal(instructions.left, "supported");
  assert.equal(instructions.right, "supported");
  assert.equal(hooks.left, "unknown");
  assert.equal(hooks.right, "supported");
});

test("compare rejects unknown agents", () => {
  assert.throws(() => compareAgents("codex", "nope"), /unknown agent/);
});
