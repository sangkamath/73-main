/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * The time complexity of the given binary search algorithm is O(log n). This is because the algorithm 
 * effectively halves the search space with each iteration of the while loop, allowing it to quickly 
 * narrow down the potential location of the target element in a sorted (but possibly rotated) array.

The space complexity is O(1), as the algorithm uses a constant amount of additional space. It only 
requires a few variables (left, right, mid) to keep track of the indices during the search process, 
regardless of the size of the input array. Thus, the algorithm is efficient in both time and space.
 */
var search = function(nums, target) {
    let left = 0, right = nums.length - 1;

   while (left <= right) {
       let mid = Math.floor((left + right) / 2);

       if (nums[mid] === target) return mid; // Found target
       
       // Determine which half is sorted
       if (nums[left] <= nums[mid]) { // Left half is sorted
           if (nums[left] <= target && target < nums[mid]) {
               right = mid - 1; // Search left half
           } else {
               left = mid + 1; // Search right half
           }
       } else { // Right half is sorted
           if (nums[mid] < target && target <= nums[right]) {
               left = mid + 1; // Search right half
           } else {
               right = mid - 1; // Search left half
           }
       }
   }
   
   return -1; // Target not found
};


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * The time complexity of the given search function is O(log n). This is because the function performs
 *  a binary search twice: first to find the pivot point where the array is rotated, and second to 
 * search for the target value in the rotated array. Each binary search operation takes O(log n) time,
 *  resulting in an overall time complexity of O(log n).

The space complexity of the function is O(1). This is because the function uses a constant amount of 
extra space for variables such as `left`, `right`, `m`, and `pivot`, regardless of the size of the 
input array. There are no data structures that grow with the input size, so the space complexity 
remains constant.
 * 
 */
var search = function(nums, target) {
    if(nums.length === 0) return -1;

    var n = nums.length, left = 0, right = n-1, pivot;
    while(left < right) 
    {
        let m = Math.floor((left + right)/2);
        if(nums[m] > nums[right]) {
            left = m + 1;
        } else {
            right = m;
        }
    }

    pivot = left;
    left = 0;
    right = n -1;

    while(left <= right)
    {
        let m = Math.floor((left+right)/2);
        let mm = (m + pivot) % n;
        if(nums[mm] == target) return mm;
        if(target > nums[mm]) {
            left = m + 1;
        } else {
            right = m -1;
        }
    }

    return -1;
}