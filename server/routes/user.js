const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const validationinfo = require("../Middleware/ValidationInfo");
const jwtGenerator = require("../utils/jwtgenerator");
const jwt = require("jsonwebtoken");

router.post("/register", validationinfo, async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
      return res.status(400).send("Email, password, and name are required.");
    }
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      "INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [fname, lname, email, hashedPassword]
    );
    res.json({ status: true, message: "Registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
router.post("/login", validationinfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send("Email or password is incorrect");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).send("Email or password is incorrect");
    }

    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.jwtsecret);

    console.log(decoded.user);
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [
      decoded.user,
    ]);
    res.send({ user });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
