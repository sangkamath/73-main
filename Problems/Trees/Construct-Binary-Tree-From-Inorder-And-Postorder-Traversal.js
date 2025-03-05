/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    if(inorder.length === 0 || postorder.length === 0) {
        return null;
    }

    return helper(postorder, 0, postorder.length, inorder, 0,
    inorder.length);
};

var helper = function(postorder, pstart, pend, inorder, istart, iend){
    var root = new TreeNode(postorder[pend - 1]);

    var idx = istart;
    for(idx = istart;  idx < iend; idx++) {
       if(inorder[idx] == postorder[pend - 1]) {
        break;
       } 
    }

    var leftlength = idx - istart;

    if(leftlength > 0) {
        root.left = helper(postorder, pstart, pstart + leftlength, inorder, istart, idx);
    }
    if(idx + 1< iend) {
        root.right = helper(postorder, pstart + leftlength,
        pend - 1, inorder, idx+ 1, iend);
    }

    return root;
}