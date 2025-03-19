/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number}
 * Time complexity: O(n.t). The algorithm iterates over all sums from 1 to 
 * target (outer loop) and processes each element in the numbers array (inner loop).
Space complexity: O(t). The dp array requires space proportional to the target value.
 */
export default function combinationTargetSum(numbers, target) {
    // Initialize a dynamic programming (DP) array to store the number of
    // combinations for each sum up to the target
    const dp = Array(target + 1).fill(0);
    // Base case: There's one way to reach a sum of 0 (using no elements)
    dp[0] = 1;

    // Iterate through all possible target sums from 1 to the actual target
    for (let i = 1; i <= target; i++) {
        // Iterate through each number in the 'nums' array
        for (const num of numbers) {
            // Check if the current number can be subtracted from the current target sum
            // without going below zero. This ensures we only consider valid combinations
            if (i - num >= 0) {
                // If valid, add the number of combinations for the remaining sum
                // (combSum - num) to the current sum's combination count. This leverages
                // previously calculated subproblems
                dp[i] += dp[i - num];
            }
        }
    }

    // The final element in the DP array (dp[target]) holds the number of
    // combinations that add up to the target sum
    return dp[target];
}

/*
Time complexity: O(n.t). Each subproblem for a target value is solved once, 
and solving each involves iterating through numbers..
Space complexity: O(t). The memo map stores results for up to target different values, 
and the recursion stack can go as deep as target in the worst case.
*/
export default function combinationTargetSum(
    numbers,
    target
) {
    // Initialize the memoization map
    const memo = new Map();

    // Helper function for recursion with memoization
    function combs(remain) {
        // Base case: if remaining target is 0, there is one valid combination
        if (remain === 0) return 1;
        // If the result for the current remaining target is already computed, return it
        if (memo.has(remain)) return memo.get(remain);

        let result = 0;
        // Iterate through the numbers to calculate combinations
        for (const num of numbers) {
            // Only proceed if the remaining target after subtracting the current number is non-negative
            if (remain - num >= 0) {
                result += combs(remain - num);
            }
        }
        // Store the computed result in the memoization map
        memo.set(remain, result);
        return result;
    }

    // Start the recursive function
    return combs(target);
}