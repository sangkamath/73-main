/**
 * @param {number[][]} matrix
 * @return {void}
 * Time complexity: O(n2). Both the transpose and reflection operations
 *  involve visiting each element of the matrix once.
Space complexity: O(1). The rotation is performed in place without 
using additional memory.
 */
export default function matrixRotation(matrix) {
    var n = matrix.length;

    for(var i = 0; i < n;i++) {
        for(var j = i; j < n; j++) {
            var temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    for(var i = 0; i < n; i++) {
       matrix[i].reverse();
    }

}

/*
Time complexity: O(n2). Each element in the matrix is visited once 
during the layer-wise traversal.
Space complexity: O(1). The rotation is performed in place without
 using additional memory.

*/
export default function matrixRotation(matrix) {
    // Get the number of rows (or columns) of the matrix
    let n = matrix.length;
  
    // Loop through each layer of the matrix
    // The outer loop goes over each "layer" from the outside towards the center
    for (let i = 0; i < Math.floor((n + 1) / 2); i++) {
      // The inner loop goes over each element in the layer
      for (let j = 0; j < Math.floor(n / 2); j++) {
        // Store the value of the top-left element temporarily
        let temp = matrix[n - 1 - j][i];
  
        // Move the bottom-left element to the top-left
        matrix[n - 1 - j][i] = matrix[n - 1 - i][n - j - 1];
  
        // Move the bottom-right element to the bottom-left
        matrix[n - 1 - i][n - j - 1] = matrix[j][n - 1 - i];
  
        // Move the top-right element to the bottom-right
        matrix[j][n - 1 - i] = matrix[i][j];
  
        // Move the stored top-left element to the top-right
        matrix[i][j] = temp;
      }
    }
  }