



// Javascript Program to find alternate sum 
// of Fibonacci numbers 


// Computes value of first fibonacci numbers
// and stores their alternate sum
function calculateAlternateSum(n) {
    if (n <= 0)
        return 0;

    var fibo = Array(n + 1).fill(0);
    fibo[0] = 0;
    fibo[1] = 1;

    // Initialize result
    var sum = Math.pow(fibo[0], 2) +
        Math.pow(fibo[1], 2);

    // Add remaining terms
    for (i = 2; i <= n; i++) {
        fibo[i] = fibo[i - 1] + fibo[i - 2];

        // For even terms
        if (i % 2 == 0)
            sum -= fibo[i];

        // For odd terms
        else
            sum += fibo[i];
    }

    // Return the alternating sum
    return sum;
}

// Driver code

// Get n
var n = 8;

// Find the alternating sum
console.log(
    "Alternating Fibonacci Sum upto " + n + " terms: "
    + calculateAlternateSum(n)
);

