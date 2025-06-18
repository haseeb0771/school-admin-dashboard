import React, { useState, useEffect } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import ClassSelector from "../../components/TeacherComponents/ClassSelector";
import StudentAttendanceCard from "../../components/TeacherComponents/StudentAttendanceCard";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiCheck,
  FiX,
  FiSave,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import { format, isToday, parseISO } from "date-fns";

function MarkAttendance() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample data - in a real app, this would come from an API
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "8th Grade Math",
      time: "08:00 - 09:00",
      subject: "Mathematics",
    },
    {
      id: 2,
      name: "9th Grade Biology",
      time: "10:00 - 11:00",
      subject: "Biology",
    },
    {
      id: 3,
      name: "10th Grade History",
      time: "09:00 - 10:00",
      subject: "History",
    },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", rollNumber: "801", present: false },
    { id: 2, name: "Bob Smith", rollNumber: "802", present: true },
    { id: 3, name: "Charlie Brown", rollNumber: "803", present: false },
    { id: 4, name: "Diana Prince", rollNumber: "804", present: true },
    { id: 5, name: "Ethan Hunt", rollNumber: "805", present: false },
  ]);

  // Initialize attendance status
  useEffect(() => {
    const initialStatus = {};
    students.forEach((student) => {
      initialStatus[student.id] = student.present;
    });
    setAttendanceStatus(initialStatus);
  }, [students]);

  // Handle attendance toggle
  const toggleAttendance = (studentId) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // Submit attendance
  const handleSubmit = () => {
    setIsSubmitting(true);
    // In a real app, this would be an API call
    console.log("Submitting attendance for:", {
      class: selectedClass,
      date: selectedDate,
      attendance: attendanceStatus,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Attendance saved successfully!");
    }, 1000);
  };

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Mark Attendance
            </h1>
            <p className="text-gray-500">
              Record and manage student attendance
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <div className="flex items-center rounded-md bg-white px-3 py-2 shadow-sm">
              <FiCalendar className="mr-2 text-indigo-600" />
              <input
                type="date"
                className="border-none bg-transparent focus:ring-0"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Class Selection */}
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-medium text-gray-900">
            Select Class
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => (
              <ClassSelector
                key={cls.id}
                cls={cls}
                isSelected={selectedClass?.id === cls.id}
                onSelect={() => setSelectedClass(cls)}
              />
            ))}
          </div>
        </div>

        {selectedClass && (
          <>
            {/* Attendance Header */}
            <div className="mb-6 flex flex-col justify-between rounded-lg bg-indigo-50 p-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-indigo-800">
                  {selectedClass.name}
                </h2>
                <p className="text-indigo-600">
                  <FiClock className="mr-1 inline" />
                  {selectedClass.time} •{" "}
                  {format(parseISO(selectedDate), "EEEE, MMMM do")}
                </p>
              </div>

              <div className="mt-3 flex items-center md:mt-0">
                <div className="mr-4 flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-sm text-gray-700">
                    Present:{" "}
                    {Object.values(attendanceStatus).filter(Boolean).length}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 h-3 w-3 rounded-full bg-red-500"></span>
                  <span className="text-sm text-gray-700">
                    Absent:{" "}
                    {Object.values(attendanceStatus).filter((v) => !v).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="mb-4 flex flex-col justify-between md:flex-row md:items-center">
              <div className="relative mb-3 w-full md:mb-0 md:w-64">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex space-x-3">
                <button className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
                  <FiFilter className="mr-2" />
                  Filter
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  <FiSave className="mr-2" />
                  {isSubmitting ? "Saving..." : "Save Attendance"}
                </button>
              </div>
            </div>

            {/* Students List */}
            <div className="space-y-3">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <StudentAttendanceCard
                    key={student.id}
                    student={student}
                    isPresent={attendanceStatus[student.id]}
                    onToggle={() => toggleAttendance(student.id)}
                  />
                ))
              ) : (
                <div className="rounded-lg bg-gray-50 p-8 text-center">
                  <p className="text-gray-500">No students found</p>
                </div>
              )}
            </div>

            {/* Bulk Actions */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  const allPresent = {};
                  students.forEach((student) => {
                    allPresent[student.id] = true;
                  });
                  setAttendanceStatus(allPresent);
                }}
                className="rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-800 hover:bg-green-100"
              >
                Mark All Present
              </button>
              <button
                onClick={() => {
                  const allAbsent = {};
                  students.forEach((student) => {
                    allAbsent[student.id] = false;
                  });
                  setAttendanceStatus(allAbsent);
                }}
                className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-800 hover:bg-red-100"
              >
                Mark All Absent
              </button>
            </div>
          </>
        )}

        {!selectedClass && (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-gray-500">
              Please select a class to mark attendance
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarkAttendance;
