class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next ?? null;
    }
}

/*
Time complexity: O(m + n). Each node in both lists is processed exactly once.
Space complexity: O(1). The algorithm uses only a constant amount of extra space.
*/
function mergeTwoLists(a, b) {
    var head = new ListNode(0);
    var tail = head;

    while (a != null && b != null) {
        if (a.val < b.val) {
            tail.next = a;
            a = a.next;
        } else {
            tail.next = b;
            b = b.next;
        }
        tail = tail.next;
    }

    tail.next = a ?? b;

    return head.next;
}

/*
Time complexity: O(m + n). Each node in both lists is visited exactly once.
Space complexity: O(m + n). The recursion depth depends on the total number
 of nodes, which results in additional stack space proportional to m + n.
*/
export default function linkedListCombineTwoSorted(
  listA,
  listB,
) {
  // Dummy node to act as the previous node to the head of the combined list
  let dummy = { val: -1, next: null };

  // Pointer to the last node in the combined list, initially set to dummy
  let prev = dummy;

  // Iterate while both listA and listB are not null
  while (listA !== null && listB !== null) {
    // Compare the values of listA and listB nodes
    if (listA.val <= listB.val) {
      // If listA node is smaller or equal, add it to the combined list
      prev.next = listA;
      listA = listA.next; // Move to the next node in listA
    } else {
      // If listB node is smaller, add it to the combined list
      prev.next = listB;
      listB = listB.next; // Move to the next node in listB
    }
    // Move prev to the next node in the combined list
    prev = prev.next;
  }

  // At least one of listA and listB can still have nodes, add the remaining nodes to the combined list
  if (listA !== null) {
    prev.next = listA;
  } else {
    prev.next = listB;
  }

  // The combined list is next to the dummy node
  return dummy.next;
}


/**
 * @param {(Node | null)[]} lists
 * @returns Node | null
 * The time complexity of the `linkedListCombineKSorted` function is O(N log K),
 *  where N is the total number of nodes across all K linked lists. This is
 * because the function repeatedly merges pairs of lists, and each merge 
 * operation takes O(N) time in the worst case. Since we are merging K lists,
 *  the number of merge operations is log K, leading to the overall time 
 * complexity of O(N log K).

The space complexity is O(1) if we consider the space used by the input 
lists and the output list as not contributing to the complexity. However, 
if we consider the space used for the merged lists during the merging
 process, it can be viewed as O(N) since we are creating new nodes for 
 the merged list. Thus, the space complexity can be considered O(N) in
  terms of the space required for the output.
 */
export default function linkedListCombineKSorted(lists) {
    if (lists.length === 0) return null;

    while (lists.length > 1) {
        var mergedSize = Math.floor((lists.length + 1) / 2);
        var merged = new Array(mergedSize);
        for (var i = 0; i < mergedSize; i++) {
            var index1 = i * 2;
            var index2 = i * 2 + 1;
            var l1 = lists[index1];
            var l2 = (index2 < lists.length) ? lists[index2] : null;
            merged[i] = mergeTwoLists(l1, l2);
        }
        lists = merged;
    }

    return lists[0];
}



/*
Time complexity: O(n log k). Each merge operation for two lists is O(n), 
where n is the total number of nodes in the two lists. The number of merge 
levels is O(log k), where k is the number of lists.
Space complexity: O(1). The merging process is performed in-place without 
requiring additional space beyond the pointers.
*/
export default function linkedListCombineKSorted(
    lists
  ) {
    let amount= lists.length; // Number of lists to combine
    let interval= 1; // Interval for merging lists in pairs
  
    // Continue combining in pairs, doubling the interval each time
    while (interval < amount) {
      // Merge lists in pairs
      for (let i = 0; i < amount - interval; i += interval * 2) {
        lists[i] = merge2Lists(lists[i], lists[i + interval]);
      }
      interval *= 2; // Double the interval
    }
  
    return amount > 0 ? lists[0] : null; // Return the combined list or null if there are no lists
  }
  
/*
Time complexity: O(n log n). Extracting the values requires O(n), where n is the total
 number of nodes in all k linked lists. Sorting the array requires O(n log n).
Space complexity: O(n). Additional space is used to store the nodes array of size n 
and the new linked list.
*/
  export default function linkedListCombineKSorted(
    lists,
  ) {
    // Array to hold all node values from the linked lists
    let nodes = [];
  
    // Create a dummy node to serve as the starting point for the combined list
    let dummy = { val: 0, next: null };
    let combinedHead = dummy; // Head node to build the new combined list
  
    // Traverse each linked list in the input array
    lists.forEach((l) => {
      // Traverse the current linked list
      while (l) {
        // Collect all node values in the array
        nodes.push(l.val);
        l = l.next; // Move to the next node in the current list
      }
    });
  
    // Sort the collected node values in ascending order
    nodes
      .sort((a, b) => a - b)
      .forEach((n) => {
        // Create a new node with the sorted value and link it to the combined list
        combinedHead.next = { val: n, next: null };
        combinedHead = combinedHead.next; // Move the pointer to the newly added node
      });
  
    // Return the combined list, skipping the dummy node
    return dummy.next;
  }