/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * The time complexity of the `leafSimilar` function is O(N + M), 
 * where N is the number of nodes in `root1` and M is the number 
 * of nodes in `root2`. This is because the function performs a 
 * depth-first search (DFS) on both trees, visiting each node
 * exactly once to collect the leaf values into two separate 
 * arrays.

The space complexity is O(N + M) as well. This accounts for 
the space used by the two arrays (`array1` and `array2`) 
that store the leaf values from each tree. Additionally, 
the recursive call stack for the DFS could use up to O(H) 
space, where H is the height of the tree, but in the 
worst case (for unbalanced trees), this could also 
be O(N) or O(M). However, since we are primarily 
concerned with the space used by the arrays, the overall 
space complexity remains O(N + M).
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
    var array1 = [];
    var array2 = [];

    var dfs = function (root, array) {
        if (root === null) return;
        dfs(root.left, array);
        if (root.left === null && root.right === null) {
            array.push(root.val);
        }
        dfs(root.right, array);
    }

    dfs(root1, array1);
    dfs(root2, array2);

    return JSON.stringify(array1) === JSON.stringify(array2);
};

/*
Let N be the number of nodes in root1 and M the number of nodes in root2.

Time Complexity: O(N+M)

The dfs function visits each node exactly once in both trees, resulting
 in a time complexity of O(N) for the first call and O(M) for the second
  call.

After collecting all leaves in the leaves1 and leaves2 arrays, we compare
 them using the == operator. Comparing two arrays of size L has a
  worst-case time complexity of O(L), where L is the number of leaf 
  nodes in the larger array.

Since L≤min(N,M), the comparison time is O(min(N,M)), but this is 
dominated by the time spent traversing both trees.

Overall, the time complexity is O(N+M).

Space Complexity: O(N+M)

The recursive dfs calls will require stack space for each node. In
 the worst case, if the trees are completely unbalanced (like a 
 linked list), the recursion depth could be O(N) and O(M) 
 respectively, leading to a total stack space complexity of O(N+M).

Additionally, each dfs call collects leaf nodes into leaves1 
and leaves2. The maximum number of leaves in a binary tree is  
2
N
​
  (for a full binary tree), resulting in O(N) and O(M) space 
  for each array.

Therefore, the total space complexity, combining both the 
recursion stack and the storage for the leaves, is O(N+M).
*/
var leafSimilar = function (root1, root2) {
    dfs = function (node, leaves) {
        if (node != null) {
            if (node.left == null && node.right == null) {
                leaves.push(node.val);
            }
            dfs(node.left, leaves);
            dfs(node.right, leaves);
        }
    }
    let leaves1 = [];
    let leaves2 = [];
    dfs(root1, leaves1);
    dfs(root2, leaves2);

    return (leaves1.length == leaves2.length &&
        leaves1.every((v, i) => v === leaves2[i]));
};