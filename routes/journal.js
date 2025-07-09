const express = require('express');
const Journal = require('../models/Journal');
const verifyToken = require('../middleware/authMiddleware');

const route = express();
route.use(express.json());

route.post("/", verifyToken, async (req, res) => {
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

route.get('/', verifyToken, async (req, res) => {
  try {
    const { search, sort, date } = req.query;

    const query = { userId: req.user.userId };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.createdAt = { $gte: start, $lt: end };
    }
    const sortOrder = sort === "asc" ? 1 : -1;
    const journals = await Journal.find(query).sort({ createdAt: sortOrder });
    res.status(200).json(journals);
  } catch (err) {
    console.error("GET journal error:", err);
    res.status(500).json({ error: "Failed to fetch journals" });
  }

});


//update the tasks
route.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const journalId = req.params.id;

    // Find the journal and make sure it belongs to the current user
    const journal = await Journal.findOne({
      _id: journalId,
      user: req.user.userId,
    });
    if (!journal) {
      return res
        .status(404)
        .json({ error: "Journal not found or unauthorized" });
    }

    // Update journal fields
    if (title) journal.title = title;
    if (content) journal.content = content;

    await journal.save();
    res.status(200).json({ message: "Journal updated successfully", journal });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update journal" });
  }
});


//Delete journal

route.delete('//:id', verifyToken, async (req, res) => {
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