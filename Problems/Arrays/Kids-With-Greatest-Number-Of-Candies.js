/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 * Time complexity: O(n)

We iterate over the candies array to find out maxCandies 
which takes O(n) time.
We iterate over the candies array once more. We check for 
each kid whether they will have the most candies among all 
the children after receiving extraCandies and push the 
result in result which takes O(1) time. It requires O(n) 
time for n kids.
Space complexity: O(1)

Without counting the space of input and output, we are 
not using any space except for some integers like 
maxCandies and candy.
 */
var kidsWithCandies = function (candies, extraCandies) {
    var max = Math.max(...candies);
    var result = [];
    for(var i = 0; i < candies.length; i++) {
        if(candies[i] === max) {
            result.push(true);
        }else {
            if(candies[i] + extraCandies >= max) {
                result.push(true);
            } else {
                result.push(false);
            }
        }
    }

    return result;
};