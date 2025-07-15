# 🧾 Detailed Project Plan: Complaint Tracker System

## 🧩 Project Overview

The **Complaint Tracker System** is a comprehensive full-stack web application that facilitates seamless complaint registration, assignment, and resolution within an organization or campus. It ensures clear role-based access for Users, Staff, and Admins, making the system efficient and easy to manage.

---

## 🎯 Objectives

* Simplify the complaint raising process for users  
* Enable staff to manage and resolve complaints efficiently  
* Empower admins to oversee all activities and monitor progress using analytics

---

## 🧑‍💻 Roles and Functionalities

### 👤 User

* Register/Login securely  
* Raise new complaints with title, location, and description  
* Track status updates in real-time  

### 👨‍🔧 Staff

* Login and view assigned complaints  
* Update complaint status: Pending → In Progress → Resolved  
* Provide resolution remarks if needed  

### 🧑‍💼 Admin

* View all complaints raised across the system  
* Assign complaints to appropriate staff based on specialization  
* View/manage user and staff lists  
* Analyze complaint trends using charts and dashboards

---

## 🧱 Modules Breakdown

### 1. Authentication Module

* Secure login/register with JWT-based authentication  
* Role-based access control (User, Staff, Admin)

### 2. Complaint Management

* User complaint submission form with validations  
* Display of complaint cards with live status  
* Filter by date, location, or status  

### 3. Admin Dashboard

* Central complaint list with filters  
* Assign modal to allocate to staff  
* Users/Staff management section  
* Complaint stats and analytics  

### 4. Staff Dashboard

* Assigned complaints list  
* Status update option with notes  

### 5. Analytics & Reporting

* Charts (Pie/Bar) showing complaint breakdown by category, status, etc.  
* Overall counts and performance metrics  

---

## 💻 Tech Stack

| Layer          | Technologies Used            |
| -------------- | ---------------------------- |
| Frontend       | React.js, Tailwind CSS       |
| Routing        | React Router                 |
| Backend        | Spring Boot, Spring Security |
| Authentication | JWT                          |
| Database       | MySQL                        |

---

## 📁 Project Structure

Complaint-Tracker/
├── complaint-frontend/ # React frontend
│ ├── components/ # Reusable UI components
│ ├── pages/ # Role-based dashboard screens
│ ├── auth/ # Auth helpers and JWT handlers
│ └── App.js # Routing logic
│
├── complaintsystem/ # Spring Boot backend
│ ├── controllers/ # REST API endpoints
│ ├── services/ # Business logic
│ ├── models/ # Entities and DTOs
│ ├── repositories/ # JPA interfaces
│ └── security/ # JWT filters and config
│
├── screenshots.pdf # Complete UI screenshots
├── README.md # Project overview and usage
└── paln.md # Project development plan


---

## 🚀 Development Timeline

### Phase 1: Setup & Authentication (Week 1)

* ✅ MySQL database creation  
* ✅ Spring Boot + JWT setup  
* ✅ React project with Tailwind CSS  

### Phase 2: User Flow (Week 2)

* ✅ User Register/Login  
* ✅ Complaint submission form  
* ✅ User dashboard to view complaints  

### Phase 3: Admin Flow (Week 3)

* ✅ Admin dashboard with tabbed layout  
* ✅ Assign modal for staff selection  
* ✅ Complaint stats and analytics page  

### Phase 4: Staff Flow (Week 4)

* ✅ Staff dashboard to view assignments  
* ✅ Update complaint status with comments  

---

## 🧪 Sample Users

| Role  | Email                                       | Password    |
| ----- | ------------------------------------------- | ----------- |
| Admin | [admin@gmail.com](mailto:admin@gmail.com)   | Admin\@123  |
| Staff | [dinesh@gmail.com](mailto:dinesh@gmail.com) | Dinesh\@123 |
| User  | [user@gmail.com](mailto:user@gmail.com)     | User\@123   |

---

---

## 📦 Future Improvements

* Email/SMS notifications on status update  
* File/image uploads for complaints  
* More filtering options (by priority, date)  
* Dark/light theme toggle  
* Mobile app or PWA version  

---

## 📬 Contact

Made with ❤️ by **Nagesh B C**  
GitHub: [@CodeFear5](https://github.com/CodeFear5)  
LinkedIn: [Nagesh B C](https://www.linkedin.com/in/nagesh-b-c-b5614b254/)

## 📸 Screenshots

* The file `screenshots.pdf` in the repo contains all UI screenshots for the app.
* Preview snippet for README:


