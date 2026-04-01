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
