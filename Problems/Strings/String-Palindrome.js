/**
 * @param {string} str
 * @return {boolean}
 * The time complexity of the function is O(n), where n is the 
 * length of the input string. This is because the function processes
 *  the string in a few steps: it converts the string to lowercase, 
 * removes non-alphanumeric characters, and then checks for palindrome 
 * properties by comparing characters from both ends of the string. 
 * Each of these operations involves iterating through the string, 
 * leading to a linear time complexity.

The space complexity is also O(n) in the worst case. This is
 due to the creation of a new string after the replacement 
 of non-alphanumeric characters. The space used for storing
  the modified string can be proportional to the length of 
  the input string if all characters are alphanumeric. 
  Additionally, the function uses a constant amount of 
  space for the left and right pointers, but this does 
  not affect the overall space complexity.
 */
export default function isStringPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

/*
Time complexity: O(n). Filtering the characters and reversing the string 
each takes linear time.
Space complexity: O(n). The filteredChars and reversedChars strings both
 require O(n) space.
*/
export default function isStringPalindrome(str) {
    // Initialize an empty string to store filtered characters
    let filteredChars = '';

    // Iterate through each character in the input string
    for (let ch of str) {
        // Check if the character is alphanumeric (a-z, A-Z, 0-9)
        if (ch.match(/[a-z0-9]/i)) {
            // Convert the character to lowercase and add it to the filteredChars string
            filteredChars += ch.toLowerCase();
        }
    }

    // Reverse the filtered characters string
    const reversedChars = filteredChars.split('').reverse().join('');

    // Compare the original filtered string with the reversed string
    // If they are the same, it is a palindrome
    return filteredChars === reversedChars;
}

/*
Time complexity: O(n). Each character in the string
 is processed once.
Space complexity: O(1). The two-pointer approach uses 
constant extra space for variables.
*/
export default function isStringPalindrome(str) {
    let i = 0; // Initialize the left pointer
    let j = str.length - 1; // Initialize the right pointer
  
    // Loop until the left pointer is less than the right pointer
    while (i < j) {
      // Move the left pointer to the right if the current character is not alphanumeric
      while (i < j && !isLetterOrDigit(str.charAt(i))) {
        i++;
      }
  
      // Move the right pointer to the left if the current character is not alphanumeric
      while (i < j && !isLetterOrDigit(str.charAt(j))) {
        j--;
      }
  
      // Compare the characters at the left and right pointers after converting to lowercase
      if (str.charAt(i).toLowerCase() !== str.charAt(j).toLowerCase()) {
        return false; // Return false if characters don't match
      }
  
      i++; // Move the left pointer to the right
      j--; // Move the right pointer to the left
    }
  
    return true; // Return true if all characters match
  }
  
  function isLetterOrDigit(character){
    const charCode = character.charCodeAt(0);
    return (
      (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) || // Check if character is a lowercase letter
      (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) || // Check if character is an uppercase letter
      (charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0)) // Check if character is a digit
    );
  }