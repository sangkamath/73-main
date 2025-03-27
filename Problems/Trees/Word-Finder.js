class TrieNode {
    constructor() {
        this.next = new Array(26).fill(null); // Array for 26 lowercase letters
        this.end = false; // Marks the end of a word
    }
}

export default class WordFinder {
    /*
    **Trie Structure**: The space complexity of the Trie depends 
    on the number of words added and their average length. 
    In the worst case, if all characters are unique, 
    the space complexity can be O(N * L), where N is the 
    number of words and L is the average length of the words. 
    Each node in the Trie can have up to 26 children 
    (for each letter of the alphabet), leading to potentially large space usage.
    **Auxiliary Space**: The auxiliary space used during the search operation 
    is O(L) due to the recursive call stack in the `dfs` method. However,
     this is generally overshadowed by the space used by the Trie itself.

In summary, the time complexity for both adding and searching words is
 O(L), and the space complexity is O(N * L) in the worst case, where 
 N is the number of words and L is the average length of the words.
    */
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
     * **Adding a Word (`addWord` method)**: The time complexity 
     * for adding a word of length `L` is O(L). This is because
     *  we traverse each character of the word and insert it into
     *  the Trie, which involves a constant amount of work for each character.
     */
    addWord(word) {
        let node = this.root;
        for (const char of word) {
            const index = char.charCodeAt(0) - "a".charCodeAt(0);
            if (!node.next[index]) {
                node.next[index] = new TrieNode();
            }
            node = node.next[index];
        }
        node.end = true;
    }

    /**
     * @param {string} word
     * @returns {boolean}
     * Searching for a Word (`search` method)**: The time complexity 
     * for searching a word of length `L` is also O(L). In the worst 
     * case, we may need to traverse the entire length of the word. 
     * If the word contains a '.', we may have to explore multiple 
     * paths, but since there are at most 26 letters, the search remains efficient.
     */
    search(word) {
        return this.dfs(this.root, word, 0);
    }

    dfs(node, word, i) {
        if (!node) return false; // Base case: If node is null, return false
        if (i === word.length) return node.end; // If end of word, check if it's valid

        const char = word[i];
        if (char !== '.') {
            // If the character is a letter, follow the Trie path
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            return this.dfs(node.next[index], word, i + 1);
        }

        // If it's a '.', try all possible paths
        for (let j = 0; j < 26; j++) {
            if (this.dfs(node.next[j], word, i + 1)) {
                return true;
            }
        }
        return false;
    }
}
