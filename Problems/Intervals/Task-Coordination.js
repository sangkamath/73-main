/*
Time complexity: O(n). Traversing the tasks array and updating the
 counter array each take linear time.
Space complexity: O(1). The counter array has a fixed size of 26, 
regardless of the input size.
*/
export default function taskCoordinator(tasks, k){
    // Array to store the frequency of each task (26 letters, A-Z)
    const counter = new Array(26).fill(0);
    let maximum = 0; // Maximum frequency of any task
    let maxCount = 0; // Number of tasks with maximum frequency

    // Traverse through tasks to calculate task frequencies
    for (const task of tasks) {
        const index = task.charCodeAt(0) - 'A'.charCodeAt(0);
        counter[index]++;

        if (maximum === counter[index]) {
            maxCount++;
        } else if (maximum < counter[index]) {
            maximum = counter[index];
            maxCount = 1;
        }
    }

    // Calculate idle slots, available tasks, and idles needed
    const partCount = maximum - 1;  //number of partitions
    const partLength = k - (maxCount - 1); //length of each partition
    const emptySlots = partCount * partLength; //total number of empty slots
    const availableTasks = tasks.length - maximum * maxCount; // available tasks as the total number of tasks minus the tasks with maximum frequency
    const idles = Math.max(0, emptySlots - availableTasks); //number of idle slots

    // Return the total time required
    return tasks.length + idles;
}


/*
Time complexity: O(n log k). Iterating through the tasks array and 
building the frequency map is O(n). Operations on the heap (insertion
 and deletion) are O(log k), where k is the number of unique tasks.
Space complexity: O(k). The heap and the frequency map require
 storage proportional to the number of unique tasks, which is k.
*/
export default function leastInterval(tasks, n) {
    // Building frequency map
    const freq = new Array(26).fill(0);
    for (const ch of tasks) {
      freq[ch.charCodeAt(0) - 'A'.charCodeAt(0)]++;
    }
  
    // Max heap to store frequencies
    const pq = [];
  
    // Helper function to maintain the max heap property
    function heapPush(value) {
      pq.push(value);
      let index = pq.length - 1;
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (pq[index] > pq[parentIndex]) {
          [pq[index], pq[parentIndex]] = [pq[parentIndex], pq[index]];
          index = parentIndex;
        } else {
          break;
        }
      }
    }
  
    // Populate the max heap with frequencies
    for (const count of freq) {
      if (count > 0) {
        heapPush(count);
      }
    }
  
    let time = 0;
    // Process tasks until the heap is empty
    while (pq.length > 0) {
      let cycle = n + 1;
      const store = [];
      let taskCount = 0;
  
      // Execute tasks in each cycle
      while (cycle-- > 0 && pq.length > 0) {
        const top = pq[0];
        if (top > 1) {
          store.push(top - 1);
        }
        pq.shift(); // Remove the top element from the heap
        taskCount++;
      }
  
      // Restore updated frequencies to the heap
      for (const x of store) {
        heapPush(x);
      }
  
      // Add time for the completed cycle
      time += pq.length === 0 ? taskCount : n + 1;
    }
  
    return time;
  }