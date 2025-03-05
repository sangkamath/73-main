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
 */
var sortList = function(head) {
    if(head == null) {
        return null;
    }
    let ptr = head;
    let arr = [];
    while(ptr) {
        arr.push(ptr.val);
        ptr = ptr.next;
    }

    arr.sort((a, b) => a-b);
    let n = new ListNode(arr[0]);
    head = n;
    let temp = head;
    for(let i = 1; i < arr.length; i++) {
        let n1 = new ListNode(arr[i]);
        temp.next = n1;
        temp = temp.next;
    }
    return head;
};

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
 */
var sortList = function(head) {
    if(!head || !head.next)
        return head;
    
    let slow = head;
    let fast = head.next;

    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;  
    }

    let mid = slow.next;
    slow.next = null;
    let l1 = sortList(head);
    let l2 = sortList(mid);

    return merge(l1, l2);
};

var merge = function(l1, l2) {
    let dummy = new ListNode(0);
    let tail = dummy;

    while(l1 && l2) {
        if(l1.val <= l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }

    if(l1)
        tail.next = l1;
    else if(l2)
        tail.next = l2;

    return dummy.next;
}
