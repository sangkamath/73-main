/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * The time complexity of the `longestOnes` 
 * function is O(n), where n is the length of 
 * the input array `nums`. This is because the 
 * function uses a single loop that iterates through the array 
 * with the `right` pointer, and the `left` pointer only moves 
 * forward when necessary. Each element is processed at most 
 * twice (once by the `right` pointer and once by the `left`
 *  pointer), resulting in a linear time complexity.

The space complexity is O(1), as the function uses a constant
 amount of extra space regardless of the input size. The 
 variables `left`, `right`, `maxLen`, and `zeroCount` do 
 not depend on the size of the input array and are used
  to keep track of indices and counts. Therefore, the
   space used does not grow with the input size.
 */
var longestOnes = function(nums, k) {
    var left = 0, right = 0;
    var maxLen = 0;
    var zeroCount = 0;

    for(right = 0; right < nums.length; right++) {
        if(nums[right] === 0) {
            zeroCount++;
        }

        while(zeroCount > k) {
            if(nums[left] === 0) {
                zeroCount--;
            }

            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};