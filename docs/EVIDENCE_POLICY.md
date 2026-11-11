# Evidence policy

The registry is useful only if its claims are traceable.

## Accepted evidence

For v0.1, capability claims require a primary source: official vendor documentation, an official specification, or official source code that unambiguously defines the behavior.

Each evidence record includes:

- `source`: currently `primary`.
- `url`: the source URL.
- `checkedAt`: the date a maintainer last checked the source.
- `note`: the narrow fact the source supports.

## Status meanings

- `supported`: the cited source explicitly documents the capability.
- `partial`: the cited source documents only part of the capability contract.
- `unsupported`: the cited source explicitly says the capability is unavailable.
- `unknown`: no sufficiently strong claim is available in the registry.

Absence of evidence is `unknown`, not `unsupported`.

## Runtime evidence

Local probes are reported separately from documentation claims. A probe can establish that a binary is present, expose its version output, or detect repository configuration files. It does not prove semantic instruction-following behavior.
