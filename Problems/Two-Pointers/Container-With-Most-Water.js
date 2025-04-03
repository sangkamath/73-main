/**
 * @param {number[]} height
 * @return {number}
 * The time complexity of the given function `maxArea` is O(n), 
 * where n is the number of elements in the input array `height`. 
 * This is because the algorithm uses a two-pointer approach, 
 * which iterates through the array at most once, moving either 
 * the left or right pointer in each iteration until they meet.

The space complexity is O(1), as the algorithm uses a constant
 amount of extra space regardless of the input size. It only
  utilizes a few variables to keep track of the left and 
  right pointers and the maximum water area, without 
  requiring any additional data structures that grow 
  with the input size.
 */
var maxArea = function(height) {
    var left = 0;
    var right = height.length - 1;
    var maxWater = 0;

    while(left < right) {
        var maxWater = Math.max(maxWater, (right- left)*(Math.min(height[left], height[right])));

        if(height[left] < height[right]){
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
};