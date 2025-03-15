/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * The time complexity of the `combine` function can be analyzed based on the number of 
 * combinations generated. The function generates all possible combinations of `k` numbers 
 * from `n` numbers. The number of combinations can be represented as C(n, k), which is 
 * calculated as n! / (k! * (n - k)!). Therefore, the time complexity is O(C(n, k)), as 
 * each combination is constructed and stored in the result array.

The space complexity is primarily determined by the storage of the result and the recursion 
stack. The result array will store C(n, k) combinations, and each combination has a length 
of k. Thus, the space required for the result is O(k * C(n, k)). Additionally, the recursion 
stack can go as deep as k levels, which contributes O(k) to the space complexity. However, 
since the result storage dominates, the overall space complexity is O(k * C(n, k)).

In summary:
- Time complexity: O(C(n, k))
- Space complexity: O(k * C(n, k))
 */
var combine = function (n, k) {
    const result = [];
    function backtrack(start, path) {
        if (path.length === k) {
            result.push([...path]); // Store a copy of the combination
            return;
        }

        for (let i = start; i <= n; i++) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop(); // Backtrack
        }
    }

    backtrack(1, []);
    return result;
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * The time complexity of the `combine` function can be analyzed based on the number of 
 * combinations generated. The function generates all possible combinations of `k` numbers 
 * from a set of `n` numbers. The number of combinations can be represented as "n choose k," 
 * which is calculated as C(n, k) = n! / (k! * (n - k)!). Therefore, the time complexity 
 * is O(C(n, k)), as each combination is constructed and added to the result.

The space complexity is primarily determined by the storage of the result and the recursion 
stack. The result array will store all combinations, which takes O(C(n, k)) space. Additionally,
 the recursion stack can go as deep as `k`, which takes O(k) space. However, since C(n, k) is
  typically much larger than k, the overall space complexity is dominated by the result storage, 
  leading to a total space complexity of O(C(n, k)). 

In summary:
- Time complexity: O(C(n, k))
- Space complexity: O(C(n, k))
 */
var combine = function (n, k) {

    var result =[];
    function backtrack(number, temp) {
        if (temp.length === k) {
            result.push(temp);
            return;
        }


        for (let i = number; i <= n; i++) {
            backtrack(i+ 1, [...temp, i]);
        }
    }

    backtrack(1, []);
    return result;

};



/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * TIME LIMIT EXCEEDED
 * The time complexity of the `combineBFS` function can be analyzed based on the number of
 *  combinations generated. The function generates all possible combinations of `k` numbers 
 * from `1` to `n`. The total number of combinations can be represented by the binomial 
 * coefficient C(n, k), which is calculated as n! / (k! * (n - k)!). Therefore, the time 
 * complexity is O(C(n, k)), as each combination is constructed and added to the result.

The space complexity is determined by the storage used for the queue and the result array. 
The queue can hold up to O(C(n, k)) combinations at its peak, and each combination can 
take O(k) space. Thus, the space complexity for the queue is O(k * C(n, k)). Additionally, 
the result array will also store O(C(n, k)) combinations, leading to a total space complexity 
of O(k * C(n, k)) for the function. 

In summary:
- Time complexity: O(C(n, k))
- Space complexity: O(k * C(n, k))
 */
function combineBFS(n, k) {
    let queue = [[1, []]]; // [current number, combination so far]
    const result = [];

    while (queue.length) {
        const [start, path] = queue.shift();

        if (path.length === k) {
            result.push(path);
            continue;
        }

        for (let i = start; i <= n; i++) {
            queue.push([i + 1, [...path, i]]);
        }
    }

    return result;
}
