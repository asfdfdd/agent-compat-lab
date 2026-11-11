import { capabilityKeys, getAgent } from "./registry.js";

export function compareAgents(leftId, rightId) {
  const left = getAgent(leftId);
  const right = getAgent(rightId);
  if (!left) throw new Error(`unknown agent: ${leftId}`);
  if (!right) throw new Error(`unknown agent: ${rightId}`);

  const capabilities = capabilityKeys().map((key) => ({
    capability: key,
    left: left.capabilities[key]?.status ?? "unknown",
    right: right.capabilities[key]?.status ?? "unknown",
    leftPaths: left.capabilities[key]?.paths ?? [],
    rightPaths: right.capabilities[key]?.paths ?? [],
  }));

  return {
    left: { id: left.id, name: left.name },
    right: { id: right.id, name: right.name },
    capabilities,
  };
}
