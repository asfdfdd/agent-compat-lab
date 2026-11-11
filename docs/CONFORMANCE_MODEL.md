# Conformance model

Agent Compat Lab distinguishes documentation claims from runtime observations.

## Documentation status

Each capability uses one of four statuses:

* `supported`: a primary source explicitly documents the capability.
* `partial`: a primary source documents only part of the comparison contract.
* `unsupported`: a primary source explicitly documents that the capability is unavailable.
* `unknown`: the project does not have strong enough evidence to make a claim.

`unknown` is the default when evidence is missing. The project does not infer a negative from silence.

## Local observation

A local probe may establish facts such as:

* An executable is installed.
* A safe version command returns successfully.
* A known configuration file or directory exists in a repository.

A local probe does not prove that the agent loaded, interpreted, or obeyed that configuration.

## Evidence strength

Current v0.x registry claims require primary evidence. Preferred sources are official vendor documentation, specifications, or official source code that unambiguously defines behavior.

Future versions may add version-scoped runtime evidence. Runtime evidence must remain reproducible and clearly separate observed behavior from documented support.

## Versioning

Coding-agent behavior changes quickly. Evidence records include a `checkedAt` date so maintainers can audit source freshness. A future registry format will attach explicit agent version ranges where vendor behavior is version-dependent.
