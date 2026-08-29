import { log } from "../_shared/log";

// A type assertion tells TypeScript: I know more about this value than you do.
const data: unknown = "hello";

const text = data as string;
log("data asserted as string, upper-cased =", text.toUpperCase());

// A common DOM example (no #username element on this page, so not run here):
// const input = document.querySelector("#username");
// const username = input as HTMLInputElement;
// console.log(username.value);

// ---------- assertions don't perform runtime conversion ----------
const fakeNumber = "123" as unknown as number;
log("typeof fakeNumber is still", typeof fakeNumber, "- value:", fakeNumber);

// If you want an actual conversion:
const realNumber = Number("123");
log("Number('123') really converts - typeof:", typeof realNumber, "- value:", realNumber);

// ---------- assertion vs validation ----------
interface User {
  id: number;
  name: string;
}

// Bad: asserting an unvalidated response as User just to silence TS.
const unvalidatedResponse: unknown = { id: 1, name: "Shubham" };
const assumedUser = unvalidatedResponse as User;
log("assumedUser (asserted, never actually checked) =", assumedUser);

// Better for untrusted external data: API -> unknown -> validate -> User.
// (Libraries such as Zod are commonly used for this pattern.)
function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value && "name" in value;
}

if (isUser(unvalidatedResponse)) {
  log("unvalidatedResponse validated as User ->", unvalidatedResponse);
}
