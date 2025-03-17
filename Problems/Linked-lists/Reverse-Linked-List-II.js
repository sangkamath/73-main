/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 * The time complexity of the `reverseBetween` function is O(n), where n is the number of nodes 
 * in the linked list. This is because we traverse the list a constant number of times:
 * once to reach the node before the `left` position, once to reverse the sublist from 
 * `left` to `right`, and finally to reconnect the reversed sublist. Each of these operations 
 * involves iterating through a portion of the list, leading to a linear time complexity overall.

The space complexity is O(1), as we are using a constant amount of extra space regardless 
of the size of the input list. The only additional space used is for a few pointers (like 
`dummy`, `prevLeft`, `leftNode`, `prev`, `curr`, and `next`), which do not scale with the 
input size. Thus, the function operates in-place without requiring additional data structures 
that grow with the input.
 */
var reverseBetween = function (head, left, right) {
    if (!head || left === right) return head;

    let dummy = new ListNode(0, head); // Dummy node to handle head reversal
    let prevLeft = dummy;

    // Step 1: Reach the node before `left`
    for (let i = 1; i < left; i++) {
        prevLeft = prevLeft.next;
    }

    // Step 2: Reverse the sublist
    let leftNode = prevLeft.next;
    let prev = null;
    let curr = leftNode;

    for (let i = left; i <= right; i++) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // Step 3: Reconnect the reversed sublist
    prevLeft.next = prev; // Connect node before `left` to `rightNode`
    leftNode.next = curr; // Connect `leftNode` to node after `right`

    return dummy.next;

};