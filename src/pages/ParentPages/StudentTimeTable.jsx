import Sidebar from "../../components/commonComponents/Sidebar";
import React from "react";
import { FiClock } from "react-icons/fi";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const periods = [
  { time: "8:00 - 8:45", id: 1 },
  { time: "8:45 - 9:30", id: 2 },
  { time: "9:30 - 10:15", id: 3 },
  { time: "10:15 - 11:00", id: 4 },
  { time: "11:15 - 12:00", id: 5 },
  { time: "12:00 - 12:45", id: 6 },
  { time: "12:45 - 1:30", id: 7 },
];

const sampleTimetable = {
  Monday: [
    { subject: "Math", teacher: "Mr. Ali", room: "101" },
    { subject: "Science", teacher: "Ms. Zara", room: "Lab A" },
    { subject: "English", teacher: "Mrs. Rehman", room: "102" },
    { subject: "History", teacher: "Mr. Qasim", room: "103" },
    { subject: "Lunch", teacher: "", room: "" },
    { subject: "Computer", teacher: "Ms. Amina", room: "104" },
    { subject: "P.E.", teacher: "Coach Salman", room: "Field" },
  ],
  Tuesday: [
    { subject: "Biology", teacher: "Ms. Sana", room: "201" },
    { subject: "Physics", teacher: "Mr. Omar", room: "Lab B" },
    { subject: "Chemistry", teacher: "Dr. Khan", room: "Lab C" },
    { subject: "Lunch", teacher: "", room: "" },
    { subject: "Islamiat", teacher: "Ust. Farooq", room: "105" },
    { subject: "English", teacher: "Mrs. Rehman", room: "102" },
    { subject: "Art", teacher: "Ms. Maliha", room: "Art Room" },
  ],
  // ...fill out other days as needed
};

function StudentTimeTable() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600">Track your child's academic progress</p>
        </header>

        <div className="overflow-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Time
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="px-4 py-3 text-left text-xs font-medium uppercase"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {periods.map((period, i) => (
                <tr key={period.id}>
                  <td className="flex items-center px-4 py-3 font-medium text-indigo-700">
                    <FiClock className="mr-2" />
                    {period.time}
                  </td>
                  {days.map((day) => {
                    const slot = sampleTimetable[day]?.[i];
                    return (
                      <td key={day + i} className="px-4 py-3">
                        {slot ? (
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-800">
                              {slot.subject}
                            </div>
                            <div className="text-xs text-gray-500">
                              {slot.teacher}
                            </div>
                            <div className="text-xs text-gray-400">
                              {slot.room}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentTimeTable;
