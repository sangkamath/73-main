/**
 * @param {str} str
 * @return {number}
 * Time complexity: O(n). The algorithm iterates
 *  through the string once.
Space complexity: O(n). The dp array stores intermediate
 results for each index of the string.
 */
export default function decodeMessage(str) {
    if (!str || str[0] === '0') { return 0; }

    const n = str.length;
    const dp = new Array(n + 1).fill(0);
    // Base case: There's one way to decode an empty string
    dp[0] = 1;
    // Ways to decode a string of size 1 is 1,
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        const oneDigit = parseInt(str[i - 1]);
        const twoDigits = parseInt(str.substring(i - 2, i));
        // Check if successful single digit decode is possible
        if (oneDigit !== 0) {
            dp[i] += dp[i - 1];
        }

        // Check if successful two-digit decode is possible
        if (10 <= twoDigits && twoDigits <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    // The last element in the DP array contains the number
    //  of ways to decode the entire string
    return dp[n];
}

/*

*/
export default function decodeMessage(str){
    // Handle edge case: empty string
    if (str.length === 0) return 0;

    // Variables to store the last two results
    let prev = 1; // Represents dp[i-2], initialized for empty string
    let curr = str[0] === '0' ? 0 : 1; // Represents dp[i-1]

    // Iterate through the string
    for (let i = 2; i <= str.length; i++) {
        let temp = 0; // Temporarily store the current dp[i]

        // Check if successful single-digit decode is possible
        if (str[i - 1] !== '0') {
            temp += curr;
        }

        // Check if successful two-digit decode is possible
        const twoDigit = parseInt(str.substring(i - 2, i), 10);
        if (twoDigit >= 10 && twoDigit <= 26) {
            temp += prev;
        }

        // Update prev and curr for the next iteration
        prev = curr;
        curr = temp;
    }

    // The last value of curr contains the result
    return curr;
}