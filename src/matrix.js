import { agents, capabilityKeys } from "./registry.js";

export function buildMatrix() {
  const keys = capabilityKeys();
  return {
    agents: agents.map((agent) => ({ id: agent.id, name: agent.name })),
    capabilities: keys.map((capability) => ({
      capability,
      agents: Object.fromEntries(
        agents.map((agent) => [agent.id, agent.capabilities[capability]?.status ?? "unknown"])
      ),
    })),
  };
}
