const VALID_STATUSES = new Set(["supported", "partial", "unsupported", "unknown"]);

export function validateRegistry(agents) {
  const errors = [];
  const ids = new Set();

  for (const agent of agents) {
    if (!agent.id || !/^[a-z0-9-]+$/.test(agent.id)) {
      errors.push(`invalid agent id: ${String(agent.id)}`);
    }
    if (ids.has(agent.id)) errors.push(`duplicate agent id: ${agent.id}`);
    ids.add(agent.id);

    if (!agent.name) errors.push(`${agent.id}: missing name`);
    if (!agent.vendor) errors.push(`${agent.id}: missing vendor`);
    if (!Array.isArray(agent.commands)) errors.push(`${agent.id}: commands must be an array`);
    if (!Array.isArray(agent.repoMarkers)) errors.push(`${agent.id}: repoMarkers must be an array`);

    const entries = Object.entries(agent.capabilities ?? {});
    if (entries.length === 0) errors.push(`${agent.id}: must define at least one capability`);

    for (const [key, capability] of entries) {
      if (!/^[a-z][a-z0-9.-]+$/.test(key)) errors.push(`${agent.id}: invalid capability key ${key}`);
      if (!VALID_STATUSES.has(capability.status)) {
        errors.push(`${agent.id}/${key}: invalid status ${capability.status}`);
      }
      if (!capability.evidence || capability.evidence.source !== "primary") {
        errors.push(`${agent.id}/${key}: primary evidence is required`);
      }
      if (!capability.evidence?.url?.startsWith("https://")) {
        errors.push(`${agent.id}/${key}: evidence URL must use https`);
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(capability.evidence?.checkedAt ?? "")) {
        errors.push(`${agent.id}/${key}: checkedAt must be YYYY-MM-DD`);
      }
      if (!Array.isArray(capability.paths)) {
        errors.push(`${agent.id}/${key}: paths must be an array`);
      }
    }
  }

  return errors;
}
