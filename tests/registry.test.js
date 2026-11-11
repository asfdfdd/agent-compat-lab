import test from "node:test";
import assert from "node:assert/strict";
import { agents, getAgent } from "../src/registry.js";
import { validateRegistry } from "../src/validate.js";

test("registry is internally valid", () => {
  assert.deepEqual(validateRegistry(agents), []);
});

test("every capability is backed by primary evidence", () => {
  for (const agent of agents) {
    for (const capability of Object.values(agent.capabilities)) {
      assert.equal(capability.evidence.source, "primary");
      assert.match(capability.evidence.url, /^https:\/\//);
    }
  }
});

test("known agent lookup works", () => {
  assert.equal(getAgent("codex").vendor, "OpenAI");
  assert.equal(getAgent("missing"), undefined);
});
