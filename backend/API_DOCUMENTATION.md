# FindAPair API Documentation

## Base URL
```
Development: http://localhost:3001/api
Production: https://api.findapair.org/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "👤",
    "trust_score": 50
  },
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}
```

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { ... },
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}
```

### Get Current User
**GET** `/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "avatar": "👤",
    "trust_score": 95,
    "items_posted": 5,
    "items_matched": 3,
    "points": 1247
  }
}
```

---

## User Endpoints

### Get User Profile
**GET** `/users/profile/:id`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "avatar": "👤",
    "trust_score": 95,
    "items_posted": 5
  }
}
```

### Update User Profile
**PUT** `/users/me`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "avatar": "👩"
}
```

### Get User Items
**GET** `/users/items/:id?page=1&limit=20&type=pair&status=active`

### Get User Stats
**GET** `/users/stats/:id`

**Response:**
```json
{
  "success": true,
  "stats": {
    "itemsPosted": 5,
    "itemsMatched": 3,
    "totalViews": 156,
    "totalSaves": 24,
    "trustScore": 95
  }
}
```

### Get Wishlist
**GET** `/users/me/wishlist`

### Add to Wishlist
**POST** `/users/me/wishlist`

**Request Body:**
```json
{
  "itemId": "uuid"
}
```

### Remove from Wishlist
**DELETE** `/users/me/wishlist/:itemId`

---

## Item Endpoints

### Get All Items
**GET** `/items?page=1&limit=20&type=pair&category=Earrings&status=active&minPrice=10&maxPrice=100&search=gold&sortBy=created_at&sortOrder=desc`

**Response:**
```json
{
  "success": true,
  "items": [
    {
      "id": "uuid",
      "type": "pair",
      "title": "Gold Hoop Earring",
      "description": "Beautiful gold hoop...",
      "category": "Earrings",
      "emoji": "💎",
      "location": "New York, NY",
      "price": 85,
      "original_price": 320,
      "match_score": 94,
      "verified": true,
      "condition": "Excellent",
      "seller_id": "uuid",
      "views": 156,
      "saves": 24,
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Get Item by ID
**GET** `/items/:id`

**Response:**
```json
{
  "success": true,
  "item": {
    "id": "uuid",
    "title": "Gold Hoop Earring",
    "seller": {
      "id": "uuid",
      "name": "Sarah K.",
      "avatar": "👩",
      "trust_score": 98
    }
  }
}
```

### Create Item
**POST** `/items`

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```
type: pair
title: Gold Hoop Earring
description: Beautiful gold hoop earring
category: Earrings
emoji: 💎
location: New York, NY
price: 85
originalPrice: 320
condition: Excellent
images: [file1, file2, ...]
```

### Update Item
**PUT** `/items/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Title",
  "price": 90
}
```

### Delete Item
**DELETE** `/items/:id`

**Headers:** `Authorization: Bearer <token>`

### Search Items
**GET** `/items/search?q=gold&category=Earrings&location=New York&minPrice=10&maxPrice=100&limit=20`

### Get Similar Items
**GET** `/items/:id/similar`

---

## Message Endpoints

### Get Messages
**GET** `/messages?itemId=uuid`

**Headers:** `Authorization: Bearer <token>`

### Send Message
**POST** `/messages`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "itemId": "uuid",
  "receiverId": "uuid",
  "text": "Hi, is this still available?"
}
```

### Mark Message as Read
**PATCH** `/messages/:messageId/read`

### Mark All Messages as Read
**PATCH** `/messages/read-all`

### Get Conversations
**GET** `/messages/conversations`

---

## Report Endpoints

### Create Report
**POST** `/reports`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "itemId": "uuid",
  "reason": "spam",
  "description": "This item appears to be spam"
}
```

### Get Reports (Admin/Moderator)
**GET** `/reports?page=1&limit=20&status=pending`

**Headers:** `Authorization: Bearer <token>` (Admin/Moderator only)

### Review Report (Admin/Moderator)
**PATCH** `/reports/:id/review`

**Headers:** `Authorization: Bearer <token>` (Admin/Moderator only)

**Request Body:**
```json
{
  "status": "resolved"
}
```

---

## Notification Endpoints

### Get Notifications
**GET** `/notifications?page=1&limit=20&unreadOnly=true`

**Headers:** `Authorization: Bearer <token>`

### Mark Notification as Read
**PATCH** `/notifications/:id/read`

### Mark All Notifications as Read
**PATCH** `/notifications/read-all`

### Delete Notification
**DELETE** `/notifications/:id`

---

## Admin Endpoints

### Get Dashboard Stats
**GET** `/admin/stats`

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 1000,
    "activeUsers": 950,
    "totalItems": 5000,
    "activeItems": 4500,
    "pendingReports": 12
  },
  "recentUsers": [...],
  "recentItems": [...]
}
```

### Get All Users
**GET** `/admin/users?page=1&limit=20&role=user&status=active&search=john`

### Update User Role
**PATCH** `/admin/users/:id/role`

**Request Body:**
```json
{
  "role": "moderator"
}
```

### Ban User
**POST** `/admin/users/:id/ban`

**Request Body:**
```json
{
  "reason": "Violation of terms of service"
}
```

### Unban User
**POST** `/admin/users/:id/unban`

### Get Audit Logs
**GET** `/admin/audit-logs?page=1&limit=50`

### Get Site Settings
**GET** `/admin/settings`

### Update Site Settings
**PUT** `/admin/settings`

**Request Body:**
```json
{
  "settings": {
    "maintenance_mode": false,
    "registration_enabled": true,
    "max_items_per_user": 50
  }
}
```

---

## Payment Endpoints

### Create Checkout Session
**POST** `/payments/checkout`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "priceId": "price_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "cs_xxx",
  "url": "https://checkout.stripe.com/..."
}
```

