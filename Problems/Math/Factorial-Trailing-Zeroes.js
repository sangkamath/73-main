/**
 * @param {number} n
 * @return {number}
 * The time complexity of the function `trailingZeroes` is O(log5(n)). This is because 
 * the while loop continues to execute as long as `multiple` (which starts at 5 and is 
 * multiplied by 5 in each iteration) is less than or equal to `n`. The number of iterations
 *  is proportional to the logarithm of `n` base 5, since each iteration effectively reduces 
 * the problem size by a factor of 5.

The space complexity of the function is O(1). This is because the function uses a constant 
amount of space regardless of the input size `n`. It only utilizes a few variables (`count` 
and `multiple`) to keep track of the calculations, and no additional data structures are
used that would scale with the input size.
 */
var trailingZeroes = function(n) {
    var count = 0, multiple = 5;
    while(multiple <= n) {
        count += Math.floor(n/multiple);
        multiple *= 5;
    }
    return count;
};

/**
 * @param {number} n
 * @return {number}
 * The function `trailingZeroes` calculates the number of trailing zeroes in the 
 * factorial of a given number `n`. 

Time Complexity:
The time complexity of this function is O(log n). This is because in each iteration of
 the while loop, `n` is divided by 5, which reduces its size significantly. The loop 
 continues until `n` is less than 5, leading to a logarithmic number of iterations
  relative to the size of `n`.

Space Complexity:
The space complexity of this function is O(1). This is because the function uses a 
constant amount of space regardless of the input size. It only utilizes a few 
variables (`count` and `n`), and does not require any additional data structures 
that grow with the input. 

In summary, the function has a time complexity of O(log n) and a space complexity of O(1).
 */
var trailingZeroes = function(n) {
    let count = 0;
    while (n >= 5) {
        n = Math.floor(n / 5);
        count += n;
    }
    return count;
};