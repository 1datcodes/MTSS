import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Content from "../models/content.js"; // Import the Content model
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const access = username === "sheth shilpan" ? "admin" : "user";

    user = new User({ username, password, access });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, access: user.access, msg: "Registration successful" });
      },
    );
  } catch (err) {
    console.error("Error during registration:", err.message);
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
        res.json({ token, access: user.access, msg: "Registration successful" });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Save content
router.post("/save-content", async (req, res) => {
  const { pageName, content } = req.body;
  try {
    let pageContent = await Content.findOne({ pageName });
    if (pageContent) {
      pageContent.content = content;
      await pageContent.save();
    } else {
      pageContent = new Content({ pageName, content });
      await pageContent.save();
    }
    res.json({ msg: "Content saved successfully" });
  } catch (err) {
    console.error("Error saving content:", err.message);
    res.status(500).send("Server error");
  }
});

// Get content
router.get("/get-content", async (req, res) => {
  const { pageName } = req.query;
  try {
    const pageContent = await Content.findOne({ pageName });
    if (pageContent) {
      res.json({ content: pageContent.content });
    } else {
      res.json({ content: "" });
    }
  } catch (err) {
    console.error("Error fetching content:", err.message);
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
