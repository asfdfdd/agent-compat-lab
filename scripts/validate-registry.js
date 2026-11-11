import { agents } from "../src/registry.js";
import { validateRegistry } from "../src/validate.js";

const errors = validateRegistry(agents);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Registry valid: ${agents.length} agents`);
}
