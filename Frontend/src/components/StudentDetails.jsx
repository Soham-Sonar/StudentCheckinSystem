import React from 'react';

export default function StudentDetails({
  selectedStudentId,
  setSelectedStudentId,
  studentDetails,
  fetchStudentDetails
}) {
  return (
    <section className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">Student Details</h2>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter student name or ID"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={() => fetchStudentDetails(selectedStudentId)}
          className="mt-3 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
        >
          Search
        </button>
      </div>

      {studentDetails && (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
          <h3 className="text-2xl font-semibold text-purple-300">
            {studentDetails.name} ({studentDetails.studentId})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-4 rounded-xl shadow-inner">
              <p className="text-gray-300 font-medium">Total Check-Ins</p>
              <p className="text-white text-xl font-bold">{studentDetails.totalCheckins}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl shadow-inner">
              <p className="text-gray-300 font-medium">Last Check-In</p>
              <p className="text-white text-xl font-bold">{studentDetails.lastCheckin ? new Date(studentDetails.lastCheckin).toLocaleString() : 'N/A'}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl shadow-inner">
              <p className="text-gray-300 font-medium">Attendance % (30 days)</p>
              <p className={`text-xl font-bold ${
                studentDetails.attendancePercentage>=80?'text-green-400':
                studentDetails.attendancePercentage>=50?'text-yellow-400':'text-red-500'
              }`}>{studentDetails.attendancePercentage}%</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-purple-300 text-lg font-semibold mb-2">Check-In History (Last 30 days)</h4>
            <div className="overflow-y-auto max-h-96 bg-gray-900 rounded-lg shadow-inner p-4 space-y-3">
              {studentDetails.checkins.length>0 ? Object.entries(
                studentDetails.checkins.reduce((acc, ts)=>{
                  const dateStr = new Date(ts).toLocaleDateString();
                  if(!acc[dateStr]) acc[dateStr]=[];
                  acc[dateStr].push(new Date(ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}));
                  return acc;
                }, {})
              ).map(([date, times])=>(
                <div key={date} className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-gray-400 font-medium mb-2">{date}</p>
                  <div className="flex flex-wrap gap-2">
                    {times.map((time, idx)=>(
                      <span key={idx} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">{time}</span>
                    ))}
                  </div>
                </div>
              )) : <p className="text-center text-gray-400">No check-ins in last 30 days</p>}
            </div>
          </div>
        </div>
      )}

      {!studentDetails && selectedStudentId && (
        <p className="text-red-500 text-center font-medium mt-2">No student found with that name or ID.</p>
      )}
    </section>
  );
}
