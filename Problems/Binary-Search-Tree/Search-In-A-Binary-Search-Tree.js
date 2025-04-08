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
 * @param {number} val
 * @return {TreeNode}
 * The time complexity of the `searchBST` function is O(h), where
 *  h is the height of the binary search tree (BST). In the best 
 * case, the tree is balanced, and the height is log(n), leading 
 * to a time complexity of O(log n). In the worst case, if the 
 * tree is unbalanced (e.g., a linked list), the height can be n,
 *  resulting in a time complexity of O(n).

The space complexity of the function is O(h) as well, due to 
the recursive call stack. In the best case (balanced tree), 
the space complexity is O(log n), while in the worst case 
(unbalanced tree), it can be O(n) due to the depth of the recursion.
 */
var searchBST = function(root, val) {
    if(root === null) return null;

    if(val < root.val) {
        return searchBST(root.left, val);
    }

    if(val === root.val) {
        return root;
    }

    if(val > root.val) {
        return searchBST(root.right, val);
    }
};