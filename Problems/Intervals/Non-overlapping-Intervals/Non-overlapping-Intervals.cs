using System;
using System.Collections.Generic;

// Using a greedy algorithm - Time: O(nlogn)
/*
Here is the thinking process for arriving at the solution:

Sort the intervals based on their end times. 
This way, we encounter the intervals that 
finish earliest first and can thus make the greedy choice.
Start with the first interval, considering 
it as non-overlapping by default, and make a note of its end time.
Iterate through the subsequent intervals:
If the start time of the current interval is 
not less than the end time of the last non-overlapping 
interval, it means this interval does not overlap with 
the previously considered intervals. We can then update 
our last known end time to be the end time of the current interval.
If the start time is less than the last known end time, 
an overlap occurs, and we must choose to remove an interval. 
Following the greedy approach, we keep the interval 
with the earlier end time and remove the other by 
incrementing our answer (the number of intervals to remove).
*/

public class Solution
{
    public int EraseOverlapIntervals(int[][] intervals)
    {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));

        int ans = 0;
        int end = int.MinValue; // end 

        foreach (var i in intervals)
        {
            if (i[0] >= end)
                end = i[1];
            else
                ans++;
        }

        return ans;
    }
}

class Program
{
    static void Main(string[] args)
    {
        int[][] intervals = new int[][] {
            new int[] {1, 2},
            new int[] {2, 3},
            new int[] {3, 4},
            new int[] {1, 3}
        };
        
        Console.Write("Input: intervals = [");
        foreach (var i in intervals)
        {
            Console.Write("[" + i[0] + "," + i[1] + "]");
            if(i != intervals[intervals.Length - 1])
                Console.Write(",");
        }
        Console.WriteLine("]");

        Solution sol = new Solution();
        int ans = sol.EraseOverlapIntervals(intervals);

        Console.WriteLine("Output: " + ans);
    }
}


