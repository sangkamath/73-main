class UnionFind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(1);
    }

    find(node) {
        if (this.parent[node] !== node) {
            this.parent[node] = this.find(this.parent[node]); // Path compression
        }
        return this.parent[node];
    }

    union(node1, node2) {
        let root1 = this.find(node1);
        let root2 = this.find(node2);

        if (root1 === root2) return false; // Cycle detected

        // Union by rank
        if (this.rank[root1] > this.rank[root2]) {
            this.parent[root2] = root1;
        } else if (this.rank[root1] < this.rank[root2]) {
            this.parent[root1] = root2;
        } else {
            this.parent[root2] = root1;
            this.rank[root1] += 1;
        }
        return true;
    }
}/**
   * @param {number} num
   * @param {Array<[number, number]>} edges
   * @return {boolean}
   * Time complexity: O(e.α(v)). The union and find operations are nearly constant 
   * time due to path compression and union by size, where α(v) is the inverse Ackermann function.
Space complexity: O(v). The parent and size arrays require space proportional 
to the number of nodes (v).
   */
export default function graphIsTree(num, edges) {
    if (edges.length !== num - 1) return false; // Must have exactly num - 1 edges

    const uf = new UnionFind(num);

    for (let [a, b] of edges) {
        if (!uf.union(a, b)) {
            return false; // Cycle detected
        }
    }

    return true; // If no cycles and exactly num - 1 edges, it's a valid tree
}


// Create an adjacency list to represent the graph
function createAdjacencyList(
    num,
    edges,
  ){
    const adjacencyList = new Map();
    for (let i = 0; i < num; i++) {
      adjacencyList.set(i, []);
    }
    for (const edge of edges) {
      adjacencyList.get(edge[0]).push(edge[1]);
      adjacencyList.get(edge[1]).push(edge[0]);
    }
    return adjacencyList;
  }
  
  // Depth First Search (DFS) function
  function dfs(
    node,
    parent,
    adjacencyList,
    seen,
  ) {
    if (seen.has(node)) return false;
    seen.add(node);
    for (const neighbor of adjacencyList.get(node)) {
      if (parent !== neighbor) {
        const result = dfs(neighbor, node, adjacencyList, seen);
        if (!result) return false;
      }
    }
    return true;
  }
  
  // Main function to check if a given graph is a valid tree
  /*
Time complexity: O(v + e). Each node (v) and edge (e) is 
visited once during the DFS traversal.
Space complexity: O(v). The seen set and adjacency list 
require space proportional to the number of nodes.
  */
  export default function graphIsTree(
    num,
    edges,
  ){
    if (edges.length !== num - 1) {
      return false;
    }
  
    const adjacencyList = createAdjacencyList(num, edges);
    const seen = new Set();
  
    // We return true if no cycles were detected,
    // AND the entire graph has been reached.
    return dfs(0, -1, adjacencyList, seen) && seen.size === num;
  }