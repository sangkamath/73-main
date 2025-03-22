/**
 * @param {number[][]} matrix
 * @return {number[][]}
 * Time complexity: O(m.n). Each cell is visited at most once during DFS, 
 * and the matrix has m.n cells.
Space complexity: O(m.n). Two boolean matrices of size m.n are used to 
track reachability, and the call stack for DFS can reach m.n in the worst 
case.
 */
export default function oceanFlow(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0
    ) return [];

    const m = matrix.length;
    const n = matrix[0].length;
    const ocean1 = Array.from({ length: m }, () => Array(n).fill(false));
    const ocean2 = Array.from({ length: m }, () => Array(n).fill(false));
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const result = [];

    function dfs(x, y, ocean) {
        if (ocean[x][y]) return;
        ocean[x][y] = true;

        for (const [dx, dy] of directions) {
            const a = x + dx, b = y + dy;
            if (a >= 0 && a < m && b >= 0 && b < n && matrix[a][b] >= matrix[x][y]) {
                dfs(a, b, ocean);
            }
        }
    }

    for (let i = 0; i < m; i++) {
        dfs(i, 0, ocean1);
        dfs(i, n - 1, ocean2);
    }

    for (let j = 0; j < n; j++) {
        dfs(0, j, ocean1);
        dfs(m - 1, j, ocean2);
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (ocean1[i][j] && ocean2[i][j]) {
                result.push([i, j]);
            }
        }
    }

    return result;
}


/**
 * @param {number[][]} matrix
 * @return {number[][]}
 * Time complexity: O(m.n). Each cell is processed at most once during BFS.
Space complexity: O(m.n). Two boolean matrices are used for tracking reachability,
 and BFS uses a queue that may grow to the size of the matrix.
 */
export default function oceanFlow(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return [];
 
     const M = matrix.length, N = matrix[0].length;
     const pacific = Array.from({ length: M }, () => Array(N).fill(false));
     const atlantic = Array.from({ length: M }, () => Array(N).fill(false));
     const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
     const result = [];
     const pacificQueue = [];
     const atlanticQueue = [];
 
     // Step 1: Add ocean-bordering cells to the queues
     for (let i = 0; i < M; i++) {
         pacificQueue.push([i, 0]);       // Pacific: left column
         atlanticQueue.push([i, N - 1]);  // Atlantic: right column
         pacific[i][0] = true;
         atlantic[i][N - 1] = true;
     }
     for (let j = 0; j < N; j++) {
         pacificQueue.push([0, j]);       // Pacific: top row
         atlanticQueue.push([M - 1, j]);  // Atlantic: bottom row
         pacific[0][j] = true;
         atlantic[M - 1][j] = true;
     }
 
     // Step 2: BFS function to mark reachable cells
     function bfs(queue, visited) {
         while (queue.length > 0) {
             const [row, col] = queue.shift(); // Dequeue
 
             for (const [dx, dy] of directions) {
                 const newRow = row + dx;
                 const newCol = col + dy;
 
                 // Check boundaries & elevation condition
                 if (
                     newRow >= 0 && newRow < M &&
                     newCol >= 0 && newCol < N &&
                     !visited[newRow][newCol] &&
                     matrix[newRow][newCol] >= matrix[row][col] // Water flows only uphill or same level
                 ) {
                     visited[newRow][newCol] = true;
                     queue.push([newRow, newCol]); // Enqueue for BFS
                 }
             }
         }
     }
 
     // Step 3: Run BFS from both oceans
     bfs(pacificQueue, pacific);
     bfs(atlanticQueue, atlantic);
 
     // Step 4: Find common cells that can reach both oceans
     for (let i = 0; i < M; i++) {
         for (let j = 0; j < N; j++) {
             if (pacific[i][j] && atlantic[i][j]) {
                 result.push([i, j]);
             }
         }
     }
 
     return result;
 }