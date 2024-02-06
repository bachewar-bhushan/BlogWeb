const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'asdfghjkl1234qwertyu678990';

// route for create user: /api/createuser
router.post('/createuser', [
    body("username", "Enter a valid username").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
        min: 5,
    }),
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);

        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: secpass,
        });

        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).send("Internal Server Error");
    }
})

// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: "invalid Username or credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, JWT_SECRET);
        res.json({ token })

    } catch (errors) {
        console.error(errors);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;