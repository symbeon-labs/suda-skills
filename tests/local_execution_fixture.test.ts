import { runLocalExecution } from "../src/local_execution_fixture.js";

const record = runLocalExecution(
  "deep-translation-v2",
  "1.0.0",
  "hello world",
  () => "Olá Nexus Soberano",
);

if (record.status !== "completed") throw new Error("execution not completed");
if (record.provenance.execution_id !== record.id) throw new Error("provenance mismatch");
if (record.provenance.artifact_ref !== record.id + ":output") throw new Error("artifact binding mismatch");

console.log(JSON.stringify(record, null, 2));