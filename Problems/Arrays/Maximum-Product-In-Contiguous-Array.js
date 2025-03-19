/**
 * @param {number[]} numbers
 * @return {number}
 * Time complexity: O(n). Each element is processed once.
Space complexity: O(1). There is no additional data structures 
being used, so constant space is used.
 */
export default function maxProductSubArray(numbers) {
    var minProduct = numbers[0];
    var maxProduct = numbers[0];
    var res = numbers[0];

    for (var i = 1; i < numbers.length; i++) {
        var num = numbers[i];
        var tempMax = Math.max(num, Math.max(num * maxProduct,
            num * minProduct));
        minProduct = Math.min(num, Math.min(num * maxProduct, num * minProduct));
        maxProduct = tempMax;
        res = Math.max(res, maxProduct);
    }
    return res;
}

/*
Time complexity: O(n). Each element is processed once.
Space complexity: O(1). Only a constant amount of extra space is required.
*/
export default function maxProductSubArray(numbers){
    // Get the size of the input array
    const n = numbers.length;
  
    // Initialize variables to store prefix product, suffix product, and maximum product
    let pre = 1; // Stores the product of all elements up to the current element (inclusive)
    let suff = 1; // Stores the product of all elements from the end up to the current element (inclusive)
    let maxProduct = Number.NEGATIVE_INFINITY; // Tracks the maximum product of any subarray found so far
  
    // Iterate through the array
    for (let i = 0; i < n; i++) {
      // Handle the case where the previous product was 0 (requires reset to 1)
      pre = pre === 0 ? numbers[i] : pre * numbers[i];
  
      // Handle the case where the previous product was 0 (requires reset to 1)
      suff = suff === 0 ? numbers[n - i - 1] : suff * numbers[n - i - 1];
  
      // Update the maximum product considering both prefix and suffix products
      maxProduct = Math.max(maxProduct, Math.max(pre, suff));
    }
  
    // Return the maximum product of any subarray found
    return maxProduct;
  }