/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
    if(nums.length < 1) {
        return [];
    }
    var start = nums[0];
    var end = nums[0];
    var result = [];
    for (var i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i - 1] + 1) {
            end = nums[i];
        } else {
            if (start === end) {
                result.push(end.toString());
            } else {
                result.push(start + "->" + end);
            }

            start = nums[i];
            end = nums[i];
        }
    }

    if (start === end) {
        result.push(end.toString());
    } else {
        result.push(start + "->" + end);
    }

    return result;
};