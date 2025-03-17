/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 * The time complexity of the given function is O(n), where n is the number of nodes in 
 * the linked list. This is because the function iterates through the entire list 
 * exactly once, processing each node to determine whether it should go into the 
 * "before" or "after" list.

The space complexity is O(1), as the function uses a constant amount of extra space. 
It only creates a few pointers (for the dummy nodes and the current nodes in the 
"before" and "after" lists) and does not use any additional data structures that
 grow with the input size. The original list is rearranged in place without requiring
  extra space proportional to the input size.
 */
var partition = function(head, x) {
    let beforeHead = new ListNode(0);  // Dummy node for smaller values
    let before = beforeHead;
    let afterHead = new ListNode(0);   // Dummy node for greater/equal values
    let after = afterHead;

    while (head) {
        if (head.val < x) {
            before.next = head;
            before = before.next;
        } else {
            after.next = head;
            after = after.next;
        }
        head = head.next;
    }

    after.next = null;  // End the "after" list
    before.next = afterHead.next;  // Merge two lists

    return beforeHead.next;
};