/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
class Solution {
    public int countNodes(TreeNode root) {
         if(root == null) return 0;
        return countNodes(root.left) + countNodes(root.right) + 1;
    }
}
*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

var countNodes = function(root) {
    if (!root) return 0;

    let leftHeight = getHeight(root.left);
    let rightHeight = getHeight(root.right);

    if (leftHeight === rightHeight) {
        // Left subtree is perfect, count it using 2^h - 1 formula
        return Math.pow(2, leftHeight) + countNodes(root.right);
    } else {
        // Right subtree is perfect, count it using 2^h - 1 formula
        return Math.pow(2, rightHeight) + countNodes(root.left);
    }
};

// Helper function to get the height of the leftmost path
function getHeight(node) {
    let height = 0;
    while (node) {
        height++;
        node = node.left;
    }
    return height;
}
/*
Time Complexity
Still O(log² N) since it calculates height in O(log N) and recursively halves the tree.
*/9