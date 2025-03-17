/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 * The time complexity of the combinationSum function can be analyzed based on the number of
 *  possible combinations that can be formed with the given candidates. In the worst case, 
 * each candidate can be chosen multiple times, leading to an exponential number of 
 * combinations. Specifically, if there are 'n' candidates and the target is 'T', the 
 * time complexity can be approximated as O(n^T), where each candidate can contribute 
 * to the sum in various combinations.

The space complexity is determined by the space required for the recursion stack and 
the storage of the results. The maximum depth of the recursion stack can go up to T 
(the target value) in the worst case, leading to O(T) space complexity for the stack. 
Additionally, the space required to store the results can also be significant, 
depending on the number of valid combinations found. If there are 'k' valid combinations, 
the space complexity for storing results would be O(k * m), where 'm' is the average 
length of each combination. Therefore, the overall space complexity can be considered
 O(T + k * m). 

In summary, the time complexity is O(n^T) and the space complexity is O(T + k * m).
 */
var combinationSum = function(candidates, target) {
    function backtrack(start, current, sum) {
      if (sum === target) {
          result.push([...current]); // Add a copy of the current combination
          return;
      }
      if (sum > target) return; // Stop if sum exceeds target

      for (let i = start; i < candidates.length; i++) {
          current.push(candidates[i]); // Choose the candidate
          backtrack(i, current, sum + candidates[i]); // Recur (can reuse same number)
          current.pop(); // Undo the choice
      }
  }

  const result = [];
  backtrack(0, [], 0);
  return result;
};