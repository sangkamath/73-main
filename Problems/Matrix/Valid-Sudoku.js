/**
 * @param {character[][]} board
 * @return {boolean}
 * Complexity

Time complexity: O(81) → O(1)
rows(9)∗columns(9)=81

Space complexity: O(243) → O(1)
rows(81)+columns(81)+boxes(81)=243
 */
var isValidSudoku = function(board) {
    let rows = Array.from({ length: 9}, () => new Set());
    let cols = Array.from({length: 9}, () => new Set());
    let boxes = Array.from({ length: 9}, () => new Set());


    for(let r = 0; r < 9; r++) {
        for(let c = 0; c < 9; c++) {
            if(board[r][c] === ".") {
                continue;
            }

            let value = board[r][c];
            let boxIndex = Math.floor(r/3)*3 + Math.floor(c/3);
            if(rows[r].has(value) || cols[c].has(value) || boxes[boxIndex].has(value)) {
                return false;
            }

            rows[r].add(value);
            cols[c].add(value);
            boxes[boxIndex].add(value);
        }
    }

    return true;
};