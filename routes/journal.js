const express = require('express');
const Journal = require('../models/Journal');
const verifyToken = require('../middleware/authMiddleware');

const route = express();
route.use(express.json());

route.post("/journal", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const journal = new Journal({
      title,
      content,
      userId: req.user.userId,
    });

    await journal.save();
    res.status(201).json({ message: "Journal created", journal });
  } catch (err) {
    console.error("Create journal error:", err);
    res.status(500).json({ error: "Failed to create journal" });
  }
});
//Get all the journals

route.get("/journal", verifyToken, async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user.userId });
    res.status(200).json(journals);
  } catch (err) {
    console.error("Fetch journals error:", err);
    res.status(500).json({ error: "Failed to fetch journals" });
  }
});



//update the tasks
route.put('/journal/:id', verifyToken, async (req, res) => {
    try {
        const updated = await Journal.findByIdAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId,
            },
            req.body,
            { new: true }
        );
        if (!updated) {
            return res
                .status(404)
                .json({ error: "journal not found or an authorized update" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update journal" });
    }

});

//Delete journal

route.delete('/journal/:id', verifyToken, async (req, res) => {
    try {
        const deleted = await Journal.findByIdAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!deleted) {
            res.status(404).json({ error: 'journal not found or unauthorize delete' });
        }
    }
    catch (err) {
        console.error('delete error', err);
        res.status(404).json({ error: 'delete failed' });
    }
});


module.exports = route;