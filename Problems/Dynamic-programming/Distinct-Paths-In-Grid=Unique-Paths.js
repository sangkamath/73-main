/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 * Time complexity: O(m.n). Every cell in the grid is processed once.
Space complexity: O(m.n). A 2D array of size m x n is used to store 
the number of unique paths for each cell.
 */
export default function gridDistinctPaths(m, n) {
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
    // The number of unique paths reaching this cell (col, row) is the sum of:
    //   - Paths reaching the cell above (col-1, row) - only one possible
    //  move (down).
    //   - Paths reaching the cell to the left (col, row-1) - only one
    //  possible move (right).
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            paths[i][j] = paths[i - 1][j] + paths[i][j - 1];
        }
    }

    // The bottom-right cell contains the total unique paths
    return paths[m - 1][n - 1];
}

/*
This approach uses top-down dynamic programming with memoization to avoid redundant 
computations. The recursive function calculates the number of paths to the destination 
from a given cell by summing the paths from the cell directly below and the cell directly 
to the right. A memoization table stores the results of previously computed cells, 
ensuring that each subproblem is solved only once. This eliminates unnecessary 
duplicate work, optimizing the solution.

This method efficiently breaks the problem into overlapping subproblems while storing 
intermediate results to reduce overall computation time.
*/
export default function gridDistinctPaths(m, n) {
    // Create a memoization table to store previously calculated results (optional for top-down approach)
    const memo = new Array(m).fill(null).map(() => new Array(n).fill(null));
  
    // Recursive helper function to calculate the number of paths from a specific cell
    function helper(row, col) {
      // Base cases:
      if (row === m - 1 && col === n - 1) return 1; // Reached the destination (bottom-right) - 1 path
      if (row >= m || col >= n) return 0; // Outside the grid - no paths possible
  
      // Check if the value has already been calculated and stored in the memo table
      if (memo[row][col] !== null) {
        return memo[row][col];
      }
  
      // Calculate the number of paths by combining paths from below and to the right
      const pathsDown = helper(row + 1, col);
      const pathsRight = helper(row, col + 1);
  
      // Memoize the result for future use
      memo[row][col] = pathsDown + pathsRight;
  
      return memo[row][col];
    }
  
    // Call the helper function to start from the top-left corner
    return helper(0, 0);
  }