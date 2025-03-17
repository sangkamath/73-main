/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 * The time and space complexity of the provided function can be analyzed as follows:

Time Complexity:
1. Building the graph: The graph is constructed by iterating through the `equations` 
array, which has a length of `n`. For each equation, we perform constant time 
operations to add entries to the graph. Therefore, the time complexity for building 
the graph is O(n).
2. Processing queries: For each query, we perform a depth-first search (DFS) to 
find the result. In the worst case, the DFS may visit all nodes in the graph. If 
there are `m` unique variables in the graph, the time complexity for a single DFS 
is O(m). Since we process `q` queries, the overall time complexity for processing 
all queries is O(q * m).

Combining these, the total time complexity is O(n + q * m).

Space Complexity:
1. Graph storage: The graph is represented as a map of maps, which requires space 
proportional to the number of unique variables and the edges between them. In 
the worst case, if all variables are connected, the space complexity for the 
graph is O(m^2) due to the adjacency representation.
2. Visited set: The visited set used in the DFS can grow to the size of the 
number of unique variables, which is O(m).

Thus, the overall space complexity is O(m^2) for the graph plus O(m) for the visited set, leading to a total space complexity of O(m^2). 

In summary, the time complexity is O(n + q * m) and the space complexity is O(m^2).
 */
var calcEquation = function(equations, values, queries) {
    const graph = new Map();

    // Build the graph
    for (let i = 0; i < equations.length; i++) {
        const [A, B] = equations[i];
        const value = values[i];

        if (!graph.has(A)) graph.set(A, new Map());
        if (!graph.has(B)) graph.set(B, new Map());

        graph.get(A).set(B, value);
        graph.get(B).set(A, 1 / value);
    }

    // Function to evaluate a single query using DFS
    function dfs(start, end, visited) {
        if (!graph.has(start) || !graph.has(end)) return -1.0;  // If either variable is missing, return -1
        if (start === end) return 1.0;  // If both are the same, division result is 1

        visited.add(start); // Mark the current node as visited

        for (const [neighbor, value] of graph.get(start).entries()) {
            if (!visited.has(neighbor)) { // Avoid cycles
                const result = dfs(neighbor, end, visited);
                if (result !== -1.0) return result * value; // Multiply by edge weight
            }
        }
        return -1.0;  // No path found
    }

    // Process each query
    return queries.map(([C, D]) => dfs(C, D, new Set()));
};