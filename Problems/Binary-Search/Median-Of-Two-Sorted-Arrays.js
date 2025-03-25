
/*
To achieve a runtime complexity of O(log(m + n)) when finding the median
 of two sorted arrays, we need to leverage a more advanced algorithm 
 called binary search. This approach avoids merging the arrays and 
 directly partitions the arrays to find the median efficiently.

Binary Search Approach:
The idea is to perform a binary search on the smaller of the two 
arrays (to minimize the number of iterations) and partition the 
arrays in such a way that the left part contains the smaller half 
of the elements, and the right part contains the larger half.

Here’s how it works:

Partitioning the Arrays:

The goal is to partition both arrays nums1 and nums2 such that 
the left half of the combined arrays has the same number of 
elements as the right half, or one more element if the total 
number of elements is odd.

Binary Search on the Smaller Array:

We perform a binary search on the smaller of the two arrays 
(nums1 or nums2) to find the correct partition.

Adjusting the Partition:

We check whether the current partition satisfies the median 
condition: the largest element on the left side should be 
smaller than the smallest element on the right side.

Finding the Median:

Once the correct partition is found, the median can be 
derived from the maximum of the left part and the minimum 
of the right part.

Steps:
We perform a binary search on the smaller array.

We compute the partition index for the other array 
based on the partition in the first array.

If the current partition is valid (i.e., the largest 
element on the left side is smaller than the smallest 
element on the right side), then we compute the median.

If the partition is invalid, adjust the binary search range.

Time Complexity:
Time complexity: O(log(min(m, n))), where m and n are the 
lengths of the two arrays. Since we perform binary search 
on the smaller array, the time complexity is logarithmic 
in terms of the smaller array's length.

Space complexity: O(1), since we only use a constant amount 
of space (no extra space is required for merging arrays or 
storing intermediate results).
*/
function findMedianSortedArrays(nums1, nums2) {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }

    const m = nums1.length;
    const n = nums2.length;

    let left = 0;
    let right = m;

    while (left <= right) {
        const partition1 = Math.floor((left + right) / 2);
        const partition2 = Math.floor((m + n + 1) / 2) - partition1;

        // Edge cases
        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
        const minRight1 = partition1 === m ? Infinity : nums1[partition1];

        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
        const minRight2 = partition2 === n ? Infinity : nums2[partition2];

        // Check if partition is correct
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Odd total length, return the max of left elements
            if ((m + n) % 2 === 1) {
                return Math.max(maxLeft1, maxLeft2);
            } else {
                // Even total length, return the average of the max of left elements and min of right elements
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            }
        } else if (maxLeft1 > minRight2) {
            // Move partition1 to the left
            right = partition1 - 1;
        } else {
            // Move partition1 to the right
            left = partition1 + 1;
        }
    }

    throw new Error("Input arrays are not sorted");
}