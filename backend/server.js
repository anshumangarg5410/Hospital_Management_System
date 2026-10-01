// ---------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ---------------------------------------------------------
// FILE PATHS
// ---------------------------------------------------------
const patientsFile = path.join(__dirname, "databases", "Authentication.json");
const doctorsFile = path.join(__dirname, "databases", "doctor.json");
const reviewsFile = path.join(__dirname, "databases", "reviews.json");
const searchFile = path.join(__dirname, "databases", "searchData.json");
const medicinesFile = path.join(__dirname, "databases", "medicines.json");

// ---------------------------------------------------------
// UTIL FUNCTIONS
// ---------------------------------------------------------
function readJSON(filePath, fallback = {}) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ---------------------------------------------------------
// LOGIN STATES
// ---------------------------------------------------------
let Current_User_Index = null;
let Current_Doctor_Index = null;

// ---------------------------------------------------------
// ROOT
// ---------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// ---------------------------------------------------------
// ---------------------- PATIENT SYSTEM --------------------
// ---------------------------------------------------------

// Get all users
app.get("/users", (req, res) => {
  const data = readJSON(patientsFile, { users: [] });
  res.json({ success: true, users: data.users });
});

// Login status
app.get("/login-status", (req, res) => {
  const data = readJSON(patientsFile, { users: [] });
  if (Current_User_Index !== null && data.users[Current_User_Index]) {
    return res.json({ login: 1, user: data.users[Current_User_Index] });
  }
  res.json({ login: 0 });
});

// Forgot password login
app.post("/loginwithoutpassword", (req, res) => {
  const { username, email } = req.body;
  const data = readJSON(patientsFile, { users: [] });

  const index = data.users.findIndex(u => u.username === username);
  if (index === -1) return res.json({ success: false, message: "User not found" });

  if (data.users[index].email !== email)
    return res.json({ success: false, message: "Wrong email" });

  Current_User_Index = index;
  res.json({ success: true, user: data.users[index] });
});

