INSERT INTO students (full_name, email, phone, status)
VAlUES
('Arman Petrosyan', 'arman@mail.com', '091111111', 'active'),
('Ani Hakobyan', 'ani@mail.com', '092222222', 'paused'),
('Gor Sargsyan', 'gor@mail.com', NULL, 'active'),
('Lilit Grigoryan', 'lilit@mail.com', '093333333', 'active'),
('Karen Mkrtchyan', 'karen@mail.com', NULL, 'paused'),
('Mariam Hovhannisyan', 'mariam@mail.com', '094444444', 'active'),
('Tigran Avetisyan', 'tigran@mail.com', NULL, 'active'),
('Narek Petrosyan', 'narek@mail.com', '095555555', 'active');

INSERT INTO courses (title, level, price_amd, is_published)
VALUES
('JavaScript Basics', 'beginner', 50000, false),
('Node.js Backend', 'intermediate', 90000, true),
('React Frontend', 'intermediate', 85000, true),
('System Design', 'advanced', 150000, false),
('Databases Intro', 'beginner', 60000, false);

INSERT INTO support_tickets (subject, description, priority, state)
VALUES
('Login issue', 'Cannot login to platform', 'high', 'open'),
('Payment problem', 'Payment not going through', 'high', 'open'),
('UI bug', 'Button not clickable', 'medium', 'open'),
('Course access', 'Cannot access purchased course', 'medium', 'in_progress'),
('Profile edit', 'Cannot update profile info', 'low', 'open'),
('Password reset', 'Reset email not sent', 'medium', 'resolved'),
('App crash', 'App crashes on start', 'high', 'open'),
('Notification bug', 'Notifications not working', 'low', 'closed');

INSERT INTO inventory_items (name, category, quantity, unit_price_amd, is_available)
VALUES
('MacBook Pro', 'laptop', 2, 600000, true),
('Dell Monitor', 'monitor', 0, 120000, true),
('HDMI Cable', 'cable', 0, 5000, true),
('Office Chair', 'chair', 5, 45000, true),
('USB-C Cable', 'cable', 10, 4000, true),
('Lenovo Laptop', 'laptop', 0, 480000, true),
('Mouse', 'accessory', 15, 6000, true),
('Keyboard', 'accessory', 12, 9000, true),
('Router', 'network', 3, 35000, true),
('Projector', 'equipment', 1, 250000, true);


SELECT * FROM students
WHERE status = 'active';

SELECT * FROM students
WHERE email = 'an@mail.com';

SELECT full_name, phone FROM students
WHERE phone IS NOT NULL;

SELECT * FROM courses
WHERE is_published = TRUE;

SELECT * FROM courses
WHERE price_amd BETWEEN 6000 AND 100000;

SELECT * FROM support_tickets
WHERE state = 'open' AND priority = 'high';

SELECT name, quantity, unit_price_amd,
(quantity * unit_price_amd) AS total_value_amd
FROM inventory_items;

UPDATE students
SET status = 'paused'
WHERE email = 'arman@mail.com';

UPDATE stidents
SET phone = '099999999'
WHERE email = 'gor@mail.com';

UPDATE courses
SET is_published = true
WHERE level = 'beginner';

UPDATE support_tickets
SET state = 'in_progress'
WHERE id IN (1, 2);

UPDATE support_tickets
SET state = 'resolved'
WHERE subject = 'UI bug';

UPDATE inventory_items
SET quantity = quantity + 10,
updated_at = NOW()
WHERE namw = 'HDMI Cable';

DELETE FROM students
WHERE email = 'narek@mail.com';

DELETE FROM support_tickets
WHERE state = 'closed';

DELETE FROM inventory_items
WHERE is_available = false;