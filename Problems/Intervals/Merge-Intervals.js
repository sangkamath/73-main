/**
 * @param {number[][]} intervals
 * @return {number[][]}
 * Time complexity: O(n log n). Sorting the intervals takes O(n log n), and the 
 * subsequent iteration through the intervals takes O(n).
Space complexity: O(n). The merged array can hold up to all intervals in the
 worst case if no intervals overlap.
 */
export default function mergeOverlappingIntervals(intervals) {
    if (intervals.length == 0) {
        return [[]];
    }

    intervals.sort((a, b) => a[0] - b[0]);

    var merged = [];
    merged.push(intervals[0]);

    for (var i = 1; i < intervals.length; i++) {
        if (merged[merged.length - 1][1] < intervals[i][0]) {
            merged.push(intervals[i]);
        }
        else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], intervals[i][1]);
        }
    }

    return merged;

}

/*
Time complexity: O(n2). Building the graph requires comparing every pair of
 intervals, resulting in O(n2) operations.

Space complexity: O(n2). The graph can have up to O(n2) edges in the worst
 case, and the visited set and nodesInComp storage scale with the number of 
 intervals.
*/
// Function to check if two intervals overlap
const overlap = (a, b) => {
    return a[0] <= b[1] && b[0] <= a[1];
  };
  
  // Function to build an adjacency list graph from the list of intervals
  const buildGraph = (intervals) => {
    let graph = new Map();
    
    for (let i = 0; i < intervals.length; i++) {
      for (let j = i + 1; j < intervals.length; j++) {
        if (overlap(intervals[i], intervals[j])) {
          if (!graph.has(intervals[i])) graph.set(intervals[i], []);
          if (!graph.has(intervals[j])) graph.set(intervals[j], []);
          
          graph.get(intervals[i]).push(intervals[j]);
          graph.get(intervals[j]).push(intervals[i]);
        }
      }
    }
    return graph;
  };
  
  // Function to find the minimum start and maximum end of a component
  const mergeNodes = (nodes) => {
    let minStart = Infinity;
    let maxEnd = -Infinity;
    
    for (let node of nodes) {
      minStart = Math.min(minStart, node[0]);
      maxEnd = Math.max(maxEnd, node[1]);
    }
    return [minStart, maxEnd];
  };
  
  // Depth-First Search function to find all connected components
  const markComponentDFS = (start, graph, nodesInComp, compNumber, visited) => {
    let stack = [start];
    
    while (stack.length) {
      let node = stack.pop();
      if (!visited.has(node)) {
        visited.add(node);
        
        if (!nodesInComp[compNumber]) nodesInComp[compNumber] = [];
        nodesInComp[compNumber].push(node);
        
        if (graph.has(node)) {
          for (let neighbor of graph.get(node)) {
            stack.push(neighbor);
          }
        }
      }
    }
  };
  
  // Main function to merge all overlapping intervals
  const mergeOverlappingIntervals = (intervals) => {
    let graph = buildGraph(intervals);
    let nodesInComp = {};
    let visited = new Set();
    let compNumber = 0;
  
    for (let interval of intervals) {
      if (!visited.has(interval)) {
        markComponentDFS(interval, graph, nodesInComp, compNumber, visited);
        compNumber++;
      }
    }
  
    let merged = [];
    for (let comp = 0; comp < compNumber; comp++) {
      merged.push(mergeNodes(nodesInComp[comp]));
    }
  
    return merged;
  };
  