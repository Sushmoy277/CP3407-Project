# Building and Development Tools

This page documents the software development tools, cloud services, and external libraries utilized to build, deploy, and manage the FeedMe platform.

---

## 1. Cloud Infrastructure & Hosting
[cite_start]To meet the high-standard project requirements, we utilized **Amazon Web Services (AWS)** for our production environment[cite: 27, 50].

* [cite_start]**AWS EC2 (Lightsail):** Used as our primary web server to host the PHP backend and WordPress frontend[cite: 108].
* [cite_start]**Amazon S3:** Employed for scalable storage of restaurant images and user-uploaded media to ensure high performance[cite: 109].
* [cite_start]**AWS Cognito:** (Optional/Planned) Used for secure, industry-standard user authentication and role management[cite: 111].

---

## 2. Development Stack & Building Tools
[cite_start]We selected a modern tech stack that prioritizes speed and scalability[cite: 22, 23].

* [cite_start]**Version Control (GitHub/Git):** Used for collaborative development, branching, and maintaining a clean commit history[cite: 120]. [cite_start]This repository serves as our primary project output[cite: 11].
* [cite_start]**Backend:** PHP was used for server-side logic and database connectivity, allowing for rapid customization of the FeedMe system[cite: 19, 119].
* [cite_start]**Database:** A relational **MySQL** database was implemented to manage complex data for users, menus, and orders[cite: 22, 110].
* [cite_start]**Frontend:** Built using HTML5, CSS3, and JavaScript to provide a modern, responsive Graphical User Interface (GUI)[cite: 23, 117].

---

## 3. Design & Prototyping Tools
[cite_start]As per the rubric requirements, we utilized specific online UML and prototyping tools[cite: 6, 7, 8].

* [cite_start]**Gliffy:** Used for creating Architectural UML diagrams[cite: 6].
* [cite_start]**GenMyModel:** Used for designing the relational database schema (ER Diagrams)[cite: 7].
* [cite_start]**NinjaMock:** Utilized for high-fidelity interface design and user flow wireframing[cite: 8].

---

## 4. AI-Assisted Development (ChatGPT)
[cite_start]Following the instructor's encouragement, we utilized **ChatGPT** to kickstart various project phases[cite: 21, 29]. [cite_start]We have included our prompts below as required:

* **Prompt 1:** "Generate a MySQL schema for a food delivery app including tables for users (roles: customer, owner, rider), restaurants, menu items, and orders."
* **Prompt 2:** "Create a responsive CSS grid layout for a restaurant dashboard that displays pending orders and sales analytics."
* **Prompt 3:** "Explain how to connect a PHP application to an AWS S3 bucket for file uploads."

---

## 5. Collaboration & Project Management
[cite_start]To maintain an Agile workflow, we used the following tools[cite: 124, 127]:

* **Trello/Kanban:** Used to track user stories, sprint progress, and task assignments.
* [cite_start]**Slack/Teams:** Used for daily team synchronization and technical troubleshooting[cite: 130].

---
[← Back to Main Page](index.md)
