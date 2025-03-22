/*
Insert: O(n) where n is the length of the word.
Search: O(n) where n is the length of the word.
Prefix Search: O(n) where n is the length of the prefix

*/

class TrieNode {
    constructor() {
      this.next = new Array(26).fill(null); // Array to store 26 lowercase letters
      this.isWord = false; // Flag to mark the end of a word
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    // Helper function to traverse the trie and find a node for a given word/prefix
    find(word) {
      let node = this.root;
      for (let char of word) {
        let index = char.charCodeAt(0) - 'a'.charCodeAt(0); // Convert letter to index (0-25)
        if (node.next[index] === null) {
          return null; // If the path doesn't exist, return null
        }
        node = node.next[index];
      }
      return node;
    }
  
    // Insert a word into the trie
    insert(word) {
      let node = this.root;
      for (let char of word) {
        let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        if (node.next[index] === null) {
          node.next[index] = new TrieNode(); // Create a new TrieNode if path doesn't exist
        }
        node = node.next[index];
      }
      node.isWord = true; // Mark the end of the word
    }
  
    // Search for a word in the trie
    search(word) {
      let node = this.find(word);
      return node !== null && node.isWord; // Return true if word exists
    }
  
    // Check if any word in the trie starts with the given prefix
    startsWith(prefix) {
      return this.find(prefix) !== null;
    }
  }
  