/**
 * @param {number[]} arr
 * @return {boolean}
 * The time complexity of the `uniqueOccurrences` function is
 *  O(n), where n is the number of elements in the input
 * array `arr`. This is because we iterate through the
 *  array once to populate the frequency map, which takes 
 * O(n) time. After that, we create an array from the map 
 * values and a set from that array, both of which also 
 * take O(n) time in the worst case. Therefore, the overall 
 * time complexity remains O(n).

The space complexity is also O(n). This is due to the 
storage of the frequency map, which can potentially store 
up to n unique elements if all elements in the array
 are distinct. Additionally, the array created from 
 the map values and the set also require O(n) space 
 in the worst case. Thus, the overall space complexity is O(n).
 */
var uniqueOccurrences = function(arr) {
    var map = new Map();
    for(var i = 0; i < arr.length; i++) {
        if(map.has(arr[i])) {
            map.set(arr[i], map.get(arr[i]) + 1);
        } else {
            map.set(arr[i], 1);
        }
    }

    var array = Array.from(map.values());
    var set = new Set(array);

    return array.length === set.size;
};

var uniqueOccurrences = function(arr) {
    const freqMap = new Map();
    
    for (const num of arr) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    const counts = Array.from(freqMap.values());
    return new Set(counts).size === counts.length;
};