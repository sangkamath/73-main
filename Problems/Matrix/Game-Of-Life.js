/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
    var m = board.length;
    var n = board[0].length;

    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            var cell = board[i][j];
            var neighbours = getNumberOfNeighbours(board, i, j);
            if (cell == 0 && neighbours == 3) {
                board[i][j] = 2;
            }

            if (cell == 1 && (neighbours < 2 || neighbours > 3)) {
                board[i][j] = -1;
            }
        }
    }


    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == -1) board[i][j] = 0;
            if (board[i][j] == 2) board[i][j] = 1;
        }
    }

};

var getNumberOfNeighbours = function (board, i, j) {
    var m = board.length;
    var n = board[0].length;

    var directions =
        [[1, 0], [-1, 0], [0, 1], [0, -1]
            , [-1, -1], [1, 1], [-1, 1], [1, -1]];
    var count = 0;
    for (var dir of directions) {
        var x = i + dir[0];
        var y = j + dir[1];
        if (x < 0 || x >= m || y < 0 || y >= n) {
            continue;
        }
        if (Math.abs(board[x][y]) == 1) {
            count++;
        }
    }
    return count;
}