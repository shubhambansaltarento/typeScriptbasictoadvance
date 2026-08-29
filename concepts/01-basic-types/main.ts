import { log } from "../_shared/log";

let userName: string = "Shubham";
let age: number = 33;
let isAdmin: boolean = true;

let id: bigint = 100n;

let nothing: null = null;
let notDefined: undefined = undefined;

let uniqueId: symbol = Symbol("id");

const values: Record<string, unknown> = { userName, age, isAdmin, id, nothing, notDefined, uniqueId };

for (const [key, value] of Object.entries(values)) {
  log(key, "=", value, `(${typeof value})`);
}
