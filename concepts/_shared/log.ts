const output = typeof document !== "undefined" ? document.getElementById("output") : null;
const lines: string[] = [];

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

// Mirrors console.log's call shape, and also renders onto the page's #output element.
export function log(...args: unknown[]): void {
  console.log(...args);
  const text = args.map((arg) => (typeof arg === "string" ? arg : formatValue(arg))).join(" ");
  lines.push(text);
  if (output) output.textContent = lines.join("\n");
}
