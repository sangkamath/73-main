/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * The time complexity of the `moveZeroes` function is O(n), where n
 *  is the number of elements in the input array `nums`. This is 
 * because the function iterates through the array twice: once to
 * move the non-zero elements to the front and once to fill the
 *  remaining positions with zeros. Each iteration processes 
 * each element of the array a constant number of times.

The space complexity is O(1), as the function modifies the input 
array in place and does not use any additional data structures 
that scale with the size of the input. The only extra space 
used is for a few variables (like `lastNonZeroIndex` and the 
loop counters), which do not depend on the size of the input array.
 */
var moveZeroes = function(nums) {
    let lastNonZeroIndex = 0; // Pointer for non-zero placement

    // First pass: Move non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[lastNonZeroIndex] = nums[i];
            lastNonZeroIndex++;
        }
    }

    // Second pass: Fill the remaining space with 0s
    for (let i = lastNonZeroIndex; i < nums.length; i++) {
        nums[i] = 0;
    }
};