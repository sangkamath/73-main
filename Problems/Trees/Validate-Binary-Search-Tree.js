/**
 * @param {TreeNode | null} root
 * @return {boolean}
 * The time complexity of the binary search tree validation function is O(n), where n is the number of 
 * nodes in the tree. This is because the function performs an in-order traversal of the tree, 
 * visiting each node exactly once to check its value against the previously visited node's value.

The space complexity is O(h), where h is the height of the tree. This space is used by the call
 stack during the recursive in-order traversal. In the worst case, for a skewed tree (where each 
 node has only one child), the height h can be equal to n, leading to O(n) space complexity. 
 However, for a balanced tree, the height would be log(n), resulting in O(log n) space complexity.
 */
export default function binarySearchTreeValidate(root) {
    var prev = -Infinity;

    function inorder(root) {
        if (root === null) return true;

        if (!inorder(root.left)) {
            return false;
        }

        if (root.val < prev) {
            return false;
        }
        prev = root.val;

        return inorder(root.right);
    }

    return inorder(root);
}


/*
Time complexity: O(n). Each node is visited exactly once.
Space complexity: O(h). The recursion stack requires space proportional to the 
height of the tree, where h is the height of the BST.
*/
export default function binarySearchTreeValidate(
    root
) {
    // Helper function to recursively check each node within the allowed range
    function checkNodeInRange(
        node,
        minAllowed,
        maxAllowed,
    ) {
        // Base case: an empty node is a valid BST
        if (node == null) {
            return true;
        }

        // The current node's value must lie between minAllowed and maxAllowed
        if (node.val <= minAllowed || node.val >= maxAllowed) {
            return false;
        }

        // Recursively check the left and right subtrees with updated ranges
        const isLeftValid = checkNodeInRange(node.left, minAllowed, node.val);
        const isRightValid = checkNodeInRange(node.right, node.val, maxAllowed);

        // Both left and right subtrees must be valid
        return isLeftValid && isRightValid;
    }

    // Initial call with the entire range of valid values for a 32-bit signed integer
    return checkNodeInRange(root, -Infinity, Infinity);
}



/*
Time complexity: O(n). Each node is processed exactly once.
Space complexity: O(h). The stack holds up to h nodes simultaneously, where h is the
 height of the tree.
*/
export default function binarySearchTreeValidate(
    root,
  ){
    // Stack to hold nodes during iterative traversal
    const stack= [];
    // Stack to hold the lower limits for node values
    const lowerLimits= [];
    // Stack to hold the upper limits for node values
    const upperLimits = [];
  
    function update(
      node,
      low,
      high,
    ) {
      stack.push(node);
      lowerLimits.push(low);
      upperLimits.push(high);
    }
  
    // Initialize the stack with the root node and null limits
    update(root, null, null);
  
    // Iterate while there are nodes in the stack
    while (stack.length > 0) {
      // Pop the top node and its corresponding limits
      const node = stack.pop();
      const low = lowerLimits.pop();
      const high = upperLimits.pop();
  
      // If the node is null, continue to the next iteration
      if (node === null) {
        continue;
      }
  
      const val = node.val;
  
      // Ensure low and high are defined before comparison
      if (low != null && val <= low) {
        return false; // Invalid if value is less than or equal to the lower limit
      }
      if (high != null && val >= high) {
        return false; // Invalid if value is greater than or equal to the upper limit
      }
  
      // Push the right child with updated limits
      update(node.right, val, high);
  
      // Push the left child with updated limits
      update(node.left, low, val);
    }
  
    // If no violations are found, return true
    return true;
  }