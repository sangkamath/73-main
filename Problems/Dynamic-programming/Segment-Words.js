/**
 * @param {string} str
 * @param {string[]} dict
 * @return {boolean}
 * The time complexity of the `segmentWords` function can be 
 * analyzed as follows:

1. The outer loop runs from 1 to n (where n is the length of the input
 string `str`), resulting in O(n) iterations.
2. The inner loop iterates over the possible lengths of words from
 `minLen` to `maxLen`. In the worst case, this could be O(m), where m
  is the maximum length of the words in the dictionary.
3. Inside the inner loop, the operations involve checking if a substring
 exists in the set and updating the `dp` array, both of which are O(1)
  operations.

Thus, the overall time complexity is O(n * m), where n is the length 
of the input string and m is the maximum length of the words in the 
dictionary.

The space complexity of the function is primarily determined by the 
`dp` array and the `wordSet`. The `dp` array has a size of n + 1, 
which contributes O(n) space. The `wordSet` is created from the 
dictionary, which can take O(k) space, where k is the number of 
words in the dictionary. Therefore, the overall space complexity
 is O(n + k). 

In summary, the time complexity is O(n * m) and the space complexity
 is O(n + k).
 */
export default function segmentWords(str, dict) {
    const wordSet = new Set(dict);
    const n = str.length;
    let minLen = Infinity;
    let maxLen = 0;

    for (const word of dict) {
        minLen = Math.min(minLen, word.length);
        maxLen = Math.max(maxLen, word.length);
    }

    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // empty string default


    for (let i = 1; i <= n; i++) {
        //This loop tries different segment lengths (len) for a valid split.
        //minLen and maxLen represent the minimum and maximum word lengths found in dict
        //i - len >= 0 ensures we don't go out of bounds while checking substrings.
        //!dp[i] stops checking if dp[i] is already marked true.
        for (let len = minLen; len <= maxLen && i - len >= 0 && !dp[i]; len++) {
            //dp[i - len]:Ensures that str[0:i-len] is already a valid segmentation.
            //This means the previous part of the string can be segmented using words from dict.
            //wordSet.has(str.substring(i - len, i))Checks if the substring str[i-len:i] is in 
            // wordSet (i.e., a valid word)
            //If both conditions are true, we mark dp[i] = true, meaning str[0:i] can be segmented.
            if (dp[i - len] && wordSet.has(str.substring(i - len, i))) {
                dp[i] = true;
            }
        }
    }

    return dp[n];
}