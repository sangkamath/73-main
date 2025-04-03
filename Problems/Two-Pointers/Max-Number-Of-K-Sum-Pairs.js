/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * The time complexity of the given function `maxOperations` is O(n log n)
 *  due to the sorting step, where n is the number of elements in the
 *  input array `nums`. After sorting, the while loop runs in O(n) 
 * time because each iteration either increments the `left` pointer 
 * or decrements the `right` pointer, ensuring that each element
 *  is processed at most once.

The overall time complexity is dominated by the sorting step, 
resulting in O(n log n).

The space complexity is O(1) if we consider the space used by 
the input array and the output as not contributing to additional 
space usage. However, if we consider the space used by the 
sorting algorithm, it could be O(n) in the case of certain 
sorting implementations that require additional space.
In the context of this function, since we are not using 
any additional data structures that scale with input 
size, we can conclude that the space complexity is O(1).
 */
var maxOperations = function(nums, k) {
    nums.sort((a, b) => a - b);
    var left = 0;
    var right = nums.length - 1;
    var count = 0;

    while(left < right) {
        if(nums[left] + nums[right] === k) {
            count++;
            left++;
            right--;
        } else if(nums[right] + nums[left] > k) {
            right--;
        } else if( nums[left] + nums[right] < k) {
            left++;
        }
    }

    return count;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * The time complexity of the `maxOperations` function 
 * is O(n), where n is the number of elements in the 
 * input array `nums`. This is because we iterate through
 *  the array once, performing constant-time operations 
 * (like map lookups and updates) for each element.

The space complexity is O(n) in the worst case, as we 
may store up to n elements in the frequency map if no
 pairs are found. In the best case, where all elements
  can form pairs, the space used would be less, but we 
  still consider the worst case for analysis. Thus,
   the overall space complexity is O(n).
 */
var maxOperations = function(nums, k) {
    let count = 0;
    let freq = new Map();

    for (let num of nums) {
        let complement = k - num;
        
        if (freq.get(complement) > 0) { 
            // Found a pair
            count++;
            freq.set(complement, freq.get(complement) - 1);
        } else { 
            // Store count of the current number
            freq.set(num, (freq.get(num) || 0) + 1);
        }
    }
    
    return count;
};