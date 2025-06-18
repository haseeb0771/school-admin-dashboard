import Sidebar from "../../components/commonComponents/Sidebar";
import React from "react";
import { FiSpeaker, FiCalendar } from "react-icons/fi";

const announcements = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "2025-06-20",
    content:
      "A parent-teacher meeting will be held on June 20, 2025, at 10:00 AM in the main hall.",
  },
  {
    id: 2,
    title: "Summer Vacation Notice",
    date: "2025-06-25",
    content:
      "School will remain closed from July 1 to August 10 for summer vacation.",
  },
  {
    id: 3,
    title: "Mid-Term Exams Schedule",
    date: "2025-06-30",
    content:
      "Mid-term exams will commence from July 15. Detailed timetable will be shared soon.",
  },
];

function StudentAnnouncements() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600">Track your child's academic progress</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center text-indigo-600">
                <FiSpeaker className="mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
              </div>
              <div className="mb-2 flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-1" />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentAnnouncements;
