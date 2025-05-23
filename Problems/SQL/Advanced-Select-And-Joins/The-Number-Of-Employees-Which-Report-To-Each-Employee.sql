# Write your MySQL query statement below
SELECT
mgr.employee_id,
mgr.name,
COUNT(emp.employee_id) AS reports_count,
ROUND(AVG(emp.age)) AS average_age
FROM
    employees emp
    JOIN employees mgr ON
    emp.reports_to = mgr.employee_id
GROUP BY
    employee_id
ORDER BY employee_id;


SELECT 
  reports_to AS employee_id, 
  (
    SELECT 
      name 
    FROM 
      employees e1 
    WHERE 
      e.reports_to = e1.employee_id 
  ) AS name, 
  COUNT(reports_to) AS reports_count, 
  ROUND(
    AVG(age)
  ) AS average_age 
FROM 
  employees e 
GROUP BY 
  reports_to 
HAVING 
  reports_count > 0 
ORDER BY 
  employee_id
/*
Table: Employees

+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| employee_id | int      |
| name        | varchar  |
| reports_to  | int      |
| age         | int      |
+-------------+----------+
employee_id is the column with unique values for this table.
This table contains information about the employees and 
the id of the manager they report to. Some employees do 
not report to anyone (reports_to is null). 
 

For this problem, we will consider a manager an employee 
who has at least 1 other employee reporting to them.

Write a solution to report the ids and the names of all 
managers, the number of employees who report directly to 
them, and the average age of the reports rounded to the 
nearest integer.

Return the result table ordered by employee_id.
*/