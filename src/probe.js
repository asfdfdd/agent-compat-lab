import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

function commandExists(executable) {
  const checker = process.platform === "win32" ? "where.exe" : "which";
  const result = spawnSync(checker, [executable], {
    encoding: "utf8",
    timeout: 2500,
    windowsHide: true,
  });
  return result.status === 0;
}

function runVersion(candidate) {
  const result = spawnSync(candidate.executable, candidate.versionArgs ?? ["--version"], {
    encoding: "utf8",
    timeout: 3500,
    windowsHide: true,
  });
  const combined = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim();
  return {
    ok: result.status === 0,
    status: result.status,
    output: combined.split(/\r?\n/).filter(Boolean)[0] ?? null,
  };
}

export function probeAgent(agent, cwd = process.cwd()) {
  let installed = null;
  for (const candidate of agent.commands ?? []) {
    if (!commandExists(candidate.executable)) continue;
    const version = runVersion(candidate);
    installed = {
      command: candidate.label ?? candidate.executable,
      executable: candidate.executable,
      version,
    };
    break;
  }

  const markers = (agent.repoMarkers ?? []).map((marker) => ({
    path: marker,
    present: existsSync(resolve(cwd, marker)),
  }));

  return {
    agent: agent.id,
    name: agent.name,
    cwd: resolve(cwd),
    installed: Boolean(installed),
    command: installed,
    repositoryMarkers: markers,
    presentMarkerCount: markers.filter((marker) => marker.present).length,
  };
}
