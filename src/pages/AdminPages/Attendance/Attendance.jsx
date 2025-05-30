import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../../components/commonComponents/Sidebar";

import { Users, UserCheck, UserX, ChevronDown, ChevronUp } from "lucide-react";

const data = [
  { day: "Mon", present: 48, absent: 12 },
  { day: "Tue", present: 50, absent: 10 },
  { day: "Wed", present: 52, absent: 8 },
  { day: "Thu", present: 49, absent: 11 },
  { day: "Fri", present: 51, absent: 9 },
  { day: "Sat", present: 50, absent: 10 },
  { day: "Sun", present: 47, absent: 13 },
];

const absentStudents = [
  { id: "001", name: "John Doe", class: "10A", fine: "$20" },
  { id: "002", name: "Jane Smith", class: "9B", fine: "$15" },
  { id: "003", name: "Alice Johnson", class: "11C", fine: "$25" },
  { id: "004", name: "Bob Brown", class: "8D", fine: "$10" },
  { id: "005", name: "Charlie Davis", class: "7E", fine: "$5" },
];

const dummyStudents = [
  { id: "001", name: "John Doe", class: "10A", fine: "$20" },
  { id: "002", name: "Jane Smith", class: "9B", fine: "$15" },
  { id: "003", name: "Alice Johnson", class: "11C", fine: "$25" },
];

function Attendance() {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState({ id: "", name: "" });
  const [filteredStudents, setFilteredStudents] = useState([]);

  const handleSearch = () => {
    const results = dummyStudents.filter(
      (student) =>
        student.id.includes(searchQuery.id) ||
        student.name.toLowerCase().includes(searchQuery.name.toLowerCase())
    );
    setFilteredStudents(results);
  };

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="ie-na-header flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Attendance
            </h1>
          </header>

          {/* CTA Sections */}
          <div className="mt-6 flex justify-between gap-4">
            {/* Total Students */}
            <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
              <Users className="mb-2 h-8 w-8 text-blue-500" />
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Total Students
              </h2>
              <p className="text-2xl font-bold text-blue-500">60</p>
            </div>

            {/* Present Students */}
            <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
              <UserCheck className="mb-2 h-8 w-8 text-green-500" />
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Present Students
              </h2>
              <p className="text-2xl font-bold text-green-500">50</p>
            </div>

            {/* Absent Students */}
            <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
              <UserX className="mb-2 h-8 w-8 text-red-500" />
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Absent Students
              </h2>
              <p className="text-2xl font-bold text-red-500">10</p>
            </div>
          </div>

          {/* Absent Students List */}
          <div className="mt-8 flex flex-col gap-4">
            <div
              className={`relative w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                expanded ? "h-auto" : "h-32 overflow-hidden"
              }`}
              onClick={() => setExpanded(!expanded)}
            >
              <div className="absolute right-4 top-4 flex cursor-pointer items-center text-sm font-medium text-blue-500">
                {expanded
                  ? "Click to shrink to view less students"
                  : "Click to view more students"}
                {expanded ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </div>

              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Absent Students from Last Week
              </h2>
              <div className="grid grid-cols-4 gap-4 font-semibold text-gray-600">
                <div>ID</div>
                <div>Name</div>
                <div>Class</div>
                <div>Fine</div>
              </div>
              {absentStudents.map((student) => (
                <div key={student.id} className="border-b border-gray-200 py-2">
                  <div className="grid grid-cols-4 items-center gap-3">
                    <div>{student.id}</div>
                    <div>{student.name}</div>
                    <div>{student.class}</div>
                    <div className="flex items-center justify-between">
                      <span>{student.fine}</span>
                      <button
                        className="ml-4 rounded bg-red-500 py-1 px-3 text-white hover:bg-red-600"
                        onClick={(e) => e.stopPropagation()} // Prevent bubbling
                      >
                        Stuck Off
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Edit Students */}
            <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-300">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Find and Edit Student Attendance
              </h2>
              <div className="mb-4 flex gap-4">
                <input
                  type="text"
                  placeholder="Enter Student ID"
                  className="w-1/2 rounded border border-gray-300 p-2"
                  value={searchQuery.id}
                  onChange={(e) =>
                    setSearchQuery({ ...searchQuery, id: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Student Name"
                  className="w-1/2 rounded border border-gray-300 p-2"
                  value={searchQuery.name}
                  onChange={(e) =>
                    setSearchQuery({ ...searchQuery, name: e.target.value })
                  }
                />
                <button
                  className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="mt-4 border-b  border-gray-200 py-2"
                >
                  <div className="grid grid-cols-4 items-center gap-3">
                    <div>{student.id}</div>
                    <div>{student.name}</div>
                    <div>{student.class}</div>
                    <div className="flex items-center justify-between">
                      <span>{student.fine}</span>
                      <div className="flex gap-2">
                        <button className="rounded bg-green-500 py-1 px-3 text-white hover:bg-green-600">
                          View Record
                        </button>
                        <button className="rounded bg-yellow-500 py-1 px-3 text-white hover:bg-yellow-600">
                          Edit Record
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Graph */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
            <h2 className="mb-4 text-center text-lg font-semibold text-gray-700">
              Last Week Attendance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#10B981"
                  name="Present"
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#EF4444"
                  name="Absent"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;
