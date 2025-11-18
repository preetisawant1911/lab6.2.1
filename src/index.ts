import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
  NetworkError,
  DataError,
  
} from "./apiSimulator.ts"; // ✅ Make sure file name is exactly apiSimulator.ts
import type { Product,Review,SalesReport } from './apiSimulator';
import { retryPromise } from "./retryPromise.ts";

function logError(err: unknown, context: string) {
  if (err instanceof NetworkError) {
    console.error(`[NetworkError] ${context}: ${err.message}`);
  } else if (err instanceof DataError) {
    console.error(`[DataError] ${context}: ${err.message}`);
  } else {
    console.error(`[UnknownError] ${context}:`, err);
  }
}

function displayProducts(products: Product[]) {
  console.log("Products:");
  for (const p of products) {
    console.log(`- #${p.id} ${p.name} — $${p.price}`);
  }
}

function displayReviews(productId: number, reviews: Review[]) {
  console.log(`Reviews for product ${productId}:`);
  for (const r of reviews) {
    console.log(`  • ${r.user} (${r.rating}/5): ${r.comment}`);
  }
}

function displaySalesReport(report: SalesReport) {
  console.log("Sales Report:");
  console.log(`- Total Sales: $${report.totalSales}`);
  console.log(`- Units Sold: ${report.unitsSold}`);
  console.log(`- Average Price: $${report.averagePrice}`);
}

async function main() {
  console.log("Starting dashboard data fetch...");

  const products = await retryPromise(() => fetchProductCatalog(), 3, 600)
    .catch(err => {
      logError(err, "Fetching product catalog");
      return [];
    });

  if (products.length > 0) {
    displayProducts(products);
  } else {
    console.warn("No products available. Skipping reviews.");
  }

  for (const product of products) {
    await retryPromise(() => fetchProductReviews(product.id), 3, 600)
      .then(reviews => {
        displayReviews(product.id, reviews);
      })
      .catch(err => {
        logError(err, `Fetching reviews for product ${product.id}`);
      });
  }

  await retryPromise(() => fetchSalesReport(), 3, 600)
    .then(report => {
      displaySalesReport(report);
    })
    .catch(err => {
      logError(err, "Fetching sales report");
    })
    .finally(() => {
      console.log("All API calls have been attempted.");
    });
}

main().catch(err => {
  console.error("Fatal error in main:", err);
});
