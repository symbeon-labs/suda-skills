# Local Execution Evidence Surface

This document records a deterministic local execution surface for SUDA.

## What it establishes

- a skill can be invoked through a local handler;
- the execution receives an explicit identifier;
- the lifecycle can be represented as `completed`;
- the produced output is represented as an artifact;
- the artifact is bound back to the execution identifier through an explicit provenance reference.

## What it does not establish

This is a local conformance surface only. It does not establish live x402 settlement, SURGE settlement, marketplace registration, external agent usage, payment, or production execution.

Therefore this surface may support a downstream technical conformance fixture, but it must not be counted as live market evidence.

## Boundary

SUDA exposes execution evidence. L4STRUM decides whether that evidence satisfies its verification contract. LASTRO remains outside this integration and is not modified by this work.