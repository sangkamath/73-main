/**
 * @param {number[][]} matrix
 * @return {void}
 * Time complexity: O(m.n). The algorithm involves two passes 
 * through the matrix, each visiting all m.n elements.
Space complexity: O(m + n). The additional sets rows and cols 
store at most m row indices and n column indices. Can use sets instead of array
 */
export default function matrixZeroing(matrix) {
    var m = matrix.length;
    var n = matrix[0].length;
  
    var row = new Array(m).fill(false);
    var col = new Array(n).fill(false);
  
    for(var i = 0; i < m; i++) {
      for(var j = 0; j < n; j++) {
        row[i] = row[i] || matrix[i][j] === 0;
        col[j] = col[j] || matrix[i][j] === 0;
      }
    }
  
    for(var i = 0; i < m; i++) {
      for(var j = 0; j < n; j++) {
        if(row[i] || col[j]) {
          matrix[i][j] = 0;
        }
      }
    }
  }


  /*
Time complexity: O(m.n). The algorithm involves two passes through the 
matrix, each visiting all m.n elements.
Space complexity: O(1). No additional space is used apart from the input 
matrix and a single flag.
  */
  export default function matrixZeroing(matrix) {
    // Flag to indicate if the first column should be zeroed
    let isCol = false;
    const ROWS = matrix.length;
    const COLS = matrix[0].length;
  
    // Iterate through the matrix
    for (let i = 0; i < ROWS; i++) {
      // Check if the first column needs to be zeroed
      if (matrix[i][0] == 0) {
        isCol = true;
      }
      // Check each cell in the row starting from the second column
      for (let j = 1; j < COLS; j++) {
        if (matrix[i][j] == 0) {
          // Mark the corresponding row and column in the first row and column
          matrix[0][j] = 0;
          matrix[i][0] = 0;
        }
      }
    }
  
    // Use the markers to set zeroes in the matrix (excluding the first row and column)
    for (let i = 1; i < ROWS; i++) {
      for (let j = 1; j < COLS; j++) {
        if (matrix[i][0] == 0 || matrix[0][j] == 0) {
          matrix[i][j] = 0;
        }
      }
    }
  
    // If the first cell of the matrix is zero, set the entire first row to zero
    if (matrix[0][0] == 0) {
      for (let j = 0; j < COLS; j++) {
        matrix[0][j] = 0;
      }
    }
  
    // If the first column needs to be zeroed, set the entire first column to zero
    if (isCol) {
      for (let i = 0; i < ROWS; i++) {
        matrix[i][0] = 0;
      }
    }
  }