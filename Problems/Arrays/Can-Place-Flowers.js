/*
Time complexity: O(n). A single scan of the flowerbed array of size n is done.

Space complexity: O(1). Constant extra space is used.
public class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int count = 0;
        for (int i = 0; i < flowerbed.length; i++) {
            // Check if the current plot is empty.
            if (flowerbed[i] == 0) {
                // Check if the left and right plots are empty.
                boolean emptyLeftPlot = (i == 0) || (flowerbed[i - 1] == 0);
                boolean emptyRightPlot = (i == flowerbed.length - 1) || (flowerbed[i + 1] == 0);
                
                // If both plots are empty, we can plant a flower here.
                if (emptyLeftPlot && emptyRightPlot) {
                    flowerbed[i] = 1;
                    count++;
                }
            }
        }
        return count >= n;
    }
}

Time complexity: O(n). A single scan of the flowerbed array of size n is done.

Space complexity: O(1). Constant extra space is used.
public class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int count = 0;
        for (int i = 0; i < flowerbed.length; i++) {
            // Check if the current plot is empty.
            if (flowerbed[i] == 0) {
                // Check if the left and right plots are empty.
                boolean emptyLeftPlot = (i == 0) || (flowerbed[i - 1] == 0);
                boolean emptyRightPlot = (i == flowerbed.length - 1) || (flowerbed[i + 1] == 0);
                
                // If both plots are empty, we can plant a flower here.
                if (emptyLeftPlot && emptyRightPlot) {
                    flowerbed[i] = 1;
                    count++;
                    if (count >= n) {
                        return true;
                    }
                }
            }
        }
        return count >= n;
    }
}
*/

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 * The time complexity of the `canPlaceFlowers` function is
 *  O(m), where m is the length of the `flowerbed` array. This 
 * is because the function iterates through the entire array 
 * once, checking each position to determine if a flower can
 *  be placed.

The space complexity is O(1), as the function uses a constant
 amount of extra space regardless of the input size. It only 
 utilizes a few variables (`last`, `result`, and the loop 
 index `i`) to keep track of the state during the iteration, 
 without requiring any additional data structures that grow
  with the input size.
 */
var canPlaceFlowers = function (flowerbed, n) {
    if(n === 0) return true;

    var last = 0;
    var result = n;
    for (var i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] == 0 && last != i - 1) {
            if (i === 0 && flowerbed[i+1] != 1) {
                result -= 1;
                last = i;
            }
            if (i > 0 && i < flowerbed.length && flowerbed[i - 1] != 1 && flowerbed[i+1] != 1) {
                result -= 1;
                last = i;
            }

            if(i === flowerbed.length && flowerbed[i - 1] != 1) {
                result -= 1;
                last = i;
            }
        }

        if(result === 0) {
            return true;
        }
    }

    return result === 0;
};