[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-wpEoZmj)
# 🎓 Ashford College Management System - Backend

A robust backend API for the Ashford College Management System, designed to streamline academic administration, student management, attendance tracking, marks management, password reset workflows, and enquiry handling.

## 🚀 Features

### 👨‍🎓 Student Management

* Student registration and profile management
* Student information retrieval and updates
* Role-based access control

### 👨‍🏫 Faculty Management

* Faculty account management
* Faculty-specific access and operations

### 🔐 Authentication & Authorization

* Secure user login
* Session-based authentication support
* Password reset request workflow

### 📊 Marks Management

* Add and update student marks
* Retrieve student-wise marks
* Delete marks records
* Academic performance tracking

### 📅 Attendance Management

* Record attendance
* Update attendance records
* Retrieve attendance by student
* Attendance analytics support

### 📨 Password Reset Requests

* Submit password reset requests
* Approve or reject requests
* Request status management

### 📞 Contact & Enquiry Management

* Contact form submissions
* Student and visitor enquiries
* Administrative management of submissions

---

# 🛠️ Technology Stack

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | Runtime Environment             |
| Express.js | Backend Framework               |
| MongoDB    | Database                        |
| Mongoose   | ODM for MongoDB                 |
| dotenv     | Environment Variable Management |
| CORS       | Cross-Origin Resource Sharing   |

---

# 📂 Project Structure

```text
backend/
│
├── Controllers/
│   ├── attendanceController.js
│   ├── contactController.js
│   ├── enquiryController.js
│   ├── marksController.js
│   ├── resetRequestController.js
│   └── userController.js
│
├── Models/
│   ├── Attendance.js
│   ├── Contact.js
│   ├── Enquiry.js
│   ├── Marks.js
│   ├── ResetRequest.js
│   └── User.js
│
├── Routers/
│   ├── attendanceRouter.js
│   ├── contactRouter.js
│   ├── enquiryRouter.js
│   ├── marksRouter.js
│   ├── resetRequestRouter.js
│   └── userRouter.js
│
├── .env
├── package.json
├── package-lock.json
└── server.js
```

---

# ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/ArthiVCSE/Ashford-College-Management-Backend.git
cd Ashford-College-Management-Backend
```

### Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

# ▶️ Running the Server

### Development Mode

```bash
npm start
```

or

```bash
nodemon server.js
```

Server will run on:

```text
http://localhost:5000
```

---

# 🌐 API Base URL

```text
http://localhost:5000/api
```

---

# 📌 Available API Modules

## Users

* Login
* Create User
* Update User
* Delete User
* Get User Details
* Reset Password

## Attendance

* Create Attendance
* Update Attendance
* Delete Attendance
* Get Attendance Records

## Marks

* Add Marks
* Update Marks
* Delete Marks
* Get Student Marks

## Reset Requests

* Create Request
* Approve Request
* Reject Request
* View Requests

## Enquiries

* Submit Enquiry
* Retrieve Enquiries
* Delete Enquiries

## Contacts

* Submit Contact Form
* Retrieve Contact Requests
* Delete Contact Requests

---

# 🔒 Security Notes

* Environment variables are excluded from version control.
* Sensitive credentials should never be committed to GitHub.
* Use `.gitignore` to exclude:

  * `.env`
  * `node_modules`

Example:

```gitignore
node_modules/
.env
```

---

# 📈 Future Enhancements

* JWT Authentication
* Email Notifications
* Role-Based Authorization Middleware
* Dashboard Analytics
* File Upload Support
* Cloud Deployment Integration

---

# 👩‍💻 Author

**Arthi V**

B.E. Computer Science and Engineering

Full Stack Developer | MERN Stack Enthusiast

---

# 📄 License

This project is developed for educational and academic purposes.
