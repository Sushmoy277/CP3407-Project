# Testing and Quality Assurance

This document details the testing strategies and results for the FeedMe project, ensuring the delivered solution meets all requirements and functions reliably in a cloud environment.

---

## 1. Test-Driven Development (TDD) Approach
Following the guidelines in the CP3407 lecture slides, our team adopted a Test-Driven Development mindset. We defined acceptance criteria for each user story before the coding phase began. This ensured that every feature was built to satisfy a specific user need.

---

## 2. Acceptance Testing
Acceptance testing was conducted for all delivered features to verify that the IT solution delivers "what is needed, on time and on budget".

| User Story ID | Feature | Acceptance Criteria | Result |
| :--- | :--- | :--- | :--- |
| **US-01** | Account Creation | User can register with a unique email and hashed password. | **Passed** |
| **US-03** | Browse Restaurants | Customer sees a list of restaurants fetched from the MySQL DB. | **Passed** |
| **US-07** | Place Order | Order details are correctly saved to the database and linked to the user. | **Passed** |
| **US-09** | Order Status | Owner can toggle status between 'Cooking' and 'Ready'. | **Passed** |
| **US-11** | Cloud Deployment | The application is accessible via the AWS public IP without downtime. | **Passed** |

---

## 3. Component Testing and Data Sets
We utilized specific testing data sets to validate the robustness of the system.

### A. Unit Testing
Individual PHP functions, such as the cart total calculation and the menu item price formatter, were tested with:
* **Valid Inputs:** Standard prices (e.g., 12.50).
* **Boundary Cases:** Free items (0.00) or high-volume orders.
* **Invalid Inputs:** Negative numbers or non-numeric strings to ensure graceful error handling.

### B. Integration Testing
We tested the integration between the **WordPress/PHP frontend** and the **AWS S3 storage**.
* **Test Case:** Uploading a restaurant logo through the owner dashboard.
* **Verification:** Confirming the file exists in the S3 bucket and is correctly linked in the MySQL database.

---

## 4. Performance and Security Testing
* **Load Testing:** We simulated multiple concurrent users accessing the FeedMe homepage on our AWS EC2 instance to ensure no performance degradation.
* **Security Audit:** We verified that all sensitive data is encrypted in transit and that role-based access controls prevent customers from accessing the restaurant owner dashboard.

---
[← Back to Main Page](index.md)
