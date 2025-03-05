/*
'#' → 'O' (restore border-connected regions)
'O' → 'X' (flip surrounded regions)
Code Implementation (In-Place Modification)
javascript
Copy
Edit
*/
var solve = function(board) {
    const n = board.length;
    const m = board[0].length;

    const dfs = (row, col) => {
        // Out of bounds or not 'O', return
        if (row < 0 || row >= n || col < 0 || col >= m || board[row][col] !== 'O') return;

        // Temporarily mark the cell
        board[row][col] = '#';

        // Move in four directions
        dfs(row + 1, col); // Down
        dfs(row - 1, col); // Up
        dfs(row, col + 1); // Right
        dfs(row, col - 1); // Left
    };

    // Step 1: Mark border-connected 'O' with '#'
    for (let i = 0; i < n; i++) {
        if (board[i][0] === 'O') dfs(i, 0);       // First column
        if (board[i][m - 1] === 'O') dfs(i, m - 1); // Last column
    }
    for (let j = 0; j < m; j++) {
        if (board[0][j] === 'O') dfs(0, j);       // First row
        if (board[n - 1][j] === 'O') dfs(n - 1, j); // Last row
    }

    // Step 2: Flip remaining 'O' to 'X' and restore '#' to 'O'
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X'; // Flip enclosed 'O'
            } else if (board[i][j] === '#') {
                board[i][j] = 'O'; // Restore border-connected 'O'
            }
        }
    }
};
/*
How This Works
DFS on Border 'O'
Start DFS from all 'O' cells on the border.
Temporarily mark them with '#' to indicate they should not be flipped.
Flip or Restore
Remaining 'O' (not connected to the border) is flipped to 'X'.
'#' cells are restored back to 'O'.
Example Walkthrough
Input Board
mathematica
Copy
Edit
X X X X
X O O X
X X O X
X O X X
Step 1: Mark Border-Connected 'O'
mathematica
Copy
Edit
X X X X
X O O X
X X O X
# O X X  <-- (3,1) is marked as '#'
Step 2: Flip Enclosed 'O' to 'X'
scss
Copy
Edit
X X X X
X X X X  <-- (1,1) and (1,2) flipped
X X X X  <-- (2,2) flipped
# O X X
Step 3: Restore '#' to 'O'
lua
Copy
Edit
X X X X
X X X X
X X X X
X O X X  <-- Restored (3,1)
Time and Space Complexity
Time Complexity: 
𝑂
(
𝑛
×
𝑚
)
O(n×m)
Each cell is visited at most once.
DFS runs on border-connected 'O' and propagates.
Space Complexity:
O(1) extra space (in-place modification).
DFS recursion stack takes up to 
𝑂
(
𝑛
×
𝑚
)
O(n×m) in worst case (deep recursion).
Comparison With Original Approach
Approach	Space Complexity	Changes Board Directly?	Performance
Using vis matrix	
𝑂
(
𝑛
×
𝑚
)
O(n×m)	No (uses extra vis array)	Good
In-Place DFS (this approach)	
𝑂
(
1
)
O(1) (excluding recursion stack)	Yes (modifies board)	Better
If iterative BFS (queue) is used instead of recursive DFS, we avoid deep recursion issues and keep space complexity at 
𝑂
(
𝑛
×
𝑚
)
O(n×m).

*/

/*
Iterative BFS Approach
Instead of using recursion (which can cause stack overflow for large boards), we use a queue (BFS) to traverse border-connected 'O' cells.

Code Implementation
javascript
Copy
Edit
*/
var solve = function(board) {
    const n = board.length;
    const m = board[0].length;
    const queue = [];

    // Step 1: Add all border 'O' cells to the queue and mark them as '#'
    for (let i = 0; i < n; i++) {
        if (board[i][0] === 'O') {
            queue.push([i, 0]);
            board[i][0] = '#';
        }
        if (board[i][m - 1] === 'O') {
            queue.push([i, m - 1]);
            board[i][m - 1] = '#';
        }
    }
    for (let j = 0; j < m; j++) {
        if (board[0][j] === 'O') {
            queue.push([0, j]);
            board[0][j] = '#';
        }
        if (board[n - 1][j] === 'O') {
            queue.push([n - 1, j]);
            board[n - 1][j] = '#';
        }
    }

    // Step 2: BFS from all border 'O' cells
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // Down, Up, Right, Left
    while (queue.length > 0) {
        const [row, col] = queue.shift(); // Dequeue a cell

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m && board[newRow][newCol] === 'O') {
                board[newRow][newCol] = '#'; // Mark as visited
                queue.push([newRow, newCol]); // Enqueue the next cell
            }
        }
    }

    // Step 3: Flip remaining 'O' to 'X' and restore '#' to 'O'
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X'; // Flip surrounded 'O'
            } else if (board[i][j] === '#') {
                board[i][j] = 'O'; // Restore border-connected 'O'
            }
        }
    }
};
/*
How This Works
Mark border 'O' cells as '#' and enqueue them.
Perform BFS to mark all connected 'O' cells.
Flip all remaining 'O' to 'X' and restore '#' back to 'O'.
Example Walkthrough
Input Board
mathematica
Copy
Edit
X X X X
X O O X
X X O X
X O X X
Step 1: Mark Border 'O' with '#'
mathematica
Copy
Edit
X X X X
X O O X
X X O X
# O X X
Enqueue (3,0).

Step 2: BFS Expands to Connected 'O'
nginx
Copy
Edit
X X X X
X X X X
X X X X
# O X X
BFS does not change (3,1), since it is not connected to the border.

Step 3: Flip 'O' to 'X', Restore '#'
mathematica
Copy
Edit
X X X X
X X X X
X X X X
X O X X
Time and Space Complexity
Time Complexity: 
𝑂
(
𝑛
×
𝑚
)
O(n×m)
Every cell is processed at most once.
Space Complexity:
𝑂
(
𝑛
×
𝑚
)
O(n×m) worst case (if all cells are in the queue).
No recursion stack (avoids deep recursion issues of DFS).
Comparison of All Approaches
Approach	Space Complexity	Stack/Queue Usage	Suitable for Large Inputs?
DFS (Recursion)	
𝑂
(
𝑛
×
𝑚
)
O(n×m) (recursion stack)	Uses function call stack	❌ No (risk of stack overflow)
DFS (In-Place)	
𝑂
(
1
)
O(1) extra (excluding stack)	Uses recursion	❌ No (stack depth issues)
BFS (Queue)	
𝑂
(
𝑛
×
𝑚
)
O(n×m) (queue size)	Uses explicit queue	✅ Yes (better for large inputs)
When to Use BFS vs. DFS
DFS (Recursive)

Simple to implement.
Can cause stack overflow on large boards.
DFS (In-Place)

Reduces memory by modifying the board directly.
Still suffers from deep recursion on large boards.
BFS (Queue, Iterative) ✅

Best for large inputs since it avoids recursion stack overflow.
Uses a queue instead of recursion.
*/
