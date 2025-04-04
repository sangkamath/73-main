﻿using System;

// Using Manacher's algorithm - Time: O(n)
public class Solution
{
    /*
    
function expand(s, i, j) {
  var left = i;
  var right = j;

  while(left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }

  return right - left - 1;
}

export default function longestPalindromeSubstring(str) {
  var ans = [0,0];

  for(var i = 0; i < str.length; i++) {
    var oddLength = expand(str, i, i);
    if(oddLength > ans[1] - ans[0] + 1) {
      var dist = Math.floor(oddLength / 2);
      ans[0] = i - dist;
      ans[1] = i + dist;
    }

    var evenLength = expand(str, i, i+ 1);
      if(evenLength > ans[1] - ans[0] + 1) {
        var dist = (evenLength/2) - 1;
        ans[0] = i - dist;
        ans[1] = i + dist + 1;
      }
    }

  return str.substring(ans[0], ans[1] + 1);
}
    */

    public string LongestPalindrome(string s)
    {
        if (string.IsNullOrWhiteSpace(s) || s.Length == 1) 
            return s;

        int n2 = s.Length * 2 + 1;
        var s2 = new char[n2];

        for (int i = 0; i < s.Length; i++)
        {
            s2[i * 2] = '#';
            s2[i * 2 + 1] = s[i];
        }
        s2[n2 - 1] = '#';

        var p = new int[n2];
        int rangeMax = 0, center = 0;
        var longestCenter = 0;

        for (int i = 1; i < n2 - 1; i++)
        {
            if (rangeMax > i)
                p[i] = Math.Min(p[center * 2 - i], rangeMax - i);

            while (i - 1 - p[i] >= 0 && i + 1 + p[i] < n2 && s2[i - 1 - p[i]] == s2[i + 1 + p[i]])
                p[i]++;

            if (i + p[i] > rangeMax)
            {
                center = i;
                rangeMax = i + p[i];
            }

            if (p[i] > p[longestCenter])
                longestCenter = i;
        }

        var range = p[longestCenter];
        return s.Substring((longestCenter - range) / 2, range);
    }
}

class Program
{
    static void Main(string[] args)
    {
        string input = "babad"; 
        Console.WriteLine("Input: s = " + input);

        Solution sol = new Solution();
        string result = sol.LongestPalindrome(input);

        Console.WriteLine("Output: " + result);
    }
}