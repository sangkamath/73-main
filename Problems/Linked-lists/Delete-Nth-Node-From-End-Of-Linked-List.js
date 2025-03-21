/**
 * @param {ListNode} head
 * @param {number} n
 * @return {Node | null}
 * The time complexity of the function `deleteNthNodeFromEnd` is O(L), where L is the length of the linked list. This is because the function traverses the list twice: first to advance the pointer `q` by `n` nodes, and then to move both pointers `p` and `q`
 *  until `q` reaches the end of the list. Each traversal takes 
 * linear time relative to the number of nodes in the list.

The space complexity is O(1), as the function uses a constant 
amount of extra space regardless of the size of the input linked 
list. It only utilizes a few pointers (`p` and `q`) to keep track
 of the current nodes, without requiring any additional data 
 structures that scale with the input size.
 */
export default function deleteNthNodeFromEnd(head, n) {
    var p = head, q = head;
    while (n > 0) {
        q = q.next;
        n--;
    }

    // Advance the first pointer so that there is a gap of n nodes between
    //  the first and second pointers
    if (q == null) {
        return head.next;
    }

    // Move both pointers until the first pointer reaches the end of the list
  // This maintains the gap between the two pointers
    while (q.next != null) {
        p = p.next;
        q = q.next;
    }

    // Remove the nth node from the end by skipping the node after the 
    // second pointer
    p.next = p.next.next;

    // Return the head of the modified list, which is the node after the dummy node
    return head;
}

/*
Time complexity: O(n). The list is traversed twice—once to compute its length 
and once to locate the target node's predecessor.
Space complexity: O(1). The algorithm uses a constant amount of additional
 space.
*/

export default function deleteNthNodeFromEnd(
    head,
    n
  ){
    // Create a dummy node that points to the head of the list
    let dummy = { val: 0, next: head };
  
    // Initialize a variable to keep track of the length of the list
    let length = 0;
    let first = head;
  
    // Traverse the list to calculate its length
    while (first !== null) {
      length++;
      first = first.next;
    }
  
    // Calculate the position of the node just before the node to be removed
    length -= n;
    first = dummy;
  
    // Traverse to the node just before the node to be removed
    while (length > 0) {
      length--;
      first = first.next;
    }
  
    // Remove the nth node from the end
    first.next = first.next.next;
  
    // Return the modified list, starting from the node after the dummy
    return dummy.next;
  }