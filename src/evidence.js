import { agents } from "./registry.js";

export function listEvidence(agentId = null) {
  const selected = agentId ? agents.filter((agent) => agent.id === agentId) : agents;
  if (agentId && selected.length === 0) throw new Error(`unknown agent: ${agentId}`);

  return selected.flatMap((agent) =>
    Object.entries(agent.capabilities).map(([capability, value]) => ({
      agent: agent.id,
      capability,
      status: value.status,
      checkedAt: value.evidence.checkedAt,
      source: value.evidence.source,
      url: value.evidence.url,
      note: value.evidence.note,
    }))
  );
}
