import React from 'react';

export default function Attendance({
  attendance,
  notifyAbsentStudents,
  notifyStatus,
  setNotifyStatus
}) {
  return (
    <section className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-purple-400 mb-4 text-center">
        Attendance Summary (Last 30 Days)
      </h2>

      <div className="mb-6 text-center">
        <p className="text-gray-500 mb-2 text-sm">
          Send an email alert to students regarding their absences or low attendance.
        </p>
        <button
          onClick={async () => {
            setNotifyStatus("loading");
            try {
              await notifyAbsentStudents();
              setNotifyStatus("success");
            } catch {
              setNotifyStatus("error");
            } finally {
              setTimeout(() => setNotifyStatus(null), 4000);
            }
          }}
          disabled={notifyStatus === "loading"}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-200 ${
            notifyStatus === "loading"
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-700 text-white"
          }`}
        >
          {notifyStatus === "loading" ? "Sending..." : "Notify Absent Students"}
        </button>

        {notifyStatus === "success" && <p className="text-green-400 mt-3">✅ Emails sent successfully!(Check Spam)</p>}
        {notifyStatus === "error" && <p className="text-red-400 mt-3">❌ Failed to send emails. Try again later.</p>}
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-gray-800 rounded-md">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Student ID</th>
              <th className="p-3 text-left">Total Check-Ins</th>
              <th className="p-3 text-left">Attendance %</th>
              <th className="p-3 text-left">Last Check-In</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? attendance.map((a, idx) => (
              <tr key={a.studentId} className={idx%2===0?"bg-gray-900":"bg-gray-800"}>
                <td className={`p-3 text-white ${a.attendancePercentage<50?'text-red-500 font-bold':''}`}>{a.name}</td>
                <td className={`p-3 text-white ${a.attendancePercentage<50?'text-red-500 font-bold':''}`}>{a.studentId}</td>
                <td className={`p-3 text-white ${a.attendancePercentage<50?'text-red-500 font-bold':''}`}>{a.totalCheckins}</td>
                <td className={`p-3 font-semibold ${
                  a.attendancePercentage>=80 ? 'text-green-400' :
                  a.attendancePercentage>=50 ? 'text-yellow-400' : 'text-red-500 font-bold'
                }`}>{a.attendancePercentage}%</td>
                <td className={`p-3 text-gray-300 ${a.attendancePercentage<50?'text-red-500 font-bold':''}`}>
                  {a.lastCheckin ? new Date(a.lastCheckin).toLocaleString() : "N/A"}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 p-4">No attendance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
