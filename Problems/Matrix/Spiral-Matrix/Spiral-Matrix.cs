using System;
using System.Collections.Generic;

// Using spiral iterative traversals - Time: O(m⋅n)
public class Solution
{
    /*
    public IList<int> SpiralOrder(int[][] matrix) {
        var nextDirection = new Dictionary<string, string> {
            {"top", "right"},
            {"right", "bottom"},
            {"bottom", "left"},
            {"left", "top"}
        };

        int m = matrix.Length, n = matrix[0].Length;
        var res = new List<int>();
        int rtop = 0, rbottom = m - 1, cleft = 0, cright = n -1;
        string direction = "top";

        while(res.Count != m*n) {
            if(direction == "top") {
                for(int j = cleft; j <= cright; j++){
                    res.Add(matrix[rtop][j]);
                }
                rtop++;
            } else if(direction == "right") {
                for(int i = rtop; i <= rbottom; i++) {
                    res.Add(matrix[i][cright]);
                }
                cright--;
            } else if(direction == "bottom") {
                for(int j = cright; j >= cleft; j--) {
                    res.Add(matrix[rbottom][j]);
                }
                rbottom--;
            } else if(direction == "left") {
                for(int i = rbottom; i >= rtop; i--) {
                    res.Add(matrix[i][cleft]);
                }
                cleft++;
            }
            direction = nextDirection[direction];
        }

        return res;
    }
    */
    
    public IList<int> SpiralOrder(int[][] matrix)
    {
        if (matrix.Length == 0 || matrix[0].Length == 0)
        {
            return new List<int>();
        }

        List<int> ans = new List<int>();

        int m = matrix.Length; 
        int n = matrix[0].Length;

        for (int i = 0; ans.Count < m * n; i++)
        {
            for (int j = i; j < n - i; j++)
            {
                ans.Add(matrix[i][j]);
            }

            for (int j = i + 1; j < m - i; j++)
            {
                ans.Add(matrix[j][n - i - 1]);
            }

            if (m - i - 1 != i)
            {
                for (int j = n - i - 2; j >= i; j--)
                {
                    ans.Add(matrix[m - i - 1][j]);
                }
            }

            if (n - i - 1 != i)
            {
                for (int j = m - i - 2; j > i; j--)
                {
                    ans.Add(matrix[j][i]);
                }
            }
        }

        return ans;
    }
}

class Program
{
    static void Main(string [] args)
    {
        int[][] matrix = new int[][] {
            new int[] { 1, 2, 3 },
            new int[] { 4, 5, 6 },
            new int[] { 7, 8, 9 }
        };

        Console.WriteLine("Input: matrix =");
        for (int i = 0; i < matrix.Length; i++)
        {
            for (int j = 0; j < matrix[0].Length; j++)
            {
                Console.Write(matrix[i][j] + " ");
            }
            Console.WriteLine();
        }
        Console.WriteLine();

        Solution sol = new Solution();
        IList<int> ans = sol.SpiralOrder(matrix);

        Console.WriteLine("Output: " + string.Join(", ", ans));
    }
}

