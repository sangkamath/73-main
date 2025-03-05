using System;


/*
O(n)
public class Solution {
    public bool CanJump(int[] nums) {
        int goalpost = nums.Length - 1;

        for(var i = nums.Length - 2; i >= 0; i--) {
            if(i + nums[i] >= goalpost) {
                goalpost = i;
            }
        }
        
        return goalpost == 0;
    }
}

*/
// Using tabulation - Time: O(n^2)



public class Solution
{
    public bool CanJump(int[] nums)
    {
        int n = nums.Length;
        bool[] dp = new bool[n];

        dp[0] = true;

        for (int i = 1; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (dp[j] && j + nums[j] >= i)
                {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n - 1];
    }
}

// Using greedy algorithm - Time: O(n)
//
// public class Solution
// {
//     public bool CanJump(int[] nums)
//     {
//         int last = 0;
//         for (int i = 0; i <= last; i++)
//         {
//             last = Math.Max(last, i + nums[i]);
//             if (last >= nums.Length - 1) return true;
//         }
//         return false;
//     }
// }

class Program
{
    static void Main()
    {
        int[] nums = { 2, 3, 1, 1, 4 };

        Console.WriteLine("Input: [{0}]", string.Join(", ", nums));

        Solution sol = new Solution();
        bool result = sol.CanJump(nums);

        Console.WriteLine("Output: {0}", result);
    }
}
