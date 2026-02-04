TRUNCATE TABLE transfers, accounts RESTART IDENTITY;


INSERT INTO accounts (full_name, balance_amd, status) VALUES

('Arman Petrosyan', 500000, 'active'),

('Lilit Grigoryan', 120000, 'active'),

('Gor Sargsyan', 5000, 'active'),

('Ani Hakobyan', 300000, 'frozen'),

('Vahan Martirosyan', 80000, 'active');

