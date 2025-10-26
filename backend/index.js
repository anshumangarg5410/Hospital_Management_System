// const fs = require("fs");
// const path = require("path");
// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ====== File Paths ======
// const filePath = path.join(__dirname, "databases", "Authentication.json");
// const reviewFilePath = path.join(__dirname, "databases", "reviews.json");
// const searchFilePath = path.join(__dirname, "databases", "searchData.json");
// const medicinesFilePath = path.join(__dirname, "databases", "medicines.json");

// // ====== In-memory logged-in user ======
// let Current_User_Index = null;

// // ====== Utility Functions ======
// function readDB() {
//   return JSON.parse(fs.readFileSync(filePath, "utf8"));
// }

// function writeDB(data) {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// function readMedicines() {
//   try {
//     return JSON.parse(fs.readFileSync(medicinesFilePath, "utf8"));
//   } catch (err) {
//     return { medicines: [] };
//   }
// }

// function writeMedicines(data) {
//   fs.writeFileSync(medicinesFilePath, JSON.stringify(data, null, 2));
// }

// // ====== Basic Routes ======
// app.get("/", (req, res) => res.send("Backend running successfully"));

// // ====== Users ======
// app.get("/usersnum", (req, res) => {
//   const data = readDB();
//   res.send({ success: true, users: data.users });
// });

// app.get("/users", (req, res) => {
//   try {
//     const data = readDB();
//     res.send({ success: true, users: data.users });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ success: false, message: "Error reading users" });
//   }
// });

// // ====== Login Status ======
// app.get("/login-status", (req, res) => {
//   const data = readDB();
//   if (Current_User_Index !== null && data.users[Current_User_Index]) {
//     res.json({ login: 1, user: data.users[Current_User_Index] });
//   } else {
//     res.json({ login: 0 });
//   }
// });

// // ====== Signup ======
// app.post("/signup", (req, res) => {
//   try {
//     let data = readDB();
//     const { name, username, password, email } = req.body;

//     if (!name || !username || !password || !email) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     if (data.users.some(u => u.username === username)) {
//       return res.json({ success: false, message: "User already exists!" });
//     }

//     const newUser = {
//       name,
//       username,
//       password,
//       email,
//       ID: data.users.length,
//       Designation: "Patient",
//       appointments: [],
//       prescriptions: [],
//       orders: [],
//       reports: [],
//       cart: []
//     };

//     data.users.push(newUser);
//     writeDB(data);

//     res.json({ success: true, message: "User registered successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

// // ====== Login ======
// app.post("/login", (req, res) => {
//   try {
//     let data = readDB();
//     const { username, password } = req.body;
//     const userIndex = data.users.findIndex(u => u.username === username);

//     if (userIndex === -1) return res.json({ success: false, message: "User not found!" });
//     if (data.users[userIndex].password !== password)
//       return res.json({ success: false, message: "Wrong password!" });

//     Current_User_Index = userIndex; // <-- in-memory login
//     res.json({ success: true, message: "Login successful!", user: data.users[userIndex] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

// // ====== Logout ======
// app.post("/logout", (req, res) => {
//   Current_User_Index = null;
//   res.json({ success: true, message: "Logged out successfully" });
// });

// // ====== Current User ======
// app.get("/currentUser", (req, res) => {
//   const data = readDB();
//   if (Current_User_Index !== null && data.users[Current_User_Index]) {
//     res.json({ success: true, user: data.users[Current_User_Index] });
//   } else {
//     res.json({ success: false, message: "No user logged in" });
//   }
// });

// // ====== User Data Endpoints ======
// function getUserData(key) {
//   const data = readDB();
//   if (Current_User_Index !== null && data.users[Current_User_Index]) {
//     return data.users[Current_User_Index][key] || [];
//   }
//   return [];
// }

// app.get("/appointments", (req, res) => res.json({ success: true, appointments: getUserData("appointments") }));
// app.get("/prescriptions", (req, res) => res.json({ success: true, prescriptions: getUserData("prescriptions") }));
// app.get("/orders", (req, res) => res.json({ success: true, orders: getUserData("orders") }));
// app.get("/reports", (req, res) => res.json({ success: true, reports: getUserData("reports") }));

