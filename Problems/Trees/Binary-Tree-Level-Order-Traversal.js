/**
 * @param {TreeNode | null} root
 * @return {number[][]}
 * The time complexity of the binaryTreeLevelOrderTraversal function is O(n), where n is the
 *  number of nodes in the binary tree. This is because each node is processed exactly 
 * once as we traverse the tree level by level, adding each node's value to the result array.

The space complexity is also O(n) in the worst case. This occurs when the binary tree 
is completely unbalanced (like a linked list), resulting in the queue potentially
 holding all n nodes at once. Additionally, the result array will also store all
  n node values. In a balanced tree, the space used by the queue will be at most 
  O(w), where w is the maximum width of the tree, but in the worst case, this can still be O(n).
 */
export default function binaryTreeLevelOrderTraversal(root) {
    if (root === null) return [[]];
    var result = [];
    var queue = [root];

    while (queue.length > 0) {
        var length = queue.length;
        var array = [];
        for (var i = 0; i < length; i++) {
            var node = queue.shift();
            array.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(array);
    }
    return result;
}


/*
Time complexity: O(n). Every node in the tree is visited exactly once.
Space complexity: O(h). The space used by the recursion stack is proportional to the height
 of the tree, h, and additional space is used to store the level groups.
*/
export default function binaryTreeLevelOrderTraversal(
    root,
) {
    // Initialize an array to hold the values at each level of the tree
    let levels = [];

    // Helper function to traverse the tree
    function helper(node, level) {
        // If we're visiting a new level for the first time, add an empty array for that level
        if (levels.length === level) {
            levels.push([]);
        }

        // Add the current node's value to the corresponding level array
        levels[level].push(node.val);

        // Recursively traverse the left subtree, if it exists, and increment the level
        if (node.left !== null) {
            helper(node.left, level + 1);
        }

        // Recursively traverse the right subtree, if it exists, and increment the level
        if (node.right !== null) {
            helper(node.right, level + 1);
        }
    }

    // Start the traversal from the root node at level 0
    if (root !== null) {
        helper(root, 0);
    }

    // Return the array of levels, each containing the node values at that level
    return levels;
}

/*
Time complexity: O(n). Each node is visited exactly once.
Space complexity: O(m). The queue holds nodes at the current level,
 where m is the maximum number of nodes at any level (equal to the width of the tree).
*/
export default function binaryTreeLevelOrderTraversal(
    root
  ){
    // Initialize an array to store levels of the tree
    let levels = [];
  
    // If the root is null, return the empty levels array
    if (!root) {
      return levels;
    }
  
    // Initialize a queue with the root node
    let queue = [root];
  
    // Initialize the level counter
    let level= 0;
  
    // Iterate while there are nodes in the queue
    while (queue.length) {
      // Start the current level by adding an empty array
      levels.push([]);
  
      // Number of nodes in the current level
      let levelCount = queue.length;
  
      // Process all nodes at the current level
      for (let i = 0; i < levelCount; i++) {
        // Dequeue the first node in the queue
        let node = queue.shift();
  
        // Add the node's value to the current level
        if (node) {
          levels[level].push(node.val);
        }
  
        // Add the node's children to the queue for the next level
        if (node?.left) {
          queue.push(node.left);
        }
        if (node?.right) {
          queue.push(node.right);
        }
      }
  
      // Move on to the next level
      level++;
    }
  
    // Return the array of levels
    return levels;
  }