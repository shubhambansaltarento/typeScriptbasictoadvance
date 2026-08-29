import { log } from "../_shared/log";

// readonly prevents reassignment through that type.
interface Product {
  readonly id: number;
  name: string;
}

const product: Product = { id: 101, name: "Laptop" };

product.name = "MacBook";
log("product.name reassigned (allowed) =", product.name);

// product.id = 200; // ❌ Cannot assign to 'id' because it is a read-only property
log("product.id stays fixed at =", product.id);

// ---------- very useful for entities ----------
interface User {
  readonly id: string;
  name: string;
}

const user: User = { id: "u-1", name: "Shubham" };
log("user (readonly id, meant to never change post-creation) =", user);

// ---------- important limitation ----------
// readonly is a compile-time restriction only - it doesn't freeze the
// JavaScript object at runtime. For actual runtime immutability, use
// Object.freeze, which is a different mechanism:
const frozenProduct = Object.freeze({ id: 101, name: "Laptop" });

try {
  // @ts-expect-error - Object.freeze's return type is Readonly<T>, so this
  // is a compile error too; the try/catch below shows the runtime effect.
  frozenProduct.name = "MacBook";
} catch (err) {
  log("Object.freeze blocked the mutation at runtime:", (err as Error).message);
}

log("frozenProduct.name after attempted mutation =", frozenProduct.name);
