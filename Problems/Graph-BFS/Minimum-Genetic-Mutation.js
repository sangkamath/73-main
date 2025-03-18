/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 * The time complexity of the `minMutation` function can be analyzed as follows:

1. **Breadth-First Search (BFS)**: The function uses a BFS approach to explore all possible
 mutations. In the worst case, each gene can mutate into three other genes (since there are
 four possible characters and one character remains unchanged). Therefore, for a gene of length
  `n`, there can be up to `3 * n` possible mutations for each gene.

2. **Queue Operations**: The BFS explores each gene until it finds the end gene or exhausts 
all possibilities. In the worst case, if there are `m` genes in the bank, the total number 
of genes processed can be up to `m`. Thus, the overall time complexity can be approximated 
as O(m * n), where `m` is the number of genes in the bank and `n` is the length of each gene.

The space complexity can be analyzed as follows:

1. **Visited Set**: The space used for the `visited` set can grow up to `m`, as it stores 
each gene that has been processed.

2. **Queue**: The queue can also grow to hold all the genes that are currently being 
processed, which can also be up to `m`.

Thus, the overall space complexity is O(m), where `m` is the number of genes in the bank. 

In summary, the time complexity is O(m * n) and the space complexity is O(m).
 */
var minMutation = function(startGene, endGene, bank) {
    const bankSet = new Set(bank);
    if (!bankSet.has(endGene)) return -1; // If endGene is not in bank, no valid path
    
    const chars = ['A', 'C', 'G', 'T'];
    let queue = [[startGene, 0]]; // Queue holds [currentGene, mutationSteps]
    let visited = new Set();
    visited.add(startGene);

    while (queue.length > 0) {
        let [current, steps] = queue.shift();

        // If we reach the target gene, return the mutation count
        if (current === endGene) return steps;

        // Try mutating each character in the string
        for (let i = 0; i < current.length; i++) {
            for (let char of chars) {
                if (char !== current[i]) {
                    let mutated = current.slice(0, i) + char + current.slice(i + 1);
                    
                    if (bankSet.has(mutated) && !visited.has(mutated)) {
                        queue.push([mutated, steps + 1]);
                        visited.add(mutated);
                    }
                }
            }
        }
    }

    return -1; // No valid mutation path found
};