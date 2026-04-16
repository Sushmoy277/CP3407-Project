# Iteration 2: Management Dashboards & Cloud Integration

**Duration:** 3 weeks
**Team Size:** 3 Developers
**Assumed Velocity:** 15 story points

---

## 1. Goal
The primary goal of Iteration 2 was to expand the "FeedMe" platform beyond the customer experience. This included building the **Restaurant Owner Dashboard** for order management, a **Rider Interface** for deliveries, and migrating the entire stack to **AWS EC2** for production-grade hosting.

---

## 2. User Stories Planned for Iteration 2
Following our Agile roadmap, we prioritized administrative and logistical features.

| ID | User Story | Priority | Estimate | Assigned To |
|:---|:---|:---|:---|:---|
| US-08 | As a Restaurant Owner, I want to manage my menu (add/edit items) so that customers see current offerings. | High | 3 SP | Ornysha |
| US-09 | As a Restaurant Owner, I want to view and update order statuses (e.g., Cooking, Ready) so customers are informed. | High | 5 SP | Sushmoy |
| US-10 | As a Delivery Rider, I want to view available orders for pickup so I can start deliveries. | Medium | 3 SP | Sushmoy |
| US-11 | As a System Admin, I want to host the site on a cloud server (AWS) to ensure 24/7 availability. | High | 4 SP | Ramiz |

**Total Estimated:** 15 Story Points

---

## 3. Implementation & Technical Progress
During this iteration, we moved from a local environment to a **Modern Cloud Infrastructure**.

### Cloud Deployment (AWS)
* **Hosting:** Successfully deployed the PHP/MySQL stack on **AWS Lightsail**.
* **Storage:** Integrated **Amazon S3** for storing high-resolution food images to reduce server load.
* **Networking:** Configured static IP and firewall rules to ensure secure access to the application.

### Feature Development
* **Dashboard UI:** Built a responsive management interface using modern CSS grids to allow owners to track orders in real-time.
* **Database Updates:** Modified the `Orders` table to include `status_id` and `rider_id` for tracking delivery progress.

---

## 4. Testing & Quality Assurance
We applied **Acceptance Testing** to all delivered features in this iteration.

| Feature | Test Case | Expected Result | Status |
|:---|:---|:---|:---|
| Menu Management | Owner uploads new image to S3 | Image displays correctly on the menu | **PASS** |
| Status Update | Owner changes order to "Ready" | Customer view updates immediately | **PASS** |
| Deployment | Access site via public IP | Site loads within 2 seconds | **PASS** |

---

## 5. Agile Retrospective & Client Feedback

**What Went Well:**
* Migration to **AWS** was successful, providing a much more stable environment than local hosting.
* The use of **GitHub** for collaborative coding allowed us to merge the Dashboard features without breaking the Iteration 1 core flow.

**Client Feedback (Mock Stakeholder):**
> "The owner dashboard is a huge step forward. For the final polish, ensure the rider interface is mobile-optimized as they will be using it on the move." 

**Adjustments for Final Release:**
* We identified a need for more robust password encryption (using `password_hash` in PHP) which was implemented mid-sprint to meet security standard.

---

## 6. Iteration 2 Artifacts
* **Live App URL:** http://18.212.234.225

---
[← Back to Main Page](index.md)
