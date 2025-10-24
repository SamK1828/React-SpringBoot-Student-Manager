# 🎓 Student Management System (Full Stack Project)

A **Full Stack Student Management System** built using **React.js**, **Spring Boot**, and **MySQL**.  
This project allows users to perform full CRUD (Create, Read, Update, Delete) operations on student data, along with **advanced features** such as search and marks-based filtering.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React.js**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

### ⚙️ Backend
- **Spring Boot**
- **Spring Data JPA (Hibernate)**
- **RESTful APIs**
- **MySQL Database**

---

## 🧩 Features

### 👨‍🎓 Student Management
- ➕ **Add Student** – Enter name, email, course, and marks.
- 📋 **View Students** – Display all records in a styled data table.
- ✏️ **Edit Student** – Update student information seamlessly.
- ❌ **Delete Student** – Remove student from both UI and database.

### 🔍 Advanced Features
- **Search Student:** Instantly filter students by name or course.
- **Marks Filter:**  
  - Shows count of high achievers (Marks > 80).  
  - Shows count of low performers (Marks < 40).
- **Responsive UI:** Works perfectly on desktop and mobile devices.

---

## 🧠 Architecture Overview

**Frontend:**  
React components for modular structure and smooth routing between pages.

**Backend:**  
Layered architecture:
- `Controller` → Handles REST endpoints (`/api/students`)
- `Service` → Business logic implementation
- `Repository` → Database operations via JPA

**Database:**  
`studentmgmtdb` (MySQL) stores all student records.

---

## 📁 Folder Structure

````

student-management/
│
├── backend/
│   ├── src/main/java/com/example/studentmgmt/
│   │   ├── controller/StudentController.java
│   │   ├── service/StudentService.java
│   │   ├── service/impl/StudentServiceImpl.java
│   │   ├── model/Student.java
│   │   ├── repository/StudentRepository.java
│   │   └── StudentMgmtApplication.java
│   └── src/main/resources/application.properties
│
└── frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Students.jsx
│   │   ├── AddStudent.jsx
│   │   ├── EditStudent.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   └── index.js
└── package.json

````

---

## ⚙️ API Endpoints

| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | `/api/students`           | Get all students         |
| GET    | `/api/students/{id}`      | Get student by ID        |
| POST   | `/api/students`           | Add new student          |
| PUT    | `/api/students/{id}`      | Update existing student  |
| DELETE | `/api/students/{id}`      | Delete student           |

---

## 🧰 Setup Instructions

### 🗄️ Backend (Spring Boot)
1. Clone the repository.
2. Import backend in **IntelliJ / Eclipse / VS Code**.
3. Create MySQL database:
   ````sql
   CREATE DATABASE studentmgmtdb;

4. Update credentials in `application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/studentmgmtdb
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   ```
5. Run the Spring Boot application (`StudentMgmtApplication.java`).

---

### 💻 Frontend (React)

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start development server:

   ```bash
   npm run dev
   ```
4. Open the app in your browser:
   👉 [http://localhost:5173](http://localhost:5173)

---

## 🧑‍💻 Author

**Samarth Deelip Kalegaonkar**
Full Stack Java Developer
📧 Email: [kalegaonkarsamarth@gmail.com](mailto:kalegaonkarsamarth@gmail.com)
🔗 [LinkedIn Profile](https://www.linkedin.com/in/samarth-deelip-kalegaonkar/)
💻 [GitHub Profile](https://github.com/SamK1828)

---

## 🏁 Outcome

✅ Successfully implemented a **Full Stack CRUD Application** demonstrating:

* React + Spring Boot integration
* REST API communication
* Database persistence
* Real-time UI updates
* Filtering and search functionalities

This project serves as a **strong portfolio piece** for full-stack development showcasing practical implementation of modern web technologies.
<!-- ## 📸 Screenshots (Optional)
> *(Add screenshots of dashboard, add/edit form, and table view here for visual impact)*
--- -->