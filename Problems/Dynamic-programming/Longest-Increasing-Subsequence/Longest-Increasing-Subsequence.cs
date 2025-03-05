using System;

// Using tabulation - Time: O(n^2)

/*

var lengthOfLIS = function(nums) {
    if (nums.length === 0) return 0;

    let sub = []; // This array stores the increasing subsequence

    for (let num of nums) {
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
};

This approach does not build the actual subsequence but instead maintains a "tracking" array (sub) that stores the smallest possible increasing subsequence at each length.

Initialize sub array:

sub keeps track of the smallest possible increasing subsequence.
Iterate through nums:

For each number num, use Binary Search to find its correct position in sub.
If it can replace an existing element in sub, replace it.
If it's larger than all elements, append it.
Binary Search to Find Insertion Point:

left and right are pointers for binary search.
mid = Math.floor((left + right) / 2) checks the middle element.
If sub[mid] < num, move left forward.
Otherwise, move right backward.
Replace or Append:

If a valid position (left < sub.length) is found, replace sub[left] with num.
If left === sub.length, append num (extend the sequence).
Return sub.length:

The size of sub represents the length of the longest increasing subsequence.
Example Walkthrough:
Input:
javascript
Copy
Edit
lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]);
Step-by-step sub Array Updates:
Step	num	Action	sub Array
1	10	Append 10	[10]
2	9	Replace 10 with 9	[9]
3	2	Replace 9 with 2	[2]
4	5	Append 5	[2, 5]
5	3	Replace 5 with 3	[2, 3]
6	7	Append 7	[2, 3, 7]
7	101	Append 101	[2, 3, 7, 101]
8	18	Replace 101 with 18	[2, 3, 7, 18]
Output:
javascript
Copy
Edit
4  // The longest increasing subsequence is [2, 3, 7, 18]
Time Complexity:
O(n log n) due to n iterations and log n binary search inside each iteration.
Space Complexity:
O(n) in the worst case (when sub stores all elements).





var lengthOfLIS = function(nums) {
    if (nums.length === 0) return 0;

    let n = nums.length;
    let dp = new Array(n).fill(1); // Initialize dp array with 1

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp); // Return the maximum value in dp array
};

Explanation:
Edge Case Handling:

If nums is empty, return 0.
Initialize dp Array:

dp[i] stores the length of the longest increasing subsequence 
ending at index i.
Each element starts as 1 (because every number itself is an 
increasing subsequence of length 1).
Nested Loops to Build dp Array:

The outer loop (i) iterates over each number in nums.
The inner loop (j) checks all previous numbers nums[j] before nums[i]:
If nums[j] < nums[i], we update dp[i] with the maximum possible 
LIS length ending at i.
This is done using dp[i] = Math.max(dp[i], dp[j] + 1).
Final Step:

The result is the maximum value in the dp array.
*/

public class Solution
{
    public int LengthOfLIS(int[] nums)
    {
        if (nums.Length == 0) return 0;

        int n = nums.Length;
        int[] dp = new int[n];
        
        for (int i = 0; i < n; i++)
        {
            dp[i] = 1; 
        }
        
        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (nums[j] < nums[i]) dp[i] = Math.Max(dp[i], dp[j] + 1);
            }
        }
        
        return dp.Max();
    }
}

class Program
{
    static void Main(string[] args)
    {
        int[] nums = { 31, -41, 59, 26, -53, 58, 97, -93, -23, 84 };

        Console.WriteLine("Input: nums = [" + string.Join(", ", nums) + "]");

        Solution sol = new Solution();
        int result = sol.LengthOfLIS(nums);
    
        Console.WriteLine("Output: " + result);
    }
}
