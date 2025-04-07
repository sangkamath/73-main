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
 * The time complexity of the function `oddEvenList` is
 *  O(n), where n is the number of nodes in the linked 
 * list. This is because the function traverses the list 
 * once, processing each node to rearrange the odd and 
 * even indexed nodes.

The space complexity is O(1) since the function uses 
a constant amount of extra space. It only utilizes a 
few pointers to keep track of the current odd and even
 nodes, as well as the head of the even list, without 
 requiring any additional data structures that scale with 
 the input size.
 */
var oddEvenList = function(head) {
    // Edge case: if the list is empty or contains only one node
  if (!head || !head.next) {
      return head;
  }
  
  let odd = head; // Odd-indexed list starts with the head
  let even = head.next; // Even-indexed list starts with the second node
  let evenHead = even; // Keep the reference to the head of the even list
  
  while (even && even.next) {
      odd.next = odd.next.next; // Connect odd-indexed node to the next odd-indexed node
      even.next = even.next.next; // Connect even-indexed node to the next even-indexed node
      
      odd = odd.next; // Move to the next odd-indexed node
      even = even.next; // Move to the next even-indexed node
  }
  
  odd.next = evenHead; // Connect the end of the odd list to the head of the even list
  
  return head;
};