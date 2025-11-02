# Medicare App - Backend API Specifications

## Overview

ეს დოკუმენტი შეიცავს სრულ სპეციფიკაციას Medicare აპლიკაციისთვის საჭირო backend API-ებისთვის. აპლიკაცია მუშაობს ორი ტიპის მომხმარებლით: პაციენტები და ექიმები.

## Base URL

```
https://api.medicare-app.com/v1
```

## Authentication

- JWT Token-based authentication
- Role-based access control (Patient/Doctor)
- Token expiration: 24 hours
- Refresh token: 7 days

---

## 1. Authentication & User Management

### 1.1 User Registration

**POST** `/auth/register`

**Request Body:**

```json
{
  "role": "patient" | "doctor",
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "dateOfBirth": "YYYY-MM-DD",
  "gender": "male" | "female" | "other",

  // Doctor specific fields
  "specialization": "string", // required for doctors
  "licenseNumber": "string",  // required for doctors
  "degrees": "string",
  "experience": "string",
  "consultationFee": "number",
  "followUpFee": "number",
  "about": "string",
  "location": "string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "string",
      "role": "patient" | "doctor",
      "name": "string",
      "email": "string",
      "phone": "string",
      "isVerified": false
    },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### 1.2 User Login

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "string",
      "role": "patient" | "doctor",
      "name": "string",
      "email": "string",
      "phone": "string",
      "isVerified": true
    },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### 1.3 Social Login

**POST** `/auth/social-login`

**Request Body:**

```json
{
  "provider": "google" | "facebook",
  "accessToken": "string",
  "role": "patient" | "doctor"
}
```

### 1.4 Refresh Token

**POST** `/auth/refresh`

**Request Body:**

```json
{
  "refreshToken": "string"
}
```

### 1.5 Logout

**POST** `/auth/logout`

**Headers:** `Authorization: Bearer <token>`

### 1.6 Forgot Password

**POST** `/auth/forgot-password`

**Request Body:**

```json
{
  "email": "string"
}
```

### 1.7 Reset Password

**POST** `/auth/reset-password`

**Request Body:**

```json
{
  "token": "string",
  "newPassword": "string"
}
```

---

## 2. User Profile Management

### 2.1 Get User Profile

**GET** `/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "role": "patient" | "doctor",
    "name": "string",
    "email": "string",
    "phone": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "gender": "male" | "female" | "other",
    "profileImage": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "createdAt": "ISO_date",
    "updatedAt": "ISO_date",

    // Doctor specific fields
    "specialization": "string",
    "licenseNumber": "string",
    "degrees": "string",
    "experience": "string",
    "consultationFee": "number",
    "followUpFee": "number",
    "about": "string",
    "location": "string",
    "rating": "number",
    "reviewCount": "number",
    "isActive": "boolean"
  }
}
```

### 2.2 Update User Profile

**PUT** `/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (Same as registration, but all fields optional)

### 2.3 Upload Profile Image

**POST** `/profile/image`

**Headers:** `Authorization: Bearer <token>`

**Request:** Multipart form data with image file

---

## 3. Doctor Management

### 3.1 Get All Doctors

**GET** `/doctors`

**Query Parameters:**

- `specialization`: string (filter by specialization)
- `location`: string (filter by location)
- `rating`: number (minimum rating)
- `page`: number (pagination)
- `limit`: number (items per page)
- `search`: string (search by name)

**Response:**

