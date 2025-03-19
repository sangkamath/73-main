class GraphNode {
    constructor(val, neighbors) {
        this.val = val;
        this.neighbors = neighbors ?? [];
    }
}
/**
* @param {GraphNode | null} node
* @return {GraphNode | null}
Time complexity: O(v + e). Each node (v) and edge (e) in the graph is visited exactly 
once during the DFS traversal.
Space complexity: O(v). The Map stores a mapping for each node, and the recursion stack 
can grow up to the number of nodes in the graph.
*/
export default function graphClone(node) {
    if (!node) return null;

    const map = new Map(); // To store { originalNode -> clonedNode } mappings

    function dfs(currentNode) {
        // If the node was already visited before
        // Return the clone from the visited dictionary
        if (map.has(currentNode)) {
            return map.get(currentNode); // Return cloned node if already visited
        }

        // Clone current node
        // Note that we don't have cloned neighbors as of now, hence []
        const clone = new GraphNode(currentNode.val);
        // The key is original node and value being the clone node
        map.set(currentNode, clone);

        // Recursively clone neighbors
        // Iterate through each neighbor and push the clone of the neighbor
        // to the neighbors of the cloned node
        for (const neighbor of currentNode.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}

/*
Time complexity: O(v + e). Each node (v) and edge (e) in the graph is visited
 exactly once during the BFS traversal.
Space complexity: O(v). The Map stores a mapping for each node, and the queue 
holds up to v nodes in the worst case.
*/
export default function graphClone(node){
    if (!node) {
      return node;
    } 
  
    // Dictionary to save the visited node and it's respective clone
    // as key and value respectively. This helps to avoid cycles
    let visited = new Map();
  
    // Put the first node in the queue
    let queue = [];
    queue.push(node);
  
    // Clone the node and put it in the visited dictionary
    visited.set(node, new GraphNode(node.val, []));
  
    // Start BFS traversal
    while (queue.length > 0) {
      // Pop a node from the from the front of the queue
      let node_ = queue.shift();
  
      // Iterate through all the neighbors of the node
      for (let neighbor of node_.neighbors) {
        if (!visited.has(neighbor)) {
          // Clone the neighbor and put in the visited, if not present already
          visited.set(neighbor, new GraphNode(neighbor.val, []));
          // Add the newly encountered node to the queue
          queue.push(neighbor);
        }
  
        // Add the clone of the neighbor to the neighbors of the cloned node
        visited.get(node_)?.neighbors.push(visited.get(neighbor));
      }
    }
  
    // Return the clone of the node from visited
    return visited.get(node) ?? null;
  }