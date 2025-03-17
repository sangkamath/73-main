/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 * This problem is a classic cycle detection in a directed graph problem. It can be solved 
 * using Topological Sorting with Kahn's Algorithm (BFS) or DFS cycle detection.
 * The time complexity of the `canFinish` function is O(V + E), where V is the number of 
 * courses (vertices) and E is the number of prerequisite pairs (edges). This is because 
 * we need to build the graph and the in-degree array in O(E) time, and then we process 
 * each course and its neighbors in the queue, which also takes O(V + E) time in total.

The space complexity is O(V + E) as well. We use a graph represented as a map to store 
the adjacency list, which requires O(E) space for the edges, and we also maintain an 
in-degree array of size V, which requires O(V) space. Thus, the overall space complexity
 is dominated by the graph representation and the in-degree array.
  BFS is the recommended approach for clarity and efficiency.
 */
var canFinish = function(numCourses, prerequisites) {
    const graph = new Map();
    const inDegree = new Array(numCourses).fill(0);

    // Build graph and in-degree array
    for (let [course, pre] of prerequisites) {
        if (!graph.has(pre)) graph.set(pre, []);
        graph.get(pre).push(course);
        inDegree[course]++;
    }

    // Initialize queue with courses having in-degree of 0 (no prerequisites)
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    // Process courses in topological order
    let count = 0;
    while (queue.length > 0) {
        const course = queue.shift();
        count++;

        if (graph.has(course)) {
            for (let neighbor of graph.get(course)) {
                inDegree[neighbor]--; // Reduce dependency count
                if (inDegree[neighbor] === 0) queue.push(neighbor);
            }
        }
    }

    return count === numCourses; // True if we processed all courses
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 * The time complexity of the `canFinish` function is O(V + E), where V is the number of 
 * courses (vertices) and E is the number of prerequisite pairs (edges). This is because 
 * we perform a depth-first search (DFS) for each course, and in the worst case, we may 
 * visit every course and every prerequisite once.

The space complexity is O(V), which is used for the `visited` array that keeps track of 
the state of each course (unvisited, visiting, or processed). Additionally, the space
complexity for the graph representation is also O(E) in the worst case, but since we 
are primarily concerned with the number of courses, we can consider the overall space 
complexity to be O(V + E). However, in terms of the dominant factor, it is often simplified
 to O(V).
 */
var canFinish = function(numCourses, prerequisites) {
    const graph = new Map();
    const visited = new Array(numCourses).fill(0);

    // Build graph
    for (let [course, pre] of prerequisites) {
        if (!graph.has(pre)) graph.set(pre, []);
        graph.get(pre).push(course);
    }

    function dfs(course) {
        if (visited[course] === 1) return false; // Cycle detected
        if (visited[course] === 2) return true; // Already processed

        visited[course] = 1; // Mark as visiting
        if (graph.has(course)) {
            for (let neighbor of graph.get(course)) {
                if (!dfs(neighbor)) return false;
            }
        }
        visited[course] = 2; // Mark as processed
        return true;
    }

    // Check for cycles in all courses
    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return false;
    }

    return true;
};