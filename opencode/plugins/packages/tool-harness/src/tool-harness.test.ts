import { describe, expect, test } from "bun:test";
import { ToolHarnessPlugin } from "./tool-harness";

async function createHook() {
  const plugin = await ToolHarnessPlugin({} as any);
  const hook = plugin["tool.execute.before"];
  if (!hook) {
    throw new Error("hook not registered");
  }
  return hook;
}

describe("ToolHarnessPlugin", () => {
  describe("tool.execute.before", () => {
    test("allows non-bash tools unconditionally", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "read", sessionID: "s1", callID: "c1" },
          { args: { filePath: "cat file.txt" } }
        )
      ).resolves.toBeUndefined();
    });

    test("allows bash commands with no forbidden commands", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "echo hello" } }
        )
      ).resolves.toBeUndefined();
    });

    test("allows bash npm commands", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "npm run dev" } }
        )
      ).resolves.toBeUndefined();
    });

    test("rejects bash command containing 'cat'", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "cat file.txt" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'cat'. Use the built-in Read tool instead."
      );
    });

    test("rejects bash command containing 'head'", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "head -n 5 file.ts" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'head'. Use the built-in Read tool instead."
      );
    });

    test("rejects bash command containing 'tail'", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "tail -f log.txt" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'tail'. Use the built-in Read tool instead."
      );
    });

    test("rejects bash command containing 'grep'", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "grep 'foo' *.ts" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'grep'. Use the built-in Grep tool instead."
      );
    });

    test("rejects bash command containing 'find'", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "find . -name '*.ts'" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'find'. Use the built-in Glob tool instead."
      );
    });

    test("rejects bash command containing 'ls'", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "ls -la" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'ls'. Use the built-in List tool instead."
      );
    });

    test("rejects bash command containing 'sed'", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "sed 's/foo/bar/' file.txt" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'sed'. Use the built-in Edit tool instead."
      );
    });

    test("rejects bash command containing 'awk'", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "awk '{print $1}' file.txt" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'awk'. Use the built-in Edit tool instead."
      );
    });

    test("rejects bash pipeline containing forbidden command", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "git diff | grep foo" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'grep'. Use the built-in Grep tool instead."
      );
    });

    test("rejects case-insensitively (uppercase)", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "CAT file.txt" } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'cat'. Use the built-in Read tool instead."
      );
    });

    test("rejects case-insensitively (mixed case)", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: { command: "Grep -r foo ." } }
        )
      ).rejects.toThrow(
        "Detected forbidden bash command 'grep'. Use the built-in Grep tool instead."
      );
    });

    test("does nothing when command is missing", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          { args: {} }
        )
      ).resolves.toBeUndefined();
    });

    test("does nothing when args is missing", async () => {
      const hook = await createHook();
      await expect(
        hook(
          { tool: "bash", sessionID: "s1", callID: "c1" },
          {} as any
        )
      ).resolves.toBeUndefined();
    });
  });
});
