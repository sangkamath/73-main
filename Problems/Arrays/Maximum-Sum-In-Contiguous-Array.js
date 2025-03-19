/**
 * @param {number[]} numbers
 * @return {number}
 */
export default function maxSumSubArray(numbers) {
    var ans = numbers[0];

    for (var i = 1; i < numbers.length; i++) {
        numbers[i] = numbers[i] + Math.max(numbers[i - 1], 0);
        ans = Math.max(ans, numbers[i]);
    }

    return ans;
}

/*
Time complexity: O(n). Each element is visited once.
Space complexity: O(1). No additional space is required apart from a few variables.
*/
export default function maxSumSubArray(numbers) {
    let currentSum = 0;
    let maxSum = -Infinity; // Use -Infinity to represent the smallest possible number

    for (let num of numbers) {
        // Update current sum, considering starting a new subarray if necessary
        currentSum = Math.max(num, currentSum + num);
        // Update max sum if current sum is larger
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

/*
Time complexity: O(n²). There are two nested loops being used to consider all possible subarrays.
Space complexity: O(1). Only a constant amount of extra space is used.
*/
export default function maxSumSubArray(numbers) {
    // Initialize the maximum subarray sum to negative infinity
    let maxSubarray = Number.NEGATIVE_INFINITY;

    // Iterate through each element in the array
    for (let i = 0; i < numbers.length; i++) {
        // Initialize current subarray sum to zero
        let currentSubarray = 0;

        // Iterate through the subarray starting from index i
        for (let j = i; j < numbers.length; j++) {
            // Add the current element to the current subarray sum
            currentSubarray += numbers[j];

            // Update the maximum subarray sum if the current subarray sum is larger
            maxSubarray = Math.max(maxSubarray, currentSubarray);
        }
    }

    // Return the maximum subarray sum found
    return maxSubarray;
}