/**
 * @param {number[]} numbers
 * @return {number[]}
 * Time complexity: O(n). The algorithm involves three linear passes: one to compute the prefix 
 * array, one to compute the suffix array, and one to compute the result array.
Space complexity: O(n). Two auxiliary arrays (prefix and suffix) of size n are used in addition 
to the result array.
 */
function arrayProductExcludingCurrent(numbers) {
    var leftResult = 1;
    var left = new Array(numbers.length).fill(1);

    // Build left product array
    for (var i = 1; i < numbers.length; i++) {
        left[i] = numbers[i - 1] * leftResult;
        leftResult = left[i];
    }

    var rightResult = 1;
    var right = new Array(numbers.length).fill(1); // Fixed initialization
    for (var i = numbers.length - 2; i >= 0; i--) { // Fixed loop condition
        right[i] = numbers[i + 1] * rightResult;
        rightResult = right[i];
    }

    // Compute final result
    var result = new Array(numbers.length);
    for (var i = 0; i < numbers.length; i++) {
        result[i] = left[i] * right[i];
    }

    return result;
}

/*
Time complexity: O(n). The algorithm involves two linear passes over the array for calculating left 
and right products and one additional pass for normalization.
Space complexity: O(1). The solution uses constant extra space, as calculations are performed 
directly in the result array.
*/
function arrayProductExcludingCurrent(numbers) {
    const result = new Array(numbers.length).fill(1);

    let leftProduct = 1;
    for (let i = 0; i < numbers.length; i++) {
        result[i] = leftProduct;
        leftProduct *= numbers[i];
    }

    let rightProduct = 1;
    for (let i = numbers.length - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= numbers[i];
    }

    return result;
}

/*
Time complexity: O(n). The algorithm involves three linear passes: one to compute the prefix array, 
one to compute the suffix array, and one to compute the result array.
Space complexity: O(n). Two auxiliary arrays (prefix and suffix) of size n are used in addition
 to the result array.
*/
export default function arrayProductExcludingCurrent(
    numbers
) {
    const n = numbers.length;

    // Create prefix and suffix arrays
    const prefix = new Array(n).fill(1);
    const suffix = new Array(n).fill(1);
    const result = new Array(n).fill(1);

    // Step 1: Fill prefix array
    prefix[0] = 1; // First element has no elements to its left
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] * numbers[i - 1];
    }

    // Step 2: Fill suffix array
    suffix[n - 1] = 1; // Last element has no elements to its right
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * numbers[i + 1];
    }

    // Step 3: Calculate result array by combining prefix and suffix
    for (let i = 0; i < n; i++) {
        result[i] = prefix[i] * suffix[i];
    }

    // Step 4: Convert -0 to 0 if needed
    for (let i = 0; i < n; i++) {
        if (result[i] === -0) {
            result[i] = 0;
        }
    }

    return result;
}

/*
Time complexity: O(n). The algorithm involves two linear passes over the array for calculating 
left and right products and one additional pass for normalization.
Space complexity: O(1). The solution uses constant extra space, as calculations are performed 
directly in the result array.
*/
export default function arrayProductExcludingCurrent(
    numbers
) {
    // Get the length of the input array
    const length = numbers.length;

    // Initialize the result array
    const result = new Array(length).fill(1);

    // Calculate products of all elements to the left of each index
    for (let i = 1; i < length; i++) {
        // result[i] contains the product of all elements to the left of index 'i'
        result[i] = numbers[i - 1] * result[i - 1];
    }

    // Variable to hold the product of all elements to the right
    let rightProduct = 1;
    for (let i = length - 1; i >= 0; i--) {
        // Multiply the right product with the current result
        result[i] *= rightProduct;
        // Update rightProduct with the current element
        rightProduct *= numbers[i];
    }

    // Convert -0 or +0 to normal 0
    for (let i = 0; i < length; i++) {
        if (result[i] === -0) {
            result[i] = 0;
        }
    }

    return result;
}