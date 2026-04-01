# Security Design

## Overview

Security is a critical part of the FeedMe system. The platform handles sensitive user data such as login credentials, addresses, and order information.



## Authentication

The system uses secure login mechanisms to verify user identity.

Features:
- User registration with email and password
- Login validation using backend server
- Password encryption before storage



## Authorization

The system uses role-based access control.

User roles:
- Customer
- Restaurant Owner
- Delivery Rider
- Admin

Each role has different permissions:
- Customers can place orders
- Restaurants can manage menus and orders
- Riders can update delivery status
- Admins can manage the entire system



## Justification

Authentication and authorization are important because:
- They protect user accounts
- They prevent unauthorized access
- They ensure system security and reliability
