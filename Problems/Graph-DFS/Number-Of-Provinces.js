/*
The time complexity of the `findCircleNum` function is O(n^2), where 
n is the number of cities (or the length of the `isConnected`
 matrix). This is because we potentially check every entry
  in the adjacency matrix for each city during the DFS 
  traversal. In the worst case, if the graph is fully 
  connected, we will visit every city and check all 
  connections, leading to a quadratic time complexity.

The space complexity is O(n), which is primarily due to 
the `visited` array that keeps track of whether each city
 has been visited during the DFS. Additionally, the recursion 
 stack used by the DFS can also take up to O(n) space in the 
 worst case, where all cities are connected in a single line. 
 Thus, the overall space complexity remains O(n).
*/

var findCircleNum = function(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);
    let provinces = 0;

    // Helper function to perform DFS
    function dfs(city) {
        visited[city] = true;
        for (let i = 0; i < n; i++) {
            if (isConnected[city][i] === 1 && !visited[i]) {
                dfs(i); // Visit all directly or indirectly connected cities
            }
        }
    }

    // Iterate over all cities
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            // If a city is not visited, it means it starts a new province
            provinces++;
            dfs(i); // Perform DFS to visit all cities in this province
        }
    }

    return provinces;
};