```json
{
  "success": true,
  "data": {
    "doctors": [
      {
        "id": "string",
        "name": "string",
        "specialization": "string",
        "rating": "number",
        "reviewCount": "number",
        "isActive": "boolean",
        "profileImage": "string",
        "degrees": "string",
        "location": "string",
        "patients": "string",
        "experience": "string",
        "consultationFee": "number",
        "followUpFee": "number",
        "about": "string",
        "workingHours": "string"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

### 3.2 Get Doctor by ID

**GET** `/doctors/:id`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "specialization": "string",
    "rating": "number",
    "reviewCount": "number",
    "isActive": "boolean",
    "profileImage": "string",
    "degrees": "string",
    "location": "string",
    "patients": "string",
    "experience": "string",
    "consultationFee": "number",
    "followUpFee": "number",
    "about": "string",
    "workingHours": "string",
    "availability": [
      {
        "date": "YYYY-MM-DD",
        "dayOfWeek": "string",
        "timeSlots": ["string"],
        "isAvailable": "boolean"
      }
    ],
    "reviews": [
      {
        "id": "string",
        "reviewerName": "string",
        "reviewDate": "string",
        "rating": "number",
        "comment": "string"
      }
    ]
  }
}
```

### 3.3 Get Doctor Availability

**GET** `/doctors/:id/availability`

**Query Parameters:**

- `startDate`: YYYY-MM-DD
- `endDate`: YYYY-MM-DD

### 3.4 Update Doctor Availability

**PUT** `/doctors/availability`

**Headers:** `Authorization: Bearer <token>` (Doctor only)

**Request Body:**

```json
{
  "availability": [
    {
      "date": "YYYY-MM-DD",
      "timeSlots": ["09:00", "10:00", "11:00"],
      "isAvailable": true
    }
  ]
}
```

---

## 4. Appointment Management

### 4.1 Book Appointment

**POST** `/appointments`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "doctorId": "string",
  "appointmentDate": "YYYY-MM-DD",
  "appointmentTime": "HH:MM",
  "patientDetails": {
    "name": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "gender": "male" | "female" | "other",
    "problem": "string",
    "phone": "string",
    "email": "string"
  },
  "paymentMethod": "string",
  "promoCode": "string",
  "documents": ["string"] // file URLs
}
```

**Response:**

```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "appointmentId": "string",
    "appointmentNumber": "string",
    "status": "confirmed",
    "appointmentDate": "YYYY-MM-DD",
    "appointmentTime": "HH:MM",
    "consultationFee": "number",
    "totalAmount": "number"
  }
}
```

### 4.2 Get User Appointments

**GET** `/appointments`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `status`: "upcoming" | "completed" | "cancelled"
- `page`: number
- `limit`: number

**Response:**

```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "string",
        "appointmentNumber": "string",
        "doctor": {
          "id": "string",
          "name": "string",
          "specialization": "string",
          "profileImage": "string"
        },
        "appointmentDate": "YYYY-MM-DD",
        "appointmentTime": "HH:MM",
        "status": "confirmed" | "completed" | "cancelled",
        "consultationFee": "number",
        "totalAmount": "number",
        "patientDetails": {
          "name": "string",
          "problem": "string"
        },
        "createdAt": "ISO_date"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

### 4.3 Get Appointment Details

**GET** `/appointments/:id`

**Headers:** `Authorization: Bearer <token>`

### 4.4 Cancel Appointment

**PUT** `/appointments/:id/cancel`

**Headers:** `Authorization: Bearer <token>`

### 4.5 Reschedule Appointment

**PUT** `/appointments/:id/reschedule`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "newDate": "YYYY-MM-DD",
  "newTime": "HH:MM"
}
```

### 4.6 Doctor - Get Appointments

**GET** `/doctors/appointments`

**Headers:** `Authorization: Bearer <token>` (Doctor only)

**Query Parameters:**

- `date`: YYYY-MM-DD
- `status`: "upcoming" | "completed" | "cancelled"

---

## 5. Product & Medicine Management

### 5.1 Get Product Categories

**GET** `/products/categories`

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "bgColor": "string",
      "image": "string"
    }
  ]
}
```

### 5.2 Get Products by Category

**GET** `/products/category/:categoryId`

**Query Parameters:**

- `page`: number
- `limit`: number
- `search`: string
- `sortBy`: "price" | "name" | "rating"
- `sortOrder`: "asc" | "desc"

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "oldPrice": "number",
        "discount": "string",
        "image": "string",
        "weight": "string",
        "category": "string",
        "inStock": "boolean",
        "stockQuantity": "number",
        "rating": "number",
        "reviewCount": "number"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

