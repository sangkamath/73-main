/**
 * @param {number[]} nums
 * @return {number}
 * The time complexity of the `longestSubarray` function is O(n), 
 * where n is the length of the input array `nums`. This is because 
 * the function uses a single loop that iterates through the array 
 * with the `right` pointer, and the inner `while` loop only moves
 *  the `left` pointer forward. Each element is processed at most
 *  twice (once by `right` and once by `left`), resulting 
 * in a linear time complexity.

The space complexity is O(1) since the function uses a constant 
amount of extra space. It only maintains a few integer 
variables (`left`, `zeroCount`, and `maxLength`) 
regardless of the size of the input array. Thus, 
the space used does not grow with the input size.
 */
var longestSubarray = function(nums) {
    let left = 0;
    let zeroCount = 0;
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zeroCount++;
        }

        while (zeroCount > 1) {
            if (nums[left] === 0) {
                zeroCount--;
            }
            left++;
        }

        // Subarray length is (right - left + 1) minus 1 deletion
        maxLength = Math.max(maxLength, right - left);
    }

    return maxLength;
};