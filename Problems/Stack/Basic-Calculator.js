/**
 * @param {string} s
 * @return {number}
 * The time complexity of the given function `calculate` is 
 * O(n), where n is the length of the input string `s`. This
 *  is because the function processes each character in the 
 * string exactly once in a single pass. The operations 
 * performed for each character, such as building numbers, 
 * updating the result, and managing the stack, are all O(1)
 *  operations.

The space complexity is O(n) in the worst case, primarily 
due to the use of the stack. In scenarios where there are
 many nested parentheses, the stack can grow to hold a number
  of elements proportional to the depth of the nesting. 
  However, in most typical cases, the space used will be 
  much less than n, as it only stores the intermediate 
  results and signs.
 */
var calculate = function(s) {
    let stack = [];
    let num = 0;
    let result = 0;
    let sign = 1; // 1 for '+', -1 for '-'

    for (let i = 0; i < s.length; i++) {
        let char = s[i];

        if (char >= '0' && char <= '9') {
            // Build the number
            num = num * 10 + (char - '0');
        } else if (char === '+' || char === '-') {
            // Process previous number
            result += sign * num;
            num = 0;
            sign = char === '+' ? 1 : -1;
        } else if (char === '(') {
            // Save the result and sign before the parenthesis
            stack.push(result);
            stack.push(sign);
            result = 0; // Reset result for new expression inside ()
            sign = 1; // Reset sign
        } else if (char === ')') {
            // Process the last number
            result += sign * num;
            num = 0;

            // Retrieve the previous result and sign
            result *= stack.pop(); // Pop sign
            result += stack.pop(); // Pop previous result
        }
    }

    // Add any remaining number
    result += sign * num;
    return result;
};