/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 * Combining these, the overall time complexity is O(n + m).
 * The space complexity is determined by the storage used for the sets. 
 * In the worst case, both sets could store all unique elements from 
 * the input arrays. Therefore, the space complexity is O(n + m) as 
 * well, since we are storing elements from both input arrays in the sets. 
 */
var findDifference = function(nums1, nums2) {
    var set1 = new Set(nums1);
    var set2 = new Set(nums2);

    // Remove common elements from both sets
    for (let num of nums2) {
        set1.delete(num);
    }
    for (let num of nums1) {
        set2.delete(num);
    }

    return [Array.from(set1), Array.from(set2)];
};