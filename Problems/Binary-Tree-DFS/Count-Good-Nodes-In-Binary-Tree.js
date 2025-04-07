/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 * The time complexity of the given function is O(N), where
 *  N is the number of nodes in the binary tree. This is
 * because the depth-first search (DFS) traverses each 
 * node exactly once, performing a constant amount of
 *  work for each node (comparing values and updating the count).

The space complexity is O(H), where H is the height of the
 binary tree. This space is used for the call stack
  during the DFS traversal. In the worst case, for a 
  skewed tree (where each node has only one child), 
  the height H can be equal to N, leading to O(N) 
  space complexity. In a balanced tree, the height 
  would be log(N), resulting in O(log N) space complexity.
 */
var goodNodes = function (root) {
    return dfs(root, root.val);
};

const dfs = function (node, maxSoFar) {
    if (!node) return 0;
    let count = node.val >= maxSoFar ? 1 : 0;
    maxSoFar = Math.max(maxSoFar, node.val);
    count += dfs(node.left, maxSoFar);
    count += dfs(node.right, maxSoFar);

    return count;
}


/*
The time complexity of the provided solution is O(N), where N 
is the number of nodes in the binary tree. This is because the 
helper function traverses each node exactly once, performing 
constant-time operations (like pushing to and popping from the list) 
for each node.

The space complexity is O(H), where H is the height of the binary 
tree. This is due to the recursive call stack used during the 
traversal, which can go as deep as the height of the tree. 
Additionally, the list used to keep track of the values of
 nodes in the current path can also take up to O(H) space in 
 the worst case (when the tree is skewed). However, in a 
 balanced tree, the space complexity would be O(log N). 

Overall, the solution is efficient in terms of time complexity 
but can use significant space in terms of the call stack and 
the list used for tracking node values.
*/
var goodNodes = function (root) {
    var count = { val: 0 };
    var list = [];
    if (root === null) return count;
    helper(root, count, list);
    return count.val;
};

const helper = function (root, count, list) {
    if (root === null) return;
    list.push(root.val);
    var max = Math.max(...list);
    if (max === root.val) {
        count.val++;
    }
    helper(root.left, count, list);
    helper(root.right, count, list);
    list.pop();

}