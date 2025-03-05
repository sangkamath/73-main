using System;

// Using bottom-up approach - Time: O(n)

/*
class Solution {
    public int climbStairs(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
         int[] dp = new int[n+1];
        dp[0] = dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
}

*/

public class Solution
{
    public int ClimbStairs(int n)
    {
        int ans = 1;
        int prev = 1;

        while (--n > 0)
        {
            int temp = ans;
            ans += prev;
            prev = temp;
        }

        return ans;
    }
}

class Program
{
    static void Main(string[] args)
    {
        int n = 5;

        Console.WriteLine("Input: " + n);

        Solution sol = new Solution();
        int result = sol.ClimbStairs(n);

        Console.WriteLine("Output: " + result);
    }
}