// // ====== Update User Profile ======
// app.put("/updateUser", (req, res) => {
//   const { username, name, email, phone, dob, bloodGroup, address } = req.body;
//   const data = readDB();
//   const userIndex = data.users.findIndex(u => u.username === username);

//   if (userIndex !== -1) {
//     data.users[userIndex] = { ...data.users[userIndex], name, email, phone, dob, bloodGroup, address };
//     writeDB(data);
//     res.json({ success: true, message: "User updated!", user: data.users[userIndex] });
//   } else {
//     res.json({ success: false, message: "User not found!" });
//   }
// });

// // ====== Change Password ======
// app.put("/changePassword", (req, res) => {
//   const { username, currentPassword, newPassword } = req.body;
//   const data = readDB();
//   const userIndex = data.users.findIndex(u => u.username === username);

//   if (userIndex === -1) return res.json({ success: false, message: "User not found!" });
//   if (data.users[userIndex].password !== currentPassword) return res.json({ success: false, message: "Current password incorrect" });

//   data.users[userIndex].password = newPassword;
//   writeDB(data);
//   res.json({ success: true, message: "Password changed successfully!" });
// });

// // ====== Reviews ======
// app.post("/saveReview", (req, res) => {
//   const newReview = { ...req.body, time: new Date().toLocaleString() };

//   fs.readFile(reviewFilePath, "utf8", (err, data) => {
//     const reviews = data ? JSON.parse(data) : [];
//     reviews.push(newReview);

//     fs.writeFile(reviewFilePath, JSON.stringify(reviews, null, 2), (err) => {
//       if (err) return res.status(500).send("Error saving review");
//       res.send("✅ Review saved successfully!");
//     });
//   });
// });

// app.get("/reviews", (req, res) => {
//   fs.readFile(reviewFilePath, "utf8", (err, data) => {
//     if (err) return res.status(500).send("Error reading reviews.");
//     const reviews = data ? JSON.parse(data) : [];

//     let html = `
//       <html>
//         <head>
//           <title>All Reviews</title>
//           <style>
//             body { font-family: Arial; padding: 20px; }
//             .review { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
//             .time { font-size: 0.9em; color: gray; }
//           </style>
//         </head>
//         <body>
//           <h1>All Reviews</h1>
//           ${reviews.length === 0 ? "<p>No reviews yet.</p>" : ""}
//           ${reviews.map(r => `
//             <div class="review">
//               <p><strong>Name:</strong> ${r.name}</p>
//               <p><strong>Email:</strong> ${r.email}</p>
//               <p><strong>Message:</strong> ${r.message}</p>
//               <p class="time"><strong>Time:</strong> ${r.time}</p>
//             </div>
//           `).join("")}
//         </body>
//       </html>
//     `;
//     res.send(html);
//   });
// });

// // ====== Search ======
// app.get("/searchItems", (req, res) => {
//   fs.readFile(searchFilePath, "utf8", (err, data) => {
//     if (err) return res.status(500).json({ success: false, message: "Failed to load search data" });
//     try {
//       const json = JSON.parse(data);
//       res.json({ success: true, searchItems: json.searchItems || [] });
//     } catch {
//       res.status(500).json({ success: false, message: "Invalid JSON format" });
//     }
//   });
// });

// // ====== Medicines ======
// app.get("/medicines", (req, res) => {
//   const data = readMedicines();
//   res.json({ success: true, medicines: data.medicines || [] });
// });

// app.get("/medicines/:id", (req, res) => {
//   const data = readMedicines();
//   const medicine = data.medicines.find(m => m.id === parseInt(req.params.id));
//   if (medicine) res.json({ success: true, medicine });
//   else res.status(404).json({ success: false, message: "Medicine not found" });
// });

// // ====== CART ======

// // Add to cart
// app.post("/cart/add", (req, res) => {
//   if (Current_User_Index === null) return res.status(401).json({ success: false, message: "Login first!" });

//   const { medicineId, quantity = 1 } = req.body;
//   const data = readDB();
//   const cart = data.users[Current_User_Index].cart || [];

//   const existing = cart.find(item => item.medicineId === medicineId);
//   if (existing) existing.quantity += quantity;
//   else cart.push({ medicineId, quantity, addedAt: new Date().toISOString() });

