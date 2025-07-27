# 📘 Project Name: **PostAway - A Social Media Backend API**

## 📄 Description

**PostAway** is a robust RESTful backend API built using the **MERN** stack (excluding frontend), tailored for a scalable social media platform. It supports secure user authentication, post creation with media uploads, likes, comments, friend request management, and OTP-based password reset — all exposed through well-defined RESTful endpoints.

---

## 🚀 Features

* ✅ User Registration and Login (JWT-based authentication)
* 🔒 Password encryption with **bcrypt**
* 🔁 OTP verification for password reset via **email**
* 📸 Upload posts with images using **Multer**
* 💬 Add, update, and delete comments on posts
* ❤️ Like and Unlike posts
* 👯 Friend request system: send, cancel, accept, reject
* 🔐 Protected routes with **JWT middleware**
* 🧠 Modular clean architecture using Repository & Controller patterns
* 🛡️ Robust input validation and error handling
* 📜 Logging system using **Winston**
* 🧪 Scalable and easily testable

---

## 🛠️ Tech Stack

| Technology    | Description                              |
| ------------- | ---------------------------------------- |
| Node.js       | JavaScript runtime for backend           |
| Express.js    | Fast and minimalist web framework        |
| MongoDB       | NoSQL database                           |
| Mongoose      | ODM for MongoDB                          |
| Multer        | File upload middleware                   |
| JWT           | JSON Web Tokens for authentication       |
| bcrypt        | Password hashing                         |
| Nodemailer    | Email service for sending OTPs           |
| Crypto        | OTP generation using secure random bytes |
| Winston       | Logging for info and errors              |
| dotenv        | Environment variable management          |
| cookie-parser | Parses HTTP cookies                      |

---

## 📁 Project Structure

```
├── index.js
├── server.js
├── .env
├── logs/
│   ├── logs.txt
│   └── error.logs.txt
├── src/
│   ├── config/               # DB connection
│   ├── middlewares/          # JWT, OTP middleware
│   ├── errorHandling/        # Custom error handling
│   ├── public/postUploads/   # Uploaded media
│   ├── modules/
│   │   ├── user/
│   │   ├── post/
│   │   ├── Like/
│   │   ├── comments/
│   │   ├── friendRequest/
│   │   └── otpResetPassword/
```

---

## 🔑 Environment Variables

Create a `.env` file in the root and add the following:

```
PORT=5000
DATABASE_URL=your_mongodb_connection
JWT_SECRET_KEY=your_jwt_key
JWT_SECRET_RESET_KEY=your_reset_key
NODE_EMAIL=your_email@gmail.com
NODE_EMAIL_PASS=your_app_password
```

---

## 📦 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/AmanVerma003/postaway-rest-api.git
cd postaway-rest-api

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# (Fill your values inside .env)

# 4. Start the development server
node server.js
 
---

## 📬 API Endpoints

| Method | Endpoint                    | Functionality                       |
| ------ | --------------------------- | ----------------------------------- |
| POST   | /api/user/signup            | Register a new user                 |
| POST   | /api/user/signin            | Login user                          |
| POST   | /api/user/logOut            | Logout from current device          |
| POST   | /api/user/logOutAll         | Logout from all devices             |
| GET    | /api/user/getAllDetails     | Get all users                       |
| GET    | /api/user/getUserDetails/:userId| Get user by ID                  |
| PUT    | /api/user/updateData/:userId| Update user info                    |
| GET    | /api/otp/sendOtp            | Send OTP to email                   |
| POST   | /api/otp/verifyOtp          | Verify OTP and generate reset token |
| PUT    | /api/otp/resetPassword      | Reset password using reset token    |
| POST   | /api/posts/uploadPost       | Upload a new post                   |
| GET    | /api/posts/getAllPost       | Get all posts                       |
| GET    | /api/posts/getOnePost/:id   | Get a single post                   |
| PUT    | /api/posts/updatePosts/:id  | Update post                         |
| DELETE | /api/posts/deletePost/:id   | Delete post                         |
| GET    | /api/posts/getUserPosts/:id | Get posts by a user                 |
| GET    | /api/posts/Likes/:id        | Get like count for post             |
| GET    | /api/posts/comments/:id     | Get comment count for post          |
| POST   | /api/comments/:id           | Add a comment to post               |
| PUT    | /api/update/:id             | Update comment                      |
| DELETE | /api//delete/:id            | Delete comment                      |
| POST   | /api/likes/:id              | Like a post                         |
| DELETE | /api/likes/unLikePost/:id   | Unlike a post                       |
| POST   | /api/friend/request/:toId   | Send a friend request               |
| DELETE | /api/friend/cancel/:id      | Cancel friend request               |
| POST   | /api/friend/accept/:fromId  | Accept friend request               |
| GET    | /api/friend/accept/pendings | Get pending requests                |
| GET    | /api/friend/allFriends      | Get friend list                     |

---

## 🔐 Authentication

Most routes are protected using **JWT middleware**. Include the token in headers:

## 📝 License

This project is licensed under the [MIT License](LICENSE).

