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
 * The time complexity of the reverseList function is O(n), where n is the number of nodes 
 * in the linked list. This is because the function iterates through each node exactly once, 
 * performing a constant amount of work for each node (updating pointers).

The space complexity is O(1) since the function uses a fixed amount of space regardless
 of the size of the input linked list. It only utilizes a few pointers (prev, curr, 
 and next) to keep track of the nodes during the reversal process, without requiring
  any additional data structures that scale with the input size.
 */
var reverseList = function(head) {
    var prev = null; //First of head will point to null as becoming last
    var curr = head;

    while(curr) {
        let next = curr.next; //Store next node first
        curr.next = prev; //Reverse link
        prev = curr; //Move prev forward
        curr = next; //Move curr = forward
    }

    return prev; //New head
};


/**
 * @param {ListNode} head
 * @return {ListNode}
 * The time complexity of the `reverseList` function is O(n), where n is the number of 
 * nodes in the linked list. This is because the function processes each node exactly once 
 * during the recursive calls.

The space complexity is O(n) as well, due to the recursive call stack. Each recursive call 
adds a new layer to the call stack, and in the worst case, there will be n calls on the stack 
when the list has n nodes. Thus, the space used by the call stack is proportional to the 
number of nodes in the list.
 */
var reverseList = function (head) {
    if (!head || !head.next) return head; // Base case: return last node as new head

    let newHead = reverseList(head.next); // Reverse rest of list

    head.next.next = head; // Reverse current node's pointer
    head.next = null; // Remove old forward link - prevents circular link

    return newHead; // Return new head
};

/*
Reversing Process
Returning from reverseListRecursive(5)

head = 4
head.next = 5
head.next.next = 4 → Now 5 -> 4
head.next = null → 4.next = null
New list: 5 -> 4 -> null
Returning from reverseListRecursive(4)

head = 3
head.next = 4
head.next.next = 3 → Now 4 -> 3
head.next = null → 3.next = null
New list: 5 -> 4 -> 3 -> null
Returning from reverseListRecursive(3)

head = 2
head.next = 3
head.next.next = 2 → Now 3 -> 2
head.next = null → 2.next = null
New list: 5 -> 4 -> 3 -> 2 -> null
Returning from reverseListRecursive(2)

head = 1
head.next = 2
head.next.next = 1 → Now 2 -> 1
head.next = null → 1.next = null
*/