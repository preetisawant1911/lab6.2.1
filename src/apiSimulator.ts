export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class DataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataError";
  }
}

// ✅ Exported types for use in index.ts
export type Product = { id: number; name: string; price: number };
export type Review = { productId: number; user: string; rating: number; comment: string };
export type SalesReport = { totalSales: number; unitsSold: number; averagePrice: number };

// ✅ Helper function to simulate failure
const shouldFail = (probability = 0.2) => Math.random() < probability;

// ✅ Simulated API: fetchProductCatalog
export const fetchProductCatalog = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail(0.2)) {
        return reject(new NetworkError("Failed to fetch product catalog"));
      }
      resolve([
        { id: 1, name: "Laptop", price: 1200 },
        { id: 2, name: "Headphones", price: 200 },
        { id: 3, name: "Monitor", price: 350 }
      ]);
    }, 1000);
  });
};

// ✅ Simulated API: fetchProductReviews
export const fetchProductReviews = (productId: number): Promise<Review[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail(0.3)) {
        return reject(new NetworkError(`Failed to fetch reviews for product ID ${productId}`));
      }
      resolve([
        { productId, user: "Asha", rating: 5, comment: "Excellent!" },
        { productId, user: "Rahul", rating: 4, comment: "Good value." }
      ]);
    }, 1500);
  });
};

// ✅ Simulated API: fetchSalesReport
export const fetchSalesReport = (): Promise<SalesReport> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail(0.25)) {
        return reject(new NetworkError("Failed to fetch sales report"));
      }
      resolve({
        totalSales: 250000,
        unitsSold: 1450,
        averagePrice: 172.4
      });
    }, 1000);
  });
};

