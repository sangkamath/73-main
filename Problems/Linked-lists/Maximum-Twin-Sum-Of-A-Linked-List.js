/*
The time complexity of the `pairSum` function is O(n), where n is the number 
of nodes in the linked list. This is because the function performs three 
main operations that each traverse the list: finding the middle of the
 list, reversing the second half, and calculating the twin sums. Each
  of these operations involves a single pass through the list,
   resulting in a linear time complexity.

The space complexity of the function is O(1), as it uses a constant 
amount of extra space regardless of the input size. The function
 only utilizes a few pointers (slow, fast, prev, curr, first, second) 
 to keep track of the nodes during the traversal and manipulation
  of the linked list, without requiring any additional data 
  structures that grow with the input size.
*/
var pairSum = function(head) {
    if (!head || !head.next) {
        return 0;
    }

    let slow = head;
    let fast = head;

    // Step 1: Find middle
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }

    // Step 2: Reverse second half
    let prev = null;
    let curr = slow;

    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Step 3: Calculate twin sums
    let maxSum = 0;
    let first = head;
    let second = prev;

    while (second) {
        let twinSum = first.val + second.val;
        maxSum = Math.max(maxSum, twinSum);
        first = first.next;
        second = second.next;
    }

    return maxSum;
};



var pairSum = function(head) {
    if (!head || !head.next) return 0;

    let slow = head;
    let fast = head;
    let prevToMid = null;

    // Step 1: Find the middle
    while (fast && fast.next) {
        fast = fast.next.next;
        prevToMid = slow;
        slow = slow.next;
    }

    // Step 2: Reverse second half
    let prev = null;
    let curr = slow;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Step 3: Attach the reversed half to the first half
    if (prevToMid) {
        prevToMid.next = prev;
    }

    // (Optional) Step 4: Compute twin sum or any logic
    let p1 = head;
    let p2 = prev;
    let maxSum = 0;

    while (p2) {
        maxSum = Math.max(maxSum, p1.val + p2.val);
        p1 = p1.next;
        p2 = p2.next;
    }

    return maxSum;
};