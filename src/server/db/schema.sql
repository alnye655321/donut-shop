-- DROP DATABASE IF EXISTS test1;
-- CREATE DATABASE test1;

\c test1;

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS shops_donuts;
DROP TABLE IF EXISTS donuts;
DROP TABLE IF EXISTS shops;


CREATE TABLE shops (
 id SERIAL PRIMARY KEY,
 name VARCHAR,
 city VARCHAR
);

CREATE TABLE donuts (
 id SERIAL PRIMARY KEY,
 name VARCHAR,
 topping VARCHAR,
 price INTEGER
);

CREATE TABLE shops_donuts (
 id SERIAL PRIMARY KEY,
 shop_id INTEGER REFERENCES shops(id),
 donut_id INTEGER REFERENCES donuts(id)
);

CREATE TABLE employees (
 id SERIAL PRIMARY KEY,
 first_name VARCHAR,
 last_name VARCHAR,
 email VARCHAR,
 favorite_donut INTEGER REFERENCES donuts(id),
 shop_id INTEGER REFERENCES shops(id)
);

INSERT INTO shops (name, city) VALUES ('Donut Hole','Denver');
INSERT INTO shops (name, city) VALUES ('Sprinke Town','Denver');
INSERT INTO shops (name, city) VALUES ('Krisy Kreme','Denver');
INSERT INTO shops (name, city) VALUES ('Dunkin Donuts','Denver');
INSERT INTO shops (name, city) VALUES ('Donuts R Us','Denver');

INSERT INTO donuts (name, topping, price) VALUES ('Glazed','Sprinkles',1);
INSERT INTO donuts (name, topping, price) VALUES ('Chocolate','Frosting',3);
INSERT INTO donuts (name, topping, price) VALUES ('Pumpkin','Shots',3);
INSERT INTO donuts (name, topping, price) VALUES ('Jelly','Sprinkles',2);
INSERT INTO donuts (name, topping, price) VALUES ('Creame','Candy',2);
INSERT INTO donuts (name, topping, price) VALUES ('Pizza','Pepporoni',2);

INSERT INTO shops_donuts (shop_id, donut_id) VALUES (1,2);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (1,1);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (2,3);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (2,2);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (3,5);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (3,6);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (4,1);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (4,2);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (5,1);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (5,3);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (5,6);
INSERT INTO shops_donuts (shop_id, donut_id) VALUES (5,2);

INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('Alex','Nye','anye@aol.com',1,1);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('James','Bond','jbond@aol.com',2,2);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('Marty','McFly','marty@aol.com',3,3);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('CottonEye','Joe','joe@aol.com',2,4);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('Joe','Smith','smith@aol.com',6,5);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('Micky','Mouse','mousy@aol.com',2,3);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('Barry','Allen','theflash@aol.com',2,3);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('Lois','Lane','hottie@aol.com',4,5);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('Bruce','Banner','hulk@aol.com',1,1);
INSERT INTO employees (first_name, last_name, email, favorite_donut, shop_id) VALUES ('Bruce','Wayne','batman@aol.com',2,4);
