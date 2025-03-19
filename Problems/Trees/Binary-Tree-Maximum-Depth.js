/**
 * @param {TreeNode | null} root
 * @return {number}
 * The time complexity of the function binaryTreeMaximumDepth is O(n), 
 * where n is the number of nodes in the binary tree. This is because 
 * the function visits each node exactly once to calculate the maximum 
 * depth, resulting in a linear traversal of the tree.

The space complexity is O(h), where h is the height of the binary tree. 
This space is used by the call stack during the recursive function calls.
 In the worst case, for a skewed tree (where each node has only one child), 
 the height h can be equal to n, leading to a space complexity of O(n). 
 In a balanced binary tree, the height would be O(log n), resulting in 
 a space complexity of O(log n).
 */
export default function binaryTreeMaximumDepth(root) {
    return root != null ? 1 + Math.max(binaryTreeMaximumDepth(root.left), binaryTreeMaximumDepth(root.right)) : 0;
}

export default function binaryTreeMaximumDepth(root){
    // Base case: if the root is null, the depth is 0
    if (root === null) {
      return 0;
    }
  
    // Recursively compute the depth of the left subtree
    const left_height = binaryTreeMaximumDepth(root.left);
  
    // Recursively compute the depth of the right subtree
    const right_height = binaryTreeMaximumDepth(root.right);
  
    // The depth of the current node is 1 (for the current node)
    // plus the maximum depth of the left and right subtrees
    return 1 + Math.max(left_height, right_height);
  }

/*
Time complexity: O(n). Each node in the tree is visited exactly 
once during the traversal.
Space complexity: O(h). The stack size depends on the height of 
the tree, where h is the height of the tree.
*/
  export default function binaryTreeMaximumDepth(root){
    // If the root is null, the depth is 0
    if (root == null) {
      return 0;
    }
  
    // Initialize a stack for iterative traversal.
    // The stack holds tuples of (TreeNode, current_depth)
    let stack= [];
  
    // Start with the root node at depth 1
    stack.push([root, 1]);
  
    // Variable to keep track of the maximum depth encountered
    let depth = 0;
  
    // Iterate while there are nodes in the stack
    while (stack.length !== 0) {
      // Pop a node and its associated depth from the stack
      let [node, current_depth] = stack.pop() ;
  
      // If the node is not null, process it
      if (node != null) {
        // Update the maximum depth if the current depth is greater
        depth = Math.max(depth, current_depth);
  
        // Push left child and right child into the stack with updated depth
        stack.push([node.left, current_depth + 1]);
        stack.push([node.right, current_depth + 1]);
      }
    }
  
    // Return the maximum depth found
    return depth;
  }
  