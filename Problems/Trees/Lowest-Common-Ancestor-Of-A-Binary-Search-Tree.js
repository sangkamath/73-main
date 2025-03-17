/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 * The time complexity of the `lowestCommonAncestor` function is O(N), where N is the number of nodes
 *  in the binary tree. This is because, in the worst case, the function may need to traverse all
 *  the nodes in the tree to find both nodes p and q. Each node is visited once, leading to a linear 
 * time complexity.

The space complexity is O(H), where H is the height of the binary tree. This is due to the recursion
 stack that is used during the function calls. In the worst case, for a skewed tree (where all nodes
  are either to the left or right), the height H can be equal to N, resulting in O(N) space complexity.
   However, for a balanced binary tree, the height would be log(N), leading to O(log N) space 
   complexity in that case.
 */
var lowestCommonAncestor = function(root, p, q) {

    if (!root || root === p || root === q) return root; //Base case or find p or q

   let left = lowestCommonAncestor(root.left, p, q);
   let right = lowestCommonAncestor(root.right, p, q);

   if (left && right) return root; // Both nodes found in left and right subtrees, so root is LCA
   return left || right; // Return the non-null side (if one node is found)
};