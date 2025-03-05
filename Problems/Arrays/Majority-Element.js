/**
 * @param {number[]} nums
 * @return {number}
 * O(n log n)
 */
var majorityElement = function(nums) {
    nums.sort();
    return nums[Math.floor(nums.length/2)];
};


/**
 * @param {number[]} nums
 * @return {number}
 *  O(n) 
 */
var majorityElement = function(nums) {
    var map = new Map();
    var majority = 0;
    var result = 0;

    for(var num of nums) {
        if(map.has(num)) {
            map.set(num, map.get(num) + 1);
        } else {
            map.set(num, 1);
        }
        if(map.get(num) > majority) {
            majority = map.get(num);
            result = num;
        }
    }

    return result;
};

/**
 * @param {number[]} nums
 * @return {number}
 * The algorithm works on the basis of the assumption that the majority 
 * element occurs more than n/2 times in the array. This assumption 
 * guarantees that even if the count is reset to 0 by other elements, 
 * the majority element will eventually regain the lead.

Let's consider two cases:

If the majority element has more than n/2 occurrences:

The algorithm will ensure that the count remains positive for the 
majority element throughout the traversal, guaranteeing that it will
 be selected as the final candidate.
If the majority element has exactly n/2 occurrences:

In this case, there will be an equal number of occurrences for the 
majority element and the remaining elements combined.
However, the majority element will still be selected as the final 
candidate because it will always have a lead over any other element.
In both cases, the algorithm will correctly identify the majority element.

The time complexity of the Moore's Voting Algorithm is O(n) since it 
traverses the array once.

This approach is efficient compared to sorting as it requires only a 
single pass through the array and does not change the original order of the elements.
 */
var majorityElement = function(nums) {
    var count = 0;
    var candidate = 0;

    for(var num of nums) {
        if(count == 0) {
            candidate = num;
        }

        if(num == candidate) {
            count++;
        } else {
            count--;
        }
        return candidate;
    }
};