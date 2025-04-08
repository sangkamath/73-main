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
 * @return {number[]}
 * The time complexity of the `rightSideView` function is O(N), 
 * where N is the number of nodes in the binary tree. This is 
 * because each node is processed exactly once as we traverse 
 * the tree level by level using a queue.

The space complexity is O(W), where W is the maximum width of 
the tree at any level. In the worst case, this can be O(N) for 
a complete binary tree, where the maximum width occurs at the 
last level. However, for a more balanced tree, the space 
complexity would typically be O(N/2) or O(N) in terms of the 
number of nodes at the last level. Thus, the overall space 
complexity can be considered O(N) in the worst case.
 */
var rightSideView = function(root) {
    if (!root) return [];

   const ans = [];
   const queue = [root];

   while (queue.length > 0) {
       const n = queue.length;
       for (let i = 0; i < n; i++) {
           const node = queue.shift();
           if (i === n - 1) ans.push(node.val);
           if (node.left) queue.push(node.left);
           if (node.right) queue.push(node.right);
       }
   }

   return ans;
};