const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const route = express();
route.use(express.json());

//signup
route.post('/signup', async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(500).json({ error: 'user already exist' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, password: hashedPassword, email });
        await newUser.save();
        res.status(201).json({ message: 'signup sucessfully' });
    } catch (err) {
        console.error('signup error', err);
        res.status(401).json('signup failed');
    }
});

//Login route
route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid creadential' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid creadential' });
        }
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ message: 'login sucessfull', token: token });
    } catch (err) {
        console.error('login error', err);
        res.status(401).json({ error: 'login failed' });
    }
});

module.exports = route;

