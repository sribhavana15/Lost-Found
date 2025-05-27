const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, "secret123", {
      expiresIn: "1h",
    });
  
    res.json({ message: "Login successful", token });
  };
  
