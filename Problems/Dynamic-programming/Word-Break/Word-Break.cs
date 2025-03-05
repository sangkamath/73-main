using System;
using System.Collections.Generic;

// Using bottom-up approach - Time: O(n^2)

/*
var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict); // Convert wordDict to a Set for quick lookups
    const n = s.length;
    let minLen = Infinity, maxLen = 0;

    // Determine the shortest and longest word in the dictionary
    for (const word of wordDict) {
        minLen = Math.min(minLen, word.length);
        maxLen = Math.max(maxLen, word.length);
    }

    // Initialize DP array (dp[i] means s[0..i-1] can be segmented)
    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // Empty string is always segmentable

    // Fill the DP table
    for (let i = 1; i <= n; i++) {
        for (let len = minLen; len <= maxLen && i - len >= 0 && !dp[i]; len++) {
            if (dp[i - len] && wordSet.has(s.substring(i - len, i))) {
                dp[i] = true;
            }
        }
    }

    return dp[n]; // If dp[n] is true, the string can be segmented
};

Explanation:
This function checks whether a given string s can be broken into words 
that exist in wordDict. It follows a dynamic programming (DP) approach.

Step-by-Step Breakdown:
Convert wordDict into a Set (wordSet)
This allows quick lookup (O(1) average time complexity per check).
Find minLen and maxLen of words in the dictionary
This helps optimize the DP search by limiting unnecessary checks.
Initialize DP table (dp array of size n + 1)
dp[i] means s.substring(0, i) can be segmented into valid words.
Base case: dp[0] = true (empty string is always valid).
Iterate over the string (i from 1 to n)
Try breaking s[0..i] using word lengths from minLen to maxLen.
If dp[i - len] is true (previous segment is valid) and s.substring(i - len, i)
 exists in wordSet, mark dp[i] = true.
Return dp[n]
If dp[n] is true, then s can be completely segmented.

Time and Space Complexity
Time Complexity: 
𝑂
(
𝑁
×
𝑊
)
O(N×W)
N is the length of s, W is the average number of
 words checked per position.
Space Complexity: 
𝑂
(
𝑁
+
𝐷
)
O(N+D)
O(N) for dp[] array, O(D) for wordSet.
*/

public class Solution
{
    public bool WordBreak(string s, IList<string> wordDict)
    {
        HashSet<string> st = new HashSet<string>(wordDict);
        int n = s.Length, minLen = int.MaxValue, maxLen = 0;

        foreach (string w in wordDict)
        {
            minLen = Math.Min(minLen, w.Length);
            maxLen = Math.Max(maxLen, w.Length);
        }
        
        bool[] dp = new bool[n + 1];
        dp[0] = true;
        
        for (int i = 1; i <= n; i++)
        {
            for (int len = minLen; len <= maxLen && i - len >= 0 && !dp[i]; len++)
            {
                dp[i] = dp[i - len] && st.Contains(s.Substring(i - len, len));
            }
        }

        return dp[n];
    }
}

class Program
{
    static void Main(string[] args)
    {
        string s = "leetcode";
        IList<string> wordDict = new List<string> { "leet", "code" };

        Console.Write("Input: s = " + s + ", wordDict = [");
        foreach (string w in wordDict)
        {
            Console.Write(w + "");
            if (w != wordDict[wordDict.Count - 1])
            {
                Console.Write(", ");
            }
        }
        Console.WriteLine("]");

        
        Solution sol = new Solution();
        bool result = sol.WordBreak(s, wordDict);
        
        Console.WriteLine("Output: " + result);
    }
}
