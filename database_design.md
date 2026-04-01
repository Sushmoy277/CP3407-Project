# Database Design 
## Overview

The FeedMe system uses a relational database to manage all system data.  
The database is designed to support users, restaurants, menu items, and orders.

MySQL is used as the database system because it is reliable, structured, and widely used for web applications.



## Main Tables (Core)

The following core tables are used:

- users
- restaurants
- menu_items
- orders



## Users Table

Stores all user information including customers, restaurant owners, riders, and admins.

Fields:
- user_id (Primary Key)
- name
- email
- password
- phone
- address
- role



## Restaurants Table

Stores restaurant details.

Fields:
- restaurant_id (Primary Key)
- name
- location
- owner_id (Foreign Key → users)
- contact_details
- opening_hours



## Menu_Items Table

Stores food items offered by restaurants.

Fields:
- item_id (Primary Key)
- restaurant_id (Foreign Key → restaurants)
- name
- description
- price
- image_url



## Orders Table

Stores customer orders.

Fields:
- order_id (Primary Key)
- user_id (Foreign Key → users)
- restaurant_id (Foreign Key → restaurants)
- order_date
- total_amount
- status

# Database Design – Part 2 (Supporting Tables & Relationships)

## Supporting Tables

The following tables support the main system functionality:

- order_items
- payments
- deliveries
- reviews


## Order_Items Table

Stores individual items within an order.

Fields:
- order_item_id (Primary Key)
- order_id (Foreign Key → orders)
- item_id (Foreign Key → menu_items)
- quantity
- price


## Payments Table

Stores payment details.

Fields:
- payment_id (Primary Key)
- order_id (Foreign Key → orders)
- payment_method
- payment_status
- payment_date


## Deliveries Table

Stores delivery information.

Fields:
- delivery_id (Primary Key)
- order_id (Foreign Key → orders)
- rider_id (Foreign Key → users)
- delivery_status
- delivery_time


## Reviews Table

Stores customer reviews for restaurants.

Fields:
- review_id (Primary Key)
- user_id (Foreign Key → users)
- restaurant_id (Foreign Key → restaurants)
- rating
- comment
- review_date


## Relationships Between Tables

- One user can place many orders (1-to-many)
- One restaurant can have many menu items (1-to-many)
- One order can have many order items (1-to-many)
- One order has one payment (1-to-1)
- One order has one delivery (1-to-1)
- One restaurant can have many reviews (1-to-many)
- One user can write many reviews (1-to-many)
