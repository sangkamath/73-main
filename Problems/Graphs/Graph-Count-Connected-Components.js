// Depth-First Search (DFS) to explore all nodes in a component
/*
Time complexity: O(v + e). Each node (v) and edge (e) is processed
 exactly once during the DFS traversal.
Space complexity: O(v + e). The adjacency list requires O(v + e)
 space to store the graph, and the visited array requires O(v) space.
*/
function countConnectedComponents(num, edges) {
    const adjList = Array.from({ length: num }, () => []);
    for (const [a, b] of edges) {
        adjList[a].push(b);
        adjList[b].push(a);
    }

    const visited = new Set();
    let count = 0;

    function dfs(node) {
        if (visited.has(node)) return;
        visited.add(node);
        for (const neighbor of adjList[node]) {
            dfs(neighbor);
        }
    }

    for (let i = 0; i < num; i++) {
        if (!visited.has(i)) {
            count++;
            dfs(i);
        }
    }

    return count;
}

function dfs(adjList, visited, src) {
    // Mark the current node as visited
    visited[src] = 1;

    // Traverse all adjacent nodes
    for (const neighbor of adjList[src]) {
        if (visited[neighbor] === 0) {
            dfs(adjList, visited, neighbor);
        }
    }
}

function countConnectedComponents(num, edges) {
    const parent = Array.from({ length: num }, (_, i) => i);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        if (rootX !== rootY) {
            parent[rootX] = rootY; // Union operation
        }
    }

    for (const [a, b] of edges) {
        union(a, b);
    }

    const uniqueParents = new Set();
    for (let i = 0; i < num; i++) {
        uniqueParents.add(find(i));
    }

    return uniqueParents.size;
}

export default function graphCountConnectedComponents(
    num,
    edges,
) {
    // Edge case: if there are no nodes, return 0
    if (num === 0) return 0;

    // Initialize the count of connected components
    let components = 0;
    // Create an array to track visited nodes
    const visited = new Array(num).fill(0);
    // Create an adjacency list to represent the graph
    const adjList = Array.from({ length: num }, () => []);

    // Build the adjacency list from edges
    for (const [u, v] of edges) {
        adjList[u].push(v);
        adjList[v].push(u);
    }

    // Perform DFS for each unvisited node to count components
    for (let i = 0; i < num; i++) {
        if (visited[i] === 0) {
            components++;
            dfs(adjList, visited, i);
        }
    }

    return components;
}


/*
Time complexity: O(e.α(v)). The union-find operations find and union 
are nearly constant time due to path compression and union by size, 
where α(v) is the inverse Ackermann function.
Space complexity: O(v). The representative and size arrays require
 space proportional to the number of nodes (v).
*/
function find(representative, vertex) {
    if (vertex === representative[vertex]) {
        return vertex;
    }
    // Path compression
    representative[vertex] = find(representative, representative[vertex]);
    return representative[vertex];
}

function combine(
    representative,
    size,
    vertex1,
    vertex2,
) {
    // Find the root representatives of both vertices
    vertex1 = find(representative, vertex1);
    vertex2 = find(representative, vertex2);

    // If both vertices are already in the same set
    if (vertex1 === vertex2) {
        return 0; // No union occurred
    } else {
        // Union by size
        if (size[vertex1] > size[vertex2]) {
            size[vertex1] += size[vertex2];
            representative[vertex2] = vertex1;
        } else {
            size[vertex2] += size[vertex1];
            representative[vertex1] = vertex2;
        }
        return 1; // Union occurred
    }
}

export default function graphCountConnectedComponents(
    num,
    edges,
) {
    // Initialize representative and size arrays
    const representative = new Array(num).fill(0).map((_, index) => index);
    const size = new Array(num).fill(1);

    // Initialize the number of components
    let components = num;

    // Process each edge and union the components
    for (const [u, v] of edges) {
        components -= combine(representative, size, u, v);
    }

    return components;
}