//   data.users[Current_User_Index].cart = cart;
//   writeDB(data);

//   res.json({ success: true, message: "Added to cart", cart });
// });

// // Get cart
// app.get("/cart", (req, res) => {
//   if (Current_User_Index === null) return res.status(401).json({ success: false, message: "Login first!" });

//   const data = readDB();
//   const cart = data.users[Current_User_Index].cart || [{"medicineId":1,"quantity":"INFINITE","addedAt":"UNKNOWN"}];
//   const medicines = readMedicines().medicines || [];

//   const cartWithDetails = cart.map(item => ({
//     ...item,
//     medicine: medicines.find(m => m.id === item.medicineId)
//   }));

//   res.json({ success: true, cart: cartWithDetails });
// });

// // Remove from cart
// app.delete("/cart/remove/:medicineId", (req, res) => {
//   if (Current_User_Index === null) return res.status(401).json({ success: false, message: "Login first!" });

//   const data = readDB();
//   const medicineId = parseInt(req.params.medicineId);
//   const cart = data.users[Current_User_Index].cart || [];

//   data.users[Current_User_Index].cart = cart.filter(item => item.medicineId !== medicineId);
//   writeDB(data);

//   res.json({ success: true, message: "Removed from cart", cart: data.users[Current_User_Index].cart });
// });

// // ====== Start Server ======
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ====== File Paths ======
const filePath = path.join(__dirname, "databases", "Authentication.json");
const reviewFilePath = path.join(__dirname, "databases", "reviews.json");
const searchFilePath = path.join(__dirname, "databases", "searchData.json");
const medicinesFilePath = path.join(__dirname, "databases", "medicines.json");

// ====== In-memory logged-in user ======
let Current_User_Index = null;

// ====== Utility Functions ======
function readDB() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function readMedicines() {
  try {
    return JSON.parse(fs.readFileSync(medicinesFilePath, "utf8"));
  } catch (err) {
    return { medicines: [] };
  }
}

function writeMedicines(data) {
  fs.writeFileSync(medicinesFilePath, JSON.stringify(data, null, 2));
}

// ====== Basic Routes ======
app.get("/", (req, res) => res.send("Backend running successfully"));

