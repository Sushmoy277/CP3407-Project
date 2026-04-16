# FeedMe: A Modern Food Delivery Ecosystem

FeedMe is a sophisticated, database-driven food ordering platform developed for **CP3407/CP5507** at **James Cook University**. Our system is designed to provide a better food ordering experience than traditional platforms by focusing on usability, clear role-based access, and efficient order management.

## Project Goal
The goal of FeedMe is to develop a user-friendly and database-driven website that delivers "what is needed, on time and on budget." We focus on high usability for four distinct roles: Customers, Restaurant Owners, Delivery Riders, and Administrators.

## The Team
1. **Sushmoy Paul Rohit:** Backend Lead & Database Architecture
2. **Ornysha Biswas:** Frontend Lead & UI/UX Design
3. **Mohammad Ramiz Karim:** Quality Assurance, Documentation & Testing Lead

---

## Project Planning & System Design
Before starting development, the project was thoroughly planned to ensure all requirements were met.

* **Tech Stack:** PHP, MySQL, HTML5, CSS3, JavaScript, and AWS Lightsail. (tech_stack.md)
* **Architecture:** A layered architecture where users interact through a web frontend, communicating with a backend server and a central database. (architecture.md)
* **Database Design:** Structured to handle high-concurrency for orders, menus, and user roles. (database_design.md)
* **UI/UX Design:** Responsive layouts designed for smooth user flow and accessibility. (UI_design.md)

---

### Iteration 1
**Duration:** 3 Weeks (March 9, 2026 – March 30, 2026)
**Goal:** Deliver a Minimum Viable Product (MVP) focusing on the core ordering flow.

1. **User Registration & Login:** Priority: High | Status: Completed
2. **Restaurant & Menu Browsing:** Priority: High | Status: Completed
3. **Cart Management:** Priority: High | Status: Completed
4. **Order Placement:** Priority: High | Status: Completed

*Total: 16 days of development.* (iteration_1.md)

### Iteration 2
**Duration:** 3 Weeks (March 31, 2026 – April 16, 2026)
**Goal:** Expand management features and implement live cloud tracking.

1. **Restaurant Owner Dashboard:** Priority: High | Status: Completed
2. **Rider Delivery Interface:** Priority: Medium | Status: Completed
3. **Live Order Tracking:** Priority: High | Status: Completed
4. **AWS Cloud Deployment:** Priority: High | Status: Completed

*Total: 16 days of development.* (iteration_2.md)

---

## Technical Specifications

### Security Design
The system employs secure login mechanisms, role-based access control (RBAC), and data validation to protect user accounts and prevent unauthorized access.(security.md)

### Testing
We utilize unit, integration, and system testing to verify key functionalities like login, ordering, and real-time updates. (testing.md)

### Team Roles
Detailed distribution of work across the team members can be found here: (team_roles.md)

---

## Marking Navigation
This GitHub repository serves as the project output. Use the table below to find specific criteria for marking:

| Rubric Criterion | Link |
| :--- | :--- |
| **1: Requirements** | [User Stories](User_stories.md) |
| **2: Design** | [System Design](design.md) |
| **3: Implementation** | [Actual Iterations](#actual-iterations) |
| **4: Testing** | [QA & Testing](testing.md) |
| **6: Building Tools** | [Tools & Tech Stack](tech_stack.md) |
| **7: Agile Engineering** | [Agile Management](agile_project_management.md) |

**Live Deployed Solution:** [FeedMe on AWS](http://18.212.234.225/)

*James Cook University — CP3407 Project 2026*
