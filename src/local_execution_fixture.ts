export type LocalExecution = {
  id: string;
  status: "completed";
  skill: string;
  version: string;
  input: string;
  output_artifact: { type: "text"; value: string };
  provenance: { execution_id: string; artifact_ref: string };
};

export function runLocalExecution(
  skill: string,
  version: string,
  input: string,
  handler: (value: string) => string,
): LocalExecution {
  const output = handler(input);
  const id = "local-execution-001";
  const artifact_ref = id + ":output";
  return {
    id,
    status: "completed",
    skill,
    version,
    input,
    output_artifact: { type: "text", value: output },
    provenance: { execution_id: id, artifact_ref },
  };
};