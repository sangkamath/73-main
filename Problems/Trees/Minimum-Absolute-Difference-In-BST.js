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