import { log } from "../_shared/log";

// any essentially disables TypeScript checking for that value.
let data: any;

data = 10;
data = "hello";
data = true;
log("any accepts anything, TypeScript won't protect you =", data);

// data.foo.bar.baz(); // compiles fine with `any`, but throws at runtime

function process(input: any): string {
  return input.name.toUpperCase();
}

// process(100) compiles but explodes at runtime:
// "Cannot read properties of undefined (reading 'toUpperCase')" - not run here.
log("process({ name: 'laptop' }) =", process({ name: "laptop" }));

// ---------- prefer unknown + narrowing ----------
function processSafely(input: unknown): void {
  if (typeof input === "object" && input !== null && "name" in input) {
    log("processSafely() found a name:", (input as { name: unknown }).name);
  } else {
    log("processSafely() rejected input with no `name`:", input);
  }
}

processSafely({ name: "Laptop" });
processSafely(100);

// Mental model: any -> "TypeScript stops helping."
// unknown -> "TypeScript forces you to validate."
// For API responses and business logic, aim for any -> almost zero.
