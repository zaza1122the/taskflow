TaskFlow – Task Management Application

TaskFlow is a full-stack task management web application that allows users to create, manage, and track their tasks efficiently. The application includes user authentication and a secure backend API for managing tasks.

This project was built as a full-stack development project using a Java Spring Boot backend and a modern frontend interface.

Features

User registration and login

JWT-based authentication

Create, edit, and delete tasks

Mark tasks as completed

Secure API endpoints

Token storage using browser localStorage

RESTful backend architecture



Technologies Used
Backend

Java

Spring Boot

Spring Security

JWT Authentication

REST API

Maven

Frontend

HTML

CSS

JavaScript

Fetch API

Browser localStorage


Authentication

The application uses JWT (JSON Web Tokens) for authentication.

After logging in:

The backend generates a JWT token.

The token is stored in localStorage.

All protected API requests include the token in the request headers.

Example:

Authorization: Bearer <token>


