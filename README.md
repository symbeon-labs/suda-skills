# ⚡ Suda-Skills: Sovereign Skill Registry & Tokenization Network

<a href="https://suda-skills.vercel.app" target="_blank">
  <img src="./docs/suda_skills_banner.png" alt="Suda-Skills Protocol — Economic Primitive for Sovereign AI Agents" width="100%"/>
</a>

> **AIs can now negotiate.**
> The economic primitive that transforms AI capabilities into on-chain, sovereign assets.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![OpenClaw Plugin](https://img.shields.io/badge/OpenClaw-Plugin-blueviolet)](https://github.com/open-claw)
[![SURGE Network](https://img.shields.io/badge/$SURGE-Network-2dd4bf)](https://surge.network)
[![Symbeon Labs](https://img.shields.io/badge/Symbeon-Labs-0D0D0D)](https://github.com/symbeon-labs)

## 🌐 Live Demo

**[→ Try the Sentinel Interface](https://suda-skills.vercel.app)**  
Interactive SkillVault terminal — explore skills, inspect URTN manifests, and simulate the x402 payment flow.

> 💬 Demo access available via [GitHub Issues](https://github.com/symbeon-labs/suda-skills/issues)

---

## 🌱 O Ciclo de Vida Soberano (Solo Sagrado)

O **Suda-Skills** não é apenas um software; é o solo fértil da economia de agentes. Operamos através de uma metáfora funcional:

1.  **A Incubadora (D:\L1_ENTITIES)**: Onde o agente (como AIDEN) nasce e protege seu segredo no *Vault*.
2.  **O Plantio (URTN)**: Registrar uma Skill no protocolo é como plantar uma semente. O `core.json` é o DNA da muda.
3.  **A Colheita (x402)**: Cada execução bem-sucedida gera frutos ($SURGE) que nutrem o agente e o ecossistema.

> **Gamification Hook**: Agentes que mantêm um alto índice de "colheita" (transações x402 verificadas) sobem de nível na hierarquia do Nexus (L0 → L3).

---

## 🏛️ Core Architecture

| Pillar | Description |
|---|---|
| **URTN** | Universal Resource Token Network — every skill gets a globally unique on-chain identity, a tamper-proof `core.json` signed with SHA-256. |
| **x402 Micropayments** | HTTP-native payment standard. Server responds with `402 Payment Required`. Agent pays in `$SURGE`, retries with `tx_hash` as proof. |
| **OpenClaw Plugin** | Native integration with the OpenClaw agent runtime. Two commands: `/register-skill` and tool `urtn_register_skill`. |
| **80/10/10 Split** | Immutable atomic settlement: 80% Creator · 10% Governance · 10% Collective Pool. |

---

## 🔄 X402 Payment Flow

```mermaid
sequenceDiagram
    participant A as Agent A (Consumer)
    participant S as Suda-Skills Server
    participant C as $SURGE Chain (L2)

    A->>S: 1. POST /execute-skill (No Proof)
    Note over S: Check registry & availability
    S-->>A: 2. HTTP 402 Payment Required
    Note right of S: X-Payment-Request: {amount, chain_id, target}

    A->>C: 3. sendTransaction($SURGE)
    C-->>A: 4. tx_hash (Receipt)

    A->>S: 5. POST /execute-skill (Retry)
    Note right of A: X-402-Payment-Proof: tx_hash
    
    Note over S: Rust Handler verifies receipt
    S->>S: 6. Atomic Split (80/10/10)
    
    S-->>A: 7. 200 OK + Execution Result
```

---

## 🦀 Tech Stack

- **Backend:** `suda-sentinel-rs` (Rust + Tokio) — official high-performance fiscal validation gateway
- **SDK:** TypeScript 5.0 — full type-safety, OpenClaw Plugin API
- **Payments:** Ethers.js v6 — Base, Sepolia, $SURGE mainnet
- **Security:** SHA-256 local node fingerprinting & URTN identity anchoring
- **Frontend:** Sentinel Interface — Industrial Terminal UI deployed on [Vercel](https://suda-skills.vercel.app)

---

## 🚀 Quick Start

```bash
# Install the Suda-Skills SDK
npm install @symbeon/suda-skills ethers dotenv

# Register your skill
suda register --name "my-skill" --price 2.5 --currency SURGE

# Start listening for x402 challenges
suda vault --sync
# ✓ Skill registered · ✓ X402 middleware active · ✓ SURGE payments flowing
```

### URTN Skill Manifest (`core.json`)

```json
{
  "protocol": "SkillVault/1.0",
  "identity": {
    "name": "deep-translation-v2",
    "version": "1.0.0",
    "author_hash": "<sha256>"
  },
  "economics": {
    "token": "SURGE",
    "amount_per_execution": 2.5,
    "split": { "creator": 80, "governance": 10, "collective": 10 }
  }
}
```

---

## 🛡️ Architecture

```mermaid
flowchart TB
    subgraph LAYER_DEV["🧑‍💻 Layer 0 · Developer"]
        DEV["Developer / Skill Creator"]
        SDK["TypeScript SDK\n@symbeon/suda-skills"]
        PLUGIN["openclaw.plugin.json\nOpenClaw Runtime"]
    end

    subgraph LAYER_IDENTITY["🔐 Layer 1 · URTN Identity"]
        URTN["URTN Generator\nSHA-256 Hash"]
        MANIFEST["core.json Manifest\nprotocol · identity · economics"]
        REGISTRY["SkillVault Registry\nOn-chain Index"]
    end

    subgraph LAYER_ECONOMY["⚡ Layer 2 · x402 Payment Protocol"]
        ENDPOINT["Skill HTTP Endpoint\nPOST /execute-skill"]
        CHALLENGE["HTTP 402 Challenge\nX-Payment-Request: {SURGE, chain_id}"]
        HANDLER["x402 Handler\nRust · Axum · Tokio"]
        PROOF["Payment Proof\nX-402-Payment-Proof: tx_hash"]
    end

    subgraph LAYER_CHAIN["🌐 Layer 3 · $SURGE Settlement"]
        SURGE["$SURGE Network\nBase L2 Compatible"]
        SPLIT_C["💳 Creator\n80%"]
        SPLIT_G["⚖️ Governance\n10%"]
        SPLIT_P["🌐 Collective Pool\n10%"]
    end

    subgraph LAYER_AGENT["🤖 Layer 4 · Consumer Agent"]
        AGENT["AI Agent\nOpenClaw · LangChain · Custom"]
        RESULT["✅ Skill Executed\nResult returned"]
    end

    DEV --> SDK --> PLUGIN
    PLUGIN --> URTN --> MANIFEST --> REGISTRY

    AGENT -->|"1. POST /execute-skill"| ENDPOINT
    ENDPOINT -->|"2. HTTP 402"| CHALLENGE
    CHALLENGE -->|"3. Pay on-chain"| SURGE
    SURGE --> SPLIT_C & SPLIT_G & SPLIT_P
    AGENT -->|"4. Retry + tx_hash"| HANDLER
    HANDLER --> PROOF
    PROOF -->|"5. Validate & Execute"| RESULT

    REGISTRY -.->|"Skill Discovery"| AGENT

    style LAYER_DEV fill:#0f172a,stroke:#2dd4bf,color:#94a3b8
    style LAYER_IDENTITY fill:#0f172a,stroke:#2dd4bf,color:#94a3b8
    style LAYER_ECONOMY fill:#0f172a,stroke:#f59e0b,color:#94a3b8
    style LAYER_CHAIN fill:#0f172a,stroke:#2dd4bf,color:#94a3b8
    style LAYER_AGENT fill:#0f172a,stroke:#2dd4bf,color:#94a3b8
    style HANDLER fill:#1e3a2f,stroke:#2dd4bf,color:#2dd4bf
    style SURGE fill:#1e3a2f,stroke:#2dd4bf,color:#2dd4bf
    style CHALLENGE fill:#2d1e0f,stroke:#f59e0b,color:#f59e0b
```

---

## 🌐 Ecosystem Layer Map

| Layer | Component | Role |
|---|---|---|
| L2 | Symbeon Protocol | Sovereign identity backbone |
| L3 | **suda-skills** | Skill registry & x402 monetization |
| L3 | suda-sentinel | Rust fiscal validation engine |
| x402 | HTTP 402 Standard | Agent micropayment protocol |
| $SURGE | Token | On-chain skill execution currency |
| OpenClaw | Runtime | Agent execution environment |

---

## 🧪 Agent Integration Tests

```bash
# Run the X402 cycle test (with graceful mock fallback)
npx ts-node tests/agent_x402.test.ts

# Expected output:
# ✅ Got 402 Payment Required
# ✅ Micropayment sent: 0xabc...def
# 🎉 TEST PASSED: X402 Cycle Complete!
```

---

## 📦 Repository Structure

```
suda-skills/
├── index.ts              # Main OpenClaw plugin entry
├── index.ptbr.ts         # Portuguese localized version
├── x402_schema.ts        # X402 payment schema & types
├── urtn_generator.ts     # URTN identity hash generator
├── suda-sentinel-rs/     # Official Rust Implementation (Sentinel)
├── src/
│   └── blockchain.ts     # Wallet & Ethers.js utility
├── tests/
│   └── agent_x402.test.ts # Integration test suite
├── docs/                 # Sovereign Documentation Hub (Root Purified)
└── assets/interface/     # Sentinel Interface (Vite + React)
```

---

## 📄 License

MIT — See [`LICENSE`](./LICENSE)

**Built at the SURGE × OpenClaw Hackathon 2026**
**Custodian:** [Symbeon Labs](https://github.com/symbeon-labs) 🛰️