// ====== ALL DATA DISPLAY ENDPOINT ======
app.get("/data", (req, res) => {
  try {
    // Read all data sources
    const usersData = readDB();
    const medicinesData = readMedicines();
    
    let reviewsData = [];
    let searchData = [];
    
    try {
      reviewsData = JSON.parse(fs.readFileSync(reviewFilePath, "utf8"));
    } catch (err) {
      reviewsData = [];
    }
    
    try {
      const search = JSON.parse(fs.readFileSync(searchFilePath, "utf8"));
      searchData = search.searchItems || [];
    } catch (err) {
      searchData = [];
    }

    // Calculate statistics
    const totalUsers = usersData.users.length;
    const totalMedicines = medicinesData.medicines?.length || 0;
    const totalReviews = reviewsData.length;
    const totalSearchItems = searchData.length;
    
    const loggedInUser = Current_User_Index !== null ? usersData.users[Current_User_Index]?.username : "None";
    
    const usersWithCarts = usersData.users.filter(u => u.cart && u.cart.length > 0).length;
    const usersWithAppointments = usersData.users.filter(u => u.appointments && u.appointments.length > 0).length;

    // Build HTML response
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HMS - All Data</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .header {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      margin-bottom: 30px;
      text-align: center;
    }
    
    .header h1 {
      color: #667eea;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    .header p {
      color: #666;
      font-size: 1.1rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 5px;
    }
    
    .stat-label {
      color: #666;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .section {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    
    .section h2 {
      color: #667eea;
      font-size: 1.8rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #667eea;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    
    th {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 15px;
      text-align: left;
      font-weight: 600;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    
    td {
      padding: 12px 15px;
      border-bottom: 1px solid #e9ecef;
      color: #333;
    }
    
    tr:hover {
      background: #f8f9fa;
    }
    
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .badge-patient {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    .badge-doctor {
      background: #f3e5f5;
      color: #7b1fa2;
    }
    
    .badge-admin {
      background: #ffebee;
      color: #c62828;
    }
    
    .badge-success {
      background: #e8f5e9;
      color: #2e7d32;
    }
    
    .review-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 15px;
      border-left: 4px solid #667eea;
    }
    
    .review-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .review-name {
      font-weight: 600;
      color: #333;
    }
    
    .review-time {
      color: #999;
      font-size: 0.9rem;
    }
    
    .review-message {
      color: #555;
      line-height: 1.6;
    }
    
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #999;
    }
    
    .medicine-card {
      display: grid;
      grid-template-columns: 100px 1fr auto;
      gap: 20px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      margin-bottom: 15px;
      align-items: center;
    }
    
    .medicine-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
    }
    
    .medicine-info h4 {
      color: #333;
      margin-bottom: 5px;
    }
    
    .medicine-info p {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 3px;
    }
    
    .medicine-price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
    }
    
    .scroll-container {
      max-height: 600px;
      overflow-y: auto;
    }
    
    .scroll-container::-webkit-scrollbar {
      width: 8px;
    }
    
    .scroll-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    
    .scroll-container::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 10px;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 10px;
      }
      
      .header h1 {
        font-size: 1.8rem;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .medicine-card {
        grid-template-columns: 80px 1fr;
      }
      
      .medicine-price {
        grid-column: 2;
        text-align: right;
        margin-top: 10px;
      }
      
      table {
        font-size: 0.85rem;
        display: block;
        overflow-x: auto;
      }
      
      th, td {
        padding: 10px 8px;
        white-space: nowrap;
      }
      
      .section {
        padding: 20px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏥 Hospital Management System</h1>
      <p>Complete Database Overview</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${totalUsers}</div>
        <div class="stat-label">Total Users</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${totalMedicines}</div>
        <div class="stat-label">Medicines</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${totalReviews}</div>
        <div class="stat-label">Reviews</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${loggedInUser}</div>
        <div class="stat-label">Current User</div>
      </div>
    </div>
    
    <!-- USERS SECTION -->
    <div class="section">
      <h2>👥 All Users (${totalUsers})</h2>
      <div class="scroll-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Cart Items</th>
              <th>Appointments</th>
            </tr>
          </thead>
          <tbody>
            ${usersData.users.map(user => `
              <tr>
                <td>${user.ID}</td>
                <td>${user.name}</td>
                <td><strong>${user.username}</strong></td>
                <td>${user.email}</td>
                <td><span class="badge badge-${user.Designation?.toLowerCase() || 'patient'}">${user.Designation || 'Patient'}</span></td>
                <td>${user.cart?.length || 0}</td>
                <td>${user.appointments?.length || 0}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- MEDICINES SECTION -->
    <div class="section">
      <h2>💊 All Medicines (${totalMedicines})</h2>
      <div class="scroll-container">
        ${medicinesData.medicines?.length > 0 ? medicinesData.medicines.map(med => `
          <div class="medicine-card">
            <img src="${med.image}" alt="${med.name}" class="medicine-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27%3E%3Crect fill=%27%23ddd%27 width=%27100%27 height=%27100%27/%3E%3Ctext fill=%27%23999%27 x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dy=%27.3em%27%3ENo Image%3C/text%3E%3C/svg%3E'">
            <div class="medicine-info">
              <h4>${med.name}</h4>
              <p>${med.description}</p>
              <p><strong>Category:</strong> ${med.category || 'General'}</p>
            </div>
            <div class="medicine-price">$${med.price?.toFixed(2) || '0.00'}</div>
          </div>
        `).join('') : '<div class="empty-state">No medicines available</div>'}
      </div>
    </div>
    
    <!-- REVIEWS SECTION -->
    <div class="section">
      <h2>⭐ All Reviews (${totalReviews})</h2>
      <div class="scroll-container">
        ${reviewsData.length > 0 ? reviewsData.map(review => `
          <div class="review-card">
            <div class="review-header">
              <span class="review-name">${review.name}</span>
              <span class="review-time">${review.time}</span>
            </div>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 8px;">${review.email}</p>
            <div class="review-message">${review.message}</div>
          </div>
        `).join('') : '<div class="empty-state">No reviews yet</div>'}
      </div>
    </div>
    
    <!-- SEARCH DATA SECTION -->
    <div class="section">
      <h2>🔍 Search Items (${totalSearchItems})</h2>
      <div class="scroll-container">
        <table>
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Description</th>
              <th>Category</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            ${searchData.map(item => `
              <tr>
                <td><strong>${item.keyword}</strong></td>
                <td>${item.description || '-'}</td>
                <td><span class="badge badge-success">${item.category || 'General'}</span></td>
                <td><a href="${item.link}" style="color: #667eea; text-decoration: none;" target="_blank">View →</a></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- SYSTEM INFO -->
    <div class="section">
      <h2>ℹ️ System Information</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>Currently Logged In</strong></td>
            <td>${loggedInUser}</td>
          </tr>
          <tr>
            <td><strong>Users with Items in Cart</strong></td>
            <td>${usersWithCarts}</td>
          </tr>
          <tr>
            <td><strong>Users with Appointments</strong></td>
            <td>${usersWithAppointments}</td>
          </tr>
          <tr>
            <td><strong>Server Status</strong></td>
            <td><span class="badge badge-success">Running</span></td>
          </tr>
          <tr>
            <td><strong>Last Updated</strong></td>
            <td>${new Date().toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
    `;

    res.send(html);
  } catch (err) {
    console.error("Error in /data endpoint:", err);
    res.status(500).send(`
      <html>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1 style="color: #dc3545;">❌ Error Loading Data</h1>
          <p style="color: #666;">${err.message}</p>
        </body>
      </html>
    `);
  }
});

// ====== Users ======
app.get("/usersnum", (req, res) => {
  const data = readDB();
  res.send({ success: true, users: data.users });
});

app.get("/users", (req, res) => {
  try {
    const data = readDB();
    res.send({ success: true, users: data.users });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: "Error reading users" });
  }
});

// ====== Login Status ======
app.get("/login-status", (req, res) => {
  const data = readDB();
  if (Current_User_Index !== null && data.users[Current_User_Index]) {
    res.json({ login: 1, user: data.users[Current_User_Index] });
  } else {
    res.json({ login: 0 });
  }
});

// ====== Signup ======
app.post("/signup", (req, res) => {
  try {
    let data = readDB();
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    if (data.users.some(u => u.username === username)) {
      return res.json({ success: false, message: "User already exists!" });
    }

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
    writeDB(data);

    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ====== Login ======
app.post("/login", (req, res) => {
  try {
    let data = readDB();
    const { username, password } = req.body;
    const userIndex = data.users.findIndex(u => u.username === username);

    if (userIndex === -1) return res.json({ success: false, message: "User not found!" });
    if (data.users[userIndex].password !== password)
      return res.json({ success: false, message: "Wrong password!" });

    Current_User_Index = userIndex;
    res.json({ success: true, message: "Login successful!", user: data.users[userIndex] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ====== Logout ======
app.post("/logout", (req, res) => {
  Current_User_Index = null;
  res.json({ success: true, message: "Logged out successfully" });
});

// ====== Current User ======
app.get("/currentUser", (req, res) => {
  const data = readDB();
  if (Current_User_Index !== null && data.users[Current_User_Index]) {
    res.json({ success: true, user: data.users[Current_User_Index] });
  } else {
    res.json({ success: false, message: "No user logged in" });
  }
});

// ====== User Data Endpoints ======
function getUserData(key) {
  const data = readDB();
  if (Current_User_Index !== null && data.users[Current_User_Index]) {
    return data.users[Current_User_Index][key] || [];
  }
  return [];
}

app.get("/appointments", (req, res) => res.json({ success: true, appointments: getUserData("appointments") }));
app.get("/prescriptions", (req, res) => res.json({ success: true, prescriptions: getUserData("prescriptions") }));
app.get("/orders", (req, res) => res.json({ success: true, orders: getUserData("orders") }));
app.get("/reports", (req, res) => res.json({ success: true, reports: getUserData("reports") }));

// ====== Update User Profile ======
app.put("/updateUser", (req, res) => {
  const { username, name, email, phone, dob, bloodGroup, address } = req.body;
  const data = readDB();
  const userIndex = data.users.findIndex(u => u.username === username);

  if (userIndex !== -1) {
    data.users[userIndex] = { ...data.users[userIndex], name, email, phone, dob, bloodGroup, address };
    writeDB(data);
    res.json({ success: true, message: "User updated!", user: data.users[userIndex] });
  } else {
    res.json({ success: false, message: "User not found!" });
  }
});

// ====== Change Password ======
app.put("/changePassword", (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  const data = readDB();
  const userIndex = data.users.findIndex(u => u.username === username);

  if (userIndex === -1) return res.json({ success: false, message: "User not found!" });
  if (data.users[userIndex].password !== currentPassword) return res.json({ success: false, message: "Current password incorrect" });

  data.users[userIndex].password = newPassword;
  writeDB(data);
  res.json({ success: true, message: "Password changed successfully!" });
});

// ====== Reviews ======
app.post("/saveReview", (req, res) => {
  const newReview = { ...req.body, time: new Date().toLocaleString() };

  fs.readFile(reviewFilePath, "utf8", (err, data) => {
    const reviews = data ? JSON.parse(data) : [];
    reviews.push(newReview);

    fs.writeFile(reviewFilePath, JSON.stringify(reviews, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving review");
      res.send("✅ Review saved successfully!");
    });
  });
});

app.get("/reviews", (req, res) => {
  fs.readFile(reviewFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading reviews.");
    const reviews = data ? JSON.parse(data) : [];

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
          ${reviews.length === 0 ? "<p>No reviews yet.</p>" : ""}
          ${reviews.map(r => `
            <div class="review">
              <p><strong>Name:</strong> ${r.name}</p>
              <p><strong>Email:</strong> ${r.email}</p>
              <p><strong>Message:</strong> ${r.message}</p>
              <p class="time"><strong>Time:</strong> ${r.time}</p>
            </div>
          `).join("")}
        </body>
      </html>
    `;
    res.send(html);
  });
});

// ====== Search ======
app.get("/searchItems", (req, res) => {
  fs.readFile(searchFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ success: false, message: "Failed to load search data" });
    try {
      const json = JSON.parse(data);
      res.json({ success: true, searchItems: json.searchItems || [] });
    } catch {
      res.status(500).json({ success: false, message: "Invalid JSON format" });
    }
  });
});

