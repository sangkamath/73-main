var flatten = function(root) {
    let curr = root; // Start from the root
    while (curr) {  // Process nodes iteratively
        if (curr.left) { // If a left subtree exists
            let runner = curr.left; // Find the rightmost node of left subtree
            while (runner.right) runner = runner.right; 
            
            runner.right = curr.right; // Attach curr.right to rightmost node of left subtree
            curr.right = curr.left; // Move left subtree to right
            curr.left = null; // Set left to null
        }
        curr = curr.right; // Move to the next node
    }
};
/*
Step-by-step Execution on Example
Initial Tree Structure
markdown
Copy
Edit
       1
      / \
     2   5
    / \   \
   3   4   6
Start at curr = 1
curr.left = 2 exists, so we find runner (rightmost node of left subtree)
Finding runner in Left Subtree
markdown
Copy
Edit
       1
      /
     2 
    / \  
   3   4  
runner moves to 4, which is the rightmost node of 2's subtree.
Attach runner.right = curr.right (5), so 4's right now points to 5.
Rewiring Step
Set curr.right = curr.left (2), so 1’s right now points to 2.
Set curr.left = null.
New Structure After First Iteration:

markdown
Copy
Edit
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
Now, curr = 2, and the process repeats.
Eventually, every left subtree gets moved to the right.
Complexity Analysis
Time Complexity: O(N)
Each node is visited once, and we traverse its left subtree 
(finding runner takes at most height of tree 
O(H), but overall, we visit each node once).
Space Complexity: O(1)
No extra data structures are used—just pointers are modified in place.
Key Takeaways
✅ Uses in-place modification (no extra space).
✅ Iterative solution avoids recursion overhead.
✅ Mimics preorder traversal (root → left → right).
*/

/*
You can solve this problem using recursion by following the same preorder traversal order (root → left → right) and rewiring the tree as you go. Here’s how:

Recursive Approach
Base Case: If root is null, return.
Flatten Left and Right Subtrees: Recursively flatten root.left and root.right.
Rewire Pointers:
Store the original root.right in a temporary variable.
Move root.left to root.right.
Find the rightmost node of the new root.right (previously root.left).
Attach the original root.right (stored earlier) to this rightmost node.
Set root.left to null.
Recursive Code (JavaScript)
javascript
Copy
Edit
*/
var flatten = function(root) {
    if (!root) return; // Base case

    // Recursively flatten left and right subtrees
    flatten(root.left);
    flatten(root.right);

    // Store the original right subtree
    let tempRight = root.right;

    // Move left subtree to right
    root.right = root.left;
    root.left = null; // Set left to null

    // Find the rightmost node of the new right subtree
    let curr = root;
    while (curr.right) {
        curr = curr.right;
    }

    // Attach the original right subtree
    curr.right = tempRight;
};
/*
Step-by-Step Walkthrough
Input Tree
markdown
Copy
Edit
       1
      / \
     2   5
    / \   \
   3   4   6
Recursive Calls Execution
Start at 1

Recursively flatten 2
Recursively flatten 5
Flattening 2:

Recursively flatten 3
Recursively flatten 4
Once 3 and 4 are flattened, 2 is transformed into:

markdown
Copy
Edit
2
 \
  3
   \
    4
Back at 1:

root.right now becomes 2
Rightmost node of 2 (which is 4) gets 5 attached.
Final Structure (Flattened)

markdown
Copy
Edit
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
Time and Space Complexity
Time Complexity: 
𝑂
(
𝑁
)
O(N) (each node is visited once)
Space Complexity: 
𝑂
(
𝐻
)
O(H) (recursive stack depth, where 
𝐻
H is the height of the tree)
Worst case O(N) for a skewed tree.
Best case O(log N) for a balanced tree.
Key Takeaways
✅ Recursion naturally follows preorder traversal
✅ In-place modification (no extra space apart from recursion stack)
✅ Less iterative pointer manipulation compared to the iterative method
*/