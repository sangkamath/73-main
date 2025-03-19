/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 * The time complexity of the `lowestCommonAncestor` function is O(N), where N is the number of nodes
 *  in the binary tree. This is because, in the worst case, the function may need to traverse all
 *  the nodes in the tree to find both nodes p and q. Each node is visited once, leading to a linear 
 * time complexity.

The space complexity is O(H), where H is the height of the binary tree. This is due to the recursion
 stack that is used during the function calls. In the worst case, for a skewed tree (where all nodes
  are either to the left or right), the height H can be equal to N, resulting in O(N) space complexity.
   However, for a balanced binary tree, the height would be log(N), leading to O(log N) space 
   complexity in that case.
 */
var lowestCommonAncestor = function(root, p, q) {

    if (!root || root === p || root === q) return root; //Base case or find p or q

   let left = lowestCommonAncestor(root.left, p, q);
   let right = lowestCommonAncestor(root.right, p, q);

   if (left && right) return root; // Both nodes found in left and right subtrees, so root is LCA
   return left || right; // Return the non-null side (if one node is found)
};


/*
Time complexity: O(h). The algorithm traverses the height of the tree, where h is the 
height of the BST. In a balanced BST, this is O(log n), and in the worst case (unbalanced tree), this is O(n).
Space complexity: O(h). The recursion stack requires space proportional to the height
 of the tree.
*/
export default function BSTLowestCommonAncestor(
  root,
  a,
  b
){
  if (root === null) {
    return null; // Base case: if the root is null, there's no ancestor
  }

  // Value of the current node (parent node)
  const parentVal = root.val;

  // Value of node a
  const aVal = a.val;

  // Value of node b
  const bVal = b.val;

  // If both a and b are bigger than parent, explore the right subtree
  if (aVal > parentVal && bVal > parentVal) {
    return BSTLowestCommonAncestor(root.right, a, b);
  }

  // If both a and b are smaller than parent, explore the left subtree
  if (aVal < parentVal && bVal < parentVal) {
    return BSTLowestCommonAncestor(root.left, a, b);
  }

  // If one of a or b is on one side and the other is on the opposite side,
  // the current node is the lowest common ancestor.
  return root;
}

/*
Time complexity: O(h). The algorithm traverses the height of the tree, where h is 
the height of the BST. In a balanced BST, this is O(log n), and in the worst case 
(unbalanced tree), this is O(n).
Space complexity: O(1). The algorithm uses a constant amount of space as there is no 
recursion or auxiliary data structures.
*/
export default function BSTLowestCommonAncestor(
  root,
  a,
  b,
) {
  // Value of a
  const aVal = a.val;

  // Value of b
  const bVal = b.val;

  // Start from the root node of the tree
  let node = root;

  // Traverse the tree
  while (node !== null) {
    // Value of the current ancestor/parent node
    const parentVal = node.val;

    if (aVal > parentVal && bVal > parentVal) {
      // If both a and b are greater than the parent, move to the right subtree
      node = node.right;
    } else if (aVal < parentVal && bVal < parentVal) {
      // If both a and b are lesser than the parent, move to the left subtree
      node = node.left;
    } else {
      // We have found the split point, i.e., the lowest common ancestor (LCA)
      return node;
    }
  }

  // If the LCA is not found, return null (this case is generally not expected in a BST)
  return null;
}