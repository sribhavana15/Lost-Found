const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const lostRoutes = require("./routes/lostRoutes");
const foundRoutes = require("./routes/foundRoutes");

const app = express();

//  Connect to MongoDB
connectDB();

//  Middleware
app.use(cors());
app.use(express.json());

//  API routes
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);

//  Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")));

//  Serve index.html on root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

//  (Optional) Serve other pages manually
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

app.get("/report", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "report.html"));
});

//  Start the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
