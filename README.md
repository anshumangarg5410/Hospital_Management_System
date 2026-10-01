# 🏥 Hospital Management System (HMS)

A full-stack Hospital Management System with an online pharmacy, appointment booking, prescription ordering, patient dashboard, and doctor portal.

---

## 📁 Project Structure

```
Hospital_Management_System/
├── frontend/                   # Client-side (HTML, CSS, JS)
│   ├── index.html              # Landing page
│   ├── HTML/                   # All HTML pages
│   │   ├── login_pat.html          # Patient login / register
│   │   ├── user_portal.html        # Patient dashboard (auth-protected)
│   │   ├── order_prescription.html # Upload & order prescription (auth-protected)
│   │   ├── medicine.html           # Browse medicines
│   │   ├── cart.html               # Shopping cart
│   │   ├── purchase_now.html       # Checkout / purchase
│   │   ├── appointment3.html       # Book an appointment
│   │   ├── instant_consult.html    # Instant doctor consultation
│   │   ├── doctor_portal.html      # Doctor portal entry
│   │   ├── contactpage.html        # Contact / emergency info
│   │   ├── help.html               # Help center
│   │   └── ...                     # Other category pages
│   ├── CSS/                    # Stylesheets
│   ├── JS/                     # Client-side scripts
│   │   ├── navbar.js               # Shared navbar & auth state
│   │   ├── Landing_page.js         # Landing page interactions
│   │   ├── shop_pharmacy.js        # Pharmacy / cart logic
│   │   ├── patient_login.js        # Auth flow (login / register)
│   │   └── user_portal.js          # Patient dashboard tabs
│   ├── Assets/                 # Images and icons
│   └── data/                   # Static fallback data
│
├── backend/                    # Server-side (Node.js / Express)
│   ├── server.js               # Main Express API server
│   ├── index.js                # Entrypoint alias
│   └── databases/              # JSON flat-file databases
│       ├── Authentication.json     # Users, orders, prescriptions, appointments
│       ├── medicines.json          # Medicine catalog
│       ├── doctor.json             # Doctor profiles
│       ├── reviews.json            # Patient reviews
│       └── searchData.json         # Search index data
│
├── vercel.json                 # Vercel deployment config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and **npm**

### 1. Start the Backend API

```bash
cd backend
npm install
npm run dev       # Starts on http://localhost:3000
```

> Uses `nodemon` for auto-reload on file changes.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev       # Serves on http://localhost:3001
```

> Uses the `serve` package to host the static frontend.

### 3. Open the App

Navigate to **http://localhost:3001** in your browser.

---

## 🔐 Authentication

- Session is stored in **`localStorage`** under the key `hms_user`.
- The backend tracks the active session via a global `Current_User_Index`.
- **Protected pages** (Patient Dashboard, Order Prescription) redirect unauthenticated users to the login page with a contextual notice.
- After login, users are automatically redirected back to the page they were trying to access.

### Test Credentials

Check `backend/databases/Authentication.json` for existing users. You can register a new account directly from the **Login / Register** page.

---

## 🌐 API Endpoints (Backend — port 3000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | List all users |
| `POST` | `/login` | Authenticate a user |
| `POST` | `/register` | Register a new user |
| `POST` | `/logout` | Log out current user |
| `GET` | `/getUserData` | Get current user's profile & records |
| `GET` | `/medicines` | Get full medicines catalog |
| `GET` | `/doctors` | Get all doctor profiles |
| `GET` | `/reviews` | Get patient reviews |
| `POST` | `/addToCart` | Add item to cart |
| `GET` | `/getCart` | Get current user's cart |
| `DELETE` | `/removeFromCart` | Remove item from cart |
| `POST` | `/placeOrder` | Place an order |
| `POST` | `/uploadPrescription` | Upload a prescription |
| `POST` | `/bookAppointment` | Book a doctor appointment |
| `GET` | `/search` | Search medicines/doctors |

---

## 🖥️ Key Pages

| Page | URL | Auth Required |
|------|-----|---------------|
| Landing Page | `/` | ❌ |
| Medicine Shop | `/HTML/medicine.html` | ❌ |
| Shopping Cart | `/HTML/cart.html` | ❌ |
| Checkout | `/HTML/purchase_now.html` | ✅ |
| Order Prescription | `/HTML/order_prescription.html` | ✅ |
| Patient Dashboard | `/HTML/user_portal.html` | ✅ |
| Book Appointment | `/HTML/appointment3.html` | ❌ |
| Instant Consult | `/HTML/instant_consult.html` | ❌ |
| Doctor Portal | `/HTML/doctor_portal.html` | ✅ (Doctor) |
| Help Center | `/HTML/help.html` | ❌ |
| Contact | `/HTML/contactpage.html` | ❌ |

---

## 🗄️ Database

The project uses **JSON flat files** as its database (no external DB required).

| File | Contents |
|------|----------|
| `Authentication.json` | User accounts, appointments, prescriptions, orders, reports |
| `medicines.json` | Medicine catalog with categories, prices, images |
| `doctor.json` | Doctor profiles with specializations |
| `reviews.json` | Patient testimonials / reviews |

---

## 🚢 Deployment

- **Backend** deployed on [Render](https://render.com):
  `https://hospitality-management-system-xdyy.onrender.com`
- **Frontend** can be deployed as a static site (Vercel, Netlify, etc.)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | JSON flat files (no SQL/MongoDB needed) |
| Dev Server | `nodemon` (backend), `serve` (frontend) |
| Deployment | Render (backend), Vercel (frontend) |
