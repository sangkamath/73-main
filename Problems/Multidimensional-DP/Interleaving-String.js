/*You can solve this problem using dynamic programming (DP) or recursion with memoization. Here’s a clear breakdown of the DP approach:

Approach: Dynamic Programming
We define a 2D DP table, where:

dp[i][j] represents whether s3[0..(i+j-1)] can be formed using s1[0..(i-1)] and s2[0..(j-1)].
Steps:
If s1.length + s2.length ≠ s3.length, return false (quick check).
Use a boolean DP table where:
dp[i][j] = true if s3[0...(i+j-1)] can be formed.
dp[i][j] is true if either:
dp[i-1][j] is true and s1[i-1] === s3[i+j-1] (taking from s1)
dp[i][j-1] is true and s2[j-1] === s3[i+j-1] (taking from s2)
Fill the DP table iteratively.
Return dp[s1.length][s2.length].
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) return false;

    let dp = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(false));

    for (let i = 0; i <= s1.length; i++) {
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0 && j === 0) {
                dp[i][j] = true;
            } else if (i === 0) {
                dp[i][j] = dp[i][j - 1] && (s2[j - 1] === s3[i + j - 1]);
            } else if (j === 0) {
                dp[i][j] = dp[i - 1][j] && (s1[i - 1] === s3[i + j - 1]);
            } else {
                dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
                           (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
            }
        }
    }

    return dp[s1.length][s2.length];
};

/*
Time & Space Complexity
Time Complexity: 
𝑂(𝑛×𝑚)
O(n×m), where 𝑛

n=s1.length and 

m=s2.length.
Space Complexity: 
𝑂
(
𝑛
×
𝑚
)
O(n×m) (DP table).
Optimized Approach (O(n) Space)
Since each row only depends on the previous one, we can reduce space to 
𝑂
(
𝑚
)
O(m) using a 1D DP array.

*/
var isInterleave = function(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) return false;
    
    let dp = Array(s2.length + 1).fill(false);
    
    for (let i = 0; i <= s1.length; i++) {
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0 && j === 0) {
                dp[j] = true;
            } else if (i === 0) {
                dp[j] = dp[j - 1] && s2[j - 1] === s3[i + j - 1];
            } else if (j === 0) {
                dp[j] = dp[j] && s1[i - 1] === s3[i + j - 1];
            } else {
                dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) || 
                        (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
            }
        }
    }
    
    return dp[s2.length];
};
/*
Time Complexity: 
𝑂
(
𝑛
×
𝑚
)
O(n×m)
Space Complexity: 
𝑂
(
𝑚
)
O(m)
*/