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
    next() {
        let topNode = this.stack.pop(); // Get the top of the stack (smallest element)
        
        // If there is a right subtree, process its leftmost nodes
        if (topNode.right) {
            this._leftmostInorder(topNode.right);
        }

        return topNode.val; // Return the next in-order value
    }

    // Returns whether we have a next smallest number
    hasNext() {
        return this.stack.length > 0;
    }
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
    this.arr = [];
    const go = (node) => {
        if (!node) return;
        go(node.left);
        this.arr.push(node.val);
        go(node.right);
    }
    go(root);
};
BSTIterator.prototype.next = function() 
{
    return this.arr.shift();
};
BSTIterator.prototype.hasNext = function() 
{
    return this.arr.length > 0;
};

//SC - O(n)