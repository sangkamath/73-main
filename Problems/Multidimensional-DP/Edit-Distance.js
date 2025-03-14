var minDistance = function (word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(null));
    //Creates a 2D array of size (m+1) x (n+1) (to include empty string cases).
    //Each cell starts as null and will later store computed values.

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    //To convert "abc" to an empty string "", we need i deletions.
    //To convert an empty string "" to "abc", we need j insertions.

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No change needed
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j - 1],   // Substitution
                    dp[i - 1][j],       // Deletion
                    dp[i][j - 1]) + 1;  // Insertion 
            }
        }
    }
    //If characters match, we copy the diagonal value (dp[i-1][j-1]).
    //If characters don't match, we take the minimum of:
        //Substituting (dp[i-1][j-1] + 1)
        //Deleting a character from word1 (dp[i-1][j] + 1)
        //Inserting a character into word1 (dp[i][j-1] + 1)

    return dp[m][n];
};

/*
Time Complexity: O(m * n) → We compute each cell once.
Space Complexity: O(m * n) → We store a 2D table.
*/

var minDistance = function(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    
    let prev = Array(n + 1).fill(0);
    let curr = Array(n + 1).fill(0);
    
    // Initialize base case for empty string transformations
    for (let j = 0; j <= n; j++) {
        prev[j] = j;
    }

    for (let i = 1; i <= m; i++) {
        curr[0] = i; // First column initialization (deleting all characters from word1)

        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[j] = prev[j - 1]; // No operation needed
            } else {
                curr[j] = Math.min(
                    prev[j - 1], // Substitution
                    prev[j],     // Deletion
                    curr[j - 1]  // Insertion
                ) + 1;
            }
        }

        // Swap arrays: Move curr to prev for next iteration
        [prev, curr] = [curr, prev];
    }

    return prev[n]; // The last computed row holds the result
};

/*
Time Complexity: O(m * n) → We compute each cell once.
Space Complexity: O(n) → We store a 1D table.
*/