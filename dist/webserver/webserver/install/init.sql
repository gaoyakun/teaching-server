set character set utf8mb4;

drop database if exists `open_teaching_web`;
create database if not exists `open_teaching_web` default charset utf8mb4 collate utf8mb4_general_ci;
use `open_teaching_web`;

drop table if exists `user`;
create table `user` (
    `id` int auto_increment,
    `account` varchar(32) unique not null,
    `passwd` varchar(32) not null,
    `name` varchar(64) not null default '',
    `state` tinyint not null default 0,
    `role` tinyint not null default 0,
    primary key (`id`)
) engine=InnoDB default charset=utf8mb4;
