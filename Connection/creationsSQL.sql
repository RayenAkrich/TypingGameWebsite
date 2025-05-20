-- Use MySQL WORKBENCH for the database creation
CREATE DATABASE IF NOT EXISTS TypingGame;
USE TypingGame;

DROP TABLE IF EXISTS scoreboard;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE scoreboard(
    idGame INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT,
    userName VARCHAR(50),
    score DOUBLE,
    FOREIGN KEY (idUser) REFERENCES users(id),
    FOREIGN KEY (userName) REFERENCES users(username)
);

USE TypingGame;
select * from users;
select * from scoreboard;