/**
 * @param {string} s
 * @return {string}
 * Overall, the dominant factor in the time complexity is O(n), 
 * leading to a total time complexity of O(n).
 * Thus, the overall space complexity is O(n) due to the storage of the words in the array. 
 */
var reverseWords = function(s) {
    s = s.trim();
    var words = s.split(" ");
    words = words.reverse();
    return words.filter(a => { return a!= "" && a!= " "}).join(" ");
};