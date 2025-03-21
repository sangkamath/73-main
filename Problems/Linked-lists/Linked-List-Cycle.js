/**
 * @param {ListNode} head
 * @return {boolean}
 * Time complexity: O(n). Each pointer traverses the list at most once.
Space complexity: O(1). The algorithm uses only two pointers, regardless of 
the size of the list.
 */
export default function linkedListDetectCycle(head) {
    // If the list is empty or has only one node without a cycle, return false
    if (head == null || head.next == null) {

        return false;

    }

      // Initialize two pointers: slow and fast
  // Slow pointer advances by one step at a time
    var tortoise = head;

    var hare = head.next;


  // Traverse the list
    while (hare != null && hare.next != null) {
        // Move slow pointer by one step
        if (tortoise === null) {
            // This check is for TypeScript to satisfy non-null assertions
            return false;
          }

    // If slow and fast pointers meet, a cycle is detected
        if (tortoise == hare) {

            return true;

        }

        tortoise = tortoise.next;
// Move fast pointer by two steps
        hare = hare.next.next;

    }


  // If fast pointer reaches the end of the list, no cycle exists
    return false;

}


/*
Time complexity: O(n). Each node in the list is visited once.
Space complexity: O(n). The Set stores up to n nodes in the worst
 case (when there is no cycle).
*/
export default function linkedListDetectCycle(head){
    // Create a Set to track nodes that have been visited
    const nodesSeen = new Set();
    // Start with the head of the linked list
    let current = head;
  
    // Traverse the linked list
    while (current !== null) {
      // If the current node has been seen before, a cycle is present
      if (nodesSeen.has(current)) {
        return true;
      }
  
      // Add the current node to the Set of seen nodes
      nodesSeen.add(current);
  
      // Move to the next node in the linked list
      current = current.next;
    }
  
    // If the end of the list is reached without finding a cycle, return false
    return false;
  }