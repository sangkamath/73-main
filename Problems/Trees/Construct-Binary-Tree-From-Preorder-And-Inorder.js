/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode | null}
 * The time complexity of the given function for rebuilding a binary tree from its preorder and inorder 
 * traversals is O(n), where n is the number of nodes in the tree. This is because each node is processed 
 * exactly once during the recursive calls. The function iterates through the inorder array to find 
 * the index of the root node, which takes O(n) time in the worst case. However, since this operation
 *  is performed for each node, the overall complexity remains linear.

The space complexity is O(n) as well, primarily due to the recursion stack. In the worst case, the 
tree could be skewed (like a linked list), leading to a maximum depth of n in the recursion stack. 
Additionally, the space used for storing the tree nodes also contributes to the O(n) space 
complexity, as all nodes need to be stored in memory. Thus, the overall space complexity is O(n).
 */

class TreeNode {
    constructor(
        val,
      left,
      right,
    ) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
export default function binaryTreeRebuildingFromTraversals(preorder, inorder) {
    if (preorder.length == 0 || inorder.length == 0) {
        return null;
    }
    return BuildTree(preorder, 0, preorder.length, inorder, 0, inorder.length);
}

function BuildTree(preorder, preorderStart, preorderEnd, inorder, inorderStart, inorderEnd) {
    var root = new TreeNode(preorder[preorderStart]);
    for (var inorderIndex = inorderStart; inorderIndex < inorderEnd; inorderIndex++) {
        if (inorder[inorderIndex] == preorder[preorderStart]) {
            break;
        }
    }


    var leftLength = inorderIndex - inorderStart;

    if (leftLength > 0) {
        root.left = BuildTree(preorder, preorderStart + 1, preorderStart + 1 + leftLength, inorder, inorderStart, inorderIndex);
    }
    if (inorderEnd > inorderIndex + 1) {
        root.right = BuildTree(preorder, preorderStart + 1 + leftLength, preorderEnd, inorder, inorderIndex + 1, inorderEnd);
    }

    return root;
}

/*
Time complexity: O(n). Each node is processed once, and the map allows O(1)
 lookups for indices in the inorder array.
Space complexity: O(n). Space is used for the recursion stack and the map storing 
the indices of elements in the inorder array.
*/
export default function binaryTreeRebuildingFromTraversals(
    preorder,
    inorder
  ){
    let preorderIndex = 0;
  
    // Create a map to store the index of each value in the inorder array for quick lookup
    let inorderIndexMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
      inorderIndexMap.set(inorder[i], i);
    }
  
    // Helper function to recursively build the tree
    function arrayToTree(left, right){
      // Base case: if there are no elements to construct the tree
      if (left > right) {
        return null;
      }
  
      // Select the current element from preorder as the root and increment the index
      let rootValue = preorder[preorderIndex++];
      let root = new TreeNode(rootValue);
  
      // Build the left subtree using elements to the left of the root in the inorder array
      root.left = arrayToTree(left, inorderIndexMap.get(rootValue) - 1);
  
      // Build the right subtree using elements to the right of the root in the inorder array
      root.right = arrayToTree(inorderIndexMap.get(rootValue) + 1, right);
  
      // Return the constructed subtree rooted at this node
      return root;
    }
  
    // Start constructing the tree from the full range of the inorder array
    return arrayToTree(0, preorder.length - 1);
  }