/**
 * @param {string} str
 * @return {number}
 * Time complexity: O(n). Each character is processed once when moving the right 
 * pointer, and each duplicate character is processed once when adjusting the 
 * left pointer.
Space complexity: O(n). The map stores the last seen positions of characters, 
which could require space proportional to the size of the input string.
 */
export default function longestUniqueSubstring(str) {
    if (str === null || str === "") return 0;

    var map = new Map();
    var maxLen = 0;
    var lastRepeatPos = -1; //handles 0 indexing.

    for (var i = 0; i < str.length; i++) {
        if (map.has(str[i]) && lastRepeatPos < map.get(str[i]))
            lastRepeatPos = map.get(str[i]);

        if (maxLen < i - lastRepeatPos) {
            maxLen = i - lastRepeatPos;
        }

        map.set(str[i], i);
    }

    return maxLen;
}


/*
Time complexity: O(n^2). The outer loop iterates n times, and for each starting 
index, the inner loop may iterate up to n times in the worst case.
Space complexity: O(1). The visited array has a fixed size of 256, which does
 not depend on the input size.
*/
export default function longestUniqueSubstring(str){
    let n = str.length; // Get the length of the input string
    let res = 0; // Variable to store the length of the longest substring without repeating characters

    // Iterate over all possible starting points of substrings
    for (let i = 0; i < n; i++) {
        // Initializing all characters as not visited
        let visited = new Array(256).fill(false);

        for (let j = i; j < n; j++) {
            // If current character is visited
            // Break the loop
            if (visited[str.charCodeAt(j)] === true) {
                break;
            } else {
                // Else update the result if this window is larger,
                // and mark current character as visited.
                res = Math.max(res, j - i + 1);
                visited[str.charCodeAt(j)] = true;
            }
        }
    }
    return res;
}