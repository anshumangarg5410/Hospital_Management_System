
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors"); 


const app = express();
app.use(express.json());
app.use(cors());


const filePath = path.join(__dirname, "databases" ,"Authentication.json");


app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.get("/users", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.send({ success: true, users: data.users });
  } catch (err) {
    console.error("Error reading users:", err);
    res.status(500).send({ success: false, message: "Error reading users" });
  }
});

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
    data.Current_User_Index = userIndex; 
    console.log("current user: ")
    console.log(data.Current_User_Index);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.send({ success: true, message: "Login successful!" });
  } else {
    return res.send({ success: false, message: "Wrong password!" });
  }
});



app.post("/signup", (req, res) => {
  let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const { name, username, password, email } = req.body;

  if (data.users.some(u => u.username === username)) {
    return res.send({ success: false, message: "User already exists!" });
  }

  data.users.push({ name, username, password, email });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.send({ success: true, message: "User registered successfully!" });
});



app.get("/login-status", (req, res) => {
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json({ login: data.login });
});


app.post("/logout", (req, res) => {
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    data.login = 0;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.send({ success: true });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
});
