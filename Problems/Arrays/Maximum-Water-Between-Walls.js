/**
 * @param {number[]} walls
 * @return {number}
 * Time complexity: O(n). Each pointer moves at most n steps,
 *  leading to a linear runtime.
Space complexity: O(1). No additional space is required 
beyond a few variables for tracking pointers and area 
calculations.
 */
export default function maximumWaterBetweenWalls(walls) {
    var ans = 0, left = 0, right = walls.length - 1;

    while (left < right) {
        ans = Math.max(ans, (right - left) * Math.min(walls[left], walls[right]));

        if (walls[left] < walls[right])
            left++; // Move the smaller edge
        else
            right--; // Move the larger edge
    }

    return ans;
}

/*
Time complexity: O(n^2). The nested loops iterate over 
all pairs of walls, leading to a quadratic time complexity.
Space complexity: O(1). No additional space is used beyond
 a few variables for tracking the maximum area and calculating values.
*/
export default function maximumWaterBetweenWalls(walls){
    // Initialize the maximum area to 0
    let maxArea = 0;
  
    // Iterate over each pair of walls
    for (let left = 0; left < walls.length; left++) {
      for (let right = left + 1; right < walls.length; right++) {
        // Calculate the width between the walls
        const width = right - left;
  
        // Calculate the area using the shorter wall
        const currentArea = Math.min(walls[left], walls[right]) * width;
  
        // Update maxArea if the current area is larger
        maxArea = Math.max(maxArea, currentArea);
      }
    }
  
    // Return the maximum area found
    return maxArea;
  }