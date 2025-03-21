/**
 * @param {number[][]} numbers
 * @return {boolean}
 * Time complexity: O(n log n). Sorting the intervals dominates the runtime, 
 * taking O(n log n), while the linear scan through the intervals takes O(n), 
 * resulting in O(n log n) overall.
Space complexity: O(1). The algorithm uses constant space as it modifies the 
intervals array in place and does not require additional data structures.
 */
export default function isMeetingCalendarValid(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
  
          for (var i = 1; i < intervals.length; i++)
          {
              if (intervals[i][0] < intervals[i - 1][1])
              {
                  return false;
              }
          }
  
          return true;
  }

  /*
Time complexity: O(n2). The algorithm iterates through all pairs of
 intervals, resulting in n(n - 1)/2 comparisons, which is O(n2).
Space complexity: O(1). The algorithm uses constant space as it does 
not require any additional data structures.

  */
  export default function isMeetingCalendarValid(intervals){
    const overlap = (interval1, interval2) => {
      return (
        (interval1[0] >= interval2[0] && interval1[0] < interval2[1]) ||
        (interval2[0] >= interval1[0] && interval2[0] < interval1[1])
      );
    };
  
    // Iterate through each pair of intervals to check for overlaps
    for (let i = 0; i < intervals.length; i++) {
      for (let j = i + 1; j < intervals.length; j++) {
        if (overlap(intervals[i], intervals[j])) {
          return false; // If any overlap is found, return false
        }
      }
    }
    return true; // If no overlaps are found, return true
  }