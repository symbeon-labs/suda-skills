export type LocalExecutionEvidence = {
  schema: "suda.execution-evidence.v0";
  execution: {
    id: string;
    status: "completed";
    skill: { name: string; version: string };
    input: string;
    output_artifact: { type: "text"; value: string };
    provenance: { execution_id: string; artifact_ref: string };
  };
};

export function executeLocal(
  skill: { name: string; version: string },
  input: string,
  handler: (value: string) => string,
): LocalExecutionEvidence {
  const id = "local-execution-" + skill.name + "-001";
  const output = handler(input);
  return {
    schema: "suda.execution-evidence.v0",
    execution: {
      id,
      status: "completed",
      skill,
      input,
      output_artifact: { type: "text", value: output },
      provenance: { execution_id: id, artifact_ref: id + ":output" },
    },
  };
}
