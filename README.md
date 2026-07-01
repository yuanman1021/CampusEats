# CampusEats

CampusEats is a campus food pre-order and pickup platform for students and campus food vendors.

The system allows customers to browse vendors, view menu items, add food to cart, place pickup orders, receive notifications, and submit reviews after collecting orders. Vendors can manage incoming orders, update order status, view dashboard summaries, and manage menu items.

---

## Live Deployment Links

Frontend Web App:  
https://campus-eats-ivory.vercel.app

Backend API:  
https://campuseats-backend-b2o4.onrender.com/api

Sample API Endpoint:  
https://campuseats-backend-b2o4.onrender.com/api/vendors

GitHub Repository:  
https://github.com/yuanman1021/CampusEats

---

## Technology Stack

### Frontend
- Vue 3
- Vite
- Vue Router
- Pinia
- Responsive CSS
- Capacitor Android build

### Backend
- PHP Slim
- PDO
- RESTful API
- MySQL connection using environment variables
- Prepared statements for database queries

### Database
- MySQL
- Railway MySQL for production database
- Local MySQL using Laragon for development

### Deployment
- Vercel for frontend hosting
- Render for backend API hosting
- Railway for MySQL database hosting

---

## Main Features

### Customer
- Register and login
- Browse vendors and menus
- Search and filter food items
- Add items to cart
- Select pickup slot
- Select mock payment method
- Place order
- View order history and order details
- Receive notifications
- Submit review after order is collected

### Vendor
- Login as vendor
- View vendor dashboard
- Monitor active orders and sales summary
- View order queue
- Update order status
- View order details
- Manage menu items
- Monitor customer reviews

### Administrator
- Login as admin
- View admin dashboard
- Manage vendors
- View system summary

---

## Test Credentials

All test accounts use the same password:

```text
123456
```

### Customer

```text
Email: ali@student.utm.my
Password: 123456
```

### Vendor

```text
Email: lemontree@utm.my
Password: 123456
```

Additional vendor accounts:

```text
Email: osman@utm.my
Password: 123456
```

```text
Email: chillcafe@utm.my
Password: 123456
```

### Administrator

```text
Email: admin@campuseats.my
Password: 123456
```

---

## Folder Structure

```text
CampusEats/
├── README.md
├── .gitignore
├── backend/
│   ├── Dockerfile
│   ├── composer.json
│   ├── composer.lock
│   ├── package.json
│   ├── database/
│   │   └── campuseats_db.sql
│   ├── public/
│   │   └── index.php
│   ├── src/
│   └── vendor/
└── frontend/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── vercel.json
    ├── capacitor.config.json
    ├── android/
    ├── public/
    │   ├── data/
    │   └── images/
    └── src/
        ├── assets/
        ├── components/
        ├── router/
        ├── services/
        ├── stores/
        ├── views/
        ├── App.vue
        └── main.js
```

---

## Local Setup Guide

### 1. Clone the repository

```bash
git clone https://github.com/yuanman1021/CampusEats.git
cd CampusEats
```

---

## Database Setup

Make sure Laragon MySQL is running.

From the project root folder, import the database using:

```bash
mysql -u root < backend/database/campuseats_db.sql
```

If your MySQL root account has a password, use:

```bash
mysql -u root -p < backend/database/campuseats_db.sql
```

The SQL file will create the database:

```text
campuseats_db
```

Important: running the SQL file again will reset the database data.

---

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=127.0.0.1
DB_NAME=campuseats_db
DB_USER=root
DB_PASS=
DB_PORT=3306
```

Run the backend server:

```bash
npm run dev
```

Backend will run at:

```text
http://localhost:8000
```

Test backend:

```text
http://localhost:8000/api/vendors
http://localhost:8000/api/orders
http://localhost:8000/api/reviews
```

---

## Frontend Setup

Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

Install Node dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## Android Build Setup

Go to the frontend folder:

```bash
cd frontend
```

Build the Vue app:

```bash
npm run build
```

Sync the Capacitor Android project:

```bash
npx cap sync android
```

Open Android Studio:

```bash
npx cap open android
```

Then run the app using an emulator or connected Android device.

---

## Deployment Configuration

### Frontend: Vercel

Frontend environment variable:

```env
VITE_API_BASE_URL=https://campuseats-backend-b2o4.onrender.com/api
```

Vercel settings:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

The `frontend/vercel.json` file is used to support Vue Router page refresh and direct route access.

---

### Backend: Render

Render environment variables:

```env
DB_HOST=railway-mysql-host
DB_PORT=railway-mysql-port
DB_USER=root
DB_NAME=railway
DB_PASS=railway-password
```

The backend is deployed using Docker from:

```text
backend/Dockerfile
```

---

### Database: Railway

Railway hosts the production MySQL database.

The database stores:
- users
- vendors
- vendor_users
- menu_items
- menu_item_options
- orders
- order_items
- reviews
- promotions
- notifications

---

## System Flow

```text
Vue Frontend → PHP Slim Backend API → MySQL Database
```

The frontend sends API requests to the backend.  
The backend processes the request, communicates with MySQL, and returns JSON responses to the frontend.

---

## Important Notes

Do not commit these files or folders:

```text
frontend/node_modules
backend/vendor
backend/.env
```

These can be recreated using:

```bash
npm install
composer install
```

The `.env` file is not committed because it contains local database configuration.

---

## Group Members

- Khoo Yuan Man
- Lee May Yan
- Lee Tung Ern
