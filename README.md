# 🎓 Student Management Web App

A full-stack **Student Management System** built with **React (Vite)**, **Tailwind CSS**, and **Spring Boot**.  
This project allows you to **add, view, update, and delete students**, manage records efficiently, and features a clean, responsive UI.

---

## 🚀 Tech Stack

### 🔹 Frontend
- **React JS (Vite)**
- **Tailwind CSS**
- **React Router DOM**
- **Axios**

### 🔹 Backend
- **Spring Boot**
- **Spring Web**
- **Spring Data JPA**
- **MySQL Database**

---

## 🧩 Features

- 🧑‍🎓 Add, edit, and delete student records  
- 🔍 Search and filter students  
- 📊 Display count of students (e.g., >80 marks, <40 marks)  
- 🧭 Beautiful responsive UI using TailwindCSS  
- 🔄 RESTful APIs for all operations  
- 🧱 Modular folder structure with DAO, Service, and Controller layers  

---

## 🏗️ Project Structure

### Frontend (`/frontend`)
```
├── StudentManagementApp
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── StudentForm.jsx
    │   │   └── StudentTable.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── pages
    │   │   ├── About.jsx
    │   │   ├── AddStudent.jsx
    │   │   ├── EditStudent.jsx
    │   │   ├── Home.jsx
    │   │   └── Students.jsx
    │   ├── practice
    │   │   └── Navbar.jsx
    │   └── services
    │   │   └── studentService.js
    └── vite.config.js
```
### Backend (`/backend`)
```
└── student-management-backend
    ├── .gitattributes
    ├── .gitignore
    ├── .mvn
        └── wrapper
        │   └── maven-wrapper.properties
    ├── mvnw
    ├── mvnw.cmd
    ├── pom.xml
    └── src
        ├── main
            ├── java
            │   └── com
            │   │   └── studentmanager
            │   │       └── student_management_backend
            │   │           ├── StudentManagementBackendApplication.java
            │   │           ├── controller
            │   │               └── StudentController.java
            │   │           ├── entity
            │   │               └── Student.java
            │   │           ├── repository
            │   │               └── StudentRepository.java
            │   │           └── service
            │   │               ├── StudentService.java
            │   │               └── StudentServiceImpl.java
            └── resources
            │   └── application.properties
````
---

## ⚙️ Setup and Installation

### 🔸 Prerequisites
- Node.js (v18+)
- Java (JDK 17+)
- MySQL Server

---

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
````

Access the app at **[http://localhost:5173/](http://localhost:5173/)**

---

### ⚙️ Backend Setup

1. Open the `backend` folder in your IDE (IntelliJ / Eclipse / VS Code).
2. Update `application.properties` with your MySQL credentials:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```
3. Run the `StudentManagementApplication.java` file.

Backend runs on **[http://localhost:8080](http://localhost:8080)**

---

## 🔗 Connecting Frontend with Backend

In your frontend project, create an `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api/students
```

Then use Axios to connect:

```js
axios.get(import.meta.env.VITE_API_BASE_URL);
```

---

## 🧠 Learning Goals

* Understand **React–Spring Boot** integration
* Learn RESTful API communication
* Build modular & scalable UI with **Tailwind CSS**
* Implement CRUD operations using **Spring Data JPA**

---
<!--
## 📸 Screenshots

### 🏠 Home Page

![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

### 🧑‍🎓 Students Dashboard

![Students Page](https://via.placeholder.com/800x400?text=Students+Dashboard)

---
-->
## 🧑‍💻 Author

**👤 Samarth Kalegaonkar**

* 💼 Java Full Stack Developer
* 🔗 [GitHub](https://github.com/SamK1828)
<!--* 🌐 [Portfolio](#)-->
* 📧 [kalegaonkarsamarth@gmail.com](mailto:kalegaonkarsamarth@gmail.com)

---

## 🪪 License

This project is licensed under the **MIT License** — feel free to use, modify, and share.

---

> 💡 *“Built to learn, designed to scale.”*