### 5.3 Get Popular Products

**GET** `/products/popular`

**Query Parameters:**

- `limit`: number (default: 10)

### 5.4 Get Product Details

**GET** `/products/:id`

### 5.5 Search Products

**GET** `/products/search`

**Query Parameters:**

- `q`: string (search query)
- `category`: string
- `page`: number
- `limit`: number

---

## 6. Cart & Order Management

### 6.1 Add to Cart

**POST** `/cart/add`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "productId": "string",
  "quantity": "number"
}
```

### 6.2 Get Cart Items

**GET** `/cart`

**Headers:** `Authorization: Bearer <token>`

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "string",
        "product": {
          "id": "string",
          "name": "string",
          "price": "number",
          "image": "string",
          "weight": "string"
        },
        "quantity": "number",
        "subtotal": "number"
      }
    ],
    "totalItems": "number",
    "totalPrice": "number"
  }
}
```

### 6.3 Update Cart Item Quantity

**PUT** `/cart/:itemId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "quantity": "number"
}
```

### 6.4 Remove from Cart

**DELETE** `/cart/:itemId`

**Headers:** `Authorization: Bearer <token>`

### 6.5 Clear Cart

**DELETE** `/cart`

**Headers:** `Authorization: Bearer <token>`

### 6.6 Create Order

**POST** `/orders`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "items": [
    {
      "productId": "string",
      "quantity": "number"
    }
  ],
  "shippingAddress": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "zipCode": "string"
  },
  "paymentMethod": "cash_on_delivery" | "card" | "paypal"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "string",
    "orderNumber": "string",
    "status": "pending",
    "totalAmount": "number",
    "estimatedDelivery": "YYYY-MM-DD"
  }
}
```

### 6.7 Get User Orders

**GET** `/orders`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `status`: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
- `page`: number
- `limit`: number

### 6.8 Get Order Details

**GET** `/orders/:id`

**Headers:** `Authorization: Bearer <token>`

### 6.9 Cancel Order

**PUT** `/orders/:id/cancel`

**Headers:** `Authorization: Bearer <token>`

---

## 7. Favorites Management

### 7.1 Add Doctor to Favorites

**POST** `/favorites/doctors`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "doctorId": "string"
}
```

### 7.2 Get Favorite Doctors

**GET** `/favorites/doctors`

**Headers:** `Authorization: Bearer <token>`

### 7.3 Remove Doctor from Favorites

**DELETE** `/favorites/doctors/:doctorId`

**Headers:** `Authorization: Bearer <token>`

---

## 8. Reviews & Ratings

### 8.1 Add Review

**POST** `/reviews`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "doctorId": "string",
  "appointmentId": "string",
  "rating": "number", // 1-5
  "comment": "string"
}
```

### 8.2 Get Doctor Reviews

**GET** `/doctors/:id/reviews`

**Query Parameters:**

- `page`: number
- `limit`: number

---

## 9. Payment Management

### 9.1 Get Payment Methods

**GET** `/payment/methods`

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "type": "card" | "paypal" | "apple_pay" | "google_pay",
      "isActive": "boolean"
    }
  ]
}
```

### 9.2 Process Payment

