-- Active: 1759236719174@@127.0.0.1@5432@express-cargoo

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE Table client(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR NOT NULL,
    address VARCHAR(50) NOT NULL,
    location VARCHAR NOT NULL,
    email VARCHAR NOT NULL
);



CREATE TYPE currency as ENUM('cash', 'card');

CREATE Table currency_type(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name currency DEFAULT 'cash',
    decription TEXT
);


CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES client(id) ON DELETE CASCADE,
    order_unique_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE order_products (
    pid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1,
    summa NUMERIC(15, 2) NOT NULL,
    currency_type_id INT NOT NULL,
    truck TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE operation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status_id INT NOT NULL,
    operation_date TIMESTAMP DEFAULT NOW(),
    admin_id UUID REFERENCES admin(id) ON DELETE SET NULL,
    description TEXT
);


CREATE Table admin(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    tg_link VARCHAR NOT NULL,
    token VARCHAR NOT NULL,
    is_creator BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT false
)

