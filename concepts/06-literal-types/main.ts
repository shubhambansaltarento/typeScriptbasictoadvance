import { log } from "../_shared/log";

// Instead of a plain `string`, restrict to exact values.
type Status = "pending" | "processing" | "shipped" | "delivered";

let orderStatus: Status;

orderStatus = "pending";
log("orderStatus =", orderStatus);

orderStatus = "shipped";
log("orderStatus =", orderStatus);

// orderStatus = "cancelled"; // ❌ not part of the Status union

// ---------- example ----------
type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

function processPayment(status: PaymentStatus): void {
  if (status === "SUCCESS") {
    log("processPayment ->", "Payment completed");
  } else {
    log("processPayment -> status is", status);
  }
}

processPayment("SUCCESS");
processPayment("PENDING");

// ---------- literal + union = powerful ----------
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const method: HTTPMethod = "POST";
log("method (HTTPMethod literal union, safer than `method: string`) =", method);
