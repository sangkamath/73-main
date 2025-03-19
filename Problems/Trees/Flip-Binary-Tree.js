/**
 * @param {TreeNode | null} root
 * @return {TreeNode | null}
 * The function `binaryTreeFlip` performs a recursive traversal of a binary tree to flip 
 * its left and right children at each node.

Time Complexity:
The time complexity of this function is O(n), where n is the number of nodes in the 
binary tree. This is because the function visits each node exactly once to swap
 its children, resulting in a linear time complexity relative to the number of nodes.

Space Complexity:
The space complexity is O(h), where h is the height of the binary tree. This is due 
to the recursive call stack used during the traversal. In the worst case, for a 
skewed tree (where all nodes have only one child), the height h can be equal to n, 
leading to O(n) space. In a balanced tree, the height would be log(n), resulting 
in O(log n) space.
 */
export default function binaryTreeFlip(root) {
    if (root === null) {
        return null;
    }

    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    binaryTreeFlip(root.left);
    binaryTreeFlip(root.right);

    return root;
}

/*
Time complexity: O(n). Each node is visited exactly once.
Space complexity: O(h). The recursion stack uses space proportional to the 
height of the tree, where h is the height of the tree.
*/
export default function binaryTreeFlip(root) {
    // Base case: if the node is null, return null
    if (root === null) {
        return null;
    }

    // Recursively invert the left and right subtrees
    const right = binaryTreeFlip(root.right);
    const left = binaryTreeFlip(root.left);

    // Swap the left and right children of the current node
    root.left = right;
    root.right = left;

    // Return the root of the inverted tree
    return root;
}

/*
Time complexity: O(n). Each node in the tree is processed exactly once.
Space complexity: O(n). The queue may store up to n nodes in the worst case, proportional 
to the breadth of the tree at its widest level.
*/
export default function binaryTreeFlip(root) {
    // Base case: if the root is null, return null
    if (root === null) {
        return null;
    }

    // Initialize a queue and add the root node
    const queue = [];
    queue.push(root);

    // Iterate while there are nodes in the queue
    while (queue.length > 0) {
        // Dequeue the current node
        const current = queue.shift();

        if (current !== undefined && current !== null) {
            // Swap the left and right children
            const temp = current.left;
            current.left = current.right;
            current.right = temp;

            // If the left child exists, add it to the queue
            if (current.left !== null) {
                queue.push(current.left);
            }

            // If the right child exists, add it to the queue
            if (current.right !== null) {
                queue.push(current.right);
            }
        }
    }

    // Return the root of the inverted tree
    return root;
}