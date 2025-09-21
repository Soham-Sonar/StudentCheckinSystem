# StudentCheckinSystem
# Student Check-In System

A full-stack web application to manage student attendance with secure login, automated data entry, daily check-ins, attendance tracking, and email notifications.

---

## Features

- Secure Login  
  Admins and students can sign in to access the system.
  
- Add Student  
  Add student details through a simple form.  
  Auto-fills city and country when pin code is entered using an API.

- Student Check-In  
  Check in students by entering their ID.  
  Displays today’s check-in list and total count.

- Attendance Management  
  Shows attendance history and percentage for each student.  
  Color-coded attendance:  
  - Green = Good attendance  
  - Yellow = Average  
  - Red = Low attendance  
  Includes a button to send email notifications if attendance drops below 50%.  
  Sends automated email directly to the student’s registered Gmail.

- Student Details  
  Search and view a student’s complete profile and attendance record.

---

## Tech Stack

- Frontend: React   
- Backend: Node.js + Express 
- Database: MongoDB 
- API: Pin code lookup for city and country  
- Email Service: SendGrid 

---


## Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/student-check-in-system.git
   cd student-check-in-system
