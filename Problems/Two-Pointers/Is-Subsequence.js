/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * The time complexity of the function
 *  isSubsequence(s, t) is O(n), where 
n is the length of t.
The space complexity is O(1), as the function
 uses a constant amount of extra space. It only
  utilizes a few variables (sindex and tindex)
   to keep track of the current indices in the 
   strings, regardless of the input size. Thus,
    the space used does not grow with the size 
    of the input strings.
 */
var isSubsequence = function (s, t) {
    if (s === "") return true;
    var sindex = 0, tindex = 0;
    while (sindex < s.length && tindex <
        t.length) {

        if (s[sindex] === t[tindex]) {
            if (sindex === s.length - 1) {
                return true;
            }
            sindex++;
        }
        tindex++;
    }

    return false;
};