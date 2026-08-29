import { log } from "../_shared/log";

// Index signatures are used when you don't know the exact property names ahead of time.
interface ProductPrices {
  [productId: string]: number;
}

const prices: ProductPrices = {
  laptop: 75000,
  phone: 50000,
  tablet: 30000,
};

const productId = "laptop";
log(`prices["${productId}"] =`, prices[productId]);

// ---------- dynamic configuration example ----------
interface Config {
  [key: string]: string;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  environment: "production",
  version: "1.0",
};

log("config (keys unknown ahead of time) =", config);

// ---------- number index ----------
interface Scores {
  [index: number]: number;
}

const scores: Scores = { 0: 95, 1: 87, 2: 91 };
log("scores (numeric index signature) =", scores);
