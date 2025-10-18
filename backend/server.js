const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../"))); // serve your HTML/JS/CSS

// Path to reviews.json
const filePath = path.join(__dirname, "databases/reviews.json");

// Handle POST request from contact form
app.post("/saveReview", (req, res) => {
  const newReview = { ...req.body, time: new Date().toLocaleString() };

  // Read existing reviews
  fs.readFile(filePath, "utf8", (err, data) => {
    const reviews = data ? JSON.parse(data) : [];
    reviews.push(newReview);

    // Write updated reviews back to JSON
    fs.writeFile(filePath, JSON.stringify(reviews, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving review");
      res.send("Review saved successfully!");
    });
  });
});

// Start server
// starting command reach folder hms/backend
//then type node server rest work is done from here u can directly fill the form it will automatically save input in reviews.json


app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
