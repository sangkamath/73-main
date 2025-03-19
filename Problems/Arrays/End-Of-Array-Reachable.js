/**
 * @param {number[]} numbers
 * @return {boolean} Greedy approach
 * Time complexity: O(n). The algorithm iterates through the array once in 
 * reverse order.
Space complexity: O(1). No additional space is used other than a constant 
number of variables.
 */
export default function arrayReachableEnd(numbers) {
    var goalpost = numbers.length - 1;
    for(var i = numbers.length - 2; i >= 0; i--) {
      if(i + numbers[i] >= goalpost) {
        goalpost = i;
      }
    }

    return goalpost === 0;

}

let memo;

/**
 * Helper function to determine if you can reach to the last position from the current position.
 *
 * @param {number} position - The current position in the array.
 * @param {number[]} numbers - An array of numbers representing maximum movement lengths at each index.
 * @returns {boolean} - True if you can reach the last element from the current position, false otherwise.
 * Time complexity: O(n2). The worst-case scenario involves checking all reachable positions for each index, 
 * resulting in quadratic complexity.
Space complexity: O(n). The memo array of size n is used for storing intermediate results, and the recursion 
stack may go up to n calls.
 */
const canReachLastPosition = (position, numbers) => {
  // Check the memoization array to see if the result is already computed
  if (memo[position] !== 'UNKNOWN') {
    return memo[position] === 'GOOD';
  }

  // If current position is a stuck position, directly return false
  if (numbers[position] === 0) {
    memo[position] = 'BAD';
    return false;
  }

  // Calculate the furthest position that can be reached from the current position
  const furthestPosition = Math.min(
    position + numbers[position],
    numbers.length - 1,
  );

  // Iterate through all positions that can be reached from the current position
  // Iterate backward for better efficiency (reduce redundant calls)
  for (
    let nextPosition = furthestPosition;
    nextPosition > position;
    nextPosition--
  ) {
    if (canReachLastPosition(nextPosition, numbers)) {
      memo[position] = 'GOOD';
      return true;
    }
  }

  // If none of the next positions can reach the last position, mark the current position as "BAD"
  memo[position] = 'BAD';
  return false;
};

/**
 * Determines if you can reach the last element in an array, where each element represents
 * the maximum positions you can reach from that index.
 *
 * @param {number[]} numbers - An array of numbers representing maximum positions reachable from that index.
 * @returns {boolean} - True if you can reach the last index, false otherwise.
 */
export default function arrayReachableEnd(numbers) {
  // Initialize the memoization array with "UNKNOWN"
  memo = new Array(numbers.length).fill('UNKNOWN');

  // The last position is always "GOOD" because we are already there
  memo[memo.length - 1] = 'GOOD';

  // Start the recursion from the first position
  return canReachLastPosition(0, numbers);
}

