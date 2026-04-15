# System Design and Architecture

This document outlines the architectural, database, and interface designs for the FeedMe platform. [cite_start]Every design choice is justified based on the need to deliver a scalable, "better than FoodPanda" solution on time and within budget[cite: 1, 3].

---

## 1. Architectural Design
[cite_start]To achieve High Distinction (HD) standards, FeedMe utilizes modern cloud services, specifically the **Amazon Web Services (AWS)** ecosystem[cite: 27, 55].

* [cite_start]**Frontend/Application Tier:** Hosted on an **AWS EC2** instance for reliable compute power[cite: 108].
* [cite_start]**Storage Tier:** **Amazon S3** is used to store static assets, such as restaurant logos and food item photos, ensuring high availability and faster load times[cite: 109].
* [cite_start]**Security:** **AWS Cognito** provides secure user authentication and role-based access control for Customers, Owners, and Riders[cite: 111, 152].

**Architectural Diagram (Created with Gliffy):**
![FeedMe System Architecture](Link_to_your_Gliffy_Diagram_Image_Here)
[cite_start]*Justification: Using a cloud-native architecture on AWS ensures our platform is scalable and meets the modern requirements of a food delivery service[cite: 50, 55].*

---

## 2. Database Design
[cite_start]We have implemented a modern relational database to manage the complex relationships between users, menus, and orders[cite: 22].

* **Key Entities:**
    * [cite_start]**Users:** Handles authentication and role identification (Customer, Restaurant Owner, Delivery Rider)[cite: 43, 68, 80].
    * [cite_start]**Restaurants & Menus:** Manages restaurant metadata and categorized food items[cite: 79].
    * [cite_start]**Orders:** Tracks the lifecycle of a purchase from "Pending" to "Delivered"[cite: 85].

**ER Diagram (Created with GenMyModel):**
![FeedMe Database Schema](Link_to_your_GenMyModel_ERD_Image_Here)
[cite_start]*Justification: A relational model in MySQL/Amazon RDS was chosen to ensure data integrity for financial transactions and order history[cite: 22, 110].*

---

## 3. Interface Design
[cite_start]The user interface (GUI) was designed with a focus on **Intuitive Navigation** and **Responsive Design** across desktop and mobile devices[cite: 23, 139, 141].

* [cite_start]**Customer Flow:** A simple step-by-step process for browsing, customizing food items, and secure checkout[cite: 81, 82].
* [cite_start]**Owner Dashboard:** A robust platform for managing bookings, tracking schedules, and updating menus[cite: 42, 69].
* [cite_start]**Accessibility:** Designed with color contrast and clear labels to remain usable for all individuals, including those with disabilities[cite: 145].

**Wireframes and Prototypes (Created with NinjaMock):**
![FeedMe UI Prototypes](Link_to_your_NinjaMock_Project_Image_Here)
[cite_start]*Justification: Using NinjaMock allowed for rapid prototyping to gather client feedback early in the Agile iterations, ensuring we delivered "what is needed"[cite: 1, 3, 8].*

---
[← Back to Main Page](index.md)
