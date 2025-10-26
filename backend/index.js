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

// ==// Add this to your server file, after your other routes

// ====== RAW DATA DISPLAY ENDPOINT ======
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

    // Build plain text response
    let output = '';
    
    // Header
    output += '═══════════════════════════════════════════════════════════════\n';
    output += '           HOSPITAL MANAGEMENT SYSTEM - DATABASE DUMP\n';
    output += '═══════════════════════════════════════════════════════════════\n';
    output += `Generated: ${new Date().toLocaleString()}\n`;
    output += `Current User: ${loggedInUser}\n`;
    output += '───────────────────────────────────────────────────────────────\n\n';

    // Statistics
    output += '【 SYSTEM STATISTICS 】\n\n';
    output += `  Total Users:        ${totalUsers}\n`;
    output += `  Total Medicines:    ${totalMedicines}\n`;
    output += `  Total Reviews:      ${totalReviews}\n`;
    output += `  Total Search Items: ${totalSearchItems}\n`;
    output += '\n═══════════════════════════════════════════════════════════════\n\n';

    // Users Section
    output += '【 ALL USERS 】\n\n';
    usersData.users.forEach((user, index) => {
      output += `─── USER #${index + 1} ─────────────────────────────────────────────\n`;
      output += `  ID:            ${user.ID}\n`;
      output += `  Name:          ${user.name}\n`;
      output += `  Username:      ${user.username}\n`;
      output += `  Email:         ${user.email}\n`;
      output += `  Password:      ${user.password}\n`;
      output += `  Designation:   ${user.Designation || 'Patient'}\n`;
      output += `  Phone:         ${user.phone || 'N/A'}\n`;
      output += `  DOB:           ${user.dob || 'N/A'}\n`;
      output += `  Blood Group:   ${user.bloodGroup || 'N/A'}\n`;
      output += `  Address:       ${user.address || 'N/A'}\n`;
      output += `  Cart Items:    ${user.cart?.length || 0}\n`;
      output += `  Appointments:  ${user.appointments?.length || 0}\n`;
      output += `  Prescriptions: ${user.prescriptions?.length || 0}\n`;
      output += `  Orders:        ${user.orders?.length || 0}\n`;
      output += `  Reports:       ${user.reports?.length || 0}\n`;
      
      if (user.cart && user.cart.length > 0) {
        output += `  \n  Cart Contents:\n`;
        user.cart.forEach((item, i) => {
          output += `    ${i + 1}. Medicine ID: ${item.medicineId}, Qty: ${item.quantity}, Added: ${item.addedAt}\n`;
        });
      }
      
      if (user.appointments && user.appointments.length > 0) {
        output += `  \n  Appointments:\n`;
        user.appointments.forEach((apt, i) => {
          output += `    ${i + 1}. ${JSON.stringify(apt)}\n`;
        });
      }
      
      output += '\n';
    });

    output += '═══════════════════════════════════════════════════════════════\n\n';

    // Medicines Section
    output += '【 ALL MEDICINES 】\n\n';
    if (medicinesData.medicines && medicinesData.medicines.length > 0) {
      medicinesData.medicines.forEach((med, index) => {
        output += `─── MEDICINE #${index + 1} ───────────────────────────────────────\n`;
        output += `  ID:          ${med.id}\n`;
        output += `  Name:        ${med.name}\n`;
        output += `  Description: ${med.description}\n`;
        output += `  Price:       $${med.price?.toFixed(2) || '0.00'}\n`;
        output += `  Category:    ${med.category || 'General'}\n`;
        output += `  Image:       ${med.image}\n`;
        output += '\n';
      });
    } else {
      output += '  No medicines found.\n\n';
    }

    output += '═══════════════════════════════════════════════════════════════\n\n';

    // Reviews Section
    output += '【 ALL REVIEWS 】\n\n';
    if (reviewsData.length > 0) {
      reviewsData.forEach((review, index) => {
        output += `─── REVIEW #${index + 1} ─────────────────────────────────────────\n`;
        output += `  Name:    ${review.name}\n`;
        output += `  Email:   ${review.email}\n`;
        output += `  Time:    ${review.time}\n`;
        output += `  Message: ${review.message}\n`;
        output += '\n';
      });
    } else {
      output += '  No reviews found.\n\n';
    }

    output += '═══════════════════════════════════════════════════════════════\n\n';

    // Search Items Section
    output += '【 SEARCH ITEMS 】\n\n';
    if (searchData.length > 0) {
      searchData.forEach((item, index) => {
        output += `─── SEARCH ITEM #${index + 1} ───────────────────────────────────\n`;
        output += `  Keyword:     ${item.keyword}\n`;
        output += `  Description: ${item.description || 'N/A'}\n`;
        output += `  Category:    ${item.category || 'General'}\n`;
        output += `  Icon:        ${item.icon || 'N/A'}\n`;
        output += `  Link:        ${item.link}\n`;
        output += '\n';
      });
    } else {
      output += '  No search items found.\n\n';
    }

    output += '═══════════════════════════════════════════════════════════════\n';
    output += '                         END OF DATA DUMP\n';
    output += '═══════════════════════════════════════════════════════════════\n';

    // Send as plain text
    res.set('Content-Type', 'text/plain; charset=utf-8');
    res.send(output);

  } catch (err) {
    console.error("Error in /data endpoint:", err);
    res.status(500).set('Content-Type', 'text/plain').send(
      '═══════════════════════════════════════════════\n' +
      '              ERROR LOADING DATA\n' +
      '═══════════════════════════════════════════════\n\n' +
      `Error: ${err.message}\n\n` +
      '═══════════════════════════════════════════════\n'
    );
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