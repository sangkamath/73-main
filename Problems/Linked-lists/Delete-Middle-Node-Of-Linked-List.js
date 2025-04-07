/*
The time complexity of the `deleteMiddle` function is
 O(n), where n is the number of nodes in the linked 
 list. This is because the function traverses the 
 linked list once to find the middle node using the
 slow and fast pointer approach. The slow pointer 
 moves one step at a time, while the fast pointer 
 moves two steps at a time, resulting in a single
  pass through the list.

The space complexity is O(1), as the function uses a 
constant amount of extra space. It only utilizes a 
few pointers (slow, fast, and prev) regardless of
 the size of the linked list, meaning that no 
 additional data structures are used that would 
 scale with the input size.
*/
function deleteMiddle(head) {
    // Edge case: if there's only one node, return null
    if (!head || !head.next) {
        return null;
    }
    
    // Initialize slow and fast pointers
    let slow = head;
    let fast = head;
    let prev = null;
    
    // Traverse the list: fast pointer moves two steps at a time, slow moves one step at a time
    while (fast && fast.next) {
        fast = fast.next.next;
        prev = slow;
        slow = slow.next;
    }
    
    // Delete the middle node by updating the previous node's next pointer
    prev.next = slow.next;
    
    return head;
}