import { log } from "../_shared/log";

// unknown means: I don't know what this value is yet.
let value: unknown;

value = 10;
value = "hello";
value = true;
log("value can hold anything while its type stays `unknown` =", value);

// console.log(value.toUpperCase()); // ❌ Object is of type 'unknown'

if (typeof value === "boolean") {
  log("narrowed to boolean, value =", value);
}

value = "narrowed example";
if (typeof value === "string") {
  log("narrowed to string, upper-cased =", value.toUpperCase());
}

// `any` skips this check entirely and can crash at runtime instead:
// let data: any;
// data.foo.bar.baz(); // compiles, but throws at runtime
// Mental model: any -> "Trust me."  unknown -> "Prove it."

// ---------- API example ----------
async function getData(): Promise<unknown> {
  // simulating a fetch("/api/products").then(r => r.json()) response
  return [{ id: 1, name: "Laptop" }];
}

async function demoApiExample(): Promise<void> {
  const data = await getData();

  if (Array.isArray(data)) {
    log("getData() narrowed with Array.isArray ->", data);
  }
}

demoApiExample();
