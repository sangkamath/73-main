/**
 * @param {string[]} strs
 * @return {string[][]}
 * Time complexity: O(n.m log m). Sorting each string of length
 *  m takes O(m log m), and there are n strings.
Space complexity: O(n.m). The Map stores all strings, and the
 space required for keys and values depends on the total characters
  in the input.
 */
export default function anagramGroups(strs) {
    // Create a map to store the anagrams.
    // The keys are the sorted versions of the strings,
    // and the values are arrays containing the original strings (anagrams).
    var map = new Map();

    // Iterate over each string in the input array
    for (let str of strs) {
        // Convert the string to a character array and sort it alphabetically
        let chars = Array.from(str);
        chars.sort();

        // Join the sorted characters to form a key
        // This key will be the same for all anagrams
        let key = chars.join('');

        // If the key doesn't exist in the map, add it 
        // with an empty array as the value
        if (!map.has(key)) map.set(key, []);

        // Add the original string to the array of anagrams for this key
        map.get(key).push(str);
    }

    // Convert the map's values to an array and return it.
    // Each element in the array is a group of anagrams.
    return Array.from(map.values());
}

/*
Time complexity: O(n.m). Counting characters for each 
string of length m takes O(m), and there are n strings.
Space complexity: O(n.m). The object stores all strings, and 
additional space is used for character counts and keys.
*/
export default function anagramGroups(strs) {
    // If the input array is empty, return an empty array
    if (strs.length === 0) return [];

    // Initialize an object to store groups of anagrams
    // The keys are unique representations of the character counts
    // The values are arrays of strings that match the key's character count
    let ans = {};

    // Iterate over each string in the input array
    for (let s of strs) {
        // Create an array to count occurrences of each character (26 letters of the alphabet)
        let count = Array(26).fill(0);

        // Increment the corresponding index in the count array for each character in the string
        for (let c of s) count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;

        // Create a key string based on the character counts
        // The key is formatted as a series of "#count" for each character
        let key = '';
        for (let i = 0; i < 26; i++) {
            key += '#';
            key += count[i];
        }

        // If the key doesn't exist in the map, initialize it with an empty array
        if (!ans[key]) ans[key] = [];

        // Add the original string to the array associated with the key
        ans[key].push(s);
    }

    // Return the values of the map, which are the groups of anagrams
    return Object.values(ans);
}