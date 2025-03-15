/**
 * @param {string} digits
 * @return {string[]}
 * The time complexity of the `letterCombinations` function can be analyzed 
 * based on the number of digits in the input string. Let n be the
 *  number of digits. Each digit can map to a maximum of 4 letters 
 * (for digits 7 and 9), while the others map to 3 letters. Therefore, 
 * the total number of combinations generated will be at most 4^n.
 *  This is because for each digit, we can choose one of the letters, 
 * leading to a branching factor of up to 4 for each digit. Hence, 
 * the time complexity is O(4^n).

The space complexity is determined by the storage of the result and 
the recursion stack. The result array will store all possible combinations, 
which can be up to 4^n combinations. Additionally, the recursion stack
can go as deep as n (the number of digits), leading to a space complexity 
of O(n) for the stack. Therefore, the overall space complexity is O(4^n) 
for the result plus O(n) for the recursion stack, which simplifies to O(4^n)
 in terms of dominant factors. 

In summary, the time complexity is O(4^n) and the space complexity is O(4^n).
 */
function letterCombinationsDFS(digits) {
    if (!digits) return [];

    const phoneMap = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
    };

    const result = [];

    function backtrack(index, path) {
        if (index === digits.length) {
            result.push(path);
            return;
        }

        for (let letter of phoneMap[digits[index]]) {
            backtrack(index + 1, path + letter);
        }
    }

    backtrack(0, "");
    return result;
}

// Example usage:
console.log(letterCombinationsDFS("23"));

/**
 * @param {string} digits
 * @return {string[]}
 * The time complexity of the `letterCombinations` function can be analyzed based 
 * on the number of digits in the input string and the number of letters 
 * corresponding to each digit. 

Let n be the number of digits in the input string. The maximum number of letters 
that can correspond to a digit is 4 (for digits 7 and 9). Therefore, in the worst 
case, the total number of combinations generated will be 4^n. This is because for 
each digit, we can choose from up to 4 letters, leading to a combinatorial explosion 
as we process each digit. Thus, the time complexity is O(4^n).

The space complexity is primarily determined by the storage of the combinations 
in the queue. In the worst case, we will store up to 4^n combinations. Therefore, 
the space complexity is also O(4^n) due to the storage of the result.

In summary:
- Time complexity: O(4^n)
- Space complexity: O(4^n)
 */
function letterCombinationsBFS(digits) {
    if (!digits) return [];

    const phoneMap = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
    };

    let queue = [""];
    
    for (let digit of digits) {
        let letters = phoneMap[digit];
        let newQueue = [];
        
        for (let combination of queue) {
            for (let letter of letters) {
                newQueue.push(combination + letter);
            }
        }
        
        queue = newQueue;
    }
    
    return queue;
}

// Example usage:
console.log(letterCombinationsBFS("23"));