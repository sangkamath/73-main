using System;
using System.Collections.Generic;

// Using topological sort (bfs) - Time: O(n + m) where n = numCourses and m = prerequisites.Length
/*
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
var canFinish = function (numCourses, prerequisites) {
    // Create adjacency list representation of the graph
    const graph = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);

    // Build the graph and compute in-degrees
    for (const [course, pre] of prerequisites) {
        graph[pre].push(course); // Directed edge pre → course
        indegree[course]++; // Increase in-degree of course
    }

    // Initialize queue with nodes having zero in-degree
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    // Process courses in topological order
    let completedCourses = 0;
    while (queue.length > 0) {
        const course = queue.shift(); // Take course with no prerequisites
        completedCourses++;

        for (const nextCourse of graph[course]) {
            indegree[nextCourse]--; // Reduce in-degree of dependent courses
            if (indegree[nextCourse] === 0) queue.push(nextCourse); // Add to queue if no more prerequisites
        }
    }

    // If all courses are completed, return true
    return completedCourses === numCourses;
};

Explanation
Graph Representation (Adjacency List)

We use an array of lists (graph) to store prerequisites.
graph[pre] contains a list of courses that depend on pre.
Example:
js
Copy
Edit
numCourses = 4, prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]];
Graph:
Copy
Edit
0 → 1
0 → 2
1 → 3
2 → 3
Indegree Calculation

We track how many prerequisites each course has (indegree[course]).
If indegree[i] === 0, it means course i has no dependencies and can be taken.
Topological Sorting using BFS

Start with courses having indegree = 0.
Process them and reduce the indegree of dependent courses.
If a course's indegree reaches 0, enqueue it.
Cycle Detection

If all courses are processed (completedCourses === numCourses), return true.
If some courses remain unprocessed, it means there's a cycle 
(i.e., circular dependency), return false.
Time & Space Complexity
Time Complexity: O(V + E) (Courses + Prerequisites)
Space Complexity: O(V + E) (Graph + Indegree Array + Queue)
Example Walkthrough
js
Copy
Edit
console.log(canFinish(2, [[1, 0]])); // true → No cycles, take 0 → 1
console.log(canFinish(2, [[1, 0], [0, 1]])); // false → Circular dependency (0 → 1 → 0)
console.log(canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]])); // true → 
// Can complete courses
This solution ensures that all courses can be finished if and only if the 
graph has no cycles. 🚀
*/
public class Solution
{
    public bool CanFinish(int numCourses, int[][] prerequisites)
    {
        List<List<int>> graph = new List<List<int>>(numCourses);

        for (int i = 0; i < numCourses; i++)
        {
            graph.Add(new List<int>());
        }

        int[] indegree = new int[numCourses];

        foreach (var p in prerequisites)
        {
            graph[p[1]].Add(p[0]);
            indegree[p[0]]++;
        }

        Queue<int> q = new Queue<int>(); // q = queue of nodes with indegree = 0
        
        for (int i = 0; i < numCourses; i++)
        {
            if (indegree[i] == 0) q.Enqueue(i);
        }

        while (q.Count > 0)
        {
            int u = q.Dequeue();
            numCourses--;

            foreach (int v in graph[u])
            {
                if (indegree[v]-- == 0) q.Enqueue(v);
            }
        }

        return numCourses == 0;
    }
}

class Program
{
    static void Main()
    {
        int numCourses = 2;

        int[][] prerequisites = new int[][]
        {
            new int[] { 1, 0 },
            new int[] { 0, 1 },
        };

        Console.Write("Input: numCourses: {0}, prerequisites = [", numCourses);
        foreach (var p in prerequisites)
        {
            Console.Write("[{0}, {1}], ", p[0], p[1]);
            if (p == prerequisites[prerequisites.Length - 1])
                Console.Write("\b\b"); 
        }
        Console.WriteLine("]");

        Solution sol = new Solution();
        bool result = sol.CanFinish(numCourses, prerequisites);

        Console.WriteLine("Output: {0}", result);
    }
}
