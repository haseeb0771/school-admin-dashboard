import React, { useState } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import { FiSearch, FiSave, FiUsers, FiBook, FiAward } from "react-icons/fi";

function ExamAndMarks() {
  // Selection states
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [totalMarks, setTotalMarks] = useState(100);

  // Sample data
  const classes = ["8th", "9th", "10th", "11th", "12th"];
  const sections = ["A", "B", "C", "D"];
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
  ];
  const topics = {
    Mathematics: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
    Science: ["Physics", "Chemistry", "Biology"],
    English: ["Literature", "Grammar", "Composition"],
    History: ["Ancient", "Medieval", "Modern"],
    Geography: ["Physical", "Human", "Environmental"],
  };

  // Sample students data
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", rollNo: "101", marks: "" },
    { id: 2, name: "Bob Smith", rollNo: "102", marks: "" },
    { id: 3, name: "Charlie Brown", rollNo: "103", marks: "" },
    { id: 4, name: "Diana Prince", rollNo: "104", marks: "" },
    { id: 5, name: "Ethan Hunt", rollNo: "105", marks: "" },
  ]);

  // Handle marks change
  const handleMarksChange = (id, value) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, marks: value } : student
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      topic: selectedTopic,
      totalMarks,
      marks: students,
    });
    alert("Marks saved successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Exam Marks Entry
          </h1>
          <p className="text-gray-500">Enter examination marks for students</p>
        </header>

        {/* Selection Form */}
        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-md">
          <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Class Selection */}
            <div>
              <label
                htmlFor="class"
                className="block text-sm font-medium text-gray-700"
              >
                Class
              </label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Selection */}
            <div>
              <label
                htmlFor="section"
                className="block text-sm font-medium text-gray-700"
              >
                Section
              </label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={!selectedClass}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Section</option>
                {sections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selection */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedSection}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Selection */}
            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700"
              >
                Topic
              </label>
              <select
                id="topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={!selectedSubject}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Topic</option>
                {selectedSubject &&
                  topics[selectedSubject]?.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
              </select>
            </div>

            {/* Total Marks */}
            <div className="sm:col-span-2">
              <label
                htmlFor="totalMarks"
                className="block text-sm font-medium text-gray-700"
              >
                Total Marks
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  <FiAward className="h-5 w-5" />
                </span>
                <input
                  type="number"
                  id="totalMarks"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter total marks"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Students Marks Entry */}
        {selectedTopic && (
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="flex items-center text-lg font-medium text-gray-900">
                <FiUsers className="mr-2 text-indigo-600" />
                Students List - {selectedClass}-{selectedSection}{" "}
                {selectedSubject}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Topic: {selectedTopic} | Total Marks: {totalMarks}
              </p>
            </div>

            {/* Marks Entry Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Roll No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Student Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Marks Obtained
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.rollNo}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {student.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <input
                          type="number"
                          value={student.marks}
                          onChange={(e) =>
                            handleMarksChange(student.id, e.target.value)
                          }
                          max={totalMarks}
                          className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter marks"
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {student.marks
                          ? ((student.marks / totalMarks) * 100).toFixed(2) +
                            "%"
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 px-6 py-4 text-right">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <FiSave className="mr-2" />
                Save Marks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamAndMarks;
