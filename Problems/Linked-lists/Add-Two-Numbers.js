/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}

999 + 999 = 198
 */

var addTwoNumbers = function (l1, l2) {
    let dummyHead = new ListNode(0);
    let curr = dummyHead;
    let carry = 0;
    while (l1 !== null || l2 !== null || carry !== 0) {
        let x = l1 !== null ? l1.val : 0;
        let y = l2 !== null ? l2.val : 0;
        let sum = carry + x + y;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }
    return dummyHead.next;
};

var addTwoNumbers = function(l1, l2) {
    var carryforward = 0;
    var dummy = new ListNode(0);
    var head = dummy;

    while(l1 != null && l2 != null){
        var add = l1.val + l2.val + carryforward;
        if(add > 9) {
            add = add % 10;
            carryforward = 1;
        } else {
            carryforward = 0;
        }

        dummy.next = new ListNode(add);
        dummy = dummy.next;
        l1 = l1.next;
        l2 = l2.next;
    }

    while(l1) {
        var add = l1.val + carryforward;
        if(add > 9) {
            add = add % 10;
            carryforward = 1;
        } else {
            carryforward = 0;
        }

        dummy.next = new ListNode(add);
        dummy = dummy.next;
        l1 = l1.next;
    }

    while(l2) {
        var add = l2.val + carryforward;
        if(add > 9) {
            add = add % 10;
            carryforward = 1;
        } else {
            carryforward = 0;
        }

        dummy.next = new ListNode(add);
        dummy = dummy.next;
        l2 = l2.next;
    }

    if(carryforward) {
        dummy.next = new ListNode(carryforward);
    }

    return head.next;
};