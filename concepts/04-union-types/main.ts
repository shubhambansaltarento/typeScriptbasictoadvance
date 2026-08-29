import { log } from "../_shared/log";

// A union means: this value can be one of several types.
type ID = string | number;

let id: ID;

id = 100;
log("id (number) =", id);

id = "USR-100";
log("id (string) =", id);

// id = true; // ❌ Type 'boolean' is not assignable to type 'ID'

// ---------- real API example ----------
type Product = { id: number; name: string; price: number };

type ApiResponse = { success: true; data: Product[] } | { success: false; error: string };

function handleResponse(response: ApiResponse): void {
  // TS narrows `response` inside each branch based on the `success` literal.
  if (response.success) {
    log("handleResponse -> data:", response.data);
  } else {
    log("handleResponse -> error:", response.error);
  }
}

handleResponse({ success: true, data: [{ id: 1, name: "Laptop", price: 75000 }] });
handleResponse({ success: false, error: "Product not found" });