**POST** `/payment/process`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "orderId": "string", // for orders
  "appointmentId": "string", // for appointments
  "amount": "number",
  "paymentMethod": "string",
  "paymentDetails": {
    // Payment method specific details
  }
}
```

---

## 10. Notifications

### 10.1 Get Notifications

**GET** `/notifications`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `page`: number
- `limit`: number
- `type`: "appointment" | "order" | "general"

### 10.2 Mark Notification as Read

**PUT** `/notifications/:id/read`

**Headers:** `Authorization: Bearer <token>`

### 10.3 Mark All Notifications as Read

**PUT** `/notifications/read-all`

**Headers:** `Authorization: Bearer <token>`

---

## 11. File Upload

### 11.1 Upload File

**POST** `/upload`

**Headers:** `Authorization: Bearer <token>`

**Request:** Multipart form data with file

**Response:**

```json
{
  "success": true,
  "data": {
    "fileUrl": "string",
    "fileName": "string",
    "fileSize": "number"
  }
}
```

---

## 12. Admin Endpoints (Optional)

### 12.1 Get All Users

**GET** `/admin/users`

**Headers:** `Authorization: Bearer <admin_token>`

### 12.2 Get System Statistics

**GET** `/admin/stats`

**Headers:** `Authorization: Bearer <admin_token>`

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

### Common HTTP Status Codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## Database Schema Requirements

### Users Table

```sql
- id (UUID, Primary Key)
- role (ENUM: 'patient', 'doctor')
- name (VARCHAR)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed)
- phone (VARCHAR)
- dateOfBirth (DATE)
- gender (ENUM: 'male', 'female', 'other')
- profileImage (VARCHAR)
- isVerified (BOOLEAN)
- isActive (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

-- Doctor specific fields
- specialization (VARCHAR)
- licenseNumber (VARCHAR)
- degrees (TEXT)
- experience (VARCHAR)
- consultationFee (DECIMAL)
- followUpFee (DECIMAL)
- about (TEXT)
- location (VARCHAR)
- rating (DECIMAL)
- reviewCount (INTEGER)
```

### Appointments Table

```sql
- id (UUID, Primary Key)
- appointmentNumber (VARCHAR, Unique)
- doctorId (UUID, Foreign Key)
- patientId (UUID, Foreign Key)
- appointmentDate (DATE)
- appointmentTime (TIME)
- status (ENUM: 'confirmed', 'completed', 'cancelled')
- consultationFee (DECIMAL)
- totalAmount (DECIMAL)
- paymentMethod (VARCHAR)
- patientDetails (JSON)
- documents (JSON)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Products Table

```sql
- id (UUID, Primary Key)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- oldPrice (DECIMAL)
- discount (VARCHAR)
- image (VARCHAR)
- weight (VARCHAR)
- categoryId (UUID, Foreign Key)
- inStock (BOOLEAN)
- stockQuantity (INTEGER)
- rating (DECIMAL)
- reviewCount (INTEGER)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Orders Table

```sql
- id (UUID, Primary Key)
- orderNumber (VARCHAR, Unique)
- userId (UUID, Foreign Key)
- status (ENUM: 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled')
- totalAmount (DECIMAL)
- shippingAddress (JSON)
- paymentMethod (VARCHAR)
- paymentStatus (ENUM: 'pending', 'paid', 'failed')
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

---

## Security Requirements

1. **JWT Authentication** - All protected endpoints require valid JWT token
2. **Password Hashing** - Use bcrypt or similar for password hashing
3. **Input Validation** - Validate all input data
4. **Rate Limiting** - Implement rate limiting for API endpoints
5. **CORS** - Configure CORS for mobile app domains
6. **HTTPS** - All API calls must use HTTPS
7. **Data Encryption** - Encrypt sensitive data at rest
8. **File Upload Security** - Validate file types and sizes

---

## Performance Requirements

1. **Response Time** - API responses should be under 2 seconds
2. **Pagination** - Implement pagination for list endpoints
3. **Caching** - Cache frequently accessed data
4. **Database Indexing** - Proper indexing for search and filter operations
5. **Image Optimization** - Compress and optimize uploaded images

---

## Deployment Requirements

1. **Environment Variables** - Use environment variables for configuration
2. **Database** - PostgreSQL or MySQL recommended
3. **File Storage** - AWS S3 or similar for file storage
4. **Monitoring** - Implement logging and monitoring
5. **Backup** - Regular database backups
6. **Scaling** - Design for horizontal scaling

ეს სპეციფიკაცია შეიცავს ყველა საჭირო API endpoint-ს და data structure-ს Medicare აპლიკაციისთვის. Backend developer-მა შეძლებს ამ დოკუმენტის საფუძველზე სრული backend სისტემის შექმნას.
