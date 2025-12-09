# DevTinder-Project

# 🧑‍💻 DevTinder – Developer Matching Platform

DevTinder is a backend project built using **Node.js, Express, and MongoDB**, where developers can discover each other, like/dislike profiles, and get matched when both sides like each other.

This README explains the project **step by step exactly as I built it** – architecture, APIs, logic, and how a frontend can talk to it.

---

## 📦 Repository

GitHub Repo:  
[`https://github.com/Ruthvik2000/DevTinder-Project`](https://github.com/Ruthvik2000/DevTinder-Project)

---

## 📌 1. Project Overview

DevTinder is inspired by Tinder but customized for **developers**:

- Developers create profiles with **skills, role, experience, location, bio**
- They can view a **feed** of other developers
- They can **like** or **dislike** people
- If **both** users like each other → it becomes a **match**

While building this project, the focus was on:

- Clean and modular **Node.js + Express** architecture  
- Proper **MongoDB schema design**  
- Production-style **authentication using JWT**  
- Secure **password hashing using bcrypt**  
- Implementing **feed, like/dislike and match logic**  
- Using **middlewares, controllers, and routes** correctly  

---

## 📌 2. Tech Stack

| Technology      | Purpose                                  |
|----------------|------------------------------------------|
| **Node.js**    | JavaScript runtime for backend           |
| **Express.js** | Web framework for routing & middleware   |
| **MongoDB**    | NoSQL database                           |
| **Mongoose**   | ODM to model MongoDB data                |
| **JWT**        | Authentication tokens                    |
| **bcryptjs**   | Password hashing                         |
| **dotenv**     | Environment variable management          |

---

## 📌 3. Folder Structure

```bash
DevTinder-Project/
│── server.js
│── package.json
│── .env            # Not committed, used locally
│
├── config/
│   └── db.js       # MongoDB connection
│
├── models/
│   └── User.js     # User schema (dev profile + swipe data)
│   └── Match.js    # (Optional) Match schema
│
├── middleware/
│   └── authMiddleware.js  # JWT verification
│
├── controllers/
│   └── authController.js   # register, login
│   └── userController.js   # feed, like, dislike
│   └── matchController.js  # match-related logic (if added)
│
└── routes/
    └── authRoutes.js
    └── userRoutes.js
    └── matchRoutes.js

I separated routes, controllers, models, and middleware to keep the project scalable and easy to maintain.

