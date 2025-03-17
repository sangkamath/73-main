/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * The time complexity of the `deleteDuplicates` function is O(n), where n is 
 * the number of nodes in the linked list. This is because the function traverses 
 * the list once, examining each node and its next node to check for duplicates. In 
 * the worst case, each node is visited exactly once.

The space complexity is O(1), as the function uses a constant amount of extra space. 
It only utilizes a few pointers (like `current`) to keep track of the current node and 
does not use any additional data structures that grow with the size of the input.
 Thus, the space used does not depend on the size of the linked list.
 */
var deleteDuplicates = function(head) {
    if (!head) return head; // Edge case: empty list

    var current = head;

    while (current && current.next) {
        if (current.val === current.next.val) {
            // Skip the duplicate node
            current.next = current.next.next;
        } else {
            // Move forward if no duplicate
            current = current.next;
        }
    }

    return head; // Return the modified list
};