import React, { useState } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  FiSearch,
  FiUser,
  FiCalendar,
  FiAlertTriangle,
  FiStar,
  FiEye,
  FiPhone,
} from "react-icons/fi";

function BehaviourReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Sample data
  const classes = ["8th", "9th", "10th", "11th", "12th"];
  const sections = ["A", "B", "C", "D"];

  const students = [
    {
      id: 1,
      rollNo: "101",
      name: "Alice Johnson",
      class: "8th",
      section: "A",
      behaviorRecords: [
        {
          date: "2023-11-10",
          type: "Positive",
          title: "Helped classmates",
          description: "Volunteered to help peers with math problems",
          recordedBy: "Mr. Smith",
        },
        {
          date: "2023-11-05",
          type: "Negative",
          title: "Late submission",
          description: "Failed to submit science project on time",
          recordedBy: "Ms. Patel",
        },
      ],
    },
    {
      id: 2,
      rollNo: "102",
      name: "Bob Wilson",
      class: "9th",
      section: "B",
      behaviorRecords: [
        {
          date: "2023-11-12",
          type: "Positive",
          title: "Excellent participation",
          description: "Active participation in class discussions",
          recordedBy: "Ms. Gupta",
        },
      ],
    },
    // More sample students...
  ];

  // Filter students based on search criteria
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    const matchesSection =
      !selectedSection || student.section === selectedSection;
    return matchesSearch && matchesClass && matchesSection;
  });

  // Filter behavior records by date range
  const filterBehaviorRecords = (records) => {
    if (!dateRange.start && !dateRange.end) return records;
    return records.filter((record) => {
      const recordDate = new Date(record.date);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      return (
        (!startDate || recordDate >= startDate) &&
        (!endDate || recordDate <= endDate)
      );
    });
  };

  // Open modal with student behavior details
  const openBehaviorModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Behavior Reports
          </h1>
          <p className="text-gray-500">
            Track and manage student behavior records
          </p>
        </header>

        {/* Search and Filter */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
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

            <div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Classes</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Sections</option>
                {sections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="date"
                placeholder="Start date"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
            </div>

            <div>
              <input
                type="date"
                placeholder="End date"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const filteredRecords = filterBehaviorRecords(
                student.behaviorRecords
              );
              const positiveCount = filteredRecords.filter(
                (r) => r.type === "Positive"
              ).length;
              const negativeCount = filteredRecords.filter(
                (r) => r.type === "Negative"
              ).length;

              return (
                <div
                  key={student.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <FiUser className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {student.name}
                      </h3>
                      <p className="text-gray-500">
                        {student.class}-{student.section} | Roll No:{" "}
                        {student.rollNo}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-md bg-green-50 p-3 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <FiStar className="h-5 w-5" />
                      </div>
                      <p className="mt-1 text-sm font-medium text-green-800">
                        Positive
                      </p>
                      <p className="text-xl font-bold text-green-900">
                        {positiveCount}
                      </p>
                    </div>

                    <div className="rounded-md bg-red-50 p-3 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <FiAlertTriangle className="h-5 w-5" />
                      </div>
                      <p className="mt-1 text-sm font-medium text-red-800">
                        Negative
                      </p>
                      <p className="text-xl font-bold text-red-900">
                        {negativeCount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => openBehaviorModal(student)}
                      disabled={filteredRecords.length === 0}
                      className={`flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
                        filteredRecords.length === 0
                          ? "cursor-not-allowed bg-gray-100 text-gray-400"
                          : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      <FiEye className="mr-2" />
                      View Records ({filteredRecords.length})
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-gray-500">
                No students found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Behavior Details Modal */}
        {isModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 bg-gray-500 opacity-75"
                  onClick={() => setIsModalOpen(false)}
                ></div>
              </div>

              {/* Modal content */}
              <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FiUser className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        {selectedStudent.name}'s Behavior Records
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {selectedStudent.class}-{selectedStudent.section} |
                          Roll No: {selectedStudent.rollNo}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Behavior Records List */}
                  <div className="mt-6 space-y-4">
                    {filterBehaviorRecords(selectedStudent.behaviorRecords)
                      .length > 0 ? (
                      filterBehaviorRecords(
                        selectedStudent.behaviorRecords
                      ).map((record, index) => (
                        <div
                          key={index}
                          className={`rounded-md p-4 ${
                            record.type === "Positive"
                              ? "bg-green-50"
                              : "bg-red-50"
                          }`}
                        >
                          <div className="flex items-start">
                            <div
                              className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                                record.type === "Positive"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {record.type === "Positive" ? (
                                <FiStar className="h-4 w-4" />
                              ) : (
                                <FiAlertTriangle className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {record.title}
                                </h4>
                                <span className="text-xs text-gray-500">
                                  {new Date(record.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">
                                {record.description}
                              </p>
                              <p className="mt-2 text-xs text-gray-500">
                                Recorded by: {record.recordedBy}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-md bg-gray-50 p-4 text-center">
                        <p className="text-gray-500">
                          No behavior records found for selected date range
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BehaviourReports;
