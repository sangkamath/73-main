/*
The time complexity of the `canVisitAllRooms` function is O(V + E), where
 V is the number of rooms (vertices) and E is the total number of
  keys (edges) across all rooms. This is because each room is
   visited once, and each key is processed once when exploring the rooms.

The space complexity is O(V), which accounts for the space used 
by the `visited` set to store the visited rooms and the `stack`
 used for the depth-first search. In the worst case, both the 
 `visited` set and the `stack` could grow to the size of the 
 number of rooms, leading to this space complexity. 
*/
var canVisitAllRooms = function(rooms) {
    // Number of rooms
    const n = rooms.length;
    
    // Set to track visited rooms
    const visited = new Set();
    
    // Stack for DFS
    const stack = [0];
    
    while (stack.length > 0) {
        // Pop the last room from the stack
        const room = stack.pop();
        
        // If the room has not been visited, mark it as visited
        if (!visited.has(room)) {
            visited.add(room);
            
            // Add all the rooms that can be unlocked by keys found in the current room
            for (const key of rooms[room]) {
                if (!visited.has(key)) {
                    stack.push(key);
                }
            }
        }
    }
    
    // If the number of visited rooms equals the total number of rooms, return true
    return visited.size === n;
};