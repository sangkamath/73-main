/**
 * @param {number[][]} matrix
 * @return {number[]}
 * The time complexity of the matrix spiral traversal function is
 *  O(m * n), where m is the number of rows and n is the number
 *  of columns in the matrix. This is because the function processes 
 * each element of the matrix exactly once as it traverses through 
 * the entire matrix in a spiral order.

The space complexity is O(1) if we do not consider the output array,
 as the algorithm uses a fixed amount of additional space for 
 variables (like indices and direction). However, if we include 
 the space used to store the result in the output array, the space 
 complexity becomes O(m * n) since the result array will contain all
  the elements of the matrix.
 */
export default function matrixSpiralTraversal(matrix) {
    const nextDirection = {
        "top": "right",
        "right": "bottom",
        "bottom": "left",
        "left": "top"
    };

    const m = matrix.length;
    const n = matrix[0].length;
    const res = [];
    let rtop = 0, rbottom = m - 1, cleft = 0, cright = n - 1;
    let direction = "top";

    while (res.length !== m * n) {
        if (direction === "top") {
            for (let j = cleft; j <= cright; j++) {
                res.push(matrix[rtop][j]);
            }
            rtop++;
        } else if (direction === "right") {
            for (let i = rtop; i <= rbottom; i++) {
                res.push(matrix[i][cright]);
            }
            cright--;
        } else if (direction === "bottom") {
            for (let j = cright; j >= cleft; j--) {
                res.push(matrix[rbottom][j]);
            }
            rbottom--;
        } else if (direction === "left") {
            for (let i = rbottom; i >= rtop; i--) {
                res.push(matrix[i][cleft]);
            }
            cleft++;
        }
        direction = nextDirection[direction];
    }

    return res;
}

/*
The time complexity of the matrix spiral traversal function is O(n), where n is
 the total number of elements in the matrix. This is because each element is
  visited exactly once during the traversal, and the operations performed for 
  each element (checking boundaries and marking as visited) are constant time 
  operations.

The space complexity is O(1) if we do not count the output array, as the 
algorithm uses a fixed amount of additional space for variables such as 
the direction array, counters, and indices. However, if we consider the 
space used for the result array that stores the traversal order, the space 
complexity would be O(n) to accommodate all the elements in the matrix. 
Thus, the overall space complexity can be considered O(n) when accounting 
for the output.
*/
export default function matrixSpiralTraversal(matrix){
    const VISITED = 1001; // Marker for visited cells
    let rows = matrix.length, // Total number of rows
        cols = matrix[0].length; // Total number of columns
    let result = [matrix[0][0]]; // Result array initialized with the first element
    matrix[0][0] = VISITED; // Mark the first element as visited

    // Four directions: right, down, left, up.
    let directions = [
        [0, 1], // Move right
        [1, 0], // Move down
        [0, -1], // Move left
        [-1, 0], // Move up
    ];

    let currentDirection = 0; // Initial direction: moving right
    let changeDirection = 0; // Counter for direction changes
    let row = 0,
        col = 0; // Starting position

    // Continue until the direction changes twice without adding new elements
    while (changeDirection < 2) {
        // Continue moving in the current direction until a boundary or visited cell is encountered
        while (
            row + directions[currentDirection][0] >= 0 &&
            row + directions[currentDirection][0] < rows &&
            col + directions[currentDirection][1] >= 0 &&
            col + directions[currentDirection][1] < cols &&
            matrix[row + directions[currentDirection][0]][
            col + directions[currentDirection][1]
            ] != VISITED
        ) {
            changeDirection = 0; // Reset changeDirection as we are still adding elements

            // Move to the next cell in the current direction
            row += directions[currentDirection][0];
            col += directions[currentDirection][1];

            result.push(matrix[row][col]); // Add the element to the result
            matrix[row][col] = VISITED; // Mark the cell as visited
        }

        // Change direction
        currentDirection = (currentDirection + 1) % 4; // Cycle through directions
        changeDirection++; // Increment changeDirection as we changed direction
    }

    return result;
}