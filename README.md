# E‑Commerce Dashboard (Promises + Error Handling)

This project simulates an e‑commerce dashboard that fetches data from multiple APIs:
- Product catalog
- Product reviews
- Sales report

Each API call is asynchronous and may fail randomly, so proper error handling is implemented.

## 🔹 Objectives
- Use Promises to manage multiple async operations
- Chain Promises for sequential API calls
- Handle errors with `.catch()` and cleanup with `.finally()`
- Create custom error classes (`NetworkError`, `DataError`)
- Implement a retry mechanism for failed requests

## 🔹 Project Structure
- `apiSimulator.ts` → mock API functions (`fetchProductCatalog`, `fetchProductReviews`, `fetchSalesReport`)
- `index.ts` → main logic to call APIs, handle errors, and display results
- Optional utility → `retryPromise` for retrying failed calls

## 🔹 How It Works
1. Fetch product catalog (with random chance of failure).
2. For each product, fetch reviews.
3. Fetch sales report after products and reviews.
4. Errors are caught individually and logged.
5. Retry mechanism attempts failed calls up to 3 times.

## 🔹 Example Features
- Simulated delay with `setTimeout`
- Random rejection using `Math.random()`
- Custom error classes for clearer debugging
- Resilient workflow with retries

---

Created by **Preeti Sawant**  
Lab: Asynchronous Programming with Promises
