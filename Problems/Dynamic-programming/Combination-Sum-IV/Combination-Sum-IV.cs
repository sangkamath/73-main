using System;
using System.Collections.Generic;

// Using top-down approach - Time: O(n * amount)

/*
If negative numbers are allowed in the given array, 
it significantly changes the dynamics of the problem. 
With the inclusion of negative numbers, an infinite
 number of combinations can sum up to the target number. 
 For example, if the target number is 4, you can reach it 
 with the sequence [4, -1, 1], [4, -1, -1, 1, 1], [4, -1, -1, -1, 1, 1, 1] 
 and so on. In other words, you can add and remove the same negative 
 number and its positive counterpart any number of times.

This would pose a problem to your algorithm since it cannot 
handle an infinite number of combinations. Therefore, if 
negative numbers were allowed, you'd have to add some 
limitations or additional rules to keep the problem manageable.

For instance, you could add a rule that each number can 
only be used once, or a certain fixed number of times. 
Alternatively, you could specify that the solution should 
return the combination with the smallest number of elements,
 or the one that uses the smallest numbers.

The constraints to be added will largely depend on the 
specifics of the problem you are trying to solve. In most 
cases, you'll need to add constraints that prevent infinite loops 
and make the problem solvable within a reasonable time frame.

Method 1: Dynamic Programming

The Ingenuity of Dynamic Programming

Dynamic Programming (DP) is a magical methodology that builds 
solutions from the ground up, much like constructing a pyramid. 
In this scenario, think of the target as the peak of your pyramid. 
You start with the foundational layer, which is your base case, and 
then build upon it, layer by layer, until you reach the apex. 
Each layer or block symbolizes a sub-problem that contributes to 
the solution of the overarching problem.

An In-Depth, Step-by-Step Guide

Initialization and Base Case:

Create an array dp with target + 1 slots, each initialized to zero.
This array will serve as our memory storage where dp[i] represents the 
number of combinations that can sum up to i.
Now, set dp[0] to 1. This serves as the base case, representing that 
there is one way to reach the target sum of zero: by using zero itself.
Filling up the DP Array (Iterative Computation):

Start iterating from 1 up to target. For each i, the aim is to fill dp[i] 
with the number of combinations that can make up that sum.
To find dp[i], you need to look at the previously calculated dp values. 
How? For every number num in nums, you add dp[i - num] to dp[i] (given that i - num >= 0).
In simpler terms, for each i, you're summing up the number of ways to 
form i by looking at how you could have arrived at that sum using smaller numbers.
Reaching the Summit (Return the Result):

After the loop concludes, you've successfully built your pyramid. At 
its peak, dp[target] will hold the total number of combinations that make up the target sum.
Nuances of Time and Space Complexity

Time Complexity: O(N * target). The outer loop runs target times, and 
for each iteration, we potentially check all N numbers in nums.
Space Complexity: O(target). The array dp will have target + 1 elements, 
each requiring constant space. So the overall space complexity is linear 
in terms of the target value.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 

var combinationSum4 = function(nums, target) {
    const dp = Array(target+1).fill(0);
    dp[0] = 1;

    for(let i = 1; i <= target; i++) {
        for(const num of nums) {
            if(i - num >= 0) {
                dp[i] += dp[i-num];
            }
        }
    }

    return dp[target];
};

Memoization is an optimization technique that stores the results of expensive 
function calls and returns the cached result when the same inputs occur again. 
Think of it as a wise elder who recalls past tales to shed light on current
 challenges. In this context, we utilize memoization to remember the number 
 of combinations for smaller targets, preventing the need for redundant,
  time-consuming recalculations.

A Detailed Walkthrough

Preprocessing:

First and foremost, we sort the nums array. Why do we do this? 
Sorting allows us to iterate over the numbers in an ascending order. 
This order plays a crucial role in our early exit strategy during the 
recursive calls, ensuring we don't waste time on numbers that won't 
contribute to our solution.
Base Case and Early Exit:

If n = 0, this means we've successfully found a combination that 
sums up to the target. Hence, we return 1.
If n < nums[0], given that nums is sorted, this means no combination 
can be formed to achieve the current n. So, we immediately return 0, 
optimizing our recursion.
The Recursive Magic:

For each value of n, we delve into its past (i.e., make recursive calls) 
to uncover the pathways that led to n.
As we iterate over the sorted nums, if n - num < 0, we hit a break. 
This is because, with a sorted array, if the current number causes the 
difference to be negative, all subsequent numbers will do the same, 
making them irrelevant for the current n. Thus, we break out early, 
optimizing our process.
Memoization in Action:

After calculating the number of combinations for a particular n, 
we store this value in a dictionary. This ensures that if we encounter 
the same n again, we can instantly retrieve its result rather than recalculating, 
saving precious time.
Returning the Final Verdict:

Once all recursive calls are settled, the answer for our primary target 
will be waiting in our memoization dictionary, ready to be unveiled.
Delving into the Time and Space

Time Complexity: O(N * target). Each unique target value is calculated once.
 For each calculation, we might iterate over all N numbers in nums.
Space Complexity: O(target). This space is primarily used for our 
memoization dictionary, which can store up to target unique values.
*/

public class Solution
{
    private Dictionary<int, int> m = new Dictionary<int, int> { { 0, 1 } };

    private int Dp(int[] nums, int target)
    {
        if (m.ContainsKey(target)) return m[target];

        int cnt = 0;

        foreach (int n in nums)
        {
            if (n > target) break;
            cnt += Dp(nums, target - n);
        }
        m[target] = cnt;

        return cnt;
    }

    public int CombinationSum4(int[] nums, int target)
    {
        Array.Sort(nums);
        return Dp(nums, target);
    }
}
class Program
{
    static void Main(string[] args)
    {
        int[] nums = { 1, 2, 3 };
        int target = 4;

        Console.WriteLine("Input: nums = [" + string.Join(", ", nums) + "], target = " + target );

        Solution sol = new Solution();
        int result = sol.CombinationSum4(nums, target);

        Console.WriteLine("Output: " + result);
    }
}
