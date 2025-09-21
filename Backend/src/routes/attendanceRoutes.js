const express = require("express");
const Student = require("../models/Student");
const Checkin = require("../models/Checkin");
const authMiddleware = require("../middleware/authMiddleware");
const { sendAttendanceWarning } = require("../service/emailService");

const router = express.Router();

// Attendance stats for all students
router.get("/", authMiddleware, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const students = await Student.find();

    const results = await Promise.all(
      students.map(async (student) => {
        const checkins = await Checkin.find({
          studentId: student.studentId,
          timestamp: { $gte: thirtyDaysAgo },
        }).sort({ timestamp: -1 });

        const totalCheckins = checkins.length;
        const lastCheckin = totalCheckins > 0 ? checkins[0].timestamp : null;
        const attendancePercentage = Math.round((totalCheckins / 30) * 100);

        return {
          studentId: student.studentId,
          name: student.name,
          totalCheckins,
          lastCheckin,
          attendancePercentage,
        };
      })
    );

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Notify absent students (<50% attendance)
router.post("/notify-absent", authMiddleware, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const students = await Student.find();
    const absentStudents = [];

    for (const student of students) {
      const checkins = await Checkin.find({
        studentId: student.studentId,
        timestamp: { $gte: thirtyDaysAgo },
      });

      const attendancePercentage = Math.round((checkins.length / 30) * 100);
      if (attendancePercentage < 50) {
        absentStudents.push({ student, attendancePercentage });
      }
    }

    const emailResults = [];
    for (const { student, attendancePercentage } of absentStudents) {
      const result = await sendAttendanceWarning(student, attendancePercentage);
      emailResults.push(result);
    }

    res.json({ message: `Processed ${absentStudents.length} absent students`, results: emailResults });
  } catch (err) {
    res.status(500).json({ error: "Failed to process absent notifications" });
  }
});

module.exports = router;
