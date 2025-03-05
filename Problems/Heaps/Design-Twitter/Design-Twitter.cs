using System;
using System.Collections.Generic;

// Using a heap - Time: O(n log n)

/*
class Twitter {
    constructor() {
        this.following = new Map(); // userId -> Set of followees
        this.tweets = new Map(); // userId -> List of {time, tweetId}
        this.time = 0;
    }


     * User posts a tweet
     * @param {number} userId
     * @param {number} tweetId

    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }
        this.tweets.get(userId).push({ time: this.time++, tweetId });
    }

    
     * Retrieve the 10 most recent tweet ids in the user's news feed.
     * @param {number} userId
     * @return {number[]}
    
    getNewsFeed(userId) {
        const heap = new MinHeap(); // Min-Heap (size 10) to keep latest tweets
        const users = new Set([userId]); // User + Followees
        
        if (this.following.has(userId)) {
            for (const followee of this.following.get(userId)) {
                users.add(followee);
            }
        }

        // Collect tweets from user and followees
        for (const user of users) {
            if (this.tweets.has(user)) {
                for (const { time, tweetId } of this.tweets.get(user)) {
                    heap.push({ time, tweetId });
                    if (heap.size() > 10) heap.pop(); // Keep only the latest 10 tweets
                }
            }
        }

        // Extract tweets from heap (reverse order to get latest tweets first)
        const result = [];
        while (!heap.isEmpty()) {
            result.unshift(heap.pop().tweetId);
        }

        return result;
    }

    
     * User follows another user
     * @param {number} followerId
     * @param {number} followeeId
    
    follow(followerId, followeeId) {
        if (!this.following.has(followerId)) {
            this.following.set(followerId, new Set());
        }
        this.following.get(followerId).add(followeeId);
    }

     * User unfollows another user
     * @param {number} followerId
     * @param {number} followeeId
     
    unfollow(followerId, followeeId) {
        if (this.following.has(followerId)) {
            this.following.get(followerId).delete(followeeId);
        }
    }
}


 * Min-Heap implementation (Priority Queue)

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._heapifyUp();
    }

    pop() {
        if (this.size() === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return min;
    }

    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIdx = Math.floor((index - 1) / 2);
            if (this.heap[parentIdx].time <= this.heap[index].time) break;
            [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
            index = parentIdx;
        }
    }

    _heapifyDown() {
        let index = 0;
        while (index * 2 + 1 < this.size()) {
            let smallerChildIdx = index * 2 + 1;
            let rightChildIdx = index * 2 + 2;
            if (rightChildIdx < this.size() && this.heap[rightChildIdx].time < this.heap[smallerChildIdx].time) {
                smallerChildIdx = rightChildIdx;
            }
            if (this.heap[index].time <= this.heap[smallerChildIdx].time) break;
            [this.heap[index], this.heap[smallerChildIdx]] = [this.heap[smallerChildIdx], this.heap[index]];
            index = smallerChildIdx;
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }
}

var Twitter = function() {
    this.following = new Map(); // userId -> Set of followees
        this.tweets = new Map(); // userId -> List of {time, tweetId}
        this.time = 0;
};


 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 
Twitter.prototype.postTweet = function(userId, tweetId) {
    if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }
        this.tweets.get(userId).push({ time: this.time++, tweetId });
};


 * @param {number} userId
 * @return {number[]}
 
Twitter.prototype.getNewsFeed = function(userId) {
    const heap = new MinHeap(); // Min-Heap (size 10) to keep latest tweets
        const users = new Set([userId]); // User + Followees
        
        if (this.following.has(userId)) {
            for (const followee of this.following.get(userId)) {
                users.add(followee);
            }
        }

        // Collect tweets from user and followees
        for (const user of users) {
            if (this.tweets.has(user)) {
                for (const { time, tweetId } of this.tweets.get(user)) {
                    heap.push({ time, tweetId });
                    if (heap.size() > 10) heap.pop(); // Keep only the latest 10 tweets
                }
            }
        }

        // Extract tweets from heap (reverse order to get latest tweets first)
        const result = [];
        while (!heap.isEmpty()) {
            result.unshift(heap.pop().tweetId);
        }

        return result;
};


 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 
Twitter.prototype.follow = function(followerId, followeeId) {
    if (!this.following.has(followerId)) {
            this.following.set(followerId, new Set());
        }
        this.following.get(followerId).add(followeeId);
};


 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (this.following.has(followerId)) {
            this.following.get(followerId).delete(followeeId);
        }
};

🔹 Explanation
Tweet Storage (postTweet)

Each user has a list of tweets, stored as {time, tweetId} objects.
Tweets are stored in descending order of posting time.
Following System (follow & unfollow)

Users maintain a set of followees.
follow(followerId, followeeId): Adds followeeId to followerId's set.
unfollow(followerId, followeeId): Removes followeeId from followerId's set.
Fetching News Feed (getNewsFeed)

Collects tweets from the user and their followees.
Uses a Min-Heap (Priority Queue) to efficiently track the latest 10 tweets.
Extracts tweets from the heap in reverse order to maintain descending time order.
🔹 Time Complexity
Operation	Complexity
postTweet()	O(1)
follow()	O(1)
unfollow()	O(1)
getNewsFeed()	O(n log 10) ≈ O(n) (Min-Heap insertions)
O(n log 10) simplifies to O(n), since log(10) is constant.
Using a Heap makes it efficient compared to sorting tweets every time.
*/

