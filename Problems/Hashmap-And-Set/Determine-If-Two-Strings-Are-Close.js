/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 * 1. The function first checks if the lengths of the two words 
 * are equal, which takes O(1) time.
2. The `getFreqMap` function iterates through each character of 
the input word to create a frequency map. This takes O(n) time, 
where n is the length of the word. Since this function is
 called twice (once for each word), the total time for this 
 part is O(n).
3. After obtaining the frequency maps, the function creates 
arrays of the keys and values from these maps. The creation
 of the keys array involves sorting the unique characters, 
 which takes O(k log k), where k is the number of unique
  characters. The same applies to the values array. In the
   worst case, k can be at most n (if all characters are
    unique), so this sorting step can be considered O(n log n).
4. Finally, the function compares the sorted arrays of keys
 and counts, which takes O(n) time.

Combining these steps, the overall time complexity is
 O(n log n) due to the sorting operations.

The space complexity of the function is as follows:

1. The frequency maps created for both words require O(k)
 space, where k is the number of unique characters in the 
 words. In the worst case, this can be O(n).
2. The arrays created for the keys and counts also require
 O(k) space, which again can be O(n) in the worst case.

Thus, the overall space complexity is O(n) due to the 
storage of frequency maps and arrays. 

In summary, the time complexity is O(n log n) and the
 space complexity is O(n).
 */
var closeStrings = function(word1, word2) {
    if(word1.length != word2.length) return false;

    const getFreqMap = (word) => {
        const map = new Map();
        for (const ch of word) {
            map.set(ch, (map.get(ch) || 0) + 1);
        }
        return map;
    };

    const freq1 = getFreqMap(word1);
    const freq2 = getFreqMap(word2);

   // Check if both words have the same unique characters
    const keys1 = Array.from(freq1.keys()).sort().join('');
    const keys2 = Array.from(freq2.keys()).sort().join('');
    if (keys1 !== keys2) return false;

     // Check if frequency counts are the same (regardless of which char has which count)
    const counts1 = Array.from(freq1.values()).sort((a, b) => a - b);
    const counts2 = Array.from(freq2.values()).sort((a, b) => a - b);
    
    return counts1.toString() === counts2.toString();
};

/*
The time complexity of the function `closeStrings` can 
be analyzed as follows:

1. The function initializes two frequency arrays, `freq1` and 
`freq2`, each of size 26. This initialization takes O(1) time 
since the size is constant.
2. The first loop iterates through `word1` to populate `freq1`. 
If `word1` has a length of n, this loop takes O(n) time.
3. The second loop iterates through `word2` to populate `freq2`.
 If `word2` has a length of m, this loop takes O(m) time.
4. The third loop checks if there are any characters present in 
one word but not in the other. This loop runs for a constant 
size of 26, taking O(1) time.
5. The sorting of the frequency arrays `freq1` and `freq2` 
takes O(26 log 26), which simplifies to O(1) since 26 is a constant.
6. The final loop compares the two sorted frequency arrays, 
which again runs for a constant size of 26, taking O(1) time.

Combining these, the overall time complexity is O(n + m), 
where n is the length of `word1` and m is the length of `word2`.

The space complexity of the function is O(1) as well, since 
the space used for the frequency arrays is constant (two 
arrays of size 26), regardless of the input size. Thus, the 
space complexity is not dependent on the lengths of the input strings. 

In summary, the time complexity is O(n + m) and the space 
complexity is O(1).
*/
var closeStrings = function(word1, word2) {
    let freq1 = new Array(26).fill(0);
    let freq2 = new Array(26).fill(0);

    for (let ch of word1) {
        freq1[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    for (let ch of word2) {
        freq2[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    for (let i = 0; i < 26; i++) {
        if ((freq1[i] === 0 && freq2[i] !== 0) || (freq1[i] !== 0 && freq2[i] === 0)) {
            return false;
        }
    }

    freq1.sort((a, b) => a - b);
    freq2.sort((a, b) => a - b);

    for (let i = 0; i < 26; i++) {
        if (freq1[i] !== freq2[i]) {
            return false;
        }
    }

    return true;
};
