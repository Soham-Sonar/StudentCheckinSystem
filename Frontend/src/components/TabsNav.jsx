import React from 'react';

export default function TabsNav({ activeTab, setActiveTab, handleLogout }) {
  const tabs = ['Add Student', 'Check-In', 'Attendance', 'Student Details'];
  return (
    <nav className="bg-gray-800 flex justify-between items-center px-6 py-4">
      <div className="flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-3 border-b-2 ${
              activeTab === tab
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent hover:text-purple-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
      >
        Logout
      </button>
    </nav>
  );
}
