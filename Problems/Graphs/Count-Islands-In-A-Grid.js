/**
 * @param {number[][]} grid
 * @return {number}
 * Time complexity: O(m.n). Every cell in the grid is visited once, either during the main 
 * iteration or during the DFS traversal.
Space complexity: O(m.n). The recursion stack may grow up to the size of the grid in the 
worst case when the grid contains one large connected island.
 */
export default function countGridIslands(grid) {
    var m, n;
 
    var dirs = [[0,1], [1,0],[-1,0], [0,-1]];
 
    function dfs(grid, x, y) {
     if(x < 0 || y < 0 || x >= m || y >= n || grid[x][y] != 1) {
       return;
     }
 
     grid[x][y] = 'x';
     dirs.forEach((dir) => {
       dfs(grid, x + dir[0], y + dir[1]);
     })
    }
 
    if(grid === null || grid.length === 0 || grid[0].length === 0) {
     return 0;
    }
 
    let ans = 0;
    m = grid.length;
    n = grid[0].length;
 
    for(var i = 0; i< m; i++) {
     for(var j = 0; j < n; j++) {
       if(grid[i][j] != 1) {
         continue;
       }
 
       ans++;
       dfs(grid, i, j);
     }
    }
 
    return ans;
 }

/*
Time complexity: O(m.n). Each cell in the grid is visited exactly once, either during the
 BFS traversal or during the main loop.
Space complexity: O(min(m, n)). The BFS queue can grow up to the size of the smaller dimension 
in the worst case, such as when the grid has a single row or column of land.
*/
 export default function countGridIslands(grid){
    const rows = grid.length; // Get the number of rows
    if (rows === 0) return 0; // If grid is empty, return 0
    const cols = grid[0].length; // Get the number of columns
  
    let numIslands = 0; // Initialize island count
  
    // Iterate through each cell in the grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // If the cell is land ('1'), it's part of an island
        if (grid[row][col] === 1) {
          ++numIslands; // Increment island count
          grid[row][col] = 0; // Mark the current cell as visited by setting it to '0'
          const neighbors = [[row, col]]; // Initialize a queue for BFS
  
          // Perform Breadth-First Search (BFS)
          while (neighbors.length > 0) {
            const [row, col] = neighbors.shift(); // Dequeue a cell
  
            // Check and visit the cell above the current cell
            if (row - 1 >= 0 && grid[row - 1][col] === 1) {
              neighbors.push([row - 1, col]);
              grid[row - 1][col] = 0;
            }
  
            // Check and visit the cell below the current cell
            if (row + 1 < rows && grid[row + 1][col] === 1) {
              neighbors.push([row + 1, col]);
              grid[row + 1][col] = 0;
            }
  
            // Check and visit the cell to the left of the current cell
            if (col - 1 >= 0 && grid[row][col - 1] === 1) {
              neighbors.push([row, col - 1]);
              grid[row][col - 1] = 0;
            }
  
            // Check and visit the cell to the right of the current cell
            if (col + 1 < cols && grid[row][col + 1] === 1) {
              neighbors.push([row, col + 1]);
              grid[row][col + 1] = 0;
            }
          }
        }
      }
    }
  
    return numIslands; // Return the total number of islands
  }