// Signup
app.post("/signup", (req, res) => {
  const { name, username, password, email } = req.body;

  if (!name || !username || !password || !email)
    return res.json({ success: false, message: "Missing fields" });

  const data = readJSON(patientsFile, { users: [] });

  if (data.users.some(u => u.username === username))
    return res.json({ success: false, message: "User already exists" });

  const newUser = {
    name,
    username,
    password,
    email,
    ID: data.users.length,
    Designation: "Patient",
    appointments: [],
    prescriptions: [],
    orders: [],
    reports: [],
    cart: []
  };

  data.users.push(newUser);
  writeJSON(patientsFile, data);

  res.json({ success: true, message: "User registered successfully" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const data = readJSON(patientsFile, { users: [] });

  const index = data.users.findIndex(u => u.username === username);
  if (index === -1) return res.json({ success: false, message: "User not found" });

  if (data.users[index].password !== password)
    return res.json({ success: false, message: "Wrong password" });

  Current_User_Index = index;
  res.json({ success: true, user: data.users[index] });
});

// Logout
app.post("/logout", (req, res) => {
  Current_User_Index = null;
  res.json({ success: true });
});

// Current user
app.get("/currentUser", (req, res) => {
  const data = readJSON(patientsFile, { users: [] });

  if (Current_User_Index !== null && data.users[Current_User_Index])
    return res.json({ success: true, user: data.users[Current_User_Index] });

  res.json({ success: false, message: "No user logged in" });
});

// ---------------------------------------------------------
// Patient Data (Appointments, Reports, Orders, Prescriptions)
// ---------------------------------------------------------
function getUserData(key, username) {
  const data = readJSON(patientsFile, { users: [] });
  if (username) {
    const user = data.users.find(u => u.username === username);
    if (user && user[key]) return user[key];
  }
  if (Current_User_Index !== null && data.users[Current_User_Index]) {
    return data.users[Current_User_Index][key] || [];
  }
  return [];
}

app.get("/appointments", (req, res) =>
  res.json({ success: true, appointments: getUserData("appointments", req.query.username) })
);

app.post("/appointments", (req, res) => {
  const data = readJSON(patientsFile, { users: [] });
  let userIndex = Current_User_Index;
  if (req.body.username) {
    const idx = data.users.findIndex(u => u.username === req.body.username);
    if (idx !== -1) userIndex = idx;
  }
  if (userIndex === null || !data.users[userIndex]) {
    userIndex = 0;
  }
  if (!data.users[userIndex]) {
    return res.json({ success: false, message: "No user found" });
  }

  const user = data.users[userIndex];
  if (!Array.isArray(user.appointments)) user.appointments = [];

  const newAppointment = {
    id: user.appointments.length > 0 ? Math.max(...user.appointments.map(a => a.id || 0)) + 1 : 1,
    doctor: req.body.doctor || "Dr. Soham Sood",
    datetime: req.body.datetime || new Date().toISOString().slice(0, 16),
    location: req.body.location || "Room 101",
    status: req.body.status || "Upcoming",
    department: req.body.department || "General Medicine"
  };

  user.appointments.unshift(newAppointment);
  writeJSON(patientsFile, data);

  res.json({ success: true, message: "Appointment booked successfully", appointment: newAppointment });
});

app.get("/prescriptions", (req, res) =>
  res.json({ success: true, prescriptions: getUserData("prescriptions", req.query.username) })
);

app.post("/prescriptions", (req, res) => {
  const data = readJSON(patientsFile, { users: [] });
  let userIndex = Current_User_Index;
  if (req.body.username) {
    const idx = data.users.findIndex(u => u.username === req.body.username);
    if (idx !== -1) userIndex = idx;
  }
  if (userIndex === null || !data.users[userIndex]) {
    userIndex = 0;
  }
  if (!data.users[userIndex]) {
    return res.json({ success: false, message: "No user found" });
  }

  const user = data.users[userIndex];
  if (!Array.isArray(user.prescriptions)) user.prescriptions = [];

  const newPrescription = {
    id: user.prescriptions.length > 0 ? Math.max(...user.prescriptions.map(p => p.id || 0)) + 1 : 1,
    doctor: req.body.doctor || "Prescription Order",
    date: req.body.date || new Date().toISOString().split("T")[0],
    status: req.body.status || "Pending Verification",
    medicines: req.body.medicines || ["Uploaded Prescription"]
  };

  user.prescriptions.unshift(newPrescription);
  writeJSON(patientsFile, data);

  res.json({ success: true, message: "Prescription submitted successfully", prescription: newPrescription });
});

app.get("/orders", (req, res) =>
  res.json({ success: true, orders: getUserData("orders", req.query.username) })
);

app.post("/orders", (req, res) => {
  const data = readJSON(patientsFile, { users: [] });
  let userIndex = Current_User_Index;
  if (req.body.username) {
    const idx = data.users.findIndex(u => u.username === req.body.username);
    if (idx !== -1) userIndex = idx;
  }
  if (userIndex === null || !data.users[userIndex]) {
    userIndex = 0;
  }
  if (!data.users[userIndex]) {
    return res.json({ success: false, message: "No user found" });
  }

  const user = data.users[userIndex];
  if (!Array.isArray(user.orders)) user.orders = [];

  const newOrder = {
    id: user.orders.length > 0 ? Math.max(...user.orders.map(o => o.id || 0)) + 1 : 1,
    date: req.body.date || new Date().toISOString().split("T")[0],
    total: Number(req.body.total) || 25.49,
    status: "Processing",
    medicines: req.body.medicines || [
      { name: "Optimum Nutrition 100% Whey", price: 18.39, instructions: "Daily dietary supplement" }
    ],
    deliveryAddress: req.body.deliveryAddress || "123 Health Street, New Delhi",
    paymentMethod: req.body.paymentMethod || "UPI"
  };

  user.orders.unshift(newOrder);
  writeJSON(patientsFile, data);

  res.json({ success: true, message: "Order placed successfully", order: newOrder });
});
app.get("/reports", (req, res) =>
  res.json({ success: true, reports: getUserData("reports", req.query.username) })
);

app.post("/reports", (req, res) => {
  const data = readJSON(patientsFile, { users: [] });
  let userIndex = Current_User_Index;
  if (req.body.username) {
    const idx = data.users.findIndex(u => u.username === req.body.username);
    if (idx !== -1) userIndex = idx;
  }
  if (userIndex === null || !data.users[userIndex]) {
    userIndex = 0;
  }
  if (!data.users[userIndex]) {
    return res.json({ success: false, message: "No user found" });
  }

  const user = data.users[userIndex];
  if (!Array.isArray(user.reports)) user.reports = [];

  const newReport = {
    id: user.reports.length > 0 ? Math.max(...user.reports.map(r => r.id || 0)) + 1 : 1,
    title: req.body.title || "Diagnostic Lab Report",
    date: req.body.date || new Date().toISOString().split("T")[0],
    status: req.body.status || "Available",
    doctor: req.body.doctor || "Dr. Soham Sood",
    type: req.body.type || "Laboratory",
    summary: req.body.summary || "All clinical parameters within standard physiological range."
  };

  user.reports.unshift(newReport);
  writeJSON(patientsFile, data);

  res.json({ success: true, message: "Report uploaded successfully", report: newReport });
});

// ---------------------------------------------------------
// Update User
// ---------------------------------------------------------
app.put("/updateUser", (req, res) => {
  const { username, ...rest } = req.body;

  const data = readJSON(patientsFile, { users: [] });
  const index = data.users.findIndex(u => u.username === username);

  if (index === -1)
    return res.json({ success: false, message: "User not found" });

  data.users[index] = { ...data.users[index], ...rest };
  writeJSON(patientsFile, data);

  res.json({ success: true, message: "User updated", user: data.users[index] });
});

// ---------------------------------------------------------
// Change Password
// ---------------------------------------------------------
app.put("/changePassword", (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  const data = readJSON(patientsFile, { users: [] });
  const index = data.users.findIndex(u => u.username === username);

  if (index === -1) return res.json({ success: false, message: "User not found" });

  if (data.users[index].password !== currentPassword)
    return res.json({ success: false, message: "Incorrect current password" });

  data.users[index].password = newPassword;
  writeJSON(patientsFile, data);

  res.json({ success: true, message: "Password changed successfully" });
});

// ---------------------------------------------------------
// ---------------------- REVIEWS --------------------------
// ---------------------------------------------------------
app.post("/saveReview", (req, res) => {
  const reviews = readJSON(reviewsFile, []);
  const newReview = { ...req.body, time: new Date().toLocaleString() };

  reviews.push(newReview);
  writeJSON(reviewsFile, reviews);

  res.send("Review saved successfully");
});

app.get("/reviews", (req, res) => {
  const reviews = readJSON(reviewsFile, []);

  let html = `
    <html>
      <head>
        <title>All Reviews</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .review { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
          .time { font-size: 0.9em; color: gray; }
        </style>
      </head>
      <body>
        <h1>All Reviews</h1>
        ${
          reviews.length === 0
            ? "<p>No reviews yet.</p>"
            : reviews
                .map(
                  r => `
          <div class="review">
            <p><strong>Name:</strong> ${r.name}</p>
            <p><strong>Email:</strong> ${r.email}</p>
            <p><strong>Message:</strong> ${r.message}</p>
            <p class="time">${r.time}</p>
          </div>`
                )
                .join("")
        }
      </body>
    </html>
  `;

  res.send(html);
});

// ---------------------------------------------------------
// ---------------------- SEARCH ---------------------------
// ---------------------------------------------------------
app.get("/searchItems", (req, res) => {
  const data = readJSON(searchFile, { searchItems: [] });
  res.json({ success: true, searchItems: data.searchItems });
});

// ---------------------------------------------------------
// ---------------------- MEDICINES ------------------------
// ---------------------------------------------------------
app.get("/medicines", (req, res) => {
  const data = readJSON(medicinesFile, { medicines: [] });
  res.json({ success: true, medicines: data.medicines });
});

app.get("/medicines/:id", (req, res) => {
  const data = readJSON(medicinesFile, { medicines: [] });
  const med = data.medicines.find(m => m.id == req.params.id);

  if (med) return res.json({ success: true, medicine: med });
  res.status(404).json({ success: false, message: "Medicine not found" });
});

// ---------------------------------------------------------
// ---------------------- CART -----------------------------
// ---------------------------------------------------------
app.post("/cart/add", (req, res) => {
  if (Current_User_Index === null)
    return res.json({ success: false, message: "Login first" });

  const { medicineId, quantity = 1 } = req.body;

  const data = readJSON(patientsFile, { users: [] });
  const cart = data.users[Current_User_Index].cart || [];

  const existing = cart.find(c => c.medicineId === medicineId);

  if (existing) existing.quantity += quantity;
  else cart.push({ medicineId, quantity, addedAt: new Date().toISOString() });

  data.users[Current_User_Index].cart = cart;
  writeJSON(patientsFile, data);

  res.json({ success: true, cart });
});

app.get("/cart", (req, res) => {
  if (Current_User_Index === null)
    return res.json({ success: false, message: "Login first" });

  const userData = readJSON(patientsFile, { users: [] }).users[Current_User_Index];
  const medicines = readJSON(medicinesFile, { medicines: [] }).medicines;

  const cartDetails = userData.cart.map(item => ({
    ...item,
    medicine: medicines.find(m => m.id === item.medicineId)
  }));

  res.json({ success: true, cart: cartDetails });
});

app.delete("/cart/remove/:id", (req, res) => {
  if (Current_User_Index === null)
    return res.json({ success: false, message: "Login first" });

  const medId = parseInt(req.params.id);
  const data = readJSON(patientsFile, { users: [] });

  data.users[Current_User_Index].cart = data.users[Current_User_Index].cart.filter(
    item => item.medicineId !== medId
  );

  writeJSON(patientsFile, data);
  res.json({ success: true });
});

// ---------------------------------------------------------
// ------------------ DOCTOR SYSTEM ------------------------
// ---------------------------------------------------------
app.post("/doctor/login", (req, res) => {
  const { username, password } = req.body;
  const raw = readJSON(doctorsFile, []);
  const doctors = Array.isArray(raw) ? raw : (raw.doctors || []);

  const index = doctors.findIndex(d => d.username === username);

  if (index === -1)
    return res.json({ success: false, message: "Doctor not found" });

  if (doctors[index].password !== password)
    return res.json({ success: false, message: "Wrong password" });

  Current_Doctor_Index = index;
  res.json({ success: true, user: doctors[index] });
});

app.get("/doctor/current", (req, res) => {
  const raw = readJSON(doctorsFile, []);
  const doctors = Array.isArray(raw) ? raw : (raw.doctors || []);

  if (Current_Doctor_Index === null)
    return res.json({ success: false, message: "No doctor logged in" });

  res.json({ success: true, user: doctors[Current_Doctor_Index] });
});

app.post("/doctor/logout", (req, res) => {
  Current_Doctor_Index = null;
  res.json({ success: true });
});

// ---------------------------------------------------------
// START SERVER
// ---------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);