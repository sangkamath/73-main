SELECT  
    customer_id,
    COUNT(visit_id) AS count_no_trans
FROM    
    Visits
WHERE
    visit_id NOT IN (
        SELECT
            visit_id
        FROM    
            Transactions
    )
GROUP BY
    customer_id;


SELECT customer_id,
    COUNT(*) AS count_no_trans
FROM  Visits AS v  
    LEFT JOIN Transactions AS t ON v.visit_id = t.visit_id
WHERE
    t.visit_id IS NULL
GROUP BY
    customer_id;

/*
Table: Visits

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| visit_id    | int     |
| customer_id | int     |
+-------------+---------+
visit_id is the column with unique values for this table.
This table contains information about the customers who 
visited the mall.
 

Table: Transactions

+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| transaction_id | int     |
| visit_id       | int     |
| amount         | int     |
+----------------+---------+
transaction_id is column with unique values for this table.
This table contains information about the transactions
 made during the visit_id.
 

Write a solution to find the IDs of the users who visited 
without making any transactions and the number of times 
they made these types of visits.

Return the result table sorted in any order.
*/