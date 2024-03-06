create database app;

drop schema desfacijuri cascade;

create schema desfacijuri;

create table desfacijuri.account (
	account_id uuid primary key,
	name text not null,
	email text not null,
	phone text not null,
    created_at timestamp default NOW(),
    updated_at timestamp
);

create table desfacijuri.endereco (
	endereco_id uuid primary key,
    account_id uuid not null references desfacijuri.account(account_id),
	x numeric not null,
	y numeric not null,
    created_at timestamp default NOW(),
    updated_at timestamp
);