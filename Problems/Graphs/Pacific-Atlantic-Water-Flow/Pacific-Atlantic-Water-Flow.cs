using System;
using System.Collections.Generic;

// Using depth-first search - Time: O(mn)

/*
var pacificAtlantic = function(heights) {
    if (!heights || heights.length === 0 || heights[0].length === 0) return [];

    const M = heights.length, N = heights[0].length;
    const pacific = Array.from({ length: M }, () => Array(N).fill(false));
    const atlantic = Array.from({ length: M }, () => Array(N).fill(false));
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const result = [];

    function dfs(x, y, ocean) {
        if (ocean[x][y]) return;
        ocean[x][y] = true;

        for (const [dx, dy] of directions) {
            const a = x + dx, b = y + dy;
            if (a >= 0 && a < M && b >= 0 && b < N && heights[a][b] >= heights[x][y]) {
                dfs(a, b, ocean);
            }
        }
    }

    // Start DFS from Pacific and Atlantic edges
    for (let i = 0; i < M; i++) {
        dfs(i, 0, pacific);  // Left column (Pacific)
        dfs(i, N - 1, atlantic); // Right column (Atlantic)
    }
    for (let j = 0; j < N; j++) {
        dfs(0, j, pacific);  // Top row (Pacific)
        dfs(M - 1, j, atlantic); // Bottom row (Atlantic)
    }

    // Find common cells
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (pacific[i][j] && atlantic[i][j]) {
                result.push([i, j]);
            }
        }
    }

    return result;
};

🔹 Explanation
1️⃣ Initialize Structures
pacific and atlantic: Track cells that can flow into each ocean.
directions: The four possible movement directions.
dfs(x, y, ocean): A function to mark reachable cells using DFS.
2️⃣ DFS Traversal
Start DFS from the Pacific boundary (left & top) → Mark reachable cells.
Start DFS from the Atlantic boundary (right & bottom) → Mark reachable cells.
During DFS, we only move to higher or equal elevation cells.
3️⃣ Find Overlapping Cells
Any cell that is marked true in both pacific and atlantic can flow into both oceans.
🔹 Example Walkthrough
Input:
plaintext
Copy
Edit
heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4]
]
Visualization
nginx
Copy
Edit
Pacific ~   ~   ~   ~   ~ 
         1   2   2   3   5
         3   2   3   4   4
         2   4   5   3   1
         6   7   1   4   5
         5   1   1   2   4
                         ~   ~   ~   ~   ~ Atlantic
Output:
javascript
Copy
Edit
[[0,4], [1,3], [1,4], [2,2], [3,0], [3,1], [4,0]]
These positions can reach both oceans.

🔹 Time & Space Complexity
Complexity	Explanation
Time:	O(M * N) → We visit each cell at most twice (once for each ocean).
Space:	O(M * N) → We use two matrices (pacific and atlantic) to track visited cells.
🚀 Key Takeaways
✅ DFS is used to simulate water flow.
✅ Each cell is visited at most twice (once per ocean), ensuring efficiency.
✅ We mark reachable cells separately for the Pacific and Atlantic before 
finding their intersection.

var pacificAtlantic = function(heights) {
    if (!heights || heights.length === 0 || heights[0].length === 0) return [];

    const M = heights.length, N = heights[0].length;
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
                    heights[newRow][newCol] >= heights[row][col] // Water flows only uphill or same level
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
};

🚀 Why BFS Over DFS?
Avoids deep recursion (DFS can hit stack overflow for large grids).
Processes in layers, making it memory-efficient for large inputs.
💡 Alternative?
DFS (recursive) → Works but less efficient for large grids.
Priority Queue (Dijkstra’s-like approach) → Works but adds complexity.
*/

public class Solution
{
    private int[][] dirs = { new int[] { 0, 1 }, new int[] { 0, -1 }, new int[] { 1, 0 }, new int[] { -1, 0 } };
    private int M, N;

    private void dfs(int[][] heights, int x, int y, int[][] m)
    {
        if (m[x][y] == 1) 
            return;
        
        m[x][y] = 1;
        
        foreach (var dir in dirs)
        {
            int a = x + dir[0], b = y + dir[1];

            if (a < 0 || a >= M || b < 0 || b >= N || heights[a][b] < heights[x][y]) 
                continue;
            
            dfs(heights, a, b, m);
        }
    }

    public IList<IList<int>> PacificAtlantic(int[][] heights)
    {
        IList<IList<int>> ans = new List<IList<int>>();
        if (heights == null || heights.Length == 0 || heights[0].Length == 0) return ans;
        M = heights.Length;
        N = heights[0].Length;

        int[][] pacific = new int[M][];
        int[][] atlantic = new int[M][];

        for (int i = 0; i < M; i++)
        {
            pacific[i] = new int[N];
            atlantic[i] = new int[N];
        }

        for (int i = 0; i < M; i++)
        {
            dfs(heights, i, 0, pacific);
            dfs(heights, i, N - 1, atlantic);
        }
        for (int j = 0; j < N; j++)
        {
            dfs(heights, 0, j, pacific);
            dfs(heights, M - 1, j, atlantic);
        }

        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                if (pacific[i][j] == 1 && atlantic[i][j] == 1)
                {
                    ans.Add(new List<int> { i, j });
                }
            }
        }

        return ans;
    }
}

class Program
{
    static void Main()
    {
        int[][] heights = {
            new int[] {1,2,2,3,5},
            new int[] {3,2,3,4,4},
            new int[] {2,4,5,3,1},
            new int[] {6,7,1,4,5},
            new int[] {5,1,1,2,4}
        };

        Console.Write("Input: [");
        foreach (var row in heights)
        {
            Console.Write("[");
            foreach (var point in row)
            {
                Console.Write($"{point}");
                if (point != row[row.Length - 1])
                {
                    Console.Write(", ");
                }
            }
            Console.Write("]");
            if (row != heights[heights.Length - 1])
            {
                Console.Write(", ");
            }
        }
        Console.WriteLine("]");

        Solution sol = new Solution();
        IList<IList<int>> result = sol.PacificAtlantic(heights);

        Console.Write("Output: [");
        foreach (var point in result)
        {
            Console.Write($"[{point[0]}, {point[1]}]");
            if (point != result[result.Count - 1])
            {
                Console.Write(", ");
            }
        }
        Console.WriteLine("]");
    }
}
