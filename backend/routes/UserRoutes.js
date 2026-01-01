const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const { generateToken, jwtAuthMiddleWare } = require("./../auth");
const Notes = require("../models/Notes");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.cookie("token", token, {
      httpOnly: true, // 🔐 not accessible via JS
      secure: true, // true in production (HTTPS)
      sameSite: "none", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log("Login attempt:", userName, password);
    const user = await User.findOne({ userName: userName });
    console.log("Login attempt:", userName, password);

    if (!user || !(await user.comparePassword(password))) {
      console.log(password, user);
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    res.cookie("token", token, {
      httpOnly: true, // 🔐 not accessible via JS
      secure: true, // true in production (HTTPS)
      sameSite: "none", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    console.log("Token is: ", token);
    res.status(200).json({ token: token, message: "login successfully" });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
});
router.get("/name", jwtAuthMiddleWare, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }
    const { password, ...userData } = user.toObject();
    res
      .status(200)
      .json({ message: "successfully fetched", response: userData });
  } catch (err) {
    res.status(500).json({ error: "Interal server error" });
    console.log(err);
  }
});
router.post("/notes", jwtAuthMiddleWare, async (req, res) => {
  try {
    const newNote = new Notes({
      ...req.body,
      user: req.user.id,
    });

    const savedNote = await newNote.save();
    res.status(201).json({ message: "Note created", response: savedNote });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/notes", jwtAuthMiddleWare, async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Notes.find({user:userId}).sort({date:-1});

    if (notes.length === 0) {
      return res.status(200).json({ message: "Empty", response:[] });
    }

    res.status(200).json({ message: "Fetched successfully", response: notes });
  } catch (err) {
    res.status(500).json({error:"Internal server error"})
  }
});

module.exports = router;
