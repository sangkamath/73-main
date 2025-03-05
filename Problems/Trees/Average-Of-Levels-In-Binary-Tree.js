/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {
    if(root === null) return [];
    var queue = [root];
    var result = [];

    while(queue.length > 0) {
        var sum = 0;
        var n = queue.length;
        for(var i = 0;  i < n; i++) {
            let curr = queue.shift()
            sum += curr.val
            if (curr.left) queue.push(curr.left)
            if (curr.right) queue.push(curr.right)
        }
        var avg = sum/n;
        result.push(avg);
    }
    return result;
};