### Create Featured Listing Session
**POST** `/payments/featured-listing`

**Request Body:**
```json
{
  "itemId": "uuid",
  "duration": 7
}
```

### Stripe Webhook
**POST** `/payments/webhook`

*This endpoint is called by Stripe, not by the client*

---

## WebSocket Events

### Client → Server

#### Join Item Room
```javascript
socket.emit('join_item', itemId);
```

#### Send Message
```javascript
socket.emit('send_message', {
  itemId: 'uuid',
  receiverId: 'uuid',
  text: 'Hello!'
});
```

#### Typing Indicator
```javascript
socket.emit('typing', {
  itemId: 'uuid',
  receiverId: 'uuid'
});
```

#### View Item
```javascript
socket.emit('view_item', itemId);
```

### Server → Client

#### New Message
```javascript
socket.on('new_message', (message) => {
  console.log('New message:', message);
});
```

#### Message Sent Confirmation
```javascript
socket.on('message_sent', (message) => {
  console.log('Message sent:', message);
});
```

#### User Typing
```javascript
socket.on('user_typing', (data) => {
  console.log('User typing:', data);
});
```

#### Item Viewed
```javascript
socket.on('item_viewed', (data) => {
  console.log('Item viewed:', data);
});
```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message"
}
```

### Common Status Codes
- **400** - Bad Request (validation error)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **500** - Internal Server Error

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Headers**: 
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 95
  - `X-RateLimit-Reset`: 1234567890

---

## File Uploads

### Supported Formats
- Images: JPG, PNG, GIF, WebP
- Max size: 5MB per file
- Max files: 10 per request

### Upload Endpoint
Use multipart/form-data with field name `images`

---

## Pagination

All list endpoints support pagination:
```
?page=1&limit=20
```

**Response includes:**
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

## Demo Credentials

### Admin
- Email: `admin@findapair.org`
- Password: `admin123`

### Moderator
- Email: `moderator@findapair.org`
- Password: `mod123`

### User
- Email: `sarah@example.com`
- Password: `user123`

---

## Health Check

**GET** `/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Support

For API support, contact: support@findapair.org
