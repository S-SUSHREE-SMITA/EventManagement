# 🎉 EventHub - Full Stack Event Management System (MERN)

A complete event management platform built with **MongoDB, Express, React, Node.js** featuring service browsing, venue selection, booking, Razorpay payment integration, user profiles, and an admin dashboard.

---

## 📁 Project Structure

```
EventManagement/
├── Backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT auth + admin guard
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Booking.js             # Booking schema
│   ├── routes/
│   │   ├── authRoutes.js          # Register / Login / Profile
│   │   ├── bookingRoutes.js       # Create order, verify payment, stats
│   │   └── adminRoutes.js         # Admin user management
│   ├── .env                       # Environment variables
│   ├── package.json
│   ├── seed.js                    # Creates first admin user
│   └── server.js                  # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── Components/
    │   │   ├── Navbar.jsx/css      # Sticky nav with profile/login toggle
    │   │   ├── Home.jsx/css        # Hero carousel + stats
    │   │   ├── Services.jsx/css    # 9 service cards
    │   │   ├── About.jsx/css       # About + team
    │   │   ├── Contact.jsx/css     # Contact form
    │   │   ├── Footer.jsx/css
    │   │   ├── Login.jsx           # User login with redirect
    │   │   ├── Register.jsx        # Registration
    │   │   ├── AdminLogin.jsx      # Admin-only login
    │   │   ├── Form.css            # Shared auth form styles
    │   │   ├── PrivateRoute.jsx    # Redirects unauthenticated users
    │   │   └── AdminRoute.jsx      # Redirects non-admins
    │   ├── Pages/
    │   │   ├── ServiceDetail.jsx/css   # Venue listing per service
    │   │   ├── BookingPage.jsx/css     # 2-step booking + Razorpay
    │   │   ├── Profile.jsx/css         # User profile + bookings tab
    │   │   └── AdminDashboard.jsx/css  # Full admin panel
    │   ├── context/
    │   │   └── AuthContext.jsx     # Global auth state
    │   └── utils/
    │       └── servicesData.js     # All 9 services with venues & prices
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas
- Razorpay account (free test keys available at razorpay.com)

---

### 2. Backend Setup

```bash
cd EventManagement/Backend
npm install
```

Edit `.env` with your values:
```env
MONGO_URI=mongodb://localhost:27017/eventmanagement
JWT_SECRET=your_super_secret_key_change_this
PORT=5000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

Create the first admin user:
```bash
node seed.js
# Admin email:    admin@eventhub.in
# Admin password: Admin@123
```

Start the backend:
```bash
npm run dev    # development (nodemon)
# OR
npm start      # production
```

---

### 3. Frontend Setup

```bash
cd EventManagement/frontend
npm install
```

Create `.env` in the frontend folder:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
```

Start the frontend:
```bash
npm run dev
# Runs on http://localhost:3000
```

---

## 🔑 How to Get Razorpay Test Keys

1. Go to https://razorpay.com → Sign up (free)
2. Dashboard → Settings → API Keys
3. Generate Test Mode keys
4. Copy Key ID → paste in both `.env` files
5. Copy Key Secret → paste in Backend `.env` only

Use test card for payments:
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: `1234`

---

## ✨ Features

### User Side
| Feature | Details |
|---|---|
| Browse services | 9 services visible without login |
| Login required | Clicking a service redirects to login if not authenticated |
| After login | Redirected back to the service they clicked |
| Service detail | Shows all venues with pricing, capacity, amenities |
| Booking (2-step) | Fill details → Review → Pay via Razorpay |
| Profile page | View/edit name, phone, address |
| My bookings | See all bookings with status and payment info |
| Navbar | Shows Login/Register when logged out, profile avatar when logged in |

### Admin Side
| Feature | Details |
|---|---|
| Separate admin login | `/admin-login` route |
| Overview | Total bookings, revenue, pending, confirmed, cancelled, users |
| Service popularity | Visual bar chart of bookings per service |
| Revenue analytics | Monthly bar chart + per-service revenue table |
| Booking management | Table of all bookings, change status via dropdown |
| User management | Grid of all users, delete user |
| Protected routes | Admin-only, regular users cannot access |

---

## 🛣️ API Endpoints

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/register` | Register user |
| POST | `/api/login` | User login |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/profile` | Get own profile (auth) |
| PUT | `/api/profile` | Update profile (auth) |

### Bookings
| Method | Route | Description |
|---|---|---|
| POST | `/api/bookings/create-order` | Create Razorpay order (auth) |
| POST | `/api/bookings/verify-payment` | Verify & save booking (auth) |
| GET | `/api/bookings/my-bookings` | Get own bookings (auth) |
| GET | `/api/bookings/all` | All bookings (admin) |
| GET | `/api/bookings/stats` | Dashboard stats (admin) |
| PUT | `/api/bookings/:id/status` | Update booking status (admin) |

### Admin
| Method | Route | Description |
|---|---|---|
| GET | `/api/admin/users` | All users (admin) |
| POST | `/api/admin/create-admin` | Create another admin (admin) |
| DELETE | `/api/admin/users/:id` | Delete user (admin) |

---

## 🎨 Services Available
1. 💍 Wedding Planning
2. 🎂 Birthday Party
3. 💼 Corporate Events
4. 🎵 Music Concerts
5. 🍽️ Catering Services
6. 📷 Photography & Videography
7. ✨ Stage & Decoration
8. 🎛️ Sound & Lighting
9. 🎓 College Events

---

## 🔒 Authentication Flow

```
User visits site
    ↓
Clicks any service card
    ↓
Logged in? → Yes → Service Detail page (venues)
           → No  → Login page (with redirect saved)
                    ↓
                 Login / Register
                    ↓
                 Redirected back to service
                    ↓
                 Selects venue → Booking page
                    ↓
                 Fills details → Reviews → Pays
                    ↓
                 Confirmed! → Profile > My Bookings
```

---

## 🐛 Troubleshooting

**MongoDB connection fails**: Make sure MongoDB is running locally with `mongod` or use Atlas URI

**Razorpay not loading**: Make sure you added the script tag in `index.html` and the key is correct

**CORS error**: Backend has CORS enabled for all origins in dev. For production, restrict to your frontend domain

**Admin can't login**: Run `node seed.js` from the Backend folder first
