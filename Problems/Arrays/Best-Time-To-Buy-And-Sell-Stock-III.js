var maxProfit = function(prices) {
    let firstBuy = -Infinity, firstSell = 0;
    let secondBuy = -Infinity, secondSell = 0;
    
    for (let price of prices) {
        firstBuy = Math.max(firstBuy, -price);        // Best price to buy first stock
        firstSell = Math.max(firstSell, firstBuy + price);  // Best profit after selling first stock
        secondBuy = Math.max(secondBuy, firstSell - price); // Best price to buy second stock
        secondSell = Math.max(secondSell, secondBuy + price); // Best profit after selling second stock
    }
    
    return secondSell;
};

/*
Approach	Time Complexity	Space Complexity
Optimized DP	O(n)	O(1)
*/


var maxProfit = function(prices) {
    let n = prices.length;
    if (n == 0) return 0;

    let leftProfits = new Array(n).fill(0);
    let rightProfits = new Array(n).fill(0);

    // Compute max profit with one transaction in prices[0...i]
    let minPrice = prices[0];
    for (let i = 1; i < n; i++) {
        minPrice = Math.min(minPrice, prices[i]);
        leftProfits[i] = Math.max(leftProfits[i - 1], prices[i] - minPrice);
    }

    // Compute max profit with one transaction in prices[i...n-1]
    let maxPrice = prices[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        maxPrice = Math.max(maxPrice, prices[i]);
        rightProfits[i] = Math.max(rightProfits[i + 1], maxPrice - prices[i]);
    }

    // Find max combined profit of two transactions
    let maxProfit = 0;
    for (let i = 0; i < n; i++) {
        maxProfit = Math.max(maxProfit, leftProfits[i] + (i + 1 < n ? rightProfits[i + 1] : 0));
    }

    return maxProfit;
};

/*
DP (left & right profits)	TC- O(n)	SC-O(n)
*/


var maxProfit = function(prices) {
    let maxProfit = 0;
    let n = prices.length;
    
    for (let i = 0; i < n; i++) {
        let firstMax = 0;
        let secondMax = 0;
        
        // First transaction: Buy at some day 0 <= j <= i and sell at day i
        for (let j = 0; j <= i; j++) {
            firstMax = Math.max(firstMax, prices[i] - prices[j]);
        }
        
        // Second transaction: Buy at some day i+1 <= k < n and sell at day n
        for (let k = i + 1; k < n; k++) {
            for (let m = k; m < n; m++) {
                secondMax = Math.max(secondMax, prices[m] - prices[k]);
            }
        }
        
        maxProfit = Math.max(maxProfit, firstMax + secondMax);
    }
    
    return maxProfit;
};

/*
TC - O(n^3)	
SC - O(1)
*/
