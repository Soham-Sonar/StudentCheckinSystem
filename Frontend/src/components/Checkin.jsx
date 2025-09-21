import React from 'react';

export default function CheckIn({
  checkins,
  checkinStudentId,
  setCheckinStudentId,
  handleCheckin,
  formatDateTime
}) {
  const todayStr = new Date().toDateString();

  // Filter check-ins for today only
  const checkinsToday = checkins.filter(c => new Date(c.timestamp).toDateString() === todayStr);
  const totalCheckinsToday = checkinsToday.length;

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-purple-400 mb-4 text-center">Check-In</h2>

      <div className="flex justify-center mb-4">
        <span className="bg-gray-700 text-white px-4 py-2 rounded-full font-semibold shadow">
          Total Check-Ins Today: {totalCheckinsToday}
        </span>
      </div>

      <form
        onSubmit={handleCheckin}
        className="bg-gray-800 p-6 rounded-xl shadow flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <input
          type="text"
          placeholder="Enter Student ID"
          value={checkinStudentId}
          onChange={e => setCheckinStudentId(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
        >
          Check In
        </button>
      </form>

      <div className="overflow-x-auto mt-6 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-left">
          <thead className="bg-gray-900 sticky top-0">
            <tr>
              <th className="p-3 text-purple-300 uppercase text-sm">Name</th>
              <th className="p-3 text-purple-300 uppercase text-sm">ID</th>
              <th className="p-3 text-purple-300 uppercase text-sm">Time</th>
            </tr>
          </thead>
          <tbody>
            {checkinsToday.length > 0 ? checkinsToday.map((c, idx) => (
              <tr key={c._id} className={`${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600 transition-colors duration-150`}>
                <td className="p-3 text-white font-medium">{c.studentName}</td>
                <td className="p-3 text-gray-200">{c.studentId}</td>
                <td className="p-3">
                  <span className="bg-gray-600 text-gray-100 px-2 py-1 rounded-md text-sm shadow-sm">
                    {formatDateTime(c.timestamp)}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-400 p-4">No check-ins today.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
