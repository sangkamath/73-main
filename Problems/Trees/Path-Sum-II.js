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