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
 * The time complexity of the `deleteDuplicates` function is O(n), 
 * where n is the number of nodes in the linked list. This is because 
 * each node is processed at most twice: once when checking for duplicates 
 * and once when moving the `current` pointer forward. As a result, 
 * the function efficiently traverses the list in a single pass.

The space complexity is O(1), as the algorithm uses a constant amount 
of extra space. The only additional space used is for a few pointers 
(`dummy`, `prev`, and `current`), regardless of the size of the input 
list. Thus, the function operates in-place without requiring any additional
 data structures that scale with the input size.
 */
var deleteDuplicates = function (head) {
    if (!head) return null; // Edge case: empty list

    let dummy = new ListNode(0, head); // Dummy node before head
    let prev = dummy;
    let current = head;

    while (current) {
        let hasDuplicate = false;

        // Move `current` forward while there are duplicates
        while (current.next && current.val === current.next.val) {
            current = current.next;
            hasDuplicate = true;
        }

        if (hasDuplicate) {
            // Skip all duplicates by linking `prev.next` to `current.next`
            prev.next = current.next;
        } else {
            // No duplicates, move `prev` forward
            prev = prev.next;
        }

        // Move `current` forward
        current = current.next;
    }

    return dummy.next; // New head (skipping removed duplicates)
};