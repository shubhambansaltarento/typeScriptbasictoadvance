import { log } from "../_shared/log";

// void generally means: this function doesn't return a meaningful value.
function logMessage(message: string): void {
  console.log(message);
}

logMessage("Hello");
log("logMessage() has no meaningful return value (void)");

// ---------- compare ----------
function getName(): string {
  return "Shubham";
}

function logName(): void {
  console.log(getName());
}

log("getName() returns:", getName());
logName();

// ---------- void vs never ----------
function test1(): void {
  log("test1() finishes normally");
}

function test2(): never {
  throw new Error("Failed");
}

test1();
try {
  test2();
} catch (err) {
  log("test2() never completes normally, caught:", (err as Error).message);
}
