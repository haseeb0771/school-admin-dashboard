import React, { useState } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  FiSearch,
  FiUser,
  FiBook,
  FiCalendar,
  FiPhone,
  FiMail,
  FiHome,
  FiEye,
  FiAward,
} from "react-icons/fi";

function StudentProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      dob: "2010-05-15",
      address: "123 Main St, Cityville",
      phone: "+1 555-123-4567",
      email: "alice.j@school.edu",
      parents: [
        { name: "John Johnson", relation: "Father", phone: "+1 555-987-6543" },
        { name: "Mary Johnson", relation: "Mother", phone: "+1 555-456-7890" },
      ],
      attendance: "92%",
      performance: "A+",
      subjects: ["Mathematics", "Science", "English", "History"],
    },
    {
      id: 2,
      rollNo: "102",
      name: "Bob Smith",
      class: "9th",
      section: "B",
      dob: "2009-08-22",
      address: "456 Oak Ave, Townsville",
      phone: "+1 555-234-5678",
      email: "bob.s@school.edu",
      parents: [
        { name: "Robert Smith", relation: "Father", phone: "+1 555-876-5432" },
      ],
      attendance: "88%",
      performance: "B+",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
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

  // Open modal with student details
  const openStudentModal = (student) => {
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
            Student Profiles
          </h1>
          <p className="text-gray-500">Search and view student information</p>
        </header>

        {/* Search and Filter */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or roll no..."
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

            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Search
            </button>
          </div>
        </div>

        {/* Students List */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
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
                    <p className="text-gray-500">Roll No: {student.rollNo}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-500">
                    <FiBook className="mr-2 text-indigo-500" />
                    {student.class}-{student.section}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FiCalendar className="mr-2 text-indigo-500" />
                    Attendance: {student.attendance}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FiAward className="mr-2 text-indigo-500" />
                    Performance: {student.performance}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => openStudentModal(student)}
                    className="flex w-full items-center justify-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                  >
                    <FiEye className="mr-2" />
                    View Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-gray-500">
                No students found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Student Details Modal */}
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
                        {selectedStudent.name} - {selectedStudent.class}-
                        {selectedStudent.section}
                      </h3>
                      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Roll No:</span>{" "}
                            {selectedStudent.rollNo}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Date of Birth:</span>{" "}
                            {new Date(selectedStudent.dob).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Attendance:</span>{" "}
                            {selectedStudent.attendance}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Performance:</span>{" "}
                            {selectedStudent.performance}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            <FiPhone className="mr-1 inline text-indigo-500" />
                            {selectedStudent.phone}
                          </p>
                          <p className="text-sm text-gray-500">
                            <FiMail className="mr-1 inline text-indigo-500" />
                            {selectedStudent.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            <FiHome className="mr-1 inline text-indigo-500" />
                            {selectedStudent.address}
                          </p>
                        </div>
                      </div>

                      {/* Parents Information */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          Parents/Guardians
                        </h4>
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {selectedStudent.parents.map((parent, index) => (
                            <div
                              key={index}
                              className="rounded-md bg-gray-50 p-3"
                            >
                              <p className="text-sm font-medium text-gray-900">
                                {parent.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {parent.relation}
                              </p>
                              <p className="text-sm text-gray-500">
                                <FiPhone className="mr-1 inline text-indigo-500" />
                                {parent.phone}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Subjects */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          Subjects
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedStudent.subjects.map((subject, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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

export default StudentProfile;
