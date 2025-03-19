/**
 * @param {number[]} numbers
 * @param {number} k
 * @return {number[]}
 * Time complexity: O(n log k). Maintaining the heap requires sorting up to k elements
 *  for each of the n unique elements, which takes O(n log k) in total.
Space complexity: O(n + k). The hash map requires O(n) space to store no more than n 
unique elements, and the heap requires O(k) space to store the top k elements.
 */
export default function mostCommonElements(numbers, k,) {
    // If k equals the size of numbers, return numbers as the result since all elements are required
    if (k === numbers.length) {
        return numbers;
    }

    // Step 1: Create a hash map to count the frequency of each element in numbers
    const countMap = new Map();
    numbers.forEach((k) => {
        countMap.set(k, (countMap.get(k) || 0) + 1);
    });

    // Step 2: Initialize a min-heap with a custom comparator to keep the most frequent elements
    const heap = [];
    const comp = (n1, n2) =>
        (countMap.get(n1) || 0) - (countMap.get(n2) || 0);

    // Step 3: Insert elements into the heap and maintain the size of the heap to k
    countMap.forEach((_, key) => {
        heap.push(key);
        heap.sort(comp); // Maintain heap order after insertion
        if (heap.length > k) heap.shift(); // Remove the least frequent element if heap exceeds size k
    });

    // Step 4: The heap now contains the k most frequent elements; return them as the result
    return heap;
}

/*
Time complexity: O(n). Counting frequencies and then populating buckets both run
 in O(n), followed by a final pass that selects at most k elements, still O(n).
Space complexity: O(n). The frequencyMap and buckets array each take up to O(n) space.
*/
export default function mostCommonElements(numbers,k) {
    const frequencyMap = {};
  
    // Count the frequency of each number in the array
    for (let i = 0; i < numbers.length; i++) {
      frequencyMap[numbers[i]] = (frequencyMap[numbers[i]] || 0) + 1;
    }
  
    // Create an array of buckets where the index represents the frequency
    const buckets = Array(numbers.length + 1)
      .fill(null)
      .map(() => []);
  
    // Place numbers into the corresponding bucket based on their frequency
    for (const num in frequencyMap) {
      const frequency = frequencyMap[num];
      buckets[frequency].push(Number(num));
    }
  
    const result= [];
  
    // Iterate from the highest frequency bucket to the lowest
    for (let i = buckets.length - 1; i >= 0 && k > 0; i--) {
      if (buckets[i].length > 0) {
        for (const num of buckets[i]) {
          result.push(num);
          k--;
          if (k === 0) break;
        }
      }
    }
  
    return result;
  }