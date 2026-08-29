import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/editor/editor.worker?worker";
import TsWorker from "monaco-editor/languages/features/typescript/ts.worker?worker";

// Vite + Monaco need this so the editor can spin up its background
// language-service / syntax workers instead of failing to load them.
(self as unknown as { MonacoEnvironment: monaco.Environment }).MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    if (label === "typescript" || label === "javascript") return new TsWorker();
    return new EditorWorker();
  },
};

monaco.typescript.typescriptDefaults.setCompilerOptions({
  target: monaco.typescript.ScriptTarget.ESNext,
  module: monaco.typescript.ModuleKind.None,
  strict: true,
  noEmitOnError: false,
});

monaco.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: false,
  noSyntaxValidation: false,
});

// The sandbox that runs edited code injects `log` as a real parameter (see
// run() below), but the editor's type-checker has no way to know that -
// this ambient declaration is what keeps `log(...)` from showing as a
// "Cannot find name" error while typing.
monaco.typescript.typescriptDefaults.addExtraLib(
  "declare function log(...args: unknown[]): void;",
  "file:///playground-globals.d.ts",
);

// Every concept's main.ts, inlined as raw text at build time - this is what
// seeds the editor. See README-style comment in log.ts for why the
// "_shared/log" import gets stripped before the code runs in the sandbox.
const sources = import.meta.glob("/concepts/*/main.ts", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function cleanSource(raw: string): string {
  return raw
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("import ") && trimmed.includes("_shared/log")) return false;
      if (trimmed === "export {};") return false;
      return true;
    })
    .join("\n")
    .replace(/^\n+/, "");
}

function currentConceptSourcePath(): string | null {
  const match = location.pathname.match(/\/concepts\/([^/]+)\//);
  return match ? `/concepts/${match[1]}/main.ts` : null;
}

function formatValue(value: unknown): string {
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "symbol") return value.toString();
  if (typeof value === "function") return value.toString();
  if (typeof value === "undefined") return "undefined";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

// monaco.typescript's worker registers itself lazily (via languages.onLanguage)
// the first time a "typescript" model exists, so it isn't ready the instant
// the model is created - retry briefly instead of failing on the first call.
async function waitForTypeScriptWorker(): ReturnType<typeof monaco.typescript.getTypeScriptWorker> {
  const attempts = 30;
  for (let i = 0; i < attempts; i++) {
    try {
      return await monaco.typescript.getTypeScriptWorker();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  return monaco.typescript.getTypeScriptWorker();
}

function init() {
  const path = currentConceptSourcePath();
  const rawSource = path ? sources[path] : undefined;

  const editorContainer = document.getElementById("editor");
  const outputEl = document.getElementById("output");
  const runButton = document.getElementById("run");
  const resetButton = document.getElementById("reset");

  if (!editorContainer || !outputEl || rawSource === undefined) return;

  const initialCode = cleanSource(rawSource);
  const modelUri = monaco.Uri.parse(`file://${path}`);
  const model = monaco.editor.createModel(initialCode, "typescript", modelUri);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const editor = monaco.editor.create(editorContainer, {
    model,
    theme: prefersDark ? "vs-dark" : "vs",
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 13,
    scrollBeyondLastLine: false,
  });

  async function run() {
    outputEl!.textContent = "Running...";
    const lines: string[] = [];

    function write(prefix: string, args: unknown[]) {
      const text = args.map((a) => (typeof a === "string" ? a : formatValue(a))).join(" ");
      lines.push(prefix ? `${prefix}${text}` : text);
      outputEl!.textContent = lines.join("\n");
    }

    const log = (...args: unknown[]) => write("", args);
    const sandboxConsole = {
      log: (...args: unknown[]) => write("", args),
      error: (...args: unknown[]) => write("Error: ", args),
      warn: (...args: unknown[]) => write("Warning: ", args),
      info: (...args: unknown[]) => write("", args),
    };

    try {
      const workerFactory = await waitForTypeScriptWorker();
      const client = await workerFactory(model.uri);
      const uriString = model.uri.toString();

      const diagnostics = [
        ...(await client.getSyntacticDiagnostics(uriString)),
        ...(await client.getSemanticDiagnostics(uriString)),
      ];

      for (const diagnostic of diagnostics) {
        const message =
          typeof diagnostic.messageText === "string"
            ? diagnostic.messageText
            : diagnostic.messageText.messageText;
        write("Type error: ", [message]);
      }

      const emitOutput = await client.getEmitOutput(uriString);
      if (!emitOutput.outputFiles.length) {
        write("", ["(nothing to run - fix the error above)"]);
        return;
      }

      const jsCode = emitOutput.outputFiles[0].text;
      const runInSandbox = new Function("log", "console", `"use strict";\n${jsCode}`);
      runInSandbox(log, sandboxConsole);
    } catch (err) {
      write("Runtime error: ", [err instanceof Error ? err.message : String(err)]);
    }
  }

  runButton?.addEventListener("click", run);
  resetButton?.addEventListener("click", () => {
    model.setValue(initialCode);
    run();
  });

  run();
}

init();
