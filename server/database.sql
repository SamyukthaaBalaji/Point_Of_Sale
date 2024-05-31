
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  parent_order_id INT REFERENCES orders(id),
  customer_name VARCHAR(100),
  customer_number VARCHAR(20),
  customer_address TEXT,
  payment_method VARCHAR(20),
  subtotal NUMERIC,
  tax NUMERIC,
  grand_total NUMERIC,
  product_id INT,
  product_name VARCHAR(255),
  quantity INT,
  price NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
