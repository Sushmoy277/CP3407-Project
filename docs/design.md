# System Design and Architecture

This document outlines the architectural, database, and interface designs for the FeedMe platform. Every design choice is justified based on the need to deliver a scalable, "better than FoodPanda" solution on time and within budget.

---

## 1. Architectural Design
To achieve High Distinction (HD) standards, FeedMe utilizes modern cloud services, specifically the **Amazon Web Services (AWS)** ecosystem.

* **Frontend/Application Tier:** Hosted on an **AWS EC2** instance for reliable compute power.
* **Storage Tier:** **Amazon S3** is used to store static assets, such as restaurant logos and food item photos, ensuring high availability and faster load times[cite: 109].
* **Security:** **AWS Cognito** provides secure user authentication and role-based access control for Customers, Owners, and Riders[cite: 111, 152].

---

## 2. Database Design
We have implemented a modern relational database to manage the complex relationships between users, menus, and orders.

* **Key Entities:**
    * **Users:** Handles authentication and role identification (Customer, Restaurant Owner, Delivery Rider).
    * **Restaurants & Menus:** Manages restaurant metadata and categorized food items.
    * **Orders:** Tracks the lifecycle of a purchase from "Pending" to "Delivered".


---

## 3. Interface Design
The user interface (GUI) was designed with a focus on **Intuitive Navigation** and **Responsive Design** across desktop and mobile devices.

* **Customer Flow:** A simple step-by-step process for browsing, customizing food items, and secure checkout.
* **Owner Dashboard:** A robust platform for managing bookings, tracking schedules, and updating menus.
* **Accessibility:** Designed with color contrast and clear labels to remain usable for all individuals, including those with disabilities.

**Wireframes and Prototypes (Created with NinjaMock):**
(https://www.figma.com/board/7PcOZ8ORDOZHcP3hYhWP62/CP3407-Project?node-id=0-1&t=e1gwEUJ5Nc1GZGBH-0)


---
[← Back to Main Page](index.md)
