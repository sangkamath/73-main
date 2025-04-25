/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 * Time Complexity:
The time complexity of this algorithm is O(log n). This is because with 
each iteration of the while loop, the search space is halved. The binary 
search approach efficiently narrows down the possible numbers by 
eliminating half of the remaining candidates based on the feedback 
from the `guess` function.

Space Complexity:
The space complexity of this algorithm is O(1). The algorithm uses 
a constant amount of space for the variables `left`, `right`, and 
`mid`, regardless of the size of n. There are no additional data 
structures or recursive calls that would increase the space usage. 
 */
var guessNumber = function(n) {
    var left = 1, right = n;
    while(left <= right) {
        var mid = Math.floor((left + right) / 2);
        let ans = guess(mid);
        if(ans === 0) {
            return mid;
        } else if(ans === -1) {
            right = mid - 1;
        } else if(ans === 1) {
            left = mid + 1;
        }
    }
};