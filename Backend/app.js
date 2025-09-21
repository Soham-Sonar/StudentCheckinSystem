require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const checkinRoutes = require("./src/routes/checkinRoutes");
const attendanceRoutes = require("./src/routes/attendanceRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/checkins", checkinRoutes);
app.use("/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
