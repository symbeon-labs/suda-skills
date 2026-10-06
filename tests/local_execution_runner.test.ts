import { executeLocal } from "../src/local_execution_runner.js";

const record = executeLocal(
  { name: "deep-translation-v2", version: "1.0.0" },
  "hello world",
  () => "Olá Nexus Soberano",
);

if (record.execution.status !== "completed") throw new Error("execution incomplete");
if (record.execution.provenance.execution_id !== record.execution.id) throw new Error("provenance mismatch");
if (record.execution.provenance.artifact_ref !== record.execution.id + ":output") throw new Error("artifact binding mismatch");
if (record.execution.output_artifact.value !== "Olá Nexus Soberano") throw new Error("unexpected output");

console.log(JSON.stringify(record, null, 2));
