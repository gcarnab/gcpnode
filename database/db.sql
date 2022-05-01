-- to create a new database
CREATE DATABASE crud;

-- to use database
use crud;

-- creating a new table
CREATE TABLE users (
  id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
  email VARCHAR(20) NULL,
  fullname VARCHAR(20) NULL,
  role VARCHAR(20) NOT NULL
);

-- to show all tables
show tables;

-- to describe table
describe users;
