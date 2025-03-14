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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if(!root) return true;
    return isSame(root.left, root.right);
};

var isSame = function(leftroot, rightroot) {

    if((!leftroot && rightroot) || 
    (leftroot && !rightroot) || 
    (leftroot && rightroot && leftroot.val !==
    rightroot.val)) return false;

    if(leftroot && rightroot) {
        return isSame(leftroot.left, rightroot.right) && isSame(leftroot.right, rightroot.left);
    }

    return true;
}