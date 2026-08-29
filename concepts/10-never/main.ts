import { log } from "../_shared/log";

// never represents a value that will never exist - most commonly,
// a function that never successfully returns.

// An infinite loop also returns `never`, not run here since it would
// freeze the page:
// function infiniteLoop(): never {
//   while (true) { console.log("running"); }
// }

function throwError(message: string): never {
  throw new Error(message);
}

try {
  throwError("Something went wrong");
} catch (err) {
  log("throwError() always throws, caught:", (err as Error).message);
}

// ---------- exhaustive checking ----------
type Status = "pending" | "success" | "failed";

function handleStatus(status: Status): string {
  switch (status) {
    case "pending":
      return "Waiting";
    case "success":
      return "Done";
    case "failed":
      return "Failed";
    default:
      return assertNever(status);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

log("handleStatus('pending') =", handleStatus("pending"));
log("handleStatus('success') =", handleStatus("success"));
log("handleStatus('failed') =", handleStatus("failed"));

// If Status later grows a "cancelled" member without a matching `case`
// above, the `default` branch's `status` no longer narrows to `never`,
// and TypeScript flags `assertNever(status)` as a compile error - a
// very useful senior-level technique for catching missed cases.
