/**
 * @param {number[]} nums
 * @return {number}
 * The time complexity of the `findPeakElement` function is O(log n). This is because the algorithm 
 * uses a binary search approach, which effectively halves the search space with each iteration. As a 
 * result, the number of comparisons grows logarithmically with the size of the input array.

The space complexity is O(1), as the algorithm only uses a constant amount of additional space 
for variables like `left`, `right`, and `mid`. It does not require any additional data structures 
that grow with the input size.
 */
var findPeakElement = function(nums) {
    let left = 0, right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[mid + 1]) {
            right = mid;  // Peak is on the left (including mid)
        } else {
            left = mid + 1;  // Peak is on the right
        }
    }

    return left;  // or return right; since left == right
};

/*
We don't need to check both neighbors at every step.
If nums[mid] > nums[mid + 1], move left.
Otherwise, move right.
The algorithm always converges to a peak.
*/