
/*
TC: O(n)
SC: O(n)
Not in place
Step by Step Algorithm

Initialization:

n is assigned the length of the array nums.
k is updated to k % n to handle cases where k is greater than n.
n = len(nums)
k = k % n
Create a New Array for Rotation:

rotated is initialized as a new array of length n filled with zeros.
rotated = [0] * n
Populate the Rotated Array:

Loop through each element in the original array nums.
For each element at index i, place it in the rotated array at index (i + k) % n.
for i in range(n):
    rotated[(i + k) % n] = nums[i]
Copy the Rotated Array Back to the Original Array:

Loop through each element in the rotated array.
Copy each element back to the original array nums.
for i in range(n):
    nums[i] = rotated[i]
*/
var rotate = function(nums, k) {
    const n = nums.length;
    k = k% n;
    const rotated = new Array(n).fill(0);

    for(let i = 0; i < n; i++) {
        rotated[(i+k)%n] = nums[i];
    }

    for(let i = 0; i < n; i++) {
        nums[i] = rotated[i];
    }
}

/*
TC: O(n)
SC: O(n)
Step by Step Algorithm

Calculate Effective Rotations:

The array's length is n = len(nums).
The number of rotations k is updated to k % n to handle cases 
where k is greater than n. This ensures that rotating the array n times
results in the same array, so any extra rotations beyond n can be ignored.
k = k % len(nums)
Check if Rotation is Needed:

If k is 0, the array does not need to be rotated, and the function can exit early. 
This is an optimization step to avoid unnecessary operations.
if k != 0:
Perform the Rotation:

If k is not 0, proceed to rotate the array.
The rotation is performed in two parts:
nums[:k] will hold the last k elements of the original array.
nums[k:] will hold the first n-k elements of the original array.
Using slicing, the array is reassembled such that the last k elements come first, 
followed by the first n-k elements.
nums[:k], nums[k:] = nums[-k:], nums[:-k]
*/
var rotate = function(nums, k) {
    k = k % nums.length;
    if(k !== 0) {
        let temp = nums.slice(-k).concat(nums.slice(0, -k));
        for(let i = 0; i < nums.length; i++) {
            nums[i] = temp[i];
        }
    }
}

/*
TC: O(n)
SC: O(1)
Step by Step Algorithm

Calculate Effective Rotations:

The length of the array is n = len(nums).
The number of rotations k is updated to k % n to handle cases where k is greater than n. This ensures that rotating the array n times results in the same array, so any extra rotations beyond n can be ignored.
k %= len(nums)
Define the Reverse Function:

A helper function reverse is defined to reverse the elements of the array between indices left and right.
Within this function, a while loop swaps elements from the start (left) and end (right) of the specified segment, moving towards the center until left is no longer less than right.
def reverse(left, right):
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1

Reverse the Entire Array:

The entire array is reversed from index 0 to len(nums) - 1.
This step places the elements that need to be rotated to the front.
reverse(0, len(nums) - 1)
Reverse the First k Elements:

The first k elements of the reversed array are reversed back to their original order.
This places the rotated elements at the start of the array in their correct positions.
reverse(0, k - 1)
Reverse the Remaining n-k Elements:

The remaining elements from index k to len(nums) - 1 are reversed back to their original order.
This places the rest of the elements in their correct positions.
reverse(k, len(nums) - 1)
*/
var rotate = function(nums, k) {
    k %= nums.length;

    const reverse = (left, right) => {
        while(left < right) {
            [nums[left], nums[right]] = [nums[right],nums[left]];
            left++;
            right--;
        }
    }

    reverse(0, nums.length - 1);
    reverse(0, k-1);
    reverse(k, nums.length - 1);
}
