/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 * The time complexity of the function `shortestSubstringContainingCharacters`
 *  is O(n + m), where n is the length of `str1` and m is the length of `str2`. 
 * This is because the algorithm involves a single pass through `str1` with
 *  the outer while loop (which runs until `j` reaches the end of `str1`)
 *  and an inner while loop that processes each character in `str1` at 
 * most once. The operations inside the loops, such as updating counts
 *  and checking conditions, are O(1) due to the fixed size of the
 *  character count array (128 for ASCII characters).

The space complexity is O(1) in terms of additional space used, as the 
character count array `cnt` has a fixed size of 128 regardless of the 
input size. Therefore, the space used does not grow with the input sizes
 of `str1` or `str2`. The only other variables used are a few integers
  for indices and counters, which also occupy constant space.
   Thus, the overall space complexity remains O(1).
 */
export default function shortestSubstringContainingCharacters(str1, str2) {
    //We create an array cnt of size 128 (to cover all ASCII characters).
    //Each index represents a character, and the value at that index 
    // is its frequency in str2.
    var cnt = new Array(128).fill(0); // Initialize array with 0s

    // Fill the count array with frequency of str2's characters
    for (var i = 0; i < str2.length; i++) {
        cnt[str2.charCodeAt(i)]++;
    }

    //We maintain a window [i, j] in str1 and expand it to include
    //  all characters from str2.
    //i and j are window boundaries.
    //start stores the starting index of the minimum-length substring found.
    //minLen keeps track of the shortest substring length.
    //matched counts how many characters from str2 are currently in the window.
    var n = str1.length;
    var i = 0, j = 0, start = -1, minLen = Number.MAX_VALUE, matched = 0;

    while (j < n) {
        //If str1[j] is a required character
        //  (i.e., count > 0), we increase matched.
        //We decrease its count in cnt and expand the window.
        if (cnt[str1.charCodeAt(j)] > 0) {
            matched++;
        }
        cnt[str1.charCodeAt(j)]--;
        j++;

        // Try to shrink the window
        //Once all characters from str2 are included in the window
        //  (matched == str2.length), we try to shrink the window.
        while (matched == str2.length) {
            //If the current window is smaller than minLen, 
            // we update start and minLen.
            if (j - i < minLen) {
                minLen = j - i;
                start = i;
            }

            //We remove str1[i] from the window and move i to the right.
            if (cnt[str1.charCodeAt(i)] === 0) {
                matched--;
            }
            cnt[str1.charCodeAt(i)]++;
            i++;
        }
    }

    //If start is -1, no valid substring was found. Otherwise, we return the shortest substring.
    return start == -1 ? "" : str1.substring(start, start + minLen);
}