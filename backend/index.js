// Import required modules
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors"); // allows frontend (like Netlify) to call backend

// Create express app
const app = express();
app.use(express.json());
app.use(cors());

// Path to your Authentication.json file (must be in the same folder)
const filePath = path.join(__dirname, "Authentication.json");

// ✅ Root route — just to check if backend is running
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// ✅ LOGIN route
app.post("/login", (req, res) => {
  let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const { username, password } = req.body;

  const userIndex = data.users.findIndex(u => u.username === username);
  console.log("idex: ")
  console.log(userIndex);

  if (userIndex === -1) {
    return res.send({ success: false, message: "User found" });
  }

  if (data.users[userIndex].password === password) {
    data.login = 1;
    data.Current_User_Index = userIndex; // track who logged in
    console.log("current user: ")
    console.log(data.Current_User_Index);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.send({ success: true, message: "Login successful!" });
  } else {
    return res.send({ success: false, message: "Wrong password!" });
  }
});


// // ✅ SIGNUP route (optional — for new users)
// app.post("/signup", (req, res) => {
//   let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
//   const { name, username, password, email } = req.body;

//   if (data.users.some(u => u.username === username)) {
//     return res.send({ success: false, message: "User already exists!" });
//   }

//   data.users.push({ name, username, password, email });
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

//   res.send({ success: true, message: "User registered successfully!" });
// });


// GET login status
app.get("/login-status", (req, res) => {
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json({ login: data.login });
});

// POST logout
app.post("/logout", (req, res) => {
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    data.login = 0;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.send({ success: true });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));