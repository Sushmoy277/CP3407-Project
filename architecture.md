# Architecture Design 

## Overview

FeedMe is a modern food ordering platform inspired by FoodPanda, designed to improve user experience, performance, and system management.

The system uses a modern web-based architecture with frontend, backend, database, and cloud components.



## Architectural Style

The system follows a **3-tier architecture**:

1. Presentation Layer (Frontend)
2. Application Layer (Backend)
3. Data Layer (Database)

This design separates responsibilities and makes the system scalable and maintainable.



## Frontend Design

The frontend handles:
- User interface
- Navigation between pages
- Cart and checkout
- Order tracking

### Technology
- React
- HTML, CSS, JavaScript

### Justification

- React allows reusable components
- Supports responsive UI design
- Industry-standard for modern web apps
- Suitable for dashboards (customer, restaurant, admin)


## Backend Design

The backend handles:
- Business logic
- Authentication
- Order processing
- API communication

### Technology
- Node.js
- Express.js

### Justification

- Fast and scalable
- Good for API-based systems
- Easy integration with frontend and database


## Database Design Overview

The database stores:
- Users
- Restaurants
- Menu items
- Orders
- Payments
- Deliveries
- Reviews

### Technology
- MySQL

### Justification

- Structured relational data
- Reliable and widely used
- Supports complex relationships (orders, users, menus)


## API Communication

- Frontend sends request
- Backend processes request
- Database stores/retrieves data
- Backend sends response to frontend

This ensures clear separation between UI and logic.


## User Interaction Flow

- User visits website
- Logs in or registers
- Browses restaurants
- Adds items to cart
- Proceeds to checkout

# Architecture Design 

## Cloud & Deployment

To achieve HD-level quality, the system uses cloud services.

### AWS Services

- EC2 – backend hosting
- RDS – MySQL database
- S3 – image storage
- Amplify – frontend hosting

### Justification

- Scalable system
- Modern industry practice
- Required for HD-level work

## Security Design

- User authentication required
- Role-based access (customer, admin, restaurant, rider)
- Input validation
- Secure data handling


## Scalability

The system supports future growth:
- More users
- More restaurants
- Additional features (AI, tracking, etc.)


## Justification of Architecture

This architecture is chosen because:
- It follows modern web standards
- It separates frontend, backend, and database
- It supports agile development
- It matches assignment requirements
- 

## Summary

The FeedMe system uses:
- React frontend
- Node.js backend
- MySQL database
- AWS cloud services

This ensures a scalable, maintainable, and modern system.
