# Write your MySQL query statement below
WITH FirstLogin AS (
    SELECT player_id, MIN(event_date) AS first_login
    FROM Activity
    GROUP BY player_id
),
NextDayLogin AS (
    SELECT a.player_id
    FROM Activity a
    JOIN FirstLogin f
    ON a.player_id = f.player_id
    AND a.event_date = DATE_ADD(f.first_login, INTERVAL 1 DAY)
)
SELECT
    ROUND(COUNT(DISTINCT n.player_id)/COUNT(DISTINCT f.player_id), 2)
    AS fraction
FROM FirstLogin f
LEFT JOIN NextDayLogin n
    ON f.player_id = n.player_id;


# Write your MySQL query statement below
SELECT
    ROUND(
        COUNT(A1.player_id)
        / (SELECT 
        COUNT(DISTINCT A3.player_id)
        FROM Activity A3),
    2) AS fraction
FROM
    Activity A1
WHERE
    (A1.player_id, DATE_SUB(A1.event_date, 
    INTERVAL 1 DAY)) IN (
        SELECT
        A2.player_id,
        MIN(A2.event_date)
        FROM
        Activity A2
        GROUP BY
        A2.player_id
    );

/*
Table: Activity

+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| player_id    | int     |
| device_id    | int     |
| event_date   | date    |
| games_played | int     |
+--------------+---------+
(player_id, event_date) is the primary key (combination of columns 
with unique values) of this table.
This table shows the activity of players of some games.
Each row is a record of a player who logged in and played a 
number of games (possibly 0) before logging out on someday using some device.
 

Write a solution to report the fraction of players that logged
 in again on the day after the day they first logged in, 
 rounded to 2 decimal places. In other words, you need to 
 count the number of players that logged in for at least two 
 consecutive days starting from their first login date, then 
 divide that number by the total number of players.
*/