class TrieNode {
    constructor() {
        this.next = new Array(26).fill(null); // Array for 26 lowercase letters
        this.end = false; // Marks the end of a word
    }
}

export default class WordFinder {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * @param {string} word
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
