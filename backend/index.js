
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors"); 


const app = express();
app.use(express.json());
app.use(cors());


// const filePath = path.join(__dirname,"Authentication.json");
const filePath = path.join(__dirname, "databases" ,"Authentication.json");
const reviewFilePath = path.join(__dirname, "databases", "reviews.json");



app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.get("/usersnum", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.send({ success: true, users: data.users });
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
  try {
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const { username, password } = req.body;

    const userIndex = data.users.findIndex(u => u.username === username);

    if (userIndex === -1) {
      return res.json({ success: false, message: "User not found!" });
    }

    if (data.users[userIndex].password === password) {
      data.login = 1;
      data.Current_User_Index = userIndex;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return res.json({ success: true, message: "Login successful!" });
    } else {
      return res.json({ success: false, message: "Wrong password!" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



app.post("/signup", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const { name, username, password, email } = req.body;

    // Validate input
    if (!name || !username || !password || !email) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if user already exists
    if (data.users.some(u => u.username === username)) {
      return res.json({ success: false, message: "User already exists!" });
    }

    // Create new user with unique ID and Designation
    const newUser = {
      name,
      username,
      password,
      email,
      ID: data.users.length, // unique incremental ID
      Designation: "Patient"
    };

    data.users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ success: true, message: "User registered successfully!" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
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

app.post("/saveReview", (req, res) => {
  const newReview = { ...req.body, time: new Date().toLocaleString() };

  fs.readFile(reviewFilePath, "utf8", (err, data) => {
    const reviews = data ? JSON.parse(data) : [];
    reviews.push(newReview);

    fs.writeFile(reviewFilePath, JSON.stringify(reviews, null, 2), (err) => {
      if (err) {
        console.error("Error saving review:", err);
        return res.status(500).send("Error saving review");
      }
      res.send("✅ Review saved successfully!");
    });
  });
});

// Route to view all reviews in browser
app.get("/reviews", (req, res) => {
  const reviewFilePath = path.join(__dirname, "databases", "reviews.json");

  fs.readFile(reviewFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading reviews.");
    }

    const reviews = data ? JSON.parse(data) : [];

    // Create simple HTML to display reviews
    let html = `
      <html>
        <head>
          <title>All Reviews</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .review { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
            .time { font-size: 0.9em; color: gray; }
          </style>
        </head>
        <body>
          <h1>All Feedback / Reviews</h1>
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

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
});
