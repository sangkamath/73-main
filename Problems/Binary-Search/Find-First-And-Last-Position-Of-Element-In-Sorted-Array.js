
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * The time complexity of the `searchRange` function is O(log n), where n is the number of 
 * elements in the input array `nums`. This is because both the `findFirst` and `findLast` 
 * functions utilize binary search, which operates in logarithmic time. Each function 
 * performs a single binary search, resulting in a total of O(log n) for both searches 
 * combined.

The space complexity of the function is O(1), as it uses a constant amount of extra space 
regardless of the input size. The variables used for indexing and storing results do not 
depend on the size of the input array. Thus, the overall space complexity remains constant.
 */
var searchRange = function(nums, target) {
    function findFirst(nums, target) {
        let left = 0, right = nums.length - 1, first = -1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                first = mid;  // Potential first occurrence
                right = mid - 1;  // Keep searching left
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return first;
    }

    function findLast(nums, target) {
        let left = 0, right = nums.length - 1, last = -1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                last = mid;  // Potential last occurrence
                left = mid + 1;  // Keep searching right
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return last;
    }

    return [findFirst(nums, target), findLast(nums, target)];
};