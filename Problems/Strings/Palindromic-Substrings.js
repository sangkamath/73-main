function isPalindrome(str, low, high) {
    // Continue checking as long as the left index is less than the right index
    while (low < high) {
        // If characters at low and high do not match, it's not a palindrome
        if (str[low] !== str[high]) {
            return false;
        }
        // Move towards the center
        low++;
        high--;
    }
    // If all characters matched, it's a palindrome
    return true;
}

/*
Time complexity: O(n^3). There are O(n^2) substrings, and checking each
 substring for palindrome takes O(n) time.
Space complexity: O(1). The algorithm uses constant space aside 
from the input string and loop variables.
*/
export default function countPalindromicSubstrings(str) {
    let ans = 0;

    // Iterate over all possible starting points of substrings
    for (let low = 0; low < str.length; low++) {
        // Iterate over all possible ending points of substrings starting at low
        for (let high = low; high < str.length; high++) {
            // Increment ans if the substring s[low...high] is a palindrome
            ans += isPalindrome(str, low, high) ? 1 : 0;
        }
    }

    return ans;
}

/*
Time complexity: O(n^2). The outer loop iterates through substring
 lengths, and the inner loop iterates through all starting 
 indices for substrings.
Space complexity: O(n^2). The dp table requires O(n2) space 
to store results for all substrings.
*/
export default function countPalindromicSubstrings(str) {
    const n = str.length;
    let ans = 0;

    // If the string is empty, return 0
    if (n === 0) {
        return 0;
    }

    // Initialize a 2D array (dp) to store whether substrings are palindromic
    const dp = Array.from({ length: n }, () => Array(n).fill(false));

    // Base case: single letter substrings are always palindromes
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
        ans++; // Count single letter palindromes
    }

    // Base case: check double letter substrings
    for (let i = 0; i < n - 1; i++) {
        dp[i][i + 1] = str[i] === str[i + 1];
        ans += dp[i][i + 1] ? 1 : 0; // Count double letter palindromes
    }

    // Check all other substrings of length 3 to n
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1; // Ending index of the substring
            dp[i][j] = dp[i + 1][j - 1] && str[i] === str[j];
            ans += dp[i][j] ? 1 : 0; // Count palindromes of length len
        }
    }

    return ans;
}


/*
Time complexity: O(n2). For each character, the expansion can span the
 entire string in the worst case, leading to O(n) expansions for O(n) 
 centers.
Space complexity: O(1). The algorithm uses constant extra space for 
variables and does not require additional data structures.

*/
export default function countPalindromicSubstrings(str) {
    let ans = 0;

    // Iterate through each character in the string
    for (let i = 0; i < str.length; i++) {
        // Count odd-length palindromes with a single character center
        ans += countPalindromesAroundCenter(str, i, i);

        // Count even-length palindromes with consecutive characters as the center
        ans += countPalindromesAroundCenter(str, i, i + 1);
    }

    return ans;
}

function countPalindromesAroundCenter(
    str,
    low,
    high,
) {
    let ans = 0;

    // Expand around the center as long as the characters at the edges match
    while (low >= 0 && high < str.length) {
        if (str[low] !== str[high]) {
            break; // Stop if characters don't match
        }

        // Expand the window outward
        low--;
        high++;

        // Increment the palindrome count
        ans++;
    }

    return ans;
}