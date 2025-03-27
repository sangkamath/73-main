/*Approach
The iterator should return elements in in-order traversal (Left → Root → Right) order.
There are two main approaches:

Iterative (Stack-based) - Uses a stack to simulate the recursion for in-order traversal.
Morris Traversal (Threaded BST) - Optimized space complexity but modifies the tree.
Since we need an efficient next() and hasNext() method, we’ll use Approach 1 (Stack-based in-order traversal).

*/
class BSTIterator {
    constructor(root) {
        this.stack = [];
        this._leftmostInorder(root);  // Initialize stack with leftmost path
    }

    // Push all leftmost nodes into the stack
    _leftmostInorder(node) {
        while (node) {
            this.stack.push(node);
            node = node.left;
        }
    }

    // Returns the next smallest number
    /*
     The `next()` method has an average time complexity of O(1) for popping the
      top element from the stack and returning its value. However, if the popped
       node has a right child, the `_leftmostInorder()` method is called to push 
       all leftmost nodes of the right subtree onto the stack. In the worst case, 
       this can take O(h) time, where h is the height of the tree. Since the 
       height of a balanced binary search tree is O(log n), the average case 
       remains O(1), but in the worst case (for a skewed tree), it can be O(n).
    */
    next() {
        let topNode = this.stack.pop(); // Get the top of the stack (smallest element)
        
        // If there is a right subtree, process its leftmost nodes
        if (topNode.right) {
            this._leftmostInorder(topNode.right);
        }

        return topNode.val; // Return the next in-order value
    }

    // Returns whether we have a next smallest number
    /*
     The `hasNext()` method simply checks the length of the stack, 
     which is an O(1) operation.
    */
    hasNext() {
        return this.stack.length > 0;
    }

    /*
    The space complexity of the BSTIterator is O(h), where h is the height of the
     tree. This is because the stack stores nodes along the leftmost path from
      the root to the current node. In the worst case of a skewed tree, the height 
      can be O(n), leading to a space complexity of O(n). In a balanced tree, the 
      space complexity would be O(log n). 
    */
}
/*
How It Works
Constructor (BSTIterator(root))
Initializes a stack and pushes all the leftmost nodes of the BST.
next()
Pops the topmost node from the stack (smallest element).
If it has a right child, pushes all its leftmost descendants into the stack.
hasNext()
Returns true if the stack is not empty (i.e., there are more elements left).
Time & Space Complexity
Operation	Time Complexity	Space Complexity
next()	O(1) amortized	O(h) (height of tree)
hasNext()	O(1)	O(1)
Overall	O(N) for all next() calls	O(h)
Worst-case space complexity: 
𝑂
(
𝑁
)
O(N) (for a skewed tree).
Best-case space complexity: 
𝑂
(
log
⁡
𝑁
)
O(logN) (for a balanced BST).
Example Usage
javascript
Copy
Edit
// Example BST
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Sample BST
//        7
//       / \
//      3   15
//         /  \
//        9    20
let root = new TreeNode(7, 
                new TreeNode(3), 
                new TreeNode(15, new TreeNode(9), new TreeNode(20)));

let iterator = new BSTIterator(root);
console.log(iterator.next());    // 3
console.log(iterator.next());    // 7
console.log(iterator.hasNext()); // true
console.log(iterator.next());    // 9
console.log(iterator.hasNext()); // true
console.log(iterator.next());    // 15
console.log(iterator.hasNext()); // true
console.log(iterator.next());    // 20
console.log(iterator.hasNext()); // false
*/

var BSTIterator = function(root) 
{
    /*
The constructor `BSTIterator` performs an in-order traversal of the BST 
to populate the `arr` array with the values of the nodes. This traversal
 visits each node exactly once, resulting in a time complexity of O(n), 
 where n is the number of nodes in the tree.
    */
    this.arr = [];
    const go = (node) => {
        if (!node) return;
        go(node.left);
        this.arr.push(node.val);
        go(node.right);
    }
    go(root);
};
/*
The `next` method uses `shift()` to remove the first element from the array. 
The `shift()` operation has a time complexity of O(n) because it needs to
re-index the remaining elements in the array.
*/
BSTIterator.prototype.next = function() 
{
    return this.arr.shift();
};

//The `hasNext` method simply checks the length of the array, which is O(1).
BSTIterator.prototype.hasNext = function() 
{
    return this.arr.length > 0;
};

/*
The space complexity is O(n) because the `arr` array stores all the values of 
the nodes in the BST. This requires additional space proportional to the 
number of nodes in the tree.
*/

//SC - O(n)