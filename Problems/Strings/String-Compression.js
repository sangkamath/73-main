/**
 * @param {character[]} chars
 * @return {number}
 * The time complexity of the `compress` function is
 *  O(n), where n is the length of the input array 
 * `chars`. This is because the function processes 
 * each character in the array exactly once in a
 *  single pass through the array. The inner while 
 * loop counts consecutive characters, but it does 
 * not lead to additional iterations over the array, 
 * as it only increments the index `i` until all 
 * occurrences of the current character are counted.

The space complexity is O(1), as the function 
modifies the input array in place and does not 
use any additional data structures that scale 
with the input size. The only extra space used 
is for a few variables (like `index`, `i`, `char`, 
and `count`), which do not depend on the size of the 
input. Thus, the space usage remains constant 
regardless of the input size.
 */
var compress = function(chars) {
    if(chars.length === 1) return 1;

    let index = 0; // Position to insert compressed data
    let i = 0; // Pointer for scanning

    while(i < chars.length) {
        let char = chars[i];
        let count = 0;

        // Count occurrences of the character
        while(i < chars.length && chars[i] == char) {
            count++;
            i++;
        }

         // Store the character
        chars[index] = char;
        index++;

        // If count > 1, store the digits of count as characters
        if(count > 1) {
            let countStr = count.toString(); // Convert count to string
            for(let digit of countStr) {
                chars[index] = digit;
                index++;
            }
        }
    }

    return index;
};