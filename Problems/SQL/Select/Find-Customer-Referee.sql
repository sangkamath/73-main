/*
Table: Customer

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+
In SQL, id is the primary key column for this table.
Each row of this table indicates the id of a customer, 
their name, and the id of the customer who referred them.
*/

SELECT name FROM Customer WHERE NOT referee_id=2 OR referee_id IS NULL;

SELECT name FROM customer WHERE referee_id <> 2 OR referee_id IS NULL;

SELECT name FROM customer WHERE referee_id != 2 OR referee_id IS NULL;

SELECT name FROM customer WHERE referee_id = NULL OR referee_id <> 2;