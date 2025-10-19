const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors"); 

const app = express();
app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, "databases" ,"Authentication.json");
const reviewFilePath = path.join(__dirname, "databases", "reviews.json");

// ===== Utility to read/write JSON =====
function readDB() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ===== Basic routes =====
app.get("/", (req, res) => res.send("Backend is running successfully 🚀"));

// ===== Users =====
app.get("/usersnum", (req, res) => {
  const data = readDB();
  res.send({ success: true, users: data.users });
});

app.get("/users", (req, res) => {
  try {
    const data = readDB();
    res.send({ success: true, users: data.users });
  } catch (err) {
    console.error("Error reading users:", err);
    res.status(500).send({ success: false, message: "Error reading users" });
  }
});

app.get("/login-status", (req, res) => {
    const data = readDB(); // your utility function to read JSON
    if (data.login === 1 && data.Current_User_Index !== undefined) {
        res.json({
            login: 1,
            user: data.users[data.Current_User_Index]
        });
    } else {
        res.json({ login: 0 });
    }
});

// ===== Signup =====
app.post("/signup", (req, res) => {
  try {
    let data = readDB();
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (data.users.some(u => u.username === username)) {
      return res.json({ success: false, message: "User already exists!" });
    }

    // Create new user with empty arrays
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
      reports: []
    };

    data.users.push(newUser);
    writeDB(data);

    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ===== Login =====
// Login
app.post("/login", (req, res) => {
  try {
    let data = readDB();
    const { username, password } = req.body;
    const userIndex = data.users.findIndex(u => u.username === username);

    if (userIndex === -1) return res.json({ success: false, message: "User not found!" });
    if (data.users[userIndex].password !== password)
      return res.json({ success: false, message: "Wrong password!" });

    data.Current_User_Index = userIndex;
    writeDB(data);
    res.json({ success: true, message: "Login successful!", user: data.users[userIndex] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ===== Logout =====
app.post("/logout", (req, res) => {
  try {
    let data = readDB();
    data.Current_User_Index = null;
    writeDB(data);
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
});
// ===== Current User =====
app.get("/currentUser", (req, res) => {
  try {
    const data = readDB();
    const idx = data.Current_User_Index;
    if (idx !== null && data.users[idx]) {
      return res.json({ success: true, user: data.users[idx] });
    }
    res.json({ success: false, message: "No user logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ===== User Data Endpoints =====
function getUserData(key) {
  const data = readDB();
  const idx = data.Current_User_Index;
  if (idx !== undefined && data.users[idx]) {
    return data.users[idx][key] || [];
  }
  return [];
}

app.get("/appointments", (req, res) => res.json({ success: true, appointments: getUserData("appointments") }));
app.get("/prescriptions", (req, res) => res.json({ success: true, prescriptions: getUserData("prescriptions") }));
app.get("/orders", (req, res) => res.json({ success: true, orders: getUserData("orders") }));
app.get("/reports", (req, res) => res.json({ success: true, reports: getUserData("reports") }));

// ===== Update User Profile =====
app.put("/updateUser", (req, res) => {
  const { username, name, email, phone, dob, bloodGroup, address } = req.body;
  const file = readDB();
  const userIndex = file.users.findIndex(u => u.username === username);

  if (userIndex !== -1) {
    file.users[userIndex] = { ...file.users[userIndex], name, email, phone, dob, bloodGroup, address };
    writeDB(file);
    res.json({ success: true, message: "User updated successfully!", user: file.users[userIndex] });
  } else {
    res.json({ success: false, message: "User not found!" });
  }
});

// ===== Change Password =====
app.put("/changePassword", (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  const file = readDB();
  const userIndex = file.users.findIndex(u => u.username === username);

  if (userIndex === -1) return res.json({ success: false, message: "User not found!" });
  if (file.users[userIndex].password !== currentPassword) {
    return res.json({ success: false, message: "Current password is incorrect" });
  }

  file.users[userIndex].password = newPassword;
  writeDB(file);

  res.json({ success: true, message: "Password changed successfully!" });
});

// ===== Reviews =====
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));