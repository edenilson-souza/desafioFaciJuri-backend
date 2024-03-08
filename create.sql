create database app;

drop schema desfacijuri cascade;

create schema desfacijuri;

create table desfacijuri.account (
	account_id uuid primary key,
	name text not null,
	email text not null,
	phone text not null,
    cordx numeric not null,
    cordy numeric not null,
    created_at timestamp default NOW(),
    updated_at timestamp
);