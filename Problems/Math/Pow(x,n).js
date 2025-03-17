/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 * The time complexity of the given function myPow is O(log n). This is because the 
 * algorithm uses exponentiation by squaring, which reduces the problem size by 
 * half in each iteration of the while loop. Specifically, the loop continues until 
 * the power is reduced to zero, and since the power is halved in each iteration, the 
 * number of iterations is proportional to the logarithm of n.

The space complexity is O(1). This is because the function uses a constant amount of 
space regardless of the input size. It only utilizes a few variables (result, power) 
to store intermediate values, and no additional data structures are used that would 
grow with the size of the input.
 */
var myPow = function(x, n) {
    if (n === 0) return 1;
 
     let power = Math.abs(n);
     let result = 1;
     
     while (power > 0) {
         if (power % 2 === 1) {
             result *= x; // If power is odd, multiply x
         }
         x *= x;  // Square x
         power = Math.floor(power / 2); // Reduce power by half
     }
 
     return n < 0 ? 1 / result : result;
 };

 /**
 * @param {number} x
 * @param {number} n
 * @return {number}
 * The time complexity of the `myPow` function is O(log n). This is because the function
 *  uses a divide-and-conquer approach, where the exponent `n` is halved in each 
 * recursive call. As a result, the number of recursive calls grows logarithmically 
 * with respect to `n`.

The space complexity is O(log n) as well. This is due to the recursive nature of
 the function, where each recursive call adds a new layer to the call stack. In
  the worst case, the maximum depth of the recursion is proportional to the 
  logarithm of `n`, leading to a logarithmic space usage. 

In summary, both time and space complexities are O(log n).
 */
var myPow = function(x, n) {
    if (n === 0) return 1;  // Base case

    if (n < 0) {
        x = 1 / x;  // Handle negative exponent
        n = -n;
    }

    if (n % 2 === 0) {
        let half = myPow(x, n / 2);
        return half * half;
    } else {
        let half = myPow(x, (n - 1) / 2);
        return x * half * half;
    }
};
