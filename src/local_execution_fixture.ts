export type LocalExecution = {
  id: string;
  status: "completed";
  skill: string;
  version: string;
  input: string;
  output: string;
};

export function runLocalExecution(
  skill: string,
  version: string,
  input: string,
  handler: (value: string) => string,
): LocalExecution {
  const output = handler(input);
  return { id: "local-execution-001", status: "completed", skill, version, input, output };
};