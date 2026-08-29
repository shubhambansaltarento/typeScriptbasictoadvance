import { log } from "../_shared/log";

// Enums define named constants.
enum OrderStatus {
  Pending,
  Processing,
  Shipped,
  Delivered,
}

const currentStatus: OrderStatus = OrderStatus.Pending;
log("OrderStatus.Pending (numeric enum, defaults from 0) =", currentStatus);
log("OrderStatus.Shipped (numeric enum) =", OrderStatus.Shipped);

// ---------- enums with explicit values ----------
enum OrderStatusString {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
}

const stringStatus = OrderStatusString.Shipped;
log("OrderStatusString.Shipped (string enum) =", stringStatus);

// ---------- modern alternative ----------
// For many application cases, a union of string literals is preferable:
// it doesn't create a runtime enum object, it's erased entirely at compile time.
type OrderStatusLiteral = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED";

const literalStatus: OrderStatusLiteral = "SHIPPED";
log("literalStatus (union alternative to enum, no runtime object) =", literalStatus);
