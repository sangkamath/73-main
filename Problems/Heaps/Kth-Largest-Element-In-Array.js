/*Complexity

Time Complexity: O(nlogk)
Each of the n elements is processed once. However, heap operations take 
O(logk) time, leading to an overall complexity of O(nlogk).

Space Complexity: O(k)
The solution uses a heap with a maximum of k elements.

Performance

This solution is both time and space-efficient. By focusing only on 
he k largest elements and using the properties of a heap, it ensures 
optimal runtime for a wide range of inputs. The controlled space usage 
ensures that even for large k, the memory overhead remains minimal.
*/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) { return Math.floor((index - 1) / 2); }
    getLeftChildIndex(index) { return 2 * index + 1; }
    getRightChildIndex(index) { return 2 * index + 2; }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = this.getParentIndex(index);
            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    remove() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return min;
    }

    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            let rightChildIndex = this.getRightChildIndex(index);

            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.heap[index] > this.heap[smallerChildIndex]) {
                this.swap(index, smallerChildIndex);
                index = smallerChildIndex;
            } else {
                break;
            }
        }
    }

    peek() {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    let heap = new MinHeap();
    for (let i = 0; i < k; i++) {
        heap.insert(nums[i]);
    }
    for (let i = k; i < nums.length; i++) {
        if (nums[i] > heap.peek()) {
            heap.remove();
            heap.insert(nums[i]);
        }
    }
    return heap.peek();
};

/**
 * Complexity:

Time Complexity:

Best and Average Case: O(N)

Worst Case: O(N 
2
 )

The average performance is linear. However, in the worst case (very rare,
 especially with randomized pivot), the algorithm can degrade to O(N 
2
 ).

Space Complexity: O(1)

The space used is constant. The algorithm modifies the original list 
in place and doesn't utilize any significant additional data structures. 
The recursive stack calls (in the worst case) are also bounded by the 
depth of the list, making it O(logN), but this is typically considered as 
O(1) space complexity in QuickSelect.
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const partition = (left, right, pivotIndex) => {
        const pivot = nums[pivotIndex]; // Select pivot element
        [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]]; // Move pivot to the end
    
        let storedIndex = left; // Position for swapping smaller elements
    
        for (let i = left; i < right; i++) { // Iterate through array (except pivot)
            if (nums[i] < pivot) { // If element is smaller than pivot
                [nums[storedIndex], nums[i]] = [nums[i], nums[storedIndex]]; // Swap it to the left part
                storedIndex++; // Move the stored index forward
            }
        }
    
        [nums[right], nums[storedIndex]] = [nums[storedIndex], nums[right]]; // Place pivot in final position
        return storedIndex; // Return pivot's new index
    };
    
    let left = 0, right = nums.length - 1;
    while (true) {
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        const newPivotIndex = partition(left, right, pivotIndex);
        if (newPivotIndex === nums.length - k) {
            return nums[newPivotIndex];
        } else if (newPivotIndex > nums.length - k) {
            right = newPivotIndex - 1;
        } else {
            left = newPivotIndex + 1;
        }
    }
};