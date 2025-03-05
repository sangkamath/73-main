

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let res = Number.MAX_VALUE;
    var left = 0, right = 0, sumOfCurrentWindow = 0;
    for(right = 0; right < nums.length; right++) {
        sumOfCurrentWindow += nums[right];
        while(sumOfCurrentWindow >= target) {
            res = Math.min(res, right - left + 1);
            sumOfCurrentWindow -= nums[left];
            left++;
        }
    }
    return res == Number.MAX_VALUE ? 0 : res;
}
