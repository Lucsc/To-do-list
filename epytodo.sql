DROP DATABASE IF EXISTS epytodo;
CREATE DATABASE IF NOT EXISTS epytodo;
use epytodo;
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user`
(
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `firstname` varchar(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS `todo`;
CREATE TABLE IF NOT EXISTS `todo`
(
    `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `due_time` DATETIME NOT NULL,
    `status` enum('not started', 'in progress', 'done') DEFAULT 'not started',
    `user_id` varchar(255) NOT NULL REFERENCES `user`(`id`)
);