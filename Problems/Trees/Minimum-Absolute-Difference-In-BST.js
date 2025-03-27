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
 * Time Complexity:
The time complexity of this function is O(n), where n is the number 
of nodes in the BST. This is because the in-order traversal visits 
each node exactly once, and the subsequent loop that calculates the
 minimum difference also iterates through the list of node values, 
 which has a length of n.
 Space Complexity:
The space complexity is O(n) in the worst case due to the storage of
 node values in the `result` array. In addition, the recursion stack
  for the in-order traversal can also take up to O(h) space, where 
  h is the height of the tree. In the worst case (for a skewed tree), 
  h can be equal to n, leading to an overall space complexity of
   O(n). In a balanced tree, h would be O(log n), but the dominant f
   actor remains the storage of the node values. Thus, the 
   overall space complexity is O(n).
 */
var getMinimumDifference = function(root) {
    var result = [];
    const inorder = function(root) {
        if(root == null) return;
        if(root.left) inorder(root.left);
        result.push(root.val);
        if(root.right) inorder(root.right);
    }

    inorder(root);
    var min = Number.MAX_VALUE;;
    for(var i = 1; i < result.length; i++) {
        var min = Math.min(min, result[i] - result[i-1]);
    }
    return min;
};

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
 * Time Complexity:
The time complexity of the function is O(n), where n is the number 
of nodes in the BST. This is because the in-order traversal 
visits each node exactly once, performing a constant amount 
of work (updating `ans` and `prev`) for each node.
Space Complexity:
The space complexity is O(h), where h is the height of the tree. 
This is due to the recursive call stack used during the in-order 
traversal. In the worst case, for a skewed tree (like a linked list), 
the height h can be equal to n, resulting in O(n) space. However,
 for a balanced tree, the height would be O(log n), leading to
  O(log n) space complexity in that case.
 */
var getMinimumDifference = function(root) {
    var prev = Number.MAX_VALUE;
    var ans = Number.MAX_VALUE;

    var inOrder = function(root) {
        if(root.left) inOrder(root.left);
        ans = Math.min(ans, Math.abs(root.val - prev));
        prev = root.val;
        if(root.right) inOrder(root.right);
    }
    inOrder(root);
    return ans;
};