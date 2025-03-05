using System;
using System.Collections.Generic;

// Using two heaps - Time: O(log(n))
/*
class MedianFinder {
    constructor() {
        this.smaller = new MaxHeap(); // Left half (MaxHeap)
        this.larger = new MinHeap();  // Right half (MinHeap)
    }

    addNum(num) {
        if (this.larger.size() > 0 && num > this.larger.peek()) {
            this.larger.insert(num);
            if (this.larger.size() > this.smaller.size()) {
                this.smaller.insert(this.larger.extract());
            }
        } else {
            this.smaller.insert(num);
            if (this.smaller.size() > this.larger.size() + 1) {
                this.larger.insert(this.smaller.extract());
            }
        }
    }

    findMedian() {
        if (this.smaller.size() > this.larger.size()) {
            return this.smaller.peek(); // Odd elements, return middle
        }
        return (this.smaller.peek() + this.larger.peek()) / 2.0; // Even elements, return avg of middle two
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
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
            if (this.heap[parentIdx] <= this.heap[idx]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }

    sinkDown() {
        let idx = 0, length = this.heap.length;
        while (true) {
            let leftIdx = 2 * idx + 1, rightIdx = 2 * idx + 2;
            let smallest = idx;
            if (leftIdx < length && this.heap[leftIdx] < this.heap[smallest]) smallest = leftIdx;
            if (rightIdx < length && this.heap[rightIdx] < this.heap[smallest]) smallest = rightIdx;
            if (smallest === idx) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

class MaxHeap extends MinHeap {
    insert(val) {
        super.insert(-val);
    }

    extract() {
        return -super.extract();
    }

    peek() {
        return -super.peek();
    }
}
🔹 Time Complexity
addNum(num) → O(log n) (Heap insertion and balancing)
findMedian() → O(1) (Direct peek of heap tops)
🔹 Example Walkthrough
javascript
Copy
Edit
let mf = new MedianFinder();
mf.addNum(3);
mf.addNum(1);
console.log(mf.findMedian()); // 2.0

mf.addNum(5);
console.log(mf.findMedian()); // 3.0

mf.addNum(4);
console.log(mf.findMedian()); // 3.5
Step-by-step heap states:

Operation	Smaller (MaxHeap)	Larger (MinHeap)	Median
add(3)	[3]	[]	3
add(1)	[1]	[3]	2.0
add(5)	[3, 1]	[5]	3.0
add(4)	[3, 1]	[4, 5]	3.5
🎯 Summary
✅ Efficient: Uses two heaps to maintain balance.
✅ Optimized: addNum runs in O(log n), findMedian in O(1).
✅ Practical: Works well for streaming large datasets.
*/
public class MedianFinder
{
    private SortedSet<(int num, int index)> sm = new SortedSet<(int num, int index)>();
    private SortedSet<(int num, int index)> gt = new SortedSet<(int num, int index)>();
    private int index = 0;

    public MedianFinder() { }

    public void AddNum(int num)
    {
        if (gt.Count > 0 && num > gt.Min.num)
        {
            gt.Add((num, index++));
            if (gt.Count > sm.Count)
            {
                sm.Add(gt.Min);
                gt.Remove(gt.Min);
            }
        }
        else
        {
            sm.Add((num, index++));
            if (sm.Count > gt.Count + 1)
            {
                gt.Add(sm.Max);
                sm.Remove(sm.Max);
            }
        }
    }

    public double FindMedian()
    {
        return sm.Count > gt.Count ? sm.Max.num : (sm.Max.num + gt.Min.num) / 2.0;
    }
}

class Program
{
    static void Main()
    {
        MedianFinder medianFinder = new MedianFinder();

        Console.WriteLine("Input");
        Console.WriteLine("[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]");
        Console.WriteLine("[[], [1], [2], [], [3], []]");

        Console.WriteLine("Output");

        List<object> outputList = new List<object>();

        outputList.Add(null); // Output of MedianFinder constructor

        outputList.Add(null); // Output of AddNum(1)
        medianFinder.AddNum(1);

        outputList.Add(null); // Output of AddNum(2)
        medianFinder.AddNum(2);

        outputList.Add(medianFinder.FindMedian()); // Output of FindMedian()
        
        outputList.Add(null); // Output of AddNum(3)
        medianFinder.AddNum(3);

        outputList.Add(medianFinder.FindMedian()); // Output of FindMedian()

        // Print the formatted output
        Console.WriteLine("[" + string.Join(", ", outputList.Select(x => FormatOutput(x))) + "]");
    }

    static string FormatOutput(object output)
    {
        return output == null ? "null" : output.ToString();
    }
}


