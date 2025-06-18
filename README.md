# 🎓 Estudiantes App

A Node.js REST API for managing student events and academic tasks. This application provides user authentication and event management functionality for students to track their academic activities.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Usage Examples](#-usage-examples)
- [Project Structure](#-project-structure)

## ✨ Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Event Management**: Create and manage academic events (assignments, exams, tasks)
- **Password Security**: Bcrypt password hashing for secure storage
- **Data Validation**: Comprehensive input validation for all endpoints
- **MongoDB Integration**: NoSQL database for flexible data storage
- **RESTful API**: Clean and intuitive API design

## 🛠 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB 6.16.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcrypt 6.0.0
- **CORS**: cors 2.8.5
- **Environment**: dotenv 16.5.0

## 🏗 Architecture

The application follows a layered architecture pattern:

```
src/
├── app.js              # Main application setup
├── routes/             # Route definitions
├── controllers/        # Request/response handling
├── services/          # Business logic
├── models/            # Data models and validation
├── data/              # Database operations
├── middleware/        # Custom middleware
```

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/LicFuraca/estudiantes-app.git
   cd estudiantes-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables))

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000` (or the port specified in your environment variables).

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI={your-db-url}
DB_NAME=estudiantes-app
JWT_SECRET={your-super-secret-jwt-key-here}
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /users/register
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
	"message": "User registered successfully",
	"userId": "{userId}"
}
```

#### Login User

```http
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
	"message": "Successful login",
	"user": {
		"userWithoutPassword": {
			"_id": "{userId}",
			"firstname": "John",
			"lastname": "Doe",
			"email": "john.doe@example.com",
			"creationDate": "2023-09-06T10:30:00.000Z"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
	}
}
```

### Event Endpoints

#### Get User Events

```http
GET /events?id=64f8a1b2c3d4e5f6a7b8c9d0
Authorization: Bearer <jwt-token>
```

**Response:**

```json
[
	{
		"_id": "{eventId}",
		"title": "Final Exam - Mathematics",
		"description": "Comprehensive exam covering all topics",
		"endDate": "2023-12-15T14:00:00.000Z",
		"creationDate": "2023-09-06T10:30:00.000Z",
		"type": "Final",
		"userId": "{userId}"
	}
]
```

## 🗄 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  firstname: String (required),
  lastname: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  creationDate: Date
}
```

### Events Collection

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  endDate: Date (required),
  creationDate: Date,
  type: String (required, enum: ["Trabajo Práctico", "Parcial", "Final", "Tarea"]),
  userId: ObjectId (required, reference to users)
}
```

## 💡 Usage Examples

### Using cURL

**Register a new user:**

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Jane",
    "lastname": "Smith",
    "email": "jane.smith@example.com",
    "password": "securepassword123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "securepassword123"
  }'
```

**Get user events (with authentication):**

```bash
curl -X GET "http://localhost:3000/events?id={userId}" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Using JavaScript/Fetch

```javascript
// Register user
const registerResponse = await fetch("http://localhost:3000/users/register", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		firstname: "John",
		lastname: "Doe",
		email: "john.doe@example.com",
		password: "password123",
	}),
});

// Login
const loginResponse = await fetch("http://localhost:3000/users/login", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		email: "john.doe@example.com",
		password: "password123",
	}),
});

const {
	user: { token },
} = await loginResponse.json();

// Get events
const eventsResponse = await fetch("http://localhost:3000/events?id=USER_ID", {
	headers: {
		Authorization: `Bearer ${token}`,
	},
});
```

## 📁 Project Structure

```
estudiantes-app/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── routes/
│   │   ├── userRouter.js      # User authentication routes
│   │   └── eventRouter.js     # Event management routes
│   ├── controllers/
│   │   ├── userController.js  # User request handling
│   │   └── eventController.js # Event request handling
│   ├── services/
│   │   ├── userService.js     # User business logic
│   │   └── eventService.js    # Event business logic
│   ├── models/
│   │   ├── userSchema.js      # User data model and validation
│   │   ├── eventSchema.js     # Event data model and validation
│   │   └── index.js           # Model exports
│   ├── data/
│   │   ├── connection.js      # Database connection
│   │   ├── userData.js        # User database operations
│   │   └── eventData.js       # Event database operations
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication middleware
│   ├── utils/                 # Utility functions
│   └── errors/                # Error handling
├── server.js                  # Server entry point
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables (create this)
└── README.md                  # This file
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **JWT Authentication**: Secure token-based authentication with 2-hour expiration
- **Input Validation**: Comprehensive validation for all user inputs
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Variables**: Sensitive data stored in environment variables
