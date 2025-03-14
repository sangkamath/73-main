/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * The time complexity of the searchMatrix function is O(log(m * n)), where m is the number of rows 
 * and n is the number of columns in the matrix. This is because the function uses a binary search 
 * approach, which divides the search space in half with each iteration, leading to logarithmic 
 * time complexity.

The space complexity is O(1), as the function uses a constant amount of extra space regardless of 
the input size. It only utilizes a few variables to keep track of indices and the mid-value, 
without requiring any additional data structures that grow with the input size.
 */
var searchMatrix = function(matrix, target) {
    let m = matrix.length;
    let n = matrix[0].length;
    let left = 0, right = m * n - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        let mid_val = matrix[Math.floor(mid / n)][mid % n];

        if (mid_val === target)
            return true;
        else if (mid_val < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return false;
};

/*
You have one array that happens to be a 1 dimensional array, which really, is just a 
long concatenation of items of a two dimensional array.

So, say you have a two dimensional array of size 5 x 3 (5 rows, 3 columns). And we 
want to make a one dimensional array. You need to decide whether you want to concatenate 
by rows, or by columns, for this example we'll say the concatenation is by rows. 
Therefore, each row is 3 columns long, so you need to think of your one-dimensional array
 as being defined in "steps" of 3. So, the length of your one dimensional array 
 will be 5 x 3 = 15, and now you need to find the access points.

So, say you are accessing the 2nd row and the 2nd column of your two dimensional 
array, then that would wind up being 3 steps (first row) + the number of steps in 
the second row, or 3 + 2 = 5. Since we are zero-based indexing that is -1, so that would be at index 4.
*/