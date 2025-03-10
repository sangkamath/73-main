/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    if(obstacleGrid[0][0]) return 0;
    var m = obstacleGrid.length;
    var n = obstacleGrid[0].length;
    var paths = Array.from({length: m}, () => Array(n).fill(0));

    var rowBlock = false;
    for (let i = 0; i < m; i++) {
        if(!obstacleGrid[i][0] && !rowBlock){
            paths[i][0] = 1;
        }else{
            rowBlock = true;
        }
    }

    // Fill the first column with 1s (only one way to move down)
    var colBlock = false;
    for (let j = 0; j < n; j++) {
       if(!obstacleGrid[0][j] && !colBlock){
            paths[0][j] = 1;
        }else {
            colBlock = true;
        }
    }

    // Fill the rest of the DP table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if(!obstacleGrid[i][j]){
            paths[i][j] = paths[i - 1][j] + paths[i][j - 1];
            }
        }
    }

    // The bottom-right cell contains the total unique paths
    return paths[m - 1][n - 1];

}