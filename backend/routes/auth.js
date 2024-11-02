import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // console.log('Received registration request for username:', username); // Debug log
  try {
    let user = await User.findOne({ username });
    if (user) {
      // console.log('User already exists'); // Debug log
      return res.status(400).json({ msg: "Username already exists" });
    }

    user = new User({ username, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: "Registration successful" });
      },
    );
  } catch (err) {
    console.error("Error during registration:", err.message); // Detailed error log
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ msg: "Wrong username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Wrong username or password" });

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: `You are now logged in as ${username}` });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users); // Log users to the console
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
