/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 * The time complexity of the function is O(n), 
 * where n is the number of nodes in the tree.
 *  This is because each node is processed 
 * exactly once when it is dequeued from the queue.
 * The operations performed for each node 
 * (checking its children and connecting the next pointer)
 *  are constant time operations.
 * The space complexity is O(m), where m is the maximum 
 * number of nodes at any level of the tree. In a 
 * perfect binary tree, this maximum occurs at the 
 * last level, which can have up to n/2 nodes. Therefore,
 *  the space complexity can also be considered O(n) 
 * in the worst case, particularly when the tree is 
 * completely filled. However, since the queue will 
 * not hold more than the number of nodes at the last 
 * level, O(m) is a more precise representation.
 */
var connect = function(root) {
    if(!root) { return null;}
    let queue = [root];
    while(queue.length > 0) {
        let size = queue.length;

        for(let i = 0; i < size; i++) {
            let node = queue.shift();
            if( i < size - 1) {
                node.next = queue[0];
            }
            if(node.left) { queue.push(node.left);}
            if(node.right) { queue.push(node.right);}
        }
    }
    return root;
};