/*
The time complexity of the deleteNode function in a binary search 
tree (BST) is O(h), where h is the height of the tree. In the worst 
case, if the tree is unbalanced (like a linked list), the height can 
be equal to the number of nodes, making the time complexity O(n).
 However, in a balanced BST, the height is logarithmic relative 
 to the number of nodes, resulting in O(log n) time complexity 
 for balanced trees.

The space complexity is O(h) as well, due to the recursive call 
stack. In the worst case of an unbalanced tree, the space
 complexity can also be O(n). In a balanced tree, the space 
 complexity would be O(log n) because the maximum depth of the 
 recursion would be equal to the height of the tree.
*/
var deleteNode = function(root, key) {
    if (!root) return null;

    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node to delete found

        // Case 1: no child
        if (!root.left && !root.right) {
            return null;
        }
        
        // Case 2: one child
        if (!root.left) {
            return root.right;
        }
        if (!root.right) {
            return root.left;
        }

        // Case 3: two children
        // Find the smallest value in the right subtree
        let minNode = getMin(root.right);
        root.val = minNode.val;
        // Delete the in-order successor
        root.right = deleteNode(root.right, minNode.val);
    }

    return root;
};

// Helper to find the minimum node in a subtree
function getMin(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}