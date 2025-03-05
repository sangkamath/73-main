using System;
using System.Collections.Generic;
using System.Linq;

// Using union find algorithm - Time: O(n)

/*
Union-Find, also called Disjoint Set Union (DSU), is a data structure
 that efficiently groups elements into disjoint sets and 
 supports union (merging sets) and find (checking set membership) 
 operations.

🚀 Why Use Union-Find?
It is used in problems related to connectivity and component merging.
Supports fast merging (union) and lookup (find) operations.
Efficient for graph problems, network connectivity, clustering, 
and cycle detection.
🛠️ Union-Find Operations
1️⃣ Find (with Path Compression)
Finds the representative (root) of a set an element belongs to.
Uses path compression to speed up future lookups.
2️⃣ Union (with Union by Rank/Size)
Merges two sets by linking one root to another.
Uses Union by Rank/Size to keep the tree balanced, improving efficiency.
🔍 Explanation
🔹 Union-Find Class
constructor(n)

Initializes parent and size arrays.
parent[i] = i means each element is its own root initially.
size[i] = 1 means each element starts as a set of size 1.
find(a)

Uses path compression to flatten the tree and speed up future lookups.
connect(a, b)

Uses union by size to attach the smaller tree under the larger tree.
getSizes()

Returns the size array for checking largest component.

class UnionFind {
    constructor(n) {
        this.parent = Array(n).fill(0).map((_, i) => i);
        this.size = Array(n).fill(1);
    }

    // Find function with Path Compression
    find(a) {
        if (this.parent[a] !== a) {
            this.parent[a] = this.find(this.parent[a]); // Path compression
        }
        return this.parent[a];
    }

    // Union by size
    connect(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);
        if (rootA === rootB) return;
        
        // Union by size: attach smaller tree to larger tree
        if (this.size[rootA] > this.size[rootB]) {
            this.parent[rootB] = rootA;
            this.size[rootA] += this.size[rootB];
        } else {
            this.parent[rootA] = rootB;
            this.size[rootB] += this.size[rootA];
        }
    }

    // Get the size of each connected component
    getSizes() {
        return this.size;
    }
}

var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;

    let uf = new UnionFind(nums.length);
    let map = new Map();

    // Step 1: Insert each unique number into the map and connect adjacent ones
    for (let i = 0; i < nums.length; i++) {
        let n = nums[i];
        if (map.has(n)) continue; // Skip duplicates
        map.set(n, i);

        // If adjacent numbers exist, connect them
        if (map.has(n + 1)) uf.connect(map.get(n), map.get(n + 1));
        if (map.has(n - 1)) uf.connect(map.get(n), map.get(n - 1));
    }

    // Step 2: Find the largest connected component
    return Math.max(...uf.getSizes());
};
*/

public class UnionFind
{
    private int[] id;
    private int[] size;

    public UnionFind(int n)
    {
        id = new int[n];
        size = new int[n];

        for (int i = 0; i < n; i++)
        {
            id[i] = i;
            size[i] = 1;
        }
    }

    public void Connect(int a, int b)
    {
        int x = Find(a);
        int y = Find(b);
        if (x == y) return;
        id[x] = y;
        size[y] += size[x];
    }

    public int Find(int a)
    {
        return id[a] == a ? a : (id[a] = Find(id[a]));
    }

    public int[] GetSizes()
    {
        return size;
    }
}

public class Solution
{
    public int LongestConsecutive(int[] nums)
    {
        if (nums.Length == 0) return 0;

        UnionFind uf = new UnionFind(nums.Length);
        Dictionary<int, int> m = new Dictionary<int, int>();

        for (int i = 0; i < nums.Length; i++)
        {
            int n = nums[i];
            if (m.ContainsKey(n)) continue;
            m[n] = i;
            if (m.ContainsKey(n + 1)) uf.Connect(m[n], m[n + 1]);
            if (m.ContainsKey(n - 1)) uf.Connect(m[n], m[n - 1]);
        }

        return uf.GetSizes().Max();
    }
}

class Program
{
    static void Main()
    {
        int[] nums = { 0,3,7,2,5,8,4,6,0,1 };
        Console.WriteLine("Input: [" + string.Join(",", nums) + "]");

        Solution sol = new Solution();
        int result = sol.LongestConsecutive(nums);

        Console.WriteLine("Output: " + result);
    }
}