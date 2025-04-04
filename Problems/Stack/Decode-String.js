/**
 * @param {string} s
 * @return {string}
 * The time complexity of the `decodeString` function is O(n), 
 * where n is the length of the input string `s`. This is
 *  because the function processes each character in the 
 * string exactly once in a single pass through the loop. 
 * The operations performed within the loop, such as 
 * checking conditions and concatenating strings, are 
 * all O(1) operations. Therefore, the overall time 
 * complexity remains linear with respect to the size of the input.

The space complexity is also O(n) in the worst case. 
This is due to the use of a stack to store the current
 string and the number associated with it. In scenarios 
 where the input string contains deeply nested structures
  or large numbers, the stack can grow proportionally to 
  the size of the input. Additionally, the `currentStr` 
  variable can also grow in size, potentially reaching 
  up to O(n) if the input string consists of repeated 
  characters. Thus, the space complexity can be considered 
  linear as well.
 */
var decodeString = function(s) {
    let stack = [];
   let currentNum = 0;
   let currentStr = '';

   for (let char of s) {
       if (!isNaN(char)) {
           // build the full number (handles multiple digits)
           currentNum = currentNum * 10 + Number(char);
       } else if (char === '[') {
           // push current state to stack and reset
           stack.push([currentStr, currentNum]);
           currentStr = '';
           currentNum = 0;
       } else if (char === ']') {
           // pop and repeat
           let [prevStr, num] = stack.pop();
           currentStr = prevStr + currentStr.repeat(num);
       } else {
           // just a character, add to current string
           currentStr += char;
       }
   }

   return currentStr;
};