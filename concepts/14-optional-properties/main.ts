import { log } from "../_shared/log";

// Use `?` when a property may not exist.
interface User {
  id: number;
  name: string;
  phone?: string;
}

const user1: User = { id: 1, name: "Shubham" };
const user2: User = { id: 2, name: "Rahul", phone: "9999999999" };

log("user1.phone (missing, type is string | undefined) =", user1.phone);
log("user2.phone (present) =", user2.phone);

if (user1.phone) {
  log("this never runs since user1.phone is undefined:", (user1.phone as string).toUpperCase());
} else {
  log("user1.phone is falsy, skipped calling .toUpperCase()");
}

if (user2.phone) {
  log("user2.phone narrowed to string ->", user2.phone.toUpperCase());
}

// ---------- important distinction ----------
// `phone?: string`            -> the key may be missing entirely.
// `phone: string | undefined` -> the key must exist, but its value can be undefined.
// This matters under `exactOptionalPropertyTypes` in strict TypeScript configs.
interface UserStrict {
  id: number;
  phone: string | undefined;
}

const user3: UserStrict = { id: 3, phone: undefined };
log("user3 (key present, value undefined) =", user3);
