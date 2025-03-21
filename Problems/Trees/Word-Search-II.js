
class TrieNode {
    constructor() {
        this.next = new Array(26).fill(null);
        this.cnt = 0;
        this.end = false;
    }

    addWord(s) {
        let node = this;
        for (let c of s) {
            let index = c.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!node.next[index]) {
                node.next[index] = new TrieNode();
            }
            node = node.next[index];
            node.cnt++;
        }
        node.end = true;
    }
}
/**
 * @param {string[][]} grid
 * @param {string[]} words
 * @return {string[]}
 * 1. Trie Construction (addWord calls)
We insert each word into the trie, where each word has at most L characters.
There are W words in the words list.
Each character in the word requires constant-time operations (checking, inserting).
Time Complexity: 
O(W⋅L) (for storing the trie)
2. DFS Traversal (findWords)
DFS Call Stack Growth
The board has M × N cells.
In the worst case, we may visit every cell once per DFS traversal.
Each cell has at most 4 possible directions, but we only explore valid paths.
Pruning with Trie
The trie helps in reducing unnecessary searches.
If a prefix doesn't exist in the trie, we backtrack early.
Time Complexity
Each cell (i, j) can be the starting point for DFS.
The worst-case DFS depth is L, the length of the longest word.
The number of possible DFS paths per cell is at most 4^L (in a theoretical 
worst case without pruning).
However, due to pruning from the trie, the actual complexity is much lower.
Without pruning: O(M * N * 4^L)
With pruning (real-world case): O(M * N * L) (since words are limited by L
 and invalid branches terminate early)
Space Complexity
Trie Storage: O(W * L) (for storing words).
DFS Stack (Recursion Depth): In the worst case, the recursion stack grows to 
L (the longest word length).
Board Modification: We temporarily mark visited cells, but this does not add 
extra space.
Total Space Complexity:
O(W⋅L)+O(L)=O(W⋅L), since L is small compared to W * L.

Final Complexity
Operation	Time Complexity	Space Complexity
Trie Construction	O(W * L)	O(W * L)
DFS Traversal	O(M * N * L) (with pruning)	O(W * L) (for Trie)
Worst-Case Complexity (Unrealistic)
If no pruning occurs, O(M * N * 4^L).
But pruning greatly reduces this, making it closer to O(M * N * L) in practical cases.
 */
export default function findWordsInGrid(grid, words) {

    var root = new TrieNode();
    var ans = [];
    var tmp = "";
    var dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (let word of words) {
        root.addWord(word);
    }

    let m = grid.length;
    let n = grid[0].length;

    function dfs(x, y, node) {
        let c = grid[x][y].charCodeAt(0) - 'a'.charCodeAt(0);
        let cnt = 0;

        if (!node.next[c] || node.next[c].cnt === 0) {
            return 0;
        }

        node = node.next[c];
        tmp += grid[x][y];

        if (node.end) {
            ans.push(tmp);
            cnt++;
            node.end = false;
        }

        grid[x][y] = '0';

        for (let [dx, dy] of dirs) {
            let a = x + dx, b = y + dy;
            if (a >= 0 && a < m && b >= 0 && b < n && grid[a][b] !== '0') {
                cnt += dfs(a, b, node);
            }
        }

        grid[x][y] = String.fromCharCode('a'.charCodeAt(0) + c);
        tmp = tmp.slice(0, -1);
        node.cnt -= cnt;

        return cnt;

    }


    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, root);
        }
    }

    ans.reverse();
    return ans;
}