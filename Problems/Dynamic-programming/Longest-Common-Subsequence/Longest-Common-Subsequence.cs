using System;

// Using tabulation - Time: O(m*n)

public class Solution

    /*
    public int LongestCommonSubsequence(string text1, string text2) {
        
        int m = text1.Length;
        int n = text2.Length;

        if(m < n)
        {
            (m, n) = (n, m);
            (text1, text2) = (text2, text1);
        }  

        int[] dp = new int[n + 1];

        for(int i = 1; i <= m; i++)
        {
            int prev = 0;
            for(int j = 1; j <= n; j++)
            {
                int temp = dp[j];
                if(text1[i - 1] == text2[j - 1]) {
                    dp[j] = prev + 1;
                } else {
                    dp[j] = Math.Max(dp[j], dp[j-1]);
                }
                prev = temp;
            }
        }  

        return dp[n];
    }

    public int LongestCommonSubsequence(string s1, string s2) {
        
        int [,] dp = new int[s1.Length + 1, s2.Length + 1];
        for(int i = 1; i <= s1.Length; i++) {
            for(int j = 1; j <= s2.Length; j++) 
            {
                if(s1[i-1] == s2[j-1]) {
                    dp[i, j] = dp[i-1, j - 1]+1;
                }
                else{
                    dp[i, j] = Math.Max(dp[i-1, j], dp[i, j-1]);
                }
            }
        }
        return dp[s1.Length, s2.Length];
    }
    */
{
    public int LongestCommonSubsequence(string text1, string text2)
    {
        int m = text1.Length;
        int n = text2.Length;

        if (m < n)
        {
            (m, n) = (n, m);
            (text1, text2) = (text2, text1);
        }

        int[] dp = new int[n + 1];

        for (int i = 0; i < m; i++)
        {
            int prev = 0;

            for (int j = 0; j < n; j++)
            {

                int cur = dp[j + 1];
                if (text1[i] == text2[j])
                {
                    dp[j + 1] = prev + 1;
                }
                else
                {
                    dp[j + 1] = Math.Max(dp[j], dp[j + 1]);
                }
                prev = cur;
            }
        }

        return dp[n];
    }
}

class Program
{
    static void Main()
    {
        string text1 = "abcde";
        string text2 = "ace";

        Console.WriteLine("Input: text1 = " + text1 + ", text2 = " + text2);

        Solution sol = new Solution();
        int result = sol.LongestCommonSubsequence(text1, text2);

        Console.WriteLine("Output: " + result);
    }
}