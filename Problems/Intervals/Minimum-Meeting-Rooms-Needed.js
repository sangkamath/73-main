/**
 * @param {number[][]} intervals
 * @return {number}
 * The time complexity of the function minMeetingRoomsNeeded is O(n log n), 
 * where n is the number of intervals. This complexity arises from the sorting 
 * operations performed on the starts and ends arrays. Each sorting operation 
 * takes O(n log n) time, and since there are two such operations, the overall
 *  time complexity remains O(n log n).

The space complexity is O(n) because we are using two additional arrays, 
starts and ends, to store the start and end times of the intervals. Each 
of these arrays can hold up to n elements, leading to a total space usage
 of O(n). Thus, the space complexity is determined by the storage of these
  two arrays.
 */
export default function minMeetingRoomsNeeded(intervals) {
    var starts = [];
    var ends = [];

    for (var interval of intervals) {
        starts.push(interval[0]);
        ends.push(interval[1]);
    }

    starts.sort((a, b) => a - b);
    ends.sort((a, b) => a - b);

    var rooms = 0;
    var endIdx = 0;

    for (var i = 0; i < intervals.length; i++) {
        if (starts[i] < ends[endIdx]) {
            rooms++;
        }
        else {
            endIdx++;
        }
    }

    return rooms;
}

/*
Time complexity: O(n log n). Sorting the intervals takes O(n log n), and 
each insertion and removal operation in the heap takes O(log n), 
resulting in O(n log n) for heap operations over all intervals.
Space complexity: O(n). The min heap can contain up to n elements 
in the worst case.
*/
class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    enqueue(value) {
      this.heap.push(value);
      this.heap.sort((a, b) => a - b); // Ensure the min-heap property
    }
  
    dequeue() {
      return this.heap.shift(); // Remove the smallest element (earliest end time)
    }
  
    front() {
      return this.heap[0]; // Peek the smallest element
    }
  
    size() {
      return this.heap.length;
    }
  }
  
  export default function minMeetingRoomsNeeded(intervals) {
    // Base case: no intervals
    if (intervals.length === 0) {
      return 0;
    }
  
    // Min heap to track the end time of meetings
    const allocator = new MinHeap();
  
    // Sort the intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);
  
    // Add the first meeting's end time to the heap
    allocator.enqueue(intervals[0][1]);
  
    // Iterate over remaining intervals
    for (let i = 1; i < intervals.length; i++) {
      // If the room due to free up the earliest is free, assign that room to this meeting
      if (intervals[i][0] >= allocator.front()) {
        allocator.dequeue();
      }
  
      // Add the current meeting's end time to the heap
      allocator.enqueue(intervals[i][1]);
    }
  
    // The size of the heap tells us the minimum rooms required for all the meetings
    return allocator.size();
  }