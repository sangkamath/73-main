﻿using System;

// Using two pointers technique - Time: O(n)
/*
var isPalindrome = function(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;    
};
*/
public class Solution
{
    public bool IsPalindrome(string s)
    {
        int i = 0, j = s.Length - 1;
        
        while (i < j)
        {
            while (i < j && !char.IsLetterOrDigit(s[i]))
                i++;
            while (i < j && !char.IsLetterOrDigit(s[j]))
                j--;
            if (i < j && char.ToLower(s[i]) != char.ToLower(s[j]))
                return false;

            i++;
            j--;
        }

        return true;
    }
}

class Program
{
    static void Main(string[] args)
    {
        string s = "A man, a plan, a canal, Panama!";
        Console.WriteLine("Input: s = " + s);

        Solution sol = new Solution();
        bool result = sol.IsPalindrome(s);
        
        Console.WriteLine("Output: " + result);
    }
}