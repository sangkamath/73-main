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
 * The time complexity of the `maxLevelSum` function is O(N),
 *  where N is the number of nodes in the binary tree. This 
 * is because the function performs a level-order traversal
 *  of the tree, visiting each node exactly once to calculate 
 * the sum of values at each level.

The space complexity is O(W), where W is the maximum width
of the tree at any level. In the worst case, the queue can 
hold all the nodes at the widest level of the tree. For a 
complete binary tree, this width can be up to O(N) in the 
case of a full tree, but in general, it is more commonly
 O(N/2) for the last level, which simplifies to O(N). However, 
 for balanced trees, the width is typically much smaller than N.
 */
var maxLevelSum = function(root) {
    if(!root) return 0;

    let maxSum = -Infinity;
    let maxLevel = 1;
    let level = 1;

    const queue = [root];

    while(queue.length > 0) {
        let levelSize = queue.length;
        let levelSum = 0;

        for(let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelSum += node.val;

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

        if(levelSum > maxSum) {
            maxSum = levelSum;
            maxLevel = level;
        }

        level++;
    }

    return maxLevel;
};