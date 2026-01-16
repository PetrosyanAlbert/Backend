# Static Registration & Login (Express)

## Installation
npm install

## Run
node server.js

## Endpoints
POST /api/register  
POST /api/login  
GET /api/users  

## Features
- Registration with image upload
- Login
- Server-side validation
- JSON file storage

## Example Requests

### 1. Register User

**Endpoint:**
POST /register

Request:

curl -X POST http://localhost:3000/register \
  -F "fullName=Albert Petrosyan" \
  -F "email=albert@test.com" \
  -F "password=123456" \
  -F "image=@avatar.png"

Success Response:

{
  "ok": true,
  "message": "User registered successfully",
  "user": {
    "fullName": "Albert Petrosyan",
    "email": "albert@test.com",
    "imageUrl": "/uploads/1700000000-avatar.png"
  }
}

Validation Error Response:

{
  "ok": false,
  "errors": [
    "Email is invalid",
    "Password must be at least 6 characters"
  ]
}

2. Login User

Endpoint:
POST /login

Request:

curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=albert@test.com&password=123456"

Success Response:

{
  "ok": true,
  "message": "Login successful",
  "user": {
    "fullName": "Albert Petrosyan",
    "email": "albert@test.com",
    "imageUrl": "/uploads/1700000000-avatar.png",
    "createdAt": "2026-01-16T10:30:00.000Z"
  }
}

Invalid Credentials Response:

{
  "ok": false,
  "message": "Invalid email or password"
}
