using System;

// Using tabulation - Time: O(m*n)
public class Solution
{

    /*

Complexity	Explanation
Time: O(m × n)	We fill an m × n table once.
Space: O(m × n)	We store the full m × n table.
    var uniquePaths = function(m, n) {
    // Create a 2D array initialized with 0
    let paths = Array.from({ length: m }, () => Array(n).fill(0));

    // Fill the first row with 1s (only one way to move right)
    for (let i = 0; i < m; i++) {
        paths[i][0] = 1;
    }

    // Fill the first column with 1s (only one way to move down)
    for (let j = 0; j < n; j++) {
        paths[0][j] = 1;
    }

    // Fill the rest of the DP table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            paths[i][j] = paths[i - 1][j] + paths[i][j - 1];
        }
    }

    // The bottom-right cell contains the total unique paths
    return paths[m - 1][n - 1];
};

    public int UniquePaths(int m, int n) {
        int [,] paths = new int[m,n];

        for(int i = 0; i < m; i++) {
            paths[i, 0] = 1;
        }

        for(int j = 0; j < n; j++) {
            paths[0,j] = 1;
        }

        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                paths[i, j] = paths[i-1, j] + paths[i, j-1];
            }
        }

        return paths[m-1,n-1];
    }

    ar uniquePathsOptimized = function(m, n) {
    let dp = Array(n).fill(1); // Create a 1D array of size 'n', initialized with 1

    for (let i = 1; i < m; i++) {  // Loop through rows (starting from row 1)
        for (let j = 1; j < n; j++) {  // Loop through columns (starting from column 1)
            dp[j] += dp[j - 1]; // Update current cell as dp[j] = dp[j] + dp[j - 1]
        }
    }

    return dp[n - 1]; // The last element of the array contains the final answer
};
Explanation:
Instead of using a 2D array, we use a 1D array (dp[]) to store the number of ways to reach each column in the current row.

Key Observation:
To reach any cell (i, j), we can only come from left (i, j-1) or above (i-1, j).
So the number of ways to reach (i, j) is:
𝑑
𝑝
[
𝑗
]
=
𝑑
𝑝
[
𝑗
]
+
𝑑
𝑝
[
𝑗
−
1
]
dp[j]=dp[j]+dp[j−1]
(previous value in the same column + value from the previous column)
Step-by-Step Example:
Let's calculate uniquePathsOptimized(3, 3).
For a 3 × 3 grid:

Initialization (dp[] for first row)
Since there's only one way to reach any cell in the first 
row (by moving right), we start with:
ini
Copy
Edit
dp = [1, 1, 1]
First Iteration (i = 1, computing second row)
Updating dp[j] = dp[j] + dp[j-1]:
Copy
Edit
dp[1] = 1 + 1 = 2
dp[2] = 2 + 1 = 3
Now, dp = [1, 2, 3]
Second Iteration (i = 2, computing third row)
Again, updating dp[j]:
Copy
Edit
dp[1] = 1 + 2 = 3
dp[2] = 3 + 3 = 6
Now, dp = [1, 3, 6]
Final Answer:
The last element dp[n - 1] (i.e., dp[2]) gives the result:
6 unique paths for a 3 × 3 grid.
Why is this Optimized?
Approach	Space Complexity	Time Complexity
2D DP Table	O(m × n)	O(m × n)
1D DP Array	O(n) (only 1 row stored)	O(m × n)
Instead of storing the entire m × n grid, we store only 
one row (n elements).
The logic still works because each row only depends on 
the previous row, allowing us to overwrite and reuse memory efficiently.
Example Runs
Input:
javascript
Copy
Edit
console.log(uniquePathsOptimized(3, 3));
console.log(uniquePathsOptimized(3, 7));
console.log(uniquePathsOptimized(2, 2));
Output:
javascript
Copy
Edit
6
28
2
Summary:
We reduce space complexity to O(n) by reusing the same row in memory.
Time complexity remains O(m × n), as we still iterate through all cells.
This is a great tradeoff between efficiency and memory use! 🚀
    */

    public int UniquePaths(int m, int n)
    {
        int[] dp = new int[n + 1];
        dp[n - 1] = 1;

        for (int i = m - 1; i >= 0; i--)
        {
            for (int j = n - 1; j >= 0; j--)
            {
                dp[j] += dp[j + 1];
            }
        }

        return dp[0];
    }
}

// Using math - Time: O(n)
//
// public class Solution 
// {
//     public int UniquePaths(int m, int n) 
//     {
//         long ans = 1;
//         for (int i = 1; i <= n - 1; i++) 
//         {
//             ans = ans * (m - 1 + i) / i;
//         }
//
//         return (int)ans; // Casting from long to int
//     }
// }

class Program
{
    static void Main(string[] args)
    {
        int m = 3, n = 7;
        Console.WriteLine("Input: m = " + m + ", n = " + n);

        Solution sol = new Solution();
        int result = sol.UniquePaths(m, n); 

        Console.WriteLine("Output: " + result);
    }
}