public class Twitter
{
    private Dictionary<int, HashSet<int>> following;
    private Dictionary<int, List<Tuple<int, int>>> tweets;
    private long time;

    public Twitter()
    {
        following = new Dictionary<int, HashSet<int>>();
        tweets = new Dictionary<int, List<Tuple<int, int>>>();
        time = 0;
    }

    public void PostTweet(int userId, int tweetId)
    {
        if (!tweets.ContainsKey(userId))
        {
            tweets[userId] = new List<Tuple<int, int>>();
        }
        tweets[userId].Add(new Tuple<int, int>((int)time++, tweetId));
    }

    public IList<int> GetNewsFeed(int userId)
    {
        var result = new List<int>();
        var comparer = new TupleComparer();
        var pq = new SortedSet<Tuple<int, int>>(comparer);

        if (tweets.ContainsKey(userId))
        {
            foreach (var t in tweets[userId])
            {
                pq.Add(t);
            }
        }

        if (following.ContainsKey(userId))
        {
            foreach (var f in following[userId])
            {
                if (tweets.ContainsKey(f))
                {
                    foreach (var t in tweets[f])
                    {
                        pq.Add(t);
                    }
                }
            }
        }

        foreach (var item in pq)
        {
            result.Add(item.Item2);
            if (result.Count == 10)
            {
                break;
            }
        }

        return result;
    }

    public void Follow(int followerId, int followeeId)
    {
        if (!following.ContainsKey(followerId))
        {
            following[followerId] = new HashSet<int>();
        }
        following[followerId].Add(followeeId);
    }

    public void Unfollow(int followerId, int followeeId)
    {
        if (following.ContainsKey(followerId))
        {
            following[followerId].Remove(followeeId);
        }
    }
}

public class TupleComparer : IComparer<Tuple<int, int>>
{
    public int Compare(Tuple<int, int> x, Tuple<int, int> y)
    {
        return y.Item1.CompareTo(x.Item1);
    }
}

class Program
{
    static void Main()
    {
        Twitter twitter = new Twitter();

        Console.WriteLine("Input: [\"Twitter\", \"postTweet\", \"getNewsFeed\", \"follow\", \"postTweet\", \"getNewsFeed\", \"unfollow\", \"getNewsFeed\"]");
        Console.WriteLine("[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]");

        twitter.PostTweet(1, 5);
        IList<int> feed1 = twitter.GetNewsFeed(1);
        Console.Write("Output: [[");
        foreach (var item in feed1)
        {
            Console.Write(item);
            if (item != feed1[feed1.Count - 1])
            {
                Console.Write(", ");
            }
        }
        Console.Write("], ");

        twitter.Follow(1, 2);
        twitter.PostTweet(2, 6);
        IList<int> feed2 = twitter.GetNewsFeed(1);
        Console.Write("[");
        foreach (var item in feed2)
        {
            Console.Write(item);
            if (item != feed2[feed2.Count - 1])
            {
                Console.Write(", ");
            }
        }
        Console.Write("], ");

        twitter.Unfollow(1, 2);
        IList<int> feed3 = twitter.GetNewsFeed(1);
        Console.Write("[");
        foreach (var item in feed1)
        {
            Console.Write(item);
            if (item != feed1[feed1.Count - 1])
            {
                Console.Write(", ");
            }
        }
        Console.WriteLine("]]");
    }
}

