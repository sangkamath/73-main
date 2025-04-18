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

var reverseWords = function(s) {
    let words = s.split(' ').filter(word => word !== "");
    let left = 0;
    let right = words.length - 1;

    while (left < right) {
        [words[left], words[right]] = [words[right], words[left]];
        left++;
        right--;
    }

    return words.join(' ');
};