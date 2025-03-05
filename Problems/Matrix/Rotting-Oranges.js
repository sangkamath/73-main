/**
 * @param {number[][]} grid
 * @return {number}
 * ⏱️ Time Complexity: O(n * m)

Traverse the grid once, process each cell at most once.
💾 Space Complexity: O(n * m)

Space for queue and visited matrix.
Why count++ is Outside the Inner Loop?
The while loop runs as long as there are rotten oranges in the queue.
Each iteration of the while loop represents one unit of time
 because all oranges at the same level rot simultaneously.
count increases once per level, ensuring each BFS step (minute) is 
counted correctly.
 */
var orangesRotting = function(grid) {
    const n = grid.length, m = grid[0].length;
        const queue = [];
        const visited = Array.from({ length: n }, () => Array(m).fill(false));

        // Step 1: Enqueue all rotten oranges
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (grid[i][j] === 2) {
                    queue.push([i, j]);
                    visited[i][j] = true;
                }
            }
        }

        let count = -1; // This tracks the time
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

        // Step 2: BFS to rot fresh oranges
        while (queue.length > 0) {
            const size = queue.length; // Get number of rotten oranges at this level
            count++; // Increase time (one level of BFS = one minute)
            for (let i = 0; i < size; i++) {
                const [row, col] = queue.shift();

                for (const [dx, dy] of directions) {
                    const nx = row + dx;
                    const ny = col + dy;
                    if (
                        nx >= 0 && nx < n && ny >= 0 && ny < m &&
                        !visited[nx][ny] && grid[nx][ny] === 1
                    ) {
                        visited[nx][ny] = true;
                        grid[nx][ny] = 2; // Rot the fresh orange
                        queue.push([nx, ny]);
                    }
                }
            }
        }

        // Step 3: Check for remaining fresh oranges
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (grid[i][j] === 1) {
                    return -1; // Fresh orange remains
                }
            }
        }

        return count === -1 ? 0 : count; // Return time or 0 if no fresh oranges
};