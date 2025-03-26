/*
Concatenation Check: If str1 + str2 !== str2 + str1, there's no common
 divisor string. This ensures both strings are composed of the same 
 repeating pattern.

Find GCD of Lengths: The length of the greatest common divisor string
 is given by gcd(str1.length, str2.length).

Extract the GCD String: The first gcdLength characters of str1 (or 
str2) represent the common divisor string.
1. The function first checks if `str1 + str2` is equal to `str2 + str1`.
 This operation takes O(n + m) time, where n is the length of `str1` 
 and m is the length of `str2`. This is because string concatenation 
 and comparison both require iterating through the characters of the strings.

2. The `gcd` function uses the Euclidean algorithm to compute the 
greatest common divisor of the lengths of the two strings. 
The time complexity of the Euclidean algorithm is 
O(log(min(n, m))), where n and m are the lengths of the two strings.

3. Finally, the function extracts a substring from `str1` of 
length equal to the GCD of the lengths. This operation takes 
O(gcdLength) time, which in the worst case can be O(min(n, m)).

Combining these steps, the overall time complexity is 
O(n + m + log(min(n, m))) for the concatenation and comparison, 
plus the GCD calculation and substring extraction.

The space complexity of the function is O(1) because it uses 
a constant amount of space for variables and does not create 
any additional data structures that scale with the input size.
The space used for the concatenated strings is not counted in
 the space complexity analysis since it is not stored; it is
  only used temporarily for the comparison.
*/

function gcdOfStrings(str1, str2) {
    // Function to get the greatest common divisor (GCD) using Euclidean algorithm
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    // Check if str1 + str2 === str2 + str1 (ensures a common divisor exists)
    if (str1 + str2 !== str2 + str1) return "";

    // Find GCD of the lengths of str1 and str2
    let gcdLength = gcd(str1.length, str2.length);

    // The largest common divisor string is the prefix of length gcdLength
    return str1.substring(0, gcdLength);
}