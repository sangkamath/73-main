/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    var count = 0, multiple = 5;
    while(multiple <= n) {
        count += Math.floor(n/multiple);
        multiple *= 5;
    }
    return count;
};