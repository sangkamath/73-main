/**
 * @param {number[]} nums
 * @return {number[][]}
 * The time complexity of the `permute` function is O(n!), where n is the number of 
 * elements in the input array `nums`. This is because there are n! possible 
 * permutations of n distinct elements, and the algorithm generates each permutation
 *  by exploring all possible arrangements. The backtracking approach involves making 
 * n recursive calls for the first element, (n-1) for the second, and so on, leading 
 * to a factorial growth in the number of permutations generated.

The space complexity is O(n), which accounts for the maximum depth of the recursion
 stack. In the worst case, the recursion can go as deep as n levels, where n is the
  length of the input array. Additionally, the space used for storing the result 
  is O(n!) due to the storage of all permutations, but this is often not counted 
  in the space complexity analysis since it depends on the output size rather than 
  the algorithm's auxiliary space. Thus, the primary space complexity consideration 
  is O(n) for the recursion stack.
 */
var permute = function(nums) {
    const result = [];

    function backtrack(path, remaining) {
        if (remaining.length === 0) {
            result.push([...path]); // Store the complete permutation
            return;
        }
        for (let i = 0; i < remaining.length; i++) {
            path.push(remaining[i]);
            backtrack(path, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
            path.pop(); // Backtrack
        }
    }

    backtrack([], nums);
    return result;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * The time complexity of the given permutation algorithm can be analyzed as follows:

1. The algorithm generates all possible permutations of the input array `nums`, 
which has a length of `n`. The total number of permutations of `n` distinct elements 
is `n!` (n factorial).
2. For each permutation, the algorithm constructs a new array, which takes O(n) time.
3. Therefore, the overall time complexity is O(n * n!), as we have `n!` permutations 
and each takes O(n) time to construct.

The space complexity can be analyzed as follows:

1. The `result` array stores all the permutations, which requires O(n * n!) space 
since there are `n!` permutations and each permutation is of length `n`.
2. The `queue` also stores intermediate states during the computation. In the worst 
case, it can hold up to O(n!) states, each containing a path of length up to `n` 
and a remaining array of length up to `n`.
3. Therefore, the space complexity is O(n * n!) due to the storage of permutations 
in the result and the queue.

In summary, both the time and space complexity of the algorithm are O(n * n!).
 */
var permute = function(nums) {
    let queue = [[[], nums]]; // [current permutation, remaining numbers]
    const result = [];

    while (queue.length) {
        const [path, remaining] = queue.shift();

        if (remaining.length === 0) {
            result.push(path);
            continue;
        }

        for (let i = 0; i < remaining.length; i++) {
            queue.push([
                [...path, remaining[i]], 
                [...remaining.slice(0, i), ...remaining.slice(i + 1)]
            ]);
        }
    }

    return result;
};
