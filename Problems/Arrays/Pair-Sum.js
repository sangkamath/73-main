/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 * Time complexity: O(n). The algorithm processes each element of the
 *  array exactly once, and each lookup or insertion in the hash table 
 * takes O(1).
Space complexity: O(n). In the worst case, all n elements are stored 
in the hash map.
 */
export default function pairSum(numbers, target) {
    const map = new Map();
  
    var result = [];
  
    for(var i = 0; i < numbers.length; i++) {
      var remain = target - numbers[i];
      if(map.has(remain)) {
        return [map.get(remain), i];
      }
  
      if(!map.has(numbers[i])) {
        map.set(numbers[i], i);
      }
    }
  
    return result;
  }

  /*
Time complexity: O(n). The algorithm iterates through the array twice,
 and each hash table operation (insertion or lookup) takes O(1).
Space complexity: O(n). In the worst case, all n elements are stored 
in the hash map.
  */
  export default function pairSum(numbers, target) {
    const hash = {};
  
    // First pass: Populate the hash table with numbers and their indices
    for (let i = 0; i < numbers.length; i++) {
      hash[numbers[i]] = i;
    }
  
    // Second pass: Check for the complement
    for (let i = 0; i < numbers.length; i++) {
      const complement = target - numbers[i];
  
      // Ensure complement exists and is not the same index as the current one
      if (complement in hash && hash[complement] !== i) {
        return [i, hash[complement]];
      }
    }
  
    // If no solution is found
    return [];
  }

  /*
Time complexity: O(n2). The outer loop runs n times, and for each iteration, the
 inner loop runs up to n - 1 times, leading to quadratic time complexity.
Space complexity: O(1). No additional data structures are used, and the space 
requirement is constant.
  */
  export default function pairSum(numbers, target) {
    // Iterate through each element in the array
    for (let i = 0; i < numbers.length; i++) {
      // For each element, iterate through the elements that come after it
      for (let j = i + 1; j < numbers.length; j++) {
        // If the sum of the two elements equals the target, return their indices
        if (numbers[j] === target - numbers[i]) {
          return [i, j];
        }
      }
    }
    // Return an empty array if no solution is found
    return [];
  }