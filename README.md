<a id="readme-top"></a>

<br />

<div align="center">
  <img width="45" height="45" alt="image" src="https://github.com/user-attachments/assets/8509459f-860d-46fa-9875-8575274907b1" />

  <h3 align="center">School Management App</h3>

  <p align="center">
    An administrative platform engineered to manage complex relational data structures for educational institutions.
    It features a responsive React interface and a TypeScript + Express backend, utilizing a PostgreSQL database to
    maintain data integrity across Students, Teachers, Classes, and Guardians with full CRUD functionality.
  </p>
</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Students](#students)
- [Guardians](#guardians)
- [Teachers](#teachers)
- [Classes](#classes)
- [Future Improvements](#future-improvements)

---

## About The Project

This project was built to gain hands-on experience working with **relational databases** and complex entity relationships using **PostgreSQL**.

The application is built with **Next.js** on the frontend and leverages **TanStack Query** for efficient server-state management.  
The backend is developed using **TypeScript and Express**, following RESTful API principles to support full CRUD operations.

Key goals of the project:
- Practice relational database design
- Implement clean RESTful APIs
- Manage real-world entity relationships
- Build a scalable full-stack application

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Students

![Students Page](./screenshots/students.png)

The Students module allows administrators to:
- Create, view, update, and delete student records
- Associate students with guardians and classes
- Maintain consistent relational integrity across the system

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Guardians

![Guardians Page](./screenshots/guardians.png)

The Guardians section manages parent/guardian information, including:
- Contact details
- Relationships to one or more students
- Secure updates without breaking data relationships

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Teachers

![Teachers Page](./screenshots/teachers.png)

Teachers can be managed through this module with features such as:
- Teacher profile creation and updates
- Assignment to one or multiple classes
- Relational enforcement with class records

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Classes

![Classes Page](./screenshots/classes.png)

The Classes module handles:
- Class creation and scheduling
- Student and teacher associations
- Capacity and grade-level constraints enforced at the database level

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Future Improvements

Planned enhancements include:
- Integrating attendance tracking for students within classes
- Implementing full CRUD functionality for class schedules
- Developing a dynamic and interactive UI for schedule management
- Enforcing scheduling constraints to prevent teacher and student time conflicts

<p align="right">(<a href="#readme-top">back to top</a>)</p>
