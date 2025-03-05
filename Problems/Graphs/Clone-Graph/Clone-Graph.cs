using System;
using System.Collections.Generic;

// Using depth-first search - Time: O(n)

/*

Yes! Let me explain both concepts clearly.

1. Connected Undirected Graph
A graph consists of nodes (vertices) and edges (connections between nodes).

Undirected Graph: Each edge does not have a direction, meaning if there is an edge between node A and node B, you can travel in both directions (A ↔ B).
Connected Graph: A graph is connected if there is a path between every pair of vertices.
In other words, no node is isolated, and all nodes are reachable.
Example of a Connected Undirected Graph:
less
Copy
Edit
   A --- B
   |     |
   C --- D
This graph is connected because every node is reachable from any other node.

If we remove the edge C-D, the graph may become disconnected (depending on other connections).

2. Adjacency List
An adjacency list is a way to represent a graph where:

Each node (vertex) is stored as a key in a dictionary (or an array of lists).
The values are lists of connected nodes (its neighbors).
Adjacency List Example for the Above Graph:
javascript
Copy
Edit
const graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
};
Each key (node) has a list of nodes it is directly connected to.

Why Use an Adjacency List?
Efficient for sparse graphs (fewer edges than nodes).
Easy to iterate through neighbors of a node.
More space-efficient than an adjacency matrix for large graphs.
/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };

var cloneGraph = function(node) {
    if (!node) return null;

    const map = new Map(); // To store { originalNode -> clonedNode } mappings

    function dfs(currentNode) {
        if (map.has(currentNode)) {
            return map.get(currentNode); // Return cloned node if already visited
        }

        // Clone current node
        const clone = new _Node(currentNode.val);
        map.set(currentNode, clone);

        // Recursively clone neighbors
        for (const neighbor of currentNode.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
};

Explanation
Base Case:

If node is null, return null (edge case).
Use a Map to Store Clones:

We use a Map to track already cloned nodes to avoid infinite
 loops in cyclic graphs.
Recursive DFS Function (dfs):

If the node is already cloned (exists in map), return the clone.
Otherwise:
Create a new _Node with val.
Store it in map so we don't clone it again.
Recursively clone its neighbors using DFS.
Return the Cloned Graph Root:

The recursion will return the fully cloned graph.
Time & Space Complexity
Time Complexity: O(V + E)
We visit each node (V) and traverse all edges (E).
Space Complexity: O(V)
The Map stores up to V nodes in memory.
*/

public class Node
{
    public int val;
    public IList<Node> neighbors;

    public Node()
    {
        val = 0;
        neighbors = new List<Node>();
    }

    public Node(int _val)
    {
        val = _val;
        neighbors = new List<Node>();
    }

    public Node(int _val, List<Node> _neighbors)
    {
        val = _val;
        neighbors = _neighbors;
    }
}

public class Solution
{
    private Dictionary<Node, Node> m = new Dictionary<Node, Node>();

    public Node CloneGraph(Node node)
    {
        if (node == null)
            return null;

        if (m.ContainsKey(node))
            return m[node];

        Node cpy = new Node(node.val);
        m[node] = cpy;

        foreach (var neighbor in node.neighbors)
        {
            cpy.neighbors.Add(CloneGraph(neighbor));
        }

        return cpy;
    }
}

class Program
{
    static void Main()
    {
        // Constructing the original graph
        var s = new Solution();
        var n1 = new Node(1);
        var n2 = new Node(2);
        var n3 = new Node(3);
        var n4 = new Node(4);

        n1.neighbors.Add(n2);
        n1.neighbors.Add(n4);
        n2.neighbors.Add(n1);
        n2.neighbors.Add(n3);
        n3.neighbors.Add(n2);
        n3.neighbors.Add(n4);
        n4.neighbors.Add(n1);
        n4.neighbors.Add(n3);

        Console.Write("Input: adjList = [");
        foreach (var node in new Node[] { n1, n2, n3, n4 })
        {
            Console.Write("[");
            foreach (var neighbor in node.neighbors)
            {
                Console.Write(neighbor.val + "");
                if (neighbor != node.neighbors[node.neighbors.Count - 1])
                    Console.Write(", ");
            }
            Console.Write("]");
            if (node != n4)
                Console.Write(", ");
        }
        Console.WriteLine("]");

        Solution sol = new Solution();
        var clone = sol.CloneGraph(n1);

        Console.Write("Output: [");
        foreach (var cloneNode in new Node[] {clone, clone.neighbors[0], clone.neighbors[1].neighbors[1], clone.neighbors[1]})
        {
            Console.Write("[");
            foreach (var neighbor in cloneNode.neighbors)
            {
                Console.Write(neighbor.val + "");
                if (neighbor != cloneNode.neighbors[cloneNode.neighbors.Count - 1])
                    Console.Write(", ");
            }
            Console.Write("]");
            if (cloneNode != clone.neighbors[1])
                Console.Write(", ");
        }
        Console.WriteLine("]");
    }
}
