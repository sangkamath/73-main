/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    var index = 0;
    for(var i = 0; i < nums.length; i++) {
        if(nums[i] != val) {
            nums[index] = nums[i];
            index++;
        }
    }
    return index;
};