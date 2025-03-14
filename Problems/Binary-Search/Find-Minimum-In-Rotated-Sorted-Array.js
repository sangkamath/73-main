/**
 * @param {number[]} nums
 * @return {number}
 * The provided function `findMin` uses a binary search approach to find the minimum element in a 
 * rotated sorted array. 

Time Complexity: The time complexity of this algorithm is O(log n), where n is the number of elements
 in the input array `nums`. This is because the algorithm effectively halves the search space with 
 each iteration of the while loop, leading to a logarithmic number of comparisons.

Space Complexity: The space complexity is O(1), as the algorithm uses a constant amount of extra
 space. It only utilizes a few variables (`left`, `right`, and `mid`) for tracking indices, 
 regardless of the size of the input array. Thus, it does not require any additional data structures
that scale with the input size.
 */
var findMin = function(nums) {
    let left = 0, right = nums.length - 1;

while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
        left = mid + 1; // Min is in the right half
    } else {
        right = mid; // Min is in the left half (including mid)
    }
}

return nums[left]; // or nums[right], since left == right
};
