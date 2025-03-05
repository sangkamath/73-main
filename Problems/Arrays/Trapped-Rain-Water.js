
var trap = function(height) {
    let n = height.length;
    if (n === 0) return 0;

    let left = new Array(n).fill(0);
    let right = new Array(n).fill(0);
    let area = 0;

    // Fill left max array
    left[0] = height[0];
    for (let i = 1; i < n; i++) {
        left[i] = Math.max(left[i - 1], height[i]);
    }

    // Fill right max array
    right[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        right[i] = Math.max(right[i + 1], height[i]);
    }

    // Calculate trapped water
    for (let i = 1; i < n - 1; i++) {
        let minHeight = Math.min(left[i - 1], right[i + 1]);
        if (minHeight > height[i]) {
            area += minHeight - height[i];
        }
    }

    return area;
};
/*
Explanation:
We initialize two arrays, left and right, to store the maximum height to the left and right of each index.
The left array stores the highest elevation seen from the left up to each index.
The right array stores the highest elevation seen from the right up to each index.
Then, we iterate through the array (excluding the first and last elements) and calculate the trapped water at each index.
The trapped water at an index is the difference between the minimum of left[i-1] and right[i+1] and the current height, only if the minimum is greater than the current height.
The total trapped water is stored in area.
Time Complexity:
O(n): We traverse the array three times (left max, right max, and computing trapped water).
Space Complexity:
O(n): We use two extra arrays of size n (left and right).
Let me know if you need an optimized approach (O(1) space)! 🚀
*/

var trap = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let area = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                area += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                area += rightMax - height[right];
            }
            right--;
        }
    }

    return area;
};
/*
Explanation:
Use two pointers: left (starting at 0) and right (starting at the last index).
Maintain leftMax and rightMax to track the highest barriers encountered from the left and right.
If height[left] < height[right], move the left pointer:
If height[left] is greater than or equal to leftMax, update leftMax.
Otherwise, water can be trapped (difference between leftMax and height[left]).
If height[right] <= height[left], move the right pointer:
If height[right] is greater than or equal to rightMax, update rightMax.
Otherwise, water can be trapped (difference between rightMax and height[right]).
Continue until left meets right.
Time Complexity:
O(n): Each element is processed once.
Space Complexity:
O(1): No extra arrays, just a few variables.
This is the most efficient solution for the Trapping Rain Water problem! 🚀 Let me know if you have questions.
*/