/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 * The time complexity of the `copyRandomList` function is O(n), where n is the number of nodes 
 * in the linked list. This is because the function iterates through the list twice: once 
 * to create a mapping from the old nodes to the new nodes and once to set the `next` and 
 * `random` pointers for the new nodes. Each iteration processes each node exactly once.

The space complexity is also O(n) due to the use of a Map to store the mapping of old nodes 
to new nodes. In the worst case, we need to store a new node for each node in the original 
list, leading to linear space usage relative to the number of nodes.
 */
var copyRandomList = function(head) {
    if (!head) return null;

    const oldToNew = new Map();
    let curr = head;
    while(curr) {
        oldToNew.set(curr, new Node(curr.val));
        curr = curr.next;
    }

    curr = head;
    while(curr) {
        oldToNew.get(curr).next = oldToNew.get(curr.next) || null;
        oldToNew.get(curr).random = oldToNew.get(curr.random) || null;
        curr = curr.next;
    }

    return oldToNew.get(head);
};

/**
 * @param {_Node} head
 * @return {_Node}
 * The time complexity of the `copyRandomList` function is O(N), where N is the number of nodes
 * in the original linked list. This is because the algorithm makes three passes through 
 * the list: the first pass to create the copied nodes, the second pass to set the random 
 * pointers, and the third pass to separate the copied list from the original list. Each pass 
 * processes each node exactly once.

The space complexity is O(1) in terms of additional space used, as the algorithm only uses 
a constant amount of extra space for pointers and does not utilize any data structures that 
grow with the input size. However, it is important to note that the space used by the new nodes 
themselves is O(N), but this is part of the output and not considered additional space in the 
context of space complexity analysis.
 */
var copyRandomList = function(head) {
    if (!head) return null;

  // Step 1: Insert copied nodes right after each original node
  //Each cloned node has 1. the same val as the original 2. next pointing to next original node
  let cur = head;
  while (cur) {
    let newNode = new Node(cur.val, cur.next, null);
    cur.next = newNode;
    cur = newNode.next;
  }

  // Step 2: Assign random pointers for the copied nodes
  //Go through interleaved list and set random pointer for copied nodes
  //This works because copied nodes are directly after their originals
  cur = head;
  while (cur) {
    if (cur.random) {
      cur.next.random = cur.random.next;
    }
    cur = cur.next.next;
  }

  // Step 3: Separate the copied list from the original list
  //Extract copied nodes to form the new list while restoring original list
  //1. cur = head, copy = newHead(head.next)
  //2. We reconnect 1. Original list: cur.next = cur.next.next 2. Copied list: same for copy
  //3. Move cur and copy forward
  cur = head;
  let newHead = head.next;
  let copy = newHead;
  
  while (cur) {
    cur.next = cur.next.next;
    copy.next = copy.next ? copy.next.next : null;
    cur = cur.next;
    copy = copy.next;
  }

  return newHead;

}

