// Function to compute the maximum sum of non-adjacent houses in a linear array
function rob(nums, start, end) {
    // Base cases
    if (start == end) return 0; // No houses to rob
    if (start + 1 === end) return nums[start]; // Only one house, so take it

    // prev2 keeps track of the max amount robbed from two houses before
    // prev keeps track of the max amount robbed from the previous house
    var prev2 = 0, prev = 0;

    // Iterate through the houses in the given range [start, end)
    for (var i = start; i < end; i++) {
        // Choose the maximum of:
        // 1. Not robbing the current house -> keep previous max (`prev`)
        // 2. Robbing the current house -> add `nums[i]` to `prev2`
        var cur = Math.max(prev, nums[i] + prev2);

        // Update prev2 to be the previous max (prev)
        prev2 = prev;
        // Update prev to be the new max (cur)
        prev = cur;
    }

    return prev; // Maximum amount that can be robbed from the range
}

/**
 * Solves the circular neighborhood theft problem
 * @param {number[]} numbers - Array of house values in a circular neighborhood
 * @return {number} - Maximum amount that can be robbed
 * Time Complexity:
rob runs in O(N).
We call rob twice, so overall O(N).
Space Complexity:
Only a few variables are used, so O(1).
 */
export default function neighborhoodTheftCircular(numbers) {
    if (numbers.length == 1) return numbers[0]; // If there's only one house, rob it

    // Since houses are in a circle, we must consider two cases:
    // 1. Rob from index 1 to the last house (excluding first house)
    // 2. Rob from index 0 to the second last house (excluding last house)
    return Math.max(
        rob(numbers, 1, numbers.length),      // Exclude the first house
        rob(numbers, 0, numbers.length - 1)   // Exclude the last house
    );
}