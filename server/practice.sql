-- Insert Categories
INSERT INTO categories (name, description) VALUES
('Home Cleaning', 'Comprehensive cleaning services for your home.'),
('Electrical Repairs', 'Expert electrical repair services.'),
('Plumbing Services', 'Reliable plumbing solutions for all your needs.');

-- Insert Users
INSERT INTO users (username, email, password_hash, role, bio, profile_picture, contact_number, address, city, state, country, postal_code) VALUES
('JaneDoe', 'jane@example.com', 'plainpassword', 'provider', 'Experienced service provider.', 'path/to/image.jpg', '555-1234', '123 Main St', 'Anytown', 'Anystate', 'Country', '12345'),
('JohnDoe', 'john@example.com', 'plainpassword', 'client', 'Looking for reliable services.', 'path/to/image.jpg', '555-5678', '456 Elm St', 'Othertown', 'Otherstate', 'Country', '67890');

-- Insert Service Listings
INSERT INTO service_listings (provider_id, title, description, price, category_id, availability, image_urls, tags, status) VALUES
(1, 'Deep House Cleaning', 'A thorough clean for your home.', 120.00, 1, true, '{"url1.jpg","url2.jpg"}', '{"cleaning","deep clean","home"}', 'active'),
(1, 'Emergency Electrician', 'Available 24/7 for all your emergency electrical needs.', 80.00, 2, true, '{"url3.jpg","url4.jpg"}', '{"electric","emergency"}', 'active'),
(1, 'Standard Plumbing Fix', 'Fix leaks and clogs with ease.', 70.00, 3, true, '{"url5.jpg","url6.jpg"}', '{"plumbing","leaks","clogs"}', 'active');

-- Insert Reviews
INSERT INTO reviews (listing_id, reviewer_id, rating, comment) VALUES
(1, 2, 5, 'Fantastic service! My house has never been cleaner.'),
(2, 2, 4, 'Very quick to respond and solve my electrical issue.'),
(3, 2, 5, 'Polite and efficient, solved the plumbing problem in no time.');

-- Insert Bookings
INSERT INTO bookings (listing_id, client_id, provider_id, scheduled_for, status) VALUES
(1, 2, 1, '2024-03-15 10:00:00+00', 'confirmed'),
(2, 2, 1, '2024-03-20 14:00:00+00', 'pending'),
(3, 2, 1, '2024-03-25 09:00:00+00', 'completed');

-- Insert User Favorites
INSERT INTO user_favorites (user_id, listing_id) VALUES
(2, 1),
(2, 3);
