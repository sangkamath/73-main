/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 * Time complexity: O(n). Each interval is processed exactly once, 
 * resulting in a linear runtime.
Space complexity: O(n). The result array res stores all intervals, 
requiring space proportional to the input size.
 */
export default function mergeNewInterval(intervals, newInterval) {
    var ans = [];
          var start = newInterval[0];
          var end = newInterval[1];
  
          for (var interval of intervals)
          {
              if (start > end)
              {
                  ans.push(interval);
              }
              else if (interval[1] < start)
              {
                  ans.push(interval);
              }
              else if (interval[0] > end)
              {
                  ans.push([ start, end ]);
                  start = end + 1;
                  ans.push(interval);
              }
              else
              {
                  start = Math.min(start, interval[0]);
                  end = Math.max(end, interval[1]);
              }
          }
  
          if (start <= end)
          {
              ans.push([start, end ]);
          }
  
          return ans;
  }

/*
Time complexity: O(n). Binary search takes O(log n), but this is insignificant 
compared to the O(n) time required to merge the intervals.
Space complexity: O(n). The result array res requires space proportional to
 the input size.
*/
  export default function mergeNewInterval(intervals, newInterval) {
    // If the intervals array is empty, return a list containing the newInterval
    if (intervals.length === 0) {
      return [newInterval];
    }
  
    let n = intervals.length;
    let target = newInterval[0]; // The start value of the new interval
    let left = 0,
      right = n - 1;
  
    // Binary search to find the position to insert newInterval
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (intervals[mid][0] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    // Insert newInterval at the found position
    intervals.splice(left, 0, newInterval);
  
    // Initialize the result array to hold merged intervals
    let res = [];
    for (let interval of intervals) {
      // If res is empty or there is no overlap, add the interval to the result
      if (res.length === 0 || res[res.length - 1][1] < interval[0]) {
        res.push(interval);
      } else {
        // If there is an overlap, merge the intervals by updating the end of the last interval in res
        res[res.length - 1][1] = Math.max(res[res.length - 1][1], interval[1]);
      }
    }
    return res; // Return the merged intervals
  }