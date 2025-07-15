# 🛠 Complaint Tracker System

A full-stack web application to register, assign, and resolve user complaints with role-based access for **Users**, **Staff**, and **Admins**.

---

## 🔥 Features

- 👤 **User**
  - Register and Login
  - Raise complaints with title, location, and description
  - View personal complaint status in real-time

- 👨‍🔧 **Staff**
  - View assigned complaints
  - Update status (e.g., resolved, in progress)

- 🧑‍💼 **Admin**
  - View all complaints
  - Assign complaints to staff
  - View staff and user lists
  - See analytics and dashboards

---

## 💻 Tech Stack

| Frontend      | Backend        | Database |
|---------------|----------------|----------|
| React + Tailwind CSS | Spring Boot + Spring Security | MySQL     |
| React Router  | JWT Auth       |          |

---

## 🧭 Project Structure

```
Complaint-Tracker/
├── complaint-frontend/     # React Frontend
├── complaintsystem/        # Spring Boot Backend
├── screenshots.pdf         # Project output screenshots
├── paln.md                 # Planning/Notes
```

---

## 📸 Sample Screenshot

![Dashboard Preview](screenshots.png)

> Refer to [screenshots.pdf](screenshots.pdf) for a full walkthrough of the app.

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/CodeFear5/Complaint-Tracker.git
cd Complaint-Tracker
```

### 2. Frontend Setup

```bash
cd complaint-frontend
npm install
npm start
```

### 3. Backend Setup

- Open `complaintsystem` in your IDE (e.g., IntelliJ).
- Configure `application.properties` to connect with your MySQL database.
- Run the Spring Boot application.

### 4. Database

```sql
-- Create DB
CREATE DATABASE complaint_db;

-- Import SQL schema and insert test data
```

> Use your own SQL dump or ask for one.

---

## 🧑‍🔧 Admin Login (Demo)

- **Email:** `admin@gmail.com`
- **Password:** `Admin@123`

> Add these users manually via SQL or registration page if needed.

---

## 📬 Contact

Made with ❤️ by **Nagesh B C**

- GitHub: [@CodeFear5](https://github.com/CodeFear5)
