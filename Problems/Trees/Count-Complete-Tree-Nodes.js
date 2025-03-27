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
The time complexity of this algorithm is O(log n * log n) in the average case 
and O(n) in the worst case. This is because the function computes the left and 
right depths of the tree, which takes O(log n) time for each call in a balanced 
tree. Since the `traverse` function is called recursively, it can lead to
 multiple depth calculations, resulting in the average case being
  O(log n * log n). However, in the worst case, where the tree is
  not balanced (e.g., a skewed tree), the depth calculations can 
  take O(n) time, leading to an overall complexity of O(n).
Space Complexity:
The space complexity is O(log n) due to the recursion stack used during the depth 
calculations. In the worst case of a skewed tree, the space complexity can reach
 O(n) because the maximum depth of the recursion stack can be equal to the number
  of nodes in the tree. However, for a complete binary tree, the average space
   complexity is O(log n).
*/

var countNodes = function(root) {
    
    function leftDepth(node) {
        if(!node) return 0;
        return leftDepth(node.left) + 1;
    }
    
    function rightDepth(node) {
        if(!node) return 0;
        return rightDepth(node.right) + 1;
    }
    
    function traverse(node) {
        const leftLen = leftDepth(node);
        const rightLen = rightDepth(node);
        
        if(leftLen === rightLen) return Math.pow(2, leftLen) - 1;
        return traverse(node.left) + traverse(node.right) + 1;
    }
    return traverse(root);
};

