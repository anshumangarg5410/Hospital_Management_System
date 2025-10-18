// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const cors = require("cors");

// const app = express();

// // ✅ Middleware
// app.use(express.json());
// app.use(cors({ origin: "*" })); // Allow all origins (you can restrict later)
// app.use(express.static(path.join(__dirname, "../"))); // Serve frontend files

// // ✅ Path to reviews.json file
// const filePath = path.join(__dirname, "databases/reviews.json");

// // ✅ API route to save review
// app.post("/saveReview", (req, res) => {
//   const newReview = { ...req.body, time: new Date().toLocaleString() };

//   fs.readFile(filePath, "utf8", (err, data) => {
//     const reviews = data ? JSON.parse(data) : [];
//     reviews.push(newReview);

//     fs.writeFile(filePath, JSON.stringify(reviews, null, 2), (err) => {
//       if (err) return res.status(500).send("Error saving review");
//       res.send("Review saved successfully!");
//     });
//   });
// });

// // ✅ Start server
// app.listen(4000, () => console.log("✅ Server running at http://localhost:4000"));