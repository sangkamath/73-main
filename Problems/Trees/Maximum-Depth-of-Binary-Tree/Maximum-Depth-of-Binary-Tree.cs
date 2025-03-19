using System;

// Using depth-first search - Time: O(n)
/*
The time complexity of the function binaryTreeMaximumDepth is O(n), where n is 
the number of nodes in the binary tree. This is because the function visits 
each node exactly once to calculate the maximum depth, resulting in a linear traversal of the tree.

The space complexity is O(h), where h is the height of the binary tree. This 
space is used by the call stack during the recursive function calls. In 
the worst case, for a skewed tree (where each node has only one child), 
the height h can be equal to n, leading to a space complexity of O(n). In a 
balanced binary tree, the height would be O(log n), resulting in a space complexity of O(log n).
*/

public class TreeNode
{
    public int val;
    public TreeNode left;
    public TreeNode right;

    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution
{
    public int MaxDepth(TreeNode root)
    {
        return root != null ? 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right)) : 0;
    }
}

class Program
{
    static void PrintTree(TreeNode root)
    {
        if (root == null)
        {
            Console.Write("null");
            return;
        }

        List<string> values = new List<string>();
        Queue<TreeNode> queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            TreeNode current = queue.Dequeue();
            if (current != null)
            {
                values.Add(current.val.ToString());
                queue.Enqueue(current.left);
                queue.Enqueue(current.right);
            }
            else
            {
                values.Add("null");
            }
        }

        Console.Write("[" + string.Join(", ", values) + "]");
    }
    static void Main()
    {
        TreeNode root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));

        Console.Write("Input: root = ");
        PrintTree(root);
        Console.WriteLine();

        Solution sol = new Solution();
        int ans = sol.MaxDepth(root);

        Console.WriteLine("Output: " + ans);
    }
}
