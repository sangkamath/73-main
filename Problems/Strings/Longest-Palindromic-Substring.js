
function expand(s, i, j) {
    var left = i;
    var right = j;

    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }

    return right - left - 1;
}


/**
 * @param {string} str
 * @return {string}
 * Time complexity: O(n^2). For each character, the expansion may run in O(n) in
 *  the worst case, resulting in O(n2) overall.
Space complexity: O(1). The algorithm uses a constant amount of extra space, 
excluding the space required for the output.
 */
export default function longestPalindromeSubstring(str) {
    var ans = [0, 0];

    for (var i = 0; i < str.length; i++) {
        var oddLength = expand(str, i, i);
        if (oddLength > ans[1] - ans[0] + 1) {
            var dist = Math.floor(oddLength / 2);
            ans[0] = i - dist;
            ans[1] = i + dist;
        }

        var evenLength = expand(str, i, i + 1);
        if (evenLength > ans[1] - ans[0] + 1) {
            var dist = (evenLength / 2) - 1;
            ans[0] = i - dist;
            ans[1] = i + dist + 1;
        }
    }

    return str.substring(ans[0], ans[1] + 1);
}




/**
 * @param {string} str
 * @return {string}
 * The time complexity of the longestPalindromeSubstring function, which implements 
 * Manacher's Algorithm, is O(n), where n is the length of the input string.
 *  This efficiency arises because the algorithm processes each character in the 
 * transformed string (which has a length of approximately 2n + 1) in a single
 * pass, utilizing the properties of palindromes and the mirror effect to minimize
 *  redundant checks.

The space complexity of the function is O(n) as well. This is due to the 
additional space required for the transformed string (s2) and the array (p) 
that stores the palindrome radii. Both of these structures scale linearly 
with the size of the input string. Thus, the overall space complexity remains
 O(n).
 */
export default function longestPalindromeSubstring(str) {
    if (!str || str.length < 1) return s;

    // Step 1: Transform the string to handle even-length palindromes
    let s2 = '#';
    for (let char of str) {
        s2 += char + '#';
    }
    //To avoid handling even-length palindromes separately, we 
    // insert # between every character.
    //Now, every character (including #) acts as a potential 
    // palindromic center.

    const n2 = s2.length;
    const p = new Array(n2).fill(0); // Palindrome radii
    let center = 0, rangeMax = 0, longestCenter = 0;
    //p[i]: Stores the radius of the palindrome centered at index i.
    //rangeMax: Tracks the right boundary of the currently known 
    // largest palindrome.
    //center: The center index of this largest palindrome.
    //longestCenter: Tracks the center of the longest palindrome 
    // found so far.

    // Step 2: Manacher's Algorithm
    for (let i = 1; i < n2 - 1; i++) {
        // Mirror property
        //If i is within the current rangeMax, we use mirroring:
        //center * 2 - i gives the mirror index of i.
        //p[mirror] gives the radius of the mirrored palindrome.
        //We take the minimum of this radius or the space left before rangeMax.
        if (i < rangeMax) {
            p[i] = Math.min(p[2 * center - i], rangeMax - i);
        }

        // Expand around center i while characters on both sides match
        //i - 1 - p[i] >= 0 → Ensure we're within bounds.
        //i + 1 + p[i] < n2 → Ensure we don't exceed array size.
        //s2[i - 1 - p[i]] == s2[i + 1 + p[i]] → Expand as long as characters match.
        while (i - 1 - p[i] >= 0 && i + 1 + p[i] < n2 && s2[i - 1 - p[i]] === s2[i + 1 + p[i]]) {
            p[i]++;
        }

        //If the newly expanded palindrome extends past rangeMax, update center and rangeMax.
        // Update center and rangeMax if new palindrome expands past current range
        if (i + p[i] > rangeMax) {
            center = i;
            rangeMax = i + p[i];
        }

        // Track the longest palindrome found
        //If p[i] is the largest radius found so far, update longestCenter.
        if (p[i] > p[longestCenter]) {
            longestCenter = i;
        }
    }

    // Step 3: Extract the longest palindromic substring
    let start = Math.floor((longestCenter - p[longestCenter]) / 2);
    return str.substring(start, start + p[longestCenter]);
}