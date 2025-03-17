
/**
 * @param {number} n
 * @return {string[]}
 * O(2^n)
 * Time Complexity:
The time complexity of this function can be analyzed based on the number 
of valid combinations of parentheses. The number of valid combinations 
of parentheses for `n` pairs is given by the nth Catalan number, which
is approximately O(4^n / n^(3/2)). Therefore, the time complexity is
 O(4^n / n^(3/2)), as we are generating each valid combination.

Space Complexity:
The space complexity is primarily determined by the space used for the 
result array and the recursion stack. The result array will store all 
valid combinations, which can be O(4^n / n^(3/2)) in size. The recursion 
stack can go as deep as 2n in the worst case (when building the string),
 leading to a space complexity of O(n) for the stack. Thus, the overall 
 space complexity is O(4^n / n^(3/2)) for the result plus O(n) for the 
 recursion stack, which simplifies to O(4^n / n^(3/2)).
 *
 */
function generateParentheses(n) {
    function backtrack(s, left, right) {
        if (s.length === 2 * n) {
            result.push(s);
            return;
        }
        if (left < n) {
            backtrack(s + "(", left + 1, right);
        }
        if (right < left) {
            backtrack(s + ")", left, right + 1);
        }
    }

    const result = [];
    backtrack("", 0, 0);
    return result;
}
