/**
 * @param {ListNode} head
 * @return {void}
 * The time complexity of the `rearrangeLinkedList` function can be analyzed as follows:

1. **getLength**: This function traverses the entire linked list to calculate its length, 
which takes O(n) time, where n is the number of nodes in the list.
  
2. **splitList**: This function also traverses the linked list to find the midpoint, which
 again takes O(n) time.

3. **reverseList**: This function reverses the second half of the linked list, which
 takes O(n/2) time, simplifying to O(n).

4. **interleave**: This function interleaves the two halves of the list, which takes
 O(n) time as it processes each node once.

Overall, since each of these functions runs in linear time, the total time complexity 
of the `rearrangeLinkedList` function is O(n).

The space complexity of the function is O(1) because it uses a constant amount of 
extra space. The operations are performed in-place on the linked list without requiring
 additional data structures that scale with the input size. The only additional space
  used is for a few pointers, which does not depend on the size of the input linked list.
 */

export default function rearrangeLinkedList(head) {

    function getLength(node) {
        var ans = 0;
        for (var current = head; current != null; current = current.next) {
            ans++;
        }

        return ans;
    }

    function splitList(head) {
        var fulllength = getLength(head);
        var len = (fulllength - 1) / 2;

        while (len > 0) {
            head = head.next;
            len--;
        }

        var ans = head.next;
        head.next = null;

        return ans;
    }

    function reverseList(head) {
        var dummy = null;
        while (head != null) {
            var node = head;
            head = head.next;
            node.next = dummy;
            dummy = node;
        }

        return dummy;
    }

    function interleave(first, second) {
        while (second != null) {
            var node = second;
            second = second.next;
            node.next = first.next;
            first.next = node;
            first = node.next;
        }
    }

    if (head == null || head.next == null) return;

    var second = splitList(head);
    second = reverseList(second);
    interleave(head, second);
}


/**
 * @param {ListNode} head
 * @return {void}
 * Time complexity: O(n). Each node is visited once during the three steps: finding the middle, 
 * reversing the second half, and merging.
Space complexity: O(1). The algorithm uses a constant amount of additional space.
 */

export default function rearrangeLinkedList(head) {
    if (head === null) return;

    let slow = head;
    let fast = head;

   // Locate the middle node of the linked list
  // For example, in the list 1->2->3->4->5->6, the middle is 4
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse the second half of the list
  // Transform 1->2->3->4->5->6 into 1->2->3->4 and 6->5->4 (reversed in-place)
    let prev = null;
    let curr = slow;

    while (curr !== null) {
        const tmp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = tmp;
    }

    let first = head;
    let second = prev;

     // Merge the two halves of the list
  // Combine 1->2->3->4 and 6->5->4 into 1->6->2->5->3->4
    while (second !== null && second.next !== null) {
        const tmp1 = first.next;
        first.next = second;
        first = tmp1;

        const tmp2 = second.next;
        second.next = first;
        second = tmp2;
    }
}