using System;
using System.Collections.Generic;

// Using a heap - Time complexity: O(n log k)

/*
class MinHeap {
    constructor(compareFn) {
        this.heap = [];
        this.compare = compareFn;
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    extract() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown();
        return min;
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.compare(this.heap[parentIdx], this.heap[idx]) <= 0) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }

    sinkDown() {
        let idx = 0, length = this.heap.length;
        while (true) {
            let leftIdx = 2 * idx + 1, rightIdx = 2 * idx + 2;
            let smallest = idx;
            if (leftIdx < length && this.compare(this.heap[leftIdx], this.heap[smallest]) < 0) smallest = leftIdx;
            if (rightIdx < length && this.compare(this.heap[rightIdx], this.heap[smallest]) < 0) smallest = rightIdx;
            if (smallest === idx) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

var topKFrequent = function(nums, k) {
    if (nums.length === k) return nums;

    // Step 1: Count frequencies
    let count = new Map();
    for (let num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }

    // Step 2: Use a MinHeap to store top K elements
    let minHeap = new MinHeap((a, b) => count.get(a) - count.get(b));

    for (let key of count.keys()) {
        minHeap.insert(key);
        if (minHeap.size() > k) {
            minHeap.extract(); // Remove the least frequent element
        }
    }

    // Step 3: Extract top K elements
    let result = [];
    while (minHeap.size() > 0) {
        result.push(minHeap.extract());
    }

    return result.reverse(); // Reverse to get the most frequent elements first
};
🔹 Explanation
Frequency Count (O(n)):

We use a HashMap (count) to count the frequency of each number in nums.
MinHeap for Top K Elements (O(n log k)):

We maintain a MinHeap to keep only the k most frequent elements.
If the heap exceeds size k, we remove the least frequent element (min in the heap).
Extract and Reverse (O(k log k)):

The heap stores elements in ascending order of frequency.
Extracting and reversing ensures we return the most frequent elements in the correct order.
🔹 Time Complexity
Step	Complexity
Counting frequencies	O(n)
Inserting into MinHeap	O(n log k)
Extracting from MinHeap	O(k log k)
Total	O(n log k)
This is efficient for large n, especially when k is much smaller than n.

🔹 Example Walkthrough
javascript
Copy
Edit
console.log(topKFrequent([1,1,1,2,2,3], 2)); // Output: [1, 2]
console.log(topKFrequent([4,4,4,6,6,7,7,7,8], 3)); // Output: [4, 7, 6]
✅ Summary
Uses a MinHeap to efficiently track the top k frequent elements.
Runs in O(n log k), which is optimal for large datasets.
Handles duplicates and different frequencies correctly.

🔹 Step 1: Count Frequencies
We iterate through nums and count occurrences of each number using a HashMap (count):

Number	Frequency
1	3
2	2
3	1
So, the count map is:

javascript
Copy
Edit
count = { 1: 3, 2: 2, 3: 1 };
🔹 Step 2: Insert into MinHeap
We use a MinHeap (of size k=2) to store the most frequent elements.

Insert 1 (Frequency: 3):

Heap: [1]
Insert 2 (Frequency: 2):

Heap: [2, 1] (Heap maintains min-heap order by frequency)
Insert 3 (Frequency: 1):

Heap: [2, 1, 3] (Since it exceeds size k=2, we remove the smallest)
Remove 3 (smallest frequency)
Final Heap: [2, 1]
🔹 Step 3: Extract and Reverse
Extract elements from the MinHeap → [2, 1]
Reverse the result to get highest frequency first → [1, 2]
Final Output:

javascript
Copy
Edit
[1, 2]
✅ Full Execution Flow
Step	Operation	Heap Content	Notes
1	Insert 1 (freq = 3)	[1]	Heap starts with 1
2	Insert 2 (freq = 2)	[2, 1]	Heap maintains min order
3	Insert 3 (freq = 1)	[2, 1, 3]	Exceeds size 2, remove 3
4	Extract [2, 1]	[2, 1]	Extract from heap
5	Reverse [2, 1]	[1, 2]	Highest freq first
🔹 Final Answer
javascript
Copy
Edit
console.log(topKFrequent([1,1,1,2,2,3], 2)); // Output: [1, 2]
This means 1 and 2 are the two most frequent elements in the array.
*/

public class Solution
{
    public int[] TopKFrequent(int[] nums, int k)
    {
        if (nums.Length == k) return nums;
        var cnt = new Dictionary<int, int>();

        foreach (int n in nums)
        {
            if (cnt.ContainsKey(n)) cnt[n]++;
            else cnt.Add(n, 1);
        }

        List<int> ans = new List<int>();

        if (cnt.Count == k)
        {
            foreach (var item in cnt) ans.Add(item.Key);
            return ans.ToArray();
        }

        var cmp = Comparer<int>.Create((a, b) => cnt[a] != cnt[b] ? cnt[a].CompareTo(cnt[b]) : a.CompareTo(b));
        var ss = new SortedSet<int>(cmp);

        foreach (var item in cnt)
        {
            ss.Add(item.Key);
            if (ss.Count > k) ss.Remove(ss.Min);
        }
        while (ss.Count > 0)
        {
            ans.Add(ss.Min);
            ss.Remove(ss.Min);
        }

        ans.Reverse();
        return ans.ToArray();
    }
}

class Program
{
    static void Main()
    {
        int[] nums = { 1, 1, 1, 2, 2, 3 };
        int k = 2;

        Solution sol = new Solution();
        int[] result = sol.TopKFrequent(nums, k);

        Console.Write("Input: nums = [");
        Console.Write(string.Join(", ", nums));
        Console.WriteLine($"], k = {k}");
        Console.Write("Output: [");
        Console.Write(string.Join(", ", result));
        Console.WriteLine("]");
    }
}