/**
 * @param {number[]} prices
 * @return {number}
 * Time complexity: O(n). The algorithm traverses the list of prices once,
 *  updating lowestPrice and calculating maxProfit in constant time for 
 * each price.
Space complexity: O(1). Only two variables, lowestPrice and maxProfit, are 
used to track intermediate results.
 */
export default function optimalStockTrading(prices) {
    // Initialize maximum profit to 0, assuming no profit initially
   let maxProfit= 0;
 
   // Track the lowest buying price seen so far
   let lowestPrice= Number.MAX_SAFE_INTEGER;
 
   for (const currentPrice of prices) {
     // Update the lowest buying price if a lower price is encountered
     lowestPrice = Math.min(lowestPrice, currentPrice);
 
     // Calculate potential profit for the current price
     const potentialProfit= currentPrice - lowestPrice;
 
     // Update the maximum profit if a higher potential profit is found
     maxProfit = Math.max(maxProfit, potentialProfit);
   }
 
   return maxProfit;
 }
 
/*
Time complexity: O(n2). The nested loops iterate over all pairs of days,
 resulting in a quadratic time complexity.
Space complexity: O(1). No additional data structures are used; only a few 
variables are required for calculations.
*/
 export default function optimalStockTrading(prices){
    // Initialize the maximum profit to 0
    let maxProfit = 0;
  
    // Iterate through each day's price
    for (let i = 0; i < prices.length - 1; i++) {
      // For each day, compare it with the prices of the subsequent days
      for (let j = i + 1; j < prices.length; j++) {
        // Calculate the profit by subtracting the current day's price from the future day's price
        const profit = prices[j] - prices[i];
  
        // If the calculated profit is greater than the current maximum profit, update the maximum profit
        if (profit > maxProfit) {
          maxProfit = profit;
        }
      }
    }
  
    // Return the maximum profit
    return maxProfit;
  }