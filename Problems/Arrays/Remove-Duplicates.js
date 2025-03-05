/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    var j = 1;
    for(var i = 1; i < nums.length; i++) {
        if(nums[i] != nums[i-1]) {
            nums[j] = nums[i];
            j++;
        }
    }
    return j;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    var set = new Set();
    var index = 0;
    for(var num of nums) {
        if(set.has(num)) {
            continue;
        } else {
            nums[index] = num;
            set.add(num);
            index++;
        }
    }
    return set.size;
};