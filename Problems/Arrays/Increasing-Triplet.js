function increasingTriplet(nums) {
    let first = Infinity, second = Infinity;

    for (let num of nums) {
        if (num <= first) {
            first = num; // Smallest number found
        } else if (num <= second) {
            second = num; // Second smallest number found
        } else {
            return true; // A third number greater than first and second is found
        }
    }

    return false; // No increasing triplet found
}
/*
Time Complexity: O(n) (single pass through the array).

Space Complexity: O(1) (only a few variables used).
*/