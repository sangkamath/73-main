using System;

// Using bottom-up approach - Time: O(n * amount)

/*
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
var coinChange = function(coins, amount) {
    let n = coins.length;
    let inf = Number.MAX_VALUE;
    let dp = Array(10001).fill(inf);
    dp[0] = 0;
    for(let t = 1; t <= amount; t++) {
        for(var i = 0; i < n; i++) {
            dp[t] = Math.min(dp[t], t - coins[i] >= 0 ? 
            1 + dp[t-coins[i]] : inf);
        }
    }

    return dp[amount] == inf ? -1 : dp[amount];
};
*/

public class Solution2 {
    public int CoinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Array.Fill(dp, amount + 1);  // Initialize with a value greater than any possible minimum
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            foreach (int coin in coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.Min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}

public class Solution
{
    public int CoinChange(int[] coins, int amount)
    {
        int n = coins.Length;
        int inf = 0x3f3f3f3f; // inf = 1061109567
        int[] dp = new int[10001];
        Array.Fill(dp, inf);
        dp[0] = 0;

        for (int t = 1; t <= amount; t++)
        {
            for (int i = 0; i < n; i++)
            {
                dp[t] = Math.Min(dp[t], t - coins[i] >= 0 ? 1 + dp[t - coins[i]] : inf);
            }
        }

        return dp[amount] == inf ? -1 : dp[amount];
    }
}

class Program
{
    static void Main(string[] args)
    {
        int[] coins = { 1, 2, 5 };
        int amount = 11;

        Console.WriteLine("Input: coins = [" + string.Join(", ", coins) + "], amout = " + amount);

        Solution sol = new Solution();
        int result = sol.CoinChange(coins, amount);


        Console.WriteLine("Output: "+ result);
    }
}
