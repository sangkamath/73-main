/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 * The time complexity of the `rotateRight` function is O(n), where n is the number of nodes 
 * in the linked list. This is because we traverse the linked list to find its length, 
 * and then we traverse it again to find the new tail. Both operations require visiting 
 * each node once.

The space complexity is O(1), as we are using a constant amount of extra space regardless 
of the size of the input linked list. We only use a few variables to keep track of the length,
 tail, new tail position, and new head, without allocating any additional data structures 
 that grow with the input size.
 */
var rotateRight = function(head, k) {
    if (!head || !head.next || k === 0) return head; // Edge cases

    // Step 1: Find the length of the linked list
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    // Step 2: Connect the tail to the head (circular list)
    tail.next = head;

    // Step 3: Find the new tail (length - k % length - 1)th node
    let newTailPos = length - (k % length) - 1;
    let newTail = head;
    for (let i = 0; i < newTailPos; i++) {
        newTail = newTail.next;
    }

    // Step 4: Break the cycle and set new head
    let newHead = newTail.next;
    newTail.next = null;

    return newHead;
};