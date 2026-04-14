-- ============================================================
--  FeedMe Database Schema
--  CP3407 Project — James Cook University
--  Compatible with MySQL Workbench 8.0+
-- ============================================================

DROP DATABASE IF EXISTS feedme_db;
CREATE DATABASE feedme_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE feedme_db;

-- ============================================================
-- TABLE 1: USER
-- Stores all users: customers, restaurant owners, riders, admins
-- ============================================================
CREATE TABLE USER (
  user_id       INT             NOT NULL AUTO_INCREMENT,
  name          VARCHAR(100)    NOT NULL,
  email         VARCHAR(150)    NOT NULL UNIQUE,
  password      VARCHAR(255)    NOT NULL,         -- bcrypt hashed
  phone         VARCHAR(20),
  role          ENUM('customer', 'owner', 'rider', 'admin') NOT NULL DEFAULT 'customer',
  created_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);

-- ============================================================
-- TABLE 2: RESTAURANT
-- Owned by a USER with role='owner'
-- ============================================================
CREATE TABLE RESTAURANT (
  restaurant_id   INT           NOT NULL AUTO_INCREMENT,
  name            VARCHAR(150)  NOT NULL,
  location        VARCHAR(255)  NOT NULL,
  contact_number  VARCHAR(20),
  owner_id        INT           NOT NULL,
  image_url       VARCHAR(500),
  is_active       BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (restaurant_id),
  CONSTRAINT fk_restaurant_owner
    FOREIGN KEY (owner_id) REFERENCES USER(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================
-- TABLE 3: MENU
-- Menu items belonging to a restaurant
-- ============================================================
CREATE TABLE MENU (
  menu_id         INT             NOT NULL AUTO_INCREMENT,
  restaurant_id   INT             NOT NULL,
  item_name       VARCHAR(150)    NOT NULL,
  description     TEXT,
  price           DECIMAL(8, 2)   NOT NULL,
  category        VARCHAR(100),
  image_url       VARCHAR(500),
  is_available    BOOLEAN         NOT NULL DEFAULT TRUE,
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (menu_id),
  CONSTRAINT fk_menu_restaurant
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT(restaurant_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================
-- TABLE 4: ORDER
-- A customer's order from a restaurant
-- ============================================================
CREATE TABLE `ORDER` (
  order_id        INT             NOT NULL AUTO_INCREMENT,
  user_id         INT             NOT NULL,
  restaurant_id   INT             NOT NULL,
  total_amount    DECIMAL(10, 2)  NOT NULL DEFAULT 0.00,
  order_status    ENUM('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')
                                  NOT NULL DEFAULT 'pending',
  delivery_address VARCHAR(255)   NOT NULL,
  order_date      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (order_id),
  CONSTRAINT fk_order_user
    FOREIGN KEY (user_id) REFERENCES USER(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_order_restaurant
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT(restaurant_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================
-- TABLE 5: ORDER_ITEM
-- Line items within an order
-- ============================================================
CREATE TABLE ORDER_ITEM (
  order_item_id   INT           NOT NULL AUTO_INCREMENT,
  order_id        INT           NOT NULL,
  menu_id         INT           NOT NULL,
  quantity        INT           NOT NULL DEFAULT 1,
  unit_price      DECIMAL(8,2)  NOT NULL,         -- price at time of order
  PRIMARY KEY (order_item_id),
  CONSTRAINT fk_orderitem_order
    FOREIGN KEY (order_id) REFERENCES `ORDER`(order_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_orderitem_menu
    FOREIGN KEY (menu_id) REFERENCES MENU(menu_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================
-- TABLE 6: PAYMENT
-- One payment per order (1:1)
-- ============================================================
CREATE TABLE PAYMENT (
  payment_id      INT           NOT NULL AUTO_INCREMENT,
  order_id        INT           NOT NULL UNIQUE,
  payment_method  ENUM('card', 'ewallet', 'cash_on_delivery') NOT NULL,
  payment_status  ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  payment_date    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  transaction_ref VARCHAR(255),                   -- Stripe/PayPal reference
  PRIMARY KEY (payment_id),
  CONSTRAINT fk_payment_order
    FOREIGN KEY (order_id) REFERENCES `ORDER`(order_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================
-- TABLE 7: DELIVERY
-- One delivery per order (1:1), assigned to a rider
-- ============================================================
CREATE TABLE DELIVERY (
  delivery_id     INT           NOT NULL AUTO_INCREMENT,
  order_id        INT           NOT NULL UNIQUE,
  rider_id        INT           NOT NULL,
  delivery_status ENUM('assigned', 'picking_up', 'on_the_way', 'delivered', 'failed')
                                NOT NULL DEFAULT 'assigned',
  delivery_time   DATETIME,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (delivery_id),
  CONSTRAINT fk_delivery_order
    FOREIGN KEY (order_id) REFERENCES `ORDER`(order_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_delivery_rider
    FOREIGN KEY (rider_id) REFERENCES USER(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================
-- TABLE 8: REVIEW
-- Customer reviews for restaurants
-- ============================================================
CREATE TABLE REVIEW (
  review_id       INT           NOT NULL AUTO_INCREMENT,
  user_id         INT           NOT NULL,
  restaurant_id   INT           NOT NULL,
  order_id        INT,
  rating          TINYINT       NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment         TEXT,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (review_id),
  CONSTRAINT fk_review_user
    FOREIGN KEY (user_id) REFERENCES USER(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_review_restaurant
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT(restaurant_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================================
-- INDEXES (for performance on common queries)
-- ============================================================
CREATE INDEX idx_menu_restaurant   ON MENU(restaurant_id);
CREATE INDEX idx_order_user        ON `ORDER`(user_id);
CREATE INDEX idx_order_restaurant  ON `ORDER`(restaurant_id);
CREATE INDEX idx_order_status      ON `ORDER`(order_status);
CREATE INDEX idx_delivery_rider    ON DELIVERY(rider_id);
CREATE INDEX idx_review_restaurant ON REVIEW(restaurant_id);

-- ============================================================
-- SAMPLE SEED DATA (for testing)
-- ============================================================

-- Admin user (password: 'admin123' — replace with bcrypt hash in production)
INSERT INTO USER (name, email, password, phone, role) VALUES
  ('Admin User',     'admin@feedme.app',    '$2b$10$examplehashADMIN',    '+60100000001', 'admin'),
  ('Alice Customer', 'alice@feedme.app',    '$2b$10$examplehashALICE',    '+60100000002', 'customer'),
  ('Bob Owner',      'bob@feedme.app',      '$2b$10$examplehashBOB',      '+60100000003', 'owner'),
  ('Ahmad Rider',    'ahmad@feedme.app',    '$2b$10$examplehashAHMAD',    '+60100000004', 'rider');

-- Sample restaurant (owned by Bob)
INSERT INTO RESTAURANT (name, location, contact_number, owner_id) VALUES
  ('Burger Palace', '123 Main Street, Cairns', '+61740000001', 3),
  ('Pizza Factory', '88 Tower Street, Cairns', '+61740000002', 3);

-- Sample menu items
INSERT INTO MENU (restaurant_id, item_name, description, price, category) VALUES
  (1, 'Classic Burger',    'Beef patty with lettuce and tomato', 12.90, 'Burgers'),
  (1, 'Cheese Burger',     'Classic with extra cheese',          14.90, 'Burgers'),
  (1, 'Fries',             'Crispy golden fries',                 5.50, 'Sides'),
  (2, 'Margherita Pizza',  'Tomato, mozzarella, basil',          18.90, 'Pizza'),
  (2, 'Pepperoni Pizza',   'Loaded with pepperoni',              21.90, 'Pizza');

-- Sample order
INSERT INTO `ORDER` (user_id, restaurant_id, total_amount, order_status, delivery_address) VALUES
  (2, 1, 28.40, 'delivered', '456 Oak Avenue, Cairns');

-- Sample order items
INSERT INTO ORDER_ITEM (order_id, menu_id, quantity, unit_price) VALUES
  (1, 1, 1, 12.90),
  (1, 2, 1, 14.90),
  (1, 3, 1,  5.50);

-- Sample payment
INSERT INTO PAYMENT (order_id, payment_method, payment_status, transaction_ref) VALUES
  (1, 'card', 'paid', 'stripe_test_abc123');

-- Sample delivery
INSERT INTO DELIVERY (order_id, rider_id, delivery_status, delivery_time) VALUES
  (1, 4, 'delivered', NOW());

-- Sample review
INSERT INTO REVIEW (user_id, restaurant_id, order_id, rating, comment) VALUES
  (2, 1, 1, 5, 'Great burgers, fast delivery!');

-- ============================================================
-- VERIFY
-- ============================================================
SELECT 'DATABASE SETUP COMPLETE' AS status;
SHOW TABLES;
