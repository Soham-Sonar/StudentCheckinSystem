const express = require("express");
const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add student
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, studentId, pincode, district, state, country } = req.body;
    const existing = await Student.findOne({ studentId });
    if (existing) return res.status(400).json({ error: "Student ID must be unique" });

    const student = new Student({ name, email, studentId, pincode, district, state, country });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
router.get("/", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get detailed attendance for one student
const Checkin = require("../models/Checkin");

// Get detailed attendance for one student (by ID or name)
router.get("/:query/attendance", authMiddleware, async (req, res) => {
  try {
    const { query } = req.params; // can be ID or name

    const student = await Student.findOne({
      $or: [
        { studentId: query },
        { name: { $regex: new RegExp(query, "i") } } // case-insensitive match
      ]
    });

    if (!student) return res.status(404).json({ error: "Student not found" });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const checkins = await Checkin.find({
      studentId: student.studentId,
      timestamp: { $gte: thirtyDaysAgo }
    }).sort({ timestamp: -1 });

    const totalCheckins = checkins.length;
    const lastCheckin = totalCheckins > 0 ? checkins[0].timestamp : null;
    const attendancePercentage = Math.round((totalCheckins / 30) * 100);

    res.json({
      studentId: student.studentId,
      name: student.name,
      checkins: checkins.map(c => c.timestamp),
      totalCheckins,
      lastCheckin,
      attendancePercentage,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
