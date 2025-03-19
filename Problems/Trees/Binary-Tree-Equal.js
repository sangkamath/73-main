/**
 * @param {TreeNode | null} a
 * @param {TreeNode | null} b
 * @return {boolean}
 * The time complexity of the `binaryTreeEqual` function is O(n), where n is the number of 
 * nodes in the trees. This is because the function performs a traversal of both trees, 
 * comparing each corresponding node. In the worst case, it will visit every node once.

The space complexity is O(h), where h is the height of the trees. This is due to the 
recursive nature of the function, which uses the call stack to keep track of the 
recursive calls. In the case of a balanced binary tree, the height would be log(n), 
but in the worst case of a skewed tree, the height could be n. Therefore, the space 
complexity can vary from O(log n) to O(n) depending on the structure of the trees.
 */
export default function binaryTreeEqual(a, b) {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    if (a != null && b != null && a.val === b.val && binaryTreeEqual(a.left,
        b.left) && binaryTreeEqual(a.right, b.right)) return true;

    return false;

}

/*
Time complexity: O(n). Each node in both trees is visited once.
Space complexity: O(h). The recursion stack requires space proportional to the height 
of the trees, where h is the maximum height of the two trees.
*/
export default function binaryTreeEqual(
    a,
    b
) {
    // Check if both a and b are null
    if (a == null && b == null) {
        return true;
    }

    // If one of a or b is null (but not both), the trees are not the same
    if (b == null || a == null) {
        return false;
    }

    // If the values of the current nodes are different, the trees are not the same
    if (a.val != b.val) {
        return false;
    }

    // Recursively check if the right subtrees are the same and if the left subtrees are the same
    return binaryTreeEqual(a.right, b.right) && binaryTreeEqual(a.left, b.left);
} 

/*
Time complexity: O(n). Each node in both trees is processed once.
Space complexity: O(n). The queue stores up to n pairs of nodes, depending on the
 size of the trees.
*/
export default function binaryTreeEqual(
    a,
    b,
  ){
    // Helper function to check if two nodes are the same
    function check(a, b) {
      // If both nodes are null, they are the same
      if (a === null && b === null) {
        return true;
      }
      // If one node is null and the other is not, they are different
      if (a === null || b === null) {
        return false;
      }
      // If the values of the nodes are different, they are different
      if (a.val !== b.val) {
        return false;
      }
      // If none of the above conditions are met, the nodes are the same
      return true;
    }
  
    // Initialize a queue with the pair of root nodes
    const queue = [[a, b]];
  
    // Process the queue until it is empty
    while (queue.length) {
      // Dequeue the first pair of nodes
      [a, b] = queue.shift();
  
      // If the nodes are not the same, return false
      if (!check(a, b)) {
        return false;
      }
  
      // If the current node in a is not null, enqueue its left and right children along with b's corresponding children
      if (a) {
        queue.push([a.left, b?.left] );
        queue.push([a.right, b?.right]);
      }
    }
  
    // If all nodes are the same, return true
    return true;
  }