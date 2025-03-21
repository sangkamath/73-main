/**
 * @param {string} str
 * @param {number} k
 * @return {number}
 * Time complexity: O(n). The end pointer iterates through the string once,
 *  and the start pointer adjusts as needed, resulting in linear time.
Space complexity: O(1). The frequencyMap is of constant size (26),
 independent of the input string length.
 */
export default function longestSubstringReplacement(str, k) {
    let start = 0;
    const frequencyMap = new Array(26).fill(0);
    let maxFrequency = 0;
    let longestSubstringLength = 0;

    for (let end = 0; end < str.length; end++) {
        // Calculate the relative order of the current character entering the window
        const currentChar = str.charCodeAt(end) - 'A'.charCodeAt(0);

        // Increment the frequency of the current character
        frequencyMap[currentChar] += 1;

        // Update the maximum frequency we've seen in any window
        maxFrequency = Math.max(maxFrequency, frequencyMap[currentChar]);

        // If the window is invalid, move the start pointer to the right
        const isValid = end + 1 - start - maxFrequency <= k;
        if (!isValid) {
            const outgoingChar = str.charCodeAt(start) - 'A'.charCodeAt(0);

            // Decrease the frequency of the outgoing character
            frequencyMap[outgoingChar] -= 1;

            // Move the start pointer forward
            start += 1;
        }

        // The window is valid at this point, update the length of the longest valid substring
        longestSubstringLength = end + 1 - start;
    }

    return longestSubstringLength;
}


/*
Time complexity: O(n log n). The binary search performs O(log n) 
iterations, and each iteration calls canMakeValidSubstring, which
 runs in O(n).
Space complexity: O(1). The frequency map is of fixed size (26), 
independent of the input size.
*/
export default function longestSubstringReplacement(
    str,
    k,
) {
    // Binary search over the length of the substring
    // `low` holds the valid value, and `high` holds the invalid value
    let low = 1;
    let high = str.length + 1;

    while (low + 1 < high) {
        const mid = low + Math.floor((high - low) / 2);

        // Check if we can make a valid substring of length `mid`
        if (canMakeValidSubstring(str, mid, k)) {
            // Explore the right half
            low = mid;
        } else {
            // Explore the left half
            high = mid;
        }
    }

    // Return the length of the longest substring that satisfies the condition
    return low;
}

// Helper function to check if a valid substring of a given length can be made
function canMakeValidSubstring(
    str,
    substringLength,
    k,
) {
    // Frequency map to store the frequency of characters in the current window
    const freqMap = new Array(26).fill(0);
    let maxFrequency = 0;
    let start = 0;

    for (let end = 0; end < str.length; end++) {
        // Update the frequency of the current character
        freqMap[str.charCodeAt(end) - 'A'.charCodeAt(0)] += 1;

        // If the window [start, end] exceeds `substringLength`, move the start pointer
        if (end + 1 - start > substringLength) {
            // Decrease the frequency of the character at the start before moving the pointer
            freqMap[str.charCodeAt(start) - 'A'.charCodeAt(0)] -= 1;
            start += 1;
        }

        // Record the maximum frequency seen so far
        maxFrequency = Math.max(
            maxFrequency,
            freqMap[str.charCodeAt(end) - 'A'.charCodeAt(0)],
        );

        // Check if the current window can be made valid with at most `k` replacements
        if (substringLength - maxFrequency <= k) {
            return true;
        }
    }

    // If no valid substring of the given size was found
    return false;
}