/**
 * @param {string} s
 * @return {string}
 * The time complexity of the `removeStars` function is O(n)
 * , where n is the length of the input string `s`. This
 *  is because the function iterates through each 
 * character of the string exactly once, performing 
 * constant-time operations (push and pop) on the stack 
 * for each character.

The space complexity is also O(n) in the worst case. 
This occurs when there are no asterisks in the string, 
resulting in all characters being pushed onto the stack. 
In the best case, where all characters are asterisks,
 the space used by the stack would be minimal, but we 
 still consider the worst-case scenario for complexity 
 analysis. Thus, the overall space complexity is O(n).
 */
var removeStars = function(s) {
    var stack = [];
    for(var i =0; i < s.length; i++) {
        if(s[i] === "*") {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }

    return stack.join("");
};