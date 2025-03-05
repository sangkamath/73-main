using System;

// Using bottom-up approach - Time: O(n)


/*

Approach

1. Check if the input string s is empty or starts with '0'. 
If so, return 0 because a valid decoding is not possible.

2. Initialize a dynamic programming array dp of size n + 1, 
where n is the length of the input string. Set dp[0] and dp[1] 
to 1, as there is one way to decode an empty string and a string of length 1.

3. Iterate through the string starting from index 2 up to n + 1.

Convert the current one-digit and two-digit substrings to integers.
If the one-digit substring is not '0', update dp[i] by adding dp[i - 1] 
because we can consider the current digit as a single character.
If the two-digit substring is between 10 and 26 (inclusive), update dp[i] 
by adding dp[i - 2] because we can consider the current two digits as a single character.
4.The final result is stored in dp[n], where n is the length of the input string.

Complexity

Time complexity:

O(n) where n is the length of the input string. We iterate through the string once.

Space complexity:

O(n) for the dynamic programming array dp.
/**
 * @param {string} s
 * @return {number}
var numDecodings = function(s) {
    if(!s || s[0] === '0') {
        return 0;
    }
    const n = s.length;
    const dp = new Array(n+1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for(let i = 2; i <= n; i++) {
        const oneDigit = parseInt(s[i-1]);
        const twoDigits = parseInt(s.substring(i-2, i));

        if(oneDigit !== 0) {
            dp[i] += dp[i-1];
        }

        if(10 <= twoDigits && twoDigits <= 26) {
            dp[i] += dp[i-2];
        }
    }

    return dp[n];
};
*/

public class Solution
{
    public int NumDecodings(string s)
    {
        int pre2 = 0, pre1 = 1;

        for (int i = 0; i < s.Length && pre1 != 0; i++)
        {
            int cur = 0;

            if (s[i] != '0')
            {
                cur += pre1;
            }

            if (i != 0 && s[i - 1] != '0' && (s[i - 1] - '0') * 10 + s[i] - '0' <= 26)
            {
                cur += pre2;
            }
            
            pre2 = pre1;
            pre1 = cur;
        }

        return pre1;
    }
}

class Program
{
    static void Main(string[] args)
    {
        string s = "12"; 
        Console.WriteLine("Input: s = " + s);

        Solution sol = new Solution();
        int result = sol.NumDecodings(s);

        Console.WriteLine("Output: " + result);
    }
}