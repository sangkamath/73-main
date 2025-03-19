/**
 * @param {string} str
 * @return {boolean}
 * The time complexity of the `isBalancedBrackets` function is O(n), where n 
 * is the length of the input string `str`. This is because the function
 *  iterates through each character in the string exactly once, performing 
 * constant-time operations (such as pushing to or popping from the stack) 
 * for each character.

The space complexity is O(n) in the worst case, which occurs when all characters 
in the string are opening brackets. In this scenario, all of them would be pushed 
onto the stack, resulting in a stack size proportional to the length of the string. 
If the string contains balanced brackets, the stack will eventually be emptied,
 but the maximum space used at any point can still be O(n).
 */
export default function isBalancedBrackets(str) {
    if(str.length === 0) return true;
    var stack = [];
  
    for (var i = 0; i < str.length; i++) {
      if (str[i] === "(" || str[i] === "{" || str[i] === "[") {
        stack.push(str[i]);
      } else {
        var open = stack.pop();
        if((str[i] === ")" && open != "(") || (str[i] === "}" && open != "{")
        || (str[i] === "]" && open != "[")) {
          return false;
        }
      }
    }
  
    return stack.length === 0;
  }
  
  export default function isBalancedBrackets(str) {
    // Define a mapping from closing parentheses to their corresponding opening parentheses
    const mappings = {
      ')': '(',
      '}': '{',
      ']': '[',
    };
  
    // Initialize an empty stack to keep track of opening parentheses
    const stack = [];
  
    // Iterate through each character in the string
    for (let c of str) {
      // If the current character is a closing parenthesis
      if (mappings[c]) {
        // Pop the top element from the stack (or use '#' if the stack is empty)
        const topElement = stack.length ? stack.pop() : '#';
  
        // If the popped element does not match the corresponding opening parenthesis, return false
        if (topElement !== mappings[c]) {
          return false;
        }
      } else {
        // If the current character is an opening parenthesis, push it onto the stack
        stack.push(c);
      }
    }
  
    // After processing all characters, the stack should be empty for the string to be valid
    return stack.length === 0;
  }