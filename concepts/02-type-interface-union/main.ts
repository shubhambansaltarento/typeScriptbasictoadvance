import { log } from "../_shared/log";

// ---------- type: object shape ----------
type User = {
  id: number;
  name: string;
  email: string;
};

const user: User = {
  id: 1,
  name: "Shubham",
  email: "shubham@example.com",
};

// ---------- type: aliasing a primitive ----------
type UserId = number;
let userId: UserId = 101;

// ---------- type: composition via intersection (&) ----------
type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductWithStock = Product & {
  stock: number;
};

const product: ProductWithStock = {
  id: 1,
  name: "Laptop",
  price: 75000,
  stock: 10,
};

// ---------- type: union ----------
type Status = "pending" | "success" | "failed";
const orderStatus: Status = "pending";

// ---------- type: tuple ----------
type Coordinates = [number, number];
const originPoint: Coordinates = [0, 0];

// ---------- interface: object shape ----------
interface Customer {
  id: number;
  name: string;
  email: string;
}

const customer: Customer = {
  id: 2,
  name: "Shubham",
  email: "test@example.com",
};

// ---------- interface: extends ----------
interface Person {
  id: number;
  name: string;
}

interface Admin extends Person {
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "Shubham",
  permissions: ["READ", "WRITE"],
};

// ---------- interface: declaration merging ----------
// Two `interface MergedUser` blocks are combined into one shape by TypeScript.
// (A `type` alias can never do this — redeclaring a `type` name is an error.)
interface MergedUser {
  id: number;
}

interface MergedUser {
  name: string;
}

const mergedUser: MergedUser = {
  id: 3,
  name: "Shubham",
};

// ---------- type: unions of other types (interfaces can't do this) ----------
type UserResponse = User | null;
const response: UserResponse = user;
const noResponse: UserResponse = null;

const values: Record<string, unknown> = {
  "type object -> user": user,
  "type alias -> userId": userId,
  "type intersection -> product": product,
  "type union -> orderStatus": orderStatus,
  "type tuple -> originPoint": originPoint,
  "interface object -> customer": customer,
  "interface extends -> admin": admin,
  "interface merged -> mergedUser": mergedUser,
  "type union (User | null) -> response": response,
  "type union (User | null) -> noResponse": noResponse,
};

for (const [label, value] of Object.entries(values)) {
  log(label, "=", value);
}
