const express = require('express');
const Journal = require('../models/Journal');
const verifyToken = require('../middleware/authMiddleware');

const router = express();
router.use(express.json());

router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const journal = new Journal({
            title,
            content,
            userId: req.user.userId
        });

        await journal.save();
        res.status(201).json({ message: "Journal created", journal });
    } catch (err) {
        console.error("Create journal error:", err);
        res.status(500).json({ error: "Failed to create journal" });
    }
});
//Get all the journals

router.get('/', verifyToken, async (req, res) => {
    try {
        const journals = await Journal.find({ userId: req.user.userId });
        res.status(200).json(journals);
  } catch (err) {
    console.error('Fetch journals error:', err);
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
});

module.exports = router;
