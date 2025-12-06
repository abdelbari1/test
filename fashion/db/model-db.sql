drop table if exists users cascade;
drop table if exists items cascade;
drop table if exists sizes cascade;
drop table if exists wishlists cascade;
drop table if exists notifications cascade;
drop table if exists deliveries cascade;
drop table if exists purchases cascade;
drop table if exists request_lines cascade;
drop table if exists rental_items cascade;
drop table if exists booked_items cascade;

create table users (
    iid varchar(128) primary key,
    first_name varchar(128) not null,
    last_name varchar(128) not null,
    email varchar(128) not null,
    pwd varchar(128) not null,
    confirm_pwd varchar(128) not null,
    user_role varchar(128) not null
);

create table items (
    iid varchar(128) primary key,
    item_name varchar(128) not null,
    item_category varchar(128) not null,
    gender varchar(128) not null,
    quantity int default 0,
    item_model varchar(128),
    actual_price float not null,
    currency varchar(128) not null,
    edited_price float,
    flash_sale int,
    status_item varchar(128),
    description varchar(256),
    reference varchar(128),
    item_created timestamp,
    user_id varchar(128) references users(iid)
);

create table sizes(
    iid varchar(128) primary key,
    size varchar(128) not null,
    quantity int not null,
    item_id varchar(128) references items(iid) ON DELETE CASCADE
);

create table wishlists (
    user_id varchar(128) references users(iid),
    item_id varchar(128) references items(iid)
);

create table deliveries (
    iid varchar(128) primary key,
    region varchar(128) not null,
    addrs  varchar(128) not null,
    appartment varchar(128) not null,
    city varchar(128) not null,
    postcode varchar(128),
    phone varchar(128) not null,
    save_address boolean not null,
    user_id varchar(128) references users(iid)
);

create table purchases (
    iid varchar(128) primary key,
    buyer_id varchar(128) references users(iid),
    seller_id varchar(128) references users(iid),
    delivery_id varchar(128) references deliveries(iid),
    purchase_status varchar(128) not null,
    purchase_item_status varchar(128) not null,
    purchase_date timestamp
);

create table request_lines (
    item_id varchar(128) references items(iid),
    size varchar(128) not null,
    purchase_id varchar(128) references purchases(iid),
    quantity int not null
);

create table rental_items (
    iid varchar(128) primary key,
    item_id varchar(128) references items(iid),
    rental_price_by_days int not null,
    currency varchar(128) not null,
    number_of_days int not null default 1
);

create table booked_items (
    iid varchar(128) primary key,
    rental_item_id varchar(128) references rental_items(iid),
    size_id varchar(128) references sizes(iid),
    requested_start_date timestamp not null,
    duration int not null,
    user_id varchar(128) references users(iid),
    owner_id varchar(128) references users(iid),
    delivery_id varchar(128) references deliveries(iid)
);
