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
 * @return {number}
 * The time complexity of the given function `sumNumbers`
 *  is O(N), where N is the number of nodes in the binary 
 * tree. This is because the function performs a depth-first 
 * search (DFS) traversal of the tree, visiting each node
 *  exactly once. For each node, it performs a constant
 *  amount of work (updating the number and checking for leaf nodes).
 * The space complexity is O(H), where H is the height of the binary tree.
 *  This space is used by the call stack during the DFS traversal.
 *  In the worst case, for a skewed tree (where each node has 
 * only one child), the height H can be equal to N, resulting 
 * in O(N) space. In a balanced tree, the height would be log(N), 
 * leading to O(log N) space complexity. Additionally, the `result` 
 * array can grow to hold all root-to-leaf numbers, but since it
 *  only stores numbers corresponding to leaf nodes, its contribution
 *  to space complexity is generally less significant compared to the call stack.
 */
var sumNumbers = function (root) {
    var result = [];

    if (root == null) return 0;

    var dfs = function (root, number) {
        if (root == null) return;
        number += root.val;

        if (root.left == null && root.right == null) {
            result.push(parseInt(number));
        }

        dfs(root.left, number);
        dfs(root.right, number);

        number.slice(-1);
    }

    var n = "";
    dfs(root, n);

    const sum = result.reduce(add, 0); 

    function add(accumulator, a) {
        return accumulator + a;
    }
    return sum;
};

/**
 * @param {TreeNode} root
 * @return {number}
 * The time complexity of the given function is O(N), 
 * where N is the number of nodes in the binary tree. 
 * This is because the function traverses each node 
 * exactly once during the depth-first search (DFS)
 *  to compute the sum of all root-to-leaf numbers.
 * The space complexity is O(H), where H is the height 
 * of the binary tree. This space is used by the call
 *  stack during the DFS traversal. In the worst case, 
 * for a skewed tree (where each node has only one child), 
 * the height H can be equal to N, leading to a space complexity 
 * of O(N). In a balanced tree, the height would be O(log N). 
 * Thus, the space complexity can vary depending on the structure of the tree.
 */
var sumNumbers = function(root) {
    return dfs(root, 0);
};

var dfs = function(node, num) {
    if (!node) return 0;
    if (!node.left && !node.right) {
        return num * 10 + node.val;
    }
    return dfs(node.left, num * 10 + node.val) + dfs(node.right, num * 10 + node.val);
};

/**
 * @param {TreeNode} root
 * @return {number}
 * The time complexity of the given function is O(N), 
 * where N is the number of nodes in the binary tree. 
 * This is because the function processes each node 
 * exactly once as it traverses the tree using a 
 * breadth-first search approach. Each node is enqueued 
 * and dequeued from the queue, leading to a linear
 *  relationship between the number of nodes and the 
 * operations performed.

The space complexity is also O(N) in the worst case. 
This occurs when the binary tree is completely 
unbalanced (e.g., a linked list), resulting in the 
queue holding all N nodes at once. In a balanced
 binary tree, the maximum number of nodes in the 
 queue would be proportional to the height of the 
 tree, which is O(log N), but since we consider 
 the worst case, we state the space complexity as O(N).
 */
var sumNumbers = function(root) {
    if (root === null) { return 0; }
    
    let sum = 0;
    let queue = [[root, 0]];
    
    while (queue.length > 0) {
        let [node, currentSum] = queue.shift();
        // I know the () aren't needed because PEDMAS, but I like them.
        // * 10 to shift the number one decimal to the left before adding.        
        currentSum = (currentSum * 10) + node.val;
        
        if (!node.left && !node.right) {
            sum += currentSum;
        }
        
        if (node.left) { queue.push([node.left, currentSum]); }
        if (node.right) { queue.push([node.right, currentSum]); }
    }
    
    return sum;   
};