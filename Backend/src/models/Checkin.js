const mongoose = require("mongoose");

const checkinSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Checkin", checkinSchema);
