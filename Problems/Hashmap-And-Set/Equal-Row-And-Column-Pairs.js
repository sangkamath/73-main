/**
 * @param {number[][]} grid
 * @return {number}
 * The time complexity of the `equalPairs` function is O(n^2). 
 * This is because we have two main loops: the first loop iterates 
 * over each row of the grid (O(n)), and for each row, we convert 
 * it to a string and store it in a map. The second loop iterates 
 * over each column (O(n)), and for each column, we construct a 
 * string representation by iterating through all rows again (O(n)). 
 * Thus, the overall time complexity is O(n) for the first loop
 *  plus O(n^2) for the second loop, resulting in O(n^2).

The space complexity is O(n). This is due to the storage of row 
strings in the map. In the worst case, if all rows are unique, 
we will store n unique strings in the map, leading to a space
 complexity of O(n). Additionally, we use a small amount of 
 space for the column array, which is O(n) as well, but this 
 does not change the overall space complexity since it is
 dominated by the map storage.
 */
var equalPairs = function(grid) {
    const n = grid.length;
    const rowMap = new Map();

    // Store each row as a string in the map
    for (let i = 0; i < n; i++) {
        const rowStr = grid[i].join(',');
        rowMap.set(rowStr, (rowMap.get(rowStr) || 0) + 1);
    }

    let count = 0;

    // For each column, create a string and compare to rowMap
    for (let j = 0; j < n; j++) {
        let col = [];
        for (let i = 0; i < n; i++) {
            col.push(grid[i][j]);
        }
        const colStr = col.join(',');
        if (rowMap.has(colStr)) {
            count += rowMap.get(colStr);
        }
    }

    return count;
};