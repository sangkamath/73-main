/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 * The time complexity of the `successfulPairs` function 
 * can be analyzed as follows:

1. Sorting the `potions` array takes O(m log m), where m is the 
length of the `potions` array.
2. For each spell in the `spells` array, we perform a binary 
search on the sorted `potions` array. The binary search takes 
O(log m) time. Since we do this for each spell, and if there are 
n spells, this part takes O(n log m).

Combining these, the overall time complexity is O(m log m + n 
log m), which can be simplified to O((n + m) log m) since both 
terms are dependent on the logarithm of m.

The space complexity is O(1) if we do not consider the input 
arrays, as we are using a constant amount of extra space for 
variables like `result`, `left`, `right`, and `mid`. However, 
if we consider the space used by the input arrays, it would be
 O(m + n) for the `potions` and `spells` arrays.
 */
var successfulPairs = function(spells, potions, success) {
    // Sort the potions array
   potions.sort((a, b) => a - b);
   const result = [];
    // Function to find the number of successful pairs for each spell
   for (let spell of spells) {
       // Calculate the minimum strength of a potion required for success
       const requiredStrength = Math.ceil(success / spell);
       let left = 0, right = potions.length;
       while (left < right) {
           const mid = Math.floor((left + right) / 2);
           if (potions[mid] >= requiredStrength) {
               right = mid;  // Look for a smaller index
           } else {
               left = mid + 1;
           }
       }

       // The number of valid potions is the number of potions from 'left' to the end
       result.push(potions.length - left);
       }

   return result;
};