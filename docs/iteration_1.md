# Iteration 1

**Start Date:** [Week 3 — add exact date]  
**End Date:** [Week 6 — add exact date]  
**Duration:** 3 weeks  
**Number of Developers:** 3  
**Assumed Velocity:** 4 developer-days per week (12 days total)

---

## Goal

Deliver the core customer-facing ordering flow — from account creation through to placing an order. By the end of Iteration 1, a customer must be able to register, log in, browse restaurants, view a menu, add items to a cart, and successfully place an order.

---

## User Stories Planned for Iteration 1

| # | User Story | Priority | Estimate | Assigned To |
|---|-----------|----------|----------|-------------|
| 1 | As a customer, I want to create an account so that I can place food orders and manage my profile. | High | 3 days | Sushmoy |
| 2 | As a customer, I want to log in securely so that I can access my saved details and past orders. | High | 2 days | Sushmoy |
| 3 | As a customer, I want to browse restaurants so that I can see available food options. | High | 2 days | Ornysha |
| 4 | As a customer, I want to view restaurant details, ratings, delivery time, and menu items so that I can make an informed decision. | High | 2 days | Ornysha |
| 5 | As a customer, I want to add food items to my cart so that I can order multiple items together. | High | 1 day | Ornysha |
| 6 | As a customer, I want to update item quantities in my cart so that I can control my order before checkout. | High | 1 day | Ornysha |
| 7 | As a customer, I want to place an order online so that I can receive food without visiting the restaurant. | High | 3 days | Sushmoy |

**Total Estimated: 14 days**

---

## Tasks In Progress (during iteration)

- Customer registration form with validation (Sushmoy) — started [add date]
- Restaurant listing page with dummy data (Ornysha) — started [add date]
- MySQL database schema for users and restaurants (Sushmoy) — started [add date]
- Cart session handling logic (Ornysha) — started [add date]

---

## Completed Tasks

- Project repository set up with folder structure (Sushmoy) — [add date]
- Tech stack finalised: PHP, MySQL, HTML, CSS, JS, Docker (all team) — [add date]
- Database schema for users, restaurants, menus, orders designed (Sushmoy) — [add date]
- Customer registration and login pages built and connected to MySQL (Sushmoy) — [add date]
- Restaurant browsing page displaying list of restaurants from database (Ornysha) — [add date]
- Restaurant detail page showing menu items with prices and images (Ornysha) — [add date]
- Add to cart and cart management with quantity controls (Ornysha) — [add date]
- Order placement with order saved to database (Sushmoy) — [add date]
- Basic session-based authentication and logout (Sushmoy) — [add date]
- Documentation: user stories, architecture, database design, UI wireframes (Ramiz) — [add date]

---

## Burn Down — Iteration 1

Estimated work remaining updated weekly:

| Time Remaining | Days of Work Left | Notes |
|----------------|------------------|-------|
| 3 weeks left | 14 days | Iteration started, tasks assigned |
| 2 weeks left | 9 days | Registration and login completed |
| 1 week left | 4 days | Browse and menu pages completed |
| 0 weeks left | 0 days | All planned stories delivered |

**Actual Velocity:** 14 days completed in 3 weeks across 3 developers ✅

---

## What Was Delivered

By the end of Iteration 1, the following features were fully functional and deployed:

- Customer registration with form validation and password hashing
- Secure login and logout with PHP session management
- Restaurant listing page pulling live data from MySQL database
- Restaurant detail page with menu items, prices, and ratings
- Add to cart, update quantities, and remove items
- Order placement with order record saved to the database
- Basic responsive layout across desktop and mobile

**Deployed app after Iteration 1:** [add AWS Lightsail URL]

---

## Client / Team Feedback After Iteration 1

> *The core ordering flow works well end to end. Login and registration are smooth. The restaurant listing page loads quickly. Suggested improvements for Iteration 2: add order status tracking so customers can see what's happening after they place an order, and build the restaurant owner dashboard so owners can see and manage incoming orders.*

— Team review session, [add date]

---

## Lessons Learned / Retrospective

**What went well:**
- Database schema designed early meant development was straightforward
- Dividing frontend (Ornysha) and backend (Sushmoy) tasks reduced conflicts
- Docker setup ensured consistent environment across all team members

**What to improve in Iteration 2:**
- Need to add more inline comments to PHP backend code
- Cart session handling could be more robust — edge cases found during testing
- Should write test cases in parallel with development, not after

---

## Not Completed in Iteration 1 (moved to Iteration 2 or backlog)

| User Story | Reason |
|-----------|--------|
| Real-time order tracking | Requires more complex backend logic — planned for Iteration 2 |
| Payment gateway integration | Out of scope for MVP — moved to backlog |
| Scheduled ordering | Lower priority — moved to backlog |

---

*← [Back to Main Page](https://github.com/Sushmoy277/CP3407-Project)*
