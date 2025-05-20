
# ⚖️ Legal Case Management System

Welcome to the **Legal Case Management System** — a powerful platform built to modernize how legal cases are managed, tracked, and resolved. Designed for Judges, Clerks, Lawyers, Prosecutors, and Clients, this system offers an end-to-end digital workflow for judicial case handling.

> 🔍 **Objective:** Enhance transparency, accountability, and efficiency in legal proceedings through a secure and role-based case management platform.

---

## 🚀 Features at a Glance

✅ **Role-Based Access Control (RBAC)**  
✅ **Case Lifecycle Management**  
✅ **Hearing Scheduling & Judgement Entry**  
✅ **Lawyer Performance Metrics**  
✅ **Client Read-Only Case Status View**  
✅ **PostgreSQL-Backed Relational Data Model**  
✅ **Scalable Backend with Clean Architecture**

---

## 🧑‍⚖️ Supported Roles & Functionalities

| Role         | Permissions                                                                 |
|--------------|-------------------------------------------------------------------------------|
| **Judge**     | View cases, assign hearings, review arguments, upload judgements            |
| **Lawyer**    | Access assigned cases, check history, track win/loss reports                |
| **Clerk**     | Create/edit users, upload proceedings, assign judges, update hearings       |
| **Prosecutor**| Submit evidence, follow up on hearings, interact with criminal cases        |
| **Client**    | Read-only view of personal case status, hearings, and final judgement       |

---

## 🧱 Database Architecture

Designed with relational integrity and performance in mind using **PostgreSQL**.

### 🗂️ Core Tables

- **`users`** – All registered participants (with roles)
- **`cases`** – Metadata of each legal case
- **`advocates`** – Maps lawyers/prosecutors to cases with result tracking
- **`hearings`** – Hearing summaries, dates, and judge assignments
- **`judgements`** – (Optional) Final judgement documentation per case

### 🔄 Relationships

- One `case` is assigned to one `judge`
- One `case` may involve multiple `advocates`
- One `case` can have multiple `hearings`
- Every `user` has a single role

---

## 📊 Reporting Capabilities

📌 **Case Summary Reports**  
📌 **Lawyer Win/Loss Ratios**  
📌 **Average Case Duration**  
📌 **Upcoming Hearings Timeline**  
📌 **Judge-specific Caseload Reports**

---

## 🧪 Tech Stack

| Layer         | Tech Used                     |
|---------------|-------------------------------|
| **Backend**   |  Spring Boot                   |
| **Database**  |  PostgreSQL 14+                |
| **Frontend**  |  React *(optional)*            |
| **Auth**      |  JWT                          |
| **ORM**       |  Hibernate (JPA)              |

---

DB Architecture:


![image](https://github.com/user-attachments/assets/cbab6e5e-74e8-42c2-a3f8-741dd1fd64ec)

⚙️ Getting Started for Frontend:
1. Clone the Repo
-->git clone (https://github.com/PrasannakumarV-93058/JudiciaryManagementSite.git)

-->cd judiciary-fe-v1

2.Install Dependencies
-->npm install

3.Run the Application
-->npm run start

⚙️ Getting Started for Backend:(USE JAVA 17)
1. Clone the Repo
-->git clone (https://github.com/PrasannakumarV-93058/JudiciaryManagementSite.git)

-->cd JudiciaryManagementSiteBackend


2. Install Dependencies
-->./mvnw install     # For Spring Boot

4. Run the Application
-->./mvnw spring-boot:run

5. Initialize the Database
-->psql -U postgres -f db


👥 Contributors
Built by a passionate team of developers and legal domain experts.




