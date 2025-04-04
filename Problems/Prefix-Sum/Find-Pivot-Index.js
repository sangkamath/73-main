/**
 * @param {number[]} nums
 * @return {number}
 * The time complexity of the `pivotIndex` function is O(n), 
 * where n is the length of the input array `nums`. This is 
 * because the function iterates through the array twice:
 *  once to calculate the total sum of the elements and once 
 * to find the pivot index by comparing the left and right sums.

The space complexity is O(1), as the function uses a constant 
amount of extra space regardless of the input size. The only
 additional variables used are `total`, `leftSum`, and 
 `rightSum`, which do not depend on the size of the input array.
 */
var pivotIndex = function(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    let leftSum = 0;

    for (let i = 0; i < nums.length; i++) {
        const rightSum = total - leftSum - nums[i];
        if (leftSum === rightSum) {
            return i;
        }
        leftSum += nums[i];
    }

    return -1;
};