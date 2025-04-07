/*
The time complexity of the `longestZigZag` function is O(N), 
where N is the number of nodes in the binary tree. This is because 
the depth-first search (DFS) traverses each node exactly once, 
performing constant-time operations at each node.

The space complexity is O(H), where H is the height of the 
binary tree. This space is used by the call stack during 
the DFS traversal. In the worst case, if the tree is 
skewed (like a linked list), the height H can be equal 
to N, leading to O(N) space complexity. However, in a 
balanced tree, the height would be O(log N), resulting 
in O(log N) space complexity in that case.
*/
function longestZigZag(root) {
    let maxLen = 0;

    const dfs = (node, isLeft, length) => {
        if (!node) return;

        maxLen = Math.max(maxLen, length);

        // If last direction was left, now go right
        dfs(node.left, true, isLeft ? 1 : length + 1); // turn to left
        dfs(node.right, false, isLeft ? length + 1 : 1); // turn to right
    };

    dfs(root.left, true, 1); // start with left
    dfs(root.right, false, 1); // start with right

    return maxLen;
}