/*
 * Given two strings s and t, return true if s is a subsequence of t,
 *  or false otherwise.

A subsequence of a string is a new string that is 
formed from the original string by deleting some (can be none) 
of the characters without disturbing the relative positions 
of the remaining characters. (i.e., "ace" is a subsequence of 
"abcde" while "aec" is not).

 

Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false
 

Constraints:

0 <= s.length <= 100
0 <= t.length <= 104
s and t consist only of lowercase English letters.
 

Follow up: Suppose there are lots of incoming s, 
say s1, s2, ..., sk where k >= 109, and you want to 
check one by one to see if t has its subsequence. In 
this scenario, how would you change your code?

For the follow-up scenario where we have many queries (s1, s2, ..., sk) 
and want to check whether each s is a subsequence of t, we need an 
efficient way to preprocess t to allow fast queries.

Efficient Approach: Preprocessing + Binary Search
Instead of checking each query s against t in O(|t|) time, we can 
preprocess t into an index map for quick lookups, allowing binary 
search for each character in s.

Step 1: Preprocess t (O(|t|))
Build an index map of t where each character in t maps to a sorted 
list of indices where it appears.
This allows binary search to efficiently find the next valid 
position of a character.
Example:

js
Copy
Edit
t = "abcde";
indexMap = {
  'a': [0],
  'b': [1],
  'c': [2],
  'd': [3],
  'e': [4]
}
Step 2: Process Each Query Efficiently (O(|s| log |t|))
For each s_i, check whether it is a subsequence of t using binary search on the index map.
Use binary search (upper_bound) to find the next valid occurrence of each character in s_i.
Implementation in JavaScript
js
Copy
Edit
class SubsequenceChecker {
    constructor(t) {
        this.indexMap = new Map(); // Stores character -> list of indices
        
        // Preprocess `t`
        for (let i = 0; i < t.length; i++) {
            if (!this.indexMap.has(t[i])) {
                this.indexMap.set(t[i], []);
            }
            this.indexMap.get(t[i]).push(i);
        }
    }

    // Checks if `s` is a subsequence of `t`
    isSubsequence(s) {
        let prevIndex = -1; // Keeps track of last matched position in `t`
        
        for (let char of s) {
            if (!this.indexMap.has(char)) return false; // Character not in `t`

            let indices = this.indexMap.get(char);
            let nextPos = this.upperBound(indices, prevIndex);

            if (nextPos === indices.length) return false; // No valid next position
            
            prevIndex = indices[nextPos]; // Move to the next valid index
        }
        return true;
    }

    // Binary search to find the first element > prevIndex
    upperBound(arr, val) {
        let left = 0, right = arr.length;
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] > val) right = mid;
            else left = mid + 1;
        }
        return left; // First position where arr[i] > val
    }
}

// Example Usage
const checker = new SubsequenceChecker("abcde");
console.log(checker.isSubsequence("ace")); // true
console.log(checker.isSubsequence("aec")); // false
Time & Space Complexity
Operation	Complexity
Preprocessing t	**O(
Query (s)	**O(
Space Complexity	**O(
Much faster than checking s in O(|t|) for each query, especially 
when k is large (k ≥ 10⁹).
Binary search (O(log |t|)) makes queries significantly more efficient.
 */


class Solution {
    public boolean isSubsequence(String s, String t) {
        int sp = 0;
        int tp = 0;

        while (sp < s.length() && tp < t.length()) {
            if (s.charAt(sp) == t.charAt(tp)) {
                sp++;
            }
            tp++;
        }

        return sp == s.length();        
    
    }
}
