/**
 * @param {TreeNode | null} root
 * @param {TreeNode | null} subRoot
 * @return {boolean}
 * g-O analysis
Time complexity: O(m.n). For each node in the larger tree (O(m)), the subtree
 is compared to the smaller tree (O(n)).
Space complexity: O(h). The space used is proportional to the height of the
 larger tree due to recursive calls.
 */
export default function binaryTreeSubtree(root, subRoot) {
    function isEqual(a, b) {
      if(a === null && b === null) return true;
      if(a === null || b === null ) return false;
      if( a != null && b != null && a.val === b.val
      && isEqual(a.left, b.left) && isEqual(a.right, b.right))
      return true;
  
      return false;
    }
  
   if (root === null) {
      return false;
    }
  
      if (isEqual(root, subRoot)) {
      return true;
    }
  
    // Recursively check the left and right subtrees of 'root'
    // If either subtree is identical to 'subRoot', return true
    return (
      binaryTreeSubtree(root.left, subRoot) ||
      binaryTreeSubtree(root.right, subRoot)
    );
  }