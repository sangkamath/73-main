/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 * The time complexity of the given function is O(n), where n is the length of the input string
 *  `s`. This is because the function iterates through each character in the string exactly 
 * once, performing constant-time operations for each character.

The space complexity is O(n) as well, since the function creates an array `rows` that can
 hold up to n characters in the worst case (when all characters are placed in the rows). 
 Additionally, the space used for the output string, which is the concatenation of all rows, 
 also contributes to the O(n) space complexity. Thus, both time and space complexities are 
 linear with respect to the size of the input string.
 */
var convert = function(s, numRows) {
    if (numRows === 1) return s; // No zigzag needed
    
    let rows = Array(Math.min(numRows, s.length)).fill("").map(() => "");
    let currentRow = 0;
    let goingDown = false;

    for (let char of s) {
        rows[currentRow] += char; // Place character in the current row

        // Change direction at the first or last row
        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }

        // Move up or down
        currentRow += goingDown ? 1 : -1;
    }

    return rows.join(""); // Concatenate all rows
};