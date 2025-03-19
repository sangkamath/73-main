/**
 * @param {TreeNode | null} root
 * @return {number}
 * The time complexity of the `binaryTreeMaximumPathSum` function is O(N), where N 
 * is the number of nodes in the binary tree. This is because the function performs
 * a depth-first search (DFS) traversal of the tree, visiting each node exactly 
 * once to compute the maximum path sum.

The space complexity is O(H), where H is the height of the binary tree. This 
space is used by the call stack during the DFS traversal. In the worst case, 
for a skewed tree (where each node has only one child), the height H can be 
equal to N, resulting in O(N) space complexity. However, for a balanced tree, 
the height would be O(log N), leading to O(log N) space complexity in that 
scenario.
 */
export default function binaryTreeMaximumPathSum(root) {
    var ans = -Infinity;
    function dfs(root) {
        if (root == null) {
            return 0;
        }

        var left = dfs(root.left);
        var right = dfs(root.right);

        ans = Math.max(ans, root.val + left + right);
        return Math.max(0, root.val + Math.max(left, right));
    }

    dfs(root);
    return ans;
}

/*
Time complexity: O(n). Each node is visited once during the traversal.
Space complexity: O(h). The space required for the recursion stack is 
proportional to the height of the tree, where h is the height of the tree.
*/
export default function binaryTreeMaximumPathSum(
    root,
) {
    // Initialize maxSum as a very small value (negative infinity)
    let maxSum = -Infinity;

    // Helper function to perform a post-order traversal of the tree
    // and calculate the maximum gain from each subtree
    function gainFromSubtree(node) {
        // Base case: If the node is null, return 0 (no gain)
        if (node === null) {
            return 0;
        }

        // Recursively calculate the maximum gain from the left subtree
        // If the gain is negative, consider it as 0 (ignore it)
        const gainFromLeft = Math.max(gainFromSubtree(node.left), 0);

        // Recursively calculate the maximum gain from the right subtree
        // If the gain is negative, consider it as 0 (ignore it)
        const gainFromRight = Math.max(gainFromSubtree(node.right), 0);

        // Calculate the maximum path sum including the current node
        // and update maxSum if this path has the highest sum so far
        maxSum = Math.max(maxSum, gainFromLeft + gainFromRight + node.val);

        // Return the maximum gain that can be obtained by including the current node
        // and either its left or right subtree (but not both, to keep the path continuous)
        return Math.max(gainFromLeft + node.val, gainFromRight + node.val);
    }

    // Start the traversal from the root node to calculate maxSum
    gainFromSubtree(root);

    // Return the maximum path sum found
    return maxSum;
}
