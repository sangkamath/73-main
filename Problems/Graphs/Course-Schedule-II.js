/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 * The time complexity of the `findOrder` function is O(V + E), where V is the number of 
 * courses (vertices) and E is the number of prerequisite pairs (edges). This is because
 *  we iterate through the prerequisites to build the graph and the in-degree array, which 
 * takes O(E) time, and then we process each course in the queue, which involves checking
 *  its neighbors, leading to an additional O(V) time.

The space complexity is O(V + E) as well. We use a graph represented as a map, which can 
store up to E edges, and we also maintain an in-degree array of size V. Therefore, the 
overall space used is proportional to the number of courses and the number of prerequisites.
 */
var findOrder = function(numCourses, prerequisites) {
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

    const order = [];
    
    while (queue.length > 0) {
        const course = queue.shift();
        order.push(course); // Add to topological order

        if (graph.has(course)) {
            for (let neighbor of graph.get(course)) {
                inDegree[neighbor]--; // Reduce dependency count
                if (inDegree[neighbor] === 0) queue.push(neighbor);
            }
        }
    }

    return order.length === numCourses ? order : []; // Return empty if cycle exists
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 * The time complexity of the `findOrder` function is O(V + E), where V is the number of 
 * courses (vertices) and E is the number of prerequisites (edges). This is because we
 *  perform a depth-first search (DFS) on each course, and for each course, we may visit
 *  all its neighbors (prerequisites). The graph is built in O(E) time, and the DFS 
 * traversal takes O(V + E) time in total.

The space complexity is O(V + E) as well. The space is used for the graph representation 
(which can take up to O(E) space) and the visited array (which takes O(V) space). 
Additionally, the stack used to store the course order can also grow up to O(V) in the 
worst case, leading to an overall space complexity of O(V + E).
 */
var findOrder = function(numCourses, prerequisites) {
    const graph = new Map();
    const visited = new Array(numCourses).fill(0);
    const stack = [];

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
        stack.push(course); // Postorder addition
        return true;
    }

    // Check for cycles in all courses
    for (let i = 0; i < numCourses; i++) {
        if (visited[i] === 0 && !dfs(i)) return [];
    }

    return stack.reverse(); // Reverse postorder result
};