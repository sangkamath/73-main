/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * O(n)
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 * The time complexity of the `pathSum` function is O(N), 
 * where N is the number of nodes in the binary tree. This 
 * is because the function traverses each node exactly 
 * once to find all paths that sum to the target value. 
 * In the worst case, every node is visited, leading to a linear time complexity.
 * The space complexity is O(H) for the recursion stack, 
 * where H is the height of the binary tree. In the case 
 * of a balanced tree, H would be log(N), but in the 
 * worst case of a skewed tree, H could be N. Additionally, 
 * the space used by the `result` array can grow up to O(N)
 *  in the case where all paths from the root to the leaves
 *  are valid paths that sum to the target. However, since
 *  we are primarily concerned with the space used by the 
 * recursion stack, we consider the space complexity to be O(H).
 */
var pathSum = function(root, targetSum) {
    var result = [];
    var list = [];
    if(root === null) return result;
    helper(root, targetSum, list, result);
    return result;
};

const helper = function(root, targetSum, list, result) {
    if(root === null) return;
    list.push(root.val);
    if(root.val === targetSum && root.left === null &&
    root.right === null) {
        result.push([...list]);
    } else {
        helper(root.left, targetSum - root.val, list, result);
        helper(root.right, targetSum - root.val, list, result);
    }
    list.pop();
 }