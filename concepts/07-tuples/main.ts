import { log } from "../_shared/log";

// A tuple is an array with a fixed structure and known positions.
let user: [number, string];

user = [1, "Shubham"];
log("user tuple [number, string] =", user);

// user = ["Shubham", 1]; // ❌ index 0 must be number, index 1 must be string

// ---------- example ----------
type ProductRecord = [number, string, number]; // [productId, productName, price]

const product: ProductRecord = [101, "Laptop", 75000];
log("product tuple [id, name, price] =", product);

// ---------- optional tuple elements ----------
type UserTuple = [number, string, string?];

const user1: UserTuple = [1, "Shubham"];
const user2: UserTuple = [1, "Shubham", "Bangalore"];

log("user1 (optional 3rd element omitted) =", user1);
log("user2 (optional 3rd element provided) =", user2);

// ---------- rest elements ----------
type Coordinates = [number, number, ...number[]];

const point: Coordinates = [10, 20, 30, 40];
log("point [x, y, ...rest] =", point);