// ====== Medicines ======
app.get("/medicines", (req, res) => {
  const data = readMedicines();
  res.json({ success: true, medicines: data.medicines || [] });
});

app.get("/medicines/:id", (req, res) => {
  const data = readMedicines();
  const medicine = data.medicines.find(m => m.id === parseInt(req.params.id));
  if (medicine) res.json({ success: true, medicine });
  else res.status(404).json({ success: false, message: "Medicine not found" });
});

// ====== CART ======
app.post("/cart/add", (req, res) => {
  if (Current_User_Index === null) return res.status(401).json({ success: false, message: "Login first!" });

  const { medicineId, quantity = 1 } = req.body;
  const data = readDB();
  const cart = data.users[Current_User_Index].cart || [];

  const existing = cart.find(item => item.medicineId === medicineId);
  if (existing) existing.quantity += quantity;
  else cart.push({ medicineId, quantity, addedAt: new Date().toISOString() });

  data.users[Current_User_Index].cart = cart;
  writeDB(data);

  res.json({ success: true, message: "Added to cart", cart });
});

app.get("/cart", (req, res) => {
  if (Current_User_Index === null) return res.status(401).json({ success: false, message: "Login first!" });

  const data = readDB();
  const cart = data.users[Current_User_Index].cart || [];
  const medicines = readMedicines().medicines || [];

  const cartWithDetails = cart.map(item => ({
    ...item,
    medicine: medicines.find(m => m.id === item.medicineId)
  }));

  res.json({ success: true, cart: cartWithDetails });
});

app.delete("/cart/remove/:medicineId", (req, res) => {
  if (Current_User_Index === null) return res.status(401).json({ success: false, message: "Login first!" });

  const data = readDB();
  const medicineId = parseInt(req.params.medicineId);
  const cart = data.users[Current_User_Index].cart || [];

  data.users[Current_User_Index].cart = cart.filter(item => item.medicineId !== medicineId);
  writeDB(data);

  res.json({ success: true, message: "Removed from cart", cart: data.users[Current_User_Index].cart });
});

// ====== Start Server ======
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));