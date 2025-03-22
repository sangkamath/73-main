// MinHeap implementation (for storing larger half of numbers)
class MinHeap {
    constructor() {
        this.heap = []; // Internal array to store heap elements
    }

    // Insert a value into the heap
    insert(val) {
        this.heap.push(val); // Add value to the end of the array
        this.bubbleUp(); // Restore heap order by moving it up if necessary
    }

    // Extract and return the minimum value (root of the heap)
    extract() {
        if (this.heap.length === 1) return this.heap.pop(); // If one element, return it
        const min = this.heap[0]; // Store the root element (smallest value)
        this.heap[0] = this.heap.pop(); // Replace root with the last element
        this.sinkDown(); // Restore heap order by moving it down if necessary
        return min; // Return the removed minimum value
    }

    // Peek at the smallest element without removing it
    peek() {
        return this.heap[0];
    }

    // Get the current size of the heap
    size() {
        return this.heap.length;
    }

    // Restore heap property by bubbling the last inserted element up
    bubbleUp() {
        let idx = this.heap.length - 1; // Start at last inserted index
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2); // Find parent index
            if (this.heap[parentIdx] <= this.heap[idx]) break; // Stop if heap order is correct
            // Swap parent and child
            [this.heap[parentIdx], this.heap[idx]] = [
                this.heap[idx],
                this.heap[parentIdx],
            ];
            idx = parentIdx; // Move up to parent index
        }
    }

    // Restore heap property by sinking the root element down
    sinkDown() {
        let idx = 0, length = this.heap.length;
        while (true) {
            let leftIdx = 2 * idx + 1, rightIdx = 2 * idx + 2;
            let smallest = idx; // Assume current index is smallest
            if (leftIdx < length && this.heap[leftIdx] < this.heap[smallest])
                smallest = leftIdx; // Update smallest if left child is smaller
            if (rightIdx < length && this.heap[rightIdx] < this.heap[smallest])
                smallest = rightIdx; // Update smallest if right child is smaller
            if (smallest === idx) break; // If no change, stop sinking
            // Swap with smaller child
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest; // Move down to new position
        }
    }
}

// MaxHeap implementation (for storing smaller half of numbers)
// Inherits from MinHeap by inverting sign of values
/*
The time complexity for the `add` method in the NumberStream class is 
O(log n) for each insertion operation. This is because both the MaxHeap 
and MinHeap data structures maintain their properties through heap 
operations, which require logarithmic time to insert and extract elements. 
Balancing the heaps, which may involve moving an element from one heap 
to another, also takes O(log n) time. Therefore, the overall time 
complexity for adding a number is O(log n).

The `getMedian` method has a time complexity of O(1) since it only 
involves accessing the top elements of the heaps and performing 
a simple arithmetic operation if needed.

In terms of space complexity, the NumberStream class uses O(n) 
space, where n is the number of elements added to the data structure. 
This is because both heaps can store up to n/2 elements each,
 leading to a total of O(n) space usage.

In summary, the time complexity for adding a number is O(log n), 
the time complexity for getting the median is O(1), and the 
space complexity is O(n).
*/
class MaxHeap extends MinHeap {
    insert(val) {
        super.insert(-val); // Insert negative value to simulate max heap
    }

    extract() {
        return -super.extract(); // Extract negative value and return positive
    }

    peek() {
        return -super.peek(); // Peek at negative value and return positive
    }
}

// NumberStream maintains a data stream and computes the median efficiently
export default class NumberStream {
    constructor() {
        this.smaller = new MaxHeap(); // MaxHeap for smaller half of numbers
        this.larger = new MinHeap(); // MinHeap for larger half of numbers
    }

    /**
     * Adds an integer into the data structure
     * @param {number} num
     */
    add(num) {
        if (this.larger.size() > 0 && num > this.larger.peek()) {
            // If num is greater than the smallest number in larger heap, add to larger heap
            this.larger.insert(num);
            if (this.larger.size() > this.smaller.size()) {
                // Balance: Move smallest number from larger heap to smaller heap
                this.smaller.insert(this.larger.extract());
            }
        } else {
            // Otherwise, add to the smaller heap (which is a MaxHeap)
            this.smaller.insert(num);
            if (this.smaller.size() > this.larger.size() + 1) {
                // Balance: Move largest number from smaller heap to larger heap
                this.larger.insert(this.smaller.extract());
            }
        }
    }

    /**
     * Returns the median of the current number stream
     * @returns {number}
     */
    getMedian() {
        if (this.smaller.size() > this.larger.size()) {
            return this.smaller.peek(); // Odd count: return middle element from smaller heap
        }
        return (this.smaller.peek() + this.larger.peek()) / 2.0; // Even count: return avg of two middle elements
    }
}


/*
Time complexity: O(n log n). Sorting the array dominates the 
runtime of the getMedian method. Adding a number to the store 
array takes O(1).
Space complexity: O(n). The store array grows linearly with the 
number of elements in the stream.

*/
class NumberStream {
    // Array to store the numbers
    constructor() {
        this.store = []; // Internal array to store heap elements
    }

    // Adds a number into the data structure
    add(num) {
        // Add the number to the array
        this.store.push(num);
    }

    // Returns the median of the current number stream
    getMedian() {
        // Sort the array
        this.store.sort((a, b) => a - b);

        const n = this.store.length;

        // Compute the median
        if (n % 2 === 1) {
            // If the size is odd, return the middle element
            return this.store[Math.floor(n / 2)];
        }

        // If the size is even, return the average of the two middle elements
        const mid1 = this.store[n / 2 - 1];
        const mid2 = this.store[n / 2];
        return (mid1 + mid2) * 0.5;
    }
}