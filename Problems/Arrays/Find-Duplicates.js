/**
 * @param {number[]} numbers
 * @return {boolean}
 * The time complexity of the `findDuplicates` function is O(n), where n is the 
 * number of elements in the input array `numbers`. This is because creating 
 * a Set from the array involves iterating through all the elements to add them 
 * to the Set, which takes linear time.

The space complexity is also O(n) in the worst case. This is due to the fact 
that the Set may need to store all n elements if there are no duplicates. In 
the best case, where all elements are unique, the Set will still require O(n) 
space to hold all the elements. Therefore, the overall space complexity remains O(n).
 */
export default function findDuplicates(numbers) {
    const newSet = new Set(numbers);
    return newSet.size != numbers.length;
}



/*
Time complexity: O(n2). The outer loop iterates n times, and the inner loop iterates 
up to n - i - 1 times, resulting in a quadratic time complexity.

Space complexity: O(1). The algorithm uses a constant amount of additional space as 
it does not rely on any auxiliary data structures.
*/
export default function findDuplicates(numbers) {
    // Get the size of the input array for loop iteration
    const n = numbers.length;

    // Iterate through each pair of elements in the array
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Check if the elements at index i and j are the same
            if (numbers[i] === numbers[j]) {
                return true; // Duplicate found, return true
            }
        }
    }

    //No duplicates were found, return false
    return false;
}

/*
Time complexity: O(n log n). The sorting operation dominates the runtime with 
O(n log n). The subsequent linear traversal of the sorted array has a complexity
 of O(n), which is insignificant compared to the sorting step.

Space complexity: O(1). The sorting is performed in-place, and the algorithm does 
not use any additional data structures, resulting in constant space usage.
*/
export default function findDuplicates(numbers) {
    // Sort the array in ascending order
    numbers.sort((a, b) => a - b);
  
    // Iterate through the sorted array
    for (let i = 0; i < numbers.length - 1; i++) {
      // Check if the current element is equal to the next element
      if (numbers[i] === numbers[i + 1]) {
        return true; // If a duplicate is found, return true
      }
    }
  
    // If no duplicates are found, return false
    return false;
  }