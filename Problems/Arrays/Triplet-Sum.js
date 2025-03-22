/*
Time complexity: O(n2). Sorting the array takes O(n log n), and 
the two-pointer traversal for each element takes O(n), resulting in O(n2).
Space complexity: O(1). The solution uses a constant amount of extra
 space apart from the output array.
*/

export default function tripletSum(numbers) {
    var result = [];
    var n = numbers.length;
    if (n < 3) {
        return result;
    }

    numbers.sort();

    for (var i = 0; i < n - 2; i++) {
        if (numbers[i] > 0) {
            break;
        }

        if (i > 0 && numbers[i - 1] == numbers[i]) {
            continue;
        }

        var j = i + 1;
        var k = n - 1;

        while (j < k) {
            var sum = numbers[i] + numbers[j] + numbers[k];
            if (sum < 0) {
                j++;

            } else if (sum > 0) {
                k--;
            } else {
                result.push([numbers[i], numbers[j], numbers[k]]);
                while (j < k && numbers[j] === numbers[j + 1]) {
                    j++;
                }
                j++;
                while (j < k && numbers[k - 1] == [k]) {
                    k--;
                }
                k--;
            }
        }

    }

    return result;
}

/*
Time complexity: O(n3). The three nested loops iterate through all 
possible combinations of three numbers in the array.
Space complexity: O(k). The Set used for storing unique triplets
 and the resulting array require space proportional to the number
  of unique triplets, which is k.
*/
export default function tripletSum(numbers) {
    // Set to store unique triplets
    const uniqueTriplets = new Set();
    const n = numbers.length;

    // Iterate through the array to find triplets
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                // Check if the sum of three numbers is zero
                if (numbers[i] + numbers[j] + numbers[k] === 0) {
                    // Sort the triplet to maintain order
                    const triplet = [numbers[i], numbers[j], numbers[k]].sort(
                        (a, b) => a - b,
                    );
                    // Convert to string for set storage
                    uniqueTriplets.add(JSON.stringify(triplet));
                }
            }
        }
    }
    // result should be in sorted order as mentioned in the description.
    const result = Array.from(uniqueTriplets)
        .map((triplet) => JSON.parse(triplet))
        .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

    return result;
}