/**
 * @param {string[]} words
 * @return {string}
 * Time complexity: O(n + m). Processing all characters takes O(m), where m is 
 * the total number of characters in the input. Building edges and performing BFS
 *  takes O(n + m), where n is the number of unique characters.
Space complexity: O(n + m). The adjacency list and in-degree map require O(n + m) space.
 */
export default function extraterrestrialLanguage(words) {
    const adjList = {};
    const counts = {};

    // Initialize the adjacency list and the counts map
    for (const word of words) {
        for (const c of word) {
            if (!counts[c]) {
                counts[c] = 0;
                adjList[c] = [];
            }
        }
    }

    // Step 1: Find all edges.
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];

        // Check that word2 is not a prefix of word1.
        if (word1.length > word2.length && word1.startsWith(word2)) {
            return '';
        }

        // Find the first non-match and insert the corresponding relation.
        for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
            if (word1[j] !== word2[j]) {
                adjList[word1[j]].push(word2[j]);
                counts[word2[j]]++;
                break;
            }
        }
    }

    // Step 2: Breadth-first search.
    const sb = [];
    const queue = [];

    // Enqueue characters with no incoming edges (counts[c] === 0)
    for (const c in counts) {
        if (counts[c] === 0) {
            queue.push(c);
        }
    }

    // Perform BFS to build the result string
    while (queue.length > 0) {
        const c = queue.shift();
        sb.push(c);
        for (const next of adjList[c]) {
            counts[next]--;
            if (counts[next] === 0) {
                queue.push(next);
            }
        }
    }

    // If the result length is less than the number of unique characters, return an empty string
    if (sb.length < Object.keys(counts).length) {
        return '';
    }

    return sb.join('');
}

export default function alienDictionary(words) {
    // Step 1: Initialize Graph
    const graph = new Map(); // Adjacency List
    const inDegree = new Map(); // In-degree count

    // Initialize graph with all unique characters
    for (let word of words) {
        for (let char of word) {
            if (!graph.has(char)) {
                graph.set(char, new Set());
                inDegree.set(char, 0);
            }
        }
    }

    // Step 2: Build Graph by Comparing Adjacent Words
    for (let i = 0; i < words.length - 1; i++) {
        let w1 = words[i];
        let w2 = words[i + 1];

        let minLength = Math.min(w1.length, w2.length);
        let foundOrder = false;

        for (let j = 0; j < minLength; j++) {
            if (w1[j] !== w2[j]) {
                if (!graph.get(w1[j]).has(w2[j])) {
                    graph.get(w1[j]).add(w2[j]);
                    inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
                }
                foundOrder = true;
                break; // Only consider the first differing character
            }
        }

        // If w2 is a prefix of w1 but shorter, the order is invalid
        if (!foundOrder && w1.length > w2.length) {
            return "";
        }
    }

    // Step 3: Perform Topological Sort (BFS - Kahn's Algorithm)
    let queue = [];
    let result = [];

    // Find nodes with in-degree 0 (starting points)
    for (let [char, count] of inDegree) {
        if (count === 0) queue.push(char);
    }

    while (queue.length > 0) {
        let char = queue.shift();
        result.push(char);

        for (let neighbor of graph.get(char)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // If all characters are included, return the order; otherwise, return ""
    return result.length === graph.size ? result.join('') : "";
}