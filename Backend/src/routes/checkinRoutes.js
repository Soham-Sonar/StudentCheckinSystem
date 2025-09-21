const express = require("express");
const Checkin = require("../models/Checkin");
const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Record check-in
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { studentId } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const checkin = new Checkin({ studentId });
    await checkin.save();
    res.status(201).json(checkin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all checkins
router.get("/", authMiddleware, async (req, res) => {
  try {
    const checkins = await Checkin.find().sort({ timestamp: -1 });
    const results = await Promise.all(
      checkins.map(async (c) => {
        const student = await Student.findOne({ studentId: c.studentId });
        return {
          _id: c._id,
          studentId: c.studentId,
          timestamp: c.timestamp,
          studentName: student ? student.name : "Unknown",
        };
      })
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
