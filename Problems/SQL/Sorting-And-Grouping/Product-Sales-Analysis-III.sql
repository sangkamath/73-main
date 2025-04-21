# Write your MySQL query statement below
# Write your MySQL query statement below
SELECT
    product_id,
    year AS first_year,
    quantity,
    price
FROM
    Sales
WHERE
    (product_id, year) IN (
        SELECT
        product_id,
        MIN(year) AS year
        FROM 
        Sales
        GROUP BY
        product_id
    );

SELECT s.product_id, s.year AS first_year, s.quantity, s.price
FROM Sales s
JOIN (
    SELECT product_id, MIN(year) AS first_year
    FROM Sales
    GROUP BY product_id
) AS sub
ON s.product_id = sub.product_id AND s.year = sub.first_year;

/*
Table: Sales

+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| sale_id     | int   |
| product_id  | int   |
| year        | int   |
| quantity    | int   |
| price       | int   |
+-------------+-------+
(sale_id, year) is the primary key (combination of columns with unique
 values) of this table.
product_id is a foreign key (reference column) to Product table.
Each row of this table shows a sale on the product product_id in a 
certain year.
Note that the price is per unit.

Table: Product

+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| product_id   | int     |
| product_name | varchar |
+--------------+---------+
product_id is the primary key (column with unique values) of this table.
Each row of this table indicates the product name of each product.

Write a solution to select the product id, year, quantity, and price 
for the first year of every product sold. If any product is bought 
multiple times in its first year, return all sales separately.

Return the resulting table in any order.


*/