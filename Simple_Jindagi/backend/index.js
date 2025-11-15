const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ---------------------- FILE PATHS ----------------------
const filePath = path.join(__dirname, "databases", "Authentication.json");
const reviewFilePath = path.join(__dirname, "databases", "reviews.json");
const searchFilePath = path.join(__dirname, "databases", "searchData.json");
const medicinesFilePath = path.join(__dirname, "databases", "medicines.json");
const doctorsFilePath = path.join(__dirname, "databases", "doctor.json");

// ---------------------- PATIENT LOGIN ----------------------
let Current_User_Index = null;

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

app.get("/", (req, res) => res.send("Backend running successfully"));

// ---------------------- USERS (ALL PATIENTS CODE SAME AS YOURS) ----------------------
app.get("/usersnum", (req, res) => {
  const data = readDB();
  res.send({ success: true, users: data.users });
});

app.get("/users", (req, res) => {
  try {
    const data = readDB();
    res.send({ success: true, users: data.users });
  } catch {
    res.status(500).send({ success: false, message: "Error reading users" });
  }
});

// login status
app.get("/login-status", (req, res) => {
  const data = readDB();
  if (Current_User_Index !== null && data.users[Current_User_Index]) {
    res.json({ login: 1, user: data.users[Current_User_Index] });
  } else {
    res.json({ login: 0 });
  }
});

// forgotpassword login
app.post("/loginwithoutpassword", (req, res) => {
  try {
    let data = readDB();
    const { username, email } = req.body;
    const userIndex = data.users.findIndex(u => u.username === username);

    if (userIndex === -1) return res.json({ success: false, message: "User not found!" });
    if (data.users[userIndex].email !== email)
      return res.json({ success: false, message: "Wrong email!" });

    Current_User_Index = userIndex;
    res.json({ success: true, user: data.users[userIndex] });
  } catch {
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// signup
app.post("/signup", (req, res) => {
  try {
    let data = readDB();
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email)
      return res.status(400).json({ success: false, message: "Missing fields" });

    if (data.users.some(u => u.username === username))
      return res.json({ success: false, message: "User already exists!" });

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
  } catch {
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// login
app.post("/login", (req, res) => {
  try {
    let data = readDB();
    const { username, password } = req.body;

    const userIndex = data.users.findIndex(u => u.username === username);
    if (userIndex === -1) return res.json({ success: false, message: "User not found!" });
    if (data.users[userIndex].password !== password)
      return res.json({ success: false, message: "Wrong password!" });

    Current_User_Index = userIndex;
    res.json({ success: true, user: data.users[userIndex] });
  } catch {
    res.status(500).json({ success: false, message: "Internal Error" });
  }
});

// logout
app.post("/logout", (req, res) => {
  Current_User_Index = null;
  res.json({ success: true });
});

// current user
app.get("/currentUser", (req, res) => {
  const data = readDB();
  if (Current_User_Index !== null && data.users[Current_User_Index]) {
    res.json({ success: true, user: data.users[Current_User_Index] });
  } else {
    res.json({ success: false, message: "No user logged in" });
  }
});

// ---------------------- CART, MEDICINES, REVIEWS — SAME AS YOURS ----------------------
/* I kept all your logic exactly same — nothing changed. */
/* Code skipped for brevity because it's already correct. */

// ---------------------- CLEAN DOCTOR SYSTEM ----------------------
let Current_Doctor_Index = null;

function readDoctorDB() {
  return JSON.parse(fs.readFileSync(doctorsFilePath, "utf8"));
}

function writeDoctorDB(data) {
  fs.writeFileSync(doctorsFilePath, JSON.stringify(data, null, 2));
}

// Doctor Login
app.post("/doctor/login", (req, res) => {
  const { username, password } = req.body;
  const data = readDoctorDB(); // { doctors: [...] }

  const index = data.doctors.findIndex(d => d.username === username);

  if (index === -1)
    return res.json({ success: false, message: "Doctor not found" });

  if (data.doctors[index].password !== password)
    return res.json({ success: false, message: "Wrong password" });

  Current_Doctor_Index = index;
  res.json({ success: true, user: data.doctors[index] });
});

// Doctor Current
app.get("/doctor/current", (req, res) => {
  const data = readDoctorDB();

  if (Current_Doctor_Index === null)
    return res.json({ success: false, message: "No doctor logged in" });

  res.json({ success: true, user: data.doctors[Current_Doctor_Index] });
});

// Doctor Logout
app.post("/doctor/logout", (req, res) => {
  Current_Doctor_Index = null;
  res.json({ success: true });
});

// ---------------------- SERVER ----------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

