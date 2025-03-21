/*
Time complexity: O(n2). The includes method performs a linear search, making this 
approach quadratic as it is nested inside a loop iterating over all n elements.
Space complexity: O(1). No additional data structures are used; only a 
few variables are allocated.
*/
export default function longestConsecutiveNumberSeq(numbers) {
    // Return 0 if the array is empty
    if (numbers.length === 0) {
        return 0;
    }

    // Variable to track the longest streak of consecutive numbers
    let longestStreak = 0;

    // Iterate through each number in the array
    for (let i = 0; i < numbers.length; i++) {
        // Start a new sequence with the current number
        let currentNum = numbers[i];
        let currentStreak = 1;

        // Keep checking for the next consecutive numbers
        while (numbers.includes(currentNum + 1)) {
            // Increment the current number and the streak length
            currentNum += 1;
            currentStreak += 1;
        }

        // Update the longest streak if the current streak is longer
        longestStreak = Math.max(longestStreak, currentStreak);
    }

    // Return the length of the longest consecutive number sequence
    return longestStreak;
}

/*
Time complexity: O(n log n). Sorting the array dominates the runtime, 
taking O(n log n). The subsequent single traversal of the array is O(n),
 making the total complexity O(n log n).
Space complexity: O(1). Sorting is performed in-place, and only a few 
variables are used for tracking streaks.
*/
export default function longestConsecutiveNumberSeq(numbers) {
    // Return 0 if the array is empty
    if (numbers.length == 0) {
        return 0;
    }

    // Sort the array in ascending order
    numbers.sort((a, b) => a - b);

    // Initialize the longest and current streaks
    let longestStreak = 1;
    let currentStreak = 1;

    // Iterate through the sorted array starting from the second element
    for (let i = 1; i < numbers.length; i++) {
        // Check if the current number is different from the previous number
        if (numbers[i] != numbers[i - 1]) {
            // Check if the current number is consecutive to the previous number
            if (numbers[i] == numbers[i - 1] + 1) {
                currentStreak += 1;
            } else {
                // Update the longest streak if the current streak is longer
                longestStreak = Math.max(longestStreak, currentStreak);
                // Reset the current streak
                currentStreak = 1;
            }
        }
    }

    // Return the maximum of the longest streak and the current streak
    return Math.max(longestStreak, currentStreak);
}

/*
Time complexity: O(n). Each number is processed at most twice: once
 when checking if it is the start of a sequence and once during the 
 while loop to extend the sequence.
Space complexity: O(n). The Set requires space proportional to the 
number of unique elements in the input array.
*/
export default function longestConsecutiveNumberSeq(numbers) {
    // Create a set from the array to remove duplicates and allow O(1) lookups
    let num_set = new Set(numbers);

    // Variable to keep track of the longest streak found
    let longestStreak = 0;

    // Iterate over each number in the set
    num_set.forEach((num) => {
        // Check if it's the start of a sequence (no preceding number)
        if (!num_set.has(num - 1)) {
            let currentNum = num; // Current number in the sequence
            let currentStreak = 1; // Current streak length

            // Continue the sequence while the next number is in the set
            while (num_set.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            // Update the longest streak found so far
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    });

    // Return the length of the longest consecutive sequence
    return longestStreak;
}



class UnionFind {
    constructor(n) {
        this.parent = Array(n).fill(0).map((_, i) => i);
        this.size = Array(n).fill(1);
    }

    // Find function with Path Compression
    find(a) {
        if (this.parent[a] !== a) {
            this.parent[a] = this.find(this.parent[a]); // Path compression
        }
        return this.parent[a];
    }

    // Union by size
    connect(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);
        if (rootA === rootB) return;
        
        // Union by size: attach smaller tree to larger tree
        if (this.size[rootA] > this.size[rootB]) {
            this.parent[rootB] = rootA;
            this.size[rootA] += this.size[rootB];
        } else {
            this.parent[rootA] = rootB;
            this.size[rootB] += this.size[rootA];
        }
    }

    // Get the size of each connected component
    getSizes() {
        return this.size;
    }
}
/**
 * @param {number[]} numbers
 * @return {number}
 */
export default function longestConsecutiveNumberSeq(numbers) {
   if (numbers.length === 0) return 0;

    let uf = new UnionFind(numbers.length);
    let map = new Map();

    // Step 1: Insert each unique number into the map and connect adjacent ones
    for (let i = 0; i < numbers.length; i++) {
        let n = numbers[i];
        if (map.has(n)) continue; // Skip duplicates
        map.set(n, i);

        // If adjacent numbers exist, connect them
        if (map.has(n + 1)) uf.connect(map.get(n), map.get(n + 1));
        if (map.has(n - 1)) uf.connect(map.get(n), map.get(n - 1));
    }

    // Step 2: Find the largest connected component
    return Math.max(...uf.getSizes());
}