import React, { useState } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  FiCalendar,
  FiClock,
  FiEdit2,
  FiPrinter,
  FiDownload,
  FiSearch,
} from "react-icons/fi";

function TimeTable() {
  const [selectedClass, setSelectedClass] = useState("8th");
  const [selectedSection, setSelectedSection] = useState("A");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const classes = ["8th", "9th", "10th", "11th", "12th"];
  const sections = ["A", "B", "C", "D"];

  // Days of the week
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Periods
  const periods = [
    { time: "8:00 - 8:45", id: 1 },
    { time: "8:45 - 9:30", id: 2 },
    { time: "9:30 - 10:15", id: 3 },
    { time: "10:15 - 11:00", id: 4 },
    { time: "11:15 - 12:00", id: 5 },
    { time: "12:00 - 12:45", id: 6 },
    { time: "12:45 - 1:30", id: 7 },
  ];

  // Sample timetable data
  const [timetable, setTimetable] = useState({
    "8th-A": {
      Monday: [
        { subject: "Mathematics", teacher: "Mr. Sharma", room: "Room 101" },
        { subject: "Science", teacher: "Ms. Patel", room: "Lab 1" },
        { subject: "English", teacher: "Mr. Johnson", room: "Room 102" },
        { subject: "History", teacher: "Ms. Gupta", room: "Room 103" },
        { subject: "Lunch", teacher: "", room: "" },
        { subject: "Geography", teacher: "Mr. Khan", room: "Room 104" },
        {
          subject: "Physical Education",
          teacher: "Coach Singh",
          room: "Field",
        },
      ],
      Tuesday: [
        // Similar structure for other days
      ],
      // ... other days
    },
    // ... other class sections
  });

  // Get current timetable based on selection
  const currentTimetable =
    timetable[`${selectedClass}-${selectedSection}`] || {};

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              School Timetable
            </h1>
            <p className="text-gray-500">View and manage class schedules</p>
          </div>

          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <button className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <FiEdit2 className="mr-2" />
              Edit
            </button>
            <button className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <FiPrinter className="mr-2" />
              Print
            </button>
            <button className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <FiDownload className="mr-2" />
              Download
            </button>
          </div>
        </header>

        {/* Class Selection and Search */}
        <div className="mb-6 flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex space-x-3">
            <div>
              <label htmlFor="class" className="sr-only">
                Class
              </label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="section" className="sr-only">
                Section
              </label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {sections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search subjects or teachers..."
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Timetable */}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Time/Day
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {periods.map((period) => (
                <tr key={period.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-indigo-600" />
                      {period.time}
                    </div>
                  </td>
                  {days.map((day) => {
                    const slot = currentTimetable[day]?.[period.id - 1] || {};
                    return (
                      <td
                        key={`${day}-${period.id}`}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        {slot.subject ? (
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">
                              {slot.subject}
                            </div>
                            <div>{slot.teacher}</div>
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

        {/* Timetable Summary */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Periods</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {periods.length * days.length}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">
              Teaching Hours
            </h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {periods.length * days.length * 45} mins
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Subjects</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">12</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Free Periods</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">4</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeTable;
