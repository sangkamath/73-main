/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 * Time complexity: O(m+n)
 * Space complexity: O(1) or O(m+n)
 */
var mergeAlternately = function(word1, word2) {
    var n =0,m=0;
    var result = "";
    var isWord1 = true;
    while(n < word1.length && m < word2.length)  {
        if(isWord1) {
            result += word1[n];
            n++;
            isWord1 = false;
        } else {
            result += word2[m];
            m++;
            isWord1 = true;
        }
    }

    while(n < word1.length) {
        result += word1[n];
        n++;
    }

     while(m < word2.length) {
        result += word2[m];
        m++;
    }

    return result;
};