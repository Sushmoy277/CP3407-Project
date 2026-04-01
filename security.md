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

# Security Design – Part 2 (Data Protection & Validation)

## Data Protection

The system protects sensitive data using:

- Password hashing (encrypted passwords)
- Secure storage of user information
- Avoid storing plain-text passwords


## Data Transmission Security

- HTTPS protocol will be used
- Ensures secure communication between frontend and backend
- Protects data from interception


## Input Validation

The system validates all user inputs.

Examples:
- Prevent invalid email formats
- Prevent empty fields
- Validate numeric inputs (price, quantity)


## Protection Against Attacks

The system considers:

- SQL Injection prevention
- Cross-Site Scripting (XSS) prevention
- Validation of all user inputs


## Justification

Data protection is important because:
- It protects user privacy
- It prevents system vulnerabilities
- It ensures trust in the platform
