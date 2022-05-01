-- to create a new database
CREATE DATABASE crud;

-- to use database
use crud;

-- creating a new table
CREATE TABLE users (
  id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- to show all tables
show tables;

-- to describe table
describe users;
