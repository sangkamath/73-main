/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 * Time complexity: O(n log n). Sorting the character arrays is the most
 *  expensive operation and dominates the runtime.
Space complexity: O(n). The space is required to store the character arrays 
created from the input strings.
 */
export default function isStringAnagram(str1, str2) {
    if (str1.length !== str2.length) {
      return false;
    }
  
    // Convert the strings into character arrays
    let str1Array = str1.split('');
    let str2Array = str2.split('');
  
    // Sort the character arrays
    str1Array.sort();
    str2Array.sort();
  
    // Check if the sorted character arrays are equal
    for (let i = 0; i < str1Array.length; i++) {
      if (str1Array[i] !== str2Array[i]) {
        return false;
      }
    }
  
    // If all checks pass, the strings are anagrams
    return true;
  }

/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 * Time complexity: O(n). The solution iterates through 
 * both strings exactly once.
Space complexity: O(1). The frequency table is a fixed size (26),
 regardless of the input size.
 */
export default function isStringAnagram(str1, str2) {
    // If the lengths of the two strings are not equal, they cannot be anagrams
    if (str1.length !== str2.length) {
      return false;
    }
  
    // Create an array to count the frequency of each character in the alphabet
    const table = new Array(26).fill(0);
  
    // Increment the count for each character in string s
    for (let i = 0; i < str1.length; i++) {
      table[str1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
  
    // Decrement the count for each character in string t
    for (let i = 0; i < str2.length; i++) {
      table[str2.charCodeAt(i) - 'a'.charCodeAt(0)]--;
      // If count goes negative, strings are not anagrams
      if (table[str2.charCodeAt(i) - 'a'.charCodeAt(0)] < 0) {
        return false;
      }
    }
  
    // If all counts are zero, strings are anagrams
    return true;
  }