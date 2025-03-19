/**
 * @param {number[][]} intervals
 * @return {number}Time complexity: O(n log n). Sorting the intervals 
 * takes O(n log n), and the subsequent iteration through the intervals takes O(n).
Space complexity: O(1). The algorithm operates in constant space as it 
processes the input array in-place.
The problem is to find the minimum number of intervals to remove so that the 
remaining intervals are non-overlapping. The greedy approach optimizes this by
 always choosing the interval with the earliest ending time, as this leaves the
 most room for subsequent intervals. Sorting by the second element ensures that 
 intervals with the smallest end times are prioritized.


 */
export default function disjointIntervals(intervals) {
      // Sort intervals by the second element
    intervals.sort((a,b) => a[1] - b[1]);
    var ans = 0;
    var end = Number.MIN_VALUE;
  
    intervals.forEach((i) => {
      if(i[0] >= end) {
        // Case 1: No overlap, update end to the end of the current interval
        end = i[1]
      } else {
         // Case 2: Overlap, increment the answer
        ans++;
      }
    });
  
    // Return the number of overlaps
    return ans;
  }