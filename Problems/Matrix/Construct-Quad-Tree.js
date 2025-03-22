/**
 * @param {number[][]} grid
 * @return {_Node}
 * The time complexity of the given function can be analyzed based on how the grid 
 * is divided and processed. The function recursively divides the grid into four 
 * quadrants until it either finds a uniform value (leaf node) or reaches the
 *  smallest sub-grid. In the worst case, the grid is divided down to individual 
 * cells, leading to a recursive tree structure. 

For a grid of size n x n, the number of divisions is logarithmic in terms of 
the number of cells, specifically O(log(n) * log(n)), which results in 
a total time complexity of O(n^2) since each cell is checked once.
 Thus, the overall time complexity is O(n^2).

The space complexity is determined by the depth of the recursion 
stack and the space required for the resulting tree structure. 
The maximum depth of the recursion is O(log(n)), which corresponds 
to the height of the tree. However, the space used for the tree 
nodes can also be O(n) in the worst case, where each node corresponds
 to a single cell. Therefore, the overall space complexity is 
 O(n) for the tree structure plus O(log(n)) for the recursion 
 stack, resulting in a total space complexity of O(n).
 */
var construct = function(grid) {
    function build(rowStart, rowEnd, colStart, colEnd) {
       // Check if all values in the current grid are the same
       let firstVal = grid[rowStart][colStart];
       let isLeaf = true;

       for (let i = rowStart; i <= rowEnd; i++) {
           for (let j = colStart; j <= colEnd; j++) {
               if (grid[i][j] !== firstVal) {
                   isLeaf = false;
                   break;
               }
           }
           if (!isLeaf) break;
       }

       // If it's a leaf, return a new Node
       if (isLeaf) return new Node(firstVal === 1, true);

       // Otherwise, split into four quadrants
       let midRow = Math.floor((rowStart + rowEnd) / 2);
       let midCol = Math.floor((colStart + colEnd) / 2);

       return new Node(
           false, // val doesn't matter for non-leaf nodes
           false,
           build(rowStart, midRow, colStart, midCol),        // Top-Left
           build(rowStart, midRow, midCol + 1, colEnd),      // Top-Right
           build(midRow + 1, rowEnd, colStart, midCol),      // Bottom-Left
           build(midRow + 1, rowEnd, midCol + 1, colEnd)     // Bottom-Right
       );
   }

   return build(0, grid.length - 1, 0, grid[0].length - 1);
};