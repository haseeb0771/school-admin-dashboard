import React from "react";
import { FiBook, FiAward, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import Sidebar from "../../components/commonComponents/Sidebar";

const examData = [
  {
    subject: "Mathematics",
    marksObtained: 88,
    totalMarks: 100,
    grade: "A",
  },
  {
    subject: "Science",
    marksObtained: 75,
    totalMarks: 100,
    grade: "B+",
  },
  {
    subject: "English",
    marksObtained: 92,
    totalMarks: 100,
    grade: "A+",
  },
  {
    subject: "History",
    marksObtained: 67,
    totalMarks: 100,
    grade: "C+",
  },
  {
    subject: "Computer Science",
    marksObtained: 95,
    totalMarks: 100,
    grade: "A+",
  },
];

const getGradeColor = (grade) => {
  switch (grade) {
    case "A+":
    case "A":
      return "text-green-600";
    case "B+":
    case "B":
      return "text-yellow-500";
    case "C+":
    case "C":
      return "text-orange-500";
    default:
      return "text-red-600";
  }
};

function StudentExamMarks() {
  const total = examData.reduce((acc, item) => acc + item.totalMarks, 0);
  const obtained = examData.reduce((acc, item) => acc + item.marksObtained, 0);
  const average = (obtained / total) * 100;
  const performanceTrend = average >= 75 ? "up" : "down";

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600">Track your child's academic progress</p>
        </header>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center gap-3">
              <FiBook className="text-xl text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500">Total Subjects</p>
                <h3 className="text-xl font-bold">{examData.length}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center gap-3">
              <FiAward className="text-xl text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Total Marks</p>
                <h3 className="text-xl font-bold">{total}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center gap-3">
              <FiAward className="text-xl text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Marks Obtained</p>
                <h3 className="text-xl font-bold">{obtained}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center gap-3">
              {performanceTrend === "up" ? (
                <FiTrendingUp className="text-xl text-green-500" />
              ) : (
                <FiTrendingDown className="text-xl text-red-500" />
              )}
              <div>
                <p className="text-sm text-gray-500">Overall Average</p>
                <h3 className="text-xl font-bold">{average.toFixed(2)}%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Marks Table */}
        <div className="mt-5 overflow-x-auto rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Marks Obtained</th>
                <th className="px-4 py-3 text-left">Total Marks</th>
                <th className="px-4 py-3 text-left">Progress</th>
                <th className="px-4 py-3 text-left">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {examData.map((item, idx) => {
                const progress = (item.marksObtained / item.totalMarks) * 100;
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {item.subject}
                    </td>
                    <td className="px-4 py-3">{item.marksObtained}</td>
                    <td className="px-4 py-3">{item.totalMarks}</td>
                    <td className="px-4 py-3">
                      <div className="h-2.5 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2.5 rounded-full bg-indigo-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {progress.toFixed(1)}%
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 font-bold ${getGradeColor(
                        item.grade
                      )}`}
                    >
                      {item.grade}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentExamMarks;
