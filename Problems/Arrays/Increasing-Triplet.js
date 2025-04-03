function increasingTriplet(nums) {
    let first = Infinity, second = Infinity;

    for (let num of nums) {
        if (num <= first) {
            first = num; // Smallest number found
        } else if (num <= second) {
            second = num; // Second smallest number found
        } else {
            return true; // A third number greater than first and second is found
        }
    }

    return false; // No increasing triplet found
}
/*
Time Complexity: O(n) (single pass through the array).

Space Complexity: O(1) (only a few variables used).
*/



/**
 * @param {number[]} nums
 * @return {boolean} EXCEEDS TIME LIMIT
 * The time complexity of the given function `increasingTriplet` is
 *  O(n^2) in the worst case. This is because for each element
 *  in the array (up to n-2), the function uses a nested while
 *  loop that can potentially iterate through the remaining
 *  elements in the array. In the worst case, this results 
 * in a quadratic number of comparisons.

The space complexity is O(1) since the function uses a constant
 amount of extra space regardless of the input size.
  It only utilizes a few variables (`minSoFar`, `left`, 
  `right`, and the loop index `i`) to keep track of the 
  state during execution, and does not use any additional 
  data structures that grow with the input size.
 */
var increasingTriplet = function (nums) {

    if (nums.length < 3) {
        return false;
    }

    var minSoFar = nums[0];
    for (var i = 0; i < nums.length - 2; i++) {
        minSoFar = Math.min(minSoFar, nums[i]);
        var left = i + 1;
        var right = nums.length - 1;
        while (left < right) {
            if (nums[left] < nums[right] && nums[left] > minSoFar) {
                return true;
            }
            if (nums[left] > minSoFar) {
                right--;
            } else {
                left++;
            }
        }
    }

    return false;
};