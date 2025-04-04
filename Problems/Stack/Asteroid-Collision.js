/**
 * @param {number[]} asteroids
 * @return {number[]}
 * The time complexity of the `asteroidCollision` function is O(n), 
 * where n is the number of asteroids in the input array. This is
 *  because each asteroid is processed once in the for loop, and 
 * in the worst case, each asteroid may be pushed and popped from 
 * the stack a limited number of times. The while loop checks the 
 * top of the stack, but since each asteroid can only collide with 
 * the top asteroid of the stack, the overall number of operations
 *  remains linear.

The space complexity is O(n) in the worst case, which occurs when 
there are no collisions and all asteroids are pushed onto the
 stack. In this scenario, the stack will contain all n asteroids.
  If there are many collisions, the space used by the stack 
  will be less than n, but the worst-case scenario remains O(n).

  If the input is [-5, 10], no collision will occur, and the
  result will simply be [-5, 10].

Why?
-5 is moving left (negative sign), and it's at index 0.

10 is moving right (positive sign), and it's at index 1.

Since they are moving away from each other, they will never 
collide.

Collision only happens when:
A positive asteroid comes before a negative asteroid in 
the array, like [10, -5].
In this case, the right-moving asteroid and left-moving 
asteroid are on a collision course.

So for [-5, 10], the two asteroids pass by in opposite 
directions with no interaction.
 */
var asteroidCollision = function(asteroids) {
    const stack = [];

    for (let ast of asteroids) {
        let destroyed = false;

        while (
            stack.length > 0 &&
            ast < 0 &&
            stack[stack.length - 1] > 0
        ) {
            let top = stack[stack.length - 1];

            if (top < -ast) {
                stack.pop(); // top explodes, continue checking
            } else if (top === -ast) {
                stack.pop(); // both explode
                destroyed = true;
                break;
            } else {
                destroyed = true; // current one explodes
                break;
            }
        }

        if (!destroyed) {
            stack.push(ast);
        }
    }

    return stack;
};