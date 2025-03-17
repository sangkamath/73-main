/**
 * @param {number[]} nums
 * @return {number}
 * The time complexity of the given function is O(n), where n is the length of 
 * the input array `nums`. This is because the function iterates through the 
 * array once, performing constant-time operations for each element.

The space complexity is O(n) as well, due to the use of the `dp` array, which 
stores the maximum amount of money that can be robbed up to each house. This 
array has a length equal to the number of houses (n). 

However, it is worth noting that the space complexity can be optimized to O(1)
 by using two variables to keep track of the maximum amounts instead of using 
 the entire `dp` array, since only the last two values are needed at any point 
 in time.
 */
var rob = function(nums) {
    var dp = Array(nums.length).fill(0);

    for(var i = 0; i < nums.length; i++) {
        if(i === 0) {
            dp[i] = nums[i];
        } else if(i=== 1){
            dp[i] = Math.max(dp[i -1], nums[i]);
        } else {
            dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1]);
        }
    }

    return dp[nums.length-1];
};


/**
 * @param {number[]} nums
 * @return {number}
 * The time complexity of the given function is O(n), where n is the number of elements 
 * in the input array `nums`. This is because the function iterates through the array
 *  once, performing a constant amount of work for each element.

The space complexity is O(1), as the function uses a fixed amount of space regardless 
of the input size. It only maintains a few variables (`prev1`, `prev2`, and `temp`) to 
store intermediate results, which do not scale with the size of the input. Thus, the 
function is efficient in both time and space.
 */
var rob = function(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = 0;  // Represents dp[i-2]
    let prev1 = 0;  // Represents dp[i-1]

    for (let num of nums) {
        let temp = prev1; // Store previous max before updating
        prev1 = Math.max(prev1, prev2 + num); // Max of (skip, rob)
        prev2 = temp; // Update previous values
    }

    return prev1; // Final max robbed amount
};