class MinHeap {
    constructor() {
        this.heap = [];
    }

    enqueue(element) {
        this.heap.push(element);
        this.bubbleUp();
    }

    dequeue() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index][0] >= this.heap[parentIndex][0]) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let leftIndex = 2 * index + 1;
            let rightIndex = 2 * index + 2;
            let smallest = index;

            if (leftIndex < length && this.heap[leftIndex][0] < this.heap[smallest][0]) {
                smallest = leftIndex;
            }
            if (rightIndex < length && this.heap[rightIndex][0] < this.heap[smallest][0]) {
                smallest = rightIndex;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

var kSmallestPairs = function(nums1, nums2, k) {
    let m = nums1.length, n = nums2.length;
    let result = [];
    let minHeap = new MinHeap();
    let visited = new Set();

    minHeap.enqueue([nums1[0] + nums2[0], 0, 0]);
    visited.add(`0,0`);

    while (k > 0 && !minHeap.isEmpty()) {
        let [sum, i, j] = minHeap.dequeue();
        result.push([nums1[i], nums2[j]]);
        
        if (i + 1 < m && !visited.has(`${i + 1},${j}`)) {
            minHeap.enqueue([nums1[i + 1] + nums2[j], i + 1, j]);
            visited.add(`${i + 1},${j}`);
        }
        
        if (j + 1 < n && !visited.has(`${i},${j + 1}`)) {
            minHeap.enqueue([nums1[i] + nums2[j + 1], i, j + 1]);
            visited.add(`${i},${j + 1}`);
        }
        
        k--;
    }
    
    return result;
};

// Example usage:
console.log(kSmallestPairs([1, 7, 11], [2, 4, 6], 3));

/*
Time Complexity Analysis
Heap operations take O(log k).
We insert at most k elements into the heap, leading to O(k log k) time complexity.
Space Complexity: O(k) for the heap and result.
*/