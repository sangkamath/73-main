/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 * The time complexity of the provided code is O(N), 
 * where N is the number of nodes in the binary tree.
 *  This is because the algorithm performs a single traversal 
 * of the tree, visiting each node exactly once. During this 
 * traversal, it performs constant-time operations such as 
 * updating the current sum and checking/updating the 
 * prefix sum count in the map.
 * The space complexity is O(H), where H is the height of 
 * the binary tree. This space is used by the recursion 
 * stack due to the depth of the recursive calls. 
 * Additionally, the space used by the prefixSumCount map
 *  can grow up to O(N) in the worst case if all node values
 *  are unique and contribute to different prefix sums. 
 * However, in a balanced tree, the height H is log(N), 
 * making the space complexity O(log N) in that case. Overall,
 *  the dominant factor in space complexity is the recursion
 *  stack, leading to O(H) as the final space complexity.
 */
var pathSum = function(root, targetSum) {
    const solution = new Solution();
    return solution.pathSum(root, targetSum);
};

class Solution {
    constructor() {
        this.counter = 0;
        this.target = 0;
        this.prefixSumCount = new Map();
    }

    pathSum(root, targetSum) {
        this.target = targetSum;
        this.prefixSumCount.set(0, 1);
        this.helper(root, 0);
        return this.counter;
    }

    helper(root, curSum) {
        if(!root) return;

        curSum += root.val;
        if(this.prefixSumCount.has(curSum - this.target)) {
            this.counter += 
            this.prefixSumCount.get(curSum - this.target);
        }

        this.prefixSumCount.set(curSum, 
        (this.prefixSumCount.get(curSum) || 0) + 1);

        this.helper(root.left, curSum);
        this.helper(root.right, curSum);

        if(this.prefixSumCount.get(curSum) === 1) {
            this.prefixSumCount.delete(curSum);
        } else {
            this.prefixSumCount.set(curSum, 
            this.prefixSumCount.get(curSum) - 1);
        }
    }
}

/*
The time complexity of the given solution is O(N^2), 
where N is the number of nodes in the binary tree. This 
is because for each node, the helper function is called, 
and within that function, we iterate through the list of 
node values to calculate the current sum. In the worst case, 
the list can contain all the nodes in the path from the root
 to a leaf, leading to O(N) operations for each of the N nodes.
 The space complexity is O(H), where H is the height of the binary
  tree. This is due to the recursion stack used during the depth-first 
  traversal of the tree. Additionally, the list used to store the current 
  path can also grow to a maximum size of H, which contributes to the
   space complexity. In the case of a balanced tree, H would be 
   O(log N), while in the case of a skewed tree, H could be O(N).
*/
class Solution {
    constructor() {
        this.counter = 0;
        this.target = 0;
    }

    pathSum(root, targetSum) {
        this.target = targetSum;
        this.helper(root, []);
        return this.counter;
    }

    helper(root, list) {
        if (!root) return;

        // Add current node's value
        list.push(root.val);

        // Iterate the list backwards to get curSum
        let curSum = 0;
        for (let i = list.length - 1; i >= 0; i--) {
            curSum += list[i];
            if (curSum === this.target) {
                this.counter++;
            }
        }

        // Traverse left
        this.helper(root.left, list);

        // Traverse right
        this.helper(root.right, list);

        // Remove current node's value from the list (backtracking)
        list.pop();
    }
}
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

/*
public class Solution {
    int Counter = 0;
    int target;
    public int PathSum(TreeNode root, int targetSum) {
       target = targetSum;
       helper(root, new List<long>());
       return Counter;
    }

    private void helper(TreeNode root, List<long> list)
    {
        if(root == null) return;

        //add current node's val 
        list.Add(root.val);

        //iterate the list backwards to get curSum
        long curSum = 0;
        for(int i = list.Count - 1; i >=0; i--) {
            curSum += list[i];
            if(curSum == target) {
                Counter++;
            }
        }


        //traverse left
        helper(root.left, list);

        //traverse right
        helper(root.right, list);

        //remove current node's val off the list
        list.RemoveAt(list.Count - 1);
    }
}

    The brute-force O(N²) DFS approach works here because it:

Starts a new DFS at every node.
Only explores downward paths.
javascript
Copy
Edit
class Solution {
    pathSum(root, targetSum) {
        if (!root) return 0;
        return this.countPaths(root, targetSum) 
            + this.pathSum(root.left, targetSum) 
            + this.pathSum(root.right, targetSum);
    }

    countPaths(node, targetSum) {
        if (!node) return 0;
        let count = node.val === targetSum ? 1 : 0;
        count += this.countPaths(node.left, targetSum - node.val);
        count += this.countPaths(node.right, targetSum - node.val);
        return count;
    }
}
🔹 Time Complexity: O(N²) in the worst case.



class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    constructor() {
        this.count = 0;
        this.targetSum = 0;
    }

    pathSum(root, targetSum) {
        this.targetSum = targetSum;
        this.dfs(root);  // Start DFS from the root node
        return this.count;
    }

    // DFS traversal starting from each node
    dfs(node) {
        if (!node) return;
        
        // Check all paths starting from the current node
        this.checkPath(node, 0);
        
        // Recurse for left and right subtrees
        this.dfs(node.left);
        this.dfs(node.right);
    }

    // Check if any path starting from the current node adds up to targetSum
    checkPath(node, currentSum) {
        if (!node) return;

        currentSum += node.val;

        // If currentSum equals targetSum, increment the count
        if (currentSum === this.targetSum) {
            this.count++;
        }

        // Recurse for left and right children
        this.checkPath(node.left, currentSum);
        this.checkPath(node.right, currentSum);
    }
}
*/