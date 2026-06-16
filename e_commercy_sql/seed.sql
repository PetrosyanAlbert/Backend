BEGIN;

INSERT INTO users(full_name, email) VALUES
('Arman Petrosyan', 'Arman@mail.com'),
('Lilit Grigoryan', 'Lilit@mail.com'),
('Gor Sargsyan', 'Gor@mail.com'),
('Ani Hakobyan', 'Ani@mail.com');

INSERT INTO products (title, price_amd) VALUES
('iPhone 15', 650000),
('AirPods Pro 2', 120000),
('MacBook Air M2', 980000),
('Logitech MX Master 3S', 55000),
('Samsung T7 SSD 1TB', 65000),
('USB-C Charger 65W', 18000);

INSERT INTO orders (user_id, status) VALUES
(1, 'created'),
(1, 'delivered'),
(2, 'in_progress'),
(NULL, 'created'),
(2, 'delivered'),
(3, 'canceled');

INSERT INTO order_items (order_id, product_id, quantity, unit_price_amd) VALUES
(1, 2, 1, 120000),
(1, 6, 2, 18000);


INSERT INTO order_items (order_id, product_id, quantity, unit_price_amd) VALUES
(2, 1, 1, 650000),
(2, 2, 1, 115000);

INSERT INTO order_items (order_id, product_id, quantity, unit_price_amd) VALUES
(3, 4, 1, 55000),
(3, 5, 1, 65000);

INSERT INTO order_items (order_id, product_id, quantity, unit_price_amd) VALUES
(4, 2, 1, 120000),
(4, 5, 2, 64000);

INSERT INTO order_items (order_id, product_id, quantity, unit_price_amd) VALUES
(5, 3, 1, 980000),
(5, 2, 1, 120000);   

INSERT INTO order_items (order_id, product_id, quantity, unit_price_amd) VALUES
(6, 6, 1, 18000),    
(6, 4, 1, 55000);

INSERT INTO payments (order_id, provider, amount_amd, paid_at) VALUES
(2, 'card', 765000, NOW()),
(3, 'idram', 120000, NOW()),
(5, 'arca', 1100000, NOW());

COMMIT;
