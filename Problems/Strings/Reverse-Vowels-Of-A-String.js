/**
 * @param {string} s
 * @return {string}
 * O(N), where N is the length of the string, since each character is processed at most once.

O(N) Space (if you count the array conversion), but in-place swaps keep extra space minimal.
 */
var reverseVowels = function(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    let arr = s.split(''); // Convert string to an array for in-place modification
    let left = 0, right = arr.length - 1;

    while (left < right) {
        // Move left pointer until it finds a vowel
        while (left < right && !vowels.has(arr[left])) left++;
        // Move right pointer until it finds a vowel
        while (left < right && !vowels.has(arr[right])) right--;

        // Swap the vowels
        [arr[left], arr[right]] = [arr[right], arr[left]];

        left++;
        right--;
    }

    return arr.join(''); // Convert array back to string
};