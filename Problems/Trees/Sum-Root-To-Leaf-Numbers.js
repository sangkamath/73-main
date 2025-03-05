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