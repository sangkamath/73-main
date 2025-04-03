/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * Time Complexity: 
O(n) (single pass after initializing the first window sum)
Space Complexity: 
O(1) (constant space used)
 */
var findMaxAverage = function(nums, k) {
    let sum = 0;
    
    // Compute initial window sum
    for (let i = 0; i < k; i++) {
        sum += nums[i];
    }

    let maxSum = sum;

    // Slide the window across the array
    for (let i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k];  // Add new element, remove old
        maxSum = Math.max(maxSum, sum);
    }

    return maxSum / k;
};