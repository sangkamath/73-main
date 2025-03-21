/**
 * @param {string[][]} grid
 * @param {string} target
 * @return {boolean}
 * Time complexity: O(m.n.3^l). Each cell in the grid (m.n) can initiate a 
 * search, and for each character in the word (l), up to 3 directions are 
 * explored (since we won't go back to where we come from).
Space complexity: O(l). The recursion stack depth is proportional to the 
length of the word (l).
 */
export default function findWordInGrid(grid, target) {
    var m = grid.length;
    var n = grid[0].length;
    var dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  
    function dfs(x, y, i) {
      if(x < 0 || x >= m || y < 0 || y >= n || grid[x][y] != target[i]) {
        return false;
      }
      if(i+1 === target.length) return true;
  
      var char = grid[x][y];
      grid[x][y] = '0'; 
  
      for (const [dx, dy] of dirs) {
          if (dfs(x + dx, y + dy, i + 1)) return true;
  }
  
     grid[x][y] = char;
      return false;
    }
  
    for(var i = 0; i < m; i++) {
      for(var j = 0; j < n; j++) {
        if(dfs(i,j,0)) return true;
      }
    }
  
    return false;
  }