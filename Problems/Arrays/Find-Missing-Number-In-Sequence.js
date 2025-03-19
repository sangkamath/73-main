/**
 * @param {number[]} numbers
 * @return {number}
 * Time complexity: O(n log n). Sorting the array dominates the runtime, requiring O(n log n) time. 
 * The subsequent iteration through the array is O(n).
Space complexity: O(1). Sorting is performed in place, and no additional space is used beyond 
a few variables.
 */
export default function findMissingNumberInSequence(numbers) {
    numbers.sort((a, b) => a - b);

    // Check if the last number is equal to the array length
    if (numbers[numbers.length - 1] !== numbers.length) {
        return numbers.length;
    }
    // Check if the first number is 0
    else if (numbers[0] !== 0) {
        return 0;
    }

    // Iterate through the sorted array to find the missing number
    for (let i = 1; i < numbers.length; i++) {
        const expectedNum = numbers[i - 1] + 1;
        if (numbers[i] !== expectedNum) {
            return expectedNum;
        }
    }

    // Return -1 if no numbers are missing (should not happen in valid input)
    return -1;
}

/*
Time complexity: O(n). Calculating the expected sum and iterating through the array 
both take O(n) time.
Space complexity: O(1). The solution uses a constant amount of space for variables.
*/
export default function findMissingNumberInSequence(numbers){
    let expectedSum = 0;
    const n = numbers.length;
  
    // Calculate the expected sum of all numbers from 0 to n
    for (let i = 0; i <= n; i++) {
      expectedSum += i;
    }
  
    // Calculate the actual sum of elements in the array
    let actualSum = 0;
    for (const num of numbers) {
      actualSum += num;
    }
  
    // Return the missing number (expected sum - actual sum)
    return expectedSum - actualSum;
  }