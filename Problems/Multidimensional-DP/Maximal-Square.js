/**
 * @param {character[][]} matrix
 * @return {number}
 * The time complexity of the `maximalSquare` function is O(m * n), where m is the number of 
 * rows and n is the number of columns in the input matrix. This is because the function
 *  iterates through each cell in the matrix exactly once, performing constant-time operations 
 * for each cell.

The space complexity is also O(m * n) due to the use of a 2D array `dp` of the same dimensions 
as the input matrix to store the side lengths of the largest squares ending at each cell. If
 we wanted to optimize the space complexity, we could use a single array of size n and update 
 it in place, reducing the space complexity to O(n). However, as it stands, the current
 implementation uses O(m * n) space.
 */
var maximalSquare = function(matrix) {
    if (!matrix || matrix.length === 0) return 0;

    let m = matrix.length, n = matrix[0].length;
    let dp = Array(m).fill(0).map(() => Array(n).fill(0));
    let maxSide = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == '1') { // Convert string to number if necessary
                if (i == 0 || j == 0) {
                    dp[i][j] = 1; // First row or first column can only have 1s
                } else {
                    dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
                }
                maxSide = Math.max(maxSide, dp[i][j]); // Update max side length
            }
        }
    }

    return maxSide * maxSide; // Return the area of the largest square
};


/**
 * @param {character[][]} matrix
 * @return {number}
 * The time complexity of the `maximalSquare` function is O(m * n), where m is the number of 
 * rows and n is the number of columns in the input matrix. This is because the function 
 * iterates through each cell of the matrix exactly once, performing constant-time operations 
 * for each cell.

The space complexity is O(n), as the function uses a single-dimensional array `dp` of 
size n + 1 to store the current state of the dynamic programming solution. Additionally, a 
few variables are used for tracking the maximum side length and previous values, which do 
not depend on the size of the input. Thus, the overall space used is linear with respect
 to the number of columns in the matrix.
 */
var maximalSquare = function(matrix) {
    if (!matrix || matrix.length === 0) return 0;

    let m = matrix.length, n = matrix[0].length;
    let dp = Array(n + 1).fill(0); // Only one row of DP
    let maxSide = 0, prev = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 1; j <= n; j++) {
            let temp = dp[j]; // Store the old dp[j] before modifying it

            if (matrix[i][j - 1] == '1') {
                dp[j] = Math.min(dp[j], dp[j - 1], prev) + 1;
                maxSide = Math.max(maxSide, dp[j]);
            } else {
                dp[j] = 0;
            }

            prev = temp; // Update prev to be the old dp[j] (top-left diagonal)
        }
    }

    return maxSide * maxSide;
};