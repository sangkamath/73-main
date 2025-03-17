/**
 * @param {number[][]} board
 * @return {number}
 * The time complexity of the `snakesAndLadders` function can be analyzed based on 
 * the breadth-first search (BFS) approach used to traverse the board. The maximum 
 * number of squares on the board is n * n, where n is the length of the board. In 
 * the worst case, the algorithm may need to explore all squares, and for each square, 
 * it checks up to 6 possible moves (from rolling a die). Therefore, the time 
 * complexity is O(n^2), as each square can be processed a constant number of times.

The space complexity is primarily determined by the queue used for BFS and the set 
used for tracking visited squares. The queue can hold at most n * n elements in 
the worst case, and the visited set also stores up to n * n elements. Thus, the 
space complexity is O(n^2) as well.

In summary, both the time and space complexity of the function are O(n^2).
 */
var snakesAndLadders = function(board) {
    const n = board.length;
   
   // Convert board position (1-based) to row and column indices
   function getBoardValue(num) {
       let r = Math.floor((num - 1) / n);
       let c = (num - 1) % n;
       if (r % 2 === 1) c = n - 1 - c; // Reverse for zig-zag rows
       return board[n - 1 - r][c]; // Convert row to bottom-left
   }

   let queue = [[1, 0]]; // [square number, moves]
   let visited = new Set();
   visited.add(1);

   while (queue.length > 0) {
       let [square, moves] = queue.shift();
       
       for (let next = square + 1; next <= Math.min(square + 6, n * n); next++) {
           let destination = getBoardValue(next);
           let finalPosition = destination !== -1 ? destination : next; // Move to ladder/snake

           if (finalPosition === n * n) return moves + 1; // Return at exact endpoint
           
           if (!visited.has(finalPosition)) {
               visited.add(finalPosition);
               queue.push([finalPosition, moves + 1]); // Count move before processing ladder/snake
           }
       }
   }
   
   return -1; // No path found
};