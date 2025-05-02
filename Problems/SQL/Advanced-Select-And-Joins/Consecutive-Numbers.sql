# Write your MySQL query statement below
SELECT DISTINCT num AS ConsecutiveNums
FROM (
    SELECT
        num,
        LAG(num, 1) OVER (ORDER BY id) AS prev_num,
        LAG(num, 2) OVER (ORDER BY id) AS prev2_num
    FROM Logs
) AS t
WHERE num = prev_num AND num = prev2_num;

# Write your MySQL query statement below
SELECT DISTINCT
    l1.Num AS ConsecutiveNums
FROM
    Logs l1,
    Logs l2,
    Logs l3
WHERE
    l1.Id = l2.Id - 1
    AND l2.Id = l3.Id - 1
    AND l1.Num = l2.Num
    AND l2.Num = l3.Num;

/*
Table: Logs

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| num         | varchar |
+-------------+---------+
In SQL, id is the primary key for this table.
id is an autoincrement column starting from 1.
 

Find all numbers that appear at least three times consecutively.

Return the result table in any order.
*/