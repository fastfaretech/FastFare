# FastFare Backend

FastFare is a logistics and shipment management platform connecting users, drivers, and logistics providers. This backend service handles authentication, shipment booking, real-time driver tracking, and data management.

## 🚀 Overview

The backend is built with **Node.js**, **Express**, and **TypeScript**, using **MongoDB** for data persistence. It features:

- **Role-based Authentication**: Secure login for Users, Admins, Logistic Providers, and Drivers using JWT.
- **Shipment Management**: Booking, tracking, and managing shipments with QR code validation for pickup and delivery.
- **Real-time Tracking**: Socket.io integration for live driver location updates.
- **Secure API**: Protected by Helmet and CORS, with environment-based configuration.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt
- **Tools**: Nodemon (via `tsx` watch), Dotenv

## 📂 Project Structure

```
src/
├── controllers/    # Request handlers for API routes
├── db/            # Database connection logic
├── middlewares/    # Auth and error handling middlewares
├── models/         # Mongoose schemas (User, Shipment, Details)
├── routes/         # API route definitions
├── services/       # Business logic layers
├── sockets/        # Socket.io handlers for real-time tracking
└── utils/          # Helper functions and configuration
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local or Atlas URI)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd fastfare-backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env` file in the root directory (refer to `src/utils/envConfig.ts` for required keys, typically `PORT`, `MONGO_URI`, `JWT_SECRET`).

### Running the Project

- **Development Mode** (with hot-reload):

  ```bash
  npm run dev
  ```

- **Build for Production**:

  ```bash
  npm run build
  ```

- **Start Production Server**:
  ```bash
  npm start
  ```

## 🔗 API Flow & Features

### 1. Authentication

- **POST** `/api/v1/login`: Authenticates users/admins/drivers and returns a JWT.
- **GET** `/api/v1/fetchdetail`: Retrieves role-specific details (User, Admin, Logistic) based on the token.

### 2. User Operations

- **POST** `/api/v1/user/order/book`: Users can book a new shipment.
- **GET** `/api/v1/user/order/get/:shipmentId`: Retrieve shipment details.

### 3. Real-time Driver Tracking (Socket.io)

- **Connect**: Clients connect to the base URL.
- **Events**:
  - `driver:location:set`: Driver sends `{ userId, latitude, longitude }`.
  - `driver:location:get`: Fetch current location of a driver.
  - `driver:location:update`: Broadcast event received by clients tracking a driver.

## 📝 Usage Example

1.  **Register/Login** to get a valid `token`.
2.  Include the token in the `Authorization` header (`Bearer <token>`) for protected routes.
3.  **Book a shipment** via `/api/v1/user/order/book`.
4.  **Track status** via real-time sockets or status endpoints.
