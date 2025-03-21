/**
 * Finds the length of the longest common subsequence (LCS) between two strings.
 * Uses dynamic programming to build a table of LCS lengths.
 *
 * @param {string} str1 - First input string.
 * @param {string} str2 - Second input string.
 * @return {number} - Length of the LCS.
 * Time complexity: O(m.n). The solution involves filling a grid of size m x n, where m
 *  is the length of str1 and n is the length of str2.
Space complexity: O(m.n). The dpGrid requires space proportional to the product of the
 lengths of the two strings.
 * 
 */
export default function longestCommonSubsequence(str1, str2) {
    // Create a 2D array (dp) with (str1.length + 1) rows and (str2.length + 1) columns
    // Initialize all values to 0
    var dp = Array.from({ length: str1.length + 1 }, () => new Array(str2.length + 1).fill(0));

    // Build the DP table
    for (var i = 1; i <= str1.length; i++) {
        for (var j = 1; j <= str2.length; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                // Characters match: extend LCS from previous state
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // No match: take the max LCS by excluding one character
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // The final answer is in the bottom-right corner of the table
    return dp[str1.length][str2.length];
}

/**
 * @param {string} str1
 * @param {string} str2
 * @return {number}
 * Time complexity: O(m.n). Two nested loops are used: one iterating over the 
 * length of str1 (m) and the other iterating over the length of str2 (n).
Space complexity: O(n). Only two rows, each of size n+1, are used for computation,
 reducing space usage from O(m.n) to O(n).
 */
export default function longestCommonSubsequence(str1, str2) {
    // Ensure str2 is the shorter string to minimize space usage
    // Ensure str2 is the shorter string to minimize space usage
    if (str1.length < str2.length) {
        [str1, str2] = [str2, str1];
    }

    const m = str1.length, n = str2.length;

    // Create two 1D arrays to store current and previous row results
    let prev = new Array(n + 1).fill(0);
    let curr = new Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                // Characters match: Extend LCS
                curr[j] = prev[j - 1] + 1;
            } else {
                // No match: Take the max from previous row or left cell
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        // Update previous row after processing the current row
        prev = [...curr]; // No need to swap, just copy the current row to previous row
    }

    // The LCS length is in the last cell of the current row (which is now the prev row)
    return curr[n];
}