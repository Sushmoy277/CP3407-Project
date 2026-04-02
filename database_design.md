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

# Database Design

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


## Database Justification

The database design is chosen based on the needs of the FeedMe system.

Reasons:

- Uses relational structure suitable for food ordering systems
- Supports multiple user roles (customer, restaurant, rider, admin)
- Maintains data consistency using foreign keys
- Allows efficient data storage and retrieval
- Supports scalability for future features



## Data Integrity

The system ensures data integrity by:
- Using primary keys for unique identification
- Using foreign keys to maintain relationships
- Avoiding duplicate or inconsistent data



## Scalability

The design allows future expansion such as:
- Adding promotions and discounts
- Adding analytics and reports
- Supporting more users and restaurants



## Justification with Assignment Requirements

This database design:
- Uses a modern relational database (MySQL)
- Supports all core system features
- Aligns with project requirements
- Helps deliver a scalable and efficient system



## Summary

The FeedMe database is structured to manage users, restaurants, orders, and deliveries effectively.

It ensures:
- Strong relationships between data
- Efficient system performance
- Support for future development

This design provides a solid foundation for building the application.
<img width="547" height="725" alt="Screenshot 2026-04-03 at 12 19 41 am" src="https://github.com/user-attachments/assets/2b387afb-b234-4e61-acb5-1a13d61a4bd5" />

