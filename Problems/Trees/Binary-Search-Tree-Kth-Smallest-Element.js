/**
 * @param {TreeNode | null} root
 * @param {number} k
 * @return {number}
 * The function `kthSmallestElementInABst` performs an in-order traversal of a binary search tree 
 * (BST) to find the k-th smallest element. 

Time Complexity:
The time complexity of this function is O(H + k), where H is the height of the tree. In the worst 
case, if the tree is unbalanced (like a linked list), H can be equal to N (the number of nodes
 in the tree). Thus, in the worst case, the time complexity can be O(N). However, in a balanced 
 tree, H would be log(N), making the average case O(log N + k). Since we are decrementing k with 
 each node visited, we can stop the traversal early once we find the k-th smallest element.

Space Complexity:
The space complexity is O(H) due to the recursive call stack. In the worst case of an 
unbalanced tree, this could also be O(N). In a balanced tree, the space complexity would 
be O(log N) because the maximum depth of the recursion would be equal to the height of the tree. 

Overall, the function is efficient for finding the k-th smallest element in a BST,
 especially when k is small relative to the total number of nodes.
 */
export default function kthSmallestElementInABst(root, k) {

    function inorder(root) {
        if (root == null) return -1;
        if (root.left) {
            var value = inorder(root.left);
            if (value != -1) return value;
        }
        k--;
        if (k === 0) return root.val;

        return inorder(root.right);
    }


    return inorder(root);
}


/*
Time complexity: O(n). The in-order traversal visits each node exactly once.
Space complexity: O(n). The array stores all node values, and the recursion
 stack may also use up to O(h) space, where h is the height of the BST.
*/
function inorderTraversal(root, arr) {
    if (root === null) {
        return arr; // Base case: if the node is null, return the current array
    }

    inorderTraversal(root.left, arr); // Recursively traverse the left subtree
    arr.push(root.val); // Add the current node's value to the array
    inorderTraversal(root.right, arr); // Recursively traverse the right subtree

    return arr; // Return the array with collected values
}

export default function kthSmallestElementInABst(
    root,
    k,
) {
    // Perform in-order traversal to get a sorted list of node values
    const nums = inorderTraversal(root, []);

    // Return the k-th smallest element (k-1 index due to 0-based indexing)
    return nums[k - 1];
}



/*
Time complexity: O(h + k). The algorithm visits up to k nodes and explores a maximum depth 
of h (height of the tree) in the leftmost traversal.
Space complexity: O(h). The stack stores nodes along the path to the leftmost node, which 
is proportional to the height of the tree.
*/
export default function kthSmallestElementInABst(
    root,
    k,
  ){
    // Stack to hold nodes during the in-order traversal
    const stack = [];
  
    while (true) {
      // Traverse to the leftmost node
      while (root !== null) {
        stack.push(root); // Push the current node onto the stack
        root = root.left; // Move to the left child
      }
  
      // Process the node at the top of the stack
      root = stack.pop(); // Pop the node from the stack
      if (--k === 0) {
        return root.val; // If k is 0, return the value of the current node
      }
  
      // Move to the right subtree
      root = root.right;
    }
  }