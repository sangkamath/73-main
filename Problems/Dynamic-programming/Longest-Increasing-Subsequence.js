/**
 * @param {number[]} numbers
 * @return {number}
 * Time complexity: O(n2). For each element in the array, the 
 * algorithm iterates through all previous elements, resulting 
 * in a nested loop.
Space complexity: O(n). The dp array requires space proportional
 to the number of elements in the input array.
 */
export default function longestIncreasingSubsequence(numbers) {

    var dp = new Array(numbers.length).fill(1);

    for (var i = 1; i < numbers.length; i++) {
        for (var j = 0; j < i; j++) {
            if (numbers[j] < numbers[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}


/**
 * @param {number[]} numbers
 * @return {number}
 * Time complexity: O(n log n). Each number is processed once, and binary search 
 * on the sub array takes O(log n) for each number.
Space complexity: O(n). The sub array requires space proportional to the number
 of elements in the input array in the worst case.
 */
export default function longestIncreasingSubsequence(numbers) {

    if (numbers.length === 0) return 0;

    let sub = []; // This array stores the increasing subsequence

    for (let num of numbers) {
        let left = 0, right = sub.length - 1;

        // Perform binary search to find the correct position to replace
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (sub[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        // If left is at the end, append new element (extend subsequence)
        if (left < sub.length) {
            sub[left] = num;
        } else {
            sub.push(num);
        }
    }

    return sub.length; // The length of the subsequence is the answer
}