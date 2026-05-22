import type { Plugin } from "@opencode-ai/plugin";

const CMD_TO_TOOL: ReadonlyMap<string, string> = new Map([
  ["cat", "Read"],
  ["head", "Read"],
  ["tail", "Read"],
  ["grep", "Grep"],
  ["find", "Glob"],
  ["ls", "List"],
  ["sed", "Edit"],
  ["awk", "Edit"],
]);

export const ToolHarnessPlugin: Plugin = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "bash") {
        return;
      }

      const command = output.args?.command as string | undefined;
      if (!command) {
        return;
      }

      const lower = command.toLowerCase();
      for (const [cmd, tool] of CMD_TO_TOOL) {
        if (lower.includes(cmd)) {
          throw new Error(
            `Detected forbidden bash command '${cmd}'. Use the built-in ${tool} tool instead.`,
          );
        }
      }
    },
  };
};
