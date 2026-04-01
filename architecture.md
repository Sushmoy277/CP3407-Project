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



## User Interaction Flow

- User visits website
- Logs in or registers
- Browses restaurants
- Adds items to cart
- Proceeds to checkout
