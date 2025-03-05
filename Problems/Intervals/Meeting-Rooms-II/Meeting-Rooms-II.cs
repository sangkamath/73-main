using System;
using System.Collections.Generic;

// Using a greedy algorithm - Time: O(nlogn)
/*
This solution actually mimic what a human being will do. 
Imaging when you have a series of meetings to start,
first you will sort them (with O(N logN) and then when you 
look at first meeting starting time, you will wonder if 
there is a meeting ends (that means a meeting room is released), 
if yes, you will just take that one; otherwise, you will find a new room.

There are one tip here: how to find a meeting room 
quickly that’s available when a meeting (for example, A) 
starts? Below I will sort ending times and check the 
first one(let’s name it B), if A.startTime ≥ B.endTime, 
then actually A can re-use the same meeting room A uses 
and in the same time, the end time is removed since it’s
 already evaluated (as a possible precedent of another meeting); 
 if not, since B is the first one (and the earliest one) that ends,
  then I don’t need to check others end times and will just add room 
  number by 1 since a new room will be needed.
*/
// Definition of Interval:
public class Interval
{
    public int start, end;
    public Interval(int start, int end)
    {
        this.start = start;
        this.end = end;
    }
}

public class Solution
{
    public int MinMeetingRooms(List<Interval> intervals)
    {
        List<int> starts = new List<int>();
        List<int> ends = new List<int>();

        foreach (Interval interval in intervals)
        {
            starts.Add(interval.start);
            ends.Add(interval.end);
        }

        starts.Sort();
        ends.Sort();

        int rooms = 0;
        int endIdx = 0;

        for (int i = 0; i < intervals.Count; i++)
        {
            if (starts[i] < ends[endIdx])
            {
                rooms++;
            }
            else
            {
                endIdx++;
            }
        }

        return rooms;
    }
}


class Program
{
    static void Main(string[] args)
    {
        List<Interval> intervals = new List<Interval>();
        intervals.Add(new Interval(0, 30));
        intervals.Add(new Interval(5, 10));
        intervals.Add(new Interval(15, 20));

        Console.Write("Input: intervals =[");
        foreach (Interval interval in intervals)
        {
            Console.Write("[" + interval.start + "," + interval.end + "]");
            if (interval != intervals[intervals.Count - 1])
            {
                Console.Write(",");
            }
        }
        Console.WriteLine("]");

        Solution sol = new Solution();
        int ans = sol.MinMeetingRooms(intervals);

        Console.WriteLine("Output: " + ans);
    }
}
