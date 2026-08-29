import { log } from "../_shared/log";

// Every concept from this series, combined into one e-commerce example.

type ProductStatus = "ACTIVE" | "OUT_OF_STOCK" | "DISCONTINUED"; // union + literal

interface Product {
  readonly id: number; // readonly
  name: string;
  price: number;
  description?: string; // optional
  status: ProductStatus;
}

type ProductWithStock = Product & { stock: number }; // intersection

type ProductResponse = // union
  | { success: true; data: ProductWithStock[] }
  | { success: false; error: string };

interface ProductCache {
  [productId: string]: ProductWithStock; // index signature
}

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function describeStatus(status: ProductStatus): string {
  switch (status) {
    case "ACTIVE":
      return "In stock";
    case "OUT_OF_STOCK":
      return "Temporarily unavailable";
    case "DISCONTINUED":
      return "No longer sold";
    default:
      return assertNever(status); // exhaustiveness check via never
  }
}

function handleProducts(response: ProductResponse): void {
  // void: no meaningful return value
  if (response.success) {
    response.data.forEach((product) => {
      log("product:", product.name, "-", describeStatus(product.status));
    });
  } else {
    log("error:", response.error);
  }
}

const laptop: ProductWithStock = {
  id: 1,
  name: "Laptop",
  price: 75000,
  status: "ACTIVE",
  stock: 10,
};

const cache: ProductCache = { [String(laptop.id)]: laptop };
log("cache =", cache);

handleProducts({ success: true, data: [laptop] });
handleProducts({ success: false, error: "Service unavailable" });

// This single example contains:
// type         -> ProductStatus / ProductResponse
// interface    -> Product / ProductCache
// union        -> ProductStatus / ProductResponse
// intersection -> ProductWithStock
// literal      -> "ACTIVE", "OUT_OF_STOCK", ...
// optional     -> description?
// readonly     -> id
// index sig.   -> ProductCache
// void         -> handleProducts()
// never        -> assertNever() for exhaustive handling
