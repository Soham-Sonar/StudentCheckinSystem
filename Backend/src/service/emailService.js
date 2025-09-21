const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendAttendanceWarning(student, attendancePercentage) {
  const msg = {
    to: student.email,
    from: "sohamsonar11@gmail.com", // Replace with your verified sender
    subject: "Attendance Warning",
    text: `Hi ${student.name},\n\nYour attendance in the last 30 days is ${attendancePercentage}%. Please attend classes regularly.`,
  };

  try {
    await sgMail.send(msg);
    return { email: student.email, status: "Sent" };
  } catch (err) {
    return { email: student.email, status: "Failed", error: err.response?.body || err.message };
  }
}

module.exports = { sendAttendanceWarning };
