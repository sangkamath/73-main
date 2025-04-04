/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 * It runs in O(n) time and O(1) space
 *  (just integer counters).

It's cleaner and easier to understand.
 */
var maxVowels = function (s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let maxCount = 0;
    let currentCount = 0;

    // First window
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) currentCount++;
    }

    maxCount = currentCount;

    // Slide the window
    for (let i = k; i < s.length; i++) {
        if (vowels.has(s[i - k])) currentCount--; // Remove char going out
        if (vowels.has(s[i])) currentCount++;     // Add new char coming in
        maxCount = Math.max(maxCount, currentCount);
    }

    return maxCount;
};


/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 * The time complexity of the `maxVowels` function is O(n), 
 * where n is the length of the string `s`. This is because 
 * the function iterates through the string twice: once to
 *  initialize the vowel count for the first `k` characters
 *  and once to slide the window across the rest of the 
 * string. Each character is processed a constant number 
 * of times, leading to a linear time complexity.

The space complexity is O(1) because the size of the `map` 
used to count the vowels is constant. It can hold at most
5 entries (one for each vowel: 'a', 'e', 'i', 'o', 'u'), 
regardless of the input size. Therefore, the space used 
does not grow with the input size, resulting in constant 
space complexity.
 */
var maxVowels = function (s, k) {
    var map = new Map();

    for (let i = 0; i < k; i++) {
        if (s[i] === "a" || s[i] === "e" ||
            s[i] === "i" || s[i] === "o" || s[i] === "u") {
            if (map.has(s[i])) {
                map.set(s[i], map.get(s[i]) + 1);
            } else {
                map.set(s[i], 1);
            }
        }
    }

    var maxCount = countMap(map);
    for (let i = k; i < s.length; i++) {
        if (s[i - k] === "a" || s[i - k] === "e" ||
            s[i - k] === "i" || s[i - k] === "o" || s[i - k] === "u") {
            map.set(s[i - k], map.get(s[i - k]) - 1);
        }

        if (s[i] === "a" || s[i] === "e" ||
            s[i] === "i" || s[i] === "o" || s[i] === "u") {
            if (map.has(s[i])) {
                map.set(s[i], map.get(s[i]) + 1);
            } else {
                map.set(s[i], 1);
            }
        }

        maxCount = Math.max(maxCount, countMap(map));
    }

    return maxCount;
};

var countMap = function (map) {
    var count = 0;
    count += map.get("a") ?? 0;
    count += map.get("e") ?? 0;
    count += map.get("i") ?? 0;
    count += map.get("o") ?? 0;
    count += map.get("u") ?? 0;
    return count;
}