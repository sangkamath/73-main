/**
 * @param {number[]} gain
 * @return {number}
 * The time complexity of the function `largestAltitude` is O(n),
 *  where n is the length of the input array `gain`. This is 
 * because the function iterates through the array once, performing
 *  a constant amount of work (updating the current altitude and
 *  checking for the maximum altitude) for each element.

The space complexity is O(1), as the function uses a fixed amount 
of space for the variables `maxAltitude` and `currentAltitude`, 
regardless of the size of the input array. There are no additional
 data structures that grow with the input size.
 */
var largestAltitude = function(gain) {
    let maxAltitude = 0;
    let currentAltitude = 0;

    for (let i = 0; i < gain.length; i++) {
        currentAltitude += gain[i];
        maxAltitude = Math.max(maxAltitude, currentAltitude);
    }

    return maxAltitude;
};