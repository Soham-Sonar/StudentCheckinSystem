const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  pincode: String,
  district: String,
  state: String,
  country: String,
});

module.exports = mongoose.model("Student", studentSchema);
