/**
 * @param {number[]} coins
 * @param {number} target
 * @return {number}
 * Time complexity: O(n.t). Iterating over target amounts and checking each 
 * of the n coins results in O(n.t).
Space complexity: O(t). The dp array requires space proportional to the
 target amount t.
 */
export default function minimumCoinsForChange(
    coins,
    target,
) {
    // Initialize a dp array with a large value (Infinity)
    const dp = new Array(target + 1).fill(Number.MAX_VALUE);

    // Base case: 0 coins are needed to make amount 0
    dp[0] = 0;

    // Iterate over each amount from 1 to the target amount
    for (let i = 1; i <= target; i++) {
        // Check each coin to see if it can contribute to the current amount
        for (const coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // If the value at dp[amount] is still Infinity, return -1 (not possible)
    // Otherwise, return the minimum number of coins needed for the target amount
    return dp[target] === Number.MAX_VALUE ? -1 : dp[target];
}

/*
Time complexity: O(ct). The recursion explores all combinations of c coins for the target
 amount t, resulting in exponential time complexity.
Space complexity: O(t). The recursive call stack grows proportionally to the target 
amount t.
*/
function minimumCoinsForChangeHelper(coins, target) {
    // Base case: If the amount is 0, no coins are needed.
    if (target === 0) {
        return 0;
    }

    let minCoins = Infinity;

    // Try each coin denomination.
    for (const coin of coins) {
        // Check if the coin denomination is not greater than the amount.
        if (coin <= target) {
            // Recursively calculate the minimum coins needed for the remaining amount.
            const remainingCoins = minimumCoinsForChangeHelper(coins, target - coin);

            // If a valid solution is found and it requires fewer coins, update minCoins.
            if (remainingCoins !== -1 && remainingCoins + 1 < minCoins) {
                minCoins = remainingCoins + 1;
            }
        }
    }

    // If no valid solution was found, return -1. Otherwise, return the minimum coins.
    return minCoins === Infinity ? -1 : minCoins;
}

export default function minimumCoinsForChange(
    coins,
    target,
) {
    return minimumCoinsForChangeHelper(coins, target);
}