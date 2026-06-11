# 🎓 Ashford University College Management System – Backend

> 🚀 A scalable RESTful backend API built using Node.js, Express.js, and MongoDB to power a modern College Management System with secure authentication, academic management, attendance tracking, marks management, enquiry handling, and administrative operations.

---

## 🌟 Project Overview

The Ashford University College Management System Backend serves as the core engine of the university platform, enabling seamless communication between administrators, faculty members, students, and institutional services.

The system is designed to automate academic workflows, centralize student information, and provide secure access to university resources through role-based operations.

---

## 🚀 Key Features

### 👨‍🎓 Student Management

* Student registration and profile creation
* Student information retrieval and updates
* Academic record management
* Role-based access support

### 👨‍🏫 Faculty Management

* Faculty account creation
* Faculty profile management
* Department assignment support
* Secure login functionality

### 🛡️ Authentication & Security

* User authentication system
* Session-based login support
* Password reset workflow
* Credential validation
* Secure environment configuration

### 📊 Marks Management

* Add student marks
* Update examination records
* Retrieve academic performance
* Delete marks entries
* Semester-wise result tracking

### 📅 Attendance Management

* Record daily attendance
* Update attendance records
* Retrieve attendance reports
* Student-specific attendance tracking

### 📞 Contact & Enquiry Management

* Admission enquiry handling
* Contact form submissions
* Administrative review process
* Query management dashboard support

### 🔑 Password Reset Requests

* Request password reset
* Approval & rejection workflow
* Request status monitoring
* Administrative verification process

---

## 🏗️ System Architecture

```text
Client Application (React Frontend)
                │
                ▼
        Express REST API
                │
 ┌──────────────┼──────────────┐
 │              │              │
 ▼              ▼              ▼
Users      Attendance      Marks
 │              │              │
 └──────────────┼──────────────┘
                ▼
         MongoDB Database
```

---

## ⚙️ Technology Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### Security & Middleware

* dotenv
* cors
* express.json()

### Development Tools

* VS Code
* Postman
* Git
* GitHub
* Nodemon

---

## 📂 Project Structure

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
├── server.js
├── package.json
└── package-lock.json
```

---

## 🔧 Installation

### Clone Repository

```bash
git clone https://github.com/ArthiVCSE/Ashford-College-Management-Backend.git
cd Ashford-College-Management-Backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## ▶️ Running the Application

### Development Mode

```bash
npm start
```

or

```bash
nodemon server.js
```

Backend Server:

```text
http://localhost:5000
```

API Base URL:

```text
http://localhost:5000/api
```

---

## 📌 API Modules

### User APIs

* User Registration
* Login Authentication
* User Profile Management
* Password Reset

### Attendance APIs

* Create Attendance
* Update Attendance
* Delete Attendance
* Retrieve Attendance Records

### Marks APIs

* Add Marks
* Update Marks
* Delete Marks
* Get Student Marks

### Enquiry APIs

* Submit Enquiry
* Retrieve Enquiries
* Delete Enquiries

### Contact APIs

* Contact Form Submission
* Retrieve Contact Requests
* Delete Contact Requests

### Reset Request APIs

* Create Request
* Approve Request
* Reject Request
* View Request Status

---

## 🔒 Security Features

* Environment Variable Protection
* Session-Based Authentication
* Secure API Architecture
* Input Validation
* Separation of Sensitive Configuration
* Protected Administrative Operations

### Recommended .gitignore

```gitignore
node_modules/
.env
```

---

## 📈 Future Enhancements

* JWT Authentication
* Role-Based Authorization Middleware
* Email Notifications
* OTP Verification
* Cloudinary Image Uploads
* File Management System
* Dashboard Analytics
* Audit Logs
* Docker Deployment
* AWS / Render Cloud Hosting

---

## 💼 Real-World Impact

This backend system demonstrates how modern web technologies can automate and manage essential university operations such as:

* Student Administration
* Faculty Management
* Attendance Monitoring
* Academic Performance Tracking
* Admission Enquiry Handling
* Secure Authentication Workflows

---

## 👩‍💻 Developer

### Arthi V

🎓 B.E Computer Science and Engineering
🏫 Sri Eshwar College of Engineering, Coimbatore

🎓 Diploma in Computer Engineering
🏫 Government Polytechnic College for Women, Coimbatore

💻 Full Stack Developer | MERN Stack Enthusiast

---

## 📄 License

This project is developed for educational, academic, and portfolio purposes.
