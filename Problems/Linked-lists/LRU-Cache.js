/**
 * @param {number} capacity
 * The time complexity of the LRUCache operations is as follows:

1. **get(key)**: This operation has a time complexity of O(1) because it
 involves checking if the key exists in the map and, if it does, removing
  and re-adding the corresponding node in the doubly linked list, both of 
  which are O(1) operations.

2. **put(key, value)**: This operation also has a time complexity of O(1).
 It involves checking if the key exists, removing the node if it does,
  adding a new node, and potentially removing the least recently used 
  node if the capacity is exceeded. All these operations are O(1).

The overall time complexity for both operations is O(1).

The space complexity of the LRUCache is O(capacity). This is because 
the cache stores up to 'capacity' number of key-node pairs in the map 
and maintains a doubly linked list of the same size to track the order 
of usage. Thus, the space used is directly proportional to the capacity 
of the cache.
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.map = new Map(); // Stores key-node pairs for O(1) access
    this.head = { next: null, prev: null }; // Dummy head
    this.tail = { next: null, prev: null }; // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._add(node);
    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.map.has(key)) {
        this._remove(this.map.get(key));
    }
    const newNode = { key, value, prev: null, next: null };
    this._add(newNode);
    this.map.set(key, newNode);

    if (this.map.size > this.capacity) {
        const lruNode = this.head.next;
        this._remove(lruNode);
        this.map.delete(lruNode.key);
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
LRUCache.prototype._remove = function (node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
}

LRUCache.prototype._add = function (node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map(); // Stores key-node pairs for O(1) access
        this.head = { next: null, prev: null }; // Dummy head
        this.tail = { next: null, prev: null }; // Dummy tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this._remove(node);
        this._add(node);
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this._remove(this.map.get(key));
        }
        const newNode = { key, value, prev: null, next: null };
        this._add(newNode);
        this.map.set(key, newNode);

        if (this.map.size > this.capacity) {
            const lruNode = this.head.next;
            this._remove(lruNode);
            this.map.delete(lruNode.key);
        }
    }

    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _add(node) {
        node.prev = this.tail.prev;
        node.next = this.tail;
        this.tail.prev.next = node;
        this.tail.prev = node;
    }
}

/*
To implement an LRU (Least Recently Used) Cache, we need a data 
structure that supports:

O(1) get(key) – Retrieve the value associated with the key.
O(1) put(key, value) – Insert or update the key-value pair, evicting 
the least recently used item if capacity is exceeded.
Optimal Data Structures
To achieve O(1) operations, we use:

HashMap (Map) for quick lookups.
Doubly Linked List for fast insertions, deletions, and maintaining 
order of usage.
*/